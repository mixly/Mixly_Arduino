import { JSFuncs } from 'mixly';
import { Variables } from 'blockly/core';

// 物联网-授权码
export const blynk_iot_auth = function () {
    return '';
};

// 物联网-一键配网
export const blynk_smartconfig = function (_, generator) {
    let auth_key = generator.valueToCode(this, 'auth_key', generator.ORDER_ATOMIC);
    let server_add = generator.valueToCode(this, 'server_add', generator.ORDER_ATOMIC);
    if (!isNaN(server_add.charAt(2))) {
        server_add = server_add.replace(/"/g, "").replace(/\./g, ",");
        server_add = 'IPAddress(' + server_add + ')';
    }
    let board_type = JSFuncs.getPlatform();
    generator.definitions_['define_BLYNK_PRINT'] = '#define BLYNK_PRINT Serial';
    generator.definitions_['var_declare_auth_key'] = 'char auth[] = ' + auth_key + ';';
    generator.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';
    generator.setups_['setup_smartconfig'] = 'WiFi.mode(WIFI_STA);\n'
        + '  int cnt = 0;\n'
        + '  while (WiFi.status() != WL_CONNECTED) {\n'
        + '    delay(500); \n'
        + '    Serial.print("."); \n'
        + '    if (cnt++ >= 10) {\n'
        + '      WiFi.beginSmartConfig();\n'
        + '      while (1) {\n'
        + '        delay(1000);\n'
        + '        if (WiFi.smartConfigDone()) {\n'
        + '          Serial.println();\n'
        + '          Serial.println("SmartConfig: Success");\n'
        + '          break;\n'
        + '        }\n'
        + '        Serial.print("|");\n'
        + '      }\n'
        + '    }\n'
        + '  }\n'
        + '  WiFi.printDiag(Serial);\n';
    if (board_type.match(RegExp(/ESP8266/))) {
        generator.definitions_['include_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
        generator.definitions_['include_BlynkSimpleEsp8266'] = '#include <BlynkSimpleEsp8266.h>';
    }
    else if (board_type.match(RegExp(/ESP32/))) {
        generator.definitions_['include_WiFi'] = '#include <WiFi.h>';
        generator.definitions_['include_WiFiClient'] = '#include <WiFiClient.h>';
        generator.definitions_['include_BlynkSimpleEsp32'] = '#include <BlynkSimpleEsp32.h>';
    }
    generator.setups_['setup_smartconfig'] += 'Blynk.config(auth,' + server_add + ',8080);';
    let code = "Blynk.run();\n";
    return code;
};

// 物联网-wifi信息
export const blynk_server = function (_, generator) {
    let wifi_ssid = generator.valueToCode(this, 'wifi_ssid', generator.ORDER_ATOMIC);
    let wifi_pass = generator.valueToCode(this, 'wifi_pass', generator.ORDER_ATOMIC);
    let auth_key = generator.valueToCode(this, 'auth_key', generator.ORDER_ATOMIC);
    let server_add = generator.valueToCode(this, 'server_add', generator.ORDER_ATOMIC);
    let board_type = JSFuncs.getPlatform();
    //let board_type ="ESP8266";
    generator.definitions_['define_BLYNK_PRINT'] = '#define BLYNK_PRINT Serial';
    generator.definitions_['var_declare_auth_key'] = 'char auth[] = ' + auth_key + ';';
    generator.definitions_['var_declare_wifi_ssid'] = 'char ssid[] = ' + wifi_ssid + ';';
    generator.definitions_['var_declare_wifi_pass'] = 'char pass[] = ' + wifi_pass + ';';
    if (board_type.match(RegExp(/AVR/))) {
        generator.definitions_['include_ESP8266WiFi'] = '#include <ESP8266_Lib.h>';
        generator.definitions_['include_BlynkSimpleEsp8266'] = '#include <BlynkSimpleShieldEsp8266.h>';
        generator.definitions_['define_BLYNK_PRINT'] = '#define ESP8266_BAUD 115200';
        generator.definitions_['var_declare_ESP8266'] = 'ESP8266 wifi(&Serial);';
        generator.setups_['setup_serial_Serial'] = 'Serial.begin(115200);';
        generator.setups_['delay_10_1'] = 'delay(10);';
        generator.setups_['wifi.setOprToStation'] = 'wifi.setOprToStation(2, 2);';
        generator.setups_['delay_10_2'] = 'delay(10);';
        generator.setups_['wifi.enableMUX'] = 'wifi.enableMUX();';
        generator.setups_['delay_10_3'] = 'delay(10);';
        generator.setups_['setup_Blynk.begin'] = 'Blynk.begin(auth, wifi,ssid, pass,' + server_add + ',8080);';
    }
    if (!isNaN(server_add.charAt(2))) {
        server_add = server_add.replace(/"/g, "").replace(/\./g, ",");
        server_add = 'IPAddress(' + server_add + ')';
    }
    if (board_type.match(RegExp(/ESP8266/))) {
        generator.definitions_['include_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
        generator.definitions_['include_BlynkSimpleEsp8266'] = '#include <BlynkSimpleEsp8266.h>';
        generator.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';
        generator.setups_['setup_Blynk.begin'] = ' Blynk.begin(auth, ssid, pass,' + server_add + ',8080);';
    }
    else if (board_type.match(RegExp(/ESP32/))) {
        generator.definitions_['include_WiFi'] = '#include <WiFi.h>';
        generator.definitions_['include_WiFiClient'] = '#include <WiFiClient.h>';
        generator.definitions_['include_BlynkSimpleEsp32'] = '#include <BlynkSimpleEsp32.h>';
        generator.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';
        generator.setups_['setup_Blynk.begin'] = 'Blynk.begin(auth, ssid, pass,' + server_add + ',8080);';
    }
    let code = "Blynk.run();\n";
    return code;
};

// 物联网-wifi信息
export const blynk_usb_server = function (_, generator) {
    // generator.definitions_['define_BLYNK_PRINT'] = '#define BLYNK_PRINT DebugSerial';
    generator.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>';
    generator.definitions_['include_BlynkSimpleStream'] = '#include <BlynkSimpleStream.h>';
    generator.definitions_['var_declare_SoftwareSerial'] = 'SoftwareSerial DebugSerial(2, 3);';
    let auth_key = generator.valueToCode(this, 'auth_key', generator.ORDER_ATOMIC);
    generator.definitions_['var_declare_auth_key'] = 'char auth[] = ' + auth_key + ';';
    generator.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';
    generator.setups_['setup_Blynk.begin'] = 'Blynk.begin(Serial, auth);';
    generator.setups_['setup_DebugSerial'] = 'DebugSerial.begin(9600);';
    let code = "Blynk.run();\n";
    return code;
};

// 物联网-发送数据到app
export const blynk_iot_push_data = function (_, generator) {
    let Vpin = this.getFieldValue('Vpin');
    let data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    let code = 'Blynk.virtualWrite(' + Vpin + ', ' + data + ');\n';
    return code;
};

// 从app接收数据
export const blynk_iot_get_data = function (_, generator) {
    let Vpin = this.getFieldValue('Vpin');
    let branch = generator.statementToCode(this, 'STACK');
    if (generator.INFINITE_LOOP_TRAP) {
        branch = generator.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
    }
    let args = [];
    for (let x = 0; x < this.arguments_.length; x++) {
        args[x] = this.argumentstype_[x] + ' ' + generator.variableDB_.getName(this.arguments_[x], Variables.NAME_TYPE);
    }
    let GetDataCode = "";
    if (this.arguments_.length == 1) {
        GetDataCode = generator.variableDB_.getName(this.arguments_[0], Variables.NAME_TYPE);
        if (this.argumentstype_[0] == "int")
            GetDataCode = "  " + GetDataCode + " = param.asInt();\n"
        else if (this.argumentstype_[0] == "String")
            GetDataCode = "  " + GetDataCode + " = param.asStr();\n"
        else if (this.argumentstype_[0] == "long")
            GetDataCode = "  " + GetDataCode + " = param.asDouble();\n"
        else if (this.argumentstype_[0] == "float")
            GetDataCode = "  " + GetDataCode + " = param.asFloat();\n"
        else if (this.argumentstype_[0] == "boolean")
            GetDataCode = "  " + GetDataCode + " = param.asInt();\n"
        else if (this.argumentstype_[0] == "byte")
            GetDataCode = "  " + GetDataCode + " = param.asStr();\n"
        else if (this.argumentstype_[0] == "char")
            GetDataCode = "  " + GetDataCode + " = param.asStr();\n"
    }
    else {
        for (let x = 0; x < this.arguments_.length; x++) {
            args[x] = this.argumentstype_[x] + ' ' + generator.variableDB_.getName(this.arguments_[x], Variables.NAME_TYPE);

            GetDataCode = GetDataCode + "  " + generator.variableDB_.getName(this.arguments_[x], Variables.NAME_TYPE);
            if (this.argumentstype_[x] == "int")
                GetDataCode += " = param[" + x + "].asInt();\n"
            else if (this.argumentstype_[x] == "String")
                GetDataCode += " = param[" + x + "].asStr();\n"
            else if (this.argumentstype_[x] == "long")
                GetDataCode += " = param[" + x + "].asDouble();\n"
            else if (this.argumentstype_[x] == "float")
                GetDataCode += " = param[" + x + "].asFloat();\n"
            else if (this.argumentstype_[x] == "boolean")
                GetDataCode += " = param[" + x + "].asInt();\n"
            else if (this.argumentstype_[x] == "byte")
                GetDataCode += " = param[" + x + "].asStr();\n"
            else if (this.argumentstype_[x] == "char")
                GetDataCode += " = param[" + x + "].asStr();\n"
        }
    }
    if (this.arguments_.length > 0)
        generator.definitions_['var_declare_' + args] = args.join(';\n') + ";";
    let code = 'BLYNK_WRITE(' + Vpin + ') {\n' + GetDataCode +
        branch + '}\n';
    // let code =  'BLYNK_WRITE(' + Vpin+ ') {\n'+letiable+" = param.as"+datatype+"();\n"+branch+'}\n';
    code = generator.scrub_(this, code);
    generator.definitions_[Vpin] = code;
    return null;
};

// blynk 定时器
export const Blynk_iot_timer = function (_, generator) {
    generator.definitions_['var_declare_BlynkTimer'] = 'BlynkTimer timer;';
    let timerNo = this.getFieldValue('timerNo');
    let time = generator.valueToCode(this, 'TIME', generator.ORDER_ATOMIC);
    let funcName = 'myTimerEvent' + timerNo;
    let branch = generator.statementToCode(this, 'DO');
    let code = 'void' + ' ' + funcName + '() {\n'
        + branch
        + '}\n';
    generator.definitions_[funcName] = code;
    generator.setups_[funcName] = 'timer.setInterval(' + time + 'L, ' + funcName + ');\n';
    return "timer.run();\n";
};

// blynk 连接状态函数
export const Blynk_iot_CONNECT_STATE = function (_, generator) {
    let funcName = this.getFieldValue('state');
    let branch = generator.statementToCode(this, 'DO');
    let code = funcName + '() {\n' + branch + '}\n';
    generator.definitions_[funcName] = code;
    return "";
};

// blynk 同步所有管脚状态
export const Blynk_iot_BLYNK_syncAll = function () {
    let code = 'Blynk.syncAll();\n';
    return code;
};

// 物联网-发送数据到app
export const blynk_iot_syncVirtual = function () {
    let Vpin = this.getFieldValue('Vpin');
    let code = 'Blynk.syncVirtual(' + Vpin + ');\n';
    return code;
};

//LED组件颜色&开关
export const blynk_iot_WidgetLED_COLOR = function (_, generator) {
    let Vpin = this.getFieldValue('Vpin');
    let COLOR = generator.valueToCode(this, 'COLOR', generator.ORDER_ATOMIC);
    COLOR = COLOR.replace(/#/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/0x/g, '');
    let dropdown_stat = generator.valueToCode(this, 'STAT', generator.ORDER_ATOMIC);
    generator.definitions_['var_declare_WidgetLED' + Vpin] = 'WidgetLED led' + Vpin + '(' + Vpin + ');';
    let code = 'led' + Vpin + '.setColor("#' + COLOR + '");\n';
    if (dropdown_stat == "HIGH")
        code += 'led' + Vpin + '.on();\n';
    else if (dropdown_stat == "LOW")
        code += 'led' + Vpin + '.off();\n';
    return code;
};

//LED组件颜色&亮度
export const blynk_iot_WidgetLED_VALUE = function (_, generator) {
    let Vpin = this.getFieldValue('Vpin');
    let COLOR = generator.valueToCode(this, 'COLOR', generator.ORDER_ATOMIC);
    COLOR = COLOR.replace(/#/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/0x/g, '');
    let value_num = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    generator.definitions_['var_declare_WidgetLED' + Vpin] = 'WidgetLED led' + Vpin + '(' + Vpin + ');';
    let code = 'led' + Vpin + '.setColor("#' + COLOR + '");\n';
    code += 'led' + Vpin + '.setValue(' + value_num + ');';
    return code;
};

// 红外控制空调
export const blynk_iot_ir_send_ac = function (_, generator) {
    let AC_TYPE = this.getFieldValue('AC_TYPE');
    let AC_POWER = this.getFieldValue('AC_POWER');
    let AC_MODE = this.getFieldValue('AC_MODE');
    let AC_FAN = this.getFieldValue('AC_FAN');
    let dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    let AC_TEMP = generator.valueToCode(this, 'AC_TEMP', generator.ORDER_ATOMIC);
    generator.definitions_['include_Arduino'] = '#ifndef UNIT_TEST\n#include <Arduino.h>\n#endif';
    generator.definitions_['include_IRremoteESP8266'] = '#include <IRremoteESP8266.h>';
    generator.definitions_['include_IRsend'] = '#include <IRsend.h>';
    generator.definitions_['include' + AC_TYPE] = '#include <ir_' + AC_TYPE + '.h>';
    generator.definitions_['define_IR_LED' + dropdown_pin] = '#define IR_LED ' + dropdown_pin;
    generator.definitions_['IR' + AC_TYPE + 'AC'] = 'IR' + AC_TYPE + 'AC ' + AC_TYPE + 'AC(IR_LED); ';
    generator.setups_['setup' + AC_TYPE] = AC_TYPE + 'AC.begin();';
    let code = AC_TYPE + 'AC.setPower(' + AC_POWER + ');\n';
    code += AC_TYPE + 'AC.setFan(' + AC_FAN + ');\n';
    code += AC_TYPE + 'AC.setMode(' + AC_MODE + ');\n';
    code += AC_TYPE + 'AC.setTemp(' + AC_TEMP + ');\n';
    code += AC_TYPE + 'AC.send();\n';
    return code;
};

// 红外接收
export const blynk_iot_ir_recv_raw = function (_, generator) {
    let dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    generator.definitions_['include_IRremote'] = '#ifndef UNIT_TEST\n'
        + '#include <Arduino.h>\n'
        + '#endif\n#include <IRremoteESP8266.h>\n#include <IRrecv.h>\n#include <IRutils.h>\n#if DECODE_AC\n#include <ir_Daikin.h>\n#include <ir_Fujitsu.h>\n#include <ir_Gree.h>\n#include <ir_Haier.h>\n#include <ir_Kelvinator.h>\n#include <ir_Midea.h>\n#include <ir_Toshiba.h>\n#endif \n';
    generator.definitions_['define_RECV_PIN' + dropdown_pin] = '#define RECV_PIN ' + dropdown_pin + '\n';
    // generator.definitions_['define_BAUD_RATE'] = '#define BAUD_RATE 115200\n';
    generator.definitions_['var_declare_CAPTURE_BUFFER_SIZE'] = '#define CAPTURE_BUFFER_SIZE 1024\n#if DECODE_AC\n#define TIMEOUT 50U\n#else\n#define TIMEOUT 15U  \n#endif\n#define MIN_UNKNOWN_SIZE 12\n#define IN_UNKNOWN_SIZE 12\nIRrecv irrecv(RECV_PIN, CAPTURE_BUFFER_SIZE, TIMEOUT, true);\ndecode_results results;';
    generator.setups_['ir_recv_begin'] = 'while(!Serial)\n'
        + '    delay(50);\n'
        + '  #if DECODE_HASH\n'
        + '  irrecv.setUnknownThreshold(MIN_UNKNOWN_SIZE);\n'
        + '  #endif  \n'
        + '  irrecv.enableIRIn();';
    let code = "if(irrecv.decode(&results)){\n"
        + '  uint32_t now = millis();\n'
        + '  dumpACInfo(&results);\n'
        + '  Serial.println(resultToSourceCode(&results));\n'
        + '}\n';
    let funcode = 'void dumpACInfo(decode_results *results){\n'
        + '  String description="";\n'
        + '  #if DECODE_DAIKIN\n'
        + '  if(results->decode_type == DAIKIN){\n'
        + '    IRDaikinESP ac(0);\n'
        + '    ac.setRaw(results->state);\n'
        + '    description=ac.toString();\n'
        + '  }\n'
        + '  #endif\n'
        + '  #if DECODE_FUJITSU_AC\n'
        + '  if(results->decode_type==FUJITSU_AC){\n'
        + '    IRFujitsuAC ac(0);\n'
        + '    ac.setRaw(results->state, results->bits / 8);\n'
        + '    description = ac.toString();\n'
        + '  }\n'
        + '  #endif\n'
        + '  #if DECODE_KELVINATOR\n'
        + '  if(results->decode_type == KELVINATOR){\n'
        + '    IRKelvinatorAC ac(0);\n'
        + '    ac.setRaw(results->state);\n'
        + '    description = ac.toString();\n'
        + '  }\n'
        + '  #endif\n'
        + '  #if DECODE_TOSHIBA_AC\n'
        + '  if(results->decode_type == TOSHIBA_AC){\n'
        + '    IRToshibaAC ac(0);\n'
        + '    ac.setRaw(results->state);\n'
        + '    description = ac.toString();\n'
        + '  }\n'
        + '  #endif\n'
        + '  #if DECODE_GREE\n'
        + '  if (results->decode_type == GREE){\n'
        + '    IRGreeAC ac(0);\n'
        + '    ac.setRaw(results->state);\n'
        + '    description = ac.toString();\n'
        + '  }\n'
        + '  #endif\n'
        + '  #if DECODE_MIDEA\n'
        + '  if(results->decode_type == MIDEA){\n'
        + '    IRMideaAC ac(0);\n'
        + '    ac.setRaw(results->value);\n'
        + '    description=ac.toString();\n'
        + '  }\n'
        + '  #endif\n'
        + '  #if DECODE_HAIER_AC\n'
        + '  if(results->decode_type == HAIER_AC){\n'
        + '    IRHaierAC ac(0);\n'
        + '    ac.setRaw(results->state);\n'
        + '    description = ac.toString();\n'
        + '  }\n'
        + '  #endif\n'
        + '  if(description != "")\n'
        + '    Serial.println("Mesg Desc.: " + description);\n'
        + '}\n';
    generator.definitions_['dumpACInfo'] = funcode;
    return code;
};

// 红外发射
export const blynk_iot_ir_send = function (_, generator) {
    let dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    let IR_CODE = this.getFieldValue('IR_CODE');
    let IR_CODE_LENGTH = IR_CODE.split(',').length;
    let random_num = Math.ceil(Math.random() * 100000);
    generator.definitions_['define_IRremote'] = '#ifndef UNIT_TEST\n#include <Arduino.h>\n#endif\n#include <IRremoteESP8266.h>\n#include <IRsend.h>\n#define IR_LED ' + dropdown_pin;
    generator.definitions_['var_declare_IRsend_irsend'] = 'IRsend irsend(IR_LED);\n';
    generator.definitions_['var_declare_send' + random_num] = 'uint16_t rawData' + random_num + '[' + IR_CODE_LENGTH + '] = {' + IR_CODE + '};';
    // generator.setups_['Serial.begin'] = 'irsend.begin();\n  Serial.begin(115200, SERIAL_8N1, SERIAL_TX_ONLY);\n';
    generator.setups_['irsend_begin'] = 'irsend.begin();\n';
    let code = 'irsend.sendRaw(rawData' + random_num + ', ' + IR_CODE_LENGTH + ', 38);\ndelay(2000);\n';
    return code;
}

// 发送邮件
export const blynk_email = function (_, generator) {
    let email_add = generator.valueToCode(this, 'email_add', generator.ORDER_ATOMIC);
    let Subject = generator.valueToCode(this, 'Subject', generator.ORDER_ATOMIC);
    let content = generator.valueToCode(this, 'content', generator.ORDER_ATOMIC);
    generator.definitions_['define_BLYNK_MAX_SENDBYTES'] = '#define BLYNK_MAX_SENDBYTES 128 \n';
    let code = 'Blynk.email(' + email_add + ', ' + Subject + ', ' + content + ');\n';
    return code;
};

// 发送通知
export const blynk_notify = function (_, generator) {
    let content = generator.valueToCode(this, 'content', generator.ORDER_ATOMIC);
    let code = 'Blynk.notify(' + content + ');\n';
    return code;
};

// 物联网-终端组件显示文本
export const blynk_terminal = function (_, generator) {
    let Vpin = this.getFieldValue('Vpin');
    generator.definitions_['var_declare_WidgetTerminal' + Vpin] = 'WidgetTerminal terminal' + Vpin + '(' + Vpin + ');\n';
    let content = generator.valueToCode(this, 'content', generator.ORDER_ATOMIC);
    let code = 'terminal' + Vpin + '.println(' + content + ');\nterminal' + Vpin + '.flush();\n';
    return code;
};

// 从终端获取字符串
export const blynk_iot_terminal_get = function (_, generator) {
    let Vpin = this.getFieldValue('Vpin');
    generator.definitions_['var_declare_WidgetTerminal'] = 'WidgetTerminal terminal(' + Vpin + ');\n';
    generator.definitions_['var_declare_action'] = 'String terminal_text ;';
    let branch = generator.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格s
    let code = 'BLYNK_WRITE' + '(' + Vpin + '){\n'
        + '  terminal_text = param.asStr();\n'
        + '  ' + branch + '\n'
        + '  terminal.flush();\n'
        + '}\n'
    generator.definitions_[Vpin] = code;
    return null;
};

// 视频流
export const blynk_videourl = function (_, generator) {
    let Vpin = this.getFieldValue('Vpin');
    let url = generator.valueToCode(this, 'url', generator.ORDER_ATOMIC);
    let code = 'Blynk.setProperty(' + Vpin + ',"url",' + url + ');\n';
    return code;
};

// 桥接授权码
export const blynk_bridge_auth = function (_, generator) {
    let Vpin = this.getFieldValue('Vpin');
    let auth = generator.valueToCode(this, 'auth', generator.ORDER_ATOMIC);
    generator.definitions_['var_declare_WidgetBridge' + Vpin] = 'WidgetBridge bridge' + Vpin + '(' + Vpin + ');\n';
    let code = 'bridge' + Vpin + '.setAuthToken(' + auth + ');\n';
    return code;
};

// 桥接数字输出
export const blynk_bridge_digitalWrite = function (_, generator) {
    let Vpin = this.getFieldValue('Vpin');
    let dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    let dropdown_stat = generator.valueToCode(this, 'STAT', generator.ORDER_ATOMIC);
    let code = 'bridge' + Vpin + '.digitalWrite(' + dropdown_pin + ', ' + dropdown_stat + ');\n';
    return code;
};

// 桥接模拟输出
export const blynk_bridge_AnaloglWrite = function (_, generator) {
    let Vpin = this.getFieldValue('Vpin');
    let dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    let value_num = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    let code = 'bridge' + Vpin + '.analogWrite(' + dropdown_pin + ', ' + value_num + ');\n';
    return code;
};

// 桥接虚拟管脚
export const blynk_bridge_VPin = function (_, generator) {
    let Vpin = this.getFieldValue('Vpin');
    let Vpin2 = this.getFieldValue('Vpin2');
    let value_num = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    let code = 'bridge' + Vpin + '.virtualWrite(' + Vpin2 + ', ' + value_num + ');\n';
    return code;
};

// RTC组件初始化
export const blynk_WidgetRTC_init = function (_, generator) {
    generator.definitions_['include_TimeLib'] = '#include <TimeLib.h>';
    generator.definitions_['include_WidgetRTC'] = '#include <WidgetRTC.h>';
    let value_num = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    generator.definitions_['var_declare_WidgetRTC'] = 'WidgetRTC rtc;\n';
    generator.setups_['setSyncInterval'] = 'setSyncInterval(' + value_num + '* 60);';
    let code = 'rtc.begin();\n';
    return code;
};

// RTC获取时间
export const blynk_WidgetRTC_get_time = function (_, generator) {
    let timeType = this.getFieldValue('TIME_TYPE');
    let code = timeType + '()';
    return [code, generator.ORDER_ATOMIC];
};

// 播放音乐组件
export const blynk_iot_playmusic = function (_, generator) {
    let Vpin = this.getFieldValue('Vpin');
    let branch = generator.statementToCode(this, 'DO');
    if (generator.INFINITE_LOOP_TRAP) {
        branch = generator.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
    }
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格
    let code = 'BLYNK_WRITE(' + Vpin + '){\n'
        + '  action = param.asStr();\n'
        + '  ' + branch + '\n'
        + '  Blynk.setProperty(' + Vpin + ', "label", action);\n'
        + '}\n';
    code = generator.scrub_(this, code);
    generator.definitions_[Vpin] = code;
    return "";
};

// 光线传感器
export const blynk_light = function (_, generator) {
    let Vpin = this.getFieldValue('Vpin');
    let branch = generator.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格
    let code = 'BLYNK_WRITE' + '(' + Vpin + '){\n'
        + '  int lx = param.asInt();\n'
        + '  ' + branch + '\n'
        + '}\n';
    generator.definitions_[Vpin] = code;
    return "";
};

// 重力传感器
export const blynk_gravity = function (_, generator) {
    let Vpin = this.getFieldValue('Vpin');
    let branch = generator.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格
    let code = 'BLYNK_WRITE' + '(' + Vpin + '){\n'
        + '  int x = param[0].asFloat();\n'
        + '  int y = param[1].asFloat();\n'
        + '  int z = param[2].asFloat();\n'
        + '  ' + branch + '\n'
        + '}\n';
    generator.definitions_[Vpin] = code;
    return "";
};

// 加速度传感器
export const blynk_acc = blynk_gravity;

// 时间输入
export const blynk_time_input_1 = function (_, generator) {
    let Vpin = this.getFieldValue('Vpin');
    let branch = generator.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格
    let code = 'BLYNK_WRITE' + '(' + Vpin + '){\n'
        + '  long startTimeInSecs = param[0].asLong();\n'
        + '  long hour =startTimeInSecs/3600;\n'
        + '  long minute=(startTimeInSecs-3600*hour)/60;\n'
        + '  long second=(startTimeInSecs-3600*hour)%60;\n'
        + '  ' + branch + '\n'
        + '}\n';
    generator.definitions_[Vpin] = code;
    return "";
};

// 执行器-蜂鸣器频率选择列表
export const tone_notes = function (_, generator) {
    let code = this.getFieldValue('STAT');
    return [code, generator.ORDER_ATOMIC];
};

export const factory_declare2 = function (_, generator) {
    let VALUE = this.getFieldValue('VALUE');
    generator.definitions_['var_' + VALUE] = VALUE;
    return '';
};

// 一键配网（无需安可信）
export const blynk_AP_config = function (_, generator) {
    let server_add = generator.valueToCode(this, 'server_add', generator.ORDER_ATOMIC);
    let auth_key = generator.valueToCode(this, 'auth_key', generator.ORDER_ATOMIC);
    let board_type = JSFuncs.getPlatform();
    generator.definitions_['define_BLYNK_PRINT'] = '#define BLYNK_PRINT Serial';
    if (board_type.match(RegExp(/ESP8266/))) {
        generator.definitions_['include_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
        generator.definitions_['include_BlynkSimpleEsp8266'] = '#include <BlynkSimpleEsp8266.h>';
    }
    else if (board_type.match(RegExp(/ESP32/))) {
        generator.definitions_['include_WiFi'] = '#include <WiFi.h>';
        generator.definitions_['include_WiFiClient'] = '#include <WiFiClient.h>';
        generator.definitions_['include_BlynkSimpleEsp32'] = '#include <BlynkSimpleEsp32.h>';
    }
    generator.definitions_['include_DNSServer'] = '#include <DNSServer.h>';
    generator.definitions_['include_ESP8266WebServer'] = '#include <ESP8266WebServer.h>\n';
    generator.definitions_['include_WiFiManager'] = '#include <WiFiManager.h>';
    generator.definitions_['var_declare_WiFiServer'] = 'WiFiServer server(80);';
    generator.definitions_['var_declare_auth_key'] = 'char auth[] = ' + auth_key + ';';
    generator.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';
    generator.setups_['setup_WiFiManager'] = 'WiFiManager wifiManager;';
    generator.setups_['setup_wifiManagerautoConnect'] = 'wifiManager.autoConnect("Blynk");';
    generator.setups_['setup_server.begin'] = 'Serial.println("Connected.");\n  server.begin();';
    if (isNaN(server_add.charAt(2))) {
        generator.setups_['setup_Blynkconfig'] = 'Blynk.config(auth, ' + server_add + ', 8080);';
    }
    else {
        server_add = server_add.replace(/"/g, "").replace(/\./g, ",");
        generator.setups_['setup_Blynkconfig'] = 'Blynk.config(auth, ' + 'IPAddress(' + server_add + '), 8080);';
    }
    let code = 'Blynk.run();';
    return code;
};

// 一键配网手动配置授权码（无需安可信）
export const blynk_AP_config_2 = function (_, generator) {
    let server_add = generator.valueToCode(this, 'server_add', generator.ORDER_ATOMIC);
    generator.definitions_['define_BLYNK_PRINT'] = '#define BLYNK_PRINT Serial';
    generator.definitions_['include_FS'] = '#include <FS.h>';
    generator.definitions_['include_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
    generator.definitions_['include_BlynkSimpleEsp8266'] = '#include <BlynkSimpleEsp8266.h>';
    generator.definitions_['include_DNSServer'] = '#include <DNSServer.h>';
    generator.definitions_['include_ESP8266WebServer'] = '#include <ESP8266WebServer.h>';
    generator.definitions_['include_WiFiManager'] = '#include <WiFiManager.h>';
    generator.definitions_['include_ArduinoJson'] = '#include <ArduinoJson.h>';
    generator.definitions_['var_declare_auth_key'] = 'char blynk_token[34] = "YOUR_BLYNK_TOKEN";';
    generator.definitions_['var_declare_shouldSaveConfig'] = 'bool shouldSaveConfig = false;';
    generator.definitions_['saveConfigCallback'] = 'void saveConfigCallback (){\n'
        + '  Serial.println("Should save config");\n'
        + '  shouldSaveConfig = true;\n'
        + '}';
    generator.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';
    generator.setups_['otasetup1'] = 'Serial.println("mounting FS...");\n'
        + ' if (SPIFFS.begin()){\n'
        + '    Serial.println("mounted file system");\n'
        + '    if (SPIFFS.exists("/config.json")) {\n'
        + '      Serial.println("reading config file");\n'
        + '      File configFile = SPIFFS.open("/config.json", "r");\n'
        + '      if (configFile) {\n'
        + '        Serial.println("opened config file");\n'
        + '        size_t size = configFile.size();\n'
        + '        std::unique_ptr<char[]> buf(new char[size]);\n'
        + '        configFile.readBytes(buf.get(), size);\n'
        + '        DynamicJsonBuffer jsonBuffer;\n'
        + '        JsonObject& json = jsonBuffer.parseObject(buf.get());\n'
        + '        json.printTo(Serial);\n'
        + '        if (json.success()){\n'
        + '          Serial.println("parsed json");\n'
        + '          strcpy(blynk_token, json["blynk_token"]);\n'
        + '        }\n'
        + '        else{\n'
        + '          Serial.println("failed to load json config");\n'
        + '        }\n'
        + '        configFile.close();\n'
        + '      }\n'
        + '    }\n'
        + '  }'
        + '  else{\n'
        + '    Serial.println("failed to mount FS");\n'
        + '  }\n'
        + '  WiFiManagerParameter custom_blynk_token("blynk", "blynk token", blynk_token, 32);\n'
        + '  WiFiManager wifiManager;\n'
        + '  wifiManager.setSaveConfigCallback(saveConfigCallback);\n'
        + '  wifiManager.addParameter(&custom_blynk_token);\n'
        + '  wifiManager.setMinimumSignalQuality(10);\n'
        + '  if (!wifiManager.autoConnect()){\n'
        + '    Serial.println("failed to connect and hit timeout");\n'
        + '    delay(3000);\n'
        + '    ESP.reset();\n'
        + '    delay(5000);\n'
        + '  }\n'
        + '  Serial.println("connected...yeey :)");\n'
        + '  strcpy(blynk_token, custom_blynk_token.getValue());\n'
        + '  if(shouldSaveConfig){\n'
        + '    Serial.println("saving config");\n'
        + '    DynamicJsonBuffer jsonBuffer;\n'
        + '    JsonObject& json = jsonBuffer.createObject();\n'
        + '    json["blynk_token"] = blynk_token;\n'
        + '    File configFile = SPIFFS.open("/config.json", "w");\n'
        + '    if(!configFile){\n'
        + '      Serial.println("failed to open config file for writing");\n'
        + '    }\n'
        + '    json.printTo(Serial);\n'
        + '    json.printTo(configFile);\n'
        + '    configFile.close();\n'
        + '  }\n'
        + '  Serial.println("local ip");\n'
        + '  Serial.println(WiFi.localIP());\n';
    if (isNaN(server_add.charAt(2))) {
        generator.setups_['otasetup1'] += '  Blynk.config(blynk_token,' + server_add + ',8080);';
    }
    else {
        server_add = server_add.replace(/"/g, "").replace(/\./g, ",");
        generator.setups_['otasetup1'] += '  Blynk.config(blynk_token,' + 'IPAddress(' + server_add + '),8080);';
    }
    let code = 'Blynk.run();\n';
    return code;
};

export const Blynk_connect_state = function (_, generator) {
    let code = 'Blynk.connected()';
    return [code, generator.ORDER_ATOMIC];
};

// Blynk终端清屏
export const blynk_terminal_clear = function () {
    let code = 'terminal.clear();\n';
    return code;
};

// Blynk LCD显示
export const blynk_lcd = function (_, generator) {
    let Vpin = this.getFieldValue('Vpin');
    let x = generator.valueToCode(this, 'x', generator.ORDER_ATOMIC);
    let y = generator.valueToCode(this, 'y', generator.ORDER_ATOMIC);
    let value = generator.valueToCode(this, 'value', generator.ORDER_ATOMIC);
    generator.definitions_['include_lcd'] = 'WidgetLCD lcd(' + Vpin + ');\n';
    let code = 'lcd.print(' + x + ', ' + y + ', ' + value + ');\n';
    return code;
};

// Blynk LCD清屏
export const blynk_lcd_clear = function () {
    let code = 'lcd.clear();\n';
    return code;
};

// ESP32 blynk BLE连接方式
export const blynk_esp32_ble = function (_, generator) {
    let auth = generator.valueToCode(this, 'auth', generator.ORDER_ATOMIC);
    let name = generator.valueToCode(this, 'name', generator.ORDER_ATOMIC);
    generator.definitions_['define_BLYNK_PRINT'] = '#define BLYNK_PRINT Serial';
    generator.definitions_['define_BLYNK_USE_DIRECT_CONNECT'] = '#define BLYNK_USE_DIRECT_CONNECT';
    generator.definitions_['include_BlynkSimpleEsp32_BLE'] = '#include <BlynkSimpleEsp32_BLE.h>';
    generator.definitions_['include_BLEDevice'] = '#include <BLEDevice.h>';
    generator.definitions_['include_BLEServer'] = '#include <BLEServer.h>\n';
    generator.definitions_['var_declare_auth_key'] = 'char auth[] = ' + auth + ';';
    generator.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';
    generator.setups_['setup_Blynk.begin'] = 'Serial.println("Waiting for connections...");\n'
        + '  Blynk.setDeviceName(' + name + ');\n'
        + '  Blynk.begin(auth);\n';
    let code = 'Blynk.run();\n';
    return code;
};

// ESP32 blynk Bluetooth连接方式
export const blynk_esp32_Bluetooth = function (_, generator) {
    let auth = generator.valueToCode(this, 'auth', generator.ORDER_ATOMIC);
    let name = generator.valueToCode(this, 'name', generator.ORDER_ATOMIC);
    generator.definitions_['define_BLYNK_PRINT'] = '#define BLYNK_PRINT Serial';
    generator.definitions_['define_BLYNK_USE_DIRECT_CONNECT'] = '#define BLYNK_USE_DIRECT_CONNECT';
    generator.definitions_['include_BlynkSimpleEsp32_BT'] = '#include <BlynkSimpleEsp32_BT.h>\n';
    generator.definitions_['var_declare_auth_key'] = 'char auth[] = ' + auth + ';';
    generator.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';
    generator.setups_['setup_Blynk.begin'] = 'Serial.println("Waiting for connections...");\n'
        + '  Blynk.setDeviceName(' + name + ');\n'
        + '  Blynk.begin(auth);\n';
    let code = 'Blynk.run();\n';
    return code;
};

// Arduino blynk Bluetooth 连接方式
export const arduino_blynk_bluetooth = function (_, generator) {
    let auth = generator.valueToCode(this, 'auth', generator.ORDER_ATOMIC);
    let RX = generator.valueToCode(this, 'RX', generator.ORDER_ATOMIC);
    let TX = generator.valueToCode(this, 'TX', generator.ORDER_ATOMIC);
    generator.definitions_['define_BLYNK_PRINT'] = '#define BLYNK_PRINT Serial';
    generator.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>';
    generator.definitions_['include_BlynkSimpleSerialBLE'] = '#include <BlynkSimpleSerialBLE.h>';
    generator.definitions_['define_auth'] = 'char auth[] = ' + auth + ';';
    if (RX != 0 || TX != 1) {
        generator.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';
        generator.definitions_['var_declare_SoftwareSerial'] = 'SoftwareSerial SerialBLE(' + RX + ', ' + TX + ');';
        generator.setups_['setup_SerialBLE_begin'] = 'SerialBLE.begin(9600);';
        generator.setups_['setup_Blynk.begin'] = 'Blynk.begin(SerialBLE, auth);';
    }
    else {
        generator.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';
        generator.setups_['setup_Blynk.begin'] = 'Blynk.begin(Serial, auth);';
    }
    generator.setups_['setup_Serial.println'] = 'Serial.println("Waiting for connections...");';
    let code = 'Blynk.run();\n';
    return code;
};

// Blynk Table小部件添加数据
export const blynk_table = function (_, generator) {
    let id = generator.valueToCode(this, 'id', generator.ORDER_ATOMIC);
    let mingcheng = generator.valueToCode(this, 'mingcheng', generator.ORDER_ATOMIC);
    let shujv = generator.valueToCode(this, 'shujv', generator.ORDER_ATOMIC);
    let Vpin = this.getFieldValue('Vpin');
    let code = 'Blynk.virtualWrite(' + Vpin + ', "add", ' + id + ',' + mingcheng + ', ' + shujv + ');\n';
    return code;
};

// Blynk Table小部件更新数据
export const blynk_table_update = function (_, generator) {
    let id = generator.valueToCode(this, 'id', generator.ORDER_ATOMIC);
    let mingcheng = generator.valueToCode(this, 'mingcheng', generator.ORDER_ATOMIC);
    let shujv = generator.valueToCode(this, 'shujv', generator.ORDER_ATOMIC);
    let Vpin = this.getFieldValue('Vpin');
    let code = 'Blynk.virtualWrite(' + Vpin + ', "update", ' + id + ',' + mingcheng + ', ' + shujv + ');\n';
    return code;
};

// Blynk Table小部件高亮显示数据
export const blynk_table_highlight = function (_, generator) {
    let id = generator.valueToCode(this, 'id', generator.ORDER_ATOMIC);
    let Vpin = this.getFieldValue('Vpin');
    let code = 'Blynk.virtualWrite(' + Vpin + ', "pick", ' + id + ');\n';
    return code;
};

// Blynk Table小部件选择数据
export const blynk_table_select = function (_, generator) {
    let id = generator.valueToCode(this, 'id', generator.ORDER_ATOMIC);
    let Vpin = this.getFieldValue('Vpin');
    let code = 'Blynk.virtualWrite(' + Vpin + ', "select", ' + id + ');\n';
    return code;
};

// Blynk Table小部件取消选择数据
export const blynk_table_unselect = function (_, generator) {
    let id = generator.valueToCode(this, 'id', generator.ORDER_ATOMIC);
    let Vpin = this.getFieldValue('Vpin');
    let code = 'Blynk.virtualWrite(' + Vpin + ', "deselect", ' + id + ');\n';
    return code;
};

// Blynk Table小部件数据清除
export const blynk_table_cleardata = function (_, generator) {
    let Vpin = this.getFieldValue('Vpin');
    generator.definitions_["rowIndex_" + Vpin] = 'int rowIndex_' + Vpin + ' = 0;\n';
    let code = 'Blynk.virtualWrite(' + Vpin + ', "clr");\nrowIndex_' + Vpin + ' = 0;\n';
    return code;
};

// blynk服务器连接状态
export const blynk_connected = function (_, generator) {
    let code = 'Blynk.connected()';
    return [code, generator.ORDER_ATOMIC];
};

// ESP32 CAM相机
export const esp_camera = function (_, generator) {
    let wifi_ssid = generator.valueToCode(this, 'wifi_ssid', generator.ORDER_ATOMIC);
    let wifi_pass = generator.valueToCode(this, 'wifi_pass', generator.ORDER_ATOMIC);
    let mode = this.getFieldValue('mode');
    let code = "";
    if (mode > 0) {
        code = 'WiFi.begin(wif_ssid,wif_password);\n'
            + '  while (WiFi.status() != WL_CONNECTED){\n'
            + '    delay(500);\n'
            + '    Serial.print(".");\n'
            + '  }\n'
            + '  Serial.println("");\n'
            + '  Serial.println("WiFi connected");\n'
            + '  Serial.print("Camera Stream Ready! Go to: http://");\n'
            + '  Serial.print(WiFi.localIP());\n'
            + '  Serial.println("");\n';
    } else {
        code = 'Serial.print("Setting AP (Access Point)…");\n'
            + 'WiFi.softAP(wif_ssid,wif_password);\n'
            + 'IPAddress IP = WiFi.softAPIP();\n'
            + 'Serial.print("Camera Stream Ready! Connect to the ESP32 AP and go to: http://");\n'
            + 'Serial.println(IP);\n'
            + 'Serial.println("");\n';
    }
    generator.definitions_['esp_camera'] = '#include "esp_camera.h"\n#include <WiFi.h>\n#include "esp_timer.h"\n#include "img_converters.h"\n#include <Arduino.h>\n#include "fb_gfx.h"\n#include "soc/soc.h"\n#include "soc/rtc_cntl_reg.h"\n#include "dl_lib.h"\n#include "esp_http_server.h"\nconst char*wif_ssid = ' + wifi_ssid + ';\nconst char*wif_password = ' + wifi_pass + ';\n#define PART_BOUNDARY "123456789000000000000987654321"\n#define PWDN_GPIO_NUM     32\n#define RESET_GPIO_NUM    -1\n#define XCLK_GPIO_NUM      0\n#define SIOD_GPIO_NUM     26\n#define SIOC_GPIO_NUM     27\n#define Y9_GPIO_NUM       35\n#define Y8_GPIO_NUM       34\n#define Y7_GPIO_NUM       39\n#define Y6_GPIO_NUM       36\n#define Y5_GPIO_NUM       21\n#define Y4_GPIO_NUM       19\n#define Y3_GPIO_NUM       18\n#define Y2_GPIO_NUM        5\n#define VSYNC_GPIO_NUM    25\n#define HREF_GPIO_NUM     23\n#define PCLK_GPIO_NUM     22\nstatic const char* _STREAM_CONTENT_TYPE = "multipart/x-mixed-replace;boundary=" PART_BOUNDARY;\nstatic const char* _STREAM_BOUNDARY = "\\r\\n--" PART_BOUNDARY "\\r\\n";\nstatic const char* _STREAM_PART = "Content-Type: image/jpeg\\r\\nContent-Length: %u\\r\\n\\r\\n";\nhttpd_handle_t stream_httpd = NULL;\nstatic esp_err_t stream_handler(httpd_req_t *req){\n  camera_fb_t * fb = NULL;\n  esp_err_t res = ESP_OK;\n  size_t _jpg_buf_len = 0;\n  uint8_t * _jpg_buf = NULL;\n  char * part_buf[64];\n  res = httpd_resp_set_type(req, _STREAM_CONTENT_TYPE);\n  if(res != ESP_OK){\n    return res;\n  }\n  while(true){\n    fb = esp_camera_fb_get();\n    if (!fb) {\n      Serial.println("Camera capture failed");\n      res = ESP_FAIL;\n    } else {\n      if(fb->width > 400){\n        if(fb->format != PIXFORMAT_JPEG){\n          bool jpeg_converted = frame2jpg(fb, 80, &_jpg_buf, &_jpg_buf_len);\n          esp_camera_fb_return(fb);\n          fb = NULL;\n          if(!jpeg_converted){\n            Serial.println("JPEG compression failed");\n            res = ESP_FAIL;\n          }\n        } else {\n          _jpg_buf_len = fb->len;\n          _jpg_buf = fb->buf;\n        }\n      }\n    }\n    if(res == ESP_OK){\n      size_t hlen = snprintf((char *)part_buf, 64, _STREAM_PART, _jpg_buf_len);\n      res = httpd_resp_send_chunk(req, (const char *)part_buf, hlen);\n    }\n    if(res == ESP_OK){\n      res = httpd_resp_send_chunk(req, (const char *)_jpg_buf, _jpg_buf_len);\n    }\n    if(res == ESP_OK){\n      res = httpd_resp_send_chunk(req, _STREAM_BOUNDARY, strlen(_STREAM_BOUNDARY));\n    }\n    if(fb){\n      esp_camera_fb_return(fb);\n      fb = NULL;\n      _jpg_buf = NULL;\n    } else if(_jpg_buf){\n      free(_jpg_buf);\n      _jpg_buf = NULL;\n    }\n    if(res != ESP_OK){\n      break;\n    }\n  }\n  return res;\n}\nvoid startCameraServer(){\n  httpd_config_t config = HTTPD_DEFAULT_CONFIG();\n  config.server_port = 80;\n  httpd_uri_t index_uri = {\n    .uri       = "/",\n    .method    = HTTP_GET,\n    .handler   = stream_handler,\n    .user_ctx  = NULL\n  };\n  if (httpd_start(&stream_httpd, &config) == ESP_OK) {\n    httpd_register_uri_handler(stream_httpd, &index_uri);\n } \n}\n';
    generator.setups_['setups_esp_camera'] = '  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);\n  Serial.begin(115200);\n  Serial.setDebugOutput(false);\n  camera_config_t config;\n  config.ledc_channel = LEDC_CHANNEL_0;\n  config.ledc_timer = LEDC_TIMER_0;\n  config.pin_d0 = Y2_GPIO_NUM;\n  config.pin_d1 = Y3_GPIO_NUM;\n  config.pin_d2 = Y4_GPIO_NUM;\n  config.pin_d3 = Y5_GPIO_NUM;\n  config.pin_d4 = Y6_GPIO_NUM;\n  config.pin_d5 = Y7_GPIO_NUM;\n  config.pin_d6 = Y8_GPIO_NUM;\n  config.pin_d7 = Y9_GPIO_NUM;\n  config.pin_xclk = XCLK_GPIO_NUM;\n  config.pin_pclk = PCLK_GPIO_NUM;\n  config.pin_vsync = VSYNC_GPIO_NUM;\n  config.pin_href = HREF_GPIO_NUM;\n  config.pin_sscb_sda = SIOD_GPIO_NUM;\n  config.pin_sscb_scl = SIOC_GPIO_NUM;\n  config.pin_pwdn = PWDN_GPIO_NUM;\n  config.pin_reset = RESET_GPIO_NUM;\n  config.xclk_freq_hz = 20000000;\n  config.pixel_format = PIXFORMAT_JPEG; \n  if(psramFound()){\n    config.frame_size = FRAMESIZE_UXGA;\n    config.jpeg_quality = 10;\n    config.fb_count = 2;\n  } else {\n    config.frame_size = FRAMESIZE_SVGA;\n    config.jpeg_quality = 12;\n    config.fb_count = 1;\n  }\n  esp_err_t err = esp_camera_init(&config);\n  if (err != ESP_OK) {\n    Serial.printf("Camera init failed with error 0x%x", err);\n    return;\n  }\n  ' + code + '  startCameraServer();\n';
    return 'delay(1);\n';
};

// ESP32 CAM相机 & blynk
export const esp_camera_blynk = function (_, generator) {
    let wifi_ssid = generator.valueToCode(this, 'wifi_ssid', generator.ORDER_ATOMIC);
    let wifi_pass = generator.valueToCode(this, 'wifi_pass', generator.ORDER_ATOMIC);
    let server_add = generator.valueToCode(this, 'server', generator.ORDER_ATOMIC);
    if (!isNaN(server_add.charAt(2))) {
        server_add = server_add.replace(/"/g, "").replace(/\./g, ",");
        server_add = 'IPAddress(' + server_add + ')';
    }
    let auth = generator.valueToCode(this, 'auth', generator.ORDER_ATOMIC);
    generator.definitions_['define_BLYNK_PRINT'] = '#define BLYNK_PRINT Serial';
    generator.definitions_['include_WiFi'] = '#include <WiFi.h>';
    generator.definitions_['include_BlynkSimpleEsp32'] = '#include <BlynkSimpleEsp32.h>';
    generator.definitions_['include_WidgetRTC'] = '#include <WidgetRTC.h>';
    generator.definitions_['include_WiFiClient'] = '#include <WiFiClient.h>';
    generator.definitions_['include_TimeLib'] = '#include <TimeLib.h>';
    generator.definitions_['var_declare_auth_key'] = 'char auth[] = ' + auth + ';';

    generator.definitions_['esp_camera'] = '#include "esp_camera.h"\n#include "esp_timer.h"\n#include "img_converters.h"\n#include <Arduino.h>\n#include "fb_gfx.h"\n#include "soc/soc.h"\n#include "soc/rtc_cntl_reg.h"\n#include "dl_lib.h"\n#include "esp_http_server.h"\nconst char*wif_ssid = ' + wifi_ssid + ';\nconst char*wif_password = ' + wifi_pass + ';\n#define PART_BOUNDARY "123456789000000000000987654321"\n#define PWDN_GPIO_NUM     32\n#define RESET_GPIO_NUM    -1\n#define XCLK_GPIO_NUM      0\n#define SIOD_GPIO_NUM     26\n#define SIOC_GPIO_NUM     27\n#define Y9_GPIO_NUM       35\n#define Y8_GPIO_NUM       34\n#define Y7_GPIO_NUM       39\n#define Y6_GPIO_NUM       36\n#define Y5_GPIO_NUM       21\n#define Y4_GPIO_NUM       19\n#define Y3_GPIO_NUM       18\n#define Y2_GPIO_NUM        5\n#define VSYNC_GPIO_NUM    25\n#define HREF_GPIO_NUM     23\n#define PCLK_GPIO_NUM     22\nstatic const char* _STREAM_CONTENT_TYPE = "multipart/x-mixed-replace;boundary=" PART_BOUNDARY;\nstatic const char* _STREAM_BOUNDARY = "\\r\\n--" PART_BOUNDARY "\\r\\n";\nstatic const char* _STREAM_PART = "Content-Type: image/jpeg\\r\\nContent-Length: %u\\r\\n\\r\\n";\nhttpd_handle_t stream_httpd = NULL;\nstatic esp_err_t stream_handler(httpd_req_t *req){\n  camera_fb_t * fb = NULL;\n  esp_err_t res = ESP_OK;\n  size_t _jpg_buf_len = 0;\n  uint8_t * _jpg_buf = NULL;\n  char * part_buf[64];\n  res = httpd_resp_set_type(req, _STREAM_CONTENT_TYPE);\n  if(res != ESP_OK){\n    return res;\n  }\n  while(true){\n    fb = esp_camera_fb_get();\n    if (!fb) {\n      Serial.println("Camera capture failed");\n      res = ESP_FAIL;\n    } else {\n      if(fb->width > 400){\n        if(fb->format != PIXFORMAT_JPEG){\n          bool jpeg_converted = frame2jpg(fb, 80, &_jpg_buf, &_jpg_buf_len);\n          esp_camera_fb_return(fb);\n          fb = NULL;\n          if(!jpeg_converted){\n            Serial.println("JPEG compression failed");\n            res = ESP_FAIL;\n          }\n        } else {\n          _jpg_buf_len = fb->len;\n          _jpg_buf = fb->buf;\n        }\n      }\n    }\n    if(res == ESP_OK){\n      size_t hlen = snprintf((char *)part_buf, 64, _STREAM_PART, _jpg_buf_len);\n      res = httpd_resp_send_chunk(req, (const char *)part_buf, hlen);\n    }\n    if(res == ESP_OK){\n      res = httpd_resp_send_chunk(req, (const char *)_jpg_buf, _jpg_buf_len);\n    }\n    if(res == ESP_OK){\n      res = httpd_resp_send_chunk(req, _STREAM_BOUNDARY, strlen(_STREAM_BOUNDARY));\n    }\n    if(fb){\n      esp_camera_fb_return(fb);\n      fb = NULL;\n      _jpg_buf = NULL;\n    } else if(_jpg_buf){\n      free(_jpg_buf);\n      _jpg_buf = NULL;\n    }\n    if(res != ESP_OK){\n      break;\n    }\n  }\n  return res;\n}\nvoid startCameraServer(){\n  httpd_config_t config = HTTPD_DEFAULT_CONFIG();\n  config.server_port = 80;\n  httpd_uri_t index_uri = {\n    .uri       = "/",\n    .method    = HTTP_GET,\n    .handler   = stream_handler,\n    .user_ctx  = NULL\n  };\n  if (httpd_start(&stream_httpd, &config) == ESP_OK) {\n    httpd_register_uri_handler(stream_httpd, &index_uri);\n } \n}\n';
    generator.setups_['setups_esp_camera'] = 'WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);\n  Serial.begin(115200);\n  Serial.setDebugOutput(false);\n  camera_config_t config;\n  config.ledc_channel = LEDC_CHANNEL_0;\n  config.ledc_timer = LEDC_TIMER_0;\n  config.pin_d0 = Y2_GPIO_NUM;\n  config.pin_d1 = Y3_GPIO_NUM;\n  config.pin_d2 = Y4_GPIO_NUM;\n  config.pin_d3 = Y5_GPIO_NUM;\n  config.pin_d4 = Y6_GPIO_NUM;\n  config.pin_d5 = Y7_GPIO_NUM;\n  config.pin_d6 = Y8_GPIO_NUM;\n  config.pin_d7 = Y9_GPIO_NUM;\n  config.pin_xclk = XCLK_GPIO_NUM;\n  config.pin_pclk = PCLK_GPIO_NUM;\n  config.pin_vsync = VSYNC_GPIO_NUM;\n  config.pin_href = HREF_GPIO_NUM;\n  config.pin_sscb_sda = SIOD_GPIO_NUM;\n  config.pin_sscb_scl = SIOC_GPIO_NUM;\n  config.pin_pwdn = PWDN_GPIO_NUM;\n  config.pin_reset = RESET_GPIO_NUM;\n  config.xclk_freq_hz = 20000000;\n  config.pixel_format = PIXFORMAT_JPEG; \n  if(psramFound()){\n    config.frame_size = FRAMESIZE_UXGA;\n    config.jpeg_quality = 10;\n    config.fb_count = 2;\n  } else {\n    config.frame_size = FRAMESIZE_SVGA;\n    config.jpeg_quality = 12;\n    config.fb_count = 1;\n  }\n  esp_err_t err = esp_camera_init(&config);\n  if (err != ESP_OK) {\n    Serial.printf("Camera init failed with error 0x%x", err);\n    return;\n  }\n  WiFi.begin(wif_ssid,wif_password);\n  while (WiFi.status() != WL_CONNECTED) {\n    delay(500);\n    Serial.print(".");\n }\n  Serial.println("");\n  Serial.println("WiFi connected");\n  Serial.print("Camera Stream Ready! Go to: http://");\n  Serial.print(WiFi.localIP());\n  Serial.println("");\n  startCameraServer();\n  Blynk.config(auth,' + server_add + ',8080);\n';
    return 'Blynk.run();\n';
};

export const take_a_photo1 = function (_, generator) {
    generator.definitions_['take_a_photo'] = '#include "esp_camera.h"\n#include "esp_timer.h"\n#include "img_converters.h"\n#include <Arduino.h>\n#include "fb_gfx.h"\n#include "fd_forward.h"\n#include "fr_forward.h"\n#include "FS.h" \n#include "SD_MMC.h" \n#include "soc/soc.h"\n#include "soc/rtc_cntl_reg.h" \n#include "dl_lib.h"\n#include "driver/rtc_io.h"\n#include <EEPROM.h>\n#define EEPROM_SIZE 1\n#define PWDN_GPIO_NUM     32\n#define RESET_GPIO_NUM    -1\n#define XCLK_GPIO_NUM      0\n#define SIOD_GPIO_NUM     26\n#define SIOC_GPIO_NUM     27\n#define Y9_GPIO_NUM       35\n#define Y8_GPIO_NUM       34\n#define Y7_GPIO_NUM       39\n#define Y6_GPIO_NUM       36\n#define Y5_GPIO_NUM       21\n#define Y4_GPIO_NUM       19\n#define Y3_GPIO_NUM       18\n#define Y2_GPIO_NUM        5\n#define VSYNC_GPIO_NUM    25\n#define HREF_GPIO_NUM     23\n#define PCLK_GPIO_NUM     22\nint pictureNumber = 0;\n';
    let code = 'WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);\nSerial.begin(115200);\ncamera_config_t config;\nconfig.ledc_channel = LEDC_CHANNEL_0;\nconfig.ledc_timer = LEDC_TIMER_0;\nconfig.pin_d0 = Y2_GPIO_NUM;\nconfig.pin_d1 = Y3_GPIO_NUM;\nconfig.pin_d2 = Y4_GPIO_NUM;\nconfig.pin_d3 = Y5_GPIO_NUM;\nconfig.pin_d4 = Y6_GPIO_NUM;\nconfig.pin_d5 = Y7_GPIO_NUM;\nconfig.pin_d6 = Y8_GPIO_NUM;\nconfig.pin_d7 = Y9_GPIO_NUM;\nconfig.pin_xclk = XCLK_GPIO_NUM;\nconfig.pin_pclk = PCLK_GPIO_NUM;\nconfig.pin_vsync = VSYNC_GPIO_NUM;\nconfig.pin_href = HREF_GPIO_NUM;\nconfig.pin_sscb_sda = SIOD_GPIO_NUM;\nconfig.pin_sscb_scl = SIOC_GPIO_NUM;\nconfig.pin_pwdn = PWDN_GPIO_NUM;\nconfig.pin_reset = RESET_GPIO_NUM;\nconfig.xclk_freq_hz = 20000000;\nconfig.pixel_format = PIXFORMAT_JPEG; \nif(psramFound()){\n  config.frame_size = FRAMESIZE_UXGA;\n  config.jpeg_quality = 10;\n  config.fb_count = 2;\n} else {\n  config.frame_size = FRAMESIZE_SVGA;\n  config.jpeg_quality = 12;\n  config.fb_count = 1;\n}\nesp_err_t err = esp_camera_init(&config);\nif (err != ESP_OK) {\n  Serial.printf("Camera init failed with error 0x%x", err);\n  return;\n}\nif(!SD_MMC.begin()){\n  Serial.println("SD Card Mount Failed");\n  return;\n}\nuint8_t cardType = SD_MMC.cardType();\nif(cardType == CARD_NONE){\n  Serial.println("No SD Card attached");\n  return;\n}\ncamera_fb_t * fb = NULL;\nfb = esp_camera_fb_get();\nif(!fb) {\n  Serial.println("Camera capture failed");\n  return;\n}\nEEPROM.begin(EEPROM_SIZE);\npictureNumber = EEPROM.read(0) + 1;\nString path = "/picture" + String(pictureNumber) +".jpg";\nfs::FS &fs = SD_MMC; \nSerial.printf("Picture file name: %s\\n", path.c_str());\nFile file = fs.open(path.c_str(), FILE_WRITE);\nif(!file){\n  Serial.println("Failed to open file in writing mode");\n} \nelse {\n  file.write(fb->buf, fb->len);\n  Serial.printf("Saved file to path: %s\\n", path.c_str());\n  EEPROM.write(0, pictureNumber);\n  EEPROM.commit();\n}\nfile.close();\nesp_camera_fb_return(fb); \npinMode(4, OUTPUT);\ndigitalWrite(4, LOW);\nrtc_gpio_hold_en(GPIO_NUM_4);\n';
    return code;
};

export const blynk_table_click = function (_, generator) {
    let Vpin = this.getFieldValue('Vpin');
    let branch = generator.statementToCode(this, 'function');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");
    generator.definitions_["blynk_table" + Vpin] = 'WidgetTable table_' + Vpin + ';\nBLYNK_ATTACH_WIDGET(table_' + Vpin + ', ' + Vpin + ');\n';
    generator.setups_["setup_blynk_table_click" + Vpin] = 'table_' + Vpin + '.onSelectChange([](int index, bool selected) {\n  ' + branch + '\n  });\n';
    let code = '';
    return code;
};

export const blynk_table_order = function (_, generator) {
    let Vpin = this.getFieldValue('Vpin');
    let branch = generator.statementToCode(this, 'function');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");
    generator.definitions_["blynk_table" + Vpin] = 'WidgetTable table_' + Vpin + ';\nBLYNK_ATTACH_WIDGET(table_' + Vpin + ', ' + Vpin + ');\n';
    generator.setups_["setup_blynk_table_order" + Vpin] = 'table_' + Vpin + '.onOrderChange([](int indexFrom, int indexTo) {\n  ' + branch + '\n  });\n';
    let code = '';
    return code;
};

export const blynk_table_add_data = function (_, generator) {
    let Vpin = this.getFieldValue('Vpin');
    let data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    let name = generator.valueToCode(this, 'name', generator.ORDER_ATOMIC);
    generator.definitions_["rowIndex_" + Vpin] = 'int rowIndex_' + Vpin + ' = 0;\n';
    let code = 'table_' + Vpin + '.addRow(rowIndex_' + Vpin + ', ' + name + ', ' + data + ');\ntable_' + Vpin + '.pickRow(rowIndex_' + Vpin + ');\nrowIndex_' + Vpin + '++;\n';
    return code;
};