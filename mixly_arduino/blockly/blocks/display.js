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
        this.setTooltip('');
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
        this.setTooltip('');
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
        this.setTooltip('');
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
        this.setTooltip('');
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


Blockly.Blocks.display_TM1637_displayString = {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendValueInput("VALUE").setCheck(String).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MIXLY_4DIGITDISPLAY_TM1637_DISPLAYSTRING);
        this.appendValueInput("Speed").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MIXLY_4DIGITDISPLAY_SPEED);
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
        this.appendValueInput("second").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput("").appendField(Blockly.MIXLY_SECOND);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_4DIGITDISPLAY_TM1637_DISPLAYTIME_TOOLTIP);
    }
};

Blockly.Blocks.display_TM1637_Stopwatch = {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendDummyInput("").appendField(Blockly.MIXLY_4DIGITDISPLAY_STOPWATCH).appendField(new Blockly.FieldDropdown([
          [Blockly.MIXLY_4DIGITDISPLAY_STOPWATCH_START, "stopwatchStart"],
          [Blockly.MIXLY_4DIGITDISPLAY_STOPWATCH_PAUSE, "stopwatchPause"],
          [Blockly.MIXLY_4DIGITDISPLAY_STOPWATCH_RESET, "stopwatchReset"], ]), "STAT");
        this.setTooltip(Blockly.MIXLY_4DIGITDISPLAY_TM1637_STOPWATCH_TOOLTIP);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks.display_TM1637_Brightness = {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendDummyInput("").appendField(Blockly.MIXLY_4DIGITDISPLAY_TM1637_BRIGHTNESS).appendField(new Blockly.FieldDropdown([
          ["7", "7"],
          ["6", "6"],
          ["5", "5"],
          ["4", "4"],
          ["3", "3"],
          ["2", "2"],
          ["1", "1"]
        ]), "BRIGHTNESS");
        this.setTooltip(Blockly.MIXLY_4DIGITDISPLAY_4DIGITDISPLAY_BRIGHTNESS_TOOLTIP);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};