'use strict';
goog.provide('Blockly.Arduino.ethernet');
goog.require('Blockly.Arduino');
Blockly.Arduino.WIFI_info = function() {
	var SSID = Blockly.Arduino.valueToCode(this, 'SSID', Blockly.Arduino.ORDER_ATOMIC);
	var PWD = Blockly.Arduino.valueToCode(this, 'PWD', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['include_WiFi'] ='#include <WiFi.h>';
	Blockly.Arduino.setups_['setup_WiFi_begin'] = 'WiFi.begin('+SSID+', '+PWD+');\n'
	+'while (WiFi.status() != WL_CONNECTED) {\n'
	+'delay(500);\n'
	+'Serial.print(".");\n'
	+'}\n'
	+'Serial.println("Local IP:");\n'
	+'Serial.print(WiFi.localIP());\n'
	return "";
};

//GET请求
Blockly.Arduino.http_get = function () { 
	var api= Blockly.Arduino.valueToCode(this, 'api', Blockly.Arduino.ORDER_ATOMIC);
	var branch = Blockly.Arduino.statementToCode(this, 'success');
	branch = branch.replace(/(^\s*)|(\s*$)/g, "");
	var branch1 = Blockly.Arduino.statementToCode(this, 'failure');
	branch1 = branch1.replace(/(^\s*)|(\s*$)/g, "");
	Blockly.Arduino.definitions_['include_WiFi'] = '#include <WiFi.h>';
	Blockly.Arduino.definitions_['include_HTTPClient'] = '#include <HTTPClient.h>';
	var code='if (WiFi.status() == WL_CONNECTED) {\nHTTPClient http;\nhttp.begin('+ api+');\nint httpCode = http.GET();\nif (httpCode > 0) {\nString Request_result = http.getString();\n' + branch + '\n}\nelse {\n' + branch1 + '\n} \nhttp.end();\n}\n';
	return code;
};
  //esp_now发送数据
  Blockly.Arduino.esp_now_send = function () {
  	var mac= Blockly.Arduino.valueToCode(this, 'mac', Blockly.Arduino.ORDER_ATOMIC);
  	var data= Blockly.Arduino.valueToCode(this, 'data', Blockly.Arduino.ORDER_ATOMIC);
  	mac = ':' + mac + '';
  	mac = mac.replace(/\"/g, "").replace(/\:/g,",0x");
  	mac = ':' + mac + '';
  	mac = mac.replace(/\:,/g, "");
  	Blockly.Arduino.definitions_['include_esp_now'] ='#include <esp_now.h>';
  	Blockly.Arduino.definitions_['include_WiFi'] ='#include <WiFi.h>';
  	Blockly.Arduino.definitions_['var_declare_struct_message'] ='typedef struct struct_message {\n  char a[250];\n} struct_message;\nstruct_message myData;\n';
  	Blockly.Arduino.definitions_['var_declare_broadcastAddress'] ='uint8_t broadcastAddress[] = {' + mac + '};\n';
  	Blockly.Arduino.setups_['setups_WiFi.mode'] = 'WiFi.mode(WIFI_STA);\n esp_now_init();';
  	Blockly.Arduino.setups_['var_declare_esp_now_peer_info_t'] = 'esp_now_peer_info_t peerInfo;';  	
  	Blockly.Arduino.setups_['setups_memcpy_peerInfo'] = 'memcpy(peerInfo.peer_addr, broadcastAddress, 6);';
  	Blockly.Arduino.setups_['var_declare_peerInfo_channel'] = 'peerInfo.channel = 0;';
  	Blockly.Arduino.setups_['var_declare_peerInfo_encrypt'] = 'peerInfo.encrypt = false;';
  	Blockly.Arduino.setups_['setups_esp_now_add_peer'] = 'esp_now_add_peer(&peerInfo);';
  	var code='  String(' + data + ').toCharArray(myData.a, sizeof(myData.a));\n  esp_err_t result = esp_now_send(broadcastAddress, (uint8_t *) &myData, sizeof(myData));\n';
  	return code;
  };

//esp_now接收数据
Blockly.Arduino.esp_now_receive = function () {
	var branch = Blockly.Arduino.statementToCode(this, 'receive_data');
	branch = branch.replace(/(^\s*)|(\s*$)/g, "");
	Blockly.Arduino.definitions_['include_esp_now'] ='#include <esp_now.h>';
	Blockly.Arduino.definitions_['include_WiFi'] ='#include <WiFi.h>';
	Blockly.Arduino.definitions_['var_declare_struct_message'] ='typedef struct struct_message {\n  char a[250];\n} struct_message;\nstruct_message myData;\n';
	Blockly.Arduino.definitions_['var_declare_function_OnDataRecv'] ='void OnDataRecv(const uint8_t * mac, const uint8_t *incomingData, int len) {\n  memcpy(&myData, incomingData, sizeof(myData));\n String mydata = String(myData.a);\n  vTaskDelay(1);\n' + branch + '\n}\n';
	Blockly.Arduino.setups_['setups_WiFi.mode'] = 'WiFi.mode(WIFI_STA);\n esp_now_init();';
	Blockly.Arduino.setups_['setups_esp_now_register_recv_cb'] = 'esp_now_register_recv_cb(OnDataRecv);\n';
	var code='';
	return code;
};

//Find MAC
Blockly.Arduino.mac_address = function () {
	Blockly.Arduino.definitions_['include_WiFi'] ='#include <WiFi.h>\n';
	Blockly.Arduino.setups_['setup_serial_9600'] = 'Serial.begin(9600);';
	Blockly.Arduino.setups_['set_WiFi_mode'] = 'WiFi.mode(WIFI_MODE_STA);\n';
	Blockly.Arduino.setups_['Serial_println_macAddress'] = 'Serial.println(WiFi.macAddress());\n';
	var code='';
	return code;
};
