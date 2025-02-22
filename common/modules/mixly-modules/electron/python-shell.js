goog.loadJs('electron', () => {

goog.require('dayjs.duration');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Debug');
goog.require('Mixly.Workspace');
goog.require('Mixly.MString');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.PythonShell');

const {
    Env,
    Msg,
    Debug,
    Workspace,
    MString,
    Electron
} = Mixly;

const iconv_lite = Mixly.require('iconv-lite');
const python_shell = Mixly.require('python-shell');
const child_process = Mixly.require('node:child_process');
const fs_extra = Mixly.require('fs-extra');


class PythonShell {
    static {
        this.ENCODING = Env.currentPlatform == 'win32' ? 'cp936' : 'utf-8';
        this.pythonShell = null;

        this.init = function () {
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

    #shell_ = null;
    #statusBarTerminal_ = null;
    #options_ = {
        pythonPath: Env.python3Path,
        pythonOptions: ['-u'],
        encoding: 'binary',
        mode: 'utf-8'
    };
    #cursor_ = {
        row: 0,
        column: 0
    };
    #prompt_ = '';
    #waittingForInput_ = false;
    #running_ = false;
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
                    this.#shell_.stdin.write(escape(str) + '\n');
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
    constructor(config) {
        Object.assign(this.#options_, config);
        const { mainStatusBarTabs } = Mixly;
        this.#statusBarTerminal_ = mainStatusBarTabs.getStatusBarById('output');
    }

    #addEventsListener_() {
        const { stdout, stderr } = this.#shell_;
        stdout.setEncoding('binary');
        stdout.on('data', (data) => {
            data = iconv_lite.decode(Buffer.from(data, 'binary'), PythonShell.ENCODING);
            data = MString.decode(data);
            this.#statusBarTerminal_.addValue(data);
            const keyIndex = data.lastIndexOf('>>>');
            if (keyIndex !== -1) {
                this.#prompt_ = data.substring(keyIndex);
                setTimeout(() => this.#enterInput_(), 500);
            }
        });
        stderr.setEncoding('binary');
        stderr.on('data', (data) => {
            data = iconv_lite.decode(Buffer.from(data, 'binary'), PythonShell.ENCODING);
            data = MString.decode(data);
            data = data.replace(/(?<![\w+])__import__\("pyinput"\).input\(/g, 'input(');
            this.#statusBarTerminal_.addValue(data);
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
        this.cursor_ = { row: 0, column: 0 };
        editor.setReadOnly(true);
    }

    run(code) {
        this.stop()
            .then(() => {
                try {
                    code = code.replace(/(?<![\w+])input\(/g, '__import__("pyinput").input(');
                    if (code.indexOf('import turtle') !== -1) {
                        code += '\nturtle.done()\n';
                    }
                } catch (error) {
                    Debug.error(error);
                }
                const { mainStatusBarTabs } = Mixly;
                mainStatusBarTabs.changeTo('output');
                mainStatusBarTabs.show();
                return fs_extra.outputFile(Env.pyFilePath, code, 'utf8');
            })
            .then(() => {
                this.#statusBarTerminal_.setValue(`${Msg.Lang['shell.running']}...\n`);
                const startTime = Number(new Date());
                this.#shell_ = new python_shell.PythonShell(Env.pyFilePath, this.#options_);
                this.#running_ = true;
                this.#addEventsListener_();
                this.#shell_.on('close', (code) => {
                    this.#running_ = false;
                    const endTime = Number(new Date());
                    const duration = dayjs.duration(endTime - startTime).format('HH:mm:ss.SSS');
                    this.#statusBarTerminal_.addValue(`\n==${Msg.Lang['shell.finish']}(${Msg.Lang['shell.timeCost']} ${duration})==`);
                });
            })
            .catch(Debug.error);
    }

    stop() {
        return new Promise((resolve, reject) => {
            if (this.#waittingForInput_) {
                this.#exitInput_();
            }
            if (this.#running_) {
                this.#shell_.childProcess.on('exit', () => {
                    resolve();
                });
                this.#shell_.stdin.end();
                this.#shell_.stdout.end();
                if (Env.currentPlatform === 'win32') {
                    child_process.exec(`taskkill /pid ${this.#shell_.childProcess.pid} /f /t`);
                } else {
                    this.#shell_.kill('SIGTERM');
                }
            } else {
                resolve();
            }
        });
    }
}

Electron.PythonShell = PythonShell;

});