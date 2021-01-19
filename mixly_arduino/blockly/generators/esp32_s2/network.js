'use strict';

goog.provide('Blockly.Python.network');
goog.require('Blockly.Python');

Blockly.Python.iot_wifi_connect = function(block) {
  Blockly.Python.definitions_['import_mixgoce'] = "import mixgoce";  
  var username =  Blockly.Python.valueToCode(this, 'WIFINAME', Blockly.Python.ORDER_ATOMIC) ;
  var password =  Blockly.Python.valueToCode(this, 'PASSWORD', Blockly.Python.ORDER_ATOMIC) ; 
  var code='mixgoce.do_connect(' + username + ','  + password + ')\n';
  return code;
};