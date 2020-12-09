'use strict';
goog.provide('Blockly.Arduino.ethernet');
goog.require('Blockly.Arduino');
Blockly.Arduino.WIFI_info = function() {
	var SSID = Blockly.Arduino.valueToCode(this, 'SSID', Blockly.Arduino.ORDER_ATOMIC);
	var PWD = Blockly.Arduino.valueToCode(this, 'PWD', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['include_WiFi'] ='#include <WiFi.h>';
	Blockly.Arduino.setups_['setup_WiFi_begin'] = 'WiFi.begin('+SSID+', '+PWD+');\n'
	+'  while (WiFi.status() != WL_CONNECTED) {\n'
	+'    delay(500);\n'
	+'    Serial.print(".");\n'
	+'  }\n'
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
	var code='if (WiFi.status() == WL_CONNECTED) {\n'
            +'  HTTPClient http;\n'
            +'  http.begin('+ api+');\n'
            +'  int httpCode = http.GET();\n'
            +'  if (httpCode > 0) {\n'
            +'    String Request_result = http.getString();\n'
            +'    '+branch + '\n'
            +'  }\n'
            +'  else {\n'
            +'    '+branch1 + '\n'
            +'  }\n'
            +'  http.end();\n'
            +'}\n';
	return code;
};
  //esp_now发送数据
  Blockly.Arduino.esp_now_send = function () {
    var serial_number = Math.ceil(Math.random() * 100000);
    var mac= Blockly.Arduino.valueToCode(this, 'mac', Blockly.Arduino.ORDER_ATOMIC);
    var data= Blockly.Arduino.valueToCode(this, 'data', Blockly.Arduino.ORDER_ATOMIC);
    var branch = Blockly.Arduino.statementToCode(this, 'success');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");
    var branch1 = Blockly.Arduino.statementToCode(this, 'failure');
    branch1 = branch1.replace(/(^\s*)|(\s*$)/g, "");
    mac = ':' + mac + '';
    mac = mac.replace(/\"/g, "").replace(/\:/g,",0x");
    mac = ':' + mac + '';
    mac = mac.replace(/\:,/g, "");
    Blockly.Arduino.definitions_['include_esp_now'] ='#include <esp_now.h>';
    Blockly.Arduino.definitions_['include_WiFi'] ='#include <WiFi.h>';
    Blockly.Arduino.definitions_['var_declare_struct_message'] ='typedef struct struct_message {\n'
                                                               +'  char a[250];\n'
                                                               +'} struct_message;\n'
                                                               +'struct_message myData;\n';
    Blockly.Arduino.definitions_['var_declare_function_OnDataSent'] ='void OnDataSent(const uint8_t *mac_addr, esp_now_send_status_t status) {\n'
                                                     +'  char macStr[18];'
                                                     +'  Serial.print("Packet to: ");\n'
                                                     +'  snprintf(macStr, sizeof(macStr), "%02x:%02x:%02x:%02x:%02x:%02x",\n'
                                                     +'  mac_addr[0], mac_addr[1], mac_addr[2], mac_addr[3], mac_addr[4], mac_addr[5]);\n'
                                                     +'  Serial.print(macStr);\n'
                                                     +'  Serial.print(" send status:\t");\n'
                                                     +'  Serial.println(status == ESP_NOW_SEND_SUCCESS ? "Delivery Success" : "Delivery Fail");\n'
                                                     +'}\n';
    Blockly.Arduino.definitions_['var_declare_broadcastAddress'+ serial_number] ='uint8_t broadcastAddress' + serial_number + '[] = {' + mac + '};\n';                                              
    Blockly.Arduino.setups_['var_declare_esp_now'] = '  WiFi.mode(WIFI_STA);\n'
                                                    +'  if (esp_now_init() != ESP_OK) {\n'
                                                    +'    Serial.println("Error initializing ESP-NOW");\n'
                                                    +'    return;\n'
                                                    +'  }\n'
                                                    +'  esp_now_register_send_cb(OnDataSent);\n'
                                                    +'  esp_now_peer_info_t peerInfo;\n'
                                                    +'  peerInfo.channel = 0;  \n'
                                                    +'  peerInfo.encrypt = false;\n';
    Blockly.Arduino.setups_['var_declare_esp_now_send'+ serial_number] = 'memcpy(peerInfo.peer_addr, broadcastAddress' + serial_number + ', 6);\n'
                                                    +'  if (esp_now_add_peer(&peerInfo) != ESP_OK){\n'
                                                    +'    Serial.println("Failed to add peer");\n'
                                                    +'    return;\n'
                                                    +'  }';                                                 
    var code='String(' + data + ').toCharArray(myData.a, sizeof(myData.a));\n'
            +'esp_err_t result' + serial_number + ' = esp_now_send(broadcastAddress' + serial_number + ', (uint8_t *) &myData, sizeof(myData));\n'
            +'if (result' + serial_number + ' == ESP_OK) {\n'
            +'  ' + branch + '\n'
            +'}\n'
            +'else {\n'
            +'  ' + branch1 + '\n'
            +'}\n';                                                
    return code;
};

//esp_now接收数据
Blockly.Arduino.esp_now_receive = function () {
	var branch = Blockly.Arduino.statementToCode(this, 'receive_data');
	branch = branch.replace(/(^\s*)|(\s*$)/g, "");
	Blockly.Arduino.definitions_['include_esp_now'] ='#include <esp_now.h>';
	Blockly.Arduino.definitions_['include_WiFi'] ='#include <WiFi.h>';
	Blockly.Arduino.definitions_['var_declare_struct_message'] ='typedef struct struct_message {\n'
                                                               +'  char a[250];\n'
                                                               +'} struct_message;\nstruct_message myData;\n';
	Blockly.Arduino.definitions_['var_declare_function_OnDataRecv'] ='void OnDataRecv(const uint8_t * mac, const uint8_t *incomingData, int len) {\n'
                                                                    +'  memcpy(&myData, incomingData, sizeof(myData));\n'
                                                                    +'  String mydata = String(myData.a);\n'
                                                                    +'  vTaskDelay(1);\n'
                                                                    +'  '+ branch + '\n'
                                                                    +'}\n';
	Blockly.Arduino.setups_['setups_WiFi.mode'] = 'WiFi.mode(WIFI_STA);\n  esp_now_init();';
	Blockly.Arduino.setups_['setups_esp_now_register_recv_cb'] = 'esp_now_register_recv_cb(OnDataRecv);\n';
	var code='';
	return code;
};
