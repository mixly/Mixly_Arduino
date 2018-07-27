'use strict';

goog.provide('Blockly.Python.communicate');
goog.require('Blockly.Python');

Blockly.Python['radio_ons'] = function(){
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    Blockly.Python.definitions_['import_radio'] = 'import radio';
    var type = this.getFieldValue('type');
    var code = 'radio.'+type+'()\n';
    return code;
};

Blockly.Python['microbit_radio_on'] = function(block) {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  var code = 'radio.on()\n';
  return code;
};

Blockly.Python['microbit_radio_off'] = function(block) {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  var code = 'radio.off()\n';
  return code;
};

Blockly.Python['microbit_radio_config'] = function(block) {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  //var number_length = block.getFieldValue('length');
  var number_length =Blockly.Python.valueToCode(this, "length", Blockly.Python.ORDER_ATOMIC);
  var number_queue = Blockly.Python.valueToCode(this, "queue", Blockly.Python.ORDER_ATOMIC);
  var number_channel = Blockly.Python.valueToCode(this, "channel", Blockly.Python.ORDER_ATOMIC);
  var number_power = Blockly.Python.valueToCode(this, "power", Blockly.Python.ORDER_ATOMIC);
  var number_address = Blockly.Python.valueToCode(this, "address", Blockly.Python.ORDER_ATOMIC);
  var number_group = Blockly.Python.valueToCode(this, "group", Blockly.Python.ORDER_ATOMIC);
  var dropdown_data_rate = Blockly.Python.valueToCode(this, "data_rate", Blockly.Python.ORDER_ATOMIC);
  var code = 'radio.config(length=' + number_length +', queue=' + number_queue + ', channel=' + number_channel + ', power=' + number_power + ', address=' + number_address + ', group=' + number_group + ', data_rate=radio.' + dropdown_data_rate + ')\n';
  return code;
};

Blockly.Python['microbit_radio_reset'] = function(block) {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  var code = 'radio.reset()\n';
  return code;
};

Blockly.Python.radio_send_string = function () {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  var type = this.getFieldValue('type');
    var number = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return "radio."+type+"(" + number + ")\n";
}

Blockly.Python.radio_receive_string = function () {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  var type = this.getFieldValue('type');
  var code = "radio."+type+"()";
  return [code, Blockly.Python.ORDER_MEMBER];
}

Blockly.Python['microbit_radio_receive'] = function(block) {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  var code = 'radio.receive()';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python.i2c_init = function () {
  var dropdown_pin1 = Blockly.Python.valueToCode(this, 'RX',Blockly.Python.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Python.valueToCode(this, 'TX',Blockly.Python.ORDER_ATOMIC);
  var freq = Blockly.Python.valueToCode(this, 'freq', Blockly.Python.ORDER_ATOMIC);
  return "i2c.init(sda=" + dropdown_pin1 + ", scl=" + dropdown_pin2 + ", freq=" + freq + ")\n";
};

Blockly.Python.i2c_read = function(){
    var address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var format = this.getFieldValue('format');
    var is_repeated = this.getFieldValue('is_repeated');
    is_repeated = is_repeated.substring(0,1).toUpperCase()+is_repeated.substring(1).toLowerCase();
    return ["i2c.read(" + address + ", " + data +  ", " + is_repeated + ")", Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.i2c_write = function(){
    var address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var format = this.getFieldValue('format');
    var is_repeated = this.getFieldValue('is_repeated');
    is_repeated = is_repeated.substring(0,1).toUpperCase()+is_repeated.substring(1).toLowerCase();
    return "i2c.write("+ address + ", " + data + ", " + is_repeated + ")\n";
};

Blockly.Python.spi_init= function(block) {
    var freq=block.getFieldValue('freq');
    var bits=block.getFieldValue('bits');
    var mode=block.getFieldValue('mode');
    var mosi = block.getFieldValue('mosi');
    var miso = block.getFieldValue('miso');
    var sck = block.getFieldValue('sck');
    return "spi.init(baudrate=" + freq + ", bits=" + bits + ", mode=" + mode + ", mosi=" + mosi + ", miso= " + miso  + ", sclk=" + sck +  ");\n";
}

Blockly.Python.spi_write = function() {
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return ["spi.write(" + data + ")", Blockly.Python.ORDER_ATOMIC];
}
