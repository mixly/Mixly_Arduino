'use strict';

goog.provide('Blockly.Python.iot');
goog.require('Blockly.Python');

Blockly.Python.iot_wifi_connect = function(block) {
  Blockly.Python.definitions_.from_simple_import_MQTTClient = "from simple import MQTTClient";  
  Blockly.Python.definitions_['import_iot_*'] = "from iot import *";  
  var username =  Blockly.Python.valueToCode(this, 'WIFINAME', Blockly.Python.ORDER_ATOMIC) ;
  var password =  Blockly.Python.valueToCode(this, 'PASSWORD', Blockly.Python.ORDER_ATOMIC) ; 
  var code='do_connect(' + username + ','  + password + ')\n';
  return code;
};

Blockly.Python.iot_onenet_connect = function(block) {
  Blockly.Python.definitions_.from_simple_import_MQTTClient = "from simple import MQTTClient";
  var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  var client =  Blockly.Python.valueToCode(this, 'CLIENT', Blockly.Python.ORDER_ATOMIC) ;
  var server =  Blockly.Python.valueToCode(this, 'SERVER', Blockly.Python.ORDER_ATOMIC) ;
  var username =  Blockly.Python.valueToCode(this, 'USERNAME', Blockly.Python.ORDER_ATOMIC) ;
  var password =  Blockly.Python.valueToCode(this, 'PASSWORD', Blockly.Python.ORDER_ATOMIC) ;
  var topic =  Blockly.Python.valueToCode(this, 'TOPIC', Blockly.Python.ORDER_ATOMIC) ;
  var subscribe = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code= v + ' = init_MQTT_client(' + client + ', ' + server + ', '+ username + ', ' + password +', ' + topic+', ' + subscribe + ')\n';
  return code;
};

Blockly.Python.iot_onenet_disconnect = function(block) {
  var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  Blockly.Python.definitions_.from_simple_import_MQTTClient = "from simple import MQTTClient"; 
  var code=v + '.disconnect()\n';  
  return code;
};

Blockly.Python.iot_onenet_check = function(block) {
  var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ; 
  Blockly.Python.definitions_.from_simple_import_MQTTClient = "from simple import MQTTClient"; 
  var code=v + '.check_msg()\n';  
  return code;
};

Blockly.Python.iot_onenet_publish = function() {
  // Create a list with any number of elements of any type.
  
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  Blockly.Python.definitions_['import_iot_*'] = "from iot import *";  
  var ck = new Array(this.itemCount_);
  var cv = new Array(this.itemCount_);
  var ct = new Array(this.itemCount_);

  var default_value = '0';
  var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;

  for (var n = 0; n < this.itemCount_; n++) {
  var keyName = this.getFieldValue('KEY' + n);    
  ck[n] = keyName
  }
  for (var n = 0; n < this.itemCount_; n++) {     
  cv[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
    Blockly.Python.ORDER_NONE) || default_value;
  }
  var code=v + ".publish('$dp', pubData({'datastreams':[";
  for (var n = 0; n < this.itemCount_; n++) {
    ct[n] ='{"id":"'+ck[n]+'","datapoints":[{"value":'
    ct[n] +=cv[n]+'}]}'
  }
  //var code = "c.publish('$dp', pubData("+ '{' + code.join(', ') + '})\n';
  //var code =''+varName+'['+size+"]"+'='+ '{' + code.join(', ') + '};\n';
  //Blockly.Python.setups_['setup_lists'+varName] = code;
  code=code+ct.join(', ')+"]}))\n";
  return code;
};
