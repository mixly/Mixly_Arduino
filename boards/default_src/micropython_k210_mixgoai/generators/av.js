export const spk_init = function (_, generator) {
    generator.definitions_['import player'] = 'import player';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var BCK = generator.valueToCode(this, 'BCK', generator.ORDER_ATOMIC);
    var WS = generator.valueToCode(this, 'WS', generator.ORDER_ATOMIC);
    var DAT = generator.valueToCode(this, 'DAT', generator.ORDER_ATOMIC);
    var code = "" + sub + "=player.spk_init(" + BCK + "," + WS + "," + DAT + ")\n";
    return code;
}

export const mic_init = function (_, generator) {
    generator.definitions_['import player'] = 'import player';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    // var BCK = generator.valueToCode(this, 'BCK',generator.ORDER_ATOMIC);
    // var WS = generator.valueToCode(this, 'WS',generator.ORDER_ATOMIC);
    // var DAT = generator.valueToCode(this, 'DAT',generator.ORDER_ATOMIC);
    var code = "" + sub + "=player.mic_init()\n";
    return code;
}

export const audio_play = function (_, generator) {
    generator.definitions_['import player'] = 'import player';
    var path = generator.valueToCode(this, 'path', generator.ORDER_ATOMIC);
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var volume = generator.valueToCode(this, 'volume', generator.ORDER_ATOMIC);
    var code = "player.audio_play(" + sub + "," + path + "," + volume + ")\n";
    return code;
}

export const audio_record = function (_, generator) {
    generator.definitions_['import player'] = 'import player';
    var path = generator.valueToCode(this, 'path', generator.ORDER_ATOMIC);
    var time = generator.valueToCode(this, 'time', generator.ORDER_ATOMIC);
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = "player.audio_record(" + sub + "," + path + "," + time + ")\n";
    return code;
}

export const video_play = function (_, generator) {
    generator.definitions_['import player'] = 'import player';
    var path = generator.valueToCode(this, 'path', generator.ORDER_ATOMIC);
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var volume = generator.valueToCode(this, 'volume', generator.ORDER_ATOMIC);
    var code = "player.video_play(" + sub + "," + path + "," + volume + ")\n";
    return code;
}

export const video_record = function (_, generator) {
    generator.definitions_['import player'] = 'import player';
    var path = generator.valueToCode(this, 'path', generator.ORDER_ATOMIC);
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var time = generator.valueToCode(this, 'time', generator.ORDER_ATOMIC);
    var code = "player.video_record(" + sub + "," + path + "," + time + ")\n";
    return code;
}