'use strict';

var pbc = Py2blockConfig.prototype;

for (var i = 0; i < profile.default.builtinimg.length; i++) {
    pbc.moduleAttrD.get('Image')[profile.default.builtinimg[i][0]] = function (node, module, attr) {
        return block("pins_builtinimg", node.lineno, {
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
                    'PIN': py2block.convert(args[0]),
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


pbc.moduleFunctionD.get('display')['on'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("microbit_display_on", func.lineno, {
        'on_off': "on"
    }, {}, {
        "inline": "true"
    });
}


pbc.moduleFunctionD.get('display')['off'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("microbit_display_on", func.lineno, {
        'on_off': "off"
    }, {}, {
        "inline": "true"
    });
}


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


pbc.moduleFunctionD.get('mylcd')['on'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("group_lcd_power", func.lineno, {
        'STAT': "on()"
    }, {}, {
        "inline": "true"
    });
}


pbc.moduleFunctionD.get('mylcd')['off'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("group_lcd_power", func.lineno, {
        'STAT': "off()"
    }, {}, {
        "inline": "true"
    });
}


pbc.moduleFunctionD.get('mylcd')['clear'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("group_lcd_power", func.lineno, {
        'STAT': "clear()"
    }, {}, {
        "inline": "true"
    });
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

//高度方法
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

//宽度方法
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
                {//'VAR':py2block.convert(args[0]),


                }, {
                    "inline": "false"
                });
        }
    }
}


//将image进行平移（并不能实现）
pbc.objectFunctionD.get('shift_up')['img'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length === 0) {
        throw new Error("Incorrect number of arguments");
    }
    var imageblock = py2block.convert(func.value);


    return block('image_shift', func.lineno, {'OP': 'up'},
        {
            'img': imageblock,
            'val': py2block.convert(args[0]),
        }, {
            "inline": "true"
        });
}

pbc.objectFunctionD.get('shift_down')['img'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length === 0) {
        throw new Error("Incorrect number of arguments");
    }
    var imageblock = py2block.convert(func.value);

    return block('image_shift', func.lineno, {'OP': 'down'},
        {
            'img': imageblock,
            'val': py2block.convert(args[0]),
        }, {
            "inline": "true"
        });
}



