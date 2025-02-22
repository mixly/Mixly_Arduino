import { Profile } from 'mixly';

export const serial_begin = function (_, generator) {
    var serial_select = this.getFieldValue('serial_select');
    var content = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC) || Profile.default.serial;
    generator.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + content + ');';
    return '';
}

export const serial_write = function (_, generator) {
    var serial_select = this.getFieldValue('serial_select');
    var content = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC) || '""'
    if (!generator.setups_['setup_serial_' + serial_select]) {
        generator.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + Profile.default.serial + ');';
    }
    var code = serial_select + '.write(' + content + ');\n';
    return code;
}

export const serial_print = function (_, generator) {
    var serial_select = this.getFieldValue('serial_select');
    var new_line = this.getFieldValue('new_line');
    var content = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC) || '""'
    if (!generator.setups_['setup_serial_' + serial_select]) {
        generator.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + Profile.default.serial + ');';
    }
    var code = serial_select + '.' + new_line + '(' + content + ');\n';
    return code;
}

export const serial_println = serial_print;

export const serial_print_num = function (_, generator) {
    var serial_select = this.getFieldValue('serial_select');
    var Decimal = this.getFieldValue('STAT');
    var new_line = this.getFieldValue('new_line');
    var content = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC) || '0'
    if (!generator.setups_['setup_serial_' + serial_select]) {
        generator.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + Profile.default.serial + ');';
    }
    var code = serial_select + '.' + new_line + '(' + content + ',' + Decimal + ');\n';
    return code;
}

export const serial_print_hex = serial_print_num;

export const serial_available = function (_, generator) {
    var serial_select = this.getFieldValue('serial_select');
    if (!generator.setups_['setup_serial_' + serial_select]) {
        generator.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + Profile.default.serial + ');';
    }
    var code = serial_select + ".available()";
    return [code, generator.ORDER_ATOMIC];
}

export const serial_readstr = function (_, generator) {
    var serial_select = this.getFieldValue('serial_select');
    if (!generator.setups_['setup_serial_' + serial_select]) {
        generator.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + Profile.default.serial + ');';
    }
    var code = serial_select + ".readString()";
    return [code, generator.ORDER_ATOMIC];
}

export const serial_readstr_until = function (_, generator) {
    var serial_select = this.getFieldValue('serial_select');
    var content = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC);
    if (!generator.setups_['setup_serial_' + serial_select]) {
        generator.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + Profile.default.serial + ');';
    }
    var code = serial_select + ".readStringUntil(" + content + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const serial_parseInt_Float = function (_, generator) {
    var serial_select = this.getFieldValue('serial_select');
    if (!generator.setups_['setup_serial_' + serial_select]) {
        generator.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + Profile.default.serial + ');';
    }
    var dropdown_stat = this.getFieldValue('STAT');
    var code = serial_select + '.' + dropdown_stat + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const serial_flush = function (_, generator) {
    var serial_select = this.getFieldValue('serial_select');
    if (!generator.setups_['setup_serial_' + serial_select]) {
        generator.setups_['setup_serial_' + serial_select] = serial_select + '.begin(' + Profile.default.serial + ');';
    }
    var code = serial_select + '.flush();\n';
    return code;
}

export const serial_softserial = function (_, generator) {
    var serial_select = this.getFieldValue('serial_select');
    var dropdown_pin1 = generator.valueToCode(this, 'RX', generator.ORDER_ATOMIC);
    var dropdown_pin2 = generator.valueToCode(this, 'TX', generator.ORDER_ATOMIC);
    generator.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>';
    generator.definitions_['var_declare_' + serial_select] = 'SoftwareSerial ' + serial_select + '(' + dropdown_pin1 + ',' + dropdown_pin2 + ');';
    return '';
}

export const serial_event = function (_, generator) {
    var serial_select = this.getFieldValue('serial_select');
    var funcName = 'attachPinInterrupt_fun_' + serial_select;
    var branch = generator.statementToCode(this, 'DO');
    var code2 = 'void ' + serial_select.replace('Serial', 'serialEvent') + '() {\n' + branch + '}\n';
    generator.definitions_[funcName] = code2;
    return "";
}