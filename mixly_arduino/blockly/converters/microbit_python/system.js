'use strict';

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