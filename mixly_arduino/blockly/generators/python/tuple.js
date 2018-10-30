'use strict';

goog.provide('Blockly.Python.tuple');

goog.require('Blockly.Python');

Blockly.Python.tuple_create_with = function() {
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
 // if (this.itemCount_!=1){
//  Blockly.Python.definitions_['var_declare'+varName] = varName+'= '+ '(' + code.join(', ') + ')\n';}
 // else {
 // Blockly.Python.definitions_['var_declare'+varName] = varName+'= '+ '(' + code.join(', ') + ',)\n';}
 if (this.itemCount_!=1){
  var code = varName+'= '+ '(' + code.join(', ') + ')\n';}
 else {
  var code = varName+'= '+ '(' + code.join(', ') + ',)\n';}

  return code;
};

Blockly.Python.tuple_create_with_text2 = function() {
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  var text=this.getFieldValue('TEXT');
  //Blockly.Python.definitions_['var_declare'+varName] = varName+'= '+ '(' + text + ')\n';
  var code = varName+'= '+ '(' + text + ')\n';
  return code;
};

Blockly.Python.tuple_create_with_text_return = function() {
  var text=this.getFieldValue('TEXT');
  var code = '(' + text + ')';
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.tuple_getIndex = function() {
  // Indexing into a list is the same as indexing into a string.
  var varName = Blockly.Python.valueToCode(this, 'TUP', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var argument0 = Blockly.Python.valueToCode(this, 'AT',
    Blockly.Python.ORDER_ADDITIVE) || '1';
  if (argument0.match(/^\d+$/)) {
  // If the index is a naked number, decrement it right now.
  argument0 = parseInt(argument0, 10);
  }
   // else {
  // If the index is dynamic, decrement it in code.
  // argument0;
  // }
  var code=varName+'['+argument0+']';
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.tuple_length = function() {
  var varName = Blockly.Python.valueToCode(this, 'TUP', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code='len(' +varName + ')';
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.tuple_del = function() {
  var varName = Blockly.Python.valueToCode(this, 'TUP', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code='del ' + varName + '\n';
  return code;
};

Blockly.Python.tuple_join = function() {
  var varName1 =  Blockly.Python.valueToCode(this, 'TUP1', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var varName2 =  Blockly.Python.valueToCode(this, 'TUP2', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code = varName1 + "+" + varName2;
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.tuple_max = function() {
  var varname = Blockly.Python.valueToCode(this, 'TUP', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var maxmin = this.getFieldValue('DIR');
  var code= maxmin + "("  +varname + ')';
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.tuple_change_to = function(){
  var op = this.getFieldValue('OP');
  var varName = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code = op + '(' + varName + ')\n';
  return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.tuple_find = function(){
  var op = this.getFieldValue('OP');
  var varName = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  if (op=='INDEX')
    var code = '(' + varName + '.index('  + argument + ') + 1)';
  else if (op=='COUNT')
    var code = varName + '.count('  + argument + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.tuple_trig = function (a) {
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

Blockly.Python['tuple_getSublist'] = function(block) {
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

Blockly.Python.tuple_create_with_noreturn = function() {
  // Create a list with any number of elements of any type.
  var dropdown_type = this.getFieldValue('TYPE');
  var code = new Array(this.itemCount_);
  var default_value = '0';


  for (var n = 0; n < this.itemCount_; n++) {

  code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
    Blockly.Python.ORDER_NONE) || default_value;
  }
 // if (this.itemCount_!=1){
//  Blockly.Python.definitions_['var_declare'+varName] = varName+'= '+ '(' + code.join(', ') + ')\n';}
 // else {
 // Blockly.Python.definitions_['var_declare'+varName] = varName+'= '+ '(' + code.join(', ') + ',)\n';}
 if (this.itemCount_!=1){
  var code = '(' + code.join(', ') + ')';}
 else {
  var code = '(' + code.join(', ') + ',)';}

  return [code, Blockly.Python.ORDER_ATOMIC];
};