var spiClass = 'machine.SPI';
var i2cClass = 'machine.I2C';
var owClass = 'onewire.OneWire';
pbc.assignD.get('I2C')['check_assign'] = function(py2block, node, targets, value) {
    var funcName = py2block.identifier(value.func.attr);
    var moduleName = py2block.Name_str(value.func.value);
    if(value._astname === "Call" && moduleName === "machine"
        && funcName === "I2C" && value.keywords.length === 3)
        return true;
    return false;
}

pbc.assignD.get('I2C')['create_block'] = function(py2block, node, targets, value){

    var astname = value.keywords[0]._astname;
    if(astname === "keyword" && value.keywords[0].arg.v == "scl"
        && value.keywords[0].value.func.attr.v === "Pin"){
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
        return block("communicate_i2c_init", node.lineno, {}, {
            "SUB":i2cblock,
            'RX': sdablock,
            'TX': sclblock,
            "freq": freqblock
        }, {
            "inline": "true"
        });
    }
}

pbc.objectFunctionD.get('readfrom')['I2C'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var adblock = py2block.convert(args[0]);
    var datablock = py2block.convert(args[1]);
    return block("communicate_i2c_read", func.lineno, {}, {
        "address": adblock,
        "data": datablock,
        "VAR": objblock
    }, {
        "inline": "true"
    });
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
    return block("communicate_i2c_scan", func.lineno, {}, {
        "VAR": objblock,
    }, {
        "inline": "true"
    });
}

pbc.objectFunctionD.get('read')[i2cClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return block("communicate_i2c_master_read", func.lineno, {}, {
        "VAR": objblock,
    }, {
        "inline": "true"
    });
}

pbc.objectFunctionD.get('available')['I2C'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return block("communicate_i2c_available", func.lineno, {}, {
        "VAR": objblock,
    }, {
        "inline": "true"
    });
}

pbc.assignD.get('SPI')['check_assign'] = function(py2block, node, targets, value) {
    var funcName = py2block.identifier(value.func.attr);
    var moduleName = py2block.Name_str(value.func.value);
    if(value._astname === "Call" && moduleName === "machine"
        && funcName === "SPI" && value.keywords.length === 6)
        return true;
    return false;
}

pbc.assignD.get('SPI')['create_block'] = function(py2block, node, targets, value){

    var astname = value.keywords[0]._astname;
    if(value.keywords[0].arg.v == "baudrate" && value.keywords[3].arg.v == "sck" && value.keywords[3].value.func.attr.v == "Pin"){
    var polarityblock = null;
    var phaseblock = null;
    var sckblock = null;
    var mosiblock = null;
    var misoblock = null;
    var freqblock = null;
    var param = value.keywords[0];
    var key = py2block.identifier(param.arg);
    var spiblock=py2block.convert(targets[0]);
    for (var i = 0; i < value.keywords.length; i++) {
        var param = value.keywords[i];
        var key = py2block.identifier(param.arg);
        if (key === "baudrate") {
            freqblock = py2block.convert(param.value);
        } else if (key === "polarity") {
            polarityblock = py2block.convert(param.value);
        } else if (key === "phase") {
            phaseblock = py2block.convert(param.value);
        } else if (key === "sck") {
            pbc.inScope = "communicate_spi_init";
            pbc.pinType = "pins_digital_pin";
            sckblock = py2block.convert(param.value.args[0]);
            pbc.pinType = null;
            pbc.inScope = null;
        } else if (key === "mosi") {
            pbc.inScope = "communicate_spi_init";
            pbc.pinType = "pins_digital_pin";
            mosiblock = py2block.convert(param.value.args[0]);
            pbc.pinType = null;
            pbc.inScope = null;
        } else if (key === "miso") {
            pbc.inScope = "communicate_spi_init";
            pbc.pinType = "pins_digital_pin";
            misoblock = py2block.convert(param.value.args[0]);
            pbc.pinType = null;
            pbc.inScope = null;
        }
    }
}
    if (polarityblock != null && phaseblock != null && freqblock != null && sckblock != null && mosiblock != null && misoblock != null) {
        return block("communicate_spi_init", node.lineno, {}, {
            "VAR":spiblock,
            "freq": freqblock,
            "polarity": polarityblock,
            "phase": phaseblock,
            "sck": sckblock,
            "mosi": mosiblock,
            "miso": misoblock,
        }, {
            "inline": "true"
        });
    }
}

// 跟control的system_timer重了
// pbc.objectFunctionD.get('init')['SPI'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
//     if (args.length == 0 & keywords.length == 1){
//         var objblock = py2block.convert(func.value);
//         var btlblock = null;
//         var param = keywords[0];
//         var key = py2block.identifier(param.arg);
//         if (key === "baudrate") {
//             bltblock = py2block.convert(param.value);
//         }
//         if (bltblock != null ) {
//             return [block("communicate_spi_set", func.lineno, {}, {
//                 "VAR":objblock,
//                 "data": bltblock,
//             }, {
//                 "inline": "true"
//             })];
//         }
//     }else{
//         throw new Error("Incorrect number of arguments");
//     }
// }

pbc.assignD.get('spi')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" || value.func._astname != "Name"){
        return false;
    }
    var funcName = py2block.Name_str(value.func);
    if(funcName === "bytearray" && value.args.length === 1)
        return true;
    return false;
}

pbc.assignD.get('spi')['create_block'] = function(py2block, node, targets, value){
    return block("communicate_spi_buffer", node.lineno, {
    }, {
        "data":py2block.convert(value.args[0]),
        "VAR":py2block.convert(targets[0])
    });
}

pbc.objectFunctionD.get('read')[spiClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1 & args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var byteblock = py2block.convert(args[0]);
    if (args.length == 1){
        return [block("communicate_spi_read", func.lineno, {}, {
                "data": byteblock,
                "VAR": objblock
            }, {
                "inline": "true"
            })];
    }
    if (args.length == 2){
        var outputblock = py2block.convert(args[1]);
        return block("communicate_spi_read_output", func.lineno, {}, {
                "data": byteblock,
                "val": outputblock,
                "VAR": objblock
            }, {
                "inline": "true"
            });
    }
}

pbc.objectFunctionD.get('readinto')['SPI'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1 & args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var byteblock = py2block.convert(args[0]);
    if (args.length == 1){
        return [block("communicate_spi_readinto", func.lineno, {}, {
                "data": byteblock,
                "VAR": objblock
            }, {
                "inline": "true"
            })];
    }
    if (args.length == 2){
        var outputblock = py2block.convert(args[1]);
        return block("communicate_spi_readinto_output", func.lineno, {}, {
                "data": byteblock,
                "val": outputblock,
                "VAR": objblock
            }, {
                "inline": "true"
            });
    }
}

pbc.objectFunctionD.get('write')[spiClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var byteblock = py2block.convert(args[0].func.value);
    return block("communicate_spi_write", func.lineno, {}, {
        "VAR": objblock,
        "data": byteblock
    }, {
        "inline": "true"
    });
}

pbc.objectFunctionD.get('write_readinto')['SPI'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var byteblock = py2block.convert(args[0].func.value);
    var bufblock = py2block.convert(args[1]);
    return block("communicate_spi_write_readinto", func.lineno, {}, {
        "VAR": objblock,
        "data": byteblock,
        "val": bufblock
    }, {
        "inline": "true"
    });
}

pbc.assignD.get('OW')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" || value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var moduleName = py2block.Name_str(value.func.value);
    var funcName = py2block.identifier(value.func.attr);
    if(value._astname === "Call" && moduleName === "onewire"
        && funcName === "OneWire" && value.args.length === 1)
        return true;
    return false;
}

pbc.assignD.get('OW')['create_block'] = function(py2block, node, targets, value){
    var pwmAstName = value.args[0]._astname;
    pbc.pinType="pins_digital_pin";
    var pinblock;

    if (pwmAstName === "Call"&& value.args[0].func._astname == "Attribute" && value.args[0].func.attr.v==="Pin") {
        pinblock=py2block.convert(value.args[0].args[0])
    }
    pbc.pinType=null;
    return block("communicate_ow_init", node.lineno, {
    }, {
        "BUS":pinblock,
        "VAR":py2block.convert(targets[0]),
    });
}

pbc.objectFunctionD.get('scan')[owClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return block("communicate_ow_scan", func.lineno, {}, {
        "VAR": objblock,
    }, {
        "inline": "true"
    });
}

pbc.objectFunctionD.get('readbyte')['OW'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return block("communicate_ow_read", func.lineno, {}, {
        "VAR": objblock,
    }, {
        "inline": "true"
    });
}

pbc.objectFunctionD.get('reset')['OW'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return [block("communicate_ow_reset", func.lineno, {}, {
        "VAR": objblock,
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('select_rom')['OW'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var byteblock = py2block.convert(args[0].func.value);
    return [block("communicate_ow_select", func.lineno, {}, {
        "VAR": objblock,
        "byte": byteblock
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('write')[owClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var byteblock = py2block.convert(args[0]);
    return [block("communicate_ow_write", func.lineno, {
        'op':'write'
    }, {
        "VAR": objblock,
        "byte": byteblock
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('writebyte')[owClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var byteblock = py2block.convert(args[0]);
    return [block("communicate_ow_write", func.lineno, {
        'op':'writebyte'
    }, {
        "VAR": objblock,
        "byte": byteblock
    }, {
        "inline": "true"
    })];
}