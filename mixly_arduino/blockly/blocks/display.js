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
Blockly.Blocks.lp2i_u8g_print = {
    init: function() {
        this.appendDummyInput()
            .appendField("OLED I2C display");
        //.appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/display-oled-128x64-i2c/display-oled-128x64-i2c.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));		
        this.appendValueInput("N", 'Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.OLEDDISPLAY);
        this.appendValueInput("X", 'Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.rawx);		
        this.appendValueInput("Y", 'Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.liney);		
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.display.HUE);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_OLED_PRINT.replace('%1',Blockly.Arduino.valueToCode(this, 'X',Blockly.Arduino.ORDER_ATOMIC)).replace('%2',Blockly.Arduino.valueToCode(this, 'Y',Blockly.Arduino.ORDER_ATOMIC)));
    }
};

Blockly.Blocks.lp2i_u8g_4draw_print = {
    init: function() {
        this.appendDummyInput()
            .appendField("OLED I2C display");
        //.appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/display-oled-128x64-i2c/display-oled-128x64-i2c.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));		
        this.appendDummyInput()
            .appendField(Blockly.Msg.OLEDDISPLAY);
        this.appendValueInput("Text_line1" , 'String')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.line1);		
        this.appendValueInput("N1", 'Number')	
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.num1);		
        this.appendValueInput("Text_line2" , 'String')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.line2);			
        this.appendValueInput("N2", 'Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.num2);		
        this.appendValueInput("Text_line3" , 'String')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.line3);			
        this.appendValueInput("N3", 'Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.num3);		
        this.appendValueInput("Text_line4" , 'String')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.line4);			
        this.appendValueInput("N4", 'Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.num4);		
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.display.HUE);
        this.setTooltip('');
    }
};
//
//RGB
Blockly.Blocks.display_rgb_init = {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RGB)
        this.appendValueInput("PIN", Number)
           .setCheck(Number)
           .setAlign(Blockly.ALIGN_RIGHT)
           .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput("LEDCOUNT")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_COUNT);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_RGB_INIT);
    }
};

Blockly.Blocks.display_rgb = {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RGB)
         this.appendValueInput("PIN", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_NUM);
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_B);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_RGB_DISPLAY);
    }
};
Blockly.Blocks.display_rgb2 = {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RGB)
         this.appendValueInput("PIN", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_NUM);
        this.appendDummyInput("")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldColour("#ff0000"), "RGB_LED_COLOR");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_RGB_DISPLAY2);
    }
};

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
        this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MIXLY_4DIGITDISPLAY_TM1637_INIT).appendField("CLK").appendField(Blockly.MIXLY_PIN);
        this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("DIO").appendField(Blockly.MIXLY_PIN);
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
        this.appendValueInput("VALUE").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MIXLY_4DIGITDISPLAY_TM1637_DISPLAYPRINT);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_4DIGITDISPLAY_TM1637_DISPLAYSTRING_TIP);
    }
};


Blockly.Blocks.display_TM1637_displayTime = {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendDummyInput("").appendField(Blockly.MIXLY_4DIGITDISPLAY_TM1637_DISPLAYTIME);
        this.appendValueInput("hour").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput("").appendField(Blockly.MIXLY_HOUR);
        this.appendValueInput("minute").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput("").appendField(Blockly.MIXLY_MINUTE);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_4DIGITDISPLAY_TM1637_DISPLAYTIME_TOOLTIP);
    }
};



Blockly.Blocks.display_TM1637_Brightness = {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendDummyInput("").appendField(Blockly.MIXLY_4DIGITDISPLAY_TM1637_BRIGHTNESS);
        this.appendValueInput("Brightness").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.MIXLY_4DIGITDISPLAY_4DIGITDISPLAY_BRIGHTNESS_TOOLTIP);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_TOOPTIP_4DIGITDISPLAY_TM1637_BRIGHTNESS);
    }
};
Blockly.Blocks.display_Matrix_Init = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("").appendField(Blockly.MIXLY_DISPLAY_MATRIX_INIT);
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldTextInput('myMatrix'), 'matrixName');
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SDA#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SCL#"); 
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOPTIP_Matrix_HK16T33_INIT);
   }
};

//执行器_点阵屏显示_画点变量
var display_DrawPixel_NUM = [
  [Blockly.MIXLY_4DIGITDISPLAY_ON, "1"],
  [Blockly.MIXLY_4DIGITDISPLAY_OFF, "0"]
];

//执行器_点阵屏显示_画点显示
Blockly.Blocks.display_Matrix_POS = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("").appendField(new Blockly.FieldTextInput('myMatrix'), 'matrixName').appendField(Blockly.MIXLY_DISPLAY_MATRIX_SHOW);
    this.appendValueInput('XVALUE').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MIXLY_DISPLAY_MATRIX_X);
    this.appendValueInput("YVALUE").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MIXLY_DISPLAY_MATRIX_Y);
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MIXLY_DISPLAY_MATRIX_SHOWPOINT).appendField(new Blockly.FieldDropdown(display_DrawPixel_NUM), "DrawPixel_TYPE");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_TOOPTIP_Matrix_HK16T33_POS);
  }
};
//执行器_点阵屏显示_旋转变量
var display_Rotation_NUM = [
  ["0°", "0"],
  ["-90°", "1"],
  ["+90°", "3"],
  ["180°", "2"]
];

//执行器_点阵屏显示_显示旋转
Blockly.Blocks.display_Matrix_Rotation = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("").appendField(new Blockly.FieldTextInput('myMatrix'), 'matrixName').appendField(Blockly.MIXLY_DISPLAY_MATRIX_SHOW);
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MIXLY_DISPLAY_MATRIX_ROTATE).appendField(new Blockly.FieldDropdown(display_Rotation_NUM), "Rotation_TYPE");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_TOOPTIP_Matrix_HK16T33_ROTATION);
  }
};
//执行器_点阵屏显示_字符显示
Blockly.Blocks.display_Matrix_TEXT={
  init:function(){
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("").appendField(new Blockly.FieldTextInput('myMatrix'), 'matrixName').appendField(Blockly.MIXLY_DISPLAY_MATRIX_SHOW);
    this.appendValueInput("TEXT", String).setCheck([Number, String]).setAlign(Blockly.ALIGN_RIGHT).appendField(" 显示");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOPTIP_Matrix_HK16T33_TEXT);
  }
};
//执行器_点阵屏显示_显示图案
Blockly.Blocks.display_Matrix_DisplayChar = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("").appendField(new Blockly.FieldTextInput('myMatrix'), 'matrixName').appendField(Blockly.MIXLY_DISPLAY_MATRIX_SHOW);
    this.appendValueInput("LEDArray").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MIXLY_DISPLAY_MATRIX_PICARRAY);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOPTIP_Matrix_HK16T33_DISPLAYCHAR);
      }
};
//执行器_点阵屏显示_图案数组
Blockly.Blocks.display_Matrix_LedArray = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("").appendField(Blockly.MIXLY_DISPLAY_MATRIX_ARRAYVAR).appendField(new Blockly.FieldTextInput("LedArray1"), "VAR");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a81").appendField(new Blockly.FieldCheckbox("FALSE"), "a82").appendField(new Blockly.FieldCheckbox("FALSE"), "a83").appendField(new Blockly.FieldCheckbox("FALSE"), "a84").appendField(new Blockly.FieldCheckbox("FALSE"), "a85").appendField(new Blockly.FieldCheckbox("FALSE"), "a86").appendField(new Blockly.FieldCheckbox("FALSE"), "a87").appendField(new Blockly.FieldCheckbox("FALSE"), "a88");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a71").appendField(new Blockly.FieldCheckbox("FALSE"), "a72").appendField(new Blockly.FieldCheckbox("FALSE"), "a73").appendField(new Blockly.FieldCheckbox("FALSE"), "a74").appendField(new Blockly.FieldCheckbox("FALSE"), "a75").appendField(new Blockly.FieldCheckbox("FALSE"), "a76").appendField(new Blockly.FieldCheckbox("FALSE"), "a77").appendField(new Blockly.FieldCheckbox("FALSE"), "a78");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a61").appendField(new Blockly.FieldCheckbox("FALSE"), "a62").appendField(new Blockly.FieldCheckbox("FALSE"), "a63").appendField(new Blockly.FieldCheckbox("FALSE"), "a64").appendField(new Blockly.FieldCheckbox("FALSE"), "a65").appendField(new Blockly.FieldCheckbox("FALSE"), "a66").appendField(new Blockly.FieldCheckbox("FALSE"), "a67").appendField(new Blockly.FieldCheckbox("FALSE"), "a68");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a51").appendField(new Blockly.FieldCheckbox("FALSE"), "a52").appendField(new Blockly.FieldCheckbox("FALSE"), "a53").appendField(new Blockly.FieldCheckbox("FALSE"), "a54").appendField(new Blockly.FieldCheckbox("FALSE"), "a55").appendField(new Blockly.FieldCheckbox("FALSE"), "a56").appendField(new Blockly.FieldCheckbox("FALSE"), "a57").appendField(new Blockly.FieldCheckbox("FALSE"), "a58");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a41").appendField(new Blockly.FieldCheckbox("FALSE"), "a42").appendField(new Blockly.FieldCheckbox("FALSE"), "a43").appendField(new Blockly.FieldCheckbox("FALSE"), "a44").appendField(new Blockly.FieldCheckbox("FALSE"), "a45").appendField(new Blockly.FieldCheckbox("FALSE"), "a46").appendField(new Blockly.FieldCheckbox("FALSE"), "a47").appendField(new Blockly.FieldCheckbox("FALSE"), "a48");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a31").appendField(new Blockly.FieldCheckbox("FALSE"), "a32").appendField(new Blockly.FieldCheckbox("FALSE"), "a33").appendField(new Blockly.FieldCheckbox("FALSE"), "a34").appendField(new Blockly.FieldCheckbox("FALSE"), "a35").appendField(new Blockly.FieldCheckbox("FALSE"), "a36").appendField(new Blockly.FieldCheckbox("FALSE"), "a37").appendField(new Blockly.FieldCheckbox("FALSE"), "a38");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a21").appendField(new Blockly.FieldCheckbox("FALSE"), "a22").appendField(new Blockly.FieldCheckbox("FALSE"), "a23").appendField(new Blockly.FieldCheckbox("FALSE"), "a24").appendField(new Blockly.FieldCheckbox("FALSE"), "a25").appendField(new Blockly.FieldCheckbox("FALSE"), "a26").appendField(new Blockly.FieldCheckbox("FALSE"), "a27").appendField(new Blockly.FieldCheckbox("FALSE"), "a28");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a11").appendField(new Blockly.FieldCheckbox("FALSE"), "a12").appendField(new Blockly.FieldCheckbox("FALSE"), "a13").appendField(new Blockly.FieldCheckbox("FALSE"), "a14").appendField(new Blockly.FieldCheckbox("FALSE"), "a15").appendField(new Blockly.FieldCheckbox("FALSE"), "a16").appendField(new Blockly.FieldCheckbox("FALSE"), "a17").appendField(new Blockly.FieldCheckbox("FALSE"), "a18");
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOPTIP_Matrix_HK16T33_LEDARRAY);
  }
};
//执行器_点阵屏显示_清除屏幕
Blockly.Blocks.display_Matrix_CLEAR = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("").appendField(new Blockly.FieldTextInput('myMatrix'), 'matrixName').appendField(Blockly.MIXLY_DISPLAY_MATRIX_SHOW);
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MIXLY_DISPLAY_MATRIX_CLEAR);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_TOOPTIP_Matrix_HK16T33_CLEAR);
  }
};

//显示-MAX7219-初始化
Blockly.Blocks.MAX7219_init = {
  init: function() {
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MIXLY_MAX7219_INIT).appendField("DIN").appendField(Blockly.MIXLY_PIN);
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("CS").appendField(Blockly.MIXLY_PIN);
    this.appendValueInput("PIN3").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("CLK").appendField(Blockly.MIXLY_PIN);
    this.appendValueInput("Intensity").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MIXLY_BRIGHTNESS);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.display.HUE);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOPTIP_Matrix_MAX7219_INIT);
    this.setHelpUrl('');
  }
};

//显示-MAX7219-滚动字符串
Blockly.Blocks.MAX7219_putString = {
  init: function() {
    this.appendValueInput("String", String).setCheck([String, Number]).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MIXLY_MAX7219_PUTSTR);
    this.appendValueInput("Speed").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MIXLY_SPEED);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.display.HUE);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOPTIP_Matrix_MAX7219_STRING);
    this.setHelpUrl('');
  }
};

//显示-MAX7219-LED点阵显示图案
Blockly.Blocks.MAX7219_DisplayChar = {
  init: function() {
    this.appendDummyInput().appendField(Blockly.MIXLY_MAX7219_DISPLAYCHAR);
    this.appendValueInput("Chars").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.display.HUE);
    this.setTooltip(Blockly.MIXLY_TOOPTIP_Matrix_HK16T33_LEDARRAY);
    this.setHelpUrl('');
  }
};

//显示-max7219点阵选择数组
Blockly.Blocks.LedArray = {
  init: function() {
    this.appendDummyInput("").appendField(Blockly.MIXLY_MAX7219_LEDARRAY).appendField(new Blockly.FieldTextInput("LedArray"), "VAR");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a11").appendField(new Blockly.FieldCheckbox("FALSE"), "a12").appendField(new Blockly.FieldCheckbox("FALSE"), "a13").appendField(new Blockly.FieldCheckbox("FALSE"), "a14").appendField(new Blockly.FieldCheckbox("FALSE"), "a15").appendField(new Blockly.FieldCheckbox("FALSE"), "a16").appendField(new Blockly.FieldCheckbox("FALSE"), "a17").appendField(new Blockly.FieldCheckbox("FALSE"), "a18");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a21").appendField(new Blockly.FieldCheckbox("FALSE"), "a22").appendField(new Blockly.FieldCheckbox("FALSE"), "a23").appendField(new Blockly.FieldCheckbox("FALSE"), "a24").appendField(new Blockly.FieldCheckbox("FALSE"), "a25").appendField(new Blockly.FieldCheckbox("FALSE"), "a26").appendField(new Blockly.FieldCheckbox("FALSE"), "a27").appendField(new Blockly.FieldCheckbox("FALSE"), "a28");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a31").appendField(new Blockly.FieldCheckbox("FALSE"), "a32").appendField(new Blockly.FieldCheckbox("FALSE"), "a33").appendField(new Blockly.FieldCheckbox("FALSE"), "a34").appendField(new Blockly.FieldCheckbox("FALSE"), "a35").appendField(new Blockly.FieldCheckbox("FALSE"), "a36").appendField(new Blockly.FieldCheckbox("FALSE"), "a37").appendField(new Blockly.FieldCheckbox("FALSE"), "a38");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a41").appendField(new Blockly.FieldCheckbox("FALSE"), "a42").appendField(new Blockly.FieldCheckbox("FALSE"), "a43").appendField(new Blockly.FieldCheckbox("FALSE"), "a44").appendField(new Blockly.FieldCheckbox("FALSE"), "a45").appendField(new Blockly.FieldCheckbox("FALSE"), "a46").appendField(new Blockly.FieldCheckbox("FALSE"), "a47").appendField(new Blockly.FieldCheckbox("FALSE"), "a48");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a51").appendField(new Blockly.FieldCheckbox("FALSE"), "a52").appendField(new Blockly.FieldCheckbox("FALSE"), "a53").appendField(new Blockly.FieldCheckbox("FALSE"), "a54").appendField(new Blockly.FieldCheckbox("FALSE"), "a55").appendField(new Blockly.FieldCheckbox("FALSE"), "a56").appendField(new Blockly.FieldCheckbox("FALSE"), "a57").appendField(new Blockly.FieldCheckbox("FALSE"), "a58");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a61").appendField(new Blockly.FieldCheckbox("FALSE"), "a62").appendField(new Blockly.FieldCheckbox("FALSE"), "a63").appendField(new Blockly.FieldCheckbox("FALSE"), "a64").appendField(new Blockly.FieldCheckbox("FALSE"), "a65").appendField(new Blockly.FieldCheckbox("FALSE"), "a66").appendField(new Blockly.FieldCheckbox("FALSE"), "a67").appendField(new Blockly.FieldCheckbox("FALSE"), "a68");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a71").appendField(new Blockly.FieldCheckbox("FALSE"), "a72").appendField(new Blockly.FieldCheckbox("FALSE"), "a73").appendField(new Blockly.FieldCheckbox("FALSE"), "a74").appendField(new Blockly.FieldCheckbox("FALSE"), "a75").appendField(new Blockly.FieldCheckbox("FALSE"), "a76").appendField(new Blockly.FieldCheckbox("FALSE"), "a77").appendField(new Blockly.FieldCheckbox("FALSE"), "a78");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a81").appendField(new Blockly.FieldCheckbox("FALSE"), "a82").appendField(new Blockly.FieldCheckbox("FALSE"), "a83").appendField(new Blockly.FieldCheckbox("FALSE"), "a84").appendField(new Blockly.FieldCheckbox("FALSE"), "a85").appendField(new Blockly.FieldCheckbox("FALSE"), "a86").appendField(new Blockly.FieldCheckbox("FALSE"), "a87").appendField(new Blockly.FieldCheckbox("FALSE"), "a88");
    this.setOutput(true, Number);
    this.setColour(Blockly.Blocks.display.HUE);
    this.setTooltip(Blockly.MIXLY_DISPLAY_MATRIX_SHOWPOINT_TOOLTIP);
    this.setHelpUrl('');
  }
};

//显示-MAX7219-LED点阵图案
Blockly.Blocks.Matrix_img = {
  init: function() {
    this.appendDummyInput("").appendField(Blockly.MIXLY_MAX7219_IMG).appendField(new Blockly.FieldDropdown([
      ["↑", "183c7edb18181818"],
      ["↓", "18181818db7e3c18"],
      ["←", "103060ffff603010"],
      ["→", "080c06ffff060c08"],
      ["♥", "42e7ffffff7e3c18"],
      ["▲", "183c7eff00000000"],
      ["▼", "00000000ff7e3c18"],
      ["◄", "103070f0f0703010"],
      ["►", "080c0e0f0f0e0c08"],
      ["△", "182442ff00000000"],
      ["▽", "00000000ff422418"],
      ["☺", "3c42a581a599423c"],
      ["○", "3c4281818181423c"],
      ["◑", "3c4e8f8f8f8f4e3c"],
      ["◐", "3c72f1f1f1f1723c"],
      ["￥", "4224ff08ff080808"],
      ["Χ", "8142241818244281"],
      ["✓", "0000010204885020"],
      ["□", "007e424242427e00"],
      ["▣", "007e425a5a427e00"],
      ["◇", "1824428181422418"],
      ["♀", "3844444438107c10"],
      ["♂", "0f030579d888d870"],
      ["♪", "0c0e0b080878f860"],
      ["✈", "203098ffff983020"],
      //["卍", "00f21212fe90909e"],
      //["卐", "009e9090fe1212f2"],
      ["︱", "1010101010101010"],
      ["—", "000000ff00000000"],
      ["╱", "0102040810204080"],
      ["＼", "8040201008040201"],
      ["大", "1010fe1010284482"],
      ["中", "1010fe9292fe1010"],
      ["小", "1010105454921070"],
      ["米", "00925438fe385492"],
      ["正", "00fe10105e5050fc"],
      ["囧", "ffa5a5c3bda5a5ff"]
    ]), "img_");
    this.setOutput(true);
    this.setTooltip('');
    this.setColour(Blockly.Blocks.display.HUE);
    this.setTooltip(Blockly.MIXLY_TOOPTIP_Matrix_MAX7219_PREDEFARR);
    this.setHelpUrl('');
  }
};