import { Boards } from 'mixly';

export const display_matrix_use_i2c_init = function (_, generator) {
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var iv = generator.valueToCode(this, 'I2CSUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue("key");
    var font = '';
    if (['mpython', 'mixgo_pe', 'mixgo_nova'].indexOf(version) >= 0) {
        font = '0x700000'
    } else if (['mixgo_sant'].indexOf(version) >= 0) {
        font = '0xE00000'
    } else {
        font = '0x3A0000'
    }
    var code;
    if (key == '32x12 Matrix') {
        generator.definitions_['import_matrix32x12'] = 'import matrix32x12';
        code = v + ' = matrix32x12.Matrix(' + iv + ',font_address=' + font + ')\n';
    } else if (key == '16x8 Matrix') {
        generator.definitions_['import_matrix16x8'] = 'import matrix16x8';
        code = v + ' = matrix16x8.Matrix(' + iv + ')\n';
    }
    return code;
}

export const display_matrix_extern_show_image = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var code = v + ".shows(" + data + ")\n";
    return code;
}

export const display_matrix_extern_show_image_or_string_delay = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var space = generator.valueToCode(this, 'space', generator.ORDER_ASSIGNMENT);
    var op = this.getFieldValue('center');
    var code = v + ".shows(" + data + ',space = ' + space + ',center = ' + op + ")\n";
    return code;
}

export const display_matrix_extern_show_frame_string = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var code = v + ".frame(" + data + ")\n";
    return code;
}

export const display_matrix_extern_show_frame_string_delay = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var time = generator.valueToCode(this, 'time', generator.ORDER_ASSIGNMENT);
    var code = v + ".frame(" + data + ',delay = ' + time + ")\n";
    return code;
}

export const display_matrix_extern_scroll_string = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var code = v + ".scroll(" + data + ")\n";
    return code;
}

export const display_matrix_extern_scroll_string_delay = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var time = generator.valueToCode(this, 'time', generator.ORDER_ASSIGNMENT);
    var space = generator.valueToCode(this, 'space', generator.ORDER_ASSIGNMENT);
    var code = v + ".scroll(" + data + ',speed =' + time + ',space = ' + space + ")\n";
    return code;
}

export const display_matrix_extern_clear = function (block, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = v + '.fill(0)\n' + v + '.show()\n';
    return code;
}

export const display_matrix_extern_shift = function (a, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var op = a.getFieldValue("OP");
    var value = generator.valueToCode(a, 'val', generator.ORDER_ATOMIC);
    var code = v + '.' + op + '(' + value + ')\n';
    return code;
}

export const display_matrix_extern_get_pixel = function (block, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var value_x = generator.valueToCode(block, 'x', generator.ORDER_ATOMIC);
    var value_y = generator.valueToCode(block, 'y', generator.ORDER_ATOMIC);
    var code = v + '.pixel(int(' + value_x + '), int(' + value_y + '))';
    return [code, generator.ORDER_ATOMIC];
}

export const display_matrix_extern_bright_point = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var x = generator.valueToCode(this, 'x', generator.ORDER_ASSIGNMENT);
    var y = generator.valueToCode(this, 'y', generator.ORDER_ASSIGNMENT);
    var dropdown_stat = generator.valueToCode(this, 'STAT', generator.ORDER_ATOMIC);
    var code = v + '.pixel(int(' + x + '), int(' + y + '), ' + dropdown_stat + ")\n" + v + '.show()\n';
    return code;
}

export const display_matrix_extern_get_screen_pixel = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = v + '.get_brightness()';
    return [code, generator.ORDER_ATOMIC];
}

export const display_matrix_extern_bright_screen = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var x = generator.valueToCode(this, 'x', generator.ORDER_ASSIGNMENT);
    var code = v + '.set_brightness(' + x + ')\n';
    return code;
}

export const display_matrix_extern_image_builtins = function (block, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var dropdown_image = block.getFieldValue('image');
    var code = v + '.' + dropdown_image;
    return [code, generator.ORDER_ATOMIC];
}

export const matrix_extern_image_arithmetic = function (a, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var op = a.getFieldValue("OP");
    var imga = generator.valueToCode(a, 'A', generator.ORDER_ATOMIC);
    var imgb = generator.valueToCode(a, 'B', generator.ORDER_ATOMIC);
    var code = v + '.map_' + op + '(' + imga + ',' + imgb + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const matrix_extern_image_invert = function (a, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var imga = generator.valueToCode(a, 'A', generator.ORDER_ATOMIC);
    var code = v + '.map_invert(' + imga + ')';
    return [code, generator.ORDER_ATOMIC];
}

//oled
export const display_use_i2c_init = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_ssd1306'] = 'import ssd1306';
    var i2csub = generator.valueToCode(this, 'I2CSUB', generator.ORDER_ATOMIC);
    var sub = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var row = generator.valueToCode(this, 'row', generator.ORDER_ATOMIC);
    var column = generator.valueToCode(this, 'column', generator.ORDER_ATOMIC);
    var code = sub + " = ssd1306.SSD1306_I2C(" + row + "," + column + "," + i2csub + ")\n";
    return code;
}

export const display_draw_4strings = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_ssd1306'] = 'import ssd1306';
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var value_text_line1 = generator.valueToCode(this, 'Text_line1', generator.ORDER_ASSIGNMENT) || '\'\'';
    var value_text_line2 = generator.valueToCode(this, 'Text_line2', generator.ORDER_ASSIGNMENT) || '\'\'';
    var value_text_line3 = generator.valueToCode(this, 'Text_line3', generator.ORDER_ASSIGNMENT) || '\'\'';
    var value_text_line4 = generator.valueToCode(this, 'Text_line4', generator.ORDER_ASSIGNMENT) || '\'\'';
    var code = varName + '.show_str(' + value_text_line1 + ',' + value_text_line2 + ',' + value_text_line3 + ',' + value_text_line4 + ')\n'
    return code;
}

export const display_line_arbitrarily = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_ssd1306'] = 'import ssd1306';
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var location_x1 = generator.valueToCode(this, 'x1', generator.ORDER_ATOMIC);
    var location_y1 = generator.valueToCode(this, 'y1', generator.ORDER_ATOMIC);
    var location_x2 = generator.valueToCode(this, 'x2', generator.ORDER_ATOMIC);
    var location_y2 = generator.valueToCode(this, 'y2', generator.ORDER_ATOMIC);
    var code = varName + '.show_line(' + location_x1 + ', ' + location_y1 + ', ' + location_x2 + ', ' + location_y2 + ', 1)\n';
    return code;
}

export const display_rect = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_ssd1306'] = 'import ssd1306';
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var location_x = generator.valueToCode(this, 'x', generator.ORDER_ATOMIC);
    var location_y = generator.valueToCode(this, 'y', generator.ORDER_ATOMIC);
    var value_width = generator.valueToCode(this, 'width', generator.ORDER_ATOMIC);
    var value_height = generator.valueToCode(this, 'height', generator.ORDER_ATOMIC);
    var checkbox_fill = this.getFieldValue("fill") == 'TRUE' ? 'True' : 'False';
    var size = this.getFieldValue('OP');
    switch (checkbox_fill) {
        case "True":
            var code = varName + '.show_fill_rect(' + location_x + ', ' + location_y + ', ' + value_width + ', ' + value_height + ',' + size + ')\n';
            return code;
        case "False":
            var code = varName + '.show_rect(' + location_x + ', ' + location_y + ', ' + value_width + ', ' + value_height + ',' + size + ')\n';
            return code;
    }
}


export const display_line = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_ssd1306'] = 'import ssd1306';
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var location_x = generator.valueToCode(this, 'x', generator.ORDER_ATOMIC);
    var location_y = generator.valueToCode(this, 'y', generator.ORDER_ATOMIC);
    var value_length = generator.valueToCode(this, 'length', generator.ORDER_ATOMIC);
    var value_direction = this.getFieldValue("direction");
    var code = varName + '.show_' + value_direction + '(' + location_x + ', ' + location_y + ', ' + value_length + ', 1)\n';
    return code;
}

export const display_onoff = function (_, generator) {
    var code = (this.getFieldValue('ONOFF') == 'ON') ? '1' : '0';
    return [code, generator.ORDER_ATOMIC];
}

export const image_shift = function (a, generator) {
    generator.definitions_['import_matrix'] = 'import matrix';
    var op = a.getFieldValue("OP");
    var image = generator.valueToCode(a, 'img', generator.ORDER_ATOMIC);
    var value = generator.valueToCode(a, 'val', generator.ORDER_ATOMIC);
    var code = image + '.shift_' + op + '(' + value + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const display_fill = function (_, generator) {
    var varName = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    generator.definitions_['import_ssd1306'] = 'import ssd1306';
    generator.definitions_['import_machine'] = 'import machine';
    var key = this.getFieldValue('key');
    var code = varName + '.show_fill(' + key + ')\n';
    return code;
}

// export const switch = function (_, generator) {
//     var code = this.getFieldValue('flag');
//     return [code, generator.ORDER_ATOMIC];
// };

export const display_animate = function (_, generator) {
    // Boolean values true and false.
    var name = this.getFieldValue("ANIMATION");
    var code = 'matrix.Image.' + name;
    return [code, generator.ORDER_ATOMIC];
}

export const display_circle = function (_, generator) {
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_ssd1306'] = 'import ssd1306';
    var location_x = generator.valueToCode(this, 'x', generator.ORDER_ATOMIC);
    var location_y = generator.valueToCode(this, 'y', generator.ORDER_ATOMIC);
    var value_r = generator.valueToCode(this, 'r', generator.ORDER_ATOMIC);
    var checkbox_fill = this.getFieldValue("fill") == 'TRUE' ? 'True' : 'False';
    var size = this.getFieldValue('OP');
    switch (checkbox_fill) {
        case "True":
            var code = varName + '.show_fill_circle(' + location_x + ', ' + location_y + ', ' + value_r + ', ' + size + ')\n';
            return code;
        case "False":
            var code = varName + '.show_circle(' + location_x + ', ' + location_y + ', ' + value_r + ', ' + size + ')\n';
            return code;
    }
}

export const display_triangle = function (_, generator) {
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_ssd1306'] = 'import ssd1306';
    var location_x0 = generator.valueToCode(this, 'x0', generator.ORDER_ATOMIC);
    var location_y0 = generator.valueToCode(this, 'y0', generator.ORDER_ATOMIC);
    var location_x1 = generator.valueToCode(this, 'x1', generator.ORDER_ATOMIC);
    var location_y1 = generator.valueToCode(this, 'y1', generator.ORDER_ATOMIC);
    var location_x2 = generator.valueToCode(this, 'x2', generator.ORDER_ATOMIC);
    var location_y2 = generator.valueToCode(this, 'y2', generator.ORDER_ATOMIC);
    var checkbox_fill = this.getFieldValue("fill") == 'TRUE' ? 'True' : 'False';
    var size = this.getFieldValue('OP');
    switch (checkbox_fill) {
        case "True":
            var code = varName + '.show_fill_triangle(' + location_x0 + ', ' + location_y0 + ', ' + location_x1 + ', ' + location_y1 + ', ' + location_x2 + ', ' + location_y2 + ', ' + size + ')\n';
            return code;
        case "False":
            var code = varName + '.show_triangle(' + location_x0 + ', ' + location_y0 + ', ' + location_x1 + ', ' + location_y1 + ', ' + location_x2 + ', ' + location_y2 + ', ' + size + ')\n';
            return code;
    }
}

export const display_oled_showBitmap = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_ssd1306'] = 'import ssd1306';
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var location_x = generator.valueToCode(this, 'START_X', generator.ORDER_ATOMIC);
    var location_y = generator.valueToCode(this, 'START_Y', generator.ORDER_ATOMIC);
    var bmp = generator.valueToCode(this, 'bitmap_name', generator.ORDER_ATOMIC);
    var w = generator.valueToCode(this, 'WIDTH', generator.ORDER_ATOMIC);
    var h = generator.valueToCode(this, 'HEIGHT', generator.ORDER_ATOMIC);
    var code = varName + '.show_bitmap(' + location_x + ', ' + location_y + ', ' + bmp + ',' + w + ',' + h + ')\n';
    return code;
}

export const display_oled_drawPixel = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    generator.definitions_['import_ssd1306'] = 'import ssd1306';
    var varName = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var location_x = generator.valueToCode(this, 'POS_X', generator.ORDER_ATOMIC);
    var location_y = generator.valueToCode(this, 'POS_Y', generator.ORDER_ATOMIC);
    var code = varName + '.show_pixel(' + location_x + ', ' + location_y + ')\n';
    return code;
}

//tm1650
export const display_tm_use_i2c_init = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var iv = generator.valueToCode(this, 'I2CSUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue("key");
    var code;
    if (key == 'TM1650') {
        generator.definitions_['import_tm1650'] = 'import tm1650';
        code = v + ' = tm1650.' + key + "(" + iv + ')\n';
    } else if (key == 'TM1637') {
        generator.definitions_['import_tm1637'] = 'import tm1637';
        code = v + ' = tm1637.' + key + "(" + iv + ')\n';
    }
    return code;
}

export const display_tm1650_power = function (_, generator) {
    // var type = this.getFieldValue("TYPE");
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var stat = this.getFieldValue("STAT");
    var code = v + '.' + stat + "()\n";
    return code;
}

export const display_tm1650_show_num = function (_, generator) {
    // var type = this.getFieldValue("TYPE");
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var val = generator.valueToCode(this, 'VALUE', generator.ORDER_ATOMIC);
    var code = v + ".shownum(" + val + ")\n";
    return code;
}

export const display_tm1650_show_dot = function (_, generator) {
    // var type = this.getFieldValue("TYPE");
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var n = generator.valueToCode(this, 'NO', generator.ORDER_ATOMIC);
    var stat = generator.valueToCode(this, 'STAT', generator.ORDER_ATOMIC);
    var code = v + '.showDP(' + n + ", " + stat + ")\n";
    return code;
}

export const display_tm1650_set_brightness = function (_, generator) {
    // var type = this.getFieldValue("TYPE");
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var val = generator.valueToCode(this, 'VALUE', generator.ORDER_ATOMIC);
    var code = v + ".intensity(" + val + ")\n";
    return code;
}

export const tft_use_spi_init = function (_, generator) {
    generator.definitions_['import_st7789'] = 'import st7789';
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var font = '';
    if (['mpython', 'mixgo_pe', 'mixgo_nova'].indexOf(version) >= 0) {
        font = '0x700000'
    } else if (['mixgo_sant'].indexOf(version) >= 0) {
        font = '0xE00000'
    } else {
        font = '0x3A0000'
    }
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var sv = generator.valueToCode(this, 'SPISUB', generator.ORDER_ATOMIC);
    var pv = generator.valueToCode(this, 'PINCS', generator.ORDER_ATOMIC);
    var dv = generator.valueToCode(this, 'PINDC', generator.ORDER_ATOMIC);
    var w = generator.valueToCode(this, 'WIDTH', generator.ORDER_ATOMIC);
    var h = generator.valueToCode(this, 'HEIGHT', generator.ORDER_ATOMIC);
    var op = this.getFieldValue('rotate');
    var code = v + ' = st7789.ST7789(' + sv + ',' + w + ',' + h + ',dc_pin=' + dv + ',cs_pin=' + pv + ',rotation=' + op + ',font_address=' + font + ')\n';
    return code;
}

export const tft_show_image_xy = function (_, generator) {
    generator.definitions_['import_st7789'] = 'import st7789';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var x = generator.valueToCode(this, 'x', generator.ORDER_ASSIGNMENT);
    var y = generator.valueToCode(this, 'y', generator.ORDER_ASSIGNMENT);
    var size = generator.valueToCode(this, 'size', generator.ORDER_ASSIGNMENT);
    var color = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    if (color.slice(0, 2) == "0x") {
        var code = v + ".image(" + data + ',x = ' + x + ',y = ' + y + ',size = ' + size + ',color=' + color + ")\n";
    } else {
        const rgbValues = color.match(/\d+/g);
        const r = parseInt(rgbValues[0]);
        const g = parseInt(rgbValues[1]);
        const b = parseInt(rgbValues[2]);
        var rgb = "0x" + ((r << 16) + (g << 8) + b).toString(16).padStart(4, "0");
        var rgb565 = (rgb & 0xf80000) >> 8 | (rgb & 0xfc00) >> 5 | (rgb & 0xff) >> 3;
        var code = v + ".image(" + data + ',x = ' + x + ',y = ' + y + ',size = ' + size + ',color=0x' + rgb565.toString(16) + ")\n";
    }
    return code;
}

export const display_color_seclet = function (_, generator) {
    var colour = this.getFieldValue('COLOR');
    var code = '0x' + colour.slice(1) + ''
    var rgb565 = (code & 0xf80000) >> 8 | (code & 0xfc00) >> 5 | (code & 0xff) >> 3
    return ['0x' + rgb565.toString(16), generator.ORDER_ATOMIC];
}

export const tft_show_image_or_string_delay = function (_, generator) {
    generator.definitions_['import_st7789'] = 'import st7789';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var x = generator.valueToCode(this, 'x', generator.ORDER_ASSIGNMENT);
    var y = generator.valueToCode(this, 'y', generator.ORDER_ASSIGNMENT);
    var size = generator.valueToCode(this, 'size', generator.ORDER_ASSIGNMENT);
    var space = generator.valueToCode(this, 'space', generator.ORDER_ASSIGNMENT);
    var color = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var op = this.getFieldValue('center');
    if (color.slice(0, 2) == "0x") {
        var code = v + ".shows(" + data + ',x = ' + x + ',y = ' + y + ',size = ' + size + ',space = ' + space + ',center = ' + op + ',color=' + color + ")\n";
    } else {
        const rgbValues = color.match(/\d+/g);
        const r = parseInt(rgbValues[0]);
        const g = parseInt(rgbValues[1]);
        const b = parseInt(rgbValues[2]);
        var rgb = "0x" + ((r << 16) + (g << 8) + b).toString(16).padStart(4, "0");
        var rgb565 = (rgb & 0xf80000) >> 8 | (rgb & 0xfc00) >> 5 | (rgb & 0xff) >> 3;
        var code = v + ".shows(" + data + ',x = ' + x + ',y = ' + y + ',size = ' + size + ',space = ' + space + ',center = ' + op + ',color=0x' + rgb565.toString(16) + ")\n";
    }
    return code;
}

export const tft_show_frame_string_delay = function (_, generator) {
    generator.definitions_['import_st7789'] = 'import st7789';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var size = generator.valueToCode(this, 'size', generator.ORDER_ASSIGNMENT);
    var time = generator.valueToCode(this, 'time', generator.ORDER_ASSIGNMENT);
    var color = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    if (color.slice(0, 2) == "0x") {
        var code = v + ".frame(" + data + ',size = ' + size + ',delay = ' + time + ',color=' + color + ")\n";
    } else {
        const rgbValues = color.match(/\d+/g);
        const r = parseInt(rgbValues[0]);
        const g = parseInt(rgbValues[1]);
        const b = parseInt(rgbValues[2]);
        var rgb = "0x" + ((r << 16) + (g << 8) + b).toString(16).padStart(4, "0");
        var rgb565 = (rgb & 0xf80000) >> 8 | (rgb & 0xfc00) >> 5 | (rgb & 0xff) >> 3;
        var code = v + ".frame(" + data + ',size = ' + size + ',delay = ' + time + ',color=0x' + rgb565.toString(16) + ")\n";
    }
    return code;
}

export const tft_scroll_string_delay = function (_, generator) {
    generator.definitions_['import_st7789'] = 'import st7789';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var y = generator.valueToCode(this, 'y', generator.ORDER_ASSIGNMENT);
    var size = generator.valueToCode(this, 'size', generator.ORDER_ASSIGNMENT);
    var time = generator.valueToCode(this, 'time', generator.ORDER_ASSIGNMENT);
    var space = generator.valueToCode(this, 'space', generator.ORDER_ASSIGNMENT);
    var color = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    if (color.slice(0, 2) == "0x") {
        var code = v + ".scroll(" + data + ',y = ' + y + ',size = ' + size + ',speed =' + time + ',space = ' + space + ',color=' + color + ")\n";
    } else {
        const rgbValues = color.match(/\d+/g);
        const r = parseInt(rgbValues[0]);
        const g = parseInt(rgbValues[1]);
        const b = parseInt(rgbValues[2]);
        var rgb = "0x" + ((r << 16) + (g << 8) + b).toString(16).padStart(4, "0");
        var rgb565 = (rgb & 0xf80000) >> 8 | (rgb & 0xfc00) >> 5 | (rgb & 0xff) >> 3;
        var code = v + ".scroll(" + data + ',y = ' + y + ',size = ' + size + ',speed =' + time + ',space = ' + space + ',color=0x' + rgb565.toString(16) + ")\n";
    }
    return code;
}

export const tft_fill = function (_, generator) {
    generator.definitions_['import_st7789'] = 'import st7789';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = v + '.fill(st7789.' + key + ')\n';
    return code;
}

export const tft_line_arbitrarily = function (_, generator) {
    generator.definitions_['import_st7789'] = 'import st7789';
    var varName = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var location_x1 = generator.valueToCode(this, 'x1', generator.ORDER_ATOMIC);
    var location_y1 = generator.valueToCode(this, 'y1', generator.ORDER_ATOMIC);
    var location_x2 = generator.valueToCode(this, 'x2', generator.ORDER_ATOMIC);
    var location_y2 = generator.valueToCode(this, 'y2', generator.ORDER_ATOMIC);
    var color = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    if (color.slice(0, 2) == "0x") {
        var code = varName + '.line(' + location_x1 + ', ' + location_y1 + ', ' + location_x2 + ', ' + location_y2 + ', color=' + color + ')\n';
    } else {
        const rgbValues = color.match(/\d+/g);
        const r = parseInt(rgbValues[0]);
        const g = parseInt(rgbValues[1]);
        const b = parseInt(rgbValues[2]);
        var rgb = "0x" + ((r << 16) + (g << 8) + b).toString(16).padStart(4, "0");
        var rgb565 = (rgb & 0xf80000) >> 8 | (rgb & 0xfc00) >> 5 | (rgb & 0xff) >> 3;
        var code = varName + '.line(' + location_x1 + ', ' + location_y1 + ', ' + location_x2 + ', ' + location_y2 + ', color=0x' + rgb565.toString(16) + ')\n';
    }
    return code;
}

export const display_lcd_use_i2c_init = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var iv = generator.valueToCode(this, 'I2CSUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue("key");
    var addr = generator.valueToCode(this, 'ADDR', generator.ORDER_ATOMIC);
    var code;
    generator.definitions_['import_i2clcd'] = 'import i2clcd';
    code = v + ' = i2clcd.LCD' + "(" + iv + ',lcd_width=' + key + ',i2c_addr=' + addr +')\n';
    return code;
}

export const lcd_show_image_or_string_delay = function (_, generator) {
    generator.definitions_['import_i2clcd'] = 'import i2clcd';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var x = generator.valueToCode(this, 'x', generator.ORDER_ASSIGNMENT);
    var y = generator.valueToCode(this, 'y', generator.ORDER_ASSIGNMENT);
    var op = this.getFieldValue('center');
    var code = v + ".shows(" + data + ',column = ' + x + ',line = ' + y + ',center = ' + op + ")\n";
    return code;
}

export const lcd_print_string = function (_, generator) {
    generator.definitions_['import_i2clcd'] = 'import i2clcd';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var x = generator.valueToCode(this, 'x', generator.ORDER_ASSIGNMENT);
    var y = generator.valueToCode(this, 'y', generator.ORDER_ASSIGNMENT);
    var delay = generator.valueToCode(this, 'time', generator.ORDER_ASSIGNMENT);
    var code = v + ".print(" + data + ',column = ' + x + ',line = ' + y + ',delay=' + delay + ")\n";
    return code;
}

export const lcd_backlight = function (_, generator) {
    generator.definitions_['import_i2clcd'] = 'import i2clcd';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = v + '.backlight(' + key + ')\n';
    return code;
}

export const lcd_clear = function (block, generator) {
    generator.definitions_['import_i2clcd'] = 'import i2clcd';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = v + '.clear()\n';
    return code;
}

export const display_oled_use_i2c_init = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var iv = generator.valueToCode(this, 'I2CSUB', generator.ORDER_ATOMIC);
    var addr = generator.valueToCode(this, 'ADDR', generator.ORDER_ATOMIC);
    var m =this.getFieldValue("driver");
    var version = Boards.getSelectedBoardKey().split(':')[2]
    var font = '';
    if (['mpython', 'mixgo_pe', 'mixgo_nova'].indexOf(version) >= 0) {
        font = '0x700000'
    } else if (['mixgo_sant'].indexOf(version) >= 0) {
        font = '0xE00000'
    } else {
        font = '0x3A0000'
    }
    var code;
    generator.definitions_['import_oled128x64'] = 'import oled128x64';
    code = v + ' = oled128x64.OLED' + "(" + iv + ',address=' + addr + ',font_address=' + font + ',types='+m+')\n';

    return code;
}

export const extern_oled_show_image = function (_, generator) {
    generator.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var code = v + ".image(" + data + ")\n";
    return code;
}

export const extern_oled_show_image_xy = function (_, generator) {
    generator.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var x = generator.valueToCode(this, 'x', generator.ORDER_ASSIGNMENT);
    var y = generator.valueToCode(this, 'y', generator.ORDER_ASSIGNMENT);
    var size = generator.valueToCode(this, 'size', generator.ORDER_ASSIGNMENT);
    var code = v + ".image(" + data + ',x = ' + x + ',y = ' + y + ',size = ' + size + ")\n";
    return code;
}

export const extern_oled_show_string = function (_, generator) {
    generator.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var code = v + ".shows(" + data + ")\n";
    return code;
}

export const extern_oled_show_image_or_string_delay = function (_, generator) {
    generator.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var x = generator.valueToCode(this, 'x', generator.ORDER_ASSIGNMENT);
    var y = generator.valueToCode(this, 'y', generator.ORDER_ASSIGNMENT);
    var size = generator.valueToCode(this, 'size', generator.ORDER_ASSIGNMENT);
    var space = generator.valueToCode(this, 'space', generator.ORDER_ASSIGNMENT);
    var op = this.getFieldValue('center');
    var code = v + ".shows(" + data + ',x = ' + x + ',y = ' + y + ',size = ' + size + ',space = ' + space + ',center = ' + op + ")\n";
    return code;
}

export const extern_oled_show_frame_string = function (_, generator) {
    generator.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var code = v + ".frame(" + data + ")\n";
    return code;
}

export const extern_oled_show_frame_string_delay = function (_, generator) {
    generator.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var size = generator.valueToCode(this, 'size', generator.ORDER_ASSIGNMENT);
    var time = generator.valueToCode(this, 'time', generator.ORDER_ASSIGNMENT);
    var code = v + ".frame(" + data + ',size = ' + size + ',delay = ' + time + ")\n";
    return code;
}

export const extern_oled_scroll_string = function (_, generator) {
    generator.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var code = v + ".scroll(" + data + ")\n";
    return code;
}

export const extern_oled_scroll_string_delay = function (_, generator) {
    generator.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var y = generator.valueToCode(this, 'y', generator.ORDER_ASSIGNMENT);
    var size = generator.valueToCode(this, 'size', generator.ORDER_ASSIGNMENT);
    var time = generator.valueToCode(this, 'time', generator.ORDER_ASSIGNMENT);
    var space = generator.valueToCode(this, 'space', generator.ORDER_ASSIGNMENT);
    var code = v + ".scroll(" + data + ',y = ' + y + ',size = ' + size + ',speed =' + time + ',space = ' + space + ")\n";
    return code;
}

export const extern_oled_clear = function (block, generator) {
    generator.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = v + '.fill(0)\n' + v + '.show()\n';
    return code;
}

export const extern_oled_shift = function (a, generator) {
    generator.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var op = a.getFieldValue("OP");
    var value = generator.valueToCode(a, 'val', generator.ORDER_ATOMIC);
    var code = v + '.' + op + '(' + value + ')\n';
    return code;
}

export const extern_oled_get_pixel = function (block, generator) {
    generator.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var value_x = generator.valueToCode(block, 'x', generator.ORDER_ATOMIC);
    var value_y = generator.valueToCode(block, 'y', generator.ORDER_ATOMIC);
    var code = v + '.pixel(int(' + value_x + '), int(' + value_y + '))';
    return [code, generator.ORDER_ATOMIC];
}

export const extern_oled_bright_point = function (_, generator) {
    generator.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var x = generator.valueToCode(this, 'x', generator.ORDER_ASSIGNMENT);
    var y = generator.valueToCode(this, 'y', generator.ORDER_ASSIGNMENT);
    var dropdown_stat = generator.valueToCode(this, 'STAT', generator.ORDER_ATOMIC);
    var code = v + '.pixel(int(' + x + '), int(' + y + '), ' + dropdown_stat + ")\n" + v + '.show()\n';
    return code;
}

export const extern_oled_shape_rect = function (block, generator) {
    generator.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var x = generator.valueToCode(block, 'x', generator.ORDER_ATOMIC);
    var y = generator.valueToCode(block, 'y', generator.ORDER_ATOMIC);
    var w = generator.valueToCode(block, 'w', generator.ORDER_ATOMIC);
    var h = generator.valueToCode(block, 'h', generator.ORDER_ATOMIC);
    var state = block.getFieldValue('state');
    var shape = block.getFieldValue('shape');
    var code = v + '.' + shape + '(' + x + ', ' + y + ', ' + w + ', ' + h + ', ' + state + ')\n' + v + '.show()\n';
    return code;
}

export const extern_oled_hvline = function (block, generator) { //水平线
    generator.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var x = generator.valueToCode(block, 'x', generator.ORDER_ATOMIC);
    var y = generator.valueToCode(block, 'y', generator.ORDER_ATOMIC);
    var var_length = generator.valueToCode(block, 'length', generator.ORDER_ATOMIC);
    var state = block.getFieldValue('state');
    var hv = block.getFieldValue('dir_h_v');
    var code = v + '.' + (('0' == hv) ? 'v' : 'h') + 'line(' + x + ', ' + y + ', ' + var_length + ', ' + state + ')\n' + v + '.show()\n';
    return code;
}

export const extern_oled_line = function (block, generator) {
    generator.definitions_['import_oled128x64'] = 'import oled128x64';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var x1 = generator.valueToCode(block, 'x1', generator.ORDER_ATOMIC);
    var y1 = generator.valueToCode(block, 'y1', generator.ORDER_ATOMIC);
    var x2 = generator.valueToCode(block, 'x2', generator.ORDER_ATOMIC);
    var y2 = generator.valueToCode(block, 'y2', generator.ORDER_ATOMIC);
    var state = block.getFieldValue('state');
    var code = v + '.line(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ', ' + state + ')\n' + v + '.show()\n';
    return code;
}