import * as Blockly from 'blockly/core';

export const tuple_create_with = function (_, generator) {
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
    // if (this.itemCount_!=1){
    //  generator.definitions_['var_declare'+varName] = varName+'= '+ '(' + code.join(', ') + ')\n';}
    // else {
    // generator.definitions_['var_declare'+varName] = varName+'= '+ '(' + code.join(', ') + ',)\n';}
    if (this.itemCount_ != 1) {
        var code = varName + '= ' + '(' + code.join(', ') + ')\n';
    }
    else {
        var code = varName + '= ' + '(' + code.join(', ') + ',)\n';
    }
    return code;
}

export const tuple_create_with_text2 = function (_, generator) {
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    //var size=window.parseFloat(this.getFieldValue('SIZE'));
    var text = this.getFieldValue('TEXT');
    //generator.definitions_['var_declare'+varName] = varName+'= '+ '(' + text + ')\n';
    var code = varName + '= ' + '(' + text + ')\n';
    return code;
}

export const tuple_create_with_text_return = function (_, generator) {
    var text = this.getFieldValue('TEXT');
    var code = '(' + text + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const tuple_getIndex = function (_, generator) {
    // Indexing into a list is the same as indexing into a string.
    var varName = generator.valueToCode(this, 'TUP', generator.ORDER_ASSIGNMENT) || '0';
    var argument0 = generator.valueToCode(this, 'AT',
        generator.ORDER_ADDITIVE) || '1';
    if (argument0.match(/^\d+$/)) {
        // If the index is a naked number, decrement it right now.
        argument0 = parseInt(argument0, 10);
    }
    // else {
    // If the index is dynamic, decrement it in code.
    // argument0;
    // }
    var code = varName + '[' + argument0 + ']';
    return [code, generator.ORDER_ATOMIC];
}

export const tuple_length = function (_, generator) {
    var varName = generator.valueToCode(this, 'TUP', generator.ORDER_ASSIGNMENT) || '0';
    var code = 'len(' + varName + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const tuple_del = function (_, generator) {
    var varName = generator.valueToCode(this, 'TUP', generator.ORDER_ASSIGNMENT) || '0';
    var code = 'del ' + varName + '\n';
    return code;
}

export const tuple_join = function (_, generator) {
    var varName1 = generator.valueToCode(this, 'TUP1', generator.ORDER_ASSIGNMENT) || '0';
    var varName2 = generator.valueToCode(this, 'TUP2', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName1 + " + " + varName2;
    return [code, generator.ORDER_ATOMIC];
}

export const tuple_max = function (_, generator) {
    var varname = generator.valueToCode(this, 'TUP', generator.ORDER_ASSIGNMENT) || '0';
    var maxmin = this.getFieldValue('DIR');
    var code = maxmin + "(" + varname + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const tuple_change_to = function (_, generator) {
    var op = this.getFieldValue('OP');
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ASSIGNMENT) || '0';
    var code = op + '(' + varName + ')\n';
    return [code, generator.ORDER_ATOMIC];
}

export const tuple_find = function (_, generator) {
    var op = this.getFieldValue('OP');
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ASSIGNMENT) || '0';
    var argument = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT) || '0';
    if (op == 'INDEX')
        var code = varName + '.index(' + argument + ')';
    else if (op == 'COUNT')
        var code = varName + '.count(' + argument + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const tuple_trig = function (a, generator) {
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
            // generator.definitions_['from_numbers_import_Number'] =
            //   'from numbers import Number';
            var functionName = generator.provideFunction_(
                'math_mean',
                // This operation excludes null and values that aren't int or float:',
                // math_mean([null, null, "aString", 1, 9]) == 5.0.',
                ['def ' + generator.FUNCTION_NAME_PLACEHOLDER_ + '(myList):',
                    '  localList = [e for e in myList if type(e) == int or type(e) == float]',
                    '  if not localList: return',
                    '  return float(sum(localList)) / len(localList)']);
            c = functionName + '(' + a + ')';
            break;
        case 'MEDIAN':
            // generator.definitions_['from_numbers_import_Number'] =
            //   'from numbers import Numberd';
            var functionName = generator.provideFunction_(
                'math_median',
                // This operation excludes null values:
                // math_median([null, null, 1, 3]) == 2.0.
                ['def ' + generator.FUNCTION_NAME_PLACEHOLDER_ + '(myList):',
                    '  localList = sorted([e for e in myList if type(e) == int or type(e) == float])',
                    '  if not localList: return',
                    '  if len(localList) % 2 == 0:',
                    '    return (localList[len(localList) // 2 - 1] + ' +
                'localList[len(localList) // 2]) / 2.0',
                    '  else:',
                    '    return localList[(len(localList) - 1) // 2]']);
            c = functionName + '(' + a + ')';
            break;
        case 'MODE':
            var functionName = generator.provideFunction_(
                'math_modes',
                // As a list of numbers can contain more than one mode,
                // the returned result is provided as an array.
                // Mode of [3, 'x', 'x', 1, 1, 2, '3'] -> ['x', 1].
                ['def ' + generator.FUNCTION_NAME_PLACEHOLDER_ + '(some_list):',
                    '  modes = []',
                    '  # Using a lists of [item, count] to keep count rather than dict',
                    '  # to avoid "unhashable" errors when the counted item is ' +
                'itself a list or dict.',
                    '  counts = []',
                    '  maxCount = 1',
                    '  for item in some_list:',
                    '    found = False',
                    '    for count in counts:',
                    '      if count[0] == item:',
                    '        count[1] += 1',
                    '        maxCount = max(maxCount, count[1])',
                    '        found = True',
                    '    if not found:',
                    '      counts.append([item, 1])',
                    '  for counted_item, item_count in counts:',
                    '    if item_count == maxCount:',
                    '      modes.append(counted_item)',
                    '  return modes']);
            c = functionName + '(' + a + ')';
            break;
        case 'STD_DEV':
            generator.definitions_['import_math'] = 'import math';
            var functionName = generator.provideFunction_(
                'math_standard_deviation',
                ['def ' + generator.FUNCTION_NAME_PLACEHOLDER_ + '(numbers):',
                    '  n = len(numbers)',
                    '  if n == 0: return',
                    '  mean = float(sum(numbers)) / n',
                    '  variance = sum((x - mean) ** 2 for x in numbers) / n',
                    '  return math.sqrt(variance)']);
            c = functionName + '(' + a + ')';
            break;
        default:
            throw 'Unknown operator: ' + b;
    }
    if (c)
        return [c, generator.ORDER_FUNCTION_CALL];

}

export const tuple_getSublist = function (block, generator) {
    // Get sublist.
    var list = generator.valueToCode(block, 'LIST',
        generator.ORDER_MEMBER) || '[]';
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
            var at1 = generator.getAdjustedInt(block, 'AT1', 1, true);
            break;
        case 'FIRST':
            var at1 = '0';
            break;
        default:
            throw 'Unhandled option (lists_getSublist)';
    }
    switch (where2) {
        case 'FROM_START':
            var at2 = generator.getAdjustedInt(block, 'AT2', 1);
            at2 = at2 - 1;
            break;
        case 'FROM_END':
            var at2 = generator.getAdjustedInt(block, 'AT2', 1, true);
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
    var code = list + '[' + at1 + ' : ' + at2 + ']';
    return [code, generator.ORDER_MEMBER];
}

export const tuple_create_with_noreturn = function (_, generator) {
    // Create a list with any number of elements of any type.
    var code = new Array(this.itemCount_);
    var default_value = '0';


    for (var n = 0; n < this.itemCount_; n++) {

        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || default_value;
    }
    // if (this.itemCount_!=1){
    //  generator.definitions_['var_declare'+varName] = varName+'= '+ '(' + code.join(', ') + ')\n';}
    // else {
    // generator.definitions_['var_declare'+varName] = varName+'= '+ '(' + code.join(', ') + ',)\n';}
    if (this.itemCount_ != 1) {
        var code = '(' + code.join(', ') + ')';
    }
    else {
        var code = '(' + code.join(', ') + ',)';
    }

    return [code, generator.ORDER_ATOMIC];
}

export const tuple_get_sublist = function (_, generator) {
    // Get sublist.
    var list = generator.valueToCode(this, 'LIST', generator.ORDER_ADDITIVE) || '0';
    var at1 = generator.valueToCode(this, 'AT1', generator.ORDER_ADDITIVE) || '0';
    var at2 = generator.valueToCode(this, 'AT2', generator.ORDER_ADDITIVE) || '0';
    var code = list + '[' + at1 + ' : ' + at2 + ']';
    return [code, generator.ORDER_ATOMIC];
}

export const tuple_get_random_item = function (_, generator) {
    generator.definitions_['import_random'] = 'import random';
    var varName = generator.valueToCode(this, 'TUP', generator.ORDER_ADDITIVE) || 'mytup';
    var code = 'random.choice(' + varName + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const tuple_totuple = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '0'
    return ['tuple(' + str + ')', generator.ORDER_ATOMIC];
}

export const tuple_input = function (_, generator) {
    var text = this.getFieldValue('CONTENT');
    var code = '(' + text + ')';
    return [code, generator.ORDER_ATOMIC];
}