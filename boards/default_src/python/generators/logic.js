export const logic_compare = function (_, generator) {
    // Comparison operator.
    var mode = this.getFieldValue('OP');
    var operator = logic_compare.OPERATORS[mode];
    var order = (operator == '==' || operator == '!=') ?
        generator.ORDER_EQUALITY : generator.ORDER_RELATIONAL;
    var argument0 = generator.valueToCode(this, 'A', order) || '0';
    var argument1 = generator.valueToCode(this, 'B', order) || '0';
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
}

export const logic_compare_continous = function (_, generator) {
    // Comparison operator.
    var mode1 = this.getFieldValue('OP1');
    var operator1 = logic_compare.OPERATORS[mode1];
    var mode2 = this.getFieldValue('OP2');
    var operator2 = logic_compare.OPERATORS[mode2];
    var argument0 = generator.valueToCode(this, 'A', generator.ORDER_RELATIONAL) || '0';
    var argument1 = generator.valueToCode(this, 'B', generator.ORDER_RELATIONAL) || '0';
    var argument2 = generator.valueToCode(this, 'C', generator.ORDER_RELATIONAL) || '0';
    var code = argument0 + ' ' + operator1 + ' ' + argument1 + ' ' + operator2 + ' ' + argument2;
    return [code, generator.ORDER_RELATIONAL];
}

logic_compare.OPERATORS = {
    EQ: '==',
    NEQ: '!=',
    LT: '<',
    LTE: '<=',
    GT: '>',
    GTE: '>='
};

export const logic_operation = function (_, generator) {
    // Operations 'and', 'or'.
    var operator = this.getFieldValue('OP');
    var order = (operator == '&&') ? generator.ORDER_LOGICAL_AND :
        generator.ORDER_LOGICAL_OR;
    var argument0 = generator.valueToCode(this, 'A', order) || 'False';
    var argument1 = generator.valueToCode(this, 'B', order) || 'False';
    if (operator == 'AND') {
        var code = argument0 + ' and ' + argument1;
    } else if (operator == 'OR') {
        var code = argument0 + ' or ' + argument1;
    } else if (operator == 'NOR') {
        // var code = '('+argument0+' and '+argument1+' ) or ((not '+argument0+') and (not '+argument1+'))';
        var code = 'not(' + argument0 + '^' + argument1 + ')';
    } else {
        // var code = '((not '+argument0+') and '+argument1+' ) or ( '+argument0+' and (not '+argument1+'))';
        var code = argument0 + '^' + argument1;
    }
    return [code, order];
}

export const logic_negate = function (_, generator) {
    // Negation.
    var order = generator.ORDER_UNARY_PREFIX;
    var argument0 = generator.valueToCode(this, 'BOOL', order) || 'False';
    var code = 'not ' + argument0;
    return [code, order];
}

export const logic_boolean = function (_, generator) {
    // Boolean values true and false.
    var code = (this.getFieldValue('BOOL') == 'TRUE') ? 'True' : 'False';
    return [code, generator.ORDER_ATOMIC];
}

export const logic_null = function (_, generator) {
    var code = 'None';
    return [code, generator.ORDER_ATOMIC];
}

export const logic_true_or_false = function (_, generator) {
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || 'False';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || 'False';
    var c = generator.valueToCode(this, 'C', generator.ORDER_ATOMIC) || 'False';
    var code = '(' + b + ' if ' + a + ' else ' + c + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const logic_is_in = function (_, generator) {
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var bool = this.getFieldValue('BOOL');
    var code = a + ' ' + bool + ' ' + b;
    return [code, generator.ORDER_ATOMIC];
}

export const logic_is = function (_, generator) {
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var bool = this.getFieldValue('BOOL');
    var code = a + ' ' + bool + ' ' + b;
    return [code, generator.ORDER_ATOMIC];
}

export const logic_tobool = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '0'
    return ['bool(' + str + ')', generator.ORDER_ATOMIC];
}