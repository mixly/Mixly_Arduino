goog.loadJs('electron', () => {

goog.require('path');
goog.require('Mustache');
goog.require('Mixly.Ampy');
goog.require('Mixly.Env');
goog.require('Mixly.Serial');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.Ampy');

const {
    Ampy,
    Env,
    Serial,
    Electron
} = Mixly;

const util = Mixly.require('node:util');
const child_process = Mixly.require('node:child_process');

class AmpyExt extends Ampy {
    static {
        this.TEMPLATE = {
            ls: '{{&ampy}} -p {{&port}} -b {{&baud}} -i 0 ls "{{&folderPath}}"',
            get: '{{&ampy}} -p {{&port}} -b {{&baud}} -i 0 get "{{&filePath}}"',
            mkdir: '{{&ampy}} -p {{&port}} -b {{&baud}} -i 0 mkdir "{{&folderPath}}"',
            mkfile: '{{&ampy}} -p {{&port}} -b {{&baud}} -i 0 mkfile "{{&filePath}}"',
            isdir: '{{&ampy}} -p {{&port}} -b {{&baud}} -i 0 isdir "{{&folderPath}}"',
            isfile: '{{&ampy}} -p {{&port}} -b {{&baud}} -i 0 isfile "{{&filePath}}"',
            put: '{{&ampy}} -p {{&port}} -b {{&baud}} -i 0 put "{{&startPath}}" "{{&endPath}}"',
            rm: '{{&ampy}} -p {{&port}} -b {{&baud}} -i 0 rm "{{&filePath}}"',
            rmdir: '{{&ampy}} -p {{&port}} -b {{&baud}} -i 0 rmdir "{{&folderPath}}"',
            rename: '{{&ampy}} -p {{&port}} -b {{&baud}} -i 0 rename "{{&oldPath}}" "{{&newPath}}"',
            run: '{{&ampy}} -p {{&port}} -b {{&baud}} -i 0 run "{{&filePath}}"'
        }

        this.AMPY_PATH = path.join(Env.srcDirPath, './tools/python/ampy/cli.py');

        this.AMPY_TEMPLATE = Mustache.render('"{{&python3}}" "{{&ampy}}"', {
            python3: Env.python3Path,
            ampy: this.AMPY_PATH
        });
    }

    #exec_ = util.promisify(child_process.exec);

    constructor() {
        super();
    }

    async ls(port, baud, folderPath) {
        return this.exec(port, this.render('ls', { port, baud, folderPath }));
    }

    async get(port, baud, filePath) {
        return this.exec(port, this.render('get', { port, baud, filePath }));
    }

    async mkdir(port, baud, folderPath) {
        return this.exec(port, this.render('mkdir', { port, baud, folderPath }));
    }

    async mkfile(port, baud, filePath) {
        return this.exec(port, this.render('mkfile', { port, baud, filePath }));
    }

    async isdir(port, baud, folderPath) {
        return this.exec(port, this.render('isdir', { port, baud, folderPath }));
    }

    async isfile(port, baud, filePath) {
        return this.exec(port, this.render('isfile', { port, baud, filePath }));
    }

    async put(port, baud, startPath, endPath) {
        return this.exec(port, this.render('put', { port, baud, startPath, endPath }));
    }

    async rm(port, baud, filePath) {
        return this.exec(port, this.render('rm', { port, baud, filePath }));
    }

    async rmdir(port, baud, folderPath) {
        return this.exec(port, this.render('rmdir', { port, baud, folderPath }));
    }

    async rename(port, baud, oldPath, newPath) {
        return this.exec(port, this.render('rename', { port, baud, oldPath, newPath }));
    }

    async run(port, baud, filePath) {
        return this.exec(port, this.render('run', { port, baud, filePath }));
    }

    render(templateName, args) {
        return Mustache.render(AmpyExt.TEMPLATE[templateName], {
            ...args,
            ampy: AmpyExt.AMPY_TEMPLATE
        });
    }

    async exec(port, command) {
        const portsName = Serial.getCurrentPortsName();
        if (!portsName.includes(port)) {
            throw new Error('无可用串口');
            return;
        }
        const { mainStatusBarTabs } = Mixly;
        const statusBarSerial = mainStatusBarTabs.getStatusBarById(port);
        if (statusBarSerial) {
            await statusBarSerial.close();
        }
        return this.#exec_(command);
    }
}

Electron.Ampy = AmpyExt;

});