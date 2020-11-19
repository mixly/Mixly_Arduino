'use strict';

goog.provide('Blockly.Blocks.blynk');
goog.require('Blockly.Blocks');


/******************* Blynk *****************/
Blockly.Blocks.blynk.HUE ='#2FAD7A';


// 自定义终端部件 Terminal Blynk
Blockly.Blocks['mpython_blynk_terminal_widget_vpin'] = {
    init: function () {
        this.jsonInit({
            "inputsInline": true,
            "nextStatement": null,
            "previousStatement": null,
            "colour": Blockly.Blocks.blynk.HUE,
            "helpUrl": Blockly.MPYTHON_BLYNK_TERMINAL_WIDGET_VPIN_HELPURL,
            "tooltip": Blockly.MPYTHON_BLYNK_TERMINAL_WIDGET_VPIN_TOOLTIP,
            "message0": Blockly.MPYTHON_BLYNK_TERMINAL_WIDGET_VPIN_MESSAGE0,
            "args0": [
            {
                "check": Number,
                "type": "input_value",
                "name": "virtual_pin"
            }
            ]
        });
    }
};

// 同步虚拟管脚的状态 Blynk
Blockly.Blocks['mpython_blynk_sync_virtual'] = {
    init: function () {
        this.jsonInit({
            "inputsInline": true,
            "nextStatement": null,
            "previousStatement": null,
            "colour": Blockly.Blocks.blynk.HUE,
            "helpUrl": Blockly.MPYTHON_BLYNK_SYNC_VIRTUAL_HELPURL,
            "tooltip": Blockly.MPYTHON_BLYNK_SYNC_VIRTUAL_TOOLTIP,
            "message0": Blockly.MPYTHON_BLYNK_SYNC_VIRTUAL_MESSAGE0,
            "args0": [
            {
                "check": Number,
                "type": "input_value",
                "name": "virtual_pin"
            }
            ]
        });
    }
};

// 斷開连接 Blynk
Blockly.Blocks['mpython_blynk_on_disconnected'] = {
    init: function () {
        this.jsonInit({
            "inputsInline": true,
            // "nextStatement": null,
            // "previousStatement": null,
            "colour": Blockly.Blocks.blynk.HUE,
            "helpUrl": Blockly.MPYTHON_BLYNK_ON_DISCONNECTED_HELPURL,
            "tooltip": Blockly.MPYTHON_BLYNK_ON_DISCONNECTED_TOOLTIP,
            "message0": Blockly.MPYTHON_BLYNK_ON_DISCONNECTED_MESSAGE0
        });
        this.appendStatementInput('DO')
        .appendField(Blockly.CONTROLS_REPEAT_INPUT_DO);
    }
};

// 连接上 Blynk
Blockly.Blocks['mpython_blynk_on_connected'] = {
    init: function () {
        this.jsonInit({
            "inputsInline": true,
            // "nextStatement": null,
            // "previousStatement": null,
            "colour": Blockly.Blocks.blynk.HUE,
            "helpUrl": Blockly.MPYTHON_BLYNK_ON_CONNECTED_HELPURL,
            "tooltip": Blockly.MPYTHON_BLYNK_ON_CONNECTED_TOOLTIP,
            "message0": Blockly.MPYTHON_BLYNK_ON_CONNECTED_MESSAGE0
        });
        this.appendStatementInput('DO')
        .appendField(Blockly.CONTROLS_REPEAT_INPUT_DO);
    }
};

// Blynk 定时器的进程生效并运行
Blockly.Blocks['mpython_blynktimer_run'] = {
    init: function () {
        this.jsonInit({
            "inputsInline": true,
            "nextStatement": null,
            "previousStatement": null,
            "colour": Blockly.Blocks.blynk.HUE,
            "helpUrl": Blockly.MPYTHON_BLYNKTIMER_RUN_HELPURL,
            "tooltip": Blockly.MPYTHON_BLYNKTIMER_RUN_TOOLTIP,
            "message0": Blockly.MPYTHON_BLYNKTIMER_RUN_MESSAGE0
        });
    }
};

// Blynk 进程生效并运行
Blockly.Blocks['mpython_blynk_run'] = {
    init: function () {
        this.jsonInit({
            "inputsInline": true,
            "nextStatement": null,
            "previousStatement": null,
            "colour": Blockly.Blocks.blynk.HUE,
            "helpUrl": Blockly.MPYTHON_BLYNK_RUN_HELPURL,
            "tooltip": Blockly.MPYTHON_BLYNK_RUN_TOOLTIP,
            "message0": Blockly.MPYTHON_BLYNK_RUN_MESSAGE0
        });
    }
};

// Blynk APP 显示通知
Blockly.Blocks['mpython_blynk_app_notify'] = {
    init: function () {
        this.jsonInit({
            "inputsInline": true,
            "nextStatement": null,
            "previousStatement": null,
            "colour": Blockly.Blocks.blynk.HUE,
            "helpUrl": Blockly.MPYTHON_BLYNK_APP_NOTIFY_HELPURL,
            "tooltip": Blockly.MPYTHON_BLYNK_APP_NOTIFY_TOOLTIP,
            "message0": Blockly.MPYTHON_BLYNK_APP_NOTIFY_MESSAGE0,
            "args0": [
            {
                "check":String,
                "type": "input_value",
                "name": "notification"
            }
            ]
        });
    }
};

//  停止 Blynk 定时器 %1
Blockly.Blocks['mpython_blynk_stop_timers'] = {
    init: function () {
        this.jsonInit({
            "inputsInline": true,
            "nextStatement": null,
            "previousStatement": null,
            // "output": null,
            "colour": Blockly.Blocks.blynk.HUE,
            "helpUrl": Blockly.MPYTHON_BLYNK_STOP_TIMERS_HELPURL,
            "tooltip": Blockly.MPYTHON_BLYNKTIMER_TOOLTIP,
            "message0": Blockly.MPYTHON_BLYNK_STOP_TIMERS_MESSAGE0,
            "args0": [
            {
                "check": Number,
                "type": "input_value",
                "name": "timer_num"
            }
            ]
        });
    }
};

//  给虚拟管脚添加   属性 %1 值 %2
Blockly.Blocks['mpython_blynk_set_property'] = {
    init: function () {
        this.jsonInit({
            "inputsInline": true,
            "nextStatement": null,
            "previousStatement": null,
            // "output": null,
            "colour": Blockly.Blocks.blynk.HUE,
            "helpUrl": Blockly.MPYTHON_BLYNK_SET_PROPERTY_HELPURL,
            "tooltip": Blockly.MPYTHON_BLYNK_SET_PROPERTY_TOOLTIP,
            "message0": Blockly.MPYTHON_BLYNK_SET_PROPERTY_MESSAGE0,
            "args0": [
            {
                "check":String,
                "type": "input_value",
                "name": "attribute_name"
            }
            ,
            {
                    // "check":String,
                    "type": "input_value",
                    "name": "attribute_value"
                }
                ]
            });
    }
};

//  向 %1 发邮件  主题 %2 正文 %3
Blockly.Blocks['mpython_blynk_email'] = {
    init: function () {
        this.jsonInit({
            "inputsInline": true,
            "nextStatement": null,
            "previousStatement": null,
            // "output": null,
            "colour": Blockly.Blocks.blynk.HUE,
            "helpUrl": Blockly.MPYTHON_BLYNK_EMAIL_HELPURL,
            "tooltip": Blockly.MPYTHON_BLYNK_EMAIL_TOOLTIP,
            "message0": Blockly.MPYTHON_BLYNK_EMAIL_MESSAGE0,
            "args0": [
            {
                "check":String,
                "type": "input_value",
                "name": "TargetEmail"
            }
            ,
            {
                "check":String,
                "type": "input_value",
                "name": "subject"
            }
            ,
            {
                "check":String,
                "type": "input_value",
                "name": "body"
            }
            ]
        });
    }
};

//  可用的 Blynk 定时器
Blockly.Blocks['mpython_blynk_get_timers'] = {
    init: function () {
        this.jsonInit({
            "inputsInline": true,
            // "nextStatement": null,
            // "previousStatement": null,
            "output": null,
            "colour":Blockly.Blocks.blynk.HUE,
            "helpUrl": Blockly.MPYTHON_BLYNK_GET_TIMERS_HELPURL,
            "tooltip": Blockly.MPYTHON_BLYNK_GET_TIMERS_TOOLTIP,
            "message0": Blockly.MPYTHON_BLYNK_GET_TIMERS_MESSAGE0,
        });
    }
};

//blynk定时器
Blockly.Blocks['mpython_blynktimer'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.MPYTHON_BLYNKTIMER_MESSAGE0,
            // "nextStatement": null,
            // "previousStatement": null,
            "colour": Blockly.Blocks.blynk.HUE,
            "helpUrl": Blockly.MPYTHON_BLYNKTIMER_HELPURL,
            "tooltip": Blockly.MPYTHON_BLYNKTIMER_TOOLTIP,
            "args0": [
            {
                "check": Number,
                "type": "input_value",
                "name": "Num"
            }
            ,
            {
                "options": [
                [Blockly.MIXLY_PYTHON_PERIODIC, 'False'],
                [Blockly.MIXLY_PYTHON_ONE_SHOT, 'True']
                ],
                "type": "field_dropdown",
                "name": "Timer_mode"
            }
            ,
            {
                "check": Number,
                "type": "input_value",
                "name": "period"
            }
            ]
        });
        this.appendStatementInput('DO')
        .appendField(Blockly.CONTROLS_REPEAT_INPUT_DO);
    }
};

// 发送数据 %1 到 Bylnk APP 的虚拟管脚 %2
Blockly.Blocks['mpython_blynk_sensor_data_to_app'] = {
    init: function () {
        this.jsonInit({
            "inputsInline": true,
            "nextStatement": null,
            "previousStatement": null,
            "colour": Blockly.Blocks.blynk.HUE,
            "helpUrl": Blockly.MPYTHON_BLYNK_SENSOR_DATA_TO_APP_HELPURL,
            "tooltip": Blockly.MPYTHON_BLYNK_SENSOR_DATA_TO_APP_TOOLTIP,
            "message0": Blockly.MPYTHON_BLYNK_SENSOR_DATA_TO_APP_MESSAGE0,
            "args0": [
            {
                "type": "input_value",
                "name": "sensor_data"
            }
            ,
            {
                "check": Number,
                "type": "input_value",
                "name": "virtual_pin"
            }
            ]
        });
    }
};

// 从 Bylnk APP 获取虚拟管脚 %1 的值
Blockly.Blocks['mpython_blynk_app_data'] = {
    init: function () {
        this.jsonInit({
            "inputsInline": true,
            // "nextStatement": null,
            // "previousStatement": null,
            // "output":null,
            "colour": Blockly.Blocks.blynk.HUE,
            "helpUrl": Blockly.MPYTHON_BLYNK_APP_DATA_HELPURL,
            "tooltip": Blockly.MPYTHON_BLYNK_SENSOR_DATA_TO_APP_TOOLTIP,
            "message0": Blockly.MPYTHON_BLYNK_APP_DATA_MESSAGE0,
            "args0": [
                {
                    "check": Number,
                    "type": "input_value",
                    "name": "virtual_pin"
                }
                ,
                {
                    "type": "input_value",
                    "name": "virtual_pin_val"
                }
            ]
        });
        this.appendStatementInput('DO')
            .appendField(Blockly.CONTROLS_REPEAT_INPUT_DO);
    }
};

// Bylnk设置
Blockly.Blocks['mpython_blynk_setup'] = {
    init: function () {
        this.jsonInit({
            // "inputsInline": true,
            "nextStatement": null,
            "previousStatement": null,
            "colour": Blockly.Blocks.blynk.HUE,
            "helpUrl": Blockly.MPYTHON_BLYNK_SETUP_HELPURL,
            "tooltip": Blockly.MPYTHON_BLYNK_SETUP_TOOLTIP,
            "message0": Blockly.MPYTHON_BLYNK_SETUP_MESSAGE0,
            "args0": [
                {
                    "type": "input_dummy"
                },
                {
                    "check":String,
                    "type": "input_value",
                    "name": "server"
                },
                {
                    "check": Number,
                    "type": "input_value",
                    "name": "port"
                },
                {
                    "check":String,
                    "type": "input_value",
                    "name": "auth"
                }
            ]
        });
    }
};
