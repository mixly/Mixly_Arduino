'use strict';

goog.provide('Blockly.Python.iot');
goog.require('Blockly.Python');


Blockly.Python.IOT_EMQX_INIT = function(block) {
  // var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var server = Blockly.Python.valueToCode(this, 'SERVER', Blockly.Python.ORDER_ATOMIC);
  var port = Blockly.Python.valueToCode(this, 'PORT', Blockly.Python.ORDER_ATOMIC);
  var username = Blockly.Python.valueToCode(this, 'USERNAME', Blockly.Python.ORDER_ATOMIC);
  var password = Blockly.Python.valueToCode(this, 'PASSWORD', Blockly.Python.ORDER_ATOMIC);
  var client_id = Blockly.Python.valueToCode(this, 'CLIENT_ID', Blockly.Python.ORDER_ATOMIC);
  var is_ssl = Blockly.Python.valueToCode(this, 'IS_SSL', Blockly.Python.ORDER_ATOMIC);
  var socket_pool = Blockly.Python.valueToCode(this, 'SOCKET_POOL', Blockly.Python.ORDER_ATOMIC);
  var ssl_context = Blockly.Python.valueToCode(this, 'SSL_CONTEXT', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_adafruit_minimqtt'] = "import adafruit_minimqtt"; 
  var code = 'mqtt_client = adafruit_minimqtt.MQTT(broker='+ server +', port='+ port +', username='+ username +', password='+ password +', client_id='+ client_id +', is_ssl='+ is_ssl +', socket_pool='+ socket_pool +', ssl_context='+ ssl_context+')\n';  
  return code;
};

Blockly.Python.IOT_EMQX_PUBLISH = function(block) {
  // var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var topic = Blockly.Python.valueToCode(this, 'TOPIC', Blockly.Python.ORDER_ATOMIC);
  var msg = Blockly.Python.valueToCode(this, 'MSG', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_adafruit_minimqtt'] = "import adafruit_minimqtt"; 
  var code = 'mqtt_client.publish('+ topic +', '+ msg +')\n';  
  return code;
};
Blockly.Python.IOT_EMQX_PUBLISH_MORE = function(block) {
  // var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var topic = Blockly.Python.valueToCode(this, 'TOPIC', Blockly.Python.ORDER_ATOMIC);
  var msg = Blockly.Python.valueToCode(this, 'MSG', Blockly.Python.ORDER_ATOMIC);
  var retain = Blockly.Python.valueToCode(this, 'RETAIN');
  var qos = Blockly.Python.valueToCode(this, 'QOS');
  Blockly.Python.definitions_['import_adafruit_minimqtt'] = "import adafruit_minimqtt"; 
  var code = 'mqtt_client.publish('+ topic +', '+ msg +', '+ retain +', '+ qos +')\n';  
  return code;
};

Blockly.Python.IOT_EMQX_DEINIT = function(block) {
  // var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_adafruit_minimqtt'] = "import adafruit_minimqtt"; 
  var code = 'mqtt_client.deinit()\n';  
  return code;
};

Blockly.Python.IOT_EMQX_ADD_TOPIC_CALLBACK = function(block) {
  // var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var topic = Blockly.Python.valueToCode(this, 'TOPIC', Blockly.Python.ORDER_ATOMIC);
  var method = Blockly.Python.valueToCode(this, 'METHOD', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_adafruit_minimqtt'] = "import adafruit_minimqtt"; 
  var code = 'mqtt_client.add_topic_callback('+topic +', '+ method+')\n';  
  return code;
};

Blockly.Python.IOT_EMQX_REMOVE_TOPIC_CALLBACK = function(block) {
  // var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var topic = Blockly.Python.valueToCode(this, 'TOPIC', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_adafruit_minimqtt'] = "import adafruit_minimqtt"; 
  var code = 'mqtt_client.remove_topic_callback('+topic +')\n';  
  return code;
};

//基本完成
Blockly.Python.IOT_EMQX_USERNAME_PW_SET = function(block){
  // var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var username = Blockly.Python.valueToCode(this, 'USERNAME', Blockly.Python.ORDER_ATOMIC);
  var password = Blockly.Python.valueToCode(this, 'PASSWORD', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_adafruit_minimqtt'] = "import adafruit_minimqtt"; 
  var code = 'mqtt_client.username_pw_set('+ username +','+ password+ ')\n';
  return code;
};

Blockly.Python.IOT_EMQX_RECONNECT = function(block) {
  // var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_adafruit_minimqtt'] = "import adafruit_minimqtt"; 
  var code = 'mqtt_client.reconnect()\n';  
  return code;
};

Blockly.Python.IOT_EMQX_CONNECT = function(block) {
  // var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_adafruit_minimqtt'] = "import adafruit_minimqtt"; 
  var code = 'mqtt_client.connect()\n';  
  return code;
};

Blockly.Python.IOT_EMQX_MQTT_DISCONNECT = function(block) {
  // var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_adafruit_minimqtt'] = "import adafruit_minimqtt"; 
  var code = 'mqtt_client.disconnect()\n';  
  return code;
};

Blockly.Python.IOT_EMQX_IS_CONNECT = function (block) {
    // var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var topic = Blockly.Python.valueToCode(this, 'IS_CON', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_adafruit_minimqtt'] = "import adafruit_minimqtt";
    var code = 'mqtt_client.is_connect(' + topic + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.IOT_EMQX_PING = function(block) {
  // var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_adafruit_minimqtt'] = "import adafruit_minimqtt"; 
  var code = 'mqtt_client.ping()\n';  
  return code;
};

Blockly.Python.CREATE_DEFAULT_CONTEXT = function(block) {
  Blockly.Python.definitions_['import ssl'] = "import ssl"; 
  var code = 'ssl.create_default_context()';  
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.CREATE_SOCKETPOOL = function(block) {
  // var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var r = Blockly.Python.valueToCode(this, 'RADIO', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import socketpool'] = "import socketpool"; 
  var code = 'socketpool.SocketPool(wifi.radio)';  
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.IOT_EMQX_SUBSCRIBE = function (block) {
    // var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var topic = Blockly.Python.valueToCode(this, 'TOPIC', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_adafruit_minimqtt'] = "import adafruit_minimqtt";
    var code = 'mqtt_client.subscribe(' + topic + ')\n';
    return code;
};

Blockly.Python.IOT_EMQX_SUBSCRIBE_MORE = function (block) {
    // var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var topic = Blockly.Python.valueToCode(this, 'TOPIC', Blockly.Python.ORDER_ATOMIC); 
    var qos = Blockly.Python.valueToCode(this, 'QOS'); 
    Blockly.Python.definitions_['import_adafruit_minimqtt'] = "import adafruit_minimqtt";
    var code = 'mqtt_client.subscribe(' + topic + ','+ qos +')\n';
    return code;
};

Blockly.Python.IOT_EMQX_UNSUBSCRIBE = function (block) {
    // var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var topic = Blockly.Python.valueToCode(this, 'TOPIC', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_adafruit_minimqtt'] = "import adafruit_minimqtt";
    var code = 'mqtt_client.unsubscribe(' + topic + ')\n';
    return code;
};

Blockly.Python.IOT_EMQX_LOOP = function (block) {
    // var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var timeout = Blockly.Python.valueToCode(this, 'TIMEOUT', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_adafruit_minimqtt'] = "import adafruit_minimqtt";
    var code = 'mqtt_client.loop(' + timeout + ')\n';
    return code;
};

Blockly.Python.IOT_EMQX_ENABLE_LOGGER = function (block) {
    // var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var topic = Blockly.Python.valueToCode(this, 'LEVEL', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_adafruit_minimqtt'] = "import adafruit_minimqtt";
    var code = 'mqtt_client.enable_logger(' + topic + ')\n';
    return code;
};

Blockly.Python.WIFI_RADIO_CONNECT = function(block){
  // var v = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var username = Blockly.Python.valueToCode(this, 'USERNAME', Blockly.Python.ORDER_ATOMIC);
  var password = Blockly.Python.valueToCode(this, 'PASSWORD', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_wifi'] = "import wifi"; 
  var code = 'wifi.radio.connect('+ username +','+ password+ ')\n';
  return code;
};

