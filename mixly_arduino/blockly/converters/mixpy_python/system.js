'use strict';

pbc.globalFunctionD['exit'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("controls_end_program", func.lineno, {}, {}, {
            "inline": "true"
        })];
}

pbc.moduleFunctionD.get('time')['time'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("controls_millis", func.lineno, {}, {}, {
            "inline": "true"
        });
}

pbc.moduleFunctionD.get('time')['localtime'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("time_localtime", func.lineno, {
        "op":'all'
    }, {}, {
            "inline": "true"
        });
}

pbc.moduleFunctionD.get('time')['sleep'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    return [block("time_sleep", func.lineno, {}, {

        "DELAY_TIME":argblock
    }, {
            "inline": "true"
        })];
}
