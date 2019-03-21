'use strict';

pbc.objectFunctionD.get('start')['s4a'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if(args.length!=0){
        throw new Error("Incorrect number of arguments");
    }

    var s4ablock=py2block.convert(func.value);

    return [block("hardware_arduino_start", func.lineno, {}, { 'SUB':s4ablock,
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('s4a')['digital_write'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_digital_write";
    var pinblock = py2block.convert(args[0]);
    pbc.pinType = null;
    var argblock = py2block.convert(args[1]);
    return [block("hardware_arduino_digital_write", func.lineno, {}, {
        "PIN": pinblock,
        "STAT": argblock
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('s4a')['digital_read'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_digital_read";
    var pinblock = py2block.convert(args[0]);
    pbc.pinType = null;
   
    return block("hardware_arduino_digital_read", func.lineno, {}, {
        "PIN": pinblock,
    }, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('s4a')['analog_write'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_analog_write";
    var pinblock = py2block.convert(args[0]);
    pbc.pinType = null;
    var argblock = py2block.convert(args[1]);
    return [block("hardware_arduino_analog_write", func.lineno, {}, {
        "PIN": pinblock,
        "NUM": argblock
    }, {
        "inline": "true"
    })];
}


pbc.moduleFunctionD.get('s4a')['analog_read'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_analog_read";
    var pinblock = py2block.convert(args[0]);
    pbc.pinType = null;
   
    return block("hardware_arduino_analog_read", func.lineno, {}, {
        "PIN": pinblock,
    }, {
        "inline": "true"
    });
}

