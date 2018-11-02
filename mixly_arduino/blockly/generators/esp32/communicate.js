'use strict';

goog.provide('Blockly.Python.communicate');
goog.require('Blockly.Python');

Blockly.Python['radio_ons'] = function(){
    Blockly.Python.definitions_['import_radio'] = 'import radio';
    var type = this.getFieldValue('type');
    var code = 'radio.'+type+'()\n';
    return code;
};

Blockly.Python['microbit_radio_on'] = function(block) {
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  var code = 'radio.on()\n';
  return code;
};

Blockly.Python['microbit_radio_off'] = function(block) {
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  var code = 'radio.off()\n';
  return code;
};

Blockly.Python['microbit_radio_config'] = function(block) {
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  //var number_length = block.getFieldValue('length');
  var number_length =Blockly.Python.valueToCode(this, "length", Blockly.Python.ORDER_ATOMIC);
  var number_queue = Blockly.Python.valueToCode(this, "queue", Blockly.Python.ORDER_ATOMIC);
  var number_channel = Blockly.Python.valueToCode(this, "channel", Blockly.Python.ORDER_ATOMIC);
  var number_power = block.getFieldValue('power');
  var dropdown_data_rate = block.getFieldValue('data_rate');
  var code = 'radio.config(length=' + number_length +', queue=' + number_queue + ', channel=' + number_channel + ', power=' + number_power + ', data_rate=radio.' + dropdown_data_rate + ')\n';
  return code;
};

Blockly.Python['microbit_radio_reset'] = function(block) {
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  var code = 'radio.reset()\n';
  return code;
};

Blockly.Python.radio_send_string = function () {
    var number = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return "radio.send(" + number + ")\n";
}

Blockly.Python['microbit_radio_receive'] = function(block) {
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  var code = 'radio.receive()';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python.communicate_i2c_init = function () {
  Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
  var dropdown_pin1 = Blockly.Python.valueToCode(this, 'RX',Blockly.Python.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Python.valueToCode(this, 'TX',Blockly.Python.ORDER_ATOMIC);
  var freq = Blockly.Python.valueToCode(this, 'freq', Blockly.Python.ORDER_ATOMIC);
  var sub = Blockly.Python.valueToCode(this, 'SUB',Blockly.Python.ORDER_ATOMIC);
  return ""+sub+" = I2C(scl = Pin(" + dropdown_pin2 + "), sda = Pin(" + dropdown_pin1 + "), freq = " + freq + ")\n";
};

Blockly.Python.communicate_i2c_read = function(){
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    //var format = this.getFieldValue('format');
   //var is_repeated = this.getFieldValue('is_repeated');
    //is_repeated = is_repeated.substring(0,1).toUpperCase()+is_repeated.substring(1).toLowerCase();
    return ""+name+".readfrom(" + address + ", " + data +  ")\n";
};

Blockly.Python.communicate_i2c_write = function(){
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
   //var format = this.getFieldValue('format');
    //var is_repeated = this.getFieldValue('is_repeated');
    //is_repeated = is_repeated.substring(0,1).toUpperCase()+is_repeated.substring(1).toLowerCase();
    return ""+name+".writeto("+ address + ", " + data + ")\n";
};

Blockly.Python.communicate_i2c_scan = function(){
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    return ""+name+".scan()\n";
};

Blockly.Python.communicate_spi_init= function(block) {
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var name=Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var freq=Blockly.Python.valueToCode(this, 'freq', Blockly.Python.ORDER_ATOMIC);
    var polarity=Blockly.Python.valueToCode(this, 'polarity', Blockly.Python.ORDER_ATOMIC);
    var phase=Blockly.Python.valueToCode(this, 'phase', Blockly.Python.ORDER_ATOMIC);
    var mosi = Blockly.Python.valueToCode(this, 'mosi', Blockly.Python.ORDER_ATOMIC);
    var miso = Blockly.Python.valueToCode(this, 'miso', Blockly.Python.ORDER_ATOMIC);
    var sck = Blockly.Python.valueToCode(this, 'sck', Blockly.Python.ORDER_ATOMIC);
    return ""+name+" = SPI(baudrate=" + freq + ", polarity=" + polarity + ", phase=" + phase + ", sck=Pin(" + sck + "), mosi=Pin(" + mosi + "), miso=Pin(" + miso + "));\n";
}

Blockly.Python.communicate_spi_set = function() {
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return ["spi.init(baudrate=" + data + ")", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.communicate_spi_buffer = function() {
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return [""+varname+"=bytearray(" + data + ")", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.communicate_spi_read = function() {
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return [""+varname+".read(" + data + ")", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.communicate_spi_read_output = function() {
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var val = Blockly.Python.valueToCode(this, 'val', Blockly.Python.ORDER_ATOMIC);
    return [""+varname+".read(" + data + ","+val+")", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.communicate_spi_readinto = function() {
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return [""+varname+".readinto(" + data + ")", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.communicate_spi_readinto_output = function() {
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var val = Blockly.Python.valueToCode(this, 'val', Blockly.Python.ORDER_ATOMIC);
    return [""+varname+".readinto(" + data + ","+val+")", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.communicate_spi_write = function() {
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return [""+varname+".write(b'" + data + "')", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.communicate_spi_write_readinto = function() {
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var val = Blockly.Python.valueToCode(this, 'val', Blockly.Python.ORDER_ATOMIC);
    var op=this.getFieldValue('op');
    // if(op=="byte"){
    //   return [""+varname+".write_readinto(" + data + ".encode('utf-8'),"+val+")", Blockly.Python.ORDER_ATOMIC];
    // }else{
      return [""+varname+".write_readinto(" + data + ","+val+")", Blockly.Python.ORDER_ATOMIC];
    // }
}

Blockly.Python.communicate_i2c_master_read = function () {
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+".read()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.communicate_i2c_available = function () {
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+".available()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.i2c_slave_onreceive = function () {
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.setups_['setup_i2c_' + pin] = 'Wire.begin(' + pin + ');';
    Blockly.Python.setups_['setup_i2c_onReceive_' + pin] = 'Wire.onReceive(i2cReceiveEvent_' + pin + ');';
    var funcName = 'i2cReceiveEvent_' + pin;
    var branch = Blockly.Python.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '(int howMany) {\n' + branch + '}\n';
    Blockly.Python.definitions_[funcName] = code2;
    return '';
}

Blockly.Python.bluetooth_setup = function () {
  var man = Blockly.Python.valueToCode(this, 'man',Blockly.Python.ORDER_ATOMIC);
  var dev = Blockly.Python.valueToCode(this, 'dev',Blockly.Python.ORDER_ATOMIC);
  return 'bluetooth.ble_settings('+man+','+dev+')\n';
};

Blockly.Python.bluetooth_open= function() {
    var op=this.getFieldValue('op');
    var code="bluetooth.ble_adv_enable("+op+")";
    return [code, Blockly.Python.ORDER_MEMBER]
};

Blockly.Python.bluetooth_init = function () {
 var op=this.getFieldValue('op');
    var code="bluetooth."+op+"()";
    return [code, Blockly.Python.ORDER_MEMBER]
};

Blockly.Python.bluetooth_connect = function(){
    return "bluetooth.connect(bda)\n";
};

Blockly.Python.bluetooth_services = function(){
    return "bluetooth.services()\n";
};

Blockly.Python.bluetooth_conns = function(){
    return "bluetooth.conns()\n";
};

Blockly.Python.bluetooth_is_scanning = function(){
    return "bluetooth.is_scanning()\n";
};

Blockly.Python.bluetooth_open= function() {
    var op=this.getFieldValue('op');
    var code="bluetooth.scan_"+op+"()";
    return [code, Blockly.Python.ORDER_MEMBER]
};

Blockly.Python.bluetooth_service_setup = function () {
  var uuid = Blockly.Python.valueToCode(this, 'UUID',Blockly.Python.ORDER_ATOMIC);
  var op=this.getFieldValue('op');
  return 'bluetooth.Service('+uuid+',is_primary='+op+')\n';
};

Blockly.Python.communicate_ow_init = function () {
    Blockly.Python.definitions_['import_machine_Pin'] = 'from machine import Pin';
    Blockly.Python.definitions_['import_onewire'] = "import onewire";
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var varName =Blockly.Python.valueToCode(this, 'BUS',Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+"=onewire.OneWire(Pin("+varName+"))\n";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communicate_ow_scan = function () {
    Blockly.Python.definitions_['import_machine_Pin'] = 'from machine import Pin';
    Blockly.Python.definitions_['import_onewire'] = "import onewire";
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+".scan()\n";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communicate_ow_reset = function () {
    Blockly.Python.definitions_['import_machine_Pin'] = 'from machine import Pin';
    Blockly.Python.definitions_['import_onewire'] = "import onewire";
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+".reset()\n";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communicate_ow_read = function () {
    Blockly.Python.definitions_['import_machine_Pin'] = 'from machine import Pin';
    Blockly.Python.definitions_['import_onewire'] = "import onewire";
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+".readbyte()\n";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communicate_ow_write = function () {
    Blockly.Python.definitions_['import_machine_Pin'] = 'from machine import Pin';
    Blockly.Python.definitions_['import_onewire'] = "import onewire";
    var varName =Blockly.Python.valueToCode(this, 'byte',Blockly.Python.ORDER_ATOMIC);
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var op=this.getFieldValue('op');
    var code = ""+name+"."+op+"("+varName+")\n";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communicate_ow_select = function () {
    Blockly.Python.definitions_['import_machine_Pin'] = 'from machine import Pin';
    Blockly.Python.definitions_['import_onewire'] = "import onewire";
    var varName =Blockly.Python.valueToCode(this, 'byte',Blockly.Python.ORDER_ATOMIC);
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+".select_rom(" + varName + ".encode('utf-8'))\n";
    return [code, Blockly.Python.ORDER_ATOMIC];
};
