'use strict';

var pbc = Py2blockConfig.prototype;

pbc.objectFunctionD.get('init')['SERIAL'] = function(py2block, func, name, args){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }

    return [block("serial_begin", func.lineno, {"baudrate":args[0].n.v}, {
    }, {
        "inline": "true"
    })];
}


pbc.objectFunctionD.get('any')['SERIAL'] = function(py2block, func, name, args){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("serial_any", func.lineno, {}, {
    }, {
        "inline": "true"
    })];
}


pbc.objectFunctionD.get('read')['SERIAL'] = function(py2block, func, name, args){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("serial_readstr", func.lineno, {}, {
    }, {
        "inline": "true"
    })];
}


pbc.objectFunctionD.get('readline')['SERIAL'] = function(py2block, func, name, args){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("serial_readline", func.lineno, {}, {
    }, {
        "inline": "true"
    })];
}
