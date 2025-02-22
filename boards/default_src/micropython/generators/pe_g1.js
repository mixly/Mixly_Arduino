export const pe_g1_use_i2c_init = function (_, generator) {
    generator.definitions_['import_pe_g1'] = 'import pe_g1';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var iv = generator.valueToCode(this, 'I2CSUB', generator.ORDER_ATOMIC);
    var code = v + ' = pe_g1.PE_G1(' + iv + ')\n';
    return code;
}

export const pe_g1_battery_left = function (_, generator) {
    generator.definitions_['import_pe_g1'] = 'import pe_g1';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = v + '.read_bat()';
    return [code, generator.ORDER_ATOMIC];
}

export const pe_g1_dc_motor = function (_, generator) {
    generator.definitions_['import_pe_g1'] = 'import pe_g1';
    var s = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var wheel = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var v = this.getFieldValue('direction');
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
    var code = s + ".motor(" + wheel + ',"' + v + '",' + speed + ")\n";
    return code;
}

export const pe_g1_dc_motor_speed = function (_, generator) {
    generator.definitions_['import_pe_g1'] = 'import pe_g1';
    var s = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var wheel = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var v = 'NC';
    var code = s + ".motor(" + wheel + ',"' + v + '"' + ")\n";
    return [code, generator.ORDER_ATOMIC];
}

export const pe_g1_servo_set_angle = function (_, generator) {
    generator.definitions_['import_pe_g1'] = 'import pe_g1';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var num = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    var code = v + '.servo180(' + dropdown_pin + ',' + num + ')\n';
    return code;
}

export const pe_g1_servo_set_speed = function (_, generator) {
    generator.definitions_['import_pe_g1'] = 'import pe_g1';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var num = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    var code = v + '.servo360(' + dropdown_pin + ',' + num + ')\n';
    return code;
}

export const pe_g1_servo_get_angle = function (_, generator) {
    generator.definitions_['import_pe_g1'] = 'import pe_g1';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = v + '.servo180(' + dropdown_pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const pe_g1_servo_get_speed = function (_, generator) {
    generator.definitions_['import_pe_g1'] = 'import pe_g1';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = v + '.servo360(' + dropdown_pin + ')';
    return [code, generator.ORDER_ATOMIC];
}