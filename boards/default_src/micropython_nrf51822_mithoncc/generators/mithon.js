export const microbit_image_create = function (block, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var colours = {
        "#000000": "0",
        "#004400": "1",
        "#006600": "2",
        "#008800": "3",
        "#00aa00": "4",
        "#00bb00": "5",
        "#00cc00": "6",
        "#00dd00": "7",
        "#00ee00": "8",
        "#00ff00": "9"
    }
    var colour_00 = colours[block.getFieldValue('00')];
    var colour_01 = colours[block.getFieldValue('01')];
    var colour_02 = colours[block.getFieldValue('02')];
    var colour_03 = colours[block.getFieldValue('03')];
    var colour_04 = colours[block.getFieldValue('04')];
    var colour_10 = colours[block.getFieldValue('10')];
    var colour_11 = colours[block.getFieldValue('11')];
    var colour_12 = colours[block.getFieldValue('12')];
    var colour_13 = colours[block.getFieldValue('13')];
    var colour_14 = colours[block.getFieldValue('14')];
    var colour_20 = colours[block.getFieldValue('20')];
    var colour_21 = colours[block.getFieldValue('21')];
    var colour_22 = colours[block.getFieldValue('22')];
    var colour_23 = colours[block.getFieldValue('23')];
    var colour_24 = colours[block.getFieldValue('24')];
    var colour_30 = colours[block.getFieldValue('30')];
    var colour_31 = colours[block.getFieldValue('31')];
    var colour_32 = colours[block.getFieldValue('32')];
    var colour_33 = colours[block.getFieldValue('33')];
    var colour_34 = colours[block.getFieldValue('34')];
    var colour_40 = colours[block.getFieldValue('40')];
    var colour_41 = colours[block.getFieldValue('41')];
    var colour_42 = colours[block.getFieldValue('42')];
    var colour_43 = colours[block.getFieldValue('43')];
    var colour_44 = colours[block.getFieldValue('44')];
    var code = 'Image("' + colour_00 + colour_01 + colour_02 + colour_03 + colour_04 + ':' + colour_10 + colour_11 + colour_12 + colour_13 + colour_14 + ':' + colour_20 + colour_21 + colour_22 + colour_23 + colour_24 + ':' + colour_30 + colour_31 + colour_32 + colour_33 + colour_34 + ':' + colour_40 + colour_41 + colour_42 + colour_43 + colour_44 + '")';
    return [code, generator.ORDER_ATOMIC];
}


export const base_loop = function (block, generator) {
    //var b = "UNTIL" == a.getFieldValue("MODE"),
    //var c = generator.valueToCode(a, "BOOL", b ? generator.ORDER_LOGICAL_NOT : generator.ORDER_NONE) || "False",
    var d = generator.statementToCode(block, "DO"),
        d = generator.addLoopTrap(d, block.id) || generator.PASS;
    generator.loops_['base_loop'] = d;
    return "";
}

export const actuator_rgb_color = function (_, generator) {
    var value_led = this.getFieldValue('LED');
    var values = this.getFieldValue('COLOR').split(",");
    var value_rvalue = values[0];
    var value_gvalue = values[1];
    var value_bvalue = values[2];
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_neopixel'] = 'import neopixel';
    generator.definitions_['import_rgb_show'] = 'import rgb_show';
    //generator.setups_['mixly_rgb_init'] = 'np = neopixel.NeoPixel(pin12, 4)\n';
    if (value_led > 0) {
        //generator.setups_['mixly_rgb_show'] = generator.FUNCTION_MIXLY_RGB_SHOW;
        var code = 'rgb_show.mixly_rgb_show(' + (value_led - 1) + ', ' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    }
    else {
        //generator.setups_['mixly_rgb_show_all'] = generator.FUNCTION_MIXLY_RGB_SHOW_ALL;
        var code = 'rgb_show.mixly_rgb_show_all(' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    }
    return code;
}

export const actuator_rgb_off = function (_, generator) {
    var value_led = this.getFieldValue('LED');
    var value_rvalue = 0;
    var value_gvalue = 0;
    var value_bvalue = 0;
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_neopixel'] = 'import neopixel';
    generator.definitions_['import_rgb_show'] = 'import rgb_show';
    //generator.setups_['mixly_rgb_init'] = 'np = neopixel.NeoPixel(pin12, 4)\n';
    if (value_led > 0) {
        //generator.setups_['mixly_rgb_show'] = generator.FUNCTION_MIXLY_RGB_SHOW;
        var code = 'rgb_show.mixly_rgb_show(' + (value_led - 1) + ', ' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    } else {
        //generator.setups_['mixly_rgb_show_all'] = generator.FUNCTION_MIXLY_RGB_SHOW_ALL;
        var code = 'rgb_show.mixly_rgb_show_all(' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    }
    return code;
}

export const actuator_rgb = function (_, generator) {
    var value_led = generator.valueToCode(this, '_LED_', generator.ORDER_ATOMIC);
    var value_rvalue = generator.valueToCode(this, 'RVALUE', generator.ORDER_ATOMIC);
    var value_gvalue = generator.valueToCode(this, 'GVALUE', generator.ORDER_ATOMIC);
    var value_bvalue = generator.valueToCode(this, 'BVALUE', generator.ORDER_ATOMIC);
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_neopixel'] = 'import neopixel';
    generator.definitions_['import_rgb_show'] = 'import rgb_show';
    //generator.setups_['mixly_rgb_init'] = 'np = neopixel.NeoPixel(pin12, 4)\n';
    //generator.setups_['mixly_rgb_show'] = generator.FUNCTION_MIXLY_RGB_SHOW;
    var code = 'rgb_show.mixly_rgb_show(' + value_led + ', ' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    return code;
}

export const actuator_motor_on = function (_, generator) {
    var n = this.getFieldValue('NUMBER');
    var v = generator.valueToCode(this, 'SPEED', generator.ORDER_ATOMIC);
    var d = this.getFieldValue('DIRECTION');
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_motor_control'] = 'import motor_control';
    if (n == 0) {
        //generator.setups_['mixly_motor1'] = generator.FUNCTION_MIXLY_MOTOR1;
        //generator.setups_['mixly_motor2'] = generator.FUNCTION_MIXLY_MOTOR2;
        //generator.setups_['mixly_motor3'] = generator.FUNCTION_MIXLY_MOTOR3;
        var code = 'motor_control.motor1(' + v + ', ' + d + ')\nmotor_control.motor2(' + v + ', ' + d + ')\nmotor_control.motor3(' + v + ', ' + d + ')\n';
    }
    else if (n == 1) {
        //generator.setups_['mixly_motor1'] = generator.FUNCTION_MIXLY_MOTOR1;
        var code = 'motor_control.motor1(' + v + ', ' + d + ')\n';
    }
    else if (n == 2) {
        //generator.setups_['mixly_motor2'] = generator.FUNCTION_MIXLY_MOTOR2;
        var code = 'motor_control.motor2(' + v + ', ' + d + ')\n';
    }
    else if (n == 3) {
        //generator.setups_['mixly_motor3'] = generator.FUNCTION_MIXLY_MOTOR3;
        var code = 'motor_control.motor3(' + v + ', ' + d + ')\n';
    }
    return code;
}

export const actuator_motor_off = function (_, generator) {
    var n = this.getFieldValue('NUMBER');
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_motor_control'] = 'import motor_control';
    if (n == 0) {
        //generator.setups_['mixly_motor1'] = generator.FUNCTION_MIXLY_MOTOR1;
        //generator.setups_['mixly_motor2'] = generator.FUNCTION_MIXLY_MOTOR2;
        //generator.setups_['mixly_motor3'] = generator.FUNCTION_MIXLY_MOTOR3;
        var code = 'motor_control.motor1(0)\nmotor_control.motor2(0)\nmotor_control.motor3(0)\n';
    }
    else if (n == 1) {
        //generator.setups_['mixly_motor1'] = generator.FUNCTION_MIXLY_MOTOR1;
        var code = 'motor_control.motor1(0)\n';
    }
    else if (n == 2) {
        //generator.setups_['mixly_motor2'] = generator.FUNCTION_MIXLY_MOTOR2;
        var code = 'motor_control.motor2(0)\n';
    }
    else if (n == 3) {
        //generator.setups_['mixly_motor3'] = generator.FUNCTION_MIXLY_MOTOR3;
        var code = 'motor_control.motor3(0)\n';
    }
    return code;
}

export const sensor_pin_near = function (_, generator) {
    var number = this.getFieldValue('NUMBER');
    var code = 'pin' + number + '.read_analog()';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_while_btn_pressed = function (block, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var btn = generator.valueToCode(this, 'btn', generator.ORDER_ATOMIC);
    generator.setups_['on_' + btn] = 'def on_' + btn + '():\n' +
        '    while True:\n' +
        '        if ' + btn + '.was_pressed():\n' +
        '            yield callback_' + btn + '()\n' +
        '        else:\n' +
        '            yield\n' +
        '\n' +
        'func_' + btn + ' = on_' + btn + '()\n'
    var d = generator.statementToCode(block, "DO"),
        d = generator.addLoopTrap(d, block.id) || generator.PASS;
    generator.loops_[btn + '_loop'] = '    next(func_' + btn + ')\n';
    return "def callback_" + btn + "():\n" + d;
}

export const sensor_while_is_gesture = function (block, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var gesture = this.getFieldValue('gesture');
    generator.setups_['on_' + gesture] = 'def on_gesture_' + gesture + '():\n' +
        '    while True:\n' +
        '        if accelerometer.is_gesture("' + gesture + '"):\n' +
        '            yield callback_gesture_' + gesture + '()\n' +
        '        else:\n' +
        '            yield\n' +
        '\n' +
        'func_gesture_' + gesture + ' = on_gesture_' + gesture + '()\n'
    var d = generator.statementToCode(block, "DO"),
        d = generator.addLoopTrap(d, block.id) || generator.PASS;
    generator.loops_[gesture + '_loop'] = '    next(func_gesture_' + gesture + ')\n';
    return "def callback_gesture_" + gesture + '():\n' + d;
}

export const sensor_while_is_near = function (block, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var near = this.getFieldValue('near');
    generator.setups_['on_' + near] = 'def on_near_' + near + '():\n' +
        '    while True:\n' +
        '        if not pin' + near + '.read_digital():\n' +
        '            yield callback_near_' + near + '()\n' +
        '        else:\n' +
        '            yield\n' +
        '\n' +
        'func_near_' + near + ' = on_near_' + near + '()\n'
    var d = generator.statementToCode(block, "DO"),
        d = generator.addLoopTrap(d, block.id) || generator.PASS;
    generator.loops_[near + '_loop'] = '    next(func_near_' + near + ')\n';
    return "def callback_near_" + near + '():\n' + d;
}

export const controls_repeat_ext = function (block, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var times = generator.valueToCode(this, 'TIMES', generator.ORDER_ATOMIC);
    var d = generator.statementToCode(block, "DO"),
        d = generator.addLoopTrap(d, block.id) || generator.PASS;
    return 'for _my_variable in range(' + times + '):\n' + d;
}