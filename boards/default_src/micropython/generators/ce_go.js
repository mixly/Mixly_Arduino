import * as Mixly from 'mixly';

export const ce_go_light_number = function (_, generator) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == "mixgo_me" || version == "mixgo_cc") {
        generator.definitions_['import_me_go_car'] = 'from me_go import car';
    } else if (version == "mixgo_ce") {
        generator.definitions_['import_ce_go_car'] = 'from ce_go import car';
    }else if (version == "mixgo_mini"){
        generator.definitions_['import_mini_go_car'] = 'from mini_go import car';
    }
    var code = 'car.' + this.getFieldValue('op');
    return [code, generator.ORDER_ATOMIC];
}

export const ce_go_led_bright = function (_, generator) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == "mixgo_me" || version == "mixgo_cc") {
        generator.definitions_['import_me_go_car'] = 'from me_go import car';
    }else if (version == "mixgo_mini"){
        generator.definitions_['import_mini_go_car'] = 'from mini_go import car';
    }
    else if (version == "mixgo_ce") {
        generator.definitions_['import_ce_go_car'] = 'from ce_go import car';
    }
    var op = generator.valueToCode(this, 'led', generator.ORDER_ATOMIC);
    var bright = generator.valueToCode(this, 'bright', generator.ORDER_ATOMIC);
    var code = "car.setonoff(" + op + "," + bright + ")\n";
    return code;
}

export const ce_go_get_led_bright = function (_, generator) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == "mixgo_me" || version == "mixgo_cc") {
        generator.definitions_['import_me_go_car'] = 'from me_go import car';
    }
    else if (version == "mixgo_ce") {
        generator.definitions_['import_ce_go_car'] = 'from ce_go import car';
    }else if (version == "mixgo_mini"){
        generator.definitions_['import_mini_go_car'] = 'from mini_go import car';
    }
    var op = generator.valueToCode(this, 'led', generator.ORDER_ATOMIC);
    var code = "car.getrightness(" + op + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const ce_go_get_led_state = function (_, generator) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == "mixgo_me" || version == "mixgo_cc") {
        generator.definitions_['import_me_go_car'] = 'from me_go import car';
    }
    else if (version == "mixgo_ce") {
        generator.definitions_['import_ce_go_car'] = 'from ce_go import car';
    }else if (version == "mixgo_mini"){
        generator.definitions_['import_mini_go_car'] = 'from mini_go import car';
    }
    var op = generator.valueToCode(this, 'led', generator.ORDER_ATOMIC);
    var code = "car.getonoff(" + op + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const ce_go_led_brightness = function (_, generator) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == "mixgo_me" || version == "mixgo_cc") {
        generator.definitions_['import_me_go_car'] = 'from me_go import car';
    }
    else if (version == "mixgo_ce") {
        generator.definitions_['import_ce_go_car'] = 'from ce_go import car';
    }else if (version == "mixgo_mini"){
        generator.definitions_['import_mini_go_car'] = 'from mini_go import car';
    }
    var op = generator.valueToCode(this, 'led', generator.ORDER_ATOMIC);
    var flag = generator.valueToCode(this, 'bright', generator.ORDER_ATOMIC);
    var code = "car.setbrightness(" + op + "," + flag + ")\n";
    return code;
}

export const ce_go_stepper_keep = function (_, generator) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == "mixgo_me" || version == "mixgo_cc") {
        generator.definitions_['import_me_go_car'] = 'from me_go import car';
    }
    else if (version == "mixgo_ce") {
        generator.definitions_['import_ce_go_car'] = 'from ce_go import car';
    }else if (version == "mixgo_mini"){
        generator.definitions_['import_mini_go_car'] = 'from mini_go import car';
    }
    var v = this.getFieldValue('VAR');
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ASSIGNMENT);
    var code = 'car.move("' + v + '",' + speed + ")\n";
    return code;
}

export const ce_go_stepper_stop = function (_, generator) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == "mixgo_me" || version == "mixgo_cc") {
        generator.definitions_['import_me_go_car'] = 'from me_go import car';
    }
    else if (version == "mixgo_ce") {
        generator.definitions_['import_ce_go_car'] = 'from ce_go import car';
    }else if (version == "mixgo_mini"){
        generator.definitions_['import_mini_go_car'] = 'from mini_go import car';
    }
    var v = this.getFieldValue('VAR');
    var code = 'car.move("' + v + '")\n';
    return code;
}

export const ce_go_dc_motor = function (_, generator) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == "mixgo_me" || version == "mixgo_cc") {
        generator.definitions_['import_me_go_car'] = 'from me_go import car';
    }
    else if (version == "mixgo_ce") {
        generator.definitions_['import_ce_go_car'] = 'from ce_go import car';
    }else if (version == "mixgo_mini"){
        generator.definitions_['import_mini_go_car'] = 'from mini_go import car';
    }
    var wheel = this.getFieldValue('wheel');
    var v = this.getFieldValue('direction');
    if (wheel == 0) {
        if (v == 'CW') { v = 'CCW' }
        else if (v == 'CCW') { v = 'CW' }
    }
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
    var code = "car.motor(car.MOTO[" + wheel + '],"' + v + '",' + speed + ")\n";
    return code;
}

export const ce_go_hall_attachInterrupt = function (_, generator) {
    var dropdown_mode = this.getFieldValue('mode');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == "mixgo_me" || version == "mixgo_cc") {
        generator.definitions_['import_me_go_hall_' + dropdown_mode] = 'from me_go import hall_' + dropdown_mode;
    }
    else if (version == "mixgo_ce") {
        generator.definitions_['import_ce_go_hall_' + dropdown_mode] = 'from ce_go import hall_' + dropdown_mode;
    }else if (version == "mixgo_mini"){
        generator.definitions_['import_mini_go_hall' + dropdown_mode] = 'from mini_go import hall_'+ dropdown_mode;
    }
    var atta = generator.valueToCode(this, 'DO', generator.ORDER_ATOMIC);
    var code = 'hall_' + dropdown_mode + '.irq_cb(' + atta + ')\n'
    return code;
}

export const ce_go_hall_initialize = function (_, generator) {
    var dropdown_mode = this.getFieldValue('mode');
    var args = this.getFieldValue('args');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == "mixgo_me" || version == "mixgo_cc") {
        generator.definitions_['import_me_go_hall_' + dropdown_mode] = 'from me_go import hall_' + dropdown_mode;
    }
    else if (version == "mixgo_ce") {
        generator.definitions_['import_ce_go_hall_' + dropdown_mode] = 'from ce_go import hall_' + dropdown_mode;
    }else if (version == "mixgo_mini"){
        generator.definitions_['import_mini_go_hall' + dropdown_mode] = 'from mini_go import hall_'+ dropdown_mode;
    }
    var num = generator.valueToCode(this, 'num', generator.ORDER_ATOMIC);
    if (args == 'all') {
        var code = 'hall_' + dropdown_mode + '.initial(' + 'turns' + '=' + num + ',distance=' + num + ')\n'
        return code;
    }
    var code = 'hall_' + dropdown_mode + '.initial(' + args + '=' + num + ')\n'
    return code;
}

export const ce_go_hall_data = function (_, generator) {
    var dropdown_mode = this.getFieldValue('mode');
    var args = this.getFieldValue('args');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == "mixgo_me" || version == "mixgo_cc") {
        generator.definitions_['import_me_go_hall_' + dropdown_mode] = 'from me_go import hall_' + dropdown_mode;
    }
    else if (version == "mixgo_ce") {
        generator.definitions_['import_ce_go_hall_' + dropdown_mode] = 'from ce_go import hall_' + dropdown_mode;
    }else if (version == "mixgo_mini"){
        generator.definitions_['import_mini_go_hall' + dropdown_mode] = 'from mini_go import hall_'+ dropdown_mode;
    }
    var code = 'hall_' + dropdown_mode + '.' + args + '';
    return [code, generator.ORDER_ATOMIC];
}

export const ce_go_pin_near_line = function (_, generator) {
    var key = this.getFieldValue('key');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == "mixgo_me" || version == "mixgo_cc") {
        generator.definitions_['import_me_go_hall'] = 'from me_go import car';
    }
    else if (version == "mixgo_ce") {
        generator.definitions_['import_ce_go_hall'] = 'from ce_go import car';
    }else if (version == "mixgo_mini"){
        generator.definitions_['import_mini_go_hall'] = 'from mini_go import car';
    }
    var code = 'car.patrol()' + key + '';
    return [code, generator.ORDER_ATOMIC];
}

export const ce_go_pin_near = function (_, generator) {
    var key = this.getFieldValue('key');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == "mixgo_me" || version == "mixgo_cc") {
        generator.definitions_['import_me_go_hall'] = 'from me_go import car';
    }
    else if (version == "mixgo_ce") {
        generator.definitions_['import_ce_go_hall'] = 'from ce_go import car';
    }else if (version == "mixgo_mini"){
        generator.definitions_['import_mini_go_hall'] = 'from mini_go import car';
    }
    var code = 'car.obstacle()' + key + '';
    return [code, generator.ORDER_ATOMIC];
}

export const ce_go_pin_near_state_change = function (_, generator) {
    var key = this.getFieldValue('key');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == "mixgo_me" || version == "mixgo_cc") {
        generator.definitions_['import_me_go_hall'] = 'from me_go import car';
    }
    else if (version == "mixgo_ce") {
        generator.definitions_['import_ce_go_hall'] = 'from ce_go import car';
    }else if (version == "mixgo_mini"){
        generator.definitions_['import_mini_go_hall'] = 'from mini_go import car';
    }
    var code = 'car.ir_mode(car.' + key + ')\n';
    return code;
}

export const sensor_mixgome_eulerangles = function (_, generator) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == "mixgo_me" || version == "mixgo_cc") {
        generator.definitions_['import_mixgo_me_onboard_mxc6655xa'] = "from mixgo_me import onboard_mxc6655xa";
    }
    else if (version == "mixgo_ce") {
        generator.definitions_['import_mixgo_ce_onboard_mxc6655xa'] = "from mixgo_ce import onboard_mxc6655xa";
    }else if (version == "mixgo_mini"){
        generator.definitions_['import_mini_onboard_mxc6655xa'] = 'from mini_go import onboard_mxc6655xa';
    }
    var angle = this.getFieldValue('angle');
    var code = 'onboard_mxc6655xa.eulerangles(upright=True)' + angle;
    return [code, generator.ORDER_ATOMIC];
}

export const ce_go_pin_light = function (_, generator) {
    var key = this.getFieldValue('key');
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    if (version == "mixgo_me" || version == "mixgo_cc") {
        generator.definitions_['import_me_go_hall'] = 'from me_go import car';
    }
    else if (version == "mixgo_ce") {
        generator.definitions_['import_ce_go_hall'] = 'from ce_go import car';
    }else if (version == "mixgo_mini"){
        generator.definitions_['import_mini_go_hall'] = 'from mini_go import car';
    }
    var code = 'car.light()' + key + '';
    return [code, generator.ORDER_ATOMIC];
}

//educore car

export const educore_car = function (_, generator) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_'+version+'_car'] = 'from '+version+' import car';
    var code = 'car()';
    return [code, generator.ORDER_ATOMIC];
}

export const educore_car_stepper_keep = function (_, generator) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_'+version+'_car'] = 'from '+version+' import car';
    var car = generator.valueToCode(this, 'car', generator.ORDER_ASSIGNMENT);
    var v = this.getFieldValue('VAR');
    var speed = generator.valueToCode(this, 'speed', generator.ORDER_ASSIGNMENT);
    var code = car+'.'+ v +'('+speed+")\n";
    return code;
}

export const educore_car_stepper_stop = function (_, generator) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_'+version+'_car'] = 'from '+version+' import car';
    var car = generator.valueToCode(this, 'car', generator.ORDER_ASSIGNMENT);
    var v = this.getFieldValue('VAR');
    var code = car+'.'+ v +"()\n";
    return code;
}

export const educore_car_pin_near_line = function (_, generator) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_'+version+'_car'] = 'from '+version+' import car';
    var car = generator.valueToCode(this, 'car', generator.ORDER_ASSIGNMENT);
    var key = this.getFieldValue('key');
    var code = car+'.get_itr_dnum(' + key + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const educore_car_pin_near = function (_, generator) {
    var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
    generator.definitions_['import_'+version+'_car'] = 'from '+version+' import car';
    var car = generator.valueToCode(this, 'car', generator.ORDER_ASSIGNMENT);
    var code = car+'.get_distance()';
    return [code, generator.ORDER_ATOMIC];
}