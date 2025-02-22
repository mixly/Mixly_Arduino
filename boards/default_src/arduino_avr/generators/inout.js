import { Profile } from 'mixly';

export const inout_highlow = function (_, generator) {
    // Boolean values HIGH and LOW.
    var code = (this.getFieldValue('BOOL') == 'HIGH') ? 'HIGH' : 'LOW';
    return [code, generator.ORDER_ATOMIC];
}

export const inout_pinMode = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('MODE');
    //
    var code = 'pinMode(' + dropdown_pin + ', ' + dropdown_mode + ');\n';
    return code;
}

export const inout_digital_write2 = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_stat = generator.valueToCode(this, 'STAT', generator.ORDER_ATOMIC);
    var code = "";
    var isVar = true;
    for (var pin of Profile.default.digital) {
        if (pin[1] === dropdown_pin) {
            isVar = false;
            break;
        }
    }
    if (isVar) {
        code = code + 'pinMode(' + dropdown_pin + ', OUTPUT);\n';
    } else {
        if (generator.setups_['setup_input_' + dropdown_pin]) {
            delete generator.setups_['setup_input_' + dropdown_pin];
        }
        generator.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
    }
    code += 'digitalWrite(' + dropdown_pin + ', ' + dropdown_stat + ');\n'
    return code;
}

export const inout_digital_read = function (_, generator) {
    var dropdown_pin = this.getFieldValue('PIN');
    generator.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'digitalRead(' + dropdown_pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const inout_digital_read2 = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'digitalRead(' + dropdown_pin + ')';
    var isVar = true;
    for (var pin of Profile.default.digital) {
        if (pin[1] === dropdown_pin) {
            isVar = false;
            break;
        }
    }
    if (!isVar) {
        if (!generator.setups_['setup_output_' + dropdown_pin]) {
            generator.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
        }
        if (generator.setups_['setup_setup']) { //解决pullup重复问题
            if (generator.setups_['setup_setup'].indexOf('pinMode(' + dropdown_pin) > -1) {
                delete generator.setups_['setup_input_' + dropdown_pin];
            }
        }
    }
    return [code, generator.ORDER_ATOMIC];
}

export const inout_analog_write = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    //var dropdown_stat = this.getFieldValue('STAT');
    var value_num = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    const { pwm } = Profile.default;
    if (typeof pwm === 'object') {
        for (let i of pwm)
            if (dropdown_pin === i[1]) {
                generator.setups_['setup_output' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
                break;
            }
    }
    var code = 'analogWrite(' + dropdown_pin + ', ' + value_num + ');\n';
    return code;
}

export const inout_analog_read = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    const { analog } = Profile.default;
    if (typeof analog === 'object') {
        for (let i of analog)
            if (dropdown_pin === i[1]) {
                //generator.setups_['setup_output' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
                break;
            }
    }
    var code = 'analogRead(' + dropdown_pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const inout_buildin_led = function (_, generator) {
    var dropdown_stat = this.getFieldValue('STAT');
    generator.setups_['setup_output_13'] = 'pinMode(13, OUTPUT);';
    var code = 'digitalWrite(13, ' + dropdown_stat + ');\n'
    return code;
}

export const OneButton_interrupt = function (_, generator) {
    generator.definitions_['include_OneButton'] = '#include <OneButton.h>';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var dropdown_stat = generator.valueToCode(this, 'STAT', generator.ORDER_ATOMIC);
    generator.definitions_['var_declare_button' + dropdown_pin] = 'OneButton button' + dropdown_pin + '(' + dropdown_pin + ', ' + ((dropdown_stat == 'HIGH') ? 'false' : 'true') + ');';
    generator.setups_['setup_onebutton_' + dropdown_pin + dropdown_mode] = 'button' + dropdown_pin + '.' + dropdown_mode + '(' + dropdown_mode + dropdown_pin + ');';
    var code = 'button' + dropdown_pin + '.tick();';
    var funcName = dropdown_mode + dropdown_pin;
    var branch = generator.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    generator.definitions_[funcName] = code2;
    return code;
}

export const controls_attachInterrupt = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    generator.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT_PULLUP);';
    //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
    var interrupt_pin = 'digitalPinToInterrupt(' + dropdown_pin + ')';
    var code = 'attachInterrupt' + '(' + interrupt_pin + ',' + 'attachInterrupt_fun_' + dropdown_mode + '_' + dropdown_pin + ', ' + dropdown_mode + ');\n'
    var funcName = 'attachInterrupt_fun_' + dropdown_mode + '_' + dropdown_pin;
    var branch = generator.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    generator.definitions_[funcName] = code2;
    return code;
}

export const controls_detachInterrupt = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    generator.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
    var interrupt_pin = 'digitalPinToInterrupt(' + dropdown_pin + ')';
    var code = 'detachInterrupt' + '(' + interrupt_pin + ');\n'
    return code;
}

export const controls_attachPinInterrupt = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    generator.definitions_['include_PinChangeInterrupt'] = '#include <PinChangeInterrupt.h>';
    generator.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
    var code = 'attachPCINT(digitalPinToPCINT(' + dropdown_pin + '),' + 'attachPinInterrupt_fun_' + dropdown_mode + '_' + dropdown_pin + ', ' + dropdown_mode + ');\n'
    var funcName = 'attachPinInterrupt_fun_' + dropdown_mode + '_' + dropdown_pin;
    var branch = generator.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    generator.definitions_[funcName] = code2;
    return code;
}

export const controls_detachPinInterrupt = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    generator.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
    var code = 'detachPCINT(digitalPinToPCINT(' + dropdown_pin + '));\n'
    return code;
}


export const inout_pulseIn = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_stat = this.getFieldValue('STAT');
    generator.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'pulseIn(' + dropdown_pin + ', ' + dropdown_stat + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const inout_pulseIn2 = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_stat = this.getFieldValue('STAT');
    var timeout = generator.valueToCode(this, 'TIMEOUT', generator.ORDER_ATOMIC) || '0';
    generator.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'pulseIn(' + dropdown_pin + ', ' + dropdown_stat + ', ' + timeout + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const inout_shiftout = function (_, generator) {
    var dropdown_pin1 = generator.valueToCode(this, 'PIN1', generator.ORDER_ATOMIC);
    var dropdown_pin2 = generator.valueToCode(this, 'PIN2', generator.ORDER_ATOMIC);
    var dropdown_order = this.getFieldValue('ORDER');
    var value = generator.valueToCode(this, 'DATA', generator.ORDER_ATOMIC) || '0';
    generator.setups_['setup_output_' + dropdown_pin1] = 'pinMode(' + dropdown_pin1 + ', OUTPUT);';
    generator.setups_['setup_output_' + dropdown_pin2] = 'pinMode(' + dropdown_pin2 + ', OUTPUT);';
    var code = 'shiftOut(' + dropdown_pin1 + ', ' + dropdown_pin2 + ', ' + dropdown_order + ', ' + value + ');\n'
    return code;
}

export const ESP32touchButton = function (_, generator) {
    generator.definitions_['include_ESP32touchButton'] = '#include <ESP32touchButton.h>';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    generator.definitions_['var_declare_button' + dropdown_pin] = 'ESP32touchButton button' + dropdown_pin + '(' + dropdown_pin + ', true);';
    generator.setups_['setup_onebutton_' + dropdown_pin + dropdown_mode] = 'button' + dropdown_pin + '.' + dropdown_mode + '(' + dropdown_mode + dropdown_pin + ');';
    var code = 'button' + dropdown_pin + '.tick();';
    var funcName = dropdown_mode + dropdown_pin;
    var branch = generator.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    generator.definitions_[funcName] = code2;
    return code;
}

export const inout_soft_analog_write = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var value_num = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    generator.definitions_['include_SoftPWM'] = '#include <SoftPWM.h>';
    generator.setups_['setup_soft_analog_write'] = 'SoftPWMBegin();';
    var code = 'SoftPWMSet(' + dropdown_pin + ', ' + value_num + ');\n';
    return code;
}

export const inout_cancel_soft_analog_write = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    generator.definitions_['include_SoftPWM'] = '#include <SoftPWM.h>';
    generator.setups_['setup_soft_analog_write'] = 'SoftPWMBegin();';
    var code = 'SoftPWMEnd(' + dropdown_pin + ');\n';
    return code;
}

// ADS1015模数转换模块 设置范围以及精度
export const ADS1015_setGain = function (_, generator) {
    var GAIN = this.getFieldValue('ADS1015_setGain');
    generator.definitions_['include_Wire'] = '#include <Wire.h>';
    generator.definitions_['include_Adafruit_ADS1015'] = '#include <Adafruit_ADS1015.h>';
    generator.definitions_['var_declare_Adafruit_ADS1015_ads'] = 'Adafruit_ADS1015 ads;\n';
    generator.setups_['setup_ads.begin()'] = 'ads.begin();\n';
    generator.setups_['setup_ads.setGain'] = 'ads.setGain(' + GAIN + ');';
    var code = '';
    return code;
}

// ADS1015模数转换模块 采集数值
export const ADS1015_Get_Value = function (_, generator) {
    generator.definitions_['include_Wire'] = '#include <Wire.h>';
    generator.definitions_['include_Adafruit_ADS1015'] = '#include <Adafruit_ADS1015.h>';
    generator.definitions_['var_declare_Adafruit_ADS1015_ads'] = 'Adafruit_ADS1015 ads;\n';
    generator.setups_['setup_ads.begin()'] = 'ads.begin();';
    var dropdown_type = this.getFieldValue('ADS1015_AIN');
    var code = dropdown_type;
    return [code, generator.ORDER_ATOMIC];
}

// PCF8591T模数转换模块 采集数值
export const PCF8591T = function (_, generator) {
    //generator.definitions_['include_Wire'] = '#include <Arduino.h>';
    generator.definitions_['include_PCF8591_h'] = '#include <PCF8591.h>';
    generator.definitions_['var_declare_PCF8591'] = 'PCF8591 pcf8591(0x48);';
    generator.setups_['setup_pcf8591.begin()'] = 'pcf8591.begin();\n';
    var dropdown_type = this.getFieldValue('PCF8591T_AIN');
    var code = dropdown_type;
    return [code, generator.ORDER_ATOMIC];
}