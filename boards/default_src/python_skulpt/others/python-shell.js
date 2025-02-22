import MixpyProject from './mixpy-project';
import PyEngine from './py-engine';
import { Workspace, Msg } from 'mixly';
import StatusBarImage from './statusbar-image';

class PythonShell {
    static {
        this.pythonShell = null;

        this.init = async function () {
            StatusBarImage.init();
            this.pythonShell = new PythonShell();
        }

        this.run = function () {
            const mainWorkspace = Workspace.getMain();
            const editor = mainWorkspace.getEditorsManager().getActive();
            const code = editor.getCode();
            return this.pythonShell.run(code);
        }

        this.stop = function () {
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
    #pyEngine_ = null;
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
                    return true;
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
        this.#pyEngine_ = new PyEngine({}, new MixpyProject());
        this.#pyEngine_.loadEngine(this.#statusBarImage_.getContent().children()[0]);
        this.#addEventsListener_();
    }

    #addEventsListener_() {
        const events = this.#pyEngine_.getEvents();
        events.bind('finished', () => {
            this.#running_ = false;
            this.#statusBarTerminal_.addValue(`\n==${Msg.Lang['shell.finish']}==`);
        });

        events.bind('output', (data) => {
            this.#statusBarTerminal_.addValue(data.content);
        });

        events.bind('error', (data) => {
            this.#running_ = false;
            this.#statusBarTerminal_.addValue(`\n${data.toString()}\n`);
        });

        events.bind('input', (data) => {
            const prompt = String(data?.content?.prompt);
            this.#statusBarTerminal_.addValue(`>>> ${prompt}`);
            this.#prompt_ = prompt;
            this.#inputResolve_ = data.resolve;
            this.#inputReject_ = data.reject;
            this.#enterInput_();
        });

        events.bind('display', (data) => {
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

    addPrompt(prompt, resolve, reject) {
        this.#statusBarTerminal_.addValue(prompt);
        this.#prompt_ = prompt;
        this.#inputResolve_ = resolve;
        this.#inputReject_ = reject;
        this.#enterInput_();
    }

    async run(code) {
        await this.stop();
        this.#statusBarsManager_.changeTo('output');
        this.#statusBarsManager_.show();
        this.#statusBarTerminal_.setValue(`${Msg.Lang['shell.running']}...\n`);
        this.#running_ = true;
        if (code.indexOf('import turtle') !== -1
            || code.indexOf('from turtle import') !== -1
            || code.indexOf('import matplotlib') !== -1
            || code.indexOf('from matplotlib import') !== -1
            || code.indexOf('import pgzrun') !== -1
            || code.indexOf('from pgzrun import') !== -1
            || code.indexOf('import sprite') !== -1
            || code.indexOf('from sprite import') !== -1) {
            this.#statusBarsManager_.changeTo('images');
        }
        this.#pyEngine_.run(code);
    }

    async stop() {
        if (this.#waittingForInput_) {
            this.#exitInput_();
        }
        if (this.#running_) {
            this.#pyEngine_.kill();
            await this.sleep(500);
            this.#running_ = false;
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default PythonShell;