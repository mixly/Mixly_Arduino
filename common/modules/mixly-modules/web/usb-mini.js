goog.loadJs('web', () => {

goog.require('Mixly.Serial');
goog.require('Mixly.Registry');
goog.require('Mixly.Web');
goog.provide('Mixly.Web.USBMini');

const {
    Serial,
    Registry,
    Web
} = Mixly;

class USBMini extends Serial {
    static {
        this.type = 'usb';
        this.portToNameRegistry = new Registry();
        this.serialNumberToNameRegistry = new Registry();
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
            const device = await navigator.usb.requestDevice({
                filters: []
            });
            this.addPort(device);
            this.refreshPorts();
        }

        this.getPort = function (name) {
            return this.nameToPortRegistry.getItem(name);
        }

        this.addPort = function (device) {
            if (this.portToNameRegistry.hasKey(device)) {
                return;
            }
            const { serialNumber } = device;
            let name = this.serialNumberToNameRegistry.getItem(serialNumber);
            if (!name) {
                for (let i = 1; i <= 20; i++) {
                    name = `usb${i}`;
                    if (this.nameToPortRegistry.hasKey(name)) {
                        continue;
                    }
                    break;
                }
                this.serialNumberToNameRegistry.register(serialNumber, name);
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
            navigator?.usb?.addEventListener('connect', (event) => {
                this.addPort(event.device);
                this.refreshPorts();
            });

            navigator?.usb?.addEventListener('disconnect', (event) => {
                event.device.onclose && event.device.onclose();
                this.removePort(event.device);
                this.refreshPorts();
            });
        }

        this.init = function () {
            navigator?.usb?.getDevices().then((devices) => {
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
    #serialPolling_ = false;
    #stringTemp_ = '';
    #defaultClass_ = 0xFF;
    #defaultConfiguration_ = 1;
    #endpointIn_ = null;
    #endpointOut_ = null;
    #interfaceNumber_ = 0;
    constructor(port) {
        super(port);
    }

    #addEventsListener_() {
        this.#addReadEventListener_();
    }

    #addReadEventListener_() {
        this.#reader_ = this.#startSerialRead_();

        this.#device_.onclose = () => {
            if (!this.isOpened()) {
                return;
            }
            super.close();
            this.#stringTemp_ = '';
            this.onClose(1);
        }
    }

    async #read_() {
        let result;
        if (this.#endpointIn_) {
            result = await this.#device_.transferIn(this.#endpointIn_, 64);
        } else {
            result = await this.#device_.controlTransferIn({
                requestType: 'class',
                recipient: 'interface',
                request: 0x01,
                value: 0x100,
                index: this.#interfaceNumber_
            }, 64);
        }
        return result?.data;
    }

    async #write_(data) {
        if (this.#endpointOut_) {
            await this.#device_.transferOut(this.#endpointOut_, data);
        } else {
            await this.#device_.controlTransferOut({
                requestType: 'class',
                recipient: 'interface',
                request: 0x09,
                value: 0x200,
                index: this.#interfaceNumber_
            }, data);
        }
    }

    async #startSerialRead_(serialDelay = 1) {
        this.#serialPolling_ = true;
        try {
            while (this.#serialPolling_ ) {
                const data = await this.#read_();
                if (data !== undefined) {
                    const numberArray = Array.prototype.slice.call(new Uint8Array(data.buffer));
                    this.onBuffer(numberArray);
                }
                await new Promise(resolve => setTimeout(resolve, serialDelay));
            }
        } catch (_) {}
    }

    async open(baud) {
        const portsName = Serial.getCurrentPortsName();
        const currentPortName = this.getPortName();
        if (!portsName.includes(currentPortName)) {
            throw new Error('无可用串口');
        }
        if (this.isOpened()) {
            return;
        }
        baud = baud ?? this.getBaudRate();
        this.#device_ = USBMini.getPort(currentPortName);
        await this.#device_.open();
        await this.#device_.selectConfiguration(this.#defaultConfiguration_);
        const interfaces = this.#device_.configuration.interfaces.filter(iface => {
            return iface.alternates[0].interfaceClass === this.#defaultClass_;
        });
        let selectedInterface = interfaces.find(iface => iface.alternates[0].endpoints.length > 0);
        if (!selectedInterface) {
            selectedInterface = interfaces[0];
        }
        this.#interfaceNumber_ = selectedInterface.interfaceNumber;
        const { endpoints } = selectedInterface.alternates[0];
        for (const endpoint of endpoints) {
            if (endpoint.direction === 'in') {
                this.#endpointIn_ = endpoint.endpointNumber;
            } else if (endpoint.direction === 'out') {
                this.#endpointOut_ = endpoint.endpointNumber;
            }
        }
        await this.#device_.claimInterface(this.#interfaceNumber_);
        await this.setBaudRate(baud);
        super.open(baud);
        this.onOpen();
        this.#addEventsListener_();
    }

    async close() {
        if (!this.isOpened()) {
            return;
        }
        this.#serialPolling_ = false;
        super.close();
        await this.#device_.close();
        if (this.#reader_) {
            await this.#reader_;
        }
        this.#device_ = null;
        this.onClose(1);
    }

    async setBaudRate(baud) {
        if (!this.isOpened() || this.getBaudRate() === baud) {
            return;
        }
        await super.setBaudRate(baud);
    }

    async sendString(str) {
        const buffer = this.encode(str);
        return this.sendBuffer(buffer);
    }

    async sendBuffer(buffer) {
        if (typeof buffer.unshift === 'function') {
            // buffer.unshift(buffer.length);
            buffer = new Uint8Array(buffer).buffer;
        }
        return this.#write_(buffer);
    }

    async setDTRAndRTS(dtr, rts) {
        if (!this.isOpened()
            || (this.getDTR() === dtr && this.getRTS() === rts)) {
            return;
        }
        await super.setDTRAndRTS(dtr, rts);
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

Web.USBMini = USBMini;

});