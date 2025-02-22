goog.loadJs('web', () => {

goog.require('Mixly.Web');
goog.provide('Mixly.Web.Bluetooth');

const { Web } = Mixly;
const { Bluetooth } = Web;

Bluetooth.output = [];
Bluetooth.mtu = 100;
Bluetooth.encoder = new TextEncoder('utf-8');
Bluetooth.decoder = new TextDecoder('utf-8');
Bluetooth.nordicUartServiceUuid = 0xfff0;
Bluetooth.uartRxCharacteristicUuid = 0xfff2;
Bluetooth.uartTxCharacteristicUuid = 0xfff1;
Bluetooth.obj = null;
Bluetooth.server = null;
Bluetooth.service = null;
Bluetooth.uartRxCharacteristic = null;
Bluetooth.uartTxCharacteristic = null;
Bluetooth.name = 'bluetooth';

Bluetooth.connect = (baud = 115200, onDataLine = (message) => {}) => {
    return new Promise((resolve, reject) => {
        if (Bluetooth.isConnected()) {
            resolve();
            return;
        }
        navigator.bluetooth.requestDevice({
            // filters: [{name: ['Mixly']}]
            optionalServices: [Bluetooth.nordicUartServiceUuid],
            acceptAllDevices: true
        })
        .then((device) => {
            Bluetooth.obj = device;
            return device.gatt.connect();
        })
        .then((server) => {
            Bluetooth.server = server;
            return server.getPrimaryService(Bluetooth.nordicUartServiceUuid);
        })
        .then((service) => {
            Bluetooth.service = service;
            return service.getCharacteristic(Bluetooth.uartRxCharacteristicUuid);
        })
        .then((uartRxCharacteristic) => {
            Bluetooth.uartRxCharacteristic = uartRxCharacteristic;
            return Bluetooth.service.getCharacteristic(Bluetooth.uartTxCharacteristicUuid);
        })
        .then((uartTxCharacteristic) => {
            Bluetooth.uartTxCharacteristic = uartTxCharacteristic;
            return uartTxCharacteristic.startNotifications();
        })
        .then(() => {
            Bluetooth.onDataLine = onDataLine;
            Bluetooth.addReadEvent(onDataLine);
            resolve();
        })
        .catch((error) => {
            Bluetooth.obj = null;
            Bluetooth.server = null;
            Bluetooth.service = null;
            Bluetooth.uartRxCharacteristic = null;
            Bluetooth.uartTxCharacteristic = null;
            reject(error);
        });
    });
}

Bluetooth.close = async () => {
    if (Bluetooth.isConnected()) {
        await Bluetooth.obj.gatt.disconnect();
        Bluetooth.obj = null;
        Bluetooth.server = null;
        Bluetooth.service = null;
        Bluetooth.uartRxCharacteristic = null;
        Bluetooth.uartTxCharacteristic = null;
    }
}

Bluetooth.isConnected = () => {
    return Bluetooth.obj && Bluetooth.obj.gatt.connected;
}

Bluetooth.addReadEvent = (onDataLine = (message) => {}) => {
    Bluetooth.uartTxCharacteristic.addEventListener('characteristicvaluechanged', event => {
        let data = Bluetooth.decoder.decode(event.target.value);
        let dataList = data.split('\n');
        if (!dataList.length) {
            return;
        }
        let endStr = '';
        if (Bluetooth.output.length) {
            endStr = Bluetooth.output.pop();
            Bluetooth.output.push(endStr + dataList.shift());
            if (dataList.length) {
                // console.log(Bluetooth.output[Bluetooth.output.length - 1]);
                onDataLine(Bluetooth.output[Bluetooth.output.length - 1]);
            }
        }
        let i = 0;
        for (let value of dataList) {
            i++;
            Bluetooth.output.push(value);
            if (i < dataList.length) {
                // console.log(value);
                onDataLine(value);
            }
        }
        while (Bluetooth.output.length > 500) {
            Bluetooth.output.shift();
        }
    });
}

Bluetooth.AddOnConnectEvent = (onConnect) => {
}

Bluetooth.AddOnDisconnectEvent = (onDisconnect) => {
    Bluetooth.obj.addEventListener('gattserverdisconnected', () => {
        onDisconnect();
    });
}

Bluetooth.writeString = async (str) => {
    let buffer = Bluetooth.encoder.encode(str);
    await Bluetooth.writeByteArr(buffer);
}

Bluetooth.writeByteArr = async (buffer) => {
    buffer = new Uint8Array(buffer);
    for (let chunk = 0; chunk < Math.ceil(buffer.length / Bluetooth.mtu); chunk++) {
        let start = Bluetooth.mtu * chunk;
        let end = Bluetooth.mtu * (chunk + 1);
        await Bluetooth.uartRxCharacteristic.writeValueWithResponse(buffer.slice(start, end))
        .catch(error => {
            if (error == "NetworkError: GATT operation already in progress.") {
                Bluetooth.writeByteArr(buffer);
            }
            else {
                return Promise.reject(error);
            }
        });
    }
    await Bluetooth.sleep(200);
}

Bluetooth.writeCtrlA = async () => {
    await Bluetooth.writeByteArr([1, 13, 10]);
}

Bluetooth.writeCtrlB = async () => {
    await Bluetooth.writeByteArr([2, 13, 10]);
}

Bluetooth.writeCtrlC = async () => {
    await Bluetooth.writeByteArr([3, 13, 10]);
}

Bluetooth.writeCtrlD = async () => {
    await Bluetooth.writeByteArr([3, 4]);
}

Bluetooth.write = async (type, data, dataTail) => {
    switch (type) {
        case 'string':
            return Bluetooth.writeString(data + dataTail);
            break;
        default:
            await Bluetooth.writeByteArr(data);
            return Bluetooth.writeString(dataTail);
    }
}

Bluetooth.setSignals = async (dtr, rts) => {
}

Bluetooth.setBaudRate = async (baud) => {
}

Bluetooth.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

});