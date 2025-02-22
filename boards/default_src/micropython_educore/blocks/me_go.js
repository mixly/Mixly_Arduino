import * as Blockly from 'blockly/core';

const MEGO_HUE = 100;

// LED
export const me_go_light_number = {
    init: function () {
        this.setColour(MEGO_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXGO_LEFT_FRONT + Blockly.Msg.COLOUR_RGB_GREEN + Blockly.Msg.MIXLY_EXTERN_LED, "GLED[0]"],
                [Blockly.Msg.MIXGO_RIGHT_FRONT + Blockly.Msg.COLOUR_RGB_GREEN + Blockly.Msg.MIXLY_EXTERN_LED, "GLED[1]"],
                [Blockly.Msg.MIXGO_LEFT_BACK + Blockly.Msg.COLOUR_RGB_GREEN + Blockly.Msg.MIXLY_EXTERN_LED, "GLED[3]"],
                [Blockly.Msg.MIXGO_RIGHT_BACK + Blockly.Msg.COLOUR_RGB_GREEN + Blockly.Msg.MIXLY_EXTERN_LED, "GLED[2]"],
                [Blockly.Msg.MIXGO_LEFT_FRONT + Blockly.Msg.COLOUR_RGB_RED + Blockly.Msg.MIXLY_EXTERN_LED, "RLED[0]"],
                [Blockly.Msg.MIXGO_RIGHT_FRONT + Blockly.Msg.COLOUR_RGB_RED + Blockly.Msg.MIXLY_EXTERN_LED, "RLED[1]"],
                [Blockly.Msg.MIXGO_LEFT_BACK + Blockly.Msg.COLOUR_RGB_RED + Blockly.Msg.MIXLY_EXTERN_LED, "RLED[3]"],
                [Blockly.Msg.MIXGO_RIGHT_BACK + Blockly.Msg.COLOUR_RGB_RED + Blockly.Msg.MIXLY_EXTERN_LED, "RLED[2]"],
                [Blockly.Msg.ME_GO_LIGHT_HEADLIGHT, "WLED"]
            ]), 'op')
        this.setOutput(true);
    }
};

export const me_go_led_bright = {
    init: function () {
        this.setColour(MEGO_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETTING);
        this.appendValueInput('led')
            .appendField('ME GO')
        this.appendValueInput('bright')
            .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_SETONOFF);
    }
};

export const me_go_get_led_bright = {
    init: function () {
        this.setColour(MEGO_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET);
        this.appendValueInput('led')
            .appendField('ME GO')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_BRIGHTNESS)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_GETONOFF);
    }
};

export const me_go_get_led_state = {
    init: function () {
        this.setColour(MEGO_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET);
        this.appendValueInput('led')
            .appendField('ME GO')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_GETONOFF);
    }
};

export const me_go_led_brightness = {
    init: function () {
        this.setColour(MEGO_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETTING);
        this.appendValueInput('led')
            .appendField('ME GO')
        this.appendValueInput('bright')
            .appendField(Blockly.Msg.MIXLY_BRIGHTNESS)
        this.appendDummyInput("")
            .appendField("%")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_SETTING + Blockly.Msg.MIXLY_BUILDIN_LED + Blockly.Msg.MIXLY_BRIGHTNESS + '(0-10)');
    }
};

export const me_go_stepper_keep = {
    init: function () {
        this.setColour(MEGO_HUE);
        this.appendDummyInput()
            .appendField("ME GO")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.blockpy_forward, "F"],
                [Blockly.Msg.blockpy_backward, "B"],
                [Blockly.Msg.blockpy_left, "L"],
                [Blockly.Msg.blockpy_right, "R"]
            ]), "VAR");
        this.appendValueInput('speed')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEPPER_SET_SPEED);
        this.appendDummyInput("")
            .appendField("%")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}

export const me_go_stepper_stop = {
    init: function () {
        this.setColour(MEGO_HUE);
        this.appendDummyInput()
            .appendField("ME GO")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MOTOR_P, "P"],
                [Blockly.Msg.MOTOR_N, "N"]
            ]), "VAR");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}

export const me_go_dc_motor = {
    init: function () {
        this.setColour(MEGO_HUE);
        this.appendDummyInput()
            .appendField("ME GO")
            .appendField(Blockly.Msg.MOTOR_DC)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLYCAR_WHEEL_LEFT, "0"],
                [Blockly.Msg.MIXLYCAR_WHEEL_RIGHT, "1"],
                [Blockly.Msg.ME_GO_MOTOR_EXTERN, "2"]
            ]), "wheel");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Direction)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.ROTATION_FORWARD, "CW"],
                [Blockly.Msg.ROTATION_BACKWARD, "CCW"],
                [Blockly.Msg.MOTOR_P, "P"],
                [Blockly.Msg.MOTOR_N, "N"]
            ]), "direction");
        this.appendValueInput('speed')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEPPER_SET_SPEED);
        this.appendDummyInput("")
            .appendField("%")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}

export const me_go_hall_attachInterrupt = {
    init: function () {
        this.setColour(MEGO_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_ESP32_INTERRUPT)
            .appendField(Blockly.Msg.ME_GO_HALL_SENSOR)
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.TEXT_TRIM_LEFT, "A"], [Blockly.Msg.TEXT_TRIM_RIGHT, "B"]]), "mode");
        this.appendValueInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

export const me_go_hall_initialize = {
    init: function () {
        this.setColour(MEGO_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.ME_GO_HALL_SENSOR)
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.TEXT_TRIM_LEFT, "A"], [Blockly.Msg.TEXT_TRIM_RIGHT, "B"]]), "mode");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SETUP)
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([['turns', "turns"], ['distance', "distance"], ['turns,distance', 'all']]), "args");
        this.appendValueInput('num')
            .setCheck(Number)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

export const me_go_hall_data = {
    init: function () {
        this.setColour(MEGO_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.ME_GO_HALL_SENSOR)
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.TEXT_TRIM_LEFT, "A"], [Blockly.Msg.TEXT_TRIM_RIGHT, "B"]]), "mode");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([['turns', "turns"], ['distance', "distance"], ['speed', 'speed']]), "args");
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

export const me_go_pin_near_line = {
    init: function () {
        this.setColour(MEGO_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.TEXT_TRIM_LEFT, "[0]"],
                [Blockly.Msg.MIXGO_LEFT_MID, "[1]"],
                [Blockly.Msg.MIXGO_RIGHT_MID, "[2]"],
                [Blockly.Msg.TEXT_TRIM_RIGHT, "[3]"],
                [Blockly.Msg.MIXLY_ALL, ""]
            ]), "key")
            .appendField(Blockly.Msg.MIXGO_LINE_SENSOR_VAL);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(function () {
            var mode0 = Blockly.Msg.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
            var mode1 = Blockly.Msg.MIXLY_ESP32_NEAR;
            return mode0 + mode1
        });
    }
};

export const me_go_pin_near = {
    init: function () {
        this.setColour(MEGO_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXGO_LEFT_FRONT, "[0]"],
                [Blockly.Msg.MIXGO_RIGHT_FRONT, "[1]"],
                [Blockly.Msg.MIXGO_LEFT_BACK, "[3]"],
                [Blockly.Msg.MIXGO_RIGHT_BACK, "[2]"],
                [Blockly.Msg.MIXLY_ALL, ""]
            ]), "key")
            .appendField(Blockly.Msg.MIXGO_PROXIMITY_SENSOR);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(function () {
            var mode0 = Blockly.Msg.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
            var mode1 = Blockly.Msg.MIXLY_ESP32_NEAR;
            return mode0 + mode1
        });
    }
};

export const me_go_pin_near_state_change = {
    init: function () {
        this.setColour(MEGO_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXGO_CAR_SENSOR_ONBOARD_CHANGE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_ME_GO_CAR_SENSOR_ONBOARD_AUTO_CHANGE, "AS"],
                [Blockly.Msg.MIXLY_MIXGO_CAR_USE_LINE_ONLY, "LP"],
                [Blockly.Msg.MIXLY_MIXGO_CAR_USE_PROXIMITY_ONLY, "OA"],
                [Blockly.Msg.MIXLY_ME_GO_CAR_LIGHT_SEEKING_ONLY, "LS"],
                [Blockly.Msg.ME_GO_SENSOR_MODE_OFF, "CL"]
            ]), "key");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

export const sensor_mixgome_eulerangles = {
    init: function () {
        this.setColour(MEGO_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_GET_GESTURE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.ME_GO_PITCH, '[0]'],
                [Blockly.Msg.ME_GO_ROLL, '[1]'],
                [Blockly.Msg.ME_GO_PITCH + ', ' + Blockly.Msg.ME_GO_ROLL, '']
            ]), 'angle');
        // this.appendDummyInput("")
        //     .appendField(Blockly.Msg.BOARD_DIRECTION)
        //     .appendField(new Blockly.FieldDropdown([
        //         [Blockly.Msg.OLED_VER,'True'],
        //         [Blockly.Msg.OLED_HOR,'False'],
        //         ]),'dir');
        this.appendDummyInput("")
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const me_go_pin_light = {
    init: function () {
        this.setColour(MEGO_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.TEXT_TRIM_LEFT, "[0]"],
                [Blockly.Msg.MIXGO_LEFT_MID, "[1]"],
                [Blockly.Msg.MIXGO_RIGHT_MID, "[2]"],
                [Blockly.Msg.TEXT_TRIM_RIGHT, "[3]"],
                [Blockly.Msg.MIXLY_ALL, ""]
            ]), "key")
            .appendField(Blockly.Msg.MIXLY_ME_GO_CAR_LIGHT_SEEKING_SENSOR);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(function () {
            var mode0 = Blockly.Msg.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
            var mode1 = Blockly.Msg.MIXLY_ME_GO_CAR_LIGHT_SEEKING_SENSOR;
            return mode0 + mode1
        });
    }
};