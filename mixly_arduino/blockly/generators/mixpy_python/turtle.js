'use strict';

goog.provide('Blockly.Python.turtle');
goog.require('Blockly.Python');

Blockly.Python.turtle_create = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  
  Blockly.Python.definitions_['var_declare'+varName] = varName+'= '+ 'turtle.Turtle()\n';
 // var code=varName+'= '+ 'turtle.Turtle()\n';
 // return code;
  return '';
};

Blockly.Python.turtle_move = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varname = this.getFieldValue('TUR');
  var direction = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varname+"." + direction + "(" +  num  + ')\n';
  return code;
};

Blockly.Python.turtle_rotate = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varname = this.getFieldValue('TUR');
  var direction = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varname+"." + direction + "(" +  num  + ')\n';
  return code;
};

Blockly.Python.turtle_setheading = function(){
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.setheading('  + argument + ')\n';
  return code;
};

Blockly.Python.turtle_goto = function(){
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var xnum = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var ynum = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.goto('  + xnum +','+ynum + ')\n';
  return code;
};

Blockly.Python.turtle_clear = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varname = this.getFieldValue('TUR');
  var clear = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varname+"." + clear + "("   + ')\n';
  return code;
};

Blockly.Python.turtle_penup = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varname = this.getFieldValue('TUR');
  var penup = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varname+"." + penup + "("   + ')\n';
  return code;
};

Blockly.Python.turtle_size_speed = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varname = this.getFieldValue('TUR');
  var size = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varname+"." + size + "(" +  num  + ')\n';
  return code;
};

Blockly.Python.turtle_size = function(){
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.pensize('  + argument + ')\n';
  return code;
};

Blockly.Python.turtle_speed = function(){
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.speed('  + argument + ')\n';
  return code;
};

Blockly.Python.turtle_circle = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varname = this.getFieldValue('TUR');
  var circle = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varname+"." + circle + "(" +  num  + ')\n';
  return code;
};

Blockly.Python.turtle_visible = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varname = this.getFieldValue('TUR');
  var visible = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varname+"." + visible + "("   + ')\n';
  return code;
};

Blockly.Python.turtle_bgcolor = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  //var varname = this.getFieldValue('TUR'); 
  var color = this.getFieldValue('FIELDNAME');
  var code="turtle." + 'bgcolor' + '("' + color + '")\n';
  return code;
};

Blockly.Python.turtle_pencolor = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varname = this.getFieldValue('TUR'); 
  var color = this.getFieldValue('FIELDNAME');
  var code=varname+"." + 'pencolor' + '("' + color + '")\n';
  return code;
};

Blockly.Python.turtle_fillcolor = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varname = this.getFieldValue('TUR'); 
  var color = this.getFieldValue('FIELDNAME');
  var code=varname+"." + 'fillcolor' + '("' + color + '")\n';
  return code;
};