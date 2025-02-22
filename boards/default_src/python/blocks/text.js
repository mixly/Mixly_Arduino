import * as Blockly from 'blockly/core';

const TEXTS_HUE = 160//'#9ec440'//160;

export const text = {
    /**
     * Block for text value.
     * @this Blockly.Block
     */
    init: function () {
        //this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
        this.setColour(TEXTS_HUE);
        this.appendDummyInput()
            .appendField(this.newQuote_(true))
            .appendField(new Blockly.FieldTextInput(''), 'TEXT')
            .appendField(this.newQuote_(false));
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.TEXT_TEXT_TOOLTIP);
    },
    /**
     * Create an image of an open or closed quote.
     * @param {boolean} open True if open quote, false if closed.
     * @return {!Blockly.FieldImage} The field image of the quote.
     * @private
     */
    newQuote_: function (open) {
        if (open == this.RTL) {
            var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
        } else {
            var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
        }
        return new Blockly.FieldImage(file, 12, 12, '"');
    }
};

export const text_textarea = {
    /**
     * Block for text value.
     * @this Blockly.Block
     */
    init: function () {
        //this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
        this.setColour(TEXTS_HUE);
        this.appendDummyInput()
            .appendField(this.newQuote_(true))
            .appendField(new Blockly.FieldMultilineInput('Hello\nMixly'), 'VALUE')
            // .appendField(new Blockly.FieldTextInput(''), 'TEXT')
            .appendField(this.newQuote_(false));
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.TEXT_LINES_TOOLTIP);
    },
    /**
     * Create an image of an open or closed quote.
     * @param {boolean} open True if open quote, false if closed.
     * @return {!Blockly.FieldImage} The field image of the quote.
     * @private
     */
    newQuote_: function (open) {
        if (open == this.RTL) {
            var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
        } else {
            var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
        }
        return new Blockly.FieldImage(file, 12, 12, '"');
    }
};

Blockly.FieldTextInput.char_validator = function (text) {
    if (text.length > 1) {
        if (text.charAt(0) === "\\") {
            var charAtOne = text.charAt(1);
            if (charAtOne === "0" ||
                charAtOne === "b" ||
                charAtOne === "f" ||
                charAtOne === "n" ||
                charAtOne === "r" ||
                charAtOne === "t" ||
                charAtOne === "\\" ||
                charAtOne === "'") {
                return String(text).substring(0, 2);
            } else if (charAtOne === "x" && text.charAt(2) === "0" && text.charAt(3) === "B") {
                return String(text).substring(0, 4);
            }
        }
    }
    return String(text).substring(0, 1);
};

export const text_char = {
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendDummyInput()
            .appendField(this.newQuote_(true))
            .appendField(new Blockly.FieldTextInput('', Blockly.FieldTextInput.char_validator), 'TEXT')
            .appendField(this.newQuote_(false));
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.TEXT_CHAR_TOOLTIP);
    },
    newQuote_: function (open) {
        if (open == true) {
            var file = '../../media/quote2.png';
        } else {
            var file = '../../media/quote3.png';
        }
        return new Blockly.FieldImage(file, 7, 12, '"');
    }
};


export const text_join = {
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendValueInput('A')
            .setCheck([String, Number]);
        this.appendValueInput('B')
            .setCheck([String, Number])
            .appendField(Blockly.Msg.MIXLY_TEXT_JOIN);
        this.setInputsInline(true);
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_TEXT_JOIN);
    }
};

export const ascii_to_char = {
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendValueInput('VAR')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_TOCHAR);
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_TEXT_TOCHAR);
    }
};

export const char_to_ascii = {
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendValueInput('VAR')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_TOASCII);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_TEXT_TOASCII);
    }
};

export const number_to_text = {
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_TOSTRING);
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.MIXLY_PYTHON_TOOLTIP_TOTEXT);
    }
};

export const text_length = {
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.MIXLY_LENGTH);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_TEXT_LENGTH);
    }
}



export const text_char_at2 = {
    init: function () {
        this.WHERE_OPTIONS = [
            [Blockly.Msg.LISTS_GET_INDEX_FROM_START, "FROM_START"],
            [Blockly.Msg.LISTS_GET_INDEX_FROM_END, "FROM_END"],
            [Blockly.Msg.TEXT_GET_INDEX_RANDOM + 1 + Blockly.Msg.TEXT_CHARAT2, "RANDOM"]
        ];
        this.setHelpUrl(Blockly.Msg.LISTS_GET_INDEX_HELPURL);
        this.setColour(TEXTS_HUE);
        this.appendValueInput("VAR")
            .setCheck(String)
        //    .appendField(Blockly.Msg.MIXLY_MICROBIT_TYPE_LIST)
        this.appendValueInput("AT")
            .setCheck(Number)
        this.appendDummyInput()
            //.appendField(Blockly.Msg.MIXLY_MID)
            .appendField(Blockly.Msg.LISTS_GET_INDEX_GET, "MODE");
        //            .appendField("", "SPACE");
        Blockly.Msg.LISTS_GET_INDEX_TAIL && this.appendDummyInput("TAIL").appendField(Blockly.Msg.LISTS_GET_INDEX_TAIL);
        // this.appendDummyInput().appendField(Blockly.Msg.MIXLY_DE);
        this.setInputsInline(!0);
        this.setOutput(!0);
        this.updateAt_(!0);
        var b = this;
        this.setTooltip(function () {
            var a = b.getFieldValue("MODE"),
                e = b.getFieldValue("WHERE"),
                d = "";
            switch (a + " " + e) {
                case "GET FROM_START":
                case "GET FROM_END":
                    d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_FROM;
                    break;
                case "GET RANDOM":
                    d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_RANDOM;
                    break;
                case "GET_REMOVE FROM_START":
                case "GET_REMOVE FROM_END":
                    d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM;
                    break;
                case "GET_REMOVE RANDOM":
                    d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM;
                    break;
            }
            if ("FROM_START" == e || "FROM_END" == e) d += "  " + Blockly.Msg.LISTS_INDEX_FROM_START_TOOLTIP.replace("%1", Blockly.Msg.ONE_BASED_INDEXING ? "#1" : "#0");
            return d
        })
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('WHERE');
            var TOOLTIPS = {
                'FROM_START': Blockly.Msg.LISTS_GET_INDEX_FROM_START,
                'FROM_END': Blockly.Msg.LISTS_GET_INDEX_FROM_END,
                'RANDOM': Blockly.Msg.TEXT_GET_INDEX_RANDOM
            };
            return Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + Blockly.Msg.MIXLY_MICROBIT_TYPE_STRING + TOOLTIPS[mode] + 'n' + Blockly.Msg.TEXT_CHARAT2;
        });
    },
    mutationToDom: function () {
        var a = document.createElement("mutation");
        a.setAttribute("statement", !this.outputConnection);
        var b = this.getInput("AT").type == Blockly.INPUT_VALUE;
        a.setAttribute("at", b);
        return a
    },
    domToMutation: function (a) {
        var b = "true" == a.getAttribute("statement");
        this.updateStatement_(b);
        a = "false" != a.getAttribute("at");
        this.updateAt_(a)
    },
    updateStatement_: function (a) {
        a != !this.outputConnection && (this.unplug(!0, !0), a ? (this.setOutput(!1), this.setPreviousStatement(!0), this.setNextStatement(!0)) : (this.setPreviousStatement(!1), this.setNextStatement(!1), this.setOutput(!0)))
    },
    updateAt_: function (a) {
        this.removeInput("AT");
        this.removeInput("ORDINAL", !0);
        a ? (this.appendValueInput("AT").setCheck(Number), Blockly.Msg.TEXT_CHARAT2 && this.appendDummyInput("ORDINAL").appendField(Blockly.Msg.TEXT_CHARAT2)) : this.appendDummyInput("AT");
        var b = new Blockly.FieldDropdown(this.WHERE_OPTIONS,
            function (b) {
                var e = "FROM_START" == b || "FROM_END" == b;
                if (e != a) {
                    var d = this.sourceBlock_;
                    d.updateAt_(e);
                    d.setFieldValue(b, "WHERE");
                    return null
                }
            });
        this.getInput("AT").appendField(b, "WHERE");
        Blockly.Msg.LISTS_GET_INDEX_TAIL && this.moveInputBefore("TAIL", null)
    }
};


export const text_char_at = {
    init: function () {
        this.setHelpUrl(Blockly.Msg.LISTS_GET_INDEX_HELPURL);
        this.setColour(TEXTS_HUE);
        this.appendValueInput("VAR")
            .setCheck(String);
        this.appendValueInput("AT")
            .setCheck(Number)
            .appendField(Blockly.Msg.LISTS_GET_INDEX_GET + " " + Blockly.Msg.LISTS_GET_INDEX_FROM_START);
        this.appendDummyInput()
            .appendField(Blockly.Msg.TEXT_CHARAT2);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + Blockly.Msg.MIXLY_MICROBIT_TYPE_STRING + Blockly.Msg.LISTS_GET_INDEX_FROM_START + 'n' + Blockly.Msg.TEXT_CHARAT2);
    }
}


export const text_random_char = {
    init: function () {
        this.setHelpUrl(Blockly.Msg.LISTS_GET_INDEX_HELPURL);
        this.setColour(TEXTS_HUE);
        this.appendValueInput("VAR")
            .setCheck(String);
        this.appendDummyInput()
            .appendField(Blockly.Msg.TEXT_RANDOM_CHAR);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.TEXT_RANDOM_CHAR_TOOLTIP);
    }
}


export const text_substring2 = {
    /**
     * Block for getting sublist.
     * @this Blockly.Block
     */
    init: function () {
        this['WHERE_OPTIONS_1'] = [
            [Blockly.Msg.LISTS_GET_INDEX_FROM_START, 'FROM_START'],
            [Blockly.Msg.LISTS_GET_INDEX_FROM_END, 'FROM_END'],
            [Blockly.Msg.LISTS_GET_SUBLIST_START_FIRST, 'FIRST']
        ];
        this['WHERE_OPTIONS_2'] = [
            [Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_START, 'FROM_START'],
            [Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_END, 'FROM_END'],
            [Blockly.Msg.LISTS_GET_SUBLIST_END_LAST, 'LAST']
        ];
        this.setHelpUrl(Blockly.Msg.LISTS_GET_SUBLIST_HELPURL);
        this.setColour(TEXTS_HUE);
        this.appendValueInput("VAR")
            .setCheck(String)
        //.appendField(Blockly.Msg.LISTS_GET_SUBLIST_TAIL)
        // if (Blockly.Msg.LISTS_GET_SUBLIST_TAIL) {
        //   this.appendDummyInput('TAIL')
        //       .appendField(Blockly.Msg.LISTS_GET_SUBLIST_TAIL);
        // }
        this.appendDummyInput('')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET);
        this.appendDummyInput('AT1');
        this.appendDummyInput('AT2');
        this.setInputsInline(true);
        this.setOutput(true, 'List');
        this.updateAt_(1, true);
        this.updateAt_(2, true);
        this.setTooltip(Blockly.Msg._GET_TEXT_SUBLIST_TOOLTIP);
    },
    /**
     * Create XML to represent whether there are 'AT' inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var isAt1 = this.getInput('AT1').type == Blockly.INPUT_VALUE;
        container.setAttribute('at1', isAt1);
        var isAt2 = this.getInput('AT2').type == Blockly.INPUT_VALUE;
        container.setAttribute('at2', isAt2);
        return container;
    },
    /**
     * Parse XML to restore the 'AT' inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        var isAt1 = (xmlElement.getAttribute('at1') == 'true');
        var isAt2 = (xmlElement.getAttribute('at2') == 'true');
        this.updateAt_(1, isAt1);
        this.updateAt_(2, isAt2);
    },
    /**
     * Create or delete an input for a numeric index.
     * This block has two such inputs, independant of each other.
     * @param {number} n Specify first or second input (1 or 2).
     * @param {boolean} isAt True if the input should exist.
     * @private
     * @this Blockly.Block
     */
    updateAt_: function (n, isAt) {
        // Create or delete an input for the numeric index.
        // Destroy old 'AT' and 'ORDINAL' inputs.
        this.removeInput('AT' + n);
        this.removeInput('ORDINAL' + n, true);
        // Create either a value 'AT' input or a dummy input.
        if (isAt) {
            this.appendValueInput('AT' + n).setCheck(Number);
            if (Blockly.Msg.TEXT_CHARAT2) {
                this.appendDummyInput('ORDINAL' + n)
                    .appendField(Blockly.Msg.TEXT_CHARAT2);
            }
        } else {
            this.appendDummyInput('AT' + n);
        }
        var menu = new Blockly.FieldDropdown(this['WHERE_OPTIONS_' + n],
            function (value) {
                var newAt = (value == 'FROM_START') || (value == 'FROM_END');
                // The 'isAt' variable is available due to this function being a
                // closure.
                if (newAt != isAt) {
                    var block = this.sourceBlock_;
                    block.updateAt_(n, newAt);
                    // This menu has been destroyed and replaced.
                    // Update the replacement.
                    block.setFieldValue(value, 'WHERE' + n);
                    return null;
                }
                return undefined;
            });
        this.getInput('AT' + n)
            .appendField(menu, 'WHERE' + n);
        if (n == 1) {
            this.moveInputBefore('AT1', 'AT2');
            if (this.getInput('ORDINAL1')) {
                this.moveInputBefore('ORDINAL1', 'AT2');
            }
        }
        // if (Blockly.Msg.LISTS_GET_SUBLIST_TAIL) {
        //   this.moveInputBefore('TAIL', null);
        // }
    }
};

export const text_substring = {
    /**
     * Block for getting sublist.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.LISTS_GET_SUBLIST_HELPURL);
        this.setColour(TEXTS_HUE);
        this.appendValueInput("VAR")
            .setCheck(String)
        this.appendValueInput('AT1')
            .appendField(Blockly.Msg.LISTS_GET_INDEX_GET + " " + Blockly.Msg.LISTS_GET_INDEX_FROM_START);
        this.appendValueInput('AT2')
            .appendField(Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_START);
        this.appendDummyInput()
            .appendField(Blockly.Msg.TEXT_CHARAT2);
        this.setInputsInline(true);
        this.setOutput(true, ['List', String]);
        this.setTooltip(Blockly.Msg._GET_TEXT_SUBLIST_TOOLTIP);
    }
}

export const text_equals_starts_ends = {
    init: function () {
        var TEXT_DOWHAT = [
            [Blockly.Msg.MIXLY_EQUALS, '==='],
            [Blockly.Msg.MIXLY_STARTSWITH, 'startswith'],
            [Blockly.Msg.MIXLY_ENDSWITH, 'endswith']
        ];
        this.setColour(TEXTS_HUE);
        this.appendValueInput("STR1")
            .setCheck(String);
        this.appendValueInput("STR2")
            .appendField(new Blockly.FieldDropdown(TEXT_DOWHAT), 'DOWHAT')
            .setCheck(String);
        this.setOutput(true, [Boolean, Number]);
        this.setInputsInline(true);
    }
}

export const text_compare_to = {
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendValueInput("STR1")
            .setCheck(String);
        this.appendValueInput("STR2")
            .appendField(Blockly.Msg.MIXLY_COMPARETO)
            .setCheck(String);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_COMPARETO_HELP);
    }
}

export const text_capital = {
    init: function () {
        var TEXT_CAPITAL = [
            [Blockly.Msg.TEXT_UPPER, 'upper'],
            [Blockly.Msg.TEXT_TITLE, 'title'],
            [Blockly.Msg.TEXT_CAPITALIZE, 'capitalize'],
            [Blockly.Msg.TEXT_SWAPCASE, 'swapcase'],
            [Blockly.Msg.TEXT_LOWER, 'lower']
        ];
        this.setColour(TEXTS_HUE);
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(new Blockly.FieldDropdown(TEXT_CAPITAL), 'CAPITAL')
            .setCheck(String);
        this.setOutput(true, String);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('CAPITAL');
            var TOOLTIPS = {
                'upper': Blockly.Msg.MIXLY_MIXPY_TEXT_UPPER_TOOLTIP,
                'title': Blockly.Msg.MIXLY_MIXPY_TEXT_TITLE_TOOLTIP,
                'swapcase': Blockly.Msg.MIXLY_MIXPY_TEXT_SWAPCASE_TOOLTIP,
                'capitalize': Blockly.Msg.MIXLY_MIXPY_TEXT_CAPITALIZE_TOOLTIP,
                'lower': Blockly.Msg.MIXLY_MIXPY_TEXT_LOWER_TOOLTIP
            };
            return TOOLTIPS[mode];
        });
    }
}

export const text_center = {
    init: function () {
        var TEXT_CENTER = [
            [Blockly.Msg.TEXT_LJUST, 'ljust'],
            [Blockly.Msg.TEXT_CENTER, 'center'],
            [Blockly.Msg.TEXT_RJUST, 'rjust']
        ];
        this.setColour(TEXTS_HUE);
        this.appendValueInput("VAR")
            .appendField(new Blockly.FieldDropdown(TEXT_CENTER), 'CENTER')
            .setCheck(String);
        this.appendValueInput("WID")
            .appendField(Blockly.Msg.MIXLY_WIDTH)
            .setCheck(Number);
        this.appendValueInput("Symbol")
            .appendField(Blockly.Msg.MIXLY_RECT_Fill)
            .setCheck(String);
        this.setInputsInline(true);
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.MIXLY_MIXPY_TEXT_CENTER_TOOLTIP);
    }
}

export const text_find = {
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .setCheck(String);
        this.appendValueInput("STR")
            .appendField(Blockly.Msg.MIXLY_MID + Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_CHARACTER)
            .setCheck(String);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_LIST_INDEX);
        this.setInputsInline(true);
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.MIXLY_MIXPY_TEXT_FIND_TOOLTIP);
    }
}

export const text_join_seq = {
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.MIXLY_PYTHON_TEXT_JOIN_SEQ_USE_STR)
            .setCheck(String);
        this.appendValueInput('LIST')
            .appendField(Blockly.Msg.MIXLY_PYTHON_TEXT_JOIN_SEQ_SEQ)
            .setCheck('List', 'Tuple', 'Set', 'Dict');
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_PYTHON_TEXT_JOIN_SEQ_GET_STR);
        this.setInputsInline(true);
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.MIXLY_PYTHON_TEXT_JOIN_SEQ_TOOLTIP);
    }
}

export const text_replace = {
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendValueInput("VAR")
            .setCheck(String);
        this.appendValueInput("STR1")
            .appendField(Blockly.Msg.MIXLY_MIXPY_REPLACE)
            .setCheck(String);
        this.appendValueInput("STR2")
            .appendField(Blockly.Msg.LISTS_SET_INDEX_INPUT_TO)
            .setCheck(String);
        this.setInputsInline(true);
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.MIXLY_MIXPY_TEXT_REPLACE_TOOLTIP);
    }
}

export const text_split = {
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendValueInput("VAR");
        this.appendValueInput("VAL")
            .appendField(Blockly.Msg.LIST_SPLIT_AS);
        this.appendDummyInput('')
            .appendField(Blockly.Msg.LIST_SPLIT);
        this.setOutput(true, "List");
        this.setTooltip(Blockly.Msg.MIXLY_MIXPY_TEXT_SPLIT_TOOLTIP);
        this.setInputsInline(true);
    }
}

export const text_strip = {
    init: function () {
        var STRIP =
            [[Blockly.Msg.TEXT_TRIM_BOTH, 'strip'], [Blockly.Msg.TEXT_TRIM_LEFT, 'lstrip'], [Blockly.Msg.TEXT_TRIM_RIGHT, 'rstrip']];
        this.setColour(TEXTS_HUE);
        this.appendValueInput('VAR')
        this.appendDummyInput('')
            .appendField(Blockly.Msg.TEXT_STRIM);
        this.appendDummyInput('')
            .appendField(new Blockly.FieldDropdown(STRIP), 'TOWHAT');
        this.appendDummyInput('')
            .appendField(Blockly.Msg.TEXT_BLANK);
        this.setOutput(true, String);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('TOWHAT');
            var TOOLTIPS = {
                'strip': Blockly.Msg.TEXT_TRIM_BOTH_TOOLTIP,
                'lstrip': Blockly.Msg.TEXT_TRIM_LEFT_TOOLTIP,
                'rstrip': Blockly.Msg.TEXT_TRIM_RIGHT_TOOLTIP
            };
            return TOOLTIPS[mode];
        });
    }
};

export const text_format = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_FORMAT)
        //don't need to specify the data type in Python
        // .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_NUMBER, 'Array<number>'], [Blockly.Msg.LANG_MATH_STRING, 'Array<string>'], [Blockly.Msg.LANG_MATH_BOOLEAN, 'Array<boolean>']]), 'TYPE')
        // .appendField(' ')
        this.appendDummyInput("")
            .appendField(new Blockly.FieldTextInput('str'), 'VAR');
        this.itemCount_ = 1;
        this.updateShape_();
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setInputsInline(true);
        this.setMutator(new Blockly.icons.MutatorIcon(['text_create_with_item'], this));
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_MIXPY_TEXT_FORMAT_TOOLTIP);
    },
    /**
     * Create XML to represent list inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock =
            workspace.newBlock('text_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('text_create_with_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        var i = 0;
        while (itemBlock) {
            connections[i] = itemBlock.valueConnection_;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
            i++;
        }
        this.itemCount_ = i;
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 0; i < this.itemCount_; i++) {
            if (connections[i]) {
                this.getInput('ADD' + i).connection.connect(connections[i]);
            }
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function () {
        // Delete everything.
        if (this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else {
            var i = 0;
            while (this.getInput('ADD' + i)) {
                this.removeInput('ADD' + i);
                i++;
            }
        }
        // Rebuild block.
        if (this.itemCount_ == 0) {
            this.appendDummyInput('EMPTY')
                .appendField();
        } else {
            for (var i = 0; i < this.itemCount_; i++) {
                var input = this.appendValueInput('ADD' + i);
                if (i == 0) {
                    input.appendField(Blockly.Msg.PROCEDURES_BEFORE_PARAMS);
                }
            }
        }
    },
    getVars: function () {
        if (this.getFieldValue('VAR') != null) {
            if ((this.getFieldValue('VAR').indexOf("'") == -1) && (this.getFieldValue('VAR').indexOf('"') == -1)) {
                return [this.getFieldValue('VAR')];
            }
            return [];
        }
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }

    }
};

export const text_create_with_container = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.TUPLE_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

export const text_create_with_item = {
    /**
     * Mutator bolck for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_SET_VARIABLES_NAME);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.TUPLE_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};

export const text_substring3 = text_substring
export const text_compareTo = text_compare_to
export const text_char_at3 = text_char_at

export const text_format_noreturn = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_FORMAT)
        //don't need to specify the data type in Python
        // .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_NUMBER, 'Array<number>'], [Blockly.Msg.LANG_MATH_STRING, 'Array<string>'], [Blockly.Msg.LANG_MATH_BOOLEAN, 'Array<boolean>']]), 'TYPE')
        // .appendField(' ')
        this.appendValueInput("VAR")
            .setCheck(String);
        this.itemCount_ = 1;
        this.updateShape_();
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setInputsInline(true);
        this.setMutator(new Blockly.icons.MutatorIcon(['text_create_with_item'], this));
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_MIXPY_TEXT_FORMAT_TOOLTIP);
    },
    /**
     * Create XML to represent list inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock =
            workspace.newBlock('text_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('text_create_with_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        var i = 0;
        while (itemBlock) {
            connections[i] = itemBlock.valueConnection_;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
            i++;
        }
        this.itemCount_ = i;
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 0; i < this.itemCount_; i++) {
            if (connections[i]) {
                this.getInput('ADD' + i).connection.connect(connections[i]);
            }
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function () {
        // Delete everything.
        if (this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else {
            var i = 0;
            while (this.getInput('ADD' + i)) {
                this.removeInput('ADD' + i);
                i++;
            }
        }
        // Rebuild block.
        if (this.itemCount_ == 0) {
            this.appendDummyInput('EMPTY')
                .appendField();
        } else {
            for (var i = 0; i < this.itemCount_; i++) {
                var input = this.appendValueInput('ADD' + i);
                if (i == 0) {
                    input.appendField(Blockly.Msg.PROCEDURES_BEFORE_PARAMS);
                }
            }
        }
    }
};



export const text_encode = {
    init: function () {
        this.setColour(TEXTS_HUE);
        var encode_decode =
            [[Blockly.Msg.MIXPY_TEXT_ENCODE, 'encode'], [Blockly.Msg.MIXPY_TEXT_DECODE, 'decode']];
        var code =
            [['ASCII', 'ASCII'], ['gb2312', 'gb2312'], ['gbk', 'gbk'], ['utf-8', 'utf-8'], ['utf-16', 'utf-16'], ['utf-32', 'utf-32']];
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(code), 'CODE')
            .appendField(' ')
        this.appendValueInput("VAR")
            .appendField(new Blockly.FieldDropdown(encode_decode), 'DIR')
            .appendField(Blockly.Msg.LANG_MATH_STRING);
        this.setOutput(true, String);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXPY_TEXT_ENCODE_DECODE_TOOLTIP);

    }
};


export const text_eval = {
    init: function () {

        this.setColour(TEXTS_HUE);
        this.appendValueInput('VAR')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_PYTHON_TEXT_EVAL);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_PYTHON_TEXT_EVAL_RESULT);
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_PYTHON_TEXT_EVAL_TOOLTIP);
    }
};

export const os_system = {
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendValueInput('VAR')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_PYTHON_OS_SYSTEM);
        this.setInputsInline(true);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_PYTHON_OS_SYSTEM_TOOLTIP);
    }
};