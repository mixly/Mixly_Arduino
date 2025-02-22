export const communicate_ir_recv = function (_, generator) {
    generator.definitions_['import irremote'] = 'import irremote';
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    return ["irremote.read_id(" + pin + ")", generator.ORDER_ATOMIC];
}

export const communicate_i2c_init = function (_, generator) {
    generator.definitions_['from machine import I2C'] = 'from machine import I2C';
    var mode = this.getFieldValue('mode');
    var freq = generator.valueToCode(this, 'freq', generator.ORDER_ATOMIC);
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var sda = generator.valueToCode(this, 'RX', generator.ORDER_ATOMIC);
    var scl = generator.valueToCode(this, 'TX', generator.ORDER_ATOMIC);
    return "" + sub + " = I2C(I2C." + mode + ", freq=" + freq + ", scl=" + scl + ", sda=" + sda + ")\n";
}

export const communicate_i2s_init = function (_, generator) {
    generator.definitions_['import player'] = 'import player';
    var mode = this.getFieldValue('mode');
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var BCK = generator.valueToCode(this, 'BCK', generator.ORDER_ATOMIC);
    var WS = generator.valueToCode(this, 'WS', generator.ORDER_ATOMIC);
    var DAT = generator.valueToCode(this, 'DAT', generator.ORDER_ATOMIC);
    var sample = generator.valueToCode(this, 'sample', generator.ORDER_ATOMIC);
    var code = "" + sub + "=player." + mode + "_init(" + BCK + "," + WS + "," + DAT + "," + sample + ")\n";
    return code;
}
//--------新增-------------------------------------------------------

export const communicate_i2c_read = function (_, generator) {
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var address = generator.valueToCode(this, 'address', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    return ["" + name + ".readfrom(" + address + ", " + data + ")", generator.ORDER_ATOMIC];
}

export const communicate_i2c_write = function (_, generator) {
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var address = generator.valueToCode(this, 'address', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    return "" + name + ".writeto(" + address + ", " + data + ")\n";
}

export const communicate_i2c_scan = function (_, generator) {
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    return ["" + name + ".scan()", generator.ORDER_ATOMIC];
}
export const communicate_i2c_master_read = function (_, generator) {
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "" + name + ".read()";
    return [code, generator.ORDER_ATOMIC];
}
export const communicate_i2c_available = function (_, generator) {
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "" + name + ".available()";
    return [code, generator.ORDER_ATOMIC];
}

export const i2c_slave_onreceive = function (_, generator) {
    var pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    generator.setups_['setup_i2c_' + pin] = 'Wire.begin(' + pin + ');';
    generator.setups_['setup_i2c_onReceive_' + pin] = 'Wire.onReceive(i2cReceiveEvent_' + pin + ');';
    var funcName = 'i2cReceiveEvent_' + pin;
    var branch = generator.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '(int howMany) {\n' + branch + '}\n';
    generator.definitions_[funcName] = code2;
    return '';
}

export const communicate_spi_init = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var freq = generator.valueToCode(this, 'freq', generator.ORDER_ATOMIC);
    var polarity = generator.valueToCode(this, 'polarity', generator.ORDER_ATOMIC);
    var phase = generator.valueToCode(this, 'phase', generator.ORDER_ATOMIC);
    var mosi = generator.valueToCode(this, 'mosi', generator.ORDER_ATOMIC);
    var miso = generator.valueToCode(this, 'miso', generator.ORDER_ATOMIC);
    var sck = generator.valueToCode(this, 'sck', generator.ORDER_ATOMIC);
    return "" + name + " = machine.SPI(baudrate=" + freq + ", polarity=" + polarity + ", phase=" + phase + ", sck=machine.Pin(" + sck + "), mosi=machine.Pin(" + mosi + "), miso=machine.Pin(" + miso + "));\n";
}

export const communicate_spi_set = function (_, generator) {
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    return "spi.init(baudrate=" + data + ")\n";
}

export const communicate_spi_buffer = function (_, generator) {
    var varname = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    return "" + varname + "=bytearray(" + data + ")\n";
}

export const communicate_spi_read = function (_, generator) {
    var varname = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    return ["" + varname + ".read(" + data + ")", generator.ORDER_ATOMIC];
}

export const communicate_spi_read_output = function (_, generator) {
    var varname = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var val = generator.valueToCode(this, 'val', generator.ORDER_ATOMIC);
    return ["" + varname + ".read(" + data + "," + val + ")", generator.ORDER_ATOMIC];
}

export const communicate_spi_readinto = function (_, generator) {
    var varname = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    return ["" + varname + ".readinto(" + data + ")", generator.ORDER_ATOMIC];
}

export const communicate_spi_readinto_output = function (_, generator) {
    var varname = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var val = generator.valueToCode(this, 'val', generator.ORDER_ATOMIC);
    return ["" + varname + ".readinto(" + data + "," + val + ")", generator.ORDER_ATOMIC];
}

export const communicate_spi_write = function (_, generator) {
    var varname = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    return ["" + varname + ".write(" + data + ".encode('utf-8'))", generator.ORDER_ATOMIC];
}

export const communicate_spi_write_readinto = function (_, generator) {
    var varname = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var val = generator.valueToCode(this, 'val', generator.ORDER_ATOMIC);
    // var op=this.getFieldValue('op');
    // if(op=="byte"){
    return ["" + varname + ".write_readinto(" + data + ".encode('utf-8')," + val + ")", generator.ORDER_ATOMIC];
    // }else{
    //   return [""+varname+".write_readinto(" + data + ","+val+")", generator.ORDER_ATOMIC];
    // }
}

export const communicate_ow_init = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_onewire'] = "import onewire";
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var varName = generator.valueToCode(this, 'BUS', generator.ORDER_ATOMIC);
    var code = "" + name + "=onewire.OneWire(machine.Pin(" + varName + "))\n";
    return code;
}

export const communicate_ow_scan = function (_, generator) {
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "" + name + ".scan()";
    return [code, generator.ORDER_ATOMIC];
}

export const communicate_ow_reset = function (_, generator) {
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "" + name + ".reset()\n";
    return code;
}

export const communicate_ow_read = function (_, generator) {
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "" + name + ".readbyte()";
    return [code, generator.ORDER_ATOMIC];
}

export const communicate_ow_write = function (_, generator) {
    var varName = generator.valueToCode(this, 'byte', generator.ORDER_ATOMIC);
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var op = this.getFieldValue('op');
    var code = "" + name + "." + op + "(" + varName + ")\n";
    return code;
}

export const communicate_ow_select = function (_, generator) {
    var varName = generator.valueToCode(this, 'byte', generator.ORDER_ATOMIC);
    var name = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "" + name + ".select_rom(" + varName + ".encode('utf-8'))\n";
    return code;
}