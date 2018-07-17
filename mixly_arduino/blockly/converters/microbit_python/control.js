'use strict';

var pbc = Py2blockConfig.prototype;

var ignoreL = ['mixly_range'];
for (var i = 0; i < ignoreL.length; i++) {
    pbc.ignoreS.add(ignoreL[i]);
}

pbc.whileStatementD.get('while_stop_program')['check_condition'] = function (py2block, node, test, body, orelse) {
    if (test._astname == "Name" && py2block.Name_str(test) == "True"
        && body.length == 1 && body[0]._astname == "Pass") {
        return true;
    }
    return false;
}

pbc.whileStatementD.get('while_stop_program')['create_block'] = function (py2block, node, test, body, orelse) {
    return [block("controls_end_program", node.lineno, {}, {}, {
        "inline": "true"
    })];
}


pbc.globalFunctionD['sleep'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("base_delay", func.lineno, {}, {
            'DELAY_TIME': py2block.convert(args[0]),
        }, {
            "inline": "true"
        })];
}


pbc.globalFunctionD['type'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    return block("base_type", func.lineno, {}, {
            'DATA': py2block.convert(args[0]),
        }, {
            "inline": "true"
        });
}


function typeName() {
    function converter(py2block, node, id, ctx, nodeName) {
        return block("controls_TypeLists", node.lineno, {'type': nodeName}, {}, {
            "inline": "true"
        });
    }

    return converter;
}

pbc.reservedNameD['int'] = typeName();
pbc.reservedNameD['float'] = typeName();
pbc.reservedNameD['str'] = typeName();
pbc.reservedNameD['list'] = typeName();
pbc.reservedNameD['tuple'] = typeName();
pbc.reservedNameD['dict'] = typeName();
pbc.reservedNameD['set'] = typeName();
pbc.reservedNameD['NoneType'] = typeName();


pbc.forStatementD.get('for_range')['check_condition'] = function (py2block, node, target, iter, body, orelse) {
    if (iter._astname == "Call" && py2block.Name_str(iter.func) == "mixly_range"
        && iter.args.length == 3){
        return true;
    }
    return false;
}

pbc.forStatementD.get('for_range')['create_block'] = function (py2block, node, target, iter, body, orelse) {
    return [block("controls_for_range", node.lineno, {
        'VAR':py2block.Name_str(target)
    }, {
        'FROM':py2block.convert(iter.args[0]),
        'TO':py2block.convert(iter.args[1]),
        'STEP':py2block.convert(iter.args[2])
    }, {
        "inline": "true"
    }, {}, {
        "DO":py2block.convertBody(body)
    })];
}


pbc.forStatementD.get('for_foreach')['check_condition'] = function (py2block, node, target, iter, body, orelse) {
    if (iter._astname == "List" || iter._astname == "Name"){
        return true;
    }
    return false;
}

pbc.forStatementD.get('for_foreach')['create_block'] = function (py2block, node, target, iter, body, orelse) {
    return [block("controls_forEach", node.lineno, {
        'VAR':py2block.Name_str(target)
    }, {
        'LIST':py2block.convert(iter)
    }, {
        "inline": "true"
    }, {}, {
        "DO":py2block.convertBody(body)
    })];
}


pbc.globalFunctionD['running_time'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("controls_millis", func.lineno, {}, {}, {
            "inline": "true"
        });
}


pbc.globalFunctionD['panic'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("Panic_with_status_code", func.lineno, {}, {
            'STATUS_CODE': py2block.convert(args[0]),
        }, {
            "inline": "true"
        })];
}


pbc.globalFunctionD['reset'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("reset", func.lineno, {}, {}, {
            "inline": "true"
        })];
}


pbc.moduleFunctionD.get('os')['uname'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("controls_uname", func.lineno, {}, {}, {
        "inline": "true"
    });
}