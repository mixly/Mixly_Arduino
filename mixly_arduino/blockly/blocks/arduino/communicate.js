'use strict';

goog.provide('Blockly.Blocks.communicate');

goog.require('Blockly.Blocks');


Blockly.Blocks.communicate.HUE = 140;

//红外接收模块
Blockly.Blocks.ir_recv = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput("PIN", Number)
            .appendField(new Blockly.FieldTextInput('ir_item'), 'VAR')
            .appendField(Blockly.MIXLY_IR_RECEIVE)
            .setCheck(Number);
        this.appendStatementInput('DO')
            .appendField(Blockly.MIXLY_IR_RECEIVE_YES);
        this.appendStatementInput('DO2')
            .appendField(Blockly.MIXLY_IR_RECEIVE_NO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_IR_RECIEVE_TOOLTIP);
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};
//红外发射模块（NEC）
Blockly.Blocks.ir_send_nec = {
    init: function () {
        var TYPE = [['NEC', 'NEC'], ['Whynter', 'Whynter'], ['Sony', 'Sony'], ['RC5', 'RC5'], ['RC6', 'RC6'], ['DISH', 'DISH'], ['SharpRaw', 'SharpRaw'], ['SAMSUNG', 'SAMSUNG']];
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput("")
			.appendField(Blockly.MIXLY_IR_SEND_NEC1)
			.appendField(new Blockly.FieldDropdown(TYPE), 'TYPE')
			.appendField(Blockly.MIXLY_IR_SEND_NEC2)
			.appendField(new Blockly.FieldDropdown([["3", "3"]]), "PIN");
        this.appendValueInput('data')
			.setCheck(Number)
			.appendField(' ' + Blockly.MIXLY_DATA);
        this.appendValueInput('bits')
			.setCheck(Number)
			.appendField(' ' + Blockly.MIXLY_BITS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_IR_SEND_NEC_TOOLTIP);
    }
}

//红外接收使能
Blockly.Blocks.ir_recv_enable = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_IR_RECEIVE_ENABLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_IR_ENABLE);
    }
};

//红外接收模块(raw)
Blockly.Blocks.ir_recv_raw = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_IR_RECEIVE_RAW)
            .setCheck(Number);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_IR_RECIEVE_RAW_TOOLTIP);
    }
};

//红外发射模块(raw)
Blockly.Blocks.ir_send_raw = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_IR_SEND_RAW)
            .appendField(new Blockly.FieldDropdown([["3", "3"]]), "PIN");
        this.appendDummyInput("")
            .appendField(' ' + Blockly.MIXLY_LIST_NAME)
            .appendField(new Blockly.FieldTextInput('0,0,0'), 'TEXT');
        this.appendValueInput('length')
            .setCheck(Number)
            .appendField(' ' + Blockly.MIXLY_LIST_LENGTH);
        this.appendValueInput('freq')
            .setCheck(Number)
            .appendField(' ' + Blockly.MIXLY_FREQUENCY);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_IR_SEND_RAW_TOOLTIP);
    }
};

//I2C通信
Blockly.Blocks.i2c_master_writer = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('device')
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_I2C_MASTER_WRITE);
        this.appendValueInput('value')
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_I2C_VALUE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_I2C_MASTER_WRITE);
    }
};
Blockly.Blocks.i2c_master_reader = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('device')
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_I2C_MASTER_READ);
        this.appendValueInput('bytes')
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_I2C_BYTES);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_I2C_MASTER_READ);
    }
};
Blockly.Blocks.i2c_master_reader2 = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_I2C_MASTER_READ2);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_I2C_MASTER_READ2);
    }
};
Blockly.Blocks.i2c_available = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_I2C_AVAILABLE);
        this.setOutput(true, Boolean);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_I2C_AVAILABLE);
    }
};

Blockly.Blocks.i2c_slave_onreceive = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_I2C_SLAVE_ONRECEIVE)
            .setCheck(Number);
        this.appendStatementInput('DO')
            .appendField(Blockly.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_I2C_SLAVE_ONRECEIVE);
    }
};

//SPI
Blockly.Blocks.spi_transfer = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('pin')
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.TO_SPI_SLAVE_PIN);
        this.appendValueInput('value')
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.SPI_TRANSFER);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_SPI_TRANSFER.replace('%1',Blockly.Arduino.valueToCode(this, 'pin',Blockly.Arduino.ORDER_ATOMIC)));
    }
}

//RFID
Blockly.Blocks.RFID_init={
	init: function() {
    this.setColour(Blockly.Blocks.communicate.HUE);
	this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_COMMUNICATION_RFID_INITIAL)
		.appendField("SDA")
		.appendField(new Blockly.FieldDropdown([["10", "10"]]), "PORT1")
	    .appendField("SCK")
		.appendField(new Blockly.FieldDropdown([["13", "13"]]), "PORT2")
		.appendField("MOSI")
		.appendField(new Blockly.FieldDropdown([["11", "11"]]), "PORT3")
		.appendField("MISO")
	    .appendField(new Blockly.FieldDropdown([["12", "12"]]), "PORT4");
	this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_RFID_INIT);
	//this.setOutput(true, Number);
	//var thisBlock = this;
   
  }
};

Blockly.Blocks.RFID_on = {
  init: function () {
    this.appendDummyInput("")
      .appendField("RFID")
      .appendField(Blockly.MIXLY_COMMUNICATION_RFID_ON_DETECTED);
    this.appendStatementInput("do_");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.communicate.HUE);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_RFID_ON);
  }
};


//读卡号
Blockly.Blocks.RFID_readcardnum={
	init: function() {
    this.setColour(Blockly.Blocks.communicate.HUE);
	this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_COMMUNICATION_RFID_READ_CARDNUM)
	this.setOutput(true, String);
	var thisBlock = this;
    this.setTooltip(Blockly.MIXLY_TOOLTIP_RFID_READ);
   
  }
};

//串口打印卡号
/* Blockly.Blocks.RFID_serialprintcardnum = {
   init: function() {
    this.setColour(Blockly.Blocks.communicate.HUE);
    this.appendDummyInput("")
		.appendField(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
        .appendField('打印RFID卡号');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
}; */


Blockly.Blocks.RFID_in = {
  init: function () {
    this.appendValueInput("uid_")
      .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF)
      .appendField(Blockly.MIXLY_COMMUNICATION_RFID_READ_CARDNUM_IS);
    this.appendStatementInput("do_")
      .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setColour(Blockly.Blocks.communicate.HUE);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_RFID_IN);
  }
};

//写数据块
Blockly.Blocks.RFID_writecarddata={
	init: function() {
    this.setColour(Blockly.Blocks.communicate.HUE);
	this.appendValueInput("address1")
      .appendField(Blockly.MIXLY_COMMUNICATION_RFID_WRITE)
      .appendField(Blockly.MIXLY_COMMUNICATION_DATA_BLOCK)
	this.appendDummyInput("")
      .appendField(Blockly.MIXLY_COMMUNICATION_WRITE_NUM)
	  .appendField(new Blockly.FieldTextInput('mylist'), 'data1')
	this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setTooltip(Blockly.MIXLY_TOOLTIP_RFID_WRITEBLOCK);
  }
};


//读数据块的内容
Blockly.Blocks.RFID_readcarddata={
	init: function() {
    this.setColour(Blockly.Blocks.communicate.HUE);
	this.appendValueInput("address")
	    .appendField(Blockly.MIXLY_COMMUNICATION_RFID_READ)
		.appendField(Blockly.MIXLY_COMMUNICATION_DATA_BLOCK)
	this.appendDummyInput("")
		.appendField(Blockly.MIXLY_COMMUNICATION_DATA_FROM)
	this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_RFID_READBLOCK);
   
  }
};

/* //串口打印数据内容
Blockly.Blocks.RFID_serialprintcarddata = {
   init: function() {
    this.setColour(Blockly.Blocks.communicate.HUE);
    this.appendValueInput("address")
		.appendField(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
        .appendField("打印RFID数据块");
	this.appendDummyInput("")
	    .appendField("内容")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
}; */

//关闭RFID
Blockly.Blocks.RFID_off={
	init: function() {
    this.setColour(Blockly.Blocks.communicate.HUE);
	this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_COMMUNICATION_RFID_OFF)
	//this.setOutput(true, Number);
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_RFID_OFF);  
  }
};