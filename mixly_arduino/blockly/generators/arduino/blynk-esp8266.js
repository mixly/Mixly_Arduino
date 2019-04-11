'use strict';
goog.provide('Blockly.Arduino.blynk');
goog.require('Blockly.Arduino');
var blynk_timer=false;
//物联网-一键配网
Blockly.Arduino.blynk_smartconfig = function() {
	var auth_key = Blockly.Arduino.valueToCode(this, 'auth_key', Blockly.Arduino.ORDER_ATOMIC);
	var server_add = Blockly.Arduino.valueToCode(this, 'server_add', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['include_ESP8266WiFi'] ='#include <ESP8266WiFi.h>\n';
	Blockly.Arduino.definitions_['include_BlynkSimpleEsp8266'] ='#include <BlynkSimpleEsp8266.h>';
	Blockly.Arduino.definitions_['include_TimeLib'] ='#include <TimeLib.h>';
	Blockly.Arduino.definitions_['include_WidgetRTC'] ='#include <WidgetRTC.h>';
	Blockly.Arduino.definitions_['define_BLYNK_PRINT']='#define BLYNK_PRINT Serial';
	Blockly.Arduino.definitions_['var_declare_auth_key'] ='char auth[] = '+auth_key+';';
	Blockly.Arduino.setups_['setup_smartconfig'] = 'Serial.begin(9600);\nWiFi.mode(WIFI_STA);\nint cnt = 0;\nwhile (WiFi.status() != WL_CONNECTED) {\ndelay(500); \nSerial.print("."); \nif (cnt++ >= 10) {\nWiFi.beginSmartConfig();\nwhile (1) {\ndelay(1000);\nif (WiFi.smartConfigDone()) {\nSerial.println();\nSerial.println("SmartConfig: Success");\nbreak;\n}\nSerial.print("|");\n}\n}\n}  WiFi.printDiag(Serial);\n';
	if(isNaN(server_add.charAt(2)))
	{
		Blockly.Arduino.setups_['setup_smartconfig'] += ' Blynk.config(auth,'+server_add+',8080);';
	}
	else
	{
		server_add = server_add.replace(/\"/g, "");
		Blockly.Arduino.setups_['setup_smartconfig'] += ' Blynk.config(auth,'+'IPAddress('+server_add+'),8080);';
	}
	var code="Blynk.run();";
	return code;
};

//物联网-wifi信息
Blockly.Arduino.blynk_server = function() {
	var wifi_ssid = Blockly.Arduino.valueToCode(this, 'wifi_ssid', Blockly.Arduino.ORDER_ATOMIC);
	var wifi_pass = Blockly.Arduino.valueToCode(this, 'wifi_pass', Blockly.Arduino.ORDER_ATOMIC);
	var auth_key = Blockly.Arduino.valueToCode(this, 'auth_key', Blockly.Arduino.ORDER_ATOMIC);
	var server_add = Blockly.Arduino.valueToCode(this, 'server_add', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['define_BLYNK_PRINT']='#define BLYNK_PRINT Serial';
	Blockly.Arduino.definitions_['include_ESP8266WiFi'] ='#include <ESP8266WiFi.h>';
	Blockly.Arduino.definitions_['include_BlynkSimpleEsp8266'] ='#include <BlynkSimpleEsp8266.h>';
	Blockly.Arduino.definitions_['include_TimeLib'] ='#include <TimeLib.h>';
	Blockly.Arduino.definitions_['include_WidgetRTC'] ='#include <WidgetRTC.h>';

	Blockly.Arduino.definitions_['var_declare_auth_key'] ='char auth[] = '+auth_key+';';
	Blockly.Arduino.definitions_['var_declare_wifi_ssid'] ='char ssid[] = '+wifi_ssid+';';
	Blockly.Arduino.definitions_['var_declare_wifi_pass'] ='char pass[] = '+wifi_pass+';';
	if(isNaN(server_add.charAt(2)))
	{
		Blockly.Arduino.setups_['setup_Blynk.begin'] = ' Serial.begin(9600);\n Blynk.begin(auth, ssid, pass,'+server_add+',8080);';
	}
	else
	{
		server_add = server_add.replace(/\"/g, "");
		Blockly.Arduino.setups_['setup_Blynk.begin'] = ' Serial.begin(9600);\n Blynk.begin(auth, ssid, pass,'+'IPAddress('+server_add+'),8080);';
	}
	var code="Blynk.run();";
	return code;
};
