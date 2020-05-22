'use strict';

goog.provide('Blockly.Python.lists');

goog.require('Blockly.Python');




Blockly.Python['lists_get_sublist'] = function(block) {
  // Get sublist.
  var list = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_ADDITIVE) || 'mylist';
  var at1 =  Blockly.Python.valueToCode(this, 'AT1', Blockly.Python.ORDER_ADDITIVE) ;
  var at2 =  Blockly.Python.valueToCode(this, 'AT2', Blockly.Python.ORDER_ADDITIVE) ;
  var code = list + '[' + at1 + ' : ' + at2 + ']';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.lists_2d_get_data_with_col_row = function() {
  var value_LIST = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_ATOMIC) || 'mylist';
  var value_row = Blockly.Python.valueToCode(this, 'row', Blockly.Python.ORDER_ATOMIC) || 0;
  var value_col = Blockly.Python.valueToCode(this, 'col', Blockly.Python.ORDER_ATOMIC) || 0;
  var code = value_LIST+'['+value_row+','+value_col+']';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.lists_2d_get_col_row_data = function() {
  var value_LIST = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_ATOMIC) || 'mylist';
  var value_row_start = Blockly.Python.valueToCode(this, 'row_start', Blockly.Python.ORDER_ATOMIC) || 0;
  var value_row_end = Blockly.Python.valueToCode(this, 'row_end', Blockly.Python.ORDER_ATOMIC) || 1;
  var value_col_start = Blockly.Python.valueToCode(this, 'col_start', Blockly.Python.ORDER_ATOMIC) || 0;
  var value_col_end = Blockly.Python.valueToCode(this, 'col_end', Blockly.Python.ORDER_ATOMIC) || 1;
  var code = value_LIST+'['+value_row_start+' : '+value_row_end+','+value_col_start+' : '+value_col_end+']';
  return [code, Blockly.Python.ORDER_ATOMIC];
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
  var varName = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var argument = Blockly.Python.valueToCode(this, 'DATA', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var op = this.getFieldValue('OP');
  var code=varName + '.' + op + '('  + argument + ')\n';
  return code;
};

Blockly.Python.lists_get_random_item = function() {
  Blockly.Python.definitions_['import_random'] = 'import random';
  var varName = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_ADDITIVE) || 'mylist';
  var code='random.choice(' +varName + ')';
  return [code,Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.lists_get_random_sublist = function() {
  Blockly.Python.definitions_['import_random'] = 'import random';
  var varName = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_ADDITIVE) || 'mylist';
  var VALUE = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code='random.sample(' +varName + ',' + VALUE + ')';
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.lists_insert_value = function(){
  var varName = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_ASSIGNMENT) || '0';
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
  var varName = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_ASSIGNMENT) || '0';
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
  var varName = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_ADDITIVE) || 'mylist';
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
  Blockly.Python.definitions_['import_mixpy_math_mean'] = "from mixpy import math_mean";
  c = 'math_mean(' + a + ')';
  break;
case 'MEDIAN':
  Blockly.Python.definitions_['import_mixpy_math_median'] = "from mixpy import math_median";
  c = 'math_median(' + a + ')';
  break;
case 'MODE':
  Blockly.Python.definitions_['import_mixpy_math_modes'] = "from mixpy import math_modes";
  c = 'math_modes(' + a + ')';
  break;
case 'STD_DEV':
  Blockly.Python.definitions_['import_mixpy_math_standard_deviation'] = "from mixpy import math_standard_deviation";
  c = 'math_standard_deviation(' + a + ')';
  break;
  default:
  throw 'Unknown operator: ' + b;
  }
  if (c)
  return [c, Blockly.Python.ORDER_ATOMIC];
  
};


Blockly.Python['lists_sort'] = function(block) {
  // Block for sorting a list.
  Blockly.Python.definitions_['import_mixpy_lists_sort'] = "from mixpy import lists_sort";
  var list = (Blockly.Python.valueToCode(block, 'LIST',
    Blockly.Python.ORDER_NONE) || '[]');
  var type = block.getFieldValue('TYPE');
  var reverse = block.getFieldValue('DIRECTION') === '1' ? 'False' : 'True';


  var code = 'lists_sort(' + list + ', "' + type + '", ' + reverse + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.lists_change_to = function(){
  var op = this.getFieldValue('OP');
  var varName = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code = '';
  if(op == 'array')
  {
    Blockly.Python.definitions_['import_numpy'] = 'import numpy';
    code = 'numpy.array('+varName+')';
  }
  else
  {
    code = op + '(' + varName + ')';
  }
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

Blockly.Python.lists_zip = function() {    
  var dropdown_type = this.getFieldValue('TYPE');  
  var code = new Array(this.itemCount_);
  var default_value = '[]';
  for (var n = 0; n < this.itemCount_; n++) {
     code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
    Blockly.Python.ORDER_NONE) || default_value;
  }
  var code = 'zip(' + code.join(', ') + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.list_tolist = function() {  
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '0'
  return ['list('+str+')', Blockly.Python.ORDER_ATOMIC];
};