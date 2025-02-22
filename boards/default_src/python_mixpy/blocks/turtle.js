import * as Blockly from 'blockly/core';

const TURTLE_HUE = 180;

export const turtle_create = {
    init: function () {
        this.setColour(TURTLE_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_turtle_create)
            .appendField(new Blockly.FieldTextInput('tina'), 'VAR')
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.blockpy_turtle_create_TOOLTIP);
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

export const turtle_done = {
    init: function () {
        this.setColour(TURTLE_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_TURTLE_DONE);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const turtle_exitonclick = {
    init: function () {
        this.setColour(TURTLE_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_PYTHON_TURTLE_EXITONCLICK);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const turtle_move = {
    init: function () {
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        var front_back =
            [[Blockly.Msg.blockpy_forward, 'forward'], [Blockly.Msg.blockpy_backward, 'backward']];
        this.setColour(TURTLE_HUE);
        this.appendValueInput('VAR')
            // .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MOVE_BY)
            .appendField(new Blockly.FieldDropdown(front_back), 'DIR')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MOVE_BY_num);

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

export const turtle_rotate = {
    init: function () {
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        var front_back =
            [[Blockly.Msg.blockpy_left, 'left'], [Blockly.Msg.blockpy_right, 'right']];
        this.setColour(TURTLE_HUE);
        this.appendValueInput('VAR')
            // .setCheck(String)
            .appendField(Blockly.Msg.blockpy_turtle_rotate)
            .appendField(new Blockly.FieldDropdown(front_back), 'DIR')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_BY_ANGLE);

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('DIR');
            var TOOLTIPS = {
                'left': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_LEFT,
                'right': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_RIGHT
            };
            return TOOLTIPS[mode];
        });
    }
};

export const turtle_setheading = {
    init: function () {
        this.setColour(TURTLE_HUE);
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.Msg.blockpy_setheading);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_setheading_degree);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const turtle_screen_delay = {
    init: function () {
        this.setColour(TURTLE_HUE);
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_TURTLE_SCREEN_DELAY);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MILLIS);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_TURTEL_SCREEN_DELAY);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const turtle_goto = {
    init: function () {
        this.setColour(TURTLE_HUE);
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        this.appendValueInput('data')
            .setCheck(Number)

            .appendField(Blockly.Msg.blockpy_turtle_goto);
        this.appendValueInput('val')
            .setCheck(Number)
            .appendField(Blockly.Msg.blockpy_turtle_goto_y);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_turtle_goto_position);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const turtle_setxy = {
    init: function () {
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        var set_xy =
            [[Blockly.Msg.PYLAB_LABEL_X, 'x'], [Blockly.Msg.PYLAB_LABEL_Y, 'y']];
        this.setColour(TURTLE_HUE);
        this.appendValueInput('VAR')
            .appendField(new Blockly.FieldDropdown(set_xy), 'DIR')
            .appendField(Blockly.Msg.MIXLY_MIXPY_TURTLE_SETXY);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_MIXPY_TURTLE_SETXY_TOOLTIP);
    }
};

export const turtle_pos_shape = {

    init: function () {
        this.setColour(TURTLE_HUE);
        var pos_shape =
            [[Blockly.Msg.TURTLE_POS, 'pos'], [Blockly.Msg.TURTLE_SHAPE, 'shape'], [Blockly.Msg.TURTLE_HEADING, 'heading'], [Blockly.Msg.MIXLY_MIXPY_TURTLE_WIDTH, 'width'], [Blockly.Msg.MIXLY_TURTEL_GET_SHAPESIZE, 'shapesize'], [Blockly.Msg.MIXLY_SPEED, 'speed']];
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        this.appendDummyInput("")
            .appendField(Blockly.Msg.TURTLE_POS_SHAPE)
            .appendField(new Blockly.FieldDropdown(pos_shape), 'DIR')
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('DIR');
            var TOOLTIPS = {
                'pos': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_POS,
                'shape': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_SHAPE,
                'heading': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_HEADING,
                'width': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_WIDTH,
                'speed': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_GET_SPEED,
                'shapesize': Blockly.Msg.MIXLY_TURTEL_GET_SHAPESIZE_TOOLTIP
            };
            return TOOLTIPS[mode];
        });
        this.setOutput(true);
        this.setInputsInline(true);

    }
};


export const turtle_clear = {
    init: function () {
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        var clear_reset =
            [[Blockly.Msg.MIXLY_LCD_STAT_CLEAR, 'clear'], [Blockly.Msg.blockpy_turtle_reset, 'reset']
                , [Blockly.Msg.blockpy_turtle_home, 'home']];
        this.setColour(TURTLE_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(clear_reset), 'DIR')


        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('DIR');
            var TOOLTIPS = {
                'clear': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_CLEAR,
                'reset': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_RESET,
                'home': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_HOME
            };
            return TOOLTIPS[mode];
        });
    }
};

export const turtle_penup = {
    init: function () {
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        var penup_down =
            [[Blockly.Msg.blockpy_turtle_penup, 'penup'], [Blockly.Msg.blockpy_turtle_pendown, 'pendown']];
        this.setColour(TURTLE_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(penup_down), 'DIR')


        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('DIR');
            var TOOLTIPS = {
                'penup': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_PENUP,
                'pendown': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_PENDOWN
            };
            return TOOLTIPS[mode];
        });
    }
};

export const turtle_fill = {
    init: function () {
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        var fill =
            [[Blockly.Msg.blockpy_turtle_beginfill, 'begin'], [Blockly.Msg.blockpy_turtle_endfill, 'end']];
        this.setColour(TURTLE_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(fill), 'DIR')


        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('DIR');
            var TOOLTIPS = {
                'begin': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_BEGINFILL,
                'end': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_ENDFILL
            };
            return TOOLTIPS[mode];
        });
    }
};


export const turtle_size_speed = {
    init: function () {
        this.appendDummyInput("")
            .appendField(new Blockly.FieldTextInput('tina'), 'TUR')
        var size_speed =
            [[Blockly.Msg.blockpy_turtle_size, 'pensize'], [Blockly.Msg.MIXLY_SPEED, 'speed']];
        this.setColour(TURTLE_HUE);
        this.appendValueInput('VAR')
            // .setCheck(String)
            .appendField(Blockly.Msg.blockpy_turtle_set)
            .appendField(new Blockly.FieldDropdown(size_speed), 'DIR')
            .appendField(Blockly.Msg.blockpy_turtle_set_num);

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('DIR');
            var TOOLTIPS = {
                'pensize': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_SIZE,
                'speed': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_SPEED
            };
            return TOOLTIPS[mode];
        });
    }
};

export const turtle_size = {
    init: function () {
        this.setColour(TURTLE_HUE);
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.Msg.blockpy_turtle_set_size);

        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_TURTEL_SIZE);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};


export const turtle_speed = {
    init: function () {
        this.setColour(TURTLE_HUE);
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.Msg.blockpy_turtle_set_speed);

        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_TURTEL_SPEED);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const turtle_circle = {
    init: function () {
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        var circle_dot =
            [[Blockly.Msg.blockpy_turtle_circle, 'circle'], [Blockly.Msg.blockpy_turtle_dot, 'dot']];
        this.setColour(TURTLE_HUE);
        this.appendValueInput('VAR')
            // .setCheck(String)
            .appendField(Blockly.Msg.blockpy_turtle_draw)
            .appendField(new Blockly.FieldDropdown(circle_dot), 'DIR')
            .appendField(Blockly.Msg.blockpy_turtle_radius);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('DIR');
            var TOOLTIPS = {
                'circle': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_CIRCLE,
                'dot': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_DOT
            };
            return TOOLTIPS[mode];
        });
    }
};

export const turtle_circle_advanced = {
    init: function () {
        this.appendValueInput('TUR')
            .setCheck('Turtle')

        this.setColour(TURTLE_HUE);
        this.appendValueInput('VAR')
            // .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MIXPY_TURTLE_DRAW_CIRCLE)
            .appendField(Blockly.Msg.blockpy_turtle_radius);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.Msg.blockpy_turtle_angle);

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_TURTEL_CIRCLE);
    }
};

export const turtle_visible = {
    init: function () {
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        var visible =
            [[Blockly.Msg.blockpy_turtle_hide, 'hideturtle'], [Blockly.Msg.blockpy_turtle_show, 'showturtle']];
        this.setColour(TURTLE_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(visible), 'DIR')
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('DIR');
            var TOOLTIPS = {
                'hideturtle': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_HIDE,
                'showturtle': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_SHOW
            };
            return TOOLTIPS[mode];
        });
    }
};


export const turtle_bgcolor = {
    init: function () {

        this.setColour(TURTLE_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_turtle_bgcolor)
            .appendField(new Blockly.FieldColour('#ff0000'), 'FIELDNAME');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const turtle_pencolor = {
    init: function () {
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        this.setColour(TURTLE_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_turtle_pencolor)
            .appendField(new Blockly.FieldColour('#ff0000'), 'FIELDNAME');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const turtle_fillcolor = {
    init: function () {
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        this.setColour(TURTLE_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_turtle_fillcolor)
            .appendField(new Blockly.FieldColour('#ff0000'), 'FIELDNAME');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const turtle_clone = {

    init: function () {
        this.setColour(TURTLE_HUE);
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        this.appendDummyInput("")
            .appendField(Blockly.Msg.TURTLE_CLONE);
        this.setTooltip(Blockly.Msg.TURTLE_CLONE_TOOLTIP);
        this.setOutput(true);
    }
};

export const turtle_bgcolor_hex_new = {
    init: function () {

        this.setColour(TURTLE_HUE);
        this.appendValueInput('VAR')
            .setCheck(String)
            .appendField(Blockly.Msg.blockpy_turtle_bgcolor);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const turtle_pencolor_hex_new = {
    init: function () {
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        this.setColour(TURTLE_HUE);
        this.appendValueInput('VAR')
            .setCheck(String)
            .appendField(Blockly.Msg.blockpy_turtle_pencolor);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const turtle_fillcolor_hex_new = {
    init: function () {
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        this.setColour(TURTLE_HUE);
        this.appendValueInput('VAR')
            .setCheck(String)
            .appendField(Blockly.Msg.blockpy_turtle_fillcolor);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const turtle_color = {
    init: function () {
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        this.setColour(TURTLE_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_turtle_pencolor)
            .appendField(new Blockly.FieldColour('#ff0000'), 'FIELDNAME');
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_turtle_fillcolor)
            .appendField(new Blockly.FieldColour('#ff0000'), 'FIELDNAME2');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const turtle_color_hex = {
    init: function () {
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        this.setColour(TURTLE_HUE);
        this.appendValueInput('VAR1')
            .setCheck(String)
            .appendField(Blockly.Msg.blockpy_turtle_pencolor);
        this.appendValueInput('VAR2')
            .setCheck(String)
            .appendField(Blockly.Msg.blockpy_turtle_fillcolor);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const turtle_bgcolor_hex = {
    init: function () {

        this.setColour(TURTLE_HUE);
        this.appendValueInput('VAR')
            .setCheck(String)
            .appendField(Blockly.Msg.blockpy_turtle_bgcolor_hex);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const turtle_pencolor_hex = {
    init: function () {
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        this.setColour(TURTLE_HUE);
        this.appendValueInput('VAR')
            .setCheck(String)
            .appendField(Blockly.Msg.blockpy_turtle_pencolor_hex);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const turtle_fillcolor_hex = {
    init: function () {
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        this.setColour(TURTLE_HUE);
        this.appendValueInput('VAR')
            .setCheck(String)
            .appendField(Blockly.Msg.blockpy_turtle_fillcolor_hex);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const turtle_shape = {
    init: function () {
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        var shape = [
            [Blockly.Msg.blockpy_turtle_shape_arrow, 'arrow'], [Blockly.Msg.blockpy_turtle_shape_turtle, 'turtle'],
            [Blockly.Msg.blockpy_turtle_shape_circle, 'circle'], [Blockly.Msg.blockpy_turtle_shape_square, 'square'],
            [Blockly.Msg.blockpy_turtle_shape_triangle, 'triangle'], [Blockly.Msg.blockpy_turtle_shape_classic, 'classic']
        ];
        this.setColour(TURTLE_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_turtle_shape)
            .appendField(new Blockly.FieldDropdown(shape), 'DIR');

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.TURTLE_SHAPE_TOOLTIP);
    }
};

export const turtle_shapesize = {
    init: function () {
        this.appendValueInput('TUR')
            .setCheck('Turtle')

        this.setColour(TURTLE_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_TURTEL_SHAPESIZE);
        this.appendValueInput('WID')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_TURTEL_SHAPESIZE_WID);
        this.appendValueInput('LEN')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_TURTEL_SHAPESIZE_LEN);
        this.appendValueInput('OUTLINE')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_TURTEL_SHAPESIZE_OUTLINE);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_SHAPESIZE);
    }
};

export const turtle_numinput = {
    init: function () {
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MIXPY_TURTLE_NUMINPUT)
        this.setColour(TURTLE_HUE);
        this.appendValueInput('TITLE')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MIXPY_TURTLE_TEXTINPUT_TITLE);
        this.appendValueInput('PROMPT')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MIXPY_TURTLE_TEXTINPUT_PROMPT);
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
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.TURTLE_NUMINPUT_TOOLTIP);
    }
};

export const turtle_textinput = {
    init: function () {
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MIXPY_TURTLE_TEXTINPUT)
        this.setColour(TURTLE_HUE);
        this.appendValueInput('TITLE')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MIXPY_TURTLE_TEXTINPUT_TITLE);
        this.appendValueInput('PROMPT')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MIXPY_TURTLE_TEXTINPUT_PROMPT);
        this.setInputsInline(true);
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.TURTLE_TEXTINPUT_TOOLTIP);
    }
};

export const turtle_write = {
    init: function () {
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        this.setColour(TURTLE_HUE);
        this.appendValueInput('VAR')
            .setCheck(String)
            .appendField(Blockly.Msg.blockpy_turtle_write);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.TURTLE_WRITE_TOOLTIP);
    }
};

export const turtle_write_format = {
    init: function () {
        var move =
            [[Blockly.Msg.MIXLY_TURTLE_WRITE_MOVE_FALSE, 'False'], [Blockly.Msg.MIXLY_TURTLE_WRITE_MOVE_TRUE, 'True']];
        var align =
            [[Blockly.Msg.MIXLY_TURTLE_WRITE_ALIGN_LEFT, 'left'], [Blockly.Msg.MIXLY_TURTLE_WRITE_ALIGN_CENTER, 'center'], [Blockly.Msg.MIXLY_TURTLE_WRITE_ALIGN_RIGHT, 'right']];
        var fonttype =
            [[Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_TYPE_NORMAL, 'normal'], [Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_TYPE_BOLD, 'bold'], [Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_TYPE_ITALIC, 'italic'], [Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_TYPE_BOLD_ITALIC, 'bold","italic']];
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        this.setColour(TURTLE_HUE);
        this.appendValueInput('VAR')
            .setCheck(String)
            .appendField(Blockly.Msg.blockpy_turtle_write);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_TURTLE_WRITE_MOVE)
            .appendField(new Blockly.FieldDropdown(move), 'MOVE');
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_TURTLE_WRITE_ALIGN)
            .appendField(new Blockly.FieldDropdown(align), 'ALIGN');
        this.appendValueInput('FONTNAME')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_NAME);
        this.appendValueInput('FONTNUM')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_NUM);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_TYPE)
            .appendField(new Blockly.FieldDropdown(fonttype), 'FONTTYPE');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.TURTLE_WRITE_TOOLTIP);
    }
};

export const turtle_write_format_skulpt = {
    init: function () {
        var move =
            [[Blockly.Msg.MIXLY_TURTLE_WRITE_MOVE_FALSE, 'False'], [Blockly.Msg.MIXLY_TURTLE_WRITE_MOVE_TRUE, 'True']];
        var align =
            [[Blockly.Msg.MIXLY_TURTLE_WRITE_ALIGN_LEFT, 'left'], [Blockly.Msg.MIXLY_TURTLE_WRITE_ALIGN_CENTER, 'center'], [Blockly.Msg.MIXLY_TURTLE_WRITE_ALIGN_RIGHT, 'right']];
        var fonttype =
            [[Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_TYPE_NORMAL, 'normal'], [Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_TYPE_BOLD, 'bold'], [Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_TYPE_ITALIC, 'italic']];
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        this.setColour(TURTLE_HUE);
        this.appendValueInput('VAR')
            .setCheck(String)
            .appendField(Blockly.Msg.blockpy_turtle_write);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_TURTLE_WRITE_MOVE)
            .appendField(new Blockly.FieldDropdown(move), 'MOVE');
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_TURTLE_WRITE_ALIGN)
            .appendField(new Blockly.FieldDropdown(align), 'ALIGN');
        this.appendValueInput('FONTNAME')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_NAME);
        this.appendValueInput('FONTNUM')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_NUM);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_TYPE)
            .appendField(new Blockly.FieldDropdown(fonttype), 'FONTTYPE');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.TURTLE_WRITE_TOOLTIP);
    }
};


export const turtle_color_seclet = {
    init: function () {
        this.setColour(TURTLE_HUE);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldColour("ff0000"), "COLOR");
        this.setInputsInline(true);
        this.setOutput(true, String);
    }
};

export const turtle_getscreen = {
    init: function () {
        this.setColour(TURTLE_HUE);
        this.appendValueInput('TUR')
            .setCheck('Turtle')
        this.appendDummyInput("")

            .appendField(Blockly.Msg.MIXLY_TURTEL_GETSCREEN)
            .appendField(new Blockly.FieldTextInput('screen'), 'VAR')

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TURTEL_GETSCREEN_TOOLTIP);
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

export const turtle_onkey = {
    init: function () {
        this.setColour(TURTLE_HUE);
        this.appendValueInput('TUR')
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_TURTEL_EVENT_ONKEY);
        this.appendValueInput('callback')
            .appendField(Blockly.Msg.MIXLY_PYTHON_CONTROLS_THREAD_USE)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TURTEL_EVENT_ONKEY_TOOLTIP);
    }
};

export const turtle_onclick = {
    init: function () {
        this.setColour(TURTLE_HUE);
        this.appendValueInput('TUR')
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_TURTEL_EVENT_ONCLICK);
        this.appendValueInput('callback')
            .appendField(Blockly.Msg.MIXLY_PYTHON_CONTROLS_THREAD_USE)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TURTEL_EVENT_ONCLICK_TOOLTIP);
    }
};

export const turtle_ontimer = {
    init: function () {
        this.setColour(TURTLE_HUE);
        this.appendValueInput('TUR')
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_TURTEL_EVENT_ONTIMER);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_mSecond);
        this.appendValueInput('callback')
            .appendField(Blockly.Msg.MIXLY_PYTHON_CONTROLS_THREAD_USE)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TURTEL_EVENT_ONTIMER_TOOLTIP);
    }
};

export const turtle_listen = {
    init: function () {
        this.setColour(TURTLE_HUE);
        this.appendValueInput('TUR')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_TURTEL_SCREEN_LISTEN);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const turtle_screen_savefig = {
    init: function () {
        this.setColour(TURTLE_HUE);
        this.appendValueInput('TUR')
        this.appendValueInput("FILE")
            .setCheck(String)
            .appendField(Blockly.Msg.mixpy_PL_SAVEFIG);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setOutput(false);
        this.setTooltip(Blockly.Msg.mixpy_TURTLE_SAVEFIG_TOOLTIP);
    }
};