import { Variables } from 'blockly/core';

export const lists_create_with = function (_, generator) {
    // Create a list with any number of elements of any type.
    var dropdown_type = this.getFieldValue('TYPE');
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Variables.NAME_TYPE);
    var size = window.parseFloat(this.getFieldValue('SIZE'));
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || '0';
    }
    generator.definitions_['var_declare' + varName] = dropdown_type + ' ' + varName + '[' + size + ']' + '=' + '{' + code.join(', ') + '};\n';
    return '';
}

export const lists_create_with_text = function (_, generator) {
    var dropdown_type = this.getFieldValue('TYPE');
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Variables.NAME_TYPE);
    var size = window.parseFloat(this.getFieldValue('SIZE'));
    var text = this.getFieldValue('TEXT');
    generator.definitions_['var_declare' + varName] = dropdown_type + ' ' + varName + '[' + size + ']' + '=' + '{' + text + '};\n';
    return '';
}

export const lists_create_with2 = function (_, generator) {
    // Create a list with any number of elements of any type.
    var dropdown_type = this.getFieldValue('TYPE');
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Variables.NAME_TYPE);
    //var size=window.parseFloat(this.getFieldValue('SIZE'));
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || '0';
    }
    generator.definitions_['var_declare' + varName] = dropdown_type + ' ' + varName + '[]' + '=' + '{' + code.join(', ') + '};\n';
    return '';
}

export const lists_create_with_text2 = function (_, generator) {
    var dropdown_type = this.getFieldValue('TYPE');
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Variables.NAME_TYPE);
    var size = window.parseFloat(this.getFieldValue('SIZE')) || '';
    var text = this.getFieldValue('TEXT');
    generator.definitions_['var_declare' + varName] = dropdown_type + ' ' + varName + '[' + size + ']' + '=' + '{' + text + '};\n';
    return '';
}

export const lists_getIndex = function (_, generator) {
    // Indexing into a list is the same as indexing into a string.
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Variables.NAME_TYPE);
    var argument0 = generator.valueToCode(this, 'AT',
        generator.ORDER_ADDITIVE) || '1';
    if (argument0.match(/^\d+$/)) {
        // If the index is a naked number, decrement it right now.
        argument0 = parseInt(argument0, 10) - 1;
    } else {
        // If the index is dynamic, decrement it in code.
        argument0 += ' - 1';
    }
    var code = varName + '[(int)(' + argument0 + ')]';
    return [code, generator.ORDER_ATOMIC];
}

export const lists_setIndex = function (_, generator) {
    // Set element at index.
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Variables.NAME_TYPE);
    var argument0 = generator.valueToCode(this, 'AT',
        generator.ORDER_ADDITIVE) || '1';
    var argument2 = generator.valueToCode(this, 'TO',
        generator.ORDER_ASSIGNMENT) || '0';
    // Blockly uses one-based indicies.
    if (argument0.match(/^\d+$/)) {
        // If the index is a naked number, decrement it right now.
        argument0 = parseInt(argument0, 10) - 1;
    } else {
        // If the index is dynamic, decrement it in code.
        argument0 += ' - 1';
    }
    return varName + '[(int)(' + argument0 + ')] = ' + argument2 + ';\n';
}

export const listsGetValueByIndex = function (_, generator) {
    // Indexing into a list is the same as indexing into a string.
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Variables.NAME_TYPE);
    var argument0 = generator.valueToCode(this, 'AT',
        generator.ORDER_ADDITIVE) || '0';
    var code = varName + '[' + argument0 + ']';
    return [code, generator.ORDER_ATOMIC];
}

export const listsSetValueByIndex = function (_, generator) {
    // Set element at index.
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Variables.NAME_TYPE);
    var argument0 = generator.valueToCode(this, 'AT',
        generator.ORDER_ADDITIVE) || '0';
    var argument2 = generator.valueToCode(this, 'TO',
        generator.ORDER_ASSIGNMENT) || '0';
    return varName + '[' + argument0 + '] = ' + argument2 + ';\n';
}

export const lists_length = function (_, generator) {
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Variables.NAME_TYPE);
    var code = 'sizeof(' + varName + ')/sizeof(' + varName + '[0])';
    return [code, generator.ORDER_ATOMIC];
}

// 创建二维数组
export const create_array2_with_text = function (_, generator) {
    var TYPE = this.getFieldValue('TYPE');
    var line = generator.valueToCode(this, 'line', generator.ORDER_ATOMIC);
    var list = generator.valueToCode(this, 'list', generator.ORDER_ATOMIC);
    var name = generator.valueToCode(this, 'name', generator.ORDER_ATOMIC);
    var String = generator.valueToCode(this, 'String', generator.ORDER_ATOMIC);
    generator.definitions_['var_declare_array' + name] = '' + TYPE + ' ' + name + '[' + line + '][' + list + ']={' + String + '};\n ';
    return '';
}

// 二维数组赋值
export const array2_assignment = function (_, generator) {
    var line = generator.valueToCode(this, 'line', generator.ORDER_ATOMIC);
    var list = generator.valueToCode(this, 'list', generator.ORDER_ATOMIC);
    var name = generator.valueToCode(this, 'name', generator.ORDER_ATOMIC);
    var assignment = generator.valueToCode(this, 'assignment', generator.ORDER_ATOMIC);
    var code = '' + name + '[' + line + '-1][' + list + '-1]=' + assignment + ';\n'
    return code;
}

// 获取二维数组值
export const get_array2_value = function (_, generator) {
    var line = generator.valueToCode(this, 'line', generator.ORDER_ATOMIC);
    var list = generator.valueToCode(this, 'list', generator.ORDER_ATOMIC);
    var name = generator.valueToCode(this, 'name', generator.ORDER_ATOMIC);
    var code = '' + name + '[' + line + '-1][' + list + '-1]'
    return [code, generator.ORDER_ATOMIC];
}

// 二维数组赋值
export const lists2SetValueByIndex = function (_, generator) {
    var line = generator.valueToCode(this, 'line', generator.ORDER_ATOMIC);
    var list = generator.valueToCode(this, 'list', generator.ORDER_ATOMIC);
    var name = generator.valueToCode(this, 'name', generator.ORDER_ATOMIC);
    var assignment = generator.valueToCode(this, 'assignment', generator.ORDER_ATOMIC);
    var code = name + '[' + line + '][' + list + '] = ' + assignment + ';\n'
    return code;
}

// 二维数组取值
export const lists2GetValueByIndex = function (_, generator) {
    var line = generator.valueToCode(this, 'line', generator.ORDER_ATOMIC);
    var list = generator.valueToCode(this, 'list', generator.ORDER_ATOMIC);
    var name = generator.valueToCode(this, 'name', generator.ORDER_ATOMIC);
    var code = name + '[' + line + '][' + list + ']';
    return [code, generator.ORDER_ATOMIC];
}

export const lists_array2_setup = function (_, generator) {
    var dropdown_lists_create_type = this.getFieldValue('lists_create_type');
    var text_lists_create_name = this.getFieldValue('lists_create_name');
    var statements_lists_with_2_1_data = generator.statementToCode(this, 'lists_with_2_1_data');

    if (statements_lists_with_2_1_data) {
        var num_x = 0;
        var num_y_data = '';
        var num_y = 0;
        var data = '';
        var choice = false;
        var statements_lists_with_2_1_data1 = '';
        statements_lists_with_2_1_data = statements_lists_with_2_1_data.substring(2, statements_lists_with_2_1_data.length - 1);
        for (var i of statements_lists_with_2_1_data) {
            if (i == '→') {
                statements_lists_with_2_1_data1 += '\n  ';
                choice = true;
                continue;
            }
            if (choice) {
                if (i == '{') {
                    if (num_y < num_y_data - 0)
                        num_y = num_y_data - 0;
                    num_y_data = '';
                    choice = false;
                }
                else {
                    num_y_data = num_y_data + i;
                    continue;
                }
            }
            data = data + i;
            if (data == '},{')
                num_x++;
            if (data.length == 3) {
                data = data.substring(1, 2) + i;
            }
            statements_lists_with_2_1_data1 = statements_lists_with_2_1_data1 + i;
        }
        num_x++;
        generator.definitions_['var_declare' + text_lists_create_name] = dropdown_lists_create_type + ' ' + text_lists_create_name + '[' + num_x + '][' + num_y + '] = {' + statements_lists_with_2_1_data1 + '\n};';
    }
    else {
        if (dropdown_lists_create_type == 'String')
            generator.definitions_['var_declare' + text_lists_create_name] = dropdown_lists_create_type + ' ' + text_lists_create_name + '[2][2] = {{"0","0"},{"0","0"}};';
        else
            generator.definitions_['var_declare' + text_lists_create_name] = dropdown_lists_create_type + ' ' + text_lists_create_name + '[2][2] = {{0,0},{0,0}};';
    }

    var code = '';
    return code;
}

export const lists_array2_setup_get_data = function (_, generator) {
    // Create a list with any number of elements of any type.
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || '0';
    }
    var code1 = '';
    var surround_parent = this.getSurroundParent();
    if (surround_parent && surround_parent.type == 'lists_array2_setup') {
        for (var n = 0; n < this.itemCount_; n++) {
            code1 = code1 + ', ' + code[n];
        }
        code1 = code1.substring(2);
        code1 = '→' + this.itemCount_ + '{' + code1 + '},';
    }
    else if (surround_parent && surround_parent.type == 'part_lists_create_with_2_1') {
        for (var n = 0; n < this.itemCount_; n++) {
            code1 = code1 + ', ' + code[n];
        }
        code1 = code1.substring(2);
        code1 = '→' + this.itemCount_ + '{' + code1 + '},';
    }
    else if (surround_parent && surround_parent.type == 'lists_create_with_2_1_new_2019_10_18') {
        for (var n = 0; n < this.itemCount_; n++) {
            code1 = code1 + ', ' + code[n];
        }
        code1 = code1.substring(2);
        code1 = '→' + this.itemCount_ + '{' + code1 + '},';
    }
    else if (surround_parent && surround_parent.type == 'part_lists_create_with_2_1_new_2019_10_18') {
        for (var n = 0; n < this.itemCount_; n++) {
            code1 = code1 + ', ' + code[n];
        }
        code1 = code1.substring(2);
        code1 = '→' + this.itemCount_ + '{' + code1 + '},';
    }
    else {
        code1 = '';
    }
    return code1;
}

// 一维数组循环
export const loop_array = function (_, generator) {
    var type = this.getFieldValue('TYPE');
    var mode = this.getFieldValue('mode');
    var name = generator.valueToCode(this, 'name', generator.ORDER_ATOMIC);
    if (mode == 0) {
        generator.definitions_['loop_array1'] = 'void array_left_loop() {\n  ' + type + ' item =0;\n  item = ' + name + '[(int)(0)];\n  for (int i = (2); i <= (sizeof(' + name + ')/sizeof(' + name + '[0])); i = i + (1)) {\n    ' + name + '[(int)((i - 1) - 1)] = ' + name + '[(int)(i - 1)];\n  }\n  ' + name + '[(int)(sizeof(' + name + ')/sizeof(' + name + '[0]) - 1)] = item;\n}\n';
        var code = 'array_left_loop();\n';
    }
    if (mode == 1) {
        generator.definitions_['loop_array'] = 'void array_right_loop() {\n  ' + type + ' item =0;\n  item = ' + name + '[(int)(sizeof(' + name + ')/sizeof(' + name + '[0]) - 1)];\n  for (int i = (sizeof(' + name + ')/sizeof(' + name + '[0])); i >= (1); i = i + (-1)) {\n    ' + name + '[(int)((i + 1) - 1)] = ' + name + '[(int)(i - 1)];\n  }\n  ' + name + '[(int)(0)] = item;\n}\n';
        var code = 'array_right_loop();\n';
    }
    return code;
}

// 获取二维数组的行数与列数
export const lists_array2_get_length = function (_, generator) {
    var text_list_name = this.getFieldValue('list_name');
    var dropdown_type = this.getFieldValue('type');
    var code = '';
    if (dropdown_type == 'col')
        code = '(sizeof(' + text_list_name + '[0]) / sizeof(' + text_list_name + '[0][0]))';
    else
        code = '(sizeof(' + text_list_name + ') / sizeof(' + text_list_name + '[0]))';
    return [code, generator.ORDER_ATOMIC];
}