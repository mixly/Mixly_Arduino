goog.loadJs('common', () => {

goog.require('Mixly.Config');
goog.require('Mixly.Events');
goog.require('Mixly.Nav');
goog.require('Mixly.Msg');
goog.provide('Mixly.Serial');

const {
    Config,
    Events,
    Nav,
    Msg
} = Mixly;

const { BOARD } = Config;


class Serial {
    static {
        this.portsName = [];
        this.DEFAULT_CONFIG = {
            ctrlCBtn: false,
            ctrlDBtn: false,
            baudRates: 9600,
            yMax: 100,
            yMin: 0,
            pointNum: 100,
            rts: true,
            dtr: true
        };
        this.AVAILABEL_BAUDS = [
            300, 600, 750, 1200, 2400, 4800, 9600, 19200, 31250, 38400, 57600,
            74880, 115200, 230400, 250000, 460800, 500000, 921600, 1000000, 2000000,
        ];

        this.getSelectedPortName = function () {
            return Nav.getMain().getPortSelector().val();
        }

        this.getCurrentPortsName = function () {
            return this.portsName;
        }

        this.getConfig = function () {
            let config = BOARD?.serial ?? {};
            return {
                ...this.DEFAULT_CONFIG,
                ...config
            };
        }

        this.portIsLegal = function (port) {
            return this.portsName.includes(port);
        }

        /**
         * @function 重新渲染串口下拉框
         * @param {array} 当前可用的所有串口
         * @return {void}
         **/
        this.renderSelectBox = function (ports) {
            const $portSelector = Nav.getMain().getPortSelector();
            const selectedPort = $portSelector.val();
            $portSelector.empty();
            if (ports.length) {
                let portsName = [];
                ports.map(port => {
                    portsName.push(port.name);
                });
                portsName.sort();
                this.portsName = portsName;
                portsName.map(name => {
                    let newOption = new Option(name, name);
                    if (selectedPort === name) {
                        newOption.setAttribute('selected', true);
                    }
                    $portSelector.append(newOption);
                });
            } else {
                this.portsName = [];
                let newOption = new Option(Msg.Lang['statusbar.serial.noPort']);
                newOption.setAttribute('disabled', true);
                $portSelector.append(newOption);
            }
            $portSelector.select2('close');
            $portSelector.trigger('change');
            let footerStatus = ports.length ? 'inline-flex' : 'none';
            $('#mixly-footer-port-div').css('display', footerStatus);
            $('#mixly-footer-port').html($portSelector.val());
        }
    }

    #buffer_ = [];
    #bufferLength_ = 0;
    #encoder_ = new TextEncoder('utf8');
    #decoder_ = new TextDecoder('utf8');
    #baud_ = 115200;
    #dtr_ = false;
    #rts_ = false;
    #isOpened_ = false;
    #port_ = '';
    #special_ = [];
    #specialLength_ = 0;
    #events_ = new Events(['onOpen', 'onClose', 'onError', 'onBuffer', 'onString', 'onByte', 'onChar']);
    constructor(port) {
        this.#port_ = port;
        this.resetBuffer();
    }

    decodeBuffer(buffer) {
        let output = '';
        for (let i = 0; i < buffer.length; i++) {
            output += this.decodeByte(buffer[i]);
        }
        return output;
    }

    /*  UTF-8编码方式
    *   ------------------------------------------------------------
    *   |1字节 0xxxxxxx                                             |
    *   |2字节 110xxxxx 10xxxxxx                                    |
    *   |3字节 1110xxxx 10xxxxxx 10xxxxxx                           |
    *   |4字节 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx                  |
    *   |5字节 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx         |
    *   |6字节 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx|
    *   ------------------------------------------------------------
    **/
    decodeByte(byte) {
        let output = '';
        if (byte !== 0x5F && this.#special_.length && !this.#specialLength_) {
            const str = this.#special_.join('');
            try {
                output += decodeURIComponent(str.replace(/_([0-9a-fA-F]{2})/gm, '%$1'));
            } catch (_) {
                output += str;
            }
            this.#special_ = [];
        }
        if ((byte & 0x80) === 0x00) {
            // 1字节
            this.#buffer_ = [];
            this.#bufferLength_ = 0;
            if (byte === 0x5F) {
                // 如果当前字节是 "_"
                this.#specialLength_ = 2;
                this.#special_.push(String.fromCharCode(byte));
            } else if (byte !== 0x0D) {
                // 如果当前字节不是 "\r"
                if  (this.#specialLength_) {
                    this.#specialLength_--;
                    this.#special_.push(String.fromCharCode(byte));
                } else {
                    output += String.fromCharCode(byte);
                }
            }
        } else if ((byte & 0xC0) === 0x80) {
            /*
            * 2字节以上的中间字节，10xxxxxx
            * 如果没有起始头，则丢弃这个字节
            * 如果不是2字节及以上的起始头，则丢弃这个字节
            **/
            if (!this.#buffer_.length || this.#bufferLength_ < 2) {
                return output;
            }
            this.#buffer_.push(byte);
            if (this.#bufferLength_ === this.#buffer_.length) {
                output += this.decode(new Uint8Array(this.#buffer_));
                this.#buffer_ = [];
            }
        } else {
            // 2字节以上的起始头
            if (this.#buffer_.length) {
                this.#buffer_ = [];
            }
            this.#bufferLength_ = this.#getBufferLength_(byte);
            this.#buffer_.push(byte);
        }
        return output;
    }

    #getBufferLength_(byte) {
        let len = 1;
        if ((byte & 0xFC) === 0xFC) {
            len = 6;
        } else if ((byte & 0xF8) === 0xF8) {
            len = 5;
        } else if ((byte & 0xF0) === 0xF0) {
            len = 4;
        } else if ((byte & 0xE0) === 0xE0) {
            len = 3;
        } else if ((byte & 0xC0) === 0xC0) {
            len = 2;
        }
        return len;
    }

    resetBuffer() {
        this.#buffer_ = [];
        this.#bufferLength_ = 0;
    }

    async open(baud) {
        this.#isOpened_ = true;
    }

    async close() {
        this.#isOpened_ = false;
    }

    async toggle() {
        if (this.isOpened()) {
            return this.close();
        } else {
            return this.open();
        }
    }

    baudRateIsLegal(baud) {
        return Serial.AVAILABEL_BAUDS.includes(baud);
    }

    async setBaudRate(baud) {
        this.#baud_ = baud;
    }

    async setDTR(dtr) {
        this.#dtr_ = dtr;
    }

    async setRTS(rts) {
        this.#rts_ = rts;
    }

    async setDTRAndRTS(dtr, rts) {
        this.#dtr_ = dtr;
        this.#rts_ = rts;
    }

    getPortName() {
        return this.#port_;
    }

    getBaudRate() {
        return this.#baud_;
    }

    getDTR() {
        return this.#dtr_;
    }

    getRTS() {
        return this.#rts_;
    }

    async sendString(str) {}

    async sendBuffer(buffer) {}

    async interrupt() {
        return this.sendBuffer([3]);
    }

    async reset() {
        return this.sendBuffer([4]);
    }

    onBuffer(buffer) {
        this.#events_.run('onBuffer', buffer);
    }

    onString(string) {
        this.#events_.run('onString', string);
    }

    onByte(byte) {
        this.#events_.run('onByte', byte);
    }

    onChar(char) {
        this.#events_.run('onChar', char);
    }

    onOpen() {
        this.#isOpened_ = true;
        this.#events_.run('onOpen');
    }

    onClose(code) {
        this.#isOpened_ = false;
        this.#events_.run('onClose', code);
    }

    onError(error) {
        this.#events_.run('onError', error);
    }

    isOpened() {
        return this.#isOpened_;
    }

    encode(str) {
        return this.#encoder_.encode(str);
    }

    decode(uint8Array) {
        return this.#decoder_.decode(uint8Array);
    }

    async config(info) {
        return Promise.all([
            this.setBaudRate(info.baud),
            this.setDTRAndRTS(info.dtr, info.rts)
        ]);
    }

    async sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async dispose() {
        this.#events_.reset();
        if (this.isOpened()) {
            await this.close();
        }
    }

    bind(type, func) {
        return this.#events_.bind(type, func);
    }

    unbind(id) {
        this.#events_.unbind(id);
    }

    addEventsType(eventsType) {
        this.#events_.addType(eventsType);
    }

    runEvent(eventsType, ...args) {
        return this.#events_.run(eventsType, ...args);
    }

    offEvent(eventsType) {
        this.#events_.off(eventsType);
    }

    resetEvent() {
        this.#events_.reset();
    }
}

Mixly.Serial = Serial;

});