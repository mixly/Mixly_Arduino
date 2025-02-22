import * as Blockly from 'blockly/core';

export const text_base64_url_codec = function () {
    const FIELD_TYPE = this.getFieldValue("TYPE");
    const FIELD_OPTION = this.getFieldValue("OPTION");
    const VALUE_INPUT_VALUE = Blockly.Arduino.valueToCode(this, "VALUE", Blockly.Arduino.ORDER_ATOMIC);
    let code = '';
    if (FIELD_TYPE === 'BASE64') {
        Blockly.Arduino.definitions_['include_rBase64'] = '#include <rBase64.h>';
        if (FIELD_OPTION === 'ENCODE') {
            code = 'rbase64.encode(' + VALUE_INPUT_VALUE + ')';
        } else {
            code = 'rbase64.decode(' + VALUE_INPUT_VALUE + ')';
        }
    } else {
        Blockly.Arduino.definitions_['include_URLCode'] = '#include <URLCode.h>';
        Blockly.Arduino.definitions_['var_declare_urlCode'] = 'URLCode urlCode;';
        if (FIELD_OPTION === 'ENCODE') {
            Blockly.Arduino.definitions_['function_urlEncode']
                = 'String urlEncode(String urlStr) {\n'
                + '  urlCode.strcode = urlStr;\n'
                + '  urlCode.urlencode();\n'
                + '  return urlCode.urlcode;\n'
                + '}\n';
            code = 'urlEncode(' + VALUE_INPUT_VALUE + ')';
        } else {
            Blockly.Arduino.definitions_['function_urlDecode']
                = 'String urlDecode(String urlStr) {\n'
                + '  urlCode.urlcode = urlStr;\n'
                + '  urlCode.urldecode();\n'
                + '  return urlCode.strcode;\n'
                + '}\n';
            code = 'urlDecode(' + VALUE_INPUT_VALUE + ')';
        }
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};