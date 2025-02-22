export const html_document = function (_, generator) {
    var head = generator.statementToCode(this, 'HEAD');
    var body = generator.statementToCode(this, 'BODY');
    var code = "'''<!DOCTYPE HTML>\n<html>\n<head>\n" + '\t<meta charset="utf-8">\n' + head + "</head>\n<body>\n" + body + "</body>\n</html>\n'''";
    return [code, generator.ORDER_ATOMIC];
}

export const html_title = function (_, generator) {
    var t = generator.statementToCode(this, 'DO');
    var l = this.getFieldValue('LEVEL');
    var code = "<h" + l + ">\n" + t + "</h" + l + ">\n";
    return code;
}

export const html_head_body = function (_, generator) {
    var t = generator.statementToCode(this, 'DO');
    var l = this.getFieldValue('LEVEL');
    if (l == 'head') {
        var code = "<" + l + '>\n\t<meta charset="utf-8">\n' + t + "</" + l + ">\n";
    }
    else {
        var code = "<" + l + ">\n" + t + "</" + l + ">\n";
    }
    return code;
}

export const html_content = function (_, generator) {
    var t = generator.statementToCode(this, 'DO');
    // var s = generator.valueToCode(this, 'style');
    var l = this.getFieldValue('LEVEL');
    // var code = "<" + l + " " + s + " >\n" + t + "</" + l + ">\n";
    var code = "<" + l + ">\n" + t + "</" + l + ">\n";
    return code;
}

export const html_content_more = function (_, generator) {
    var t = generator.statementToCode(this, 'DO');
    var s = generator.valueToCode(this, 'style');
    var l = this.getFieldValue('LEVEL');
    var code = "<" + l + " " + s + " >\n" + t + "</" + l + ">\n";
    return code;
}

export const html_style = function (_, generator) {
    var style = generator.statementToCode(this, 'STYLE');
    var code = 'style="' + style + '"';
    return [code, generator.ORDER_ATOMIC];
}

export const html_form = function (_, generator) {
    var tag = this.getFieldValue('LEVEL');
    var name = this.getFieldValue('NAME');
    var value = this.getFieldValue('VALUE');
    var s = generator.valueToCode(this, 'style') || "";
    var code = '<input type="' + tag + '" name="' + name + '" value="' + value + '" ' + s + ' />';
    return code;
}

export const html_style_content = function () {
    var key = this.getFieldValue('KEY');
    var value = this.getFieldValue('VALUE');
    var code = key + ':' + value + ";";
    return code;
}

export const html_text = function () {
    var text = this.getFieldValue('TEXT');
    var code = text + "\n";
    return code;
}