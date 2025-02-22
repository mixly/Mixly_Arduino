export const UART_SELET = function (_, generator) {
    var code = this.getFieldValue('UART');
    return [code, generator.ORDER_ATOMIC];
}

export const serial_print = function (_, generator) {
    generator.definitions_['from machine import UART'] = 'from machine import UART';
    var dropdown_uart = this.getFieldValue('mode');
    var content = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC) || '""'
    var code = "uart" + dropdown_uart + ".write(str(" + content + "))\n";
    return code;
}

export const serial_println = function (_, generator) {
    generator.definitions_['from machine import UART'] = 'from machine import UART';
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
    generator.definitions_['from machine import UART'] = 'from machine import UART';
    var dropdown_uart = this.getFieldValue('mode');
    var code = "uart" + dropdown_uart + ".any()";
    return [code, generator.ORDER_ATOMIC];
}

export const serial_readstr = function (_, generator) {
    generator.definitions_['from machine import UART'] = 'from machine import UART';
    var dropdown_uart = this.getFieldValue('mode');
    var code = "uart" + dropdown_uart + ".read()";
    return [code, generator.ORDER_ATOMIC];
}

export const serial_readline = function (_, generator) {
    generator.definitions_['from machine import UART'] = 'from machine import UART';
    var dropdown_uart = this.getFieldValue('mode');
    var code = "uart" + dropdown_uart + ".readline()";
    return [code, generator.ORDER_ATOMIC];
}

export const serial_softserial1 = function (_, generator) {
    generator.definitions_['from machine import UART'] = 'from machine import UART';
    generator.definitions_['import board'] = 'import board';
    var dropdown_uart = this.getFieldValue('mode');
    var baudrate = this.getFieldValue('baudrate');
    var TX = generator.valueToCode(this, 'TX', generator.ORDER_ATOMIC);
    var RX = generator.valueToCode(this, 'RX', generator.ORDER_ATOMIC);
    var code1 = "board.register(" + TX + ",board.FPIOA.UART" + dropdown_uart + "_TX)\n";
    var code2 = "board.register(" + RX + ",board.FPIOA.UART" + dropdown_uart + "_RX)\n";
    var code3 = "uart" + dropdown_uart + "=UART(UART.UART" + dropdown_uart + ", " + baudrate + ", timeout=1000, read_buf_len=4096)\n";
    var code = code1 + code2 + code3;
    return code;
}

export const system_input = function (_, generator) {
    // generator.definitions_['import machine'] = 'import machine';
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    return ['input(' + str + ')', generator.ORDER_ATOMIC];
}

export const system_print = function (_, generator) {
    // generator.definitions_['import machine'] = 'import machine';
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ")\n";
    return code;
}

export const system_print_inline = function (_, generator) {
    // generator.definitions_['import machine'] = 'import machine';
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ',end ="")\n';
    return code;
}

export const system_print_end = function (_, generator) {
    // generator.definitions_['import machine'] = 'import machine';
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    var end = generator.valueToCode(this, 'END', generator.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ',end =' + end + ')\n';
    return code;
}

export const system_print_many = function (_, generator) {
    // generator.definitions_['import machine'] = 'import machine';
    var code = new Array(this.itemCount_);
    var default_value = '0';
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || default_value;
    }
    var code = 'print(' + code.join(', ') + ')\n';
    return code;
}

export const serial_send_to_mixgoce = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_ce_com'] = 'import ce_com';
    var dropdown_uart = this.getFieldValue('mode');
    var dropdown_stat = this.getFieldValue('STAT');
    var content = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC) || '0';
    var code = "ce_com.uart_tx(uart" + dropdown_uart + ", " + content + ", repeat=" + dropdown_stat + ")\n";
    return code;
}

export const serial_read_from_mixgoce = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_ce_com'] = 'import ce_com';
    var dropdown_uart = this.getFieldValue('mode');
    var code = "ce_com.uart_rx(uart" + dropdown_uart + ")";
    return [code, generator.ORDER_ATOMIC];
}