export const serial_HardwareSerial = function (_, generator) {
    var serial_select = this.getFieldValue('serial_select');
    var content = generator.valueToCode(this, 'CONTENT', generator.ORDER_ATOMIC);
    //var serial_no=serial_select.charAt(serial_select.length – 1);
    generator.definitions_['include_HardwareSerial'] = '#include <HardwareSerial.h>';
    var RX = generator.valueToCode(this, 'RX', generator.ORDER_ATOMIC);
    var TX = generator.valueToCode(this, 'TX', generator.ORDER_ATOMIC);
    generator.setups_['setup_serial_' + serial_select] = '' + serial_select + '.begin(' + content + ',SERIAL_8N1,' + RX + ',' + TX + ');';
    return '';
};