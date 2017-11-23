'use strict';

goog.provide('Blockly.JavaScript.blockgroup');

goog.require('Blockly.JavaScript');
Blockly.JavaScript.radio_send_number = function () {
    var number = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    return "radio.sendNumber(" + number + ");\n";
}

Blockly.JavaScript.radio_send_value = function () {
    var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
    var number = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    return "radio.sendValue(" + name + ", " + number + ");\n";
}

Blockly.JavaScript.radio_send_string = function () {
    var number = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    return "radio.sendString(" + number + ");\n";
}

Blockly.JavaScript.radio_receive_number = function () {
    var variable = this.getFieldValue('var');
    var branch = Blockly.JavaScript.statementToCode(this, 'do');
    Blockly.JavaScript.definitions_['func_radio_receive_number'] = "radio.onDataPacketReceived(({ receivedNumber:" +  variable + "}) =>  {\n" + branch + "});\n";
}

Blockly.JavaScript.radio_receive_value = function () {
    var name = this.getFieldValue('key');
    var value = this.getFieldValue('value');
    var branch = Blockly.JavaScript.statementToCode(this, 'do');
    Blockly.JavaScript.definitions_['func_radio_receive_value'] = "radio.onDataPacketReceived(({ receivedString:" +  name + ", receivedNumber:" + value + "}) =>  {\n" + branch + "});\n";
}

Blockly.JavaScript.radio_receive_string = function () {
    var variable = this.getFieldValue('var');
    var branch = Blockly.JavaScript.statementToCode(this, 'do');
    Blockly.JavaScript.definitions_['func_radio_receive_string'] = "radio.onDataPacketReceived(({ receivedString:" +  variable + "}) =>  {\n" + branch + "});\n";
}

Blockly.JavaScript.radio_set_group = function () {
    var number = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    return "radio.setGroup(" + number + ");\n";
}

Blockly.JavaScript.radio_send_transmit_power = function () {
    var number = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    return "radio.setTransmitPower(" + number + ");\n";
}

Blockly.JavaScript.radio_set_transmit_serial_number = function () {
    var number = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    var stat = this.getFieldValue('stat');
    return "radio.setTransmitSerialNumber(" + stat + ");\n";
}

Blockly.JavaScript.radio_write_received_packet_to_serial = function () {
    return "radio.writeReceivedPacketToSerial();\n";
}

///////////////////////// i2c ///////////////////////
Blockly.JavaScript.i2c_read = function(){
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    var format = this.getFieldValue('format');
    var is_repeated = this.getFieldValue('is_repeated');
    return "pins.i2cReadNumber(" + data + ", " + format + ", " + is_repeated + ");\n";
};
Blockly.JavaScript.i2c_write = function(){
    var address = Blockly.JavaScript.valueToCode(this, 'address', Blockly.JavaScript.ORDER_ATOMIC);
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    var format = this.getFieldValue('format');
    var is_repeated = this.getFieldValue('is_repeated');
    return "pins.i2cWriteNumber("+ address + ", " + data + ", " + format + ", " + is_repeated + ");\n";
};

////////////////////// spi ///////////////////////////////
Blockly.JavaScript.spi_write = function() {
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    return ["pins.spiWrite(" + data + ")", Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript.spi_frequency= function() {
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    return "pins.spiFrequency(" + data + ");\n";
}
Blockly.JavaScript.spi_format= function() {
    var bits= Blockly.JavaScript.valueToCode(this, 'bits', Blockly.JavaScript.ORDER_ATOMIC);
    var mode= Blockly.JavaScript.valueToCode(this, 'mode', Blockly.JavaScript.ORDER_ATOMIC);
    return "pins.spiFormat(" + bits  + ", " + mode +  ");\n";
}
Blockly.JavaScript.spi_set_pins= function() {
    var mosi = Blockly.JavaScript.valueToCode(this, 'MOSI', Blockly.JavaScript.ORDER_ATOMIC);
    var miso = Blockly.JavaScript.valueToCode(this, 'MISO', Blockly.JavaScript.ORDER_ATOMIC);
    var sck = Blockly.JavaScript.valueToCode(this, 'SCK', Blockly.JavaScript.ORDER_ATOMIC);
    return "pins.spiPins(" + mosi + ", " + miso  + ", " + sck +  ");\n";
}

///////////////////////// bluetooth /////////////////////////
Blockly.JavaScript.ble_service = function(){
    var  key = this.getFieldValue('key');
    return 'bluetooth.' + key + '();\n';
}
Blockly.JavaScript.ble_on_connected= function(){
    var  branch = Blockly.JavaScript.statementToCode(this, 'do');
    Blockly.JavaScript.definitions_['func_ble_on_connected'] = 'bluetooth.onBluetoothConnected(() => {\n' + branch + '});\n';
}

Blockly.JavaScript.ble_on_disconnected= function(){
    var  branch = Blockly.JavaScript.statementToCode(this, 'do');
    Blockly.JavaScript.definitions_['func_ble_on_disconnected'] = 'bluetooth.onBluetoothDisconnected(() => {\n' + branch + '});\n';
}

Blockly.JavaScript.ble_on_received= function(){
    var marker = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    var  branch = Blockly.JavaScript.statementToCode(this, 'do');
    Blockly.JavaScript.definitions_['func_ble_on_received'] = 'bluetooth.onUartDataReceived(' + marker + ', () => {\n' + branch + '});\n';
}
Blockly.JavaScript.ble_advertise_uid= function(){
    var is_connected = this.getFieldValue('is_connected');
    var namespace= Blockly.JavaScript.valueToCode(this, 'namespace', Blockly.JavaScript.ORDER_ATOMIC);
    var instance= Blockly.JavaScript.valueToCode(this, 'instance', Blockly.JavaScript.ORDER_ATOMIC);
    var power= Blockly.JavaScript.valueToCode(this, 'power', Blockly.JavaScript.ORDER_ATOMIC);
    return 'bluetooth.advertiseUid(' + namespace + ', ' + instance + ', ' + power  + ', ' + is_connected + ');\n';
}
Blockly.JavaScript.ble_advertise_url= function(){
    var is_connected = this.getFieldValue('is_connected');
    var url = Blockly.JavaScript.valueToCode(this, 'url', Blockly.JavaScript.ORDER_ATOMIC);
    var power= Blockly.JavaScript.valueToCode(this, 'power', Blockly.JavaScript.ORDER_ATOMIC);
    return 'bluetooth.advertiseUid(' + url  + ', ' +power  + ', ' +is_connected + ');\n';
}
Blockly.JavaScript.ble_write_number= function() {
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    return 'bluetooth.uartWriteNumber(' + data + ');\n';
}
Blockly.JavaScript.ble_write_string= function() {
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    return 'bluetooth.uartWriteString(' + data + ');\n';
}

Blockly.JavaScript.ble_write_value= function() {
    var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
    var value= Blockly.JavaScript.valueToCode(this, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    return 'bluetooth.uartWriteValue(' + name + ', '+ value +  ');\n';
}
Blockly.JavaScript.ble_read_until= function() {
    var marker= Blockly.JavaScript.valueToCode(this, 'marker', Blockly.JavaScript.ORDER_ATOMIC);
    return ['bluetooth.uartReadUntil('+ marker +  ')', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript.ble_uart_service= function() {
    return 'bluetooth.startUartService();\n';
}

Blockly.JavaScript.ble_stop_advertising= function() {
    return 'bluetooth.stopAdvertising();\n';
}

Blockly.JavaScript.ble_set_power= function() {
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    return 'bluetooth.setTransmitPower(' + data + ');\n';
}
