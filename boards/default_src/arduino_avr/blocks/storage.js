import * as Blockly from 'blockly/core';

const STORAGE_HUE = 0;

export const store_sd_init = {
    init: function () {
        this.appendDummyInput("")
            .appendField("SD")
            .appendField(Blockly.Msg.MIXLY_SETUP);
        this.appendValueInput("PIN_MOSI")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("MOSI")
            .appendField(Blockly.Msg.MIXLY_PIN);
        this.appendValueInput("PIN_MISO")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("MISO")
            .appendField(Blockly.Msg.MIXLY_PIN);
        this.appendValueInput("PIN_SCK")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("CLK")
            .appendField(Blockly.Msg.MIXLY_PIN);
        this.appendValueInput("PIN_CS")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("CS")
            .appendField(Blockly.Msg.MIXLY_PIN);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(STORAGE_HUE);
        this.setInputsInline(false);
        this.setTooltip();
        this.setHelpUrl('');
    }
};

export const store_sd_init_32 = {
    init: function () {
        this.appendDummyInput("")
            .appendField("SD")
            .appendField(Blockly.Msg.MIXLY_SETUP);
        this.appendValueInput("PIN_MOSI")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("MOSI")
            .appendField(Blockly.Msg.MIXLY_PIN);
        this.appendValueInput("PIN_MISO")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("MISO")
            .appendField(Blockly.Msg.MIXLY_PIN);
        this.appendValueInput("PIN_SCK")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("CLK")
            .appendField(Blockly.Msg.MIXLY_PIN);
        this.appendValueInput("PIN_CS")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("CS")
            .appendField(Blockly.Msg.MIXLY_PIN);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(STORAGE_HUE);
        this.setInputsInline(false);
        this.setTooltip();
        this.setHelpUrl('');
    }
};

export const sd_card_type = {
    init: function () {
        this.appendDummyInput()
            .appendField("SD" + Blockly.Msg.MIXLY_TYPE);
        this.setOutput(true, null);
        this.setColour(STORAGE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const sd_card_root_files = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SD_LIST_FILES);
        this.setOutput(false, null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(STORAGE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

var volume_TYPE = [
    [Blockly.Msg.MIXLY_SD_clusterCount, 'volume.clusterCount()'],
    [Blockly.Msg.MIXLY_SD_blocksPerCluster, 'volume.blocksPerCluster()'],
    [Blockly.Msg.MIXLY_SD_TOTAL_blocks, 'volume.blocksPerCluster() * volume.clusterCount()'],
    ["FAT" + Blockly.Msg.MIXLY_TYPE, 'volume.fatType()'],
    [Blockly.Msg.MIXLY_volume + "(KB)", 'volume.blocksPerCluster()*volume.clusterCount()/2'],
    [Blockly.Msg.MIXLY_volume + "(MB)", 'volume.blocksPerCluster()*volume.clusterCount()/2/1024'],
    [Blockly.Msg.MIXLY_volume + "(GB)", 'volume.blocksPerCluster()*volume.clusterCount()/2/1024/1024.0'],
];

export const sd_volume = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendDummyInput()
            .appendField("SD")
            .appendField(new Blockly.FieldDropdown(volume_TYPE), 'volume_TYPE');
        this.setOutput(true, Number);
        this.setTooltip();
    }
};

export const sd_exist = {
    init: function () {
        this.appendValueInput("FileName");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SD_FILE_Exist);
        this.setOutput(true, null);
        this.setColour(STORAGE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const sd_DelFile = {
    init: function () {
        this.appendValueInput("FileName")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_DELETE_VAR);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(STORAGE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const sd_read = {
    init: function () {
        this.appendValueInput("FileName")
            .appendField(Blockly.Msg.MIXLY_SERIAL_READ);
        this.setOutput(true, null);
        this.setColour(STORAGE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const store_sd_write = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("FILE")
            .appendField(Blockly.Msg.MIXLY_WRITE_SD_FILE);
        this.appendValueInput("DATA", String)
            .setCheck([String, Number])
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_SD_DATA);
        this.appendValueInput("NEWLINE", Boolean)
            .setCheck(Boolean)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_SD_NEWLINE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_STORE_SDWRITE);
    }
};

export const store_eeprom_write_long = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("ADDRESS", Number)
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_EEPROM_WRITE_LONG);
        this.appendValueInput("DATA", Number)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_DATA);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_STORE_EEPROM_WRITELONG);
    }
};

export const store_eeprom_read_long = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("ADDRESS", Number)
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_EEPROM_READ_LONG);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_STORE_EEPROM_READLONG);
    }
};


export const store_eeprom_write_byte = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("ADDRESS", Number)
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_EEPROM_WRITE_BYTE);
        this.appendValueInput("DATA", Number)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_DATA);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_STORE_EEPROM_WRITEBYTE);
    }
};

export const store_eeprom_read_byte = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("ADDRESS", Number)
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_EEPROM_READ_BYTE);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_STORE_EEPROM_READBYTE);
    }
};

export const store_eeprom_put = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("ADDRESS")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_ESP32_WRITE)
            //.appendField(new Blockly.FieldDropdown([[Blockly.Msg.LANG_MATH_INT,"int"],[Blockly.Msg.LANG_MATH_LONG,"long"],[Blockly.Msg.LANG_MATH_FLOAT,"float"],[Blockly.Msg.LANG_MATH_BYTE,"byte"],["字节数组","byte_array"],["字符数组","char_array"]]), "type")
            .appendField("EEPROM")
            .appendField(Blockly.Msg.MQTT_SERVER_ADD);
        this.appendValueInput("DATA")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_SD_DATA);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_STORE_EEPROM_PUT);
    }
};

export const store_eeprom_get = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("ADDRESS")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_SERIAL_READ)
            //.appendField(new Blockly.FieldDropdown([[Blockly.Msg.LANG_MATH_INT,"int"],[Blockly.Msg.LANG_MATH_LONG,"long"],[Blockly.Msg.LANG_MATH_FLOAT,"float"],[Blockly.Msg.LANG_MATH_BYTE,"byte"],["字节数组","byte_array"],["字符数组","char_array"]]), "type")
            .appendField("EEPROM")
            .appendField(Blockly.Msg.MQTT_SERVER_ADD);
        this.appendValueInput("DATA")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.SAVETO + ' ' + Blockly.Msg.MSG["catVar"]);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_STORE_EEPROM_GET);
    }
};

//ESP32简化SPIFFS
var OPEN_MODE1 = [
    [Blockly.Msg.TEXT_WRITE_TEXT, '1'],
    [Blockly.Msg.TEXT_APPEND_APPENDTEXT, '2']]

export const simple_spiffs_read = {
    init: function () {
        this.appendValueInput("FileName")
            .appendField(Blockly.Msg.MIXLY_SERIAL_READ);
        this.setOutput(true, null);
        this.setColour(STORAGE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const simple_spiffs_store_spiffs_write = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("FILE")
            .appendField(Blockly.Msg.MIXLY_WRITE_SPIFFS_FILE);
        this.appendValueInput("DATA", String)
            .setCheck([String, Number])
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_SD_DATA);
        this.appendValueInput("NEWLINE", Boolean)
            .setCheck(Boolean)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_SD_NEWLINE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MODE)
            .appendField(new Blockly.FieldDropdown(OPEN_MODE1), 'MODE');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_STORE_SDWRITE);
    }
};

export const simple_spiffs_DelFile = {
    init: function () {
        this.appendValueInput("FileName")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_DELETE_VAR);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(STORAGE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};