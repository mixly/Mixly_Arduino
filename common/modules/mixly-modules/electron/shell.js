goog.loadJs('electron', () => {

goog.require('dayjs.duration');
goog.require('Mixly.Env');
goog.require('Mixly.MString');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.Shell');

const {
    Env,
    MString,
    Electron
} = Mixly;

const child_process = Mixly.require('node:child_process');
const iconv_lite = Mixly.require('iconv-lite');

class Shell {
    static {
        this.ENCODING = Env.currentPlatform == 'win32' ? 'cp936' : 'utf-8';
    }

    #shell_ = null;
    #killed_ = false;
    constructor() {}

    #addEventsListener_() {
        const { mainStatusBarTabs } = Mixly;
        const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
        const { stdout, stderr } = this.#shell_;
        stdout.on('data', (data) => {
            if (data.length > 1000) {
                return;
            }
            data = iconv_lite.decode(Buffer.from(data, 'binary'), 'utf-8');
            statusBarTerminal.addValue(data);
        });
        stderr.on('data', (data) => {
            let lines = data.split('\n');
            for (let i in lines) {
                let encoding = 'utf-8';
                if (lines[i].indexOf('can\'t open device') !== -1) {
                    encoding = Shell.ENCODING;
                }
                lines[i] = iconv_lite.decode(Buffer.from(lines[i], 'binary'), encoding);
            }
            data = lines.join('\n');
            data = MString.decode(data);
            statusBarTerminal.addValue(data);
        });
    }

    exec(command) {
        return new Promise((resolve, reject) => {
            const { mainStatusBarTabs } = Mixly;
            const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
            const startTime = Number(new Date());
            this.#shell_ = child_process.exec(command, {
                maxBuffer: 4096 * 1000000,
                encoding: 'binary'
            });
            this.#addEventsListener_();
            this.#shell_.on('close', (code) => {
                this.#killed_ = true;
                if (code === null) {
                    code = 1;
                }
                const endTime = Number(new Date());
                const duration = dayjs.duration(endTime - startTime).format('HH:mm:ss.SSS');
                const info = { code, time: duration };
                resolve(info);
            });
        });
    }

    kill() {
        if (this.#killed_) {
            return;
        }
        this.#shell_.stdin.end();
        this.#shell_.stdout.end();
        if (Env.currentPlatform === 'win32') {
            child_process.exec(`taskkill /pid ${this.#shell_.pid} /f /t`);
        } else {
            this.#shell_.kill('SIGTERM');
        }
    }

    getShell() {
        return this.#shell_;
    }
}

Mixly.Electron.Shell = Shell;

});