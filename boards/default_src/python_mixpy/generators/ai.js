export const AI_ChooseAndGet = function (_, generator) {
    var type = this.getFieldValue('TYPE');
    generator.definitions_['import_FileDialog'] = 'import FileDialog';
    var code = 'FileDialog.' + type + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const AI_client = function (_, generator) {
    var ctype = this.getFieldValue('CTYPE');
    generator.definitions_['import_aip'] = 'import aip';
    //generator.definitions_['import_aip_' + ctype] = 'from aip import '+ ctype;
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var api_key = generator.valueToCode(this, 'API_KEY', generator.ORDER_ATOMIC);
    var secret_key = generator.valueToCode(this, 'SECRET_KEY', generator.ORDER_ATOMIC);
    var code = v + ' = ' + 'aip.' + ctype + '(' + api_key + ', ' + secret_key + ')\n';
    return code;
}

export const AI_Speech_synthesis = function (_, generator) {
    generator.definitions_['import_aip'] = 'import aip';
    //generator.definitions_['import_aip_AipSpeech'] = 'from aip import AipSpeech';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var s = generator.valueToCode(this, 'STR', generator.ORDER_ATOMIC);
    var attr = generator.valueToCode(this, 'ATTR', generator.ORDER_ATOMIC) || '{}';
    var code = v + '.synthesis(' + s + ', options=' + attr + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const AI_Speech_asr = function (_, generator) {
    generator.definitions_['import_aip'] = 'import aip';
    //generator.definitions_['import_aip_AipSpeech'] = 'from aip import AipSpeech';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    //var f = generator.valueToCode(this, 'FUNC', generator.ORDER_ATOMIC);
    var fn = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC) || '""';
    var attr = generator.valueToCode(this, 'ATTR', generator.ORDER_ATOMIC) || '{}';
    //var code = v + '.'+ f +'(' + fn + ', options=' + attr + ')';
    var code = v + '.asr(' + fn + ', options=' + attr + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const AI_ImageClassify = function (_, generator) {
    generator.definitions_['import_aip'] = 'import aip';
    //generator.definitions_['import_aip_AipImageClassify'] = 'from aip import AipImageClassify';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var addr = generator.valueToCode(this, 'ADDR', generator.ORDER_ATOMIC);
    var f = generator.valueToCode(this, 'FUNC', generator.ORDER_ATOMIC);
    var attr = generator.valueToCode(this, 'ATTR', generator.ORDER_ATOMIC) || '{}';
    var code = v + '.' + f + '(' + addr + ', options=' + attr + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const AI_Face_match = function (_, generator) {
    generator.definitions_['import_aip'] = 'import aip';
    //generator.definitions_['import_aip_AipSpeech'] = 'from aip import AipSpeech';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var s = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var s2 = generator.valueToCode(this, 'VAR2', generator.ORDER_ATOMIC);
    var attr = generator.valueToCode(this, 'ATTR', generator.ORDER_ATOMIC) || '{}';
    var code = v + '.match(' + s + ',' + s2 + ', options=' + attr + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const AI_Ocr = function (_, generator) {
    generator.definitions_['import_aip'] = 'import aip';
    //generator.definitions_['import_aip_Ocr'] = 'from aip import Ocr';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var addr = generator.valueToCode(this, 'ADDR', generator.ORDER_ATOMIC);
    var f = generator.valueToCode(this, 'FUNC', generator.ORDER_ATOMIC);
    var attr = generator.valueToCode(this, 'ATTR', generator.ORDER_ATOMIC) || '{}';
    var code = v + '.' + f + '(' + addr + ', options=' + attr + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const AI_Nlp = function (_, generator) {
    generator.definitions_['import_aip'] = 'import aip';
    //generator.definitions_['import_aip_Nlp'] = 'from aip import Nlp';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var s = generator.valueToCode(this, 'STR', generator.ORDER_ATOMIC);
    var f = generator.valueToCode(this, 'FUNC', generator.ORDER_ATOMIC);
    var attr = generator.valueToCode(this, 'ATTR', generator.ORDER_ATOMIC) || '{}';
    var code = v + '.' + f + '(' + s + ', options=' + attr + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const AI_Nlp_Sim = function (_, generator) {
    generator.definitions_['import_aip'] = 'import aip';
    //generator.definitions_['import_aip_Nlp'] = 'from aip import Nlp';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var s1 = generator.valueToCode(this, 'STR1', generator.ORDER_ATOMIC);
    var s2 = generator.valueToCode(this, 'STR2', generator.ORDER_ATOMIC);
    var f = generator.valueToCode(this, 'FUNC', generator.ORDER_ATOMIC);
    var attr = generator.valueToCode(this, 'ATTR', generator.ORDER_ATOMIC) || '{}';
    var code = v + '.' + f + '(' + s1 + ',' + s2 + ', options=' + attr + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const AI_Nlp_Topic = function (_, generator) {
    generator.definitions_['import_aip'] = 'import aip';
    //generator.definitions_['import_aip_Nlp'] = 'from aip import Nlp';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var s1 = generator.valueToCode(this, 'STR1', generator.ORDER_ATOMIC);
    var s2 = generator.valueToCode(this, 'STR2', generator.ORDER_ATOMIC);
    var code = v + '.topic(' + s1 + ',' + s2 + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const AI_Nlp_newsSummary = function (_, generator) {
    generator.definitions_['import_aip'] = 'import aip';
    //generator.definitions_['import_aip_Nlp'] = 'from aip import Nlp';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var s = generator.valueToCode(this, 'STR', generator.ORDER_ATOMIC);
    var n = generator.valueToCode(this, 'LEN', generator.ORDER_ATOMIC);
    var attr = generator.valueToCode(this, 'ATTR', generator.ORDER_ATOMIC) || '{}';
    var code = v + '.newsSummary(' + s + ',' + n + ', options=' + attr + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const AI_ImageClassify_Func = function (_, generator) {
    var code = this.getFieldValue('TYPE');
    return [code, generator.ORDER_ATOMIC];
}

export const AI_Ocr_Func = function (_, generator) {
    var code = this.getFieldValue('TYPE');
    return [code, generator.ORDER_ATOMIC];
}

export const AI_Nlp_Func = function (_, generator) {
    var code = this.getFieldValue('TYPE');
    return [code, generator.ORDER_ATOMIC];
}

export const AI_Nlp_Func_sim = function (_, generator) {
    var code = this.getFieldValue('TYPE');
    return [code, generator.ORDER_ATOMIC];
}

export const AI_audio = function (_, generator) {
    generator.definitions_['import_audio'] = 'import audio';
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    var num = generator.valueToCode(this, 'TIME', generator.ORDER_ATOMIC) || '0';
    var code = "audio.audio_record(" + str + ',' + num + ")\n";
    return code;
}

export const AI_photo = function (_, generator) {
    generator.definitions_['import_audio'] = 'import cam';
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '""';
    var button = generator.valueToCode(this, 'BUT', generator.ORDER_ATOMIC) || '""';
    var code = "cam.photo_capture(" + str + ',' + button + ")\n";
    return code;
}

export const AI_result = function (_, generator) {
    var varName = generator.valueToCode(this, 'AI', generator.ORDER_ASSIGNMENT) || '0';
    var ctype = this.getFieldValue('CTYPE');
    if (ctype == 'Image') { var code = varName + '["result"][0]["keyword"]' }
    if (ctype == 'Speech') { var code = varName + '["result"][0]' }
    if (ctype == 'Face' || ctype == 'OcrSimilarity') { var code = varName + '["score"]' }
    if (ctype == 'Ocr') { var code = varName + '["words_result"]' }

    return [code, generator.ORDER_ATOMIC];
}