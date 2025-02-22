import * as Blockly from 'blockly/core';

const STORAGE_HUE = 0; //'#5d69c5'//0;

export const storage_open_file_with_os = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput('fn')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_PYTHON_STORAGE_OPEN_FILE_WITH_OS + "(For Windows)");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

export const storage_fileopen = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("FILENAME")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_OPEN_FILE);
        //.appendField(new Blockly.FieldTextInput('filename.txt'), 'FILENAME');
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_MODE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_READ, 'r'],
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_WRITE, 'w'],
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_BIT_READ, 'rb'],
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_BIT_WRITE, 'wb']
            ]), 'MODE');
        this.appendValueInput("FILE")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_AS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('MODE');
            var mode0 = Blockly.Msg.MIXLY_USE;
            var mode1 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_MODE;
            var mode2 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_OPEN_FILE;
            var mode3 = Blockly.Msg.MIXLY_BELONG;
            var TOOLTIPS = {
                'r': Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_READ,
                'w': Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_WRITE,
                'rb': Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_BIT_READ,
                'wb': Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_BIT_WRITE
            };
            return mode0 + TOOLTIPS[mode] + mode3 + mode1 + mode2;
        });
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};


export const storage_fileopen_new = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("FILENAME")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_OPEN_FILE);
        //.appendField(new Blockly.FieldTextInput('filename.txt'), 'FILENAME');
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_MODE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_READ, 'r'],
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_WRITE, 'w'],
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_BIT_READ, 'rb'],
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_BIT_WRITE, 'wb']
            ]), 'MODE');
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setInputsInline(true);
        this.setOutput(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('MODE');
            var mode0 = Blockly.Msg.MIXLY_USE;
            var mode1 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_MODE;
            var mode2 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_OPEN_FILE;
            var mode3 = Blockly.Msg.MIXLY_BELONG;
            var mode4 = Blockly.Msg.PY_STORAGE_FILE_OBJECT;
            var TOOLTIPS = {
                'r': Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_READ,
                'w': Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_WRITE,
                'rb': Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_BIT_READ,
                'wb': Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_BIT_WRITE
            };
            return mode0 + TOOLTIPS[mode] + mode3 + mode1 + mode2 + mode4;
        });
    }
};

export const storage_fileopen_new_encoding = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("FILENAME")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_OPEN_FILE);
        //.appendField(new Blockly.FieldTextInput('filename.txt'), 'FILENAME');
        var code =
            [['ANSI', 'ANSI'], ['gbk', 'gbk'], ['utf-8', 'utf-8']];
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_MODE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_READ, 'r'],
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_WRITE, 'w'],
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_BIT_READ, 'rb'],
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_BIT_WRITE, 'wb']
            ]), 'MODE');
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXPY_TEXT_ENCODE)
            .appendField(new Blockly.FieldDropdown(code), 'CODE')
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setInputsInline(true);
        this.setOutput(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('MODE');
            var mode0 = Blockly.Msg.MIXLY_USE;
            var mode1 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_MODE;
            var mode2 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_OPEN_FILE;
            var mode3 = Blockly.Msg.MIXLY_BELONG;
            var mode4 = Blockly.Msg.PY_STORAGE_FILE_OBJECT;
            var TOOLTIPS = {
                'r': Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_READ,
                'w': Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_WRITE,
                'rb': Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_BIT_READ,
                'wb': Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_BIT_WRITE
            };
            return mode0 + TOOLTIPS[mode] + mode3 + mode1 + mode2 + mode4;
        });
    }
};

export const storage_file_write = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_MAKE);
        this.appendValueInput("FILE")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_FILE_WRITE);
        //    .appendField(new Blockly.FieldTextInput('f'), 'FILE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_MAKE + Blockly.Msg.MIXLY_MICROBIT_TYPE_STRING + Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_FILE_WRITE);
    }
}

export const storage_get_contents_without_para = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("FILE")
            .setCheck('Variable')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_FROM_FILE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_ALL, 'read'], [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_ONE_LINE, 'readline'], [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_ALL_LINES, 'readlines']]), 'MODE');
        this.setInputsInline(true);
        this.setPreviousStatement(false); //in front of the block has something
        this.setNextStatement(false);  //beyond the ... has something
        this.setOutput(true, String);
    }
};

export const storage_get_contents = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("FILE")
            .setCheck('Variable')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_FROM_FILE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_NO_MORE_THAN_SIZE, 'read'],
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_ONE_LINE_NO_MORE_THAN_SIZE, 'readline'],
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_ALL_LINES_NO_MORE_THAN_SIZE, 'readlines']
            ]), 'MODE');
        this.appendValueInput("SIZE")
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_CHARACTER);
        this.setInputsInline(true);
        this.setPreviousStatement(false); //in front of the block has something
        this.setNextStatement(false);  //beyond the ... has something
        this.setOutput(true, String);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('MODE');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_FROM_FILE;
            var mode2 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_CHARACTER;
            var TOOLTIPS = {
                'read': Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_NO_MORE_THAN_SIZE,
                'readline': Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_ONE_LINE_NO_MORE_THAN_SIZE,
                'readlines': Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_ALL_LINES_NO_MORE_THAN_SIZE
            };
            return mode0 + TOOLTIPS[mode] + 'x' + mode2;
        });
    }
};

export const storage_get_a_line = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("FILE")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_FROM_FILE);
        this.setNextStatement(true);
        this.appendValueInput("SIZE")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_ONE_LINE_NO_MORE_THAN_SIZE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_CHARACTER);
        this.setInputsInline(true);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.MICROBIT_PYTHON_TYPE);
    }
};

export const storage_can_write_ornot = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("FILE")
            .appendField(Blockly.Msg.HTML_FILE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_CAN_WRITE_ORNOT);
        this.setInputsInline(true);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true, Boolean);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_CAN_WRITE_ORNOT1);
    }
};

export const storage_get_filename = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("FILE")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_FILENAME);
        this.setInputsInline(true);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET_FILENAME);
    }
};

export const storage_close_file = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("FILE")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_CLOSE_FILE);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setOutput(false);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_CLOSE_FILE);
    }
};

export const storage_list_all_files = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_LIST_ALL_FILES);
        this.setInputsInline(true);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true, 'List');
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_LIST_ALL_FILES);
    }
};
Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_DELETE_FILE
export const storage_delete_file = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_DELETE_FILE, 'remove'],
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_DELETE_DIRS, 'removedirs']
            ]), 'MODE');
        this.appendValueInput("FILE")
            .setCheck(String);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setOutput(false);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_DELETE_FILE);
    }
};

export const storage_get_file_size = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("FILE")
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET_FILE_SIZE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_SIZE);
        this.setInputsInline(true);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET_FILE_SIZE + Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_SIZE);
    }
};

export const storage_file_tell = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("FILE")
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_RETURN_FILE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_PRESENT_LOCATION);
        this.setInputsInline(true);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_FILE_TELL);
    }
};

export const storage_file_seek = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("FILE")
            .setCheck('Variable')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_SET_FILE_POSITION);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_CURRENT_POSITION);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_FILE_SEEK_START, 'start'],
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_FILE_SEEK_CURRENT, 'current'],
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_FILE_SEEK_END, 'end']
            ]), 'MODE');
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_FILE_SEEK_OFFSET);
        this.appendValueInput("SIZE")
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_CHARACTER);
        this.setInputsInline(true);
        this.setPreviousStatement(true); //in front of the block has something
        this.setNextStatement(true);  //beyond the ... has something
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('MODE');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_SET_FILE_POSITION + Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_CURRENT_POSITION;
            var mode2 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_CHARACTER;
            var mode3 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_FILE_SEEK_OFFSET;
            var TOOLTIPS = {
                'start': Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_FILE_SEEK_START,
                'current': Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_FILE_SEEK_CURRENT,
                'end': Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_FILE_SEEK_END
            };
            return mode0 + " " + TOOLTIPS[mode] + mode3 + 'x' + mode2;
        });
    }
};

export const storage_get_current_dir = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET_CURRENT_DIR);
        this.setInputsInline(true);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true, 'List');
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET_CURRENT_DIR);
    }
};

export const storage_make_dir = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("PATH")
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_PATH);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_SET);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_MKDIR, 'mkdir'],
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_MAKEDIRS, 'makedirs']
            ]), 'MODE');
        this.setInputsInline(true);
        this.setPreviousStatement(true); //in front of the block has something
        this.setNextStatement(true);  //beyond the ... has something
        this.setOutput(false);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('MODE');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_PATH;
            var mode2 = Blockly.Msg.MIXLY_ESP32_SET;
            var TOOLTIPS = {
                'mkdir': Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_MKDIR,
                'makedirs': Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_MAKEDIRS
            };
            return mode0 + 'x' + mode2 + TOOLTIPS[mode];
        });
    }
};

export const storage_rename = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("FILE")
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_RENAME);
        this.appendValueInput("NEWFILE")
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_AS);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setOutput(false);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_RENAME);
    }
};

export const storage_change_dir = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("FILE")
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_CHANGE_DIR);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setOutput(false);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_CHANGE_DIR);
    }
};

export const storage_is_file = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput("FILE")
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_THE_PATH);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_IS_OR_NOT);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.HTML_FILE, 'isfile'],
                [Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_IS_DIR, 'isdir']
            ]), 'MODE');
        this.setInputsInline(true);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true, Boolean);
        let thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('MODE');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_THE_PATH;
            var mode2 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_IS_OR_NOT;
            var TOOLTIPS = {
                'isfile': Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_MKDIR,
                'isdir': Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_MAKEDIRS
            };
            return mode0 + 'x' + mode2 + TOOLTIPS[mode];
        });
    }
};

export const sdcard_use_spi_init = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput('SPISUB')
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH + "SPI")
            .setCheck("var");
        this.appendValueInput('PINSUB')
            .appendField("CS")
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_MAKE)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SETUP + Blockly.Msg.LISTS_SET_INDEX_INPUT_TO)
            .appendField(Blockly.Msg.MIXLY_SD_CARD);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const sdcard_mount = {
    init: function () {
        this.setColour(STORAGE_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_SD_CARD);
        this.appendValueInput("DIR")
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_SDCARD_MOUNT);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip();
    }
}