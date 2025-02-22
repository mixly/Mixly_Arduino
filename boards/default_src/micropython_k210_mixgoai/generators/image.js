export const true_false = function (_, generator) {
    var code = this.getFieldValue('flag');
    return [code, generator.ORDER_ATOMIC];
}

export const image_RGB = function (_, generator) {
    var R = generator.valueToCode(this, 'R', generator.ORDER_ATOMIC);
    var G = generator.valueToCode(this, 'G', generator.ORDER_ATOMIC);
    var B = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC);
    var code = '[' + R + ',' + G + ',' + B + ']';
    return [code, generator.ORDER_ATOMIC];
}

export const image_Image = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var path = generator.valueToCode(this, 'path', generator.ORDER_ATOMIC);
    var code = sub + " = image.Image(" + path + ")\n";
    return code;
}

export const image_Image1 = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = sub + " = image.Image()\n";
    return code;
}

export const image_getinfo = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const image_save = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var path = generator.valueToCode(this, 'path', generator.ORDER_ATOMIC);
    var code = sub + ".save(" + path + ")\n";
    return code;
}

//----开始--------------cool.ai-----弃用字体加载，出厂内存加载------------------

export const image_font_free = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var code = "image.font_free()\n";
    return code;
}

export const image_font_load = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var path = generator.valueToCode(this, 'path', generator.ORDER_ATOMIC);
    var code = "image.font_load(image.UTF8, 16, 16, " + path + ")\n";
    return code;
}

export const image_draw_string_flash = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    generator.definitions_['font_load'] = 'image.font_load(image.UTF8, 16, 16, 0xA00000)';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var x0 = generator.valueToCode(this, 'x0', generator.ORDER_ATOMIC);
    var y0 = generator.valueToCode(this, 'y0', generator.ORDER_ATOMIC);
    var t = generator.valueToCode(this, 'tex', generator.ORDER_ATOMIC);
    var color = generator.valueToCode(this, 'color', generator.ORDER_ATOMIC);
    var s = generator.valueToCode(this, 'scale', generator.ORDER_ATOMIC);
    var x = generator.valueToCode(this, 'x_spacing', generator.ORDER_ATOMIC);
    var code = sub + '.draw_string(' + x0 + ',' + y0 + ',str.encode(' + t + '),color=' + color + ',scale=' + s + ',x_spacing=' + x + ',mono_space=1)';
    return [code, generator.ORDER_ATOMIC];
}

//----结束--------------cool.ai-----弃用字体加载，出厂内存加载------------------

export const image_draw_string_UTF = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var x0 = generator.valueToCode(this, 'x0', generator.ORDER_ATOMIC);
    var y0 = generator.valueToCode(this, 'y0', generator.ORDER_ATOMIC);
    var t = generator.valueToCode(this, 'tex', generator.ORDER_ATOMIC);
    var color = generator.valueToCode(this, 'color', generator.ORDER_ATOMIC);
    var s = generator.valueToCode(this, 'scale', generator.ORDER_ATOMIC);
    var x = generator.valueToCode(this, 'x_spacing', generator.ORDER_ATOMIC);
    var code = sub + '.draw_string(' + x0 + ',' + y0 + ',str.encode(' + t + '),color=' + color + ',scale=' + s + ',x_spacing=' + x + ',mono_space=1)';
    return [code, generator.ORDER_ATOMIC];
}

export const image_draw_string = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var x0 = generator.valueToCode(this, 'x0', generator.ORDER_ATOMIC);
    var y0 = generator.valueToCode(this, 'y0', generator.ORDER_ATOMIC);
    var t = generator.valueToCode(this, 'tex', generator.ORDER_ATOMIC);
    var color = generator.valueToCode(this, 'color', generator.ORDER_ATOMIC);
    var s = generator.valueToCode(this, 'scale', generator.ORDER_ATOMIC);
    var code = sub + '.draw_string(' + x0 + ',' + y0 + ',' + t + ',' + color + ',' + s + ',mono_space=0)';
    return [code, generator.ORDER_ATOMIC];
}

export const image_copy = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var LIST = generator.valueToCode(this, 'LIST', generator.ORDER_ATOMIC);
    var code = sub + '.copy(' + LIST + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_compress = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var quality = generator.valueToCode(this, 'quality', generator.ORDER_ATOMIC);
    var code = sub + '.compress(' + quality + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_clear = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = sub + ".clear()\n";
    return code;
}

export const image_tonew = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const image_set_pixel = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var LIST = generator.valueToCode(this, 'LIST', generator.ORDER_ATOMIC);
    var color = generator.valueToCode(this, 'color', generator.ORDER_ATOMIC);
    var code = sub + '.set_pixel(' + LIST + ',' + color + ')\n';
    return code;
}

export const image_get_pixel = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var LIST = generator.valueToCode(this, 'LIST', generator.ORDER_ATOMIC);
    var code = sub + '.get_pixel(' + LIST + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_draw_line = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var list = generator.valueToCode(this, 'LIST', generator.ORDER_ATOMIC);
    var color = generator.valueToCode(this, 'color', generator.ORDER_ATOMIC);
    var t = generator.valueToCode(this, 'thi', generator.ORDER_ATOMIC);
    var code = sub + '.draw_line(' + list + ',' + color + ',' + t + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_draw_arrow = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var list = generator.valueToCode(this, 'LIST', generator.ORDER_ATOMIC);
    var color = generator.valueToCode(this, 'color', generator.ORDER_ATOMIC);
    var t = generator.valueToCode(this, 'thi', generator.ORDER_ATOMIC);
    var code = sub + '.draw_arrow(' + list + ',' + color + ',' + t + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_draw_cross = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var list = generator.valueToCode(this, 'LIST', generator.ORDER_ATOMIC);
    var color = generator.valueToCode(this, 'color', generator.ORDER_ATOMIC);
    var s = generator.valueToCode(this, 'size', generator.ORDER_ATOMIC);
    var t = generator.valueToCode(this, 'thi', generator.ORDER_ATOMIC);
    var code = sub + '.draw_cross(' + list + ',' + color + ',' + s + ',' + t + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_draw_circle = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var list = generator.valueToCode(this, 'LIST', generator.ORDER_ATOMIC);
    var color = generator.valueToCode(this, 'color', generator.ORDER_ATOMIC);
    var t = generator.valueToCode(this, 'thi', generator.ORDER_ATOMIC);
    var f = generator.valueToCode(this, 'fil', generator.ORDER_ATOMIC);
    var code = sub + '.draw_circle(' + list + ',' + color + ',' + t + ',' + f + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_draw_rectangle = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var list = generator.valueToCode(this, 'LIST', generator.ORDER_ATOMIC);
    var color = generator.valueToCode(this, 'color', generator.ORDER_ATOMIC);
    var t = generator.valueToCode(this, 'thi', generator.ORDER_ATOMIC);
    var f = generator.valueToCode(this, 'fil', generator.ORDER_ATOMIC);
    var code = sub + '.draw_rectangle(' + list + ',' + color + ',' + t + ',' + f + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_draw_keypoints = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = generator.valueToCode(this, 'keypoints', generator.ORDER_ATOMIC);
    var color = generator.valueToCode(this, 'color', generator.ORDER_ATOMIC);
    var size = generator.valueToCode(this, 'size', generator.ORDER_ATOMIC);
    var thi = generator.valueToCode(this, 'thi', generator.ORDER_ATOMIC);
    var fil = generator.valueToCode(this, 'fil', generator.ORDER_ATOMIC);
    var code = sub + '.draw_keypoints(' + key + ',' + color + ',' + size + ',' + thi + ',' + fil + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_draw_image = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var list = generator.valueToCode(this, 'LIST', generator.ORDER_ATOMIC);
    var x_scale = generator.valueToCode(this, 'x_scale', generator.ORDER_ATOMIC);
    var y_scale = generator.valueToCode(this, 'y_scale', generator.ORDER_ATOMIC);
    var code = sub + '.draw_image(' + sub + ',' + list + ',' + x_scale + ',' + y_scale + ')';
    return [code, generator.ORDER_ATOMIC];
}

//--形状识别----------------------------------------------//

export const image_find_lines = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var roi = generator.valueToCode(this, 'roi', generator.ORDER_ATOMIC);
    var threshold = generator.valueToCode(this, 'threshold', generator.ORDER_ATOMIC);
    var theta_margin = generator.valueToCode(this, 'theta_margin', generator.ORDER_ATOMIC);
    var rho_margin = generator.valueToCode(this, 'rho_margin', generator.ORDER_ATOMIC);
    var code = sub + '.find_lines(' + roi + ',threshold=' + threshold + ',theta_margin=' + theta_margin + ',rho_margin=' + rho_margin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_find_line_segments = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var roi = generator.valueToCode(this, 'roi', generator.ORDER_ATOMIC);
    var distance = generator.valueToCode(this, 'distance', generator.ORDER_ATOMIC);
    var difference = generator.valueToCode(this, 'difference', generator.ORDER_ATOMIC);
    var code = sub + '.find_line_segments(' + roi + ',' + distance + ',' + difference + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_find_circles = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var roi = generator.valueToCode(this, 'roi', generator.ORDER_ATOMIC);
    var threshold = generator.valueToCode(this, 'threshold', generator.ORDER_ATOMIC);
    var r_min = generator.valueToCode(this, 'r_min', generator.ORDER_ATOMIC);
    var r_max = generator.valueToCode(this, 'r_max', generator.ORDER_ATOMIC);
    var r_step = generator.valueToCode(this, 'r_step', generator.ORDER_ATOMIC);
    var x_margin = generator.valueToCode(this, 'x_margin', generator.ORDER_ATOMIC);
    var y_margin = generator.valueToCode(this, 'y_margin', generator.ORDER_ATOMIC);
    var r_margin = generator.valueToCode(this, 'r_margin', generator.ORDER_ATOMIC);
    var code = sub + '.find_circles(' + roi + ',threshold=' + threshold + ',x_margin=' + x_margin + ',y_margin=' + y_margin + ',r_margin=' + r_margin + ',r_min=' + r_min + ',r_max=' + r_max + ',r_step=' + r_step + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_find_rects = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var roi = generator.valueToCode(this, 'roi', generator.ORDER_ATOMIC);
    var threshold = generator.valueToCode(this, 'threshold', generator.ORDER_ATOMIC);
    var code = sub + '.find_rects(' + roi + ',threshold=' + threshold + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_get_regression = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var roi = generator.valueToCode(this, 'roi', generator.ORDER_ATOMIC);
    var threshold = generator.valueToCode(this, 'threshold', generator.ORDER_ATOMIC);
    var invert = generator.valueToCode(this, 'invert', generator.ORDER_ATOMIC);
    var robust = generator.valueToCode(this, 'robust', generator.ORDER_ATOMIC);
    var code = sub + '.get_regression([' + threshold + '],invert=' + invert + ',roi=' + roi + ',robust=' + robust + ')';
    return [code, generator.ORDER_ATOMIC];
}

//--形状列表解析------------------------------------------//

export const image_line = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const image_circle = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    if (key == "circle")
        var code = '[' + sub + '.x(),' + sub + '.y(),' + sub + '.r()]';
    else
        var code = sub + '.' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const image_rect = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

//--图像滤波------------------------------------------//

export const image_histeq = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var limit = generator.valueToCode(this, 'limit', generator.ORDER_ATOMIC);
    var code = sub + '.histeq(' + key + ',' + limit + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_mean = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var size = generator.valueToCode(this, 'size', generator.ORDER_ATOMIC);
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var offset = generator.valueToCode(this, 'offset', generator.ORDER_ATOMIC);
    var code = sub + '.mean(' + size + ',' + key + ',' + offset + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_cartoon = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var seed = generator.valueToCode(this, 'seed', generator.ORDER_ATOMIC);
    var floa = generator.valueToCode(this, 'float', generator.ORDER_ATOMIC);
    var code = sub + '.cartoon(seed_threshold=' + seed + ',floating_threshold=' + floa + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_erode = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var size = generator.valueToCode(this, 'size', generator.ORDER_ATOMIC);
    var threshold = generator.valueToCode(this, 'threshold', generator.ORDER_ATOMIC);
    var code = sub + '.erode(' + size + ',' + threshold + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_dilate = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var size = generator.valueToCode(this, 'size', generator.ORDER_ATOMIC);
    var threshold = generator.valueToCode(this, 'threshold', generator.ORDER_ATOMIC);
    var code = sub + '.dilate(' + size + ',' + threshold + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_flood_fill = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var list = generator.valueToCode(this, 'LIST', generator.ORDER_ATOMIC);
    var color = generator.valueToCode(this, 'color', generator.ORDER_ATOMIC);
    var seed = generator.valueToCode(this, 'seed', generator.ORDER_ATOMIC);
    var floa = generator.valueToCode(this, 'float', generator.ORDER_ATOMIC);
    var invert = generator.valueToCode(this, 'invert', generator.ORDER_ATOMIC);
    var clear = generator.valueToCode(this, 'clear', generator.ORDER_ATOMIC);
    var code = sub + '.flood_fill(' + list + ',' + seed + ',' + floa + ',' + color + ',' + invert + ',' + clear + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_linpolar = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var code = sub + '.linpolar(' + key + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_invert = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = sub + '.invert()';
    return [code, generator.ORDER_ATOMIC];
}

export const image_lens_corr = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var strength = generator.valueToCode(this, 'strength', generator.ORDER_ATOMIC);
    var zoom = generator.valueToCode(this, 'zoom', generator.ORDER_ATOMIC);
    var code = sub + '.lens_corr(' + strength + ',' + zoom + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_binary = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var threshold = generator.valueToCode(this, 'threshold', generator.ORDER_ATOMIC);
    var invert = generator.valueToCode(this, 'invert', generator.ORDER_ATOMIC);
    var zero = generator.valueToCode(this, 'zero', generator.ORDER_ATOMIC);
    var code = sub + '.binary([' + threshold + '],invert=' + invert + ',zero=' + zero + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_morph = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var size = generator.valueToCode(this, 'size', generator.ORDER_ATOMIC);
    var kernel = generator.valueToCode(this, 'kernel', generator.ORDER_ATOMIC);
    var code = sub + '.morph(' + size + ',' + kernel + ')';
    return [code, generator.ORDER_ATOMIC];
}

//--条二维码----------------------------------------------//

export const image_find_barcodes = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var roi = generator.valueToCode(this, 'roi', generator.ORDER_ATOMIC);
    var code = sub + '.find_barcodes(' + roi + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_find_qrcodes = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var roi = generator.valueToCode(this, 'roi', generator.ORDER_ATOMIC);
    var code = sub + '.find_qrcodes(' + roi + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_find_apriltags = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var roi = generator.valueToCode(this, 'roi', generator.ORDER_ATOMIC);
    var code = sub + '.find_apriltags(' + roi + ')';
    return [code, generator.ORDER_ATOMIC];
}

//--维码列表解析------------------------------------------//

export const image_barcode = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const image_qrcode = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const image_apriltag = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

//--颜色识别----------------------------------------------//

export const image_find_blobs = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var LIST = generator.valueToCode(this, 'LIST', generator.ORDER_ATOMIC);
    var roi = generator.valueToCode(this, 'roi', generator.ORDER_ATOMIC);
    var area1 = generator.valueToCode(this, 'area', generator.ORDER_ATOMIC);
    var pixel = generator.valueToCode(this, 'pixel', generator.ORDER_ATOMIC);
    var margin = generator.valueToCode(this, 'margin', generator.ORDER_ATOMIC);
    var merge = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var code = sub + '.find_blobs([' + LIST + '],roi=' + roi + ',area_threshold=' + area1 + ',pixels_threshold=' + pixel + ',merge=' + merge + ',margin=' + margin + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_get_histogram = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var roi = generator.valueToCode(this, 'roi', generator.ORDER_ATOMIC);
    var code = sub + '.get_histogram(roi=' + roi + ')';
    return [code, generator.ORDER_ATOMIC];
}

//--颜色列表解析------------------------------------------//

export const image_blob = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const image_Histogram = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const image_percentile = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var per = generator.valueToCode(this, 'percentile', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.get_percentile(' + per + ').' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const image_threshold = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.get_threhsold.' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}

//--颜色格式转换------------------------------------------//

export const image_lab_to_rgb = function (_, generator) {
    generator.definitions_['import_image_pic'] = 'import image as pic';
    var LIST = generator.valueToCode(this, 'LIST', generator.ORDER_ATOMIC);
    var code = 'pic.lab_to_rgb(' + LIST + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_rgb_to_lab = function (_, generator) {
    generator.definitions_['import_image_pic'] = 'import image as pic';
    var LIST = generator.valueToCode(this, 'LIST', generator.ORDER_ATOMIC);
    var code = 'pic.rgb_to_lab(' + LIST + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_rgb_to_grayscale = function (_, generator) {
    generator.definitions_['import_image_pic'] = 'import image as pic';
    var LIST = generator.valueToCode(this, 'LIST', generator.ORDER_ATOMIC);
    var code = 'pic.rgb_to_grayscale(' + LIST + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_grayscale_to_rgb = function (_, generator) {
    generator.definitions_['import_image_pic'] = 'import image as pic';
    var g_value = generator.valueToCode(this, 'g_value', generator.ORDER_ATOMIC);
    var code = 'pic.grayscale_to_rgb(' + g_value + ')';
    return [code, generator.ORDER_ATOMIC];
}

//--特征识别----------------------------------------------//

export const image_find_hog = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var roi = generator.valueToCode(this, 'roi', generator.ORDER_ATOMIC);
    var size = generator.valueToCode(this, 'size', generator.ORDER_ATOMIC);
    var code = sub + '.find_hog(' + roi + ',' + size + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_find_keypoints = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var roi = generator.valueToCode(this, 'roi', generator.ORDER_ATOMIC);
    var key = generator.valueToCode(this, 'max_keypoints', generator.ORDER_ATOMIC);
    var threshold = generator.valueToCode(this, 'threshold', generator.ORDER_ATOMIC);
    var scale = generator.valueToCode(this, 'scale_factor', generator.ORDER_ATOMIC);
    var normalized = generator.valueToCode(this, 'normalized', generator.ORDER_ATOMIC);
    var code = sub + '.find_keypoints(roi=' + roi + ',max_keypoints=' + key + ',threshold=' + threshold + ',scale_factor=' + scale + ',normalized=' + normalized + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const image_match_descriptor = function (_, generator) {
    generator.definitions_['import_image_pic'] = 'import image as pic';
    var sub1 = generator.valueToCode(this, 'VAR1', generator.ORDER_ATOMIC);
    var sub2 = generator.valueToCode(this, 'VAR2', generator.ORDER_ATOMIC);
    var threshold = generator.valueToCode(this, 'threshold', generator.ORDER_ATOMIC);
    var code = 'pic.match_descriptor(' + sub1 + ',' + sub2 + ',threshold=' + threshold + ')';
    return [code, generator.ORDER_ATOMIC];
}

//--颜色列表解析------------------------------------------//

export const image_kptmatch = function (_, generator) {
    generator.definitions_['import_image'] = 'import image';
    var sub = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = sub + '.' + key + '()';
    return [code, generator.ORDER_ATOMIC];
}