goog.provide('Blockly.Blocks.yeelight');
goog.require('Blockly.Blocks');


var YEELIGHT_COLOR = "#DF2B2F";
var zero_to_100 = [
['0', '0'],
['10', '10'],
['20', '20'],
['30', '30'],
['40', '40'],
['50', '50'],
['60', '60'],
['70', '70'],
['80', '80'],
['90', '90'],
['100', '100']
];

// 色溫
Blockly.Blocks['yeelight_set_color_temp'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": YEELIGHT_COLOR,
			"helpUrl": Blockly.Msg.YEELIGHT_SET_COLOR_TEMP_HELPURL,
			"tooltip": Blockly.Msg.YEELIGHT_SET_COLOR_TEMP_TOOLTIP,
			"message0": Blockly.Msg.YEELIGHT_SET_COLOR_TEMP_MESSAGE0,
			"args0": [
			{
				"text": "bulb",
				"type": "field_input",
				"name": "yeelight_name"
			}
			,
			{
				"check": Number,
				"type": "input_value",
				"name": "color_temp"
			}
			]
		});
	}
};

//  'YeeLight 设颜色
Blockly.Blocks['yeelight_set_rgb_color'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": YEELIGHT_COLOR,
			"helpUrl": Blockly.Msg.YEELIGHT_SET_RGB_COLOR_HELPURL,
			"tooltip": Blockly.Msg.YEELIGHT_SET_RGB_COLOR_TOOLTIP,
			"message0": Blockly.Msg.YEELIGHT_SET_RGB_COLOR_MESSAGE0,
			"args0": [
			{
				"text": "bulb",
				"type": "field_input",
				"name": "yeelight_name"
			}
			,
			{
				"type": "field_colour",
				"name": "COLOUR",
				"colour": "#20B2AA"
			}
			]
		});
	}
};

Blockly.Blocks['zero_to_100'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			'output': null,
			"colour": YEELIGHT_COLOR,
			"helpUrl": Blockly.Msg.zero_to_100_HELPURL,
			"tooltip": Blockly.Msg.zero_to_100_TOOLTIP,
			"message0": Blockly.Msg.zero_to_100_MESSAGE0,
			"args0": [
			{
				"options": zero_to_100,
				"type": "field_dropdown",
				"name": "count"
			}
			]
		});
	}
};

//  '发现局域网内YeeLight的设备';
Blockly.Blocks['yeelight_search'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			// "nextStatement": null,
			// "previousStatement": null,
			"output": null,
			"colour": YEELIGHT_COLOR,
			"helpUrl": Blockly.Msg.YEELIGHT_SEARCH_HELPURL,
			"tooltip": Blockly.Msg.YEELIGHT_SEARCH_TOOLTIP,
			"message0": Blockly.Msg.YEELIGHT_SEARCH_MESSAGE0,
		});
	}
};

//  '第 %1 个 YeeLight 的 %2';
Blockly.Blocks['yeelight_config'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"output":null,
			"colour": YEELIGHT_COLOR,
			"helpUrl": Blockly.Msg.YEELIGHT_CONFIG_HELPURL,
			"tooltip": Blockly.Msg.YEELIGHT_CONFIG_TOOLTIP,
			"message0": Blockly.Msg.YEELIGHT_CONFIG_MESSAGE0,
			"args0": [
			{
				"check": Number,
				"type": "input_value",
				"name": "order"
			}
			,
			{
				"options": [
				['ip', "['ip']"],
				['port', "['port']"],
				[Blockly.MIXLY_BRIGHTNESS, "['capabilities']['bright']"]
				],
				"type": "field_dropdown",
				"name": "config"
			}
			]
		});
	}
};

// '初始化 YeeLight 网内 ip %1';
Blockly.Blocks['yeelight_init'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": YEELIGHT_COLOR,
			"helpUrl": Blockly.Msg.YEELIGHT_INIT_HELPURL,
			"tooltip": Blockly.Msg.YEELIGHT_INIT_TOOLTIP,
			"message0": Blockly.Msg.YEELIGHT_INIT_MESSAGE0,
			"args0": [
			{
				"check": Number,
				"type": "input_value",
				"name": "order"
			}
			,
			{
				"text": "bulb",
				"type": "field_input",
				"name": "yeelight_name"
			}
			]
		});
	}
};

// '初始化 YeeLight 网内 ip';
Blockly.Blocks['yeelight_init_ip'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": YEELIGHT_COLOR,
			"helpUrl": Blockly.Msg.YEELIGHT_INIT_IP_HELPURL,
			"tooltip": Blockly.Msg.YEELIGHT_INIT_IP_TOOLTIP,
			"message0": Blockly.Msg.YEELIGHT_INIT_IP_MESSAGE0,
			"args0": [
			{
				"text": "bulb",
				"type": "field_input",
				"name": "yeelight_name"
			},
			{
				"check": String,
				"type": "input_value",
				"name": "ip"
			}
			]
		});
	}
};

//  '第 %1 个 YeeLight 的开关状态 %2';
Blockly.Blocks['yeelight_switch_state'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": YEELIGHT_COLOR,
			"helpUrl": Blockly.Msg.YEELIGHT_SWITCH_STATE_HELPURL,
			"tooltip": Blockly.Msg.YEELIGHT_SWITCH_STATE_TOOLTIP,
			"message0": Blockly.Msg.YEELIGHT_SWITCH_STATE_MESSAGE0,
			"args0": [
			{
				"text": "bulb",
				"type": "field_input",
				"name": "yeelight_name"
			}
			,
			{
				"options": [
				[Blockly.MIXLY_MICROBIT_PY_COMMUNICATE_ON, "turn_on()"],
				[Blockly.MIXLY_MICROBIT_PY_COMMUNICATE_OFF, "turn_off()"],
				[Blockly.MIXLY_ESP32_TOGGLE, "toggle()"]
				],
				"type": "field_dropdown",
				"name": "state"
			}
			]
		});
	}
};

//  'YeeLight 设颜色 r %1 g %2 b %3';
Blockly.Blocks['yeelight_set_rgb'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": YEELIGHT_COLOR,
			"helpUrl": Blockly.Msg.YEELIGHT_SET_RGB_HELPURL,
			"tooltip": Blockly.Msg.YEELIGHT_SET_RGB_TOOLTIP,
			"message0": Blockly.Msg.YEELIGHT_SET_RGB_MESSAGE0,
			"args0": [
			{
				"text": "bulb",
				"type": "field_input",
				"name": "yeelight_name"
			}
			,
			{
				"check": Number,
				"type": "input_value",
				"name": "r"
			}
			,
			{
				"check": Number,
				"type": "input_value",
				"name": "g"
			}
			,
			{
				"check": Number,
				"type": "input_value",
				"name": "b"
			}
			]
		});
	}
};

//  'YeeLight 设亮度
Blockly.Blocks['yeelight_set_brightness'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": YEELIGHT_COLOR,
			"helpUrl": Blockly.Msg.YEELIGHT_SET_BRIGHTNESS_HELPURL,
			"tooltip": Blockly.Msg.YEELIGHT_SET_BRIGHTNESS_TOOLTIP,
			"message0": Blockly.Msg.YEELIGHT_SET_BRIGHTNESS_MESSAGE0,
			"args0": [
			{
				"text": "bulb",
				"type": "field_input",
				"name": "yeelight_name"
			}
			,
			{
				"check": Number,
				"type": "input_value",
				"name": "brightness"
			}
			]
		});
	}
};

//  'YeeLight 设颜色
Blockly.Blocks['yeelight_set_hsv'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": YEELIGHT_COLOR,
			"helpUrl": Blockly.Msg.YEELIGHT_SET_HSV_HELPURL,
			"tooltip": Blockly.Msg.YEELIGHT_SET_HSV_TOOLTIP,
			"message0": Blockly.Msg.YEELIGHT_SET_HSV_MESSAGE0,
			"args0": [
			{
				"text": "bulb",
				"type": "field_input",
				"name": "yeelight_name"
			}
			,
			{
				"check": Number,
				"type": "input_value",
				"name": "hsv"
			}
			,
			{
				"check": Number,
				"type": "input_value",
				"name": "saturation"
			}
			]
		});
	}
};
