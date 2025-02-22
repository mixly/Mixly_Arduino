'use strict';

pbc.moduleFunctionD.get('matrix.display')['show'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1 && args.length !== 2 ){
        throw new Error("Incorrect number of arguments");
    }
    if (args.length == 1 ){
        
    var  strblock=py2block.convert(args[0]);

    return [block("display_show_image_or_string", func.lineno, {}, {
        'data':strblock,
    }, {
        "inline": "true"
    })];
    }
    if (args.length == 2 ){
    var  strblock=py2block.convert(args[0]);
    var  numblock=py2block.convert(args[1]);
    return [block("display_show_image_or_string_delay", func.lineno, {}, {
        'data':strblock,
        'time':numblock
    }, {
        "inline": "true"
    })];
    }
}

pbc.moduleFunctionD.get('matrix.display')['scroll'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1 && args.length !== 2 ){
        throw new Error("Incorrect number of arguments");
    }

    if (args.length == 1 ){
    var  strblock=py2block.convert(args[0]);
    return [block("display_scroll_string", func.lineno, {}, {
        'data':strblock,
    }, {
        "inline": "true"
    })];
    }
    if (args.length == 2 ){
    var  strblock=py2block.convert(args[0]);
    var  numblock=py2block.convert(args[1]);
    return [block("display_scroll_string_delay", func.lineno, {}, {
        'data':strblock,
        'time':numblock
    }, {
        "inline": "true"
    })];
    }
}

pbc.moduleFunctionD.get('matrix.display')['showstatic'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1 && args.length !== 2 ){
        throw new Error("Incorrect number of arguments");
    }

    if (args.length == 1 ){
    var  strblock=py2block.convert(args[0]);
    return [block("display_show_static", func.lineno, {}, {
        'data':strblock,
    }, {
        "inline": "true"
    })];
    }
}

pbc.moduleFunctionD.get('matrix.display')['get_screenimage'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }

    if (args.length == 0 ) {
        return block("display_get_screen_image", func.lineno, {}, {
        }, {
            "inline": "true"
        });
    }
}

pbc.moduleFunctionD.get('matrix')['Image'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1 || args[0]._astname != "Str") {
        throw new Error("Incorrect number of arguments");
    }
    var colours = [
        "#000000",
        "#ff0000",
    ];
    var flag = 0;
    var tempblock = py2block.Str_value(args[0]);
    var temptext = new Array();
    temptext = tempblock.split(':');

    if (temptext.length == 8) {
        for (var i = 0; i < 8; i++) {
            if (temptext[i].length == 16) {
                flag++;
            }
        }
    }
    if (flag == 8) {
        return block('display_image_create', func.lineno, {
                "00": colours[temptext[0].charAt(0)],
                "01": colours[temptext[0].charAt(1)],
                "02": colours[temptext[0].charAt(2)],
                "03": colours[temptext[0].charAt(3)],
                "04": colours[temptext[0].charAt(4)],
                "05": colours[temptext[0].charAt(5)],
                "06": colours[temptext[0].charAt(6)],
                "07": colours[temptext[0].charAt(7)],
                "08": colours[temptext[0].charAt(8)],
                "09": colours[temptext[0].charAt(9)],
                "0a": colours[temptext[0].charAt(10)],
                "0b": colours[temptext[0].charAt(11)],
                "0c": colours[temptext[0].charAt(12)],
                "0d": colours[temptext[0].charAt(13)],
                "0e": colours[temptext[0].charAt(14)],
                "0f": colours[temptext[0].charAt(15)],

                "10": colours[temptext[1].charAt(0)],
                "11": colours[temptext[1].charAt(1)],
                "12": colours[temptext[1].charAt(2)],
                "13": colours[temptext[1].charAt(3)],
                "14": colours[temptext[1].charAt(4)],
                "15": colours[temptext[1].charAt(5)],
                "16": colours[temptext[1].charAt(6)],
                "17": colours[temptext[1].charAt(7)],
                "18": colours[temptext[1].charAt(8)],
                "19": colours[temptext[1].charAt(9)],
                "1a": colours[temptext[1].charAt(10)],
                "1b": colours[temptext[1].charAt(11)],
                "1c": colours[temptext[1].charAt(12)],
                "1d": colours[temptext[1].charAt(13)],
                "1e": colours[temptext[1].charAt(14)],
                "1f": colours[temptext[1].charAt(15)],

                "20": colours[temptext[2].charAt(0)],
                "21": colours[temptext[2].charAt(1)],
                "22": colours[temptext[2].charAt(2)],
                "23": colours[temptext[2].charAt(3)],
                "24": colours[temptext[2].charAt(4)],
                "25": colours[temptext[2].charAt(5)],
                "26": colours[temptext[2].charAt(6)],
                "27": colours[temptext[2].charAt(7)],
                "28": colours[temptext[2].charAt(8)],
                "29": colours[temptext[2].charAt(9)],
                "2a": colours[temptext[2].charAt(10)],
                "2b": colours[temptext[2].charAt(11)],
                "2c": colours[temptext[2].charAt(12)],
                "2d": colours[temptext[2].charAt(13)],
                "2e": colours[temptext[2].charAt(14)],
                "2f": colours[temptext[2].charAt(15)],

                "30": colours[temptext[3].charAt(0)],
                "31": colours[temptext[3].charAt(1)],
                "32": colours[temptext[3].charAt(2)],
                "33": colours[temptext[3].charAt(3)],
                "34": colours[temptext[3].charAt(4)],
                "35": colours[temptext[3].charAt(5)],
                "36": colours[temptext[3].charAt(6)],
                "37": colours[temptext[3].charAt(7)],
                "38": colours[temptext[3].charAt(8)],
                "39": colours[temptext[3].charAt(9)],
                "3a": colours[temptext[3].charAt(10)],
                "3b": colours[temptext[3].charAt(11)],
                "3c": colours[temptext[3].charAt(12)],
                "3d": colours[temptext[3].charAt(13)],
                "3e": colours[temptext[3].charAt(14)],
                "3f": colours[temptext[3].charAt(15)],

                "40": colours[temptext[4].charAt(0)],
                "41": colours[temptext[4].charAt(1)],
                "42": colours[temptext[4].charAt(2)],
                "43": colours[temptext[4].charAt(3)],
                "44": colours[temptext[4].charAt(4)],
                "45": colours[temptext[4].charAt(5)],
                "46": colours[temptext[4].charAt(6)],
                "47": colours[temptext[4].charAt(7)],
                "48": colours[temptext[4].charAt(8)],
                "49": colours[temptext[4].charAt(9)],
                "4a": colours[temptext[4].charAt(10)],
                "4b": colours[temptext[4].charAt(11)],
                "4c": colours[temptext[4].charAt(12)],
                "4d": colours[temptext[4].charAt(13)],
                "4e": colours[temptext[4].charAt(14)],
                "4f": colours[temptext[4].charAt(15)],


                "50": colours[temptext[5].charAt(0)],
                "51": colours[temptext[5].charAt(1)],
                "52": colours[temptext[5].charAt(2)],
                "53": colours[temptext[5].charAt(3)],
                "54": colours[temptext[5].charAt(4)],
                "55": colours[temptext[5].charAt(5)],
                "56": colours[temptext[5].charAt(6)],
                "57": colours[temptext[5].charAt(7)],
                "58": colours[temptext[5].charAt(8)],
                "59": colours[temptext[5].charAt(9)],
                "5a": colours[temptext[5].charAt(10)],
                "5b": colours[temptext[5].charAt(11)],
                "5c": colours[temptext[5].charAt(12)],
                "5d": colours[temptext[5].charAt(13)],
                "5e": colours[temptext[5].charAt(14)],
                "5f": colours[temptext[5].charAt(15)],

                "60": colours[temptext[6].charAt(0)],
                "61": colours[temptext[6].charAt(1)],
                "62": colours[temptext[6].charAt(2)],
                "63": colours[temptext[6].charAt(3)],
                "64": colours[temptext[6].charAt(4)],
                "65": colours[temptext[6].charAt(5)],
                "66": colours[temptext[6].charAt(6)],
                "67": colours[temptext[6].charAt(7)],
                "68": colours[temptext[6].charAt(8)],
                "69": colours[temptext[6].charAt(9)],
                "6a": colours[temptext[6].charAt(10)],
                "6b": colours[temptext[6].charAt(11)],
                "6c": colours[temptext[6].charAt(12)],
                "6d": colours[temptext[6].charAt(13)],
                "6e": colours[temptext[6].charAt(14)],
                "6f": colours[temptext[6].charAt(15)],


                "70": colours[temptext[7].charAt(0)],
                "71": colours[temptext[7].charAt(1)],
                "72": colours[temptext[7].charAt(2)],
                "73": colours[temptext[7].charAt(3)],
                "74": colours[temptext[7].charAt(4)],
                "75": colours[temptext[7].charAt(5)],
                "76": colours[temptext[7].charAt(6)],
                "77": colours[temptext[7].charAt(7)],
                "78": colours[temptext[7].charAt(8)],
                "79": colours[temptext[7].charAt(9)],
                "7a": colours[temptext[7].charAt(10)],
                "7b": colours[temptext[7].charAt(11)],
                "7c": colours[temptext[7].charAt(12)],
                "7d": colours[temptext[7].charAt(13)],
                "7e": colours[temptext[7].charAt(14)],
                "7f": colours[temptext[7].charAt(15)],

            }, {}, {
                "inline": "false"
            });
    }
}
function shift(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if(args.length!=1){
            throw new Error("Incorrect number of arguments");
        }
        var str1block=py2block.convert(args[0]);
        var imgblock=py2block.convert(func.value);
        return block("image_shift", func.lineno, {
            'OP':mode
        }, { 
            'img':imgblock,
            'val':str1block
        }, {
            "inline": "true"
        });
    }
    return converter;
}
pbc.objectFunctionD.get('shift_up')['matrix'] = shift('up');
pbc.objectFunctionD.get('shift_down')['matrix'] = shift('down');
pbc.objectFunctionD.get('shift_left')['matrix'] = shift('left');
pbc.objectFunctionD.get('shift_right')['matrix'] = shift('right');

pbc.moduleFunctionD.get('matrix.display')['get_pixel'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 2){
        throw new Error("Incorrect number of arguments");
    }
    var astname = args[0]._astname;
    var astname1 = args[1]._astname;
    var xblock;
    var yblock;
    pbc.pinType = "pins_axis";
    if(astname === "Call" && args[0].func._astname == "Name" && py2block.Name_str(args[0].func) === "int"){ //display.get_pixel(int(0), int(0))
        xblock =  py2block.convert(args[0].args[0]);
    }else{
        xblock =  py2block.convert(args[0]);
    }
    if(astname1 === "Call" && args[1].func._astname == "Name" && py2block.Name_str(args[1].func) === "int"){ //display.get_pixel(int(0), int(0))
        yblock =  py2block.convert(args[1].args[0]);
    }else{
        yblock =  py2block.convert(args[1]);
    }
    pbc.pinType = null;
    return block("display_get_pixel", func.lineno, {}, {
        'x':xblock,
        'y':yblock
    }, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('matrix.display')['set_pixel'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 3){
        throw new Error("Incorrect number of arguments");
    }
    var astname = args[0]._astname;
    var astname1 = args[1]._astname;
    pbc.pinType = null;
    pbc.inScope="switch";
    var brightblock = py2block.convert(args[2]);
    pbc.inScope=null;
    pbc.pinType = null;
    var xblock;
    var yblock;
    pbc.pinType = "pins_axis";
    if(astname === "Call" && args[0].func._astname == "Name" && py2block.Name_str(args[0].func) === "int"){ //display.set_pixel(int(0), int(0))
        xblock =  py2block.convert(args[0].args[0]);
    }else{
        xblock =  py2block.convert(args[0]);
    }
    if(astname1 === "Call" && args[1].func._astname == "Name" && py2block.Name_str(args[1].func) === "int"){ //display.set_pixel(int(0), int(0))
        yblock =  py2block.convert(args[1].args[0]);
    }else{
        yblock =  py2block.convert(args[1]);
    }
    pbc.pinType = null;
    return [block("display_bright_point", func.lineno, {}, {
        'x':xblock,
        'y':yblock,
        'STAT':brightblock
        
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('matrix.display')['set_brightness'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if(args.length!=1){
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType="pins_exlcdh";
    var brightblock=py2block.convert(args[0]);
    pbc.pinType=null;

    return [block("display_bright_screen", func.lineno, {}, {
        'x':brightblock,
        
        
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('matrix.display')['get_brightness'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if(args.length!=0){
        throw new Error("Incorrect number of arguments");
    }

    return block("display_get_screen_pixel", func.lineno, {}, {
    }, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('matrix.display')['blink_rate'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if(args.length!=1){
        throw new Error("Incorrect number of arguments");
    }
    var blinkblock=py2block.convert(args[0]);

    return [block("display_blink_rate", func.lineno, {}, { 'x':blinkblock,
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('matrix.display')['clear'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if(args.length!=0){
        throw new Error("Incorrect number of arguments");
    }
    

    return [block("display_clear", func.lineno, {}, { 
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('show_pixel')['monitor'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if(args.length!=2){
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var x1block=py2block.convert(args[0]);
    var y1block=py2block.convert(args[1]);

    return [block("display_oled_drawPixel", func.lineno, {}, { "VAR":objblock,'POS_X':x1block,'POS_Y':y1block,
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('show_bitmap')['monitor'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if(args.length!=5){
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var x=py2block.convert(args[0]);
    var y=py2block.convert(args[1]);
    var b=py2block.convert(args[2]);
    var w=py2block.convert(args[3]);
    var h=py2block.convert(args[4]);
    return [block("display_oled_showBitmap", func.lineno, {}, { "VAR":objblock,'START_X':x,'START_Y':y,'bitmap_name':b,'WIDTH':w,'HEIGHT':h,
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('show_str')['monitor'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if(args.length!=4){
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var str1block=py2block.convert(args[0]);
    var str2block=py2block.convert(args[1]);
    var str3block=py2block.convert(args[2]);
    var str4block=py2block.convert(args[3]);

    return [block("display_draw_4strings", func.lineno, {}, { "VAR":objblock,'Text_line1':str1block,'Text_line2':str2block,'Text_line3':str3block,'Text_line4':str4block,
    }, {
        "inline": "false"
    })];
}

pbc.objectFunctionD.get('show_line')['monitor'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if(args.length!=5){
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var x1block=py2block.convert(args[0]);
    var y1block=py2block.convert(args[1]);
    var x2block=py2block.convert(args[2]);
    var y2block=py2block.convert(args[3]);

    return [block("display_line_arbitrarily", func.lineno, {}, { "VAR":objblock,'x1':x1block,'y1':y1block,'x2':x2block,'y2':y2block,
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('show_hline')['monitor'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 4) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var xblock = py2block.convert(args[0]);
    var yblock = py2block.convert(args[1]);
    var lenblock = py2block.convert(args[2]);
    return [block("display_line", func.lineno, {
            'direction': 'hline',
        }, {
            "VAR":objblock,
            "x": xblock,
            "y": yblock,
            "length": lenblock,
        }, {
            "inline": "true"
        })];
}

pbc.objectFunctionD.get('show_vline')['monitor'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 4) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var xblock = py2block.convert(args[0]);
    var yblock = py2block.convert(args[1]);
    var lenblock = py2block.convert(args[2]);
    return [block("display_line", func.lineno, {
            'direction': 'vline',
        }, {
            "VAR":objblock,
            "x": xblock,
            "y": yblock,
            "length": lenblock,
        }, {
            "inline": "true"
        })];
}

pbc.objectFunctionD.get('show_rect')['monitor'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 5) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var xblock = py2block.convert(args[0]);
    var yblock = py2block.convert(args[1]);
    var widthblock = py2block.convert(args[2]);
    var heightblock = py2block.convert(args[3]);
    var lightblock = py2block.identifier(args[4].n);
    return [block("display_rect", func.lineno, {
            "fill": false,
            "OP": lightblock,
        }, {
            "VAR":objblock,
            "x": xblock,
            "y": yblock,
            "width": widthblock,
            "height": heightblock,
        }, {
            "inline": "true"
        })];
}

pbc.objectFunctionD.get('show_fill_rect')['monitor'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 5) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var xblock = py2block.convert(args[0]);
    var yblock = py2block.convert(args[1]);
    var widthblock = py2block.convert(args[2]);
    var heightblock = py2block.convert(args[3]);
    var lightblock = py2block.identifier(args[4].n);
    return [block("display_rect", func.lineno, {
            "fill": true,
            "OP": lightblock,
        }, {
            "VAR":objblock,
            "x": xblock,
            "y": yblock,
            "width": widthblock,
            "height": heightblock,
        }, {
            "inline": "true"
        })];
}

pbc.objectFunctionD.get('show_triangle')['monitor'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 7) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var x0 = py2block.convert(args[0]);
    var y0 = py2block.convert(args[1]);
    var x1 = py2block.convert(args[2]);
    var y1 = py2block.convert(args[3]);
    var x2 = py2block.convert(args[4]);
    var y2 = py2block.convert(args[5]);
    var lightblock = py2block.identifier(args[6].n);
    return [block("display_triangle", func.lineno, {
            "fill": false,
            "OP": lightblock,
        }, {
            "VAR":objblock,
            "x0": x0,
            "y0": y0,
            "x1": x1,
            "y1": y1,
            "x2": x2,
            "y2": y2,
        }, {
            "inline": "true"
        })];
}

pbc.objectFunctionD.get('show_fill_triangle')['monitor'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 7) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var x0 = py2block.convert(args[0]);
    var y0 = py2block.convert(args[1]);
    var x1 = py2block.convert(args[2]);
    var y1 = py2block.convert(args[3]);
    var x2 = py2block.convert(args[4]);
    var y2 = py2block.convert(args[5]);
    var lightblock = py2block.identifier(args[6].n);
    return [block("display_triangle", func.lineno, {
            "fill": true,
            "OP": lightblock,
        }, {
            "VAR":objblock,
            "x0": x0,
            "y0": y0,
            "x1": x1,
            "y1": y1,
            "x2": x2,
            "y2": y2,
        }, {
            "inline": "true"
        })];
}

pbc.objectFunctionD.get('show_circle')['monitor'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 4) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var xblock = py2block.convert(args[0]);
    var yblock = py2block.convert(args[1]);
    var rblock = py2block.convert(args[2]);
    var lightblock = py2block.identifier(args[3].n);
    return [block("display_circle", func.lineno, {
            "fill": false,
            "OP": lightblock,
        }, {
            "VAR":objblock,
            "x": xblock,
            "y": yblock,
            "r": rblock,
        }, {
            "inline": "true"
        })];
}

pbc.objectFunctionD.get('show_fill_circle')['monitor'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 4) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var xblock = py2block.convert(args[0]);
    var yblock = py2block.convert(args[1]);
    var rblock = py2block.convert(args[2]);
    var lightblock = py2block.identifier(args[3].n);
    return [block("display_circle", func.lineno, {
            "fill": true,
            "OP": lightblock,
        }, {
            "VAR":objblock,
            "x": xblock,
            "y": yblock,
            "r": rblock,
        }, {
            "inline": "true"
        })];
}


pbc.assignD.get('oled')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" || value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var moduleName = py2block.Name_str(value.func.value);
    var funcName = py2block.identifier(value.func.attr);
    if(value._astname === "Call" && moduleName === "ssd1306"
        && funcName === "SSD1306_I2C" && value.args.length === 3)
        return true;
    else if(value._astname === "Call" && moduleName === "tm1650"
        && funcName === "TM1650" && value.args.length === 1)
        return true;
    else
        return false;
}

pbc.assignD.get('oled')['create_block'] = function(py2block, node, targets, value){
    if(value.args.length === 3){
        var rowblock = py2block.convert(value.args[0]);
        var columnblock = py2block.convert(value.args[1]);
        var i2cblock = py2block.convert(value.args[2]);
        return block("display_use_i2c_init", node.lineno, {
        }, {
            "row":rowblock,
            "column":columnblock,
            "I2CSUB":i2cblock,
            "SUB":py2block.convert(targets[0]),
        });
    }
    else if(value.args.length === 1){
        var i2cblock = py2block.convert(value.args[0]);
        return block("display_tm_use_i2c_init", node.lineno, {
        }, {
            "I2CSUB":i2cblock,
            "SUB":py2block.convert(targets[0]),
        });
    }
}

pbc.objectFunctionD.get('show_fill')['monitor'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if(args.length!=1){
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var flagblock = py2block.identifier(args[0].n.v);


    return [block("display_fill", func.lineno, {'key':flagblock}, { "SUB":objblock, 
    }, {
        "inline": "true"
    })];
}

function display_tm_stat(mode, type){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        var varblock = py2block.convert(func.value)
        return [block('display_tm1650_power', func.lineno, {
                "TYPE": type,
                "STAT": mode,
            }, {
                "VAR": varblock,
            }, {
                "inline": "true"
            })];
    }
    return converter;
}

pbc.objectFunctionD.get('tm1650_on')['disp'] = display_tm_stat('_on','tm1650');
pbc.objectFunctionD.get('tm1650_off')['disp'] = display_tm_stat('_off','tm1650');
pbc.objectFunctionD.get('tm1650_clear')['disp'] = display_tm_stat('_clear','tm1650');


pbc.objectFunctionD.get('tm1650_show_num')['disp'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }   
    var valblock=py2block.convert(args[0]);
    var varblock=py2block.convert(func.value)
    return [block("display_tm1650_show_num", func.lineno, {
        "TYPE":'tm1650'
    }, {
        'VALUE':valblock,
        'VAR': varblock
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('tm1650_show_dot')['disp'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }   
    var valblock=py2block.convert(args[0]);
    pbc.inScope="switch";
    var statblock=py2block.convert(args[1]);
    pbc.inScope=null;
    var varblock=py2block.convert(func.value)
    return [block("display_tm1650_show_dot", func.lineno, {
        "TYPE":'tm1650'
    }, {
        'NO':valblock,
        'STAT':statblock,
        'VAR': varblock
    }, {
        "inline": "true"
    })];
}