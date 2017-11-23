'use strict';

goog.provide('Blockly.Python.base');

goog.require('Blockly.Python');
// ok
Blockly.Python.inout_highlow = function () {
    // Boolean values HIGH and LOW.
    var code = (this.getFieldValue('BOOL') == 'HIGH') ? '1' : '0';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.inout_pinMode = function () {
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('MODE');
    //
    var code = 'pinMode(' + dropdown_pin + ', ' + dropdown_mode + ');\n';
    return code;
};

Blockly.Python.inout_digital_write = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var dropdown_stat = this.getFieldValue('STAT');
    Blockly.Python.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
    var code = 'digitalWrite(' + dropdown_pin + ',' + dropdown_stat + ');\n'
    return code;
};
// ok
Blockly.Python.inout_digital_write2 = function () {
    Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_stat = Blockly.Python.valueToCode(this, 'STAT', Blockly.Python.ORDER_ATOMIC);
    var code = "";
    // code += 'pins.digitalWritePin(' + dropdown_pin + ',' + dropdown_stat + ');\n'
    code += 'pin'+ dropdown_pin +'.write_digital('+ dropdown_stat +')\n'
    return code;
};

Blockly.Python.inout_digital_read = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    Blockly.Python.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'digitalRead(' + dropdown_pin + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
// ok
Blockly.Python.inout_digital_read2 = function () {
    Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code = "";
    code = 'pin' + dropdown_pin + '.read_digital()\n';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.inout_analog_write = function () {
    Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    //var dropdown_stat = this.getFieldValue('STAT');
    var value_num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
    //Blockly.Python.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
    var code = 'pin' + dropdown_pin + '.write_analog(' + value_num + ')\n';
    return code;
};
//ok
Blockly.Python.inout_analog_write_set = function () {
    Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var value_num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
    var code = 'pin' + dropdown_pin  + '.set_analog_period(' + value_num + ')\n';
    return code;
};
//ok
Blockly.Python.inout_analog_read = function () {
    Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    //Blockly.Python.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
    var code = 'pin' + dropdown_pin + '.read_analog()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.inout_buildin_led = function () {
    var dropdown_stat = this.getFieldValue('STAT');
    Blockly.Python.setups_['setup_output_13'] = 'pinMode(13, OUTPUT);';
    var code = 'digitalWrite(13,' + dropdown_stat + ');\n'
    return code;
};

Blockly.Python.controls_attachInterrupt = function () {
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var func = "input.onPinPressed";
    var branch = Blockly.Python.statementToCode(this, 'DO');
    var code = "";
    if(dropdown_mode !== "CHANGE") {
        if (dropdown_mode === "RISING") func = "input.onPinReleased";
        else func = "input.onPinPressed";
        code = func + '(' + dropdown_pin + ', () => {\n' + branch + '\n});\n'
    }else{
        code = 'input.onPinReleased(' + dropdown_pin + ', () => {\n' + branch + '\n});\n'
        code += 'input.onPinPressed(' + dropdown_pin + ', () => {\n' + branch + '\n});\n'
    }

    Blockly.Python.definitions_['func_' + func + dropdown_pin + '_' + dropdown_mode] = code;
};

Blockly.Python.controls_attachBtnInterrupt = function () {
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var func = "input.onButtonPressed";
    //if(dropdown_mode === "RELEASED") func = "input.onPinReleased";
    var branch = Blockly.Python.statementToCode(this, 'DO');
    var code = func + '(' + dropdown_pin + ', () => {\n' + branch + '\n});\n'
    Blockly.Python.definitions_['func_' + func + dropdown_pin + '_' + dropdown_mode] = code;
};



Blockly.Python.controls_detachInterrupt = function () {
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
    var interrupt_pin = 'digitalPinToInterrupt(' + dropdown_pin + ')';
    var code = 'detachInterrupt' + '(' + interrupt_pin + ');\n'
    return code;
};

Blockly.Python.controls_attachPinInterrupt = function () {
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    Blockly.Python.definitions_['pin_interrupt'] = '#include <PinChangeInt.h>';
    Blockly.Python.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
    var code = 'PCintPort::attachInterrupt' + '(' + dropdown_pin + ',' + 'attachPinInterrupt_fun_' + dropdown_pin + ',' + dropdown_mode + ');\n'
    var funcName = 'attachPinInterrupt_fun_' + dropdown_pin;
    var branch = Blockly.Python.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    Blockly.Python.definitions_[funcName] = code2;
    return code;
};

Blockly.Python.controls_attachInterruptPulse = function () {
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('STAT');

    var branch = Blockly.Python.statementToCode(this, 'DO');
    var code = 'pins.onPulsed(' + dropdown_pin + ', ' + dropdown_mode + ', () => {\n' + branch + '};\n';
    Blockly.Python.definitions_['func_pin.onPulsed_' + dropdown_pin + "_" + dropdown_mode] = code;
};

Blockly.Python.controls_detachPinInterrupt = function () {
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
    var code = 'PCintPort::detachInterrupt' + '(' + dropdown_pin + ');\n'
    return code;
};


Blockly.Python.inout_pulseIn = function () {
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_stat = this.getFieldValue('STAT');
    var code = 'pins.pulseIn(' + dropdown_pin + ', ' + dropdown_stat + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.inout_last_pulse_period = function () {
    var code = 'pins.pulseDuration()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.inout_pulseIn2 = function () {
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_stat = this.getFieldValue('STAT');
    var timeout = Blockly.Python.valueToCode(this, 'TIMEOUT', Blockly.Python.ORDER_ATOMIC) || '0';
    Blockly.Python.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'pulseIn(' + dropdown_pin + ', ' + dropdown_stat + ', ' + timeout + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.inout_shiftout = function () {
    var dropdown_pin1 = Blockly.Python.valueToCode(this, 'PIN1', Blockly.Python.ORDER_ATOMIC);
    var dropdown_pin2 = Blockly.Python.valueToCode(this, 'PIN2', Blockly.Python.ORDER_ATOMIC);
    var dropdown_order = this.getFieldValue('ORDER');
    var value = Blockly.Python.valueToCode(this, 'DATA', Blockly.Python.ORDER_ATOMIC) || '0';
    Blockly.Python.setups_['setup_output_' + dropdown_pin1] = 'pinMode(' + dropdown_pin1 + ', OUTPUT);';
    Blockly.Python.setups_['setup_output_' + dropdown_pin2] = 'pinMode(' + dropdown_pin2 + ', OUTPUT);';
    var code = 'shiftOut(' + dropdown_pin1 + ',' + dropdown_pin2 + ',' + dropdown_order + ',' + value + ');\n'
    return code;
};

Blockly.Python.inout_analog_pitch = function() {

    var argument0 = Blockly.Python.valueToCode(this, 'FROM',
        Blockly.Python.ORDER_NONE) || '0';
    var argument1 = Blockly.Python.valueToCode(this, 'TO',
        Blockly.Python.ORDER_NONE) || '0';
    var code = 'pins.analogPitch(' + argument1 + ',' + argument0 +  ');\n ';
    return code;
};

Blockly.Python.inout_emit_events = function () {
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var event = this.getFieldValue('event');
    var code = "";
    code += 'pins.setEvents(' + dropdown_pin +',PinEventType.'+ event + ');\n'
    return code;
};

Blockly.Python.inout_set_pitch_pin = function () {
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code = "";
    code += 'pins.analogSetPitchPin(' + dropdown_pin + ');\n'
    return code;
};

Blockly.Python.inout_set_pull = function () {
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var pull = this.getFieldValue('pull');
    var code = "";
    code += 'pins.setPull(' + dropdown_pin + ', PinPullMode.Pull'+ pull + ');\n'
    return code;
};
//ok
Blockly.Python.sensor_button_is_pressed = function(){
    Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var code =  btn + '.is_pressed()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_button_was_pressed = function(){
    Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var code =  btn + '.was_pressed()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_button_get_presses = function(){
    Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var code =  btn + '.get_presses()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_pin_pressed = function(){
    Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
    var pin = Blockly.Python.valueToCode(this, 'pin', Blockly.Python.ORDER_ATOMIC);
    var code = 'pin'+ pin + '.is_touched()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
