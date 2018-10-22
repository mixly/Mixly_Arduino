pbc.assignD.get('I2C')['check_assign'] = function(py2block, node, targets, value) {
    var funcName = py2block.identifier(value.func.id);
    if(value._astname === "Call" 
        && funcName === "I2C" && value.keywords.length === 3)
        return true;
    return false;
}

pbc.assignD.get('I2C')['create_block'] = function(py2block, node, targets, value){

    var astname = value.keywords[0]._astname;
    if(astname === "keyword" && value.keywords[0].arg.v == "scl" 
        && value.keywords[0].value.func.id.v === "Pin"){ 
    var sdablock = null;
    var sclblock = null;
    var freqblock = null;
    var param = value.keywords[0];
    var key = py2block.identifier(param.arg);
    var i2cblock=py2block.convert(targets[0])
    for (var i = 0; i < value.keywords.length; i++) {
        var param = value.keywords[i];
        var key = py2block.identifier(param.arg);
        if (key === "sda") {
            pbc.inScope = "communicate_i2c_init";
            pbc.pinType = "pins_digital_pin";
            sdablock = py2block.convert(param.value.args[0]);
            pbc.pinType = null;
            pbc.inScope = null;
        } else if (key === "scl") {
            pbc.inScope = "communicate_i2c_init";
            pbc.pinType = "pins_digital_pin";
            sclblock = py2block.convert(param.value.args[0]);
            pbc.pinType = null;
            pbc.inScope = null;
        } else if (key === "freq") {
            freqblock = py2block.convert(param.value);
        }
    }
}
    if (sdablock != null && sclblock != null && freqblock != null) {
        return [block("communicate_i2c_init", node.lineno, {}, {
            "SUB":i2cblock,
            'RX': sdablock,
            'TX': sclblock,
            "freq": freqblock
        }, {
            "inline": "true"
        })];
    }
}

pbc.objectFunctionD.get('readfrom')['I2C'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var adblock = py2block.convert(args[0]);
    var datablock = py2block.convert(args[1]);
    return [block("communicate_i2c_read", func.lineno, {}, {
        "address": adblock,
        "data": datablock,
        "VAR": objblock
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('writeto')['I2C'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var adblock = py2block.convert(args[0]);
    var datablock = py2block.convert(args[1]);
    return [block("communicate_i2c_write", func.lineno, {}, {
        "address": adblock,
        "data": datablock,
        "VAR": objblock
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('scan')['I2C'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return [block("communicate_i2c_scan", func.lineno, {}, {
        "VAR": objblock,
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('read')['I2C'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return [block("communicate_i2c_master_read", func.lineno, {}, {
        "VAR": objblock,
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('available')['I2C'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return [block("communicate_i2c_available", func.lineno, {}, {
        "VAR": objblock,
    }, {
        "inline": "true"
    })];
}
