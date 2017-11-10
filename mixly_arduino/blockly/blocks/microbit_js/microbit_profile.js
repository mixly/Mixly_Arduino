var profile = {
    microbit: {
        description: "microbit_js",
        digital: [["P0", "DigitalPin.P0"], ["P1", "DigitalPin.P1"], ["P2", "DigitalPin.P2"], ["P3", "DigitalPin.P3"], ["P4", "DigitalPin.P4"], ["P5", "DigitalPin.P5"], ["P6", "DigitalPin.P6"], ["P7", "DigitalPin.P7"], ["P8", "DigitalPin.P8"], ["P9", "DigitalPin.P9"], ["P10", "DigitalPin.P10"], ["P11", "DigitalPin.P11"], ["P12", "DigitalPin.P12"], ["P13", "DigitalPin.P13"], ["P14", "DigitalPin.P14"], ["P15", "DigitalPin.P15"], ["P16", "DigitalPin.P16"], ["P17", "DigitalPin.P17"], ["P18", "DigitalPin.P18"], ["P19", "DigitalPin.P19"], ["P20", "DigitalPin.P20"]],
        pwm: [["P0", "AnalogPin.P0"], ["P1", "AnalogPin.P1"], ["P2", "AnalogPin.P2"], ["P3", "AnalogPin.P3"], ["P4", "AnalogPin.P4"], ["P5", "AnalogPin.P5"], ["P6", "AnalogPin.P6"], ["P7", "AnalogPin.P7"], ["P8", "AnalogPin.P8"], ["P9", "AnalogPin.P9"], ["P10", "AnalogPin.P10"], ["P11", "AnalogPin.P11"], ["P12", "AnalogPin.P12"], ["P13", "AnalogPin.P13"], ["P14", "AnalogPin.P14"], ["P15", "AnalogPin.P15"], ["P16", "AnalogPin.P16"], ["P19", "AnalogPin.P19"], ["P20", "AnalogPin.P20"]],
        analog: [["P0", "AnalogPin.P0"], ["P1", "AnalogPin.P1"], ["P2", "AnalogPin.P2"], ["P3", "AnalogPin.P3"], ["P4", "AnalogPin.P4"], ["P10", "AnalogPin.P10"]],
        interrupt: [["P0", "TouchPin.P0"], ["P1", "TouchPin.P1"], ["P2", "TouchPin.P2"]],
        button:[["A", "Button.A"], ["B", "Button.B"], ['A+B', 'Button.AB']],
        serial_pin: [["P0", "SerialPin.P0"], ["P1", "SerialPin.P1"], ["P2", "SerialPin.P2"], ["P8", "SerialPin.P8"], ["P12", "SerialPin.P12"], ["P13", "SerialPin.P13"], ["P14", "SerialPin.P14"], ["P15", "SerialPin.P15"], ["P16", "SerialPin.P16"]],
    }
};

profile["default"] = profile["microbit"];