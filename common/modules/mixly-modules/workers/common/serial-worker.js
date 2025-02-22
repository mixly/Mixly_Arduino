class SerialWorker {
    #receiveBuffer_ = [];
    #bufferLength_ = 0;
    #encoder_ = new TextEncoder();
    #decoder_ = new TextDecoder('utf-8');
    #baud_ = 115200;
    #dtr_ = false;
    #rts_ = false;
    #isOpened_ = false;
    #port_ = '';
    constructor(port) {
        this.#port_ = port;
        this.resetBuffer();
    }

    decodeBuffer(buffer) {
        let output = '';
        for (let i in buffer) {
            output += this.decodeByte();
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
        if ((byte & 0x80) === 0x00) {
            // 1字节
            this.#receiveBuffer_ = [];
            this.#bufferLength_ = 0;
            output += String.fromCharCode(byte);
        } else if ((byte & 0xc0) === 0x80) {
            /*
            * 2字节以上的中间字节，10xxxxxx
            * 如果没有起始头，则丢弃这个字节
            * 如果不是2字节及以上的起始头，则丢弃这个字节
            **/
            if (!this.#receiveBuffer_.length || this.#bufferLength_ < 2) {
                return output;
            }
            this.#receiveBuffer_.push(byte);
            if (this.#bufferLength_ === this.#receiveBuffer_.length) {
                output += this.#decoder_.decode(new Uint8Array(this.#receiveBuffer_));
                this.#receiveBuffer_ = [];
            }
        } else {
            // 2字节以上的起始头
            if (this.#receiveBuffer_) {
                this.#receiveBuffer_ = [];
            }
            this.#bufferLength_ = this.#getBufferLength_(byte);
            this.#receiveBuffer_.push(byte);
        }
        return output;
    }

    #getBufferLength_(data) {
        let len = 2;
        if ((data & 0xFC) === 0xFC) {
            len = 6;
        } else if ((data & 0xF8) === 0xF8) {
            len = 5;
        } else if ((data & 0xF0) === 0xF0) {
            len = 4;
        } else if ((data & 0xE0) === 0xE0) {
            len = 3;
        } else if ((data & 0xC0) === 0xC0) {
            len = 2;
        }
        return len;
    }

    resetBuffer() {
        this.#receiveBuffer_ = [];
        this.#bufferLength_ = 0;
    }

    open() {}

    close() {}

    toggle() {
        if (this.isOpened()) {
            this.close();
        } else {
            this.open();
        }
    }

    setBaudRate(baud) {
        this.#baud_ = baud;
    }

    setDTR(dtr) {
        this.#dtr_ = dtr;
    }

    setRTS(rts) {
        this.#rts_ = rts;
    }

    setDTRAndRTS(dtr, rts) {
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

    sendString(str) {}

    sendBuffer(buffer) {}

    onBuffer(buffer) {
        const data = this.decodeBuffer(buffer);
        if (!data) {
            return;
        }
        self.postMessage({
            port: this.getPortName(),
            event: 'onBuffer',
            message: data
        });
    }

    onOpen() {
        this.#isOpened_ = true;
        self.postMessage({
            port: this.getPortName(),
            event: 'onOpen'
        });
    }

    onClose(code) {
        this.#isOpened_ = false;
        self.postMessage({
            port: this.getPortName(),
            event: 'onClose',
            message: code
        });
    }

    onError(error) {
        self.postMessage({
            port: this.getPortName(),
            event: 'onError',
            message: error
        });
    }

    isOpened() {
        return this.#isOpened_;
    }

    config(info) {
        if (typeof info !== Object) {
            return;
        }
        this.#baud_ = info.baud;
        this.setBaudRate(this.#baud_);
        this.#dtr_ = info.dtr;
        this.setDTR(this.#dtr_);
        this.#rts_ = info.rts;
        this.setDTR(this.#rts_);
    }
}