'use strict';

goog.provide('Blockly.Python.lists');

goog.require('Blockly.Python');




Blockly.Python['lists_get_sublist'] = function(block) {
  // Get sublist.
  var list = Blockly.Python.valueToCode(block, 'LIST',
      Blockly.Python.ORDER_MEMBER) || '[]';
  var at1 =  Blockly.Python.valueToCode(this, 'AT1', Blockly.Python.ORDER_ADDITIVE) || '0';
  var at2 =  Blockly.Python.valueToCode(this, 'AT2', Blockly.Python.ORDER_ADDITIVE) || '0';
  var code = list + '[' + at1 + ' : ' + at2 + ']';
  return [code, Blockly.Python.ORDER_MEMBER];
};



Blockly.Python.lists_create_with = function() {
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
Blockly.Python.lists_create_with_text = function() {
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  var text=this.getFieldValue('TEXT');
  // Blockly.Python.setups_['var_declare'+varName] = varName+' = '+ '[' + text + ']\n';
  var code = varName+' = '+ '[' + text + ']\n';
  return code;
};

Blockly.Python.lists_get_index = function() {
  // Indexing into a list is the same as indexing into a string.
  var list = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_ADDITIVE) || 'mylist';
  var argument0 = Blockly.Python.valueToCode(this, 'AT', Blockly.Python.ORDER_ADDITIVE) || 0;
  var code = list +'['+argument0+']';
  return [code,Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.lists_set_index = function() {
  // Set element at index.
  var varName = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_ADDITIVE) || 'mylist';
  var argument0 = Blockly.Python.valueToCode(this, 'AT',
    Blockly.Python.ORDER_ADDITIVE) || '0';
  var argument2 = Blockly.Python.valueToCode(this, 'TO',
    Blockly.Python.ORDER_ASSIGNMENT) || '0';
  // Blockly uses one-based indicies.
  return varName + '[' + argument0 + '] = ' + argument2 + '\n';
};

Blockly.Python.lists_append_extend = function(){
  var varName = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_MEMBER) || 'mylist';
  var argument = Blockly.Python.valueToCode(this, 'DATA', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var op = this.getFieldValue('OP');
  var code=varName + '.' + op + '('  + argument + ')\n';
  return code;
};

Blockly.Python.lists_get_random_item = function() {
  Blockly.Python.definitions_['import_random'] = 'import random';
  var varName = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_MEMBER) || 'mylist';
  var code='random.choice(' +varName + ')';
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.lists_insert_value = function(){
  var varName = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_MEMBER) || 'mylist';
  var at = Blockly.Python.valueToCode(this, 'AT', Blockly.Python.ORDER_ADDITIVE) || '0';
  var VALUE = Blockly.Python.valueToCode(this, 'VALUE', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.insert('  + at + ', ' + VALUE + ')\n';
  return code;
};


Blockly.Python.lists_reverse = function(){
  var varName = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.reverse()\n';
  return code;
}
Blockly.Python.lists_clear = function(){
  var varName = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.clear()\n';
  return code;
}

Blockly.Python.lists_find = function(){
  var op = this.getFieldValue('OP');
  var varName = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  if (op=='INDEX')
    var code = varName + '.index('  + argument + ')';
  else if (op=='COUNT')
    var code = varName + '.count('  + argument + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.lists_remove_at = function(){
  var varName = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_MEMBER) || 'mylist';
  var argument = Blockly.Python.valueToCode(this, 'DATA', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var op = this.getFieldValue('OP');
  var code = "";
  if(op == "del"){
      code = 'del ' + varName + '['  + argument + ']\n';
  }else{
      code = varName + '.remove' + '('  + argument + ')\n';
  }
  return code;
};

Blockly.Python.lists_pop = function(){
  var varName = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_MEMBER) || 'mylist';
  var argument = Blockly.Python.valueToCode(this, 'VALUE', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code = varName + '.pop('  + argument + ')';
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

Blockly.Python.lists_create_with_noreturn = function() {
  // Create a list with any number of elements of any type.
  var code = new Array(this.itemCount_);
  var default_value = '0';
  for (var n = 0; n < this.itemCount_; n++) {
      code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
        Blockly.Python.ORDER_NONE) || default_value;
  }
  var code = '[' + code.join(', ') + ']';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.lists_change_to_general = Blockly.Python.lists_change_to;

Blockly.Python.lists_del_general = function() {
  var varName = Blockly.Python.valueToCode(this, 'TUP', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code='del ' + varName + '\n';
  return code;
};



Blockly.Python['lists_create_with2'] = Blockly.Python['lists_create_with']
Blockly.Python['lists_create_with_text2'] = Blockly.Python['lists_create_with_text']
Blockly.Python['lists_getIndex3'] = Blockly.Python['lists_get_index']
Blockly.Python['lists_getSublist3'] = Blockly.Python['lists_get_sublist']
Blockly.Python['lists_setIndex3'] = Blockly.Python['lists_set_index']
Blockly.Python['lists_insert_value2'] = Blockly.Python['lists_insert_value']
Blockly.Python['lists_remove_at2'] = Blockly.Python['lists_remove_at']

