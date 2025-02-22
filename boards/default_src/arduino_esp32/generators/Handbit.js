import { sensor_light, sensor_sound } from './sensor';

export const handbit_button_is_pressed = function (_, generator) {
    var btn = this.getFieldValue('btn');
    generator.setups_['setup_btn' + btn] = 'pinMode(' + btn + ',INPUT);';
    var code = '!digitalRead(' + btn + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const handbit_light = sensor_light;

export const handbit_sound = sensor_sound;

// 传感器_重力感应块
export const handbit_MSA300 = function (_, generator) {
    generator.definitions_['include_Wire'] = '#include <Wire.h>';
    generator.definitions_['include_MSA300'] = '#include <MSA300.h>';
    generator.definitions_['var_declare_MSA300'] = 'MSA300 msa;\n';
    generator.setups_['setup_msa.begin'] = 'msa.begin();';
    generator.setups_['setup_Wire.begin'] = 'Wire.begin();';
    var dropdown_type = this.getFieldValue('HANDBIT_MSA300_GETAB');
    var code = dropdown_type;
    return [code, generator.ORDER_ATOMIC];
}

// 传感器_重力感应块
export const handbit_MSA300_action = function (_, generator) {
    generator.definitions_['include_Wire'] = '#include <Wire.h>';
    generator.definitions_['include_MSA300'] = '#include <MSA300.h>';
    generator.definitions_['var_declare_MSA300'] = 'MSA300 msa;\n';
    generator.setups_['setup_msa.begin'] = 'msa.begin();';
    generator.setups_['setup_Wire.begin'] = 'Wire.begin();';
    var dropdown_type = this.getFieldValue('HANDBIT_MSA300_ACTION');
    var code = dropdown_type;
    return [code, generator.ORDER_ATOMIC];
}

export const touchAttachInterrupt = function (_, generator) {
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var threshold = generator.valueToCode(this, 'threshold', generator.ORDER_ATOMIC);
    generator.setups_['touchAttachInterrupt' + dropdown_pin] = 'touchAttachInterrupt(' + dropdown_pin + ',gotTouch' + dropdown_pin + ', ' + threshold + ');';
    //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
    var code = '';
    var funcName = 'gotTouch' + dropdown_pin;
    var branch = generator.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    generator.definitions_[funcName] = code2;
    return code;
}

export const inout_touchRead = function (_, generator) {
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = 'touchRead(' + pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const handbit_rgb = function (_, generator) {
    var value_led = generator.valueToCode(this, '_LED_', generator.ORDER_ATOMIC);
    var COLOR = generator.valueToCode(this, 'COLOR', generator.ORDER_ATOMIC);
    COLOR = COLOR.replace(/#/g, "0x");
    generator.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    generator.definitions_['var_declare_rgb_display17'] = 'Adafruit_NeoPixel rgb_display_17= Adafruit_NeoPixel(3,17,NEO_GRB + NEO_KHZ800);';
    generator.setups_['setup_rgb_display_begin_17'] = 'rgb_display_17.begin();';
    var code = 'rgb_display_17.setPixelColor(' + value_led + ' - 1,' + COLOR + ');\n';
    return code;
}

export const handbit_rgb2 = function (_, generator) {
    var COLOR1 = generator.valueToCode(this, 'COLOR1', generator.ORDER_ATOMIC);
    var COLOR2 = generator.valueToCode(this, 'COLOR2', generator.ORDER_ATOMIC);
    var COLOR3 = generator.valueToCode(this, 'COLOR3', generator.ORDER_ATOMIC);
    COLOR1 = COLOR1.replace(/#/g, "0x");
    COLOR2 = COLOR2.replace(/#/g, "0x");
    COLOR3 = COLOR3.replace(/#/g, "0x");
    generator.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    generator.definitions_['var_declare_rgb_display17'] = 'Adafruit_NeoPixel rgb_display_17= Adafruit_NeoPixel(3,17,NEO_GRB + NEO_KHZ800);';
    generator.setups_['setup_rgb_display_begin_17'] = 'rgb_display_17.begin();';
    var code = 'rgb_display_17.setPixelColor(0,' + COLOR1 + ');\n';
    code += 'rgb_display_17.setPixelColor(1,' + COLOR2 + ');\n';
    code += 'rgb_display_17.setPixelColor(2,' + COLOR3 + ');\n';
    return code;
}

export const handbit_rgb_Brightness = function (_, generator) {
    var Brightness = generator.valueToCode(this, 'Brightness', generator.ORDER_ATOMIC);
    generator.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    generator.definitions_['var_declare_rgb_display17'] = 'Adafruit_NeoPixel rgb_display_17= Adafruit_NeoPixel(3,17,NEO_GRB + NEO_KHZ800);';
    generator.setups_['setup_rgb_display_begin_17'] = 'rgb_display_17.begin();';
    var code = 'rgb_display_17.setBrightness(' + Brightness + ');\n';
    return code;
}

export const handbit_rgb_show = function () {
    var code = 'rgb_display_17.show();\n'
    // +'rgb_display_17.show();\ndelay(1);\n'
    return code;
}

export const handbit_rgb_rainbow1 = function (_, generator) {
    generator.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    generator.definitions_['var_declare_rgb_display17'] = 'Adafruit_NeoPixel rgb_display_17= Adafruit_NeoPixel(3,17,NEO_GRB + NEO_KHZ800);';
    var wait_time = generator.valueToCode(this, 'WAIT', generator.ORDER_ATOMIC);
    generator.setups_['setup_rgb_display_begin_17'] = 'rgb_display_17.begin();';
    var funcName2 = 'Wheel';
    var code2 = 'uint32_t Wheel(byte WheelPos) {\n';
    code2 += 'if(WheelPos < 85) \n{\nreturn rgb_display_17.Color(WheelPos * 3, 255 - WheelPos * 3, 0);\n} \n';
    code2 += 'else if(WheelPos < 170) \n{\nWheelPos -= 85; \nreturn rgb_display_17.Color(255 - WheelPos * 3, 0, WheelPos * 3);\n}\n ';
    code2 += 'else\n {\nWheelPos -= 170;\nreturn rgb_display_17.Color(0, WheelPos * 3, 255 - WheelPos * 3);\n}\n';
    code2 += '}\n';
    generator.definitions_[funcName2] = code2;
    var funcName3 = 'rainbow';
    var code3 = 'void rainbow(uint8_t wait) {\n uint16_t i, j;\n';
    code3 += 'for(j=0; j<256; j++) {\n';
    code3 += 'for(i=0; i<rgb_display_17.numPixels(); i++)\n {\n';
    code3 += 'rgb_display_17.setPixelColor(i, Wheel((i+j) & 255));\n}\n';
    code3 += 'rgb_display_17.show();\n';
    // code3 += 'delay(wait);'
    code3 += ' \n}\n}\n';
    generator.definitions_[funcName3] = code3;
    var code = 'rainbow(' + wait_time + ');\n'
    return code;
}

export const handbit_rgb_rainbow3 = function (_, generator) {
    generator.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    generator.definitions_['var_declare_rgb_display17'] = 'Adafruit_NeoPixel rgb_display_17= Adafruit_NeoPixel(3,17,NEO_GRB + NEO_KHZ800);';
    var rainbow_color = generator.valueToCode(this, 'rainbow_color', generator.ORDER_ATOMIC);
    var type = this.getFieldValue('TYPE');
    var funcName2 = 'Wheel';
    var code2 = 'uint32_t Wheel(byte WheelPos) {\n';
    code2 += 'if(WheelPos < 85)\n {\nreturn rgb_display_17.Color(WheelPos * 3, 255 - WheelPos * 3, 0);} \n';
    code2 += 'else if(WheelPos < 170)\n {\nWheelPos -= 85; return rgb_display_17.Color(255 - WheelPos * 3, 0, WheelPos * 3);}\n ';
    code2 += 'else {\nWheelPos -= 170;return rgb_display_17.Color(0, WheelPos * 3, 255 - WheelPos * 3);}\n';
    code2 += '}\n';
    generator.definitions_[funcName2] = code2;
    if (type == "normal")
        var code3 = 'for (int i = 0; i < rgb_display_17.numPixels(); i++)\n{rgb_display_17.setPixelColor(i, Wheel(' + rainbow_color + ' & 255));\n}\n';
    else
        var code3 = 'for (int i = 0; i < rgb_display_17.numPixels(); i++)\n {rgb_display_17.setPixelColor(i, Wheel(((i * 256 / rgb_display_17.numPixels()) + ' + rainbow_color + ') & 255));\n}\n';
    return code3;
}

export const OneButton = function (_, generator) {
    generator.definitions_['include_OneButton'] = '#include <OneButton.h>';
    var dropdown_pin = this.getFieldValue('PIN');
    var dropdown_mode = this.getFieldValue('mode');
    generator.definitions_['var_declare_button' + dropdown_pin] = 'OneButton button' + dropdown_pin + '(' + dropdown_pin + ',true);';
    generator.setups_['setup_onebutton_' + dropdown_pin + dropdown_mode] = 'button' + dropdown_pin + '.' + dropdown_mode + '(' + dropdown_mode + dropdown_pin + ');';
    var code = 'button' + dropdown_pin + '.tick();';
    var funcName = dropdown_mode + dropdown_pin;
    var branch = generator.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    generator.definitions_[funcName] = code2;
    return code;
}

export const handbit_motor_move = function (_, generator) {
    var dropdown_type = this.getFieldValue('type');
    var value_speed = generator.valueToCode(this, 'speed', generator.ORDER_ATOMIC);
    generator.definitions_['include_Wire'] = '#include <Wire.h>';
    generator.setups_['setup_i2c_23_22'] = 'Wire.begin(23, 22);';
    generator.definitions_['HandBit_Motor_Speed_fun'] = 'void HandBit_Motor_Speed(int pin, int speed){//电机速度设置 pin=1~2,speed=--100~100\n'
        + '  Wire.beginTransmission(0x10);\n'
        + '  Wire.write(pin);\n'
        + '  Wire.write(speed);\n'
        + '  Wire.endTransmission();\n'
        + '}';
    var code = 'HandBit_Motor_Speed(' + dropdown_type + ', ' + value_speed + ');\n';
    return code;
}

export const handbit_RGB_color_HSV = function (_, generator) {
    generator.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    generator.definitions_['var_declare_rgb_display17'] = 'Adafruit_NeoPixel rgb_display_17= Adafruit_NeoPixel(3,17,NEO_GRB + NEO_KHZ800);';
    var dropdown_rgbpin = 17;
    var value_led = generator.valueToCode(this, '_LED_', generator.ORDER_ATOMIC);
    var H = generator.valueToCode(this, 'H', generator.ORDER_ATOMIC);
    var S = generator.valueToCode(this, 'S', generator.ORDER_ATOMIC);
    var V = generator.valueToCode(this, 'V', generator.ORDER_ATOMIC);
    var code = 'rgb_display_' + dropdown_rgbpin + '.setPixelColor(' + value_led + ' - 1, ' + 'rgb_display_' + dropdown_rgbpin + '.ColorHSV(' + H + ',' + S + ',' + V + '));\n';
    return code;
}