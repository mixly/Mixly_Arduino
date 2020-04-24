'use strict';

goog.provide('Blockly.Arduino.SCoop');

goog.require('Blockly.Arduino');


Blockly.Arduino['SCoopTask']=function() {
	var _tasknum = this.getFieldValue('_tasknum');
	var statements_setup = Blockly.Arduino.statementToCode(this, 'setup');
	var statements_loop = Blockly.Arduino.statementToCode(this, 'loop');
	var taskcode='defineTask(scoopTask'+_tasknum+')\n'
	+'void scoopTask'+_tasknum+'::setup()\n'
	+'{\n'
	+ statements_setup
	+'}\n'
	+'void scoopTask'+_tasknum+'::loop()\n'
	+'{\n'
	+ statements_loop
	+'}\n';
	var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    var select = false;
	var data = "";
	var output_data = "";
	//去除XML中的id、x、y
	for(var i of xmlText)
	{
	  	if(data.length == 4)
      	{
	      	if(data == "id=\"" || data == " x=\"" || data == " y=\"")
	      	{
	        	select = true;
	       		if(data == "id=\"")
	       		{
	          		output_data = output_data.substring(0,output_data.length - 5);
	       		}
	        	else
	        	{
	          		output_data = output_data.substring(0,output_data.length - 4);
	        	}
	      	}
	      	data = data.substring(1);
	      	data+=i;
	    }
	    else
	    {
	      	data+=i;
	      	output_data+=i;
	      	continue;
	    }
	    if(select)
	    {
	      	if(i == "\"")
	      	{
	        	select = false;
	      	}
	      	else
	      	{
	        	continue;
	      	}
	    }
	    else
	    {
	      	output_data+=i;
	    }
	}
    output_data = output_data.replace(/\s/g,"");
    output_data = output_data.replace(/\n/g,"");
    var left_indexOf = output_data.indexOf("<blocktype=\"SCoopTask\"><fieldname=\"_tasknum\">"+_tasknum+"</field>");
    var right_indexOf = output_data.lastIndexOf("<blocktype=\"SCoopTask\"><fieldname=\"_tasknum\">"+_tasknum+"</field>");
    if(left_indexOf == -1 || left_indexOf == right_indexOf)
    {
    	this.setWarningText(null);
    }
    else
    {
        this.setWarningText(Blockly.SCOOPTASK_WARNING);
    }
	Blockly.Arduino.definitions_['include_Scoop'] = '#include \"SCoop.h\"';
	Blockly.Arduino.setups_['scoop_start'] = 'mySCoop.start();';
	Blockly.Arduino.definitions_['scoop_task'+_tasknum] = taskcode;
	var code="";
	return code;
};

Blockly.Arduino['SCoop_yield']=function() {
	var code = 'yield();\n';
	return code;
};
Blockly.Arduino['SCoop_sleep'] = function() {
  var value_sleeplength = Blockly.Arduino.valueToCode(this, 'sleeplength',Blockly.Arduino.ORDER_ATOMIC);
  var code = 'sleep('+value_sleeplength+');\n'
  return code;
};
