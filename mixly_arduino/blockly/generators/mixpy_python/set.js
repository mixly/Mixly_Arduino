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
  Blockly.Python.definitions_['var_declare'+varName] = varName+'= '+ '{' + code.join(', ') + '}\n';
 
  return '';
};

Blockly.Python.set_create_with_lists = function(){
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '=set('  + argument + ')\n';
  return code;
};

Blockly.Python.set_length = function() {
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var code='len(' +varName + ')';
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.set_get_remove_last = function(){
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var code=varName + '.pop()';
  return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.set_clear = function() {
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  var code=varName+'.clear()\n';
  return code;
};

Blockly.Python.set_operate = function() {
  var vars1 = this.getFieldValue('S1');
  var vars2 = this.getFieldValue('S2');
  var operate = this.getFieldValue('OPERATE');
  //var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=vars1+"." + operate+"(" +vars2+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.set_operate_update = function() {
  var vars1 = this.getFieldValue('S1');
  var vars2 = this.getFieldValue('S2');
  var operate = this.getFieldValue('OPERATE');
  //var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=vars1+"." + operate+"(" +vars2+')\n';
  return code;
};

Blockly.Python.set_add_discard = function() {
  var vars1 = this.getFieldValue('S1');
  var operate = this.getFieldValue('OPERATE');
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=vars1+"." + operate+"(" +argument+')\n';
  return code;
};

Blockly.Python.set_sub = function() {
  var vars1 = this.getFieldValue('S1');
  var vars2 = this.getFieldValue('S2');
  var operate = this.getFieldValue('OPERATE');
  //var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code=vars1+"." + operate+"(" +vars2+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};