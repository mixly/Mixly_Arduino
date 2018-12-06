'use strict';

goog.provide('Blockly.Python.sensor');

goog.require('Blockly.Python');

//ok
Blockly.Python.sensor_handbit_button_is_pressed = function(){
    Blockly.Python.definitions_['import_handbit'] = 'import handbit';
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var code =  'handbit.'+btn + '.is_pressed()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_handbit_button_was_pressed = function(){
    Blockly.Python.definitions_['import_handbit'] = 'import handbit';
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var code =  'handbit.'+btn + '.was_pressed()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_handbit_button_get_presses = function(){
    Blockly.Python.definitions_['import_handbit'] = 'import handbit';
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var code =  'handbit.'+btn + '.get_presses()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_handbit_button_attachInterrupt = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_handbit'] = 'import handbit';
    var dropdown_btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var atta = Blockly.Python.valueToCode(this, 'DO', Blockly.Python.ORDER_ATOMIC);
    var code = 'handbit.' + dropdown_btn + '.irq' + '(handler = ' + atta + ', trigger = ' + dropdown_mode + ')\n'
    return code;
};

Blockly.Python.sensor_handbit_light= function(){
    Blockly.Python.definitions_['import_handbit'] = 'import handbit';
    return ['handbit.handbit_get_brightness()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_handbit_sound= function(){
    Blockly.Python.definitions_['import_handbit'] = 'import handbit';
    return ['handbit.handbit_get_soundlevel()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.handbit_number1 = function(){
    Blockly.Python.definitions_['import_handbit'] = 'import handbit';
    var code = this.getFieldValue('op');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_handbit_pin_pressed = function(){
    Blockly.Python.definitions_['import_handbit'] = 'import handbit';
    var pin = Blockly.Python.valueToCode(this, 'button', Blockly.Python.ORDER_ATOMIC);
    var code = 'handbit.'+pin+'.is_touched()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

//ok
Blockly.Python.sensor_handbit_get_acceleration = function(){
    Blockly.Python.definitions_['import_handbit'] = 'import handbit';
    var key = this.getFieldValue('key');
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    if (v=='accelerometer')
        Blockly.Python.definitions_['import_handbit_accelerometer'] = 'from handbit import accelerometer';
    v=v.replace('handbit_ac','handbit.ac');
    var code = v+'.get_a_' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};