'use strict';

goog.provide('Blockly.Blocks.storage');

goog.require('Blockly.Blocks');

Blockly.Blocks.storage.HUE = 0//'#5d69c5'//0;

Blockly.Blocks['storage_open_file_with_os'] = {
    init:function(){
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('fn')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_PYTHON_STORAGE_OPEN_FILE_WITH_OS+"(For Windows)");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks.storage_fileopen = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendValueInput("FILENAME")
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_OPEN_FILE);
        //.appendField(new Blockly.FieldTextInput('filename.txt'), 'FILENAME');
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_MODE)
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_PY_STORAGE_READ, 'r'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_WRITE, 'w'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_BIT_READ, 'rb'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_BIT_WRITE, 'wb']]), 'MODE');
    this.appendValueInput("FILE")
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_AS);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
     var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('MODE');
        var mode0 = Blockly.MIXLY_USE;
        var mode1 = Blockly.MIXLY_MICROBIT_PY_STORAGE_MODE;
        var mode2 = Blockly.MIXLY_MICROBIT_PY_STORAGE_OPEN_FILE;
        var mode3 =Blockly.MIXLY_BELONG;
        var TOOLTIPS = {
        'r': Blockly.MIXLY_MICROBIT_PY_STORAGE_READ,
        'w': Blockly.MIXLY_MICROBIT_PY_STORAGE_WRITE,
        'rb':Blockly.MIXLY_MICROBIT_PY_STORAGE_BIT_READ,
        'wb':Blockly.MIXLY_MICROBIT_PY_STORAGE_BIT_WRITE
      };
      return mode0 + TOOLTIPS[mode]+mode3+mode1+mode2;
    });
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};


Blockly.Blocks.storage_fileopen_new = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendValueInput("FILENAME")
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_OPEN_FILE);
        //.appendField(new Blockly.FieldTextInput('filename.txt'), 'FILENAME');
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_MODE)
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_PY_STORAGE_READ, 'r'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_WRITE, 'w'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_BIT_READ, 'rb'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_BIT_WRITE, 'wb']]), 'MODE');
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setInputsInline(true);
    this.setOutput(true);
     var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('MODE');
        var mode0 = Blockly.MIXLY_USE;
        var mode1 = Blockly.MIXLY_MICROBIT_PY_STORAGE_MODE;
        var mode2 = Blockly.MIXLY_MICROBIT_PY_STORAGE_OPEN_FILE;
        var mode3 =Blockly.MIXLY_BELONG;
        var mode4 =Blockly.PY_STORAGE_FILE_OBJECT;
        var TOOLTIPS = {
        'r': Blockly.MIXLY_MICROBIT_PY_STORAGE_READ,
        'w': Blockly.MIXLY_MICROBIT_PY_STORAGE_WRITE,
        'rb':Blockly.MIXLY_MICROBIT_PY_STORAGE_BIT_READ,
        'wb':Blockly.MIXLY_MICROBIT_PY_STORAGE_BIT_WRITE
      };
      return mode0 + TOOLTIPS[mode]+mode3+mode1+mode2+mode4;
    });
  }
};

Blockly.Blocks.storage_fileopen_new_encoding = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendValueInput("FILENAME")
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_OPEN_FILE);
        //.appendField(new Blockly.FieldTextInput('filename.txt'), 'FILENAME');
    var code =
        [['ANSI', 'ANSI'],['gbk', 'gbk'],['utf-8', 'utf-8']];    
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_MODE)
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_PY_STORAGE_READ, 'r'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_WRITE, 'w'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_BIT_READ, 'rb'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_BIT_WRITE, 'wb']]), 'MODE');
    this.appendDummyInput()         
        .appendField(Blockly.Msg.MIXPY_TEXT_ENCODE)     
        .appendField(new Blockly.FieldDropdown(code), 'CODE')          
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setInputsInline(true);
    this.setOutput(true);
     var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('MODE');
        var mode0 = Blockly.MIXLY_USE;
        var mode1 = Blockly.MIXLY_MICROBIT_PY_STORAGE_MODE;
        var mode2 = Blockly.MIXLY_MICROBIT_PY_STORAGE_OPEN_FILE;
        var mode3 =Blockly.MIXLY_BELONG;
        var mode4 =Blockly.PY_STORAGE_FILE_OBJECT;
        var TOOLTIPS = {
        'r': Blockly.MIXLY_MICROBIT_PY_STORAGE_READ,
        'w': Blockly.MIXLY_MICROBIT_PY_STORAGE_WRITE,
        'rb':Blockly.MIXLY_MICROBIT_PY_STORAGE_BIT_READ,
        'wb':Blockly.MIXLY_MICROBIT_PY_STORAGE_BIT_WRITE
      };
      return mode0 + TOOLTIPS[mode]+mode3+mode1+mode2+mode4;
    });
  }
};

Blockly.Blocks['storage_file_write'] = {
    init:function(){
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_MAKE);
        this.appendValueInput("FILE")
            .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_FILE_WRITE);
        //    .appendField(new Blockly.FieldTextInput('f'), 'FILE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROPYTHON_SOCKET_MAKE+Blockly.MIXLY_MICROBIT_TYPE_STRING+Blockly.MIXLY_MICROBIT_PY_STORAGE_FILE_WRITE);
    }
}

 Blockly.Blocks['storage_get_contents_without_para'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendValueInput("FILE")
         .setCheck('Variable')
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_FROM_FILE);
     this.appendDummyInput()
         .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_PY_STORAGE_ALL,'read'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_ONE_LINE,'readline'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_ALL_LINES,'readlines']]),'MODE');
     this.setInputsInline(true);
     this.setPreviousStatement(false); //in front of the block has something
     this.setNextStatement(false);  //beyond the ... has something
     this.setOutput(true, String);
   }
 };

 Blockly.Blocks['storage_get_contents'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendValueInput("FILE")
         .setCheck('Variable')
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_FROM_FILE);
     this.appendDummyInput()
         .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_PY_STORAGE_NO_MORE_THAN_SIZE,'read'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_ONE_LINE_NO_MORE_THAN_SIZE,'readline'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_ALL_LINES_NO_MORE_THAN_SIZE,'readlines']]),'MODE');
     this.appendValueInput("SIZE")
         .setCheck(Number);
     this.appendDummyInput()
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_CHARACTER);
     this.setInputsInline(true);
     this.setPreviousStatement(false); //in front of the block has something
     this.setNextStatement(false);  //beyond the ... has something
     this.setOutput(true, String);
     var thisBlock = this;
     this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('MODE');
        var mode0 = Blockly.MIXLY_MICROBIT_PY_STORAGE_FROM_FILE;
        var mode2 = Blockly.MIXLY_MICROBIT_PY_STORAGE_CHARACTER;
        var TOOLTIPS = {
        'read': Blockly.MIXLY_MICROBIT_PY_STORAGE_NO_MORE_THAN_SIZE,
        'readline': Blockly.MIXLY_MICROBIT_PY_STORAGE_ONE_LINE_NO_MORE_THAN_SIZE,
        'readlines': Blockly.MIXLY_MICROBIT_PY_STORAGE_ALL_LINES_NO_MORE_THAN_SIZE
      };
      return mode0 + TOOLTIPS[mode]+'x'+mode2;
    });
   }
 };

 Blockly.Blocks['storage_get_a_line'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendValueInput("FILE")
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_FROM_FILE);
     this.setNextStatement(true);
     this.appendValueInput("SIZE")
         .setCheck(Number)
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_ONE_LINE_NO_MORE_THAN_SIZE);
     this.appendDummyInput()
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_CHARACTER);
     this.setInputsInline(true);
     this.setPreviousStatement(false);
     this.setNextStatement(false);
     this.setOutput(true, String);
     this.setTooltip(Blockly.MICROBIT_PYTHON_TYPE);
   }
 };

 Blockly.Blocks['storage_can_write_ornot'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendValueInput("FILE")
         .appendField(Blockly.Msg.HTML_FILE);
     this.appendDummyInput()
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_CAN_WRITE_ORNOT);
     this.setInputsInline(true);
     this.setPreviousStatement(false);
     this.setNextStatement(false);
     this.setOutput(true, Boolean);
     this.setTooltip(Blockly.MIXLY_MICROBIT_PY_STORAGE_CAN_WRITE_ORNOT1);
   }
 };

 Blockly.Blocks['storage_get_filename'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendValueInput("FILE")
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
     this.appendDummyInput()
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_FILENAME);
     this.setInputsInline(true);
     this.setPreviousStatement(false);
     this.setNextStatement(false);
     this.setOutput(true, String);
     this.setTooltip(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET_FILENAME);
   }
 };

 Blockly.Blocks['storage_close_file'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendValueInput("FILE")
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_CLOSE_FILE);
     this.setInputsInline(true);
     this.setPreviousStatement(true);
     this.setNextStatement(true);
     this.setOutput(false);
     this.setTooltip(Blockly.MIXLY_MICROBIT_PY_STORAGE_CLOSE_FILE);
   }
 };

 Blockly.Blocks['storage_list_all_files'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendDummyInput()
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_LIST_ALL_FILES);
     this.setInputsInline(true);
     this.setPreviousStatement(false);
     this.setNextStatement(false);
     this.setOutput(true,'List');
     this.setTooltip(Blockly.MIXLY_MICROBIT_PY_STORAGE_LIST_ALL_FILES);
   }
 };
 Blockly.MIXLY_MICROBIT_PY_STORAGE_DELETE_FILE
 Blockly.Blocks['storage_delete_file'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendDummyInput()
         .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_PY_STORAGE_DELETE_FILE,'remove'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_DELETE_DIRS,'removedirs']]),'MODE');
     this.appendValueInput("FILE")
         .setCheck(String);
     this.setInputsInline(true);
     this.setPreviousStatement(true);
     this.setNextStatement(true);
     this.setOutput(false);
     this.setTooltip(Blockly.MIXLY_MICROBIT_PY_STORAGE_DELETE_FILE);
   }
 };

 Blockly.Blocks['storage_get_file_size'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendValueInput("FILE")
         .setCheck(String)
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET_FILE_SIZE);
     this.appendDummyInput()
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_SIZE);
     this.setInputsInline(true);
     this.setPreviousStatement(false);
     this.setNextStatement(false);
     this.setOutput(true, Number);
     this.setTooltip(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET_FILE_SIZE+Blockly.MIXLY_MICROBIT_PY_STORAGE_SIZE);
   }
 };

 Blockly.Blocks['storage_file_tell'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendValueInput("FILE")
         .setCheck(String)
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_RETURN_FILE);
     this.appendDummyInput()
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_PRESENT_LOCATION);
     this.setInputsInline(true);
     this.setPreviousStatement(false);
     this.setNextStatement(false);
     this.setOutput(true, Number);
     this.setTooltip(Blockly.MIXLY_MICROBIT_PY_STORAGE_FILE_TELL);
   }
 };

 Blockly.Blocks['storage_file_seek'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendValueInput("FILE")
         .setCheck('Variable')
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_SET_FILE_POSITION);
     this.appendDummyInput()
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_CURRENT_POSITION);
     this.appendDummyInput()
         .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_PY_STORAGE_FILE_SEEK_START,'start'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_FILE_SEEK_CURRENT,'current'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_FILE_SEEK_END,'end']]),'MODE');
     this.appendDummyInput()
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_FILE_SEEK_OFFSET);
     this.appendValueInput("SIZE")
         .setCheck(Number);
     this.appendDummyInput()
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_CHARACTER);
     this.setInputsInline(true);
     this.setPreviousStatement(true); //in front of the block has something
     this.setNextStatement(true);  //beyond the ... has something
     var thisBlock = this;
     this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('MODE');
        var mode0 = Blockly.MIXLY_MICROBIT_PY_STORAGE_SET_FILE_POSITION + Blockly.MIXLY_MICROBIT_PY_STORAGE_CURRENT_POSITION;
        var mode2 = Blockly.MIXLY_MICROBIT_PY_STORAGE_CHARACTER;
        var mode3 = Blockly.MIXLY_MICROBIT_PY_STORAGE_FILE_SEEK_OFFSET;
        var TOOLTIPS = {
        'start': Blockly.MIXLY_MICROBIT_PY_STORAGE_FILE_SEEK_START,
        'current': Blockly.MIXLY_MICROBIT_PY_STORAGE_FILE_SEEK_CURRENT,
        'end': Blockly.MIXLY_MICROBIT_PY_STORAGE_FILE_SEEK_END
      };
      return mode0 +" "+ TOOLTIPS[mode]+mode3+'x'+mode2;
    });
   }
 };

 Blockly.Blocks['storage_change_dir'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendValueInput("FILE")
         .setCheck(String)
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_CHANGE_DIR);
     this.setInputsInline(true);
     this.setPreviousStatement(true);
     this.setNextStatement(true);
     this.setOutput(false);
     this.setTooltip(Blockly.MIXLY_MICROBIT_PY_STORAGE_CHANGE_DIR);
   }
 };

 Blockly.Blocks['storage_get_current_dir'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendDummyInput()
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET_CURRENT_DIR);
     this.setInputsInline(true);
     this.setPreviousStatement(false);
     this.setNextStatement(false);
     this.setOutput(true,'List');
     this.setTooltip(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET_CURRENT_DIR);
   }
 };

 Blockly.Blocks['storage_make_dir'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendValueInput("PATH")
         .setCheck(String)
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_PATH);
     this.appendDummyInput()
         .appendField(Blockly.MIXLY_ESP32_SET);
     this.appendDummyInput()
         .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_PY_STORAGE_MKDIR,'mkdir'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_MAKEDIRS,'makedirs']]),'MODE');
     this.setInputsInline(true);
     this.setPreviousStatement(true); //in front of the block has something
     this.setNextStatement(true);  //beyond the ... has something
     this.setOutput(false);
     var thisBlock = this;
     this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('MODE');
        var mode0 = Blockly.MIXLY_MICROBIT_PY_STORAGE_PATH;
        var mode2 = Blockly.MIXLY_ESP32_SET;
        var TOOLTIPS = {
        'mkdir': Blockly.MIXLY_MICROBIT_PY_STORAGE_MKDIR,
        'makedirs': Blockly.MIXLY_MICROPYTHON_SOCKET_MAKEDIRS
      };
      return mode0 +'x'+ mode2 + TOOLTIPS[mode];
    });
   }
 };

 Blockly.Blocks['storage_rename'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendValueInput("FILE")
         .setCheck(String)
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_RENAME);
    this.appendValueInput("NEWFILE")
        .setCheck(String)
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_TO);
     this.setInputsInline(true);
     this.setPreviousStatement(true);
     this.setNextStatement(true);
     this.setOutput(false);
     this.setTooltip(Blockly.MIXLY_MICROBIT_PY_STORAGE_RENAME);
   }
 };

 Blockly.Blocks['storage_change_dir'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendValueInput("FILE")
         .setCheck(String)
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_CHANGE_DIR);
     this.setInputsInline(true);
     this.setPreviousStatement(true);
     this.setNextStatement(true);
     this.setOutput(false);
     this.setTooltip(Blockly.MIXLY_MICROBIT_PY_STORAGE_CHANGE_DIR);
   }
 };

 Blockly.Blocks['storage_is_file'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendValueInput("FILE")
         .setCheck(String)
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_THE_PATH);
     this.appendDummyInput()
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_IS_OR_NOT);
     this.appendDummyInput()
         .appendField(new Blockly.FieldDropdown([[Blockly.Msg.HTML_FILE,'isfile'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_IS_DIR,'isdir']]),'MODE');
     this.setInputsInline(true);
     this.setPreviousStatement(false);
     this.setNextStatement(false);
     this.setOutput(true,Boolean);
      this.setTooltip(function() {
         var mode = thisBlock.getFieldValue('MODE');
         var mode0 = Blockly.MIXLY_MICROBIT_PY_STORAGE_THE_PATH;
         var mode2 = Blockly.MIXLY_MICROBIT_PY_STORAGE_IS_OR_NOT;
         var TOOLTIPS = {
         'isfile': Blockly.MIXLY_MICROBIT_PY_STORAGE_MKDIR,
         'isdir': Blockly.MIXLY_MICROPYTHON_SOCKET_MAKEDIRS
       };
       return mode0 +'x'+ mode2 + TOOLTIPS[mode];
     });
   }
 };

