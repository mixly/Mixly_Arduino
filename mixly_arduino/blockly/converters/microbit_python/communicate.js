'use strict';
var pbc = Py2blockConfig.prototype;

pbc.moduleFunctionD.get('radio')['on'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("radio_ons", func.lineno, {"type": "on"}, {}, {
        "inline": "true"
    })];
}


pbc.moduleFunctionD.get('radio')['off'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("radio_ons", func.lineno, {"type": "off"}, {}, {
        "inline": "true"
    })];
}


pbc.moduleFunctionD.get('radio')['reset'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("radio_ons", func.lineno, {"type": "reset"}, {}, {
        "inline": "true"
    })];
}


pbc.moduleFunctionD.get('radio')['config'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0 || keywords.length !== 5) { //length=32, queue=3, channel=100, power=0, data_rate=radio.RATE_1MBIT
        throw new Error("Incorrect number of arguments");
    }
    var lengthblock = null;
    var queueblock = null;
    var channelblock = null;
    var powerblock = null;
    var datarateblock = null;
    // var baudrate = null;
    for (var i = 0; i < keywords.length; i++) {
        var param = keywords[i];
        var key = py2block.identifier(param.arg);
        if (key === "length") {
            lengthblock = py2block.convert(param.value);
        } else if (key === "queue") {
            queueblock = py2block.convert(param.value);
        } else if (key === "channel") {
            channelblock = py2block.convert(param.value);
        } else if (key === "power") {
            powerblock = py2block.convert(param.value);
        } else if (key === "data_rate") {
            datarateblock = py2block.convert(param.value);
    }
    }
    if (lengthblock != null && queueblock != null && channelblock != null && powerblock != null /*&& data_rate!=null*/) {
        return [block("microbit_radio_config", func.lineno, {}, {
            "length": lengthblock,
            "queue": queueblock,
            "channel": channelblock,
            "power": powerblock,
            "data_rate": datarateblock,
        }, {
            "inline": "true"
        })];
    }
}


pbc.moduleFunctionD.get('radio')['send'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length === 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("radio_send_string", func.lineno, {}, {
        "data": py2block.convert(args[0]),
    }, {
        "inline": "true"
    })];
}


pbc.moduleFunctionD.get('radio')['receive'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("microbit_radio_receive", func.lineno, {}, {}, {
        "inline": "true"
    });
}


pbc.moduleFunctionD.get('i2c')['init'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0 || keywords.length !== 3) { //i2c.init(sda=20, scl=19, freq=10000)
        throw new Error("Incorrect number of arguments");
    }
    var sdablock = null;
    var sclblock = null;
    var freqblock = null;
    for (var i = 0; i < keywords.length; i++) {
        var param = keywords[i];
        var key = py2block.identifier(param.arg);
        if (key === "sda") {
            py2block_config.inScope = "i2c_init";
            py2block_config.pinType = "pins_digital";
            sdablock = py2block.convert(param.value);
            py2block_config.pinType = null;
            py2block_config.inScope = null;
        } else if (key === "scl") {
            py2block_config.inScope = "i2c_init";
            py2block_config.pinType = "pins_digital";
            sclblock = py2block.convert(param.value);
            py2block_config.pinType = null;
            py2block_config.inScope = null;
        } else if (key === "freq") {
            freqblock = py2block.convert(param.value);
        }
    }
    if (sdablock != null && sclblock != null && freqblock != null) {
        return [block("i2c_init", func.lineno, {}, {
            'RX': sdablock,
            'TX': sclblock,
            "freq": freqblock
        }, {
            "inline": "true"
        })];
    }
}

pbc.moduleFunctionD.get('i2c')['read'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 3) {
        throw new Error("Incorrect number of arguments");
    }
    var adblock = py2block.convert(args[0]);
    var dtblock = py2block.convert(args[1]);
    return block("i2c_read", func.lineno, {
        'is_repeated': py2block.identifier(args[2].id)
    }, {
        'address': adblock,
        'data': dtblock,
    }, {
        "inline": "true"
    });
}


pbc.moduleFunctionD.get('i2c')['write'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 3) {
        throw new Error("Incorrect number of arguments");
    }
    var adblock = py2block.convert(args[0]);
    var dtblock = py2block.convert(args[1]);
    return block("i2c_write", func.lineno, {
        'is_repeated': py2block.identifier(args[2].id)
    }, {
        'address': adblock,
        'data': dtblock,
    }, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('spi')['init'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0 || keywords.length !== 6) { //(baudrate=1000000, bits=8, mode=0, mosi=15, miso= 14, sclk=13)
        throw new Error("Incorrect number of arguments");
    }
    var baudrate = null;
    var bitsblock = null;
    var modeblock = null;
    var mosiblock = null;
    var misoblock = null;
    var sclkblock = null;

    for (var i = 0; i < keywords.length; i++) {
        var param = keywords[i];
        var key = py2block.identifier(param.arg);
        if (key === "baudrate") {
            baudrate = param.value.n.v;
        } else if (key === "bits") {
            bitsblock = param.value.n.v;
        } else if (key === "mode") {
            modeblock = param.value.n.v;
        } else if (key === "mosi") {
            mosiblock = param.value.n.v;
        } else if (key === "miso") {
            misoblock = param.value.n.v;
        } else if (key === "sclk") {
            sclkblock = param.value.n.v;
        }
    }
    if (bitsblock != null && modeblock != null && baudrate != null && mosiblock != null && misoblock != null && sclkblock != null) {
        return [block("spi_init", func.lineno, {
            "freq": baudrate,
            "bits": bitsblock,
            "mode": modeblock,
            "mosi": mosiblock,
            "miso": misoblock,
            "sck": sclkblock//
        }, {}, {
            "inline": "false"
        })];
    }
}


pbc.moduleFunctionD.get('spi')['write'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length === 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("spi_write", func.lineno, {}, {
        'data': py2block.convert(args[0]),
    }, {
        "inline": "true"
    });
}

