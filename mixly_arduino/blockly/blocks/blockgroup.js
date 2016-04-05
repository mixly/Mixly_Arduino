'use strict';

goog.provide('Blockly.Blocks.blockgroup');

goog.require('Blockly.Blocks');

Blockly.Blocks.blockgroup.HUE = 65;
Blockly.Blocks.blockgroup.HUE1 = 40;
Blockly.Blocks.blockgroup.HUE2 = 100;

Blockly.Blocks['serial_begin'] = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE);
    this.appendValueInput("CONTENT", Number)
		.appendTitle(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
		.appendTitle(Blockly.LKL_SERIAL_BEGIN)
		.setCheck(Number);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['serial_print'] = {
  init: function() {
   this.setColour(Blockly.Blocks.blockgroup.HUE);
    this.appendValueInput("CONTENT", String)
		.appendTitle(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
        .appendTitle(Blockly.LKL_SERIAL_PRINT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
  }
};

Blockly.Blocks['serial_println'] = {
   init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE);
    this.appendValueInput("CONTENT", String)
		.appendTitle(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
        .appendTitle(Blockly.LKL_SERIAL_PRINTLN);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
  }
};
//打印16进制数
Blockly.Blocks['serial_print_hex'] = {
   init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE);
    this.appendValueInput("CONTENT", Number)
		.appendTitle(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
        .appendTitle(Blockly.LKL_SERIAL_PRINT_HEX)
        .setCheck(Number);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setTooltip(Blockly.Msg.TEXT_PRINT_HEX_TOOLTIP);
  }
};

Blockly.Blocks['serial_available'] = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE);
	this.appendDummyInput()
		.appendTitle(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
        .appendTitle(Blockly.LKL_SERIAL_AVAILABLE);
	this.setOutput(true, Boolean);
	this.setTooltip(Blockly.LKL_TOOLTIP_BLOCKGROUP_SERIAL_AVAILABLE);
  }
};

Blockly.Blocks['serial_readstr'] = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE);
	this.appendDummyInput()
		.appendTitle(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
        .appendTitle(Blockly.LKL_SERIAL_READSTR);
	this.setOutput(true, String);
	this.setTooltip(Blockly.LKL_TOOLTIP_BLOCKGROUP_SERIAL_READ_STR);
  }
};

Blockly.Blocks['serial_parseInt_Float'] = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE);
	this.appendDummyInput()
		.appendTitle(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
        //.appendTitle(Blockly.LKL_SERIAL_READ)
		.appendTitle(new Blockly.FieldDropdown([["read", "read"],["parseInt", "parseInt"], ["parseFloat", "parseFloat"]]), "STAT");
	this.setOutput(true, Number);
	var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getFieldValue('STAT');
      var TOOLTIPS = {
        'parseInt': Blockly.LKL_TOOLTIP_BLOCKGROUP_SERIAL_READ_INT,
        'parseFloat': Blockly.LKL_TOOLTIP_BLOCKGROUP_SERIAL_READ_FLOAT
      };
      return TOOLTIPS[op];
    });
  }
};

//红外接收模块
Blockly.Blocks.ir_recv = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE);
	this.appendValueInput("PIN", Number)
		.appendTitle(new Blockly.FieldTextInput('ir_item'), 'VAR')
        .appendTitle(Blockly.LKL_IR_RECEIVE)
        .setCheck(Number);
	this.appendStatementInput('DO')
        .appendTitle(Blockly.LKL_IR_RECEIVE_YES);
	this.appendStatementInput('DO2')
        .appendTitle(Blockly.LKL_IR_RECEIVE_NO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setTooltip(Blockly.LKL_IR_RECIEVE_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};
//红外发射模块（NEC）
Blockly.Blocks.ir_send_nec={
	init:function(){
		var TYPE = [['NEC', 'NEC'],['Whynter', 'Whynter'],['Sony', 'Sony'],['RC5', 'RC5'],['RC6', 'RC6'],['DISH', 'DISH'],['SharpRaw', 'SharpRaw'],['SAMSUNG', 'SAMSUNG']];
		this.setColour(Blockly.Blocks.blockgroup.HUE);
		this.appendDummyInput("")
			.appendTitle(Blockly.LKL_IR_SEND_NEC1)
			.appendField(new Blockly.FieldDropdown(TYPE), 'TYPE')
			.appendTitle(Blockly.LKL_IR_SEND_NEC2)
			.appendTitle(new Blockly.FieldDropdown([["3", "3"]]), "PIN");
		this.appendValueInput('data')
			.setCheck(Number)
			.appendTitle(' '+Blockly.LKL_DATA);
		this.appendValueInput('bits')
			.setCheck(Number)
			.appendTitle(' '+Blockly.LKL_BITS);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setInputsInline(true);
		this.setTooltip(Blockly.LKL_IR_SEND_NEC_TOOLTIP);
	}
}

//红外接收模块(raw)
Blockly.Blocks.ir_recv_raw = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE);
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_IR_RECEIVE_RAW)
        .setCheck(Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setTooltip(Blockly.LKL_IR_RECIEVE_RAW_TOOLTIP);
  }
};

//红外发射模块(raw)
Blockly.Blocks.ir_send_raw = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE);
	this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_IR_SEND_RAW)
	    .appendTitle(new Blockly.FieldDropdown([["3", "3"]]), "PIN");
    this.appendDummyInput("")
        .appendTitle(' '+Blockly.LKL_LIST_NAME)
        .appendTitle(new Blockly.FieldTextInput('0,0,0'), 'TEXT');
	this.appendValueInput('length')
        .setCheck(Number)
        .appendTitle(' '+Blockly.LKL_LIST_LENGTH);
	this.appendValueInput('freq')
        .setCheck(Number)
        .appendTitle(' '+Blockly.LKL_FREQUENCY);
	this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setTooltip(Blockly.LKL_IR_SEND_RAW_TOOLTIP);
  }
};

//I2C通信
Blockly.Blocks.i2c_master_writer = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE);
	this.appendValueInput('device')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_I2C_MASTER_WRITE);
	this.appendValueInput('value')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendTitle(Blockly.LKL_I2C_VALUE);
	this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.i2c_master_reader = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE);
	this.appendValueInput('device')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_I2C_MASTER_READ);
	this.appendValueInput('bytes')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendTitle(Blockly.LKL_I2C_BYTES);
	this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.i2c_master_reader2 = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE);
	this.appendDummyInput()
        .appendTitle(Blockly.LKL_I2C_MASTER_READ2);
	this.setOutput(true, Number);
  }
};
Blockly.Blocks.i2c_available = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE);
	this.appendDummyInput()
        .appendTitle(Blockly.LKL_I2C_AVAILABLE);
	this.setOutput(true, Boolean);
  }
};

//SPI
Blockly.Blocks.spi_transfer={
	init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE);
	this.appendValueInput('pin')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.TO_SPI_SLAVE_PIN);
	this.appendValueInput('value')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendTitle(Blockly.SPI_TRANSFER);
	this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(true);
  }
}

//超声波测距
Blockly.Blocks.chaoshengbo={
	init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE1);
	this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_CHAOSHENGBO)
	    .appendTitle('Trig#')
	    .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN1")
		.appendTitle(' Echo#')
	    .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN2");
	this.setOutput(true, Number);
	this.setTooltip(Blockly.LKL_TOOLTIP_BLOCKGROUP_CHAOSHENGBO);
  }
};

Blockly.Blocks.chaoshengbo2={
	init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE1);
	this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_CHAOSHENGBO);
	this.appendValueInput("PIN1", Number)
        .appendTitle('Trig#')
        .setCheck(Number);
	this.appendValueInput("PIN2", Number)
        .appendTitle('Echo#')
        .setCheck(Number);
	this.setInputsInline(true);
	this.setOutput(true, Number);
	this.setTooltip(Blockly.LKL_TOOLTIP_BLOCKGROUP_CHAOSHENGBO);
  }
};

//DHT11传感器
Blockly.Blocks.dht11={
	init: function() {
	var WHAT = [[Blockly.LKL_DHT11_T, 'temperature'],[Blockly.LKL_DHT11_H, 'humidity']];
    this.setColour(Blockly.Blocks.blockgroup.HUE1);
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_DHT11)
        .setCheck(Number);
	this.appendDummyInput("")
	    .appendTitle(new Blockly.FieldDropdown(WHAT), "WHAT");
	this.setOutput(true, Number);
	var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getFieldValue('WHAT');
      var TOOLTIPS = {
        'temperature': Blockly.LKL_TOOLTIP_BLOCKGROUP_DHT11_TEM,
        'humidity': Blockly.LKL_TOOLTIP_BLOCKGROUP_DHT11_HUM
      };
      return TOOLTIPS[op];
    });
  }
};

//DS18B20温度传感器
Blockly.Blocks.ds18b20={
	init: function() {
	var UNIT = [[Blockly.MIXLY_DS18B20_C, '0'],[Blockly.MIXLY_DS18B20_F, '1']];
    this.setColour(Blockly.Blocks.blockgroup.HUE1);
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.MIXLY_DS18B20)
        .setCheck(Number);
	this.appendDummyInput("")
		.appendTitle(Blockly.MIXLY_DS18B20_GET_TEMP)
	    .appendTitle(new Blockly.FieldDropdown(UNIT), "UNIT");
	this.setOutput(true, Number);
  }
};

Blockly.Blocks.servo_move = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE2);
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_SERVO)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
    this.appendValueInput("DEGREE", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_DEGREE_0_180);
    this.appendValueInput("DELAY_TIME", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_DELAY+'('+Blockly.LKL_DELAY_MS+')');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.LKL_TOOLTIP_BLOCKGROUP_SERVO_MOVE);
  }
};

Blockly.Blocks.servo_writeMicroseconds = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE2);
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_SERVO)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
    this.appendValueInput("DEGREE", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle('writeMicroseconds');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.servo_read_degrees = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE2);
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_SERVO)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
    this.appendDummyInput("")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_READ_DEGREES)
    this.setOutput(true, Number);
	this.setInputsInline(true);
    this.setTooltip(Blockly.LKL_TOOLTIP_BLOCKGROUP_SERVO_READ);
  }
};

Blockly.Blocks.controls_tone={
init:function(){
    this.setColour(Blockly.Blocks.blockgroup.HUE2);
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_TONE_PIN)
        .setCheck(Number);
    this.appendValueInput('FREQUENCY')
        .setCheck(Number)
        //.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_FREQUENCY);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setTooltip(Blockly.LKL_TOOLTIP_BLOCKGROUP_TONE);
  }
};

Blockly.Blocks.controls_tone2={
init:function(){
    this.setColour(Blockly.Blocks.blockgroup.HUE2);
    this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_TONE_PIN)
        .setCheck(Number);
    this.appendValueInput('FREQUENCY')
        .setCheck(Number)
        //.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_FREQUENCY);
    this.appendValueInput('DURATION')
        .setCheck(Number)
        //.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_DURATION);
	this.appendDummyInput("")
		.appendTitle(Blockly.LKL_DELAY_MS);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setTooltip(Blockly.LKL_TOOLTIP_BLOCKGROUP_TONE2);
  }
};

Blockly.Blocks.controls_notone={
init:function(){
    this.setColour(Blockly.Blocks.blockgroup.HUE2);
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_NOTONE_PIN)
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setTooltip(Blockly.LKL_TOOLTIP_BLOCKGROUP_NOTONE);
  }
};

Blockly.Blocks.group_lcd_print = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE2);
	this.appendValueInput('device')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_LCD_ADDRESS);
    this.appendValueInput("TEXT", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.LKL_LCD_PRINT1);
    this.appendValueInput("TEXT2", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.LKL_LCD_PRINT2)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.group_lcd_print2 = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE2);
    this.appendValueInput('device')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_LCD_ADDRESS);
	this.appendValueInput("row", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.LKL_LCD_ROW);
	this.appendValueInput("column", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.LKL_LCD_COLUMN);
    this.appendValueInput("TEXT", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.LKL_LCD_PRINT);
    this.setPreviousStatement(true, null);
	this.setInputsInline(true);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.group_lcd_power = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE2);
	this.appendValueInput('device')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_LCD_ADDRESS);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([[Blockly.LKL_LCD_STAT_ON, "display"], [Blockly.LKL_LCD_STAT_OFF, "noDisplay"], [Blockly.LKL_LCD_STAT_CURSOR, "cursor"], [Blockly.LKL_LCD_STAT_NOCURSOR, "noCursor"], [Blockly.LKL_LCD_STAT_BLINK, "blink"], [Blockly.LKL_LCD_STAT_NOBLINK, "noBlink"], [Blockly.LKL_LCD_STAT_CLEAR, "clear"]]), "STAT");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.group_stepper_setup={
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE2);
    this.appendDummyInput()
		.appendTitle(Blockly.LKL_STEPPER_SETUP_STEPPER)
        .appendTitle(new Blockly.FieldTextInput('mystepper'), 'VAR');
	this.appendValueInput("PIN1", Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_STEPPER_PIN1)
        .setCheck(Number);
	this.appendValueInput("PIN2", Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_STEPPER_PIN2)
        .setCheck(Number);
    this.appendValueInput('steps')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_STEPSPERREVOLUTION);
	this.appendValueInput('speed')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_STEPPER_SET_SPEED);
  }
}

Blockly.Blocks.group_stepper_setup2={
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE2);
    this.appendDummyInput()
		.appendTitle(Blockly.LKL_STEPPER_SETUP_STEPPER)
        .appendTitle(new Blockly.FieldTextInput('mystepper'), 'VAR');
	this.appendValueInput("PIN1", Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_STEPPER_PIN1)
        .setCheck(Number);
	this.appendValueInput("PIN2", Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_STEPPER_PIN2)
        .setCheck(Number);
	this.appendValueInput("PIN3", Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_STEPPER_PIN3)
        .setCheck(Number);
	this.appendValueInput("PIN4", Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_STEPPER_PIN4)
        .setCheck(Number);
    this.appendValueInput('steps')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_STEPSPERREVOLUTION);
	this.appendValueInput('speed')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_STEPPER_SET_SPEED);
  }
}

Blockly.Blocks.group_stepper_move={
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE2);
    this.appendDummyInput()
		.appendTitle(Blockly.LKL_STEPPER)
        .appendTitle(new Blockly.FieldTextInput('mystepper'), 'VAR');
    this.appendValueInput('step')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_STEPPER_STEP);
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
}