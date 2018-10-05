pbc.assignD.get('i2c')['check_assign'] = function(py2block, node, targets, value) {
    var funcName = py2block.identifier(value.func.id);
    if(value._astname === "Call" 
        && funcName === "I2C" && value.keywords.length === 3)
        return true;
    return false;
}

pbc.assignD.get('i2c')['create_block'] = function(py2block, node, targets, value){

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
            pbc.inScope = "i2c_init";
            pbc.pinType = "pins_digital";
            sdablock = py2block.convert(param.value.args[0]);
            pbc.pinType = null;
            pbc.inScope = null;
        } else if (key === "scl") {
            pbc.inScope = "i2c_init";
            pbc.pinType = "pins_digital";
            sclblock = py2block.convert(param.value.args[0]);
            pbc.pinType = null;
            pbc.inScope = null;
        } else if (key === "freq") {
            freqblock = py2block.convert(param.value);
        }
    }
}
    if (sdablock != null && sclblock != null && freqblock != null) {
        return [block("i2c_init", node.lineno, {}, {
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
    var adblock = py2block.convert(args[0]);
    var datablock = py2block.convert(args[1]);
    return [block("i2c_read", func.lineno, {}, {
        "address": adblock,
        "data": datablock
    }, {
        "inline": "true"
    })];
}
pbc.objectFunctionD.get('writeto')['I2C'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var adblock = py2block.convert(args[0]);
    var datablock = py2block.convert(args[1]);
    return [block("i2c_write", func.lineno, {}, {
        "address": adblock,
        "data": datablock
    }, {
        "inline": "true"
    })];
}

pbc.assignD.get('network')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" || value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var moduleName = py2block.Name_str(value.func.value);
    var funcName = py2block.identifier(value.func.attr);
    if(value._astname === "Call" && moduleName === "network"
        && funcName === "WLAN" && value.args.length === 1)
        return true;
    return false;
}

pbc.assignD.get('network')['create_block'] = function(py2block, node, targets, value){
    var mode = py2block.identifier(value.args[0].attr);
    if (mode=="STA_IF"){
        mode="STA"
    }
    if (mode=="AP_IF"){
        mode="AP"
    }
    return block("network_init", node.lineno, {
        "mode":mode,
    }, {
        "VAR":py2block.convert(targets[0]),
    });
}


pbc.objectFunctionD.get('active')['monitor'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    // var lightblock = py2block.identifier(args[0].n);
    var reverse = py2block.Name_str(args[0]);
    return [block("network_open", func.lineno, {
            "op": reverse,
        }, {
            "VAR":objblock,
        }, {
            "inline": "true"
        })];
}

pbc.objectFunctionD.get('isconnected')['monitor'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return [block("network_wifi_connect", func.lineno, {}, {
            "VAR":objblock,
        }, {
            "inline": "true"
        })];
}

pbc.objectFunctionD.get('disconnect')['monitor'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return [block("network_stop", func.lineno, {}, {
            "VAR":objblock,
        }, {
            "inline": "true"
        })];
}

pbc.objectFunctionD.get('config')['monitor'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var argblock = py2block.Str_value(args[0]);
    return [block("network_get_wifi", func.lineno, {
        "op":argblock,
    }, {
            "VAR":objblock,
        }, {
            "inline": "true"
        })];
}
