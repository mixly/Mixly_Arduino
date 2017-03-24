'use strict';

goog.provide('Blockly.Arduino.base');

goog.require('Blockly.Arduino');

Blockly.Arduino.inout_highlow = function () {
    // Boolean values HIGH and LOW.
    var code = (this.getFieldValue('BOOL') == 'HIGH') ? 'HIGH' : 'LOW';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.inout_pinMode = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('MODE');
    //
    var code = 'pinMode(' + dropdown_pin + ', ' + dropdown_mode + ');\n';
    return code;
};

Blockly.Arduino.inout_digital_write = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var dropdown_stat = this.getFieldValue('STAT');
    Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
    var code = 'digitalWrite(' + dropdown_pin + ',' + dropdown_stat + ');\n'
    return code;
};

Blockly.Arduino.inout_digital_write2 = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_stat = Blockly.Arduino.valueToCode(this, 'STAT', Blockly.Arduino.ORDER_ATOMIC);
    var code = "";
    if (window.isNaN(dropdown_pin)) {
        code = code + 'pinMode(' + dropdown_pin + ', OUTPUT);\n';
    } else {
        if (Blockly.Arduino.setups_['setup_input_' + dropdown_pin])
            delete Blockly.Arduino.setups_['setup_input_' + dropdown_pin];
        Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';

    }
    code += 'digitalWrite(' + dropdown_pin + ',' + dropdown_stat + ');\n'
    return code;
};

Blockly.Arduino.inout_digital_read = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'digitalRead(' + dropdown_pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.inout_digital_read2 = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var code = "";
    if (window.isNaN(dropdown_pin) && !(new RegExp("^A([0-9]|10|11|12|13|14|15)$").test(dropdown_pin))) {
        var funcName = 'mixly_digitalRead';
        var code2 = 'int' + ' ' + funcName + '(uint8_t pin) {\n'
        + '  pinMode(pin, INPUT);\n'
        + '  return digitalRead(pin);\n'
        + '}\n';
        Blockly.Arduino.definitions_[funcName] = code2;
        code = 'mixly_digitalRead(' + dropdown_pin + ')';
    } else {
        if (Blockly.Arduino.setups_['setup_output_' + dropdown_pin]) {
            //存在pinMode已设为output则不再设为input
        } else {
            Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
        }
        if (Blockly.Arduino.setups_['setup_setup']) { //解决pullup重复问题
            if (Blockly.Arduino.setups_['setup_setup'].indexOf('pinMode(' + dropdown_pin) > -1) {
                delete Blockly.Arduino.setups_['setup_input_' + dropdown_pin];
            }
        }
        code = 'digitalRead(' + dropdown_pin + ')';
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.inout_analog_write = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    //var dropdown_stat = this.getFieldValue('STAT');
    var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
    //Blockly.Arduino.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
    var code = 'analogWrite(' + dropdown_pin + ',' + value_num + ');\n';
    return code;
};

Blockly.Arduino.inout_analog_read = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    //Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
    var code = 'analogRead(' + dropdown_pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.inout_buildin_led = function () {
    var dropdown_stat = this.getFieldValue('STAT');
    Blockly.Arduino.setups_['setup_output_13'] = 'pinMode(13, OUTPUT);';
    var code = 'digitalWrite(13,' + dropdown_stat + ');\n'
    return code;
};

Blockly.Arduino.controls_attachInterrupt = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
    var interrupt_pin = 'digitalPinToInterrupt(' + dropdown_pin + ')';
    var code = 'attachInterrupt' + '(' + interrupt_pin + ',' + 'attachInterrupt_fun_' + dropdown_pin + ',' + dropdown_mode + ');\n'
    var funcName = 'attachInterrupt_fun_' + dropdown_pin;
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
    return code;
};

Blockly.Arduino.controls_detachInterrupt = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
    var interrupt_pin = 'digitalPinToInterrupt(' + dropdown_pin + ')';
    var code = 'detachInterrupt' + '(' + interrupt_pin + ');\n'
    return code;
};

Blockly.Arduino.controls_attachPinInterrupt = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    Blockly.Arduino.definitions_['pin_interrupt'] = '#include <PinChangeInt.h>';
    Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
    var code = 'PCintPort::attachInterrupt' + '(' + dropdown_pin + ',' + 'attachPinInterrupt_fun_' + dropdown_pin + ',' + dropdown_mode + ');\n'
    var funcName = 'attachPinInterrupt_fun_' + dropdown_pin;
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
    return code;
};

Blockly.Arduino.controls_detachPinInterrupt = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
    var code = 'PCintPort::detachInterrupt' + '(' + dropdown_pin + ');\n'
    return code;
};


Blockly.Arduino.inout_pulseIn = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_stat = this.getFieldValue('STAT');
    Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'pulseIn(' + dropdown_pin + ', ' + dropdown_stat + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.inout_pulseIn2 = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_stat = this.getFieldValue('STAT');
    var timeout = Blockly.Arduino.valueToCode(this, 'TIMEOUT', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'pulseIn(' + dropdown_pin + ', ' + dropdown_stat + ', ' + timeout + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.inout_shiftout = function () {
    var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_order = this.getFieldValue('ORDER');
    var value = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.setups_['setup_output_' + dropdown_pin1] = 'pinMode(' + dropdown_pin1 + ', OUTPUT);';
    Blockly.Arduino.setups_['setup_output_' + dropdown_pin2] = 'pinMode(' + dropdown_pin2 + ', OUTPUT);';
    var code = 'shiftOut(' + dropdown_pin1 + ',' + dropdown_pin2 + ',' + dropdown_order + ',' + value + ');\n'
    return code;
};