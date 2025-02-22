import * as Blockly from 'blockly/core';

export const lists_get_sublist = function (_, generator) {
    // Get sublist.
    var list = generator.valueToCode(this, 'LIST', generator.ORDER_ADDITIVE) || 'mylist';
    var at1 = generator.valueToCode(this, 'AT1', generator.ORDER_ADDITIVE);
    var at2 = generator.valueToCode(this, 'AT2', generator.ORDER_ADDITIVE);
    var code = list + '[' + at1 + ' : ' + at2 + ']';
    return [code, generator.ORDER_ATOMIC];
}

export const lists_2d_get_data_with_col_row = function (_, generator) {
    var value_LIST = generator.valueToCode(this, 'LIST', generator.ORDER_ATOMIC) || 'mylist';
    var value_row = generator.valueToCode(this, 'row', generator.ORDER_ATOMIC) || 0;
    var value_col = generator.valueToCode(this, 'col', generator.ORDER_ATOMIC) || 0;
    var code = value_LIST + '[' + value_row + ',' + value_col + ']';
    return [code, generator.ORDER_ATOMIC];
}

export const lists_2d_get_col_row_data = function (_, generator) {
    var value_LIST = generator.valueToCode(this, 'LIST', generator.ORDER_ATOMIC) || 'mylist';
    var value_row_start = generator.valueToCode(this, 'row_start', generator.ORDER_ATOMIC) || 0;
    var value_row_end = generator.valueToCode(this, 'row_end', generator.ORDER_ATOMIC) || 1;
    var value_col_start = generator.valueToCode(this, 'col_start', generator.ORDER_ATOMIC) || 0;
    var value_col_end = generator.valueToCode(this, 'col_end', generator.ORDER_ATOMIC) || 1;
    var code = value_LIST + '[' + value_row_start + ' : ' + value_row_end + ',' + value_col_start + ' : ' + value_col_end + ']';
    return [code, generator.ORDER_ATOMIC];
}

export const lists_create_with = function (_, generator) {
    // Create a list with any number of elements of any type.
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    //var size=window.parseFloat(this.getFieldValue('SIZE'));
    var code = new Array(this.itemCount_);
    var default_value = '0';
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || default_value;
    }
    //generator.setups_['var_declare'+varName] = varName+' = '+ '[' + code.join(', ') + ']\n';
    var code = varName + ' = ' + '[' + code.join(', ') + ']\n';
    return code;
}

export const lists_create_with_text = function (_, generator) {
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    //var size=window.parseFloat(this.getFieldValue('SIZE'));
    var text = this.getFieldValue('TEXT');
    // generator.setups_['var_declare'+varName] = varName+' = '+ '[' + text + ']\n';
    var code = varName + ' = ' + '[' + text + ']\n';
    return code;
}

export const lists_get_index = function (_, generator) {
    // Indexing into a list is the same as indexing into a string.
    var list = generator.valueToCode(this, 'LIST', generator.ORDER_ADDITIVE) || 'mylist';
    var argument0 = generator.valueToCode(this, 'AT', generator.ORDER_ADDITIVE) || 0;
    var code = list + '[' + argument0 + ']';
    return [code, generator.ORDER_ATOMIC];
}

export const lists_set_index = function (_, generator) {
    // Set element at index.
    var varName = generator.valueToCode(this, 'LIST', generator.ORDER_ADDITIVE) || 'mylist';
    var argument0 = generator.valueToCode(this, 'AT',
        generator.ORDER_ADDITIVE) || '0';
    var argument2 = generator.valueToCode(this, 'TO',
        generator.ORDER_ASSIGNMENT) || '0';
    // Blockly uses one-based indicies.
    return varName + '[' + argument0 + '] = ' + argument2 + '\n';
}

export const lists_append_extend = function (_, generator) {
    var varName = generator.valueToCode(this, 'LIST', generator.ORDER_ASSIGNMENT) || '0';
    var argument = generator.valueToCode(this, 'DATA', generator.ORDER_ASSIGNMENT) || '0';
    var op = this.getFieldValue('OP');
    var code = varName + '.' + op + '(' + argument + ')\n';
    return code;
}

export const lists_get_random_item = function (_, generator) {
    generator.definitions_['import_random'] = 'import random';
    var varName = generator.valueToCode(this, 'LIST', generator.ORDER_ADDITIVE) || 'mylist';
    var code = 'random.choice(' + varName + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const lists_get_random_sublist = function (_, generator) {
    generator.definitions_['import_random'] = 'import random';
    var varName = generator.valueToCode(this, 'LIST', generator.ORDER_ADDITIVE) || 'mylist';
    var VALUE = generator.valueToCode(this, 'VAR', generator.ORDER_ASSIGNMENT) || '0';
    var code = 'random.sample(' + varName + ',' + VALUE + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const lists_insert_value = function (_, generator) {
    var varName = generator.valueToCode(this, 'LIST', generator.ORDER_ASSIGNMENT) || '0';
    var at = generator.valueToCode(this, 'AT', generator.ORDER_ADDITIVE) || '0';
    var VALUE = generator.valueToCode(this, 'VALUE', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.insert(' + at + ', ' + VALUE + ')\n';
    return code;
}

export const lists_reverse = function (_, generator) {
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.reverse()\n';
    return code;
}
export const lists_clear = function (_, generator) {
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.clear()\n';
    return code;
}

export const lists_find = function (_, generator) {
    var op = this.getFieldValue('OP');
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ASSIGNMENT) || '0';
    var argument = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT) || '0';
    if (op == 'INDEX')
        var code = varName + '.index(' + argument + ')';
    else if (op == 'COUNT')
        var code = varName + '.count(' + argument + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const lists_remove_at = function (_, generator) {
    var varName = generator.valueToCode(this, 'LIST', generator.ORDER_ASSIGNMENT) || '0';
    var argument = generator.valueToCode(this, 'DATA', generator.ORDER_ASSIGNMENT) || '0';
    var op = this.getFieldValue('OP');
    var code = "";
    if (op == "del") {
        code = 'del ' + varName + '[' + argument + ']\n';
    } else {
        code = varName + '.remove' + '(' + argument + ')\n';
    }
    return code;
}

export const lists_pop = function (_, generator) {
    var varName = generator.valueToCode(this, 'LIST', generator.ORDER_ADDITIVE) || 'mylist';
    var argument = generator.valueToCode(this, 'VALUE', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.pop(' + argument + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const list_trig = function (a, generator) {
    var b = a.getFieldValue("OP"), c;
    generator.definitions_['import_math'] = "import math";
    a = generator.valueToCode(a, 'data', generator.ORDER_NONE)
    switch (b) {
        case "LEN":
            c = "len(" + a + ")";
            break;
        case "SUM":
            c = "sum(" + a + ")";
            break;
        case "MIN":
            c = "min(" + a + ")";
            break;
        case "MAX":
            c = "max(" + a + ")";
            break;
        case 'AVERAGE':
            generator.definitions_['import_mixpy_math_mean'] = "from mixpy import math_mean";
            c = 'math_mean(' + a + ')';
            break;
        case 'MEDIAN':
            generator.definitions_['import_mixpy_math_median'] = "from mixpy import math_median";
            c = 'math_median(' + a + ')';
            break;
        case 'MODE':
            generator.definitions_['import_mixpy_math_modes'] = "from mixpy import math_modes";
            c = 'math_modes(' + a + ')';
            break;
        case 'STD_DEV':
            generator.definitions_['import_mixpy_math_standard_deviation'] = "from mixpy import math_standard_deviation";
            c = 'math_standard_deviation(' + a + ')';
            break;
        default:
            throw 'Unknown operator: ' + b;
    }
    if (c)
        return [c, generator.ORDER_ATOMIC];

}

export const lists_sort = function (block, generator) {
    // Block for sorting a list.
    generator.definitions_['import_mixpy_lists_sort'] = "from mixpy import lists_sort";
    var list = (generator.valueToCode(block, 'LIST',
        generator.ORDER_NONE) || '[]');
    var type = block.getFieldValue('TYPE');
    var reverse = block.getFieldValue('DIRECTION') === '1' ? 'False' : 'True';
    var code = 'lists_sort(' + list + ', "' + type + '", ' + reverse + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const lists_change_to = function (_, generator) {
    var op = this.getFieldValue('OP');
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ASSIGNMENT) || '0';
    var code = '';
    if (op == 'array') {
        generator.definitions_['import_numpy'] = 'import numpy';
        code = 'numpy.array(' + varName + ')';
    }
    else {
        code = op + '(' + varName + ')';
    }
    return [code, generator.ORDER_ATOMIC];
}

export const list_many_input = function (_, generator) {
    var text = this.getFieldValue('CONTENT');
    var code = '[' + text + ']'
    return [code, generator.ORDER_ATOMIC];
}

export const lists_create_with_noreturn = function (_, generator) {
    // Create a list with any number of elements of any type.
    var code = new Array(this.itemCount_);
    var default_value = '0';
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || default_value;
    }
    var code = '[' + code.join(', ') + ']';
    return [code, generator.ORDER_ATOMIC];
}

export const lists_change_to_general = lists_change_to;

export const lists_del_general = function (_, generator) {
    var varName = generator.valueToCode(this, 'TUP', generator.ORDER_ASSIGNMENT) || '0';
    var code = 'del ' + varName + '\n';
    return code;
}

export const lists_create_with2 = lists_create_with
export const lists_create_with_text2 = lists_create_with_text
export const lists_getIndex3 = lists_get_index
export const lists_getSublist3 = lists_get_sublist
export const lists_setIndex3 = lists_set_index
export const lists_insert_value2 = lists_insert_value
export const lists_remove_at2 = lists_remove_at

export const list_tolist = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '0'
    return ['list(' + str + ')', generator.ORDER_ATOMIC];
}

export const list_tolist2 = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '0'
    return [str + '.tolist()', generator.ORDER_ATOMIC];
}

export const enumerate = function (_, generator) {
    var varName = generator.valueToCode(this, 'LIST', generator.ORDER_ADDITIVE) || 'mylist';
    var argument = generator.valueToCode(this, 'VALUE', generator.ORDER_ASSIGNMENT) || '0';
    var code = 'enumerate(' +varName+',start='+ argument + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const content_in_lists = function (_, generator) {
    var varName = generator.valueToCode(this, 'LIST', generator.ORDER_ADDITIVE) || 'mylist';
    var con = generator.valueToCode(this, 'CON', generator.ORDER_ASSIGNMENT) || '0';
    var code = con +' in '+varName;
    return [code, generator.ORDER_ATOMIC];
}