'use strict';

goog.provide('Blockly.Python.communicate');
goog.require('Blockly.Python');

Blockly.Python['radio_ons'] = function(){
    Blockly.Python.definitions_['import_radio'] = 'import radio';
    var type = this.getFieldValue('type');
    var code = 'radio.'+type+'()\n';
    return code;
};

Blockly.Python['microbit_radio_on'] = function(block) {
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  var code = 'radio.on()\n';
  return code;
};

Blockly.Python['microbit_radio_off'] = function(block) {
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  var code = 'radio.off()\n';
  return code;
};

Blockly.Python['microbit_radio_config'] = function(block) {
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  //var number_length = block.getFieldValue('length');
  var number_length =Blockly.Python.valueToCode(this, "length", Blockly.Python.ORDER_ATOMIC);
  var number_queue = Blockly.Python.valueToCode(this, "queue", Blockly.Python.ORDER_ATOMIC);
  var number_channel = Blockly.Python.valueToCode(this, "channel", Blockly.Python.ORDER_ATOMIC);
  var number_power = block.getFieldValue('power');
  var dropdown_data_rate = block.getFieldValue('data_rate');
  var code = 'radio.config(length=' + number_length +', queue=' + number_queue + ', channel=' + number_channel + ', power=' + number_power + ', data_rate=radio.' + dropdown_data_rate + ')\n';
  return code;
};

Blockly.Python['microbit_radio_reset'] = function(block) {
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  var code = 'radio.reset()\n';
  return code;
};

Blockly.Python.radio_send_string = function () {
    var number = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return "radio.send(" + number + ")\n";
}

Blockly.Python['microbit_radio_receive'] = function(block) {
  Blockly.Python.definitions_['import_radio'] = 'import radio';
  var code = 'radio.receive()';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python.i2c_init = function () {
  Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
  var dropdown_pin1 = Blockly.Python.valueToCode(this, 'RX',Blockly.Python.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Python.valueToCode(this, 'TX',Blockly.Python.ORDER_ATOMIC);
  var freq = Blockly.Python.valueToCode(this, 'freq', Blockly.Python.ORDER_ATOMIC);
  return "i2c=I2C(scl=Pin(" + dropdown_pin2 + "), sda=Pin(" + dropdown_pin1 + "), freq=" + freq + ")\n";
};

Blockly.Python.i2c_read = function(){
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    //var format = this.getFieldValue('format');
   //var is_repeated = this.getFieldValue('is_repeated');
    //is_repeated = is_repeated.substring(0,1).toUpperCase()+is_repeated.substring(1).toLowerCase();
    return "i2c.readfrom(" + address + ", " + data +  ")\n";
};
Blockly.Python.i2c_write = function(){
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var address = Blockly.Python.valueToCode(this, 'address', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
   //var format = this.getFieldValue('format');
    //var is_repeated = this.getFieldValue('is_repeated');
    //is_repeated = is_repeated.substring(0,1).toUpperCase()+is_repeated.substring(1).toLowerCase();
    return "i2c.writeto("+ address + ", " + data + ")\n";
};

Blockly.Python.spi_init= function(block) {
    var freq=block.getFieldValue('freq');
    var bits=block.getFieldValue('bits');
    var mode=block.getFieldValue('mode');
    var mosi = block.getFieldValue('mosi');
    var miso = block.getFieldValue('miso');
    var sck = block.getFieldValue('sck');
    return "spi.init(baudrate=" + freq + ", bits=" + bits + ", mode=" + mode + ", mosi=" + mosi + ", miso= " + miso  + ", sclk=" + sck +  ");\n";
}

Blockly.Python.spi_write = function() {
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    return ["spi.write(b'" + data + "')", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.network_init= function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    var mode=this.getFieldValue('mode');
    return "wlan=network.WLAN(network."+mode+"_IF);\n";
}

Blockly.Python.network_connect= function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    Blockly.Python.setups_['class_wlan'] ='wlan.active(True)\n';
    var id = Blockly.Python.valueToCode(this, 'id', Blockly.Python.ORDER_ATOMIC);
    var password = Blockly.Python.valueToCode(this, 'password', Blockly.Python.ORDER_ATOMIC);
    return "if not wlan.isconnected():\n"+
           "  wlan.connect("+id+","+password+")\n"+
           "  while not wlan.isconnected():\n"+
           "    pass\n";
}

Blockly.Python.network_wifi_connect= function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    return "wlan.isconnected()\n"; 
}

Blockly.Python.network_get_connect= function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    var mode=this.getFieldValue('mode');
    var code="wlan.ifconfig()["+mode+"]";
    return [code, Blockly.Python.ORDER_MEMBER]
}

Blockly.Python.network_stop= function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    return "wlan.disconnect()\n";
}

Blockly.Python.network_open= function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    var op=this.getFieldValue('op');
    var code="wlan.active("+op+")\n";
    return code;
}

Blockly.Python.network_wifi_connect = function(){
    Blockly.Python.definitions_['import_network'] = "import network";
    var code = 'wlan.isconnected()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.network_get_wifi= function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    var op=this.getFieldValue('op');
    var code="ap.config('"+op+"')";
    return [code, Blockly.Python.ORDER_MEMBER]
}

Blockly.Python.network_ap_connect= function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    Blockly.Python.setups_['class_wlan'] ='ap = network.WLAN(network.AP_IF)\n'+'ap.active(True)\n';
    var essid = Blockly.Python.valueToCode(this, 'essid', Blockly.Python.ORDER_ATOMIC);
    var channel = Blockly.Python.valueToCode(this, 'channel', Blockly.Python.ORDER_ATOMIC);
    return "  ap.config(essid="+essid+",channel="+channel+")\n";
}

Blockly.Python.network_scan= function() {
    Blockly.Python.definitions_['import_network'] = "import network";
    var op=this.getFieldValue('op');
    var code="wlan.scan()["+op+"]";
    switch (op) {
    case "0":
       return [code, Blockly.Python.ORDER_ASSIGNMENT];
       break;
    case "1":
       return [code, Blockly.Python.ORDER_ASSIGNMENT];
       break;
    case "2":
       return [code, Blockly.Python.ORDER_ASSIGNMENT];
       break;
    case "3":
       return [code, Blockly.Python.ORDER_ASSIGNMENT];
       break;
    case "4":
       return [code, Blockly.Python.ORDER_ASSIGNMENT];
       break;
    case "5":
       return [code, Blockly.Python.ORDER_ASSIGNMENT];
       break;
    case "all":
       var code1 = 'wlan.scan()';
       return [code1, Blockly.Python.ORDER_ASSIGNMENT];
       break;
  }
}

Blockly.Python.i2c_master_reader2 = function () {
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var code = "i2c.read()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.i2c_available = function () {
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var code = "i2c.available()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.i2c_slave_onreceive = function () {
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.setups_['setup_i2c_' + pin] = 'Wire.begin(' + pin + ');';
    Blockly.Python.setups_['setup_i2c_onReceive_' + pin] = 'Wire.onReceive(i2cReceiveEvent_' + pin + ');';
    var funcName = 'i2cReceiveEvent_' + pin;
    var branch = Blockly.Python.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '(int howMany) {\n' + branch + '}\n';
    Blockly.Python.definitions_[funcName] = code2;
    return '';
}

Blockly.Python.bluetooth_setup = function () {
  var man = Blockly.Python.valueToCode(this, 'man',Blockly.Python.ORDER_ATOMIC);
  var dev = Blockly.Python.valueToCode(this, 'dev',Blockly.Python.ORDER_ATOMIC);
  return 'bluetooth.ble_settings('+man+','+dev+')\n';
};

Blockly.Python.bluetooth_open= function() {
    var op=this.getFieldValue('op');
    var code="bluetooth.ble_adv_enable("+op+")";
    return [code, Blockly.Python.ORDER_MEMBER]
};

Blockly.Python.bluetooth_init = function () {
 var op=this.getFieldValue('op');
    var code="bluetooth."+op+"()";
    return [code, Blockly.Python.ORDER_MEMBER]
};

Blockly.Python.bluetooth_connect = function(){
    return "bluetooth.connect(bda)\n";
};

Blockly.Python.bluetooth_services = function(){
    return "bluetooth.services()\n";
};

Blockly.Python.bluetooth_conns = function(){
    return "bluetooth.conns()\n";
};

Blockly.Python.bluetooth_is_scanning = function(){
    return "bluetooth.is_scanning()\n";
};

Blockly.Python.bluetooth_open= function() {
    var op=this.getFieldValue('op');
    var code="bluetooth.scan_"+op+"()";
    return [code, Blockly.Python.ORDER_MEMBER]
};

Blockly.Python.bluetooth_service_setup = function () {
  var uuid = Blockly.Python.valueToCode(this, 'UUID',Blockly.Python.ORDER_ATOMIC);
  var op=this.getFieldValue('op');
  return 'bluetooth.Service('+uuid+',is_primary='+op+')\n';
};

Blockly.Python.network_server= function() {
    Blockly.Python.definitions_['import_server_*'] = 'from server import *';
    // Blockly.Python.setups_['class_wlan'] ='SSID="ying"\n'+'PASSWORD="201411132040"\n';
    return 'if not wlan.isconnected():\n'
    +'    connectWifi(SSID, PASSWORD)\n'
    +'ip=wlan.ifconfig()[0]\n'
    +'print(ip)\n'
    +'time.sleep(1)\n'
    +'DATA=listenData()\n'   
}