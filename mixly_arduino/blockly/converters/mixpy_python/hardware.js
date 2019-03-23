'use strict';

pbc.assignD.get('hardware')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" || value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var moduleName = py2block.Name_str(value.func.value);
    var funcName = py2block.identifier(value.func.attr);
    if(value._astname === "Call" && moduleName === "s4alib"
        && funcName === "s4a_start" && value.args.length === 1)
        return true;
    return false;
}

pbc.assignD.get('hardware')['create_block'] = function(py2block, node, targets, value){
    var argblock = py2block.convert(value.args[0]);
    return block("hardware_arduino_start", node.lineno, {
    }, {
        // "PIN":argblock,
        "SUB":py2block.convert(targets[0]),
    });
}

pbc.objectFunctionD.get('digital_write')['s4a'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_digital_write";
    var pinblock = py2block.convert(args[0]);
    pbc.pinType = "pins_digital";
    var argblock = py2block.convert(args[1]);
    pbc.pinType = null;
    var s4ablock=py2block.convert(func.value);
    return [block("hardware_arduino_digital_write", func.lineno, {}, {
        'SUB':s4ablock,
        "PIN": pinblock,
        "STAT": argblock
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('digital_read')['s4a'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_digital_read";
    var pinblock = py2block.convert(args[0]);
    pbc.pinType = null;
    var s4ablock=py2block.convert(func.value);
    return block("hardware_arduino_digital_read", func.lineno, {}, {
        'SUB':s4ablock,
        "PIN": pinblock,
    }, {
        "inline": "true"
    });
}

pbc.objectFunctionD.get('analog_write')['s4a'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_analog_write";
    var pinblock = py2block.convert(args[0]);
    pbc.pinType = null;
    var argblock = py2block.convert(args[1]);
    var s4ablock=py2block.convert(func.value);
    return [block("hardware_arduino_analog_write", func.lineno, {}, {
        'SUB':s4ablock,
        "PIN": pinblock,
        "NUM": argblock
    }, {
        "inline": "true"
    })];
}


pbc.objectFunctionD.get('analog_read')['s4a'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_analog_read";
    var pinblock = py2block.convert(args[0]);
    pbc.pinType = null;
    var s4ablock=py2block.convert(func.value);
    return block("hardware_arduino_analog_read", func.lineno, {}, {
        'SUB':s4ablock,
        "PIN": pinblock,
    }, {
        "inline": "true"
    });
}

