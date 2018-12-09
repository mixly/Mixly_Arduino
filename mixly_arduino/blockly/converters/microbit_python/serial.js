'use strict';

pbc.globalFunctionD['print'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length === 1 && keywords.length === 1
        && py2block.identifier(keywords[0].arg) === "end"
        && keywords[0].value._astname === "Str"
        && py2block.Str_value(keywords[0].value) === ""
    ){
        var argblock = py2block.convert(args[0]);
        return [block("IO_print_inline", func.lineno, {}, {
            'VAR':argblock
        }, {
            "inline": "false"
        })];
    }else if (args.length === 1 && keywords.length === 0) {
        var argblock = py2block.convert(args[0]);
        return [block("IO_print", func.lineno, {}, {
            'VAR':argblock
        }, {
            "inline": "false"
        })];
    }else{
        throw new Error("Incorrect number of arguments");
    }
}


pbc.globalFunctionD['input'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    return block("IO_input", func.lineno, {}, {
        'VAR':argblock
    }, {
        "inline": "false"
    });
}


pbc.moduleFunctionD.get('uart')['init'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length === 0 && keywords.length === 1
        && keywords[0].value._astname == "Num") { //uart.init(baudrate=9600)
        if(py2block.identifier(keywords[0].arg) === "baudrate") {
            return [block("serial_begin", func.lineno, {
                "baudrate": py2block.Num_value(keywords[0].value)
            }, {}, {
                "inline": "true"
            })];
        }
    }else if(args.length === 0 && keywords.length === 3) { //uart.init(rx=0, tx=1, baudrate=115200)
        var rxblock = null;
        var txblock = null;
        var baudrate = null;
        for (var i = 0; i < keywords.length; i++) {
            var param = keywords[i];
            var key = py2block.identifier(param.arg);
            if (key === "rx") {
                pbc.pinType = "pins_serial";
                rxblock = py2block.convert(param.value);
                pbc.pinType = null;
            } else if (key === "tx") {
                pbc.pinType = "pins_serial";
                txblock = py2block.convert(param.value);
                pbc.pinType = null;
            } else if (key === "baudrate" && param.value._astname == "Num") {
                baudrate = py2block.Num_value(param.value);
            }
        }
        if (rxblock != null && txblock != null && baudrate != null) {
            return [block("serial_softserial", func.lineno, {
                "baudrate": baudrate
            }, {
                "RX":rxblock,
                "TX":txblock
            }, {
                "inline": "true"
            })];
        }
    }
    throw new Error("Incorrect number of arguments");
}


pbc.moduleFunctionD.get('uart')['write'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var astname = args[0]._astname;
    if(astname === "Call"){
        if(args[0].func._astname == "Name" && py2block.Name_str(args[0].func) === "str"){ //serial.write(str("XXX"))
            return [block("serial_print", func.lineno, {}, {
                    "CONTENT":py2block.convert(args[0].args[0]),
                }, {
                    "inline": "false"
                })];
        }
    }else if(astname === "BinOp"){
        if(args[0].op.name === "Add" && args[0].right._astname === "Str"
            && py2block.Str_value(args[0].right) === "\r\n"
            && args[0].left._astname === "Call" && args[0].left.func._astname == "Name"
            && py2block.Name_str(args[0].left.func) === "str"
        ){
            if(args[0].left.args[0]._astname === "Call"
                && args[0].left.args[0].func._astname === "Name"
                && py2block.Name_str(args[0].left.args[0].func) === "hex"){ //serial.write(str(hex(XX)) + "\r\n")
                pbc.inScope = "lcd_init";
                var numblock=py2block.convert(args[0].left.args[0].args[0]);
                pbc.inScope=null;
                return [block("serial_print_hex", func.lineno, {}, {
                    "CONTENT": numblock,
                }, {
                    "inline": "false"
                })];
            }else{
                return [block("serial_println", func.lineno, {}, {  //serial.write(str("XX") + "\r\n")
                    "CONTENT": py2block.convert(args[0].left.args[0]),
                }, {
                    "inline": "false"
                })];
            }
        }
    }
    return [block("serial_print", func.lineno, {}, {
            "CONTENT":py2block.convert(args[0]),
        }, {
            "inline": "true"
        })];
}

pbc.moduleFunctionD.get('uart')['any'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("serial_any", func.lineno, {}, {}, {
        "inline": "true"
    });
}


pbc.moduleFunctionD.get('uart')['read'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("serial_readstr", func.lineno, {}, {}, {
        "inline": "true"
    });
}


pbc.moduleFunctionD.get('uart')['readline'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("serial_readline", func.lineno, {}, {}, {
        "inline": "true"
    });
}

