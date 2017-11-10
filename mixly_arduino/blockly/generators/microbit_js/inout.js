'use strict';

goog.provide('Blockly.JavaScript.base');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.inout_highlow = function () {
    // Boolean values HIGH and LOW.
    var code = (this.getFieldValue('BOOL') == 'HIGH') ? '1' : '0';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.inout_pinMode = function () {
    var dropdown_pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('MODE');
    //
    var code = 'pinMode(' + dropdown_pin + ', ' + dropdown_mode + ');\n';
    return code;
};

Blockly.JavaScript.inout_digital_write = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var dropdown_stat = this.getFieldValue('STAT');
    Blockly.JavaScript.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
    var code = 'digitalWrite(' + dropdown_pin + ',' + dropdown_stat + ');\n'
    return code;
};

Blockly.JavaScript.inout_digital_write2 = function () {
    var dropdown_pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_stat = Blockly.JavaScript.valueToCode(this, 'STAT', Blockly.JavaScript.ORDER_ATOMIC);
    var code = "";
    code += 'pins.digitalWritePin(' + dropdown_pin + ',' + dropdown_stat + ');\n'
    return code;
};

Blockly.JavaScript.inout_digital_read = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    Blockly.JavaScript.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'digitalRead(' + dropdown_pin + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.inout_digital_read2 = function () {
    var dropdown_pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ATOMIC);
    var code = "";
    code = 'pins.digitalReadPin(' + dropdown_pin + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.inout_analog_write = function () {
    var dropdown_pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ATOMIC);
    //var dropdown_stat = this.getFieldValue('STAT');
    var value_num = Blockly.JavaScript.valueToCode(this, 'NUM', Blockly.JavaScript.ORDER_ATOMIC);
    //Blockly.JavaScript.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
    var code = 'pins.analogWritePin(' + dropdown_pin + ',' + value_num + ');\n';
    return code;
};
Blockly.JavaScript.inout_analog_write_set = function () {
    var dropdown_pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ATOMIC);
    var value_num = Blockly.JavaScript.valueToCode(this, 'NUM', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'pins.analogSetPeriod(' + dropdown_pin + ',' + value_num + ');\n';
    return code;
};

Blockly.JavaScript.inout_analog_read = function () {
    var dropdown_pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ATOMIC);
    //Blockly.JavaScript.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
    var code = 'pins.analogReadPin(' + dropdown_pin + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript.inout_buildin_led = function () {
    var dropdown_stat = this.getFieldValue('STAT');
    Blockly.JavaScript.setups_['setup_output_13'] = 'pinMode(13, OUTPUT);';
    var code = 'digitalWrite(13,' + dropdown_stat + ');\n'
    return code;
};

Blockly.JavaScript.controls_attachInterrupt = function () {
    var dropdown_pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var func = "input.onPinPressed";
    var branch = Blockly.JavaScript.statementToCode(this, 'DO');
    var code = "";
    if(dropdown_mode !== "CHANGE") {
        if (dropdown_mode === "RISING") func = "input.onPinReleased";
        else func = "input.onPinPressed";
        code = func + '(' + dropdown_pin + ', () => {\n' + branch + '\n});\n'
    }else{
        code = 'input.onPinReleased(' + dropdown_pin + ', () => {\n' + branch + '\n});\n'
        code += 'input.onPinPressed(' + dropdown_pin + ', () => {\n' + branch + '\n});\n'
    }

    Blockly.JavaScript.definitions_['func_' + func + dropdown_pin + '_' + dropdown_mode] = code;
};

Blockly.JavaScript.controls_attachBtnInterrupt = function () {
    var dropdown_pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var func = "input.onButtonPressed";
    //if(dropdown_mode === "RELEASED") func = "input.onPinReleased";
    var branch = Blockly.JavaScript.statementToCode(this, 'DO');
    var code = func + '(' + dropdown_pin + ', () => {\n' + branch + '\n});\n'
    Blockly.JavaScript.definitions_['func_' + func + dropdown_pin + '_' + dropdown_mode] = code;
};



Blockly.JavaScript.controls_detachInterrupt = function () {
    var dropdown_pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ATOMIC);
    Blockly.JavaScript.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
    var interrupt_pin = 'digitalPinToInterrupt(' + dropdown_pin + ')';
    var code = 'detachInterrupt' + '(' + interrupt_pin + ');\n'
    return code;
};

Blockly.JavaScript.controls_attachPinInterrupt = function () {
    var dropdown_pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    Blockly.JavaScript.definitions_['pin_interrupt'] = '#include <PinChangeInt.h>';
    Blockly.JavaScript.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
    var code = 'PCintPort::attachInterrupt' + '(' + dropdown_pin + ',' + 'attachPinInterrupt_fun_' + dropdown_pin + ',' + dropdown_mode + ');\n'
    var funcName = 'attachPinInterrupt_fun_' + dropdown_pin;
    var branch = Blockly.JavaScript.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    Blockly.JavaScript.definitions_[funcName] = code2;
    return code;
};

Blockly.JavaScript.controls_attachInterruptPulse = function () {
    var dropdown_pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('STAT');

    var branch = Blockly.JavaScript.statementToCode(this, 'DO');
    var code = 'pins.onPulsed(' + dropdown_pin + ', ' + dropdown_mode + ', () => {\n' + branch + '};\n';
    Blockly.JavaScript.definitions_['func_pin.onPulsed_' + dropdown_pin + "_" + dropdown_mode] = code;
};

Blockly.JavaScript.controls_detachPinInterrupt = function () {
    var dropdown_pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ATOMIC);
    Blockly.JavaScript.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
    var code = 'PCintPort::detachInterrupt' + '(' + dropdown_pin + ');\n'
    return code;
};


Blockly.JavaScript.inout_pulseIn = function () {
    var dropdown_pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_stat = this.getFieldValue('STAT');
    var code = 'pins.pulseIn(' + dropdown_pin + ', ' + dropdown_stat + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.inout_last_pulse_period = function () {
    var code = 'pins.pulseDuration()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.inout_pulseIn2 = function () {
    var dropdown_pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_stat = this.getFieldValue('STAT');
    var timeout = Blockly.JavaScript.valueToCode(this, 'TIMEOUT', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    Blockly.JavaScript.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'pulseIn(' + dropdown_pin + ', ' + dropdown_stat + ', ' + timeout + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.inout_shiftout = function () {
    var dropdown_pin1 = Blockly.JavaScript.valueToCode(this, 'PIN1', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_pin2 = Blockly.JavaScript.valueToCode(this, 'PIN2', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_order = this.getFieldValue('ORDER');
    var value = Blockly.JavaScript.valueToCode(this, 'DATA', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    Blockly.JavaScript.setups_['setup_output_' + dropdown_pin1] = 'pinMode(' + dropdown_pin1 + ', OUTPUT);';
    Blockly.JavaScript.setups_['setup_output_' + dropdown_pin2] = 'pinMode(' + dropdown_pin2 + ', OUTPUT);';
    var code = 'shiftOut(' + dropdown_pin1 + ',' + dropdown_pin2 + ',' + dropdown_order + ',' + value + ');\n'
    return code;
};

Blockly.JavaScript.inout_analog_pitch = function() {

    var argument0 = Blockly.JavaScript.valueToCode(this, 'FROM',
        Blockly.JavaScript.ORDER_NONE) || '0';
    var argument1 = Blockly.JavaScript.valueToCode(this, 'TO',
        Blockly.JavaScript.ORDER_NONE) || '0';
    var code = 'pins.analogPitch(' + argument1 + ',' + argument0 +  ');\n ';
    return code;
};

Blockly.JavaScript.inout_emit_events = function () {
    var dropdown_pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ATOMIC);
    var event = this.getFieldValue('event');
    var code = "";
    code += 'pins.setEvents(' + dropdown_pin +',PinEventType.'+ event + ');\n'
    return code;
};

Blockly.JavaScript.inout_set_pitch_pin = function () {
    var dropdown_pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ATOMIC);
    var code = "";
    code += 'pins.analogSetPitchPin(' + dropdown_pin + ');\n'
    return code;
};

Blockly.JavaScript.inout_set_pull = function () {
    var dropdown_pin = Blockly.JavaScript.valueToCode(this, 'PIN', Blockly.JavaScript.ORDER_ATOMIC);
    var pull = this.getFieldValue('pull');
    var code = "";
    code += 'pins.setPull(' + dropdown_pin + ', PinPullMode.Pull'+ pull + ');\n'
    return code;
};
Blockly.JavaScript.sensor_button_pressed = function(){
    var btn = Blockly.JavaScript.valueToCode(this, 'btn', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'input.buttonIsPressed(' + btn  + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript.sensor_pin_pressed = function(){
    var pin = Blockly.JavaScript.valueToCode(this, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'input.pinIsPressed(' + pin  + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
