import { Profile } from 'mixly';

export const inout_touchRead = function (_, generator) {
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'touchRead(' + pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const ledcSetup = function (_, generator) {
    var FREQ = generator.valueToCode(this, 'FREQ', generator.ORDER_ATOMIC);
    var RESOLUTION = generator.valueToCode(this, 'PWM_RESOLUTION', generator.ORDER_ATOMIC) || '8';
    var channel = generator.valueToCode(this, 'CHANNEL', generator.ORDER_ASSIGNMENT) || '0';
    generator.setups_['ledcSetup' + channel + FREQ + RESOLUTION] = 'ledcSetup(' + channel + ', ' + FREQ + ', ' + RESOLUTION + ');\n';
    return "";
}

export const ledcAttachPin = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var channel = generator.valueToCode(this, 'CHANNEL', generator.ORDER_ASSIGNMENT) || '0';
    var code = 'ledcAttachPin(' + dropdown_pin + ', ' + channel + ');\n';
    return code;
}

export const ledcDetachPin = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'ledcDetachPin(' + dropdown_pin + ');\n';
    return code;
}

export const ledcWrite = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var value_num = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    generator.definitions_['include_Arduino'] = '#include <Arduino.h>';
    const { analog } = Profile.default;
    if (typeof analog === 'object') {
        for (let i of analog)
            if (dropdown_pin === i[1]) {
                generator.setups_['setup_output' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
                break;
            }
    }
    var code = 'analogWrite(' + dropdown_pin + ', ' + value_num + ');\n';
    return code;
}

export const inout_pwm_analog_write = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var FREQ = generator.valueToCode(this, 'FREQ', generator.ORDER_ATOMIC);
    var value_num = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    var RESOLUTION = this.getFieldValue('RESOLUTION');
    var channel = generator.valueToCode(this, 'CHANNEL', generator.ORDER_ASSIGNMENT) || '0';
    generator.setups_['ledcSetup' + channel + FREQ + RESOLUTION] = 'ledcSetup(' + channel + ', ' + FREQ + ', ' + RESOLUTION + ');\n';
    generator.setups_['ledcAttachPin' + dropdown_pin + channel] = 'ledcAttachPin(' + dropdown_pin + ', ' + channel + ');\n   ';
    var code = 'ledcWrite(' + channel + ', ' + value_num + ');\n';
    return code;
}

export const controls_attachInterrupt = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    // generator.definitions_['pin_interrupt'] = '#include <Arduino.h>';
    generator.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT_PULLUP);';
    var code = 'attachInterrupt' + '(' + dropdown_pin + ',' + 'attachInterrupt_fun_' + dropdown_pin + ',' + dropdown_mode + ');\n'
    var funcName = 'attachInterrupt_fun_' + dropdown_pin;
    var branch = generator.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    generator.definitions_[funcName] = code2;
    return code;
}

export const controls_detachInterrupt = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    generator.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'detachInterrupt' + '(' + dropdown_pin + ');\n'
    return code;
}

export const touchAttachInterrupt = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var threshold = generator.valueToCode(this, 'threshold', generator.ORDER_ATOMIC);
    generator.setups_['touchAttachInterrupt' + dropdown_pin] = 'touchAttachInterrupt(' + dropdown_pin + ',gotTouch' + dropdown_pin + ', ' + threshold + ');';
    var code = '';
    var funcName = 'gotTouch' + dropdown_pin;
    var branch = generator.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    generator.definitions_[funcName] = code2;
    return code;
}

export const inout_esp32_dac = function (_, generator) {
    var PIN = this.getFieldValue('PIN');
    var value = generator.valueToCode(this, 'value', generator.ORDER_ATOMIC);
    var code = 'dacWrite(' + PIN + ', ' + value + ');\n';
    return code;
}

export const esp32_led_pwm = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var val = generator.valueToCode(this, 'val', generator.ORDER_ATOMIC);
    var resolution = this.getFieldValue('resolution');
    var freq = this.getFieldValue('freq');
    var ledChannel = this.getFieldValue('ledChannel');
    generator.setups_['ledChannel' + ledChannel] = 'ledcSetup(' + ledChannel + ', ' + freq + ', ' + resolution + ');';
    generator.setups_['ledChannel' + dropdown_pin] = 'ledcAttachPin(' + dropdown_pin + ', ' + ledChannel + ');';
    var code = 'ledcWrite(' + ledChannel + ', ' + val + ');\n';
    return code;
}