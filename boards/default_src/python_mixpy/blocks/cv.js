import * as Blockly from 'blockly/core';

const CV_HUE = "f0a559";

export const cv_read_image = {
    init: function () {
        this.setColour(CV_HUE);
        this.appendValueInput("FILE")
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_CV_IMREAD);
        this.setInputsInline(true);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true);
    }
};

export const cv_show_image = {
    init: function () {
        this.setColour(CV_HUE);
        this.appendValueInput("FILE")
            .appendField(Blockly.Msg.OLED_BITMAP);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_AipNlp_Topic_Title);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

export const cv_write_image = {
    init: function () {
        this.setColour(CV_HUE);
        this.appendValueInput("FILE")
            .appendField(Blockly.Msg.MIXLY_CV_IMWRITE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.HTML_NAME);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

export const cv_waitkey = {
    init: function () {
        this.setColour(CV_HUE);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_DELAY);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MILLIS + Blockly.Msg.MIXLY_CV_OR_PRESS)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_CV_WAITKEY_TOOLTIP)
    }
}

export const cv_destroy_all = {
    init: function () {
        this.setColour(CV_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_CV_DESTROY_ALL)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

export const cv_line_rect = {
    init: function () {
        this.setColour(CV_HUE);
        this.appendValueInput("FILE")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_IMAGE);
        var line_rect =
            [[Blockly.Msg.MIXLY_CV_RECT, 'rectangle'], [Blockly.Msg.MIXLY_CV_LINE, 'line']];

        this.appendValueInput('x1')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_DISPLAY_DRAW)
            .appendField(new Blockly.FieldDropdown(line_rect), 'DIR')
            .appendField(Blockly.Msg.MIXLY_CV_DRAWLINE_BEGIN + '(x1')
        this.appendValueInput('y1')
            .setCheck(Number)
            .appendField(',y1');
        this.appendValueInput('x2')
            .setCheck(Number)
            .appendField(') ' + Blockly.Msg.MIXLY_CV_DRAWLINE_END + '(x2');
        this.appendValueInput('y2')
            .setCheck(Number)
            .appendField(',y2');
        this.appendDummyInput()
            .appendField(') ' + Blockly.Msg.MIXLY_CV_DRAWLINE_COLOR)
            .appendField(new Blockly.FieldColour('#ff0000'), 'FIELDNAME');
        this.appendValueInput('thick')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_CV_DRAWLINE_THICKNESS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_CV_DRAWLINE_RECT_TOOLTIP)
    }
}

export const cv_text = {
    init: function () {
        this.setColour(CV_HUE);
        this.appendValueInput("FILE")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_IMAGE);
        var font =
            [['SIMPLEX', 'SIMPLEX'], ['PLAIN', 'PLAIN'], ['DUPLEX', 'DUPLEX'], ['COMPLEX', 'COMPLEX'], ['COMPLEX_SMALL', 'COMPLEX_SMALL'], ['TRIPLEX', 'TRIPLEX'], ['SCRIPT_SIMPLEX', 'SCRIPT_SIMPLEX'], ['SCRIPT_COMPLEX', 'SCRIPT_COMPLEX'],];
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_CV_DRAWTEXT);
        this.appendValueInput('x1')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_CV_DRAWLINE_BEGIN + '(x1')
        this.appendValueInput('y1')
            .setCheck(Number)
            .appendField(',y1');
        this.appendDummyInput()
            .appendField(') ' + Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_NAME)
            .appendField(new Blockly.FieldDropdown(font), 'font');
        this.appendValueInput('size')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_NUM);
        this.appendDummyInput()
            .appendField(') ' + Blockly.Msg.MIXLY_CV_DRAWLINE_COLOR)
            .appendField(new Blockly.FieldColour('#ff0000'), 'FIELDNAME');
        this.appendValueInput('thick')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_CV_DRAWLINE_THICKNESS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_CV_DRAWLINE_RECT_TOOLTIP)
    }
}

export const cv_face_classifier = {
    init: function () {
        this.setColour(CV_HUE);
        this.appendValueInput("FILE")
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_CV_FACE_CLASSIFIER);
        this.setInputsInline(true);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true);
    }
};

export const cv_face_detect = {
    init: function () {
        this.setColour(CV_HUE);
        this.appendValueInput("FILE")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_IMAGE);
        this.appendValueInput("FACE")
            .appendField(Blockly.Msg.MIXLY_CV_FACE_DETECT);
        this.appendValueInput('SCALE')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_CV_FACE_DETECT_SCALE)
        this.appendValueInput('NEIGHBOR')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_CV_FACE_DETECT_NEIGHBOR)
        this.setInputsInline(true);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true);
    }
};

export const cv_face_detect_all = {
    init: function () {
        this.setColour(CV_HUE);
        this.appendValueInput("FILE")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_IMAGE);
        this.appendValueInput("FACE")
            .appendField(Blockly.Msg.MIXLY_CV_FACE_DETECT);
        this.appendValueInput('SCALE')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_CV_FACE_DETECT_SCALE)
        this.appendValueInput('NEIGHBOR')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_CV_FACE_DETECT_NEIGHBOR)
        this.appendValueInput('x1')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_CV_FACE_DETECT_RANGE)
            .appendField(Blockly.Msg.blockpy_TUPLE_MIN)
        this.appendValueInput('y1')
            .setCheck(Number)
            .appendField('×')
        this.appendValueInput('x2')
            .setCheck(Number)
            .appendField(Blockly.Msg.blockpy_TUPLE_MAX)
        this.appendValueInput('y2')
            .setCheck(Number)
            .appendField('×')
        this.setInputsInline(true);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true);
    }
};