'use strict';

goog.provide('Blockly.Python.AI');

goog.require('Blockly.Python');

Blockly.Python.AI_ChooseAndGet = function(){
    var type = this.getFieldValue('TYPE');
    Blockly.Python.definitions_['import_FileDialog'] = 'import FileDialog';
    var code = 'FileDialog.' + type + '()';   
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.AI_client = function(){
    var ctype = this.getFieldValue('CTYPE');
    Blockly.Python.definitions_['import_aip_' + ctype] = 'from aip import '+ ctype;
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var app_id = Blockly.Python.valueToCode(this, 'APP_ID', Blockly.Python.ORDER_ATOMIC);
    var api_key = Blockly.Python.valueToCode(this, 'API_KEY', Blockly.Python.ORDER_ATOMIC);
    var secret_key = Blockly.Python.valueToCode(this, 'SECRET_KEY', Blockly.Python.ORDER_ATOMIC);
    var code = v + ' = ' + ctype + '(' + app_id + ', ' + api_key + ', ' + secret_key + ')\n';   
    return code;
};

Blockly.Python.AI_Speech_synthesis = function(){
    Blockly.Python.definitions_['import_aip_AipSpeech'] = 'from aip import AipSpeech';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var s = Blockly.Python.valueToCode(this, 'STR', Blockly.Python.ORDER_ATOMIC);
    var attr = Blockly.Python.valueToCode(this, 'ATTR', Blockly.Python.ORDER_ATOMIC) || '{}';
    var code = v + '.synthesis(' + s + ', options=' + attr + ')';   
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.AI_Speech_asr = function(){
    Blockly.Python.definitions_['import_aip_AipSpeech'] = 'from aip import AipSpeech';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var f = Blockly.Python.valueToCode(this, 'FUNC', Blockly.Python.ORDER_ATOMIC);
    var fn = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC);
    var attr = Blockly.Python.valueToCode(this, 'ATTR', Blockly.Python.ORDER_ATOMIC) || '{}';
    var code = v + '.'+ f +'(' + fn + ', options=' + attr + ')';   
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.AI_ImageClassify = function(){
    Blockly.Python.definitions_['import_aip_AipImageClassify'] = 'from aip import AipImageClassify';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var addr = Blockly.Python.valueToCode(this, 'ADDR', Blockly.Python.ORDER_ATOMIC);
    var f = Blockly.Python.valueToCode(this, 'FUNC', Blockly.Python.ORDER_ATOMIC);
    var attr = Blockly.Python.valueToCode(this, 'ATTR', Blockly.Python.ORDER_ATOMIC) || '{}';
    var code = v + '.'+ f +'(' + addr + ', options=' + attr + ')';   
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.AI_Ocr = function(){
    Blockly.Python.definitions_['import_aip_Ocr'] = 'from aip import Ocr';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var addr = Blockly.Python.valueToCode(this, 'ADDR', Blockly.Python.ORDER_ATOMIC);
    var f = Blockly.Python.valueToCode(this, 'FUNC', Blockly.Python.ORDER_ATOMIC);
    var attr = Blockly.Python.valueToCode(this, 'ATTR', Blockly.Python.ORDER_ATOMIC) || '{}';
    var code = v + '.'+ f +'(' + addr + ', options=' + attr + ')';   
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.AI_Nlp = function(){
    Blockly.Python.definitions_['import_aip_Nlp'] = 'from aip import Nlp';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var s = Blockly.Python.valueToCode(this, 'STR', Blockly.Python.ORDER_ATOMIC);
    var f = Blockly.Python.valueToCode(this, 'FUNC', Blockly.Python.ORDER_ATOMIC);
    var attr = Blockly.Python.valueToCode(this, 'ATTR', Blockly.Python.ORDER_ATOMIC) || '{}';
    var code = v + '.'+ f +'(' + s + ', options=' + attr + ')';   
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.AI_Nlp_Sim = function(){
    Blockly.Python.definitions_['import_aip_Nlp'] = 'from aip import Nlp';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var s1 = Blockly.Python.valueToCode(this, 'STR1', Blockly.Python.ORDER_ATOMIC);
    var s2 = Blockly.Python.valueToCode(this, 'STR2', Blockly.Python.ORDER_ATOMIC);
    var f = Blockly.Python.valueToCode(this, 'FUNC', Blockly.Python.ORDER_ATOMIC);
    var attr = Blockly.Python.valueToCode(this, 'ATTR', Blockly.Python.ORDER_ATOMIC) || '{}';
    var code = v + '.'+ f +'(' + s1 + ',' + s2 + ', options=' + attr + ')';   
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.AI_Nlp_Topic = function(){
    Blockly.Python.definitions_['import_aip_Nlp'] = 'from aip import Nlp';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var s1 = Blockly.Python.valueToCode(this, 'STR1', Blockly.Python.ORDER_ATOMIC);
    var s2 = Blockly.Python.valueToCode(this, 'STR2', Blockly.Python.ORDER_ATOMIC);
    var code = v + '.topic(' + s1 + ',' + s2 + ')';   
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.AI_Nlp_newsSummary = function(){
    Blockly.Python.definitions_['import_aip_Nlp'] = 'from aip import Nlp';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var s = Blockly.Python.valueToCode(this, 'STR', Blockly.Python.ORDER_ATOMIC);
    var n = Blockly.Python.valueToCode(this, 'LEN', Blockly.Python.ORDER_ATOMIC);
    var attr = Blockly.Python.valueToCode(this, 'ATTR', Blockly.Python.ORDER_ATOMIC) || '{}';
    var code = v + '.newsSummary(' + s + ',' + n + ', options=' + attr + ')';   
    return [code,Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.AI_ImageClassify_Func = function () {
    var code = this.getFieldValue('TYPE');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.AI_Ocr_Func = function () {
    var code = this.getFieldValue('TYPE');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.AI_Nlp_Func = function () {
    var code = this.getFieldValue('TYPE');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.AI_Nlp_Func_sim = function () {
    var code = this.getFieldValue('TYPE');
    return [code, Blockly.Python.ORDER_ATOMIC];
};