export const mixepi_inout_touchRead = function (_, generator) {
    var touch_pin = this.getFieldValue('touch_pin');
    var code = 'touchRead(' + touch_pin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const mixepi_button_is_pressed = function (_, generator) {
    var btn = this.getFieldValue('btn');
    generator.setups_['setup_btn' + btn] = 'pinMode(' + btn + ',INPUT);';
    var code = '!digitalRead(' + btn + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const mixePi_button_is_pressed = function (_, generator) {
    var btn = this.getFieldValue('btn');
    generator.setups_['setup_btn' + btn] = 'pinMode(' + btn + ',INPUT_PULLUP);';
    var code = '!digitalRead(' + btn + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const mixepi_light = function (_, generator) {
    return ['analogRead(39)', generator.ORDER_ATOMIC];
}

export const mixepi_sound = function (_, generator) {
    return ['analogRead(36)', generator.ORDER_ATOMIC];
}

//传感器_重力感应块
export const mixepi_ADXL345_action = function (_, generator) {
    generator.definitions_['include_Wire'] = '#include <Wire.h>';
    generator.definitions_['include_I2Cdev'] = '#include <I2Cdev.h>';
    generator.definitions_['include_ADXL345'] = '#include <ADXL345.h>';
    generator.definitions_['var_declare_ADXL345'] = 'ADXL345 accel;\n';
    generator.setups_['setup_accel.begin'] = 'accel.begin();';
    generator.setups_['setup_Wire.begin'] = 'Wire.begin();';
    var dropdown_type = this.getFieldValue('MIXEPI_ADXL345_ACTION');
    var code = dropdown_type;
    return [code, generator.ORDER_ATOMIC];
}

export const RGB_color_seclet = function (_, generator) {
    var colour = this.getFieldValue('COLOR');
    return [colour, generator.ORDER_NONE];
}

export const RGB_color_rgb = function (_, generator) {
    var R = generator.valueToCode(this, 'R', generator.ORDER_ATOMIC);
    var G = generator.valueToCode(this, 'G', generator.ORDER_ATOMIC);
    var B = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC);
    //   if(parseInt(R).toString(16).length>1)
    //     var colour = parseInt(R).toString(16);
    //   else
    //    var colour = 0+parseInt(R).toString(16);
    //  if(parseInt(G).toString(16).length>1)
    //   colour += parseInt(G).toString(16);
    //  else
    //   colour += 0+parseInt(G).toString(16);
    // if(parseInt(B).toString(16).length>1)
    //  colour += parseInt(B).toString(16);
    // else
    //   colour += 0+parseInt(B).toString(16);
    // colour="#"+colour;
    var colour = R + "*65536" + "+" + G + "*256" + "+" + B;
    return [colour, generator.ORDER_NONE];
}

export const mixepi_rgb = function (_, generator) {
    var value_led = generator.valueToCode(this, '_LED_', generator.ORDER_ATOMIC);
    var COLOR = generator.valueToCode(this, 'COLOR', generator.ORDER_ATOMIC);
    COLOR = COLOR.replace(/#/g, "0x");
    generator.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    generator.definitions_['var_declare_rgb_display17'] = 'Adafruit_NeoPixel rgb_display_17= Adafruit_NeoPixel(3,17,NEO_RGB + NEO_KHZ800);';
    generator.setups_['setup_rgb_display_begin_17'] = 'rgb_display_17.begin();';
    var code = 'rgb_display_17.setPixelColor(' + value_led + '-1,' + COLOR + ');\n';
    code += 'rgb_display_17.show();\nrgb_display_17.show();\n';
    return code;
}

export const mixepi_rgb2 = function (_, generator) {
    var COLOR1 = generator.valueToCode(this, 'COLOR1', generator.ORDER_ATOMIC);
    var COLOR2 = generator.valueToCode(this, 'COLOR2', generator.ORDER_ATOMIC);
    var COLOR3 = generator.valueToCode(this, 'COLOR3', generator.ORDER_ATOMIC);
    COLOR1 = COLOR1.replace(/#/g, "0x");
    COLOR2 = COLOR2.replace(/#/g, "0x");
    COLOR3 = COLOR3.replace(/#/g, "0x");
    generator.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    generator.definitions_['var_declare_rgb_display17'] = 'Adafruit_NeoPixel rgb_display_17= Adafruit_NeoPixel(3,17,NEO_RGB + NEO_KHZ800);';
    generator.setups_['setup_rgb_display_begin_17'] = 'rgb_display_17.begin();';
    var code = 'rgb_display_17.setPixelColor(0,' + COLOR1 + ');\n';
    code += 'rgb_display_17.setPixelColor(1,' + COLOR2 + ');\n';
    code += 'rgb_display_17.setPixelColor(2,' + COLOR3 + ');\n';
    code += 'rgb_display_17.show();\nrgb_display_17.show();\n';
    return code;
}

export const mixepi_rgb_Brightness = function (_, generator) {
    var Brightness = generator.valueToCode(this, 'Brightness', generator.ORDER_ATOMIC);
    generator.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    generator.definitions_['var_declare_rgb_display17'] = 'Adafruit_NeoPixel rgb_display_17= Adafruit_NeoPixel(3,17,NEO_RGB + NEO_KHZ800);';
    generator.setups_['setup_rgb_display_begin_17'] = 'rgb_display_17.begin();';
    var code = 'rgb_display_17.setBrightness(' + Brightness + ');\n';
    code += 'rgb_display_17.show();\nrgb_display_17.show();\n';
    return code;
}

export const mixepi_rgb_rainbow1 = function (_, generator) {
    generator.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    generator.definitions_['var_declare_rgb_display17'] = 'Adafruit_NeoPixel rgb_display_17= Adafruit_NeoPixel(3,17,NEO_RGB + NEO_KHZ800);';
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
    code3 += 'rgb_display_17.show();\nrgb_display_17.show();\n';
    code3 += 'delay(wait);\n}\n}\n';
    generator.definitions_[funcName3] = code3;
    var code = 'rainbow(' + wait_time + ');\n'
    return code;
}

export const mixepi_rgb_rainbow3 = function (_, generator) {
    generator.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    generator.definitions_['var_declare_rgb_display17'] = 'Adafruit_NeoPixel rgb_display_17= Adafruit_NeoPixel(3,17,NEO_RGB + NEO_KHZ800);';
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

export const brightness_select = function (_, generator) {
    var code = this.getFieldValue('STAT');
    return [code, generator.ORDER_ATOMIC];
}