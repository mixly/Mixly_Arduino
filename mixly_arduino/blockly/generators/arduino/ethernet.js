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

//物联网-发送数据到app
Blockly.Arduino.WIFI_info = function() {
  var SSID = Blockly.Arduino.valueToCode(this, 'SSID', Blockly.Arduino.ORDER_ATOMIC);
  var PWD = Blockly.Arduino.valueToCode(this, 'PWD', Blockly.Arduino.ORDER_ATOMIC);
  var board_type=JSFuncs.getPlatform();
  if(board_type.match(RegExp(/ESP8266/)))
  {
    Blockly.Arduino.definitions_['include_ESP8266WiFi'] ='#include <ESP8266WiFi.h>';
  }
  else if(board_type.match(RegExp(/ESP32/)))
  {
    Blockly.Arduino.definitions_['include_WiFi'] ='#include <WiFi.h>';
  }
  //Blockly.Arduino.setups_['setup_Serial.begin(115200)']='Serial.begin(115200);\n'
  Blockly.Arduino.setups_['setup_WiFi_begin'] = 'WiFi.begin('+SSID+', '+PWD+');\n'
  +''
  +'while (WiFi.status() != WL_CONNECTED) {\n'
  +'delay(500);\n'
  +'Serial.print(".");\n'
  +'}\n'
  +'Serial.println("Local IP:");\n'
  +'Serial.print(WiFi.localIP());\n'
  return "";
};

Blockly.Arduino.network_wifi_connect= function() {
  return ["WiFi.status()", Blockly.Arduino.ORDER_ATOMIC]
}

Blockly.Arduino.network_get_connect= function() {
  return ["WiFi.localIP()", Blockly.Arduino.ORDER_ATOMIC]
}

Blockly.Arduino.network_stop= function() {
  return "WiFi.stop();";
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
  + '  return;\n'
  + '  }\n'
  + '  Serial.print("Connecting to MQTT... ");\n'
  + '  uint8_t retries = 3;\n'
  + 'while ((ret = mqtt.connect()) != 0) {\n'
  + '  Serial.println(mqtt.connectErrorString(ret));\n'
  + '  Serial.println("Retrying MQTT connection in 5 seconds...");\n'
  + '  mqtt.disconnect();\n'
  + '  delay(5000);\n'
  + '  retries--;\n'
  + 'if (retries == 0) {\n'
  + ' while (1);\n'
  + '  }\n}\n'
  + '  Serial.println("MQTT Connected!");\n}\n';
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
  + 'while ((ret = mqtt.connect()) != 0) {\n'
  + '  Serial.println(mqtt.connectErrorString(ret));\n'
  + '  Serial.println("Retrying MQTT connection in 5 seconds...");\n'
  + '  mqtt.disconnect();\n'
  + '  delay(5000);\n'
  + '  retries--;\n'
  + 'if (retries == 0) {\n'
  + ' while (1);\n'
  + '  }\n}\n'
  + '  Serial.println("MQTT Connected!");\n}\n';
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
    var code = 'if (subscription ==&' + argument + ') {\n' + branch + '\n}';
    Blockly.Arduino.definitions_['var_declare_Adafruit_MQTT_Subscribe'+Client_ID+'/'+argument] ='Adafruit_MQTT_Subscribe '+argument+' = Adafruit_MQTT_Subscribe(&mqtt,"'+Client_ID+argument+'");';
    Blockly.Arduino.setups_['setup_mqtt.subscribe'+argument] = 'mqtt.subscribe(&'+argument+');';
    
    for (n = 1; n <= this.elseifCount_; n++) {
      argument = Blockly.Arduino.valueToCode(this, 'IF' + n,
        Blockly.Arduino.ORDER_NONE) || 'false';
      branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
      Blockly.Arduino.definitions_['var_declare_Adafruit_MQTT_Subscribe'+Client_ID+argument] ='Adafruit_MQTT_Subscribe  '+argument+'= Adafruit_MQTT_Subscribe(&mqtt,"'+Client_ID+argument+'");';
      Blockly.Arduino.setups_['setup_mqtt.subscribe'+argument] = 'mqtt.subscribe(&'+argument+');';
      code += ' else if (subscription ==&' + argument + ') {\n' + branch + '}';
    }
    if (this.elseCount_) {
      branch = Blockly.Arduino.statementToCode(this, 'ELSE');
      code += ' else {\n' + branch + '\n}';
    }
    return  ' Adafruit_MQTT_Subscribe *subscription;\nwhile ((subscription = mqtt.readSubscription(5000))) {\n'+code + '\n}\n';
};