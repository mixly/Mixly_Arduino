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
    var operator = (this.getFieldValue('OP') == 'AND') ? '&&' : '||';
    var order = (operator == '&&') ? generator.ORDER_LOGICAL_AND :
        generator.ORDER_LOGICAL_OR;
    var argument0 = generator.valueToCode(this, 'A', order) || 'false';
    var argument1 = generator.valueToCode(this, 'B', order) || 'false';
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
}

export const logic_negate = function (_, generator) {
    // Negation.
    var order = generator.ORDER_UNARY_PREFIX;
    var argument0 = generator.valueToCode(this, 'BOOL', order) || 'false';
    var code = '!' + argument0;
    return [code, order];
}

export const logic_boolean = function (_, generator) {
    // Boolean values true and false.
    var code = (this.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
    return [code, generator.ORDER_ATOMIC];
}

export const logic_null = function (_, generator) {
    var code = 'NULL';
    return [code, generator.ORDER_ATOMIC];
}

export const logic_true_or_false = function (_, generator) {
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || 'false';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || 'false';
    var c = generator.valueToCode(this, 'C', generator.ORDER_ATOMIC) || 'false';
    var code = '(' + a + '?' + b + ':' + c + ')';
    return [code, generator.ORDER_ATOMIC];
}