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
    Blockly.Python.definitions_['import_aip'] = 'import aip';
    //Blockly.Python.definitions_['import_aip_' + ctype] = 'from aip import '+ ctype;
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var app_id = Blockly.Python.valueToCode(this, 'APP_ID', Blockly.Python.ORDER_ATOMIC);
    var api_key = Blockly.Python.valueToCode(this, 'API_KEY', Blockly.Python.ORDER_ATOMIC);
    var secret_key = Blockly.Python.valueToCode(this, 'SECRET_KEY', Blockly.Python.ORDER_ATOMIC);
    var code =  v + ' = ' + 'aip.' +ctype + '(' + app_id + ', ' + api_key + ', ' + secret_key + ')\n';   
    return code;
};

Blockly.Python.AI_Speech_synthesis = function(){
    Blockly.Python.definitions_['import_aip'] = 'import aip';
    //Blockly.Python.definitions_['import_aip_AipSpeech'] = 'from aip import AipSpeech';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var s = Blockly.Python.valueToCode(this, 'STR', Blockly.Python.ORDER_ATOMIC);
    var attr = Blockly.Python.valueToCode(this, 'ATTR', Blockly.Python.ORDER_ATOMIC) || '{}';
    var code = v + '.synthesis(' + s + ', options=' + attr + ')';   
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.AI_Speech_asr = function(){
    Blockly.Python.definitions_['import_aip'] = 'import aip';
    //Blockly.Python.definitions_['import_aip_AipSpeech'] = 'from aip import AipSpeech';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    //var f = Blockly.Python.valueToCode(this, 'FUNC', Blockly.Python.ORDER_ATOMIC);
    var fn = Blockly.Python.valueToCode(this, 'FILE', Blockly.Python.ORDER_ATOMIC) || '""';
    var attr = Blockly.Python.valueToCode(this, 'ATTR', Blockly.Python.ORDER_ATOMIC) || '{}';
    //var code = v + '.'+ f +'(' + fn + ', options=' + attr + ')'; 
    var code = v + '.asr(' + fn + ', options=' + attr + ')';   
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.AI_ImageClassify = function(){
    Blockly.Python.definitions_['import_aip'] = 'import aip';
    //Blockly.Python.definitions_['import_aip_AipImageClassify'] = 'from aip import AipImageClassify';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var addr = Blockly.Python.valueToCode(this, 'ADDR', Blockly.Python.ORDER_ATOMIC);
    var f = Blockly.Python.valueToCode(this, 'FUNC', Blockly.Python.ORDER_ATOMIC);
    var attr = Blockly.Python.valueToCode(this, 'ATTR', Blockly.Python.ORDER_ATOMIC) || '{}';
    var code = v + '.'+ f +'(' + addr + ', options=' + attr + ')';   
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.AI_Face_match = function(){
    Blockly.Python.definitions_['import_aip'] = 'import aip';
    //Blockly.Python.definitions_['import_aip_AipSpeech'] = 'from aip import AipSpeech';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var s = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
    var s2 = Blockly.Python.valueToCode(this, 'VAR2', Blockly.Python.ORDER_ATOMIC);
    var attr = Blockly.Python.valueToCode(this, 'ATTR', Blockly.Python.ORDER_ATOMIC) || '{}';
    var code = v + '.match(' + s + ',' + s2 + ', options=' + attr + ')';   
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.AI_Ocr = function(){
    Blockly.Python.definitions_['import_aip'] = 'import aip';
    //Blockly.Python.definitions_['import_aip_Ocr'] = 'from aip import Ocr';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var addr = Blockly.Python.valueToCode(this, 'ADDR', Blockly.Python.ORDER_ATOMIC);
    var f = Blockly.Python.valueToCode(this, 'FUNC', Blockly.Python.ORDER_ATOMIC);
    var attr = Blockly.Python.valueToCode(this, 'ATTR', Blockly.Python.ORDER_ATOMIC) || '{}';
    var code = v + '.'+ f +'(' + addr + ', options=' + attr + ')';   
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.AI_Nlp = function(){
    Blockly.Python.definitions_['import_aip'] = 'import aip';
    //Blockly.Python.definitions_['import_aip_Nlp'] = 'from aip import Nlp';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var s = Blockly.Python.valueToCode(this, 'STR', Blockly.Python.ORDER_ATOMIC);
    var f = Blockly.Python.valueToCode(this, 'FUNC', Blockly.Python.ORDER_ATOMIC);
    var attr = Blockly.Python.valueToCode(this, 'ATTR', Blockly.Python.ORDER_ATOMIC) || '{}';
    var code = v + '.'+ f +'(' + s + ', options=' + attr + ')';   
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.AI_Nlp_Sim = function(){
    Blockly.Python.definitions_['import_aip'] = 'import aip';
    //Blockly.Python.definitions_['import_aip_Nlp'] = 'from aip import Nlp';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var s1 = Blockly.Python.valueToCode(this, 'STR1', Blockly.Python.ORDER_ATOMIC);
    var s2 = Blockly.Python.valueToCode(this, 'STR2', Blockly.Python.ORDER_ATOMIC);
    var f = Blockly.Python.valueToCode(this, 'FUNC', Blockly.Python.ORDER_ATOMIC);
    var attr = Blockly.Python.valueToCode(this, 'ATTR', Blockly.Python.ORDER_ATOMIC) || '{}';
    var code = v + '.'+ f +'(' + s1 + ',' + s2 + ', options=' + attr + ')';   
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.AI_Nlp_Topic = function(){
    Blockly.Python.definitions_['import_aip'] = 'import aip';
    //Blockly.Python.definitions_['import_aip_Nlp'] = 'from aip import Nlp';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var s1 = Blockly.Python.valueToCode(this, 'STR1', Blockly.Python.ORDER_ATOMIC);
    var s2 = Blockly.Python.valueToCode(this, 'STR2', Blockly.Python.ORDER_ATOMIC);
    var code = v + '.topic(' + s1 + ',' + s2 + ')';   
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.AI_Nlp_newsSummary = function(){
    Blockly.Python.definitions_['import_aip'] = 'import aip';
    //Blockly.Python.definitions_['import_aip_Nlp'] = 'from aip import Nlp';
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

Blockly.Python.AI_audio = function() {
    Blockly.Python.definitions_['import_audio'] = 'import audio';
    var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
    var num = Blockly.Python.valueToCode(this, 'TIME', Blockly.Python.ORDER_ATOMIC) || '0';
    var code = "audio.audio_record(" + str + ',' + num + ")\n";
    return code;
};

Blockly.Python.AI_photo = function() {
    Blockly.Python.definitions_['import_cam'] = 'import cam';
    var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
    var button = Blockly.Python.valueToCode(this, 'BUT', Blockly.Python.ORDER_ATOMIC) || '\"\"';
    var code = "cam.photo_capture(" + str + ',' + button + ")\n";
    return code;
};

Blockly.Python.AI_result = function() {
  var varName = Blockly.Python.valueToCode(this, 'AI', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var ctype = this.getFieldValue('CTYPE');
  if(ctype == 'Image'){var code = varName + '["result"][0]["keyword"]'}
  if(ctype == 'Speech'){var code = varName + '["result"][0]'}
  if(ctype == 'Face' || ctype == 'OcrSimilarity'){var code = varName + '["score"]'}  
  if(ctype == 'Ocr'){var code = varName + '["words_result"]'}  

  return [code, Blockly.Python.ORDER_ATOMIC];
};