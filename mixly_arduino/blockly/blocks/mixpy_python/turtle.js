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

Blockly.Blocks['turtle_move'] = {
  init: function() {
     this.appendValueInput('TUR')
        .setCheck('Turtle')
  var front_back =
        [[Blockly.blockpy_forward, 'forward'],[Blockly.blockpy_backward, 'backward']];
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendValueInput('VAR')
        // .setCheck(String)
        .appendField(Blockly.blockpy_turtle_move)
        .appendField(new Blockly.FieldDropdown(front_back), 'DIR')
        .appendField(Blockly.blockpy_turtle_move_num);

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
        .appendField(Blockly.blockpy_turtle_rotate_num);

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


Blockly.Blocks['turtle_clear'] = {
  init: function() {
     this.appendValueInput('TUR')
        .setCheck('Turtle')
  var clear_reset =
        [[Blockly.blockpy_turtle_clear, 'clear'],[Blockly.blockpy_turtle_reset, 'reset']
        ,[Blockly.blockpy_turtle_home, 'home']];
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.blockpy_turtle_blank)
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
        .appendField(Blockly.blockpy_turtle_blank)
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
        .appendField(Blockly.blockpy_turtle_blank)
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
        [[Blockly.blockpy_turtle_size, 'pensize'],[Blockly.blockpy_turtle_speed, 'speed']];
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
    this.appendValueInput('data')
        .setCheck(Number)
        .appendField(Blockly.blockpy_turtle_angle);    

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

Blockly.Blocks['turtle_visible'] = {
  init: function() {
     this.appendValueInput('TUR')
        .setCheck('Turtle')
  var visible =
        [[Blockly.blockpy_turtle_hide, 'hideturtle'],[Blockly.blockpy_turtle_show, 'showturtle']];
    this.setColour(Blockly.Blocks.turtle.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.blockpy_turtle_blank)
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
  this.setOutput(true, Number);
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
