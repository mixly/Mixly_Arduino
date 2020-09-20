'use strict';

goog.provide('Blockly.Arduino.communicate');

goog.require('Blockly.Arduino');


Blockly.Arduino.i2c_master_writer = function () {
  var dropdown_i2c_type = this.getFieldValue('i2c_type');
  var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var value = Blockly.Arduino.valueToCode(this, 'value', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['include_Wire_slave'] = '#include <Wire_slave.h>';
  var code = dropdown_i2c_type+".beginTransmission(" + device + ");\n";
  code += dropdown_i2c_type+".write((uint8_t)" + value + ");\n";
  code += dropdown_i2c_type+".endTransmission();\n";
  return code;
};

Blockly.Arduino.i2c_master_reader2 = function () {
  var dropdown_i2c_type = this.getFieldValue('i2c_type');
  Blockly.Arduino.definitions_['include_Wire_slave'] = '#include <Wire_slave.h>';
  var code = dropdown_i2c_type+".read()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// YANG add slave write
Blockly.Arduino.i2c_slave_write = function () {
  var dropdown_i2c_type = this.getFieldValue('i2c_type');
  Blockly.Arduino.definitions_['include_Wire_slave'] = '#include <Wire_slave.h>';
  var value = Blockly.Arduino.valueToCode(this, 'value', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = dropdown_i2c_type+".write((uint8_t)" + value + ");\n";
  return code;
};

//IIC主机初始化
Blockly.Arduino.i2c_master_Init = function() {
  var dropdown_i2c_type = this.getFieldValue('i2c_type');
  Blockly.Arduino.definitions_['include_Wire_slave'] = '#include <Wire_slave.h>';
  if(dropdown_i2c_type != 'remap_I2C_1')
  {
    Blockly.Arduino.setups_['setup_i2c_'+dropdown_i2c_type] = dropdown_i2c_type+'.begin();';
  }
  else
  {
    Blockly.Arduino.setups_['setup_i2c_remap_I2C_1'] = 'afio_remap(AFIO_REMAP_I2C1);\n'
                                                    +'  gpio_set_mode(GPIOB, 9, GPIO_AF_OUTPUT_OD);\n'
                                                    +'  gpio_set_mode(GPIOB, 8, GPIO_AF_OUTPUT_OD);';
    Blockly.Arduino.setups_['setup_i2c_Wire'] = 'Wire.begin();';
  }
  var code = '';
  return code;
};

//IIC从机初始化
Blockly.Arduino.i2c_slave_Init = function() {
  var value_i2c_address = Blockly.Arduino.valueToCode(this, 'i2c_address', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_i2c_type = this.getFieldValue('i2c_type');
  Blockly.Arduino.definitions_['include_Wire_slave'] = '#include <Wire_slave.h>';
  if(dropdown_i2c_type != 'remap_I2C_1')
  {
    Blockly.Arduino.setups_['setup_i2c_'+dropdown_i2c_type] = dropdown_i2c_type+'.begin('+value_i2c_address+');';
  }
  else
  {
    Blockly.Arduino.setups_['setup_i2c_remap_I2C_1'] = 'afio_remap(AFIO_REMAP_I2C1);\n'
                                                    +'  gpio_set_mode(GPIOB, 9, GPIO_AF_OUTPUT_OD);\n'
                                                    +'  gpio_set_mode(GPIOB, 8, GPIO_AF_OUTPUT_OD);';
    Blockly.Arduino.setups_['setup_i2c_Wire'] = 'Wire.begin('+value_i2c_address+');';
  }
  var code = '';
  return code;
};

//IIC发送数据
Blockly.Arduino.i2c_begin_end_transmission = function() {
  var dropdown_i2c_type = this.getFieldValue('i2c_type');
  Blockly.Arduino.definitions_['include_Wire_slave'] = '#include <Wire_slave.h>';
  var value_i2c_address = Blockly.Arduino.valueToCode(this, 'i2c_address', Blockly.Arduino.ORDER_ATOMIC);
  var statements_transmission_data = Blockly.Arduino.statementToCode(this, 'transmission_data');
  var code = dropdown_i2c_type+'.beginTransmission('+value_i2c_address+');\n'
  + statements_transmission_data 
  + dropdown_i2c_type+'.endTransmission();\n';
  return code;
};

//IIC写入数据
Blockly.Arduino.i2c_write = function() {
  var dropdown_i2c_type = this.getFieldValue('i2c_type');
  Blockly.Arduino.definitions_['include_Wire_slave'] = '#include <Wire_slave.h>';
  var value_i2c_write_data = Blockly.Arduino.valueToCode(this, 'i2c_write_data', Blockly.Arduino.ORDER_ATOMIC);
  var code = dropdown_i2c_type+'.write((uint8_t)'+value_i2c_write_data+');\n';
  return code;
};

Blockly.Arduino.i2c_slave_write_array = function () {
  var dropdown_i2c_type = this.getFieldValue('i2c_type');
  Blockly.Arduino.definitions_['include_Wire_slave'] = '#include <Wire_slave.h>';
  var array = Blockly.Arduino.valueToCode(this, 'array', Blockly.Arduino.ORDER_ATOMIC);
  var length = Blockly.Arduino.valueToCode(this, 'length', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var code = dropdown_i2c_type+".write(" + array + "," + length + ");\n";
  return code;
};

Blockly.Arduino.i2c_available = function () {
  var dropdown_i2c_type = this.getFieldValue('i2c_type');
  Blockly.Arduino.definitions_['include_Wire_slave'] = '#include <Wire_slave.h>';
  var code = dropdown_i2c_type+".available()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//IIC读取数据
Blockly.Arduino.i2c_read = function () {  
  var dropdown_i2c_type = this.getFieldValue('i2c_type');
  var code = dropdown_i2c_type+".read()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//寄存器读写
Blockly.Arduino.i2c_master_writerReg = function () { 
  var dropdown_i2c_type = this.getFieldValue('i2c_type');     
  Blockly.Arduino.definitions_['include_Wire_slave'] = '#include <Wire_slave.h>';
  var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var regadd = Blockly.Arduino.valueToCode(this, 'regadd', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var value = Blockly.Arduino.valueToCode(this, 'value', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = dropdown_i2c_type+".beginTransmission(" + device + ");\n";
  code += dropdown_i2c_type+".write((uint8_t)" + regadd + ");\n";
  code += dropdown_i2c_type+".write((uint8_t)" + value + ");\n";
  code += dropdown_i2c_type+".endTransmission();\n";
  return code;
};

Blockly.Arduino.i2c_master_readerReg = function () {     
  var dropdown_i2c_type = this.getFieldValue('i2c_type'); 
  Blockly.Arduino.definitions_['include_Wire_slave'] = '#include <Wire_slave.h>';
  var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var regadd = Blockly.Arduino.valueToCode(this, 'regadd', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var bytes = Blockly.Arduino.valueToCode(this, 'bytes', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = dropdown_i2c_type+".beginTransmission(" + device + ");\n";
  code += dropdown_i2c_type+".write((uint8_t)" + regadd + ");\n";
  code += dropdown_i2c_type+".requestFrom(" + device + ", " + bytes + ");\n";
  code += dropdown_i2c_type+".endTransmission();\n";
  return code;
};

Blockly.Arduino.i2c_slave_onreceive = function () {
  var dropdown_i2c_type = this.getFieldValue('i2c_type'); 
  Blockly.Arduino.definitions_['include_Wire_slave'] = '#include <Wire_slave.h>';
  var value_onReceive_length = Blockly.Arduino.valueToCode(this, 'onReceive_length', Blockly.Arduino.ORDER_ATOMIC);
  var statements_i2c_onReceive_data = Blockly.Arduino.statementToCode(this, 'DO');  
  Blockly.Arduino.definitions_['function_receiveEvent_'+dropdown_i2c_type] = 'void receiveEvent_'+dropdown_i2c_type+'(int '+value_onReceive_length+')'
  +'\n{'
  +'  '+statements_i2c_onReceive_data
  +'\n}\n'
  Blockly.Arduino.setups_['setup_i2c_receiveEvent_'+dropdown_i2c_type] = dropdown_i2c_type+'.onReceive(receiveEvent_'+dropdown_i2c_type+');';
  var code = '';
  return code;
}

Blockly.Arduino.i2c_slave_onrequest = function () {
  var dropdown_i2c_type = this.getFieldValue('i2c_type'); 
  Blockly.Arduino.definitions_['include_Wire_slave'] = '#include <Wire_slave.h>';
  Blockly.Arduino.setups_['setup_i2c_onRequest_'+dropdown_i2c_type] = dropdown_i2c_type+'.onRequest(RequestEvent_'+dropdown_i2c_type+');';
  var funcName = 'RequestEvent_'+dropdown_i2c_type;
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
  Blockly.Arduino.definitions_[funcName] = code2;
  return '';
}

Blockly.Arduino.i2c_master_reader = function () { 
  var dropdown_i2c_type = this.getFieldValue('i2c_type'); 
  Blockly.Arduino.definitions_['include_Wire_slave'] = '#include <Wire_slave.h>';
  var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var bytes = Blockly.Arduino.valueToCode(this, 'bytes', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = dropdown_i2c_type+".requestFrom(" + device + ", " + bytes + ");\n";
  return code;
};

Blockly.Arduino.spi_begin_master = function() {
  var value_spi_slave_pin = Blockly.Arduino.valueToCode(this, 'spi_slave_pin', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_spi_type = this.getFieldValue('spi_type');
  Blockly.Arduino.definitions_['include_SPI'] = '#include <SPI.h>';
  if(dropdown_spi_type != 'remap_SPI_1')
  {
    Blockly.Arduino.definitions_['var_declare_'+dropdown_spi_type] = 'SPIClass '+dropdown_spi_type+'('+ dropdown_spi_type.charAt(dropdown_spi_type.length-1) +');';
    Blockly.Arduino.setups_['setup_spi_'+dropdown_spi_type] = dropdown_spi_type+'.begin();\n'
                                                        +'  '+dropdown_spi_type+'.setBitOrder(MSBFIRST);\n'
                                                        +'  '+dropdown_spi_type+'.setDataMode(SPI_MODE0);\n'
                                                        +'  '+dropdown_spi_type+'.setClockDivider(SPI_CLOCK_DIV16);\n'
                                                        +'  '+'pinMode('+value_spi_slave_pin+', OUTPUT);';  
  }
  else
  {
    Blockly.Arduino.definitions_['var_declare_SPI_1'] = 'SPIClass SPI_1(1);';
    Blockly.Arduino.setups_['setup_spi_remap_SPI_1'] = 'afio_cfg_debug_ports(AFIO_DEBUG_SW_ONLY);\n'
                                                   + '  afio_remap(AFIO_REMAP_SPI1);\n'
                                                   + '  gpio_set_mode(GPIOB, 3, GPIO_AF_OUTPUT_PP);\n'
                                                   + '  gpio_set_mode(GPIOB, 4, GPIO_INPUT_FLOATING);\n'
                                                   + '  gpio_set_mode(GPIOB, 5, GPIO_AF_OUTPUT_PP);';
    Blockly.Arduino.setups_['setup_spi_SPI_1'] = 'SPI_1.begin();\n'
                                              +'  SPI_1.setBitOrder(MSBFIRST);\n'
                                              +'  SPI_1.setDataMode(SPI_MODE0);\n'
                                              +'  SPI_1.setClockDivider(SPI_CLOCK_DIV16);\n'
                                              +'  pinMode('+value_spi_slave_pin+', OUTPUT);';  
  }
  var code = '';
  return code;
};

//SPI 初始化从机
Blockly.Arduino.spi_begin_slave = function() {
  var dropdown_spi_type = this.getFieldValue('spi_type');
  Blockly.Arduino.definitions_['include_SPI'] = '#include <SPI.h>';
  if(dropdown_spi_type != 'remap_SPI_1')
  {
    Blockly.Arduino.definitions_['var_declare_'+dropdown_spi_type] = 'SPIClass '+dropdown_spi_type+'('+ dropdown_spi_type.charAt(dropdown_spi_type.length-1) +');';
    Blockly.Arduino.setups_['setup_spi_'+dropdown_spi_type] = dropdown_spi_type+'.beginTransactionSlave(SPISettings(18000000, MSBFIRST, SPI_MODE0, DATA_SIZE_8BIT));';
  }
  else
  {
    Blockly.Arduino.definitions_['var_declare_SPI_1'] = 'SPIClass SPI_1(1);';
    Blockly.Arduino.setups_['setup_spi_remap_SPI_1'] = 'afio_cfg_debug_ports(AFIO_DEBUG_SW_ONLY);\n'
                                                   + '  afio_remap(AFIO_REMAP_SPI1);\n'
                                                   + '  gpio_set_mode(GPIOB, 3, GPIO_AF_OUTPUT_PP);\n'
                                                   + '  gpio_set_mode(GPIOB, 4, GPIO_INPUT_FLOATING);\n'
                                                   + '  gpio_set_mode(GPIOB, 5, GPIO_AF_OUTPUT_PP);';
    Blockly.Arduino.setups_['setup_spi_SPI_1'] = 'SPI_1.beginTransactionSlave(SPISettings(18000000, MSBFIRST, SPI_MODE0, DATA_SIZE_8BIT));';

  }
  var code = '';
  return code;
};

Blockly.Arduino.spi_transfer_Init = function() {
  var value_slave_pin = Blockly.Arduino.valueToCode(this, 'slave_pin', Blockly.Arduino.ORDER_ATOMIC);
  var statements_transfer_data = Blockly.Arduino.statementToCode(this, 'transfer_data');
  var code = 'digitalWrite('+value_slave_pin+', LOW);\n'
            +statements_transfer_data
            +'digitalWrite('+value_slave_pin+', HIGH);\n';
  return code;
};

Blockly.Arduino.spi_transfer_1 = function() {
  var dropdown_spi_type = this.getFieldValue('spi_type');
  var value_transfer_data = Blockly.Arduino.valueToCode(this, 'transfer_data', Blockly.Arduino.ORDER_ATOMIC);
  var code = dropdown_spi_type+'.transfer('+value_transfer_data+');\n';
  return code;
};

Blockly.Arduino.spi_transfer_2 = function() {
  var dropdown_spi_type = this.getFieldValue('spi_type');
  var value_transfer_data = Blockly.Arduino.valueToCode(this, 'transfer_data', Blockly.Arduino.ORDER_ATOMIC);
  var code = dropdown_spi_type+'.transfer('+value_transfer_data+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/*
Blockly.Arduino.spi_slave_interrupt = function() {
  var value_slave_interrupt_input = Blockly.Arduino.valueToCode(this, 'slave_interrupt_input', Blockly.Arduino.ORDER_ATOMIC);
  var statements_slave_interrupt_data = Blockly.Arduino.statementToCode(this, 'slave_interrupt_data'); 
  Blockly.Arduino.definitions_['function_ISR'] = 'ISR(SPI_STC_vect)'
  +'\n{'
  +'\n'+statements_slave_interrupt_data
  +'\n}\n'
  Blockly.Arduino.setups_['setup_spi_interrupt'] = 'SPI.attachInterrupt();'; 
  var code = '';
  return code;
};

Blockly.Arduino.spi_slave_receive = function() {
  var value_slave_receive_data = Blockly.Arduino.valueToCode(this, 'slave_receive_data', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['function_SPI_SlaveReceive'] = 'char SPI_SlaveReceive()'
  +'\n{'
  +'\n  while(!(SPSR&(1<<SPIF)));'
  +'\n  return SPDR;'
  +'\n}\n'
  var code = 'SPI_SlaveReceive()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
*/
