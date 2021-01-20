'use strict';

goog.provide('Blockly.Blocks.storage');

goog.require('Blockly.Blocks');

Blockly.Blocks.storage.HUE = 0;

Blockly.Blocks.store_sd_init = {
  init: function () {
    this.appendDummyInput("")
    .appendField("SD")
    .appendField(Blockly.MIXLY_SETUP);
    this.appendValueInput("PIN_MOSI")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("MOSI")
    .appendField(Blockly.MIXLY_PIN);
    this.appendValueInput("PIN_MISO")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("MISO")
    .appendField(Blockly.MIXLY_PIN);
    this.appendValueInput("PIN_SCK")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("CLK")
    .appendField(Blockly.MIXLY_PIN);
    this.appendValueInput("PIN_CS")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("CS")
    .appendField(Blockly.MIXLY_PIN);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.storage.HUE);
    this.setInputsInline(false);
    this.setTooltip();
    this.setHelpUrl('');
  }
};

Blockly.Blocks.store_sd_init_32 = {
  init: function () {
    this.appendDummyInput("")
    .appendField("SD")
    .appendField(Blockly.MIXLY_SETUP);
    this.appendValueInput("PIN_MOSI")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("MOSI")
    .appendField(Blockly.MIXLY_PIN);
    this.appendValueInput("PIN_MISO")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("MISO")
    .appendField(Blockly.MIXLY_PIN);
    this.appendValueInput("PIN_SCK")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("CLK")
    .appendField(Blockly.MIXLY_PIN);
    this.appendValueInput("PIN_CS")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("CS")
    .appendField(Blockly.MIXLY_PIN);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.storage.HUE);
    this.setInputsInline(false);
    this.setTooltip();
    this.setHelpUrl('');
  }
};

Blockly.Blocks.sd_card_type= {
  init: function() { 
    this.appendDummyInput() 
    .appendField("SD"+Blockly.MIXLY_TYPE);
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.storage.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks.sd_card_root_files= {
  init: function() { 
    this.appendDummyInput() 
    .appendField(Blockly.MIXLY_SD_LIST_FILES);
    this.setOutput(false, null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.storage.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

var volume_TYPE =
[[Blockly.MIXLY_SD_clusterCount, 'volume.clusterCount()'],
[Blockly.MIXLY_SD_blocksPerCluster, 'volume.blocksPerCluster()'],
[Blockly.MIXLY_SD_TOTAL_blocks, 'volume.blocksPerCluster() * volume.clusterCount()'],
["FAT"+Blockly.MIXLY_TYPE, 'volume.fatType()'],
[Blockly.MIXLY_volume+"(KB)", 'volume.blocksPerCluster()*volume.clusterCount()/2'],
[Blockly.MIXLY_volume+"(MB)", 'volume.blocksPerCluster()*volume.clusterCount()/2/1024'],
[Blockly.MIXLY_volume+"(GB)", 'volume.blocksPerCluster()*volume.clusterCount()/2/1024/1024.0'],

];

Blockly.Blocks.sd_volume = {
  init: function() {
   this.setColour(Blockly.Blocks.storage.HUE);
   this.appendDummyInput()
   .appendField("SD")
   .appendField(new Blockly.FieldDropdown(volume_TYPE), 'volume_TYPE');
   this.setOutput(true, Number);
   this.setTooltip();
 }
};

Blockly.Blocks.sd_exist= {
  init: function() { 
    this.appendDummyInput() 
    .appendField(this.newQuote_(true))
    .appendField(new Blockly.FieldTextInput("fileName.txt"), "FileName")
    .appendField(this.newQuote_(false))
    .appendField(Blockly.MIXLY_SD_FILE_Exist);
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.storage.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  },
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  }
};

Blockly.Blocks.sd_DelFile= {
  init: function() { 
    this.appendDummyInput()  
    .appendField(Blockly.MIXLY_MICROBIT_JS_DELETE_VAR)
    .appendField(this.newQuote_(true))
    .appendField(new Blockly.FieldTextInput("fileName.txt"), "FileName")
    .appendField(this.newQuote_(false));      
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.storage.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  },
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  }
};

Blockly.Blocks.sd_read= {
  init: function() { 
    this.appendDummyInput()  
    .appendField(Blockly.MIXLY_SERIAL_READ)
    .appendField(this.newQuote_(true))
    .appendField(new Blockly.FieldTextInput("fileName.txt"), "FileName")
    .appendField(this.newQuote_(false));       
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.storage.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  },
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  }
};

Blockly.Blocks.store_sd_write = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_WRITE_SD_FILE)
    .appendField(this.newQuote_(true))
    .appendField(new Blockly.FieldTextInput(''), 'FILE')
    .appendField(this.newQuote_(false));
    this.appendValueInput("DATA", String)
    .setCheck([String,Number])
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_SD_DATA);
    this.appendValueInput("NEWLINE", Boolean)
    .setCheck(Boolean)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_SD_NEWLINE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_STORE_SDWRITE);
  },
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  }
};

Blockly.Blocks.store_eeprom_write_long = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendValueInput("ADDRESS", Number)
    .setCheck(Number)
    .appendField(Blockly.MIXLY_EEPROM_WRITE_LONG);
    this.appendValueInput("DATA", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_DATA);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_STORE_EEPROM_WRITELONG);
  }
};

Blockly.Blocks.store_eeprom_read_long = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendValueInput("ADDRESS", Number)
    .setCheck(Number)
    .appendField(Blockly.MIXLY_EEPROM_READ_LONG);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_STORE_EEPROM_READLONG);
  }
};


Blockly.Blocks.store_eeprom_write_byte = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendValueInput("ADDRESS", Number)
    .setCheck(Number)
    .appendField(Blockly.MIXLY_EEPROM_WRITE_BYTE);
    this.appendValueInput("DATA", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_DATA);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_STORE_EEPROM_WRITEBYTE);
  }
};

Blockly.Blocks.store_eeprom_read_byte = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendValueInput("ADDRESS", Number)
    .setCheck(Number)
    .appendField(Blockly.MIXLY_EEPROM_READ_BYTE);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_STORE_EEPROM_READBYTE);
  }
};

Blockly.Blocks.store_eeprom_put = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendValueInput("ADDRESS")
    .setCheck(null)
    .appendField(Blockly.MIXLY_ESP32_WRITE)
    //.appendField(new Blockly.FieldDropdown([[Blockly.LANG_MATH_INT,"int"],[Blockly.LANG_MATH_LONG,"long"],[Blockly.LANG_MATH_FLOAT,"float"],[Blockly.LANG_MATH_BYTE,"byte"],["字节数组","byte_array"],["字符数组","char_array"]]), "type")
    .appendField("EEPROM")
    .appendField(Blockly.MQTT_SERVER_ADD);
    this.appendValueInput("DATA")
    .setCheck(null)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_SD_DATA);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_STORE_EEPROM_PUT);
  }
};

Blockly.Blocks.store_eeprom_get = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendValueInput("ADDRESS")
    .setCheck(null)
    .appendField(Blockly.MIXLY_SERIAL_READ)
    //.appendField(new Blockly.FieldDropdown([[Blockly.LANG_MATH_INT,"int"],[Blockly.LANG_MATH_LONG,"long"],[Blockly.LANG_MATH_FLOAT,"float"],[Blockly.LANG_MATH_BYTE,"byte"],["字节数组","byte_array"],["字符数组","char_array"]]), "type")
    .appendField("EEPROM")
    .appendField(Blockly.MQTT_SERVER_ADD);
    this.appendValueInput("DATA")
    .setCheck(null)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.SAVETO + ' ' + MSG["catVar"]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_STORE_EEPROM_GET);
  }
};