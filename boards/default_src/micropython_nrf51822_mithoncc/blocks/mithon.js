import * as Blockly from 'blockly/core';

const SENSOR_HUE = 40;
const ACTUATOR_HUE = 100;
const LOOPS_HUE = 120;

// Blockly.FieldColour.COLOURS = ['#0f0', '#0e0', '#0d0', '#0c0', '#0b0', '#0a0',
//     '#080', '#060', '#040', '#000'];
// Blockly.FieldColour.COLUMNS = 5;

export const base_loop = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.CONTROLS_REPEAT_TITLE_REPEAT + Blockly.Msg.CONTROLS_REPEAT_INPUT_DO,
            "message1": "%1",
            "colour": LOOPS_HUE,
            "args1": [
                {
                    "type": "input_statement",
                    "name": "DO"
                }
            ],
            //"style":{"hat": "not"},
            "tooltip": "",
            "helpUrl": ""
        });
        //this.setPreviousStatement(true, null);
    }
};

export const actuator_rgb_color = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
            .appendField(Blockly.Msg.MIXLY_RGB_NUM);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_ALL, "0"],
                ["0", "1"],
                ["1", "2"],
                ["2", "3"],
                ["3", "4"]
            ]), 'LED')
            .appendField(Blockly.Msg.HTML_COLOUR);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.COLOUR_RGB_RED, "255,0,0"],
                [Blockly.Msg.COLOUR_RGB_ORANGE, "255,128,0"],
                [Blockly.Msg.COLOUR_RGB_YELLOW, "255,255,0"],
                [Blockly.Msg.COLOUR_RGB_GREEN, "0,255,0"],
                [Blockly.Msg.COLOUR_RGB_CYAN, "0,255,255"],
                [Blockly.Msg.COLOUR_RGB_BLUE, "0,0,255"],
                [Blockly.Msg.COLOUR_RGB_PURPLE, "128,0,255"],
                [Blockly.Msg.COLOUR_RGB_WHITE, "255,255,255"]
            ]), 'COLOR');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const actuator_rgb_off = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
            .appendField(Blockly.Msg.MIXLY_RGB_NUM);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_ALL, "0"],
                ["0", "1"],
                ["1", "2"],
                ["2", "3"],
                ["3", "4"]
            ]), 'LED')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Turn_off_display);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const actuator_rgb = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_NUM);
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_B);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const actuator_motor_on = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MOTOR)
            .appendField(Blockly.Msg.LCD_NUMBERING);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_ALL, "0"],
                ["1", "1"],
                ["2", "2"],
                ["3", "3"]
            ]), 'NUMBER');
        this.appendValueInput('SPEED')
            .appendField(Blockly.Msg.MIXLY_SPEED + "(0~12)")
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Direction)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.CLOCKWISE, "1"],
                [Blockly.Msg.ANTI_CLOCKWISE, "0"]
            ]), 'DIRECTION')
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const actuator_motor_off = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MOTOR)
            .appendField(Blockly.Msg.LCD_NUMBERING);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_ALL, "0"],
                ["1", "1"],
                ["2", "2"],
                ["3", "3"]
            ]), 'NUMBER')
            .appendField(Blockly.Msg.MIXLY_STOP);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const sensor_pin_near = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(Blockly.Msg.LCD_NUMBERING)
            .appendField(new Blockly.FieldDropdown([
                ["1", "1"],
                ["2", "2"]
            ]), 'NUMBER')
            .appendField(Blockly.Msg.MIXLY_ESP32_NEAR);
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const sensor_while_btn_pressed = {
    init: function () {
        this.setColour(20);
        this.appendValueInput('btn')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_CURRENT + Blockly.Msg.MIXLY_BUTTON_PRESSED + Blockly.Msg.MIXLY_BUTTON)
            .setCheck(Number);
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setInputsInline(true);
    }
};

export const sensor_while_is_gesture = {
    init: function () {
        this.setColour(20);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_CURRENT + Blockly.Msg.MIXLY_MICROBIT_JS_IS_GESTURE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_MICROBIT_shake, "shake"], [Blockly.Msg.MIXLY_UP, "up"], [Blockly.Msg.MIXLY_DOWN, "down"], [Blockly.Msg.MIXLY_LEFT, "left"], [Blockly.Msg.MIXLY_RIGHT, "right"], [Blockly.Msg.MIXLY_MICROBIT_face_up, "face up"], [Blockly.Msg.MIXLY_MICROBIT_face_down, "face down"], [Blockly.Msg.MIXLY_MICROBIT_freefall, "freefall"], ["3g", "3g"], ["6g", "6g"], ["8g", "8g"]]), "gesture");
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setInputsInline(true);
    }
};


export const sensor_while_is_near = {
    init: function () {
        this.setColour(20);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_CURRENT + Blockly.Msg.MIXLY_ESP32_EXTERN_NEAR)
            .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"]]), "near")
            .appendField(Blockly.Msg.MIXLY_MITHON_NEAR);
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setInputsInline(true);
    }
};