export const me_go_light_number = function (_, generator) {
    generator.definitions_['import_me_go_car'] = 'from me_go import car';
    var code = 'car.' + this.getFieldValue('op');
    return [code, generator.ORDER_ATOMIC];
}

export const me_go_led_bright = function (_, generator) {
    var op = generator.valueToCode(this, 'led', generator.ORDER_ATOMIC);
    generator.definitions_['import_me_go_car'] = 'from me_go import car';
    var bright = generator.valueToCode(this, 'bright', generator.ORDER_ATOMIC);
    var code = "car.setonoff(" + op + "," + bright + ")\n";
    return code;
}

export const me_go_get_led_bright = function (_, generator) {
    var op = generator.valueToCode(this, 'led', generator.ORDER_ATOMIC);
    generator.definitions_['import_me_go_car'] = 'from me_go import car';
    var code = "car.getrightness(" + op + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const me_go_get_led_state = function (_, generator) {
    var op = generator.valueToCode(this, 'led', generator.ORDER_ATOMIC);
    generator.definitions_['import_me_go_car'] = 'from me_go import car';
    var code = "car.getonoff(" + op + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const me_go_led_brightness = function (_, generator) {
    var op = generator.valueToCode(this, 'led', generator.ORDER_ATOMIC);
    generator.definitions_['import_me_go_car'] = 'from me_go import car';
    var flag = generator.valueToCode(this, 'bright', generator.ORDER_ATOMIC);
    var code = "car.setbrightness(" + op + "," + flag + ")\n";
    return code;
}

export const me_go_stepper_keep = function (_, generator) {
    var v = this.getFieldValue('VAR');
    generator.definitions_['import_me_go_car'] = 'from me_go import car';
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ASSIGNMENT);
    var code = 'car.move("' + v + '",' + speed + ")\n";
    return code;
}

export const me_go_stepper_stop = function (_, generator) {
    var v = this.getFieldValue('VAR');
    generator.definitions_['import_me_go_car'] = 'from me_go import car';
    var code = 'car.move("' + v + '")\n';
    return code;
}

export const me_go_dc_motor = function (_, generator) {
    var wheel = this.getFieldValue('wheel');
    generator.definitions_['import_me_go_car'] = 'from me_go import car';
    var v = this.getFieldValue('direction');
    if (wheel == 0) {
        if (v == 'CW') { v = 'CCW' }
        else if (v == 'CCW') { v = 'CW' }
    }
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
    var code = "car.motor(car.MOTO[" + wheel + '],"' + v + '",' + speed + ")\n";
    return code;
}

export const me_go_hall_attachInterrupt = function (_, generator) {
    var dropdown_mode = this.getFieldValue('mode');
    generator.definitions_['import_me_go_hall_' + dropdown_mode] = 'from me_go import hall_' + dropdown_mode;
    var atta = generator.valueToCode(this, 'DO', generator.ORDER_ATOMIC);
    var code = 'hall_' + dropdown_mode + '.irq_cb(' + atta + ')\n'
    return code;
}

export const me_go_hall_initialize = function (_, generator) {
    var dropdown_mode = this.getFieldValue('mode');
    var args = this.getFieldValue('args');
    generator.definitions_['import_me_go_hall_' + dropdown_mode] = 'from me_go import hall_' + dropdown_mode;
    var num = generator.valueToCode(this, 'num', generator.ORDER_ATOMIC);
    if (args == 'all') {
        var code = 'hall_' + dropdown_mode + '.initial(' + 'turns' + '=' + num + ',distance=' + num + ')\n'
        return code;
    }
    var code = 'hall_' + dropdown_mode + '.initial(' + args + '=' + num + ')\n'
    return code;
}

export const me_go_hall_data = function (_, generator) {
    var dropdown_mode = this.getFieldValue('mode');
    var args = this.getFieldValue('args');
    generator.definitions_['import_me_go_hall_' + dropdown_mode] = 'from me_go import hall_' + dropdown_mode;
    var code = 'hall_' + dropdown_mode + '.' + args + '';
    return [code, generator.ORDER_ATOMIC];
}

export const me_go_pin_near_line = function (_, generator) {
    var key = this.getFieldValue('key');
    generator.definitions_['import_me_go_hall'] = 'from me_go import car';
    var code = 'car.patrol()' + key + '';
    return [code, generator.ORDER_ATOMIC];
}

export const me_go_pin_near = function (_, generator) {
    var key = this.getFieldValue('key');
    generator.definitions_['import_me_go_hall'] = 'from me_go import car';
    var code = 'car.obstacle()' + key + '';
    return [code, generator.ORDER_ATOMIC];
}

export const me_go_pin_near_state_change = function (_, generator) {
    var key = this.getFieldValue('key');
    generator.definitions_['import_me_go_hall'] = 'from me_go import car';
    var code = 'car.ir_mode(car.' + key + ')\n';
    return code;
}

export const sensor_mixgome_eulerangles = function (_, generator) {
    generator.definitions_['import_mixgo_me_onboard_mxc6655xa'] = "from mixgo_me import onboard_mxc6655xa";
    var angle = this.getFieldValue('angle');
    var code = 'onboard_mxc6655xa.eulerangles(upright=True)' + angle;
    return [code, generator.ORDER_ATOMIC];
}

export const me_go_pin_light = function (_, generator) {
    var key = this.getFieldValue('key');
    generator.definitions_['import_me_go_hall'] = 'from me_go import car';
    var code = 'car.light()' + key + '';
    return [code, generator.ORDER_ATOMIC];
}