import * as Blockly from 'blockly/core';

const DATA_HUE = 170//'#5ec73d'//195;

export const series_create = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendDummyInput("")

            .appendField(Blockly.Msg.blockpy_series_create)
            .appendField(new Blockly.FieldTextInput('ser1'), 'VAR')
        this.appendValueInput('SER')
            .appendField(Blockly.Msg.blockpy_series_via)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.blockpy_series_create_TOOLTIP);
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

export const series_create_from_index = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendDummyInput("")

            .appendField(Blockly.Msg.blockpy_series_create)
            .appendField(new Blockly.FieldTextInput('ser1'), 'VAR')
        this.appendValueInput('SER')
            .appendField(Blockly.Msg.blockpy_series_via)
        this.appendValueInput('INDEX')
            .setCheck([String, 'List'])
            .appendField(Blockly.Msg.blockpy_series_set_index)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.blockpy_series_create_index_TOOLTIP);
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

export const dataframe_create = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendDummyInput("")

            .appendField(Blockly.Msg.blockpy_dataframe_create)
            .appendField(new Blockly.FieldTextInput('df1'), 'VAR')
        this.appendValueInput('SER')
            .appendField(Blockly.Msg.blockpy_series_via)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.blockpy_dataframe_create_TOOLTIP);
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

export const dataframe_create_from_one_index = {
    init: function () {
        this.setColour(DATA_HUE);
        var column_raw =
            [[Blockly.Msg.DATAFRAME_RAW, 'index'], [Blockly.Msg.DATAFRAME_COLUMN, 'columns']];
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_dataframe_create)
            .appendField(new Blockly.FieldTextInput('df1'), 'VAR')
        this.appendValueInput('SER')
            .appendField(Blockly.Msg.blockpy_series_via)
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(column_raw), 'COLUMN_RAW')
        this.appendValueInput('INDEX')
            .setCheck([String, 'List'])
            .appendField(Blockly.Msg.blockpy_series_set_index)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.blockpy_dataframe_create_index_TOOLTIP);
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

export const dataframe_create_from_index = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendDummyInput("")

            .appendField(Blockly.Msg.blockpy_dataframe_create)
            .appendField(new Blockly.FieldTextInput('df1'), 'VAR')
        this.appendValueInput('SER')
            .appendField(Blockly.Msg.blockpy_series_via)
        this.appendValueInput('INDEX_COLUMN')
            .setCheck([String, 'List'])
            .appendField(Blockly.Msg.blockpy_dataframe_set_index_column)
        this.appendValueInput('INDEX_RAW')
            .setCheck([String, 'List'])
            .appendField(Blockly.Msg.blockpy_dataframe_set_index_raw)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        //this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.blockpy_dataframe_create_index_TOOLTIP);
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



export const series_create_from_text = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendDummyInput("")

            .appendField(new Blockly.FieldTextInput('ser1'), 'VAR')

            .appendField(' = [')
            .appendField(new Blockly.FieldTextInput('1,2,3'), 'TEXT')
            .appendField(']');

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_SERIES_CREATE_FROM_TEXT);
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


export const series_index_value = {
    /**
     * Block for list length.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(DATA_HUE);
        var index_value =
            [[Blockly.Msg.SERIES_INDEX, 'index'], [Blockly.Msg.HTML_VALUE, 'value']];
        this.appendValueInput('SERIES')
            .setCheck('Series')
        this.appendDummyInput("")
            .appendField(Blockly.Msg.SERIES_INDEX_VALUE)
            .appendField(new Blockly.FieldDropdown(index_value), 'INDEX_VALUE')

        this.setOutput(true, 'List');
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('INDEX_VALUE');
            var TOOLTIPS = {
                'index': Blockly.Msg.SERIES_INDEX_TOOLTIP,
                'value': Blockly.Msg.HTML_VALUE_TOOLTIP
            };
            return TOOLTIPS[mode];
        });

    }
};

export const series_get_num = {
    init: function () {
        this.setColour(DATA_HUE);
        //this.setOutput(true, Number);
        this.setOutput(true);
        this.appendValueInput('SER')
            .setCheck('Series')
        this.appendValueInput('AT')
            .setCheck(Number)
            .appendField(Blockly.Msg.LANG_LISTS_GET_INDEX1);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.LANG_LISTS_GET_INDEX2);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.TUPLE_GET_INDEX_TOOLTIP);
    }
};


export const pl_plot_easy = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendValueInput('SER')
            .setCheck('Series')
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_MAKE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_PYLAB_PLOT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const pl_plot = {
    init: function () {
        this.setColour(DATA_HUE);
        var line_type = [
            [Blockly.Msg.blockpy_PYLAB_PLOT_LINE_SOLID, '-'], [Blockly.Msg.blockpy_PYLAB_PLOT_LINE_DOTTED, '--'],
            [Blockly.Msg.blockpy_PYLAB_PLOT_LINE_CHAIN, '-.'], [Blockly.Msg.blockpy_PYLAB_PLOT_LINE_POINT_DOTTED, ':'],
            [Blockly.Msg.MIXLY_MICROBIT_JS_INOUT_PULL_NONE, ""]];
        var color_type = [
            [Blockly.Msg.COLOUR_RGB_BLUE, 'b'], [Blockly.Msg.COLOUR_RGB_GREEN, 'g'],
            [Blockly.Msg.COLOUR_RGB_RED, 'r'], [Blockly.Msg.COLOUR_CYAN, 'c'],
            [Blockly.Msg.COLOUR_MAGENTA, 'm'], [Blockly.Msg.COLOUR_YELLOW, 'y'],
            [Blockly.Msg.COLOUR_BLACK, 'k'], [Blockly.Msg.COLOUR_WHITE, 'w']
        ];
        var dot_type = [
            [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_CIRCULAR, '.'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_PIXEL, ','], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_LARGE_DOT, 'o'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_DOWN, 'v'],
            [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_UP, '^'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_LEFT, '<'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_RIGHT, '>'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_UP, '1'],
            [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_DOWN, '2'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_LEFT, '3'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_RIGHT, '4'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_SQUARE, 's'],
            [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_PENTAGON, 'p'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_STAR, '*'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_HEXAGON_VERTICAL, 'h'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_HEXAGON_HORIZONTAL, 'H'],
            [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_PLUS, '+'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_CROSS, 'x'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_DIAMOND, 'D'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_DIAMOND_SMALL, 'd'],
            [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_VERTICAL, '|'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_HORIZONTAL, '_']
        ];

        this.appendValueInput('SER')
            .setCheck('Series')
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_MAKE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_PYLAB_PLOT);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_PYLAB_PLOT_DOT)
            .appendField(new Blockly.FieldDropdown(dot_type), 'DOT')
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_PYLAB_PLOT_LINE)
            .appendField(new Blockly.FieldDropdown(line_type), 'LINE')
        this.appendDummyInput("")
            .appendField(Blockly.Msg.HTML_COLOUR)
            .appendField(new Blockly.FieldDropdown(color_type), 'COLOR')
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const pl_show = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_PYLAB_SHOW);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const pl_axes = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.mixpy_PL_AXES);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};


export const pl_legend = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_PYLAB_LEGEND);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const pl_title = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_PYLAB_TITLE);
        this.appendValueInput('TITLE')
            .setCheck(String);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const pl_label = {
    init: function () {
        this.setColour(DATA_HUE);
        var xylabel =
            [[Blockly.Msg.PYLAB_LABEL_X, 'x'], [Blockly.Msg.PYLAB_LABEL_Y, 'y']];
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_PYLAB_SET_LABEL)
            .appendField(new Blockly.FieldDropdown(xylabel), 'DIR');
        this.appendValueInput('LABEL')
            .appendField(Blockly.Msg.blockpy_PYLAB_LABEL)
            .setCheck(String);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        // var thisBlock = this;
        // this.setTooltip(function() {
        //   var mode = thisBlock.getFieldValue('DIR');
        //   var TOOLTIPS = {
        //     'x': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_FORWARD,
        //     'y': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_BACKWARD
        //   };
        //   return TOOLTIPS[mode];
        // });
    }
};


export const array_create = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendValueInput('FROM')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_SPLITBYDOU)
            .appendField(Blockly.Msg.MIXPY_DATA_ARRAY_CREATE_FROM);
        this.appendValueInput('TO')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXPY_DATA_ARRAY_CREATE_TO);
        this.appendValueInput('STEP')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEP);
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_PYTHON_CONTROLS_RANGE_TOOLTIP);
    }
};

export const pl_plot_bar = {
    init: function () {
        this.setColour(DATA_HUE);
        var plot_bar =
            [[Blockly.Msg.mixpy_PYLAB_PLOT_BAR_PLOT, 'plot'], [Blockly.Msg.mixpy_PYLAB_PLOT_BAR_BAR, 'bar']];
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_DISPLAY_DRAW)
            .appendField(new Blockly.FieldDropdown(plot_bar), 'DIR');
        this.appendValueInput('A')
            .appendField(Blockly.Msg.mixpy_PYLAB_PLOT_X);
        this.appendValueInput('B')
            .appendField(Blockly.Msg.mixpy_PYLAB_PLOT_Y);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('DIR');
            var TOOLTIPS = {
                'plot': Blockly.Msg.mixpy_PYLAB_PLOT_XY_TOOLTIP,
                'bar': Blockly.Msg.mixpy_PYLAB_PLOT_BAR_EASY_TOOLTIP
            };
            return TOOLTIPS[mode];
        });
    }
};

export const pl_plot_scatter = {
    init: function () {
        this.setColour(DATA_HUE);
        var color_type = [
            [Blockly.Msg.COLOUR_RGB_BLUE, 'b'], [Blockly.Msg.COLOUR_RGB_GREEN, 'g'],
            [Blockly.Msg.COLOUR_RGB_RED, 'r'], [Blockly.Msg.COLOUR_CYAN, 'c'],
            [Blockly.Msg.COLOUR_MAGENTA, 'm'], [Blockly.Msg.COLOUR_YELLOW, 'y'],
            [Blockly.Msg.COLOUR_BLACK, 'k'], [Blockly.Msg.COLOUR_WHITE, 'w']
        ];
        var dot_type = [
            [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_CIRCULAR, '.'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_PIXEL, ','], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_LARGE_DOT, 'o'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_DOWN, 'v'],
            [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_UP, '^'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_LEFT, '<'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_RIGHT, '>'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_UP, '1'],
            [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_DOWN, '2'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_LEFT, '3'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_RIGHT, '4'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_SQUARE, 's'],
            [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_PENTAGON, 'p'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_STAR, '*'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_HEXAGON_VERTICAL, 'h'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_HEXAGON_HORIZONTAL, 'H'],
            [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_PLUS, '+'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_CROSS, 'x'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_DIAMOND, 'D'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_DIAMOND_SMALL, 'd'],
            [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_VERTICAL, '|'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_HORIZONTAL, '_']
        ];
        this.appendValueInput('A')
            .appendField(Blockly.Msg.mixpy_PYLAB_SCATTER)
            .appendField(Blockly.Msg.mixpy_PYLAB_PLOT_X);
        this.appendValueInput('B')
            .appendField(Blockly.Msg.mixpy_PYLAB_PLOT_Y);
        this.appendValueInput('S')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_NUMBER);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_PYLAB_PLOT_DOT)
            .appendField(new Blockly.FieldDropdown(dot_type), 'DOT');
        this.appendDummyInput("")
            .appendField(Blockly.Msg.HTML_COLOUR)
            .appendField(new Blockly.FieldDropdown(color_type), 'COLOR');
        this.appendValueInput('TAG')
            .setCheck(String)
            .appendField(Blockly.Msg.mixpy_PYLAB_TICKS_TAG);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    }
};

export const pl_plot_xy = {
    init: function () {
        this.setColour(DATA_HUE);
        var line_type = [
            [Blockly.Msg.blockpy_PYLAB_PLOT_LINE_SOLID, '-'], [Blockly.Msg.blockpy_PYLAB_PLOT_LINE_DOTTED, '--'],
            [Blockly.Msg.blockpy_PYLAB_PLOT_LINE_CHAIN, '-.'], [Blockly.Msg.blockpy_PYLAB_PLOT_LINE_POINT_DOTTED, ':']
            , [Blockly.Msg.MIXLY_MICROBIT_JS_INOUT_PULL_NONE, ""]];
        var color_type = [
            [Blockly.Msg.COLOUR_RGB_BLUE, 'b'], [Blockly.Msg.COLOUR_RGB_GREEN, 'g'],
            [Blockly.Msg.COLOUR_RGB_RED, 'r'], [Blockly.Msg.COLOUR_CYAN, 'c'],
            [Blockly.Msg.COLOUR_MAGENTA, 'm'], [Blockly.Msg.COLOUR_YELLOW, 'y'],
            [Blockly.Msg.COLOUR_BLACK, 'k'], [Blockly.Msg.COLOUR_WHITE, 'w']
        ];
        var dot_type = [
            [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_CIRCULAR, '.'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_PIXEL, ','], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_LARGE_DOT, 'o'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_DOWN, 'v'],
            [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_UP, '^'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_LEFT, '<'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_RIGHT, '>'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_UP, '1'],
            [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_DOWN, '2'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_LEFT, '3'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_RIGHT, '4'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_SQUARE, 's'],
            [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_PENTAGON, 'p'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_STAR, '*'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_HEXAGON_VERTICAL, 'h'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_HEXAGON_HORIZONTAL, 'H'],
            [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_PLUS, '+'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_CROSS, 'x'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_DIAMOND, 'D'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_DIAMOND_SMALL, 'd'],
            [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_VERTICAL, '|'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_HORIZONTAL, '_']
        ];
        this.appendValueInput('A')
            .appendField(Blockly.Msg.mixpy_PYLAB_PLOT_XY)
            .appendField(Blockly.Msg.mixpy_PYLAB_PLOT_X);
        this.appendValueInput('B')
            .appendField(Blockly.Msg.mixpy_PYLAB_PLOT_Y);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_PYLAB_PLOT_DOT)
            .appendField(new Blockly.FieldDropdown(dot_type), 'DOT')
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_PYLAB_PLOT_LINE)
            .appendField(new Blockly.FieldDropdown(line_type), 'LINE')
        this.appendDummyInput("")
            .appendField(Blockly.Msg.HTML_COLOUR)
            .appendField(new Blockly.FieldDropdown(color_type), 'COLOR')
        this.appendValueInput('TAG')
            .setCheck(String)
            .appendField(Blockly.Msg.mixpy_PYLAB_TICKS_TAG);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.mixpy_PYLAB_PLOT_XY_TOOLTIP);
    }
};

export const pl_bar = {
    init: function () {
        this.setColour(DATA_HUE);
        var align =
            [[Blockly.Msg.MIXLY_TURTLE_WRITE_ALIGN_CENTER, 'center'], [Blockly.Msg.AILGN_EDGE, 'edge']];
        this.appendValueInput('A')
            .appendField(Blockly.Msg.mixpy_PYLAB_BAR)
            .appendField(Blockly.Msg.mixpy_PYLAB_PLOT_X);
        this.appendValueInput('B')
            .appendField(Blockly.Msg.mixpy_PYLAB_PLOT_Y);
        this.appendValueInput('WIDTH')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_WIDTH);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.mixpy_PYLAB_BAR_ALIGN)
            .appendField(new Blockly.FieldDropdown(align), 'ALIGN')
        this.appendDummyInput()
            .appendField(Blockly.Msg.HTML_COLOUR)
            .appendField(new Blockly.FieldColour('#0000ff'), 'COLOR');
        this.appendValueInput('TAG')
            .setCheck(String)
            .appendField(Blockly.Msg.mixpy_PYLAB_TICKS_TAG);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.mixpy_PYLAB_PLOT_XY_TOOLTIP);
    }
};

export const pl_pie = {
    init: function () {
        this.setColour(DATA_HUE);
        var shadow =
            [[Blockly.Msg.mixpy_PL_PIE_SHADOW_N, 'False'], [Blockly.Msg.mixpy_PL_PIE_SHADOW_Y, 'True']];
        var autopct =
            [[Blockly.Msg.mixpy_PL_PIE_SHADOW_N, 'None'], [Blockly.Msg.mixpy_PYLAB_PIE_AUTOPCT_Z, '%.0f%%'], [Blockly.Msg.mixpy_PYLAB_PIE_AUTOPCT_O, '%.1f%%'], [Blockly.Msg.mixpy_PYLAB_PIE_AUTOPCT_T, '%.2f%%']];
        this.appendValueInput('A')
            .appendField(Blockly.Msg.mixpy_PYLAB_PIE)
            .appendField(Blockly.Msg.COLOUR_BLEND_RATIO);
        this.appendValueInput('B')
            .appendField(Blockly.Msg.mixpy_PYLAB_TICKS_TAG);
        this.appendValueInput('EXPLODE')
            .appendField(Blockly.Msg.mixpy_PYLAB_PIE_EXPLODE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.mixpy_PYLAB_PIE_AUTOPCT)
            .appendField(new Blockly.FieldDropdown(autopct), 'autopct')
        this.appendDummyInput("")
            .appendField(Blockly.Msg.mixpy_PYLAB_PIE_SHADOW)
            .appendField(new Blockly.FieldDropdown(shadow), 'SHADOW')
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.mixpy_PYLAB_PLOT_XY_TOOLTIP);
    }
};


export const pl_hist = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendValueInput('A')
            .appendField(Blockly.Msg.mixpy_PYLAB_HIST)
            .appendField(Blockly.Msg.MIXLY_SD_DATA);
        this.appendValueInput('B')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};


export const pl_ticks = {
    init: function () {
        this.setColour(DATA_HUE);
        var xylabel =
            [[Blockly.Msg.PYLAB_LABEL_X, 'x'], [Blockly.Msg.PYLAB_LABEL_Y, 'y']];
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETTING)
            .appendField(new Blockly.FieldDropdown(xylabel), 'DIR');
        this.appendValueInput('A')
            .appendField(Blockly.Msg.mixpy_PYLAB_TICKS)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_I2C_VALUE)
        this.appendValueInput('B')
            .appendField(Blockly.Msg.mixpy_PYLAB_TICKS_TAG);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.mixpy_PYLAB_TICKS_TOOLTIP);
    }
};


export const numpy_trig = {
    /**
     * Block for trigonometry operators.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS = [
            ['sin', 'sin'],
            ['cos', 'cos'],
            ['tan', 'tan'],
            ['arcsin', 'arcsin'],
            ['arccos', 'arccos'],
            ['arctan', 'arctan'],
            [Blockly.Msg.LANG_MATH_TO_ROUND, 'round'],
            [Blockly.Msg.LANG_MATH_TO_CEIL, 'ceil'],
            [Blockly.Msg.LANG_MATH_TO_FLOOR, 'floor']
        ];
        this.setColour(DATA_HUE);
        this.setOutput(true);
        this.setInputsInline(true);
        this.appendDummyInput()
            .appendField(Blockly.Msg.mixpy_NUMPY_TRIG)
        this.appendValueInput('NUM')
            .setCheck(Number)
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.setTooltip(Blockly.Msg.mixpy_NUMPY_TRIG_TOOLTIP);

    }
};

export const pl_subplot = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendValueInput('VET')
            .setCheck(Number)
            .appendField(Blockly.Msg.mixpy_SUBPLOT)
            .appendField(Blockly.Msg.mixpy_SUBPLOT_VERTICLE);
        this.appendValueInput('HOR')
            .setCheck(Number)
            .appendField(Blockly.Msg.mixpy_SUBPLOT_HORIZEN);
        this.appendValueInput('NUM')
            .setCheck(Number)
            .appendField(Blockly.Msg.mixpy_SUBPLOT_NUM);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_PYTHON_CONTROLS_RANGE_TOOLTIP);
    }
};

export const pandas_readcsv = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendValueInput("FILENAME")
            .appendField(Blockly.Msg.MIXPY_PANDAS_READ_CSV);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.mixpy_PANDAS_READCSV_HEADER_Y, '0'], [Blockly.Msg.mixpy_PANDAS_READCSV_HEADER_N, 'None']]), 'MODE');
        this.appendDummyInput()
            .appendField(Blockly.Msg.mixpy_PANDAS_READCSV_TITLE);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.mixpy_PANDAS_READCSV_TOOLTIP);
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

export const dataframe_get = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendValueInput('DICT')
            .setCheck('Dict')
        this.appendValueInput('KEY')
            .appendField(Blockly.Msg.mixpy_DATAFRAME_GET)
        this.appendDummyInput("")
            .appendField(Blockly.Msg.mixpy_DATAFRAME_GET_INDEX)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.DATAFRAME_COLUMN, 'column'], [Blockly.Msg.DATAFRAME_RAW, 'raw']]), 'MODE')

        this.setOutput(true);
        this.setTooltip(Blockly.Msg.mixpy_DATAFRAME_GET_TOOLTIP);
    }
};

export const pl_savefig = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendValueInput("FILE")
            .setCheck(String)
            .appendField(Blockly.Msg.mixpy_PL_SAVEFIG);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setOutput(false);
        this.setTooltip(Blockly.Msg.mixpy_PL_SAVEFIG_TOOLTIP);
    }
};

export const pl_text = {
    init: function () {
        this.setColour(DATA_HUE);
        var halign =
            [[Blockly.Msg.TEXT_TRIM_LEFT, 'right'], [Blockly.Msg.mixpy_PL_TEXT_CENTER, 'center'], [Blockly.Msg.TEXT_TRIM_RIGHT, 'left']];
        var valign =
            [[Blockly.Msg.mixpy_PL_TEXT_TOP, 'bottom'], [Blockly.Msg.mixpy_PL_TEXT_CENTER, 'center'], [Blockly.Msg.mixpy_PL_TEXT_BOTTOM, 'top']];
        this.appendValueInput('VET')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_SETTING)
            .appendField(Blockly.Msg.mixpy_PL_TEXT_X);
        this.appendValueInput('HOR')
            .setCheck(Number)
            .appendField(Blockly.Msg.mixpy_PL_TEXT_Y);
        this.appendValueInput('NUM')
            .setCheck(Number)
            .appendField(Blockly.Msg.mixpy_PL_TEXT_TAG);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.mixpy_PL_TEXT_HOR)
            .appendField(new Blockly.FieldDropdown(halign), 'HALIGN');
        this.appendDummyInput("")
            .appendField(Blockly.Msg.mixpy_PL_TEXT_VER)
            .appendField(new Blockly.FieldDropdown(valign), 'VALIGN');
        this.appendValueInput('FONTNUM')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_NUM);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.mixpy_PL_TEXT_TOOLTIP);
    }
};

export const array_toarray = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_TOARRAY);
        this.setOutput(true, 'List');
        this.setTooltip(Blockly.Msg.MIXLY_PYTHON_TOOLTIP_TOARRAY);
    }
};







export const plot_plot_easy = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendValueInput('SER')
            .setCheck('Series')
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_MAKE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_PYLAB_PLOT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const plot_plot = {//将XX绘制为折线图，删去尚不支持的点型
    init: function () {
        this.setColour(DATA_HUE);
        var line_type = [
            [Blockly.Msg.blockpy_PYLAB_PLOT_LINE_SOLID, '-'], [Blockly.Msg.blockpy_PYLAB_PLOT_LINE_DOTTED, '--'],
            [Blockly.Msg.blockpy_PYLAB_PLOT_LINE_CHAIN, '-.'], [Blockly.Msg.blockpy_PYLAB_PLOT_LINE_POINT_DOTTED, ':'],
            [Blockly.Msg.MIXLY_MICROBIT_JS_INOUT_PULL_NONE, ""]];
        var color_type = [
            [Blockly.Msg.COLOUR_RGB_BLUE, 'b'], [Blockly.Msg.COLOUR_RGB_GREEN, 'g'],
            [Blockly.Msg.COLOUR_RGB_RED, 'r'], [Blockly.Msg.COLOUR_CYAN, 'c'],
            [Blockly.Msg.COLOUR_MAGENTA, 'm'], [Blockly.Msg.COLOUR_YELLOW, 'y'],
            [Blockly.Msg.COLOUR_BLACK, 'k'], [Blockly.Msg.COLOUR_WHITE, 'w']
        ];
        var dot_type =
            [[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_CIRCULAR, '.'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_PIXEL, ','], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_LARGE_DOT, 'o']
                // [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_DOWN, 'v'],
                // [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_UP, '^'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_LEFT, '<'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_RIGHT, '>'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_UP, '1'],
                // [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_DOWN, '2'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_LEFT, '3'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_RIGHT, '4'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_SQUARE, 's'],
                // [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_PENTAGON, 'p'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_STAR, '*'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_HEXAGON_VERTICAL, 'h'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_HEXAGON_HORIZONTAL, 'H'],
                // [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_PLUS, '+'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_CROSS, 'x'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_DIAMOND, 'D'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_DIAMOND_SMALL, 'd'],
                // [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_VERTICAL, '|'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_HORIZONTAL, '_']
            ];

        this.appendValueInput('SER')
            .setCheck('Series')
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_MAKE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_PYLAB_PLOT);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_PYLAB_PLOT_DOT)
            .appendField(new Blockly.FieldDropdown(dot_type), 'DOT')
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_PYLAB_PLOT_LINE)
            .appendField(new Blockly.FieldDropdown(line_type), 'LINE')
        this.appendDummyInput("")
            .appendField(Blockly.Msg.HTML_COLOUR)
            .appendField(new Blockly.FieldDropdown(color_type), 'COLOR')
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const plot_show = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_PYLAB_SHOW);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const plot_axes = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.mixpy_PL_AXES);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};


export const plot_legend = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_PYLAB_LEGEND);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const plot_title = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_PYLAB_TITLE);
        this.appendValueInput('TITLE')
            .setCheck(String);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const plot_label = {
    init: function () {
        this.setColour(DATA_HUE);
        var xylabel =
            [[Blockly.Msg.PYLAB_LABEL_X, 'x'], [Blockly.Msg.PYLAB_LABEL_Y, 'y']];
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_PYLAB_SET_LABEL)
            .appendField(new Blockly.FieldDropdown(xylabel), 'DIR');
        this.appendValueInput('LABEL')
            .appendField(Blockly.Msg.blockpy_PYLAB_LABEL)
            .setCheck(String);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        // var thisBlock = this;
        // this.setTooltip(function() {
        //   var mode = thisBlock.getFieldValue('DIR');
        //   var TOOLTIPS = {
        //     'x': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_FORWARD,
        //     'y': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_BACKWARD
        //   };
        //   return TOOLTIPS[mode];
        // });
    }
};

export const plot_plot_bar = {
    init: function () {
        this.setColour(DATA_HUE);
        var plot_bar =
            [[Blockly.Msg.mixpy_PYLAB_PLOT_BAR_PLOT, 'plot'], [Blockly.Msg.mixpy_PYLAB_PLOT_BAR_BAR, 'bar']];
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_DISPLAY_DRAW)
            .appendField(new Blockly.FieldDropdown(plot_bar), 'DIR');
        this.appendValueInput('A')
            .appendField(Blockly.Msg.mixpy_PYLAB_PLOT_X);
        this.appendValueInput('B')
            .appendField(Blockly.Msg.mixpy_PYLAB_PLOT_Y);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('DIR');
            var TOOLTIPS = {
                'plot': Blockly.Msg.mixpy_PYLAB_PLOT_XY_TOOLTIP,
                'bar': Blockly.Msg.mixpy_PYLAB_PLOT_BAR_EASY_TOOLTIP
            };
            return TOOLTIPS[mode];
        });
    }
};

export const plot_plot_scatter = {//散点图，删去尚不支持的点型;修改了颜色的选择方式
    init: function () {
        this.setColour(DATA_HUE);
        var dot_type = [
            [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_CIRCULAR, '.'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_PIXEL, ','], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_LARGE_DOT, 'o']
            // [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_DOWN, 'v'],
            // [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_UP, '^'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_LEFT, '<'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_RIGHT, '>'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_UP, '1'],
            // [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_DOWN, '2'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_LEFT, '3'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_RIGHT, '4'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_SQUARE, 's'],
            // [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_PENTAGON, 'p'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_STAR, '*'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_HEXAGON_VERTICAL, 'h'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_HEXAGON_HORIZONTAL, 'H'],
            // [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_PLUS, '+'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_CROSS, 'x'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_DIAMOND, 'D'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_DIAMOND_SMALL, 'd'],
            // [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_VERTICAL, '|'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_HORIZONTAL, '_']
        ];
        this.appendValueInput('A')
            .appendField(Blockly.Msg.mixpy_PYLAB_SCATTER)
            .appendField(Blockly.Msg.mixpy_PYLAB_PLOT_X);
        this.appendValueInput('B')
            .appendField(Blockly.Msg.mixpy_PYLAB_PLOT_Y);
        this.appendValueInput('S')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_NUMBER);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_PYLAB_PLOT_DOT)
            .appendField(new Blockly.FieldDropdown(dot_type), 'DOT');
        // this.appendDummyInput("")
        //     .appendField(Blockly.Msg.HTML_COLOUR)
        //     .appendField(new Blockly.FieldDropdown(color_type), 'COLOR');
        this.appendDummyInput()
            .appendField(Blockly.Msg.HTML_COLOUR)
            .appendField(new Blockly.FieldColour('#0000ff'), 'COLOR');
        this.appendValueInput('TAG')
            .setCheck(String)
            .appendField(Blockly.Msg.mixpy_PYLAB_TICKS_TAG);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    }
};

export const plot_plot_xy = {//折线图，删去尚不支持的点型
    init: function () {
        this.setColour(DATA_HUE);
        var line_type = [
            [Blockly.Msg.blockpy_PYLAB_PLOT_LINE_SOLID, '-'], [Blockly.Msg.blockpy_PYLAB_PLOT_LINE_DOTTED, '--'],
            [Blockly.Msg.blockpy_PYLAB_PLOT_LINE_CHAIN, '-.'], [Blockly.Msg.blockpy_PYLAB_PLOT_LINE_POINT_DOTTED, ':'],
            [Blockly.Msg.MIXLY_MICROBIT_JS_INOUT_PULL_NONE, ""]];
        var color_type = [
            [Blockly.Msg.COLOUR_RGB_BLUE, 'b'], [Blockly.Msg.COLOUR_RGB_GREEN, 'g'],
            [Blockly.Msg.COLOUR_RGB_RED, 'r'], [Blockly.Msg.COLOUR_CYAN, 'c'],
            [Blockly.Msg.COLOUR_MAGENTA, 'm'], [Blockly.Msg.COLOUR_YELLOW, 'y'],
            [Blockly.Msg.COLOUR_BLACK, 'k'], [Blockly.Msg.COLOUR_WHITE, 'w']
        ];
        var dot_type =
            [[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_CIRCULAR, '.'], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_PIXEL, ','], [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_LARGE_DOT, 'o']
                // [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_DOWN, 'v'],
                // [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_UP, '^'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_LEFT, '<'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIANGLE_RIGHT, '>'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_UP, '1'],
                // [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_DOWN, '2'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_LEFT, '3'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_TRIMARKER_RIGHT, '4'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_SQUARE, 's'],
                // [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_PENTAGON, 'p'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_STAR, '*'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_HEXAGON_VERTICAL, 'h'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_HEXAGON_HORIZONTAL, 'H'],
                // [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_PLUS, '+'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_CROSS, 'x'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_DIAMOND, 'D'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_DIAMOND_SMALL, 'd'],
                // [Blockly.Msg.blockpy_PYLAB_PLOT_DOT_VERTICAL, '|'],[Blockly.Msg.blockpy_PYLAB_PLOT_DOT_HORIZONTAL, '_']
            ];
        this.appendValueInput('A')
            .appendField(Blockly.Msg.mixpy_PYLAB_PLOT_XY)
            .appendField(Blockly.Msg.mixpy_PYLAB_PLOT_X);
        this.appendValueInput('B')
            .appendField(Blockly.Msg.mixpy_PYLAB_PLOT_Y);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_PYLAB_PLOT_DOT)
            .appendField(new Blockly.FieldDropdown(dot_type), 'DOT')
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_PYLAB_PLOT_LINE)
            .appendField(new Blockly.FieldDropdown(line_type), 'LINE')
        this.appendDummyInput("")
            .appendField(Blockly.Msg.HTML_COLOUR)
            .appendField(new Blockly.FieldDropdown(color_type), 'COLOR')
        this.appendValueInput('TAG')
            .setCheck(String)
            .appendField(Blockly.Msg.mixpy_PYLAB_TICKS_TAG);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.mixpy_PYLAB_PLOT_XY_TOOLTIP);
    }
};

export const plot_bar = {
    init: function () {
        this.setColour(DATA_HUE);
        var align =
            [[Blockly.Msg.MIXLY_TURTLE_WRITE_ALIGN_CENTER, 'center'], [Blockly.Msg.AILGN_EDGE, 'edge']];
        this.appendValueInput('A')
            .appendField(Blockly.Msg.mixpy_PYLAB_BAR)
            .appendField(Blockly.Msg.mixpy_PYLAB_PLOT_X);
        this.appendValueInput('B')
            .appendField(Blockly.Msg.mixpy_PYLAB_PLOT_Y);
        this.appendValueInput('WIDTH')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_WIDTH);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.mixpy_PYLAB_BAR_ALIGN)
            .appendField(new Blockly.FieldDropdown(align), 'ALIGN')
        this.appendDummyInput()
            .appendField(Blockly.Msg.HTML_COLOUR)
            .appendField(new Blockly.FieldColour('#0000ff'), 'COLOR');
        this.appendValueInput('TAG')
            .setCheck(String)
            .appendField(Blockly.Msg.mixpy_PYLAB_TICKS_TAG);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.mixpy_PYLAB_PLOT_XY_TOOLTIP);
    }
};

export const plot_pie = {
    init: function () {
        this.setColour(DATA_HUE);
        var shadow =
            [[Blockly.Msg.mixpy_PL_PIE_SHADOW_N, 'False'], [Blockly.Msg.mixpy_PL_PIE_SHADOW_Y, 'True']];
        var autopct =
            [[Blockly.Msg.mixpy_PL_PIE_SHADOW_N, 'None'], [Blockly.Msg.mixpy_PYLAB_PIE_AUTOPCT_Z, '%.0f%%'], [Blockly.Msg.mixpy_PYLAB_PIE_AUTOPCT_O, '%.1f%%'], [Blockly.Msg.mixpy_PYLAB_PIE_AUTOPCT_T, '%.2f%%']];
        this.appendValueInput('A')
            .appendField(Blockly.Msg.mixpy_PYLAB_PIE)
            .appendField(Blockly.Msg.COLOUR_BLEND_RATIO);
        this.appendValueInput('B')
            .appendField(Blockly.Msg.mixpy_PYLAB_TICKS_TAG);
        this.appendValueInput('EXPLODE')
            .appendField(Blockly.Msg.mixpy_PYLAB_PIE_EXPLODE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.mixpy_PYLAB_PIE_AUTOPCT)
            .appendField(new Blockly.FieldDropdown(autopct), 'autopct')
        this.appendDummyInput("")
            .appendField(Blockly.Msg.mixpy_PYLAB_PIE_SHADOW)
            .appendField(new Blockly.FieldDropdown(shadow), 'SHADOW')
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.mixpy_PYLAB_PLOT_XY_TOOLTIP);
    }
};


export const plot_hist = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendValueInput('A')
            .appendField(Blockly.Msg.mixpy_PYLAB_HIST)
            .appendField(Blockly.Msg.MIXLY_SD_DATA);
        this.appendValueInput('B')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};


export const plot_ticks = {
    init: function () {
        this.setColour(DATA_HUE);
        var xylabel =
            [[Blockly.Msg.PYLAB_LABEL_X, 'x'], [Blockly.Msg.PYLAB_LABEL_Y, 'y']];
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETTING)
            .appendField(new Blockly.FieldDropdown(xylabel), 'DIR');
        this.appendValueInput('A')
            .appendField(Blockly.Msg.mixpy_PYLAB_TICKS)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_I2C_VALUE)
        this.appendValueInput('B')
            .appendField(Blockly.Msg.mixpy_PYLAB_TICKS_TAG);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.mixpy_PYLAB_TICKS_TOOLTIP);
    }
};

export const plot_subplot = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendValueInput('VET')
            .setCheck(Number)
            .appendField(Blockly.Msg.mixpy_SUBPLOT)
            .appendField(Blockly.Msg.mixpy_SUBPLOT_VERTICLE);
        this.appendValueInput('HOR')
            .setCheck(Number)
            .appendField(Blockly.Msg.mixpy_SUBPLOT_HORIZEN);
        this.appendValueInput('NUM')
            .setCheck(Number)
            .appendField(Blockly.Msg.mixpy_SUBPLOT_NUM);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_PYTHON_CONTROLS_RANGE_TOOLTIP);
    }
};

export const plot_savefig = {
    init: function () {
        this.setColour(DATA_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.mixpy_PL_SAVEFIG);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setOutput(false);
        this.setTooltip(Blockly.Msg.mixpy_PL_SAVEFIG_TOOLTIP);
    }
};

export const plot_text = {
    init: function () {
        this.setColour(DATA_HUE);
        var halign =
            [[Blockly.Msg.TEXT_TRIM_LEFT, 'right'], [Blockly.Msg.mixpy_PL_TEXT_CENTER, 'center'], [Blockly.Msg.TEXT_TRIM_RIGHT, 'left']];
        var valign =
            [[Blockly.Msg.mixpy_PL_TEXT_TOP, 'bottom'], [Blockly.Msg.mixpy_PL_TEXT_CENTER, 'center'], [Blockly.Msg.mixpy_PL_TEXT_BOTTOM, 'top']];
        this.appendValueInput('VET')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_SETTING)
            .appendField(Blockly.Msg.mixpy_PL_TEXT_X);
        this.appendValueInput('HOR')
            .setCheck(Number)
            .appendField(Blockly.Msg.mixpy_PL_TEXT_Y);
        this.appendValueInput('NUM')
            .setCheck(Number)
            .appendField(Blockly.Msg.mixpy_PL_TEXT_TAG);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.mixpy_PL_TEXT_HOR)
            .appendField(new Blockly.FieldDropdown(halign), 'HALIGN');
        this.appendDummyInput("")
            .appendField(Blockly.Msg.mixpy_PL_TEXT_VER)
            .appendField(new Blockly.FieldDropdown(valign), 'VALIGN');
        this.appendValueInput('FONTNUM')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_NUM);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.mixpy_PL_TEXT_TOOLTIP);
    }
};