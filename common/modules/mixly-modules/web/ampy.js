goog.loadJs('web', () => {

goog.require('path');
goog.require('Mustache');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Ampy');
goog.require('Mixly.Config');
goog.require('Mixly.Web');
goog.provide('Mixly.Web.Ampy');

const {
    Env,
    Msg,
    Ampy,
    Config,
    Web
} = Mixly;


class AmpyExt extends Ampy {
    static {
        this.LS = goog.get(path.join(Env.templatePath, 'python/ls.py'));
        this.LS_RECURSIVE = goog.get(path.join(Env.templatePath, 'python/ls-recursive.py'));
        this.LS_LONG_FORMAT = goog.get(path.join(Env.templatePath, 'python/ls-long-format.py'));
        this.MKDIR = goog.get(path.join(Env.templatePath, 'python/mkdir.py'));
        this.MKFILE = goog.get(path.join(Env.templatePath, 'python/mkfile.py'));
        this.RENAME = goog.get(path.join(Env.templatePath, 'python/rename.py'));
        this.RM = goog.get(path.join(Env.templatePath, 'python/rm.py'));
        this.RMDIR = goog.get(path.join(Env.templatePath, 'python/rmdir.py'));
        this.GET = goog.get(path.join(Env.templatePath, 'python/get.py'));
    }

    #device_ = null;
    #receiveTemp_ = [];
    #writeBuffer_ = true;
    #active_ = false;
    #dataLength_ = 256;
    constructor(device, writeBuffer = true, dataLength = 256) {
        super();
        this.#device_ = device;
        this.#writeBuffer_ = writeBuffer;
        this.#dataLength_ = dataLength;
        this.#addEventsListener_();
    }

    #addEventsListener_() {
        this.#device_.bind('onChar', (char) => {
            if (['\r', '\n'].includes(char)) {
                this.#receiveTemp_.push('');
            } else {
                let line = this.#receiveTemp_.pop() ?? '';
                this.#receiveTemp_.push(line + char);
            }
        });
    }

    isActive() {
        return this.#active_;
    }

    async readUntil(ending, withEnding = true, timeout = 5000) {
        const startTime = Number(new Date());
        let nowTime = startTime;
        let readStr = '';
        while (nowTime - startTime < timeout) {
            const nowTime = Number(new Date());
            let len = this.#receiveTemp_.length;
            for (let i = 0; i < len; i++) {
                const data = this.#receiveTemp_.shift();
                let index = data.toLowerCase().indexOf(ending);
                if (index !== -1) {
                    if (withEnding) {
                        index += ending.length;
                    }
                    this.#receiveTemp_.unshift(data.substring(index));
                    readStr += data.substring(0, index);
                    return readStr;
                } else {
                    readStr += data;
                    if (i !== len - 1) {
                        readStr += '\n';
                    }
                }
            }
            if (nowTime - startTime >= timeout) {
                throw new Error(ending + '查找失败');
            }
            if (!this.isActive()) {
                throw new Error('数据读取中断');
            }
            await this.#device_.sleep(100);
        }
    }

    async interrupt(timeout = 5000) {
        // 中断两次
        await this.#device_.sendBuffer([3, 3]);
        await this.#device_.sleep(100);
        let succeed = false;
        if (await this.readUntil('>>>', true, timeout)) {
            succeed = true;
        }
        return succeed;
    }

    async enterRawREPL(timeout = 5000) {
        await this.#device_.sendBuffer([1]);
        await this.#device_.sleep(100);
        let succeed = false;
        if (await this.readUntil('raw repl; ctrl-b to exit', true, timeout)) {
            return true;
        }
        return false;
    }

    async exitRawREPL(timeout = 5000) {
        await this.#device_.sendBuffer([2]);
        await this.#device_.sleep(100);
        let succeed = false;
        if (await this.readUntil('>>>', true, timeout)) {
            succeed = true;
        }
        return succeed;
    }

    async exitREPL(timeout = 5000) {
        await this.#device_.sendBuffer([4]);
        await this.#device_.sleep(100);
        let succeed = false;
        if (await this.readUntil('soft reboot', false, timeout)) {
            succeed = true;
        }
        return succeed;
    }

    async exec(str) {
        if (this.#writeBuffer_) {
            const buffer = this.#device_.encode(str);
            const len = Math.ceil(buffer.length / this.#dataLength_);
            for (let i = 0; i < len; i++) {
                const start = i * this.#dataLength_;
                const end = Math.min((i + 1) * this.#dataLength_, buffer.length);
                const writeBuffer = buffer.slice(start, end);
                await this.#device_.sendBuffer(writeBuffer);
                await this.#device_.sleep(10);
            }
        } else {
            for (let i = 0; i < str.length / this.#dataLength_; i++) {
                const start = i * this.#dataLength_;
                const end = Math.min((i + 1) * this.#dataLength_, str.length);
                let data = str.substring(start, end);
                await this.#device_.sendString(data);
                await this.#device_.sleep(10);
            }
        }
        await this.#device_.sendBuffer([4]);
    }

    async enter() {
        if (this.isActive()) {
            return;
        }
        this.#active_ = true;
        await this.#device_.open(115200);
        await this.#device_.sleep(500);
        const { SELECTED_BOARD } = Config;
        if (SELECTED_BOARD?.serial
            && SELECTED_BOARD.serial?.dtr !== undefined
            && SELECTED_BOARD.serial?.rts !== undefined) {
            const { dtr, rts } = SELECTED_BOARD.serial;
            await this.#device_.setDTRAndRTS(dtr, rts);
        }
        await this.#device_.sleep(500);
        await this.#device_.sendBuffer([2]);
        if (!await this.interrupt()) {
            throw new Error(Msg.Lang['ampy.interruptFailed']);
        }
        if (!await this.enterRawREPL()) {
            throw new Error(Msg.Lang['ampy.enterRawREPLFailed']);
        }
    }

    async exit() {
        if (!this.isActive()) {
            return;
        }
        if (!await this.exitRawREPL()) {
            throw new Error(Msg.Lang['ampy.exitRawREPLFailed']);
        }
        /*if (!await this.exitREPL()) {
            throw new Error(Msg.Lang['ampy.exitREPLFailed']);
        }*/
        await this.#device_.close();
        this.#active_ = false;
    }

    async get(filename, timeout = 5000) {
        if (!this.isActive()) {
            throw new Error('串口未打开');
        }
        const code = Mustache.render(AmpyExt.GET, {
            path: filename
        });
        await this.exec(code);
        await this.#device_.sleep(100);
        if (!await this.readUntil('ok', true, timeout)) {
            throw new Error('无法执行python代码');
        }
        let str = await this.readUntil('>', false, timeout);
        str = str.replace('\x04\x04', '');
        if (str.indexOf('OSError') === -1) {
            str = this.#device_.decode(this.unhexlify(str));
            return str;
        }
        return false;
    }

    async put(filename, code) {
        if (!this.isActive()) {
            throw new Error('串口未打开');
        }
        let str = `file = open('${filename}', 'wb')\n`;
        const buffer = this.#device_.encode(code);
        const len = Math.ceil(buffer.length / 500);
        for (let i = 0; i < len; i++) {
            const writeBuffer = buffer.slice(i * 500, Math.min((i + 1) * 500, buffer.length));
            let writeStr = '';
            for (let num of writeBuffer) {
                let numStr = num.toString(16);
                if (numStr.length === 1) {
                    numStr = '0' + numStr;
                }
                writeStr += '\\x' + numStr;
            }
            str += `file.write(b'${writeStr}')\n`;
        }
        str += `file.close()\n`;
        await this.exec(str);
    }

    async ls(directory = '/', longFormat = true, recursive = false, timeout = 5000) {
        if (!this.isActive()) {
            throw new Error('串口未打开');
        }
        let code = '';
        if (longFormat) {
            code = Mustache.render(AmpyExt.LS_LONG_FORMAT, {
                path: directory
            });
        } else if (recursive) {
            code = Mustache.render(AmpyExt.LS_RECURSIVE, {
                path: directory
            });
        } else {
            code = Mustache.render(AmpyExt.LS, {
                path: directory
            });
        }
        await this.exec(code);
        await this.#device_.sleep(100);
        if (!await this.readUntil('ok', true, timeout)) {
            throw new Error('无法执行python代码');
        }
        let str = await this.readUntil('>', false, timeout);
        let info = null;
        str = str.replace('\x04\x04', '');
        str = str.replaceAll('\'', '\"');
        str = str.substring(0, str.lastIndexOf(']') + 1);
        info = JSON.parse(str);
        return info;
    }

    async mkdir(directory, timeout = 5000) {
        if (!this.isActive()) {
            throw new Error('串口未打开');
        }
        const code = Mustache.render(AmpyExt.MKDIR, {
            path: directory
        });
        await this.exec(code);
        await this.#device_.sleep(100);
        if (!await this.readUntil('ok', true, timeout)) {
            throw new Error('无法执行python代码');
        }
        let str = await this.readUntil('>', false, timeout);
        if (str.indexOf('OSError') === -1) {
            return true;
        }
        return false;
    }

    async mkfile(file, timeout = 5000) {
        if (!this.isActive()) {
            throw new Error('串口未打开');
        }
        const code = Mustache.render(AmpyExt.MKFILE, {
            path: file
        });
        await this.exec(code);
        await this.#device_.sleep(100);
        if (!await this.readUntil('ok', true, timeout)) {
            throw new Error('无法执行python代码');
        }
        let str = await this.readUntil('>', false, timeout);
        if (str.indexOf('OSError') === -1) {
            return true;
        }
        return false;
    }

    async rename(oldname, newname, timeout = 5000) {
        if (!this.isActive()) {
            throw new Error('串口未打开');
        }
        const code = Mustache.render(AmpyExt.RENAME, {
            oldPath: oldname,
            newPath: newname
        });
        await this.exec(code);
        await this.#device_.sleep(100);
        if (!await this.readUntil('ok', true, timeout)) {
            throw new Error('无法执行python代码');
        }
        let str = await this.readUntil('>', false, timeout);
        if (str.indexOf('OSError') === -1) {
            return true;
        }
        return false;
    }

    async rm(filename, timeout = 5000) {
        if (!this.isActive()) {
            throw new Error('串口未打开');
        }
        const code = Mustache.render(AmpyExt.RM, {
            path: filename
        });
        await this.exec(code);
        await this.#device_.sleep(100);
        if (!await this.readUntil('ok', true, timeout)) {
            throw new Error('无法执行python代码');
        }
        let str = await this.readUntil('>', false, timeout);
        if (str.indexOf('OSError') === -1) {
            return true;
        }
        return false;
    }

    async rmdir(directory, timeout = 5000) {
        if (!this.isActive()) {
            throw new Error('串口未打开');
        }
        const code = Mustache.render(AmpyExt.RMDIR, {
            path: directory
        });
        await this.exec(code);
        await this.#device_.sleep(100);
        if (!await this.readUntil('ok', true, timeout)) {
            throw new Error('无法执行python代码');
        }
        let str = await this.readUntil('>', false, timeout);
        if (str.indexOf('OSError') === -1) {
            return true;
        }
        return false;
    }

    getDevice() {
        return this.#device_;
    }

    async dispose() {
        this.#active_ = false;
        await this.#device_.dispose();
        this.#device_ = null;
    }
}

Web.Ampy = AmpyExt;

});