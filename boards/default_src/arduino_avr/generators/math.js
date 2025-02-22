export const math_number = function (_, generator) {
    // Numeric value.
    var code = (this.getFieldValue('NUM'));
    // -4.abs() returns -4 in Dart due to strange order of operation choices.
    // -4 is actually an operator and a number.  Reflect this in the order.
    var order = code < 0 ?
        generator.ORDER_UNARY_PREFIX : generator.ORDER_ATOMIC;
    return [code, order];
}

export const math_arithmetic = function (_, generator) {
    // Basic arithmetic operators, and power.
    const OPERATORS = {
        ADD: [' + ', generator.ORDER_ADDITIVE],
        MINUS: [' - ', generator.ORDER_ADDITIVE],
        MULTIPLY: [' * ', generator.ORDER_MULTIPLICATIVE],
        DIVIDE: [' / ', generator.ORDER_MULTIPLICATIVE],
        QUYU: [' % ', generator.ORDER_MULTIPLICATIVE],//增加取余操作
        POWER: [null, generator.ORDER_NONE]  // Handle power separately.
    };
    var mode = this.getFieldValue('OP');
    var tuple = OPERATORS[mode];
    var operator = tuple[0];
    var order = tuple[1];
    var argument0 = generator.valueToCode(this, 'A', order) || '0';
    var argument1 = generator.valueToCode(this, 'B', order) || '0';
    var code;
    if (!operator) {
        code = 'pow(' + argument0 + ', ' + argument1 + ')';
        return [code, generator.ORDER_UNARY_POSTFIX];
    }
    if (operator == ' % ') {
        //取余必须是整数
        argument0 = '(long) (' + argument0 + ')';
        argument1 = '(long) (' + argument1 + ')';
    }
    code = argument0 + operator + argument1;
    return [code, order];
}

export const math_bit = function (_, generator) {
    var operator = this.getFieldValue('OP');
    var order = generator.ORDER_ATOMIC;
    var argument0 = generator.valueToCode(this, 'A', order) || '0';
    var argument1 = generator.valueToCode(this, 'B', order) || '0';
    var code = '(' + argument0 + operator + argument1 + ')';
    return [code, order];
}

export const math_single = function (_, generator) {
    // Math operators with single operand.
    var operator = this.getFieldValue('OP');
    var code;
    var arg;
    if (operator == 'NEG') {
        // Negation is a special case given its different operator precedents.
        arg = generator.valueToCode(this, 'NUM',
            generator.ORDER_UNARY_PREFIX) || '0';
        if (arg[0] == '-') {
            // --3 is not legal in Dart.
            arg = ' ' + arg;
        }
        code = '-' + arg;
        return [code, generator.ORDER_UNARY_PREFIX];
    }
    if (operator == 'ABS' || operator.substring(0, 5) == 'ROUND') {
        arg = generator.valueToCode(this, 'NUM',
            generator.ORDER_UNARY_POSTFIX) || '0';
    } else if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
        arg = generator.valueToCode(this, 'NUM',
            generator.ORDER_MULTIPLICATIVE) || '0';
    } else {
        arg = generator.valueToCode(this, 'NUM',
            generator.ORDER_NONE) || '0';
    }
    // First, handle cases which generate values that don't need parentheses.
    switch (operator) {
        case 'ABS':
            code = arg + '.abs()';
            break;
        case 'ROOT':
            code = 'sqrt(' + arg + ')';
            break;
        case 'LN':
            code = 'log(' + arg + ')';
            break;
        case 'EXP':
            code = 'exp(' + arg + ')';
            break;
        case 'POW10':
            code = 'pow(10,' + arg + ')';
            break;
        case '++':
            code = '(++' + arg + ')';
            break;
        case '--':
            code = '(--' + arg + ')';
            break;
        case '~':
            code = '~(' + arg + ')';
            break;
        case 'ROUND':
            code = arg + '.round()';
            break;
        case 'ROUNDUP':
            code = arg + '.ceil()';
            break;
        case 'ROUNDDOWN':
            code = arg + '.floor()';
            break;
        case 'SIN':
            code = 'sin(' + arg + ' / 180.0 * 3.14159)';
            break;
        case 'COS':
            code = 'cos(' + arg + ' / 180.0 * 3.14159)';
            break;
        case 'TAN':
            code = 'tan(' + arg + ' / 180.0 * 3.14159)';
            break;
    }
    if (code) {
        return [code, generator.ORDER_UNARY_POSTFIX];
    }
    // Second, handle cases which generate values that may need parentheses.
    switch (operator) {
        case 'LOG10':
            code = 'log(' + arg + ') / log(10)';
            break;
        case 'ASIN':
            code = 'asin(' + arg + ') / 3.14159 * 180';
            break;
        case 'ACOS':
            code = 'acos(' + arg + ') / 3.14159 * 180';
            break;
        case 'ATAN':
            code = 'atan(' + arg + ') / 3.14159 * 180';
            break;
        default:
            throw 'Unknown math operator: ' + operator;
    }
    return [code, generator.ORDER_MULTIPLICATIVE];
}

export const math_trig = math_single;

export const math_to_int = function (_, generator) {
    var argument0 = generator.valueToCode(this, 'A', generator.ORDER_NONE) || '0';
    var operator = this.getFieldValue('OP');
    var code = operator + '(' + argument0 + ')';
    return [code, generator.ORDER_ATOMIC];
}

// 变量定义
export const arduino_variate_type = function (_, generator) {
    var dropdown_variate_type = this.getFieldValue('variate_type');
    var code = dropdown_variate_type;
    return [code, generator.ORDER_ATOMIC];
}

// 获取某个变量在内存中所占用的字节数
export const math_SizeOf = function (_, generator) {
    this.setTooltip("以字节形式返回某个操作数的储存大小");
    var value_data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var code = 'sizeof(' + value_data + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const math_max_min = function (_, generator) {
    var a = generator.valueToCode(this, 'A', generator.ORDER_NONE) || '0';
    var b = generator.valueToCode(this, 'B', generator.ORDER_NONE) || '0';
    var operator = this.getFieldValue('OP');
    var code = operator + '(' + a + ', ' + b + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const math_random_seed = function (_, generator) {
    // Random integer between [X] and [Y].
    var a = generator.valueToCode(this, 'NUM', generator.ORDER_NONE) || '0';
    //generator.setups_['setup_randomSeed'] ='randomSeed(' + a +  ');'+'\n';
    return 'randomSeed(' + a + ');' + '\n';
}

export const math_random_int = function (_, generator) {
    // Random integer between [X] and [Y].
    var argument0 = generator.valueToCode(this, 'FROM',
        generator.ORDER_NONE) || '0';
    var argument1 = generator.valueToCode(this, 'TO',
        generator.ORDER_NONE) || '0';
    var code = 'random(' + argument0 + ', ' + argument1 + ')';
    return [code, generator.ORDER_UNARY_POSTFIX];
}

export const base_map = function (_, generator) {
    var dropdown_maptype = this.getFieldValue('maptype');
    var value_num = generator.valueToCode(this, 'NUM', generator.ORDER_NONE);
    var value_fl = generator.valueToCode(this, 'fromLow', generator.ORDER_ATOMIC);
    var value_fh = generator.valueToCode(this, 'fromHigh', generator.ORDER_ATOMIC);
    var value_tl = generator.valueToCode(this, 'toLow', generator.ORDER_ATOMIC);
    var value_th = generator.valueToCode(this, 'toHigh', generator.ORDER_ATOMIC);
    if (dropdown_maptype == 'map_float') {
        generator.definitions_['function_mapfloat'] = 'float mapfloat(float x, float in_min, float in_max, float out_min, float out_max)'
            + '\n{'
            + '\n  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;'
            + '\n}';
        var code = 'mapfloat(' + value_num + ', ' + value_fl + ', ' + value_fh + ', ' + value_tl + ', ' + value_th + ')';
    }
    else {
        var code = 'map(' + value_num + ', ' + value_fl + ', ' + value_fh + ', ' + value_tl + ', ' + value_th + ')';
    }
    return [code, generator.ORDER_NONE];
}

export const math_constrain = function (_, generator) {
    // Constrain a number between two limits.
    var argument0 = generator.valueToCode(this, 'VALUE',
        generator.ORDER_NONE) || '0';
    var argument1 = generator.valueToCode(this, 'LOW',
        generator.ORDER_NONE) || '0';
    var argument2 = generator.valueToCode(this, 'HIGH',
        generator.ORDER_NONE) || '0';
    var code = 'constrain(' + argument0 + ', ' + argument1 + ', ' +
        argument2 + ')';
    return [code, generator.ORDER_UNARY_POSTFIX];
}

export const variables_operation = function (_, generator) {
    var type = this.getFieldValue('type');
    var variables = generator.valueToCode(this, 'variables', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var code = '' + variables + ' = ' + variables + ' ' + type + ' ' + data + ';\n';
    return code;
}

export const math_auto_add_or_minus = function (_, generator) {
    var value_math_auto_add_minus_output = generator.valueToCode(this, 'math_auto_add_minus_output', generator.ORDER_ATOMIC);
    var dropdown_math_auto_add_minus_type = this.getFieldValue('math_auto_add_minus_type');
    var code = value_math_auto_add_minus_output + dropdown_math_auto_add_minus_type + ';\n';
    return code;
}