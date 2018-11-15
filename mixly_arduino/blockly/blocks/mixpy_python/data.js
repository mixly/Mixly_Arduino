'use strict';

goog.provide('Blockly.Blocks.data');

goog.require('Blockly.Blocks');


Blockly.Blocks.data.HUE = 170//'#5ec73d'//195;


Blockly.Blocks['series_create'] = {
  init: function() {
    this.setColour(Blockly.Blocks.data.HUE);
  this.appendDummyInput("")
  
      .appendField(Blockly.blockpy_series_create)
      .appendField(new Blockly.FieldTextInput('ser1'), 'VAR')
    this.appendValueInput('SER')  
        .appendField(Blockly.blockpy_series_via)              
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  this.setTooltip(Blockly.blockpy_series_create_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
 
}

Blockly.Blocks['series_create_from_index'] = {
  init: function() {
    this.setColour(Blockly.Blocks.data.HUE);
    this.appendDummyInput("")
  
      .appendField(Blockly.blockpy_series_create)
      .appendField(new Blockly.FieldTextInput('ser1'), 'VAR')
    this.appendValueInput('SER')  
        .appendField(Blockly.blockpy_series_via)   
    this.appendValueInput('INDEX')
        .setCheck([String,'List'])
        .appendField(Blockly.blockpy_series_set_index)  
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  this.setTooltip(Blockly.blockpy_series_create_index_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
 
}

Blockly.Blocks['dataframe_create'] = {
  init: function() {
    this.setColour(Blockly.Blocks.data.HUE);
  this.appendDummyInput("")
  
      .appendField(Blockly.blockpy_dataframe_create)
      .appendField(new Blockly.FieldTextInput('df1'), 'VAR')
    this.appendValueInput('SER')  
        .appendField(Blockly.blockpy_series_via)              
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  this.setTooltip(Blockly.blockpy_dataframe_create_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
 
}

Blockly.Blocks['dataframe_create_from_one_index'] = {
  init: function() {
    this.setColour(Blockly.Blocks.data.HUE);
    var column_raw =
        [[Blockly.Msg.DATAFRAME_RAW, 'index'],[Blockly.Msg.DATAFRAME_COLUMN, 'columns']];
    this.appendDummyInput("")  
      .appendField(Blockly.blockpy_dataframe_create)
      .appendField(new Blockly.FieldTextInput('df1'), 'VAR')
    this.appendValueInput('SER')  
        .appendField(Blockly.blockpy_series_via)  
    this.appendDummyInput("")    
        .appendField(new Blockly.FieldDropdown(column_raw), 'COLUMN_RAW')  
    this.appendValueInput('INDEX')
        .setCheck([String,'List'])
        .appendField(Blockly.blockpy_series_set_index)          
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  this.setTooltip(Blockly.blockpy_dataframe_create_index_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
 
}

Blockly.Blocks['dataframe_create_from_index'] = {
  init: function() {
    this.setColour(Blockly.Blocks.data.HUE);
    this.appendDummyInput("")
  
      .appendField(Blockly.blockpy_dataframe_create)
      .appendField(new Blockly.FieldTextInput('df1'), 'VAR')
    this.appendValueInput('SER')  
        .appendField(Blockly.blockpy_series_via)   
    this.appendValueInput('INDEX_COLUMN')
        .setCheck([String,'List'])
        .appendField(Blockly.blockpy_dataframe_set_index_column)
    this.appendValueInput('INDEX_RAW')
        .setCheck([String,'List'])
        .appendField(Blockly.blockpy_dataframe_set_index_raw)      
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setInputsInline(true);
  this.setTooltip(Blockly.blockpy_dataframe_create_index_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
 
}



Blockly.Blocks['series_create_from_text'] = {
  init: function() {
    this.setColour(Blockly.Blocks.data.HUE);
    this.appendDummyInput("")
  
        .appendField(new Blockly.FieldTextInput('ser1'), 'VAR')
        
        .appendField(' = [')
        .appendField(new Blockly.FieldTextInput('1,2,3'), 'TEXT')
        .appendField(']');
        
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_SERIES_CREATE_FROM_TEXT);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
  
}


Blockly.Blocks['series_index_value'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.data.HUE);
    var index_value =
        [[Blockly.Msg.SERIES_INDEX, 'index'],[Blockly.Msg.SERIES_VALUE, 'value']];
    this.appendValueInput('SERIES')
        .setCheck('Series')
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.SERIES_INDEX_VALUE)  
        .appendField(new Blockly.FieldDropdown(index_value), 'INDEX_VALUE')      
     
    this.setOutput(true, 'List');
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('INDEX_VALUE');
      var TOOLTIPS = {
        'index': Blockly.Msg.SERIES_INDEX_TOOLTIP,
        'value': Blockly.Msg.SERIES_VALUE_TOOLTIP
      };
      return TOOLTIPS[mode];
    });

  }
};

Blockly.Blocks.series_get_num = {
  init: function() {
    this.setColour(Blockly.Blocks.data.HUE);
    //this.setOutput(true, Number);
    this.setOutput(true);
    this.appendValueInput('SER')
        .setCheck('Series')
    this.appendValueInput('AT')
        .setCheck(Number)    
        .appendField(Blockly.LANG_LISTS_GET_INDEX1);
    this.appendDummyInput("")
        .appendField(Blockly.LANG_LISTS_GET_INDEX2);
    this.setInputsInline(true);
    this.setTooltip(Blockly.TUPLE_GET_INDEX_TOOLTIP);
  }
};


Blockly.Blocks['pl_plot'] = {
  init: function() {
    this.setColour(Blockly.Blocks.data.HUE); 
    var line_type =
        [[Blockly.blockpy_PYLAB_PLOT_LINE_SOLID, '-'],[Blockly.blockpy_PYLAB_PLOT_LINE_DOTTED, '--'],
        [Blockly.blockpy_PYLAB_PLOT_LINE_CHAIN, '-.'],[Blockly.blockpy_PYLAB_PLOT_LINE_POINT_DOTTED, ':']];
    var color_type =
        [[Blockly.Msg.COLOUR_RGB_BLUE, 'b'],[Blockly.Msg.COLOUR_RGB_GREEN, 'g'],
        [Blockly.Msg.COLOUR_RGB_RED, 'r'],[Blockly.Msg.COLOUR_CYAN, 'c'],
        [Blockly.Msg.COLOUR_MAGENTA, 'm'],[Blockly.Msg.COLOUR_YELLOW, 'y'],
        [Blockly.Msg.COLOUR_BLACK, 'k'],[Blockly.Msg.COLOUR_WHITE, 'w']
        ];
    var dot_type =
        [[Blockly.blockpy_PYLAB_PLOT_DOT_CIRCULAR, '.'],[Blockly.blockpy_PYLAB_PLOT_DOT_PIXEL, ','],[Blockly.blockpy_PYLAB_PLOT_DOT_LARGE_DOT, 'o'],[Blockly.blockpy_PYLAB_PLOT_DOT_TRIANGLE_DOWN, 'v'],
        [Blockly.blockpy_PYLAB_PLOT_DOT_TRIANGLE_UP, '^'],[Blockly.blockpy_PYLAB_PLOT_DOT_TRIANGLE_LEFT, '<'],[Blockly.blockpy_PYLAB_PLOT_DOT_TRIANGLE_RIGHT, '>'],[Blockly.blockpy_PYLAB_PLOT_DOT_TRIMARKER_UP, '1'],
        [Blockly.blockpy_PYLAB_PLOT_DOT_TRIMARKER_DOWN, '2'],[Blockly.blockpy_PYLAB_PLOT_DOT_TRIMARKER_LEFT, '3'],[Blockly.blockpy_PYLAB_PLOT_DOT_TRIMARKER_RIGHT, '4'],[Blockly.blockpy_PYLAB_PLOT_DOT_SQUARE, 's'],
        [Blockly.blockpy_PYLAB_PLOT_DOT_PENTAGON, 'p'],[Blockly.blockpy_PYLAB_PLOT_DOT_STAR, '*'],[Blockly.blockpy_PYLAB_PLOT_DOT_HEXAGON_VERTICAL, 'h'],[Blockly.blockpy_PYLAB_PLOT_DOT_HEXAGON_HORIZONTAL, 'H'],
        [Blockly.blockpy_PYLAB_PLOT_DOT_PLUS, '+'],[Blockly.blockpy_PYLAB_PLOT_DOT_CROSS, 'x'],[Blockly.blockpy_PYLAB_PLOT_DOT_DIAMOND, 'D'],[Blockly.blockpy_PYLAB_PLOT_DOT_DIAMOND_SMALL, 'd'],
        [Blockly.blockpy_PYLAB_PLOT_DOT_VERTICAL, '|'],[Blockly.blockpy_PYLAB_PLOT_DOT_HORIZONTAL, '_']
        ];        

    this.appendValueInput('SER')
        .setCheck('Series')
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_MAKE);   
    this.appendDummyInput()
        .appendField(Blockly.blockpy_PYLAB_PLOT); 
    this.appendDummyInput("")                
        .appendField(Blockly.blockpy_PYLAB_PLOT_DOT)  
        .appendField(new Blockly.FieldDropdown(dot_type), 'DOT')  
    this.appendDummyInput("")                
        .appendField(Blockly.blockpy_PYLAB_PLOT_LINE)  
        .appendField(new Blockly.FieldDropdown(line_type), 'LINE')  
    this.appendDummyInput("")                
        .appendField(Blockly.Msg.COLOUR_RGB_TITLE)  
        .appendField(new Blockly.FieldDropdown(color_type), 'COLOR')              
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['pl_show'] = {
  init: function() {
    this.setColour(Blockly.Blocks.data.HUE);
    this.appendDummyInput()
          .appendField(Blockly.blockpy_PYLAB_SHOW);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks['pl_legend'] = {
  init: function() {
    this.setColour(Blockly.Blocks.data.HUE);
    this.appendDummyInput()
          .appendField(Blockly.blockpy_PYLAB_LEGEND);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['pl_title'] = {
  init: function() {
    this.setColour(Blockly.Blocks.data.HUE);    
    this.appendDummyInput()
        .appendField(Blockly.blockpy_PYLAB_TITLE);
    this.appendValueInput('TITLE')
        .setCheck(String);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['pl_label'] = {
  init: function() {
    this.setColour(Blockly.Blocks.data.HUE); 
    var xylabel =
        [[Blockly.Msg.PYLAB_LABEL_X, 'x'],[Blockly.Msg.PYLAB_LABEL_Y, 'y']];   
    this.appendDummyInput()
        .appendField(Blockly.blockpy_PYLAB_SET_LABEL)
        .appendField(new Blockly.FieldDropdown(xylabel), 'DIR');
    this.appendValueInput('LABEL')
        .appendField(Blockly.blockpy_PYLAB_LABEL)
        .setCheck(String);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // var thisBlock = this;
    // this.setTooltip(function() {
    //   var mode = thisBlock.getFieldValue('DIR');
    //   var TOOLTIPS = {
    //     'x': Blockly.MIXLY_TOOLTIP_TURTEL_FORWARD,
    //     'y': Blockly.MIXLY_TOOLTIP_TURTEL_BACKWARD
    //   };
    //   return TOOLTIPS[mode];
    // });
  }
};