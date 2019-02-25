'use strict';

goog.provide('Blockly.Python.loops');

goog.require('Blockly.Python');

//物联网-wifi信息
Blockly.Python.blynk_server = function() {
	var wifi_ssid = Blockly.Python.valueToCode(this, 'wifi_ssid', Blockly.Python.ORDER_ATOMIC);
	var wifi_pass = Blockly.Python.valueToCode(this, 'wifi_pass', Blockly.Python.ORDER_ATOMIC);
	var auth_key = Blockly.Python.valueToCode(this, 'auth_key', Blockly.Python.ORDER_ATOMIC);
	var server_add = Blockly.Python.valueToCode(this, 'server_add', Blockly.Python.ORDER_ATOMIC);
	Blockly.Python.definitions_.import_time = "import network,time,BlynkLib";
	var code;
	code="wlan = network.WLAN(network.STA_IF)\n";
	code+="wlan.active(True)\n";
	code+="if not wlan.isconnected():\n";
	code+="  print('connecting to network...')\n";
	code+= "  wlan.connect("+wifi_ssid+","+wifi_pass+")\n";
	code+= "  while not wlan.isconnected():\n";
	code+= "    pass\n";
	code+= "print('network config:', wlan.ifconfig())\n";
	code+= "BLYNK_AUTH='"+"auth_key"+"'\n";
	code+= "blynk = BlynkLib.Blynk(BLYNK_AUTH)\n"
	code+= "while True:\n"
	code+= "  blynk.run()\n"
	code+= "  pass\n"
	return code;
};

//物联网-wifi信息
Blockly.Python.blynk_iot_get_data = function() {
	var Vpin = this.getFieldValue('Vpin');
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
  	args[x] = Blockly.Python.valueToCode(this, 'ARG' + x,Blockly.Python.ORDER_NONE) || 'null';
  }
  var code =  '(a' + args.join(', ') + ');\n';
  var vartype="";
  var branch = Blockly.Python.statementToCode(this, 'STACK');
  if (Blockly.Python.INFINITE_LOOP_TRAP) {
  	branch = Blockly.Python.INFINITE_LOOP_TRAP.replace(/%1/g,'\'' + this.id + '\'') + branch;
  }
  var type=this.getFieldValue('TYPE');
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
  	args[x] = this.argumentstype_[x]+ ' '+ Blockly.Python.variableDB_.getName(this.arguments_[x],Blockly.Variables.NAME_TYPE);
  }
  var GetDataCode="";
  if(this.arguments_.length==1)
  {
  	GetDataCode=Blockly.Python.variableDB_.getName(this.arguments_[0],Blockly.Variables.NAME_TYPE);
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
  		args[x] = this.argumentstype_[x]+ ' '+ Blockly.Python.variableDB_.getName(this.arguments_[x],Blockly.Variables.NAME_TYPE);

  		GetDataCode+=Blockly.Python.variableDB_.getName(this.arguments_[x],Blockly.Variables.NAME_TYPE);
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
  	Blockly.Python.definitions_[args] = args.join(';\n')+";";
  var code =' BLYNK_WRITE('+ Vpin+ ') {\n' +GetDataCode+
  branch + '}\n';
 // var code =  'BLYNK_WRITE(' + Vpin+ ') {\n'+variable+" = param.as"+datatype+"();\n"+branch+'}\n';
 code = Blockly.Python.scrub_(this, code);
 Blockly.Python.definitions_[Vpin] = code;
 return null;
};

