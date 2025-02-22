'use strict';

//microbit[py]的停止程序
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
            'STATUS_CODE': py2block.convert(args[0])
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