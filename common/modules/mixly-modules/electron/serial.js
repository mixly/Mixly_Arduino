goog.loadJs('electron', () => {

goog.require('Mixly.Serial');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Debug');
goog.require('Mixly.MArray');
goog.require('Mixly.Config');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.Serial');

const child_process = Mixly.require('node:child_process');
const serialport = Mixly.require('serialport');

const {
    SerialPort,
    ReadlineParser,
    ByteLengthParser
} = serialport;

const {
    Serial,
    Env,
    Msg,
    Debug,
    MArray,
    Config,
    Electron
} = Mixly;

const { BOARD } = Config;


class ElectronSerial extends Serial {
    static {
        this.getConfig = function () {
            return Serial.getConfig();
        }

        this.getSelectedPortName = function () {
            return Serial.getSelectedPortName();
        }

        this.getCurrentPortsName = function () {
            return Serial.getCurrentPortsName();
        }

        this.getPorts = async function () {
            return new Promise((resolve, reject) => {
                if (Env.currentPlatform === 'linux') {
                    child_process.exec('ls /dev/ttyACM* /dev/tty*USB*', (err, stdout, stderr) => {
                        let portsName = MArray.unique(stdout.split('\n'));
                        let newPorts = [];
                        for (let i = 0; i < portsName.length; i++) {
                            if (!portsName[i]) {
                                continue;
                            }
                            newPorts.push({
                                vendorId: 'None',
                                productId: 'None',
                                name: portsName[i]
                            });
                        }
                        resolve(newPorts);
                    });
                } else {
                    SerialPort.list().then(ports => {
                        let newPorts = [];
                        for (let i = 0; i < ports.length; i++) {
                            let port = ports[i];
                            newPorts.push({
                                vendorId: port.vendorId,
                                productId: port.productId,
                                name: port.path
                            });
                        }
                        resolve(newPorts);
                    }).catch(reject);
                }
            });
        }

        this.refreshPorts = function () {
            this.getPorts()
            .then((ports) => {
                Serial.renderSelectBox(ports);
            })
            .catch(Debug.error);
        }
    }

    #serialport_ = null;
    #parserBytes_ = null;
    #parserLine_ = null;

    constructor(port) {
        super(port);
    }

    #addEventsListener_() {
        this.#parserBytes_.on('data', (buffer) => {
            this.onBuffer(buffer);
        });

        this.#parserLine_.on('data', (str) => {
            this.onString(str);
        });

        this.#serialport_.on('error', (error) => {
            this.onError(String(error));
            this.onClose(1);
        });

        this.#serialport_.on('open', () => {
            this.onOpen();
        });

        this.#serialport_.on('close', () => {
            this.onClose(1);
        });
    }

    async open(baud) {
        return new Promise((resolve, reject) => {
            const portsName = Serial.getCurrentPortsName();
            const currentPort = this.getPortName();
            if (!portsName.includes(currentPort)) {
                reject('无可用串口');
                return;
            }
            if (this.isOpened()) {
                resolve();
                return;
            }
            baud = baud ?? this.getBaudRate();
            
            this.#serialport_ = new SerialPort({
                path: currentPort,
                baudRate: baud,  // 波特率
                dataBits: 8,  // 数据位
                parity: 'none',  // 奇偶校验
                stopBits: 1,  // 停止位
                flowControl: false,
                autoOpen: false,  // 不自动打开
                rtscts: BOARD?.serial?.rts ?? false
            }, false);
            this.#parserBytes_ = this.#serialport_.pipe(new ByteLengthParser({ length: 1 }));
            this.#parserLine_ = this.#serialport_.pipe(new ReadlineParser());
            this.#serialport_.open((error) => {
                if (error) {
                    this.onError(error);
                    reject(error);
                } else {
                    super.open(baud);
                    this.setBaudRate(baud);
                    resolve();
                }
            });
            this.#addEventsListener_();
        });
    }

    async close() {
        return new Promise((resolve, reject) => {
            if (!this.isOpened()) {
                resolve();
                return;
            }
            super.close();
            this.#serialport_.close((error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    async setBaudRate(baud) {
        return new Promise((resolve, reject) => {
            if (!this.isOpened()
                || this.getBaudRate() === baud
                || !this.baudRateIsLegal(baud)) {
                resolve();
                return;
            }
            this.#serialport_.update({ baudRate: baud }, (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                super.setBaudRate(baud);
                this.setDTRAndRTS(this.getDTR(), this.getRTS()).finally(resolve);
            });
        });
    }

    async send(data) {
        return new Promise((resolve, reject) => {
            if (!this.isOpened()) {
                resolve();
                return;
            }
            this.#serialport_.write(data, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    async sendString(str) {
        return this.send(str);
    }

    async sendBuffer(buffer) {
        return this.send(buffer);
    }

    async setDTRAndRTS(dtr, rts) {
        return new Promise((resolve, reject) => {
            if (!this.isOpened()) {
                resolve();
                return;
            }
            this.#serialport_.set({ dtr, rts }, (error) => {
                if (error) {
                    reject(error);
                } else {
                    super.setDTRAndRTS(dtr, rts);
                    resolve();
                }
            });
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
        }
    }
}

Electron.Serial = ElectronSerial;

});