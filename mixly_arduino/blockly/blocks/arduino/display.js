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
    .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_LCD_STAT_ON, "display"], [Blockly.MIXLY_LCD_STAT_OFF, "noDisplay"], [Blockly.MIXLY_LCD_STAT_CURSOR, "cursor"], [Blockly.MIXLY_LCD_STAT_NOCURSOR, "noCursor"], [Blockly.MIXLY_LCD_STAT_BLINK, "blink"], [Blockly.MIXLY_LCD_STAT_NOBLINK, "noBlink"], [Blockly.MIXLY_LCD_STAT_CLEAR, "clear"], [Blockly.MIXLY_LCD_NOBACKLIGHT, "noBacklight"], [Blockly.MIXLY_LCD_BACKLIGHT, "backlight"]]), "STAT");
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
    .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_LCD_STAT_ON, "displayOn"], [Blockly.MIXLY_LCD_STAT_OFF, "displayOff"], [Blockly.MIXLY_LCD_STAT_CLEAR, "clear"]]), "STAT");
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
["timR14", "timR14_tr"],
["timR08", "timR08_tr"],
["timR18", "timR18_tr"],
["timR24", "timR24_tr"],
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

