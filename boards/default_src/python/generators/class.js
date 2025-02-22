import * as Blockly from 'blockly/core';

export const class_make = function (_, generator) {
    var text_name = this.getFieldValue('VAR') || 'None';
    var statements_data = generator.statementToCode(this, 'data');
    var code = 'class ' + text_name + ':\n' + statements_data;
    return code;
}

export const class_make_with_base = function (_, generator) {
    var text_name = this.getFieldValue('VAR') || 'None';
    var name = generator.valueToCode(this, 'NAME', generator.ORDER_ASSIGNMENT) || 'None';
    var statements_data = generator.statementToCode(this, 'data');
    var code = '';
    if (name == 'None')
        code = 'class ' + text_name + ':\n' + statements_data;
    else
        code = 'class ' + text_name + '(' + name + '):\n' + statements_data;
    return code;
}

export const class_get = function (_, generator) {
    var code = this.getFieldValue('VAR') || 'None';
    return [code, generator.ORDER_ATOMIC];
}

export const property_set = function (_, generator) {
    var argument0 = generator.valueToCode(this, 'VALUE', generator.ORDER_ASSIGNMENT) || 'None';
    var argument1 = generator.valueToCode(this, 'DATA', generator.ORDER_ASSIGNMENT) || 'None';
    var varName = this.getFieldValue('VAR') || 'None';
    return argument0 + '.' + varName + ' = ' + argument1 + '\n';
}

export const property_get = function (_, generator) {
    var argument0 = generator.valueToCode(this, 'VALUE', generator.ORDER_ASSIGNMENT) || 'None';
    var code = this.getFieldValue('VAR') || 'None';
    return [argument0 + '.' + code, generator.ORDER_ATOMIC];
}

export const object_set = function (_, generator) {
    var text_name = this.getFieldValue('VAR10') || 'None';
    var text_new_name = this.getFieldValue('VAR11') || 'None';
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n, generator.ORDER_NONE) || 'None';
    }
    var code = text_new_name + ' = ' + text_name + '(' + code.join(',') + ')\n';
    return code;
}

export const object_get = function (_, generator) {
    var code = this.getFieldValue('VAR') || 'None';
    return [code, generator.ORDER_ATOMIC];
}

export const method_procedures_defreturn = function (_, generator) {
    // Define a procedure with a return value.
    //var funcName = generator.variableDB_.getName(this.getFieldValue('NAME'),
    //    Blockly.Class_Test.NAME_TYPE);
    var funcName = this.getFieldValue('NAME') || 'None';
    var branch = generator.statementToCode(this, 'STACK') || '    pass\n';
    if (generator.INFINITE_LOOP_TRAP) {
        branch = generator.INFINITE_LOOP_TRAP.replace(/%1/g,
            '\'' + this.id + '\'') + branch;
    }
    var returnValue = generator.valueToCode(this, 'RETURN',
        generator.ORDER_NONE) || '';
    //var type=this.getFieldValue('TYPE');
    if (returnValue) {
        returnValue = '    return ' + returnValue + '\n';
    }
    //var returnType = returnValue ? type : 'void';
    var args = [];
    for (var x = 0; x < this.arguments_.length; x++) {
        var varName = generator.variableDB_.getName(this.arguments_[x], Blockly.Variables.NAME_TYPE);
        args[x] = varName;
    }
    var code = '';
    //if(this.arguments_.length)
    code = 'def ' + funcName + '(' + args.join(', ') + '):\n' +
        branch + returnValue + '\n';
    //code = generator.scrub_(this, code);
    //generator.setups_[funcName] = code;
    return code;
}

export const method_procedures_defnoreturn = method_procedures_defreturn;

export const method_procedures_callreturn = function (_, generator) {
    var argument1 = generator.valueToCode(this, 'DATA', generator.ORDER_ASSIGNMENT) || 'None';
    // Call a procedure with a return value.
    //var funcName = generator.variableDB_.getName(this.getFieldValue('NAME'),
    //    Blockly.Class_Test.NAME_TYPE);
    var funcName = this.getFieldValue('NAME');
    var args = [];
    for (var x = 0; x < this.arguments_.length - 1; x++) {
        args[x] = generator.valueToCode(this, 'ARG' + (x + 1),
            generator.ORDER_NONE) || 'null';
    }
    var code = argument1 + '.' + funcName + '(' + args.join(', ') + ')';
    return [code, generator.ORDER_UNARY_POSTFIX];
}

export const method_procedures_callnoreturn = function (_, generator) {
    var argument1 = generator.valueToCode(this, 'DATA', generator.ORDER_ASSIGNMENT) || 'None';
    // Call a procedure with no return value.
    //var funcName = generator.variableDB_.getName(this.getFieldValue('NAME'),
    //    Blockly.Class_Test.NAME_TYPE);
    var funcName = this.getFieldValue('NAME');
    var args = [];
    for (var x = 0; x < this.arguments_.length - 1; x++) {
        args[x] = generator.valueToCode(this, 'ARG' + (x + 1),
            generator.ORDER_NONE) || 'null';
    }
    var code = argument1 + '.' + funcName + '(' + args.join(', ') + ')\n';
    return code;
}

export const method_procedures_ifreturn = function (_, generator) {
    // Conditionally return value from a procedure.
    var condition = generator.valueToCode(this, 'CONDITION',
        generator.ORDER_NONE) || 'False';
    var code = 'if (' + condition + ') :\n';
    if (this.hasReturnValue_) {
        var value = generator.valueToCode(this, 'VALUE',
            generator.ORDER_NONE) || 'None';
        code += '    return ' + value;
    } else {
        code += '    return None';
    }
    code += '\n';
    return code;
}

export const method_procedures_return = function (_, generator) {
    // Conditionally return value from a procedure.
    var code = ""
    if (this.hasReturnValue_) {
        var value = generator.valueToCode(this, 'VALUE',
            generator.ORDER_NONE) || 'None';
        code += 'return ' + value;
    } else {
        code += 'return None';
    }
    code += '\n';
    return code;
}