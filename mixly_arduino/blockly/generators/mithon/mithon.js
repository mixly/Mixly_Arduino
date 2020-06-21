'use strict';

goog.provide('Blockly.Python.sensor');

goog.require('Blockly.Python');

Blockly.Python['microbit_image_create'] = function (block) {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
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
    return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.base_loop = function (a) {
    //var b = "UNTIL" == a.getFieldValue("MODE"),
    //var c = Blockly.Python.valueToCode(a, "BOOL", b ? Blockly.Python.ORDER_LOGICAL_NOT : Blockly.Python.ORDER_NONE) || "False",
    var d = Blockly.Python.statementToCode(a, "DO"),
        d = Blockly.Python.addLoopTrap(d, a.id) || Blockly.Python.PASS;
    Blockly.Python.loops_['base_loop'] = d;
    return "";
};

Blockly.Python.actuator_rgb_color = function () {
    var value_led = this.getFieldValue('LED');
    var values = this.getFieldValue('COLOR').split(",");
    var value_rvalue = values[0];
    var value_gvalue = values[1];
    var value_bvalue = values[2];
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Blockly.Python.definitions_['import_neopixel'] = 'import neopixel';
    Blockly.Python.setups_['mixly_rgb_init'] = 'np = neopixel.NeoPixel(pin12, 4)\n';
    if (value_led > 0) {
        Blockly.Python.setups_['mixly_rgb_show'] = Blockly.Python.FUNCTION_MIXLY_RGB_SHOW;
        var code = 'mixly_rgb_show(' + (value_led - 1) + ', ' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    }
    else {
        Blockly.Python.setups_['mixly_rgb_show_all'] = Blockly.Python.FUNCTION_MIXLY_RGB_SHOW_ALL;
        var code = 'mixly_rgb_show_all(' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    }
    return code;
};

Blockly.Python.actuator_rgb_off = function () {
    var value_led = this.getFieldValue('LED');
    var value_rvalue = 0;
    var value_gvalue = 0;
    var value_bvalue = 0;
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Blockly.Python.definitions_['import_neopixel'] = 'import neopixel';
    Blockly.Python.setups_['mixly_rgb_init'] = 'np = neopixel.NeoPixel(pin12, 4)\n';
    if (value_led > 0) {
        Blockly.Python.setups_['mixly_rgb_show'] = Blockly.Python.FUNCTION_MIXLY_RGB_SHOW;
        var code = 'mixly_rgb_show(' + (value_led - 1) + ', ' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    } else {
        Blockly.Python.setups_['mixly_rgb_show_all'] = Blockly.Python.FUNCTION_MIXLY_RGB_SHOW_ALL;
        var code = 'mixly_rgb_show_all(' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    }
    return code;
};

Blockly.Python.actuator_rgb = function () {
    var value_led = Blockly.Python.valueToCode(this, '_LED_', Blockly.Python.ORDER_ATOMIC);
    var value_rvalue = Blockly.Python.valueToCode(this, 'RVALUE', Blockly.Python.ORDER_ATOMIC);
    var value_gvalue = Blockly.Python.valueToCode(this, 'GVALUE', Blockly.Python.ORDER_ATOMIC);
    var value_bvalue = Blockly.Python.valueToCode(this, 'BVALUE', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Blockly.Python.definitions_['import_neopixel'] = 'import neopixel';
    Blockly.Python.setups_['mixly_rgb_init'] = 'np = neopixel.NeoPixel(pin12, 4)\n';
    Blockly.Python.setups_['mixly_rgb_show'] = Blockly.Python.FUNCTION_MIXLY_RGB_SHOW;
    var code = 'mixly_rgb_show(' + value_led + '-1, ' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
    return code;
};

Blockly.Python.actuator_motor_on = function () {
    var n = this.getFieldValue('NUMBER');
    var v = Blockly.Python.valueToCode(this, 'SPEED', Blockly.Python.ORDER_ATOMIC);
    var d = this.getFieldValue('DIRECTION');
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    if (n == 0) {
        Blockly.Python.setups_['mixly_motor1'] = Blockly.Python.FUNCTION_MIXLY_MOTOR1;
        Blockly.Python.setups_['mixly_motor2'] = Blockly.Python.FUNCTION_MIXLY_MOTOR2;
        Blockly.Python.setups_['mixly_motor3'] = Blockly.Python.FUNCTION_MIXLY_MOTOR3;
        var code = 'motor1(' + v + ', ' + d + ')\nmotor2(' + v + ', ' + d + ')\nmotor3(' + v + ', ' + d + ')\n';
    }
    else if (n == 1) {
        Blockly.Python.setups_['mixly_motor1'] = Blockly.Python.FUNCTION_MIXLY_MOTOR1;
        var code = 'motor1(' + v + ', ' + d + ')\n';
    }
    else if (n == 2) {
        Blockly.Python.setups_['mixly_motor2'] = Blockly.Python.FUNCTION_MIXLY_MOTOR2;
        var code = 'motor2(' + v + ', ' + d + ')\n';
    }
    else if (n == 3) {
        Blockly.Python.setups_['mixly_motor3'] = Blockly.Python.FUNCTION_MIXLY_MOTOR3;
        var code = 'motor3(' + v + ', ' + d + ')\n';
    }
    return code;
};

Blockly.Python.actuator_motor_off = function () {
    var n = this.getFieldValue('NUMBER');
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    if (n == 0) {
        Blockly.Python.setups_['mixly_motor1'] = Blockly.Python.FUNCTION_MIXLY_MOTOR1;
        Blockly.Python.setups_['mixly_motor2'] = Blockly.Python.FUNCTION_MIXLY_MOTOR2;
        Blockly.Python.setups_['mixly_motor3'] = Blockly.Python.FUNCTION_MIXLY_MOTOR3;
        var code = 'motor1(0)\nmotor2(0)\nmotor3(0)\n';
    }
    else if (n == 1) {
        Blockly.Python.setups_['mixly_motor1'] = Blockly.Python.FUNCTION_MIXLY_MOTOR1;
        var code = 'motor1(0)\n';
    }
    else if (n == 2) {
        Blockly.Python.setups_['mixly_motor2'] = Blockly.Python.FUNCTION_MIXLY_MOTOR2;
        var code = 'motor2(0)\n';
    }
    else if (n == 3) {
        Blockly.Python.setups_['mixly_motor3'] = Blockly.Python.FUNCTION_MIXLY_MOTOR3;
        var code = 'motor3(0)\n';
    }
    return code;
};

Blockly.Python.sensor_pin_near = function () {
    var number = this.getFieldValue('NUMBER');
    var code = 'pin' + number + '.read_analog()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_while_btn_pressed = function (a) {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.setups_['on_' + btn] = 'def on_' + btn + '():\n' +
        '    while True:\n' +
        '        if ' + btn + '.was_pressed():\n' +
        '            yield callback_' + btn + '()\n' +
        '        else:\n' +
        '            yield\n' +
        '\n' +
        'func_' + btn + ' = on_' + btn + '()\n'
    var d = Blockly.Python.statementToCode(a, "DO"),
        d = Blockly.Python.addLoopTrap(d, a.id) || Blockly.Python.PASS;
    Blockly.Python.loops_[btn + '_loop'] = '    next(func_' + btn + ')\n';
    return "def callback_" + btn + "():\n" + d;
};

Blockly.Python.sensor_while_is_gesture = function (a) {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var gesture = this.getFieldValue('gesture');
    Blockly.Python.setups_['on_' + gesture] = 'def on_gesture_' + gesture + '():\n' +
        '    while True:\n' +
        '        if accelerometer.is_gesture("' + gesture + '"):\n' +
        '            yield callback_gesture_' + gesture + '()\n' +
        '        else:\n' +
        '            yield\n' +
        '\n' +
        'func_gesture_' + gesture + ' = on_gesture_' + gesture + '()\n'
    var d = Blockly.Python.statementToCode(a, "DO"),
        d = Blockly.Python.addLoopTrap(d, a.id) || Blockly.Python.PASS;
    Blockly.Python.loops_[gesture + '_loop'] = '    next(func_gesture_' + gesture + ')\n';
    return "def callback_gesture_" + gesture + '():\n' + d;
};

Blockly.Python.sensor_while_is_near = function (a) {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var near = this.getFieldValue('near');
    Blockly.Python.setups_['on_' + near] = 'def on_near_' + near + '():\n' +
        '    while True:\n' +
        '        if not pin' + near + '.read_digital():\n' +
        '            yield callback_near_' + near + '()\n' +
        '        else:\n' +
        '            yield\n' +
        '\n' +
        'func_near_' + near + ' = on_near_' + near + '()\n'
    var d = Blockly.Python.statementToCode(a, "DO"),
        d = Blockly.Python.addLoopTrap(d, a.id) || Blockly.Python.PASS;
    Blockly.Python.loops_[near + '_loop'] = '    next(func_near_' + near + ')\n';
    return "def callback_near_" + near + '():\n' + d;
};

Blockly.Python.controls_repeat_ext = function (a) {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var times = Blockly.Python.valueToCode(this, 'TIMES', Blockly.Python.ORDER_ATOMIC);
    var d = Blockly.Python.statementToCode(a, "DO"),
        d = Blockly.Python.addLoopTrap(d, a.id) || Blockly.Python.PASS;
    return 'for _my_variable in range(' + times + '):\n' + d;
};