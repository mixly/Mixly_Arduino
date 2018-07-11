'use strict';

var pbc = Py2blockConfig.prototype;
var ignoreL = ["LCD1602", "LCD_I2C_ADDR"];
for(var i = 0 ; i < ignoreL.length; i ++){
    pbc.ignoreS.add(ignoreL[i]);
}
for (var i = 0; i < profile.default.builtinimg.length; i++) {
    pbc.moduleAttrD.get('Image')[profile.default.builtinimg[i][0]] = function (node, module, attr) {
        return block("pins_builtinimg", node.lineno, {
            "PIN": module + "." + attr
        });
    }
}

for (var i = 0; i < profile.default.imglist.length; i++) {
    pbc.moduleAttrD.get('Image')[profile.default.imglist[i][0]] = function (node, module, attr) {
        return block("pins_imglist", node.lineno, {
            "PIN": module + "." + attr
        });
    }
}

function show_or_scroll(blockid1, blockid2) {
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length === 1 && keywords.length === 4) {//Image.ALL_CLOCKS, delay=120, wait=True, loop=False, clear=False
            var imagesblock = null;
            var delayblock = null;
            var waitblock = null;
            var loopblock = null;
            var clearblock = null;
            imagesblock = py2block.convert(args[0]);
            for (var i = 0; i < keywords.length; i++) {
                var param = keywords[i];
                var key = py2block.identifier(param.arg);
                if (key === "delay") {
                    delayblock = py2block.convert(param.value);
                } else if (key === "wait") {
                    waitblock = py2block.identifier(param.value.id);
                } else if (key === "loop") {
                    loopblock = py2block.identifier(param.value.id);
                } else if (key === "clear") {
                    clearblock = py2block.identifier(param.value.id);
                }
            }
            if (imagesblock != null && delayblock != null && waitblock != null && loopblock != null && clearblock != null) {
                return [block(blockid2, func.lineno, {
                        'wait': waitblock,
                        'loop': loopblock,
                        'clear': clearblock,
                    },
                    {
                        'images': imagesblock,
                        'delay': delayblock,
                    }, {
                        "inline": "true"
                    })];
            }
        } else if (args.length === 1 && keywords.length === 0) {
            return [block(blockid1, func.lineno, {},
                {
                    'data': py2block.convert(args[0]),
                }, {
                    "inline": "true"
                })];
        } else {
            throw new Error("Incorrect number of arguments");
        }
    }
    return converter;
}

pbc.moduleFunctionD.get('display')['show'] = show_or_scroll('monitor_show_image_or_string', 'microbit_display_show_animation');
pbc.moduleFunctionD.get('display')['scroll'] = show_or_scroll('monitor_scroll_string', 'microbit_display_scroll_string_animation');

//创建图像
pbc.globalFunctionD['Image'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length === 0) {
        throw new Error("Incorrect number of arguments");
    }
    var colours = [
        "#000000",
        "#440000",
        "#660000",
        "#880000",
        "#aa0000",
        "#bb0000",
        "#cc0000",
        "#dd0000",
        "#ee0000",
        "#ff0000"
    ];
    if (args.length === 1) {
        var flag = 0;
        var tempblock = py2block.identifier(args[0].s);
        console.log("tempblock:" + tempblock);
        var temptext = new Array();
        temptext = tempblock.split(':');

        if (temptext.length == 5) {
            for (i = 0; i < 5; i++) {
                if (temptext[i].length == 5) {
                    flag++;
                }
            }
        }
        if (flag == 5) {
            return block('microbit_image_create', func.lineno, {
                    "00": colours[temptext[0].charAt(0)],
                    "01": colours[temptext[0].charAt(1)],
                    "02": colours[temptext[0].charAt(2)],
                    "03": colours[temptext[0].charAt(3)],
                    "04": colours[temptext[0].charAt(4)],
                    "10": colours[temptext[1].charAt(0)],
                    "11": colours[temptext[1].charAt(1)],
                    "12": colours[temptext[1].charAt(2)],
                    "13": colours[temptext[1].charAt(3)],
                    "14": colours[temptext[1].charAt(4)],
                    "20": colours[temptext[2].charAt(0)],
                    "21": colours[temptext[2].charAt(1)],
                    "22": colours[temptext[2].charAt(2)],
                    "23": colours[temptext[2].charAt(3)],
                    "24": colours[temptext[2].charAt(4)],
                    "30": colours[temptext[3].charAt(0)],
                    "31": colours[temptext[3].charAt(1)],
                    "32": colours[temptext[3].charAt(2)],
                    "33": colours[temptext[3].charAt(3)],
                    "34": colours[temptext[3].charAt(4)],
                    "40": colours[temptext[4].charAt(0)],
                    "41": colours[temptext[4].charAt(1)],
                    "42": colours[temptext[4].charAt(2)],
                    "43": colours[temptext[4].charAt(3)],
                    "44": colours[temptext[4].charAt(4)],
                },
                {}, {
                    "inline": "false"
                });
        }
    }
}


pbc.moduleFunctionD.get('image')['height'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length === 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block('display_image_size', func.lineno, {'OP': 'height'},
        {
            'VAR': py2block.convert(args[0]),
        }, {
            "inline": "true"
        })];
}


pbc.moduleFunctionD.get('image')['width'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length === 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block('display_image_size', func.lineno, {'OP': 'width'},
        {
            'VAR': py2block.convert(args[0]),
        }, {
            "inline": "true"
        })];
}

function imageShift(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        var imageblock = py2block.convert(func.value);
        return block('image_shift', func.lineno, {'OP': mode},
            {
                'img': imageblock,
                'val': py2block.convert(args[0]),
            }, {
                "inline": "true"
            });
    }
    return converter;
}

pbc.objectFunctionD.get('shift_up')['MICROBIT_IMAGE'] = imageShift('up');
pbc.objectFunctionD.get('shift_down')['MICROBIT_IMAGE'] = imageShift('down');
pbc.objectFunctionD.get('shift_left')['MICROBIT_IMAGE'] = imageShift('left');
pbc.objectFunctionD.get('shift_right')['MICROBIT_IMAGE'] = imageShift('right');


pbc.objectFunctionD.get('copy')['MICROBIT_IMAGE'] = function converter(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var imageblock = py2block.convert(func.value);
    return block('microbit_image_copy', func.lineno, {},
        {
            'image': imageblock,
        }, {
            "inline": "true"
        });
}

pbc.objectFunctionD.get('invert')['MICROBIT_IMAGE'] = function converter(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var imageblock = py2block.convert(func.value);
    return block('microbit_image_invert', func.lineno, {},
        {
            'image': imageblock,
        }, {
            "inline": "true"
        });
}

pbc.moduleFunctionD.get('display')['get_pixel'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 2){
        throw new Error("Incorrect number of arguments");
    }
    var astname = args[0]._astname;
    var astname1 = args[1]._astname;
    var xblock;
    var yblock;
    py2block_config.pinType = "pins_axis";
    if(astname === "Call" && py2block.identifier(args[0].func.id) === "int"){ //display.get_pixel(int(0), int(0))
        xblock =  py2block.convert(args[0].args[0]);
    }else{
        xblock =  py2block.convert(args[0]);
    }
    if(astname1 === "Call" && py2block.identifier(args[1].func.id) === "int"){ //display.get_pixel(int(0), int(0))
        yblock =  py2block.convert(args[1].args[0]);
    }else{
        yblock =  py2block.convert(args[1]);
    }
    py2block_config.pinType = null;
    return block("monitor_get_pixel", func.lineno, {}, {
            'x':xblock,
            'y':yblock
        }, {
            "inline": "true"
        });
}

pbc.moduleFunctionD.get('display')['set_pixel'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 3){
        throw new Error("Incorrect number of arguments");
    }
    var astname = args[0]._astname;
    var astname1 = args[1]._astname;
    py2block_config.pinType = "pins_brightness";
    var brightblock = py2block.convert(args[2]);
    py2block_config.pinType = null;
    var xblock;
    var yblock;
    py2block_config.pinType = "pins_axis";
    if(astname === "Call" && py2block.identifier(args[0].func.id) === "int"){ //display.get_pixel(int(0), int(0))
        xblock =  py2block.convert(args[0].args[0]);
    }else{
        xblock =  py2block.convert(args[0]);
    }
    if(astname1 === "Call" && py2block.identifier(args[1].func.id) === "int"){ //display.get_pixel(int(0), int(0))
        yblock =  py2block.convert(args[1].args[0]);
    }else{
        yblock =  py2block.convert(args[1]);
    }
    py2block_config.pinType = null;
    return [block("monitor_bright_point", func.lineno, {}, {
                'x':xblock,
                'y':yblock,
                'brightness':brightblock,
            }, {
                "inline": "true"
            })];
}


function displayOnOrOff(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        return block("microbit_display_on", func.lineno, {
            'on_off': mode
        }, {}, {
            "inline": "true"
        });
    }
    return converter;
}


pbc.moduleFunctionD.get('display')['on'] = displayOnOrOff('on');
pbc.moduleFunctionD.get('display')['off'] = displayOnOrOff('off');

pbc.moduleFunctionD.get('display')['is_on'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("microbit_display_is_on", func.lineno, {}, {}, {
        "inline": "true"
    });
}


pbc.moduleFunctionD.get('display')['clear'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("microbit_display_clear", func.lineno, {}, {}, {
        "inline": "true"
    })];
}


function mylcdOnOrOffOrClear(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        return block("group_lcd_power", func.lineno, {
            'STAT': mode
        }, {}, {
            "inline": "true"
        });
    }
    return converter;
}

pbc.moduleFunctionD.get('mylcd')['on'] = mylcdOnOrOffOrClear('on()');
pbc.moduleFunctionD.get('mylcd')['off'] = mylcdOnOrOffOrClear('off()');
pbc.moduleFunctionD.get('mylcd')['clear'] = mylcdOnOrOffOrClear('clear()');

pbc.assignD.get('RGB')['check_assign'] = function(py2block, node, targets, value) {
    var moduleName = value.func.value.id.v;
    var funcName = value.func.attr.v;
    if(value._astname === "Call" && moduleName === "neopixel"
        && funcName === "NeoPixel" && value.args.length === 2)
        return true;
    return false;
}

pbc.assignD.get('RGB')['create_block'] = function(py2block, node, targets, value){
    py2block_config.pinType = "pins_digital";
    var pinblock = py2block.convert(value.args[0]);
    py2block_config.pinType = null;
    var countblock = py2block.convert(value.args[1]);

    return block("display_rgb_init", node.lineno, {}, {
        "PIN":pinblock,
        "LEDCOUNT":countblock
    });
}



pbc.assignD.get('LCD')['check_assign'] = function(py2block, node, targets, value) {
    var className = value.func.id.v;
    if(value._astname === "Call" && className === "LCD1602" && value.args.length === 1)
        return true;
    return false;
}

pbc.assignD.get('LCD')['create_block'] = function(py2block, node, targets, value){
    py2block_config.inScope = "lcd_init";
    var argblock = py2block.convert(value.args[0]);
    py2block_config.inScope = null;
    return block("group_lcd_init", node.lineno, {}, {
        "device":argblock
    });
}

pbc.moduleFunctionD.get('mylcd')['mixly_puts_two_lines'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("group_lcd_print", func.lineno, {
    }, {
        "TEXT":py2block.convert(args[0]),
        "TEXT2":py2block.convert(args[1])
    }, {
        "inline": "false"
    })];
}

pbc.moduleFunctionD.get('mylcd')['backlight'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var stat = py2block.identifier(args[0].id);
    return block("group_lcd_power", func.lineno, {
        'STAT': "backlight(" + stat + ")"
    }, {}, {
        "inline": "true"
    });
}
