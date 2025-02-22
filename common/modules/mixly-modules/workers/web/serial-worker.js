// importScripts('../../web-modules/workerpool.min.js');
const workerpool = require('../../web-modules/workerpool.min.js');

const encoder = new TextEncoder();
const decoder = new TextDecoder('utf-8');

class SerialWorker {
    constructor(serial) {
        this.serial = serial;
        this.receiveBuffer = [];
        this.receiveStr = '';
        this.bufferLength = 0;
        const test = setInterval(() => {
            const message = generateRandomString(5);
            this.onData(encoder.encode(message));
        }, 1000);
        setTimeout(() => {
            clearInterval(test);
        }, 120 * 1000);
    }

    onOpen() {

    }

    onData(data) {
        /*  UTF-8编码方式
        *   ------------------------------------------------------------
        *   |1字节 0xxxxxxx                                             |
        *   |2字节 110xxxxx 10xxxxxx                                    |
        *   |3字节 1110xxxx 10xxxxxx 10xxxxxx                           |
        *   |4字节 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx                  |
        *   |5字节 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx         |
        *   |6字节 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx|
        *   ------------------------------------------------------------
        */
        for (let i in data) {
            if ((data[i] & 0x80) === 0x00) {
                // 1字节
                this.receiveBuffer = [];
                this.bufferLength = 0;
                this.receiveStr += String.fromCharCode(data[i]);
            } else if ((data[i] & 0xc0) === 0x80) {
                // 2字节以上的中间字节，10xxxxxx
                // 如果没有起始头，则丢弃这个字节
                if (!this.receiveBuffer.length) {
                    return;
                }
                // 如果不是2字节及以上的起始头，则丢弃这个字节
                if (this.bufferLength < 2) {
                    return;
                }
                this.receiveBuffer.push(data[i]);
                if (this.bufferLength === this.receiveBuffer.length) {
                    this.receiveStr += decoder.decode(new Uint8Array(this.receiveBuffer));
                    this.receiveBuffer = [];
                }
            } else {
                // 2字节以上的起始头
                if (this.receiveBuffer) {
                    this.receiveBuffer = [];
                }
                this.bufferLength = this.#getBufferLength(data[i]);
                this.receiveBuffer.push(data[i]);
            }
        }
    }

    onError() {

    }

    onClose() {

    }

    #getBufferLength(data) {
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
}

const createSerialWork = function(serial) {
    return new Promise((resolve, reject) => {
        console.log(serial)
        const serialWork = new SerialWorker(serial);
        const test = setInterval(() => {
            const data = serialWork.receiveStr;
            serialWork.receiveStr = '';
            workerpool.workerEmit({
                status: 'data',
                data: data
            });
        }, 5000);
        setTimeout(() => {
            workerpool.workerEmit({
                status: 'close'
            });
            resolve();
        }, 120 * 1000);
    });
}

function generateRandomString() {
  return '1234';
}


workerpool.worker({
    createSerialWork,
    generateRandomString
});