export const factory_include = function (_, generator) {
    var INCLUDE = this.getFieldValue('INCLUDE');
    generator.definitions_['include_' + INCLUDE] = '#include <' + INCLUDE + '.h>';
    return '';
}

export const factory_function_noreturn = function (_, generator) {
    var NAME = this.getFieldValue('NAME');
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || 'NULL';
    }
    return NAME + '(' + code.join(', ') + ');\n';
}

export const factory_function_return = function (_, generator) {
    var NAME = this.getFieldValue('NAME');
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || 'NULL';
    }
    return [NAME + '(' + code.join(', ') + ')', generator.ORDER_ATOMIC];
}

export const factory_declare = function (_, generator) {
    var TYPE = this.getFieldValue('TYPE');
    var NAME = this.getFieldValue('NAME');
    generator.definitions_['var_' + TYPE + '_' + NAME] = TYPE + ' ' + NAME + ';';
    return '';
}

export const factory_declare2 = function (_, generator) {
    var VALUE = this.getFieldValue('VALUE');
    generator.definitions_['var_' + VALUE] = VALUE;
    return '';
}

export const factory_define = function (_, generator) {
    var TYPE = this.getFieldValue('TYPE');
    if (TYPE.substr(0, 1) == '#')
        TYPE = TYPE.substr(1);
    var NAME = this.getFieldValue('NAME');
    generator.definitions_["define_" + TYPE + '_' + NAME] = '#' + TYPE + ' ' + NAME;
    return '';
}

export const factory_static_method_noreturn = function (_, generator) {
    var TYPE = this.getFieldValue('TYPE');
    var NAME = this.getFieldValue('NAME');
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || 'NULL';
    }
    return TYPE + '::' + NAME + '(' + code.join(', ') + ');\n';
}

export const factory_static_method_return = function (_, generator) {
    var TYPE = this.getFieldValue('TYPE');
    var NAME = this.getFieldValue('NAME');
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || 'NULL';
    }
    return [TYPE + '::' + NAME + '(' + code.join(', ') + ')', generator.ORDER_ATOMIC];
}

export const factory_callMethod_noreturn = function (_, generator) {
    var NAME = this.getFieldValue('NAME');
    var METHOD = this.getFieldValue('METHOD');
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || 'NULL';
    }
    return NAME + '.' + METHOD + '(' + code.join(', ') + ');\n';
}

export const factory_callMethod_return = function (_, generator) {
    var NAME = this.getFieldValue('NAME');
    var METHOD = this.getFieldValue('METHOD');
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || 'NULL';
    }
    return [NAME + '.' + METHOD + '(' + code.join(', ') + ')', generator.ORDER_ATOMIC];
}

export const factory_block = function () {
    var VALUE = this.getFieldValue('VALUE');
    //if(!(VALUE.charAt(VALUE.length-1)==";")){
    //VALUE=VALUE+';';
    //}
    return VALUE + '\n';
}

export const factory_block_return = function (_, generator) {
    var VALUE = this.getFieldValue('VALUE');
    return [VALUE, generator.ORDER_ATOMIC];
}

export const factory_block_with_textarea = function () {
    var VALUE = this.getFieldValue('VALUE');
    //if(!(VALUE.charAt(VALUE.length-1)==";")){
    //VALUE=VALUE+';';
    //}
    return VALUE + '\n';
}

export const factory_block_return_with_textarea = function (_, generator) {
    var VALUE = this.getFieldValue('VALUE');
    return [VALUE, generator.ORDER_ATOMIC];
}