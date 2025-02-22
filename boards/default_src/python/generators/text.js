import * as Blockly from 'blockly/core';

export const text = function (_, generator) {
    // Text value.
    //var code = 'String('+generator.quote_(this.getFieldValue('TEXT'))+')';
    var code = generator.quote_(this.getFieldValue('TEXT'));
    return [code, generator.ORDER_ATOMIC];
}

export const text_textarea = function (_, generator) {
    // Text value.
    //var code = 'String('+generator.quote_(this.getFieldValue('TEXT'))+')';
    var code = '"""' + (this.getFieldValue('VALUE')) + '"""';
    return [code, generator.ORDER_ATOMIC];
}

export const text_char = function (_, generator) {
    var code = '\'' + this.getFieldValue('TEXT') + '\'';
    return [code, generator.ORDER_ATOMIC];
}

export const text_join = function (_, generator) {
    // Text value.
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC);
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC);
    return [a + ' + ' + b, generator.ORDER_ADDITIVE];
}

export const ascii_to_char = function (_, generator) {
    var asciivalue = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '0'
    return ['chr(' + asciivalue + ')', generator.ORDER_ATOMIC];
}

export const char_to_ascii = function (_, generator) {
    var charvalue = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || 'a';
    return ['ord(' + charvalue + ')', generator.ORDER_ATOMIC];
}

export const number_to_text = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '0';
    return ['str(' + str + ')', generator.ORDER_ATOMIC];
}

export const text_length = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    return ['len(' + str + ')', generator.ORDER_ATOMIC];
}

export const text_char_at2 = function (a, generator) {
    var c = a.getFieldValue("WHERE") || "FROM_START",
        str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    switch (c) {
        case "FROM_START":
            a = generator.getAdjustedInt(a, "AT");
            return [str + "[" + a + "]", generator.ORDER_ATOMIC];
        case "FROM_END":
            a = generator.getAdjustedInt(a, "AT", 1, !0);
            return [str + "[" + a + "]", generator.ORDER_ATOMIC];
        case "RANDOM":
            generator.definitions_.import_random = "import random";
            return ["random.choice(" + str + ")", generator.ORDER_FUNCTION_CALL];
    }
    throw "Unhandled combination (lists_getIndex).";
}

export const text_char_at = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    var at = generator.valueToCode(this, 'AT', generator.ORDER_ATOMIC) || 0;
    return [str + "[" + at + "]", generator.ORDER_ATOMIC];
}

export const text_random_char = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    generator.definitions_.import_random = "import random";
    return ["random.choice(" + str + ")", generator.ORDER_FUNCTION_CALL];
}

export const text_equals_starts_ends = function (_, generator) {
    var str1 = (generator.valueToCode(this, 'STR1', generator.ORDER_ATOMIC) || '""');
    var str2 = (generator.valueToCode(this, 'STR2', generator.ORDER_ATOMIC) || '""');
    var dowhat = this.getFieldValue('DOWHAT');
    if (dowhat === '===')
        return [str1 + ' == ' + str2, generator.ORDER_ATOMIC];
    return [str1 + '.' + dowhat + '(' + str2 + ')', generator.ORDER_ATOMIC];
}

export const text_compare_to = function (_, generator) {
    var str1 = (generator.valueToCode(this, 'STR1', generator.ORDER_ATOMIC) || '""');
    var str2 = (generator.valueToCode(this, 'STR2', generator.ORDER_ATOMIC) || '""');
    return ['cmp(' + str1 + ',' + str2 + ')', generator.ORDER_ATOMIC];
}

export const text_substring2 = function (block, generator) {
    // Get sublist.
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    var where1 = block.getFieldValue('WHERE1');
    var where2 = block.getFieldValue('WHERE2');
    switch (where1) {
        case 'FROM_START':
            var at1 = generator.getAdjustedInt(block, 'AT1');
            if (at1 == '0') {
                at1 = '';
            }
            break;
        case 'FROM_END':
            var at1 = generator.getAdjustedInt(block, 'AT1', 0, true);
            break;
        case 'FIRST':
            var at1 = '0';
            break;
        default:
            throw 'Unhandled option (lists_getSublist)';
    }
    switch (where2) {
        case 'FROM_START':
            var at2 = generator.getAdjustedInt(block, 'AT2');
            break;
        case 'FROM_END':
            var at2 = generator.getAdjustedInt(block, 'AT2', 0, true);
            // Ensure that if the result calculated is 0 that sub-sequence will
            // include all elements as expected.
            if (!Blockly.isNumber(String(at2))) {
                generator.definitions_['import_sys'] = 'import sys';
                at2 += ' or sys.maxsize';
            } else if (at2 == '0') {
                at2 = '';
            }
            break;
        case 'LAST':
            var at2 = '-1';
            break;
        default:
            throw 'Unhandled option (lists_getSublist)';
    }
    var code = str + '[' + at1 + ' : ' + at2 + ']';
    return [code, generator.ORDER_ATOMIC];
}

export const text_substring = function (_, generator) {
    // Get sublist.
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    var at1 = generator.valueToCode(this, 'AT1', generator.ORDER_ATOMIC);
    var at2 = generator.valueToCode(this, 'AT2', generator.ORDER_ATOMIC);
    var code = str + '[' + at1 + ' : ' + at2 + ']';
    return [code, generator.ORDER_ATOMIC];
}

export const text_capital = function (_, generator) {
    var capital = this.getFieldValue('CAPITAL');
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    return ['' + str + '.' + capital + '()', generator.ORDER_ATOMIC];
}

export const text_center = function (_, generator) {
    var center = this.getFieldValue('CENTER');
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var width = generator.valueToCode(this, 'WID', generator.ORDER_ATOMIC);
    var symbol = generator.valueToCode(this, 'Symbol', generator.ORDER_ATOMIC);
    return ['' + str + '.' + center + '(' + width + ',' + symbol + ')', generator.ORDER_ATOMIC];
}

export const text_find = function (_, generator) {
    var sentence = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var str = generator.valueToCode(this, 'STR', generator.ORDER_ATOMIC);
    return ['' + sentence + '.find(' + str + ')', generator.ORDER_ATOMIC];
}

export const text_join_seq = function (_, generator) {
    var sentence = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var varName = generator.valueToCode(this, 'LIST', generator.ORDER_ASSIGNMENT) || '0';
    return [sentence + '.join(' + varName + ')', generator.ORDER_ATOMIC];
}

export const text_replace = function (_, generator) {
    var sentence = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var str1 = generator.valueToCode(this, 'STR1', generator.ORDER_ATOMIC);
    var str2 = generator.valueToCode(this, 'STR2', generator.ORDER_ATOMIC);
    return ['' + sentence + '.replace(' + str1 + ',' + str2 + ')', generator.ORDER_ATOMIC];
}

export const text_split = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    var argument = generator.valueToCode(this, 'VAL', generator.ORDER_ATOMIC) || '""';
    var code = str + ".split(" + argument + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const text_strip = function (_, generator) {
    var towhat = this.getFieldValue('TOWHAT');
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = str + "." + towhat + "()";
    return [code, generator.ORDER_ATOMIC];
}

export const text_format = function (_, generator) {
    // Create a list with any number of elements of any type.
    var s = this.getFieldValue('VAR');
    var code = new Array(this.itemCount_);
    var default_value = '0';
    for (var n = 0; n < this.itemCount_; n++) {

        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || default_value;
    }
    var code = s + '.format(' + code.join(', ') + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const text_format_noreturn = function (_, generator) {
    // Create a list with any number of elements of any type.
    var s = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = new Array(this.itemCount_);
    var default_value = '0';
    for (var n = 0; n < this.itemCount_; n++) {

        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || default_value;
    }
    var code = s + '.format(' + code.join(', ') + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const text_substring3 = text_substring
export const text_compareTo = text_compare_to
export const text_char_at3 = text_char_at

export const text_encode = function (_, generator) {
    var code = this.getFieldValue('DIR');
    var varName = this.getFieldValue('CODE')
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    return [str + '.' + code + '("' + varName + '")', generator.ORDER_ATOMIC];
}

export const text_eval = function (_, generator) {
    var codestr = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "eval" + '(' + codestr + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const os_system = function (_, generator) {
    generator.definitions_['import_os'] = 'import os';
    var codestr = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "os.system" + '(' + codestr + ')\n';
    return code;
}