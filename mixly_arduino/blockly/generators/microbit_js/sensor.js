'use strict';

goog.provide('Blockly.JavaScript.sensor');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.controls_attachGestureInterrupt = function(){
    var gesture = this.getFieldValue('gesture');
    var branch = Blockly.JavaScript.statementToCode(this, 'DO');
    var code = 'input.onGesture(Gesture.' + gesture + ", () => {\n" + branch + '\n});\n';
    Blockly.JavaScript.definitions_['func_gesture' + gesture] = code;
}

Blockly.JavaScript.sensor_get_acceleration = function(){
    var key = this.getFieldValue('key')
    var code = 'input.acceleration(' + key  + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.sensor_set_acceleration = function(){
    var key = this.getFieldValue('key')
    var code = 'input.setAccelerometerRange(' + key  + ');\n';
    return code;
};
Blockly.JavaScript.sensor_light_level= function(){
    return ['input.lightLevel()', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.sensor_calibrate_compass= function(){
    return 'input.calibrateCompass();\n';
};

Blockly.JavaScript.sensor_compass_heading= function(){
    return ['input.compassHeading()', Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript.sensor_temperature = function(){
    return ['input.temperature()', Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript.sensor_rotation = function(){
    var key = this.getFieldValue('key')
    var code = 'input.rotation(' + key  + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript.sensor_magnetic= function(){
    var key = this.getFieldValue('key')
    var code = 'input.magneticForce(' + key  + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

