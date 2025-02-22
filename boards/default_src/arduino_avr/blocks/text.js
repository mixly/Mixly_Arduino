import * as Blockly from 'blockly/core';

const TEXTS_HUE = 160;

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
            var file = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAkBAMAAAB/KNeuAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURQAAAP///////////////////////////////+tNPsIAAAAIdFJOUwAe1q4KRGaFPS0VAQAAAKlJREFUGNNVkD0LwkAMhlNsnUvBH+DmKnXoeODgWgXBsaOj+AGuVfTys8318l7OTA/hTe7JEWmVNwekA/fAHfNSsVoxew0/mfkbeSvo6wkLSbx0tJH2XdPS/pClsfxs7TA5WOQNl5M9X3bMF8RlS608z+JhFOZNMowybftw4GDvjHmTsc84PJJ4iPbgWcZVxuEUMHXKvS2dZHVgxJHpV4qr4Brei+Oe/usHT1JfDpNGeM0AAAAASUVORK5CYII=";

        } else {
            var file = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAkBAMAAAB/KNeuAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURQAAAP///////////////////////////////+tNPsIAAAAIdFJOUwAe1q4KRGaFPS0VAQAAAKpJREFUGNNV0bEKAjEMBuActOd6KIKrg+h4cII3Cg6u5yA6Ot4DONxcUfPYJmnaxn/6KEmaUoD/LK+XxAUibhuhR85bvBLjQHR99DqXIL7ItTo0xdyQ3RrvjWlQZQyT8cnYjcXgbl2XzBmNe5kv4WUfar6kUc9o56N6nh4Zy1NrHZ8iuSN+lB5LCR0HnXIuy/hd7qymUs3bf7WajsNQrn9CHr7Jn+IOaUH4ATxJW2wDnL5kAAAAAElFTkSuQmCC";
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


export const text_to_number = {
    init: function () {
        var TO_INT_FLOAT = [
            [Blockly.Msg.MIXLY_TO_INT, 'toInt'],
            [Blockly.Msg.MIXLY_TO_FLOAT, 'toFloat']
        ];
        this.setColour(TEXTS_HUE);
        this.appendValueInput('VAR')
            .setCheck([String, Number])
            .appendField(new Blockly.FieldDropdown(TO_INT_FLOAT), 'TOWHAT');
        this.setOutput(true, Number);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('TOWHAT');
            var TOOLTIPS = {
                'toInt': Blockly.Msg.MIXLY_TOOLTIP_TEXT_TOINT,
                'toFloat': Blockly.Msg.MIXLY_TOOLTIP_TEXT_TOFLOAT
            };
            return TOOLTIPS[mode];
        });
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
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_TOASCII)
            .appendField("'")
            .appendField(new Blockly.FieldTextInput('', Blockly.FieldTextInput.char_validator), 'TEXT')
            .appendField("'");
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_TEXT_TOASCII);
    }
};

export const number_to_text = {
    init: function () {
        var TO_INT_FLOAT = [
            [Blockly.Msg.MATH_BIN, 'BIN'],
            [Blockly.Msg.MATH_OCT, 'OCT'],
            [Blockly.Msg.MATH_DEC, 'DEC'],
            [Blockly.Msg.MATH_HEX, 'HEX']
        ];
        this.setColour(TEXTS_HUE);
        this.appendValueInput('VAR')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_TOSTRING)
            .appendField(new Blockly.FieldDropdown(TO_INT_FLOAT), 'TOWHAT');
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_TEXT_TOTEXT);
    }
};

export const number_to_text_ = {
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendValueInput('VAR')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_TOSTRING);
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_TEXT_TOTEXT);
    }
};

export const text_length = {
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.MIXLY_LENGTH)
            .setCheck(String);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_TEXT_LENGTH);
    }
}

export const text_char_at = {
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendValueInput("VAR")
            .setCheck(String);
        this.appendValueInput("AT")
            .appendField(Blockly.Msg.TEXT_CHARAT)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.Msg.TEXT_CHARAT2);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        var self = this;
        this.setTooltip(function () {
            return Blockly.Msg.MIXLY_TOOLTIP_TEXT_FIND_CHAR_AT.replace('%1', Blockly.Arduino.valueToCode(self, 'VAR', Blockly.Arduino.ORDER_ATOMIC));
        });
    }
}

export const text_equals_starts_ends = {
    init: function () {
        var TEXT_DOWHAT = [
            [Blockly.Msg.MIXLY_EQUALS, 'equals'],
            [Blockly.Msg.MIXLY_STARTSWITH, 'startsWith'],
            [Blockly.Msg.MIXLY_ENDSWITH, 'endsWith']
        ];
        this.setColour(TEXTS_HUE);
        this.appendValueInput("STR1")
            .setCheck([String, Number]);
        this.appendValueInput("STR2")
            .appendField(new Blockly.FieldDropdown(TEXT_DOWHAT), 'DOWHAT')
            .setCheck([String, Number]);
        this.setOutput(true, [Boolean, Number]);
        this.setInputsInline(true);
        var self = this;
        this.setTooltip(function () {
            var op = self.getFieldValue('DOWHAT');
            var TOOLTIPS = {
                'equals': Blockly.Msg.MIXLY_EQUALS,
                'startsWith': Blockly.Msg.MIXLY_STARTSWITH,
                'endsWith': Blockly.Msg.MIXLY_ENDSWITH
            };
            return Blockly.Msg.MIXLY_TOOLTIP_TEXT_EQUALS_STARTS_ENDS.replace('%1', TOOLTIPS[op]).replace('%2', Blockly.Arduino.valueToCode(self, 'STR2', Blockly.Arduino.ORDER_ATOMIC));
        });
    }
}

export const text_compareTo = {
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendValueInput("STR1")
            .setCheck([String, Number]);
        this.appendValueInput("STR2")
            .appendField(Blockly.Msg.MIXLY_COMPARETO)
            .setCheck([String, Number]);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_COMPARETO_HELP);
    }
}
//小数获取有效位
export const decimal_places = {
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendValueInput("numeral")
            .setCheck(null)
            .appendField(Blockly.Msg.LANG_MATH_FLOAT);
        this.appendValueInput("decimal_places")
            .setCheck(null)
            .appendField(Blockly.Msg.TEXT_KEEP);
        this.appendDummyInput()
            .appendField(Blockly.Msg.TEXT_DECIMAL);
        this.setOutput(true, null);
        this.setTooltip(Blockly.Msg.DECIMAL_PLACES_HELP);
        this.setHelpUrl("");
    }
};
//截取字符串
export const substring = {
    init: function () {
        this.appendValueInput("name")
            .setCheck(null);
        this.appendValueInput("Start")
            .setCheck(null)
            .appendField(Blockly.Msg.LISTS_GET_INDEX_GET);
        this.appendValueInput("end")
            .setCheck(null)
            .appendField(Blockly.Msg.TEXT_TO);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LANG_MATH_STRING);
        this.setOutput(true, null);
        this.setColour(TEXTS_HUE);
        this.setTooltip(Blockly.Msg.SUBSTRING_HELP);
        this.setHelpUrl("");
    }
};
//字符串转化为大小写
export const letter_conversion = {
    init: function () {
        this.appendValueInput("String")
            .setCheck(null)
            .appendField(Blockly.Msg.STRING_VARIABLE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LETTERS_ARE_CONVERTED_TO)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.CAPITAL, ".toUpperCase()"], [Blockly.Msg.LOWER_CASE, ".toLowerCase()"]]), "type");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(TEXTS_HUE);
        this.setTooltip(Blockly.Msg.LETTER_CONVERSION_HELP);
        this.setHelpUrl("");
    }
};

//字符串变量替换
export const data_replacement = {
    init: function () {
        this.appendValueInput("String")
            .setCheck(null)
            .appendField(Blockly.Msg.STRING_VARIABLE);
        this.appendValueInput("source_data")
            .setCheck(null)
            .appendField(Blockly.Msg.LANG_MATH_STRING);
        this.appendValueInput("replace")
            .setCheck(null)
            .appendField(Blockly.Msg.REPLACE_WITH);
        this.appendDummyInput();
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(TEXTS_HUE);
        this.setTooltip(Blockly.Msg.DATA_REPLACEMENT_HELP);
        this.setHelpUrl("");
    }
};

//消除非可视字符
export const eliminate = {
    init: function () {
        this.appendValueInput("String")
            .setCheck(null)
            .appendField(Blockly.Msg.STRING_VARIABLE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ELIMINATE_NON_VISUAL_CHARACTERS);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(TEXTS_HUE);
        this.setTooltip(Blockly.Msg.ELIMINATE_HELP);
        this.setHelpUrl("");
    }
};

//检测是否以特定字符串开头或结尾
export const first_and_last = {
    init: function () {
        this.appendValueInput("String")
            .setCheck(null)
            .appendField(Blockly.Msg.LANG_MATH_STRING);
        this.appendValueInput("String1")
            .setCheck(null)
            .appendField(Blockly.Msg.AS_A_STRING);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.STARTSWITH, ".startsWith"], [Blockly.Msg.ENDSWITH, ".endsWith"]]), "type");
        this.setOutput(true, null);
        this.setColour(TEXTS_HUE);
        this.setTooltip(Blockly.Msg.FIRST_AND_LAST_HELP);
        this.setHelpUrl("");
    }
};

//数据类型转换
export const type_conversion = {
    init: function () {
        this.appendValueInput("variable")
            .setCheck(null)
            .appendField(Blockly.Msg.DATA_TYPE_CONVERSION)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LANG_MATH_STRING, "String"], [Blockly.Msg.LANG_MATH_CHAR, "char"], [Blockly.Msg.LANG_MATH_BYTE, "byte"], [Blockly.Msg.LANG_MATH_INT, "int"], [Blockly.Msg.LANG_MATH_LONG, "long"], [Blockly.Msg.LANG_MATH_FLOAT, "float"], [Blockly.Msg.LANG_MATH_WORD, "word"]]), "type");
        this.setOutput(true, null);
        this.setColour(TEXTS_HUE);
        this.setTooltip(Blockly.Msg.TYPE_CONVERSION_HELP);
        this.setHelpUrl("");
    }
};

export const create_with_item = {
    /**
     * Mutator bolck for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};

export const create_with_container = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.HTML_TEXT);
        this.appendStatementInput('STACK');
        this.setTooltip("");
        this.contextMenu = false;
    }
};

export const String_indexOf = {
    init: function () {
        this.appendValueInput("str1")
            .setCheck(null);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        this.appendValueInput("str2")
            .setCheck(null);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.SERIES_INDEX);
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(160);
        this.setTooltip();
        this.setHelpUrl("");
    }
};

export const text_join2 = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(TEXTS_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_TEXT_JOIN + Blockly.Msg.MIXLY_MICROBIT_TYPE_STRING);
        this.itemCount_ = 3;
        this.updateShape_();
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setMutator(new Blockly.icons.MutatorIcon(['create_with_item'], this));
        this.setTooltip("");
    },
    /**
     * Create XML to represent list inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
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
            workspace.newBlock('create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('create_with_item');
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
                .appendField("无需要连接的字符串");
        } else {
            for (var i = 0; i < this.itemCount_; i++) {
                var input = this.appendValueInput('ADD' + i);
                if (i > 0) {
                    input.setAlign(Blockly.inputs.Align.RIGHT)
                    input.appendField("+");
                }
            }
        }
    }
};

//Arduinojson数据解析
export const Arduinojson = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARDUINOJSON_STRING_PARSING);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldMultilineInput('const size_t capacity = JSON_ARRAY_SIZE(3) + 10;\nDynamicJsonBuffer jsonBuffer(capacity);\nconst char* json = "[\\"0\\",\\"74\\",\\"134\\"]";\nJsonArray& root = jsonBuffer.parseArray(json);\nconst char* root_0 = root[0]; // "0"\nconst char* root_1 = root[1]; // "74"\nconst char* root_2 = root[2]; // "134"'), 'VALUE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(120);
        this.setTooltip(Blockly.Msg.ARDUINOJSON_STRING_PARSING1);
        this.setHelpUrl("https://arduinojson.org/v5/assistant/");
    }
};

//字符串转长整数
export const String_to_Long_Integer = {
    init: function () {
        this.appendValueInput("data")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_TYPE_STRING + Blockly.Msg.A_TO_B + Blockly.Msg.LANG_MATH_LONG)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MATH_HEX, "16"], [Blockly.Msg.MATH_DEC, "10"], [Blockly.Msg.MATH_OCT, "8"], [Blockly.Msg.MATH_BIN, "2"], [Blockly.Msg.blynk_IOT_AUTO, "0"]]), "type");
        this.setOutput(true, null);
        this.setColour(TEXTS_HUE);
        this.setTooltip("");
        this.setHelpUrl("https://blog.csdn.net/lizhengze1117/article/details/103318662?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-10.base&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-10.base");
    }
};