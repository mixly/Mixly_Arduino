import * as Blockly from 'blockly/core';

export const variables_get = function (_, generator) {
    // Variable getter.
    var code = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    return [code, generator.ORDER_ATOMIC];
}

// export const variables_declare = function() {
//   var dropdown_type = this.getFieldValue('TYPE');
//   var argument0;
//   //TODO: settype to variable
//   argument0 = generator.valueToCode(this, 'VALUE',generator.ORDER_ASSIGNMENT) ||  'None';
//   var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
//       Blockly.Variables.NAME_TYPE);

//   if (dropdown_type === 'number')
//       generator.definitions_['var_declare' + varName] = 'let ' + ' ' + varName + ' = 0;';
//   else if(dropdown_type === 'string')
//       generator.definitions_['var_declare' + varName] = 'let ' + ' ' + varName + ' = \'\';';
//   else if(dropdown_type === 'boolean')
//       generator.definitions_['var_declare' + varName] = 'let ' + ' ' + varName + ' = true;';
//   else if(dropdown_type.startsWith('Array'))
//       generator.definitions_['var_declare' + varName] = 'let ' + varName + ':' + dropdown_type + ' = [];';

//   if(generator.setups_['var_declare' + varName] === undefined) {
//       generator.setups_['var_declare' + varName] =  varName + ' = ' + argument0 + '\n';
//   }else {
//   }
//   return '';
// }

export const variables_set = function (_, generator) {
    // Variable setter.
    if (this.getFieldValue('VAR') == "") {
        return "  = None\n";
    }
    var argument0 = generator.valueToCode(this, 'VALUE',
        generator.ORDER_ASSIGNMENT) || 'None';
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    return varName + ' = ' + argument0 + '\n';
}

export const variables_change = function (_, generator) {
    // Variable setter.
    var operator = this.getFieldValue('OP');
    var varName = generator.valueToCode(this, 'MYVALUE', generator.ORDER_ATOMIC) || 'None';
    if (operator == 'bytes') { var code = operator + '(' + varName + ',"UTF-8")'; }
    else { var code = operator + '(' + varName + ')'; }
    return [code, generator.ORDER_ATOMIC];
}

export const variables_global = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || 'None';
    var code = "global " + str + '\n';
    return code;
}

// ok
export const controls_type = function (_, generator) {
    var data = generator.valueToCode(this, 'DATA', generator.ORDER_ATOMIC) || 'None'
    var code = 'type(' + data + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const controls_typeLists = function (_, generator) {
    //generator.definitions_['import_microbit_*'] = 'from microbit import *';
    var type = this.getFieldValue('type');
    // generator.definitions_['func_type' + type] = code;
    return [type, generator.ORDER_ATOMIC];
}

export const lists_zip = function (_, generator) {
    var code = new Array(this.itemCount_);
    var default_value = '[]';
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || default_value;
    }
    var code = 'zip(' + code.join(', ') + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const unpack_iterable_object = function (_, generator) {
    const varName = generator.valueToCode(this, 'VAR', generator.ORDER_ASSIGNMENT) || '[]';
    const type = this.getFieldValue('TYPE');
    const code = `${type}(${varName})`;
    return [code, generator.ORDER_ATOMIC];
}