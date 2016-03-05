'use strict';
goog.provide('Blockly.Arduino.ethernet');
goog.require('Blockly.Arduino');

Blockly.Arduino.ethernet_init_begin = function() {
  var Ethernet=this.getTitleValue('Ethernet');
  Blockly.Arduino.definitions_['define_spi'] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['define_'+Ethernet] = '#include <'+Ethernet+'.h>';
  Blockly.Arduino.definitions_['var_EthernetClient'] = 'EthernetClient client;';
  var mac = Blockly.Arduino.valueToCode(this, 'MAC',Blockly.Arduino.ORDER_ATOMIC);
  var code = "Ethernet.begin("+mac+")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ethernet_mac_address = function() {
  var VAR1 = this.getTitleValue('VAR1');
  var VAR2 = this.getTitleValue('VAR2');
  var VAR3 = this.getTitleValue('VAR3');
  var VAR4 = this.getTitleValue('VAR4');
  var VAR5 = this.getTitleValue('VAR5');
  var VAR6 = this.getTitleValue('VAR6');
  Blockly.Arduino.definitions_['var_byte_mac'] = 'byte mac[] = {0x'+VAR1+', 0x'+VAR2+', 0x'+VAR3+', 0x'+VAR4+', 0x'+VAR5+', 0x'+VAR6+'};';
  var code = "mac";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ethernet_init_local_ip = function() {
  var code = "Ethernet.localIP()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ethernet_client_connect_server = function() {
  var PORT = Blockly.Arduino.valueToCode(this, 'PORT',Blockly.Arduino.ORDER_ATOMIC);
  var SERVER = Blockly.Arduino.quote_(this.getFieldValue('SERVER'));
  var code='client.connect('+SERVER+','+PORT+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ethernet_client_stop = function() {
  var code = "client.stop();\n";
  return code;
};
Blockly.Arduino.ethernet_client_connected = function() {
  var code = "client.connected()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.ethernet_client_available = function() {
  var code = "client.available()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ethernet_client_print = function() {
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT',Blockly.Arduino.ORDER_ATOMIC);
  var code = 'client.print('+TEXT+');\n';
  return code;
};
Blockly.Arduino.ethernet_client_println = function() {
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT',Blockly.Arduino.ORDER_ATOMIC);
  var code = 'client.println('+TEXT+');\n';
  return code;
};
Blockly.Arduino.ethernet_client_read = function() {
  var code = "(char)client.read()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ethernet_client_get_request = function() {
  var URL = this.getFieldValue('URL');
  var SERVER = this.getFieldValue('SERVER');
  var code = 'client.println("GET '+URL+' HTTP/1.1");\n'
			+'client.println(F("Host: '+SERVER+'"));\n'
			+'client.println(F("Connection: close"));\n'
			+'client.println();\n';
  return code;
};