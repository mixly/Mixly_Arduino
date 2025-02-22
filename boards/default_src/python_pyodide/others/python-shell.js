import * as Blockly from 'blockly/core';
import * as path from 'path';
import $ from 'jquery';
import {
    Workspace,
    Env,
    Msg,
    HTMLTemplate,
    Debug,
    app
} from 'mixly';
import { KernelLoader } from '@basthon/kernel-loader';
import StatusBarImage from './statusbar-image';
import StatusBarFileSystem from './statusbar-filesystem';
import LOADER_TEMPLATE from '../templates/html/loader.html';


export default class PythonShell {
    static {
        HTMLTemplate.add(
            'html/statusbar/loader.html',
            new HTMLTemplate(LOADER_TEMPLATE)
        );

        this.pythonShell = null;
        this.kernelLoaded = false;
        this.$loader = $(HTMLTemplate.get('html/statusbar/loader.html').render({
            msg: {
                loading: Blockly.Msg.PYTHON_PYODIDE_LOADING
            }
        }));
        this.statusBarImage = null;
        this.statusBarFileSystem = null;

        this.init = async function () {
            const footerBar = app.getFooterBar();
            const $content = footerBar.getContent();
            $content.after(this.$loader);

            const projectPath = path.relative(Env.indexDirPath, Env.boardDirPath);
            const loader = new KernelLoader({
                rootPath: path.join(projectPath, 'deps'),
                language: 'python3',
            });

            const kernel = await loader.kernelAvailable();
            if (!kernel) {
                return;
            }
            await kernel.init();
            await kernel.loaded();

            this.loader = loader;
            this.kernel = kernel;
            this.statusBarImage = StatusBarImage.init();
            this.statusBarFileSystem = StatusBarFileSystem.init();
            this.pythonShell = new PythonShell();
            this.pyodide = window.pyodide;
            this.interruptBuffer = new Uint8Array(new ArrayBuffer(1));
            this.pyodide.setInterruptBuffer(this.interruptBuffer);
            this.kernelLoaded = true;
            this.$loader.remove();
            this.$loader = null;
        }

        this.run = async function () {
            if (!this.kernelLoaded) {
                return;
            }
            const mainWorkspace = Workspace.getMain();
            const editor = mainWorkspace.getEditorsManager().getActive();
            const code = editor.getCode();
            return this.pythonShell.run(code);
        }

        this.stop = async function () {
            if (!this.kernelLoaded) {
                return;
            }
            return this.pythonShell.stop();
        }
    }

    #statusBarTerminal_ = null;
    #statusBarImage_ = null;
    #statusBarsManager_ = null;
    #cursor_ = {
        row: 0,
        column: 0
    };
    #prompt_ = '';
    #inputResolve_ = null;
    #inputReject_ = null;
    #waittingForInput_ = false;
    #running_ = false;
    #kernel_ = null;
    #onCursorChangeEvent_ = () => this.#onCursorChange_();
    #commands_ = [
        {
            name: 'REPL-Enter',
            bindKey: 'Enter',
            exec: (editor) => {
                const session = editor.getSession();
                const cursor = session.selection.getCursor();
                if (cursor.row === this.#cursor_.row) {
                    const newPos = this.#statusBarTerminal_.getEndPos();
                    let str = this.#statusBarTerminal_.getValueRange(this.#cursor_, newPos);
                    str = str.replace(this.#prompt_, '');
                    this.#inputResolve_?.(str);
                    this.#inputResolve_ = null;
                    this.#inputReject_ = null;
                    this.#statusBarTerminal_.addValue('\n');
                    this.#exitInput_();
                }
                return false;
            }
        }, {
            name: 'REPL-ChangeEditor',
            bindKey: 'Delete|Ctrl-X|Backspace',
            exec: (editor) => {
                const session = editor.getSession();
                const cursor = session.selection.getCursor();
                if (cursor.row < this.#cursor_.row || cursor.column <= this.#cursor_.column) {
                    return true;
                }
                return false;
            }
        }
    ];

    constructor() {
        const mainWorkspace = Workspace.getMain();
        this.#statusBarsManager_ = mainWorkspace.getStatusBarsManager();
        this.#statusBarTerminal_ = this.#statusBarsManager_.getStatusBarById('output');
        this.#statusBarImage_ = this.#statusBarsManager_.getStatusBarById('images');
        this.#kernel_ = PythonShell.kernel;
        this.#addEventsListener_();
    }

    #addEventsListener_() {
        this.#kernel_.addEventListener('eval.finished', () => {
            this.#running_ = false;
            this.#statusBarTerminal_.addValue(`\n==${Msg.Lang['shell.finish']}==`);
            this.syncfs(false).catch(Debug.error);
        });

        this.#kernel_.addEventListener('eval.output', (data) => {
            this.#statusBarTerminal_.addValue(data.content);
        });

        this.#kernel_.addEventListener('eval.error', () => {
            this.#running_ = false;
            this.#statusBarTerminal_.addValue(`\n==${Msg.Lang['shell.finish']}==`);
        });

        this.#kernel_.addEventListener('eval.input', (data) => {
            const prompt = String(data?.content?.prompt);
            this.#statusBarTerminal_.addValue(prompt);
            this.#prompt_ = prompt;
            this.#inputResolve_ = data.resolve;
            this.#inputReject_ = data.reject;
            this.#enterInput_();
        });

        this.#kernel_.addEventListener('eval.display', (data) => {
            this.#statusBarsManager_.changeTo('images');
            this.#statusBarImage_.display(data);
        });
    }

    #onCursorChange_() {
        const editor = this.#statusBarTerminal_.getEditor();
        const session = editor.getSession();
        const cursor = session.selection.getCursor();
        editor.setReadOnly(
            cursor.row < this.#cursor_.row || cursor.column < this.#cursor_.column
        );
    }

    #enterInput_() {
        if (!this.#running_) {
            return;
        }
        this.#waittingForInput_ = true;
        this.#cursor_ = this.#statusBarTerminal_.getEndPos();
        const editor = this.#statusBarTerminal_.getEditor();
        editor.setReadOnly(false);
        editor.focus();
        const session = editor.getSession();
        session.selection.on('changeCursor', this.#onCursorChangeEvent_);
        editor.commands.addCommands(this.#commands_);
    }

    #exitInput_() {
        this.#waittingForInput_ = false;
        const editor = this.#statusBarTerminal_.getEditor();
        const session = editor.getSession();
        session.selection.off('changeCursor', this.#onCursorChangeEvent_);
        editor.commands.removeCommands(this.#commands_);
        this.#prompt_ = '';
        this.#inputResolve_?.('');
        // this.#inputReject_?.({});
        this.cursor_ = { row: 0, column: 0 };
        editor.setReadOnly(true);
    }

    async run(code) {
        await this.stop();
        await this.syncfs(true);
        if (code.indexOf('import turtle') !== -1) {
            code += '\nturtle.done()\n';
        }
        if (code.indexOf('import matplotlib.pyplot') !== -1) {
            code += '\nplt.clf()\n';
        }
        this.#statusBarsManager_.changeTo('output');
        this.#statusBarsManager_.show();
        this.#statusBarTerminal_.setValue(`${Msg.Lang['shell.running']}...\n`);
        this.#running_ = true;
        this.#kernel_.dispatchEvent('eval.request', {
            code,
            interactive: false,
        });
    }

    async stop() {
        if (this.#waittingForInput_) {
            this.#exitInput_();
        }
        if (this.#running_) {
            const timeout = 5;
            PythonShell.interruptBuffer[0] = 2;
            const startTime = Number(new Date());
            while (Number(new Date()) - startTime < timeout * 1000) {
                if (this.#running_) {
                    PythonShell.interruptBuffer[0] = 2;
                    await this.sleep(100);
                } else {
                    break;
                }
            }
            this.#running_ = false;
        }
    }

    async syncfs(populate = false) {
        return new Promise((resolve) => {
            window.pyodide.FS.syncfs(populate, resolve);
        });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}