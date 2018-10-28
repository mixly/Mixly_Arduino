'use strict';

//加减乘除 在python_to_blockly.js中实现
//位操作 在python_to_blockly.js中实现
function mathTrigonometric(mode) {
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length != 1) {
            throw new Error("Incorrect number of arguments");
        }
        // if (args[0]._astname == "Call"
        //     && args[0].func._astname == "Attribute"
        //     && args[0].func.value._astname == "Name"
        //     && py2block.Name_str(args[0].func.value) == "math"
        //     && py2block.identifier(args[0].func.attr) == "radians"
        //     && args[0].args.length == 1) {
            return block("math_trig", func.lineno, {
                'OP': mode
            }, {
                'NUM': py2block.convert(args[0])
            }, {
                "inline": "true"
            });
        // } else {
        //     throw new Error("not implement math." + mode);
        // }


    }

    return converter;
}

pbc.moduleFunctionD.get('math')['sin'] = mathTrigonometric('SIN');
pbc.moduleFunctionD.get('math')['cos'] = mathTrigonometric('COS');
pbc.moduleFunctionD.get('math')['tan'] = mathTrigonometric('TAN');

function mathAntiTrigonometric() {
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length != 1) {
            throw new Error("Incorrect number of arguments");
        }
        if (args[0]._astname == "Call"
            && args[0].func._astname == "Attribute"
            && args[0].func.value._astname == "Name"
            && py2block.Name_str(args[0].func.value) == "math"
            && (py2block.identifier(args[0].func.attr) == "asin"
                || py2block.identifier(args[0].func.attr) == "acos"
                || py2block.identifier(args[0].func.attr) == "atan")
            && args[0].args.length == 1) {
            return block("math_trig", func.lineno, {
                'OP': py2block.identifier(args[0].func.attr).toUpperCase()
            }, {
                'NUM': py2block.convert(args[0].args[0])
            }, {
                "inline": "true"
            });
        } else {
            throw new Error("not implement math.degrees");
        }
    }

    return converter;
}

pbc.moduleFunctionD.get('math')['degrees'] = mathAntiTrigonometric();

function mathLogOrExp(mode) {
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (mode != "POW10") {
            if (args.length != 1) {
                throw new Error("Incorrect number of arguments");
            }
            return block("math_trig", func.lineno, {
                'OP': mode
            }, {
                'NUM': py2block.convert(args[0])
            }, {
                "inline": "true"
            });
        } else {
            if (args.length != 2) {
                throw new Error("Incorrect number of arguments");
            }
            return block("math_trig", func.lineno, {
                'OP': mode
            }, {
                'NUM': py2block.convert(args[1])
            }, {
                "inline": "true"
            });
        }
    }

    return converter;
}

pbc.moduleFunctionD.get('math')['log'] = mathLogOrExp('LN');
pbc.moduleFunctionD.get('math')['log10'] = mathLogOrExp('LOG10');
pbc.moduleFunctionD.get('math')['exp'] = mathLogOrExp('EXP');
pbc.moduleFunctionD.get('math')['pow'] = mathLogOrExp('POW10');


function mathIntFunc(mode) {
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length != 1) {
            throw new Error("Incorrect number of arguments");
        }
        var varblock = py2block.convert(args[0]);
        return block("math_to_int", func.lineno, {
            'OP': mode
        }, {
            'A': varblock
        }, {
            "inline": "true"
        });
    }

    return converter;
}

pbc.globalFunctionD['round'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var varblock = py2block.convert(args[0]);
    return block("math_to_int", func.lineno, {
        'OP': "round"
    }, {
        'A': varblock
    }, {
        "inline": "true"
    });
}


pbc.moduleFunctionD.get('math')['sqrt'] = mathIntFunc('sqrt');
pbc.moduleFunctionD.get('math')['ceil'] = mathIntFunc('ceil');
pbc.moduleFunctionD.get('math')['floor'] = mathIntFunc('floor');
pbc.moduleFunctionD.get('math')['fabs'] = mathIntFunc('fabs');


function mathMaxMin(mode) {
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length === 2) {
            if (args[0]._astname == "Call"
                && args[0].func._astname == "Name"
                && py2block.Name_str(args[0].func) == "max"
                && py2block.Name_str(func) == "min") {
                return block("math_constrain", func.lineno, {}, {
                    'VALUE': py2block.convert(args[0].args[0]),
                    'LOW': py2block.convert(args[0].args[1]),
                    'HIGH': py2block.convert(args[1])
                }, {
                    "inline": "true"
                });
            } else {
                var ablock = py2block.convert(args[0]);
                var bblock = py2block.convert(args[1]);
                return block("math_max_min", func.lineno, {
                    'OP': mode
                }, {
                    'A': ablock,
                    'B': bblock
                }, {
                    "inline": "true"
                });
            }
        } else if (args.length === 1) {
            var argblock = py2block.convert(args[0]);
            return block("list_trig", func.lineno, {
                'OP': mode.toUpperCase()
            }, {
                'data': argblock
            }, {
                "inline": "true"
            });
        } else {
            throw new Error("Incorrect number of arguments");
        }
    }
    return converter;
}

pbc.globalFunctionD['max'] = mathMaxMin('max');
pbc.globalFunctionD['min'] = mathMaxMin('min');


function mathRandom(mode) {
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length != 2) {
            throw new Error("Incorrect number of arguments");
        }
        var fromblock = py2block.convert(args[0]);
        var toblock = py2block.convert(args[1]);
        return block("math_random", func.lineno, {
            'TYPE': mode
        }, {
            'FROM': fromblock,
            'TO': toblock
        }, {
            "inline": "true"
        });
    }

    return converter;
}

pbc.moduleFunctionD.get('random')['randint'] = mathRandom('int');
pbc.moduleFunctionD.get('random')['uniform'] = mathRandom('float');


function radixToEng(num) {
    if (num == 2) {
        return 'two';
    } else if (num == 8) {
        return 'eight';
    } else if (num == 10) {
        return 'ten';
    } else if (num == 16) {
        return 'sixteen';
    } else {
        return "unknown";
    }
}

pbc.globalFunctionD['int'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length == 1) {
        var paramblock = py2block.convert(args[0]);
        if (args[0]._astname == "Call" && args[0].func._astname == "Name" && py2block.Name_str(args[0].func) == "str") {
            paramblock = py2block.convert(args[0].args[0]);
        }else if(args[0]._astname == "Call" && args[0].func._astname == "Name" && py2block.Name_str(args[0].func) == "input"){
            if(pbc.board == pbc.MIXPY) {
                paramblock = py2block.convert(args[0].args[0]);
                return block("inout_type_input", func.lineno, {
                    "DIR": "int"
                }, {
                    'VAR': paramblock
                }, {
                    "inline": "true"
                });
            }
        }
        return block("text_to_number", func.lineno, {
            'TOWHAT': "int"
        }, {
            'VAR': paramblock,
        }, {
            "inline": "true"
        });
    } else if (args.length == 2) {
        if (args[0]._astname == "Call" && args[0].func._astname == "Name" && py2block.Name_str(args[0].func) == "str"
            && args[1]._astname == "Num") {
            var paramblock = py2block.convert(args[0].args[0]);
            return block("math_number_base_conversion", func.lineno, {
                'OP': radixToEng(args[1].n.v),
                'OP2': 'ten'
            }, {
                'NUM': paramblock,
            }, {
                "inline": "true"
            });
        }
    }
    throw new Error("Incorrect number of arguments");
}


function radix(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length != 1) {
            throw new Error("Incorrect number of arguments");
        }
        if (args[0]._astname == "Call"
            && args[0].func._astname == "Name" && py2block.Name_str(args[0].func) == "int"
            && args[0].args[0]._astname == "Call" && args[0].args[0].func._astname == "Name" && py2block.Name_str(args[0].args[0].func) == "str") {
            var paramblock = py2block.convert(args[0].args[0].args[0]);
            return block("math_number_base_conversion", func.lineno, {
                'OP': radixToEng(args[0].args[1].n.v),
                'OP2': mode
            }, {
                'NUM': paramblock,
            }, {
                "inline": "true"
            });
        }
    }
    return converter;
}

pbc.globalFunctionD['hex'] = radix('sixteen');
pbc.globalFunctionD['oct'] = radix('eight');
pbc.globalFunctionD['bin'] = radix('two');


pbc.globalFunctionD['mixly_mapping'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 5) {
        throw new Error("Incorrect number of arguments");
    }
    return block("math_map", func.lineno, {}, {
        'NUM': py2block.convert(args[0]),
        'fromLow': py2block.convert(args[1]),
        'fromHigh': py2block.convert(args[2]),
        'toLow': py2block.convert(args[3]),
        'toHigh': py2block.convert(args[4])
    }, {
        "inline": "true"
    });
}
