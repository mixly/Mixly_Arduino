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

Blockly.Python.pl_axes = function(){
  Blockly.Python.definitions_.import_pylab = "import pylab";
  var code='pylab.axes(aspect=1)\n';
  return code;
};

Blockly.Python.pl_plot_easy = function(){
  Blockly.Python.definitions_.import_pylab = "import pylab";
  var varName = Blockly.Python.valueToCode(this, 'SER', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code='pylab.plot(' + varName + ")\n";
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
  Blockly.Python.definitions_.import_matplotlib_font_manager = "import matplotlib.font_manager";
  var code='pylab.legend(' + 'prop=matplotlib.font_manager.FontProperties("'+ "STSong"+'")' + ')\n';
  return code;
};

Blockly.Python.pl_title = function(){
  Blockly.Python.definitions_.import_pylab = "import pylab";
  var a =  Blockly.Python.valueToCode(this, 'TITLE', Blockly.Python.ORDER_ATOMIC);
  var code='pylab.title(' + a +  ', fontproperties = "' + "STSong" +'")\n';
  return code;
};

Blockly.Python.pl_label = function(){
  Blockly.Python.definitions_.import_pylab = "import pylab";
  var direction = this.getFieldValue('DIR');
  var a =  Blockly.Python.valueToCode(this, 'LABEL', Blockly.Python.ORDER_ATOMIC) ;
  var code='pylab.' + direction + 'label(' + a + ', fontproperties = "' + "STSong" + '")\n';
  return code;
};


Blockly.Python.array_create = function () {
    Blockly.Python.definitions_.import_numpy = "import numpy";
    var from = Blockly.Python.valueToCode(this, "FROM", Blockly.Python.ORDER_NONE) || "0";
    var end = Blockly.Python.valueToCode(this, "TO", Blockly.Python.ORDER_NONE) || "0";
    var step = Blockly.Python.valueToCode(this, "STEP", Blockly.Python.ORDER_NONE) || "1";
    var code = "numpy.arange(" + from + ", " + end + ", " + step + ")";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.pl_plot_bar = function() {
  Blockly.Python.definitions_.import_pylab = "import pylab";
  var direction = this.getFieldValue('DIR');
  var a = Blockly.Python.valueToCode(this, 'A',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var b = Blockly.Python.valueToCode(this, 'B',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var code='pylab.' + direction + '(' + a +','+ b + ")\n";
  return code ;
};

Blockly.Python.pl_plot_scatter = function() {
  Blockly.Python.definitions_.import_pylab = "import pylab";
  var a = Blockly.Python.valueToCode(this, 'A',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var b = Blockly.Python.valueToCode(this, 'B',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var s = Blockly.Python.valueToCode(this, 'S',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var color = this.getFieldValue('COLOR');
  var dot = this.getFieldValue('DOT');
  var tag =  Blockly.Python.valueToCode(this, 'TAG', Blockly.Python.ORDER_ATOMIC)||'\'\'';
  var code='pylab.scatter(' + a +','+ b +  ",s=" + s + ",c='" + color + "',marker='"+dot+"',label=" + tag + ")\n";
  return code ;
};

Blockly.Python.pl_plot_xy = function() {
  Blockly.Python.definitions_.import_pylab = "import pylab";
  var a = Blockly.Python.valueToCode(this, 'A',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var b = Blockly.Python.valueToCode(this, 'B',Blockly.Python.ORDER_ATOMIC) || '\'\'';
   var line = this.getFieldValue('LINE');
  var color = this.getFieldValue('COLOR');
  var dot = this.getFieldValue('DOT');
  var tag =  Blockly.Python.valueToCode(this, 'TAG', Blockly.Python.ORDER_ATOMIC)||'\'\'';
  var code='pylab.plot(' + a +','+ b +  ",'" + dot + line  + color + "'" + ',label='+ tag +")\n";
  return code ;
};

Blockly.Python.pl_bar = function() {
  Blockly.Python.definitions_.import_pylab = "import pylab";
  var a = Blockly.Python.valueToCode(this, 'A',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var b = Blockly.Python.valueToCode(this, 'B',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var tag =  Blockly.Python.valueToCode(this, 'TAG', Blockly.Python.ORDER_ATOMIC)||'\'\'';
  var width = Blockly.Python.valueToCode(this, 'WIDTH', Blockly.Python.ORDER_RELATIONAL) || '0';
  var color = this.getFieldValue('COLOR')
  var align = this.getFieldValue('ALIGN');
  var code='pylab.bar(' + a +','+ b + ',align="'+ align +'",color="'+ color +'",width='+ width+',label='+ tag +  ")\n";
  return code ;
};

Blockly.Python.pl_pie = function() {
  Blockly.Python.definitions_.import_pylab = "import pylab";
  var a = Blockly.Python.valueToCode(this, 'A',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var b = Blockly.Python.valueToCode(this, 'B',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var explode = Blockly.Python.valueToCode(this, 'EXPLODE',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var shadow = this.getFieldValue('SHADOW');
  var autopct = this.getFieldValue('autopct');
  if(autopct!='None'){autopct="'"+autopct+"'"}
  var code='pylab.pie(' + a + ',explode=' + explode + ',labels=' + b + ',autopct=' + autopct +  ',shadow=' + shadow + ")\n";
  return code ;
};

Blockly.Python.pl_hist = function() {
  Blockly.Python.definitions_.import_pylab = "import pylab";
  var a = Blockly.Python.valueToCode(this, 'A',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var b = Blockly.Python.valueToCode(this, 'B',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var code='pylab.hist('  + a +','+ b + ")\n";
  return code ;
};


Blockly.Python.pl_ticks = function() {
  Blockly.Python.definitions_.import_pylab = "import pylab";
  var direction = this.getFieldValue('DIR');
  var a = Blockly.Python.valueToCode(this, 'A',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var b = Blockly.Python.valueToCode(this, 'B',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var code='pylab.' + direction + 'ticks(' + a +','+ b  + ",fontproperties = '" + "STSong" + "')\n";
  return code ;
};

Blockly.Python.numpy_trig = function() {
  Blockly.Python.definitions_.import_numpy = "import numpy";
  var argument0 = Blockly.Python.valueToCode(this, 'NUM',Blockly.Python.ORDER_NONE) || '0';
  var operator = this.getFieldValue('OP');
  var code = "";
  
    code= "numpy." + operator+'('+argument0+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.pl_subplot = function () {
    Blockly.Python.definitions_.import_numpy = "import numpy";
    var from = Blockly.Python.valueToCode(this, "VET", Blockly.Python.ORDER_NONE) || "0";
    var end = Blockly.Python.valueToCode(this, "HOR", Blockly.Python.ORDER_NONE) || "0";
    var step = Blockly.Python.valueToCode(this, "NUM", Blockly.Python.ORDER_NONE) || "0";
    var code = "pylab.subplot(" + from + ", " + end + ", " + step + ")\n";
    return code
};

Blockly.Python['pandas_readcsv'] = function(block) {
  // For each loop.
  Blockly.Python.definitions_.import_pandas = "import pandas";
  var fn = Blockly.Python.valueToCode(this, 'FILENAME', Blockly.Python.ORDER_ATOMIC);
  var mode = this.getFieldValue('MODE');
  var code = 'pandas.read_csv(' + fn + ', header=' + mode +')\n';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.dataframe_get = function() {
  var mode = this.getFieldValue('MODE');
  var varName = Blockly.Python.valueToCode(this, 'DICT', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var text = Blockly.Python.valueToCode(this, 'KEY', Blockly.Python.ORDER_ASSIGNMENT);
  if(mode=="column"){
  var code = varName+"[" + text + "]";}
  else if(mode=='raw'){
    var code = varName+".loc[" + text + "]";
  }
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.pl_savefig = function () {
    Blockly.Python.definitions_.import_pylab = "import pylab";
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var code = "pylab.savefig("+file+")\n";
    return code;
};

Blockly.Python.pl_text = function () {
    Blockly.Python.definitions_.import_numpy = "import numpy";
    var from = Blockly.Python.valueToCode(this, "VET", Blockly.Python.ORDER_NONE) || "0";
    var end = Blockly.Python.valueToCode(this, "HOR", Blockly.Python.ORDER_NONE) || "0";
    var step = Blockly.Python.valueToCode(this, "NUM", Blockly.Python.ORDER_NONE) || "0";
    var halign = this.getFieldValue('HALIGN');
    var valign = this.getFieldValue('VALIGN');
    var fontnum = Blockly.Python.valueToCode(this, 'FONTNUM', Blockly.Python.ORDER_ASSIGNMENT) || '0';
    var code = "pylab.text(" + from + ", " + end + ", " + step +  ", ha='" + halign + "', va='" + valign + "', fontsize=" + fontnum +")\n";
    return code
};

Blockly.Python.array_toarray = function() {  
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '0';
  Blockly.Python.definitions_['import_numpy'] = 'import numpy';
  var code = 'numpy.array('+str+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};






Blockly.Python.plot_show = function(){
  Blockly.Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
  var code='matplotlib.pyplot.show()\n';
  return code;
};

Blockly.Python.plot_axes = function(){
  Blockly.Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
  var code='matplotlib.pyplot.axes(aspect=1)\n';
  return code;
};

Blockly.Python.plot_plot_easy = function(){
  Blockly.Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
  var varName = Blockly.Python.valueToCode(this, 'SER', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code='matplotlib.pyplot.plot(' + varName + ")\n";
  return code;
};

Blockly.Python.plot_plot = function(){
  Blockly.Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
  var line = this.getFieldValue('LINE');
  var color = this.getFieldValue('COLOR');
  var dot = this.getFieldValue('DOT');
  var varName = Blockly.Python.valueToCode(this, 'SER', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code='matplotlib.pyplot.plot(' + varName + ",'" + dot + line  + color + "')\n";
  return code;
};

Blockly.Python.plot_legend = function(){
  Blockly.Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
  Blockly.Python.definitions_.import_matplotlib_font_manager = "import matplotlib.font_manager";
  var code='matplotlib.pyplot.legend(' + 'prop=matplotlib.font_manager.FontProperties("'+ "STSong"+'")' + ')\n';
  return code;
};

Blockly.Python.plot_title = function(){
  Blockly.Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
  var a =  Blockly.Python.valueToCode(this, 'TITLE', Blockly.Python.ORDER_ATOMIC);
  var code='matplotlib.pyplot.title(' + a +  ', fontproperties = "' + "STSong" +'")\n';
  return code;
};

Blockly.Python.plot_label = function(){
  Blockly.Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
  var direction = this.getFieldValue('DIR');
  var a =  Blockly.Python.valueToCode(this, 'LABEL', Blockly.Python.ORDER_ATOMIC) ;
  var code='matplotlib.pyplot.' + direction + 'label(' + a + ', fontproperties = "' + "STSong" + '")\n';
  return code;
};

Blockly.Python.plot_plot_bar = function() {
  Blockly.Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
  var direction = this.getFieldValue('DIR');
  var a = Blockly.Python.valueToCode(this, 'A',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var b = Blockly.Python.valueToCode(this, 'B',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var code='matplotlib.pyplot.' + direction + '(' + a +','+ b + ")\n";
  return code ;
};

Blockly.Python.plot_plot_scatter = function() {
  Blockly.Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
  var a = Blockly.Python.valueToCode(this, 'A',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var b = Blockly.Python.valueToCode(this, 'B',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var s = Blockly.Python.valueToCode(this, 'S',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var color = this.getFieldValue('COLOR');
  var dot = this.getFieldValue('DOT');
  var tag =  Blockly.Python.valueToCode(this, 'TAG', Blockly.Python.ORDER_ATOMIC)||'\'\'';
  var code='matplotlib.pyplot.scatter(' + a +','+ b +  ",s=" + s + ",c='" + color + "',marker='"+dot+"',label=" + tag + ")\n";
  return code ;
};

Blockly.Python.plot_plot_xy = function() {
  Blockly.Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
  var a = Blockly.Python.valueToCode(this, 'A',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var b = Blockly.Python.valueToCode(this, 'B',Blockly.Python.ORDER_ATOMIC) || '\'\'';
   var line = this.getFieldValue('LINE');
  var color = this.getFieldValue('COLOR');
  var dot = this.getFieldValue('DOT');
  var tag =  Blockly.Python.valueToCode(this, 'TAG', Blockly.Python.ORDER_ATOMIC)||'\'\'';
  var code='matplotlib.pyplot.plot(' + a +','+ b +  ",'" + dot + line  + color + "'" + ',label='+ tag +")\n";
  return code ;
};

Blockly.Python.plot_bar = function() {
  Blockly.Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
  var a = Blockly.Python.valueToCode(this, 'A',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var b = Blockly.Python.valueToCode(this, 'B',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var tag =  Blockly.Python.valueToCode(this, 'TAG', Blockly.Python.ORDER_ATOMIC)||'\'\'';
  var width = Blockly.Python.valueToCode(this, 'WIDTH', Blockly.Python.ORDER_RELATIONAL) || '0';
  var color = this.getFieldValue('COLOR')
  var align = this.getFieldValue('ALIGN');
  var code='matplotlib.pyplot.bar(' + a +','+ b + ',align="'+ align +'",color="'+ color +'",width='+ width+',label='+ tag +  ")\n";
  return code ;
};

Blockly.Python.plot_pie = function() {
  Blockly.Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
  var a = Blockly.Python.valueToCode(this, 'A',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var b = Blockly.Python.valueToCode(this, 'B',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var explode = Blockly.Python.valueToCode(this, 'EXPLODE',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var shadow = this.getFieldValue('SHADOW');
  var autopct = this.getFieldValue('autopct');
  if(autopct!='None'){autopct="'"+autopct+"'"}
  var code='matplotlib.pyplot.pie(' + a + ',explode=' + explode + ',labels=' + b + ',autopct=' + autopct +  ',shadow=' + shadow + ")\n";
  return code ;
};

Blockly.Python.plot_hist = function() {
  Blockly.Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
  var a = Blockly.Python.valueToCode(this, 'A',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var b = Blockly.Python.valueToCode(this, 'B',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var code='matplotlib.pyplot.hist('  + a +','+ b + ")\n";
  return code ;
};


Blockly.Python.plot_ticks = function() {
  Blockly.Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
  var direction = this.getFieldValue('DIR');
  var a = Blockly.Python.valueToCode(this, 'A',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var b = Blockly.Python.valueToCode(this, 'B',Blockly.Python.ORDER_ATOMIC) || '\'\'';
  var code='matplotlib.pyplot.' + direction + 'ticks(' + a +','+ b  + ",fontproperties = '" + "STSong" + "')\n";
  return code ;
};

Blockly.Python.plot_subplot = function () {
    Blockly.Python.definitions_.import_numpy = "import numpy";
    Blockly.Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var from = Blockly.Python.valueToCode(this, "VET", Blockly.Python.ORDER_NONE) || "0";
    var end = Blockly.Python.valueToCode(this, "HOR", Blockly.Python.ORDER_NONE) || "0";
    var step = Blockly.Python.valueToCode(this, "NUM", Blockly.Python.ORDER_NONE) || "0";
    var code = "matplotlib.pyplot.subplot(" + from + ", " + end + ", " + step + ")\n";
    return code
};

Blockly.Python.plot_savefig = function () {
    Blockly.Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var code = "matplotlib.pyplot.savefig("+file+")\n";
    return code;
};

Blockly.Python.plot_text = function () {
    Blockly.Python.definitions_.import_numpy = "import numpy";
    Blockly.Python.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var from = Blockly.Python.valueToCode(this, "VET", Blockly.Python.ORDER_NONE) || "0";
    var end = Blockly.Python.valueToCode(this, "HOR", Blockly.Python.ORDER_NONE) || "0";
    var step = Blockly.Python.valueToCode(this, "NUM", Blockly.Python.ORDER_NONE) || "0";
    var halign = this.getFieldValue('HALIGN');
    var valign = this.getFieldValue('VALIGN');
    var fontnum = Blockly.Python.valueToCode(this, 'FONTNUM', Blockly.Python.ORDER_ASSIGNMENT) || '0';
    var code = "matplotlib.pyplot.text(" + from + ", " + end + ", " + step +  ", ha='" + halign + "', va='" + valign + "', fontsize=" + fontnum +")\n";
    return code
};
