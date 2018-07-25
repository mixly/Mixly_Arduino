'use strict';
var pbc = Py2blockConfig.prototype;


pbc.globalFunctionD['print'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if(args.length==1){
        if(keywords.length===0){
            var strblock=py2block.convert(args[0]);
            return [block("IO_print", func.lineno, {
            }, {
                "VAR":strblock,
            }, {
                "inline": "false"
            })];
        }
        else if (keywords.length===1){
            var strblock=py2block.convert(args[0]);
            var endblock=null;
            for (var i = 0; i < keywords.length; i++) {
                var param = keywords[i];
                var key = py2block.identifier(param.arg);
                if(key==='end'){
                    endblock = param.value.s.v;
                }
            }
            if(strblock!==null&&endblock===''){
                return [block("IO_print_inline", func.lineno, {
                }, {
                    "VAR":strblock,
                }, {
                    "inline": "false"
                })];
            }
        }
    }

    else {
        throw new Error("Incorrect number of arguments");
    }

}


pbc.globalFunctionD['input'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if( args.length !=1){
        throw new Error("Incorrect number of arguments");
    }
    var strblock=py2block.convert(args[0]);
    return block("IO_input", func.lineno, {},
        {
            "VAR":strblock,
        }, {
            "inline": "false"
        });
}


pbc.assignD.get('uart')['check_assign'] = function(py2block, node, targets, value) {

    var typename=value.func.id.v;
    if(value._astname === "Call" && typename==='UART' && value.args.length === 2)
        return true;
    return false;
}


pbc.assignD.get('uart')['create_block'] = function(py2block, node, targets, value){
    var uartblock=py2block.identifier(node.targets[0].id);
    var argblock=py2block.identifier(value.args[0].n);
    var baudrate=py2block.identifier(value.args[1].n);
    var temp=node.targets[0].id.v;
    var temp1=temp.charAt(temp.length-1);
    for (var i=0;i<3;i++){
        if (argblock==i&&temp1==i){
            return [block("uart_softserial", node.lineno, {
                'mode':i,
                'baudrate':baudrate,
            }, {}, {
                "inline": "true"
            })];
        }
    }
}


function uart_write(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        var astname = args[0]._astname;
        if(astname === "Call"){
            if(py2block.identifier(args[0].func.id) === "str"){ //serial.write(str("XXX"))
                return [block("serial_print", func.lineno, {'mode':mode}, {
                    "CONTENT":py2block.convert(args[0].args[0]),
                }, {
                    "inline": "false"
                })];
            }
        }
        else if(astname === "BinOp"){
            if(args[0].op.name === "Add" && args[0].right._astname === "Str"
                && py2block.identifier(args[0].right.s) === "\r\n"
                && args[0].left._astname === "Call"
                && py2block.identifier(args[0].left.func.id) === "str"
            ){
                if(args[0].left.args[0]._astname === "Str") {//serial.write(str("XX") + "\r\n")
                    return [block("serial_println", func.lineno, {'mode':mode}, {
                        "CONTENT": py2block.convert(args[0].left.args[0]),
                    }, {
                        "inline": "false"
                    })];
                }else if(args[0].left.args[0]._astname === "Call"
                    && py2block.identifier(args[0].left.args[0].func.id) === "hex"){ //serial.write(str(hex(XX)) + "\r\n")

                    pbc.inScope = "lcd_init";//转换16进制
                    var hexblock=py2block.convert(args[0].left.args[0].args[0]);
                    pbc.inScope=null;
                    return [block("serial_print_hex", func.lineno, {'mode':mode}, {
                        "CONTENT": hexblock
                    }, {
                        "inline": "false"
                    })];
                }
            }
        }
        return [block("serial_print", func.lineno, {'mode':'0'}, {
            "CONTENT":py2block.convert(args[0]),
        }, {
            "inline": "true"
        })];
    }
    return converter;
}

pbc.moduleFunctionD.get('uart0')['write']=uart_write('0');
pbc.moduleFunctionD.get('uart1')['write']=uart_write('1');
pbc.moduleFunctionD.get('uart2')['write']=uart_write('2');


function uart_any(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node){
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        return block("serial_any", func.lineno, {
            'mode':mode
        }, {
        }, {
            "inline": "true"
        });
    }
    return converter;
}

pbc.moduleFunctionD.get('uart0')['any']=uart_any('0');
pbc.moduleFunctionD.get('uart1')['any']=uart_any('1');
pbc.moduleFunctionD.get('uart2')['any']=uart_any('2');

function uart_read(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        return block("serial_readstr", func.lineno, {
            'mode':mode
        }, {
        }, {
            "inline": "true"
        });
    }
    return converter;
}
pbc.moduleFunctionD.get('uart0')['read']=uart_read('0');
pbc.moduleFunctionD.get('uart1')['read']=uart_read('1');
pbc.moduleFunctionD.get('uart2')['read']=uart_read('2');

function uart_readline(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        return block("serial_readline", func.lineno, {
            'mode':mode
        }, {
        }, {
            "inline": "true"
        });
    }
    return converter;
}
pbc.moduleFunctionD.get('uart0')['readline']=uart_readline('0');
pbc.moduleFunctionD.get('uart1')['readline']=uart_readline('1');
pbc.moduleFunctionD.get('uart2')['readline']=uart_readline('2');