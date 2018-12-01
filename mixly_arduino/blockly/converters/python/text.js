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
        if (args[0]._astname == "Call" && args[0].func._astname == "Name" && py2block.Name_str(args[0].func) == "str") {
            paramblock = py2block.convert(args[0].args[0]);
        }else if(args[0]._astname == "Call" && args[0].func._astname == "Name" && py2block.Name_str(args[0].func) == "input"){
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
    }
    var numblock = py2block.convert(args[0]);
    return block("ascii_to_char", func.lineno, {}, {
            'VAR': numblock,
        }, {
            "inline": "false"
        });
}


pbc.globalFunctionD['ord'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var numblock = py2block.convert(args[0]);
    return block("char_to_ascii", func.lineno, {}, {
            'VAR': numblock,
        }, {
            "inline": "false"
        });
}


pbc.globalFunctionD['str'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var numblock = py2block.convert(args[0]);
    return block("number_to_text", func.lineno, {}, {
            'VAR': numblock,
        }, {
            "inline": "false"
        });
}

pbc.globalFunctionD['len'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var numblock = py2block.convert(args[0]);
    return block("text_length", func.lineno, {}, {
            'VAR': numblock,
        }, {
            "inline": "false"
        });
}


// 'mixly'[0]这种形式的，在python_to_blockly.js中实现


pbc.moduleFunctionD.get('random')['choice'] = function (py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    var argAstname = args[0]._astname;
    if(args[0]._astname == "Call" && args[0].func._astname == "Name" && py2block.Name_str(args[0].func) == "str"){
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
        if(func.value._astname == "Call" && func.value.func._astname == "Name" && py2block.Name_str(func.value.func) == "str"){
            objblock = py2block.convert(func.value.args[0]);
        }
        var argblock = py2block.convert(args[0]);
        if(args[0]._astname == "Call" && args[0].func._astname == "Name" && py2block.Name_str(args[0].func) == "str"){
            argblock = py2block.convert(args[0].args[0]);
        }
        return block('text_equals_starts_ends', func.lineno, {
            'DOWHAT':mode
        }, {
            'STR1':objblock,
            'STR2':argblock
        }, {
            "inline": "true"
        });
    }
    return converter;
}

pbc.objectFunctionD.get('startswith')['Str'] = startEndWithStr('startswith');
pbc.objectFunctionD.get('endswith')['Str'] = startEndWithStr('endswith');


// 'mixly'[0:8]这种形式的，在python_to_blockly.js中实现
function strTitle(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        var textblock = py2block.convert(func.value);
        return block("text_capital", func.lineno, {
            'TEXT_CAPITAL': mode,
        }, {
            "VAR": textblock,
        }, {
            "inline": "true"
        });
    }
    return converter;
}
pbc.objectFunctionD.get('title')['Str'] = strTitle('title');
pbc.objectFunctionD.get('lower')['Str'] = strTitle('lower');

function strencode(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        var textblock = py2block.convert(func.value);
        return block("text_to_number", func.lineno, {
            'TOWHAT': mode,
        }, {
            "VAR": textblock,
        }, {
            "inline": "true"
        });
    }
    return converter;
}
pbc.objectFunctionD.get('encode')['Str'] = strencode('b');


function textStrip(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        var objblock = py2block.convert(func.value);        
        return block("text_strip", func.lineno, {
            'TOWHAT': mode,
        }, {
            "VAR": objblock,            
        }, {
            "inline": "true"
        });
    }
    return converter;
}

pbc.objectFunctionD.get('strip')['Str'] = textStrip('strip');
pbc.objectFunctionD.get('lstrip')['Str'] = textStrip('lstrip');
pbc.objectFunctionD.get('rstrip')['Str'] =  textStrip('rstrip');



function textAlign(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 2) {
            throw new Error("Incorrect number of arguments");
        }
        var objblock = py2block.convert(func.value);
        var argblock1 = py2block.convert(args[0]);
        var argblock2 = py2block.convert(args[1]);
        return block("text_center", func.lineno, {
            'TEXT_CENTER': mode,
        }, {
            "VAR": objblock, 
            "WID": argblock1,
            "Symbol": argblock2
        }, {
            "inline": "true"
        });
    }
    return converter;
}

pbc.objectFunctionD.get('ljust')['Str'] = textAlign('ljust');
pbc.objectFunctionD.get('center')['Str'] = textAlign('center');
pbc.objectFunctionD.get('rjust')['Str'] =  textAlign('rjust');


pbc.objectFunctionD.get('split')['Str'] = function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        var objblock = py2block.convert(func.value);       
        var argblock = py2block.convert(args[0]); 
        return block("text_split", func.lineno, {           
        }, {
            "VAR": objblock,  
            "VAL": argblock          
        }, {
            "inline": "true"
        });
    }

pbc.objectFunctionD.get('replace')['Str'] = function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 2) {
            throw new Error("Incorrect number of arguments");
        }
        var objblock = py2block.convert(func.value);       
        var argblock1 = py2block.convert(args[0]); 
        var argblock2 = py2block.convert(args[1]);
        return block("text_replace", func.lineno, {           
        }, {
            "VAR": objblock,  
            "STR1": argblock1,
            "STR2": argblock2          
        }, {
            "inline": "true"
        });
    }

pbc.objectFunctionD.get('find')['Str'] = function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        var objblock = py2block.convert(func.value);       
        var argblock = py2block.convert(args[0]); 
        return block("text_find", func.lineno, {           
        }, {
            "VAR": objblock,  
            "STR": argblock          
        }, {
            "inline": "true"
        });
    }

pbc.objectFunctionD.get('format')['Str'] = function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        var objblock = py2block.convert(func.value);
        var d = py2block.convertElements("ADD", args);
        d['VAR'] = objblock;
        return block("text_format_noreturn", node.lineno, {
        }, d, {
            "inline": "true",
        }, {
            "@items":args.length
        });
    }