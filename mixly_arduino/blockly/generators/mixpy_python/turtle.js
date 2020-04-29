'use strict';

goog.provide('Blockly.Python.turtle');
goog.require('Blockly.Python');

Blockly.Python.turtle_create = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  
  //Blockly.Python.definitions_['var_declare'+varName] = varName+'= '+ 'turtle.Turtle()\n';
  var code=varName+' = '+ 'turtle.Turtle()\n';
  return code;
 // return '';
};

Blockly.Python.turtle_done = function(){
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var code='turtle.done()\n';
  return code;
};

Blockly.Python.turtle_exitonclick = function(){
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var code='turtle.exitonclick()\n';
  return code;
};


Blockly.Python.turtle_move = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
    var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
    var direction = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varName+"." + direction + "(" +  num  + ')\n';
  return code;
};

Blockly.Python.turtle_rotate = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var direction = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varName+"." + direction + "(" +  num  + ')\n';
  return code;
};

Blockly.Python.turtle_setheading = function(){
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.setheading('  + argument + ')\n';
  return code;
};

Blockly.Python.turtle_screen_delay = function(){
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.screen.delay('  + argument + ')\n';
  return code;
};

Blockly.Python.turtle_goto = function(){
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var xnum = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var ynum = Blockly.Python.valueToCode(this, 'val', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.goto('  + xnum +','+ynum + ')\n';
  return code;
};


Blockly.Python.turtle_pos_shape = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var get = this.getFieldValue('DIR');
  var code=varName + '.' + get + '()';  
  return [code,Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.turtle_clear = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var clear = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varName+"." + clear + "("   + ')\n';
  return code;
};

Blockly.Python.turtle_penup = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var penup = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varName+"." + penup + "("   + ')\n';
  return code;
};

Blockly.Python.turtle_fill = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var penup = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varName+"." + penup + "_fill("   + ')\n';
  return code;
};

Blockly.Python.turtle_size_speed = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = this.getFieldValue('TUR');
  var size = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varName+"." + size + "(" +  num  + ')\n';
  return code;
};

Blockly.Python.turtle_size = function(){
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.pensize('  + argument + ')\n';
  return code;
};


Blockly.Python.turtle_speed = function(){
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.speed('  + argument + ')\n';
  return code;
};

Blockly.Python.turtle_circle = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var circle = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varName+"." + circle + "(" +  num + ')\n';
  return code;
};

Blockly.Python.turtle_setxy = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var xy = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varName+".set" + xy + "(" +  num + ')\n';
  return code;
};

Blockly.Python.turtle_circle_advanced = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';  
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varName+".circle (" +  num  +','+ argument+ ')\n';
  return code;
};


Blockly.Python.turtle_visible = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var visible = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=varName+"." + visible + "("   + ')\n';
  return code;
};

Blockly.Python.turtle_bgcolor = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var color = this.getFieldValue('FIELDNAME');
  var code="turtle." + 'bgcolor' + '("' + color + '")\n';
  return code;
};

Blockly.Python.turtle_pencolor = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var color = this.getFieldValue('FIELDNAME');
  var code=varName+"." + 'pencolor' + '("' + color + '")\n';
  return code;
};

Blockly.Python.turtle_fillcolor = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var color = this.getFieldValue('FIELDNAME');
  var code=varName+"." + 'fillcolor' + '("' + color + '")\n';
  return code;
};


Blockly.Python.turtle_clone = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.clone()';
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.turtle_bgcolor_hex = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var color =  Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  var code="turtle." + 'bgcolor' + '(' + color + ')\n';
  return code;
};

Blockly.Python.turtle_pencolor_hex = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var color =  Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  //var color = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName+"." + 'pencolor' + '(' + color + ')\n';
  return code;
};

Blockly.Python.turtle_fillcolor_hex = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var color =  Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  var code=varName+"." + 'fillcolor' + '(' + color + ')\n';
  return code;
};

Blockly.Python.turtle_bgcolor_hex_new = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var color =  Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  var code="turtle." + 'bgcolor' + '(' + color + ')\n';
  return code;
};

Blockly.Python.turtle_pencolor_hex_new = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var color =  Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  //var color = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName+"." + 'pencolor' + '(' + color + ')\n';
  return code;
};

Blockly.Python.turtle_fillcolor_hex_new = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var color =  Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  var code=varName+"." + 'fillcolor' + '(' + color + ')\n';
  return code;
};

Blockly.Python.turtle_color_hex = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var color1 =  Blockly.Python.valueToCode(this, 'VAR1', Blockly.Python.ORDER_ATOMIC) ;
  var color2 =  Blockly.Python.valueToCode(this, 'VAR2', Blockly.Python.ORDER_ATOMIC) ;
  var code = varName+"." + 'color' + '(' + color1 + ',' + color2 + ')\n';
  return code;
};

Blockly.Python.turtle_color = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var color1 = this.getFieldValue('FIELDNAME');
  var color2 = this.getFieldValue('FIELDNAME2');
  var code=varName+"." + 'color' + '("' + color1 + '","' + color2 + '")\n';
  return code;
};

Blockly.Python.turtle_shape = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
    var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
    var direction = this.getFieldValue('DIR');
  
  var code=varName+".shape('"  + direction + "')\n";
  return code;
};

Blockly.Python.turtle_shapesize = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';  
  var argument1 = Blockly.Python.valueToCode(this, 'WID', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var argument2 = Blockly.Python.valueToCode(this, 'LEN', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var argument3 = Blockly.Python.valueToCode(this, 'OUTLINE', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName+".shapesize(" +  argument1  +','+ argument2+ ','+ argument3+')\n';
  return code;
};

Blockly.Python.turtle_textinput = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";  
  var title =  Blockly.Python.valueToCode(this, 'TITLE', Blockly.Python.ORDER_ATOMIC) ;
  var prompt =  Blockly.Python.valueToCode(this, 'PROMPT', Blockly.Python.ORDER_ATOMIC) ;  
  var code="turtle.textinput" + '(' + title + ',' + prompt + ')';
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.turtle_numinput = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";  
  var title =  Blockly.Python.valueToCode(this, 'TITLE', Blockly.Python.ORDER_ATOMIC) ;
  var prompt =  Blockly.Python.valueToCode(this, 'PROMPT', Blockly.Python.ORDER_ATOMIC) ;  
  var data = Blockly.Python.valueToCode(this, 'DEFAULT', Blockly.Python.ORDER_ATOMIC);
  var min = Blockly.Python.valueToCode(this, 'MIN', Blockly.Python.ORDER_ATOMIC);
  var max = Blockly.Python.valueToCode(this, 'MAX', Blockly.Python.ORDER_ATOMIC);
  var code="turtle.numinput" + '(' + title + ',' + prompt + "," + data + ',minval = ' + min + ',maxval = ' + max +')';
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.turtle_write = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var write =  Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  //var color = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName+"." + 'write' + '(' + write + ')\n';
  return code;
};

Blockly.Python.turtle_write_format = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var move = this.getFieldValue('MOVE');
  var align = this.getFieldValue('ALIGN');
  var fontname =  Blockly.Python.valueToCode(this, 'FONTNAME', Blockly.Python.ORDER_ATOMIC) ;
  var fontnum = Blockly.Python.valueToCode(this, 'FONTNUM', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var fonttype = this.getFieldValue('FONTTYPE');
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var write =  Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  var code=varName+"." + 'write' + '(' + write + ',' + move + ',align="' + align + '",font=(' + fontname + ',' + fontnum + ',"' + fonttype + '"))\n';
  return code;
};

Blockly.Python.turtle_write_format_skulpt = function(block) {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var move = this.getFieldValue('MOVE');
  var align = this.getFieldValue('ALIGN');
  var fontname =  Blockly.Python.valueToCode(this, 'FONTNAME', Blockly.Python.ORDER_ATOMIC) ;
  var fontnum = Blockly.Python.valueToCode(this, 'FONTNUM', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var fonttype = this.getFieldValue('FONTTYPE');
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var write =  Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  var code=varName+"." + 'write' + '(' + write + ',' + move + ',align="' + align + '",font=(' + fontname + ',' + fontnum + ',"' + fonttype + '"))\n';
  return code;
};


Blockly.Python.turtle_color_seclet = function() {
  var colour = this.getFieldValue('COLOR');
  var code = '"' + colour +'"'
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.turtle_getscreen = function() {
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var turName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var code=varName+' = '+ turName +'.getscreen()\n';
  return code;
};

Blockly.Python.turtle_onkey = function () {
   Blockly.Python.definitions_.import_turtle = "import turtle";
   var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
    var v = Blockly.Python.valueToCode(this, "VAR", Blockly.Python.ORDER_NONE) || "None";
    var callback = Blockly.Python.valueToCode(this, "callback", Blockly.Python.ORDER_NONE) || "None";
    var code = varName + ".onkey("+ callback +", "+ v +")\n";
    return code;
};

Blockly.Python.turtle_onclick = function () {
   Blockly.Python.definitions_.import_turtle = "import turtle";
   var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
    var callback = Blockly.Python.valueToCode(this, "callback", Blockly.Python.ORDER_NONE) || "None";
    var code = varName + ".onclick("+ callback +")\n";
    return code;
};

Blockly.Python.turtle_ontimer = function () {
   Blockly.Python.definitions_.import_turtle = "import turtle";
   var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
    var v = Blockly.Python.valueToCode(this, "VAR", Blockly.Python.ORDER_NONE) || "None";
    var callback = Blockly.Python.valueToCode(this, "callback", Blockly.Python.ORDER_NONE) || "None";
    var code = varName + ".ontimer("+ callback +", "+ v +")\n";
    return code;
};

Blockly.Python.turtle_listen = function(){
  Blockly.Python.definitions_.import_turtle = "import turtle";
  var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.listen()\n';
  return code;
};

Blockly.Python.turtle_screen_savefig = function () {
    Blockly.Python.definitions_.import_turtle = "import turtle";
    var varName = Blockly.Python.valueToCode(this, 'TUR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
    var file = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var code = varName + ".getcanvas().postscript(file="+file+")\n";
    return code;
};
