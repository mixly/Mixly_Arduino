goog.loadJs('web', () => {

goog.require('Mixly.Serial');
goog.require('Mixly.Registry');
goog.require('Mixly.Debug');
goog.require('Mixly.Web');
goog.provide('Mixly.Web.SerialPort');

const {
    Serial,
    Registry,
    Debug,
    Web
} = Mixly;


class WebSerialPort extends Serial {
    static {
        this.type = 'serialport';
        this.portToNameRegistry = new Registry();
        this.nameToPortRegistry = new Registry();

        this.getConfig = function () {
            return Serial.getConfig();
        }

        this.getSelectedPortName = function () {
            return Serial.getSelectedPortName();
        }

        this.getCurrentPortsName = function () {
            return Serial.getCurrentPortsName();
        }

        this.refreshPorts = function () {
            let portsName = [];
            for (let name of this.nameToPortRegistry.keys()) {
                portsName.push({ name });
            }
            Serial.renderSelectBox(portsName);
        }

        this.requestPort = async function () {
            const serialport = await navigator.serial.requestPort();
            this.addPort(serialport);
            this.refreshPorts();
        }

        this.getPort = function (name) {
            return this.nameToPortRegistry.getItem(name);
        }

        this.addPort = function (serialport) {
            if (this.portToNameRegistry.hasKey(serialport)) {
                return;
            }
            let name = '';
            for (let i = 1; i <= 20; i++) {
                name = `serial${i}`;
                if (this.nameToPortRegistry.hasKey(name)) {
                    continue;
                }
                break;
            }
            this.portToNameRegistry.register(serialport, name);
            this.nameToPortRegistry.register(name, serialport);
        }

        this.removePort = function (serialport) {
            if (!this.portToNameRegistry.hasKey(serialport)) {
                return;
            }
            const name = this.portToNameRegistry.getItem(serialport);
            if (!name) {
                return;
            }
            this.portToNameRegistry.unregister(serialport);
            this.nameToPortRegistry.unregister(name);
        }

        this.addEventsListener = function () {
            navigator?.serial?.addEventListener('connect', (event) => {
                this.addPort(event.target);
                this.refreshPorts();
            });

            navigator?.serial?.addEventListener('disconnect', (event) => {
                this.removePort(event.target);
                this.refreshPorts();
            });
        }

        this.init = function () {
            navigator?.serial?.getPorts().then((serialports) => {
                for (let serialport of serialports) {
                    this.addPort(serialport);
                }
            });
            this.addEventsListener();
        }
    }

    #serialport_ = null;
    #keepReading_ = null;
    #reader_ = null;
    #writer_ = null;
    #stringTemp_ = '';
    constructor(port) {
        super(port);
    }

    #addEventsListener_() {
        this.#addReadEventListener_();
    }

    async #addReadEventListener_() {
        const { readable } = this.#serialport_;
        while (readable && this.#keepReading_) {
            this.#reader_ = readable.getReader();
            try {
                while (true) {
                    const { value, done } = await this.#reader_.read();
                    value && this.onBuffer(value);
                    if (done) {
                        break;
                    }
                }
            } catch (error) {
                this.#keepReading_ = false;
                Debug.error(error);
            } finally {
                this.#reader_ && this.#reader_.releaseLock();
                await this.close();
            }
        }
    }

    async open(baud) {
        return new Promise((resolve, reject) => {
            const portsName = Serial.getCurrentPortsName();
            const currentPortName = this.getPortName();
            if (!portsName.includes(currentPortName)) {
                reject('无可用串口');
                return;
            }
            if (this.isOpened()) {
                resolve();
                return;
            }
            baud = baud ?? this.getBaudRate();
            this.#serialport_ = WebSerialPort.getPort(currentPortName);
            this.#serialport_.open({ baudRate: baud })
                .then(() => {
                    super.open(baud);
                    super.setBaudRate(baud);
                    this.#keepReading_ = true;
                    this.onOpen();
                    this.#addEventsListener_();
                    resolve();
                })
                .catch(reject);
        });
    }

    async #waitForUnlock_(timeout) {
        while (
            (this.#serialport_.readable && this.#serialport_.readable.locked) ||
            (this.#serialport_.writable && this.#serialport_.writable.locked)
        ) {
            await this.sleep(timeout);
        }
    }

    async close() {
        if (!this.isOpened()) {
            return;
        }
        super.close();
        if (this.#serialport_.readable?.locked) {
            this.#keepReading_ = false;
            await this.#reader_?.cancel();
        }
        await this.#waitForUnlock_(400);
        this.#reader_ = undefined;
        await this.#serialport_.close();
        this.#stringTemp_ = '';
        this.onClose(1);
    }

    async setBaudRate(baud) {
        return new Promise((resolve, reject) => {
            if (!this.isOpened()
                || this.getBaudRate() === baud
                || !this.baudRateIsLegal(baud)) {
                resolve();
                return;
            }
            this.close()
                .then(() => this.open(baud))
                .then(resolve)
                .catch(reject);
        });
    }

    async sendString(str) {
        const buffer = this.encode(str);
        return this.sendBuffer(buffer);
    }

    async sendBuffer(buffer) {
        return new Promise((resolve, reject) => {
            const { writable } = this.#serialport_;
            const writer = writable.getWriter();
            if (!(buffer instanceof Uint8Array)) {
                buffer = new Uint8Array(buffer);
            }
            writer.write(buffer)
                .then(() => {
                    writer.releaseLock();
                    resolve();
                })
                .catch(() => {
                    writer.releaseLock();
                    reject();
                });
        });
    }

    async setDTRAndRTS(dtr, rts) {
        return new Promise((resolve, reject) => {
            if (!this.isOpened()) {
                resolve();
                return;
            }
            this.#serialport_.setSignals({
                dataTerminalReady: dtr,
                requestToSend: rts
            })
            .then(() => {
                super.setDTRAndRTS(dtr, rts);
                resolve();
            })
            .catch(reject);
        });
    }

    async setDTR(dtr) {
        return this.setDTRAndRTS(dtr, this.getRTS());
    }

    async setRTS(rts) {
        return this.setDTRAndRTS(this.getDTR(), rts);
    }

    onBuffer(buffer) {
        super.onBuffer(buffer);
        for (let i = 0; i < buffer.length; i++) {
            super.onByte(buffer[i]);
        }
        const string = this.decodeBuffer(buffer);
        if (!string) {
            return;
        }
        for (let char of string) {
            super.onChar(char);
            if (['\r', '\n'].includes(char)) {
                super.onString(this.#stringTemp_);
                this.#stringTemp_ = '';
            } else {
                this.#stringTemp_ += char;
            }
        }
    }
}

Web.SerialPort = WebSerialPort;

});