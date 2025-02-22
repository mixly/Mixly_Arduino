export const text = function (_, generator) {
    // Text value.
    //var code = 'String('+generator.quote_(this.getFieldValue('TEXT'))+')';
    var code = generator.quote_(this.getFieldValue('TEXT'));
    return [code, generator.ORDER_ATOMIC];
}

export const text_char = function (_, generator) {
    var code = '\'' + this.getFieldValue('TEXT') + '\'';
    return [code, generator.ORDER_ATOMIC];
}

export const text_join = function (_, generator) {
    // Text value.
    var a = 'String(' + generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) + ')';
    var b = 'String(' + generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) + ')';
    return [a + ' + ' + b, generator.ORDER_ATOMIC];
}

export const text_to_number = function (_, generator) {
    var towhat = this.getFieldValue('TOWHAT');
    var str = 'String(' + generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) + ')';
    return [str + '.' + towhat + '()', generator.ORDER_ATOMIC];
}

export const ascii_to_char = function (_, generator) {
    var asciivalue = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '0'
    return ['char(' + asciivalue + ')', generator.ORDER_ATOMIC];
}

export const char_to_ascii = function (_, generator) {
    var charvalue = '\'' + this.getFieldValue('TEXT') + '\'';
    return ['toascii(' + charvalue + ')', generator.ORDER_ATOMIC];
}

export const number_to_text = function (_, generator) {
    var towhat = this.getFieldValue('TOWHAT');
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '0'
    return ['String(' + str + ", " + towhat + ")", generator.ORDER_ATOMIC];
}

export const text_length = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    return ['String(' + str + ')' + '.length()', generator.ORDER_ATOMIC];
}

export const text_char_at = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    var at = generator.valueToCode(this, 'AT', generator.ORDER_ATOMIC) || '0';
    return ['String(' + str + ')' + '.charAt(' + at + ')', generator.ORDER_ATOMIC];
}

export const text_equals_starts_ends = function (_, generator) {
    var str1 = 'String(' + (generator.valueToCode(this, 'STR1', generator.ORDER_ATOMIC) || '""') + ')';
    var str2 = 'String(' + (generator.valueToCode(this, 'STR2', generator.ORDER_ATOMIC) || '""') + ')';
    var dowhat = this.getFieldValue('DOWHAT');
    return [str1 + '.' + dowhat + '(' + str2 + ')', generator.ORDER_ATOMIC];
}

export const text_compareTo = function (_, generator) {
    var str1 = 'String(' + (generator.valueToCode(this, 'STR1', generator.ORDER_ATOMIC) || '""') + ')';
    var str2 = 'String(' + (generator.valueToCode(this, 'STR2', generator.ORDER_ATOMIC) || '""') + ')';
    return [str1 + '.compareTo(' + str2 + ')', generator.ORDER_ATOMIC];
}

// 小数获取有效位
export const decimal_places = function (_, generator) {
    var numeral = generator.valueToCode(this, 'numeral', generator.ORDER_ATOMIC);
    var decimal_places = generator.valueToCode(this, 'decimal_places', generator.ORDER_ATOMIC);
    var code = 'String(' + numeral + ', ' + decimal_places + ')';
    return [code, generator.ORDER_ATOMIC];
}

// 截取字符串
export const substring = function (_, generator) {
    var name = generator.valueToCode(this, 'name', generator.ORDER_ATOMIC);
    var Start = generator.valueToCode(this, 'Start', generator.ORDER_ATOMIC);
    var end = generator.valueToCode(this, 'end', generator.ORDER_ATOMIC);
    var code = 'String(' + name + ').substring(' + Start + ',' + end + ')';
    return [code, generator.ORDER_ATOMIC];
}

// 字符串转化为大小写
export const letter_conversion = function (_, generator) {
    var type = this.getFieldValue('type');
    var String = generator.valueToCode(this, 'String', generator.ORDER_ATOMIC);
    var code = '' + String + '' + type + ';\n';
    return code;
}

// 字符串变量替换
export const data_replacement = function (_, generator) {
    var String = generator.valueToCode(this, 'String', generator.ORDER_ATOMIC);
    var replace = generator.valueToCode(this, 'replace', generator.ORDER_ATOMIC);
    var source_data = generator.valueToCode(this, 'source_data', generator.ORDER_ATOMIC);
    var code = '' + String + '.replace(' + source_data + ', ' + replace + ');\n';
    return code;
}

// 消除非可视字符
export const eliminate = function (_, generator) {
    var String = generator.valueToCode(this, 'String', generator.ORDER_ATOMIC);
    var code = '' + String + '.trim();\n';
    return code;
}

// 检测是否以特定字符串开头或结尾
export const first_and_last = function (_, generator) {
    var type = this.getFieldValue('type');
    var String = generator.valueToCode(this, 'String', generator.ORDER_ATOMIC);
    var String1 = generator.valueToCode(this, 'String1', generator.ORDER_ATOMIC);
    var code = 'String(' + String + ')' + type + '(' + String1 + ')';
    return [code, generator.ORDER_ATOMIC];
}

// 数据类型转换
export const type_conversion = function (_, generator) {
    var variable = generator.valueToCode(this, 'variable', generator.ORDER_ATOMIC);
    var type = this.getFieldValue('type');
    var code = '' + type + '(' + variable + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const String_indexOf = function (_, generator) {
    var str1 = generator.valueToCode(this, 'str1', generator.ORDER_ATOMIC);
    var str2 = generator.valueToCode(this, 'str2', generator.ORDER_ATOMIC);
    var code = 'String(' + str1 + ').indexOf(String(' + str2 + '))';
    return [code, generator.ORDER_ATOMIC];
}

export const text_join2 = function (_, generator) {
    // Create a list with any number of elements of any type.
    var code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
        code[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || '0';
    }
    var code1 = '';
    for (var n = 0; n < this.itemCount_; n++) {
        code1 = code1 + ' + ' + 'String(' + code[n] + ')';
    }
    code1 = code1.substring(3);
    return [code1, generator.ORDER_ATOMIC];
}

// 字符串转长整数
export const String_to_Long_Integer = function(_, generator) {
    var data= generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var type= this.getFieldValue('type');
    var code = 'strtol(String(' +data+ ').c_str(), NULL, ' +type+ ')';
    return [code, generator.ORDER_ATOMIC];
}