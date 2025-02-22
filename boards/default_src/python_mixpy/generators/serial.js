import * as Blockly from 'blockly/core';
import { JSFuncs } from 'mixly';

export const serial_open = function (_, generator) {
    generator.definitions_['import_serial'] = 'import serial';
    var time = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '0'
    var varName = generator.variableDB_.getName(this.getFieldValue('SER'),
        Blockly.Variables.NAME_TYPE);
    var bps = this.getFieldValue('BPS');
    // var code= v + '.start()\n';
    var code = varName + ' = serial.Serial("' + JSFuncs.getCom() + '", ' + bps + ', timeout=' + time + ')\n';
    return code;
}

export const serial_write = function (_, generator) {
    generator.definitions_['import_serial'] = 'import serial';
    var ser = generator.valueToCode(this, 'SER', generator.ORDER_ADDITIVE) || 'ser';
    var str = (generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""');
    // var code= v + '.start()\n';
    var code = ser + '.write(' + str + ')\n';
    return code;
}

export const serial_read_b = function (_, generator) {
    generator.definitions_['import_serial'] = 'import serial';
    var ser = generator.valueToCode(this, 'SER', generator.ORDER_ADDITIVE) || 'ser';
    var len = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '0'
    var code = ser + '.read(' + len + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const serial_close = function (_, generator) {
    generator.definitions_['import_serial'] = 'import serial';
    var ser = generator.valueToCode(this, 'SER', generator.ORDER_ADDITIVE) || 'ser';
    var code = ser + '.close()\n';
    return code;
}