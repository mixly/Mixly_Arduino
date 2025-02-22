export const display_show_image_or_string = function (_, generator) {
    generator.definitions_['import_matrix'] = 'import matrix';
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var code = "matrix.show(" + data + ")\n";
    return code;
}

export const display_scroll_string = function (_, generator) {
    generator.definitions_['import_matrix'] = 'import matrix';
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var code = "matrix.scroll(" + data + ")\n";
    return code;
}

export const display_show_static = function (_, generator) {
    generator.definitions_['import_matrix'] = 'import matrix';
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var code = "matrix.showstatic(" + data + ")\n";
    return code;
}

export const display_show_image_or_string_delay = function (_, generator) {
    generator.definitions_['import_matrix'] = 'import matrix';
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var time = generator.valueToCode(this, 'time', generator.ORDER_ASSIGNMENT);
    var code = "matrix.show(" + data + ',' + time + ")\n";
    return code;
}

export const display_scroll_string_delay = function (_, generator) {
    generator.definitions_['import_matrix'] = 'import matrix';
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var time = generator.valueToCode(this, 'time', generator.ORDER_ASSIGNMENT);
    var code = "matrix.scroll(" + data + ',' + time + ")\n";
    return code;
}

export const display_image_create = function (block, generator) {
    generator.definitions_['import_matrix'] = 'import matrix';
    var colours = {
        "#000000": "0",
        //"#440000": "1",
        //"#660000": "2",
        //"#880000": "3",
        //"#aa0000": "4",
        //"#bb0000": "5",
        //"#cc0000": "6",
        //"#dd0000": "7",
        //"#ee0000": "8",
        "#ff0000": "1"
    }
    var colour_00 = colours[block.getFieldValue("00")];
    var colour_01 = colours[block.getFieldValue("01")];
    var colour_02 = colours[block.getFieldValue("02")];
    var colour_03 = colours[block.getFieldValue("03")];
    var colour_04 = colours[block.getFieldValue("04")];
    var colour_05 = colours[block.getFieldValue("05")];
    var colour_06 = colours[block.getFieldValue("06")];
    var colour_07 = colours[block.getFieldValue("07")];
    var colour_08 = colours[block.getFieldValue("08")];
    var colour_09 = colours[block.getFieldValue("09")];
    var colour_0a = colours[block.getFieldValue("0a")];
    var colour_0b = colours[block.getFieldValue("0b")];
    var colour_0c = colours[block.getFieldValue("0c")];
    var colour_0d = colours[block.getFieldValue("0d")];
    var colour_0e = colours[block.getFieldValue("0e")];
    var colour_0f = colours[block.getFieldValue("0f")];
    var colour_10 = colours[block.getFieldValue("10")];
    var colour_11 = colours[block.getFieldValue("11")];
    var colour_12 = colours[block.getFieldValue("12")];
    var colour_13 = colours[block.getFieldValue("13")];
    var colour_14 = colours[block.getFieldValue("14")];
    var colour_15 = colours[block.getFieldValue("15")];
    var colour_16 = colours[block.getFieldValue("16")];
    var colour_17 = colours[block.getFieldValue("17")];
    var colour_18 = colours[block.getFieldValue("18")];
    var colour_19 = colours[block.getFieldValue("19")];
    var colour_1a = colours[block.getFieldValue("1a")];
    var colour_1b = colours[block.getFieldValue("1b")];
    var colour_1c = colours[block.getFieldValue("1c")];
    var colour_1d = colours[block.getFieldValue("1d")];
    var colour_1e = colours[block.getFieldValue("1e")];
    var colour_1f = colours[block.getFieldValue("1f")];
    var colour_20 = colours[block.getFieldValue("20")];
    var colour_21 = colours[block.getFieldValue("21")];
    var colour_22 = colours[block.getFieldValue("22")];
    var colour_23 = colours[block.getFieldValue("23")];
    var colour_24 = colours[block.getFieldValue("24")];
    var colour_25 = colours[block.getFieldValue("25")];
    var colour_26 = colours[block.getFieldValue("26")];
    var colour_27 = colours[block.getFieldValue("27")];
    var colour_28 = colours[block.getFieldValue("28")];
    var colour_29 = colours[block.getFieldValue("29")];
    var colour_2a = colours[block.getFieldValue("2a")];
    var colour_2b = colours[block.getFieldValue("2b")];
    var colour_2c = colours[block.getFieldValue("2c")];
    var colour_2d = colours[block.getFieldValue("2d")];
    var colour_2e = colours[block.getFieldValue("2e")];
    var colour_2f = colours[block.getFieldValue("2f")];
    var colour_30 = colours[block.getFieldValue("30")];
    var colour_31 = colours[block.getFieldValue("31")];
    var colour_32 = colours[block.getFieldValue("32")];
    var colour_33 = colours[block.getFieldValue("33")];
    var colour_34 = colours[block.getFieldValue("34")];
    var colour_35 = colours[block.getFieldValue("35")];
    var colour_36 = colours[block.getFieldValue("36")];
    var colour_37 = colours[block.getFieldValue("37")];
    var colour_38 = colours[block.getFieldValue("38")];
    var colour_39 = colours[block.getFieldValue("39")];
    var colour_3a = colours[block.getFieldValue("3a")];
    var colour_3b = colours[block.getFieldValue("3b")];
    var colour_3c = colours[block.getFieldValue("3c")];
    var colour_3d = colours[block.getFieldValue("3d")];
    var colour_3e = colours[block.getFieldValue("3e")];
    var colour_3f = colours[block.getFieldValue("3f")];
    var colour_40 = colours[block.getFieldValue("40")];
    var colour_41 = colours[block.getFieldValue("41")];
    var colour_42 = colours[block.getFieldValue("42")];
    var colour_43 = colours[block.getFieldValue("43")];
    var colour_44 = colours[block.getFieldValue("44")];
    var colour_45 = colours[block.getFieldValue("45")];
    var colour_46 = colours[block.getFieldValue("46")];
    var colour_47 = colours[block.getFieldValue("47")];
    var colour_48 = colours[block.getFieldValue("48")];
    var colour_49 = colours[block.getFieldValue("49")];
    var colour_4a = colours[block.getFieldValue("4a")];
    var colour_4b = colours[block.getFieldValue("4b")];
    var colour_4c = colours[block.getFieldValue("4c")];
    var colour_4d = colours[block.getFieldValue("4d")];
    var colour_4e = colours[block.getFieldValue("4e")];
    var colour_4f = colours[block.getFieldValue("4f")];
    var colour_50 = colours[block.getFieldValue("50")];
    var colour_51 = colours[block.getFieldValue("51")];
    var colour_52 = colours[block.getFieldValue("52")];
    var colour_53 = colours[block.getFieldValue("53")];
    var colour_54 = colours[block.getFieldValue("54")];
    var colour_55 = colours[block.getFieldValue("55")];
    var colour_56 = colours[block.getFieldValue("56")];
    var colour_57 = colours[block.getFieldValue("57")];
    var colour_58 = colours[block.getFieldValue("58")];
    var colour_59 = colours[block.getFieldValue("59")];
    var colour_5a = colours[block.getFieldValue("5a")];
    var colour_5b = colours[block.getFieldValue("5b")];
    var colour_5c = colours[block.getFieldValue("5c")];
    var colour_5d = colours[block.getFieldValue("5d")];
    var colour_5e = colours[block.getFieldValue("5e")];
    var colour_5f = colours[block.getFieldValue("5f")];
    var colour_60 = colours[block.getFieldValue("60")];
    var colour_61 = colours[block.getFieldValue("61")];
    var colour_62 = colours[block.getFieldValue("62")];
    var colour_63 = colours[block.getFieldValue("63")];
    var colour_64 = colours[block.getFieldValue("64")];
    var colour_65 = colours[block.getFieldValue("65")];
    var colour_66 = colours[block.getFieldValue("66")];
    var colour_67 = colours[block.getFieldValue("67")];
    var colour_68 = colours[block.getFieldValue("68")];
    var colour_69 = colours[block.getFieldValue("69")];
    var colour_6a = colours[block.getFieldValue("6a")];
    var colour_6b = colours[block.getFieldValue("6b")];
    var colour_6c = colours[block.getFieldValue("6c")];
    var colour_6d = colours[block.getFieldValue("6d")];
    var colour_6e = colours[block.getFieldValue("6e")];
    var colour_6f = colours[block.getFieldValue("6f")];
    var colour_70 = colours[block.getFieldValue("70")];
    var colour_71 = colours[block.getFieldValue("71")];
    var colour_72 = colours[block.getFieldValue("72")];
    var colour_73 = colours[block.getFieldValue("73")];
    var colour_74 = colours[block.getFieldValue("74")];
    var colour_75 = colours[block.getFieldValue("75")];
    var colour_76 = colours[block.getFieldValue("76")];
    var colour_77 = colours[block.getFieldValue("77")];
    var colour_78 = colours[block.getFieldValue("78")];
    var colour_79 = colours[block.getFieldValue("79")];
    var colour_7a = colours[block.getFieldValue("7a")];
    var colour_7b = colours[block.getFieldValue("7b")];
    var colour_7c = colours[block.getFieldValue("7c")];
    var colour_7d = colours[block.getFieldValue("7d")];
    var colour_7e = colours[block.getFieldValue("7e")];
    var colour_7f = colours[block.getFieldValue("7f")];
    var code = 'matrix.Image("' + colour_00 + colour_01 + colour_02 + colour_03 + colour_04 + colour_05 + colour_06 + colour_07 + colour_08 + colour_09 + colour_0a + colour_0b + colour_0c + colour_0d + colour_0e + colour_0f + ':' + colour_10 + colour_11 + colour_12 + colour_13 + colour_14 + colour_15 + colour_16 + colour_17 + colour_18 + colour_19 + colour_1a + colour_1b + colour_1c + colour_1d + colour_1e + colour_1f + ':' + colour_20 + colour_21 + colour_22 + colour_23 + colour_24 + colour_25 + colour_26 + colour_27 + colour_28 + colour_29 + colour_2a + colour_2b + colour_2c + colour_2d + colour_2e + colour_2f + ':' + colour_30 + colour_31 + colour_32 + colour_33 + colour_34 + colour_35 + colour_36 + colour_37 + colour_38 + colour_39 + colour_3a + colour_3b + colour_3c + colour_3d + colour_3e + colour_3f + ':' + colour_40 + colour_41 + colour_42 + colour_43 + colour_44 + colour_45 + colour_46 + colour_47 + colour_48 + colour_49 + colour_4a + colour_4b + colour_4c + colour_4d + colour_4e + colour_4f + ':' + colour_50 + colour_51 + colour_52 + colour_53 + colour_54 + colour_55 + colour_56 + colour_57 + colour_58 + colour_59 + colour_5a + colour_5b + colour_5c + colour_5d + colour_5e + colour_5f + ':' + colour_60 + colour_61 + colour_62 + colour_63 + colour_64 + colour_65 + colour_66 + colour_67 + colour_68 + colour_69 + colour_6a + colour_6b + colour_6c + colour_6d + colour_6e + colour_6f + ':' + colour_70 + colour_71 + colour_72 + colour_73 + colour_74 + colour_75 + colour_76 + colour_77 + colour_78 + colour_79 + colour_7a + colour_7b + colour_7c + colour_7d + colour_7e + colour_7f + '")';
    return [code, generator.ORDER_ATOMIC];
}

export const display_image_builtins = function (block, generator) {
    generator.definitions_['import_matrix'] = 'import matrix';
    var dropdown_image = block.getFieldValue('image');
    var code = 'matrix.Image.' + dropdown_image;
    return [code, generator.ORDER_ATOMIC];
}

export const display_get_pixel = function (block, generator) {
    generator.definitions_['import_matrix'] = 'import matrix';
    var value_x = generator.valueToCode(block, 'x', generator.ORDER_ATOMIC);
    var value_y = generator.valueToCode(block, 'y', generator.ORDER_ATOMIC);
    var code = 'matrix.get_pixel(int(' + value_x + '), int(' + value_y + '))';
    return [code, generator.ORDER_ATOMIC];
}

export const display_bright_point = function (_, generator) {
    generator.definitions_['import_matrix'] = 'import matrix';
    var x = generator.valueToCode(this, 'x', generator.ORDER_ASSIGNMENT);
    var y = generator.valueToCode(this, 'y', generator.ORDER_ASSIGNMENT);
    var dropdown_stat = generator.valueToCode(this, 'STAT', generator.ORDER_ATOMIC);
    var code = 'matrix.set_pixel(int(' + x + '), int(' + y + '), ' + dropdown_stat + ")\n";
    return code;
}

export const display_get_screen_pixel = function (_, generator) {
    generator.definitions_['import_matrix'] = 'import matrix';
    var code = 'matrix.get_brightness()';
    return [code, generator.ORDER_ATOMIC];
}

export const display_get_screen_image = function (_, generator) {
    generator.definitions_['import_matrix'] = 'import matrix';
    var code = 'matrix.get_screenimage()';
    return [code, generator.ORDER_ATOMIC];
}

export const display_bright_screen = function (_, generator) {
    generator.definitions_['import_matrix'] = 'import matrix';
    var x = generator.valueToCode(this, 'x', generator.ORDER_ASSIGNMENT);
    var code = 'matrix.set_brightness(' + x + ')\n';
    return code;
}

export const display_blink_rate = function (_, generator) {
    generator.definitions_['import_matrix'] = 'import matrix';
    var x = generator.valueToCode(this, 'x', generator.ORDER_ASSIGNMENT);
    var code = 'matrix.blink_rate(' + x + ')\n';
    return code;
}

export const display_clear = function (_, generator) {
    generator.definitions_['import_matrix'] = 'import matrix';
    var code = 'matrix.clear()\n';
    return code;
}

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
    var code = '';
    switch (checkbox_fill) {
        case "True":
            code = varName + '.show_fill_rect(' + location_x + ', ' + location_y + ', ' + value_width + ', ' + value_height + ',' + size + ')\n';
            break;
        case "False":
            code = varName + '.show_rect(' + location_x + ', ' + location_y + ', ' + value_width + ', ' + value_height + ',' + size + ')\n';
            break;
    }
    return code;
}

export const image_arithmetic = function (block, generator) {
    generator.definitions_['import_matrix'] = 'import matrix';
    var op = block.getFieldValue("OP");
    var imga = generator.valueToCode(block, 'A', generator.ORDER_ATOMIC);
    var imgb = generator.valueToCode(block, 'B', generator.ORDER_ATOMIC);
    var code = '';
    if (op == 'INTERSECTION') {
        code = imga + '-(' + imga + '-' + imgb + ')';
    }
    else {
        code = imga + op + imgb;
    }
    return [code, generator.ORDER_ATOMIC];
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

export const image_shift = function (block, generator) {
    generator.definitions_['import_matrix'] = 'import matrix';
    var op = block.getFieldValue("OP");
    var image = generator.valueToCode(block, 'img', generator.ORDER_ATOMIC);
    var value = generator.valueToCode(block, 'val', generator.ORDER_ATOMIC);
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
// }

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
    var type = this.getFieldValue("TYPE");
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var stat = this.getFieldValue("STAT");
    var code = v + '.' + type + stat + "()\n";
    return code;
}

export const display_tm1650_show_num = function (_, generator) {
    var type = this.getFieldValue("TYPE");
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var val = generator.valueToCode(this, 'VALUE', generator.ORDER_ATOMIC);
    var code = v + '.' + type + "_show_num(" + val + ")\n";
    return code;
}

export const display_tm1650_show_dot = function (_, generator) {
    var type = this.getFieldValue("TYPE");
    var v = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var n = generator.valueToCode(this, 'NO', generator.ORDER_ATOMIC);
    var stat = generator.valueToCode(this, 'STAT', generator.ORDER_ATOMIC);
    var code = v + '.' + type + "_show_dot(" + n + ", " + stat + ")\n";
    return code;
}

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
    var code = '';
    switch (checkbox_fill) {
        case "True":
            code = varName + '.show_fill_circle(' + location_x + ', ' + location_y + ', ' + value_r + ', ' + size + ')\n';
            break;
        case "False":
            code = varName + '.show_circle(' + location_x + ', ' + location_y + ', ' + value_r + ', ' + size + ')\n';
            break;
    }
    return code;
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
    var code = '';
    switch (checkbox_fill) {
        case "True":
            code = varName + '.show_fill_triangle(' + location_x0 + ', ' + location_y0 + ', ' + location_x1 + ', ' + location_y1 + ', ' + location_x2 + ', ' + location_y2 + ', ' + size + ')\n';
            break;
        case "False":
            code = varName + '.show_triangle(' + location_x0 + ', ' + location_y0 + ', ' + location_x1 + ', ' + location_y1 + ', ' + location_x2 + ', ' + location_y2 + ', ' + size + ')\n';
            break;
    }
    return code;
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

// pe:
export const display_matrix_use_i2c_init = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var iv = generator.valueToCode(this, 'I2CSUB', generator.ORDER_ATOMIC);
    var key = this.getFieldValue("key");
    var code;
    if (key == '32x12 Matrix') {
        generator.definitions_['import_matrix32x12'] = 'import matrix32x12';
        code = v + ' = matrix32x12.Matrix(' + iv + ')\n';
    } else if (key == 'TM1637') {
        generator.definitions_['import_tm1637'] = 'import tm1637';
        code = v + ' = tm1637.' + key + "(" + iv + ')\n';
    }
    return code;
}

export const display_show_image = function (_, generator) {
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    generator.definitions_['import_matrix32x12'] = 'import matrix32x12';
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var code = v + ".set_buffer(" + data + ")\n";
    return code;
}

export const display_scroll_string_extern = function (_, generator) {
    generator.definitions_['import_matrix32x12'] = 'import matrix32x12';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT);
    var code = v + ".scroll(" + data + ")\n";
    return code;
}