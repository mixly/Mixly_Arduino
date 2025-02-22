importScripts('../common/serial-worker.js');
const child_process = require('node:child_process');
const serialport = require('serialport');

const {
    SerialPort,
    ReadlineParser,
    ByteLengthParser
} = serialport;

const portsOperator = {};

class NodeSerialWorker extends SerialWorker {
    #serialport_ = null;
    #parserBytes_ = null;
    constructor(port) {
        super(port);
    }

    #addEventsListener_() {
        this.#parserBytes_.on('data', (buffer) => {
            this.onBuffer(buffer);
        });

        this.#serialport_.on('error', (error) => {
            this.onError(error);
            this.onClose(1);
        });

        this.#serialport_.on('open', () => {
            this.onOpen();
        });

        this.#serialport_.on('close', () => {
            this.onClose(1);
        });
    }

    open() {
        super.open();
        this.#serialport_ = new SerialPort({
            path: this.getPortName(),
            baudRate: this.getBaudRate() - 0,  // 波特率
            dataBits: 8,  // 数据位
            parity: 'none',  // 奇偶校验
            stopBits: 1,  // 停止位
            flowControl: false,
            autoOpen: false  // 不自动打开
        }, false);
        this.#parserBytes_ = this.#serialport_.pipe(new ByteLengthParser({ length: 1 }));
        this.#serialport_.open((error) => {
            if (error) {
                this.onError(error);
                // this.onClose(1);
            }
        });
        this.#addEventsListener_();
    }

    close() {
        super.close();
        if (this.isOpened()) {
            try {
                this.#serialport_.close();
            } catch (error) {
                console.log(error);
            }
        }
    }

    onBuffer(buffer) {
        super.onBuffer(buffer);
    }
}

const create = (port) => {
    if (!portsOperator[port]) {
        portsOperator[port] = new NodeSerialWorker(port);
    }
    portsOperator[port].open();
}

self.addEventListener('message', function(event) {
    console.log(event.data);
    const { port, type } = event.data;
    if (type === 'open') {
        create(port);
    } else if (type === 'close') {
        portsOperator[port] && portsOperator[port].close();
    }
});