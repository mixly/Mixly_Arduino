import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

const COMMUNICATE_HUE = 140;

//红外接收模块
export const ir_recv = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(new Blockly.FieldTextInput('ir_item'), 'VAR')
            .appendField(Blockly.Msg.MIXLY_IR_RECEIVE)
            .setCheck(Number);
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_IR_RECEIVE_YES);
        this.appendStatementInput('DO2')
            .appendField(Blockly.Msg.MIXLY_IR_RECEIVE_NO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_IR_RECIEVE_TOOLTIP);
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
export const ir_send_nec = {
    init: function () {
        var TYPE = [
            ['RC5', 'RC5'],
            ['RC6', 'RC6'],
            ['NEC', 'NEC'],
            ['Sony', 'Sony'],
            ['Panasonic', 'Panasonic'],
            ['JVC', 'JVC'],
            ['SAMSUNG', 'SAMSUNG'],
            ['Whynter', 'Whynter'],
            ['AiwaRCT501', 'AiwaRCT501'],
            ['LG', 'LG'],
            ['Sanyo', 'Sanyo'],
            ['Mitsubishi', 'Mitsubishi'],
            ['DISH', 'DISH'],
            ['SharpRaw', 'SharpRaw'],
            ['Denon', 'Denon']
        ];
        this.setColour(COMMUNICATE_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_IR_SEND_NEC1)
            .appendField(new Blockly.FieldDropdown(TYPE), 'TYPE')
            .appendField(Blockly.Msg.MIXLY_IR_SEND_NEC2)
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PIN");
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(' ' + Blockly.Msg.MIXLY_DATA);
        this.appendValueInput('bits')
            .setCheck(Number)
            .appendField(' ' + Blockly.Msg.MIXLY_BITS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_IR_SEND_NEC_TOOLTIP);
    }
}

//红外接收使能
export const ir_recv_enable = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_IR_RECEIVE_ENABLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_IR_ENABLE);
    }
};

//红外接收模块(raw)
export const ir_recv_raw = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_IR_RECEIVE_RAW)
            .setCheck(Number);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_IR_RECIEVE_RAW_TOOLTIP);
    }
};

//红外发射模块(raw)
export const ir_send_raw = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_IR_SEND_RAW)
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "PIN");
        this.appendDummyInput("")
            .appendField(' ' + Blockly.Msg.MIXLY_I2C_SLAVE_WRITE_ARRAY_ARRAYNAME)
            .appendField(new Blockly.FieldTextInput('0,0,0'), 'TEXT');
        this.appendValueInput('length')
            .setCheck(Number)
            .appendField(' ' + Blockly.Msg.MIXLY_LIST_LENGTH);
        this.appendValueInput('freq')
            .setCheck(Number)
            .appendField(' ' + Blockly.Msg.MIXLY_FREQUENCY);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_IR_SEND_RAW_TOOLTIP);
    }
};
// IIC通信

// IIC初始化主机
export const i2c_master_Init = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETUP + 'I2C' + Blockly.Msg.MIXLY_MASTER);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COMMUNICATE_HUE);
        this.setTooltip();
        this.setHelpUrl("");
    }
};
// IIC初始化从机
export const i2c_slave_Init = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETUP + 'I2C' + Blockly.Msg.MIXLY_SALVE + Blockly.Msg.MIXLY_LCD_ADDRESS);
        this.appendValueInput("i2c_address")
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COMMUNICATE_HUE);
        this.setTooltip(Blockly.Msg.MIXLY_I2C_MASTER_INITHelp);
        this.setHelpUrl("");
    }
};

//IIC主机发送数据
export const i2c_begin_end_transmission = {
    init: function () {
        this.appendDummyInput()
            .appendField("I2C" + Blockly.Msg.MIXLY_MASTER + Blockly.Msg.MIXLY_SEND_DATA);
        this.appendValueInput("i2c_address")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_LCD_ADDRESS);
        this.appendStatementInput("transmission_data")
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COMMUNICATE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//IIC写入主从机数据
export const i2c_write = {
    init: function () {
        this.appendValueInput("i2c_write_data")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("I2C" + Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_SEND);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COMMUNICATE_HUE);
        this.setTooltip("");
    }
};

// IIC写入数线数据
export const i2c_slave_write_array = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput('array')
            .appendField(Blockly.Msg.MIXLY_I2C_SLAVE_WRITE_ARRAY)
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_I2C_SLAVE_WRITE_ARRAY_ARRAYNAME);
        this.appendValueInput('length')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_LIST_LEN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_I2C_SLAVE_WRITE_ARRAY);
    }
};

// IIC从机读取字节数
export const i2c_howmany = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_I2C_HOWMANY);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_I2C_HOWMANY);
    }
};

// IIC主机或从机读取成功吗？
export const i2c_available = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_I2C_AVAILABLE);
        this.setOutput(true, Boolean);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_I2C_AVAILABLE);
    }
};

// IIC主机或从机读取的数据
export const i2c_read = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_I2C_MASTER_READ2);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_I2C_MASTER_READ2);
    }
};

//写入寄存器地址
export const i2c_master_writerReg = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput('device')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_I2C_MASTER_WRITE);
        this.appendValueInput('regadd')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_I2C_REGADD);
        this.appendValueInput('value')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_I2C_VALUE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

//读取寄存器地址
export const i2c_master_readerReg = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput('device')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_I2C_MASTER_READ);
        this.appendValueInput('regadd')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_I2C_REGADD);
        this.appendValueInput('bytes')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_I2C_BYTES);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};


export const i2c_slave_onrequest = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_I2C_SLAVE_ONREQUEST);
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_I2C_SLAVE_ONREQUEST);
    }
};

export const i2c_master_writer = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput('device')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_I2C_MASTER_WRITE);
        this.appendValueInput('value')
            .setCheck([String, Number])
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.HTML_VALUE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_I2C_MASTER_WRITE);
    }
};

export const i2c_master_reader = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput('device')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_I2C_MASTER_READ);
        this.appendValueInput('bytes')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_I2C_BYTES);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_I2C_MASTER_READ);
    }
};

export const i2c_master_reader2 = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_I2C_MASTER_READ2);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_I2C_MASTER_READ2);
    }
};

export const i2c_slave_onreceive = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_I2C_SLAVE_ONRECEIVE);
        this.appendValueInput("onReceive_length")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_I2C_BYTES);
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_I2C_SLAVE_ONRECEIVE);
    }
};

export const i2c_slave_write = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput('value')
            .appendField(Blockly.Msg.MIXLY_I2C_SLAVE_WRITE)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.HTML_VALUE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_I2C_SLAVE_WRITE);
    }
};

//SPI
export const spi_transfer = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput('pin')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.TO_SPI_SLAVE_PIN);
        this.appendValueInput('value')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.SPI_TRANSFER);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_SPI_TRANSFER.replace('%1', Blockly.Arduino.valueToCode(this, 'pin', Blockly.Arduino.ORDER_ATOMIC)));
    }
}

//RFID
export const RFID_init = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_RFID_INITIAL);
        this.appendDummyInput("")
            .appendField("SDA")
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), "SDA");
        this.appendDummyInput("")
            .appendField("SCK")
            .appendField(new Blockly.FieldDropdown(Profile.default.SCK), "SCK");
        this.appendDummyInput("")
            .appendField("MOSI")
            .appendField(new Blockly.FieldDropdown(Profile.default.MOSI), "MOSI");
        this.appendDummyInput("")
            .appendField("MISO")
            .appendField(new Blockly.FieldDropdown(Profile.default.MISO), "MISO");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_RFID_INIT);
        // this.setFieldValue("10", "SDA");
    }
};

export const RFID_on = {
    init: function () {
        this.appendDummyInput("")
            .appendField("RFID")
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_RFID_ON_DETECTED);
        this.appendStatementInput("do_");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(COMMUNICATE_HUE);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_RFID_ON);
    }
};


//读卡号
export const RFID_readcardnum = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_RFID_READ_CARDNUM)
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_RFID_READ);

    }
};

//串口打印卡号
/* export const RFID_serialprintcardnum = {
   init: function() {
    this.setColour(COMMUNICATE_HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(Profile.default.serial_select), "serial_select")
        .appendField('打印RFID卡号');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
}; */


export const RFID_in = {
    init: function () {
        this.appendValueInput("uid_")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF)
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_RFID_READ_CARDNUM_IS);
        this.appendStatementInput("do_")
            .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
        this.setColour(COMMUNICATE_HUE);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_RFID_IN);
    }
};

//写数据块
export const RFID_writecarddata = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput("address1")
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_RFID_WRITE)
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_DATA_BLOCK)
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_WRITE_NUM)
            .appendField(new Blockly.FieldTextInput('mylist'), 'data1')
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_RFID_WRITEBLOCK);
    }
};


//读数据块的内容
export const RFID_readcarddata = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput("address")
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_RFID_READ)
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_DATA_BLOCK)
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_DATA_FROM)
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_RFID_READBLOCK);
    }
};

/* //串口打印数据内容
export const RFID_serialprintcarddata = {
   init: function() {
    this.setColour(COMMUNICATE_HUE);
    this.appendValueInput("address")
        .appendField(new Blockly.FieldDropdown(Profile.default.serial_select), "serial_select")
        .appendField("打印RFID数据块");
    this.appendDummyInput("")
        .appendField("内容")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
}; */

//关闭RFID
export const RFID_off = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_RFID_OFF);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_RFID_OFF);
    }
};

//初始化RFID
export const MFRC522_init = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETUP + " RFID")
            .appendField(new Blockly.FieldTextInput("rfid"), "rfid_name");
        this.appendValueInput("PIN_SDA")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(" SDA");
        this.appendValueInput("PIN_SCK")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("SCK");
        this.appendValueInput("PIN_MOSI")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("MOSI");
        this.appendValueInput("PIN_MISO")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("MISO");
        this.appendValueInput("PIN_RST")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("RST");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COMMUNICATE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//RFID侦测到信号
export const MFRC522_IsNewCard = {
    init: function () {
        this.appendDummyInput()
            .appendField("RFID")
            .appendField(new Blockly.FieldTextInput("rfid"), "rfid_name")
            .appendField(" " + Blockly.Msg.MIXLY_COMMUNICATION_RFID_ON_DETECTED);
        this.appendStatementInput("DO")
            .setCheck(null);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COMMUNICATE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//RFID读取卡号
export const MFRC522_ReadCardUID = {
    init: function () {
        this.appendDummyInput()
            .appendField("RFID")
            .appendField(new Blockly.FieldTextInput("rfid"), "rfid_name")
            .appendField(" " + Blockly.Msg.MIXLY_RFID_READ_CARD_UID);
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(COMMUNICATE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//RFID写卡
export const MFRC522_WriteCard = {
    init: function () {
        this.appendDummyInput()
            .appendField("RFID")
            .appendField(new Blockly.FieldTextInput("rfid"), "rfid_name")
            .appendField(" " + Blockly.Msg.MIXLY_RFID_WRITE_CARD);
        this.appendValueInput("block")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_DATA_BLOCK);
        this.appendValueInput("buffer")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RFID_BYTE_ARRAY);
        this.appendValueInput("length")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_I2C_SLAVE_WRITE_ARRAY_ARRAYLENGTH);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COMMUNICATE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//RFID读卡
export const MFRC522_ReadCard = {
    init: function () {
        this.appendDummyInput()
            .appendField("RFID")
            .appendField(new Blockly.FieldTextInput("rfid"), "rfid_name")
            .appendField(" " + Blockly.Msg.MIXLY_RFID_READ_CARD);
        this.appendValueInput("block")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_COMMUNICATION_DATA_BLOCK);
        this.appendValueInput("buffer")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.SAVETO + " " + Blockly.Msg.MIXLY_RFID_BYTE_ARRAY);
        this.appendValueInput("length")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_I2C_SLAVE_WRITE_ARRAY_ARRAYLENGTH);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COMMUNICATE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//SPI 初始化从机
export const spi_begin_slave = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETUP + "SPI" + Blockly.Msg.MIXLY_DEVICE + Blockly.Msg.MIXLY_AS + Blockly.Msg.MIXLY_SALVE);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COMMUNICATE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const spi_begin_master = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETUP + "SPI" + Blockly.Msg.MIXLY_DEVICE + Blockly.Msg.MIXLY_AS + Blockly.Msg.MIXLY_MASTER);
        this.appendValueInput("spi_slave_pin")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_SALVE + Blockly.Msg.MIXLY_PIN);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COMMUNICATE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const spi_transfer_Init = {
    init: function () {
        this.appendValueInput("slave_pin")
            .setCheck(null)
            .appendField("SPI" + Blockly.Msg.MIXLY_SEND_DATA + Blockly.Msg.MIXLY_SALVE + Blockly.Msg.MIXLY_PIN);
        this.appendStatementInput("transfer_data")
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COMMUNICATE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const spi_transfer_1 = {
    init: function () {
        this.appendValueInput("transfer_data")
            .setCheck(null)

            .appendField("SPI" + Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_SEND);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COMMUNICATE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const spi_transfer_2 = {
    init: function () {
        this.appendValueInput("transfer_data")
            .setCheck(null)
            .appendField("SPI" + Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_SEND);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RETURN_DATA);
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(COMMUNICATE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const spi_slave_interrupt = {
    init: function () {
        this.appendValueInput("slave_interrupt_input")
            .setCheck(null)
            .appendField("SPI " + Blockly.Msg.MIXLY_STM32_I2C_SLAVE_RECEIVE_EVENT + " " + Blockly.Msg.MIXLY_STM32_SPI_GET_REGISTER_DATA);
        this.appendStatementInput("slave_interrupt_data")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_MSTIMER2_DO);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COMMUNICATE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const spi_slave_receive = {
    init: function () {
        this.appendValueInput("slave_receive_data")
            .setCheck(null)
            .appendField("SPI " + Blockly.Msg.MIXLY_SALVE + " " + Blockly.Msg.MIXLY_STM32_SPI_GET_REGISTER_DATA);
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(COMMUNICATE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};