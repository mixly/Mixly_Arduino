
pbc.globalFunctionD['print'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length === 1 && keywords.length === 1
        && py2block.identifier(keywords[0].arg) === "end"
        && keywords[0].value._astname === "Str"
        && py2block.Str_value(keywords[0].value) === ""
    ){
        var argblock = py2block.convert(args[0]);
        return [block("system_print_inline", func.lineno, {}, {
            'VAR':argblock
        }, {
            "inline": "false"
        })];
    }else if (args.length === 1 && keywords.length === 0) {
        var argblock = py2block.convert(args[0]);
        return [block("system_print", func.lineno, {}, {
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
    return block("system_input", func.lineno, {}, {
        'VAR':argblock
    }, {
        "inline": "false"
    });
}
pbc.assignD.get('UART')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" || value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var moduleName = py2block.Name_str(value.func.value);
    var funcName = py2block.identifier(value.func.attr);
    if(value._astname === "Call" && moduleName === "machine"
        && funcName === "UART" && value.args.length === 2)
        return true;
    return false;
}

pbc.assignD.get('UART')['create_block'] = function(py2block, node, targets, value){
    pbc.pinType = "serial_print";
    var pinblock = py2block.identifier(value.args[0].n);
    var countblock = py2block.identifier(value.args[1].n);
    pbc.pinType = null;
    return block("serial_softserial", node.lineno, {
        "mode":pinblock,
        'baudrate':countblock
    }, { },
    {
        "inline":"true"
    }
    );
}

function serial_write(mode){
function converter(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var astname = args[0]._astname;
    if(astname === "Call"){
        if(args[0].func._astname == "Name" && py2block.Name_str(args[0].func) === "str"){ //serial.write(str("XXX"))
            return [block("serial_print", func.lineno, {
                    "mode":mode
                }, {
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
                && py2block.Name_str(args[0].left.args[0].func) === "hex"){ 
                //serial.write(str(hex(XX)) + "\r\n")
                pbc.inScope = "lcd_init";
                var numblock=py2block.convert(args[0].left.args[0].args[0]);
                pbc.inScope=null;
                return [block("serial_print_hex", func.lineno, {
                     "mode":mode
                }, {
                    "CONTENT":numblock,
                }, {
                    "inline": "false"
                })];
            }else{
                return [block("serial_println", func.lineno, {
                     "mode":mode
                }, {  //serial.write(str("XX") + "\r\n")
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
return converter
}
pbc.moduleFunctionD.get('uart0')['write'] = serial_write('0')
pbc.moduleFunctionD.get('uart1')['write'] = serial_write('1')
pbc.moduleFunctionD.get('uart2')['write'] = serial_write('2')

pbc.assignD.get('uart0')['check_assign'] = function (py2block, node, targets, value) {
    var funcName = py2block.identifier(value.func.id);
    if (value._astname === "Call"&& funcName === "UART" && value.args.length === 2)
        return true;
    return false;
}
pbc.assignD.get('uart0')['create_block'] = function (py2block, node, targets, value) {
    pbc.pinType = 'serial_print';
    var argblock1 = py2block.convert(value.args[1])
    mode=targets[0].id.v
    if (mode=="uart0"){
        mode='0'
    }
    else if(mode=="uart1"){
        mode='1'
    }
    else if(mode=="uart2"){
        mode='2'
    }
    return block("serial_softserial", node.lineno, { 
            "mode":mode
        }, {
            "CONTENT":py2block.convert(value.args[0]),
            "TEXT":argblock1,
        }, {
            "inline": "true"
        });
}

function getSerial(mode,fun_type){
    function converter(py2block, func, args, keywords, starargs, kwargs, node){
        if(args.length !==0){
            throw new Error("Incorrect number of arguments");
        }
        return block(fun_type, func.lineno, {
            "mode":mode
        }, {
        }, {
        "inline": "true"
       });
    }
     return converter;
}
pbc.moduleFunctionD.get('uart0')['any'] = getSerial('0','serial_any')
pbc.moduleFunctionD.get('uart1')['any'] = getSerial('1','serial_any')
pbc.moduleFunctionD.get('uart2')['any'] = getSerial('2','serial_any')
pbc.moduleFunctionD.get('uart0')['read'] = getSerial('0','serial_readstr')
pbc.moduleFunctionD.get('uart1')['read'] = getSerial('1','serial_readstr')
pbc.moduleFunctionD.get('uart2')['read'] = getSerial('2','serial_readstr')
pbc.moduleFunctionD.get('uart0')['readline'] = getSerial('0','serial_readline')
pbc.moduleFunctionD.get('uart1')['readline'] = getSerial('1','serial_readline')
pbc.moduleFunctionD.get('uart2')['readline'] = getSerial('2','serial_readline')

