import * as Blockly from 'blockly/core';

export const requests_get_old = function (_, generator) {
    generator.definitions_.import_requests = "import requests";
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var str = generator.valueToCode(this, 'DOMAIN', generator.ORDER_ATOMIC);
    var code = varName + '= ' + 'requests.get(' + str + ')\n';
    return code;
}

export const requests_get = function (_, generator) {
    generator.definitions_.import_requests = "import requests";
    var dropdown_type = this.getFieldValue('TYPE');
    var str = generator.valueToCode(this, 'URL', generator.ORDER_ATOMIC);
    var code = 'requests.' + dropdown_type + '(' + str + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const requests_post = function (_, generator) {
    generator.definitions_.import_requests = "import requests";
    var dropdown_type = this.getFieldValue('TYPE');
    var str = generator.valueToCode(this, 'URL', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var code = 'requests.' + dropdown_type + '(' + str + ',data=' + data + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const requests_attribute = function (_, generator) {
    generator.definitions_.import_requests = "import requests";
    var varName = generator.valueToCode(this, 'VAL', generator.ORDER_ASSIGNMENT) || '0';
    var attr = this.getFieldValue('ATTR');
    var code = varName + "." + attr;
    return [code, generator.ORDER_ATOMIC];
}

export const requests_method = function (_, generator) {
    generator.definitions_.import_requests = "import requests";
    var method = this.getFieldValue('DIR');
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "requests." + method + "(" + str + ')\n';
    return code;
}