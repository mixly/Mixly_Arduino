goog.provide('Blockly.Python.yeelight');
goog.require('Blockly.Python');


// 'YeeLight 设色温
Blockly.Python['yeelight_set_color_temp'] = function(block) {
  Blockly.Python.definitions_['import_yeelight'] = 'from yeelight import *';
  Blockly.Python.definitions_['import_time'] = 'import time';

  var yeelight_name = block.getFieldValue('yeelight_name');
  var color_temp = Blockly.Python.valueToCode(block, 'color_temp', Blockly.Python.ORDER_ATOMIC);

  var code = 'time.sleep_ms(500)\n' + yeelight_name + '.set_color_temp(' + color_temp + ')\n';
  return code;
};

// 'YeeLight 设颜色
Blockly.Python['yeelight_set_rgb_color'] = function(block) {
  Blockly.Python.definitions_['import_yeelight'] = 'from yeelight import *';
  Blockly.Python.definitions_['import_time'] = 'import time';

  var yeelight_name = block.getFieldValue('yeelight_name');
  var color = block.getFieldValue('COLOUR');
  var r = 0;
  var g = 0;
  var b = 0;
  try {
	if ( color.length == 7 ) {
		r = parseInt(color.substring(1, 3), 16);
		g = parseInt(color.substring(3, 5), 16);
		b = parseInt(color.substring(5, 7), 16);
	}
  } catch(e) {
	  return '';
  }

  var code = 'time.sleep_ms(500)\n' + yeelight_name + '.set_rgb(' + r + ', ' + g + ', ' + b + ')\n';
  return code;
};

// '发现局域网内YeeLight的设备';
Blockly.Python['yeelight_search'] = function(block) {
  Blockly.Python.definitions_['import_yeelight'] = 'from yeelight import *';

  // var code = 'discover_bulbs()\n';
  // return code;

  var code = 'discover_bulbs()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

// '第 %1 个 YeeLight 的 %2';
Blockly.Python['yeelight_config'] = function(block) {
  Blockly.Python.definitions_['import_yeelight'] = 'from yeelight import *';

  var config = block.getFieldValue('config');
  var order = Blockly.Python.valueToCode(block, 'order', Blockly.Python.ORDER_ATOMIC);

  var code = 'discover_bulbs()[' + order + ']' + config;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

// 初始化 YeeLight
Blockly.Python['yeelight_init'] = function(block) {
  Blockly.Python.definitions_['import_yeelight'] = 'from yeelight import *';
  //Blockly.Python.definitions_['import_time'] = 'import time';

  var order = Blockly.Python.valueToCode(block, 'order', Blockly.Python.ORDER_ATOMIC);
  var yeelight_name = block.getFieldValue('yeelight_name');

  var code = yeelight_name + ' = Bulb(discover_bulbs()[' + order + ']["ip"])\n';// + 'time.sleep_ms(500)\n';

  return code;
};

// 指定 ip 初始化 YeeLight
Blockly.Python['yeelight_init_ip'] = function(block) {
  Blockly.Python.definitions_['import_yeelight'] = 'from yeelight import *';
  //Blockly.Python.definitions_['import_time'] = 'import time';

  var yeelight_name = block.getFieldValue('yeelight_name');
  var ip = Blockly.Python.valueToCode(block, 'ip', Blockly.Python.ORDER_ATOMIC);

  var code = yeelight_name + ' = Bulb(' + ip + ')\n';// + 'time.sleep_ms(500)\n';

  return code;
};

// '第 %1 个 YeeLight 的开关状态 %2';
Blockly.Python['yeelight_switch_state'] = function(block) {
  Blockly.Python.definitions_['import_yeelight'] = 'from yeelight import *';
  Blockly.Python.definitions_['import_time'] = 'import time';

  var state = block.getFieldValue('state');
  var yeelight_name = block.getFieldValue('yeelight_name');

  var code = 'time.sleep_ms(500)\n' + yeelight_name + '.' + state + '\n';

  return code;
};

// 'YeeLight 设颜色 r %1 g %2 b %3';
Blockly.Python['yeelight_set_rgb'] = function(block) {
  Blockly.Python.definitions_['import_yeelight'] = 'from yeelight import *';
  Blockly.Python.definitions_['import_time'] = 'import time';

  var yeelight_name = block.getFieldValue('yeelight_name');
  var r = Blockly.Python.valueToCode(block, 'r', Blockly.Python.ORDER_ATOMIC);
  var g = Blockly.Python.valueToCode(block, 'g', Blockly.Python.ORDER_ATOMIC);
  var b = Blockly.Python.valueToCode(block, 'b', Blockly.Python.ORDER_ATOMIC);

  var code = 'time.sleep_ms(500)\n' + yeelight_name + '.set_rgb(' + r + ', ' + g + ',' + b + ')\n';

  return code;
};

// 'YeeLight 设亮度
Blockly.Python['yeelight_set_brightness'] = function(block) {
  Blockly.Python.definitions_['import_yeelight'] = 'from yeelight import *';
  Blockly.Python.definitions_['import_time'] = 'import time';

  var yeelight_name = block.getFieldValue('yeelight_name');
  var brightness = Blockly.Python.valueToCode(block, 'brightness', Blockly.Python.ORDER_ATOMIC);

  var code = 'time.sleep_ms(500)\n' + yeelight_name + '.set_brightness(' + brightness + ')\n';

  return code;
};

// 'YeeLight 设颜色
Blockly.Python['yeelight_set_hsv'] = function(block) {
  Blockly.Python.definitions_['import_yeelight'] = 'from yeelight import *';
  Blockly.Python.definitions_['import_time'] = 'import time';

  var hsv = Blockly.Python.valueToCode(block, 'hsv', Blockly.Python.ORDER_ATOMIC);
  var saturation = Blockly.Python.valueToCode(block, 'saturation', Blockly.Python.ORDER_ATOMIC);
  var yeelight_name = block.getFieldValue('yeelight_name');

  var code = 'time.sleep_ms(500)\n' + yeelight_name + '.set_hsv(' + hsv + ', ' + saturation + ')\n';

  return code;
};

// 0_to_100
Blockly.Python['zero_to_100'] = function(block) {
  var count = block.getFieldValue('count');

  var code = count;

  return [code, Blockly.Python.ORDER_ATOMIC];
};
