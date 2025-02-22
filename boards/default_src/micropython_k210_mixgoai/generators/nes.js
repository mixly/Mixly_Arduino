export const nes_joystick_init = function (_, generator) {
    generator.definitions_['import nes_no'] = 'import nes_no';
    var cs_pin = generator.valueToCode(this, 'cs_pin', generator.ORDER_ATOMIC);
    var clk_pin = generator.valueToCode(this, 'clk_pin', generator.ORDER_ATOMIC);
    var mosi_pin = generator.valueToCode(this, 'mosi_pin', generator.ORDER_ATOMIC);
    var miso_pin = generator.valueToCode(this, 'miso_pin', generator.ORDER_ATOMIC);
    var vol = generator.valueToCode(this, 'vol', generator.ORDER_ATOMIC);
    var code = "nes_no.joystick_init(" + cs_pin + "," + clk_pin + "," + mosi_pin + "," + miso_pin + "," + vol + ")\n";
    return code;
}

export const nes_keyboard_init = function (_, generator) {
    generator.definitions_['import nes_no'] = 'import nes_no';
    var vol = generator.valueToCode(this, 'vol', generator.ORDER_ATOMIC);
    var code = "nes_no.keyboard_init(" + vol + ")\n";
    return code;
}

export const nes_run = function (_, generator) {
    generator.definitions_['import nes_no'] = 'import nes_no';
    var path = generator.valueToCode(this, 'path', generator.ORDER_ATOMIC);
    var code = "nes_no.run(" + path + ")\n";
    return code;
}