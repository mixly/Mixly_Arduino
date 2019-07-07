'use strict';

goog.provide('Blockly.Python.DS');

goog.require('Blockly.Python');


Blockly.Python.ds_create_linkedlist = function() {
  // Create a list with any number of elements of any type.
  //var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var typeName = Blockly.Python.variableDB_.getName(this.getFieldValue('TYPE'),
    Blockly.Variables.NAME_TYPE);
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  var code = 'class ' + typeName + ":\n";
  code += '    def __init__(self):\n';
  var attr = new Array(this.itemCount_);
  var default_value = '0';
  for (var n = 0; n < this.itemCount_; n++) {

  var keyName = this.getFieldValue('KEY' + n);
    
  attr[n] = '        self.' + keyName+" = "+(Blockly.Python.valueToCode(this, 'ADD' + n, Blockly.Python.ORDER_NONE) || default_value);
  }
  code +=  attr.join('\n') + '\n';
  code += '        self.next = None\n';
  code += varName + ' = ' + typeName + '()\n'
  return code;
};

Blockly.Python.ds_create_node = function() {
  var varName = Blockly.Python.valueToCode(this, 'NODE', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var typeName = Blockly.Python.variableDB_.getName(this.getFieldValue('TYPE'),
    Blockly.Variables.NAME_TYPE);
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  
  var code = varName+' = ' + typeName + '()\n';
  return code;
};

Blockly.Python.ds_get_node_attr = function() {
  var varName = Blockly.Python.valueToCode(this, 'NODE', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var typeName = Blockly.Python.variableDB_.getName(this.getFieldValue('TYPE'),
    Blockly.Variables.NAME_TYPE);
  var code = varName+'.' + typeName;
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.ds_set_node_attr = function() {
  var varName = Blockly.Python.valueToCode(this, 'NODE', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var typeName = Blockly.Python.variableDB_.getName(this.getFieldValue('TYPE'),
    Blockly.Variables.NAME_TYPE);
  var argument = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code = varName+'.' + typeName + ' = ' + argument + '\n';
  return code;
};

Blockly.Python.ds_add_node_by_name = function() {
  var varName = Blockly.Python.valueToCode(this, 'NODE', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var varName2 = Blockly.Python.valueToCode(this, 'NODE2', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var varName3 = Blockly.Python.valueToCode(this, 'NODE3', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var direction = this.getFieldValue('DIR');
  if(direction=='after'){
    var code = 'now = ' + varName + '\n';
    code += 'while now != ' + varName2 + ' and now != None:\n';
    code += '    now = now.next\n';
    code += 'if now != None:\n'
    code += '    ' + varName3 + '.next = now.next\n';
    code += '    ' + 'now.next = ' + varName3 + '\n';
    code += '    print("插入节点成功")\n';
    code += 'else:\n'
    code += '    print("插入节点失败，未找到指定名称的节点")\n';
  }
  if(direction=='before'){
    var code = 'if ' + varName + ' == ' + varName2 +':\n';
    code += '    ' + varName3 + '.next = ' + varName + '\n'; 
    code += 'else:\n' 
    code += '    now = ' + varName + '\n';
    code += '    while now.next != ' + varName2 + " and now.next != None:\n";
    code += '        now = now.next\n';
    code += '    if now != None:\n'
    code += '        ' + varName3 + '.next = now.next\n';
    code += '        now.next = ' + varName3 + '\n';
    code += '        print("插入节点成功")\n';
    code += '    else:\n'
    code += '        print("插入节点失败，未找到指定名称的节点")\n';
  }
  return code;
};

Blockly.Python.ds_add_node_by_attr = function() {
  var varName = Blockly.Python.valueToCode(this, 'NODE', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var varName2 = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var varName3 = Blockly.Python.valueToCode(this, 'NODE3', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var typeName = Blockly.Python.variableDB_.getName(this.getFieldValue('TYPE'),
    Blockly.Variables.NAME_TYPE);
  var direction = this.getFieldValue('DIR');
  if(direction=='after'){
    var code = 'now = ' + varName + '\n';
    code += 'while now.' + typeName + ' != ' + varName2 + ' and now != None:\n';
    code += '    now = now.next\n';
    code += 'if now != None:\n'
    code += '    ' + varName3 + '.next = now.next\n';
    code += '    ' + 'now.next = ' + varName3 + '\n';
    code += '    print("插入节点成功")\n';
    code += 'else:\n'
    code += '    print("插入节点失败，未找到指定的节点")\n';
  }
  if(direction=='before'){
    var code = 'if ' + varName + '.' + typeName + ' == ' + varName2 +':\n';
    code += '    ' + varName3 + '.next = ' + varName + '\n'; 
    code += 'else:\n' 
    code += '    now = ' + varName + '\n';
    code += '    while now.next.' + typeName + ' != ' + varName2 + "and now.next != None:\n";
    code += '        now = now.next\n';
    code += '    if now != None:\n'
    code += '        ' + varName3 + '.next = now.next\n';
    code += '        now.next = ' + varName3 + '\n';
    code += '        print("插入节点成功")\n';
    code += '    else:\n'
    code += '        print("插入节点失败，未找到指定的节点")\n';
  }
  return code;
};

Blockly.Python.ds_del_node_by_name = function() {
  var varName = Blockly.Python.valueToCode(this, 'NODE', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var varName2 = Blockly.Python.valueToCode(this, 'NODE2', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  
  
    var code = 'if ' + varName + ' == ' + varName2 +':\n';
    code += '    ' + varName + '.next = None\n'; 
    code += 'else:\n' 
    code += '    now = ' + varName + '\n';
    code += '    while now.next != ' + varName2 + " and now.next != None:\n";
    code += '        now = now.next\n';
    code += '    if now != None:\n'
    code += '        now.next = now.next.next\n';
    code += '        print("删除节点成功")\n';
    code += '    else:\n'
    code += '        print("删除节点失败，未找到指定名称的节点")\n';
  
  return code;
};

Blockly.Python.ds_del_node_by_attr = function() {
  var varName = Blockly.Python.valueToCode(this, 'NODE', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var varName2 = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  
  var typeName = Blockly.Python.variableDB_.getName(this.getFieldValue('TYPE'),
    Blockly.Variables.NAME_TYPE);
    
    var code = 'if ' + varName + '.' + typeName + ' == ' + varName2 +':\n';
    code += '    ' + varName + '.next = None\n'; 
    code += 'else:\n' 
    code += '    now = ' + varName + '\n';
    code += '    while now.next.' + typeName + ' != ' + varName2 + " and now.next != None:\n";
    code += '        now = now.next\n';
    code += '    if now != None:\n'
    code += '        now.next = now.next.next\n';
    code += '        print("删除节点成功")\n';
    code += '    else:\n'
    code += '        print("删除节点失败，未找到指定的节点")\n';
  
  return code;
};

Blockly.Python.ds_reverse_linkedlist = function() {
  var varName = Blockly.Python.valueToCode(this, 'NODE', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var varName2 = Blockly.Python.valueToCode(this, 'NODE2', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  
  
    var code = 'ptr = ' + varName + '\n';
    code += 'before = None\n'; 
    code += 'while ptr != None:\n' 
    code += '    last = before\n';
    code += '    before = ptr\n';
    code += '    ptr = ptr.next\n';
    code += '    before.next = last\n'
    code += varName2 + ' = before\n';
  return code;
};