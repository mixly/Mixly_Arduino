import { JSFuncs } from 'mixly';

export const hardware_arduino_start = function (_, generator) {
    generator.definitions_['import_s4alib'] = 'import s4alib';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    // var code= v + '.start()\n';
    var code = v + ' = s4alib.s4a_start("' + JSFuncs.getCom() + '")\n';
    return code;
}

export const inout_highlow = function (_, generator) {
    // Boolean values HIGH and LOW.
    var code = (this.getFieldValue('BOOL') == 'HIGH') ? '1' : '0';
    return [code, generator.ORDER_ATOMIC];
}

export const hardware_arduino_digital_write = function (_, generator) {
    generator.definitions_['import_s4alib'] = 'import s4alib';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_stat = generator.valueToCode(this, 'STAT', generator.ORDER_ATOMIC);
    var code = "";
    code += '' + v + '.digital_write(' + dropdown_pin + ',' + dropdown_stat + ')\n'
    return code;
}

export const hardware_arduino_digital_read = function (_, generator) {
    generator.definitions_['import_s4alib'] = 'import s4alib';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = "";
    code = '' + v + '.digital_read(' + dropdown_pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const hardware_arduino_analog_read = function (_, generator) {
    generator.definitions_['import_s4alib'] = 'import s4alib';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = "";
    code = '' + v + '.analog_read(' + dropdown_pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const hardware_arduino_analog_write = function (_, generator) {
    generator.definitions_['import_s4alib'] = 'import s4alib';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var value_num = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    var code = "";
    code += '' + v + '.analog_write(' + dropdown_pin + ',' + value_num + ')\n'
    return code;
}
