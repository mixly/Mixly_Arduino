import * as Blockly from 'blockly/core';

export const PGA_SELET = function (_, generator) {
    var code = this.getFieldValue('PGA');
    return [code, generator.ORDER_ATOMIC];
}

export const inout_highlow = function (_, generator) {
    // Boolean values HIGH and LOW.
    var code = (this.getFieldValue('BOOL') == 'HIGH') ? '1' : '0';
    return [code, generator.ORDER_ATOMIC];
}

// ok
export const inout_digital_init = function (_, generator) {
    generator.definitions_['import board'] = 'import board';
    var pin_obj = this.getFieldValue('PIN_OBJ') || 'pin#';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('MODE');
    var varName = (pin_obj == 'pin#') ? 'pin' + dropdown_pin : generator.variableDB_.getName(pin_obj, Blockly.Variables.NAME_TYPE);
    var code = varName + ' = board.pin(' + dropdown_pin + ', board.' + dropdown_mode + ')\n';
    return code;
}

export const inout_digital_write = function (_, generator) {
    generator.definitions_['import board'] = 'import board';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_stat = generator.valueToCode(this, 'STAT', generator.ORDER_ATOMIC);
    var code = "";
    code = 'pin' + dropdown_pin + '.value(' + dropdown_stat + ')\n'
    return code;
}

export const inout_digital_read = function (_, generator) {
    generator.definitions_['import board'] = 'import board';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = "";
    code = 'pin' + dropdown_pin + '.value()';
    return [code, generator.ORDER_ATOMIC];
}

export const inout_pwm_init = function (_, generator) {
    generator.definitions_['import board'] = 'import board';
    generator.definitions_['from machine import PWM'] = 'from machine import PWM';
    generator.definitions_['from machine import Timer'] = 'from machine import Timer';
    var pin_obj = this.getFieldValue('PIN_OBJ') || 'pin#';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var varName = (pin_obj == 'pin#') ? 'pin' + dropdown_pin : generator.variableDB_.getName(pin_obj, Blockly.Variables.NAME_TYPE);
    var freq = generator.valueToCode(this, 'freq', generator.ORDER_ATOMIC);
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var Timer = sub % 3
    var CHANNEL = parseInt(sub / 3)
    var code1 = 'tim' + sub + ' = Timer(Timer.TIMER' + Timer + ',Timer.CHANNEL' + CHANNEL + ', mode=Timer.MODE_PWM)\n';
    var code2 = varName + ' = PWM(tim' + sub + ',freq=' + freq + ',duty=0, pin=' + dropdown_pin + ')\n';

    return code1 + code2;
}

export const inout_pwm_write = function (_, generator) {
    generator.definitions_['from machine import PWM'] = 'from machine import PWM';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_stat = generator.valueToCode(this, 'pwm', generator.ORDER_ATOMIC);
    var code = "";
    code = 'pin' + dropdown_pin + '.duty(' + dropdown_stat + ')\n'
    return code;
}

export const inout_adc_init = function (_, generator) {
    generator.definitions_['import board'] = 'import board';
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var code = 'board.adc_init(' + key + ')\n';
    return code;
}

export const inout_adc_read = function (_, generator) {
    generator.definitions_['import board'] = 'import board';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'board.adc_read(' + pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const inout_adc_Vread = function (_, generator) {
    generator.definitions_['import board'] = 'import board';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'board.adc_vread(' + pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const inout_pin_attachInterrupt = function (_, generator) {
    generator.definitions_['import board'] = 'import board';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var atta = generator.valueToCode(this, 'DO', generator.ORDER_ATOMIC);
    var code1 = 'key' + dropdown_pin + '=board.pin(' + dropdown_pin + ', board.GPIO.IN, board.GPIO.PULL_NONE)\n'
    var code2 = 'key' + dropdown_pin + '.irq(' + atta + ',board.' + dropdown_mode + ',board.GPIO.WAKEUP_NOT_SUPPORT, 7)\n'

    return code1 + code2;
}

export const inout_pin_disirq = function (_, generator) {
    generator.definitions_['import board'] = 'import board';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'key' + dropdown_pin + '.disirq()\n'
    return code;
}
/////////////////////////////////////////////