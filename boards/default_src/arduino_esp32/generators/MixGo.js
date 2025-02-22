import { sensor_light, sensor_sound } from './sensor';

// 执行器_点阵屏显示_字符显示
export const HT16K33_TEXT = function (_, generator) {
    generator.definitions_['include_HT16K33'] = '#include <ZT16K33.h>';
    generator.definitions_['var_declare_HT16K33'] = 'HT16K33 MixGo_HT16K33;';
    generator.setups_['setup_Matrix_1'] = 'MixGo_HT16K33.begin(0x70);';
    generator.setups_['setup_Matrix_2'] = 'delay(100);';
    var string1 = generator.valueToCode(this, 'TEXT', generator.ORDER_ASSIGNMENT);
    var code = 'MixGo_HT16K33.drawStr(' + string1 + ');\n'
    return code;
}

// 执行器_点阵屏显示_画点显示
export const HT16K33_POS = function (_, generator) {
    generator.definitions_['2_include_HT16K33'] = '#include <ZT16K33.h>';
    generator.definitions_['var_declare_HT16K33'] = 'HT16K33 MixGo_HT16K33;';
    generator.setups_['setup_Matrix_1'] = 'MixGo_HT16K33.begin(0x70);';
    generator.setups_['setup_Matrix_2'] = 'delay(100);';
    var pos_x = generator.valueToCode(this, 'XVALUE', generator.ORDER_ASSIGNMENT);
    var pos_y = generator.valueToCode(this, 'YVALUE', generator.ORDER_ASSIGNMENT);
    var dropdown_type = this.getFieldValue('DrawPixel_TYPE');
    var code = 'MixGo_HT16K33.drawPixel(' + pos_x + '-1,' + pos_y + '-1,' + dropdown_type + ');\n'
    code += 'MixGo_HT16K33.writeDisplay();\n';
    return code;
}

// 执行器_点阵屏显示_显示图案
export const HT16K33_DisplayChar = function (_, generator) {
    generator.definitions_['2_include_HT16K33'] = '#include <ZT16K33.h>';
    generator.definitions_['var_declare_HT16K33'] = 'HT16K33 MixGo_HT16K33;';
    generator.definitions_['var_declare_Matrix1'] = 'uint16_t  MixGo_LedArray[8];';
    generator.setups_['setup_Matrix_1'] = 'MixGo_HT16K33.begin(0x70);';
    generator.setups_['setup_Matrix_2'] = 'delay(100);';
    var dropdown_pin = generator.valueToCode(this, 'Chars', generator.ORDER_ASSIGNMENT);
    //  var code='Matrix_'+SDA+'_'+SCL+'.clear();\n';
    var code = '';
    code += 'for(int i=0; i<8; i++)\n';
    code += '{\n'
    code += '  MixGo_LedArray[i]=' + dropdown_pin + '[i];\n';
    code += '  for(int j=15; j>=0; j--)\n'
    code += '  {\n'
    code += '    if((MixGo_LedArray[i]&0x01)>0)\n';
    code += '      MixGo_HT16K33.drawPixel(j, i,LED_ON);\n';
    code += '    MixGo_LedArray[i] = MixGo_LedArray[i]>>1;\n';
    code += '  }  \n'
    code += '}\n'
    code += 'MixGo_HT16K33.writeDisplay();\n'
    return code;
}

// 执行器_点阵屏显示_图案数组
export const HT16K33_LedArray = function (_, generator) {
    var varName = this.getFieldValue('VAR');
    var a = new Array();
    for (var i = 1; i < 9; i++) {
        a[i] = new Array();
        for (var j = 1; j < 17; j++) {
            a[i][j] = (this.getFieldValue('a' + i + j) == "TRUE") ? 1 : 0;
        }
    }
    var code = '{';
    for (var i = 1; i < 9; i++) {
        var tmp = ""
        for (var j = 1; j < 17; j++) {
            tmp += a[i][j];
        }
        tmp = (parseInt(tmp, 2)).toString(16)
        //  alert(tmp);
        if (tmp.length == 1)
            tmp = "000" + tmp;
        else if (tmp.length == 2)
            tmp = "00" + tmp;
        else if (tmp.length == 3)
            tmp = "0" + tmp;
        code += '0x' + tmp + ((i != 8) ? ',' : '');
    }
    code += '};';
    generator.definitions_[varName] = "uint16_t " + varName + "[8]=" + code;
    //return ["LedArray_"+clearString(this.id), generator.ORDER_ATOMIC];
    return [varName, generator.ORDER_ATOMIC];
}

// 辅助块_点阵屏_清除显示
export const HT16K33_Displayclear = function (_, generator) {
    generator.definitions_['2_include_HT16K33'] = '#include <ZT16K33.h>';
    generator.definitions_['var_declare_HT16K33'] = 'HT16K33 MixGo_HT16K33;';
    generator.setups_['setup_Matrix_1'] = 'MixGo_HT16K33.begin(0x70);';
    generator.setups_['setup_Matrix_2'] = 'delay(100);';
    var code = '';
    code += 'MixGo_HT16K33.clear();\n';
    return code;
}

// 辅助块_点阵屏_清除显示
export const HT16K33_brightness = function (_, generator) {
    var BRIGHTNESS = generator.valueToCode(this, 'Brightness', generator.ORDER_ATOMIC);
    generator.definitions_['2_include_HT16K33'] = '#include <ZT16K33.h>';
    generator.definitions_['var_declare_HT16K33'] = 'HT16K33 MixGo_HT16K33;';
    generator.setups_['setup_Matrix_1'] = 'MixGo_HT16K33.begin(0x70);';
    generator.setups_['setup_Matrix_2'] = 'delay(100);';
    var code = '';
    code += 'MixGo_HT16K33.setBrightness(' + BRIGHTNESS + ');\n';
    return code;
}

export const HT16K33_show_image = function (_, generator) {
    var dropdown_img_ = this.getFieldValue('img_');
    var code = '"' + dropdown_img_ + '"';
    code = '{';

    for (var i = 0; i < 31; i += 4) {
        code += '0x' + dropdown_img_.substr(i, 4) + ((i != 28) ? ',' : '');
    }
    code += '};\n';
    generator.definitions_['matrix_img_' + dropdown_img_] = "byte " + 'matrix_img_' + dropdown_img_ + "[]=" + code;
    return ['matrix_img_' + dropdown_img_, generator.ORDER_ATOMIC];
}

export const sensor_mixgo_light = sensor_light;

export const sensor_mixgo_sound = sensor_sound;

export const mixgo_touch_pin = function (_, generator) {
    var touch_pin = this.getFieldValue('touch_pin');
    var code = 'touchRead(' + touch_pin + ')';
    return [code, generator.ORDER_ATOMIC];
};

export const sensor_mixgo_pin_near = function (_, generator) {
    var direction = this.getFieldValue('direction');
    var code = 'digitalRead(' + direction + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const mixGo_led = function (_, generator) {
    var op = this.getFieldValue('STAT');
    var bright = generator.valueToCode(this, 'bright', generator.ORDER_ATOMIC);
    generator.setups_['setup_pinmode' + op] = 'pinMode(' + op + ',OUTPUT);';
    var code = "digitalWrite(" + op + ",!" + bright + ");\n";
    return code;
}

export const MixGo_rgb = function (_, generator) {
    var value_led = generator.valueToCode(this, '_LED_', generator.ORDER_ATOMIC);
    var COLOR = generator.valueToCode(this, 'COLOR', generator.ORDER_ATOMIC);
    COLOR = COLOR.replace(/#/g, "0x");
    generator.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    generator.definitions_['var_declare_rgb_display02'] = 'Adafruit_NeoPixel rgb_display_02= Adafruit_NeoPixel(2,2,NEO_GRB + NEO_KHZ800);';
    generator.setups_['setup_rgb_display_begin_02'] = 'rgb_display_02.begin();';
    var code = 'rgb_display_02.setPixelColor(' + value_led + '-1,' + COLOR + ');\n';
    return code;
}

export const MixGo_rgb2 = function (_, generator) {
    var COLOR1 = generator.valueToCode(this, 'COLOR1', generator.ORDER_ATOMIC);
    var COLOR2 = generator.valueToCode(this, 'COLOR2', generator.ORDER_ATOMIC);
    COLOR1 = COLOR1.replace(/#/g, "0x");
    COLOR2 = COLOR2.replace(/#/g, "0x");
    generator.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    generator.definitions_['var_declare_rgb_display02'] = 'Adafruit_NeoPixel rgb_display_02= Adafruit_NeoPixel(2,2,NEO_GRB + NEO_KHZ800);';
    generator.setups_['setup_rgb_display_begin_02'] = 'rgb_display_02.begin();';
    var code = 'rgb_display_02.setPixelColor(0,' + COLOR1 + ');\n';
    code += 'rgb_display_02.setPixelColor(1,' + COLOR2 + ');\n';
    return code;
}

export const MixGo_rgb_Brightness = function (_, generator) {
    var Brightness = generator.valueToCode(this, 'Brightness', generator.ORDER_ATOMIC);
    generator.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    generator.definitions_['var_declare_rgb_display02'] = 'Adafruit_NeoPixel rgb_display_02= Adafruit_NeoPixel(2,2,NEO_GRB + NEO_KHZ800);';
    generator.setups_['setup_rgb_display_begin_02'] = 'rgb_display_02.begin();';
    var code = 'rgb_display_02.setBrightness(' + Brightness + ');\n';
    return code;
}

export const MixGo_rgb_rainbow1 = function (_, generator) {
    generator.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    generator.definitions_['var_declare_rgb_display02'] = 'Adafruit_NeoPixel rgb_display_02= Adafruit_NeoPixel(2,2,NEO_GRB + NEO_KHZ800);';
    var wait_time = generator.valueToCode(this, 'WAIT', generator.ORDER_ATOMIC);
    generator.setups_['setup_rgb_display_begin_02'] = 'rgb_display_02.begin();';
    var funcName2 = 'Wheel';
    var code2 = 'uint32_t Wheel(byte WheelPos) {\n';
    code2 += 'if(WheelPos < 85) \n{\nreturn rgb_display_02.Color(WheelPos * 3, 255 - WheelPos * 3, 0);\n} \n';
    code2 += 'else if(WheelPos < 170) \n{\nWheelPos -= 85; \nreturn rgb_display_02.Color(255 - WheelPos * 3, 0, WheelPos * 3);\n}\n ';
    code2 += 'else\n {\nWheelPos -= 170;\nreturn rgb_display_02.Color(0, WheelPos * 3, 255 - WheelPos * 3);\n}\n';
    code2 += '}\n';
    generator.definitions_[funcName2] = code2;
    var funcName3 = 'rainbow';
    var code3 = 'void rainbow(uint8_t wait) {\n uint16_t i, j;\n';
    code3 += 'for(j=0; j<256; j++) {\n';
    code3 += 'for(i=0; i<rgb_display_02.numPixels(); i++)\n {\n';
    code3 += 'rgb_display_02.setPixelColor(i, Wheel((i+j) & 255));\n}\n';
    code3 += 'rgb_display_02.show();\n';
    //code3 += 'rgb_display_02.show();\n';
    //code3 += 'delay(wait);\n';
    code3 += '\n}\n}\n';
    generator.definitions_[funcName3] = code3;
    var code = 'rainbow(' + wait_time + ');\n'
    return code;
}

export const MixGo_rgb_rainbow3 = function (_, generator) {
    generator.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    generator.definitions_['var_declare_rgb_display02'] = 'Adafruit_NeoPixel rgb_display_02= Adafruit_NeoPixel(2,2,NEO_GRB + NEO_KHZ800);';
    var rainbow_color = generator.valueToCode(this, 'rainbow_color', generator.ORDER_ATOMIC);
    var type = this.getFieldValue('TYPE');
    var funcName2 = 'Wheel';
    var code2 = 'uint32_t Wheel(byte WheelPos) {\n';
    code2 += 'if(WheelPos < 85)\n {\nreturn rgb_display_02.Color(WheelPos * 3, 255 - WheelPos * 3, 0);} \n';
    code2 += 'else if(WheelPos < 170)\n {\nWheelPos -= 85; return rgb_display_02.Color(255 - WheelPos * 3, 0, WheelPos * 3);}\n ';
    code2 += 'else {\nWheelPos -= 170;return rgb_display_02.Color(0, WheelPos * 3, 255 - WheelPos * 3);}\n';
    code2 += '}\n';
    generator.definitions_[funcName2] = code2;
    if (type == "normal")
        var code3 = 'for (int i = 0; i < rgb_display_02.numPixels(); i++)\n{rgb_display_02.setPixelColor(i, Wheel(' + rainbow_color + ' & 255));\n}\n';
    else
        var code3 = 'for (int i = 0; i < rgb_display_02.numPixels(); i++)\n {rgb_display_02.setPixelColor(i, Wheel(((i * 256 / rgb_display_02.numPixels()) + ' + rainbow_color + ') & 255));\n}\n';
    return code3;
}

export const MixGo_rgb_show = function () {
    var code = 'rgb_display_02.show();rgb_display_02.show();\ndelay(1);\n';
    return code;
}

export const OneButton = function (_, generator) {
    generator.definitions_['include_OneButton'] = '#include <OneButton.h>';
    var dropdown_pin = this.getFieldValue('PIN');
    var dropdown_mode = this.getFieldValue('mode');
    generator.definitions_['var_declare_button' + dropdown_pin] = 'OneButton button' + dropdown_pin + '(' + dropdown_pin + ',false);';
    generator.setups_['setup_onebutton_' + dropdown_pin + dropdown_mode] = 'button' + dropdown_pin + '.' + dropdown_mode + '(' + dropdown_mode + dropdown_pin + ');';
    var code = 'button' + dropdown_pin + '.tick();';
    var funcName = dropdown_mode + dropdown_pin;
    var branch = generator.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    generator.definitions_[funcName] = code2;
    return code;
}

export const mixgo_button_is_pressed = function (_, generator) {
    var btn = this.getFieldValue('PIN');
    generator.setups_['setup_btn' + btn] = 'pinMode(' + btn + ',INPUT);';
    var code = 'digitalRead(' + btn + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_button_is_pressed = mixgo_button_is_pressed;
// export const sensor_pin_pressed = sensor_mixgo_pin_pressed;
export const sensor_pin_near = sensor_mixgo_pin_near;