export const cc_g1_read_bat = function (_, generator) {
    generator.definitions_['import_cc_g1'] = 'from cc_g1 import handle';
    var code = 'handle.read_bat()';
    return [code, generator.ORDER_ATOMIC];
}

export const cc_g1_read_joystick = function (_, generator) {
    var v = this.getFieldValue('VAR');
    generator.definitions_['import_cc_g1'] = 'from cc_g1 import handle';
    var code = 'handle.read_joystick()' + v + '';
    return [code, generator.ORDER_ATOMIC];
}

export const cc_g1_read_key = function (_, generator) {
    var v = this.getFieldValue('VAR');
    generator.definitions_['import_cc_g1'] = 'from cc_g1 import handle';
    var code = 'handle.read_key(' + v + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const cc_g1_turnoff = function (_, generator) {
    generator.definitions_['import_cc_g1'] = 'from cc_g1 import handle';
    var code = 'handle.shutdown()';
    return code;
}