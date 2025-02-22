export const serial_print = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var dropdown_uart = this.getFieldValue('mode');
    var content = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC) || '""'
    var code = "uart" + dropdown_uart + ".write(str(" + content + "))\n";
    return code;
}

export const serial_print_byte = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var dropdown_uart = this.getFieldValue('mode');
    var content = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC) || '""'
    var code = "uart" + dropdown_uart + ".write(" + content + ")\n";
    return code;
}

export const serial_println = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var dropdown_uart = this.getFieldValue('mode');
    var content = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC) || '""'
    var code = "uart" + dropdown_uart + ".write(str(" + content + ")+'\\r\\n')\n";
    return code;
}

export const serial_print_hex = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var dropdown_uart = this.getFieldValue('mode');
    var dropdown_stat = this.getFieldValue('STAT');
    var content = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC) || '0';
    var code = "uart" + dropdown_uart + ".write(str(" + dropdown_stat + "(" + content + "))+'\\r\\n')\n";
    return code;
}

export const serial_any = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var dropdown_uart = this.getFieldValue('mode');
    var code = "uart" + dropdown_uart + ".any()";
    return [code, generator.ORDER_ATOMIC];
}

export const serial_readstr = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var dropdown_uart = this.getFieldValue('mode');
    var code = "uart" + dropdown_uart + ".read()";
    return [code, generator.ORDER_ATOMIC];
}

export const serial_readline = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var dropdown_uart = this.getFieldValue('mode');
    var code = "uart" + dropdown_uart + ".readline()";
    return [code, generator.ORDER_ATOMIC];
}

export const serial_softserial = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var dropdown_uart = this.getFieldValue('mode')
    var baudrate = this.getFieldValue('baudrate');
    return "uart" + dropdown_uart + "=machine.UART(" + dropdown_uart + ", " + baudrate + ")\n";
}

export const serial_softserial_new = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var rx = generator.valueToCode(this, 'RX', generator.ORDER_ATOMIC);
    var tx = generator.valueToCode(this, 'TX', generator.ORDER_ATOMIC);
    var dropdown_uart = this.getFieldValue('mode')
    var baudrate = this.getFieldValue('baudrate');
    return "uart" + dropdown_uart + "=machine.UART(" + dropdown_uart + ", tx=" + tx + ", rx=" + rx + ", baudrate=" + baudrate + ")\n";
}

export const system_input = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    return ['input(' + str + ')', generator.ORDER_ATOMIC];
}

export const system_print = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ")\n";
    return code;
}

export const system_print_inline = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ',end ="")\n';
    return code;
}

export const system_print_end = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    var end = generator.valueToCode(this, 'END', generator.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ',end =' + end + ')\n';
    return code;
}

export const system_print_many = function (_, generator) {
    var code = new Array(this.itemCount_);
    var default_value = '0';

    for (var n = 0; n < this.itemCount_; n++) {

        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || default_value;
    }

    var code = 'print(' + code.join(', ') + ')\n';
    return code;
}

export const serial_send_to_ai = function (_, generator) {
    generator.definitions_['import_uart_com'] = 'import uart_com';
    var dropdown_uart = this.getFieldValue('mode');
    var dropdown_stat = this.getFieldValue('STAT');
    var content = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC) || '0';
    var code = "uart_com.send(uart" + dropdown_uart + ", " + content + ", repeat=" + dropdown_stat + ")\n";
    return code;
}

export const serial_read_from_ai = function (_, generator) {
    generator.definitions_['import_uart_com'] = 'import uart_com';
    var dropdown_uart = this.getFieldValue('mode');
    var code = "uart_com.recv(uart" + dropdown_uart + ")";
    return [code, generator.ORDER_ATOMIC];
}