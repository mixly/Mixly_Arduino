'use strict';

goog.provide('Blockly.Blocks.display');

goog.require('Blockly.Blocks');

Blockly.Blocks.display.HUE = 180;

Blockly.Blocks.group_lcd_init = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput('device')
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_SETUP)
    .appendField(Blockly.MIXLY_DF_LCD)
    .appendField(new Blockly.FieldDropdown([['1602','16,2'],['2004','20,4']]),'TYPE')
    .appendField(new Blockly.FieldTextInput('mylcd'), 'VAR')
    .appendField(Blockly.MIXLY_LCD_ADDRESS);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_LCD_INIT);
}
};

Blockly.Blocks.group_lcd_init2 = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput('device')
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_SETUP)
    .appendField(Blockly.MIXLY_DF_LCD)
    .appendField(new Blockly.FieldDropdown([['1602','16,2'],['2004','20,4']]),'TYPE')
    .appendField(new Blockly.FieldTextInput('mylcd'), 'VAR')
    .appendField(Blockly.MIXLY_LCD_ADDRESS);
    this.appendValueInput("PIN1")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField('sclPin#');
    this.appendValueInput("PIN2")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField('sdaPin#')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_LCD_INIT2);
}
};

Blockly.Blocks.group_lcd_init3 = {
  init: function () {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput("PIN1")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_SETUP)
    .appendField(Blockly.MIXLY_DF_LCD)
    .appendField(new Blockly.FieldDropdown([['1602', '16,2'], ['2004', '20,4']]), 'TYPE')
    .appendField(new Blockly.FieldTextInput('mylcd'), 'VAR')
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField('rs');
    this.appendValueInput("PIN2")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField('en')
    this.appendValueInput("PIN3")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField('d1');
    this.appendValueInput("PIN4")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField('d2')
    this.appendValueInput("PIN5")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField('d3');
    this.appendValueInput("PIN6")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField('d4')

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_LCD_INIT3);
}
};

Blockly.Blocks.group_lcd_print = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput("TEXT", String)
    .setCheck([String,Number])
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_DF_LCD)
    .appendField(new Blockly.FieldTextInput('mylcd'), 'VAR')
    .appendField(Blockly.MIXLY_LCD_PRINT1);
    this.appendValueInput("TEXT2", String)
    .setCheck([String,Number])
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_LCD_PRINT2);
	/*
	this.appendValueInput("TEXT3", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_LCD_PRINT3);
	this.appendValueInput("TEXT4", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_LCD_PRINT4);
        */
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_LCD_PRINT);
    }
};

Blockly.Blocks.group_lcd_print2 = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput("row", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_DF_LCD)
    .appendField(new Blockly.FieldTextInput('mylcd'), 'VAR')
    .appendField(Blockly.MIXLY_LCD_ROW);
    this.appendValueInput("column", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_LCD_COLUMN);
    this.appendValueInput("TEXT", String)
    .setCheck([String,Number])
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_LCD_PRINT);
    this.setPreviousStatement(true, null);
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_LCD_PRINT2.replace('%1',Blockly.Arduino.valueToCode(this, 'row',Blockly.Arduino.ORDER_ATOMIC)).replace('%2',Blockly.Arduino.valueToCode(this, 'column',Blockly.Arduino.ORDER_ATOMIC)));
}
};

Blockly.Blocks.group_lcd_power = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_DF_LCD)
    .appendField(new Blockly.FieldTextInput('mylcd'), 'VAR')
    .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_ON, "display"], [Blockly.MIXLY_OFF, "noDisplay"], [Blockly.MIXLY_LCD_STAT_CURSOR, "cursor"], [Blockly.MIXLY_LCD_STAT_NOCURSOR, "noCursor"], [Blockly.MIXLY_LCD_STAT_BLINK, "blink"], [Blockly.MIXLY_LCD_STAT_NOBLINK, "noBlink"], [Blockly.MIXLY_LCD_STAT_CLEAR, "clear"], [Blockly.MIXLY_LCD_NOBACKLIGHT, "noBacklight"], [Blockly.MIXLY_LCD_BACKLIGHT, "backlight"]]), "STAT");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_LCD_POWER);
}
};
//RGB has been moved to actuator

Blockly.Blocks.display_4digitdisplay_power = {
  init: function () {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_4DIGITDISPLAY+"_TM1650")
    .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_ON, "displayOn"], [Blockly.MIXLY_OFF, "displayOff"], [Blockly.MIXLY_LCD_STAT_CLEAR, "clear"]]), "STAT");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_4digitdisplay_power);
}
};

Blockly.Blocks.display_4digitdisplay_displayString = {
  init: function () {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_4DIGITDISPLAY + "_TM1650")
    this.appendValueInput("VALUE")
//            .setCheck(String)
.setAlign(Blockly.ALIGN_RIGHT)
.appendField(Blockly.MIXLY_4DIGITDISPLAY_DISPLAYSTRING);
this.setInputsInline(true);
this.setPreviousStatement(true, null);
this.setNextStatement(true, null);
this.setTooltip(Blockly.MIXLY_TOOLTIP_4digitdisplay_displayString);
}
};

Blockly.Blocks.display_4digitdisplay_showDot = {
  init: function () {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_4DIGITDISPLAY + "_TM1650")
    .appendField(Blockly.MIXLY_4DIGITDISPLAY_NOMBER1)
    .appendField(new Blockly.FieldDropdown([["1", "0"], ["2", "1"], ["3", "2"], ["4", "3"]]), "NO")
    .appendField(Blockly.MIXLY_4DIGITDISPLAY_NOMBER2)
    .appendField(Blockly.MIXLY_4DIGITDISPLAY_DOT)
    .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_4DIGITDISPLAY_ON, "true"], [Blockly.MIXLY_4DIGITDISPLAY_OFF, "false"]]), "STAT");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_4digitdisplay_showDot);
}
};
Blockly.Blocks.display_TM1637_init = {
  init: function () {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput("PIN1")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_4DIGITDISPLAY_TM1637_INIT)
    .appendField("CLK")
    .appendField(Blockly.MIXLY_PIN);
    this.appendValueInput("PIN2")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("DIO")
    .appendField(Blockly.MIXLY_PIN);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_4DIGITDISPLAY_TM1637_TIP);
    this.setHelpUrl('');
}
};


Blockly.Blocks.display_TM1637_displyPrint = {
  init: function () {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput("VALUE")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_4DIGITDISPLAY_TM1637_DISPLAYPRINT);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_4DIGITDISPLAY_TM1637_DISPLAYSTRING_TIP);
}
};
var display_Time_Point = [
[Blockly.MIXLY_4DIGITDISPLAY_ON, "true"],
[Blockly.MIXLY_4DIGITDISPLAY_OFF, "false"]
];

Blockly.Blocks.display_TM1637_displayTime = {
  init: function () {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_4DIGITDISPLAY_TM1637_DISPLAYTIME);
    this.appendValueInput("hour")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_HOUR);
    this.appendValueInput("minute")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MINUTE);
    this.appendValueInput("STAT")
    .appendField(Blockly.MIXLY_DISPLAY_TM1637_Time_Point)
    .setCheck([Number,Boolean]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_4DIGITDISPLAY_TM1637_DISPLAYTIME_TOOLTIP);
}
};

Blockly.Blocks.display_TM1637_Brightness = {
  init: function () {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_4DIGITDISPLAY_TM1637_BRIGHTNESS);
    this.appendValueInput("Brightness")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT);
    this.setTooltip(Blockly.MIXLY_4DIGITDISPLAY_4DIGITDISPLAY_BRIGHTNESS_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOPTIP_4DIGITDISPLAY_TM1637_BRIGHTNESS);
}
};


Blockly.Blocks.display_TM1637_clearDisplay = {
  init: function () {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_4DIGITDISPLAY_TM1637_CLEARDISPLAY);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_4DIGITDISPLAY_TM1637_CLEARDISPLAY);
}
};

//HT16K33点阵屏幕初始化
Blockly.Blocks.HT16K33_Init = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_DISPLAY_MATRIX_INIT);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MATRIX_NAME)
    .appendField(new Blockly.FieldTextInput('myMatrix'), 'matrixName');
    this.appendValueInput("PIN1")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("SDA#");
    this.appendValueInput("PIN2")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("SCL#"); 
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOPTIP_Matrix_HK16T33_INIT);
}
};

//MAX7219点阵屏幕初始化
Blockly.Blocks.MAX7219_init = {
  init: function() {
     this.appendDummyInput("")
     .appendField(Blockly.MIXLY_MAX7219_INIT);
     this.appendDummyInput("")
     .appendField(Blockly.MIXLY_MATRIX_NAME)
     .appendField(new Blockly.FieldTextInput('myMatrix'), 'matrixName');
     this.appendValueInput("PIN1")
     .setCheck(Number)
     .setAlign(Blockly.ALIGN_RIGHT)
     .appendField("DIN(MOSI)")
     .appendField(Blockly.MIXLY_PIN);
     this.appendValueInput("PIN2")
     .setCheck(Number)
     .setAlign(Blockly.ALIGN_RIGHT)
     .appendField("CS")
     .appendField(Blockly.MIXLY_PIN);
     this.appendValueInput("PIN3")
     .setCheck(Number)
     .setAlign(Blockly.ALIGN_RIGHT)
     .appendField("CLK(SCK)")
     .appendField(Blockly.MIXLY_PIN);
     this.appendValueInput("hDisplays")
     .setCheck(Number)
     .setAlign(Blockly.ALIGN_RIGHT)
     .appendField(Blockly.MIXLY_MAX7219_HDISPALY);
     this.appendValueInput("vDisplays")
     .setCheck(Number)
     .setAlign(Blockly.ALIGN_RIGHT)
     .appendField(Blockly.MIXLY_MAX7219_VDISPALY);
     this.setPreviousStatement(true, null);
     this.setNextStatement(true, null);
     this.setColour(Blockly.Blocks.display.HUE);
     this.setInputsInline(false);
     this.setTooltip(Blockly.MAX7219_INIT_TOOLTIP);
     this.setHelpUrl('');
 }
};

//点阵屏显示点
Blockly.Blocks.display_Matrix_DrawPixel = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MATRIX_TYPE)
    .appendField(new Blockly.FieldDropdown([['HT16K33','HT16K33'],['MAX7219','MAX7219']]),'TYPE');
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MATRIX_NAME)
    .appendField(new Blockly.FieldTextInput('myMatrix'), 'matrixName');
    this.appendValueInput('XVALUE')
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_DISPLAY_MATRIX_X);
    this.appendValueInput("YVALUE")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_DISPLAY_MATRIX_Y);
    this.appendValueInput("STAT")
    .appendField(Blockly.MIXLY_STAT)
    .setCheck([Number,Boolean]);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip();
}
};


//点阵屏 旋转变量
var display_Rotation_NUM = [
[Blockly.MIXLY_0DEGREE, "0"],
[Blockly.MIXLY_90DEGREE, "3"],
[Blockly.MIXLY_180DEGREE, "2"],
[Blockly.MIXLY_270DEGREE, "1"]
];

//点阵屏旋转
Blockly.Blocks.display_Max7219_Rotation = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MATRIX_TYPE)
    .appendField('MAX7219');
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MATRIX_NAME)
    .appendField(new Blockly.FieldTextInput('myMatrix'), 'matrixName');
    this.appendValueInput("NO")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_MAX7219_NO);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_DISPLAY_MATRIX_ROTATE)
    .appendField(new Blockly.FieldDropdown(display_Rotation_NUM), "Rotation_TYPE");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOPTIP_Matrix_HK16T33_ROTATION);
}
};
//点阵屏旋转
Blockly.Blocks.display_Max7219_setPosition = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MATRIX_TYPE)
    .appendField('MAX7219');
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MATRIX_NAME)
    .appendField(new Blockly.FieldTextInput('myMatrix'), 'matrixName');
    this.appendValueInput("NO")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_MAX7219_NO);
    this.appendValueInput("X")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("X");
    this.appendValueInput("Y")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("Y");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOPTIP_Matrix_HK16T33_ROTATION);
}
};
//点阵屏旋转
Blockly.Blocks.display_HT16K33_Rotation = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MATRIX_TYPE)
    .appendField('HT16K33');
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MATRIX_NAME)
    .appendField(new Blockly.FieldTextInput('myMatrix'), 'matrixName');
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_DISPLAY_MATRIX_ROTATE)
    .appendField(new Blockly.FieldDropdown(display_Rotation_NUM), "Rotation_TYPE");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOPTIP_Matrix_HK16T33_ROTATION);
}
};

//点阵屏滚动显示字符
Blockly.Blocks.display_Matrix_TEXT={
  init:function(){
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MATRIX_TYPE)
    .appendField(new Blockly.FieldDropdown([['HT16K33','HT16K33'],['MAX7219','MAX7219']]),'TYPE');
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MATRIX_NAME)
    .appendField(new Blockly.FieldTextInput('myMatrix'), 'matrixName');
    this.appendValueInput("TEXT", String)
    .setCheck([Number, String])
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.Msg.texttodisplay);
    this.appendValueInput("Speed")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_SPEED);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOPTIP_Matrix_HK16T33_TEXT);
}
};

//点阵屏显示_显示图案
Blockly.Blocks.display_Matrix_DisplayChar = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MATRIX_TYPE)
    .appendField(new Blockly.FieldDropdown([['HT16K33','HT16K33'],['MAX7219','MAX7219']]),'TYPE');
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MATRIX_NAME)
    .appendField(new Blockly.FieldTextInput('myMatrix'), 'matrixName');
    this.appendValueInput("NO")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_MAX7219_NO);
    this.appendValueInput("LEDArray")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_DISPLAY_MATRIX_PICARRAY);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(false);
    this.setTooltip(Blockly.MIXLY_TOOPTIP_Matrix_HK16T33_DISPLAYCHAR);
}
};

//点阵屏显示_图案数组
Blockly.Blocks.display_Matrix_LedArray = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_DISPLAY_MATRIX_ARRAYVAR)
    .appendField(new Blockly.FieldTextInput("LedArray1"), "VAR");
    this.appendDummyInput("")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a81")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a82")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a83")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a84")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a85")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a86")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a87")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a88");
    this.appendDummyInput("")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a71")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a72")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a73")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a74")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a75")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a76")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a77")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a78");
    this.appendDummyInput("")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a61")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a62")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a63")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a64")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a65")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a66")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a67")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a68");
    this.appendDummyInput("")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a51")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a52")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a53")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a54")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a55")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a56")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a57")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a58");
    this.appendDummyInput("")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a41")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a42")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a43")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a44")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a45")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a46")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a47")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a48");
    this.appendDummyInput("")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a31")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a32")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a33")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a34")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a35")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a36")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a37")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a38");
    this.appendDummyInput("")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a21")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a22")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a23")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a24")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a25")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a26")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a27")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a28");
    this.appendDummyInput("")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a11")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a12")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a13")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a14")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a15")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a16")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a17")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a18");
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOPTIP_Matrix_HK16T33_LEDARRAY);
}
};

//点阵屏亮度
Blockly.Blocks.display_Matrix_Brightness = {
  init: function () {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MATRIX_TYPE)
    .appendField(new Blockly.FieldDropdown([['HT16K33','HT16K33'],['MAX7219','MAX7219']]),'TYPE');
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MATRIX_NAME)
    .appendField(new Blockly.FieldTextInput('myMatrix'), 'matrixName');
    this.appendValueInput("Brightness")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_BRIGHTNESS);
    this.setTooltip(Blockly.MIXLY_MAX7219_BRIGHTNESS_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
}
};

var MAX7219_FILLSCREEN_SELECT = [
[Blockly.MAX7219_FILLSCREEN_ON, "fillScreen(1)"],
[Blockly.MAX7219_FILLSCREEN_OFF, "fillScreen(0)"],
//[Blockly.MAX7219_SHUTDOWN_ON, "shutdown(1)"],
// [Blockly.MAX7219_SHUTDOWN_OFF, "shutdown(0)"]
];

//点阵屏 全屏亮灭
Blockly.Blocks.display_Matrix_fillScreen = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);  
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MATRIX_TYPE)
    .appendField(new Blockly.FieldDropdown([['HT16K33','HT16K33'],['MAX7219','MAX7219']]),'TYPE');
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MATRIX_NAME)
    .appendField(new Blockly.FieldTextInput('myMatrix'), 'matrixName')
    .appendField(Blockly.MIXLY_STAT); 
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(new Blockly.FieldDropdown(MAX7219_FILLSCREEN_SELECT), "FILLSCREEN_TYPE");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_TOOPTIP_Matrix_HK16T33_POS);
}
};


//点阵屏预设图案
Blockly.Blocks.Matrix_img = {
  init: function() {
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MAX7219_IMG)
    .appendField(new Blockly.FieldDropdown([
      ["↑", "18181818db7e3c18"],
      ["↓", "183c7edb18181818"],
      ["←", "080c06ffff060c08"],
      ["→", "103060ffff603010"],
      ["♥", "183c7effffffe742"],
      ["▲", "00000000ff7e3c18"],
      ["▼", "183c7eff00000000"],
      ["◄", "080c0e0f0f0e0c08"],
      ["►", "103070f0f0703010"],
      ["△", "00000000ff422418"],
      ["▽", "182442ff00000000"],
      ["☺", "3c4299a581a5423c"],
      ["○", "3c4281818181423c"],
      ["◑", "3c72f1f1f1f1723c"],
      ["◐", "3c4e8f8f8f8f4e3c"],
      ["￥", "101010ff10ff2442"],
      ["Χ", "8142241818244281"],
      ["√", "0000010204885020"],
      ["□", "007e424242427e00"],
      ["▣", "007e425a5a427e00"],
      ["◇", "1824428181422418"],
      ["♀", "083e081c2222221c"],
      ["♂", "0e1b111b9ea0c0f0"],
      ["♪", "061f1e1010d07030"],
      ["✈", "203098ffff983020"],
      ["卍", "00f21212fe90909e"],
      ["卐", "009e9090fe1212f2"],
      ["|", "1010101010101010"],
      ["—", "000000ff00000000"],
      ["╱", "0102040810204080"],
      ["＼", "8040201008040201"],
      ["大", "41221408087f0808"],
      ["中", "1010fe9292fe1010"],
      ["小", "0e08492a2a080808"],
      ["米", "00925438fe385492"],
      ["正", "7f0a0a3a08087f00"],
      ["囧", "ffa5a5bdc3a5a5ff"]
      ]), "img_");
    this.setOutput(true);
    this.setTooltip('');
    this.setColour(Blockly.Blocks.display.HUE);
    this.setTooltip(Blockly.MIXLY_TOOPTIP_Matrix_MAX7219_PREDEFARR);
    this.setHelpUrl('');
}
};


//OLED -based on U8G2
//显示-OLED-变量

var LINESELECT = [
[Blockly.OLED_HOR, "H"],
[Blockly.OLED_VER, "V"]
];
var FRAMESELECT = [
[Blockly.OLED_HOLLOW, "drawFrame"],
[Blockly.OLED_SOLID, "drawBox"]
];
var CIRCLESELECT = [
[Blockly.OLED_HOLLOW, "drawCircle"],
[Blockly.OLED_SOLID, "drawDisc"]
];
//
var RADSELECT = [
[Blockly.OLED_HOLLOW, "drawRFrame"],
[Blockly.OLED_SOLID, "drawRBox"]
];
//圆选择
var CIRCLEOPTELECT = [
[Blockly.OLED_WHOLE_CICILE, "U8G2_DRAW_ALL"],
[Blockly.OLED_UP_R, "U8G2_DRAW_UPPER_RIGHT"],
[Blockly.OLED_UP_L, "U8G2_DRAW_UPPER_LEFT"],
[Blockly.OLED_LOW_R, "U8G2_DRAW_LOWER_RIGHT"],
[Blockly.OLED_LOW_L, "U8G2_DRAW_LOWER_LEFT"]
];
//空心、实心椭圆
var ELLIPSESELECT = [
[Blockly.OLED_HOLLOW, "drawEllipse"],
[Blockly.OLED_SOLID, "drawFilledEllipse"]
];

//字体选择
var FONT_TYPE_SELECT = [
["timR14", "timR14_tf"],
["timR08", "timR08_tf"],
["timR18", "timR18_tf"],
["timR24", "timR24_tf"],
["helvR08", "helvB08_tf"],
["helvR14", "helvB14_tf"],
["helvR18", "helvB18_tf"],
["helvR24", "helvB24_tf"],
["fur11", "fur11_tf"],
["fur14", "fur14_tf"],
["fur17", "fur17_tf"],
["fur20", "fur20_tf"],
["ncenR10", "ncenR10_tf"],
["ncenR12", "ncenR12_tf"],
["ncenR14", "ncenR14_tf"],
["ncenR18", "ncenR18_tf"],
["ncenR24", "ncenR24_tf"],
[Blockly.OLED_FONT_wqy12_t_chinese1, "wqy12_t_chinese1"],
[Blockly.OLED_FONT_wqy12_t_chinese2, "wqy12_t_chinese2"],
[Blockly.OLED_FONT_wqy12_t_chinese3, "wqy12_t_chinese3"],
[Blockly.OLED_FONT_wqy14_t_chinese1, "wqy14_t_chinese1"],
[Blockly.OLED_FONT_wqy14_t_chinese2, "wqy14_t_chinese2"],
[Blockly.OLED_FONT_wqy14_t_chinese3, "wqy14_t_chinese3"],
[Blockly.OLED_FONT_wqy16_t_chinese1, "wqy16_t_chinese1"],
[Blockly.OLED_FONT_wqy16_t_chinese2, "wqy16_t_chinese2"],
[Blockly.OLED_FONT_wqy16_t_chinese3, "wqy16_t_chinese3"],
[Blockly.OLED_FONT_wqy12_t_gb2312a, "wqy12_t_gb2312a"],
[Blockly.OLED_FONT_wqy12_t_gb2312b, "wqy12_t_gb2312b"],
[Blockly.OLED_FONT_wqy12_t_gb2312, "wqy12_t_gb2312"],
[Blockly.OLED_FONT_wqy14_t_gb2312a, "wqy14_t_gb2312a"],
[Blockly.OLED_FONT_wqy14_t_gb2312b, "wqy14_t_gb2312b"],
[Blockly.OLED_FONT_wqy14_t_gb2312, "wqy14_t_gb2312"],
[Blockly.OLED_FONT_wqy16_t_gb2312a, "wqy16_t_gb2312a"],
[Blockly.OLED_FONT_wqy16_t_gb2312b, "wqy16_t_gb2312b"],
[Blockly.OLED_FONT_wqy16_t_gb2312, "wqy16_t_gb2312"]
];
var ICON_IMAGE = [
[{'src':'../../media/oled_icons/64.png','width':24,'height':24,'alt': '64'},'64'],
[{'src':'../../media/oled_icons/65.png','width':24,'height':24,'alt': '65'},'65'],
[{'src':'../../media/oled_icons/66.png','width':24,'height':24,'alt': '66'},'66'],
[{'src':'../../media/oled_icons/67.png','width':24,'height':24,'alt': '67'},'67'],
[{'src':'../../media/oled_icons/68.png','width':24,'height':24,'alt': '68'},'68'],
[{'src':'../../media/oled_icons/69.png','width':24,'height':24,'alt': '69'},'69'],
[{'src':'../../media/oled_icons/70.png','width':24,'height':24,'alt': '70'},'70'],
[{'src':'../../media/oled_icons/71.png','width':24,'height':24,'alt': '71'},'71'],
[{'src':'../../media/oled_icons/72.png','width':24,'height':24,'alt': '72'},'72'],
[{'src':'../../media/oled_icons/73.png','width':24,'height':24,'alt': '73'},'73'],
[{'src':'../../media/oled_icons/74.png','width':24,'height':24,'alt': '74'},'74'],
[{'src':'../../media/oled_icons/75.png','width':24,'height':24,'alt': '75'},'75'],
[{'src':'../../media/oled_icons/76.png','width':24,'height':24,'alt': '76'},'76'],
[{'src':'../../media/oled_icons/77.png','width':24,'height':24,'alt': '77'},'77'],
[{'src':'../../media/oled_icons/78.png','width':24,'height':24,'alt': '78'},'78'],
[{'src':'../../media/oled_icons/79.png','width':24,'height':24,'alt': '79'},'79'],
[{'src':'../../media/oled_icons/80.png','width':24,'height':24,'alt': '80'},'80'],
[{'src':'../../media/oled_icons/81.png','width':24,'height':24,'alt': '81'},'81'],
[{'src':'../../media/oled_icons/82.png','width':24,'height':24,'alt': '82'},'82'],
[{'src':'../../media/oled_icons/83.png','width':24,'height':24,'alt': '83'},'83'],
[{'src':'../../media/oled_icons/84.png','width':24,'height':24,'alt': '84'},'84'],
[{'src':'../../media/oled_icons/85.png','width':24,'height':24,'alt': '85'},'85'],
[{'src':'../../media/oled_icons/86.png','width':24,'height':24,'alt': '86'},'86'],
[{'src':'../../media/oled_icons/87.png','width':24,'height':24,'alt': '87'},'87'],
[{'src':'../../media/oled_icons/88.png','width':24,'height':24,'alt': '88'},'88'],
[{'src':'../../media/oled_icons/89.png','width':24,'height':24,'alt': '89'},'89'],
[{'src':'../../media/oled_icons/90.png','width':24,'height':24,'alt': '90'},'90'],
[{'src':'../../media/oled_icons/91.png','width':24,'height':24,'alt': '91'},'91'],
[{'src':'../../media/oled_icons/92.png','width':24,'height':24,'alt': '92'},'92'],
[{'src':'../../media/oled_icons/93.png','width':24,'height':24,'alt': '93'},'93'],
[{'src':'../../media/oled_icons/94.png','width':24,'height':24,'alt': '94'},'94'],
[{'src':'../../media/oled_icons/95.png','width':24,'height':24,'alt': '95'},'95'],
[{'src':'../../media/oled_icons/96.png','width':24,'height':24,'alt': '96'},'96'],
[{'src':'../../media/oled_icons/97.png','width':24,'height':24,'alt': '97'},'97'],
[{'src':'../../media/oled_icons/98.png','width':24,'height':24,'alt': '98'},'98'],
[{'src':'../../media/oled_icons/99.png','width':24,'height':24,'alt': '99'},'99'],
[{'src':'../../media/oled_icons/100.png','width':24,'height':24,'alt': '100'},'100'],
[{'src':'../../media/oled_icons/101.png','width':24,'height':24,'alt': '101'},'101'],
[{'src':'../../media/oled_icons/102.png','width':24,'height':24,'alt': '102'},'102'],
[{'src':'../../media/oled_icons/103.png','width':24,'height':24,'alt': '103'},'103'],
[{'src':'../../media/oled_icons/104.png','width':24,'height':24,'alt': '104'},'104'],
[{'src':'../../media/oled_icons/105.png','width':24,'height':24,'alt': '105'},'105'],
[{'src':'../../media/oled_icons/106.png','width':24,'height':24,'alt': '106'},'106'],
[{'src':'../../media/oled_icons/107.png','width':24,'height':24,'alt': '107'},'107'],
[{'src':'../../media/oled_icons/108.png','width':24,'height':24,'alt': '108'},'108'],
[{'src':'../../media/oled_icons/109.png','width':24,'height':24,'alt': '109'},'109'],
[{'src':'../../media/oled_icons/110.png','width':24,'height':24,'alt': '110'},'110'],
[{'src':'../../media/oled_icons/111.png','width':24,'height':24,'alt': '111'},'111'],
[{'src':'../../media/oled_icons/112.png','width':24,'height':24,'alt': '112'},'112'],
[{'src':'../../media/oled_icons/113.png','width':24,'height':24,'alt': '113'},'113'],
[{'src':'../../media/oled_icons/114.png','width':24,'height':24,'alt': '114'},'114'],
[{'src':'../../media/oled_icons/115.png','width':24,'height':24,'alt': '115'},'115'],
[{'src':'../../media/oled_icons/116.png','width':24,'height':24,'alt': '116'},'116'],
[{'src':'../../media/oled_icons/117.png','width':24,'height':24,'alt': '117'},'117'],
[{'src':'../../media/oled_icons/118.png','width':24,'height':24,'alt': '118'},'118'],
[{'src':'../../media/oled_icons/119.png','width':24,'height':24,'alt': '119'},'119'],
[{'src':'../../media/oled_icons/120.png','width':24,'height':24,'alt': '120'},'120'],
[{'src':'../../media/oled_icons/121.png','width':24,'height':24,'alt': '121'},'121'],
[{'src':'../../media/oled_icons/122.png','width':24,'height':24,'alt': '122'},'122'],
[{'src':'../../media/oled_icons/123.png','width':24,'height':24,'alt': '123'},'123'],
[{'src':'../../media/oled_icons/124.png','width':24,'height':24,'alt': '124'},'124'],
[{'src':'../../media/oled_icons/125.png','width':24,'height':24,'alt': '125'},'125'],
[{'src':'../../media/oled_icons/126.png','width':24,'height':24,'alt': '126'},'126'],
[{'src':'../../media/oled_icons/127.png','width':24,'height':24,'alt': '127'},'127'],
[{'src':'../../media/oled_icons/128.png','width':24,'height':24,'alt': '128'},'128'],
[{'src':'../../media/oled_icons/129.png','width':24,'height':24,'alt': '129'},'129'],
[{'src':'../../media/oled_icons/130.png','width':24,'height':24,'alt': '130'},'130'],
[{'src':'../../media/oled_icons/131.png','width':24,'height':24,'alt': '131'},'131'],
[{'src':'../../media/oled_icons/132.png','width':24,'height':24,'alt': '132'},'132'],
[{'src':'../../media/oled_icons/133.png','width':24,'height':24,'alt': '133'},'133'],
[{'src':'../../media/oled_icons/134.png','width':24,'height':24,'alt': '134'},'134'],
[{'src':'../../media/oled_icons/135.png','width':24,'height':24,'alt': '135'},'135'],
[{'src':'../../media/oled_icons/136.png','width':24,'height':24,'alt': '136'},'136'],
[{'src':'../../media/oled_icons/137.png','width':24,'height':24,'alt': '137'},'137'],
[{'src':'../../media/oled_icons/138.png','width':24,'height':24,'alt': '138'},'138'],
[{'src':'../../media/oled_icons/139.png','width':24,'height':24,'alt': '139'},'139'],
[{'src':'../../media/oled_icons/140.png','width':24,'height':24,'alt': '140'},'140'],
[{'src':'../../media/oled_icons/141.png','width':24,'height':24,'alt': '141'},'141'],
[{'src':'../../media/oled_icons/142.png','width':24,'height':24,'alt': '142'},'142'],
[{'src':'../../media/oled_icons/143.png','width':24,'height':24,'alt': '143'},'143'],
[{'src':'../../media/oled_icons/144.png','width':24,'height':24,'alt': '144'},'144'],
[{'src':'../../media/oled_icons/145.png','width':24,'height':24,'alt': '145'},'145'],
[{'src':'../../media/oled_icons/146.png','width':24,'height':24,'alt': '146'},'146'],
[{'src':'../../media/oled_icons/147.png','width':24,'height':24,'alt': '147'},'147'],
[{'src':'../../media/oled_icons/148.png','width':24,'height':24,'alt': '148'},'148'],
[{'src':'../../media/oled_icons/149.png','width':24,'height':24,'alt': '149'},'149'],
[{'src':'../../media/oled_icons/150.png','width':24,'height':24,'alt': '150'},'150'],
[{'src':'../../media/oled_icons/151.png','width':24,'height':24,'alt': '151'},'151'],
[{'src':'../../media/oled_icons/152.png','width':24,'height':24,'alt': '152'},'152'],
[{'src':'../../media/oled_icons/153.png','width':24,'height':24,'alt': '153'},'153'],
[{'src':'../../media/oled_icons/154.png','width':24,'height':24,'alt': '154'},'154'],
[{'src':'../../media/oled_icons/155.png','width':24,'height':24,'alt': '155'},'155'],
[{'src':'../../media/oled_icons/156.png','width':24,'height':24,'alt': '156'},'156'],
[{'src':'../../media/oled_icons/157.png','width':24,'height':24,'alt': '157'},'157'],
[{'src':'../../media/oled_icons/158.png','width':24,'height':24,'alt': '158'},'158'],
[{'src':'../../media/oled_icons/159.png','width':24,'height':24,'alt': '159'},'159'],
[{'src':'../../media/oled_icons/160.png','width':24,'height':24,'alt': '160'},'160'],
[{'src':'../../media/oled_icons/161.png','width':24,'height':24,'alt': '161'},'161'],
[{'src':'../../media/oled_icons/162.png','width':24,'height':24,'alt': '162'},'162'],
[{'src':'../../media/oled_icons/163.png','width':24,'height':24,'alt': '163'},'163'],
[{'src':'../../media/oled_icons/164.png','width':24,'height':24,'alt': '164'},'164'],
[{'src':'../../media/oled_icons/165.png','width':24,'height':24,'alt': '165'},'165'],
[{'src':'../../media/oled_icons/166.png','width':24,'height':24,'alt': '166'},'166'],
[{'src':'../../media/oled_icons/167.png','width':24,'height':24,'alt': '167'},'167'],
[{'src':'../../media/oled_icons/168.png','width':24,'height':24,'alt': '168'},'168'],
[{'src':'../../media/oled_icons/169.png','width':24,'height':24,'alt': '169'},'169'],
[{'src':'../../media/oled_icons/170.png','width':24,'height':24,'alt': '170'},'170'],
[{'src':'../../media/oled_icons/171.png','width':24,'height':24,'alt': '171'},'171'],
[{'src':'../../media/oled_icons/172.png','width':24,'height':24,'alt': '172'},'172'],
[{'src':'../../media/oled_icons/173.png','width':24,'height':24,'alt': '173'},'173'],
[{'src':'../../media/oled_icons/174.png','width':24,'height':24,'alt': '174'},'174'],
[{'src':'../../media/oled_icons/175.png','width':24,'height':24,'alt': '175'},'175'],
[{'src':'../../media/oled_icons/176.png','width':24,'height':24,'alt': '176'},'176'],
[{'src':'../../media/oled_icons/177.png','width':24,'height':24,'alt': '177'},'177'],
[{'src':'../../media/oled_icons/178.png','width':24,'height':24,'alt': '178'},'178'],
[{'src':'../../media/oled_icons/179.png','width':24,'height':24,'alt': '179'},'179'],
[{'src':'../../media/oled_icons/180.png','width':24,'height':24,'alt': '180'},'180'],
[{'src':'../../media/oled_icons/181.png','width':24,'height':24,'alt': '181'},'181'],
[{'src':'../../media/oled_icons/182.png','width':24,'height':24,'alt': '182'},'182'],
[{'src':'../../media/oled_icons/183.png','width':24,'height':24,'alt': '183'},'183'],
[{'src':'../../media/oled_icons/184.png','width':24,'height':24,'alt': '184'},'184'],
[{'src':'../../media/oled_icons/185.png','width':24,'height':24,'alt': '185'},'185'],
[{'src':'../../media/oled_icons/186.png','width':24,'height':24,'alt': '186'},'186'],
[{'src':'../../media/oled_icons/187.png','width':24,'height':24,'alt': '187'},'187'],
[{'src':'../../media/oled_icons/188.png','width':24,'height':24,'alt': '188'},'188'],
[{'src':'../../media/oled_icons/189.png','width':24,'height':24,'alt': '189'},'189'],
[{'src':'../../media/oled_icons/190.png','width':24,'height':24,'alt': '190'},'190'],
[{'src':'../../media/oled_icons/191.png','width':24,'height':24,'alt': '191'},'191'],
[{'src':'../../media/oled_icons/192.png','width':24,'height':24,'alt': '192'},'192'],
[{'src':'../../media/oled_icons/193.png','width':24,'height':24,'alt': '193'},'193'],
[{'src':'../../media/oled_icons/194.png','width':24,'height':24,'alt': '194'},'194'],
[{'src':'../../media/oled_icons/195.png','width':24,'height':24,'alt': '195'},'195'],
[{'src':'../../media/oled_icons/196.png','width':24,'height':24,'alt': '196'},'196'],
[{'src':'../../media/oled_icons/197.png','width':24,'height':24,'alt': '197'},'197'],
[{'src':'../../media/oled_icons/198.png','width':24,'height':24,'alt': '198'},'198'],
[{'src':'../../media/oled_icons/199.png','width':24,'height':24,'alt': '199'},'199'],
[{'src':'../../media/oled_icons/200.png','width':24,'height':24,'alt': '200'},'200'],
[{'src':'../../media/oled_icons/201.png','width':24,'height':24,'alt': '201'},'201'],
[{'src':'../../media/oled_icons/202.png','width':24,'height':24,'alt': '202'},'202'],
[{'src':'../../media/oled_icons/203.png','width':24,'height':24,'alt': '203'},'203'],
[{'src':'../../media/oled_icons/204.png','width':24,'height':24,'alt': '204'},'204'],
[{'src':'../../media/oled_icons/205.png','width':24,'height':24,'alt': '205'},'205'],
[{'src':'../../media/oled_icons/206.png','width':24,'height':24,'alt': '206'},'206'],
[{'src':'../../media/oled_icons/207.png','width':24,'height':24,'alt': '207'},'207'],
[{'src':'../../media/oled_icons/208.png','width':24,'height':24,'alt': '208'},'208'],
[{'src':'../../media/oled_icons/209.png','width':24,'height':24,'alt': '209'},'209'],
[{'src':'../../media/oled_icons/210.png','width':24,'height':24,'alt': '210'},'210'],
[{'src':'../../media/oled_icons/211.png','width':24,'height':24,'alt': '211'},'211'],
[{'src':'../../media/oled_icons/212.png','width':24,'height':24,'alt': '212'},'212'],
[{'src':'../../media/oled_icons/213.png','width':24,'height':24,'alt': '213'},'213'],
[{'src':'../../media/oled_icons/214.png','width':24,'height':24,'alt': '214'},'214'],
[{'src':'../../media/oled_icons/215.png','width':24,'height':24,'alt': '215'},'215'],
[{'src':'../../media/oled_icons/216.png','width':24,'height':24,'alt': '216'},'216'],
[{'src':'../../media/oled_icons/217.png','width':24,'height':24,'alt': '217'},'217'],
[{'src':'../../media/oled_icons/218.png','width':24,'height':24,'alt': '218'},'218'],
[{'src':'../../media/oled_icons/219.png','width':24,'height':24,'alt': '219'},'219'],
[{'src':'../../media/oled_icons/220.png','width':24,'height':24,'alt': '220'},'220'],
[{'src':'../../media/oled_icons/221.png','width':24,'height':24,'alt': '221'},'221'],
[{'src':'../../media/oled_icons/222.png','width':24,'height':24,'alt': '222'},'222'],
[{'src':'../../media/oled_icons/223.png','width':24,'height':24,'alt': '223'},'223'],
[{'src':'../../media/oled_icons/224.png','width':24,'height':24,'alt': '224'},'224'],
[{'src':'../../media/oled_icons/225.png','width':24,'height':24,'alt': '225'},'225'],
[{'src':'../../media/oled_icons/226.png','width':24,'height':24,'alt': '226'},'226'],
[{'src':'../../media/oled_icons/227.png','width':24,'height':24,'alt': '227'},'227'],
[{'src':'../../media/oled_icons/228.png','width':24,'height':24,'alt': '228'},'228'],
[{'src':'../../media/oled_icons/229.png','width':24,'height':24,'alt': '229'},'229'],
[{'src':'../../media/oled_icons/230.png','width':24,'height':24,'alt': '230'},'230'],
[{'src':'../../media/oled_icons/231.png','width':24,'height':24,'alt': '231'},'231'],
[{'src':'../../media/oled_icons/232.png','width':24,'height':24,'alt': '232'},'232'],
[{'src':'../../media/oled_icons/233.png','width':24,'height':24,'alt': '233'},'233'],
[{'src':'../../media/oled_icons/234.png','width':24,'height':24,'alt': '234'},'234'],
[{'src':'../../media/oled_icons/235.png','width':24,'height':24,'alt': '235'},'235'],
[{'src':'../../media/oled_icons/236.png','width':24,'height':24,'alt': '236'},'236'],
[{'src':'../../media/oled_icons/237.png','width':24,'height':24,'alt': '237'},'237'],
[{'src':'../../media/oled_icons/238.png','width':24,'height':24,'alt': '238'},'238'],
[{'src':'../../media/oled_icons/239.png','width':24,'height':24,'alt': '239'},'239'],
[{'src':'../../media/oled_icons/240.png','width':24,'height':24,'alt': '240'},'240'],
[{'src':'../../media/oled_icons/241.png','width':24,'height':24,'alt': '241'},'241'],
[{'src':'../../media/oled_icons/242.png','width':24,'height':24,'alt': '242'},'242'],
[{'src':'../../media/oled_icons/243.png','width':24,'height':24,'alt': '243'},'243'],
[{'src':'../../media/oled_icons/244.png','width':24,'height':24,'alt': '244'},'244'],
[{'src':'../../media/oled_icons/245.png','width':24,'height':24,'alt': '245'},'245'],
[{'src':'../../media/oled_icons/246.png','width':24,'height':24,'alt': '246'},'246'],
[{'src':'../../media/oled_icons/247.png','width':24,'height':24,'alt': '247'},'247'],
[{'src':'../../media/oled_icons/248.png','width':24,'height':24,'alt': '248'},'248'],
[{'src':'../../media/oled_icons/249.png','width':24,'height':24,'alt': '249'},'249'],
[{'src':'../../media/oled_icons/250.png','width':24,'height':24,'alt': '250'},'250'],
[{'src':'../../media/oled_icons/251.png','width':24,'height':24,'alt': '251'},'251'],
[{'src':'../../media/oled_icons/252.png','width':24,'height':24,'alt': '252'},'252'],
[{'src':'../../media/oled_icons/253.png','width':24,'height':24,'alt': '253'},'253'],
[{'src':'../../media/oled_icons/254.png','width':24,'height':24,'alt': '254'},'254'],
[{'src':'../../media/oled_icons/255.png','width':24,'height':24,'alt': '255'},'255'],
[{'src':'../../media/oled_icons/256.png','width':24,'height':24,'alt': '256'},'256'],
[{'src':'../../media/oled_icons/257.png','width':24,'height':24,'alt': '257'},'257'],
[{'src':'../../media/oled_icons/258.png','width':24,'height':24,'alt': '258'},'258'],
[{'src':'../../media/oled_icons/259.png','width':24,'height':24,'alt': '259'},'259'],
[{'src':'../../media/oled_icons/260.png','width':24,'height':24,'alt': '260'},'260'],
[{'src':'../../media/oled_icons/261.png','width':24,'height':24,'alt': '261'},'261'],
[{'src':'../../media/oled_icons/262.png','width':24,'height':24,'alt': '262'},'262'],
[{'src':'../../media/oled_icons/263.png','width':24,'height':24,'alt': '263'},'263'],
[{'src':'../../media/oled_icons/264.png','width':24,'height':24,'alt': '264'},'264'],
[{'src':'../../media/oled_icons/265.png','width':24,'height':24,'alt': '265'},'265'],
[{'src':'../../media/oled_icons/266.png','width':24,'height':24,'alt': '266'},'266'],
[{'src':'../../media/oled_icons/267.png','width':24,'height':24,'alt': '267'},'267'],
[{'src':'../../media/oled_icons/268.png','width':24,'height':24,'alt': '268'},'268'],
[{'src':'../../media/oled_icons/269.png','width':24,'height':24,'alt': '269'},'269'],
[{'src':'../../media/oled_icons/270.png','width':24,'height':24,'alt': '270'},'270'],
[{'src':'../../media/oled_icons/271.png','width':24,'height':24,'alt': '271'},'271'],
[{'src':'../../media/oled_icons/272.png','width':24,'height':24,'alt': '272'},'272'],
[{'src':'../../media/oled_icons/273.png','width':24,'height':24,'alt': '273'},'273'],
[{'src':'../../media/oled_icons/274.png','width':24,'height':24,'alt': '274'},'274'],
[{'src':'../../media/oled_icons/275.png','width':24,'height':24,'alt': '275'},'275'],
[{'src':'../../media/oled_icons/276.png','width':24,'height':24,'alt': '276'},'276'],
[{'src':'../../media/oled_icons/277.png','width':24,'height':24,'alt': '277'},'277'],
[{'src':'../../media/oled_icons/278.png','width':24,'height':24,'alt': '278'},'278'],
[{'src':'../../media/oled_icons/279.png','width':24,'height':24,'alt': '279'},'279'],
[{'src':'../../media/oled_icons/280.png','width':24,'height':24,'alt': '280'},'280'],
[{'src':'../../media/oled_icons/281.png','width':24,'height':24,'alt': '281'},'281'],
[{'src':'../../media/oled_icons/282.png','width':24,'height':24,'alt': '282'},'282'],
[{'src':'../../media/oled_icons/283.png','width':24,'height':24,'alt': '283'},'283'],
[{'src':'../../media/oled_icons/284.png','width':24,'height':24,'alt': '284'},'284'],
[{'src':'../../media/oled_icons/285.png','width':24,'height':24,'alt': '285'},'285'],
[{'src':'../../media/oled_icons/286.png','width':24,'height':24,'alt': '286'},'286'],
[{'src':'../../media/oled_icons/287.png','width':24,'height':24,'alt': '287'},'287'],
];
//图标尺寸
var ICON_SIZE = [
["8", "1"],
["16", "2"],
["32", "4"],
["48", "6"],
["64", "8"],
];
//显示-OLED-图像（汉字）高度选择
var OLED_BITMAP_HEIGHT_SELECT = [
["16", "16"],
["8", "8"],
["24", "24"],
["32", "32"],
["40", "40"],
["48", "48"],
["56", "56"],
["64", "64"]
];

//显示-OLED-图像（汉字）宽度选择
var OLED_BITMAP_WIDTH_SELECT = [
["16", "16"],
["8", "8"],
["24", "24"],
["32", "32"],
["40", "40"],
["48", "48"],
["56", "56"],
["64", "64"],
["72", "72"],
["80", "80"],
["88", "88"],
["96", "96"],
["104", "104"],
["112", "112"],
["120", "120"],
["128", "128"]
];
//显示-OLED-初始化(iic)
Blockly.Blocks.oled_init = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.OLED_INIT2);
      this.appendValueInput("SCL")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField('SCL#');this.appendValueInput("SDA")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField('SDA#');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.OLED_INIT2_TOOLTIP);
}
};
//显示-OLED-清屏幕
Blockly.Blocks.oled_clear = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.OLED_CLEAR);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip();
}
};

//显示-oled-定义字模名称和数据
Blockly.Blocks['oled_define_bitmap_data'] = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField("OLED")
    .appendField(Blockly.OLED_BITMAP_NAME)
    .appendField(new Blockly.FieldTextInput('bitmap1'), 'VAR')
    .appendField(Blockly.OLED_BITMAP_DATA)
    .appendField(new Blockly.FieldTextInput('0x80,0x00,0x84,0x10,0x88,0x10,0x90,0x08,0x90,0x04,0x80,0x00,0xFE,0x3F,0xC0,0x01, 0xA0,0x02,0xA0,0x02,0x90,0x04,0x88,0x08,0x84,0x10,0x83,0x60,0x80,0x00,0x80,0x00'), 'TEXT');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.OLED_DEF_BMP_DATA_TOOLTIP);
}
}

//显示-TFT-设置图标
Blockly.Blocks.oled_icons = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField("OLED")
    .appendField(Blockly.OLED_BITMAP);
    this.appendValueInput("POS_X", Number)
    .appendField(Blockly.OLED_START_X)
    .setCheck(Number);
    this.appendValueInput("POS_Y", Number)
    .appendField(Blockly.OLED_START_Y)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MICROBIT_JS_NUMBER)
    .appendField(new Blockly.FieldDropdown(ICON_SIZE), "ICON_SIZE")
    .appendField("px");
    this.appendDummyInput()
    .appendField(Blockly.OLED_ICON)
    .appendField(new Blockly.FieldDropdown(ICON_IMAGE), 'ICON_IMAGE');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.oled_setFont_tooltip);
}
};
//显示-OLED-显示位图（汉字）
Blockly.Blocks.oled_showBitmap = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField("OLED")
    .appendField(Blockly.OLED_BITMAP);
    this.appendValueInput("START_X", Number)
    .appendField(Blockly.OLED_POSX)
    .setCheck(Number);
    this.appendValueInput("START_Y", Number)
    .appendField(Blockly.OLED_POSY)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_WIDTH)
    .appendField(new Blockly.FieldDropdown(OLED_BITMAP_WIDTH_SELECT), "WIDTH");
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_HEIGHT)
    .appendField(new Blockly.FieldDropdown(OLED_BITMAP_HEIGHT_SELECT), "HEIGHT");
    this.appendValueInput("bitmap_name", String)
    .appendField(Blockly.OLED_BITMAP_NAME)
    .setCheck(String);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.OLED_SHOW_BMP_TOOLTIP);
}
};

//显示-OLED-画点
Blockly.Blocks.oled_drawPixe = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField("OLED")
    .appendField(Blockly.OLED_DRAWPIXE);
    this.appendValueInput("POS_X", Number)
    .appendField(Blockly.OLED_POSX)
    .setCheck(Number);
    this.appendValueInput("POS_Y", Number)
    .appendField(Blockly.OLED_POSY)
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.OLED_DRAW_PIXE_TOOLTIP);
}
};

//显示-OLED-画线
Blockly.Blocks.oled_drawLine = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField("OLED")
    .appendField(Blockly.OLED_DRAWLINE);
    this.appendValueInput("START_X", Number)
    .appendField(Blockly.OLED_START_X)
    .setCheck(Number);
    this.appendValueInput("START_Y", Number)
    .appendField(Blockly.OLED_START_Y)
    .setCheck(Number);
    this.appendValueInput("END_X", Number)
    .appendField(Blockly.OLED_END_X)
    .setCheck(Number);
    this.appendValueInput("END_Y", Number)
    .appendField(Blockly.OLED_END_Y)
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.OLED_DRAW_LINE_TOOLTIP);
}
};

//显示-OLED-画直线
Blockly.Blocks.oled_draw_Str_Line = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField("OLED")
    .appendField(Blockly.OLED_DRAWSTRLINE);
    this.appendValueInput("START_X", Number)
    .appendField(Blockly.OLED_START_X)
    .setCheck(Number);
    this.appendValueInput("START_Y", Number)
    .appendField(Blockly.OLED_START_Y)
    .setCheck(Number);
    this.appendValueInput("LENGTH", Number)
    .appendField(Blockly.OLED_LENGTH)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(LINESELECT), "TYPE");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("x(0~127),y(0~63)");
}
};

//显示-OLED-新建页面
Blockly.Blocks.oled_page = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField("OLED")
    .appendField(Blockly.OLED_PAGE);
    this.appendStatementInput('DO')
    .appendField('');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.oled_page_tooltip);
}
};

//显示-OLED-画三角
Blockly.Blocks.oled_drawTriangle = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField("OLED")
    .appendField(Blockly.OLED_DRAW_TRIANGLE);
    this.appendValueInput("D0_X", Number)
    .appendField(Blockly.OLED_D0_X)
    .setCheck(Number);
    this.appendValueInput("D0_Y", Number)
    .appendField(Blockly.OLED_D0_Y)
    .setCheck(Number);
    this.appendValueInput("D1_X", Number)
    .appendField(Blockly.OLED_D1_X)
    .setCheck(Number);
    this.appendValueInput("D1_Y", Number)
    .appendField(Blockly.OLED_D1_Y)
    .setCheck(Number);
    this.appendValueInput("D2_X", Number)
    .appendField(Blockly.OLED_D2_X)
    .setCheck(Number);
    this.appendValueInput("D2_Y", Number)
    .appendField(Blockly.OLED_D2_Y)
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("");
}
};

//显示-OLED-画长方形
Blockly.Blocks.oled_drawFrame = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField("OLED")
    .appendField(Blockly.OLED_DRAW_RECTANGLE);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(FRAMESELECT), "TYPE");
    this.appendValueInput("D0_X", Number)
    .appendField(Blockly.OLED_L_U_X)
    .setCheck(Number);
    this.appendValueInput("D0_Y", Number)
    .appendField(Blockly.OLED_L_U_Y)
    .setCheck(Number);
    this.appendValueInput("WIDTH", Number)
    .appendField(Blockly.MIXLY_WIDTH)
    .setCheck(Number);
    this.appendValueInput("HEIGHT", Number)
    .appendField(Blockly.MIXLY_HEIGHT)
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("x(0~127),y(0~63)");
}
};

//显示-OLED-画圆角矩形
Blockly.Blocks.oled_drawRFrame = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField("OLED")
    .appendField(Blockly.OLED_DRAW_RAD_RECTANGLE);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(RADSELECT), "TYPE");
    this.appendValueInput("D0_X", Number)
    .appendField(Blockly.OLED_L_U_X)
    .setCheck(Number);
    this.appendValueInput("D0_Y", Number)
    .appendField(Blockly.OLED_L_U_Y)
    .setCheck(Number);
    this.appendValueInput("WIDTH", Number)
    .appendField(Blockly.MIXLY_WIDTH)
    .setCheck(Number);
    this.appendValueInput("HEIGHT", Number)
    .appendField(Blockly.MIXLY_HEIGHT)
    .setCheck(Number);
    this.appendValueInput("RADIUS", Number)
    .appendField(Blockly.OLED_RADIUS)
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("x(0~127),y(0~63)");
}
};

//显示-OLED-画圆（空心，实心）
Blockly.Blocks.oled_drawCircle = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField("OLED")
    .appendField(Blockly.OLED_DRAW_CIRCLE);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(CIRCLESELECT), "TYPE");
    this.appendValueInput("D0_X", Number)
    .appendField(Blockly.OLED_CENTER_CIRCLE_X)
    .setCheck(Number);
    this.appendValueInput("D0_Y", Number)
    .appendField(Blockly.OLED_CENTER_CIRCLE_Y)
    .setCheck(Number);
    this.appendValueInput("RADIUS", Number)
    .appendField(Blockly.OLED_CIRCLE_RADIUS)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(CIRCLEOPTELECT), "OPT");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("x(0~127),y(0~63)");
}
};

//显示-OLED-画椭圆（空心，实心）
Blockly.Blocks.oled_drawEllipse = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField("OLED")
    .appendField(Blockly.OLED_DRAW_ELLIPSE);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(ELLIPSESELECT), "TYPE");
    this.appendValueInput("D0_X", Number)
    .appendField(Blockly.OLED_CENTER_CIRCLE_X)
    .setCheck(Number);
    this.appendValueInput("D0_Y", Number)
    .appendField(Blockly.OLED_CENTER_CIRCLE_Y)
    .setCheck(Number);
    this.appendValueInput("RADIUS_X", Number)
    .appendField(Blockly.OLED_ELLIPSE_RADIUS_X)
    .setCheck(Number);
    this.appendValueInput("RADIUS_Y", Number)
    .appendField(Blockly.OLED_ELLIPSE_RADIUS_Y)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(CIRCLEOPTELECT), "OPT");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.OLED_DRAW_ELLIPSE_TOOLTIP);
}
};

//显示-OLED-显示字符串
Blockly.Blocks.oled_drawStr = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField("OLED")
    .appendField(Blockly.OLED_DRAWSTR);
    this.appendValueInput("POS_X", Number)
    .appendField(Blockly.OLED_START_X)
    .setCheck(Number);
    this.appendValueInput("POS_Y", Number)
    .appendField(Blockly.OLED_START_Y)
    .setCheck(Number);
    this.appendValueInput("TEXT", String)
    .appendField(Blockly.OLED_STRING)
    .setCheck([Number, String]);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("x(0~127),y(0~63)");
}
};

//显示-OLED-设置字体
Blockly.Blocks.oled_setFont = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField("OLED")
    .appendField(Blockly.OLED_SET_FONT);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(FONT_TYPE_SELECT), "TYPE");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.oled_setFont_tooltip);
}
};

//显示-OLED-显示字符串
Blockly.Blocks.oled_print = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField("OLED")
    .appendField(Blockly.OLED_PRINT_VAR);
    this.appendValueInput("POS_X", Number)
    .appendField(Blockly.OLED_START_X)
    .setCheck(Number);
    this.appendValueInput("POS_Y", Number)
    .appendField(Blockly.OLED_START_Y)
    .setCheck(Number);
    this.appendValueInput("TEXT", String)
    .appendField(Blockly.OLED_STRING)
    .setCheck([Number, String]);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.oled_print_tooltip);
}
};

//显示-OLED-显示多行文本
Blockly.Blocks.oled_draw4Str = {
  init: function() {
    this.appendDummyInput()
    .appendField("OLED")
    .appendField(Blockly.oled_draw4Str);
    this.appendDummyInput()
    .appendField(Blockly.OLED_PRINT);
    this.appendValueInput("Text_line1", 'String')
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.OLED_LINE1);
    this.appendValueInput("Text_line2", 'String')
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.OLED_LINE2);
    this.appendValueInput("Text_line3", 'String')
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.OLED_LINE3);
    this.appendValueInput("Text_line4", 'String')
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.OLED_LINE4);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.display.HUE);
    this.setTooltip('');
    this.setHelpUrl('');
}
};

Blockly.Blocks.lp2i_u8g_draw_4strings = {
  init: function() {
    this.appendDummyInput()
    .appendField("OLED 128*64    " + Blockly.Msg.OLEDDISPLAY);
        //.appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/display-oled-128x64-i2c/display-oled-128x64-i2c.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
        this.appendValueInput("Text_line1" , 'String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.line1);        
        this.appendValueInput("Text_line2" , 'String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.line2);            
        this.appendValueInput("Text_line3" , 'String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.line3);            
        this.appendValueInput("Text_line4" , 'String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.line4);            
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.display.HUE);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_OLED_DRAW4STRING);
    }
};

