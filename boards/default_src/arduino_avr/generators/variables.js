import { Variables } from 'blockly/core';

export const variables_get = function (_, generator) {
    // Variable getter.
    var code = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Variables.NAME_TYPE);
    return [code, generator.ORDER_ATOMIC];
}

export const variables_declare = function (_, generator) {
    var dropdown_type = this.getFieldValue('TYPE');
    var dropdown_variables_type = this.getFieldValue('variables_type');
    var argument0;
    var code = '';
    //TODO: settype to variable
    if (dropdown_variables_type == 'global_variate') {
        if (dropdown_type == 'String') {
            argument0 = generator.valueToCode(this, 'VALUE', generator.ORDER_ASSIGNMENT) || '""';
        } else {
            argument0 = generator.valueToCode(this, 'VALUE', generator.ORDER_ASSIGNMENT) || '0';
        }
        var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
            Variables.NAME_TYPE);
        if (dropdown_type == 'String' || dropdown_type == 'char*')
            generator.definitions_['var_declare' + varName] = dropdown_type + ' ' + varName + ';';
        else
            generator.definitions_['var_declare' + varName] = 'volatile ' + dropdown_type + ' ' + varName + ';';

        generator.setups_['setup_var' + varName] = varName + ' = ' + argument0 + ';';
    }
    else {
        if (dropdown_type == 'String') {
            argument0 = generator.valueToCode(this, 'VALUE', generator.ORDER_ASSIGNMENT) || '""';
        } else {
            argument0 = generator.valueToCode(this, 'VALUE', generator.ORDER_ASSIGNMENT) || '0';
        }
        var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
            Variables.NAME_TYPE);
        code = dropdown_type + ' ' + varName + ' = ' + argument0 + ';\n';
    }
    //generator.variableTypes_[varName] = dropdown_type;//处理变量类型
    return code;
}

export const variables_set = function (_, generator) {
    // Variable setter.
    var argument0 = generator.valueToCode(this, 'VALUE',
        generator.ORDER_ASSIGNMENT) || '0';
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Variables.NAME_TYPE);
    return varName + ' = ' + argument0 + ';\n';
}

export const variables_change = function (_, generator) {
    // Variable setter.
    var operator = this.getFieldValue('OP');
    var varName = generator.valueToCode(this, 'MYVALUE', generator.ORDER_ASSIGNMENT);
    //修复强制类型转换不正确的bug
    var code = '((' + operator + ')(' + varName + '))';
    return [code, generator.ORDER_ATOMIC];
}