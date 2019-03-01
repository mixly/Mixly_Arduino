'use strict';
goog.provide('Blockly.Arduino.blynk');
goog.require('Blockly.Arduino');
var blynk_timer=false;
//物联网-授权码
Blockly.Arduino.blynk_iot_auth = function() {
	return '';
};
Blockly.Arduino.blynk_QR = function() {
	return "";
};
//物联网-一键配网
Blockly.Arduino.blynk_smartconfig_esp8266 = function() {
	var auth_key = Blockly.Arduino.valueToCode(this, 'auth_key', Blockly.Arduino.ORDER_ATOMIC);
	var server_add = Blockly.Arduino.valueToCode(this, 'server_add', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['defineBLYNK'] ='#define BLYNK_PRINT Serial\n#include <ESP8266WiFi.h>\n#include <BlynkSimpleEsp8266.h>\n#include <TimeLib.h>\n#include <WidgetRTC.h>';
	Blockly.Arduino.definitions_['auth_key'] ='char auth[] = '+auth_key+';';
	Blockly.Arduino.setups_['setup_smartconfig'] = 'Serial.begin(9600);\nWiFi.mode(WIFI_STA);\nint cnt = 0;\nwhile (WiFi.status() != WL_CONNECTED) {\ndelay(500); \nSerial.print("."); \nif (cnt++ >= 10) {\nWiFi.beginSmartConfig();\nwhile (1) {\ndelay(1000);\nif (WiFi.smartConfigDone()) {\nSerial.println();\nSerial.println("SmartConfig: Success");\nbreak;\n}\nSerial.print("|");\n}\n}\n}  WiFi.printDiag(Serial);\n';
	if(isNaN(server_add.charAt(2)))
	{
		Blockly.Arduino.setups_['setup_smartconfig'] += ' Blynk.config(auth,'+server_add+',8080);';}
		else
		{
			server_add = server_add.replace(/\"/g, "");
			Blockly.Arduino.setups_['setup_smartconfig'] += ' Blynk.config(auth,'+'IPAddress('+server_add+'),8080);';
		}
			var code="Blynk.run();\n";
		return code;
	};
	//物联网-一键配网
Blockly.Arduino.blynk_smartconfig_esp32 = function() {
	var auth_key = Blockly.Arduino.valueToCode(this, 'auth_key', Blockly.Arduino.ORDER_ATOMIC);
	var server_add = Blockly.Arduino.valueToCode(this, 'server_add', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['defineBLYNK'] ='#define BLYNK_PRINT SwSerial\n#include <WiFi.h>\n#include <WiFiClient.h>\n#include <BlynkSimpleEsp32.h>\n#include <TimeLib.h>\n#include <WidgetRTC.h>';
	Blockly.Arduino.definitions_['auth_key'] ='char auth[] = '+auth_key+';';
	Blockly.Arduino.setups_['setup_smartconfig'] = 'Serial.begin(9600);\nWiFi.mode(WIFI_STA);\nint cnt = 0;\nwhile (WiFi.status() != WL_CONNECTED) {\ndelay(500); \nSerial.print("."); \nif (cnt++ >= 10) {\nWiFi.beginSmartConfig();\nwhile (1) {\ndelay(1000);\nif (WiFi.smartConfigDone()) {\nSerial.println();\nSerial.println("SmartConfig: Success");\nbreak;\n}\nSerial.print("|");\n}\n}\n}  WiFi.printDiag(Serial);\n';
	if(isNaN(server_add.charAt(2)))
	{
		Blockly.Arduino.setups_['setup_smartconfig'] += ' Blynk.config(auth,'+server_add+',8080);';}
		else
		{
			server_add = server_add.replace(/\"/g, "");
			Blockly.Arduino.setups_['setup_smartconfig'] += ' Blynk.config(auth,'+'IPAddress('+server_add+'),8080);';
		}
			var code="Blynk.run();\n";
		return code;
	};
//物联网-wifi信息
Blockly.Arduino.blynk_server_esp8266 = function() {
	var wifi_ssid = Blockly.Arduino.valueToCode(this, 'wifi_ssid', Blockly.Arduino.ORDER_ATOMIC);
	var wifi_pass = Blockly.Arduino.valueToCode(this, 'wifi_pass', Blockly.Arduino.ORDER_ATOMIC);
	var auth_key = Blockly.Arduino.valueToCode(this, 'auth_key', Blockly.Arduino.ORDER_ATOMIC);
	var server_add = Blockly.Arduino.valueToCode(this, 'server_add', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['defineBLYNK'] ='#define BLYNK_PRINT Serial\n#include <ESP8266WiFi.h>\n#include <BlynkSimpleEsp8266.h>\n#include <TimeLib.h>\n#include <WidgetRTC.h>';
	Blockly.Arduino.definitions_['auth_key'] ='char auth[] = '+auth_key+';';
	Blockly.Arduino.definitions_['wifi_ssid'] ='char ssid[] = '+wifi_ssid+';';
	Blockly.Arduino.definitions_['wifi_pass'] ='char pass[] = '+wifi_pass+';';
	if(isNaN(server_add.charAt(2)))
	{
		Blockly.Arduino.setups_['setup_Blynk.begin'] = ' Serial.begin(9600);\n Blynk.begin(auth, ssid, pass,'+server_add+',8080);';}
		else
		{
			server_add = server_add.replace(/\"/g, "");
			Blockly.Arduino.setups_['setup_Blynk.begin'] = ' Serial.begin(9600);\n Blynk.begin(auth, ssid, pass,'+'IPAddress('+server_add+'),8080);';
		}
		var code="Blynk.run();\n";
		return code;
	};
	//物联网-wifi信息
Blockly.Arduino.blynk_server_esp32 = function() {
	var wifi_ssid = Blockly.Arduino.valueToCode(this, 'wifi_ssid', Blockly.Arduino.ORDER_ATOMIC);
	var wifi_pass = Blockly.Arduino.valueToCode(this, 'wifi_pass', Blockly.Arduino.ORDER_ATOMIC);
	var auth_key = Blockly.Arduino.valueToCode(this, 'auth_key', Blockly.Arduino.ORDER_ATOMIC);
	var server_add = Blockly.Arduino.valueToCode(this, 'server_add', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['defineBLYNK'] ='#define BLYNK_PRINT SwSerial\n#include <WiFi.h>\n#include <WiFiClient.h>\n#include <BlynkSimpleEsp32.h>\n#include <TimeLib.h>\n#include <WidgetRTC.h>';
	Blockly.Arduino.definitions_['auth_key'] ='char auth[] = '+auth_key+';';
	Blockly.Arduino.definitions_['wifi_ssid'] ='char ssid[] = '+wifi_ssid+';';
	Blockly.Arduino.definitions_['wifi_pass'] ='char pass[] = '+wifi_pass+';';
	if(isNaN(server_add.charAt(2)))
	{
		Blockly.Arduino.setups_['setup_Blynk.begin'] = ' Serial.begin(9600);\n Blynk.begin(auth, ssid, pass,'+server_add+',8080);';}
		else
		{
			server_add = server_add.replace(/\"/g, "");
			Blockly.Arduino.setups_['setup_Blynk.begin'] = ' Serial.begin(9600);\n Blynk.begin(auth, ssid, pass,'+'IPAddress('+server_add+'),8080);';
		}
		var code="Blynk.run();\n";
		return code;
	};
//物联网-wifi信息
Blockly.Arduino.blynk_usb_server = function() {
	var auth_key = Blockly.Arduino.valueToCode(this, 'auth_key', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['defineBLYNK'] ='#define BLYNK_PRINT DebugSerial\n#include <SoftwareSerial.h>\nSoftwareSerial DebugSerial(2, 3); // RX, TX\n#include <BlynkSimpleStream.h>\n';
	Blockly.Arduino.definitions_['auth_key'] ='char auth[] = '+auth_key+';';
	Blockly.Arduino.setups_['setup_Blynk.begin'] = ' DebugSerial.begin(9600);\n Serial.begin(9600);\n  Blynk.begin(Serial, auth);';		
		var code="Blynk.run();\n";
	return code;
};

//物联网-发送数据到app
Blockly.Arduino.blynk_iot_push_data = function() {
	Blockly.Arduino.definitions_['defineBLYNK'] ='#define BLYNK_PRINT Serial\n#include <ESP8266WiFi.h>\n#include <BlynkSimpleEsp8266.h>\n#include <TimeLib.h>\n#include <WidgetRTC.h>';
	var Vpin = this.getFieldValue('Vpin');
	var data = Blockly.Arduino.valueToCode(this, 'data', Blockly.Arduino.ORDER_ATOMIC);
	var code='Blynk.virtualWrite('+Vpin+','+data+' );\n ';
	return code;
};

//从app接收数据
Blockly.Arduino.blynk_iot_get_data = function() {
	Blockly.Arduino.definitions_['defineBLYNK'] ='#define BLYNK_PRINT Serial\n#include <ESP8266WiFi.h>\n#include <BlynkSimpleEsp8266.h>\n#include <TimeLib.h>\n#include <WidgetRTC.h>';
  // Define a procedure with a return value.
  var Vpin = this.getFieldValue('Vpin');
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
  	args[x] = Blockly.Arduino.valueToCode(this, 'ARG' + x,Blockly.Arduino.ORDER_NONE) || 'null';
  }
  var code =  '(a' + args.join(', ') + ');\n';
  var vartype="";
  var branch = Blockly.Arduino.statementToCode(this, 'STACK');
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
  	branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,'\'' + this.id + '\'') + branch;
  }
  var type=this.getFieldValue('TYPE');
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
  	args[x] = this.argumentstype_[x]+ ' '+ Blockly.Arduino.variableDB_.getName(this.arguments_[x],Blockly.Variables.NAME_TYPE);
  }
  var GetDataCode="";
  if(this.arguments_.length==1)
  {
  	GetDataCode=Blockly.Arduino.variableDB_.getName(this.arguments_[0],Blockly.Variables.NAME_TYPE);
  	if(this.argumentstype_[0]=="int")
  		GetDataCode+= "= param.asInt();\n"
  	else if(this.argumentstype_[0]=="String") 
  		GetDataCode+= "= param.asStr();\n"
  	else if(this.argumentstype_[0]=="long") 
  		GetDataCode+= "= param.asDouble();\n"
  	else if(this.argumentstype_[0]=="float") 
  		GetDataCode+= "= param.asFloat();\n"
  	else if(this.argumentstype_[0]=="boolean") 
  		GetDataCode+= "= param.asInt();\n"
  	else if(this.argumentstype_[0]=="byte") 
  		GetDataCode+= "= param.asStr();\n"
  	else if(this.argumentstype_[0]=="char") 
  		GetDataCode+= "= param.asStr();\n"
  }
  else
  {
  	for (var x = 0; x < this.arguments_.length; x++) {
  		args[x] = this.argumentstype_[x]+ ' '+ Blockly.Arduino.variableDB_.getName(this.arguments_[x],Blockly.Variables.NAME_TYPE);

  		GetDataCode+=Blockly.Arduino.variableDB_.getName(this.arguments_[x],Blockly.Variables.NAME_TYPE);
  		if(this.argumentstype_[x]=="int")
  			GetDataCode+= "= param["+x+"].asInt();\n"
  		else if(this.argumentstype_[x]=="String") 
  			GetDataCode+= "= param["+x+"].asStr();\n"
  		else if(this.argumentstype_[x]=="long") 
  			GetDataCode+= "= param["+x+"].asDouble();\n"
  		else if(this.argumentstype_[x]=="float") 
  			GetDataCode+= "= param["+x+"].asFloat();\n"
  		else if(this.argumentstype_[x]=="boolean") 
  			GetDataCode+= "= param["+x+"].asInt();\n"
  		else if(this.argumentstype_[x]=="byte") 
  			GetDataCode+= "= param["+x+"].asStr();\n"
  		else if(this.argumentstype_[x]=="char") 
  			GetDataCode+= "= param["+x+"].asStr();\n"
  	}	
  }
  if(this.arguments_.length>0)
  	Blockly.Arduino.definitions_[args] = args.join(';\n')+";";
  var code =' BLYNK_WRITE('+ Vpin+ ') {\n' +GetDataCode+
  branch + '}\n';
 // var code =  'BLYNK_WRITE(' + Vpin+ ') {\n'+variable+" = param.as"+datatype+"();\n"+branch+'}\n';
 code = Blockly.Arduino.scrub_(this, code);
 Blockly.Arduino.definitions_[Vpin] = code;
 return null;
};

//blynk 定时器
Blockly.Arduino.Blynk_iot_timer = function () {
	Blockly.Arduino.definitions_['defineBLYNK'] ='#define BLYNK_PRINT Serial\n#include <ESP8266WiFi.h>\n#include <BlynkSimpleEsp8266.h>\n#include <TimeLib.h>\n#include <WidgetRTC.h>';
	Blockly.Arduino.definitions_['BlynkTimer'] = 'BlynkTimer timer;';
	var timerNo = this.getFieldValue('timerNo');
	var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_ATOMIC);
	var funcName = 'myTimerEvent'+timerNo;
	var branch = Blockly.Arduino.statementToCode(this, 'DO');
	var code = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
	Blockly.Arduino.definitions_[funcName] = code;
	Blockly.Arduino.setups_[funcName] = 'timer.setInterval('+ time+'L, '+funcName+');\n';

return "timer.run();\n";
};

//blynk 硬件已连接
Blockly.Arduino.Blynk_iot_BLYNK_CONNECTED = function () {
	Blockly.Arduino.definitions_['defineBLYNK'] ='#define BLYNK_PRINT Serial\n#include <ESP8266WiFi.h>\n#include <BlynkSimpleEsp8266.h>\n#include <TimeLib.h>\n#include <WidgetRTC.h>';
	var funcName = 'BLYNK_CONNECTED';
	var branch = Blockly.Arduino.statementToCode(this, 'DO');
	var code =  funcName + '() {\n' + branch + '}\n';
	Blockly.Arduino.definitions_[funcName] = code;
};

//blynk APP已连接
Blockly.Arduino.Blynk_iot_BLYNK_APP_CONNECTED = function () {
	Blockly.Arduino.definitions_['defineBLYNK'] ='#define BLYNK_PRINT Serial\n#include <ESP8266WiFi.h>\n#include <BlynkSimpleEsp8266.h>\n#include <TimeLib.h>\n#include <WidgetRTC.h>';
	var funcName = 'BLYNK_APP_CONNECTED';
	var branch = Blockly.Arduino.statementToCode(this, 'DO');
	var code =  funcName + '() {\n' + branch + '}\n';
	Blockly.Arduino.definitions_[funcName] = code;
};
//blynk APP离线
Blockly.Arduino.Blynk_iot_BLYNK_APP_DISCONNECTED = function () {
	Blockly.Arduino.definitions_['defineBLYNK'] ='#define BLYNK_PRINT Serial\n#include <ESP8266WiFi.h>\n#include <BlynkSimpleEsp8266.h>\n#include <TimeLib.h>\n#include <WidgetRTC.h>';
	var funcName = 'BLYNK_APP_DISCONNECTED';
	var branch = Blockly.Arduino.statementToCode(this, 'DO');
	var code =  funcName + '() {\n' + branch + '}\n';
	Blockly.Arduino.definitions_[funcName] = code;
};
//blynk 同步所有管脚状态
Blockly.Arduino.Blynk_iot_BLYNK_syncAll = function () {
	var code =    'Blynk.syncAll();\n';
	return code;
};
//物联网-发送数据到app
Blockly.Arduino.blynk_iot_syncVirtual = function() {
	var Vpin = this.getFieldValue('Vpin');
	var code='Blynk.syncVirtual('+Vpin+');\n ';
	return code;
};

//LED组件颜色&开关
Blockly.Arduino.blynk_iot_WidgetLED_COLOR=function(){
	var Vpin = this.getFieldValue('Vpin');
	var colour_rgb_led_color = this.getFieldValue('RGB_LED_COLOR');
	var dropdown_stat = this.getFieldValue('STAT');
	Blockly.Arduino.definitions_['WidgetLED'+Vpin] = 'WidgetLED led'+Vpin+'('+Vpin+');';
	var code = 'led'+Vpin+'.setColor("'+colour_rgb_led_color+'");\n';
	//window.alert(dropdown_stat);
	if(dropdown_stat=="HIGH")
		code+='led'+Vpin+'.on();\n';
	else if(dropdown_stat=="LOW")
		code+='led'+Vpin+'.off();\n';
	return code;
};

//LED组件颜色&亮度
Blockly.Arduino.blynk_iot_WidgetLED_VALUE=function(){
	var Vpin = this.getFieldValue('Vpin');
	var colour_rgb_led_color = this.getFieldValue('RGB_LED_COLOR');
	var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['WidgetLED'+Vpin] = 'WidgetLED led'+Vpin+'('+Vpin+');';
	var code = 'led'+Vpin+'.setColor("'+colour_rgb_led_color+'");\n';
	code+='led'+Vpin+'.setValue('+value_num+');';
	return code;
};

//红外控制空调
Blockly.Arduino.blynk_iot_ir_send_ac=function(){
	var AC_TYPE = this.getFieldValue('AC_TYPE');
	var AC_POWER = this.getFieldValue('AC_POWER');
	var AC_MODE = this.getFieldValue('AC_MODE');
	var AC_FAN = this.getFieldValue('AC_FAN');
	var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
	var AC_TEMP = Blockly.Arduino.valueToCode(this, 'AC_TEMP', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['include_Arduino'] = '#ifndef UNIT_TEST\n#include <Arduino.h>\n#endif';
	Blockly.Arduino.definitions_['IRremoteESP8266'] = '#include <IRremoteESP8266.h>\n#include <IRsend.h>';
	Blockly.Arduino.definitions_['include'+AC_TYPE] = '#include <ir_'+AC_TYPE+'.h>';
	Blockly.Arduino.definitions_['define_IR_LED'+dropdown_pin] = '#define IR_LED '+dropdown_pin;
	Blockly.Arduino.definitions_['IR'+AC_TYPE+'AC'] = 'IR'+AC_TYPE+'AC '+AC_TYPE+'AC(IR_LED); ';
	Blockly.Arduino.setups_['setup'+AC_TYPE] = AC_TYPE+'AC.begin();';
	var code = AC_TYPE+'AC.setPower('+AC_POWER+');\n';
	code+=AC_TYPE+'AC.setFan('+AC_FAN+');\n';
	code+=AC_TYPE+'AC.setMode('+AC_MODE+');\n';
	code+=AC_TYPE+'AC.setTemp('+AC_TEMP+');\n';
	code+=AC_TYPE+'AC.send();\n';
	return code;
};

//红外接收
Blockly.Arduino.blynk_iot_ir_recv_raw = function () {
	var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['include_IRremote'] = '#ifndef UNIT_TEST\n#include <Arduino.h>\n#endif\n#include <IRremoteESP8266.h>\n#include <IRrecv.h>\n#include <IRutils.h>\n#if DECODE_AC\n#include <ir_Daikin.h>\n#include <ir_Fujitsu.h>\n#include <ir_Gree.h>\n#include <ir_Haier.h>\n#include <ir_Kelvinator.h>\n#include <ir_Midea.h>\n#include <ir_Toshiba.h>\n#endif \n';
	Blockly.Arduino.definitions_['#define RECV_PIN' + dropdown_pin] = '#define RECV_PIN ' + dropdown_pin +'\n';
	Blockly.Arduino.definitions_['#define BAUD_RATE' ] = '#define BAUD_RATE 115200\n';
	Blockly.Arduino.definitions_['#define CAPTURE_BUFFER_SIZE'] = '#define CAPTURE_BUFFER_SIZE 1024\n#if DECODE_AC\n#define TIMEOUT 50U\n#else\n#define TIMEOUT 15U  \n#endif\n#define MIN_UNKNOWN_SIZE 12\n#define IN_UNKNOWN_SIZE 12\nIRrecv irrecv(RECV_PIN, CAPTURE_BUFFER_SIZE, TIMEOUT, true);\ndecode_results results;';
	Blockly.Arduino.setups_['Serial.begin' ] = ' Serial.begin(BAUD_RATE, SERIAL_8N1, SERIAL_TX_ONLY);\n while(!Serial)\ndelay(50);\n#if DECODE_HASH\n  irrecv.setUnknownThreshold(MIN_UNKNOWN_SIZE);\n#endif  \n  irrecv.enableIRIn();  ';
	var code = "if (irrecv.decode(&results))  {\n"
	code += ' uint32_t now = millis();\n';
	code += ' dumpACInfo(&results);\n'
	code += 'Serial.println(resultToSourceCode(&results));}\n';
	var funcode = 'void dumpACInfo(decode_results *results) {\n'
	+'String description="";\n#if DECODE_DAIKIN\nif(results->decode_type == DAIKIN){\nIRDaikinESP ac(0);\n'
	+'ac.setRaw(results->state);\ndescription=ac.toString();\n}\n#endif\n#if DECODE_FUJITSU_AC\nif(results->decode_type==FUJITSU_AC){\nIRFujitsuAC ac(0);\nac.setRaw(results->state, results->bits / 8);\ndescription = ac.toString();\n}\n#endif\n#if DECODE_KELVINATOR\nif(results->decode_type == KELVINATOR) {\nIRKelvinatorAC ac(0);\nac.setRaw(results->state);\ndescription = ac.toString();\n}\n#endif\n#if DECODE_TOSHIBA_AC\nif(results->decode_type == TOSHIBA_AC){\nIRToshibaAC ac(0);\nac.setRaw(results->state);\n    description = ac.toString();\n  }\n#endif\n#if DECODE_GREE\nif (results->decode_type == GREE){\nIRGreeAC ac(0);\nac.setRaw(results->state);\ndescription = ac.toString();\n}\n#endif\n#if DECODE_MIDEA\nif(results->decode_type == MIDEA){\nIRMideaAC ac(0);\nac.setRaw(results->value);\ndescription=ac.toString();\n}\n#endif\n#if DECODE_HAIER_AC\nif(results->decode_type == HAIER_AC) {\nIRHaierAC ac(0);\nac.setRaw(results->state);\ndescription = ac.toString();\n}\n#endif\nif(description != "")\nSerial.println("Mesg Desc.: " + description);\n}\n';
	Blockly.Arduino.definitions_['dumpACInfo'] = funcode;
	return code;
};

//红外发射
Blockly.Arduino.blynk_iot_ir_send = function () {
	var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
	var IR_CODE=this.getFieldValue('IR_CODE');
	var IR_CODE_LENGTH=IR_CODE.match(new RegExp(",", 'g')).length+1;
	var random_num=Math.ceil(Math.random()*100000);
	Blockly.Arduino.definitions_['include_IRremote'] = '#ifndef UNIT_TEST\n#include <Arduino.h>\n#endif\n#include <IRremoteESP8266.h>\n#include <IRsend.h>\n#define IR_LED '+dropdown_pin;
	Blockly.Arduino.definitions_['IRsend irsend'] = 'IRsend irsend(IR_LED);\n';
	Blockly.Arduino.definitions_['var_ir_send'+random_num] = 'uint16_t rawData'+random_num+'['+IR_CODE_LENGTH+'] = {'+IR_CODE+'}';
	Blockly.Arduino.setups_['Serial.begin' ] = ' irsend.begin();\n  Serial.begin(115200, SERIAL_8N1, SERIAL_TX_ONLY);\n';
	var code = 'irsend.sendRaw(rawData'+random_num+', '+IR_CODE_LENGTH+', 38); \n delay(2000);\n';
	return code;
}


//发送邮件
Blockly.Arduino.blynk_email = function() {
	var email_add = Blockly.Arduino.valueToCode(this, 'email_add', Blockly.Arduino.ORDER_ATOMIC);
	var Subject = Blockly.Arduino.valueToCode(this, 'Subject', Blockly.Arduino.ORDER_ATOMIC);
	var content = Blockly.Arduino.valueToCode(this, 'content', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['BLYNK_MAX_SENDBYTES'] ='#define BLYNK_MAX_SENDBYTES 128 \n';
	var code=' Blynk.email('+email_add+', '+Subject+', '+content+');\n';
	return code;
};
//发送通知
Blockly.Arduino.blynk_notify = function() {
	var content = Blockly.Arduino.valueToCode(this, 'content', Blockly.Arduino.ORDER_ATOMIC);
	var code=' Blynk.notify('+content+');\n';
	return code;
};

//物联网-终端组件显示文本
Blockly.Arduino.blynk_terminal = function() {
	var Vpin = this.getFieldValue('Vpin');
	Blockly.Arduino.definitions_['WidgetTerminal'] = 'WidgetTerminal terminal('+Vpin+');\n';
	var content = Blockly.Arduino.valueToCode(this, 'content', Blockly.Arduino.ORDER_ATOMIC);
	var code=' terminal.println('+content+');\n';
	return code;
};

//从终端获取字符串
Blockly.Arduino.blynk_iot_terminal_get = function () {
	var Vpin = this.getFieldValue('Vpin');
	Blockly.Arduino.definitions_['WidgetTerminal'] = 'WidgetTerminal terminal('+Vpin+');\n';
	Blockly.Arduino.definitions_['action']='String action ;';
	var branch = Blockly.Arduino.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格s
    var code = 'BLYNK_WRITE' + '(' +Vpin+'){\naction = param.asStr();\n'+branch;
    code+='\nterminal.flush();\n}';
    Blockly.Arduino.definitions_[Vpin] = code;
};

//视频流
Blockly.Arduino.blynk_videourl = function() {
	var Vpin = this.getFieldValue('Vpin');
	var url = Blockly.Arduino.valueToCode(this, 'url', Blockly.Arduino.ORDER_ATOMIC);
	
	var code='Blynk.setProperty('+Vpin+',"url",'+url+');';
	return code;
};

//桥接授权码
Blockly.Arduino.blynk_bridge_auth = function() {
	var Vpin = this.getFieldValue('Vpin');
	var auth = Blockly.Arduino.valueToCode(this, 'auth', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['bridge1.setAuthToken'] ='WidgetBridge bridge1('+Vpin+');\n';
	var code='bridge1.setAuthToken('+auth+'); \n';
	return code;
};

//桥接数字输出
Blockly.Arduino.blynk_bridge_digitalWrite = function() {
	var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
	var dropdown_stat = Blockly.Arduino.valueToCode(this, 'STAT', Blockly.Arduino.ORDER_ATOMIC);
	var code=' bridge1.digitalWrite('+dropdown_pin+', '+dropdown_stat+');\n';
	return code;
};

//桥接模拟输出
Blockly.Arduino.blynk_bridge_AnaloglWrite = function() {
	var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
	var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
	var code=' bridge1.analogWrite('+dropdown_pin+', '+value_num+');\n';
	return code;
};

//桥接虚拟管脚
Blockly.Arduino.blynk_bridge_VPin = function() {
	var Vpin = this.getFieldValue('Vpin');
	var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
	var code=' bridge1.virtualWrite('+Vpin+', '+value_num+');\n';
	return code;
};

//RTC组件初始化
Blockly.Arduino.blynk_WidgetRTC_init = function() {	
	var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['defineBLYNK'] ='#define BLYNK_PRINT Serial\n#include <ESP8266WiFi.h>\n#include <BlynkSimpleEsp8266.h>\n#include <TimeLib.h>\n#include <WidgetRTC.h>';
	Blockly.Arduino.definitions_['WidgetRTC'] ='WidgetRTC rtc;\n';
	Blockly.Arduino.setups_['setSyncInterval'] = 'setSyncInterval('+value_num+'* 60);';
	var code='rtc.begin(); \n';
	return code;
};

//RTC获取时间
Blockly.Arduino.blynk_WidgetRTC_get_time = function () {
	var timeType = this.getFieldValue('TIME_TYPE');
	var code = timeType +'()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//播放音乐组件
Blockly.Arduino.blynk_iot_playmusic = function () {
	var Vpin = this.getFieldValue('Vpin');
	var branch = Blockly.Arduino.statementToCode(this, 'DO');
	if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
		branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,'\'' + this.id + '\'') + branch;
	}
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格
    var code='BLYNK_WRITE('+Vpin+')\n{\naction = param.asStr();\n'+branch+' \nBlynk.setProperty('+Vpin+', "label", action);}';
    code = Blockly.Arduino.scrub_(this, code);
    Blockly.Arduino.definitions_[Vpin] = code;
};

//gd5800 mp3 控制播放
Blockly.Arduino.GD5800_MP3_CONTROL = function () {
	var rxpin = Blockly.Arduino.valueToCode(this, 'RXPIN', Blockly.Arduino.ORDER_ATOMIC);
	var txpin = Blockly.Arduino.valueToCode(this, 'TXPIN', Blockly.Arduino.ORDER_ATOMIC);
	var CONTROL_TYPE = this.getFieldValue('CONTROL_TYPE');
	Blockly.Arduino.definitions_['defineGD5800'] ='#include <Arduino.h>\n#include <SoftwareSerial.h>\n#include <GD5800_Serial.h>';
	Blockly.Arduino.definitions_['defineGD5800_ mp3'+rxpin+txpin] ='GD5800_Serial mp3'+rxpin+txpin+'('+rxpin+', '+txpin+');';
	Blockly.Arduino.setups_['setup_ mp3'+rxpin+txpin] = ' mp3'+rxpin+txpin+'.begin(9600);';
	var code='mp3'+rxpin+txpin+'.'+CONTROL_TYPE;
	return code;
};


//gd5800 mp3 循环模式
Blockly.Arduino.GD5800_MP3_LOOP_MODE = function () {
	var rxpin = Blockly.Arduino.valueToCode(this, 'RXPIN', Blockly.Arduino.ORDER_ATOMIC);
	var txpin = Blockly.Arduino.valueToCode(this, 'TXPIN', Blockly.Arduino.ORDER_ATOMIC);
	var LOOP_MODE = this.getFieldValue('LOOP_MODE');
	Blockly.Arduino.definitions_['defineGD5800'] ='#include <Arduino.h>\n#include <SoftwareSerial.h>\n#include <GD5800_Serial.h>';
	Blockly.Arduino.definitions_['defineGD5800_ mp3'+rxpin+txpin] ='GD5800_Serial mp3'+rxpin+txpin+'('+rxpin+', '+txpin+');';
	Blockly.Arduino.setups_['setup_ mp3'+rxpin+txpin] = ' mp3'+rxpin+txpin+'.begin(9600);';
	var code='mp3'+rxpin+txpin+'.setLoopMode('+LOOP_MODE+');';
	return code;
};


//gd5800 mp3 EQ模式
Blockly.Arduino.GD5800_MP3_EQ_MODE = function () {
	var rxpin = Blockly.Arduino.valueToCode(this, 'RXPIN', Blockly.Arduino.ORDER_ATOMIC);
	var txpin = Blockly.Arduino.valueToCode(this, 'TXPIN', Blockly.Arduino.ORDER_ATOMIC);
	var EQ_MODE = this.getFieldValue('EQ_MODE');
	Blockly.Arduino.definitions_['defineGD5800'] ='#include <Arduino.h>\n#include <SoftwareSerial.h>\n#include <GD5800_Serial.h>';
	Blockly.Arduino.definitions_['defineGD5800_ mp3'+rxpin+txpin] ='GD5800_Serial mp3'+rxpin+txpin+'('+rxpin+', '+txpin+');';
	Blockly.Arduino.setups_['setup_ mp3'+rxpin+txpin] = ' mp3'+rxpin+txpin+'.begin(9600);';
	var code='mp3'+rxpin+txpin+'.setEqualizer('+EQ_MODE+');';
	return code;
};


//gd5800 mp3 设置音量
Blockly.Arduino.GD5800_MP3_VOL = function () {
	var rxpin = Blockly.Arduino.valueToCode(this, 'RXPIN', Blockly.Arduino.ORDER_ATOMIC);
	var txpin = Blockly.Arduino.valueToCode(this, 'TXPIN', Blockly.Arduino.ORDER_ATOMIC);
	var vol = Blockly.Arduino.valueToCode(this, 'vol', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['defineGD5800'] ='#include <Arduino.h>\n#include <SoftwareSerial.h>\n#include <GD5800_Serial.h>';
	Blockly.Arduino.definitions_['defineGD5800_ mp3'+rxpin+txpin] ='GD5800_Serial mp3'+rxpin+txpin+'('+rxpin+', '+txpin+');';
	Blockly.Arduino.setups_['setup_ mp3'+rxpin+txpin] = ' mp3'+rxpin+txpin+'.begin(9600);';
	var code='mp3'+rxpin+txpin+'.setVolume('+vol+');';
	return code;
};


//gd5800 mp3 播放第N首
Blockly.Arduino.GD5800_MP3_PLAY_NUM = function () {
	var rxpin = Blockly.Arduino.valueToCode(this, 'RXPIN', Blockly.Arduino.ORDER_ATOMIC);
	var txpin = Blockly.Arduino.valueToCode(this, 'TXPIN', Blockly.Arduino.ORDER_ATOMIC);
	var NUM = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['defineGD5800'] ='#include <Arduino.h>\n#include <SoftwareSerial.h>\n#include <GD5800_Serial.h>';
	Blockly.Arduino.definitions_['defineGD5800_ mp3'+rxpin+txpin] ='GD5800_Serial mp3'+rxpin+txpin+'('+rxpin+', '+txpin+');';
	Blockly.Arduino.setups_['setup_ mp3'+rxpin+txpin] = ' mp3'+rxpin+txpin+'.begin(9600);';
	var code='mp3'+rxpin+txpin+'.playFileByIndexNumber('+NUM+');';
	return code;
};

//光线传感器
Blockly.Arduino.blynk_light = function () {
	var Vpin = this.getFieldValue('Vpin');
	var branch = Blockly.Arduino.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格
    var code = 'BLYNK_WRITE' + '(' +Vpin+'){\nint lx = param.asInt();\n'+branch+'\n}';
    Blockly.Arduino.definitions_[Vpin] = code;
};

//重力传感器
Blockly.Arduino.blynk_gravity = function () {
	var Vpin = this.getFieldValue('Vpin');
	var branch = Blockly.Arduino.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格
    var code = 'BLYNK_WRITE' + '(' +Vpin+'){\nint x = param[0].asFloat();\nint y = param[1].asFloat();\nint z = param[2].asFloat();\n'+branch+'\n}';
    Blockly.Arduino.definitions_[Vpin] = code;
};
//加速度传感器
Blockly.Arduino.blynk_acc=Blockly.Arduino.blynk_gravity;

//时间输入
Blockly.Arduino.blynk_time_input_1 = function () {
	var Vpin = this.getFieldValue('Vpin');
	var branch = Blockly.Arduino.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格
    var code = 'BLYNK_WRITE' + '(' +Vpin+'){\n long startTimeInSecs = param[0].asLong();\nint hour =startTimeInSecs/3600;\nint minute=(startTimeInSecs-3600*hour)/60;\n'+branch+'\n}';
    Blockly.Arduino.definitions_[Vpin] = code;
};

Blockly.Arduino.display_rgb_init=function(){
	var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
	var value_ledcount = Blockly.Arduino.valueToCode(this, 'LEDCOUNT', Blockly.Arduino.ORDER_ATOMIC);
	var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness',Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
	Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(' + value_ledcount + ','+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
	Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();\nrgb_display_' + dropdown_rgbpin + '.setBrightness('+Brightness+');';
	return '';
};
Blockly.Arduino.display_rgb=function(){
	var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
	var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
	var value_rvalue = Blockly.Arduino.valueToCode(this, 'RVALUE', Blockly.Arduino.ORDER_ATOMIC);
	var value_gvalue = Blockly.Arduino.valueToCode(this, 'GVALUE', Blockly.Arduino.ORDER_ATOMIC);
	var value_bvalue = Blockly.Arduino.valueToCode(this, 'BVALUE', Blockly.Arduino.ORDER_ATOMIC);
	var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness',Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
	if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
		Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(4,'+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
		Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
	}
	var code = 'rgb_display_'+dropdown_rgbpin+'.setPixelColor('+value_led+'-1, '+'rgb_display_' + dropdown_rgbpin+'.Color('+value_rvalue+','+value_gvalue+','+value_bvalue+'));\n';
	code+='rgb_display_'+dropdown_rgbpin+'.show();\n';
	return code;
};

Blockly.Arduino.display_rgb2=function(){
	var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
	var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
	var colour_rgb_led_color = this.getFieldValue('RGB_LED_COLOR');
	var color = goog.color.hexToRgb(colour_rgb_led_color);

	Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
	if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
		Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(4,'+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
		Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();\n';
	}
	var code = 'rgb_display_'+dropdown_rgbpin+'.setPixelColor('+value_led+'-1, '+color+');\n';
	code+='rgb_display_'+dropdown_rgbpin+'.show();\n';
	return code;
};
  //RGBÃ§ÂÂ¯Ã¥Â¸Â¦Ã¥Â½Â©Ã¨â„¢Â¹Ã¦â€¢Ë†Ã¦Å¾Å“Ã¯Â¼Å’Ã¤Â¸Æ’Ã¥Â½Â©Ã¥ÂËœÃ¦Â?
  Blockly.Arduino.display_rgb_rainbow1=function(){
  	var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  	var wait_time = Blockly.Arduino.valueToCode(this, 'WAIT',Blockly.Arduino.ORDER_ATOMIC);
 //   var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness',Blockly.Arduino.ORDER_ATOMIC);
 Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
 if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
 	Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(4,'+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
 	Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();\n';
 }
 var funcName2 = 'Wheel';
 var code2  = 'uint32_t Wheel(byte WheelPos) {\n';
 code2 += 'if(WheelPos < 85) \n{\nreturn rgb_display_'+dropdown_rgbpin+'.Color(WheelPos * 3, 255 - WheelPos * 3, 0);\n} \n';
 code2 += 'else if(WheelPos < 170) \n{\nWheelPos -= 85; \nreturn rgb_display_'+dropdown_rgbpin+'.Color(255 - WheelPos * 3, 0, WheelPos * 3);\n}\n ';
 code2 += 'else\n {\nWheelPos -= 170;\nreturn rgb_display_'+dropdown_rgbpin+'.Color(0, WheelPos * 3, 255 - WheelPos * 3);\n}\n';
 code2 += '}\n';
 Blockly.Arduino.definitions_[funcName2] = code2;
 var funcName3 = 'rainbow';
 var code3  = 'void rainbow(uint8_t wait) {\n uint16_t i, j;\n';
 code3 += 'for(j=0; j<256; j++) {\n';
 code3 += 'for(i=0; i<rgb_display_'+dropdown_rgbpin+'.numPixels(); i++)\n {\n';
 code3 += 'rgb_display_'+dropdown_rgbpin+'.setPixelColor(i, Wheel((i+j) & 255));\n}\n';                    
 code3 += 'rgb_display_'+dropdown_rgbpin+'.show();\n';
 code3 += 'delay(wait);\n}\n}\n';
 Blockly.Arduino.definitions_[funcName3] = code3;
 var code = 'rainbow('+ wait_time+');\n'
 return code;
};
//RGBÃ§ÂÂ¯Ã¥Â¸Â¦Ã¥Â¾ÂªÃ§Å½Â¯Ã¤Â¸Æ’Ã¥Â½Â©Ã¥ÂËœÃ¦ÂÂ¢
Blockly.Arduino.display_rgb_rainbow2=function(){
	var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
	var wait_time = Blockly.Arduino.valueToCode(this, 'WAIT',Blockly.Arduino.ORDER_ATOMIC);
  //var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
  	Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(4,'+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
  	Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();\n';
  }
  var funcName2 = 'Wheel';
  var code2  = 'uint32_t Wheel(byte WheelPos) {\n';
  code2 += 'if(WheelPos < 85)\n {\nreturn rgb_display_'+dropdown_rgbpin+'.Color(WheelPos * 3, 255 - WheelPos * 3, 0);} \n';
  code2 += 'else if(WheelPos < 170)\n {\nWheelPos -= 85; return rgb_display_'+dropdown_rgbpin+'.Color(255 - WheelPos * 3, 0, WheelPos * 3);}\n ';
  code2 += 'else {\nWheelPos -= 170;return rgb_display_'+dropdown_rgbpin+'.Color(0, WheelPos * 3, 255 - WheelPos * 3);}\n';
  code2 += '}\n';
  Blockly.Arduino.definitions_[funcName2] = code2;
  var funcName3 = 'rainbow';
  var code3  = 'void rainbow(uint8_t wait) { uint16_t i, j;\n';
  code3 += 'for(j=0; j<256; j++) {               \n';
  code3 += 'for(i=0; i<rgb_display_'+dropdown_rgbpin+'.numPixels(); i++)\n{\n';
  code3 += 'rgb_display_'+dropdown_rgbpin+'.setPixelColor(i, Wheel((i+j) & 255));\n}\n';                    
  code3 += 'rgb_display_'+dropdown_rgbpin+'.show();\n';
  code3 += 'delay(wait);\n}\n}\n';
  Blockly.Arduino.definitions_[funcName3] = code3;
  var funcName4 = 'rainbowCycle';
  var code4  = 'void rainbowCycle(uint8_t wait) \n{\nuint16_t i, j;\n';
  code4 += 'for(j=0; j<256*5; j++) {\n';
  code4 += 'for(i=0; i< rgb_display_'+dropdown_rgbpin+'.numPixels(); i++) \n{\n';
  code4 += 'rgb_display_'+dropdown_rgbpin+'.setPixelColor(i, Wheel(((i * 256 / rgb_display_'+dropdown_rgbpin+'.numPixels()) + j) & 255));}\n';
  code4 += 'rgb_display_'+dropdown_rgbpin+'.show();\n';
  code4 += 'delay(wait);\n}\n}\n';
  Blockly.Arduino.definitions_[funcName4] = code4;
  var code = 'rainbowCycle('+ wait_time+');\n'
  return code;
};
//RGBÃ§ÂÂ¯Ã¥Â¸Â¦Ã¥Â½Â©Ã¨â„¢Â?
Blockly.Arduino.display_rgb_rainbow3=function(){
	var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
	var rainbow_color = Blockly.Arduino.valueToCode(this, 'rainbow_color',Blockly.Arduino.ORDER_ATOMIC);
	var type = this.getFieldValue('TYPE');
  //var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
  	Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(4,'+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
  	Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();\n';
  }
  var funcName2 = 'Wheel';
  var code2  = 'uint32_t Wheel(byte WheelPos) {\n';
  code2 += 'if(WheelPos < 85)\n {\nreturn rgb_display_'+dropdown_rgbpin+'.Color(WheelPos * 3, 255 - WheelPos * 3, 0);} \n';
  code2 += 'else if(WheelPos < 170)\n {\nWheelPos -= 85; return rgb_display_'+dropdown_rgbpin+'.Color(255 - WheelPos * 3, 0, WheelPos * 3);}\n ';
  code2 += 'else {\nWheelPos -= 170;return rgb_display_'+dropdown_rgbpin+'.Color(0, WheelPos * 3, 255 - WheelPos * 3);}\n';
  code2 += '}\n';
  Blockly.Arduino.definitions_[funcName2] = code2;
  if(type=="normal")
  	var code3  = 'for (int i = 0; i < rgb_display_' + dropdown_rgbpin + '.numPixels(); i++)\n{rgb_display_' + dropdown_rgbpin + '.setPixelColor(i, Wheel('+rainbow_color+' & 255));\n}\nrgb_display_' + dropdown_rgbpin + '.show();\n';
  else 
  	var code3  = 'for (int i = 0; i < rgb_display_' + dropdown_rgbpin + '.numPixels(); i++)\n {rgb_display_' + dropdown_rgbpin + '.setPixelColor(i, Wheel(((i * 256 / rgb_display_' + dropdown_rgbpin + '.numPixels()) + '+rainbow_color+') & 255));\n}\nrgb_display_' + dropdown_rgbpin + '.show();\n';

  return code3;
};

Blockly.Arduino.oled_init = function() {
	var CLK = Blockly.Arduino.valueToCode(this, 'CLK', Blockly.Arduino.ORDER_ATOMIC);
	var DIN = Blockly.Arduino.valueToCode(this, 'DIN', Blockly.Arduino.ORDER_ATOMIC);
	var DC = Blockly.Arduino.valueToCode(this, 'DC', Blockly.Arduino.ORDER_ATOMIC);
	var CS1 = Blockly.Arduino.valueToCode(this, 'CS1', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['define_U8glib'] = '#include <U8glib.h>';
	Blockly.Arduino.definitions_['define_u8g'] = ' U8GLIB_SSD1306_128X64 u8g(' + CLK + ',' + DIN + ',' + CS1 + ',' + DC + ');';
	var oled_setup = " if ( u8g.getMode() == U8G_MODE_R3G3B2 )\nu8g.setColorIndex(255);\n";
	oled_setup += " else if ( u8g.getMode() == U8G_MODE_GRAY2BIT )\n";
	oled_setup += " u8g.setColorIndex(3);\n ";
	oled_setup += " else if ( u8g.getMode() == U8G_MODE_BW )\n";
	oled_setup += " u8g.setColorIndex(1);\n";
	Blockly.Arduino.setups_['setup_setup'] = oled_setup;
	var code = '';
	return code;
};


Blockly.Arduino.oled_init2 = function() {
	var CLK = Blockly.Arduino.valueToCode(this, 'CLK', Blockly.Arduino.ORDER_ATOMIC);
	var DIN = Blockly.Arduino.valueToCode(this, 'DIN', Blockly.Arduino.ORDER_ATOMIC);
	var DC = Blockly.Arduino.valueToCode(this, 'DC', Blockly.Arduino.ORDER_ATOMIC);
	var CS1 = Blockly.Arduino.valueToCode(this, 'CS1', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['define_U8g2lib'] = '#include <U8g2lib.h>';
	Blockly.Arduino.definitions_['define_u8g2'] = ' U8G2_SSD1306_128X64_NONAME_F_SW_I2C u8g2(U8G2_R0, SCL, SDA, U8X8_PIN_NONE);';
	Blockly.Arduino.definitions_['define_u8gspi'] ='#include <Wire.h>\n'; 
	var oled_setup = "u8g2.begin();\n\n";
	Blockly.Arduino.setups_['setup_setup'] = oled_setup;
	var code = '';
	return code;
};

Blockly.Arduino.oled_clear = function() {
	var code="u8g2.clearDisplay();";
	return code;
};

Blockly.Arduino.oled_getHeight_or_Width = function() {
	var what = this.getFieldValue('WHAT');
	var funcName = 'u8g2.get' + what + '()';
	return [funcName, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.oled_draw4Str = function() {
	var value_text_line1 = Blockly.Arduino.valueToCode(this, 'Text_line1', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
	var value_text_line2 = Blockly.Arduino.valueToCode(this, 'Text_line2', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
	var value_text_line3 = Blockly.Arduino.valueToCode(this, 'Text_line3', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
	var value_text_line4 = Blockly.Arduino.valueToCode(this, 'Text_line4', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
	var code = 'u8g2.drawStr(0, 12, ' + value_text_line1 + ');\n'
	code += 'u8g2.drawStr(0, 24, ' + value_text_line2 + ');\n'
	code += 'u8g2.drawStr(0, 36, ' + value_text_line3 + ');\n'
	code += 'u8g2.drawStr(0, 48, ' + value_text_line4 + ');\n'
	return code;
};

Blockly.Arduino.oled_drawPixe = function() {
	var pos_x = Blockly.Arduino.valueToCode(this, 'POS_X', Blockly.Arduino.ORDER_ATOMIC);
	var pos_y = Blockly.Arduino.valueToCode(this, 'POS_Y', Blockly.Arduino.ORDER_ATOMIC);
	var code = "";

if ((!isNaN(pos_x) && pos_x < 128 && pos_x >= 0) || (isNaN(pos_x))) {
	code += 'u8g2.drawPixel(' + pos_x + ',';
}
if ((!isNaN(pos_y) && pos_y < 64 && pos_y >= 0) || (isNaN(pos_y))) {
	code += pos_y + ');\n';
}
if (code.split(",").length == 2 && code.split(")").length == 2) return code;
else return "";
};


Blockly.Arduino.oled_page = function() {
	var branch = Blockly.Arduino.statementToCode(this, 'DO');
branch = branch.replace(/(^\s*)|(\s*$)/g, ""); 
if (branch) {
	var code = "  u8g2.firstPage();\n do {\n" + branch + "\n} \nwhile (u8g2.nextPage());\n";
	return code;
}
};


Blockly.Arduino.oled_showBitmap = function() {
	var start_x = Blockly.Arduino.valueToCode(this, 'START_X', Blockly.Arduino.ORDER_ATOMIC);
	var start_y = Blockly.Arduino.valueToCode(this, 'START_Y', Blockly.Arduino.ORDER_ATOMIC);
	var Height = this.getFieldValue('HEIGHT');
	var WIDTH = this.getFieldValue('WIDTH');
	var data_name = Blockly.Arduino.valueToCode(this, 'bitmap_name', Blockly.Arduino.ORDER_ATOMIC);
data_name = data_name.replace(/\"/g, ""); //è¿‡æ»¤å¼•å·
var code = "";
if ((!isNaN(start_x) && start_x < 128 && start_x >= 0) || (isNaN(start_x))) {
	code = 'u8g2.drawXBM(' + start_x + ',';
}
if ((!isNaN(start_y) && start_y < 64 && start_y >= 0) || (isNaN(start_y))) {
	code += start_y + ',' + parseInt(WIDTH) + ' ,' + parseInt(Height) + ', ' + data_name + ');\n';
}
if (code.split(",").length == 5 && code.split(")").length == 2) 
	return code;
else return "";
};

Blockly.Arduino.oled_define_bitmap_data = function() {
	var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
	var text = this.getFieldValue('TEXT');
	Blockly.Arduino.definitions_['var_lists' + varName] = 'static unsigned char ' + varName + '[]={' + text + ' };\n';
	return '';
};

Blockly.Arduino.oled_drawLine = function() {
	var start_x = Blockly.Arduino.valueToCode(this, 'START_X', Blockly.Arduino.ORDER_ATOMIC);
	var start_y = Blockly.Arduino.valueToCode(this, 'START_Y', Blockly.Arduino.ORDER_ATOMIC);
	var end_x = Blockly.Arduino.valueToCode(this, 'END_X', Blockly.Arduino.ORDER_ATOMIC);
	var end_y = Blockly.Arduino.valueToCode(this, 'END_Y', Blockly.Arduino.ORDER_ATOMIC);
	var code = "";
if ((!isNaN(start_x) && start_x < 128 && start_x >= 0) || (isNaN(start_x))) {
	code = 'u8g2.drawLine(' + start_x + ',';
}
if ((!isNaN(start_y) && start_y < 64 && start_y >= 0) || (isNaN(start_y))) {
	code += start_y + ',';
}
if ((!isNaN(end_x) && end_x < 128 && end_x >= 0) || (isNaN(end_x))) {
	code += end_x + ',';
}
if ((!isNaN(end_y) && end_y < 64 && end_y >= 0) || (isNaN(end_y))) {
	code += end_y + ');\n';
}
if (code.split(",").length == 4 && code.split(")").length == 2) return code;
else return "";
};

Blockly.Arduino.oled_draw_Str_Line = function() {
	var start_x = Blockly.Arduino.valueToCode(this, 'START_X', Blockly.Arduino.ORDER_ATOMIC);
	var start_y = Blockly.Arduino.valueToCode(this, 'START_Y', Blockly.Arduino.ORDER_ATOMIC);
	var length = Blockly.Arduino.valueToCode(this, 'LENGTH', Blockly.Arduino.ORDER_ATOMIC);
	var TYPE = this.getFieldValue('TYPE');
	var code = "";
if ((!isNaN(start_x) && start_x < 128 && start_x >= 0) || (isNaN(start_x))) {
	code = "u8g2.draw" + TYPE + "Line(" + start_x + ',';
}
if ((!isNaN(start_y) && start_y < 64 && start_y >= 0) || (isNaN(start_y))) {
	code += start_y + ',';
}
if ((!isNaN(length) && length < 129 && length > 0) || (isNaN(length))) {
	code += length + ');\n';
}
if (code.split(",").length == 3 && code.split(")").length == 2) return code;
else return "";

};

Blockly.Arduino.oled_drawTriangle = function() {
	var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X', Blockly.Arduino.ORDER_ATOMIC);
	var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y', Blockly.Arduino.ORDER_ATOMIC);
	var D1_x = Blockly.Arduino.valueToCode(this, 'D1_X', Blockly.Arduino.ORDER_ATOMIC);
	var D1_y = Blockly.Arduino.valueToCode(this, 'D1_Y', Blockly.Arduino.ORDER_ATOMIC);
	var D2_x = Blockly.Arduino.valueToCode(this, 'D2_X', Blockly.Arduino.ORDER_ATOMIC);
	var D2_y = Blockly.Arduino.valueToCode(this, 'D2_Y', Blockly.Arduino.ORDER_ATOMIC);
	var code = "";

if ((!isNaN(D0_x) && D0_x < 128 && D0_x >= 0) || (isNaN(D0_x))) {
	code = 'u8g2.drawTriangle(' + D0_x + ',';
}
if ((!isNaN(D0_y) && D0_y < 64 && D0_y >= 0) || (isNaN(D0_y))) {
	code += D0_y + ',';
}
if ((!isNaN(D1_x) && D1_x < 128 && D1_x >= 0) || (isNaN(D1_x))) {
	code += D1_x + ',';
}
if ((!isNaN(D1_y) && D1_y < 64 && D1_y >= 0) || (isNaN(D1_y))) {
	code += D1_y + ',';
}
if ((!isNaN(D2_x) && D2_x < 128 && D2_x >= 0) || (isNaN(D2_x))) {
	code += D2_x + ',';
}
if ((!isNaN(D2_y) && D2_y < 64 && D2_y >= 0) || (isNaN(D2_y))) {
	code += D2_y + ');\n';
}
if (code.split(",").length == 6 && code.split(")").length == 2) return code;
else return "";
};

Blockly.Arduino.oled_drawFrame = function() {
	var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X', Blockly.Arduino.ORDER_ATOMIC);
	var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y', Blockly.Arduino.ORDER_ATOMIC);
	var Width = Blockly.Arduino.valueToCode(this, 'WIDTH', Blockly.Arduino.ORDER_ATOMIC);
	var Height = Blockly.Arduino.valueToCode(this, 'HEIGHT', Blockly.Arduino.ORDER_ATOMIC);
	var type = this.getFieldValue('TYPE');
	var code = "";
if ((!isNaN(D0_x) && D0_x < 128 && D0_x >= 0) || (isNaN(D0_x))) 
	code = 'u8g2.'+type+'(' + D0_x + ',';
if ((!isNaN(D0_y) && D0_y < 64 && D0_y >= 0) || (isNaN(D0_y))) 
	code += D0_y + ',';
if ((!isNaN(Width) && Width < 128 && Width >= 0) || (isNaN(Width))) 
	code += Width + ',';
if ((!isNaN(Height) && Height < 64 && Height >= 0) || (isNaN(Height))) 
	code += Height + ');\n';
if (code.split(",").length == 4 && code.split(")").length == 2) return code;
else return "";
};

Blockly.Arduino.oled_drawRFrame = function() {
	var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X', Blockly.Arduino.ORDER_ATOMIC);
	var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y', Blockly.Arduino.ORDER_ATOMIC);
	var Width = Blockly.Arduino.valueToCode(this, 'WIDTH', Blockly.Arduino.ORDER_ATOMIC);
	var Height = Blockly.Arduino.valueToCode(this, 'HEIGHT', Blockly.Arduino.ORDER_ATOMIC);
	var Rauius = Blockly.Arduino.valueToCode(this, 'RADIUS', Blockly.Arduino.ORDER_ATOMIC);
	var type = this.getFieldValue('TYPE');
	var code = "";
if ((!isNaN(D0_x) && D0_x < 128 && D0_x >= 0) || (isNaN(D0_x))) 
	code = 'u8g2.'+type+'(' + D0_x + ',';
if ((!isNaN(D0_y) && D0_y < 64 && D0_y >= 0) || (isNaN(D0_y))) 
	code += D0_y + ',';
if ((!isNaN(Width) && Width < 128 && Width >= 0) || (isNaN(Width))) 
	code += Width + ',';
if ((!isNaN(Height) && Height < 64 && Height >= 0) || (isNaN(Height))) 
	code += Height + ',';
if ((!isNaN(Rauius) && Rauius < 64 && Rauius >= 0) || (isNaN(Rauius))) 
	code += Rauius + ');\n';
if (code.split(",").length == 5 && code.split(")").length == 2) return code;
else return "";
};

Blockly.Arduino.oled_drawCircle = function() {
	var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X', Blockly.Arduino.ORDER_ATOMIC);
	var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y', Blockly.Arduino.ORDER_ATOMIC);
	var Rauius = Blockly.Arduino.valueToCode(this, 'RADIUS', Blockly.Arduino.ORDER_ATOMIC);
	var type = this.getFieldValue('TYPE');
	var opt = this.getFieldValue('OPT');
	var code = "";
if ((!isNaN(D0_x) && D0_x < 128 && D0_x >= 0) || (isNaN(D0_x))) 
	code = 'u8g2.'+type+'(' + D0_x + ',';
if ((!isNaN(D0_y) && D0_y < 64 && D0_y >= 0) || (isNaN(D0_y))) 
	code += D0_y + ',';
if ((!isNaN(Rauius) && Rauius < 64 && Rauius >= 0) || (isNaN(Rauius))) 
	code += Rauius + "," + opt + "); \n";
if (code.split(",").length == 4 && code.split(")").length == 2) return code;
else return "";
};

Blockly.Arduino.oled_drawEllipse = function() {
	var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X', Blockly.Arduino.ORDER_ATOMIC);
	var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y', Blockly.Arduino.ORDER_ATOMIC);
	var Rauius_X = Blockly.Arduino.valueToCode(this, 'RADIUS_X', Blockly.Arduino.ORDER_ATOMIC);
	var Rauius_Y = Blockly.Arduino.valueToCode(this, 'RADIUS_Y', Blockly.Arduino.ORDER_ATOMIC);
	var type = this.getFieldValue('TYPE');
	var opt = this.getFieldValue('OPT');
	var code = "";
if ((!isNaN(D0_x) && D0_x < 128 && D0_x >= 0) || (isNaN(D0_x))) 
	code = 'u8g2.'+type+'(' + D0_x + ',';
if ((!isNaN(D0_y) && D0_y < 64 && D0_y >= 0) || (isNaN(D0_y))) 
	code += D0_y + ',';
if ((!isNaN(Rauius_X) && Rauius_X < 64 && Rauius_X >= 0) || (isNaN(Rauius_X))) 
	code += Rauius_X + "," ;
if ((!isNaN(Rauius_Y) && Rauius_Y < 64 && Rauius_Y >= 0) || (isNaN(Rauius_Y))) 
	code += Rauius_Y + "," + opt + "); \n";
if (code.split(",").length == 5 && code.split(")").length == 2) return code;
else return "";
};

Blockly.Arduino.oled_drawStr = function() {
	var POS_x = Blockly.Arduino.valueToCode(this, 'POS_X', Blockly.Arduino.ORDER_ATOMIC);
	var POS_y = Blockly.Arduino.valueToCode(this, 'POS_Y', Blockly.Arduino.ORDER_ATOMIC);
	var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
	var code = "";
if ((!isNaN(POS_x) && POS_x < 128 && POS_x >= 0) || (isNaN(POS_x))) 
	code = 'u8g2.drawStr(' + POS_x + ',';
if ((!isNaN(POS_y) && POS_y < 64 && POS_y >= 0) || (isNaN(POS_y))) 
	code += POS_y + ','+ TEXT + "); \n";
if (code.split(",").length == 3&& code.split(")").length == 2) return code;
else return "";
};

Blockly.Arduino.oled_print = function() {
	var POS_x = Blockly.Arduino.valueToCode(this, 'POS_X', Blockly.Arduino.ORDER_ATOMIC);
	var POS_y = Blockly.Arduino.valueToCode(this, 'POS_Y', Blockly.Arduino.ORDER_ATOMIC);
	var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
	var code = "";
if ((!isNaN(POS_x) && POS_x < 128 && POS_x >= 0) || (isNaN(POS_x))) 
	code = 'u8g2.setCursor(' + POS_x + ',';
if ((!isNaN(POS_y) && POS_y < 64 && POS_y >= 0) || (isNaN(POS_y))) 
	code += POS_y + "); \n";
code += "u8g2.print(" + TEXT + "); \n";
return code;
};


Blockly.Arduino.oled_setFont = function() {
	var type = this.getFieldValue('TYPE');
	var code = "u8g2.setFont(u8g2_font_"+type+");\nu8g2.setFontPosTop();\n";
	return code;
};

//执行器-蜂鸣器频率选择列表
Blockly.Arduino.tone_notes = function() {
	var code = this.getFieldValue('STAT');
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//执行器-蜂鸣器
Blockly.Arduino.controls_tone2 = function() {
	var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
	var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
	var dur = Blockly.Arduino.valueToCode(this, 'DURATION', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
	Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
	Blockly.Arduino.definitions_['newtone0'] = 'float period;\nfloat pulse;';
	Blockly.Arduino.definitions_['newtone1'] = 'void newtone(int tonePin, int frequency, int duration)';
	Blockly.Arduino.definitions_['newtone2'] = '{\nfloat period = 1000000.0 /frequency;';
	Blockly.Arduino.definitions_['newtone3'] = 'float pulse = period / 2.0;';
	Blockly.Arduino.definitions_['newtone4'] = 'for (int i=1; i<=((duration * 1000.0)/period);i=i+1)';
	Blockly.Arduino.definitions_['newtone5'] = ' {\npinMode(tonePin, OUTPUT);\n digitalWrite(tonePin,HIGH);';
	Blockly.Arduino.definitions_['newtone6'] = 'delayMicroseconds(pulse);';
	Blockly.Arduino.definitions_['newtone7'] = 'pinMode(tonePin, OUTPUT);\n digitalWrite(tonePin,LOW);';
	Blockly.Arduino.definitions_['newtone8'] = ' delayMicroseconds(pulse);\n}\n}\n';
	var code = "newtone(" + dropdown_pin + "," + fre + "," + dur + ");\n";
	return code;
};

//执行器-蜂鸣器结束声音
Blockly.Arduino.controls_notone = function() {
	var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
	var code = "digitalWrite(" + dropdown_pin + ", LOW);\n";
	return code;
};

Blockly.Arduino.factory_declare2 = function() {
var VALUE = this.getFieldValue('VALUE');
	Blockly.Arduino.definitions_['var_'+VALUE] = VALUE;
	return '';
};
Blockly.Arduino.DHT = function () {
  var sensor_type = this.getFieldValue('TYPE');
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var what = this.getFieldValue('WHAT');
  Blockly.Arduino.definitions_['include_DHT'] = '#include <DHT.h>';
  //Blockly.Arduino.definitions_['define_dht_pin' + dropdown_pin] = '#define DHTPIN'+dropdown_pin +' ' + dropdown_pin ;
  //Blockly.Arduino.definitions_['define_dht_type' + dropdown_pin] = '#define DHTTYPE'+dropdown_pin +' '+ sensor_type ;
  Blockly.Arduino.definitions_['define_dht' + dropdown_pin] = 'DHT dht'+dropdown_pin+'('+dropdown_pin+', '+sensor_type+');'
  Blockly.Arduino.setups_['DHT_SETUP'+dropdown_pin] = ' dht'+dropdown_pin+'.begin();';
  var code;
  if(what=="temperature")
    code= 'dht'+dropdown_pin+'.readTemperature()'
  else
    code= 'dht'+dropdown_pin+'.readHumidity()'
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}