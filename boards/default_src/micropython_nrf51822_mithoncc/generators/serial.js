export const serial_print = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var content = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC) || '""'
    var code = "uart.write(str(" + content + "))\n";
    return code;
}

export const serial_println = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var content = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC) || '""'
    var code = "uart.write(str(" + content + ")+'\\r\\n')\n";
    return code;
}

export const serial_print_hex = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var content = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC) || '0';
    var code = "uart.write(str(hex(" + content + ")) + '\\r\\n')\n";
    return code;
}

export const serial_receive_data_event = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var char_marker = generator.valueToCode(this, 'char_marker', generator.ORDER_ATOMIC) || ';';
    var branch = generator.statementToCode(this, 'DO');

    generator.definitions_['func_serial_receive_data_event_' + char_marker.charCodeAt(1)] = "serial.onDataReceived(" + char_marker + ", () => {\n" + branch + "}\n";
}

export const serial_any = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var code = "uart.any()";
    return [code, generator.ORDER_ATOMIC];
}

export const serial_readstr = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var code = "uart.read()";
    return [code, generator.ORDER_ATOMIC];
}

export const serial_readline = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var code = "uart.readline()";
    return [code, generator.ORDER_ATOMIC];
}

export const serial_readstr_until = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var char_marker = this.getFieldValue('char_marker');
    var code = "serial.readUntil(" + char_marker + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const serial_softserial = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var dropdown_pin1 = generator.valueToCode(this, 'RX', generator.ORDER_ATOMIC);
    var dropdown_pin2 = generator.valueToCode(this, 'TX', generator.ORDER_ATOMIC);
    if (!isNaN(parseInt(dropdown_pin1)))
        dropdown_pin1 = "pin" + dropdown_pin1;
    if (!isNaN(parseInt(dropdown_pin2)))
        dropdown_pin2 = "pin" + dropdown_pin2;
    var baudrate = this.getFieldValue('baudrate');
    return "uart.init(rx=" + dropdown_pin1 + ", tx=" + dropdown_pin2 + ", baudrate=" + baudrate + ")\n";
}

export const serial_begin = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var baudrate = this.getFieldValue('baudrate');
    return "uart.init(baudrate=" + baudrate + ")\n";
}

export const IO_input = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    return ['input(' + str + ')', generator.ORDER_ATOMIC];
}

export const IO_print = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ")\n";
    return code;
}

export const IO_print_inline = function (_, generator) {
    generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ',end ="")\n';
    return code;
}