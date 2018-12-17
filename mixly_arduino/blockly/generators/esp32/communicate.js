'use strict';

goog.provide('Blockly.Python.communicate');
goog.require('Blockly.Python');

Blockly.Python.communicate_i2c_init = function () {
	Blockly.Python.definitions_['import_machine'] = 'import machine';
	var dropdown_pin1 = Blockly.Python.valueToCode(this, 'RX',Blockly.Python.ORDER_ATOMIC);
    var dropdown_pin2 = Blockly.Python.valueToCode(this, 'TX',Blockly.Python.ORDER_ATOMIC);
    var freq = Blockly.Python.valueToCode(this, 'freq', Blockly.Python.ORDER_ATOMIC);
    var sub = Blockly.Python.valueToCode(this, 'SUB',Blockly.Python.ORDER_ATOMIC);
    return ""+sub+" = machine.I2C(scl = machine.Pin(" + dropdown_pin2 + "), sda = machine.Pin(" + dropdown_pin1 + "), freq = " + freq + ")\n";
};

Blockly.Python.communicate_i2c_read = function(){
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
   	return [""+name+".readfrom(" + address + ", " + data +  ")", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communicate_i2c_write = function(){
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return ""+name+".writeto("+ address + ", " + data + ")\n";
};

Blockly.Python.communicate_i2c_scan = function(){
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    return [""+name+".scan()", Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.communicate_i2c_master_read = function () {
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+".read()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.communicate_i2c_available = function () {
   
    var name = Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+".available()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.i2c_slave_onreceive = function () {
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.setups_['setup_i2c_' + pin] = 'Wire.begin(' + pin + ');';
    Blockly.Python.setups_['setup_i2c_onReceive_' + pin] = 'Wire.onReceive(i2cReceiveEvent_' + pin + ');';
    var funcName = 'i2cReceiveEvent_' + pin;
    var branch = Blockly.Python.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '(int howMany) {\n' + branch + '}\n';
    Blockly.Python.definitions_[funcName] = code2;
    return '';
}
Blockly.Python.communicate_spi_init= function(block) {
	Blockly.Python.definitions_['import_machine'] = 'import machine';	
    var name=Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var freq=Blockly.Python.valueToCode(this, 'freq', Blockly.Python.ORDER_ATOMIC);
    var polarity=Blockly.Python.valueToCode(this, 'polarity', Blockly.Python.ORDER_ATOMIC);
    var phase=Blockly.Python.valueToCode(this, 'phase', Blockly.Python.ORDER_ATOMIC);
    var mosi = Blockly.Python.valueToCode(this, 'mosi', Blockly.Python.ORDER_ATOMIC);
    var miso = Blockly.Python.valueToCode(this, 'miso', Blockly.Python.ORDER_ATOMIC);
    var sck = Blockly.Python.valueToCode(this, 'sck', Blockly.Python.ORDER_ATOMIC);
    return ""+name+" = machine.SPI(baudrate=" + freq + ", polarity=" + polarity + ", phase=" + phase + ", sck=machine.Pin(" + sck + "), mosi=machine.Pin(" + mosi + "), miso=machine.Pin(" + miso + "));\n";
}

Blockly.Python.communicate_spi_set = function() {   
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return "spi.init(baudrate=" + data + ")\n";
}

Blockly.Python.communicate_spi_buffer = function() {   
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return ""+varname+"=bytearray(" + data + ")\n";
}

Blockly.Python.communicate_spi_read = function() {   
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return [""+varname+".read(" + data + ")", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.communicate_spi_read_output = function() {   
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var val = Blockly.Python.valueToCode(this, 'val', Blockly.Python.ORDER_ATOMIC);
    return [""+varname+".read(" + data + ","+val+")", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.communicate_spi_readinto = function() {   
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return [""+varname+".readinto(" + data + ")", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.communicate_spi_readinto_output = function() {   
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var val = Blockly.Python.valueToCode(this, 'val', Blockly.Python.ORDER_ATOMIC);
    return [""+varname+".readinto(" + data + ","+val+")", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.communicate_spi_write = function() {   
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return [""+varname+".write(" + data + ".encode('utf-8'))", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.communicate_spi_write_readinto = function() {   
    var varname = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var val = Blockly.Python.valueToCode(this, 'val', Blockly.Python.ORDER_ATOMIC);
    // var op=this.getFieldValue('op');
    // if(op=="byte"){
      return [""+varname+".write_readinto(" + data + ".encode('utf-8'),"+val+")", Blockly.Python.ORDER_ATOMIC];
    // }else{
    //   return [""+varname+".write_readinto(" + data + ","+val+")", Blockly.Python.ORDER_ATOMIC];
    // }
}

Blockly.Python.communicate_ow_init = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_onewire'] = "import onewire";
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var varName =Blockly.Python.valueToCode(this, 'BUS',Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+"=onewire.OneWire(machine.Pin("+varName+"))\n";
    return code;
};

Blockly.Python.communicate_ow_scan = function () {
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+".scan()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communicate_ow_reset = function () {
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+".reset()\n";
    return code;
};

Blockly.Python.communicate_ow_read = function () {
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+".readbyte()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.communicate_ow_write = function () {
    var varName =Blockly.Python.valueToCode(this, 'byte',Blockly.Python.ORDER_ATOMIC);
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var op=this.getFieldValue('op');
    var code = ""+name+"."+op+"("+varName+")\n";
    return code;
};

Blockly.Python.communicate_ow_select = function () {
    var varName =Blockly.Python.valueToCode(this, 'byte',Blockly.Python.ORDER_ATOMIC);
    var name = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var code = ""+name+".select_rom(" + varName + ".encode('utf-8'))\n";
    return code;
};

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