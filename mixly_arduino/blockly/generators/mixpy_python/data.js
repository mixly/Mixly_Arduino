'use strict';

goog.provide('Blockly.Python.data');

goog.require('Blockly.Python');


Blockly.Python.series_create = function() {
  Blockly.Python.definitions_.import_pandas = "import pandas";
  var dropdown_type = this.getFieldValue('TYPE');
  var varName1 = Blockly.Python.valueToCode(this, 'SER', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var code=varName+' = ' + 'pandas.Series(' + varName1 + ')\n';
  return code;
 
};

Blockly.Python.series_create_from_index = function() {
  Blockly.Python.definitions_.import_pandas = "import pandas";
  var dropdown_type = this.getFieldValue('TYPE');
  var varName1 = Blockly.Python.valueToCode(this, 'SER', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var varName2 = Blockly.Python.valueToCode(this, 'INDEX',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var code=varName+' = ' + 'pandas.Series('  + varName1 + ','  + 'index=' + varName2 + ')\n';
  return code;
 
};

Blockly.Python.dataframe_create = function() {
  Blockly.Python.definitions_.import_pandas = "import pandas";
  var dropdown_type = this.getFieldValue('TYPE');
  var varName1 = Blockly.Python.valueToCode(this, 'SER', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var code=varName+' = ' + 'pandas.DataFrame(' + varName1 + ')\n';
  return code;
 
};

Blockly.Python.dataframe_create_from_index = function() {
  Blockly.Python.definitions_.import_pandas = "import pandas";
  var dropdown_type = this.getFieldValue('TYPE');
  var varName1 = Blockly.Python.valueToCode(this, 'SER', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var varName2 = Blockly.Python.valueToCode(this, 'INDEX_COLUMN',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var varName3 = Blockly.Python.valueToCode(this, 'INDEX_RAW',Blockly.Python.ORDER_ATOMIC) || '\'\'';  
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var code=varName+' = ' + 'pandas.DataFrame('  + varName1 + ','  + 'columns=' + varName2 + ',index=' + varName3 + ')\n';
  return code;
 
};

Blockly.Python.dataframe_create_from_one_index = function() {
  Blockly.Python.definitions_.import_pandas = "import pandas";
  var dropdown_type = this.getFieldValue('TYPE');
  var name = this.getFieldValue('COLUMN_RAW');
  var varName1 = Blockly.Python.valueToCode(this, 'SER', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var varName2 = Blockly.Python.valueToCode(this, 'INDEX',Blockly.Python.ORDER_ATOMIC) || '\'\'';  
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var code=varName+' = ' + 'pandas.DataFrame('  + varName1 + ','  + name + '=' + varName2  + ')\n';
  return code;
 
};

Blockly.Python.series_create_from_text = function() {
  Blockly.Python.definitions_.import_pandas = "import pandas";
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  
  var text=this.getFieldValue('TEXT');  
  var code = varName+' = '+ 'pandas.Series([' + text + '])\n';
  return code;
};

Blockly.Python.series_index_value = function() {
  Blockly.Python.definitions_.import_pandas = "import pandas";
  var varName = Blockly.Python.valueToCode(this, 'SERIES', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var name = this.getFieldValue('INDEX_VALUE');
  var code=varName+'.'+name;
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.series_get_num = function() {
  // Indexing into a list is the same as indexing into a string.
  var varName = Blockly.Python.valueToCode(this, 'SER', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var argument0 = Blockly.Python.valueToCode(this, 'AT',
    Blockly.Python.ORDER_ADDITIVE) || '1';
  
  var code=varName+'['+argument0+']';
  return [code,Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.pl_show = function(){
  Blockly.Python.definitions_.import_pylab = "import pylab";
  var code='pylab.show()\n';
  return code;
};

Blockly.Python.pl_plot = function(){
  Blockly.Python.definitions_.import_pylab = "import pylab";
  var line = this.getFieldValue('LINE');
  var color = this.getFieldValue('COLOR');
  var dot = this.getFieldValue('DOT');
  var varName = Blockly.Python.valueToCode(this, 'SER', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code='pylab.plot(' + varName + ",'" + dot + line  + color + "')\n";
  return code;
};

Blockly.Python.pl_legend = function(){
  Blockly.Python.definitions_.import_pylab = "import pylab";
  var code='pylab.legend()\n';
  return code;
};

Blockly.Python.pl_title = function(){
  Blockly.Python.definitions_.import_pylab = "import pylab";
  var a =  Blockly.Python.valueToCode(this, 'TITLE', Blockly.Python.ORDER_ATOMIC);
  var code='pylab.title(' + a + ')\n';
  return code;
};

Blockly.Python.pl_label = function(){
  Blockly.Python.definitions_.import_pylab = "import pylab";
  var direction = this.getFieldValue('DIR');
  var a =  Blockly.Python.valueToCode(this, 'LABEL', Blockly.Python.ORDER_ATOMIC) ;
  var code='pylab.' + direction + 'label(' + a + ')\n';
  return code;
};


