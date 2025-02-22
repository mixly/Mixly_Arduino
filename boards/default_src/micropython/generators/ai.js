import * as Mixly from 'mixly';

export const MICROPYTHON_AI_client = function (_, generator) {
    var ctype = this.getFieldValue('CTYPE');
    generator.definitions_['import_baidu_speech'] = 'import baidu_speech';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var api_key = generator.valueToCode(this, 'API_KEY', generator.ORDER_ATOMIC);
    var sound = '';
    if (ctype == "ASR") {
        var version = Mixly.Boards.getSelectedBoardKey().split(':')[2];
        generator.definitions_['import_' + version + '_onboard_sound'] = "from " + version + " import onboard_sound";
        sound += 'onboard_sound.adc' + ',';
    }
    var secret_key = generator.valueToCode(this, 'SECRET_KEY', generator.ORDER_ATOMIC);
    var code = v + ' = ' + 'baidu_speech.' + ctype + '(' + sound + api_key + ', ' + secret_key + ')\n';
    return code;
}

export const MICROPYTHON_AI_Speech_unit = function (_, generator) {
    generator.definitions_['import_baidu_speech'] = 'import baidu_speech';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var id = generator.valueToCode(this, 'ID', generator.ORDER_ATOMIC);
    var s = generator.valueToCode(this, 'STR', generator.ORDER_ATOMIC);
    var code = v + '.chatbot(' + id + ',' + s + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const MICROPYTHON_AI_Speech_asr = function (_, generator) {
    var language = this.getFieldValue('LANGUAGE');
    generator.definitions_['import_baidu_speech'] = 'import baidu_speech';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var fn = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC) || '""';
    var code = v + '.recognize(record_time=' + fn + ',dev_pid=' + language + ')';
    return [code, generator.ORDER_ATOMIC];
}

