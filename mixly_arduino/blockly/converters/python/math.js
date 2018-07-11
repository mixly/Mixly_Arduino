'use strict';

var pbc = Py2blockConfig.prototype;

pbc.globalFunctionD['round'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
     var varblock = py2block.convert(args[0]);
    return [block("math_to_int", func.lineno, {
       'OP':"round"
    }, {
        'A':varblock
    }, {
        "inline": "true"
    })];
}
pbc.moduleFunctionD.get('math')['sqrt'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length === 0) {
        throw new Error("Incorrect number of arguments");
    }
    var varblock = py2block.convert(args[0]);
    return block("math_to_int", func.lineno, {
        'OP':"sqrt"
    }, {
        'A':varblock
    }, {
        "inline": "true"
    });
}
pbc.moduleFunctionD.get('math')['ceil'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length === 0) {
        throw new Error("Incorrect number of arguments");
    }
    var varblock = py2block.convert(args[0]);
    return block("math_to_int", func.lineno, {
        'OP':"ceil"
    }, {
        'A':varblock
    }, {
        "inline": "true"
    });
}
pbc.moduleFunctionD.get('math')['floor'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length === 0) {
        throw new Error("Incorrect number of arguments");
    }
    var varblock = py2block.convert(args[0]);
    return block("math_to_int", func.lineno, {
        'OP':"floor"
    }, {
        'A':varblock
    }, {
        "inline": "true"
    });
}
pbc.moduleFunctionD.get('math')['fabs'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length === 0) {
        throw new Error("Incorrect number of arguments");
    }
    var varblock = py2block.convert(args[0]);
    return block("math_to_int", func.lineno, {
        'OP':"fabs"
    }, {
        'A':varblock
    }, {
        "inline": "true"
    });
}
pbc.globalFunctionD['max'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var ablock = py2block.convert(args[0]);
    var bblock = py2block.convert(args[1]);
    return [block("math_max_min", func.lineno, {
       'OP':"max"
    }, {
        'A':ablock,
        'B':bblock
    }, {
        "inline": "true"
    })];
}
pbc.globalFunctionD['min'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var ablock = py2block.convert(args[0]);
    var bblock = py2block.convert(args[1]);
    return [block("math_max_min", func.lineno, {
       'OP':"min"
    }, {
        'A':ablock,
        'B':bblock
    }, {
        "inline": "true"
    })];
}
pbc.moduleFunctionD.get('random')['randint'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length === 0) {
        throw new Error("Incorrect number of arguments");
    }
    var frblock = py2block.convert(args[0]);
    var toblock = py2block.convert(args[1]);
    return block("math_random", func.lineno, {
        'TYPE':"int"
    }, {
        'FROM':frblock,
        'TO':toblock
    }, {
        "inline": "true"
    });
}
pbc.moduleFunctionD.get('random')['uniform'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length === 0) {
        throw new Error("Incorrect number of arguments");
    }
    var frblock = py2block.convert(args[0]);
    var toblock = py2block.convert(args[1]);
    return block("math_random", func.lineno, {
        'TYPE':"float"
    }, {
        'FROM':frblock,
        'TO':toblock
    }, {
        "inline": "true"
    });
}
