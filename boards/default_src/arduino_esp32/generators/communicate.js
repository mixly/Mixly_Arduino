import { Profile } from 'mixly';

export const spi_transfer = function (_, generator) {
    generator.definitions_['include_SPI'] = '#include <SPI.h>';
    generator.setups_['setup_spi'] = 'SPI.begin();';
    var pin = generator.valueToCode(this, 'pin', generator.ORDER_ATOMIC);
    var value = generator.valueToCode(this, 'value', generator.ORDER_ATOMIC);
    generator.setups_['setup_output_' + pin] = 'pinMode(' + pin + ', OUTPUT);';
    var code = "digitalWrite(" + pin + ", LOW);\n";
    code += "SPI.transfer(" + value + ");\n";
    code += "digitalWrite(" + pin + ", HIGH);\n";
    return code;
}

export const serialBT_Init = function (_, generator) {
    var content = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC) || Profile.default.serial;
    generator.definitions_['include_BluetoothSerial'] = '#include "BluetoothSerial.h"';
    generator.definitions_['var_declare_BluetoothSerial'] = 'BluetoothSerial SerialBT;';
    generator.setups_['setup_serial_BT'] = 'SerialBT.begin(' + content + ');';
    generator.setups_['setup_serial_started'] = 'Serial.println("The device started, now you can pair it with bluetooth!");';
    return '';
}

export const serialBT_available = function (_, generator) {
    var code = "SerialBT.available() > 0";
    return [code, generator.ORDER_ATOMIC];
}

export const serialBT_read = function (_, generator) {
    var code = 'SerialBT.read()';
    return [code, generator.ORDER_ATOMIC];
}

export const serialBT_write = function (_, generator) {
    var content = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC) || '""';
    var code = 'SerialBT.write(' + content + ');\n';
    return code;
}