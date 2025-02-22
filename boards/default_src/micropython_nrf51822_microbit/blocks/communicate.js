import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

const COMMUNICATE_HUE = 140; //'#3288dd';

export const radio_ons = {
    init: function () {
        this.setColour(225);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_MICROBIT_PY_COMMUNICATE_ON, 'on'], [Blockly.Msg.MIXLY_MICROBIT_PY_COMMUNICATE_OFF, 'off'], [Blockly.Msg.HTML_RESET, 'reset']]), "type")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_COMMUNICATE_WIFI);
        this.setInputsInline(true);
        this.setOutput(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('type');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_PY_COMMUNICATE_WIFI;
            var TOOLTIPS = {
                'on': Blockly.Msg.MIXLY_MICROBIT_PY_COMMUNICATE_ON,
                'off': Blockly.Msg.MIXLY_MICROBIT_PY_COMMUNICATE_OFF,
                'reset': Blockly.Blockly.Msg.HTML_RESET
            };
            return TOOLTIPS[mode] + mode0;
        });
    }
};

export const microbit_radio_on = {
    init: function () {
        this.jsonInit({
            "colour": 225,
            "nextStatement": null,
            "previousStatement": null,
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/radio.html#radio.on",
            "tooltip": "Turn on the radio. This needs to be explicitly called since the radio draws power and takes up memory that you may otherwise need.",
            "message0": Blockly.Msg.MIXLY_MICROBIT_Switch_on_radio
        });
    }
};

export const microbit_radio_off = {
    init: function () {
        this.jsonInit({
            "colour": 225,
            "nextStatement": null,
            "previousStatement": null,
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/radio.html#radio.off",
            "tooltip": "Turn off the radio, thus saving power and memory.",
            "message0": Blockly.Msg.MIXLY_MICROBIT_Switch_off_radio
        });
    }
};

export const microbit_radio_config = {
    init: function () {
        this.jsonInit({
            "colour": 225,
            "nextStatement": null,
            "previousStatement": null,
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/radio.html#radio.config",
            "tooltip": Blockly.Msg.MIXLY_MICROBIT_Configure_radio1,
            "message0": Blockly.Msg.MIXLY_MICROBIT_Configure_radio,
            "args0": [{
                "min": 4,
                "value": 32,
                "type": "input_value",
                "max": 251,
                "name": "length"
            }, {
                "type": "input_dummy"
            }, {
                "min": 1,
                "value": 3,
                "type": "input_value",
                "max": 32,
                "name": "queue"
            }, {
                "type": "input_dummy"
            }, {
                "min": 0,
                "value": 7,
                "type": "input_value",
                "max": 100,
                "name": "channel"
            }, {
                "type": "input_dummy"
            }, {
                "name": "power",
                "type": "input_value"
            }, {
                "type": "input_dummy"
            }, {
                "name": "address",
                "type": "input_value"
            }, {
                "type": "input_dummy"
            }, {
                "name": "group",
                "type": "input_value"
            }, {
                "type": "input_dummy"
            }, {
                "name": "data_rate",
                "type": "input_value"
            }
            ]
        });
    }
};

export const microbit_radio_reset = {
    init: function () {
        this.jsonInit({
            "colour": 225,
            "nextStatement": null,
            "previousStatement": null,
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/radio.html#radio.reset",
            "tooltip": "Reset the radio to default settings.",
            "message0": Blockly.Msg.MIXLY_MICROBIT_Reset_radio
        });
    }
};

export const microbit_radio_send_string = {
    init: function () {
        this.jsonInit({
            "colour": 225,
            "nextStatement": null,
            "previousStatement": null,
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/radio.html#radio.send",
            "tooltip": "Broadcast a text message.",
            "message0": Blockly.Msg.MIXLY_MICROBIT_Send_message,
            "args0": [{
                "check": "String",
                "type": "input_value",
                "name": "message"
            }
            ]
        });
    }
};

export const radio_send_string = {
    init: function () {
        this.setColour(225);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_RADIO_SEND);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_MICROBIT_MSG, 'send'],
                [Blockly.Msg.MIXLY_MICROBIT_MSG_BYTE, 'send_bytes']]), "type")
        this.appendValueInput('data')
        // .setCheck(String)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Send_message1);
    }
}

export const microbit_radio_receive = {
    init: function () {
        this.jsonInit({
            "colour": 225,
            "output": "String",
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/radio.html#radio.receive",
            "tooltip": Blockly.Msg.MIXLY_MICROBIT_Receive_message,
            "message0": Blockly.Msg.MIXLY_MICROBIT_Receive_message
        });
    }
};

export const radio_receive_string = {
    init: function () {
        this.setColour(225);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Receive_message);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_MICROBIT_MSG, 'receive'],
                [Blockly.Msg.MIXLY_MICROBIT_MSG_BYTE, 'receive_bytes'],
                [Blockly.Msg.MIXLY_MICROBIT_MSG_FULL, 'receive_full']]), "type")
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Receive_message);
    }
}

export const i2c_init = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput("RX", Number)
            //.appendField(Blockly.Msg.MIXLY_SETUP)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_I2C_SETUP)
            .appendField("sda")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("TX", Number)
            .appendField("scl")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('freq')
            .setCheck(Number)
            .appendField("频率")
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

export const i2c_read = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput('address')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_I2C_READ_ADDRESS);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.Msg.LANG_MATH_BYTE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_REPEAT)
            .appendField(new Blockly.FieldCheckbox(false), "is_repeated");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_I2C_READ);
    }
}

export const i2c_write = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput('address')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_I2C_WRITE_ADDRESS);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_I2C_VALUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_REPEAT)
            .appendField(new Blockly.FieldCheckbox(false), "is_repeated");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_I2C_WRITE);
    }
}

export const spi_init = {
    init: function () {
        this.jsonInit({
            "colour": COMMUNICATE_HUE,
            "nextStatement": null,
            "previousStatement": null,
            "message0": Blockly.Msg.MIXLY_MICROBIT_SPI_INIT,
            "args0": [{
                "value": 1000000,
                "type": "field_number",
                "name": "freq"
            }, {
                "type": "input_dummy"
            }, {
                "value": 8,
                "type": "field_number",
                "name": "bits"
            }, {
                "type": "input_dummy"
            }, {
                "value": 0,
                "type": "field_number",
                "name": "mode"
            }, {
                "type": "input_dummy"
            }, {
                "name": "mosi",
                "options": Profile.default.digital,
                "type": "field_dropdown"
            }, {
                "name": "miso",
                "options": Profile.default.digital,
                "type": "field_dropdown"
            }, {
                "name": "sck",
                "options": Profile.default.digital,
                "type": "field_dropdown"
            }
            ]
        });
        this.setFieldValue("15", "mosi")
        this.setFieldValue("14", "miso")
        this.setFieldValue("13", "sck")
    }
};

export const spi_write = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_SPI_WRITE);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_SPI_WRITE);
    }
}
