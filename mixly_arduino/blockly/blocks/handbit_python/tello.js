goog.provide('Blockly.Blocks.tello');
goog.require('Blockly.Blocks');


var TELLO_COLOR = '#4C4947';

var TELLO_MID = [['m-1', 'm-1'], ['m-2', 'm-2'], ['m1', 'm1'], ['m2', 'm2'], ['m3', 'm3'], ['m4', 'm4'], ['m5', 'm5'], ['m6', 'm6'], ['m7', 'm7'], ['m8', 'm8']];


Blockly.Blocks['tello_init'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_INIT_HELPURL,
			"tooltip": Blockly.Msg.TELLO_INIT_TOOLTIP,
			"message0": Blockly.Msg.TELLO_INIT_MESSAGE0
		});
	}
};

Blockly.Blocks['tello_repeat_forever'] = {
	init: function () {
		this.jsonInit({
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_REPEAT_FOREVER_HELPURL,
			"tooltip": Blockly.Msg.TELLO_REPEAT_FOREVER_TOOLTIP,
			"message0": Blockly.Msg.TELLO_REPEAT_FOREVER_MESSAGE0
		});
		this.appendStatementInput('DO')
			.appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);	
	}
};

Blockly.Blocks['tello_point'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"output": String,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_POINT_HELPURL,
			"tooltip": Blockly.Msg.TELLO_POINT_TOOLTIP,
			"message0": Blockly.Msg.TELLO_POINT_MESSAGE0,
			"args0": [
                {
                    "check": Number,
                    "type": "input_value",
                    "name": "x"
                },
                {
                    "check": Number,
                    "type": "input_value",
                    "name": "y"
                },
                {
                    "check": Number,
                    "type": "input_value",
                    "name": "z"
                }
			]
		});
	}
};

Blockly.Blocks['tello_command'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_COMMAND_HELPURL,
			"tooltip": Blockly.Msg.TELLO_COMMAND_TOOLTIP,
			"message0": Blockly.Msg.TELLO_COMMAND_MESSAGE0
		});
	}
};

Blockly.Blocks['tello_takeoff'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_TAKEOFF_HELPURL,
			"tooltip": Blockly.Msg.TELLO_TAKEOFF_TOOLTIP,
			"message0": Blockly.Msg.TELLO_TAKEOFF_MESSAGE0
		});
	}
};

Blockly.Blocks['tello_land'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_LAND_HELPURL,
			"tooltip": Blockly.Msg.TELLO_LAND_TOOLTIP,
			"message0": Blockly.Msg.TELLO_LAND_MESSAGE0
		});
	}
};

Blockly.Blocks['tello_stream'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_STREAM_HELPURL,
			"tooltip": Blockly.Msg.TELLO_STREAM_TOOLTIP,
			"message0": Blockly.Msg.TELLO_STREAM_MESSAGE0,
			"args0": [
				{
                  "options": [
                    [Blockly.MIXLY_MICROBIT_Turn_on_display, 'on'],
                    [Blockly.MIXLY_MICROBIT_Turn_off_display, 'off']
                  ],
                  "type": "field_dropdown",
                  "name": "tello_mode"
                }
			]
		});
	}
};

Blockly.Blocks['tello_emergency'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_EMERGENCY_HELPURL,
			"tooltip": Blockly.Msg.TELLO_EMERGENCY_TOOLTIP,
			"message0": Blockly.Msg.TELLO_EMERGENCY_MESSAGE0
		});
	}
};

Blockly.Blocks['tello_fly'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_FLY_HELPURL,
			"tooltip": Blockly.Msg.TELLO_FLY_TOOLTIP,
			"message0": Blockly.Msg.TELLO_FLY_MESSAGE0,
			"args0": [
				{
                  "options": [
                    [Blockly.MIXLY_UP, 'up'],
                    [Blockly.MIXLY_DOWN, 'down'],
                    [Blockly.MIXLY_LEFT, 'left'],
                    [Blockly.MIXLY_RIGHT, 'right'],
                    [Blockly.Msg.TELLO_FORWARD, 'forward'],
                    [Blockly.Msg.TELLO_BACK, 'back']
                  ],
                  "type": "field_dropdown",
                  "name": "tello_direction"
                },
                {
                    "check": Number,
                    "type": "input_value",
                    "name": "x"
                }   
			]
		});
	}
};

Blockly.Blocks['tello_rotate'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_ROTATE_HELPURL,
			"tooltip": Blockly.Msg.TELLO_ROTATE_TOOLTIP,
			"message0": Blockly.Msg.TELLO_ROTATE_MESSAGE0,
			"args0": [
				{
                  "options": [
                    [Blockly.Msg.TELLO_CLOCKWISE, 'cw'],
                    [Blockly.Msg.TELLO_ANTICLOCKWISE, 'ccw']
                  ],
                  "type": "field_dropdown",
                  "name": "tello_rotate_direction"
                },
                {
                    "check": Number,
                    "type": "input_value",
                    "name": "angle"
                }
			]
		});
	}
};

Blockly.Blocks['tello_roll'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_ROLL_HELPURL,
			"tooltip": Blockly.Msg.TELLO_ROLL_TOOLTIP,
			"message0": Blockly.Msg.TELLO_ROLL_MESSAGE0,
			"args0": [
				{
                  "options": [
                    [Blockly.MIXLY_LEFT, 'l'],
                    [Blockly.MIXLY_RIGHT, 'r'],
                    [Blockly.Msg.TELLO_FORWARD, 'f'],
                    [Blockly.Msg.TELLO_BACK, 'b']
                  ],
                  "type": "field_dropdown",
                  "name": "tello_direction"
                }
			]
		});
	}
};

Blockly.Blocks['tello_go_speed'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_GO_SPEED_HELPURL,
			"tooltip": Blockly.Msg.TELLO_GO_SPEED_TOOLTIP,
			"message0": Blockly.Msg.TELLO_GO_SPEED_MESSAGE0,
			"args0": [
                {
                    "check": Number,
                    "type": "input_value",
                    "name": "speed"
                },
                {
                    "check": String,
                    "type": "input_value",
                    "name": "point"
                }
			]
		});
	}
};

Blockly.Blocks['tello_stop'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_STOP_HELPURL,
			"tooltip": Blockly.Msg.TELLO_STOP_TOOLTIP,
			"message0": Blockly.Msg.TELLO_STOP_MESSAGE0
		});
	}
};

Blockly.Blocks['tello_curve_speed'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": false,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_CURVE_SPEED_HELPURL,
			"tooltip": Blockly.Msg.TELLO_CURVE_SPEED_TOOLTIP,
			"message0": Blockly.Msg.TELLO_CURVE_SPEED_MESSAGE0,
			"args0": [
                {
                    "check": Number,
                    "type": "input_value",
                    "name": "speed"
                },
                {
                    "check": String,
                    "type": "input_value",
                    "name": "point1"
                },
                {
                    "check": String,
                    "type": "input_value",
                    "name": "point2"
                }
			]
		});
	}
};

Blockly.Blocks['tello_go_speed_mid'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_GO_SPEED_MID_HELPURL,
			"tooltip": Blockly.Msg.TELLO_GO_SPEED_MID_TOOLTIP,
			"message0": Blockly.Msg.TELLO_GO_SPEED_MID_MESSAGE0,
			"args0": [
                {
                    "check": Number,
                    "type": "input_value",
                    "name": "speed"
                },
				{
                  "options": TELLO_MID,
                  "type": "field_dropdown",
                  "name": "tello_mid"
                },
                {
                    "check": String,
                    "type": "input_value",
                    "name": "point"
                }
			]
		});
	}
};

Blockly.Blocks['tello_curve_speed_mid'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": false,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_CURVE_SPEED_MID_HELPURL,
			"tooltip": Blockly.Msg.TELLO_CURVE_SPEED_MID_TOOLTIP,
			"message0": Blockly.Msg.TELLO_CURVE_SPEED_MID_MESSAGE0,
			"args0": [
                {
                    "check": Number,
                    "type": "input_value",
                    "name": "speed"
                },
				{
                  "options": TELLO_MID,
                  "type": "field_dropdown",
                  "name": "tello_mid"
                },
                {
                    "check": String,
                    "type": "input_value",
                    "name": "point1"
                },
                {
                    "check": String,
                    "type": "input_value",
                    "name": "point2"
                }
			]
		});
	}
};

Blockly.Blocks['tello_jump_speed_mid'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": false,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_JUMP_SPEED_MID_HELPURL,
			"tooltip": Blockly.Msg.TELLO_JUMP_SPEED_MID_TOOLTIP,
			"message0": Blockly.Msg.TELLO_JUMP_SPEED_MID_MESSAGE0,
			"args0": [
                {
                    "check": Number,
                    "type": "input_value",
                    "name": "speed"
                },
				{
                  "options": TELLO_MID,
                  "type": "field_dropdown",
                  "name": "tello_mid1"
                },
                {
                    "check": String,
                    "type": "input_value",
                    "name": "point"
                },
				{
                  "options": TELLO_MID,
                  "type": "field_dropdown",
                  "name": "tello_mid2"
                },				
                {
                    "check": Number,
                    "type": "input_value",
                    "name": "yaw"
                }
			]
		});
	}
};

Blockly.Blocks['tello_set_speed'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_SET_SPEED_HELPURL,
			"tooltip": Blockly.Msg.TELLO_SET_SPEED_TOOLTIP,
			"message0": Blockly.Msg.TELLO_SET_SPEED_MESSAGE0,
			"args0": [
                {
                    "check": Number,
                    "type": "input_value",
                    "name": "speed"
                }
			]
		});
	}
};

Blockly.Blocks['tello_set_rc'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_SET_RC_HELPURL,
			"tooltip": Blockly.Msg.TELLO_SET_RC_TOOLTIP,
			"message0": Blockly.Msg.TELLO_SET_RC_MESSAGE0,
			"args0": [
                {
					"type": "input_dummy"
                },
                {
                    "check": Number,
                    "type": "input_value",
                    "name": "a"
                },
                {
                    "check": Number,
                    "type": "input_value",
                    "name": "b"
                },
                {
                    "check": Number,
                    "type": "input_value",
                    "name": "c"
                },
                {
                    "check": Number,
                    "type": "input_value",
                    "name": "d"
                }
			]
		});
	}
};

Blockly.Blocks['tello_set_wifi'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": false,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_SET_WIFI_HELPURL,
			"tooltip": Blockly.Msg.TELLO_SET_WIFI_TOOLTIP,
			"message0": Blockly.Msg.TELLO_SET_WIFI_MESSAGE0,
			"args0": [
                {
					"type": "input_dummy"
                },
                {
                    "type": "field_input",
                    "name": "ssid",
					"text": "TELLO"
                },
                {
                    "type": "field_input",
                    "name": "pass",
					"text": ""
                }
			]
		});
	}
};

Blockly.Blocks['tello_set_m'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_SET_M_HELPURL,
			"tooltip": Blockly.Msg.TELLO_SET_M_TOOLTIP,
			"message0": Blockly.Msg.TELLO_SET_M_MESSAGE0,
			"args0": [
                {
                  "options": [
                    [Blockly.MIXLY_MICROBIT_Turn_on_display, 'on'],
                    [Blockly.MIXLY_MICROBIT_Turn_off_display, 'off']
                  ],
                  "type": "field_dropdown",
                  "name": "tello_mode"
                }
			]
		});
	}
};

Blockly.Blocks['tello_set_mdirection'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_SET_MDIRECTION_HELPURL,
			"tooltip": Blockly.Msg.TELLO_SET_MDIRECTION_TOOLTIP,
			"message0": Blockly.Msg.TELLO_SET_MDIRECTION_MESSAGE0,
			"args0": [
                {
                  "options": [
                    [Blockly.Msg.TELLO_MDIRECTION0, '0'],
                    [Blockly.Msg.TELLO_MDIRECTION1, '1'],
                    [Blockly.Msg.TELLO_MDIRECTION2, '2']
                  ],
                  "type": "field_dropdown",
                  "name": "tello_mode"
                }
			]
		});
	}
};

Blockly.Blocks['tello_set_ap'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": false,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_SET_AP_HELPURL,
			"tooltip": Blockly.Msg.TELLO_SET_AP_TOOLTIP,
			"message0": Blockly.Msg.TELLO_SET_AP_MESSAGE0,
			"args0": [
                {
					"type": "input_dummy"
                },
                {
                    "type": "field_input",
                    "name": "ssid",
					"text": ""
                },
                {
                    "type": "field_input",
                    "name": "pass",
					"text": ""
                }
			]
		});
	}
};

Blockly.Blocks['tello_custom'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_CUSTOM_HELPURL,
			"tooltip": Blockly.Msg.TELLO_CUSTOM_TOOLTIP,
			"message0": Blockly.Msg.TELLO_CUSTOM_MESSAGE0,
			"args0": [
                {
                    "check": String,
                    "type": "input_value",
                    "name": "command"
                }
			]
		});
	}
};

Blockly.Blocks['tello_ask_param'] = {  
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"nextStatement": null,
			"previousStatement": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_ASK_PARAM_HELPURL,
			"tooltip": Blockly.Msg.TELLO_ASK_PARAM_TOOLTIP,
			"message0": Blockly.Msg.TELLO_ASK_PARAM_MESSAGE0,
			"args0": [
                {
                  "options": [
                    [Blockly.Msg.TELLO_PARAM_SPEED, 'speed'],
                    [Blockly.Msg.TELLO_PARAM_TIME, 'time'],
                    [Blockly.Msg.TELLO_PARAM_WIFI, 'wifi'],
                    [Blockly.Msg.TELLO_PARAM_SDK, 'sdk'],
                    [Blockly.Msg.TELLO_PARAM_SN, 'sn']
                  ],
                  "type": "field_dropdown",
                  "name": "tello_param"
                }
			]
		});
	}
};

Blockly.Blocks['tello_get_param'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"output": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_GET_PARAM_HELPURL,
			"tooltip": Blockly.Msg.TELLO_GET_PARAM_TOOLTIP,
			"message0": Blockly.Msg.TELLO_GET_PARAM_MESSAGE0,
			"args0": [
                {
                  "options": [
                    //[Blockly.Msg.TELLO_PARAM_SPEED, 'speed'],
                    [Blockly.Msg.TELLO_PARAM_BAT, 'bat'],
                    [Blockly.Msg.TELLO_PARAM_TIME, 'time'],
                    //[Blockly.Msg.TELLO_PARAM_WIFI, 'wifi'],
                    //[Blockly.Msg.TELLO_PARAM_SDK, 'sdk'],
                    //[Blockly.Msg.TELLO_PARAM_SN, 'sn'],
                    [Blockly.Msg.TELLO_PARAM_MID, 'mid'],
                    [Blockly.Msg.TELLO_PARAM_X, 'x'],
                    [Blockly.Msg.TELLO_PARAM_Y, 'y'],
                    [Blockly.Msg.TELLO_PARAM_Z, 'z'],
                    [Blockly.Msg.TELLO_PARAM_MPRY, 'mpry'],
                    [Blockly.Msg.TELLO_PARAM_PITCH, 'pitch'],
                    [Blockly.Msg.TELLO_PARAM_ROLL, 'roll'],
                    [Blockly.Msg.TELLO_PARAM_YAW, 'yaw'],
                    [Blockly.Msg.TELLO_PARAM_VGX, 'vgx'],
                    [Blockly.Msg.TELLO_PARAM_VGY, 'vgy'],
                    [Blockly.Msg.TELLO_PARAM_VGZ, 'vgz'],
                    [Blockly.Msg.TELLO_PARAM_TEMPL, 'templ'],
                    [Blockly.Msg.TELLO_PARAM_TEMPH, 'temph'],
                    [Blockly.Msg.TELLO_PARAM_TOF, 'tof'],
                    [Blockly.Msg.TELLO_PARAM_H, 'h'],
                    [Blockly.Msg.TELLO_PARAM_BARO, 'baro'],
                    [Blockly.Msg.TELLO_PARAM_AGX, 'agx'],
                    [Blockly.Msg.TELLO_PARAM_AGY, 'agy'],
                    [Blockly.Msg.TELLO_PARAM_AGZ, 'agz']
                  ],
                  "type": "field_dropdown",
                  "name": "tello_param"
                }
			]
		});
	}
};

Blockly.Blocks['tello_state'] = {
	init: function () {
		this.jsonInit({
			"inputsInline": true,
			"output": null,
			"colour": TELLO_COLOR,
			"helpUrl": Blockly.Msg.TELLO_STATE_HELPURL,
			"tooltip": Blockly.Msg.TELLO_STATE_TOOLTIP,
			"message0": Blockly.Msg.TELLO_STATE_MESSAGE0
		});
	}
};
