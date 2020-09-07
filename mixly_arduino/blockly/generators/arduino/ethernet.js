'use strict';
goog.provide('Blockly.Arduino.ethernet');
goog.require('Blockly.Arduino');

Blockly.Arduino.ethernet_init_begin = function() {
  var Ethernet=this.getFieldValue('Ethernet');
  Blockly.Arduino.definitions_['include_spi'] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['include_'+Ethernet] = '#include <'+Ethernet+'.h>';
  Blockly.Arduino.definitions_['var_declare_EthernetClient'] = 'EthernetClient client;';
  var mac = Blockly.Arduino.valueToCode(this, 'MAC',Blockly.Arduino.ORDER_ATOMIC);
  var code = "Ethernet.begin("+mac+")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ethernet_mac_address = function() {
  var VAR1 = this.getFieldValue('VAR1');
  var VAR2 = this.getFieldValue('VAR2');
  var VAR3 = this.getFieldValue('VAR3');
  var VAR4 = this.getFieldValue('VAR4');
  var VAR5 = this.getFieldValue('VAR5');
  var VAR6 = this.getFieldValue('VAR6');
  Blockly.Arduino.definitions_['var_declare_byte_mac'] = 'byte mac[] = {0x'+VAR1+', 0x'+VAR2+', 0x'+VAR3+', 0x'+VAR4+', 0x'+VAR5+', 0x'+VAR6+'};';
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
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT',Blockly.Arduino.ORDER_ATOMIC)|| '\"\"';
  var code = 'client.print('+TEXT+');\n';
  return code;
};
Blockly.Arduino.ethernet_client_println = function() {
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT',Blockly.Arduino.ORDER_ATOMIC)|| '\"\"';
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

Blockly.Arduino.WIFI_info = function() {
  var SSID = Blockly.Arduino.valueToCode(this, 'SSID', Blockly.Arduino.ORDER_ATOMIC);
  var PWD = Blockly.Arduino.valueToCode(this, 'PWD', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ESP8266WiFi'] ='#include <ESP8266WiFi.h>';
  Blockly.Arduino.setups_['setup_WiFi_begin'] = 'WiFi.begin('+SSID+', '+PWD+');\n'
  +'  while (WiFi.status() != WL_CONNECTED) {\n'
  +'    delay(500);\n'
  +'    Serial.print(".");\n'
  +'  }\n'
  +'  Serial.println("Local IP:");\n'
  +'  Serial.print(WiFi.localIP());'
  return "";
};

Blockly.Arduino.network_wifi_connect= function() {
  return ["WiFi.status()", Blockly.Arduino.ORDER_ATOMIC]
}

Blockly.Arduino.network_get_connect= function() {
  return ["WiFi.localIP()", Blockly.Arduino.ORDER_ATOMIC]
}

Blockly.Arduino.NTP_server = function() {
  var server_add = Blockly.Arduino.valueToCode(this, 'server_add', Blockly.Arduino.ORDER_ATOMIC);
  var timeZone = Blockly.Arduino.valueToCode(this, 'timeZone', Blockly.Arduino.ORDER_ATOMIC);
  var Interval = Blockly.Arduino.valueToCode(this, 'Interval', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_TimeLib'] ='#include <TimeLib.h>';
  Blockly.Arduino.definitions_['include_NtpClientLib'] ='#include <NtpClientLib.h>';
  Blockly.Arduino.definitions_['var_declare_timeZone'] = 'int8_t timeZone = '+timeZone+';';
  Blockly.Arduino.definitions_['var_declare_ntpServer'] ='const PROGMEM char *ntpServer = '+server_add+';';
  Blockly.Arduino.setups_['setup_NTP.setInterval'] = 'NTP.setInterval ('+Interval+');';
  Blockly.Arduino.setups_['setup_NTP.setNTPTimeout'] = 'NTP.setNTPTimeout (1500);';
  Blockly.Arduino.setups_['setup_NTP.begin'] = 'NTP.begin (ntpServer, timeZone, false);';
  return "";
};
Blockly.Arduino.NTP_server_get_time = function () {
  var timeType = this.getFieldValue('TIME_TYPE');
  var code = timeType ;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
var Client_ID ;
Blockly.Arduino.MQTT_server = function() {
  var server_add = Blockly.Arduino.valueToCode(this, 'server_add', Blockly.Arduino.ORDER_ATOMIC);
  var server_port = Blockly.Arduino.valueToCode(this, 'server_port', Blockly.Arduino.ORDER_ATOMIC);
  var IOT_ID = Blockly.Arduino.valueToCode(this, 'IOT_ID', Blockly.Arduino.ORDER_ATOMIC);
  var IOT_PWD = Blockly.Arduino.valueToCode(this, 'IOT_PWD', Blockly.Arduino.ORDER_ATOMIC);
  Client_ID = Blockly.Arduino.valueToCode(this, 'Client_ID', Blockly.Arduino.ORDER_ATOMIC);
  if (Client_ID.length>2) 
  {
    Client_ID+='/';
  }
  Client_ID = Client_ID.replace(/\"/g, "");
  Blockly.Arduino.definitions_['include_Adafruit_MQTT'] ='#include "Adafruit_MQTT.h"';
  Blockly.Arduino.definitions_['include_Adafruit_MQTT_Client'] ='#include "Adafruit_MQTT_Client.h"';
  Blockly.Arduino.definitions_['include__WiFiClient'] = 'WiFiClient client;';
  Blockly.Arduino.definitions_['var_declare_Adafruit_MQTT_Client'] ='Adafruit_MQTT_Client mqtt(&client, '+server_add+', '+server_port+', '+IOT_ID+', '+IOT_PWD+');';  
  var board_type=JSFuncs.getPlatform();
  if(board_type.match(RegExp(/ESP8266/)))
  {
    Blockly.Arduino.definitions_['var_declare_ MQTT_connect();'] ='void MQTT_connect();';
  }
  var funcName = 'MQTT_connect';
  var code = 'void' + ' ' + funcName + '() {\n'
  + '  int8_t ret;\n'
  + '  if (mqtt.connected()) {\n'
  + '    return;\n'
  + '  }\n'
  + '  Serial.print("Connecting to MQTT... ");\n'
  + '  uint8_t retries = 3;\n'
  + '  while ((ret = mqtt.connect()) != 0) {\n'
  + '    Serial.println(mqtt.connectErrorString(ret));\n'
  + '    Serial.println("Retrying MQTT connection in 5 seconds...");\n'
  + '    mqtt.disconnect();\n'
  + '    delay(5000);\n'
  + '    retries--;\n'
  + '    if (retries == 0) {\n'
  + '      while (1);\n'
  + '    }\n'
  + '  }\n'
  + '  Serial.println("MQTT Connected!");\n'
  + '}\n';
  Blockly.Arduino.definitions_['var_declare_'+funcName] = code;
  return funcName + '();\n';
};

Blockly.Arduino.MQTT_connect= function() {
  var funcName = 'MQTT_connect';
  var code = 'void' + ' ' + funcName + '() {\n'
  + '  int8_t ret;\n'
  + '  if (mqtt.connected()) {\n'
  + '  return;\n'
  + '  }\n'
  + '  Serial.print("Connecting to MQTT... ");\n'
  + '  uint8_t retries = 3;\n'
  + '  while ((ret = mqtt.connect()) != 0) {\n'
  + '    Serial.println(mqtt.connectErrorString(ret));\n'
  + '    Serial.println("Retrying MQTT connection in 5 seconds...");\n'
  + '    mqtt.disconnect();\n'
  + '    delay(5000);\n'
  + '    retries--;\n'
  + '    if (retries == 0) {\n'
  + '      while (1);\n'
  + '    }\n'
  + '  }\n'
  + '  Serial.println("MQTT Connected!");\n'
  + '}\n';
  return funcName + '();\n';
}
//物联网-发送数据到app

Blockly.Arduino.MQTT_publish = function() {
  var Topic = Blockly.Arduino.valueToCode(this, 'Topic', Blockly.Arduino.ORDER_ATOMIC);
  var data = Blockly.Arduino.valueToCode(this, 'data', Blockly.Arduino.ORDER_ATOMIC);
  Topic = Topic.replace(/\"/g, "");
  Blockly.Arduino.definitions_['var_declare_Adafruit_MQTT_Publish'+Topic] ='Adafruit_MQTT_Publish '+Topic+' = Adafruit_MQTT_Publish(&mqtt, "'+Client_ID+Topic+'");';
  var code=Topic+'.publish('+data+');\n ';
  return code;
};

Blockly.Arduino.MQTT_subscribe_value = function() {
  var Topic = Blockly.Arduino.valueToCode(this, 'Topic', Blockly.Arduino.ORDER_ATOMIC);
  Topic = Topic.replace(/\"/g, "");
  var code = '(char *)'+Topic+'.lastread';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.MQTT_subscribe = function () {
    // If/elseif/else condition.
    var n = 0;
    var argument = Blockly.Arduino.valueToCode(this, 'IF' + n,
      Blockly.Arduino.ORDER_NONE) || 'false';
    var branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
    var code = 'if (subscription ==&' + argument + ') {\n  ' + branch.replace(new RegExp(/\n/g), "\n  ") + '\n  }';
    Blockly.Arduino.definitions_['var_declare_Adafruit_MQTT_Subscribe'+Client_ID+'/'+argument] ='Adafruit_MQTT_Subscribe '+argument+' = Adafruit_MQTT_Subscribe(&mqtt,"'+Client_ID+argument+'");';
    Blockly.Arduino.setups_['setup_mqtt.subscribe'+argument] = 'mqtt.subscribe(&'+argument+');';
    
    for (n = 1; n <= this.elseifCount_; n++) {
      argument = Blockly.Arduino.valueToCode(this, 'IF' + n,
        Blockly.Arduino.ORDER_NONE) || 'false';
      branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
      Blockly.Arduino.definitions_['var_declare_Adafruit_MQTT_Subscribe'+Client_ID+argument] ='Adafruit_MQTT_Subscribe  '+argument+'= Adafruit_MQTT_Subscribe(&mqtt,"'+Client_ID+argument+'");';
      Blockly.Arduino.setups_['setup_mqtt.subscribe'+argument] = 'mqtt.subscribe(&'+argument+');';
      code += ' else if (subscription ==&' + argument + ') {\n  ' + branch.replace(new RegExp(/\n/g), "\n  ") + '\n  }';
    }
    if (this.elseCount_) {
      branch = Blockly.Arduino.statementToCode(this, 'ELSE');
      code += ' else {\n  ' + branch + '\n  }';
    }
    return  'Adafruit_MQTT_Subscribe *subscription;\nwhile ((subscription = mqtt.readSubscription(5000))) {\n  '+code + '\n}\n';
};

//ESP8266 GET请求
Blockly.Arduino.http_get = function () { 
    var api= Blockly.Arduino.valueToCode(this, 'api', Blockly.Arduino.ORDER_ATOMIC);
    var branch = Blockly.Arduino.statementToCode(this, 'success');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");
    var branch1 = Blockly.Arduino.statementToCode(this, 'failure');
    branch1 = branch1.replace(/(^\s*)|(\s*$)/g, "");
    Blockly.Arduino.definitions_['include_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
    Blockly.Arduino.definitions_['include_ESP8266HTTPClient'] = '#include <ESP8266HTTPClient.h>';
    var code='if (WiFi.status() == WL_CONNECTED) {\nHTTPClient http;\nhttp.begin('+ api+');\nint httpCode = http.GET();\nif (httpCode > 0) {\nString Request_result = http.getString();\n' + branch + '\n}\nelse {\n' + branch1 + '\n} \nhttp.end();\n}\n';
    return code;
};

Blockly.Arduino.WIFI_smartConfig= function() {
  Blockly.Arduino.definitions_['include_ESP8266WiFi'] ='#include <ESP8266WiFi.h>';
  Blockly.Arduino.setups_['setup_WiFi_Smartconfig'] = 'Serial.println("Wait for Smartconfig");\n'
 +'  WiFi.beginSmartConfig();\n'
 +' while (1){\n'
 +'    Serial.print(".");\n'
 +'    if (WiFi.smartConfigDone()){\n'
 +'       Serial.println("SmartConfig Success");\n'
 +'       Serial.printf("SSID:%s", WiFi.SSID().c_str());\n'
 +'       Serial.printf("PSW:%s", WiFi.psk().c_str());\n'
 +'       WiFi.setAutoConnect(true);\n'
 +'       break;\n'
 +'       }\n'
 +'      delay(1000);\n'
 +'  }\n'
 +'}\n';
  return "";
};

Blockly.Arduino.WIFI_ap_or_sta = function() {
  var dropdown_mode = this.getFieldValue('mode');
  var value_SSID = Blockly.Arduino.valueToCode(this, 'SSID', Blockly.Arduino.ORDER_ATOMIC);
  var value_PSK = Blockly.Arduino.valueToCode(this, 'PSK', Blockly.Arduino.ORDER_ATOMIC);
  var value_IP1 = Blockly.Arduino.valueToCode(this, 'IP1', Blockly.Arduino.ORDER_ATOMIC);
  var value_IP2 = Blockly.Arduino.valueToCode(this, 'IP2', Blockly.Arduino.ORDER_ATOMIC);
  var value_IP = Blockly.Arduino.valueToCode(this, 'IP', Blockly.Arduino.ORDER_ATOMIC);
  var value_duankou = Blockly.Arduino.valueToCode(this, 'duankou', Blockly.Arduino.ORDER_ATOMIC);
  value_IP1 = value_IP1.replace(new RegExp(/\./g), ",");
  value_IP2 = value_IP2.replace(new RegExp(/\./g), ",");
  value_IP = value_IP.replace(new RegExp(/\./g), ",");
  var board_type = JSFuncs.getPlatform();
  if(board_type.match(RegExp(/ESP8266/)) != null)
    Blockly.Arduino.definitions_['include_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
  else
    Blockly.Arduino.definitions_['include_WiFi'] = '#include <WiFi.h>';
  Blockly.Arduino.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';
  if(dropdown_mode == 'STA')
  {
    Blockly.Arduino.definitions_['include_WiFiUdp'] = '#include <WiFiUdp.h>';
    Blockly.Arduino.definitions_['define_STASSID'] = '#define STASSID '+value_SSID+'';
    Blockly.Arduino.definitions_['define_STAPSK'] = '#define STAPSK '+value_PSK+'';
    Blockly.Arduino.definitions_['var_declare_ESP8266ip1'] = 'IPAddress ESP8266ip1('+value_IP1+');';
    Blockly.Arduino.definitions_['var_declare_ESP8266ip2'] = 'IPAddress ESP8266ip2('+value_IP2+');';
    Blockly.Arduino.definitions_['var_declare_ESP8266ip'] = 'IPAddress ESP8266ip('+value_IP+');';
    Blockly.Arduino.definitions_['var_declare_localPort'] = 'unsigned int localPort = '+value_duankou+';';
    Blockly.Arduino.definitions_['var_declare_remotePort'] = 'unsigned int remotePort = '+value_duankou+';';
    Blockly.Arduino.definitions_['var_declare_incomingPacket'] = 'char incomingPacket[537];';
    Blockly.Arduino.definitions_['var_declare_A'] = 'char A;';
    Blockly.Arduino.definitions_['var_declare_Udp'] = 'WiFiUDP Udp;';
    Blockly.Arduino.setups_['setup_wifi_sta'] = 'WiFi.mode(WIFI_STA);\n'
                                            + '  WiFi.begin(STASSID, STAPSK);\n'
                                            + '  while(WiFi.status() != WL_CONNECTED){\n'
                                            + '    Serial.print(".");\n'
                                            + '    delay(500);\n'
                                            + '  }\n'
                                            + '  delay(500);\n'
                                            + '  Serial.print("Connected! IP address: ");\n'
                                            + '  Serial.println(WiFi.localIP());\n'
                                            + '  Serial.printf("UDP server on port  ", localPort);\n'
                                            + '  Udp.begin(localPort);';
  }
  else
  {
    Blockly.Arduino.definitions_['include_WiFiUDP'] = '#include <WiFiUDP.h>';
    Blockly.Arduino.definitions_['var_declare_AP_NameChar'] = 'const char AP_NameChar[] = '+value_SSID+';';
    Blockly.Arduino.definitions_['var_declare_WiFiAPPSK'] = 'const char WiFiAPPSK[] = "'+value_PSK+'";';
    Blockly.Arduino.definitions_['var_declare_ESP8266ip1'] = 'IPAddress ESP8266ip1('+value_IP1+');';
    Blockly.Arduino.definitions_['var_declare_ESP8266ip2'] = 'IPAddress ESP8266ip2('+value_IP2+');';
    Blockly.Arduino.definitions_['var_declare_ESP8266ip'] = 'IPAddress ESP8266ip('+value_IP+');';
    Blockly.Arduino.definitions_['var_declare_localPort'] = 'unsigned int localPort = '+value_duankou+';';
    Blockly.Arduino.definitions_['var_declare_remotePort'] = 'unsigned int remotePort = '+value_duankou+';';
    Blockly.Arduino.definitions_['var_declare_incomingPacket'] = 'char incomingPacket[537];';
    Blockly.Arduino.definitions_['var_declare_A'] = 'char A;';
    Blockly.Arduino.definitions_['var_declare_Udp'] = 'WiFiUDP Udp;';
    Blockly.Arduino.setups_['setup_wifi_ap'] = 'WiFi.mode(WIFI_AP);\n'
                                           + '  WiFi.softAP(AP_NameChar, WiFiAPPSK);\n'
                                           + '  Udp.begin(localPort);\n'
                                           + '  Serial.println();\n'
                                           + '  Serial.println("Started ap. Local ip: " + WiFi.localIP().toString());';
  }
  var code = '';
  return code;
};

Blockly.Arduino.WIFI_ap_and_sta = function() {
  var value_SSID1 = Blockly.Arduino.valueToCode(this, 'SSID1', Blockly.Arduino.ORDER_ATOMIC);
  var value_SSID2 = Blockly.Arduino.valueToCode(this, 'SSID2', Blockly.Arduino.ORDER_ATOMIC);
  var value_PSK1 = Blockly.Arduino.valueToCode(this, 'PSK1', Blockly.Arduino.ORDER_ATOMIC);
  var value_PSK2 = Blockly.Arduino.valueToCode(this, 'PSK2', Blockly.Arduino.ORDER_ATOMIC);
  var value_IP1 = Blockly.Arduino.valueToCode(this, 'IP1', Blockly.Arduino.ORDER_ATOMIC);
  var value_IP2 = Blockly.Arduino.valueToCode(this, 'IP2', Blockly.Arduino.ORDER_ATOMIC);
  var value_IP = Blockly.Arduino.valueToCode(this, 'IP', Blockly.Arduino.ORDER_ATOMIC);
  var value_duankou = Blockly.Arduino.valueToCode(this, 'duankou', Blockly.Arduino.ORDER_ATOMIC);
  value_IP1 = value_IP1.replace(new RegExp(/\./g), ",");
  value_IP2 = value_IP2.replace(new RegExp(/\./g), ",");
  value_IP = value_IP.replace(new RegExp(/\./g), ",");
  Blockly.Arduino.definitions_['define_STASSID'] = '#define STASSID '+value_SSID1;
  Blockly.Arduino.definitions_['define_STAPSK'] = '#define STAPSK '+value_PSK1;
  var board_type = JSFuncs.getPlatform();
  if(board_type.match(RegExp(/ESP8266/)) != null)
    Blockly.Arduino.definitions_['include_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
  else
    Blockly.Arduino.definitions_['include_WiFi'] = '#include <WiFi.h>';
  Blockly.Arduino.definitions_['include_WiFiUDP'] = '#include <WiFiUDP.h>';
  Blockly.Arduino.definitions_['var_declare_AP_NameChar'] = 'const char AP_NameChar[] = '+value_SSID2+';';
  Blockly.Arduino.definitions_['var_declare_WiFiAPPSK'] = 'const char WiFiAPPSK[] = '+value_PSK2+';';
  Blockly.Arduino.definitions_['var_declare_ESP8266ip1'] = 'IPAddress ESP8266ip1('+value_IP1+');';
  Blockly.Arduino.definitions_['var_declare_ESP8266ip2'] = 'IPAddress ESP8266ip2('+value_IP2+');';
  Blockly.Arduino.definitions_['var_declare_ESP8266ip'] = 'IPAddress ESP8266ip('+value_IP+');';
  Blockly.Arduino.definitions_['var_declare_localPort'] = 'unsigned int localPort = '+value_duankou+';';
  Blockly.Arduino.definitions_['var_declare_remotePort'] = 'unsigned int remotePort = '+value_duankou+';';
  Blockly.Arduino.definitions_['var_declare_incomingPacket'] = 'char incomingPacket[537];';
  Blockly.Arduino.definitions_['var_declare_A'] = 'char A;';
  Blockly.Arduino.definitions_['var_declare_Udp'] = 'WiFiUDP Udp;';
  Blockly.Arduino.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';
  Blockly.Arduino.setups_['setup_wifi_ap_and_sta'] = 'WiFi.mode(WIFI_AP_STA);\n'
                                                 + '  WiFi.softAP(AP_NameChar, WiFiAPPSK);\n'
                                                 + '  WiFi.begin(STASSID, STAPSK);\n'
                                                 + '  Udp.begin(localPort);\n'
                                                 + '  Serial.println();\n'
                                                 + '  Serial.println("Started ap. Local ip: " + WiFi.localIP().toString());';
  var code = '';
  return code;
};

Blockly.Arduino.WIFI_incomingPacket = function() {
  var value_input_data = Blockly.Arduino.valueToCode(this, 'input_data', Blockly.Arduino.ORDER_ATOMIC) || 'COM';
  var statements_do= Blockly.Arduino.statementToCode(this, 'do');
  statements_do = statements_do.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格
  var code = 'int packetSize = Udp.parsePacket();\n'
           + 'if (packetSize) {\n'
           + '  Serial.printf("Received %d bytes from %s, port %d\\n", packetSize, Udp.remoteIP().toString().c_str(), Udp.remotePort());\n'
           + '  int len = Udp.read(incomingPacket, 536);\n'
           + '  if (len > 0) {\n'
           + '    incomingPacket[len] = 0;\n'
           + '    Serial.printf("UDP packet contents: %s\\n", incomingPacket);\n'
           + '    String '+value_input_data+' = incomingPacket;\n'
           +      (statements_do != ''? ('    ' + statements_do.replace(new RegExp(/\n/g), "\n  ")+'\n') : '')
           + '  }\n'
           + '}\n';
  return code;
};

Blockly.Arduino.WIFI_send_data = function() {
    var value_data = Blockly.Arduino.valueToCode(this, 'data', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'Udp.beginPacket(Udp.remoteIP(),Udp.remotePort());\n'
           + 'Udp.write('+value_data+');\n'
           + 'Udp.endPacket();\n';
  return code;
};