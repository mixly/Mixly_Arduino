goog.loadJs('web', () => {

goog.require('Mixly.Serial');
goog.require('Mixly.Registry');
goog.require('Mixly.Web');
goog.provide('Mixly.Web.HID');

const {
    Serial,
    Registry,
    Web
} = Mixly;


class WebHID extends Serial {
    static {
        this.type = 'hid';
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
            const devices = await navigator.hid.requestDevice({
                filters: []
            });
            if (!devices.length) {
                return;
            }
            for (let device of devices) {
                this.addPort(device);
            }
            this.refreshPorts();
        }

        this.getPort = function (name) {
            return this.nameToPortRegistry.getItem(name);
        }

        this.addPort = function (device) {
            if (this.portToNameRegistry.hasKey(device)) {
                return;
            }
            let name = '';
            for (let i = 1; i <= 20; i++) {
                name = `hid${i}`;
                if (this.nameToPortRegistry.hasKey(name)) {
                    continue;
                }
                break;
            }
            this.portToNameRegistry.register(device, name);
            this.nameToPortRegistry.register(name, device);
        }

        this.removePort = function (device) {
            if (!this.portToNameRegistry.hasKey(device)) {
                return;
            }
            const name = this.portToNameRegistry.getItem(device);
            if (!name) {
                return;
            }
            this.portToNameRegistry.unregister(device);
            this.nameToPortRegistry.unregister(name);
        }

        this.addEventsListener = function () {
            navigator?.hid?.addEventListener('connect', (event) => {
                this.addPort(event.device);
                this.refreshPorts();
            });

            navigator?.hid?.addEventListener('disconnect', (event) => {
                event.device.onclose && event.device.onclose();
                this.removePort(event.device);
                this.refreshPorts();
            });
        }

        this.init = function () {
            navigator?.hid?.getDevices().then((devices) => {
                for (let device of devices) {
                    this.addPort(device);
                }
            });
            this.addEventsListener();
        }
    }

    #device_ = null;
    #keepReading_ = null;
    #reader_ = null;
    #writer_ = null;
    #stringTemp_ = '';
    constructor(port) {
        super(port);
    }

    #addEventsListener_() {
        this.#device_.oninputreport = (event) => {
            const { data } = event;
            const length = Math.min(data.getUint8(0) + 1, data.byteLength);
            let buffer = [];
            for (let i = 1; i < length; i++) {
                buffer.push(data.getUint8(i));
            }
            this.onBuffer(buffer);
        };

        this.#device_.onclose = () => {
            if (!this.isOpened()) {
                return;
            }
            super.close();
            this.#stringTemp_ = '';
            this.onClose(1);
        }
    }

    async open(baud) {
        return new Promise((resolve, reject) => {
            const portsName = Serial.getCurrentPortsName();
            const currentPortName = this.getPortName();
            if (!portsName.includes(currentPortName)) {
                reject('无可用设备');
                return;
            }
            if (this.isOpened()) {
                resolve();
                return;
            }
            baud = baud ?? this.getBaudRate();
            this.#device_ = WebHID.getPort(currentPortName);
            this.#device_.open()
                .then(() => {
                    super.open(baud);
                    super.setBaudRate(baud);
                    this.onOpen();
                    this.#addEventsListener_();
                    resolve();
                })
                .catch(reject);
        });
    }

    async close() {
        if (!this.isOpened()) {
            return;
        }
        super.close();
        await this.#device_.close();
        this.#stringTemp_ = '';
        this.#device_.oninputreport = null;
        this.#device_.onclose = null;
        this.onClose(1);
    }

    async setBaudRate(baud) {
        return Promise.resolve();
    }

    async sendString(str) {
        const buffer = this.encode(str);
        return this.sendBuffer(buffer);
    }

    async sendBuffer(buffer) {
        return new Promise((resolve, reject) => {
            if (buffer instanceof Uint8Array) {
                let temp = new Uint8Array(buffer.length + 1);
                temp[0] = buffer.length;
                temp.set(buffer, 1);
                buffer = temp;
            } else {
                buffer.unshift(buffer.length);
                buffer = new Uint8Array(buffer);
            }
            this.#device_.sendReport(0, buffer)
                .then(resolve)
                .catch(reject);
        });
    }

    async setDTRAndRTS(dtr, rts) {
        return Promise.resolve();
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

Web.HID = WebHID;

});