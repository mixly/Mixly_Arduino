// ok
export const inout_highlow = function (_, generator) {
    // Boolean values HIGH and LOW.
    var code = (this.getFieldValue('BOOL') == 'HIGH') ? '1' : '0';
    return [code, generator.ORDER_ATOMIC];
}

// ok
export const inout_digital_write = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_stat = generator.valueToCode(this, 'STAT', generator.ORDER_ATOMIC);
    var code = "";
    // code += 'pins.digitalWritePin(' + dropdown_pin + ',' + dropdown_stat + ')\n'
    code += 'pin'+ dropdown_pin +'.write_digital('+ dropdown_stat +')\n'
    return code;
}

// ok
export const inout_digital_read = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = "";
    code = 'pin' + dropdown_pin + '.read_digital()';
    return [code, generator.ORDER_ATOMIC];
}

//ok
export const inout_analog_write = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    //var dropdown_stat = this.getFieldValue('STAT');
    var value_num = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    //generator.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
    var code = 'pin' + dropdown_pin + '.write_analog(' + value_num + ')\n';
    return code;
}

//ok
export const inout_analog_write_set = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var value_num = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = 'pin' + dropdown_pin  + '.set_analog_'+ key +'(' + value_num + ')\n';
    //var code = 'pin' + dropdown_pin  + '.set_analog_period(' + value_num + ')\n';
    return code;
}

// ok
export const inout_analog_read = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    //generator.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
    var code = 'pin' + dropdown_pin + '.read_analog()';
    return [code, generator.ORDER_ATOMIC];
}

// ok
export const sensor_pin_pressed = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var pin = generator.valueToCode(this, 'pin', generator.ORDER_ATOMIC);
    var code = 'pin'+ pin + '.is_touched()';
    return [code, generator.ORDER_ATOMIC];
}