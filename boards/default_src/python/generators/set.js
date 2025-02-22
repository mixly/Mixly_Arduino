import * as Blockly from 'blockly/core';

export const set_create_with = function (_, generator) {
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var code = new Array(this.itemCount_);
    var default_value = '0';
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || default_value;
    }
    //generator.definitions_['var_declare'+varName] = varName+'= '+ '{' + code.join(', ') + '}\n';
    code = varName + '= ' + '{' + code.join(', ') + '}\n';
    if (this.itemCount_ == 0) { code = varName + ' = ' + 'set()\n' }
    return code;
}

export const set_length = function (_, generator) {
    var varName = generator.valueToCode(this, 'SET', generator.ORDER_ASSIGNMENT) || '0';
    var code = 'len(' + varName + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const set_pop = function (_, generator) {
    var varName = generator.valueToCode(this, 'SET', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.pop()';
    return [code, generator.ORDER_ATOMIC];
}

export const set_clear = function (_, generator) {
    var varName = generator.valueToCode(this, 'SET', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.clear()\n';
    return code;
}

export const set_operate = function (_, generator) {
    var vars1 = generator.valueToCode(this, 'SET1', generator.ORDER_ASSIGNMENT) || '0';
    var vars2 = generator.valueToCode(this, 'SET2', generator.ORDER_ASSIGNMENT) || '0';
    var operate = this.getFieldValue('OPERATE');
    //var num = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = vars1 + "." + operate + "(" + vars2 + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const set_operate_update = function (_, generator) {
    var vars1 = generator.valueToCode(this, 'SET1', generator.ORDER_ASSIGNMENT) || '0';
    var vars2 = generator.valueToCode(this, 'SET2', generator.ORDER_ASSIGNMENT) || '0';
    var operate = this.getFieldValue('OPERATE');
    //var num = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = vars1 + "." + operate + "(" + vars2 + ')\n';
    return code;
}

export const set_add_discard = function (_, generator) {
    var vars1 = generator.valueToCode(this, 'SET', generator.ORDER_ASSIGNMENT) || '0';
    var operate = this.getFieldValue('OPERATE');
    var argument = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT) || '0';
    var code = vars1 + "." + operate + "(" + argument + ')\n';
    return code;
}

export const set_sub = function (_, generator) {
    var vars1 = generator.valueToCode(this, 'SET1', generator.ORDER_ASSIGNMENT) || '0';
    var vars2 = generator.valueToCode(this, 'SET2', generator.ORDER_ASSIGNMENT) || '0';
    var operate = this.getFieldValue('OPERATE');
    //var num = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = vars1 + "." + operate + "(" + vars2 + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const set_update = function (_, generator) {
    var varName = generator.valueToCode(this, 'SET', generator.ORDER_ASSIGNMENT) || '0';
    var color = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    //var color = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + "." + 'update' + '(' + color + ')\n';
    return code;
}

// export const set_change_to = function(){
//   var op = this.getFieldValue('OP');
//   var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ASSIGNMENT) || '0';
//   var code = op + '(' + varName + ')\n';
//   return [code, generator.ORDER_ATOMIC];
// }

export const set_create_with_text_return = function (_, generator) {
    var text = this.getFieldValue('TEXT');
    var code = '{' + text + '}';
    return [code, generator.ORDER_ATOMIC];
}

export const set_toset = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '0'
    return ['set(' + str + ')', generator.ORDER_ATOMIC];
}