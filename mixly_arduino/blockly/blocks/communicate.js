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
    }
};
Blockly.Blocks.i2c_master_reader2 = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_I2C_MASTER_READ2);
        this.setOutput(true, Number);
    }
};
Blockly.Blocks.i2c_available = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_I2C_AVAILABLE);
        this.setOutput(true, Boolean);
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
    }
}
