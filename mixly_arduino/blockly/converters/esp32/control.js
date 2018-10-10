'use strict';

pbc.moduleFunctionD.get('time')['sleep_ms'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }

    var time=py2block.convert(args[0]);
    return [block("base_delay", func.lineno, {'Time':'ms'}, {
    "DELAY_TIME":time
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('time')['sleep'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }

    var time=py2block.convert(args[0]);
    return [block("base_delay", func.lineno, {'Time':'s'}, {
    "DELAY_TIME":time
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('time')['sleep_us'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }

    var time=py2block.convert(args[0]);
    return [block("base_delay", func.lineno, {'Time':'us'}, {
    "DELAY_TIME":time
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('time')['ticks_ms'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("controls_millis", func.lineno, {"Time":"ms"}, {}, {
        "inline": "true"
    });
}
pbc.moduleFunctionD.get('time')['ticks_us'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("controls_millis", func.lineno, {"Time":"us"}, {}, {
        "inline": "true"
    });
}