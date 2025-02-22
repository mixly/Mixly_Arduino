goog.loadJs('web', () => {

goog.require('path');
goog.require('Mixly.Env');
goog.require('Mixly.FS');
goog.require('Mixly.Debug');
goog.require('Mixly.MJSON');
goog.require('Mixly.WebSocket.Ampy');
goog.provide('Mixly.WebSocket.AmpyFS');

const {
    Env,
    FS,
    Debug,
    MJSON,
    WebSocket
} = Mixly;

const { Ampy } = WebSocket;


class AmpyFS extends FS {
    #ampy_ = null;
    #port_ = '';
    #baud_ = 115200;
    #decoder_ = new TextDecoder('utf8');

    constructor() {
        super();
        this.#ampy_ = new Ampy();
    }

    async rename(oldPath, newPath) {
        let stdout = '', error = null;
        try {
            stdout = await this.#ampy_.rename(this.#port_, this.#baud_, oldPath, newPath);
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        return [error, stdout];
    }

    async createFile(filePath) {
        let stdout = '', error = null;
        try {
            stdout = await this.#ampy_.mkfile(this.#port_, this.#baud_, filePath);
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        return [error, stdout];
    }

    async readFile(filePath) {
        let stdout = '', error = null;
        try {
            stdout = await this.#ampy_.get(this.#port_, this.#baud_, filePath);
            stdout = this.#decoder_.decode(this.#ampy_.unhexlify(stdout));
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        return [error, stdout];
    }

    async writeFile(filePath, data) {
        let stdout = '', error = null;
        try {
            stdout = await this.#ampy_.put(this.#port_, this.#baud_, filePath, data);
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        return [error, stdout];
    }

    async isFile(filePath) {
        /*const [error, stdout] = await this.readDirectory(filePath);
        if (error) {
            return true;
        }
        return false;*/
        let error = null;
        if (path.extname(filePath)) {
            return [error, true];
        } else {
            return [error, false];
        }
    }

    async renameFile(oldFilePath, newFilePath) {
        return this.rename(oldFilePath, newFilePath);
    }

    // async moveFile(oldFilePath, newFilePath) {}

    // async copyFile(oldFilePath, newFilePath) {}

    async deleteFile(filePath) {
        let stdout = '', error = null;
        try {
            stdout = await this.#ampy_.rm(this.#port_, this.#baud_, filePath);
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        return [error, stdout];
    }

    async createDirectory(folderPath) {
        let stdout = '', error = null;
        try {
            stdout = await this.#ampy_.mkdir(this.#port_, this.#baud_, folderPath);
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        return [error, stdout];
    }

    async readDirectory(folderPath) {
        let stdout = [], error = null;
        try {
            const output = await this.#ampy_.ls(this.#port_, this.#baud_, folderPath);
            const dirs = Array.from(new Set(output.split('\r\n')));
            for (let i in dirs) {
                if (!dirs[i]) {
                    continue;
                }
                stdout.push(MJSON.parse(dirs[i].replaceAll('\'', '"')));
            }
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        return [error, stdout];
    }

    async isDirectory(folderPath) {
        /*const [error, stdout] = await this.readDirectory(folderPath);
        if (error) {
            return false;
        }
        return true;*/
        let error = null;
        if (path.extname(folderPath)) {
            return [error, false];
        } else {
            return [error, true];
        }
    }

    async isDirectoryEmpty(folderPath) {
        /*const [error, stdout] = await this.readDirectory(folderPath);
        let isEmpty = false;
        if (error || !stdout.length) {
            isEmpty = true;
        }*/
        return [null, false];
    }

    async renameDirectory(oldFolderPath, newFolderPath) {
        return this.rename(oldFolderPath, newFolderPath);
    }

    // async moveDirectory(oldFolderPath, newFolderPath) {}

    // async copyDirectory(oldFolderPath, newFolderPath) {}

    async deleteDirectory(folderPath) {
        let stdout = '', error = null;
        try {
            stdout = await this.#ampy_.rmdir(this.#port_, this.#baud_, folderPath);
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        return [error, stdout];
    }

    setPortName(port) {
        this.#port_ = port;
    }

    getPortName() {
        return this.#port_;
    }

    setBaudRate(baud) {
        this.#baud_ = baud;
    }

    getBaudRate() {
        return this.#baud_;
    }
}

WebSocket.AmpyFS = AmpyFS;

});