'use strict';

goog.provide('Blockly.Python.communicate');
goog.require('Blockly.Python');

Blockly.Python.communicate_irremote = function(){
    Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
    var code = 'mixgoce.irremote()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communicate_buffer = function() {   
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return ""+varname+"=bytearray(" + data + ")\n";
}

Blockly.Python.communicate_i2c_init = function () {
	Blockly.Python.definitions_['import_busio'] = 'import busio';
	var dropdown_pin1 = Blockly.Python.valueToCode(this, 'RX',Blockly.Python.ORDER_ATOMIC);
    var dropdown_pin2 = Blockly.Python.valueToCode(this, 'TX',Blockly.Python.ORDER_ATOMIC);
    var freq = Blockly.Python.valueToCode(this, 'freq', Blockly.Python.ORDER_ATOMIC);
    var sub = Blockly.Python.valueToCode(this, 'SUB',Blockly.Python.ORDER_ATOMIC);
    return ""+sub+" = busio.I2C(scl="+dropdown_pin2+", sda="+dropdown_pin1+", frequency="+freq+")\n";
};

Blockly.Python.communicate_i2c_try_lock = function(){
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    return [""+name+".try_lock()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communicate_i2c_scan = function(){
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    return [""+name+".scan()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communicate_i2c_write = function(){
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
   	return name+".writeto(" + address + ", bytearray(" + data +  "))\n";
};

Blockly.Python.communicate_i2c_read = function(){
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC);
    var length = Blockly.Python.valueToCode(this, 'length', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return name+".readfrom_into(" + address + ", bytearray(" + data +  "), 0, "+length+")\n";
};

Blockly.Python.communicate_i2c_writeto_then_readfrom = function(){
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC);
    var write = Blockly.Python.valueToCode(this, 'write', Blockly.Python.ORDER_ATOMIC);
    var read = Blockly.Python.valueToCode(this, 'read', Blockly.Python.ORDER_ATOMIC);
    return name+".writeto_then_readfrom(address=" + address + ", out_buffer=bytearray(" + write +  "), in_buffer=bytearray(" + read +  "))\n";
};

Blockly.Python.communicate_i2c_unlock = function(){
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    return name+".unlock()\n";
};

Blockly.Python.communicate_spi_init= function(block) {
	Blockly.Python.definitions_['import_machine'] = 'import machine';	
    var name=Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var mosi = Blockly.Python.valueToCode(this, 'mosi', Blockly.Python.ORDER_ATOMIC);
    var miso = Blockly.Python.valueToCode(this, 'miso', Blockly.Python.ORDER_ATOMIC);
    var sck = Blockly.Python.valueToCode(this, 'sck', Blockly.Python.ORDER_ATOMIC);
    return ""+name+" = busio.SPI(clock=" + sck + ", MOSI=" + mosi + ", MISO=" + miso + ")\n";
};

Blockly.Python.communicate_spi_configure= function(block) {
    Blockly.Python.definitions_['import_machine'] = 'import machine';   
    var name=Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var freq=Blockly.Python.valueToCode(this, 'freq', Blockly.Python.ORDER_ATOMIC);
    var polarity=Blockly.Python.valueToCode(this, 'polarity', Blockly.Python.ORDER_ATOMIC);
    var phase=Blockly.Python.valueToCode(this, 'phase', Blockly.Python.ORDER_ATOMIC);
    return name+".configure(baudrate=" + freq + ", polarity=" + polarity + ", phase=" + phase + ")\n";
};

Blockly.Python.communicate_spi_try_lock = function(){
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    return [""+name+".try_lock()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communicate_spi_write = function(){
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return name+".write(bytearray(" + data +  "))\n";
};

Blockly.Python.communicate_spi_read = function(){
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var length = Blockly.Python.valueToCode(this, 'length', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return name+".readinto(bytearray(" + data +  "), 0, "+length+")\n";
};

Blockly.Python.communicate_spi_write_readinto = function(){
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var write = Blockly.Python.valueToCode(this, 'write', Blockly.Python.ORDER_ATOMIC);
    var read = Blockly.Python.valueToCode(this, 'read', Blockly.Python.ORDER_ATOMIC);
    return name+".write_readinto(buffer_out=bytearray(" + write +  "), buffer_in=bytearray(" + read +  "))\n";
};

Blockly.Python.communicate_spi_unlock = function(){
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    return name+".unlock()\n";
};

Blockly.Python.communicate_ow_init = function () {
    Blockly.Python.definitions_['import_busio'] = 'import busio';
    Blockly.Python.definitions_['import_board_*'] = "from board import *";
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var varName =Blockly.Python.valueToCode(this, 'BUS',Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+"=busio.OneWire("+varName+")\n";
    return code;
};

Blockly.Python.communicate_ow_reset = function () {
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+".reset()\n";
    return code;
};

Blockly.Python.communicate_ow_read = function () {
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+".read_bit()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communicate_ow_write = function () {
    var varName =Blockly.Python.valueToCode(this, 'byte',Blockly.Python.ORDER_ATOMIC);
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+".write_bit("+varName+")\n";
    return code;
};

Blockly.Python.communicate_ir_recv = function(){
    Blockly.Python.definitions_['import_irremote'] = 'import irremote';   
    var pin = Blockly.Python.valueToCode(this, 'PIN',Blockly.Python.ORDER_ATOMIC);
    var sub = Blockly.Python.valueToCode(this, 'SUB',Blockly.Python.ORDER_ATOMIC);
    return "irremote.resume("+pin+", "+sub+")\n"
};

/*
Blockly.Blocks['i2c_init'] = Blockly.Blocks['communicate_i2c_init'];
Blockly.Blocks['i2c_read'] = Blockly.Blocks['communicate_i2c_read'];
Blockly.Blocks['i2c_write'] = Blockly.Blocks['communicate_i2c_write'];
Blockly.Blocks['i2c_scan'] = Blockly.Blocks['communicate_i2c_scan'];
Blockly.Blocks['spi_init'] = Blockly.Blocks['communicate_spi_init'];
Blockly.Blocks['spi_set'] = Blockly.Blocks['communicate_spi_set'];
Blockly.Blocks['spi_buffer'] = Blockly.Blocks['communicate_spi_buffer'];
Blockly.Blocks['spi_read'] = Blockly.Blocks['communicate_spi_read'];
Blockly.Blocks['spi_read_output'] = Blockly.Blocks['communicate_spi_read_output'];
Blockly.Blocks['spi_readinto'] = Blockly.Blocks['communicate_spi_readinto'];
Blockly.Blocks['spi_readinto_output'] = Blockly.Blocks['communicate_spi_readinto_output'];
Blockly.Blocks['spi_write'] = Blockly.Blocks['communicate_spi_write'];
Blockly.Blocks['spi_write_readinto'] = Blockly.Blocks['communicate_spi_write_readinto'];
Blockly.Blocks.i2c_master_reader2 = Blockly.Blocks.communicate_i2c_master_read;
Blockly.Blocks.i2c_available = Blockly.Blocks.communicate_i2c_available;
*/