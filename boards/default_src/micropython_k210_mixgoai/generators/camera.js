export const mode = function (_, generator) {
    var code = this.getFieldValue('flag');
    return [code, generator.ORDER_ATOMIC];
}

export const size = function (_, generator) {
    var code = this.getFieldValue('flag');
    return [code, generator.ORDER_ATOMIC];
}

export const camera_init = function (_, generator) {
    generator.definitions_['import_sensor'] = 'import sensor';
    var key1 = generator.valueToCode(this, 'key1', generator.ORDER_ATOMIC);
    var key2 = generator.valueToCode(this, 'key2', generator.ORDER_ATOMIC);
    var key3 = generator.valueToCode(this, 'key3', generator.ORDER_ATOMIC);
    var key4 = generator.valueToCode(this, 'key4', generator.ORDER_ATOMIC);
    var code1 = "sensor.reset()\n";
    var code2 = "sensor.set_pixformat(" + key1 + ")\n";
    var code3 = "sensor.set_framesize(" + key2 + ")\n";
    var code4 = "sensor.run(" + key3 + ")\n";
    var code5 = "sensor.skip_frames(" + key4 + ")\n";
    var code = code1 + code2 + code3 + code4 + code5;
    return code;
}

export const camera_reset = function (_, generator) {
    generator.definitions_['import_sensor'] = 'import sensor';
    var code = "sensor.reset()\n";
    return code;
}

export const camera_set_pixformat = function (_, generator) {
    generator.definitions_['import_sensor'] = 'import sensor';
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var code = "sensor.set_pixformat(" + key + ")\n";
    return code;
}

export const camera_set_framesize = function (_, generator) {
    generator.definitions_['import_sensor'] = 'import sensor';
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var code = "sensor.set_framesize(" + key + ")\n";
    return code;
}

export const camera_run = function (_, generator) {
    generator.definitions_['import_sensor'] = 'import sensor';
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var code = "sensor.run(" + key + ")\n";
    return code;
}

export const camera_skip_frames = function (_, generator) {
    generator.definitions_['import_sensor'] = 'import sensor';
    var frame = generator.valueToCode(this, 'frame', generator.ORDER_ATOMIC);
    var code = "sensor.skip_frames(n=" + frame + ")\n";
    return code;
}

export const camera_snapshot = function (_, generator) {
    generator.definitions_['import_sensor'] = 'import sensor';
    var code = 'sensor.snapshot()';
    return [code, generator.ORDER_ATOMIC];
}

export const camera_shutdown = function (_, generator) {
    generator.definitions_['import_sensor'] = 'import sensor';
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var code = "sensor.shutdown(" + key + ")\n";
    return code;
}

export const camera_set_hmirror = function (_, generator) {
    generator.definitions_['import_sensor'] = 'import sensor';
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var code = "sensor.set_hmirror(" + key + ")\n";
    return code;
}

export const camera_set_vflip = function (_, generator) {
    generator.definitions_['import_sensor'] = 'import sensor';
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var code = "sensor.set_vflip(" + key + ")\n";
    return code;
}

export const camera_set_colorbar = function (_, generator) {
    generator.definitions_['import_sensor'] = 'import sensor';
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var code = "sensor.set_colorbar(" + key + ")\n";
    return code;
}

export const camera_getinfo = function (_, generator) {
    generator.definitions_['import_sensor'] = 'import sensor';
    var key = this.getFieldValue('key');
    var code = "sensor." + key + "()";
    return [code, generator.ORDER_ATOMIC];
}

export const camera_setmun = function (_, generator) {
    generator.definitions_['import_sensor'] = 'import sensor';
    var key = this.getFieldValue('key');
    var num = generator.valueToCode(this, 'num', generator.ORDER_ATOMIC);
    var code = "sensor." + key + "(" + num + ")\n";
    return code;
}

export const camera_set_windowing = function (_, generator) {
    generator.definitions_['import_sensor'] = 'import sensor';
    var numa = generator.valueToCode(this, 'numa', generator.ORDER_ATOMIC);
    var numb = generator.valueToCode(this, 'numb', generator.ORDER_ATOMIC);
    var code = "sensor.set_windowing((" + numa + "," + numb + "))\n";
    return code;
}