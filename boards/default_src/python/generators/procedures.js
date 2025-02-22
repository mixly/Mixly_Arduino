import * as Blockly from 'blockly/core';

export const procedures_defreturn = function (_, generator) {
    // Define a procedure with a return value.
    var funcName = generator.variableDB_.getName(this.getFieldValue('NAME'),
        Blockly.Procedures.NAME_TYPE);
    var branch = (this.getInput('STACK') && generator.statementToCode(this, 'STACK')) ?? '    pass\n';
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
    var code = 'def ' + funcName + '(' + args.join(', ') + '):\n' +
        branch + returnValue + '\n';
    code = generator.scrub_(this, code);
    generator.setups_[funcName] = code;
    return null;
}

export const procedures_defnoreturn = function (_, generator) {
    // Define a procedure with a return value.
    var funcName = generator.variableDB_.getName(this.getFieldValue('NAME'),
        Blockly.Procedures.NAME_TYPE);
    var branch = (this.getInput('STACK') && generator.statementToCode(this, 'STACK')) ?? '    pass\n';
    if (generator.INFINITE_LOOP_TRAP) {
        branch = generator.INFINITE_LOOP_TRAP.replace(/%1/g,
            '\'' + this.id + '\'') + branch;
    }
    //var returnType = returnValue ? type : 'void';
    var args = [];
    for (var x = 0; x < this.arguments_.length; x++) {
        var varName = generator.variableDB_.getName(this.arguments_[x], Blockly.Variables.NAME_TYPE);
        args[x] = varName;
    }
    var code = 'def ' + funcName + '(' + args.join(', ') + '):\n' +
        branch + '\n';
    code = generator.scrub_(this, code);
    generator.setups_[funcName] = code;
    return null;
}

export const procedures_callreturn = function (_, generator) {
    // Call a procedure with a return value.
    var funcName = generator.variableDB_.getName(this.getFieldValue('NAME'),
        Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var x = 0; x < this.arguments_.length; x++) {
        args[x] = generator.valueToCode(this, 'ARG' + x,
            generator.ORDER_NONE) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ')';
    return [code, generator.ORDER_UNARY_POSTFIX];
}

export const procedures_callnoreturn = function (_, generator) {
    // Call a procedure with no return value.
    var funcName = generator.variableDB_.getName(this.getFieldValue('NAME'),
        Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var x = 0; x < this.arguments_.length; x++) {
        args[x] = generator.valueToCode(this, 'ARG' + x,
            generator.ORDER_NONE) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ')\n';
    return code;
}

export const procedures_ifreturn = function (_, generator) {
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

export const procedures_return = function (_, generator) {
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