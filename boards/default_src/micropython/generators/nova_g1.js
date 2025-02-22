export const get_potential_num = function (_, generator) {
    generator.definitions_['from_nova_g1_import_ext_g1'] = 'from nova_g1 import ext_g1';
    var code = 'ext_g1.varistor()';
    return [code, generator.ORDER_ATOMIC];
}

export const nova_g1_motor = function (_, generator) {
    generator.definitions_['from_nova_g1_import_ext_g1'] = 'from nova_g1 import ext_g1';
    var wheel = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var v = this.getFieldValue('direction');
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
    var code = "ext_g1.motor(" + wheel + ',"' + v + '",' + speed + ")\n";
    return code;
}

export const nova_g1_usb = function (_, generator) {
    generator.definitions_['from_nova_g1_import_ext_g1'] = 'from nova_g1 import ext_g1';
    var p = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var percent = generator.valueToCode(this, 'percent', generator.ORDER_ATOMIC);
    var code = "ext_g1.usb_pwm(" + p + ',' + percent + ")\n";
    return code;
}

export const nova_g1_spk_en = function (_, generator) {
    generator.definitions_['from_nova_g1_import_ext_g1'] = 'from nova_g1 import ext_g1';
    var state = this.getFieldValue('state');
    var code = "ext_g1.spk_en(" + state + ")\n";
    return code;
}