goog.loadJs('web', () => {

goog.require('path');
goog.require('Mustache');
goog.require('Mixly.Ampy');
goog.require('Mixly.Env');
goog.require('Mixly.Serial');
goog.require('Mixly.WebSocket');
goog.provide('Mixly.WebSocket.Ampy');

const {
    Ampy,
    Env,
    Serial,
    WebSocket
} = Mixly;


class AmpyExt extends Ampy {
    static {
        this.mixlySocket = null;
        this.socket = null;

        this.getSocket = function () {
            return this.socket;
        }

        this.getMixlySocket = function () {
            return this.mixlySocket;
        }

        this.init = function (mixlySocket) {
            this.mixlySocket = mixlySocket;
            this.socket = mixlySocket.getSocket();
        }
    }

    constructor() {
        super();
    }

    async ls(port, baud, folderPath) {
        return this.exec('ampy.ls', port, baud, folderPath);
    }

    async get(port, baud, filePath) {
        return this.exec('ampy.get', port, baud, filePath);
    }

    async mkdir(port, baud, folderPath) {
        return this.exec('ampy.mkdir', port, baud, folderPath);
    }

    async mkfile(port, baud, filePath) {
        return this.exec('ampy.mkfile', port, baud, filePath);
    }

    async isdir(port, baud, folderPath) {
        return this.exec('ampy.isdir', port, baud, folderPath);
    }

    async isfile(port, baud, filePath) {
        return this.exec('ampy.isfile', port, baud, filePath);
    }

    async put(port, baud, filePath, data) {
        return this.exec('ampy.put', port, baud, filePath, data);
    }

    async rm(port, baud, filePath) {
        return this.exec('ampy.rm', port, baud, filePath);
    }

    async rmdir(port, baud, folderPath) {
        return this.exec('ampy.rmdir', port, baud, folderPath);
    }

    async rename(port, baud, oldPath, newPath) {
        return this.exec('ampy.rename', port, baud, oldPath, newPath);
    }

    async run(port, baud, filePath) {
        return this.exec('ampy.run', port, baud, filePath);
    }

    async exec(eventType, port, ...args) {
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
        const mixlySocket = AmpyExt.getMixlySocket();
        const output = await mixlySocket.emitAsync(eventType, port, ...args);
        if (output[0]) {
            throw new Error(output[0]);
        }
        return output[1];
    }
}

WebSocket.Ampy = AmpyExt;

});