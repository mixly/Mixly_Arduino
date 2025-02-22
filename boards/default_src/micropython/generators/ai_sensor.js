export const ai_sensor_use_uart_init = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = v + '=mixgo_ai.AI(' + key + ',quick=1)\n';
    return code;
}

export const ai_sensor_qrcode_lite = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var type = this.getFieldValue('TYPE');
    var code = sub + '.find_' + type + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_config = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var rx = generator.valueToCode(this, 'RX', generator.ORDER_ATOMIC);
    var tx = generator.valueToCode(this, 'TX', generator.ORDER_ATOMIC);
    var dropdown_uart = this.getFieldValue('mode');
    var code = v + '.configure(' + tx + ',' + rx + ',restart=' + dropdown_uart + ')\n';
    return code;
}

export const ai_sensor_rgb = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var led1 = generator.valueToCode(this, 'led1', generator.ORDER_ATOMIC);
    var led2 = generator.valueToCode(this, 'led2', generator.ORDER_ATOMIC);
    var code = v + '.led_rgb(' + led1 + ',' + led2 + ')\n';
    return code;
}

export const ai_sensor_qrcode = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_find_qrcodes = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = v + '.find_qrcodes()';
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_barcode = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_find_barcodes = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = v + '.find_barcodes()';
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_tag = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_find_tags = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = v + '.find_apriltags()';
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_line = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_find_lines = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var v1 = generator.valueToCode(this, 'VAR1', generator.ORDER_ATOMIC);
    var v2 = generator.valueToCode(this, 'VAR2', generator.ORDER_ATOMIC);
    var v3 = generator.valueToCode(this, 'VAR3', generator.ORDER_ATOMIC);
    var code = v + '.find_lines(' + v1 + ',' + v2 + ',' + v3 + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_circle = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_find_circles = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var v1 = generator.valueToCode(this, 'VAR1', generator.ORDER_ATOMIC);
    var v2 = generator.valueToCode(this, 'VAR2', generator.ORDER_ATOMIC);
    var v3 = generator.valueToCode(this, 'VAR3', generator.ORDER_ATOMIC);
    var code = v + '.find_circles(' + v1 + ',' + v2 + ',' + v3 + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_rect = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_find_rects = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var v1 = generator.valueToCode(this, 'VAR1', generator.ORDER_ATOMIC);
    var code = v + '.find_rects(' + v1 + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_color = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + key;
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_find_colors = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = v + '.find_colors()';
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_color_chases_result = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_color_chases = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var v1 = generator.valueToCode(this, 'VAR1', generator.ORDER_ATOMIC);
    var v2 = generator.valueToCode(this, 'VAR2', generator.ORDER_ATOMIC);
    var v3 = generator.valueToCode(this, 'VAR3', generator.ORDER_ATOMIC);
    var code = v + '.color_track(' + v1 + ',' + v2 + ',' + v3 + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_ailocal_train = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var v1 = generator.valueToCode(this, 'VAR1', generator.ORDER_ATOMIC);
    var v2 = generator.valueToCode(this, 'VAR2', generator.ORDER_ATOMIC);
    var v3 = generator.valueToCode(this, 'VAR3', generator.ORDER_ATOMIC);
    var v4 = generator.valueToCode(this, 'VAR4', generator.ORDER_ATOMIC);
    var code = v + '.ailocal_train(' + v1 + ',' + v2 + ',' + v3 + ',' + v4 + ')\n';
    return code;
}

export const ai_sensor_ailocal_class = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var v1 = generator.valueToCode(this, 'VAR1', generator.ORDER_ATOMIC);
    var v2 = generator.valueToCode(this, 'VAR2', generator.ORDER_ATOMIC);
    var v4 = generator.valueToCode(this, 'VAR4', generator.ORDER_ATOMIC);
    var code = v + '.ailocal_class(' + v1 + ',' + v2 + ',' + v4 + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_ailocal_class_result = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_audio_record = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var v1 = generator.valueToCode(this, 'VAR1', generator.ORDER_ATOMIC);
    var v2 = generator.valueToCode(this, 'VAR2', generator.ORDER_ATOMIC);
    var code = v + '.audio_record(path=' + v1 + ',times=' + v2 + ')\n';
    return code;
}

export const ai_sensor_audio_play = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var v1 = generator.valueToCode(this, 'VAR1', generator.ORDER_ATOMIC);
    var v2 = generator.valueToCode(this, 'VAR2', generator.ORDER_ATOMIC);
    var code = v + '.audio_play(path=' + v1 + ',volume=' + v2 + ')\n';
    return code;
}

export const ai_sensor_yolo_recognize = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var v1 = generator.valueToCode(this, 'VAR1', generator.ORDER_ATOMIC);
    var v2 = generator.valueToCode(this, 'VAR2', generator.ORDER_ATOMIC);
    var v4 = generator.valueToCode(this, 'VAR4', generator.ORDER_ATOMIC);
    var code = v + '.yolo_recognize(' + v1 + ',' + v2 + ',' + v4 + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_yolo_recognize_result = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_asr_recognize = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var v1 = generator.valueToCode(this, 'VAR1', generator.ORDER_ATOMIC);
    var v2 = generator.valueToCode(this, 'VAR2', generator.ORDER_ATOMIC);
    var code = v + '.asr_recognize(' + v1 + ',threshold=' + v2 + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_licenseplate = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_find_licenseplates = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = v + '.find_licenseplate()';
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_face = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_classifier_faces = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = v + '.face_detect()';
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_20object = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key;
    return [code, generator.ORDER_ATOMIC];
}

export const ai_sensor_find_20objects = function (_, generator) {
    generator.definitions_['import_mixgo_ai'] = 'import mixgo_ai';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = v + '.find_20object()';
    return [code, generator.ORDER_ATOMIC];
}