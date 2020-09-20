'use strict';

goog.provide('Blockly.Blocks.communicate');

goog.require('Blockly.Blocks');

Blockly.Blocks.communicate.HUE = 140;

  // IIC通信
  // IIC初始化主机
  Blockly.Blocks.i2c_master_Init= {
      init: function() { 
          this.appendDummyInput()        
          .appendField(Blockly.MIXLY_SETUP+' I2C '+Blockly.MIXLY_MASTER);
          this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT) 
          .appendField(' '+Blockly.Msg.CONTROLS_FOR_INPUT_WITH) 
          .appendField(new Blockly.FieldDropdown([["I2C1","Wire"],["I2C1("+Blockly.MIXLY_STM32_SPI_REMAP+")","remap_I2C_1"],["I2C2","Wire1"]]), "i2c_type");
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(Blockly.Blocks.communicate.HUE);
          this.setTooltip();
          this.setHelpUrl("");
      }
  };
// IIC初始化从机
Blockly.Blocks.i2c_slave_Init= {
  init: function() { 
      this.appendDummyInput()       
      .appendField(Blockly.MIXLY_SETUP+' I2C '+Blockly.MIXLY_SALVE);
      this.appendValueInput("i2c_address")
      .setCheck(null)
      .appendField(' '+Blockly.MIXLY_LCD_ADDRESS);
      this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT) 
      .appendField(' '+Blockly.Msg.CONTROLS_FOR_INPUT_WITH) 
      .appendField(new Blockly.FieldDropdown([["I2C1","Wire"],["I2C1("+Blockly.MIXLY_STM32_SPI_REMAP+")","remap_I2C_1"],["I2C2","Wire1"]]), "i2c_type");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.communicate.HUE);
      this.setTooltip(Blockly.MIXLY_I2C_MASTER_INITHelp);
      this.setHelpUrl("");
  }
};

//IIC主机发送数据
Blockly.Blocks.i2c_begin_end_transmission= {
  init: function() { 
      this.appendDummyInput()   
      .appendField("I2C "+Blockly.MIXLY_MASTER)
      .appendField(new Blockly.FieldDropdown([["I2C1","Wire"],["I2C2","Wire1"]]), "i2c_type")     
      .appendField(' '+Blockly.MIXLY_SEND_DATA);
      this.appendValueInput("i2c_address")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)  
      .appendField(Blockly.MIXLY_LCD_ADDRESS);
      this.appendStatementInput("transmission_data")
      .setCheck(null);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.communicate.HUE);
      this.setTooltip("");
      this.setHelpUrl("");
  }
};

//IIC写入主从机数据
Blockly.Blocks.i2c_write= {
  init: function() { 
      this.appendValueInput("i2c_write_data")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)   
      .appendField("I2C")     
      .appendField(new Blockly.FieldDropdown([["I2C1","Wire"],["I2C2","Wire1"]]), "i2c_type")   
      .appendField(" "+Blockly.MIXLY_MICROPYTHON_SOCKET_SEND);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.communicate.HUE);
      this.setTooltip("");
  }
};

// IIC写入数线数据
Blockly.Blocks.i2c_slave_write_array = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('array')
        .appendField("I2C")
        .appendField(new Blockly.FieldDropdown([["I2C1","Wire"],["I2C2","Wire1"]]), "i2c_type")
        .appendField(" "+Blockly.MIXLY_STM32_I2C_SLAVE_SEND_ARRAY)
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_I2C_SLAVE_WRITE_ARRAY_ARRAYNAME);
        this.appendValueInput('length')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.MIXLY_LIST_LEN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_I2C_SLAVE_WRITE_ARRAY);
    }
};

// IIC主机或从机读取成功吗？
Blockly.Blocks.i2c_available = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
        .appendField("I2C")
        .appendField(new Blockly.FieldDropdown([["I2C1","Wire"],["I2C2","Wire1"]]), "i2c_type")
        .appendField(" "+Blockly.MIXLY_AVAILABLE);
        this.setOutput(true, Boolean);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_I2C_AVAILABLE);
    }
};

// IIC主机或从机读取的数据
Blockly.Blocks.i2c_read = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
        .appendField("I2C")
        .appendField(new Blockly.FieldDropdown([["I2C1","Wire"],["I2C2","Wire1"]]), "i2c_type")
        .appendField(" "+Blockly.MIXLY_ESP32_READ);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_I2C_MASTER_READ2);
    }
};

//写入寄存器地址
Blockly.Blocks.i2c_master_writerReg = {       
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('device')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("I2C")
        .appendField(new Blockly.FieldDropdown([["I2C1","Wire"],["I2C2","Wire1"]]), "i2c_type")
        .appendField(" "+Blockly.MIXLY_WRITE)
        .appendField(Blockly.MIXLY_LCD_ADDRESS);
        this.appendValueInput('regadd')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_I2C_REGADD);
        this.appendValueInput('value')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_MICROBIT_JS_I2C_VALUE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

//读取寄存器地址
Blockly.Blocks.i2c_master_readerReg = {        
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('device')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("I2C")
        .appendField(new Blockly.FieldDropdown([["I2C1","Wire"],["I2C2","Wire1"]]), "i2c_type")
        .appendField(" "+Blockly.MIXLY_SERIAL_READ)
        .appendField(Blockly.MIXLY_LCD_ADDRESS);
        this.appendValueInput('regadd')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_I2C_REGADD);
        this.appendValueInput('bytes')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_I2C_BYTES);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};


Blockly.Blocks.i2c_slave_onrequest = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput("")
        .appendField("I2C")
        .appendField(new Blockly.FieldDropdown([["I2C1","Wire"],["I2C2","Wire1"]]), "i2c_type")
        .appendField(" "+Blockly.MIXLY_STM32_I2C_SLAVE_SEND_EVENT);  
        this.appendStatementInput('DO')
        .appendField(Blockly.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_I2C_SLAVE_ONREQUEST);
    }
};

Blockly.Blocks.i2c_master_writer = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('device')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("I2C")
        .appendField(new Blockly.FieldDropdown([["I2C1","Wire"],["I2C2","Wire1"]]), "i2c_type")
        .appendField(" "+Blockly.MIXLY_ESP32_WRITE)
        .appendField(Blockly.MIXLY_LCD_ADDRESS);
        this.appendValueInput('value')
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.HTML_VALUE);
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
        .appendField("I2C")
        .appendField(new Blockly.FieldDropdown([["I2C1","Wire"],["I2C2","Wire1"]]), "i2c_type")
        .appendField(" "+Blockly.MIXLY_SERIAL_READ)
        .appendField(Blockly.MIXLY_LCD_ADDRESS);
        this.appendValueInput('bytes')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_I2C_BYTES);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_I2C_MASTER_READ);
    }
};
Blockly.Blocks.i2c_master_reader2 = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
        .appendField("I2C")
        .appendField(new Blockly.FieldDropdown([["I2C1","Wire"],["I2C2","Wire1"]]), "i2c_type")
        .appendField(" "+Blockly.MIXLY_SERIAL_READ);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_I2C_MASTER_READ2);
    }
};

Blockly.Blocks.i2c_slave_onreceive = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
        .appendField("I2C")
        .appendField(new Blockly.FieldDropdown([["I2C1","Wire"],["I2C2","Wire1"]]), "i2c_type")
        .appendField(' '+Blockly.MIXLY_STM32_I2C_SLAVE_RECEIVE_EVENT);
        this.appendValueInput("onReceive_length")
      .setCheck(null)  
      .appendField(Blockly.MIXLY_I2C_BYTES);
        this.appendStatementInput('DO')
        .appendField(Blockly.MIXLY_DO);
          this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_I2C_SLAVE_ONRECEIVE);
    }
};

Blockly.Blocks.i2c_slave_write = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('value')
        .appendField("I2C")
        .appendField(new Blockly.FieldDropdown([["I2C1","Wire"],["I2C2","Wire1"]]), "i2c_type")
        .appendField(" "+Blockly.MIXLY_STM32_I2C_SLAVE_SEND_BYTE)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.HTML_VALUE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_I2C_SLAVE_WRITE);
    }
};

//SPI 初始化从机
Blockly.Blocks.spi_begin_slave= {
  init: function() { 
      this.appendDummyInput()        
      .appendField(Blockly.MIXLY_SETUP+" SPI "+Blockly.MIXLY_SALVE)
      .appendField(' '+Blockly.Msg.CONTROLS_FOR_INPUT_WITH) 
      .appendField(new Blockly.FieldDropdown([["SPI1","SPI_1"],["SPI1("+Blockly.MIXLY_STM32_SPI_REMAP+")","remap_SPI_1"],["SPI2","SPI_2"],["SPI3","SPI_3"]]), "spi_type");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.communicate.HUE);
      this.setTooltip("");
      this.setHelpUrl("");
  }
};

Blockly.Blocks.spi_begin_master= {
  init: function() { 
      this.appendDummyInput()
      .appendField(Blockly.MIXLY_SETUP+" SPI "+Blockly.MIXLY_MASTER);
      this.appendValueInput("spi_slave_pin")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)  
      .appendField(Blockly.MIXLY_SALVE+Blockly.MIXLY_PIN);
      this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)  
      .appendField(' '+Blockly.Msg.CONTROLS_FOR_INPUT_WITH) 
      .appendField(new Blockly.FieldDropdown([["SPI1","SPI_1"],["SPI1("+Blockly.MIXLY_STM32_SPI_REMAP+")","remap_SPI_1"],["SPI2","SPI_2"],["SPI3","SPI_3"]]), "spi_type");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.communicate.HUE);
      this.setTooltip("");
      this.setHelpUrl("");
  }
};

Blockly.Blocks.spi_transfer_Init= {
  init: function() { 
      this.appendValueInput("slave_pin")
      .setCheck(null)        
      .appendField("SPI")
      .appendField(' '+Blockly.MIXLY_SEND_DATA+' '+Blockly.MIXLY_SALVE+Blockly.MIXLY_PIN);
      this.appendStatementInput("transfer_data")
      .setCheck(null);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.communicate.HUE);
      this.setTooltip("");
      this.setHelpUrl("");
  }
};

Blockly.Blocks.spi_transfer_1= {
  init: function() { 
      this.appendValueInput("transfer_data")
      .setCheck(null)  
      .appendField("SPI")
      .appendField(new Blockly.FieldDropdown([["SPI1","SPI_1"],["SPI2","SPI_2"],["SPI3","SPI_3"]]), "spi_type")
      .appendField(" "+Blockly.MIXLY_MICROPYTHON_SOCKET_SEND);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.communicate.HUE);
      this.setTooltip("");
      this.setHelpUrl("");
  }
};

Blockly.Blocks.spi_transfer_2= {
  init: function() { 
      this.appendValueInput("transfer_data")
      .setCheck(null)
      .appendField("SPI")
      .appendField(new Blockly.FieldDropdown([["SPI1","SPI_1"],["SPI2","SPI_2"],["SPI3","SPI_3"]]), "spi_type")
      .appendField(" "+Blockly.MIXLY_MICROPYTHON_SOCKET_SEND);
      this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.MIXLY_RETURN_DATA);
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.communicate.HUE);
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
/*
Blockly.Blocks.spi_slave_interrupt= {
  init: function() { 
      this.appendValueInput("slave_interrupt_input")
      .setCheck(null)  
      .appendField("SPI")
      .appendField(new Blockly.FieldTextInput("SPI1"), "spi_name")
      .appendField(" "+Blockly.MIXLY_STM32_I2C_SLAVE_RECEIVE_EVENT+" "+Blockly.MIXLY_STM32_SPI_GET_REGISTER_DATA);
      this.appendStatementInput("slave_interrupt_data")
      .setCheck(null)  
      .appendField(Blockly.MIXLY_MSTIMER2_DO);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.communicate.HUE);
      this.setTooltip("");
      this.setHelpUrl("");
  }
};

Blockly.Blocks.spi_slave_receive= {
  init: function() { 
      this.appendValueInput("slave_receive_data")
      .setCheck(null)  
      .appendField("SPI")
      .appendField(new Blockly.FieldTextInput("SPI1"), "spi_name")
      .appendField(" "+Blockly.MIXLY_SALVE+" "+Blockly.MIXLY_STM32_SPI_GET_REGISTER_DATA);
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.communicate.HUE);
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
*/