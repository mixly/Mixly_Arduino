import * as Blockly from 'blockly/core';

export const tuple_anchor = function (_, generator) {
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var text = this.getFieldValue('TEXT');
    var code = varName + '= ' + '(' + text + ')\n';
    return code;
}

export const tuple_calss = function (_, generator) {
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var text = this.getFieldValue('TEXT');
    var code = varName + '= ' + '[' + text + ']\n';
    return code;
}

export const KPU_load = function (_, generator) {
    generator.definitions_['import board'] = 'import board';
    generator.definitions_['import_KPU'] = 'import KPU as kpu';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var path = generator.valueToCode(this, 'path', generator.ORDER_ATOMIC);
    var code = sub + " = kpu.load(" + path + ")\n";
    return code;
}

export const KPU_load1 = function (_, generator) {
    generator.definitions_['import board'] = 'import board';
    generator.definitions_['import_KPU'] = 'import KPU as kpu';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var path = generator.valueToCode(this, 'path', generator.ORDER_ATOMIC);
    var code = sub + " = kpu.load(" + path + ")\n";
    return code;
}

export const KPU_init_yolo2 = function (_, generator) {
    generator.definitions_['import_KPU'] = 'import KPU as kpu';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var th = generator.valueToCode(this, 'threshold', generator.ORDER_ATOMIC);
    var nm = generator.valueToCode(this, 'nms_value', generator.ORDER_ATOMIC);
    var an = generator.valueToCode(this, 'anchor_num', generator.ORDER_ATOMIC);
    var anchor = generator.valueToCode(this, 'anchor', generator.ORDER_ATOMIC);
    var code = "kpu.init_yolo2(" + sub + "," + th + "," + nm + "," + an + "," + anchor + ")\n";
    return code;
}

export const KPU_run_yolo2 = function (_, generator) {
    generator.definitions_['import_KPU'] = 'import KPU as kpu';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var img = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "kpu.run_yolo2(" + sub + "," + img + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const KPU_forward = function (_, generator) {
    generator.definitions_['import_KPU'] = 'import KPU as kpu';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var img = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "kpu.forward(" + sub + "," + img + ")[:]";
    return [code, generator.ORDER_ATOMIC];
}

export const KPU_analysis = function (_, generator) {
    generator.definitions_['import_KPU'] = 'import KPU as kpu';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const aionenet_nic_init = function (_, generator) {
    generator.definitions_['import aionenet'] = 'import aionenet';
    var account = generator.valueToCode(this, 'account', generator.ORDER_ATOMIC);
    var passwor = generator.valueToCode(this, 'password', generator.ORDER_ATOMIC);
    var code = "aionenet.nic_init(" + account + "," + passwor + ")\n";
    return code;
}

export const aionenet_token = function (_, generator) {
    generator.definitions_['import aionenet'] = 'import aionenet';
    var account = generator.valueToCode(this, 'account', generator.ORDER_ATOMIC);
    var passwor = generator.valueToCode(this, 'password', generator.ORDER_ATOMIC);
    var code = "aionenet.token(" + account + "," + passwor + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const aionenet_API = function (_, generator) {
    generator.definitions_['import aionenet'] = 'import aionenet';
    var img = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var token = generator.valueToCode(this, 'token', generator.ORDER_ATOMIC);
    var api = this.getFieldValue('api');
    var code = 'aionenet.post_ai(' + img + ',"' + api + '",' + token + ')';
    return [code, generator.ORDER_ATOMIC];
}

///---------------------------------------------------------------
export const ailocal_training = function (_, generator) {
    generator.definitions_['import ailocal'] = 'import ailocal';
    var calss = generator.valueToCode(this, 'calss', generator.ORDER_ATOMIC);
    var sample = generator.valueToCode(this, 'sample', generator.ORDER_ATOMIC);
    var save = generator.valueToCode(this, 'save', generator.ORDER_ATOMIC);
    var code = "ailocal.training(" + calss + "," + sample + "," + save + ")\n";
    return code;
}

export const ailocal_loading = function (_, generator) {
    generator.definitions_['import ailocal'] = 'import ailocal';
    var path = generator.valueToCode(this, 'path', generator.ORDER_ATOMIC);
    var code = "ailocal.loading(" + path + ")\n";
    return code;
}

export const ailocal_predict = function (_, generator) {
    generator.definitions_['import ailocal'] = 'import ailocal';
    var calss = generator.valueToCode(this, 'calss', generator.ORDER_ATOMIC);
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "ailocal.predict(" + sub + "," + calss + ")";
    return [code, generator.ORDER_ATOMIC];
}

//---开始------------新增---20210302---------------------------------------------------

export const ai_face_init = function (_, generator) {
    generator.definitions_['import ai_face'] = 'import ai_face';
    var FD = generator.valueToCode(this, 'FD', generator.ORDER_ATOMIC);
    var LD = generator.valueToCode(this, 'LD', generator.ORDER_ATOMIC);
    var FE = generator.valueToCode(this, 'FE', generator.ORDER_ATOMIC);
    var code = "ai_face.init(" + FD + "," + LD + "," + FE + ")\n";
    return code;
}

export const ai_face_train = function (_, generator) {
    generator.definitions_['import ai_face'] = 'import ai_face';
    var img = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var names = generator.valueToCode(this, 'names', generator.ORDER_ATOMIC);
    var threshold = generator.valueToCode(this, 'threshold', generator.ORDER_ATOMIC);
    var code = 'ai_face.train(' + img + ',' + names + ',' + threshold + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const ai_face_info = function (_, generator) {
    generator.definitions_['import ai_face'] = 'import ai_face';
    var key = this.getFieldValue('key');
    var code = 'ai_face.' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

//---开始------------新增---20210302---------------------------------------------------