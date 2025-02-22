import { Profile, JSFuncs } from 'mixly';
import { Variables } from 'blockly/core';

export const group_lcd_init2 = function (_, generator) {
    var varName = this.getFieldValue('VAR');
    var TYPE = this.getFieldValue('TYPE');
    var SCL = this.getFieldValue('SCL');
    var SDA = this.getFieldValue('SDA');
    var board_type = JSFuncs.getPlatform();
    var device = generator.valueToCode(this, 'device', generator.ORDER_ATOMIC) || '0x27';
    if (SDA == Profile.default.SDA[0][1] && SCL == Profile.default.SCL[0][1]) {
        generator.definitions_['include_Wire'] = '#include <Wire.h>';
        generator.definitions_['include_LiquidCrystal_I2C'] = '#include <LiquidCrystal_I2C.h>';
        generator.definitions_['var_declare_LiquidCrystal_I2C_' + varName] = 'LiquidCrystal_I2C ' + varName + '(' + device + ',' + TYPE + ');';
    }
    else {
        if (board_type.match(RegExp(/AVR/))) {
            generator.definitions_['include_SoftI2CMaster'] = '#include <SoftI2CMaster.h>';
            generator.definitions_['include_LiquidCrystal_SoftI2C'] = '#include <LiquidCrystal_SoftI2C.h>';
            generator.definitions_['var_declare_LiquidCrystal_SoftI2C_' + varName] = 'LiquidCrystal_SoftI2C ' + varName + '(' + device + ',' + TYPE + ',' + SCL + ',' + SDA + ');';
        }
        else {
            generator.definitions_['include_Wire'] = '#include <Wire.h>';
            generator.definitions_['include_LiquidCrystal_SoftI2C'] = '#include <LiquidCrystal_I2C.h>';
            generator.definitions_['var_declare_LiquidCrystal_I2C_' + varName] = 'LiquidCrystal_I2C ' + varName + '(' + device + ',' + TYPE + ');';
            generator.setups_["setup_Wire"] = 'Wire.begin(' + SDA + ',' + SCL + ');';
        }
    }
    generator.setups_['setup_lcd_init_' + varName] = varName + '.init();';
    generator.setups_['setup_lcd_backlight_' + varName] = varName + '.backlight();';
    return '';
};

export const group_lcd_init3 = function (_, generator) {
    var varName = this.getFieldValue('VAR');
    var TYPE = this.getFieldValue('TYPE');
    var RS = this.getFieldValue('RS');
    var EN = this.getFieldValue('EN');
    var D4 = this.getFieldValue('D4');
    var D5 = this.getFieldValue('D5');
    var D6 = this.getFieldValue('D6');
    var D7 = this.getFieldValue('D7');
    generator.definitions_['include_LiquidCrystal'] = '#include <LiquidCrystal.h>';
    generator.definitions_['var_declare_LiquidCrystal' + varName] = 'LiquidCrystal ' + varName + '(' + RS + ',' + EN + ',' + D4 + ',' + D5 + ',' + D6 + ',' + D7 + ');';
    generator.setups_['setup_lcd_begin_' + varName] = varName + '.begin(' + TYPE + ');';

    return '';
};

export const group_lcd_print = function (_, generator) {
    var varName = this.getFieldValue('VAR');
    var str1 = generator.valueToCode(this, 'TEXT', generator.ORDER_ATOMIC) || '""';
    var str2 = generator.valueToCode(this, 'TEXT2', generator.ORDER_ATOMIC) || '""';

    var code = varName + '.setCursor(0, 0);\n'
    code += varName + '.print(' + str1 + ');\n';
    code += varName + '.setCursor(0, 1);\n';
    code += varName + '.print(' + str2 + ');\n';
    //code+=varName+'.setCursor(0, 2);\n';
    //code+=varName+'.print('+str3+');\n';
    //code+=varName+'.setCursor(0, 3);\n';
    //code+=varName+'.print('+str4+');\n';
    return code;
};

export const group_lcd_print2 = function (_, generator) {
    var varName = this.getFieldValue('VAR');
    var str = generator.valueToCode(this, 'TEXT', generator.ORDER_ATOMIC) || 'String("")';
    var row = generator.valueToCode(this, 'row', generator.ORDER_ATOMIC) || '1';
    var column = generator.valueToCode(this, 'column', generator.ORDER_ATOMIC) || '1';
    var code = varName + '.setCursor(' + column + '-1, ' + row + '-1);\n'
    code += varName + '.print(' + str + ');\n';
    return code;
};

export const group_lcd_power = function () {
    var varName = this.getFieldValue('VAR');
    var dropdown_stat = this.getFieldValue('STAT');
    var code = varName + '.' + dropdown_stat + '();\n'
    return code;
};

export const display_4digitdisplay_power = function (_, generator) {
    var stat = this.getFieldValue("STAT");
    generator.definitions_['include_Wire'] = '#include <Wire.h>';
    generator.definitions_['include_TM1650'] = '#include <TM1650.h>';
    generator.definitions_['var_declare_display_4display'] = 'TM1650 tm_4display;';
    generator.setups_['setup_wire_begin'] = 'Wire.begin();';
    generator.setups_['setup_display_4display_init'] = 'tm_4display.init();';
    return 'tm_4display.' + stat + '();\n';
}

export const display_4digitdisplay_displayString = function (_, generator) {
    var value = generator.valueToCode(this, 'VALUE', generator.ORDER_ATOMIC);
    generator.definitions_['include_Wire'] = '#include <Wire.h>';
    generator.definitions_['include_TM1650'] = '#include <TM1650.h>';
    generator.definitions_['var_declare_display_4display'] = 'TM1650 tm_4display;';
    generator.setups_['setup_wire_begin'] = 'Wire.begin();';
    generator.setups_['setup_display_4display_init'] = 'tm_4display.init();';
    return 'tm_4display.displayString(' + value + ');\n';
}

export const display_4digitdisplay_showDot = function (_, generator) {
    var no = this.getFieldValue("NO");
    var stat = this.getFieldValue("STAT");
    generator.definitions_['include_Wire'] = '#include <Wire.h>';
    generator.definitions_['include_TM1650'] = '#include <TM1650.h>';
    generator.definitions_['var_declare_display_4display'] = 'TM1650 tm_4display;';
    generator.setups_['setup_wire_begin'] = 'Wire.begin();';
    generator.setups_['setup_display_4display_init'] = 'tm_4display.init();';
    return 'tm_4display.setDot(' + no + ',' + stat + ');\n';
}

var tm1637_DIO;
var tm1637_CLK;

export const display_TM1637_init = function (_, generator) {
    tm1637_CLK = this.getFieldValue('CLK');
    tm1637_DIO = this.getFieldValue('DIO');
    var NAME = this.getFieldValue('NAME') || 'display';
    generator.definitions_['include_SevenSegmentTM1637'] = '#include <SevenSegmentTM1637.h>';
    generator.definitions_['var_declare_SevenSegmentTM1637' + NAME] = 'SevenSegmentTM1637  ' + NAME + '(' + tm1637_CLK + ',' + tm1637_DIO + ');';
    generator.setups_['setup_' + NAME + '.begin()'] = NAME + '.begin();';
    return '';
};

export const display_TM1637_displyPrint = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'display';
    //var Speed = generator.valueToCode(this, 'Speed', generator.ORDER_ATOMIC);
    var VALUE = generator.valueToCode(this, 'VALUE', generator.ORDER_ATOMIC);
    var code = NAME + '.print(' + VALUE + ');' + '\n';
    return code;
};

export const display_TM1637_displayTime = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'display';
    generator.definitions_['include_SevenSegmentExtended'] = '#include <SevenSegmentExtended.h>';
    generator.definitions_['var_declare_SevenSegmentTM1637' + NAME] = 'SevenSegmentExtended  ' + NAME + '(' + tm1637_CLK + ',' + tm1637_DIO + ');';
    var hour = generator.valueToCode(this, 'hour', generator.ORDER_ATOMIC);
    var minute = generator.valueToCode(this, 'minute', generator.ORDER_ATOMIC);
    var dropdown_stat = this.getFieldValue("STAT");
    var code = NAME + '.printTime(' + hour + ',' + minute + ',' + dropdown_stat + ');\n';
    return code;
};

export const display_TM1637_clearDisplay = function () {
    var stat = this.getFieldValue("STAT");
    var NAME = this.getFieldValue('NAME') || 'display';
    return NAME + '.' + stat + '();\n';
};

export const display_TM1637_Brightness = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'display';
    var BRIGHTNESS = generator.valueToCode(this, 'Brightness', generator.ORDER_ATOMIC);
    var code = NAME + '.setBacklight(' + BRIGHTNESS + ');\n';
    return code;
};

// HT16K33点阵初始化
export const HT16K33_Init = function (_, generator) {
    var SDA = this.getFieldValue('SDA');
    var SCL = this.getFieldValue('SCL');
    //var matrixName = this.getFieldValue('matrixName');
    var matrixName = "myMatrix";
    generator.definitions_['include_Matrix'] = '#include <Matrix.h>';
    generator.definitions_['var_declare' + matrixName] = 'Matrix ' + matrixName + '(' + SDA + ',' + SCL + ');';
    generator.setups_['setup_' + matrixName] = matrixName + '.begin(0x70);';
    var code = matrixName + '.clear();\n';
    return code;
};

// Max7219点阵初始化
export const MAX7219_init = function (_, generator) {
    var pin_cs = generator.valueToCode(this, 'PIN2', generator.ORDER_ATOMIC);
    //var matrixName = this.getFieldValue('matrixName');
    var matrixName = "myMatrix";
    var hDisplays = generator.valueToCode(this, 'hDisplays', generator.ORDER_ATOMIC);
    var vDisplays = generator.valueToCode(this, 'vDisplays', generator.ORDER_ATOMIC);
    generator.definitions_['include_SPI'] = '#include <SPI.h>';
    generator.definitions_['include_Adafruit_GFX'] = '#include <Adafruit_GFX.h>';
    generator.definitions_['include_Max72xxPanel'] = '#include <Max72xxPanel.h>';
    generator.definitions_['var_declare_Max72xxPanel'] = 'Max72xxPanel ' + matrixName + ' = Max72xxPanel(' + pin_cs + ',' + hDisplays + ',' + vDisplays + ');';
    var code = '';
    return code;
};

// 点阵屏画点
export const display_Matrix_DrawPixel = function (_, generator) {
    var matrixType = this.getFieldValue('TYPE');
    var write = this.getFieldValue('WRITE');
    var pos_x = generator.valueToCode(this, 'XVALUE', generator.ORDER_ASSIGNMENT);
    var pos_y = generator.valueToCode(this, 'YVALUE', generator.ORDER_ASSIGNMENT);
    //var matrixName = this.getFieldValue('matrixName');
    var matrixName = "myMatrix";
    var dropdown_type = generator.valueToCode(this, 'STAT', generator.ORDER_ATOMIC);
    if (matrixType == "HT16K33") {
        var code = matrixName + '.drawPixel(' + pos_x + ',7-' + pos_y + ',' + dropdown_type + ');\n'
    }
    else {
        var code = matrixName + '.drawPixel(' + pos_x + ',' + pos_y + ',' + dropdown_type + ');\n'
    }
    if (write !== 'OFF') {
        code += matrixName + '.write();\n';
    }
    return code;
};

// 点阵屏滚动显示文本
export const display_Matrix_TEXT = function (_, generator) {
    var matrixName = "myMatrix";
    var textString = generator.valueToCode(this, 'TEXT', generator.ORDER_ASSIGNMENT);
    var speed = generator.valueToCode(this, 'Speed', generator.ORDER_ATOMIC);
    var code = matrixName + '.scrollMessage(' + textString + ',' + speed + ');\n'
    return code;
};

// 点阵屏显示文本
export const display_Matrix_print = function (_, generator) {
    var matrixName = "myMatrix";
    var write = this.getFieldValue('WRITE');
    var textString = generator.valueToCode(this, 'TEXT', generator.ORDER_ASSIGNMENT);
    var code = matrixName + '.setCursor(0, 0);\n';
    code += matrixName + '.print(' + textString + ');\n';
    if (write !== 'OFF') {
        code += matrixName + '.write();\n';
    }
    return code;
};

// 点阵屏显示_显示图案
export const display_Matrix_DisplayChar = function (_, generator) {
    var matrixType = this.getFieldValue('TYPE');
    //var matrixName = this.getFieldValue('matrixName');
    var matrixName = "myMatrix";
    var write = this.getFieldValue('WRITE');
    var NO = generator.valueToCode(this, 'NO', generator.ORDER_ATOMIC);
    var dotMatrixArray = generator.valueToCode(this, 'LEDArray', generator.ORDER_ASSIGNMENT);
    generator.definitions_['var_declare_LEDArray'] = 'uint8_t  LEDArray[8];';
    var code = '';
    code += 'memcpy_P(&LEDArray, &' + dotMatrixArray + ', 8);\n';
    code += 'for(int index_i=0; index_i<8; index_i++)\n';
    code += '{\n'
    //code+='  LEDArray[index_i]='+dotMatrixArray+'[index_i];\n';
    code += '  for(int index_j=' + (NO) + '*8; index_j<' + (NO) + '*8+8; index_j++)\n'
    //code+='  for(int index_j=7; index_j>=0; index_j--)\n'
    code += '  {\n'
    code += '    if((LEDArray[index_i]&0x01)>0)\n';
    if (matrixType == "HT16K33") {
        code += '      ' + matrixName + '.drawPixel(index_j, index_i,1);\n';
        code += '    else\n      ' + matrixName + '.drawPixel(index_j, index_i,0);\n';
    }
    else {
        code += '      ' + matrixName + '.drawPixel(index_j, 7-index_i,1);\n';
        code += '    else\n      ' + matrixName + '.drawPixel(index_j, 7-index_i,0);\n';
    }
    code += '    LEDArray[index_i] = LEDArray[index_i]>>1;\n';
    code += '  }  \n';
    code += '}\n';
    if (write !== 'OFF') {
        code += matrixName + '.write();\n';
    }
    return code;
};

// 点阵屏显示_点阵数组
export const display_Matrix_LedArray = function (_, generator) {
    var varName = this.getFieldValue('VAR');
    var a = new Array();
    for (var i = 1; i < 9; i++) {
        a[i] = new Array();
        for (var j = 1; j < 9; j++) {
            a[i][9 - j] = (this.getFieldValue('a' + i + j) == "TRUE") ? 1 : 0;
        }
    }
    var code = '{';
    for (var i = 1; i < 9; i++) {
        var tmp = ""
        for (var j = 1; j < 9; j++) {
            tmp += a[i][j];
        }
        tmp = (parseInt(tmp, 2)).toString(16)
        if (tmp.length == 1) tmp = "0" + tmp;
        code += '0x' + tmp + ((i != 8) ? ',' : '');
    }
    code += '};';
    //generator.definitions_[varName] = "uint8_t " + varName + "[8]=" + code;
    generator.definitions_[varName] = "const uint8_t " + varName + "[8] PROGMEM =" + code;
    return [varName, generator.ORDER_ATOMIC];
};

// 点阵位图数据
export const display_matrix_bitmap = function (_, generator) {
    var varName = this.getFieldValue('VAR');
    var a = this.getFieldValue('BITMAP');
    var code = '{';
    for (var i = 7; i >= 0; i--) {
        var tmp = "";
        for (var j = 7; j >= 0; j--) {
            tmp += a[i][j];
        }
        tmp = (parseInt(tmp, 2)).toString(16);
        if (tmp.length == 1) tmp = "0" + tmp;
        code += '0x' + tmp + ((i !== 0) ? ',' : '');
    }
    code += '};';
    generator.definitions_[varName] = "const uint8_t " + varName + "[8] PROGMEM =" + code;
    return [varName, generator.ORDER_ATOMIC];
};

// 点阵设置亮度
export const display_Matrix_Brightness = function (_, generator) {
    var matrixType = this.getFieldValue('TYPE');
    //var matrixName = this.getFieldValue('matrixName');
    var matrixName = "myMatrix";
    var BRIGHTNESS = generator.valueToCode(this, 'Brightness', generator.ORDER_ATOMIC);
    if (matrixType == "HT16K33") {
        var code = matrixName + '.setBrightness(' + BRIGHTNESS + ');\n';
    }
    else {
        var code = matrixName + '.setIntensity(' + BRIGHTNESS + ');\n';
    }
    return code;
};

// 点阵 全亮/全灭/关闭/开启
export const display_Matrix_fillScreen = function () {
    var write = this.getFieldValue('WRITE');
    //var matrixName = this.getFieldValue('matrixName');
    var matrixName = "myMatrix";
    var FILLSCREEN_TYPE = this.getFieldValue('FILLSCREEN_TYPE');
    var code = matrixName + '.' + FILLSCREEN_TYPE + ';\n'
    if (write !== 'OFF') {
        code += matrixName + '.write();\n';
    }
    return code;
};

// 点阵屏旋转
export const display_Max7219_Rotation = function (_, generator) {
    //var matrixName = this.getFieldValue('matrixName');
    var matrixName = "myMatrix";
    var dropdown_type = this.getFieldValue('Rotation_TYPE');
    var NO = generator.valueToCode(this, 'NO', generator.ORDER_ATOMIC);
    var code = matrixName + '.setRotation(' + NO + ',' + dropdown_type + ');\n'
    return code;
};

// 点阵屏位置
export const display_Max7219_setPosition = function (_, generator) {
    //var matrixName = this.getFieldValue('matrixName');
    var matrixName = "myMatrix";
    var NO = generator.valueToCode(this, 'NO', generator.ORDER_ATOMIC);
    var X = generator.valueToCode(this, 'X', generator.ORDER_ATOMIC);
    var Y = generator.valueToCode(this, 'Y', generator.ORDER_ATOMIC);
    var code = matrixName + '.setPosition(' + NO + ',' + X + ',' + Y + ');\n'
    return code;
};

// 点阵屏旋转
export const display_HT16K33_Rotation = function () {
    //var matrixName = this.getFieldValue('matrixName');
    var matrixName = "myMatrix";
    var dropdown_type = this.getFieldValue('Rotation_TYPE');
    var code = matrixName + '.setRotation(4-' + dropdown_type + ');\n'
    return code;
};

// 点阵屏 图案数组
export const LedArray = function (_, generator) {
    var varName = this.getFieldValue('VAR');
    var a = new Array();
    for (var i = 1; i < 9; i++) {
        a[i] = new Array();
        for (var j = 1; j < 9; j++) {
            a[i][j] = (this.getFieldValue('a' + i + j) == "TRUE") ? 1 : 0;
        }
    }
    var code = '{';
    for (var i = 1; i < 9; i++) {
        var tmp = ""
        for (var j = 1; j < 9; j++) {
            tmp += a[i][j];
        }
        tmp = (parseInt(tmp, 2)).toString(16)
        if (tmp.length == 1) tmp = "0" + tmp;
        code += '0x' + tmp + ((i != 8) ? ',' : '');
    }
    code += '};\n';
    generator.definitions_[varName] = "byte " + varName + "[]=" + code;
    return [varName, generator.ORDER_ATOMIC];
};

// 点阵屏预设图案
export const Matrix_img = function (_, generator) {
    var dropdown_img_ = this.getFieldValue('img_');
    var code = '"' + dropdown_img_ + '"';
    code = '{';
    for (var i = 0; i < 15; i += 2) {
        code += '0x' + dropdown_img_.substr(i, 2) + ((i != 14) ? ',' : '');
    }
    code += '};\n';
    generator.definitions_['matrix_img_' + dropdown_img_] = "const uint8_t " + 'matrix_img_' + dropdown_img_ + "[8] PROGMEM=" + code;
    return ['matrix_img_' + dropdown_img_, generator.ORDER_ATOMIC];
};

// 点阵屏 设置生效
export const display_Matrix_write = function () {
    return 'myMatrix.write();\n';
};

export const oled_init = function (_, generator) {
    var OLED_TYPE = this.getFieldValue('OLED_TYPE');
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var ROTATION = this.getFieldValue('ROTATION');
    var SDA = this.getFieldValue('SDA');
    var SCL = this.getFieldValue('SCL');
    var ADDRESS = generator.valueToCode(this, 'ADDRESS', generator.ORDER_ATOMIC) || '0x3C';
    var board_type = JSFuncs.getPlatform();
    //var board_type ="ESP8266";
    generator.definitions_['include_U8g2lib'] = '#include <U8g2lib.h>';
    if (board_type.match(RegExp(/AVR/))) {
        if (SDA == Profile.default.SDA[0][1] && SCL == Profile.default.SCL[0][1])
            generator.definitions_['var_declare_U8G2' + NAME] = 'U8G2_' + OLED_TYPE + '_1_HW_I2C ' + NAME + '(' + ROTATION + ', U8X8_PIN_NONE);';
        else
            generator.definitions_['var_declare_U8G2' + NAME] = 'U8G2_' + OLED_TYPE + '_1_SW_I2C ' + NAME + '(' + ROTATION + ',  ' + SCL + ', ' + SDA + ', U8X8_PIN_NONE);';
    }
    else {
        if (SDA == Profile.default.SDA[0][1] && SCL == Profile.default.SCL[0][1])
            generator.definitions_['var_declare_U8G2' + NAME] = 'U8G2_' + OLED_TYPE + '_F_HW_I2C ' + NAME + '(' + ROTATION + ', U8X8_PIN_NONE);';
        else
            generator.definitions_['var_declare_U8G2' + NAME] = 'U8G2_' + OLED_TYPE + '_F_SW_I2C ' + NAME + '(' + ROTATION + ',  ' + SCL + ', ' + SDA + ', U8X8_PIN_NONE);';
    }
    generator.definitions_['include_Wire'] = '#include <Wire.h>';
    generator.setups_["setup_u8g2" + NAME] = NAME + '.setI2CAddress(' + ADDRESS + '*2);\n'
        + '  ' + NAME + '.begin();';
    var code = '';
    return code;
};

export const u8g2_spi_init = function (_, generator) {
    var U8G2_TYPE_SPI = this.getFieldValue('U8G2_TYPE_SPI');
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var ROTATION = this.getFieldValue('ROTATION');
    var CLK = this.getFieldValue('CLK');
    var MOSI = this.getFieldValue('MOSI');
    var CS = this.getFieldValue('CS');
    var DC = this.getFieldValue('DC');
    var RST = this.getFieldValue('RST');
    generator.definitions_['include_U8g2lib'] = '#include <U8g2lib.h>';
    generator.definitions_['include_SPI'] = '#include <SPI.h>';
    generator.setups_["setup_u8g2" + NAME] = NAME + '.begin();';
    if (CLK == "SCK" && MOSI == "MOSI")
        generator.definitions_['var_declare_U8G2' + NAME] = 'U8G2_' + U8G2_TYPE_SPI + '_1_4W_HW_SPI ' + NAME + '(' + ROTATION + ', ' + CS + ', ' + DC + ', ' + RST + ');';
    else
        generator.definitions_['var_declare_U8G2' + NAME] = 'U8G2_' + U8G2_TYPE_SPI + '_1_4W_SW_SPI ' + NAME + '(' + ROTATION + ', ' + CLK + ',' + MOSI + ',' + CS + ', ' + DC + ', ' + RST + ');';
    var code = '';
    return code;
};

export const u8g2_LCD12864_spi_init = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var ROTATION = this.getFieldValue('ROTATION');
    var DC = this.getFieldValue('DC');
    //var RST = this.getFieldValue('RST');
    generator.definitions_['include_U8g2lib'] = '#include <U8g2lib.h>';
    generator.definitions_['include_SPI'] = '#include <SPI.h>';
    generator.setups_["setup_u8g2" + NAME] = NAME + '.begin();';
    generator.definitions_['var_declare_U8G2' + NAME] = 'U8G2_ST7920_128X64_1_HW_SPI ' + NAME + '(' + ROTATION + ', ' + DC + ', U8X8_PIN_NONE);';
    var code = '';
    return code;
};

export const u8g2_LCD12864_8080_init = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var ROTATION = this.getFieldValue('ROTATION');
    var DB0 = this.getFieldValue('DB0');
    var DB1 = this.getFieldValue('DB1');
    var DB2 = this.getFieldValue('DB2');
    var DB3 = this.getFieldValue('DB3');
    var DB4 = this.getFieldValue('DB4');
    var DB5 = this.getFieldValue('DB5');
    var DB6 = this.getFieldValue('DB6');
    var DB7 = this.getFieldValue('DB7');
    var ENABLE = this.getFieldValue('ENABLE');
    var DC = this.getFieldValue('DC');
    //var RST = this.getFieldValue('RST');
    generator.definitions_['include_U8g2lib'] = '#include <U8g2lib.h>';
    generator.setups_["setup_u8g2" + NAME] = NAME + '.begin();';
    generator.definitions_['var_declare_U8G2' + NAME] = 'U8G2_ST7920_128X64_1_8080 ' + NAME + '(' + ROTATION + ', ' + DB0 + ', ' + DB1 + ', ' + DB2 + ', ' + DB3 + ', ' + DB4 + ', ' + DB5 + ', ' + DB6 + ', ' + DB7 + ', ' + ENABLE + ', U8X8_PIN_NONE, ' + DC + ');';
    var code = '';
    return code;
};

export const oled_clear = function () {
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var code = NAME + ".clearDisplay();\n";
    return code;
};

export const oled_face = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var POS_x = generator.valueToCode(this, 'POS_X', generator.ORDER_ATOMIC) || '0';
    var POS_y = generator.valueToCode(this, 'POS_Y', generator.ORDER_ATOMIC) || '0';
    var FACE_IMAGE = this.getFieldValue('FACE_IMAGE');
    var pos = FACE_IMAGE.indexOf(',');
    var varName = "FACE_" + FACE_IMAGE.substring(0, pos);
    FACE_IMAGE = FACE_IMAGE.substring(pos + 1, FACE_IMAGE.length);
    // YANG use PROGMEM to save the RAM space
    //generator.definitions_['var_declare' + varName] = 'static unsigned char ' + varName + '[]={' + FACE_IMAGE + ' };\n';
    //var code="u8g2.drawXBM("+POS_x+","+POS_y+",89,64,"+varName+");\n";
    generator.libs_[varName] = 'const static unsigned char ' + varName + '[] PROGMEM ={' + FACE_IMAGE + ' };';
    var code = NAME + ".drawXBMP(" + POS_x + "," + POS_y + ",89,64," + varName + ");\n";
    return code;
};

export const oled_icons = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var POS_x = generator.valueToCode(this, 'POS_X', generator.ORDER_ATOMIC) || '0';
    var POS_y = generator.valueToCode(this, 'POS_Y', generator.ORDER_ATOMIC) || '0';
    var ICON_SIZE = this.getFieldValue('ICON_SIZE');
    var ICON_IMAGE = this.getFieldValue('ICON_IMAGE');
    var code = NAME + ".setFontPosBottom();\n" + NAME + ".setFont(u8g2_font_open_iconic_all_" + ICON_SIZE + "x_t);\n"
        + NAME + ".drawGlyph(" + POS_x + "," + POS_y + "+" + ICON_SIZE + "*8," + ICON_IMAGE + ");\n";
    return code;
};

export const oled_drawPixel = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var pos_x = generator.valueToCode(this, 'POS_X', generator.ORDER_ATOMIC) || '0';
    var pos_y = generator.valueToCode(this, 'POS_Y', generator.ORDER_ATOMIC) || '0';
    var code = "";
    code = code + NAME + '.drawPixel(' + pos_x + ',';
    code += pos_y + ');\n';
    return code;
};

export const oled_page = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var branch = generator.statementToCode(this, 'DO');
    //branch = branch.replace(/(^\s*)|(\s*$)/g, "");
    var code = '';
    if (branch) {
        code = NAME + ".firstPage();"
            + "\ndo"
            + "\n{"
            + "\n" + branch
            + "}while(" + NAME + ".nextPage());\n";
    }
    return code;
};

export const oled_showBitmap = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var start_x = generator.valueToCode(this, 'START_X', generator.ORDER_ATOMIC) || '0';
    var start_y = generator.valueToCode(this, 'START_Y', generator.ORDER_ATOMIC) || '0';
    var width = generator.valueToCode(this, 'WIDTH', generator.ORDER_ATOMIC) || '0';
    var height = generator.valueToCode(this, 'HEIGHT', generator.ORDER_ATOMIC) || '0';
    var data_name = generator.valueToCode(this, 'bitmap_name', generator.ORDER_ATOMIC);
    data_name = data_name.replace(/"/g, "");
    var code = "";
    //YANG use PROGMEM to save the RAM space
    //code = 'u8g2.drawXBM(' + start_x + ', ';
    code = NAME + '.drawXBMP(' + start_x + ', ';
    code += start_y + ', ';
    code += width + ', ';
    code += height + ', ' + data_name + ');\n';
    return code;
};

export const oled_define_bitmap_data = function (_, generator) {
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'), Variables.NAME_TYPE);
    var text = this.getFieldValue('TEXT');
    //YANG use PROGMEM to save the RAM space
    //generator.definitions_['var_declare' + varName] = 'static unsigned char ' + varName + '[]={' + text + ' };\n';
    generator.libs_[varName] = 'const static unsigned char ' + varName + '[] PROGMEM ={' + text + ' };';
    return '';
};

export const oled_drawLine = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var start_x = generator.valueToCode(this, 'START_X', generator.ORDER_ATOMIC) || '0';
    var start_y = generator.valueToCode(this, 'START_Y', generator.ORDER_ATOMIC) || '0';
    var end_x = generator.valueToCode(this, 'END_X', generator.ORDER_ATOMIC) || '0';
    var end_y = generator.valueToCode(this, 'END_Y', generator.ORDER_ATOMIC) || '0';
    var code = "";
    code = NAME + '.drawLine(' + start_x + ',';
    code += start_y + ',';
    code += end_x + ',';
    code += end_y + ');\n';
    return code;
};

export const oled_draw_Str_Line = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var start_x = generator.valueToCode(this, 'START_X', generator.ORDER_ATOMIC) || '0';
    var start_y = generator.valueToCode(this, 'START_Y', generator.ORDER_ATOMIC) || '0';
    var length = generator.valueToCode(this, 'LENGTH', generator.ORDER_ATOMIC) || '0';
    var TYPE = this.getFieldValue('TYPE');
    var code = "";
    code = NAME + ".draw" + TYPE + "Line(" + start_x + ',';
    code += start_y + ',';
    code += length + ');\n';
    return code;
};

export const oled_drawTriangle = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var D0_x = generator.valueToCode(this, 'D0_X', generator.ORDER_ATOMIC) || '0';
    var D0_y = generator.valueToCode(this, 'D0_Y', generator.ORDER_ATOMIC) || '0';
    var D1_x = generator.valueToCode(this, 'D1_X', generator.ORDER_ATOMIC) || '0';
    var D1_y = generator.valueToCode(this, 'D1_Y', generator.ORDER_ATOMIC) || '0';
    var D2_x = generator.valueToCode(this, 'D2_X', generator.ORDER_ATOMIC) || '0';
    var D2_y = generator.valueToCode(this, 'D2_Y', generator.ORDER_ATOMIC) || '0';
    var code = "";
    code = NAME + '.drawTriangle(' + D0_x + ',';
    code += D0_y + ',';
    code += D1_x + ',';
    code += D1_y + ',';
    code += D2_x + ',';
    code += D2_y + ');\n';
    return code;
};

export const oled_drawFrame = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var D0_x = generator.valueToCode(this, 'D0_X', generator.ORDER_ATOMIC) || '0';
    var D0_y = generator.valueToCode(this, 'D0_Y', generator.ORDER_ATOMIC) || '0';
    var Width = generator.valueToCode(this, 'WIDTH', generator.ORDER_ATOMIC) || '0';
    var Height = generator.valueToCode(this, 'HEIGHT', generator.ORDER_ATOMIC) || '0';
    var type = this.getFieldValue('TYPE');
    var code = "";
    code = NAME + '.' + type + '(' + D0_x + ',';
    code += D0_y + ',';
    code += Width + ',';
    code += Height + ');\n';
    return code;
};

export const oled_drawRFrame = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var D0_x = generator.valueToCode(this, 'D0_X', generator.ORDER_ATOMIC) || '0';
    var D0_y = generator.valueToCode(this, 'D0_Y', generator.ORDER_ATOMIC) || '0';
    var Width = generator.valueToCode(this, 'WIDTH', generator.ORDER_ATOMIC) || '0';
    var Height = generator.valueToCode(this, 'HEIGHT', generator.ORDER_ATOMIC) || '0';
    var Rauius = generator.valueToCode(this, 'RADIUS', generator.ORDER_ATOMIC) || '0';
    var type = this.getFieldValue('TYPE');
    var code = "";
    code = NAME + '.' + type + '(' + D0_x + ',';
    code += D0_y + ',';
    code += Width + ',';
    code += Height + ',';
    code += Rauius + ');\n';
    return code;
};

export const oled_drawCircle = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var D0_x = generator.valueToCode(this, 'D0_X', generator.ORDER_ATOMIC) || '0';
    var D0_y = generator.valueToCode(this, 'D0_Y', generator.ORDER_ATOMIC) || '0';
    var Rauius = generator.valueToCode(this, 'RADIUS', generator.ORDER_ATOMIC) || '0';
    var type = this.getFieldValue('TYPE');
    var opt = this.getFieldValue('OPT');
    var code = "";
    code = NAME + '.' + type + '(' + D0_x + ',';
    code += D0_y + ',';
    code += Rauius + "," + opt + "); \n";
    return code;
};

export const oled_drawEllipse = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var D0_x = generator.valueToCode(this, 'D0_X', generator.ORDER_ATOMIC) || '0';
    var D0_y = generator.valueToCode(this, 'D0_Y', generator.ORDER_ATOMIC) || '0';
    var Rauius_X = generator.valueToCode(this, 'RADIUS_X', generator.ORDER_ATOMIC) || '0';
    var Rauius_Y = generator.valueToCode(this, 'RADIUS_Y', generator.ORDER_ATOMIC) || '0';
    var type = this.getFieldValue('TYPE');
    var opt = this.getFieldValue('OPT');
    var code = "";
    code = NAME + '.' + type + '(' + D0_x + ',';
    code += D0_y + ',';
    code += Rauius_X + ",";
    code += Rauius_Y + "," + opt + "); \n";
    return code;
};

export const oled_print = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var POS_x = generator.valueToCode(this, 'POS_X', generator.ORDER_ATOMIC) || '0';
    var POS_y = generator.valueToCode(this, 'POS_Y', generator.ORDER_ATOMIC) || '0';
    var TEXT = generator.valueToCode(this, 'TEXT', generator.ORDER_ATOMIC) || '0';
    generator.setups_["setup_enableUTF8Print" + NAME] = NAME + '.enableUTF8Print();\n';
    var code = "";
    code = NAME + '.setCursor(' + POS_x + ',';
    code += POS_y + "); \n";
    code += NAME + ".print(" + TEXT + "); \n";
    return code;
};

export const oled_set_EN_Font = function () {
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var FONT_NAME = this.getFieldValue('FONT_NAME');
    var FONT_SIZE = this.getFieldValue('FONT_SIZE');
    var FONT_STYLE = this.getFieldValue('FONT_STYLE');
    var code = NAME + ".setFont(u8g2_font_" + FONT_NAME + FONT_STYLE + FONT_SIZE + "_tf);\n" + NAME + ".setFontPosTop();\n";
    return code;
};

export const oled_set_CN_Font = function () {
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var FONT_NAME = this.getFieldValue('FONT_NAME');
    var FONT_SIZE = this.getFieldValue('FONT_SIZE');
    var code = NAME + ".setFont(u8g2_font_" + FONT_SIZE + FONT_NAME + ");\n" + NAME + ".setFontPosTop();\n";
    return code;
};

export const oled_set_ZH_TW_Font = function () {
    var NAME = this.getFieldValue('NAME') || 'u8g2';

    var code = NAME + ".setFont(u8g2_font_unifont_t_chinese1);\n" + NAME + ".setFontPosTop();\n";
    return code;
};

// OLED背光亮度
export const u8g2_setContrast = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var Contrast = generator.valueToCode(this, 'Contrast', generator.ORDER_ATOMIC);
    var code = NAME + '.setContrast(' + Contrast + ');\n';
    return code;
};

// 返回UTF8字符串宽度
export const get_utf8_width = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'u8g2';
    var str = generator.valueToCode(this, 'str', generator.ORDER_ATOMIC);
    generator.definitions_['getutf8width' + NAME] = 'int ' + NAME + '_getUTF8Width(String str) {\n  const char *string_variable = str.c_str();\n  return ' + NAME + '.getUTF8Width(string_variable);\n}';
    var code = NAME + '_getUTF8Width(String(' + str + '))';
    return [code, generator.ORDER_ATOMIC];
};

// LCD自定义图案显示
export const lcd_display_pattern = function (_, generator) {
    var name = this.getFieldValue('name');
    var number = this.getFieldValue('number');
    var row = generator.valueToCode(this, 'row', generator.ORDER_ATOMIC);
    var column = generator.valueToCode(this, 'column', generator.ORDER_ATOMIC);
    var pattern = generator.valueToCode(this, 'pattern', generator.ORDER_ATOMIC);
    generator.setups_["setup_lcd_display_pattern" + number] = '' + name + '.createChar(' + number + ', ' + pattern + ');';
    var code = '' + name + '.setCursor(' + column + '-1, ' + row + '-1);\n' + name + '.write(' + number + ');\n';
    return code;
};

export const lcd_pattern = function (_, generator) {
    var varName = this.getFieldValue('VAR');
    var a = new Array();
    for (var i = 1; i < 9; i++) {
        a[i] = new Array();
        for (var j = 1; j < 6; j++) {
            a[i][6 - j] = (this.getFieldValue('a' + i + j) == "TRUE") ? 1 : 0;
        }
    }
    var code = '{0B' + a[8][5] + '' + a[8][4] + '' + a[8][3] + '' + a[8][2] + '' + a[8][1] + ',0B' + a[7][5] + '' + a[7][4] + '' + a[7][3] + '' + a[7][2] + '' + a[7][1] + ',0B' + a[6][5] + '' + a[6][4] + '' + a[6][3] + '' + a[6][2] + '' + a[6][1] + ',0B' + a[5][5] + '' + a[5][4] + '' + a[5][3] + '' + a[5][2] + '' + a[5][1] + ',0B' + a[4][5] + '' + a[4][4] + '' + a[4][3] + '' + a[4][2] + '' + a[4][1] + ',0B' + a[3][5] + '' + a[3][4] + '' + a[3][3] + '' + a[3][2] + '' + a[3][1] + ',0B' + a[2][5] + '' + a[2][4] + '' + a[2][3] + '' + a[2][2] + '' + a[2][1] + ',0B' + a[1][5] + '' + a[1][4] + '' + a[1][3] + '' + a[1][2] + '' + a[1][1] + '};';
    generator.definitions_[varName] = "byte " + varName + "[]=" + code;
    return [varName, generator.ORDER_ATOMIC];
};

export const display_lcd_bitmap = function (_, generator) {
    var varName = this.getFieldValue('VAR');
    var bitmap = this.getFieldValue('BITMAP');
    var code = '{';
    var i = 0;
    for (; i < bitmap.length - 1; i++) {
        code += '0B' + bitmap[i].join('') + ',';
    }
    code += '0B' + bitmap[i].join('') + '};';
    generator.definitions_[varName] = "byte " + varName + "[]=" + code;
    return [varName, generator.ORDER_ATOMIC];
};

function rgb565(colour) {
    colour = colour.substr(1);
    var R, G, B;
    R = colour.substr(0, 2);
    G = colour.substr(2, 2);
    B = colour.substr(4, 2);
    colour = R + G + B;
    colour = "0x" + colour;
    var RGB565_red = (colour & 0xf80000) >> 8;
    var RGB565_green = (colour & 0xfc00) >> 5;
    var RGB565_blue = (colour & 0xf8) >> 3;
    var n565Color = RGB565_red + RGB565_green + RGB565_blue;
    return n565Color;
}

// 初始化TFT
export const TFT_init_with_pin = function (_, generator) {
    const PIN_CS = this.getFieldValue('CS');
    const PIN_DC = this.getFieldValue('DC');
    const PIN_RST = this.getFieldValue('RST');
    const TYPE = this.getFieldValue('TYPE');
    let icType = TYPE.split('_')[0];
    let initParam = '';
    if (TYPE === 'ST7735_INITR_GREENTAB') {
        initParam = 'INITR_GREENTAB';
    } else if (TYPE === 'ST7735_INITR_REDTAB') {
        initParam = 'INITR_REDTAB';
    } else if (TYPE === 'ST7735_INITR_BLACKTAB') {
        initParam = 'INITR_BLACKTAB';
    } else if (TYPE === 'ST7735_160×80') {
        initParam = 'INITR_MINI160x80';
    } else if (TYPE === 'ST7735_160×128') {
        initParam = '128, 160';
    } else if (TYPE === 'ST7789_240×135') {
        initParam = '135, 240';
    } else if (TYPE === 'ST7789_240×240') {
        initParam = '240, 240';
    } else if (TYPE === 'ST7789_320×240') {
        initParam = '240, 320';
    } else if (TYPE === 'ST7796_480×320') {
        initParam = '';
    }
    generator.definitions_["include_Adafruit_GFX"] = '#include <Adafruit_GFX.h>';
    generator.definitions_["include_Adafruit_tft"] = '#include <Adafruit_' + icType + '.h>';
    generator.definitions_["include_SPI"] = '#include <SPI.h>';
    generator.definitions_['var_declare_Adafruit_tft'] = 'Adafruit_' + icType + ' tft = Adafruit_' + icType + '(' + PIN_CS + ', ' + PIN_DC + ', ' + PIN_RST + ');';
    generator.setups_["setup_tft_init"] = 'tft.' + (icType === 'ST7735' ? 'initR' : 'init') + '(' + initParam + ');';
    generator.setups_["setup_tft_fillScreen"] = 'tft.fillScreen(0x0000);';
    generator.definitions_["include_U8g2_for_Adafruit_GFX"] = '#include <U8g2_for_Adafruit_GFX.h>';
    generator.definitions_['var_declare_U8G2_FOR_ADAFRUIT_GFX'] = 'U8G2_FOR_ADAFRUIT_GFX u8g2_for_adafruit_gfx;';
    generator.setups_["setup_u8g2_for_adafruit_gfx"] = 'u8g2_for_adafruit_gfx.begin(tft);';
    var code = '';
    return code;
};

//将字符串转整数
function myAtoi(str) {
    str = str.replace(/(^\s*)|(\s*$)/g, "");//去掉字符串最前面的空格，中间的不用管
    var str1 = "";
    for (let i = 0; i < str.length; i++) {
        if ((str.charAt(i) == "-" || str.charAt(i) == "+") && i == 0) {
            str1 = str1.concat(str.charAt(i))
        }//如果“+”“-”号在最前面
        else if (/^\d+$/.test(str.charAt(i))) {
            str1 = str1.concat(str.charAt(i))
        }//用字符串存储值
        else {
            break//直接跳出for循环
        }
    }
    if (str1 - 0 > 2147483647) {
        return 2147483647
    }                      //str-0   字符串化为数组最简单也是最常用的方法
    else if (str1 - 0 < -2147483648) {
        return -2147483648
    }
    if (isNaN(str1 - 0)) return 0//"+"/"-"这种情况,返回0
    return str1 - 0
}

//将一个数字转化成16进制字符串形式
function toHex(num) {
    return num < 16 ? "0x0" + num.toString(16).toUpperCase() : "0x" + num.toString(16).toUpperCase();
}

//将文本或符号编码
function encodeUnicode(str) {
    let res = [];
    for (let i = 0; i < str.length; i++) {
        res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return "_u" + res.join("_u");
}

var canvas = document.createElement("canvas");//创建canvas
var ctx = canvas.getContext("2d");//获得内容描述句柄
var bitArr = new Array();

//显示汉字（使用位图显示）
export const TFT_st7735_show_hz = function (_, generator) {
    var text_st7735_name = 'tft';
    var checkbox_st7735_show_hz = 'TRUE';
    var checkbox_st7735_show_hz_message = 'TRUE';
    var checkbox_st7735_show_hz_save = this.getFieldValue('st7735_show_hz_save') == 'TRUE';
    var dropdown_st7735_hz_sharp = this.getFieldValue('st7735_hz_sharp');
    var text_st7735_hz_line_height = this.getFieldValue('st7735_hz_line_height');
    var dropdown_hz_up_down = this.getFieldValue('hz_up_down');
    var text_hz_up_down_data = this.getFieldValue('hz_up_down_data');
    var dropdown_hz_left_right = this.getFieldValue('hz_left_right');
    var text_hz_left_right_data = this.getFieldValue('hz_left_right_data');
    var value_st7735_hz_data = generator.valueToCode(this, 'st7735_hz_data', generator.ORDER_ATOMIC);
    var value_st7735_hz_x = generator.valueToCode(this, 'st7735_hz_x', generator.ORDER_ATOMIC);
    var value_st7735_hz_y = generator.valueToCode(this, 'st7735_hz_y', generator.ORDER_ATOMIC);
    var value_st7735_hz_height = generator.valueToCode(this, 'st7735_hz_height', generator.ORDER_ATOMIC);
    var value_st7735_hz_width = generator.valueToCode(this, 'st7735_hz_width', generator.ORDER_ATOMIC);
    var value_st7735_hz_color = generator.valueToCode(this, 'st7735_hz_color', generator.ORDER_ATOMIC);
    var dropdown_st7735_hz_variant = 'normal';
    var dropdown_st7735_hz_style = 'normal';
    var dropdown_st7735_hz_thickness = 'normal';
    var fontSize_width = myAtoi(value_st7735_hz_width);
    var fontSize_height = myAtoi(value_st7735_hz_height);
    var bs = Math.ceil(fontSize_width / 8);//每行占字节数

    var move_x = 0;
    var move_y = 0;
    if (dropdown_hz_up_down == "hz_down") {
        move_y = myAtoi(text_hz_up_down_data);
    }
    else {
        move_y = myAtoi("-" + text_hz_up_down_data);
    }

    if (dropdown_hz_left_right == "hz_right") {
        move_x = myAtoi(text_hz_left_right_data);
    }
    else {
        move_x = myAtoi("-" + text_hz_left_right_data);
    }
    canvas.width = fontSize_width;
    canvas.height = fontSize_height;
    ctx.font = dropdown_st7735_hz_style + ' ' + dropdown_st7735_hz_variant + ' ' + dropdown_st7735_hz_thickness + ' ' + text_st7735_hz_line_height + 'px ' + dropdown_st7735_hz_sharp;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    var c = value_st7735_hz_data;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, fontSize_width, fontSize_height);//涂背景
    ctx.fillStyle = "#ffffff";
    ctx.fillText(c, move_x, move_y);//写字
    var data = ctx.getImageData(0, 0, fontSize_width, fontSize_height).data;//获取图像
    var zm = new Array(bs * fontSize_height);
    for (var i = 0; i < zm.length; i++)zm[i] = 0;//初始化字模数组
    for (var i = 0; i < fontSize_height; i++)//读像素值组成字模数组
        for (var j = 0; j < fontSize_width; j++)
            if (data[i * fontSize_width * 4 + j * 4]) zm[parseInt(j / 8) + i * bs] += bitArr[j % 8];
    var outStr = "";//将字模数组转化为十六进制形式
    for (var i = 0; i < zm.length - 1; i++)outStr += toHex(zm[i]) + ",";
    outStr += toHex(zm[i]);

    var zm1 = new Array(bs * fontSize_height);
    var outstr1 = "";
    for (var i in zm) zm1[i] = zm[i].toString(2);
    for (var i in zm1) {
        var str = "";
        for (var j = 0; j < 8 - zm1[i].length; j++)str += "0";
        zm1[i] = str + zm1[i];
    }
    for (var i in zm1) outstr1 += zm1[i];

    var HZ_image = "";
    var num_hz = 0;
    for (var i = 0; i < fontSize_width; i++) {
        HZ_image += "--";
        if (i == (fontSize_width - 1)) HZ_image += "\n|";
    }

    for (var data_hz of outstr1) {
        num_hz++;
        if (num_hz == outstr1.length) {
            HZ_image += "|\n";
        }
        else if (num_hz % (bs * 8) < fontSize_width && num_hz % (bs * 8) > 0) {
            if (data_hz == "0") HZ_image += "  ";
            else if (data_hz == "1") HZ_image += "0 ";
        }
        else if (num_hz % (bs * 8) == 0) {
            HZ_image += "|\n|";
        }
    }
    for (var i = 0; i < fontSize_width; i++) {
        HZ_image += "--";
    }
    HZ_image = "/*" + "\n" + HZ_image + "\n" + "*/";

    var hz_sharp = "";
    switch (dropdown_st7735_hz_sharp) {
        case "STHeiti":
            hz_sharp = "华文黑体";
            break;
        case "STKaiti":
            hz_sharp = "华文楷体";
            break;
        case "STXihei":
            hz_sharp = "华文细黑";
            break;
        case "STSong":
            hz_sharp = "华文宋体";
            break;
        case "STZhongsong":
            hz_sharp = "华文中宋";
            break;
        case "STFangsong":
            hz_sharp = "华文仿宋";
            break;
        case "STCaiyun":
            hz_sharp = "华文彩云";
            break;
        case "STHupo":
            hz_sharp = "华文琥珀";
            break;
        case "STLiti":
            hz_sharp = "华文隶书";
            break;
        case "STXingkai":
            hz_sharp = "华文行楷";
            break;
        case "STXinwei":
            hz_sharp = "华文新魏";
            break;
        case "simHei":
            hz_sharp = "黑体";
            break;
        case "simSun":
            hz_sharp = "宋体";
            break;
        case "NSimSun":
            hz_sharp = "新宋体";
            break;
        case "FangSong":
            hz_sharp = "仿宋";
            break;
        case "KaiTi":
            hz_sharp = "楷体";
            break;
        case "FangSong_GB2312":
            hz_sharp = "仿宋_GB2312";
            break;
        case "KaiTi_GB2312":
            hz_sharp = "楷体_GB2312";
            break;
        case "LiSu":
            hz_sharp = "隶书";
            break;
        case "YouYuan":
            hz_sharp = "幼圆";
            break;
        case "PMingLiU":
            hz_sharp = "新细明体";
            break;
        case "MingLiU":
            hz_sharp = "细明体";
            break;
        case "DFKai-SB":
            hz_sharp = "标楷体";
            break;
        case "Microsoft JhengHei":
            hz_sharp = "微软正黑体";
            break;
        case "Microsoft YaHei":
            hz_sharp = "微软雅黑体";
            break;
        default:
            hz_sharp = dropdown_st7735_hz_sharp;
            break;
    }
    hz_sharp = "字体：" + hz_sharp + "  字号：" + text_st7735_hz_line_height + "px" + "  显示文字：" + value_st7735_hz_data;

    if (checkbox_st7735_show_hz) {
        generator.definitions_['var_declare_oled_st7735_' + dropdown_st7735_hz_sharp + '_' + text_st7735_hz_line_height + 'px' + encodeUnicode(value_st7735_hz_data)] = HZ_image + "\n//" + hz_sharp;
        if (checkbox_st7735_show_hz_save) {
            generator.libs_['oled_st7735_' + dropdown_st7735_hz_sharp + '_' + text_st7735_hz_line_height + 'px' + encodeUnicode(value_st7735_hz_data)] = HZ_image + "\n//" + hz_sharp + "\nstatic const unsigned char PROGMEM oled_st7735_" + dropdown_st7735_hz_sharp + '_' + text_st7735_hz_line_height + 'px' + encodeUnicode(value_st7735_hz_data) + "[" + (bs * fontSize_height) + "]={" + outStr + "};";
        }
        else {
            generator.libs_['oled_st7735_' + dropdown_st7735_hz_sharp + '_' + text_st7735_hz_line_height + 'px' + encodeUnicode(value_st7735_hz_data)] = HZ_image + "\n//" + hz_sharp + "\nunsigned char oled_st7735_" + dropdown_st7735_hz_sharp + '_' + text_st7735_hz_line_height + 'px' + encodeUnicode(value_st7735_hz_data) + "[" + (bs * fontSize_height) + "]={" + outStr + "};";
        }
    }
    else {
        if (checkbox_st7735_show_hz_message) {
            generator.definitions_['var_declare_oled_st7735_' + dropdown_st7735_hz_sharp + '_' + text_st7735_hz_line_height + 'px' + encodeUnicode(value_st7735_hz_data)] = "//" + hz_sharp;
            if (checkbox_st7735_show_hz_save) {
                generator.libs_['oled_st7735_' + dropdown_st7735_hz_sharp + '_' + text_st7735_hz_line_height + 'px' + encodeUnicode(value_st7735_hz_data)] = "//" + hz_sharp + "\nstatic const unsigned char PROGMEM oled_st7735_" + dropdown_st7735_hz_sharp + '_' + text_st7735_hz_line_height + 'px' + encodeUnicode(value_st7735_hz_data) + "[" + (bs * fontSize_height) + "]={" + outStr + "};";
            }
            else {
                generator.libs_['oled_st7735_' + dropdown_st7735_hz_sharp + '_' + text_st7735_hz_line_height + 'px' + encodeUnicode(value_st7735_hz_data)] = "//" + hz_sharp + "\nunsigned char oled_st7735_" + dropdown_st7735_hz_sharp + '_' + text_st7735_hz_line_height + 'px' + encodeUnicode(value_st7735_hz_data) + "[" + (bs * fontSize_height) + "]={" + outStr + "};";
            }
        }
        else {
            if (checkbox_st7735_show_hz_save) {
                generator.libs_['oled_st7735_' + dropdown_st7735_hz_sharp + '_' + text_st7735_hz_line_height + 'px' + encodeUnicode(value_st7735_hz_data)] = "static const unsigned char PROGMEM oled_st7735_" + dropdown_st7735_hz_sharp + '_' + text_st7735_hz_line_height + 'px' + encodeUnicode(value_st7735_hz_data) + "[" + (bs * fontSize_height) + "]={" + outStr + "};";
            }
            else {
                generator.libs_['oled_st7735_' + dropdown_st7735_hz_sharp + '_' + text_st7735_hz_line_height + 'px' + encodeUnicode(value_st7735_hz_data)] = "unsigned char oled_st7735_" + dropdown_st7735_hz_sharp + '_' + text_st7735_hz_line_height + 'px' + encodeUnicode(value_st7735_hz_data) + "[" + (bs * fontSize_height) + "]={" + outStr + "};";
            }
        }
    }
    if (checkbox_st7735_show_hz_message) {
        var code = '//绘制位图 ' + hz_sharp + '  X坐标：' + value_st7735_hz_x + '  Y坐标：' + value_st7735_hz_y + '  位图宽度：' + value_st7735_hz_width + '  位图高度：' + value_st7735_hz_height + '\n' + text_st7735_name + '.drawBitmap(' + value_st7735_hz_x + ', ' + value_st7735_hz_y + ', oled_st7735_' + dropdown_st7735_hz_sharp + '_' + text_st7735_hz_line_height + 'px' + encodeUnicode(value_st7735_hz_data) + ', ' + value_st7735_hz_width + ', ' + value_st7735_hz_height + ', ' + value_st7735_hz_color + ');\n';
    }
    else {
        var code = text_st7735_name + '.drawBitmap(' + value_st7735_hz_x + ', ' + value_st7735_hz_y + ', oled_st7735_' + dropdown_st7735_hz_sharp + '_' + text_st7735_hz_line_height + 'px' + encodeUnicode(value_st7735_hz_data) + ', ' + value_st7735_hz_width + ', ' + value_st7735_hz_height + ', ' + value_st7735_hz_color + ');\n';
    }
    return code;
};

export const TFT_Brightness = function (_, generator) {
    var Brightness = generator.valueToCode(this, 'BRIGHTNESS', generator.ORDER_ASSIGNMENT);
    //generator.setups_['ledcSetup_tft_brightness'] = 'ledcSetup(0,5000,8);\n';
    //generator.setups_['ledcAttachPin_tft_brightness'] = 'ledcAttachPin(26,0);\n ';
    var code = 'dacWrite(26, ' + Brightness + '*4+30);\n';
    return code;
};

export const tft_icons = function (_, generator) {
    var colour = generator.valueToCode(this, 'COLOR', generator.ORDER_ATOMIC);
    var POS_x = generator.valueToCode(this, 'POS_X', generator.ORDER_ATOMIC) || '0';
    var POS_y = generator.valueToCode(this, 'POS_Y', generator.ORDER_ATOMIC) || '0';
    var ICON_SIZE = this.getFieldValue('ICON_SIZE');
    var ICON_IMAGE = this.getFieldValue('ICON_IMAGE');
    var code = "u8g2_for_adafruit_gfx.setFont(u8g2_font_open_iconic_all_" + ICON_SIZE + "x_t);\n"
        + "u8g2_for_adafruit_gfx.setForegroundColor(" + colour + ");\n"
        + "u8g2_for_adafruit_gfx.setFontMode(1);\n"
        + "u8g2_for_adafruit_gfx.drawGlyph(" + POS_x + "," + POS_y + "+" + ICON_SIZE + "*8," + ICON_IMAGE + ");\n";
    return code;
};

export const TFT_Rotation = function () {
    var dropdown_type = this.getFieldValue('Rotation_TYPE');
    var code = 'tft.setRotation(' + dropdown_type + ');\n'
    return code;
};

export const tft_setFont = function () {
    var type = this.getFieldValue('TYPE');
    var code = "u8g2_for_adafruit_gfx.setFont(u8g2_font_" + type + ");\nu8g2_for_adafruit_gfx.setFontMode(1);\n";
    return code;
};

export const tft_print = function (_, generator) {
    var POS_x = generator.valueToCode(this, 'POS_X', generator.ORDER_ATOMIC) || '0';
    var POS_y = generator.valueToCode(this, 'POS_Y', generator.ORDER_ATOMIC) || '0';
    var TEXT = generator.valueToCode(this, 'TEXT', generator.ORDER_ATOMIC) || '0';
    var colour = generator.valueToCode(this, 'COLOR', generator.ORDER_ATOMIC);

    var code = `u8g2_for_adafruit_gfx.setCursor(${POS_x}, ${POS_y});\n`;
    // code +='u8g2_for_adafruit_gfx.setFontMode(0);'
    code += `u8g2_for_adafruit_gfx.setForegroundColor(${colour});\n`;
    code += `u8g2_for_adafruit_gfx.print(${TEXT});\n`;
    return code;
};

export const TFT_color_seclet = function (_, generator) {
    var colour = this.getFieldValue('COLOR');
    colour = rgb565(colour);
    return [colour, generator.ORDER_NONE];
};

export const TFT_color_rgb = function (_, generator) {
    var R = generator.valueToCode(this, 'R', generator.ORDER_ATOMIC);
    var G = generator.valueToCode(this, 'G', generator.ORDER_ATOMIC);
    var B = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC);
    var colour = R + "*256" + "+" + G + "*8" + "+" + B + "/8";
    return [colour, generator.ORDER_NONE];
};

export const TFT_init = function (_, generator) {
    generator.definitions_["include_Adafruit_GFX"] = '#include <Adafruit_GFX.h>';
    generator.definitions_["include_Adafruit_ST7735"] = '#include <Adafruit_ST7735.h>';
    generator.definitions_["include_SPI"] = '#include <SPI.h>';
    generator.definitions_['var_declare_Adafruit_ST7735'] = 'Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC,-1);';
    generator.setups_["setup_tft.initR"] = 'tft.initR(INITR_18GREENTAB);';
    generator.setups_["setup_tft.fillScreen(ST7735_BLACK)"] = 'tft.fillScreen(ST7735_BLACK);';
    generator.setups_['ledcSetup_tft_brightness'] = 'dacWrite(26, 255);';
    generator.definitions_["include_U8g2_for_Adafruit_GFX"] = '#include <U8g2_for_Adafruit_GFX.h>';
    generator.definitions_['var_declare_U8G2_FOR_ADAFRUIT_GFX'] = 'U8G2_FOR_ADAFRUIT_GFX u8g2_for_adafruit_gfx;';
    generator.setups_["setup_u8g2_for_adafruit_gfx"] = 'u8g2_for_adafruit_gfx.begin(tft);';
    return '';
};

export const TFT_fillScreen = function (_, generator) {
    var colour = generator.valueToCode(this, 'COLOR', generator.ORDER_ATOMIC);
    var code = 'tft.fillScreen' + '(' + colour + ');\n';
    return code;
};

export const tft_drawPixel = function (_, generator) {
    var pos_x = generator.valueToCode(this, 'POS_X', generator.ORDER_ATOMIC) || '0';
    var pos_y = generator.valueToCode(this, 'POS_Y', generator.ORDER_ATOMIC) || '0';
    var code = "";
    var COLOR = generator.valueToCode(this, 'COLOR', generator.ORDER_ATOMIC);
    COLOR = COLOR.replace(/#/g, "0x");
    COLOR = rgb565(COLOR);
    code += 'tft.drawPixel(' + pos_x + ',';
    code += pos_y;
    code += ',' + COLOR + ');\n';
    return code;
};

export const tft_drawLine = function (_, generator) {
    var start_x = generator.valueToCode(this, 'START_X', generator.ORDER_ATOMIC) || '0';
    var start_y = generator.valueToCode(this, 'START_Y', generator.ORDER_ATOMIC) || '0';
    var end_x = generator.valueToCode(this, 'END_X', generator.ORDER_ATOMIC) || '0';
    var end_y = generator.valueToCode(this, 'END_Y', generator.ORDER_ATOMIC) || '0';
    var code = "";
    var colour = generator.valueToCode(this, 'COLOR', generator.ORDER_ATOMIC);

    code = 'tft.drawLine(' + start_x + ',';
    code += start_y + ',';
    code += end_x + ',';
    code += end_y;
    code += ',' + colour + ');\n';
    return code;
};

export const tft_drawFastLine = function (_, generator) {
    var start_x = generator.valueToCode(this, 'START_X', generator.ORDER_ATOMIC) || '0';
    var start_y = generator.valueToCode(this, 'START_Y', generator.ORDER_ATOMIC) || '0';
    var length = generator.valueToCode(this, 'LENGTH', generator.ORDER_ATOMIC) || '0';
    var TYPE = this.getFieldValue('TYPE');
    var code = "";
    var colour = generator.valueToCode(this, 'COLOR', generator.ORDER_ATOMIC);

    code = "tft.drawFast" + TYPE + "Line(" + start_x + ',';
    code += start_y + ',';
    code += length;
    code += ',' + colour + ');\n';
    return code;
};

export const tft_Triangle = function (_, generator) {
    var D0_x = generator.valueToCode(this, 'D0_X', generator.ORDER_ATOMIC) || '0';
    var D0_y = generator.valueToCode(this, 'D0_Y', generator.ORDER_ATOMIC) || '0';
    var D1_x = generator.valueToCode(this, 'D1_X', generator.ORDER_ATOMIC) || '0';
    var D1_y = generator.valueToCode(this, 'D1_Y', generator.ORDER_ATOMIC) || '0';
    var D2_x = generator.valueToCode(this, 'D2_X', generator.ORDER_ATOMIC) || '0';
    var D2_y = generator.valueToCode(this, 'D2_Y', generator.ORDER_ATOMIC) || '0';
    var code = "";
    var type = this.getFieldValue('TYPE');
    var colour = generator.valueToCode(this, 'COLOR', generator.ORDER_ATOMIC);

    code = 'tft.' + type + 'Triangle(' + D0_x + ',';
    code += D0_y + ',';
    code += D1_x + ',';
    code += D1_y + ',';
    code += D2_x + ',';
    code += D2_y;
    code += ',' + colour + ');\n';
    return code;
};

export const tft_Rect = function (_, generator) {
    var D0_x = generator.valueToCode(this, 'D0_X', generator.ORDER_ATOMIC) || '0';
    var D0_y = generator.valueToCode(this, 'D0_Y', generator.ORDER_ATOMIC) || '0';
    var Width = generator.valueToCode(this, 'WIDTH', generator.ORDER_ATOMIC) || '0';
    var Height = generator.valueToCode(this, 'HEIGHT', generator.ORDER_ATOMIC) || '0';
    var type = this.getFieldValue('TYPE');
    var code = "";
    var colour = generator.valueToCode(this, 'COLOR', generator.ORDER_ATOMIC);

    code = 'tft.' + type + 'Rect(' + D0_x + ',';
    code += D0_y + ',';
    code += Width + ',';
    code += Height;
    code += ',' + colour + ');\n';
    return code;
};

export const tft_RoundRect = function (_, generator) {
    var D0_x = generator.valueToCode(this, 'D0_X', generator.ORDER_ATOMIC) || '0';
    var D0_y = generator.valueToCode(this, 'D0_Y', generator.ORDER_ATOMIC) || '0';
    var Width = generator.valueToCode(this, 'WIDTH', generator.ORDER_ATOMIC) || '0';
    var Height = generator.valueToCode(this, 'HEIGHT', generator.ORDER_ATOMIC) || '0';
    var Rauius = generator.valueToCode(this, 'RADIUS', generator.ORDER_ATOMIC) || '0';
    var type = this.getFieldValue('TYPE');
    var code = "";
    var colour = generator.valueToCode(this, 'COLOR', generator.ORDER_ATOMIC);

    code = 'tft.' + type + 'RoundRect(' + D0_x + ',';
    code += D0_y + ',';
    code += Width + ',';
    code += Height + ',';
    code += Rauius;
    code += ',' + colour + ');\n';
    return code;
};

export const tft_Circle = function (_, generator) {
    var D0_x = generator.valueToCode(this, 'D0_X', generator.ORDER_ATOMIC) || '0';
    var D0_y = generator.valueToCode(this, 'D0_Y', generator.ORDER_ATOMIC) || '0';
    var Rauius = generator.valueToCode(this, 'RADIUS', generator.ORDER_ATOMIC) || '0';
    var type = this.getFieldValue('TYPE');
    var code = "";
    var colour = generator.valueToCode(this, 'COLOR', generator.ORDER_ATOMIC);

    code = 'tft.' + type + 'Circle(' + D0_x + ',';
    code += D0_y + ',';
    code += Rauius;
    code += ',' + colour + ');\n';
    return code;
};

export const tft_define_bitmap_data = function (_, generator) {
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'), Variables.NAME_TYPE);
    var text = this.getFieldValue('TEXT');
    generator.libs_[varName] = 'const uint16_t ' + varName + '[] PROGMEM = {\n' + text + '\n};\n';
    return '';
};

export const tft_generate_bitmap_data = function (_, generator) {
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'), Variables.NAME_TYPE);
    var text = this.getFieldValue('TEXT');
    generator.libs_[varName] = 'const uint16_t ' + varName + '[] PROGMEM = {\n  ' + text + '\n};\n';
    return '';
};

export const tft_showBitmap = function (_, generator) {
    var start_x = generator.valueToCode(this, 'START_X', generator.ORDER_ATOMIC) || '0';
    var start_y = generator.valueToCode(this, 'START_Y', generator.ORDER_ATOMIC) || '0';
    var Height = generator.valueToCode(this, 'HEIGHT', generator.ORDER_ATOMIC) || '0';
    var WIDTH = generator.valueToCode(this, 'WIDTH', generator.ORDER_ATOMIC) || '0';
    var data_name = generator.valueToCode(this, 'bitmap_name', generator.ORDER_ATOMIC);
    data_name = data_name.replace(/"/g, "");
    var code = "tft.drawRGBBitmap(" + start_x + ", " + start_y + ", " + data_name + ", " + WIDTH + ", " + Height + ");";
    return code;
};

export const tft_set_EN_Font = function () {
    var FONT_NAME = this.getFieldValue('FONT_NAME');
    var FONT_SIZE = this.getFieldValue('FONT_SIZE');
    var FONT_STYLE = this.getFieldValue('FONT_STYLE');
    var code = "u8g2_for_adafruit_gfx.setFont(u8g2_font_" + FONT_NAME + FONT_STYLE + FONT_SIZE + "_tf);\n";
    return code;
};

export const tft_set_CN_Font = function () {
    var FONT_NAME = this.getFieldValue('FONT_NAME');
    var FONT_SIZE = this.getFieldValue('FONT_SIZE');
    var code = "u8g2_for_adafruit_gfx.setFont(u8g2_font_" + FONT_SIZE + FONT_NAME + ");\n";
    return code;
};

export const display_TM1637_init_32 = function (_, generator) {
    tm1637_CLK = this.getFieldValue('CLK');
    tm1637_DIO = this.getFieldValue('DIO');
    var NAME = this.getFieldValue('NAME') || 'display';
    generator.definitions_['include_TM1637Display'] = '#include <TM1637Display.h>';
    generator.definitions_['var_declare_SevenSegmentTM1637' + NAME] = 'TM1637Display ' + NAME + '(' + tm1637_CLK + ',' + tm1637_DIO + ');';
    generator.setups_['setup_' + NAME + '.begin()'] = NAME + '.setBrightness(7);';
    return '';
};

export const display_TM1637_displyPrint_32 = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'display';
    //var Speed = generator.valueToCode(this, 'Speed', generator.ORDER_ATOMIC);
    var VALUE = generator.valueToCode(this, 'VALUE', generator.ORDER_ATOMIC);
    var code = NAME + '.showNumberDec(String(' + VALUE + ').toInt(), false);' + '\n';
    return code;
};

export const display_TM1637_displayTime_32 = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'display';
    var hour = generator.valueToCode(this, 'hour', generator.ORDER_ATOMIC);
    var minute = generator.valueToCode(this, 'minute', generator.ORDER_ATOMIC);
    var dropdown_stat = this.getFieldValue("STAT");
    var code = NAME + '.showNumberDecEx(((' + hour + ' * 100)+' + minute + '),' + dropdown_stat + ',1);\n';
    return code;
};

export const display_TM1637_clearDisplay_32 = function () {
    var stat = this.getFieldValue("STAT");
    var NAME = this.getFieldValue('NAME') || 'display';
    return NAME + '.' + stat + '();\n';
};

export const display_TM1637_Brightness_32 = function (_, generator) {
    var NAME = this.getFieldValue('NAME') || 'display';
    var BRIGHTNESS = generator.valueToCode(this, 'Brightness', generator.ORDER_ATOMIC);
    var code = NAME + '.setBrightness(' + BRIGHTNESS + ');\n';
    return code;
};

export const group_lcd_init = group_lcd_init2;