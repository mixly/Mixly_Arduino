export const factory_from_import = function (_, generator) {
    var path = this.getFieldValue('path');
    var module = this.getFieldValue('module');
    generator.definitions_['import_' + path + '_' + module] = 'from ' + path + ' import ' + module;
    return '';
}

export const factory_import = function (_, generator) {
    var module = this.getFieldValue('module');
    generator.definitions_['import_' + module] = 'import ' + module;
    return '';
}

export const factory_function_noreturn = function (_, generator) {
    var NAME = this.getFieldValue('NAME');
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || '';
    }
    return NAME + '(' + code.join(', ') + ')\n';
}

export const factory_function_return = function (_, generator) {
    var NAME = this.getFieldValue('NAME');
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || '';
    }
    return [NAME + '(' + code.join(', ') + ')', generator.ORDER_ATOMIC];
}

export const factory_declare = function () {
    var TYPE = this.getFieldValue('TYPE');
    var NAME = this.getFieldValue('NAME');
    return NAME + ' = ' + TYPE + '()\n';
}

export const factory_callMethod_noreturn = function (_, generator) {
    var NAME = this.getFieldValue('NAME');
    var METHOD = this.getFieldValue('METHOD');
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || '';
    }
    return NAME + '.' + METHOD + '(' + code.join(', ') + ')\n';
}

export const factory_callMethod_return = function (_, generator) {
    var NAME = this.getFieldValue('NAME');
    var METHOD = this.getFieldValue('METHOD');
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || '';
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

export const folding_block = function (_, generator) {
    var comment = this.getFieldValue('peien');
    comment = "#" + comment;
    var branch = generator.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格
    branch = branch.replace(/(\n\s\s\s\s)/g, "\n");//去除换行时空格
    return comment + '\n' + branch + '\n';
}