goog.loadJs('web', () => {

goog.require('Mixly.Config');
goog.require('Mixly.Env');
goog.require('Mixly.Web.SerialPort');
goog.require('Mixly.Web.USB');
goog.require('Mixly.Web.USBMini');
goog.require('Mixly.Web.HID');
goog.provide('Mixly.Web.Serial');

const { Config, Env, Web } = Mixly;

const {
    SerialPort,
    USB,
    USBMini,
    HID
} = Web;

const { BOARD } = Config;

let Device = SerialPort;
const platform = goog.platform();
const fullPlatform = goog.fullPlatform();

if (platform === 'win32' && fullPlatform !== 'win10') {
    if (BOARD?.web?.devices?.hid) {
        Device = HID;
    } else if (BOARD?.web?.devices?.serial) {
        Device = SerialPort;
    } else if (BOARD?.web?.devices?.usb) {
        if (['BBC micro:bit', 'Mithon CC'].includes(BOARD.boardType)) {
            Device = USB;
        } else {
            Device = USBMini;
        }
    }
} else if (platform === 'mobile') {
    if (['BBC micro:bit', 'Mithon CC'].includes(BOARD.boardType)) {
        Device = USB;
    } else {
        Device = USBMini;
    }
} else {
    if (BOARD?.web?.devices?.serial) {
        Device = SerialPort;
    } else if (BOARD?.web?.devices?.usb) {
        if (['BBC micro:bit', 'Mithon CC'].includes(BOARD.boardType)) {
            Device = USB;
        } else {
            Device = USBMini;
        }
    } else if (BOARD?.web?.devices?.hid) {
        Device = HID;
    }
}


class WebSerial extends Device {
    static {
        this.type = Device.type;

        this.getConfig = function () {
            return Device.getConfig();
        }

        this.getSelectedPortName = function () {
            return Device.getSelectedPortName();
        }

        this.getCurrentPortsName = function () {
            return Device.getCurrentPortsName();
        }

        this.refreshPorts = function () {
            return Device.refreshPorts();
        }

        this.requestPort = async function () {
            return Device.requestPort();
        }

        this.getPort = function (name) {
            return Device.getPort(name);
        }

        this.addPort = function (device) {
            return Device.addPort(device);
        }

        this.removePort = function (device) {
            return Device.removePort(device);
        }

        this.addEventsListener = function () {
            return Device.addEventsListener();
        }

        this.init = function () {
            if (!Env.hasSocketServer) {
                Device.init();
            }
        }

        this.init();
    }

    constructor(port) {
        super(port);
    }
}


Web.Serial = WebSerial;

});