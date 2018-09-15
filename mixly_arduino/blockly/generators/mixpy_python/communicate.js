'use strict';

goog.provide('Blockly.Python.communicate');
goog.require('Blockly.Python');

Blockly.Python.requests_get = function() {
  Blockly.Python.definitions_.import_requests = "import requests";
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var str =Blockly.Python.valueToCode(this, 'DOMAIN', Blockly.Python.ORDER_ATOMIC) ;
  var code=varName+'= '+ 'requests.get(' + str + ')\n';

  return code;
 
};


Blockly.Python.requests_attribute = function() {
  Blockly.Python.definitions_.import_requests = "import requests";
  var varName = Blockly.Python.valueToCode(this, 'VAL', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var attr = this.getFieldValue('ATTR');
  var code=varName+"." + attr;
  return [code,Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.requests_method = function() {
  Blockly.Python.definitions_.import_requests = "import requests";    
    var method = this.getFieldValue('DIR');
  var str =Blockly.Python.valueToCode(this, 'DOMAIN', Blockly.Python.ORDER_ATOMIC) ;
  var code="requests." + method + "(" +  str  + ')\n';
  return code;
};