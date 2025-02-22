goog.loadJs('web', () => {

goog.require('path');
goog.require('Mixly.FS');
goog.require('Mixly.Debug');
goog.require('Mixly.Web.Serial');
goog.require('Mixly.Web.Ampy');
goog.provide('Mixly.Web.AmpyFS');

const { FS, Debug, Web } = Mixly;
const { Serial, Ampy } = Web;


class AmpyFS extends FS {
    #ampy_ = null;
    #port_ = '';
    #baud_ = 115200;

    constructor() {
        super();
        this.#ampy_ = Ampy;
    }

    async getAmpy() {
        const { mainStatusBarTabs } = Mixly;
        const statusBarSerial = mainStatusBarTabs.getStatusBarById(this.#port_);
        if (statusBarSerial) {
            await statusBarSerial.close();
        }
        const serial = new Serial(this.#port_);
        const ampy = new Ampy(serial);
        return ampy;
    }

    async rename(oldPath, newPath) {
        let stdout = '', error = null, ampy = null;
        try {
            ampy = await this.getAmpy();
            await ampy.enter();
            stdout = await ampy.rename(oldPath, newPath);  
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        try {
            await ampy.exit();
            await ampy.dispose();
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        return [error, stdout];
    }

    async createFile(filePath) {
        let stdout = '', error = null, ampy = null;
        try {
            ampy = await this.getAmpy();
            await ampy.enter();
            stdout = await ampy.mkfile(filePath);
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        try {
            await ampy.exit();
            await ampy.dispose();
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        return [error, stdout];
    }

    async readFile(filePath) {
        let stdout = '', error = null, ampy = null;
        try {
            ampy = await this.getAmpy();
            await ampy.enter();
            stdout = await ampy.get(filePath);
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        try {
            await ampy.exit();
            await ampy.dispose();
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        return [error, stdout];
    }

    async writeFile(filePath, data) {
        let stdout = '', error = null, ampy = null;
        try {
            ampy = await this.getAmpy();
            await ampy.enter();
            stdout = await ampy.put(filePath, data);
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        try {
            await ampy.exit();
            await ampy.dispose();
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        return [error, stdout];
    }

    async isFile(filePath) {
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
        let stdout = '', error = null, ampy = null;
        try {
            ampy = await this.getAmpy();
            await ampy.enter();
            stdout = await ampy.rm(filePath);
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        try {
            await ampy.exit();
            await ampy.dispose();
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        return [error, stdout];
    }

    async createDirectory(folderPath) {
        let stdout = '', error = null, ampy = null;
        try {
            ampy = await this.getAmpy();
            await ampy.enter();
            stdout = await ampy.mkdir(folderPath);
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        try {
            await ampy.exit();
            await ampy.dispose();
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        return [error, stdout];
    }

    async readDirectory(folderPath) {
        let stdout = [], error = null, ampy = null;
        try {
            ampy = await this.getAmpy();
            await ampy.enter();
            stdout = await ampy.ls(folderPath, false, false);
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        try {
            await ampy.exit();
            await ampy.dispose();
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        return [error, stdout];
    }

    async isDirectory(folderPath) {
        let error = null;
        if (path.extname(folderPath)) {
            return [error, false];
        } else {
            return [error, true];
        }
    }

    async isDirectoryEmpty(folderPath) {
        return [null, false];
    }

    async renameDirectory(oldFolderPath, newFolderPath) {
        return this.rename(oldFolderPath, newFolderPath);
    }

    // async moveDirectory(oldFolderPath, newFolderPath) {}

    // async copyDirectory(oldFolderPath, newFolderPath) {}

    async deleteDirectory(folderPath) {
        let stdout = '', error = null, ampy = null;
        try {
            ampy = await this.getAmpy();
            await ampy.enter();
            stdout = await ampy.rmdir(folderPath);
        } catch (e) {
            error = e;
            Debug.error(error);
        }
        try {
            await ampy.exit();
            await ampy.dispose();
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

Web.AmpyFS = AmpyFS;

});