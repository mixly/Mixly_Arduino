'use strict';

//01."text" 在 python_to_blockly.js实现

//02.str('Hello') + str('Mixly') 在 python_to_blockly.js实现

//03.int(str('123'))这种形式的，在math.js实现
function numConvert(mode) {
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if ((mode != 'b' && args.length != 1) || (mode == 'b' && args.length != 2)) {
            throw new Error("Incorrect number of arguments");
        }
        var paramblock = py2block.convert(args[0]);
        if (args[0]._astname == "Call" && py2block.Name_str(args[0].func) == "str") {
            paramblock = py2block.convert(args[0].args[0]);
        }else if(args[0]._astname == "Call" && py2block.Name_str(args[0].func) == "input"){
            if(pbc.board == pbc.MIXPY) {
                paramblock = py2block.convert(args[0].args[0]);
                return block("inout_type_input", func.lineno, {
                    "DIR": "float"
                }, {
                    'VAR': paramblock
                }, {
                    "inline": "true"
                });
            }
        }
        return block("text_to_number", func.lineno, {
            'TOWHAT': mode
        }, {
            'VAR': paramblock,
        }, {
            "inline": "false"
        });
    }
    return converter;
}

pbc.globalFunctionD['float'] = numConvert('float');
pbc.globalFunctionD['bytes'] = numConvert('b');


pbc.globalFunctionD['chr'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    } else {
        var numblock = py2block.convert(args[0]);
        return block("ascii_to_char", func.lineno, {}, {
                'VAR': numblock,
            }, {
                "inline": "false"
            });
    }
}


pbc.globalFunctionD['ord'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    } else {
        var numblock = py2block.convert(args[0]);
        return block("char_to_ascii", func.lineno, {}, {
                'VAR': numblock,
            }, {
                "inline": "false"
            });
    }
}


pbc.globalFunctionD['str'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    } else {
        var numblock = py2block.convert(args[0]);
        return block("number_to_text", func.lineno, {}, {
                'VAR': numblock,
            }, {
                "inline": "false"
            });
    }
}

pbc.globalFunctionD['len'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    } else {
        var numblock = py2block.convert(args[0]);
        return block("text_length", func.lineno, {}, {
                'VAR': numblock,
            }, {
                "inline": "false"
            });
    }
}


// 'mixly'[0]这种形式的，在python_to_blockly.js中实现


pbc.moduleFunctionD.get('random')['choice'] = function (py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    var argAstname = args[0]._astname;
    if(args[0]._astname == "Call" && py2block.Name_str(args[0].func) == "str"){
        argblock = py2block.convert(args[0].args[0]);
        argAstname = "Str";
    }
    if(argAstname == "Str"){
        return block('text_random_char', func.lineno, {}, {
            'VAR':argblock
        }, {
            "inline": "true"
        });
    }else{
        return block('lists_get_random_item', func.lineno, {}, {
            'LIST':argblock
        }, {
            "inline": "true"
        });
    }
}


//str('123') == str('234')这种形式的，在python_to_blockly.js中实现

function startEndWithStr(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        var objblock = py2block.convert(func.value);
        if(func.value._astname == "Call" && py2block.Name_str(func.value.func) == "str"){
            objblock = py2block.convert(func.value.args[0]);
        }
        var argblock = py2block.convert(args[0]);
        if(args[0]._astname == "Call" && py2block.Name_str(args[0].func) == "str"){
            argblock = py2block.convert(args[0].args[0]);
        }
        return [block('text_equals_starts_ends', func.lineno, {
            'DOWHAT':mode
        }, {
            'STR1':objblock,
            'STR2':argblock
        }, {
            "inline": "true"
        })];
    }
    return converter;
}

pbc.objectFunctionD.get('startswith')['Str'] = startEndWithStr('startswith');
pbc.objectFunctionD.get('endswith')['Str'] = startEndWithStr('endswith');


// 'mixly'[0:8]这种形式的，在python_to_blockly.js中实现
