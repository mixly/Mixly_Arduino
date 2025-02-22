export const angle = function (_, generator) {
    var code = this.getFieldValue('flag');
    return [code, generator.ORDER_ATOMIC];
}

export const lcd_color = function (_, generator) {
    var code = this.getFieldValue('flag');
    return [code, generator.ORDER_ATOMIC];
}

export const on_off = function (_, generator) {
    var code = this.getFieldValue('flag');
    return [code, generator.ORDER_ATOMIC];
}

export const lcd_init = function (_, generator) {
    generator.definitions_['import board'] = 'import board';
    generator.definitions_['import_lcd'] = 'import lcd';
    var freq = generator.valueToCode(this, 'freq', generator.ORDER_ATOMIC);
    var color = generator.valueToCode(this, 'color', generator.ORDER_ATOMIC);
    var code = "lcd.init(freq=" + freq + ",color=" + color + ")\n";
    return code;
}

export const lcd_colour = function (_, generator) {
    generator.definitions_['import_lcd'] = 'import lcd';
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var code = "" + key + "";
    return [code, generator.ORDER_ATOMIC];
}

export const lcd_width = function (_, generator) {
    generator.definitions_['import_lcd'] = 'import lcd';
    var key = this.getFieldValue('key');
    var code = 'lcd.' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const lcd_display = function (_, generator) {
    generator.definitions_['import_lcd'] = 'import lcd';
    var img = generator.valueToCode(this, 'img', generator.ORDER_ATOMIC);
    var code = "lcd.display(" + img + ")\n";
    return code;
}

export const lcd_clear = function (_, generator) {
    generator.definitions_['import_lcd'] = 'import lcd';
    var color = generator.valueToCode(this, 'color', generator.ORDER_ATOMIC);
    var code = "lcd.clear(" + color + ")\n";
    return code;
}

export const lcd_rotation = function (_, generator) {
    generator.definitions_['import_lcd'] = 'import lcd';
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var code = "lcd.rotation(" + key + ")\n";
    return code;
}

export const lcd_mirror = function (_, generator) {
    generator.definitions_['import_lcd'] = 'import lcd';
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var code = "lcd.mirror(" + key + ")\n";
    return code;
}

export const lcd_draw_string = function (_, generator) {
    generator.definitions_['import_lcd'] = 'import lcd';
    var x = generator.valueToCode(this, 'x', generator.ORDER_ATOMIC);
    var y = generator.valueToCode(this, 'y', generator.ORDER_ATOMIC);
    var tex = generator.valueToCode(this, 'text', generator.ORDER_ATOMIC);
    var color_T = generator.valueToCode(this, 'color_T', generator.ORDER_ATOMIC);
    var color_S = generator.valueToCode(this, 'color_S', generator.ORDER_ATOMIC);
    var code = "lcd.draw_string(" + x + "," + y + "," + tex + "," + color_T + "," + color_S + ")\n";
    return code;
}

export const touch_init = function (_, generator) {
    generator.definitions_['import_touchscreen'] = 'import touchscreen as ts';
    var I2C = generator.valueToCode(this, 'I2C', generator.ORDER_ATOMIC);
    var code = "ts.init(" + I2C + ")\n";
    return code;
}

export const touch_calibrate = function (_, generator) {
    generator.definitions_['import_touchscreen'] = 'import touchscreen as ts';
    var code = "ts.calibrate()\n";
    return code;
}

export const touch_read = function (_, generator) {
    generator.definitions_['import_touchscreen'] = 'import touchscreen as ts';
    var key = this.getFieldValue('key');
    var code = 'ts.read()' + key + '';
    return [code, generator.ORDER_ATOMIC];
}

export const touch_info = function (_, generator) {
    generator.definitions_['import_touchscreen'] = 'import touchscreen as ts';
    var key = this.getFieldValue('key');
    var code = '' + key + '';
    return [code, generator.ORDER_ATOMIC];
}

/**/