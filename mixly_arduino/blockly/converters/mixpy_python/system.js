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
