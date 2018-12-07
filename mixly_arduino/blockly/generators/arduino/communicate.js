'use strict';

goog.provide('Blockly.Arduino.communicate');

goog.require('Blockly.Arduino');

Blockly.Arduino.ir_recv = function () {
    var variable = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.definitions_['var_declare' + variable] = 'long ' + variable + ';';
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var branch2 = Blockly.Arduino.statementToCode(this, 'DO2');
    var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
       Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.definitions_['include_IRremote'] = '#include <IRremote.h>\n';
    //Blockly.Arduino.definitions_['var_declare'+varName] = 'long '+varName+';\n';
    Blockly.Arduino.definitions_['var_ir_recv' + dropdown_pin] = 'IRrecv irrecv_' + dropdown_pin + '(' + dropdown_pin + ');\ndecode_results results_' + dropdown_pin + ';\n';
    Blockly.Arduino.setups_['setup_ir_recv_' + dropdown_pin] = 'irrecv_' + dropdown_pin + '.enableIRIn();';
    var code = "if (irrecv_" + dropdown_pin + ".decode(&results_" + dropdown_pin + ")) {\n"
    code += '  ' + variable + '=results_' + dropdown_pin + '.value;\n';
    code += '  String type="UNKNOWN";\n';
    ////////////////////////////////////////////////////////////////
    code += '  String typelist[14]={"UNKNOWN", "NEC", "SONY", "RC5", "RC6", "DISH", "SHARP", "PANASONIC", "JVC", "SANYO", "MITSUBISHI", "SAMSUNG", "LG", "WHYNTER"};\n';
    code += '  if(results_' + dropdown_pin + '.decode_type>=1&&results_' + dropdown_pin + '.decode_type<=13){\n';
    code += '    type=typelist[results_' + dropdown_pin + '.decode_type];\n'
    code += '  }\n';
    code += '  Serial.print("IR TYPE:"+type+"  ");\n';
    code += branch;
    code += '  irrecv_' + dropdown_pin + '.resume();\n'
    code += '} else {\n';
    code += branch2;
    code += '}\n';
    return code;
};


Blockly.Arduino.ir_recv_enable = function () {
    Blockly.Arduino.definitions_['include_IRremote'] = '#include <IRremote.h>';
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'irrecv_' + dropdown_pin + '.enableIRIn();\n';
    return code;
}

Blockly.Arduino.ir_send_nec = function () {
    Blockly.Arduino.definitions_['include_IRremote'] = '#include <IRremote.h>\n';
    Blockly.Arduino.definitions_['var_ir_send'] = 'IRsend irsend;\n';
    var data = Blockly.Arduino.valueToCode(this, 'data', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var bits = Blockly.Arduino.valueToCode(this, 'bits', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var type = this.getFieldValue('TYPE');
    var code = 'irsend.send' + type + '(' + data + ',' + bits + ');\n';
    /*
	for (var name in Blockly.Arduino.definitions_) {
		var def = Blockly.Arduino.definitions_[name];
		if (def.match(/^IRrecv irrecv_/)) {
			var tmp=def.substring(7,def.indexOf('('));
			code=code+tmp+'.enableIRIn();\n';
		}
	}*/
    return code;
}

Blockly.Arduino.ir_recv_raw = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_IRremote'] = '#include <IRremote.h>\n';
    Blockly.Arduino.definitions_['var_ir_recv' + dropdown_pin] = 'IRrecv irrecv_' + dropdown_pin + '(' + dropdown_pin + ');\ndecode_results results_' + dropdown_pin + ';\n';
    if (Blockly.Arduino.setups_['setup_serial_Serial' + profile.default.serial]) {
    } else {
        Blockly.Arduino.setups_['setup_serial_Serial' + profile.default.serial] = 'Serial.begin(' + profile.default.serial + ');';
    }
    Blockly.Arduino.setups_['setup_ir_recv_' + dropdown_pin] = 'irrecv_' + dropdown_pin + '.enableIRIn();\n';
    var code = "if (irrecv_" + dropdown_pin + ".decode(&results_" + dropdown_pin + ")) {\n"
    code += '  ' + 'dumpRaw(&results_' + dropdown_pin + ');\n';
    code += '  irrecv_' + dropdown_pin + '.resume();\n'
    code += '}\n';
    var funcode = 'void dumpRaw(decode_results *results) {\n'
     + '  int count = results->rawlen;\n'
     + '  Serial.print("RawData (");\n'
     + '  Serial.print(count, DEC);\n'
     + '  Serial.print("): ");\n'
     + '  for (int i = 0; i < count; i++) {\n'
     + '    Serial.print(results->rawbuf[i]*USECPERTICK, DEC);\n'
     + '    if(i!=count-1){\n'
     + '      Serial.print(",");\n'
     + '    }\n'
     + '  }\n'
     + '  Serial.println("");\n'
     + '}\n';
    Blockly.Arduino.definitions_['dumpRaw'] = funcode;
    return code;
};

Blockly.Arduino.ir_send_raw = function () {
    Blockly.Arduino.definitions_['include_IRremote'] = '#include <IRremote.h>\n';
    Blockly.Arduino.definitions_['var_ir_send'] = 'IRsend irsend;\n';
    var length = Blockly.Arduino.valueToCode(this, 'length', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var freq = Blockly.Arduino.valueToCode(this, 'freq', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var text = this.getFieldValue('TEXT');
    var code = 'unsigned int buf_raw[' + length + ']={' + text + '};\n'
    code = code + 'irsend.sendRaw(buf_raw,' + length + ',' + freq + ');\n';
    return code;
}

Blockly.Arduino.i2c_master_writer = function () {
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
    Blockly.Arduino.setups_['setup_i2c'] = 'Wire.begin();';
    var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var value = Blockly.Arduino.valueToCode(this, 'value', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var code = "Wire.beginTransmission(" + device + ");\n";
    code += "Wire.write(" + value + ");\n";
    code += "Wire.endTransmission();\n";
    return code;
};
Blockly.Arduino.i2c_master_reader = function () {
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>\n';
    Blockly.Arduino.setups_['setup_i2c'] = 'Wire.begin();';
    var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var bytes = Blockly.Arduino.valueToCode(this, 'bytes', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var code = "Wire.requestFrom(" + device + ", " + bytes + ");\n";
    return code;
};
Blockly.Arduino.i2c_master_reader2 = function () {
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>\n';
    Blockly.Arduino.setups_['setup_i2c'] = 'Wire.begin();';
    var code = "Wire.read()";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.i2c_available = function () {
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>\n';
    Blockly.Arduino.setups_['setup_i2c'] = 'Wire.begin();\n';
    var code = "Wire.available()";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.i2c_slave_onreceive = function () {
    var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>\n';
    Blockly.Arduino.setups_['setup_i2c_' + pin] = 'Wire.begin(' + pin + ');';
    Blockly.Arduino.setups_['setup_i2c_onReceive_' + pin] = 'Wire.onReceive(i2cReceiveEvent_' + pin + ');';
    var funcName = 'i2cReceiveEvent_' + pin;
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '(int howMany) {\n' + branch + '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
    return '';
}

Blockly.Arduino.spi_transfer = function () {
    Blockly.Arduino.definitions_['include_SPI'] = '#include <SPI.h>';
    Blockly.Arduino.setups_['setup_spi'] = 'SPI.begin();';
    var pin = Blockly.Arduino.valueToCode(this, 'pin', Blockly.Arduino.ORDER_ATOMIC);
    var value = Blockly.Arduino.valueToCode(this, 'value', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_['setup_output_' + pin] = 'pinMode(' + pin + ', OUTPUT);';
    var code = "digitalWrite(" + pin + ", LOW);\n";
    code += "SPI.transfer(" + value + ");\n";
    code += "digitalWrite(" + pin + ", HIGH);\n";
    return code;
};
Blockly.Arduino.RFID_init = function() {
	
	Blockly.Arduino.definitions_['define_SPI'] = '#include <SPI.h>';
	Blockly.Arduino.definitions_['define_RFID'] = '#include <RFID.h>';		
	Blockly.Arduino.definitions_['define_origin'] = 'RFID rfid(10,5);';
	Blockly.Arduino.definitions_['define_i and tmp'] = 'unsigned char i,tmp;';
	Blockly.Arduino.definitions_['define_status'] = 'unsigned char status;';		
	Blockly.Arduino.definitions_['define_strmax'] = 'unsigned char str[MAX_LEN];';
	Blockly.Arduino.definitions_['define_RC_size'] = 'unsigned char RC_size;';
	Blockly.Arduino.definitions_['define_blockAddr'] = 'unsigned char blockAddr;        //选择操作的块地址0～63';		

	Blockly.Arduino.definitions_['define_1'] = '//4字节卡序列号，第5字节为校验字节';
	Blockly.Arduino.definitions_['define_2'] = 'unsigned char serNum[5];';		
	Blockly.Arduino.definitions_['define_3'] = '//写卡数据';	
	Blockly.Arduino.definitions_['define_5'] = '//原扇区A密码，16个扇区，每个扇区密码6Byte';
	Blockly.Arduino.definitions_['define_6'] = 'unsigned char sectorKeyA[16][16] = {';		
	Blockly.Arduino.definitions_['define_7'] = ' {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF},';
	Blockly.Arduino.definitions_['define_8'] = ' {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF},';
	Blockly.Arduino.definitions_['define_9'] = ' {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF},};';
	
	Blockly.Arduino.definitions_['define_10'] = '//新扇区A密码，16个扇区，每个扇区密码6Byte';
	Blockly.Arduino.definitions_['define_11'] = 'unsigned char sectorNewKeyA[16][16] = {';
	Blockly.Arduino.definitions_['define_12'] = ' {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF},';
	Blockly.Arduino.definitions_['define_13'] = ' {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xff,0x07,0x80,0x69, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF},';
	Blockly.Arduino.definitions_['define_14'] = ' {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xff,0x07,0x80,0x69, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF},};';
	
	Blockly.Arduino.setups_['setup_output_1'] = 'Serial.begin(9600);';
	Blockly.Arduino.setups_['setup_output_2'] = 'SPI.begin();';
	Blockly.Arduino.setups_['setup_output_3'] = 'rfid.init();';
	return "";
};

Blockly.Arduino.RFID_on = function() {
  // Do while/until loop.
  var argument0 = Blockly.Arduino.valueToCode(this, 'uid_',
      Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(this, 'do_');
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
    branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }

  return 'if ( rfid.isCard()  ) {\n' + branch + '}\n';
};

Blockly.Arduino.RFID_readcardnum = function() {
  var funcName='RFID_readcardnum';
	var code='String'+ ' ' + funcName + '() {\n'
		+"\n"+' rfid.readCardSerial();  '
		+"\n"+'  String stringserNum=String(rfid.serNum[0], HEX)+String(rfid.serNum[1], HEX)+String(rfid.serNum[2], HEX)+String(rfid.serNum[3], HEX)+String(rfid.serNum[4], HEX);'
		+"\n"+'      //选卡，返回卡容量（锁定卡片，防止多次读写）'		
		+"\n"+'      rfid.selectTag(rfid.serNum);'
		+"\n"+'  return stringserNum; '//直接返回string
		+ '\n}\n';
	Blockly.Arduino.definitions_[funcName] = code;	
	return  [funcName+'()', Blockly.Arduino.ORDER_ATOMIC];
};

/* Blockly.Arduino.RFID_serialprintcardnum = function() {
  var funcName='RFID_serialprintcardnum';
	var code='void'+ ' ' + funcName + '() {\n'
		+"\n"+' //找卡  '
		+"\n"+' //读取卡序列号 '
		+"\n"+' if (rfid.readCardSerial())  '
		+"\n"+'   {'
		+"\n"+'   Serial.print("The card\'s number is  : "); '
		+"\n"+'  Serial.print(rfid.serNum[0],HEX);  '
		+"\n"+'  Serial.print(rfid.serNum[1],HEX); '
		+"\n"+'   Serial.print(rfid.serNum[2],HEX); '
		+"\n"+'    Serial.print(rfid.serNum[3],HEX);  '
		+"\n"+'  Serial.print(rfid.serNum[4],HEX); '
		+"\n"+'   Serial.println(" "); '
		+"\n"+'    }'	
		+"\n"+'      //选卡，返回卡容量（锁定卡片，防止多次读写）'		
		+"\n"+'      rfid.selectTag(rfid.serNum);'			
		+ '\n}\n';
	Blockly.Arduino.definitions_[funcName] = code;	
	return  funcName+'();\n';
}; */




Blockly.Arduino.RFID_writecarddata = function() {
	var address2 = Blockly.Arduino.valueToCode(this, 'address1', Blockly.Arduino.ORDER_ATOMIC);
	var data2 = this.getFieldValue('data1');
	var funcName='RFID_writecarddata';
	var code='void'+ ' ' + funcName + '(int ad2) {\n' 
	+"\n"+'rfid.readCardSerial();'
	
	+"\n"+'      //选卡，返回卡容量（锁定卡片，防止多次读写）'		
	+"\n"+'      rfid.selectTag(rfid.serNum);'
	+"\n"+'//写数据卡 '
	+"\n"+'   blockAddr = ad2;     '
	+"\n"+'   if (rfid.auth(PICC_AUTHENT1A, blockAddr, sectorKeyA[blockAddr/4], rfid.serNum) == MI_OK)'
	+"\n"+'	{'
	+"\n"+'  //写数据'
	+"\n"+'   status = rfid.write(blockAddr, sectorKeyA[blockAddr/4]);'
	+"\n"+'   Serial.print("set the new card password, and can modify the data of the Sector: "); '
	+"\n"+'   Serial.println(blockAddr/4,DEC);'
	+"\n"+'   blockAddr=blockAddr-3; '
	+"\n"+'   status=rfid.write(blockAddr,(unsigned char*)'+data2+');'
	+"\n"+'   if(status == MI_OK) '
	+"\n"+'   { '
	+"\n"+'   Serial.println("Write card OK!");'
	+"\n"+' } '
	+"\n"+'   }'
	+ '\n}\n';
    Blockly.Arduino.definitions_[funcName] = code;
	return funcName+'('+address2+');\n';
}

Blockly.Arduino.RFID_readcarddata = function() {
	var address3 = Blockly.Arduino.valueToCode(this, 'address', Blockly.Arduino.ORDER_ATOMIC);
	var funcName='RFID_readcarddata'
	var code='String'+ ' ' + funcName + '(int ad3) {\n' 
	+"\n"+'//读卡 '
	+"\n"+'  blockAddr =ad3; '
	+"\n"+'  status = rfid.auth(PICC_AUTHENT1A, blockAddr, sectorNewKeyA[blockAddr/4], rfid.serNum);'
	+"\n"+'	 if (status == MI_OK)  //认证'
	+"\n"+'  {'
	+"\n"+'  //读数据'
	+"\n"+'  if( rfid.read(blockAddr, str) == MI_OK)'
	+"\n"+'  {'
	+"\n"+'  Serial.print("Read from the card ,the data is : ");'
	+"\n"+'  Serial.println((char *)str);'
	+"\n"+'  } '
	+"\n"+'   } '
	+"\n"+'  rfid.halt();'
	+"\n"+'  String stringstr((char*)str);'//str是一个char数组，必须先转换成char*，才能继续转换成string
	+"\n"+'  return stringstr;'
	+ '\n}\n';
    Blockly.Arduino.definitions_[funcName] = code;
	return [funcName+'('+address3+')\n', Blockly.Arduino.ORDER_ATOMIC];
};


/* Blockly.Arduino.RFID_serialprintcarddata = function() {
	var address3 = Blockly.Arduino.valueToCode(this, 'address', Blockly.Arduino.ORDER_ATOMIC);
  var funcName='RFID_serialprintcarddata';
	var code='void'+ ' ' + funcName + '(int ad3) {\n'
	+"\n"+'//读卡 '
	+"\n"+'  blockAddr =ad3; '
	+"\n"+'  status = rfid.auth(PICC_AUTHENT1A, blockAddr, sectorNewKeyA[blockAddr/4], rfid.serNum);'
	+"\n"+'	 if (status == MI_OK)  //认证'
	+"\n"+'  {'
	+"\n"+'  //读数据'
	+"\n"+'  if( rfid.read(blockAddr, str) == MI_OK)'
	+"\n"+'  {'
	+"\n"+'  Serial.print("Read from the card ,the data is : ");'
	+"\n"+'  Serial.println((char *)str);'
	+"\n"+'  } '
	+"\n"+'   } '
	+"\n"+'  rfid.halt();'
	+ '\n}\n';	
	Blockly.Arduino.definitions_[funcName] = code;	
	return  funcName+'('+address3+');\n';
}; */


Blockly.Arduino.RFID_off = function() {
	var funcName='RFID_off';
	var code='void'+ ' ' + funcName + '() {\n'
		+"\n"+' rfid.halt();   '
		+ '\n}\n';
	Blockly.Arduino.definitions_[funcName] = code;	
	return  funcName+'();\n';
};


Blockly.Arduino.RFID_in = function() {
  // Do while/until loop.
  var funcName='RFID_readcardnum';
  var code='String'+ ' ' + funcName + '() {\n'
    +"\n"+' rfid.readCardSerial();  '
    +"\n"+'  String stringserNum=String(rfid.serNum[0], HEX)+String(rfid.serNum[1], HEX)+String(rfid.serNum[2], HEX)+String(rfid.serNum[3], HEX)+String(rfid.serNum[4], HEX);'
    +"\n"+'      //选卡，返回卡容量（锁定卡片，防止多次读写）'   
    +"\n"+'      rfid.selectTag(rfid.serNum);'
    +"\n"+'  return stringserNum; '//直接返回string
    + '\n}\n';
  Blockly.Arduino.definitions_[funcName] = code;  
  var argument0 = Blockly.Arduino.valueToCode(this, 'uid_',
      Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(this, 'do_');
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
    branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  /*
    fixed bug caused by parameter of strcmp() must be const char*
    author:zyc
    date:2018-12-7
   */
  if(argument0!='false'){
    if(argument0.indexOf('\"') === 0)
      return 'if (' + 'strcmp(RFID_readcardnum().c_str(),'+argument0+')==0' + ') {\n' + branch + '}\n';
    else
      return 'if (' + 'strcmp(RFID_readcardnum().c_str(),'+argument0+'.c_str())==0' + ') {\n' + branch + '}\n';
  }
  else
    return '';
    
};
