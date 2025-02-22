import * as Blockly from 'blockly/core';

const AI_SENSOR_HUE = '#90A244'; //'#9e77c9'//40;


export const ai_sensor_use_uart_init = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH + "uart")
            .appendField(new Blockly.FieldDropdown([
                ["uart1", "uart1"],
                ["uart2", "uart2"]
            ]), "key");
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_MAKE)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SETUP + Blockly.Msg.LISTS_SET_INDEX_INPUT_TO + 'MixGo AI' + Blockly.Msg.MSG.catSensor)

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const ai_sensor_qrcode = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_QR_CODE + Blockly.Msg.MIXPY_OBJECT)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ALL_CODE_ANALYSIS);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.OLED_STRING, "info1"],
                [Blockly.Msg.MIXLY_POSITION_XY + "-xywh", "rect"],
                ["x" + Blockly.Msg.MIXLY_POSITION_XY, "rect[0]"],
                ["y" + Blockly.Msg.MIXLY_POSITION_XY, "rect[1]"],
                ["w" + Blockly.Msg.MIXLY_POSITION_XY, "rect[2]"],
                ["h" + Blockly.Msg.MIXLY_POSITION_XY, "rect[3]"],
                [Blockly.Msg.MICROPYTHON_HUSKYLENS_X_CENTERED + Blockly.Msg.MIXLY_POSITION_XY, "xc"],
                [Blockly.Msg.MICROPYTHON_HUSKYLENS_Y_CENTERED + Blockly.Msg.MIXLY_POSITION_XY, "yc"]
            ]), "key");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_QR_CODE_TOOLTIP);
    }
};

export const ai_sensor_qrcode_lite = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('VAR')
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_QR_CODE + Blockly.Msg.MIXPY_OBJECT, "qrcode"],
                [Blockly.Msg.MIXLY_BAR_CODE + Blockly.Msg.MIXPY_OBJECT, "barcode"],
                [Blockly.Msg.MIXLY_TAG + Blockly.Msg.MIXPY_OBJECT, "apriltag"]
            ]), "TYPE");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ANALYSIS_RESULT);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip();
    }
};

export const ai_sensor_find_qrcodes = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_QR_CODE_RECOGNTITION);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + "[qrcode]");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_QR_CODE_RECOGNTITION_TOOLTIP);
    }
};

export const ai_sensor_config = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('SUB')
        this.appendValueInput("RX")
            .appendField(Blockly.Msg.MIXLY_SETTING + Blockly.Msg.MIXLY_ETHERNET_CLINET_PORT)
            .appendField("RX#")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("TX")
            .appendField("TX#")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendDummyInput()
            .appendField(Blockly.Msg.SOFT_RESET + Blockly.Msg.MIXLY_ESP32_RGB_WRITE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_TURTLE_WRITE_MOVE_TRUE, 'True'], [Blockly.Msg.MIXLY_TURTLE_WRITE_MOVE_FALSE, 'False']]), 'mode')
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_CONFIG_TOOLTIP);
    }
};

export const ai_sensor_rgb = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('SUB')
        this.appendValueInput("led1")
            .appendField(Blockly.Msg.MIXLY_SETTING)
            .appendField("RGB1")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("led2")
            .appendField("RGB2")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_CONFIG_TOOLTIP);
    }
};

export const ai_sensor_barcode = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_BAR_CODE + Blockly.Msg.MIXPY_OBJECT)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ALL_CODE_ANALYSIS);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.OLED_STRING, "info1"],
                [Blockly.Msg.MIXLY_POSITION_XY + "-xywh", "rect"],
                ["x" + Blockly.Msg.MIXLY_POSITION_XY, "rect[0]"],
                ["y" + Blockly.Msg.MIXLY_POSITION_XY, "rect[1]"],
                ["w" + Blockly.Msg.MIXLY_POSITION_XY, "rect[2]"],
                ["h" + Blockly.Msg.MIXLY_POSITION_XY, "rect[3]"],
                [Blockly.Msg.MICROPYTHON_HUSKYLENS_X_CENTERED + Blockly.Msg.MIXLY_POSITION_XY, "xc"],
                [Blockly.Msg.MICROPYTHON_HUSKYLENS_Y_CENTERED + Blockly.Msg.MIXLY_POSITION_XY, "yc"]
            ]), "key");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_BAR_CODE_TOOLTIP);
    }
};

export const ai_sensor_find_barcodes = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_BAR_CODE_RECOGNTITION);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + "[barcode]");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_BAR_CODE_RECOGNTITION_TOOLTIP);
    }
};

export const ai_sensor_tag = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_TAG + Blockly.Msg.MIXPY_OBJECT)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ALL_CODE_ANALYSIS);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.OLED_STRING, "info1"],
                [Blockly.Msg.blockpy_turtle_rotate + Blockly.Msg.MIXLY_MICROBIT_JS_BY_ANGLE, "info2"],
                [Blockly.Msg.MIXLY_POSITION_XY + "-xywh", "rect"],
                ["x" + Blockly.Msg.MIXLY_POSITION_XY, "rect[0]"],
                ["y" + Blockly.Msg.MIXLY_POSITION_XY, "rect[1]"],
                ["w" + Blockly.Msg.MIXLY_POSITION_XY, "rect[2]"],
                ["h" + Blockly.Msg.MIXLY_POSITION_XY, "rect[3]"],
                [Blockly.Msg.MICROPYTHON_HUSKYLENS_X_CENTERED + Blockly.Msg.MIXLY_POSITION_XY, "xc"],
                [Blockly.Msg.MICROPYTHON_HUSKYLENS_Y_CENTERED + Blockly.Msg.MIXLY_POSITION_XY, "yc"]
            ]), "key");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_TAG_TOOLTIP);
    }
};

export const ai_sensor_find_tags = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_TAG_RECOGNTITION);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + "[tag]");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_TAG_RECOGNTITION_TOOLTIP);
    }
};

export const ai_sensor_line = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_LINE + Blockly.Msg.MIXPY_OBJECT)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ALL_CODE_ANALYSIS);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_LINE_ANGLE, "info1"],
                [Blockly.Msg.MIXLY_POSITION_XY + "-x1x2y1y2", "rect"],
                ["x1" + Blockly.Msg.MIXLY_POSITION_XY, "rect[0]"],
                ["x2" + Blockly.Msg.MIXLY_POSITION_XY, "rect[1]"],
                ["y1" + Blockly.Msg.MIXLY_POSITION_XY, "rect[2]"],
                ["y2" + Blockly.Msg.MIXLY_POSITION_XY, "rect[3]"]
            ]), "key");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_LINE_TOOLTIP);
    }
};

export const ai_sensor_find_lines = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_LINE_RECOGNTITION);
        this.appendValueInput("VAR1")
            .appendField(Blockly.Msg.MIXLY_ESP32_THRESHOLD)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("VAR2")
            .appendField(Blockly.Msg.MIXLY_LINE_RECOGNTITION_ANGLE)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("VAR3")
            .appendField(Blockly.Msg.MIXLY_LINE_RECOGNTITION_SLOPE)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + "[line]");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_LINE_RECOGNTITION_TOOLTIP);
    }
};

export const ai_sensor_circle = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_CIRCLE + Blockly.Msg.MIXPY_OBJECT)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ALL_CODE_ANALYSIS);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_CIRCLE_AREA, "info1"],
                [Blockly.Msg.MIXLY_POSITION_XY + "-xywh", "rect"],
                ["x" + Blockly.Msg.MIXLY_POSITION_XY, "rect[0]"],
                ["y" + Blockly.Msg.MIXLY_POSITION_XY, "rect[1]"],
                ["w" + Blockly.Msg.MIXLY_POSITION_XY, "rect[2]"],
                ["h" + Blockly.Msg.MIXLY_POSITION_XY, "rect[3]"],
                [Blockly.Msg.MICROPYTHON_HUSKYLENS_X_CENTERED + Blockly.Msg.MIXLY_POSITION_XY, "xc"],
                [Blockly.Msg.MICROPYTHON_HUSKYLENS_Y_CENTERED + Blockly.Msg.MIXLY_POSITION_XY, "yc"]
            ]), "key");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_CIRCLE_TOOLTIP);
    }
};

export const ai_sensor_find_circles = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_CIRCLE_RECOGNTITION);
        this.appendValueInput("VAR1")
            .appendField(Blockly.Msg.MIXLY_ESP32_THRESHOLD)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("VAR2")
            .appendField(Blockly.Msg.MIXLY_CIRCLE_RECOGNTITION_MIN)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("VAR3")
            .appendField(Blockly.Msg.MIXLY_CIRCLE_RECOGNTITION_MAX)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + "[circle]");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_CIRCLE_RECOGNTITION_TOOLTIP);
    }
};

export const ai_sensor_rect = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_RECT + Blockly.Msg.MIXPY_OBJECT)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ALL_CODE_ANALYSIS);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_CIRCLE_AREA, "info1"],
                [Blockly.Msg.MIXLY_POSITION_XY + "-xywh", "rect"],
                ["x" + Blockly.Msg.MIXLY_POSITION_XY, "rect[0]"],
                ["y" + Blockly.Msg.MIXLY_POSITION_XY, "rect[1]"],
                ["w" + Blockly.Msg.MIXLY_POSITION_XY, "rect[2]"],
                ["h" + Blockly.Msg.MIXLY_POSITION_XY, "rect[3]"],
                [Blockly.Msg.MICROPYTHON_HUSKYLENS_X_CENTERED + Blockly.Msg.MIXLY_POSITION_XY, "xc"],
                [Blockly.Msg.MICROPYTHON_HUSKYLENS_Y_CENTERED + Blockly.Msg.MIXLY_POSITION_XY, "yc"]
            ]), "key");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_RECT_TOOLTIP);
    }
};

export const ai_sensor_find_rects = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_RECT_RECOGNTITION);
        this.appendValueInput("VAR1")
            .appendField(Blockly.Msg.MIXLY_ESP32_THRESHOLD)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + "[rect]");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_COLOR_RECOGNTITION_TOOLTIP);
    }
};

export const ai_sensor_color = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.HTML_COLOUR + Blockly.Msg.MIXPY_OBJECT)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_COLOR_ANALYSIS);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                ['RGB' + Blockly.Msg.HTML_COLOUR, "[0]"],
                ['LAB' + Blockly.Msg.MIXLY_COLOR_LAB, "[1]"]
            ]), "key");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_COLOR_TOOLTIP);
    }
};

export const ai_sensor_find_colors = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_COLOR_RECOGNTITION);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + "color");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_COLOR_RECOGNTITION_TOOLTIP);
    }
};

export const ai_sensor_color_chases_result = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_COLOR_CHASE + Blockly.Msg.MIXPY_OBJECT)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_COLOR_CHASE_ANALYSIS);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_CIRCLE_AREA, "info1"],
                [Blockly.Msg.MIXLY_POSITION_XY + "-xywh", "rect"],
                ["x" + Blockly.Msg.MIXLY_POSITION_XY, "rect[0]"],
                ["y" + Blockly.Msg.MIXLY_POSITION_XY, "rect[1]"],
                ["w" + Blockly.Msg.MIXLY_POSITION_XY, "rect[2]"],
                ["h" + Blockly.Msg.MIXLY_POSITION_XY, "rect[3]"],
                [Blockly.Msg.MICROPYTHON_HUSKYLENS_X_CENTERED + Blockly.Msg.MIXLY_POSITION_XY, "xc"],
                [Blockly.Msg.MICROPYTHON_HUSKYLENS_Y_CENTERED + Blockly.Msg.MIXLY_POSITION_XY, "yc"]
            ]), "key");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_CIRCLE_TOOLTIP);
    }
};

export const ai_sensor_color_chases = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_COLOR_CHASE);
        this.appendValueInput("VAR1")
            .appendField('LAB' + Blockly.Msg.MIXLY_COLOR_LAB)

            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("VAR2")
            .appendField(Blockly.Msg.MIXLY_ESP32_THRESHOLD)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("VAR3")
            .appendField(Blockly.Msg.MIXLY_COLOR_CHASE_MERGE)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + "[colors]");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_CIRCLE_RECOGNTITION_TOOLTIP);
    }
};

export const ai_sensor_ailocal_train = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_LOCAL_TRAIN);
        this.appendValueInput("VAR1")
            .appendField(Blockly.Msg.MIXLY_OBJECT_LIST)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("VAR2")
            .appendField(Blockly.Msg.MICROPYTHON_HUSKYLENS_SAVE_AS + Blockly.Msg.MIXLY_MODEL_NAME)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("VAR3")
            .appendField(Blockly.Msg.MIXLY_TRAIN_TIME)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("VAR4")
            .appendField(Blockly.Msg.MIXLY_AipNlp_Topic_Title)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_LOCAL_TRAIN_TOOLTIP);
    }
};

export const ai_sensor_ailocal_class = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_LOCAL_CLASS);
        this.appendValueInput("VAR1")
            .appendField(Blockly.Msg.MIXLY_OBJECT_LIST)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("VAR2")
            .appendField(Blockly.Msg.MIXLY_MODEL_NAME)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("VAR4")
            .appendField(Blockly.Msg.MIXLY_AipNlp_Topic_Title)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + "[objects]");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_MODEL_NAME_TOOLTIP);
    }
};

export const ai_sensor_ailocal_class_result = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_LOCAL_CLASS + Blockly.Msg.MIXPY_OBJECT)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_COLOR_CHASE_ANALYSIS);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                ['ID', "info1"],
                [Blockly.Msg.MIXLY_CONFIDENCE_DEGREE, "info2"],
            ]), "key");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_LOCAL_CLASS_TOOLTIP);
    }
};

export const ai_sensor_audio_record = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MUSIC_RECORD);
        this.appendValueInput("VAR1")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_THE_PATH)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("VAR2")
            .appendField(Blockly.Msg.MIXPY_AI_AUDIO_TIME)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_MUSIC_RECORD_TOOLTIP);
    }
};

export const ai_sensor_audio_play = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MUSIC_PLAY);
        this.appendValueInput("VAR1")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_THE_PATH)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("VAR2")
            .appendField(Blockly.Msg.MIXLY_MP3_VOL)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendDummyInput()
            .appendField('%')
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);

    }
};

export const ai_sensor_yolo_recognize = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_YOLO_RECOGNIZE);
        this.appendValueInput("VAR1")
            .appendField(Blockly.Msg.MIXLY_ANCHOR)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("VAR2")
            .appendField(Blockly.Msg.MIXLY_MODEL_PATH)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("VAR4")
            .appendField(Blockly.Msg.MIXLY_AipNlp_Topic_Title)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + "[objects]");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_YOLO_RECOGNIZE_TOOLTIP);
    }
};

export const ai_sensor_yolo_recognize_result = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_YOLO_RECOGNIZE + Blockly.Msg.MIXPY_OBJECT)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_COLOR_CHASE_ANALYSIS);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                ['ID', "info1"],
                [Blockly.Msg.MIXLY_CONFIDENCE_DEGREE, "info2"],
                [Blockly.Msg.MIXLY_POSITION_XY + "-xywh", "rect"],
                ["x" + Blockly.Msg.MIXLY_POSITION_XY, "rect[0]"],
                ["y" + Blockly.Msg.MIXLY_POSITION_XY, "rect[1]"],
                ["w" + Blockly.Msg.MIXLY_POSITION_XY, "rect[2]"],
                ["h" + Blockly.Msg.MIXLY_POSITION_XY, "rect[3]"],
                [Blockly.Msg.MICROPYTHON_HUSKYLENS_X_CENTERED + Blockly.Msg.MIXLY_POSITION_XY, "xc"],
                [Blockly.Msg.MICROPYTHON_HUSKYLENS_Y_CENTERED + Blockly.Msg.MIXLY_POSITION_XY, "yc"]
            ]), "key");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_YOLO_RECOGNIZE_RESULT_TOOLTIP);
    }
};

export const ai_sensor_asr_recognize = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_AipSpeech_asr);
        this.appendValueInput("VAR1")
            .appendField(Blockly.Msg.MIXLY_AI_SENSOR_ASR_RECOGNISE_CORPUS)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("VAR2")
            .appendField(Blockly.Msg.MIXLY_ESP32_THRESHOLD)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_ASR_RECOGNISE_TOOLTIP);
    }
};

export const ai_sensor_licenseplate = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_LICENSEPLATE + Blockly.Msg.MIXPY_OBJECT)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ALL_CODE_ANALYSIS);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                ['ID', "info1"],
                [Blockly.Msg.MIXLY_POSITION_XY + "-xywh", "rect"],
                ["x" + Blockly.Msg.MIXLY_POSITION_XY, "rect[0]"],
                ["y" + Blockly.Msg.MIXLY_POSITION_XY, "rect[1]"],
                ["w" + Blockly.Msg.MIXLY_POSITION_XY, "rect[2]"],
                ["h" + Blockly.Msg.MIXLY_POSITION_XY, "rect[3]"]
            ]), "key");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_LICENSEPLATE_TOOLTIP);
    }
};

export const ai_sensor_find_licenseplates = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_AipOcr_licensePlate);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + "[licensePlate]");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_LICENSEPLATE_RECOGNTITION_TOOLTIP);
    }
};

export const ai_sensor_face = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_FACE + Blockly.Msg.MIXPY_OBJECT)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ALL_CODE_ANALYSIS);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                ["ID", "info1"],
                [Blockly.Msg.MIXLY_CONFIDENCE_DEGREE, "info2"],
                [Blockly.Msg.MIXLY_POSITION_XY + "-xywh", "rect"],
                ["x" + Blockly.Msg.MIXLY_POSITION_XY, "rect[0]"],
                ["y" + Blockly.Msg.MIXLY_POSITION_XY, "rect[1]"],
                ["w" + Blockly.Msg.MIXLY_POSITION_XY, "rect[2]"],
                ["h" + Blockly.Msg.MIXLY_POSITION_XY, "rect[3]"]
            ]), "key");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_FACE_TOOLTIP);
    }
};

export const ai_sensor_classifier_faces = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_AipFace);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + "[face]");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_BAR_FACE_CLASSIFIER_TOOLTIP);
    }
};

export const ai_sensor_20object = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_20OBJECTS + Blockly.Msg.MIXPY_OBJECT)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ALL_CODE_ANALYSIS);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                ['ID', "info1"],
                [Blockly.Msg.MIXLY_CONFIDENCE_DEGREE, "info2"],
                [Blockly.Msg.MIXLY_POSITION_XY + "-xywh", "rect"],
                ["x" + Blockly.Msg.MIXLY_POSITION_XY, "rect[0]"],
                ["y" + Blockly.Msg.MIXLY_POSITION_XY, "rect[1]"],
                ["w" + Blockly.Msg.MIXLY_POSITION_XY, "rect[2]"],
                ["h" + Blockly.Msg.MIXLY_POSITION_XY, "rect[3]"]
            ]), "key");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_20OBJECTS_TOOLTIP);
    }
};

export const ai_sensor_find_20objects = {
    init: function () {
        this.setColour(AI_SENSOR_HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_FIND_20OBJECTS);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + "[20objects]");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_AI_SENSOR_BAR_FIND_20OBJECTS_TOOLTIP);
    }
};