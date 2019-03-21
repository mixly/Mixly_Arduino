'use strict';

goog.provide('Blockly.Python.hardware');

goog.require('Blockly.Python');

Blockly.Python.sensor_mixgo_button_is_pressed = function(){
    Blockly.Python.definitions_['import_s4alib'] = 'import s4alib';
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var code =  'mixgo.'+btn + '.is_pressed()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
