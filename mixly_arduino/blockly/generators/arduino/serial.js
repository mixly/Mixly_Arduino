'use strict';

goog.provide('Blockly.Arduino.serial');

goog.require('Blockly.Arduino');

Blockly.Arduino.serial_begin = function () {
    var serial_select = this.getFieldValue('serial_select');
    var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || profile.default.serial;
    Blockly.Arduino.setups_['setup_serial_' + serial_select ] = serial_select + '.begin(' + content + ');';
    return '';
};

Blockly.Arduino.serial_write = function () {
    var serial_select = this.getFieldValue('serial_select');
    var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '\"\"'
    if (Blockly.Arduino.setups_['setup_serial_' + serial_select ]) {
    } else {
        Blockly.Arduino.setups_['setup_serial_' + serial_select ] = serial_select + '.begin(' + profile.default.serial + ');';
    }
    var code = serial_select + '.write(' + content + ');\n';
    return code;
};

Blockly.Arduino.serial_print = function () {
    var serial_select = this.getFieldValue('serial_select');
        var new_line = this.getFieldValue('new_line');
    var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '\"\"'
    if (Blockly.Arduino.setups_['setup_serial_' + serial_select]) {
    } else {
        Blockly.Arduino.setups_['setup_serial_' + serial_select ] = serial_select + '.begin(' + profile.default.serial + ');';
    }
    var code = serial_select + '.'+new_line+'(' + content + ');\n';
    return code;
};

Blockly.Arduino.serial_println =Blockly.Arduino.serial_print ;

Blockly.Arduino.serial_print_num = function () {
    var serial_select = this.getFieldValue('serial_select');
    var Decimal = this.getFieldValue('STAT');
    var new_line = this.getFieldValue('new_line');
    var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0'
    if (Blockly.Arduino.setups_['setup_serial_' + serial_select ]) {
    } else {
        Blockly.Arduino.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + profile.default.serial + ');';
    }
    var code = serial_select + '.'+new_line+'(' + content + ','+Decimal+');\n';
    return code;
};
Blockly.Arduino.serial_print_hex=Blockly.Arduino.serial_print_num;
Blockly.Arduino.serial_available = function () {
    var serial_select = this.getFieldValue('serial_select');
    if (Blockly.Arduino.setups_['setup_serial_' + serial_select]) {
    } else {
        Blockly.Arduino.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + profile.default.serial + ');';
    }
    var code = serial_select + ".available() > 0";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.serial_readstr = function () {
    var serial_select = this.getFieldValue('serial_select');
    if (Blockly.Arduino.setups_['setup_serial_' + serial_select]) {
    } else {
        Blockly.Arduino.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + profile.default.serial + ');';
    }
    var code = serial_select + ".readString()";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.serial_readstr_until = function () {
    var serial_select = this.getFieldValue('serial_select');
    var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC);
    if (Blockly.Arduino.setups_['setup_serial_' + serial_select]) {
    } else {
        Blockly.Arduino.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + profile.default.serial + ');';
    }
    var code = serial_select + ".readStringUntil(" + content + ")";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.serial_parseInt_Float = function () {
    var serial_select = this.getFieldValue('serial_select');
    if (Blockly.Arduino.setups_['setup_serial_' + serial_select]) {
    } else {
        Blockly.Arduino.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + profile.default.serial + ');';
    }
    var dropdown_stat = this.getFieldValue('STAT');
    var code = serial_select + '.' + dropdown_stat + '()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.serial_flush = function () {
    var serial_select = this.getFieldValue('serial_select');
    if (Blockly.Arduino.setups_['setup_serial_' + serial_select]) {
    } else {
        Blockly.Arduino.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + profile.default.serial + ');';
    }
    var code = serial_select + '.flush();\n';
    return code;
};

Blockly.Arduino.serial_softserial = function () {
    var serial_select = this.getFieldValue('serial_select');
    var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'RX', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'TX', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>';
    Blockly.Arduino.definitions_['var_declare_' + serial_select] = 'SoftwareSerial ' + serial_select + '(' + dropdown_pin1 + ',' + dropdown_pin2 + ');';
    return '';
};
Blockly.Arduino.serial_event = function () {
    var serial_select = this.getFieldValue('serial_select');
    var funcName = 'attachPinInterrupt_fun_' + serial_select;
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var code2 = 'void ' + serial_select.replace('Serial', 'serialEvent') + '() {\n' + branch + '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
    return "";
};