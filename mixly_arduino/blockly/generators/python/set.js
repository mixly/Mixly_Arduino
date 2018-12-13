'use strict';

goog.provide('Blockly.Python.set');
goog.require('Blockly.Python');

Blockly.Python.set_create_with = function() {
  
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  
  var code = new Array(this.itemCount_);
  var default_value = '0';


  for (var n = 0; n < this.itemCount_; n++) {

  code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
    Blockly.Python.ORDER_NONE) || default_value;
  }
  //Blockly.Python.definitions_['var_declare'+varName] = varName+'= '+ '{' + code.join(', ') + '}\n';
  code = varName+'= '+ '{' + code.join(', ') + '}\n';
  if (this.itemCount_==0) {code = varName+' = '+'set()\n'}
  return code;
};

Blockly.Python.set_length = function() {
  var varName = Blockly.Python.valueToCode(this, 'SET', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code='len(' +varName + ')';
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.set_get_remove_last = function(){
  var varName = Blockly.Python.valueToCode(this, 'SET', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.pop()';
  return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.set_clear = function() {
  var varName = Blockly.Python.valueToCode(this, 'SET', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName+'.clear()\n';
  return code;
};

Blockly.Python.set_operate = function() {
  var vars1 = Blockly.Python.valueToCode(this, 'SET1', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var vars2 = Blockly.Python.valueToCode(this, 'SET2', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var operate = this.getFieldValue('OPERATE');
  //var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=vars1+"." + operate+"(" +vars2+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.set_operate_update = function() {
  var vars1 = Blockly.Python.valueToCode(this, 'SET1', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var vars2 = Blockly.Python.valueToCode(this, 'SET2', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var operate = this.getFieldValue('OPERATE');
  //var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=vars1+"." + operate+"(" +vars2+')\n';
  return code;
};

Blockly.Python.set_add_discard = function() {
  var vars1 = Blockly.Python.valueToCode(this, 'SET', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var operate = this.getFieldValue('OPERATE');
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=vars1+"." + operate+"(" +argument+')\n';
  return code;
};

Blockly.Python.set_sub = function() {
  var vars1 = Blockly.Python.valueToCode(this, 'SET1', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var vars2 = Blockly.Python.valueToCode(this, 'SET2', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var operate = this.getFieldValue('OPERATE');
  //var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=vars1+"." + operate+"(" +vars2+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.set_update = function(block) {

  var varName = Blockly.Python.valueToCode(this, 'SET', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var color =  Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  //var color = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName+"." + 'update' + '(' + color + ')\n';
  return code;
};

// Blockly.Python.set_change_to = function(){
//   var op = this.getFieldValue('OP');
//   var varName = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
//   var code = op + '(' + varName + ')\n';
//   return [code, Blockly.Python.ORDER_ATOMIC];
// }