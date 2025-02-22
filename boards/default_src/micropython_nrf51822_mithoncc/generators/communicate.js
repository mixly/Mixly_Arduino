export const radio_ons = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_radio'] = 'import radio';
    var type = this.getFieldValue('type');
    var code = 'radio.' + type + '()\n';
    return code;
}

export const microbit_radio_on = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_radio'] = 'import radio';
    var code = 'radio.on()\n';
    return code;
}

export const microbit_radio_off = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_radio'] = 'import radio';
    var code = 'radio.off()\n';
    return code;
}

export const microbit_radio_config = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_radio'] = 'import radio';
    //var number_length = block.getFieldValue('length');
    var number_length = generator.valueToCode(this, "length", generator.ORDER_ATOMIC);
    var number_queue = generator.valueToCode(this, "queue", generator.ORDER_ATOMIC);
    var number_channel = generator.valueToCode(this, "channel", generator.ORDER_ATOMIC);
    var number_power = generator.valueToCode(this, "power", generator.ORDER_ATOMIC);
    var number_address = generator.valueToCode(this, "address", generator.ORDER_ATOMIC);
    var number_group = generator.valueToCode(this, "group", generator.ORDER_ATOMIC);
    var dropdown_data_rate = generator.valueToCode(this, "data_rate", generator.ORDER_ATOMIC);
    var code = 'radio.config(length=' + number_length + ', queue=' + number_queue + ', channel=' + number_channel + ', power=' + number_power + ', address=' + number_address + ', group=' + number_group + ', data_rate=radio.' + dropdown_data_rate + ')\n';
    return code;
}

export const microbit_radio_reset = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_radio'] = 'import radio';
    var code = 'radio.reset()\n';
    return code;
}

export const radio_send_string = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_radio'] = 'import radio';
    var type = this.getFieldValue('type');
    var number = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    return "radio." + type + "(" + number + ")\n";
}

export const radio_receive_string = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_radio'] = 'import radio';
    var type = this.getFieldValue('type');
    var code = "radio." + type + "()";
    return [code, generator.ORDER_ATOMIC];
}

export const microbit_radio_receive = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    generator.definitions_['import_radio'] = 'import radio';
    var code = 'radio.receive()';
    return [code, generator.ORDER_ATOMIC];
}

export const i2c_init = function (_, generator) {
    var dropdown_pin1 = generator.valueToCode(this, 'RX', generator.ORDER_ATOMIC);
    var dropdown_pin2 = generator.valueToCode(this, 'TX', generator.ORDER_ATOMIC);
    var freq = generator.valueToCode(this, 'freq', generator.ORDER_ATOMIC);
    if (!isNaN(parseInt(dropdown_pin1)))
        dropdown_pin1 = "pin" + dropdown_pin1;
    if (!isNaN(parseInt(dropdown_pin2)))
        dropdown_pin2 = "pin" + dropdown_pin2;
    return "i2c.init(sda=" + dropdown_pin1 + ", scl=" + dropdown_pin2 + ", freq=" + freq + ")\n";
}

export const i2c_read = function (_, generator) {
    var address = generator.valueToCode(this, 'address', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var is_repeated = this.getFieldValue('is_repeated');
    is_repeated = is_repeated.substring(0, 1).toUpperCase() + is_repeated.substring(1).toLowerCase();
    return ["i2c.read(" + address + ", " + data + ", " + is_repeated + ")", generator.ORDER_ATOMIC];
}

export const i2c_write = function (_, generator) {
    var address = generator.valueToCode(this, 'address', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var is_repeated = this.getFieldValue('is_repeated');
    is_repeated = is_repeated.substring(0, 1).toUpperCase() + is_repeated.substring(1).toLowerCase();
    return "i2c.write(" + address + ", " + data + ", " + is_repeated + ")\n";
}

export const spi_init = function (block) {
    var freq = block.getFieldValue('freq');
    var bits = block.getFieldValue('bits');
    var mode = block.getFieldValue('mode');
    var mosi = block.getFieldValue('mosi');
    var miso = block.getFieldValue('miso');
    var sck = block.getFieldValue('sck');
    return "spi.init(baudrate=" + freq + ", bits=" + bits + ", mode=" + mode + ", mosi=" + mosi + ", miso= " + miso + ", sclk=" + sck + ");\n";
}

export const spi_write = function (_, generator) {
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    return ["spi.write(" + data + ")", generator.ORDER_ATOMIC];
}
