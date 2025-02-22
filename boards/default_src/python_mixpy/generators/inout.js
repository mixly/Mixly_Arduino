export const inout_input = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    return ['input(' + str + ')', generator.ORDER_ATOMIC];
}

export const inout_print = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ")\n";
    return code;
}

export const inout_print_inline = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ',end ="")\n';
    return code;
}

export const inout_print_end = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    var end = generator.valueToCode(this, 'END', generator.ORDER_ATOMIC) || '""';
    var code = "print(" + str + ',end =' + end + ')\n';
    return code;
}

export const inout_type_input = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    var type = this.getFieldValue('DIR');
    if (type == 'str') { var code = 'input(' + str + ')' }
    else if (type == 'int') { var code = 'int(input(' + str + '))' }
    else if (type == 'float') { var code = 'float(input(' + str + '))' }
    //var code=varname+"." + type + "("   + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const pyinout_type_input = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    var type = this.getFieldValue('DIR');
    generator.definitions_['import_pyinput'] = 'import pyinput';
    if (type == 'str') { var code = 'pyinput.input(' + str + ')' }
    else if (type == 'int') { var code = 'int(pyinput.input(' + str + '))' }
    else if (type == 'float') { var code = 'float(pyinput.input(' + str + '))' }
    //var code=varname+"." + type + "("   + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const inout_print_many = function (_, generator) {
    var code = new Array(this.itemCount_);
    var default_value = '0';
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || default_value;
    }
    var code = 'print(' + code.join(', ') + ')\n';
    return code;
}