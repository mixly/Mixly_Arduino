'use strict';

goog.provide('Blockly.Blocks.turtle');
goog.require('Blockly.Blocks');


Blockly.Blocks.turtle.HUE = 180;

Blockly.Blocks['turtle_create'] = {
  init: function() {
    this.setColour(Blockly.Blocks.turtle.HUE);
  this.appendDummyInput("")
  
      .appendField(Blockly.blockpy_turtle_create)
      .appendField(new Blockly.FieldTextInput('tina'), 'VAR')
                       
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  this.setTooltip(Blockly.blockpy_turtle_create_TOOLTIP);
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

Blockly.Blocks['turtle_done'] = {
  init: function() {
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendDummyInput()
          .appendField(Blockly.blockpy_TURTLE_DONE);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['turtle_exitonclick'] = {
  init: function() {
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendDummyInput()
          .appendField(Blockly.MIXLY_PYTHON_TURTLE_EXITONCLICK);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['turtle_move'] = {
  init: function() {
     this.appendValueInput('TUR')
        .setCheck('Turtle')
  var front_back =
        [[Blockly.blockpy_forward, 'forward'],[Blockly.blockpy_backward, 'backward']];
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('VAR')
        // .setCheck(String)
        .appendField(Blockly.MIXLY_MICROBIT_JS_MOVE_BY)
        .appendField(new Blockly.FieldDropdown(front_back), 'DIR')
        .appendField(Blockly.MIXLY_MICROBIT_JS_MOVE_BY_num);

  this.setInputsInline(true);
   this.setPreviousStatement(true);
    this.setNextStatement(true);
  var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('DIR');
      var TOOLTIPS = {
        'forward': Blockly.MIXLY_TOOLTIP_TURTEL_FORWARD,
        'backward': Blockly.MIXLY_TOOLTIP_TURTEL_BACKWARD
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['turtle_rotate'] = {
  init: function() {
     this.appendValueInput('TUR')
        .setCheck('Turtle')
  var front_back =
        [[Blockly.blockpy_left, 'left'],[Blockly.blockpy_right, 'right']];
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('VAR')
        // .setCheck(String)
        .appendField(Blockly.blockpy_turtle_rotate)
        .appendField(new Blockly.FieldDropdown(front_back), 'DIR')
        .appendField(Blockly.MIXLY_MICROBIT_JS_BY_ANGLE);

  this.setInputsInline(true);
   this.setPreviousStatement(true);
    this.setNextStatement(true);
  var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('DIR');
      var TOOLTIPS = {
        'left': Blockly.MIXLY_TOOLTIP_TURTEL_LEFT,
        'right': Blockly.MIXLY_TOOLTIP_TURTEL_RIGHT
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['turtle_setheading'] = {
  init: function() {
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('TUR')
        .setCheck('Turtle')
    this.appendValueInput('data')
        .setCheck(Number)
        .appendField(Blockly.blockpy_setheading);
    this.appendDummyInput()
        .appendField(Blockly.blockpy_setheading_degree);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['turtle_screen_delay'] = {
  init: function() {
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('TUR')
        .setCheck('Turtle')
    this.appendValueInput('data')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_TURTLE_SCREEN_DELAY);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MILLIS);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_TURTEL_SCREEN_DELAY);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['turtle_goto'] = {
  init: function() {
    this.setColour(Blockly.Blocks.turtle.HUE);
      this.appendValueInput('TUR')
        .setCheck('Turtle')
    this.appendValueInput('data')
        .setCheck(Number)
        
        .appendField(Blockly.blockpy_turtle_goto);
    this.appendValueInput('val')
        .setCheck(Number)
        .appendField(Blockly.blockpy_turtle_goto_y);
    this.appendDummyInput()
        .appendField(Blockly.blockpy_turtle_goto_position);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['turtle_setxy'] = {
    init: function() {
       this.appendValueInput('TUR')
          .setCheck('Turtle')
    var set_xy =
          [[Blockly.Msg.PYLAB_LABEL_X, 'x'],[Blockly.Msg.PYLAB_LABEL_Y, 'y']];
      this.setColour(Blockly.Blocks.turtle.HUE);
      this.appendValueInput('VAR')
          .appendField(new Blockly.FieldDropdown(set_xy), 'DIR')
          .appendField(Blockly.MIXLY_MIXPY_TURTLE_SETXY);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(Blockly.MIXLY_MIXPY_TURTLE_SETXY_TOOLTIP);
  }    
};

Blockly.Blocks['turtle_pos_shape'] = {
  
  init: function() {    
    this.setColour(Blockly.Blocks.turtle.HUE);
    var pos_shape =
        [[Blockly.Msg.TURTLE_POS, 'pos'],[Blockly.Msg.TURTLE_SHAPE, 'shape'],[Blockly.Msg.TURTLE_HEADING, 'heading'],[Blockly.MIXLY_MIXPY_TURTLE_WIDTH,'width'],[Blockly.MIXLY_TURTEL_GET_SHAPESIZE,'shapesize'],[Blockly.MIXLY_SPEED,'speed']];
    this.appendValueInput('TUR')
        .setCheck('Turtle')
    this.appendDummyInput("")
        .appendField(Blockly.Msg.TURTLE_POS_SHAPE)  
        .appendField(new Blockly.FieldDropdown(pos_shape), 'DIR')
    var thisBlock = this;
    this.setTooltip(function() {
    var mode = thisBlock.getFieldValue('DIR');
    var TOOLTIPS = {
        'pos': Blockly.MIXLY_TOOLTIP_TURTEL_POS,
        'shape': Blockly.MIXLY_TOOLTIP_TURTEL_SHAPE,
        'heading': Blockly.MIXLY_TOOLTIP_TURTEL_HEADING,
        'width': Blockly.MIXLY_TOOLTIP_TURTEL_WIDTH,
        'speed':Blockly.MIXLY_TOOLTIP_TURTEL_GET_SPEED,
        'shapesize':Blockly.MIXLY_TURTEL_GET_SHAPESIZE_TOOLTIP         
      };
      return TOOLTIPS[mode];
    });
    this.setOutput(true);
    this.setInputsInline(true);
  
  }
};


Blockly.Blocks['turtle_clear'] = {
  init: function() {
     this.appendValueInput('TUR')
        .setCheck('Turtle')
  var clear_reset =
        [[Blockly.MIXLY_LCD_STAT_CLEAR, 'clear'],[Blockly.blockpy_turtle_reset, 'reset']
        ,[Blockly.blockpy_turtle_home, 'home']];
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(clear_reset), 'DIR')
        

  this.setInputsInline(true);
   this.setPreviousStatement(true);
    this.setNextStatement(true);
  var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('DIR');
      var TOOLTIPS = {
        'clear': Blockly.MIXLY_TOOLTIP_TURTEL_CLEAR,
        'reset': Blockly.MIXLY_TOOLTIP_TURTEL_RESET,
        'home': Blockly.MIXLY_TOOLTIP_TURTEL_HOME
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['turtle_penup'] = {
  init: function() {
    this.appendValueInput('TUR')
        .setCheck('Turtle')
  var penup_down =
        [[Blockly.blockpy_turtle_penup, 'penup'],[Blockly.blockpy_turtle_pendown, 'pendown']];
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(penup_down), 'DIR')
        

  this.setInputsInline(true);
   this.setPreviousStatement(true);
    this.setNextStatement(true);
  var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('DIR');
      var TOOLTIPS = {
        'penup': Blockly.MIXLY_TOOLTIP_TURTEL_PENUP,
        'pendown': Blockly.MIXLY_TOOLTIP_TURTEL_PENDOWN
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['turtle_fill'] = {
  init: function() {
     this.appendValueInput('TUR')
        .setCheck('Turtle')
  var fill =
        [[Blockly.blockpy_turtle_beginfill, 'begin'],[Blockly.blockpy_turtle_endfill, 'end']];
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(fill), 'DIR')
        

  this.setInputsInline(true);
   this.setPreviousStatement(true);
    this.setNextStatement(true);
  var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('DIR');
      var TOOLTIPS = {
        'begin': Blockly.MIXLY_TOOLTIP_TURTEL_BEGINFILL,
        'end': Blockly.MIXLY_TOOLTIP_TURTEL_ENDFILL
      };
      return TOOLTIPS[mode];
    });
  }
};


Blockly.Blocks['turtle_size_speed'] = {
  init: function() {
     this.appendDummyInput("")
      .appendField(new Blockly.FieldTextInput('tina'), 'TUR')
  var size_speed =
        [[Blockly.blockpy_turtle_size, 'pensize'],[Blockly.MIXLY_SPEED, 'speed']];
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('VAR')
        // .setCheck(String)
        .appendField(Blockly.blockpy_turtle_set)
        .appendField(new Blockly.FieldDropdown(size_speed), 'DIR')
        .appendField(Blockly.blockpy_turtle_set_num);

  this.setInputsInline(true);
   this.setPreviousStatement(true);
    this.setNextStatement(true);
  var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('DIR');
      var TOOLTIPS = {
        'pensize': Blockly.MIXLY_TOOLTIP_TURTEL_SIZE,
        'speed': Blockly.MIXLY_TOOLTIP_TURTEL_SPEED
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['turtle_size'] = {
  init: function() {
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('TUR')
        .setCheck('Turtle')
    this.appendValueInput('data')
        .setCheck(Number)
        .appendField(Blockly.blockpy_turtle_set_size);

    this.setTooltip(Blockly.MIXLY_TOOLTIP_TURTEL_SIZE);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks['turtle_speed'] = {
  init: function() {
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('TUR')
        .setCheck('Turtle')
    this.appendValueInput('data')
        .setCheck(Number)
        .appendField(Blockly.blockpy_turtle_set_speed);

    this.setTooltip(Blockly.MIXLY_TOOLTIP_TURTEL_SPEED);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['turtle_circle'] = {
    init: function() {
       this.appendValueInput('TUR')
          .setCheck('Turtle')
    var circle_dot =
          [[Blockly.blockpy_turtle_circle, 'circle'],[Blockly.blockpy_turtle_dot, 'dot']];
      this.setColour(Blockly.Blocks.turtle.HUE);
      this.appendValueInput('VAR')
          // .setCheck(String)
          .appendField(Blockly.blockpy_turtle_draw)
          .appendField(new Blockly.FieldDropdown(circle_dot), 'DIR')
          .appendField(Blockly.blockpy_turtle_radius);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      var thisBlock = this;
        this.setTooltip(function() {
          var mode = thisBlock.getFieldValue('DIR');
          var TOOLTIPS = {
            'circle': Blockly.MIXLY_TOOLTIP_TURTEL_CIRCLE,
            'dot': Blockly.MIXLY_TOOLTIP_TURTEL_DOT
          };
          return TOOLTIPS[mode];
        });
    }
};

Blockly.Blocks['turtle_circle_advanced'] = {
  init: function() {
     this.appendValueInput('TUR')
        .setCheck('Turtle')
      
      this.setColour(Blockly.Blocks.turtle.HUE);
      this.appendValueInput('VAR')
          // .setCheck(String)
          .appendField(Blockly.MIXLY_MIXPY_TURTLE_DRAW_CIRCLE)
          .appendField(Blockly.blockpy_turtle_radius);
      this.appendValueInput('data')
          .setCheck(Number)
          .appendField(Blockly.blockpy_turtle_angle);    

      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(Blockly.MIXLY_TOOLTIP_TURTEL_CIRCLE);
    }
};

Blockly.Blocks['turtle_visible'] = {
  init: function() {
     this.appendValueInput('TUR')
        .setCheck('Turtle')
  var visible =
        [[Blockly.blockpy_turtle_hide, 'hideturtle'],[Blockly.blockpy_turtle_show, 'showturtle']];
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(visible), 'DIR')
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('DIR');
      var TOOLTIPS = {
        'hideturtle': Blockly.MIXLY_TOOLTIP_TURTEL_HIDE,
        'showturtle': Blockly.MIXLY_TOOLTIP_TURTEL_SHOW
      };
      return TOOLTIPS[mode];
    });
  }
};


Blockly.Blocks['turtle_bgcolor'] = {
 init: function() {
    
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendDummyInput()
        .appendField(Blockly.blockpy_turtle_bgcolor)
        .appendField(new Blockly.FieldColour('#ff0000'), 'FIELDNAME');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['turtle_pencolor'] = {
 init: function() {
    this.appendValueInput('TUR')
        .setCheck('Turtle')
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendDummyInput()
        .appendField(Blockly.blockpy_turtle_pencolor)
        .appendField(new Blockly.FieldColour('#ff0000'), 'FIELDNAME');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['turtle_fillcolor'] = {
 init: function() {
    this.appendValueInput('TUR')
        .setCheck('Turtle')
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendDummyInput()
        .appendField(Blockly.blockpy_turtle_fillcolor)
        .appendField(new Blockly.FieldColour('#ff0000'), 'FIELDNAME');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['turtle_clone'] = {
  
  init: function() {
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('TUR')
        .setCheck('Turtle')
  this.appendDummyInput("")
        .appendField(Blockly.Msg.TURTLE_CLONE);
  this.setTooltip(Blockly.Msg.TURTLE_CLONE_TOOLTIP);
  this.setOutput(true);
  }
};

Blockly.Blocks['turtle_bgcolor_hex_new'] = {
 init: function() {
    
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('VAR')
        .setCheck(String)
        .appendField(Blockly.blockpy_turtle_bgcolor);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['turtle_pencolor_hex_new'] = {
 init: function() {
    this.appendValueInput('TUR')
        .setCheck('Turtle')
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('VAR')
        .setCheck(String)
        .appendField(Blockly.blockpy_turtle_pencolor);    
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['turtle_fillcolor_hex_new'] = {
 init: function() {
    this.appendValueInput('TUR')
        .setCheck('Turtle')
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('VAR')
        .setCheck(String)
        .appendField(Blockly.blockpy_turtle_fillcolor);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['turtle_color'] = {
 init: function() {
    this.appendValueInput('TUR')
        .setCheck('Turtle')
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendDummyInput()
        .appendField(Blockly.blockpy_turtle_pencolor)
        .appendField(new Blockly.FieldColour('#ff0000'), 'FIELDNAME');
    this.appendDummyInput()
        .appendField(Blockly.blockpy_turtle_fillcolor)
        .appendField(new Blockly.FieldColour('#ff0000'), 'FIELDNAME2');    
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['turtle_color_hex'] = {
 init: function() {
    this.appendValueInput('TUR')
        .setCheck('Turtle')
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('VAR1')
        .setCheck(String)
        .appendField(Blockly.blockpy_turtle_pencolor);
    this.appendValueInput('VAR2')
        .setCheck(String)
        .appendField(Blockly.blockpy_turtle_fillcolor);        
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['turtle_bgcolor_hex'] = {
 init: function() {
    
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('VAR')
        .setCheck(String)
        .appendField(Blockly.blockpy_turtle_bgcolor_hex);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['turtle_pencolor_hex'] = {
 init: function() {
    this.appendValueInput('TUR')
        .setCheck('Turtle')
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('VAR')
        .setCheck(String)
        .appendField(Blockly.blockpy_turtle_pencolor_hex);    
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['turtle_fillcolor_hex'] = {
 init: function() {
    this.appendValueInput('TUR')
        .setCheck('Turtle')
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('VAR')
        .setCheck(String)
        .appendField(Blockly.blockpy_turtle_fillcolor_hex);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['turtle_shape'] = {
  init: function() {
     this.appendValueInput('TUR')
        .setCheck('Turtle')
  var shape =
        [[Blockly.blockpy_turtle_shape_arrow, 'arrow'],[Blockly.blockpy_turtle_shape_turtle, 'turtle'],
        [Blockly.blockpy_turtle_shape_circle, 'circle'],[Blockly.blockpy_turtle_shape_square, 'square'],
        [Blockly.blockpy_turtle_shape_triangle, 'triangle'],[Blockly.blockpy_turtle_shape_classic, 'classic']];
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.blockpy_turtle_shape)
        .appendField(new Blockly.FieldDropdown(shape), 'DIR');
        
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.TURTLE_SHAPE_TOOLTIP);
  }
};

Blockly.Blocks['turtle_shapesize'] = {
  init: function() {
     this.appendValueInput('TUR')
        .setCheck('Turtle')
      
      this.setColour(Blockly.Blocks.turtle.HUE);
      this.appendDummyInput("")
          .appendField(Blockly.MIXLY_TURTEL_SHAPESIZE);
      this.appendValueInput('WID')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_TURTEL_SHAPESIZE_WID);    
      this.appendValueInput('LEN')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_TURTEL_SHAPESIZE_LEN);      
      this.appendValueInput('OUTLINE')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_TURTEL_SHAPESIZE_OUTLINE);       
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(Blockly.MIXLY_TOOLTIP_SHAPESIZE);
    }
};

Blockly.Blocks['turtle_numinput'] = {
 init: function() {
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MIXPY_TURTLE_NUMINPUT)
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('TITLE')
        .setCheck(String)
        .appendField(Blockly.MIXLY_MIXPY_TURTLE_TEXTINPUT_TITLE);
    this.appendValueInput('PROMPT')
        .setCheck(String)
        .appendField(Blockly.MIXLY_MIXPY_TURTLE_TEXTINPUT_PROMPT);
    this.appendValueInput('DEFAULT')
        .setCheck(Number)
        .appendField(Blockly.Msg.DICTS_DEFAULT_VALUE);
    this.appendValueInput('MIN')
        .setCheck(Number)
        .appendField(Blockly.Msg.MATH_ONLIST_OPERATOR_MIN);
    this.appendValueInput('MAX')
        .setCheck(Number)
        .appendField(Blockly.Msg.MATH_ONLIST_OPERATOR_MAX);                
    this.setInputsInline(true);
    this.setOutput(true,Number);
    this.setTooltip(Blockly.Msg.TURTLE_NUMINPUT_TOOLTIP);    
  }
};

Blockly.Blocks['turtle_textinput'] = {
 init: function() {
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MIXPY_TURTLE_TEXTINPUT)
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('TITLE')
        .setCheck(String)
        .appendField(Blockly.MIXLY_MIXPY_TURTLE_TEXTINPUT_TITLE);
    this.appendValueInput('PROMPT')
        .setCheck(String)
        .appendField(Blockly.MIXLY_MIXPY_TURTLE_TEXTINPUT_PROMPT);    
    this.setInputsInline(true);
    this.setOutput(true,String);
    this.setTooltip(Blockly.Msg.TURTLE_TEXTINPUT_TOOLTIP);    
  }
};

Blockly.Blocks['turtle_write'] = {
 init: function() {
    this.appendValueInput('TUR')
        .setCheck('Turtle')
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('VAR')
        .setCheck(String)
        .appendField(Blockly.blockpy_turtle_write);    
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.TURTLE_WRITE_TOOLTIP);    
  }
};

Blockly.Blocks['turtle_write_format'] = {
 init: function() {
    var move =
        [[Blockly.MIXLY_TURTLE_WRITE_MOVE_FALSE, 'False'],[Blockly.MIXLY_TURTLE_WRITE_MOVE_TRUE, 'True']];
    var align =
        [[Blockly.MIXLY_TURTLE_WRITE_ALIGN_LEFT, 'left'],[Blockly.MIXLY_TURTLE_WRITE_ALIGN_CENTER, 'center'],[Blockly.MIXLY_TURTLE_WRITE_ALIGN_RIGHT, 'right']];    
    var fonttype =
        [[Blockly.MIXLY_TURTLE_WRITE_FONT_TYPE_NORMAL, 'normal'],[Blockly.MIXLY_TURTLE_WRITE_FONT_TYPE_BOLD, 'bold'],[Blockly.MIXLY_TURTLE_WRITE_FONT_TYPE_ITALIC, 'italic'],[Blockly.MIXLY_TURTLE_WRITE_FONT_TYPE_BOLD_ITALIC, 'bold","italic']];
    this.appendValueInput('TUR')
        .setCheck('Turtle')
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('VAR')
        .setCheck(String)
        .appendField(Blockly.blockpy_turtle_write);  
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_TURTLE_WRITE_MOVE)
        .appendField(new Blockly.FieldDropdown(move), 'MOVE');
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_TURTLE_WRITE_ALIGN)
        .appendField(new Blockly.FieldDropdown(align), 'ALIGN');
    this.appendValueInput('FONTNAME')
        .setCheck(String)
        .appendField(Blockly.MIXLY_TURTLE_WRITE_FONT_NAME);
    this.appendValueInput('FONTNUM')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_TURTLE_WRITE_FONT_NUM);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_TURTLE_WRITE_FONT_TYPE)
        .appendField(new Blockly.FieldDropdown(fonttype), 'FONTTYPE');                      
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.TURTLE_WRITE_TOOLTIP);    
  }
};

Blockly.Blocks['turtle_write_format_skulpt'] = {
 init: function() {
    var move =
        [[Blockly.MIXLY_TURTLE_WRITE_MOVE_FALSE, 'False'],[Blockly.MIXLY_TURTLE_WRITE_MOVE_TRUE, 'True']];
    var align =
        [[Blockly.MIXLY_TURTLE_WRITE_ALIGN_LEFT, 'left'],[Blockly.MIXLY_TURTLE_WRITE_ALIGN_CENTER, 'center'],[Blockly.MIXLY_TURTLE_WRITE_ALIGN_RIGHT, 'right']];    
    var fonttype =
        [[Blockly.MIXLY_TURTLE_WRITE_FONT_TYPE_NORMAL, 'normal'],[Blockly.MIXLY_TURTLE_WRITE_FONT_TYPE_BOLD, 'bold'],[Blockly.MIXLY_TURTLE_WRITE_FONT_TYPE_ITALIC, 'italic']];
    this.appendValueInput('TUR')
        .setCheck('Turtle')
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('VAR')
        .setCheck(String)
        .appendField(Blockly.blockpy_turtle_write);  
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_TURTLE_WRITE_MOVE)
        .appendField(new Blockly.FieldDropdown(move), 'MOVE');
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_TURTLE_WRITE_ALIGN)
        .appendField(new Blockly.FieldDropdown(align), 'ALIGN');
    this.appendValueInput('FONTNAME')
        .setCheck(String)
        .appendField(Blockly.MIXLY_TURTLE_WRITE_FONT_NAME);
    this.appendValueInput('FONTNUM')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_TURTLE_WRITE_FONT_NUM);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_TURTLE_WRITE_FONT_TYPE)
        .appendField(new Blockly.FieldDropdown(fonttype), 'FONTTYPE');                      
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.TURTLE_WRITE_TOOLTIP);    
  }
};


Blockly.Blocks.turtle_color_seclet = {
  init: function() {
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(new Blockly.FieldColour("ff0000"), "COLOR");
    this.setInputsInline(true);
    this.setOutput(true, String);
}
};

Blockly.Blocks['turtle_getscreen'] = {
  init: function() {
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('TUR')
        .setCheck('Turtle')
  this.appendDummyInput("")
  
      .appendField(Blockly.MIXLY_TURTEL_GETSCREEN)
      .appendField(new Blockly.FieldTextInput('screen'), 'VAR')
                       
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  this.setTooltip(Blockly.MIXLY_TURTEL_GETSCREEN_TOOLTIP);
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

Blockly.Blocks.turtle_onkey = {
  init: function() {
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('TUR')
    this.appendValueInput('VAR')
        .appendField(Blockly.MIXLY_TURTEL_EVENT_ONKEY);
    this.appendValueInput('callback')
        .appendField(Blockly.MIXLY_PYTHON_CONTROLS_THREAD_USE)    
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TURTEL_EVENT_ONKEY_TOOLTIP);
  }
};

Blockly.Blocks.turtle_onclick = {
  init: function() {
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('TUR')
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_TURTEL_EVENT_ONCLICK);
    this.appendValueInput('callback')
        .appendField(Blockly.MIXLY_PYTHON_CONTROLS_THREAD_USE)    
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TURTEL_EVENT_ONCLICK_TOOLTIP);
  }
};

Blockly.Blocks.turtle_ontimer = {
  init: function() {
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('TUR')
    this.appendValueInput('VAR')
        .appendField(Blockly.MIXLY_TURTEL_EVENT_ONTIMER);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_mSecond);    
    this.appendValueInput('callback')
        .appendField(Blockly.MIXLY_PYTHON_CONTROLS_THREAD_USE)    
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TURTEL_EVENT_ONTIMER_TOOLTIP);
  }
};

Blockly.Blocks['turtle_listen'] = {
  init: function() {
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('TUR')
    this.appendDummyInput()
          .appendField(Blockly.MIXLY_TURTEL_SCREEN_LISTEN);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

 Blockly.Blocks['turtle_screen_savefig'] = {
   init: function() {
     this.setColour(Blockly.Blocks.turtle.HUE);
     this.appendValueInput('TUR')
     this.appendValueInput("FILE")
         .setCheck(String)
         .appendField(Blockly.mixpy_PL_SAVEFIG);
     this.setInputsInline(true);
     this.setPreviousStatement(true);
     this.setNextStatement(true);
     this.setOutput(false);
     this.setTooltip(Blockly.mixpy_TURTLE_SAVEFIG_TOOLTIP);
   }
 };