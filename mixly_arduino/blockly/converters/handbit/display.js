'use strict';

pbc.assignD.get('handbit_oled')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" || value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var moduleName = py2block.Name_str(value.func.value);
    var funcName = py2block.identifier(value.func.attr);
    if(value._astname === "Call" && moduleName === "ssd1106"
        && funcName === "SSD1106_I2C" && value.args.length === 3)
        return true;
    return false;
}

pbc.assignD.get('handbit_oled')['create_block'] = function(py2block, node, targets, value){
    var rowblock = py2block.convert(value.args[0]);
    var columnblock = py2block.convert(value.args[1]);
    var i2cblock = py2block.convert(value.args[2]);
    return block("handbit_display_use_i2c_init", node.lineno, {
    }, {
        "I2CSUB":i2cblock,
        "row":rowblock,
        "column":columnblock,
        "SUB":py2block.convert(targets[0]),
    });
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

    return [block("handbit_display_draw_4strings", func.lineno, {}, { "VAR":objblock,'Text_line1':str1block,'Text_line2':str2block,'Text_line3':str3block,'Text_line4':str4block,
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

    return [block("handbit_display_line_arbitrarily", func.lineno, {}, { "VAR":objblock,'x1':x1block,'y1':y1block,'x2':x2block,'y2':y2block,
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
    return [block("handbit_display_line", func.lineno, {
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
    return [block("handbit_display_line", func.lineno, {
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
    return [block("handbit_display_rect", func.lineno, {
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
    return [block("handbit_display_rect", func.lineno, {
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