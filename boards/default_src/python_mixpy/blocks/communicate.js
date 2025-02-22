import * as Blockly from 'blockly/core';

const COMMUNICATE_HUE = '#3288dd'; //'#3288dd';

export const requests_get_old = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput("DOMAIN")
            .appendField(Blockly.Msg.DISPLAY_IMAGE_LET2)
            .setCheck(String);
        this.appendDummyInput("")

            .appendField(Blockly.Msg.blockpy_REQUESTS_GET)
            .appendField(new Blockly.FieldTextInput('response'), 'VAR')

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.blockpy_REQUESTS_GET_TOOLTIP);
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }

}

export const requests_get = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput("URL")
            .appendField(Blockly.Msg.DISPLAY_IMAGE_LET2)
            .setCheck(String);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_CONDUCT)
            .appendField(new Blockly.FieldDropdown([["get", "get"], ["head", "head"], ["delete", "delete"]]), 'TYPE')
            .appendField(Blockly.Msg.blockpy_REQUESTS)
            .appendField(Blockly.Msg.MIXPY_REQUESTS_GET_RESULT)
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip("");
    },
}

export const requests_post = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput("URL")
            .appendField(Blockly.Msg.DISPLAY_IMAGE_LET2)
            .setCheck(String);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_CONDUCT)
            .appendField(new Blockly.FieldDropdown([["post", "post"], ["put", "put"], ["patch", "patch"]]), 'TYPE')
            .appendField(Blockly.Msg.blockpy_REQUESTS)
        this.appendValueInput("data")
            .appendField(Blockly.Msg.blockpy_REQUESTS + Blockly.Msg.OLED_STRING)
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXPY_REQUESTS_GET_RESULT)
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip("");
    },
}


export const requests_attribute = {
    init: function () {
        this.appendValueInput('VAL')

        var attr = [
            [Blockly.Msg.blockpy_REQUESTS_GET_ATTR_STATUS_CODE, 'status_code'], [Blockly.Msg.blockpy_REQUESTS_GET_ATTR_TEXT, 'text'],
            [Blockly.Msg.blockpy_REQUESTS_GET_ATTR_COOKIES, 'cookies'], [Blockly.Msg.blockpy_REQUESTS_GET_ATTR_CONTENT, 'content'],
            [Blockly.Msg.MIXPY_TEXT_ENCODE, 'encoding']
        ];
        this.setColour(COMMUNICATE_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_GET)
            .appendField(new Blockly.FieldDropdown(attr), 'ATTR')

        this.setInputsInline(true);
        this.setOutput(true, String);
    }
};



export const requests_method = {
    init: function () {
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.DISPLAY_IMAGE_LET2)
            .setCheck(String);
        var method = [
            ['post', 'post'], ['put', 'put'],
            ['delete', 'delete'], ['head', 'head'],
            ['option', 'option']
        ];
        this.setColour(COMMUNICATE_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_CONDUCT)
            .appendField(new Blockly.FieldDropdown(method), 'DIR')
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_REQUESTS)


        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('DIR');
            var TOOLTIPS = {
                'forward': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_FORWARD,
                'backward': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_BACKWARD
            };
            return TOOLTIPS[mode];
        });
    }
};