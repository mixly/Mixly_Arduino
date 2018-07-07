'use strict';

goog.provide('Blockly.Python.lists');

goog.require('Blockly.Python');


// Blockly.Python.lists_create_with = function() {
//   // Create a list with any number of elements of any type.
//   var dropdown_type = this.getFieldValue('TYPE');
//   var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
//     Blockly.Variables.NAME_TYPE);
//   var size=window.parseFloat(this.getFieldValue('SIZE'));
//   var code = new Array(this.itemCount_);
//   for (var n = 0; n < this.itemCount_; n++) {
//   code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
//     Blockly.Python.ORDER_NONE) || '0';
//   }
//   Blockly.Python.definitions_['var_lists'+varName] = dropdown_type+' '+varName+'['+size+']'+'='+ '{' + code.join(', ') + '};\n';
//   //var code =''+varName+'['+size+"]"+'='+ '{' + code.join(', ') + '};\n';
//   //Blockly.Python.setups_['setup_lists'+varName] = code;
//   return '';
// };

// Blockly.Python.lists_create_with_text = function() {
//   var dropdown_type = this.getFieldValue('TYPE');
//   var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
//     Blockly.Variables.NAME_TYPE);
//   var size=window.parseFloat(this.getFieldValue('SIZE'));
//   var text=this.getFieldValue('TEXT');
//   Blockly.Python.definitions_['var_lists'+varName] = dropdown_type+' '+varName+'['+size+']'+'='+ '{' + text + '};\n';
//   return '';
// };
//ok, don't need to specify the data type in Python

Blockly.Python.lists_getIndex2 = function(a) {
    var b = a.getFieldValue("MODE") || "GET",
    c = a.getFieldValue("WHERE") || "FROM_START",
    d = Blockly.Python.valueToCode(a, "VALUE", "RANDOM" == c ? Blockly.Python.ORDER_NONE: Blockly.Python.ORDER_MEMBER) || "[]";
    switch (c) {
    case "FIRST":
        if ("GET" == b) return [d + "[0]", Blockly.Python.ORDER_MEMBER];
        if ("GET_REMOVE" == b) return [d + ".pop(0)", Blockly.Python.ORDER_FUNCTION_CALL];
        if ("REMOVE" == b) return d + ".remove(0)\n";
        break;
    case "LAST":
        if ("GET" == b) return [d + "[-1]", Blockly.Python.ORDER_MEMBER];
        if ("GET_REMOVE" == b) return [d + ".pop(-1)", Blockly.Python.ORDER_FUNCTION_CALL];
        if ("REMOVE" == b) return d + ".remove(-1)\n";
        break;
    case "FROM_START":
        a = Blockly.Python.getAdjustedInt(a, "AT");
        if ("GET" == b) return [d + "[" + a + "]", Blockly.Python.ORDER_MEMBER];
        if ("GET_REMOVE" == b) return [d + ".pop(" + a + ")", Blockly.Python.ORDER_FUNCTION_CALL];
        if ("REMOVE" == b) return d + ".remove(" + a + ")\n";
        break;
    case "FROM_END":
        a = Blockly.Python.getAdjustedInt(a, "AT", 1, !0);
        if ("GET" == b) return [d + "[" + a + "]", Blockly.Python.ORDER_MEMBER];
        if ("GET_REMOVE" == b) return [d + ".pop(" + a + ")", Blockly.Python.ORDER_FUNCTION_CALL];
        if ("REMOVE" == b) return d + ".remove(" + a + ")\n";
        break;
    case "RANDOM":
        Blockly.Python.definitions_.import_random = "import random";
        if ("GET" == b) return ["random.choice(" + d + ")", Blockly.Python.ORDER_FUNCTION_CALL];
        d = Blockly.Python.provideFunction_("lists_remove_random_item", ["def " + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + "(myList):", "  x = int(random.random() * len(myList))", "  return myList.pop(x)"]) + "(" + d + ")";
        if ("GET_REMOVE" == b) return [d, Blockly.Python.ORDER_FUNCTION_CALL];
        if ("REMOVE" == b) return d + "\n"
    }
    throw "Unhandled combination (lists_getIndex).";
};

Blockly.Python['lists_moveIndex'] = function(block) {
  // Get element at index.
  // Note: Until January 2013 this block did not have MODE or WHERE inputs.
  var mode = 'REMOVE';
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var listOrder = (where == 'RANDOM') ? Blockly.Python.ORDER_NONE :
      Blockly.Python.ORDER_MEMBER;
  var list = Blockly.Python.valueToCode(block, 'VALUE', listOrder) || '[]';

  switch (where) {
    case 'FIRST':
      if (mode == 'GET') {
        var code = list + '[0]';
        return [code, Blockly.Python.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.pop(0)';
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return list + '.remove(0)\n';
      }
      break;
    case 'LAST':
      if (mode == 'GET') {
        var code = list + '[-1]';
        return [code, Blockly.Python.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.pop(-1)';
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return list + '.remove(-1)\n';
      }
      break;
    case 'FROM_START':
      var at = Blockly.Python.getAdjustedInt(block, 'AT');
      if (mode == 'GET') {
        var code = list + '[' + at + ']';
        return [code, Blockly.Python.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.pop(' + at + ')';
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return list + '.remove(' + at + ')\n';
      }
      break;
    case'FROM_END':
      var at = Blockly.Python.getAdjustedInt(block, 'AT', 1, true);
      if (mode == 'GET') {
        var code = list + '[' + at + ']';
        return [code, Blockly.Python.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.pop(' + at + ')';
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return list + '.remove(' + at + ')\n';
      }
      break;
    case 'RANDOM':
      Blockly.Python.definitions_['import_random'] = 'import random';
      if (mode == 'GET') {
        code = 'random.choice(' + list + ')';
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
      } else {
        var functionName = Blockly.Python.provideFunction_(
            'lists_remove_random_item',
            ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(myList):',
              '  x = int(random.random() * len(myList))',
              '  return myList.pop(x)']);
        code = functionName + '(' + list + ')';
        if (mode == 'GET_REMOVE') {
          return [code, Blockly.Python.ORDER_FUNCTION_CALL];
        } else if (mode == 'REMOVE') {
          return code + '\n';
        }
      }
      break;
  }
  throw 'Unhandled combination (lists_getIndex).';
};

Blockly.Python['lists_getSublist'] = function(block) {
  // Get sublist.
  var list = Blockly.Python.valueToCode(block, 'LIST',
      Blockly.Python.ORDER_MEMBER) || '[]';
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
  switch (where1) {
    case 'FROM_START':
      var at1 = Blockly.Python.getAdjustedInt(block, 'AT1');
      if (at1 == '0') {
        at1 = '';
      }
      break;
    case 'FROM_END':
      var at1 = Blockly.Python.getAdjustedInt(block, 'AT1', 1, true);
      break;
    case 'FIRST':
      var at1 = '0';
      break;
    default:
      throw 'Unhandled option (lists_getSublist)';
  }
  switch (where2) {
    case 'FROM_START':
      var at2 = Blockly.Python.getAdjustedInt(block, 'AT2', 1);
          at2 = at2-1;
      break;
    case 'FROM_END':
      var at2 = Blockly.Python.getAdjustedInt(block, 'AT2', 1, true);
      // Ensure that if the result calculated is 0 that sub-sequence will
      // include all elements as expected.
      if (!Blockly.isNumber(String(at2))) {
        Blockly.Python.definitions_['import_sys'] = 'import sys';
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
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python.lists_setIndex2 = function(block){
  var list = Blockly.Python.valueToCode(block, 'LIST',
      Blockly.Python.ORDER_MEMBER) || '[]';
  var mode = block.getFieldValue('WHERE');
  var where = block.getFieldValue('OP');
  
  
  switch (where) {
    case 'FROM_START':
      var at1 = Blockly.Python.getAdjustedInt(block, 'AT1');
      break;
    case 'FROM_END':
      var at1 = Blockly.Python.getAdjustedInt(block, 'AT1', 1, true);
      break;
    default:
      throw 'Unhandled option (lists_setIndex2)';
  }
  switch (mode) {
    case 'INSERT':
      var at2 =  Blockly.Python.valueToCode(this, 'AT2', Blockly.Python.ORDER_ADDITIVE) || '0';
      var code = list + '.insert(' + at1 + ',' + at2 + ')\n'
      break;
    case 'CHANGE':
      var at2 =  Blockly.Python.valueToCode(this, 'AT2', Blockly.Python.ORDER_ADDITIVE) || '0';
      var code = list + '[' + at1 + '] = ' + at2 + '\n'
      break;
    case 'DELETE':
      var code = 'del ' + list + '[' + at1 + ']\n'
      break;
    default:
      throw 'Unhandled option (lists_setIndex2)';
  }
  return code;
};

Blockly.Python.lists_name = function() {
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var code=varName;
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.lists_name2 = function() {
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var code=varName;
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.lists_create_with2 = function() {
  // Create a list with any number of elements of any type.
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  var code = new Array(this.itemCount_);
  var default_value = '0';


  for (var n = 0; n < this.itemCount_; n++) {

  code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
    Blockly.Python.ORDER_NONE) || default_value;
  }
  //Blockly.Python.setups_['var_declare'+varName] = varName+' = '+ '[' + code.join(', ') + ']\n';
  var code = varName+' = '+ '[' + code.join(', ') + ']\n';
  return code;
};
//ok, don't need to specify the data type in Python
Blockly.Python.lists_create_with_text2 = function() {
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  var text=this.getFieldValue('TEXT');
  // Blockly.Python.setups_['var_declare'+varName] = varName+' = '+ '[' + text + ']\n';
  var code = varName+' = '+ '[' + text + ']\n';
  return code;
};
//ok
Blockly.Python.lists_getIndex = function() {
  // Indexing into a list is the same as indexing into a string.
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Python.valueToCode(this, 'AT',
    Blockly.Python.ORDER_ADDITIVE) || '1';
  if (argument0.match(/^\d+$/)) {
  // If the index is a naked number, decrement it right now.
  argument0 = parseInt(argument0, 10) - 1;
  } else {
  // If the index is dynamic, decrement it in code.
  argument0 += ' - 1';
  }
  var code=varName+'['+argument0+']';
  return [code,Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.lists_setIndex = function() {
  // Set element at index.
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Python.valueToCode(this, 'AT',
    Blockly.Python.ORDER_ADDITIVE) || '1';
  var argument2 = Blockly.Python.valueToCode(this, 'TO',
    Blockly.Python.ORDER_ASSIGNMENT) || '0';
  // Blockly uses one-based indicies.
  if (argument0.match(/^\d+$/)) {
  // If the index is a naked number, decrement it right now.
  argument0 = parseInt(argument0, 10) - 1;
  } else {
  // If the index is dynamic, decrement it in code.
  argument0 += ' - 1';
  }
  return varName + '[' + argument0 + '] = ' + argument2 + '\n';
};
//ok
Blockly.Python.lists_length = function() {
  var varName = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code='len(' +varName + ')';
  return [code,Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.lists_append = function(){
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.append('  + argument + ')\n';
  return code;
};
//ok
Blockly.Python.lists_extend = function(){
  var varName1 = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var varName2 = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName1 + '.extend('  + varName2 + ')\n';
  return code;
};

Blockly.Python.lists_append_remove = function(){
  var op = this.getFieldValue('OP');
  var varName = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.'+ op + '('  + argument + ')\n';
  return code;
};
Blockly.Python.lists_get_random_item = function() {
  Blockly.Python.definitions_['import_random'] = 'import random';
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var code='random.choice(' +varName + ')';
  return [code,Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.lists_push = function(){
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.append('  + argument + ')\n';
  return code;
};
//ok
Blockly.Python.lists_get_remove_last = function(){
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var code=varName + '.pop()';
  return [code, Blockly.Python.ORDER_ATOMIC];
}
//ok
Blockly.Python.lists_insert_value = function(){
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var at = Blockly.Python.valueToCode(this, 'AT', Blockly.Python.ORDER_ADDITIVE) || '0';
  var to = Blockly.Python.valueToCode(this, 'TO', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  at = at - 1;
  var code=varName + '.insert('  + at + ', ' + to + ')\n';
  return code;
};
//ok
Blockly.Python.lists_reverse = function(){
  var varName = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.reverse()\n';
  return code;
}


// Blockly.Python.lists_get_remove_first = function(){
//   var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
//   var code=varName + '.shift()';
//   return [code, Blockly.Python.ORDER_ATOMIC];
// }
// Blockly.Python.lists_insert_at_beginning = function(){
//   var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
//   var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
//   var code=varName + '.unshift('  + argument + ')';
//   return [code, Blockly.Python.ORDER_ATOMIC];
// }

//ok
Blockly.Python.lists_find = function(){
  var op = this.getFieldValue('OP');
  var varName = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  if (op=='INDEX')
    var code = '(' + varName + '.index('  + argument + ') + 1)';
  else if (op=='COUNT')
    var code = varName + '.count('  + argument + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
}
//ok
Blockly.Python.lists_remove_at= function(){
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument = Blockly.Python.valueToCode(this, 'AT', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  argument = argument  - 1;
  var code=varName + '.pop('  + argument + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
}


Blockly.Python.list_trig = function (a) {
  var b = a.getFieldValue("OP"), c;
  Blockly.Python.definitions_['import_math'] = "import math";
  a = Blockly.Python.valueToCode(a, 'data', Blockly.Python.ORDER_NONE) 
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
  // Blockly.Python.definitions_['from_numbers_import_Number'] =
  //   'from numbers import Number';
  var functionName = Blockly.Python.provideFunction_(
    'math_mean',
    // This operation excludes null and values that aren't int or float:',
    // math_mean([null, null, "aString", 1, 9]) == 5.0.',
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(myList):',
     '  localList = [e for e in myList if type(e) == int or type(e) == float]',
     '  if not localList: return',
     '  return float(sum(localList)) / len(localList)']);
  c = functionName + '(' + a + ')';
  break;
case 'MEDIAN':
  // Blockly.Python.definitions_['from_numbers_import_Number'] =
  //   'from numbers import Numberd';
  var functionName = Blockly.Python.provideFunction_(
    'math_median',
    // This operation excludes null values:
    // math_median([null, null, 1, 3]) == 2.0.
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(myList):',
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
  var functionName = Blockly.Python.provideFunction_(
    'math_modes',
    // As a list of numbers can contain more than one mode,
    // the returned result is provided as an array.
    // Mode of [3, 'x', 'x', 1, 1, 2, '3'] -> ['x', 1].
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(some_list):',
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
  Blockly.Python.definitions_['import_math'] = 'import math';
  var functionName = Blockly.Python.provideFunction_(
    'math_standard_deviation',
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(numbers):',
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
  return [c, Blockly.Python.ORDER_FUNCTION_CALL];
  
};

Blockly.Python['lists_repeat'] = function(block) {
  // Create a list with one element repeated.
  var item = Blockly.Python.valueToCode(block, 'ITEM',
    Blockly.Python.ORDER_NONE) || 'None';
  var times = Blockly.Python.valueToCode(block, 'NUM',
    Blockly.Python.ORDER_MULTIPLICATIVE) || '0';
  var code = '[' + item + '] * ' + times;
  return [code, Blockly.Python.ORDER_MULTIPLICATIVE];
};

Blockly.Python['lists_isEmpty'] = function(block) {
  // Is the string null or array empty?
  var list = Blockly.Python.valueToCode(block, 'VALUE',
    Blockly.Python.ORDER_NONE) || '[]';
  var code = 'not len(' + list + ')';
  return [code, Blockly.Python.ORDER_LOGICAL_NOT];
};


Blockly.Python['lists_sort'] = function(block) {
  // Block for sorting a list.
  var list = (Blockly.Python.valueToCode(block, 'LIST',
    Blockly.Python.ORDER_NONE) || '[]');
  var type = block.getFieldValue('TYPE');
  var reverse = block.getFieldValue('DIRECTION') === '1' ? 'False' : 'True';
  var sortFunctionName = Blockly.Python.provideFunction_('lists_sort',
  ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ +
    '(my_list, type, reverse):',
  '  def try_float(s):',
  '    try:',
  '      return float(s)',
  '    except:',
  '      return 0',
  '  key_funcs = {',
  '    "NUMERIC": try_float,',
  '    "TEXT": str,',
  '    "IGNORE_CASE": lambda s: str(s).lower()',
  '  }',
  '  key_func = key_funcs[type]',
  '  list_cpy = list(my_list)', // Clone the list.
  '  return sorted(list_cpy, key=key_func, reverse=reverse)'
  ]);

  var code = sortFunctionName +
    '(' + list + ', "' + type + '", ' + reverse + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};


Blockly.Python.lists_change_to = function(){
  var op = this.getFieldValue('OP');
  var varName = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code = op + '(' + varName + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.list_many_input = function() {
  var text=this.getFieldValue('CONTENT');
  var code='['+text+']'
  return [code, Blockly.Python.ORDER_ATOMIC];
};
