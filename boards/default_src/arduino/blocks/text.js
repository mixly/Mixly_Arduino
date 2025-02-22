import * as Blockly from 'blockly/core';

const TEXTS_HUE = 160;

export const text_base64_url_codec = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField(new Blockly.FieldDropdown([
                ["Base64", "BASE64"],
                ["URL", "URL"]
            ]), "TYPE")
            .appendField(new Blockly.FieldDropdown([
                ["编码", "ENCODE"],
                ["解码", "DECODE"]
            ]), "OPTION");
        this.setOutput(true, null);
        this.setColour(TEXTS_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};