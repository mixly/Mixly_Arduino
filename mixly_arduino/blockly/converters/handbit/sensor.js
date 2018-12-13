'use strict';

function button_pressed (mode) {
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        var btn = {
            '_astname': 'Name',
            'id': {
                '_astname': 'Str',
                'v': py2block.identifier(func.value.attr)
            }
        };
        pbc.pinType = "pins_button";
        var objblock = py2block.convert(btn);
        pbc.pinType = null;
        return block(mode, func.lineno, {}, {
            "btn": objblock
        }, {
            "inline": "true"
        });
    }
    return converter;
}


pbc.moduleFunctionD.get('handbit.button_a')['is_pressed'] = button_pressed('sensor_handbit_button_is_pressed'); 
pbc.moduleFunctionD.get('handbit.button_b')['is_pressed'] = button_pressed('sensor_handbit_button_is_pressed'); 
pbc.moduleFunctionD.get('handbit.button_a')['was_pressed'] = button_pressed('sensor_handbit_button_was_pressed'); 
pbc.moduleFunctionD.get('handbit.button_b')['was_pressed'] = button_pressed('sensor_handbit_button_was_pressed'); 
pbc.moduleFunctionD.get('handbit.button_a')['get_presses'] = button_pressed('sensor_handbit_button_get_presses'); 
pbc.moduleFunctionD.get('handbit.button_b')['get_presses'] = button_pressed('sensor_handbit_button_get_presses'); 

pbc.moduleFunctionD.get('handbit.touch1')['is_touched'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
            var btn = {
            '_astname': 'Name',
            'id': {
                '_astname': 'Str',
                'v': py2block.identifier(func.value.attr)
            }
        };
    pbc.pin
    pbc.pinType = "handbit_number1";
    var objblock = py2block.convert(btn);
    pbc.pinType = null;
    return block("sensor_handbit_pin_pressed", func.lineno, {}, {
        "button":objblock
    }, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('handbit.touch2')['is_touched'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
            var btn = {
            '_astname': 'Name',
            'id': {
                '_astname': 'Str',
                'v': py2block.identifier(func.value.attr)
            }
        };
    pbc.pin
    pbc.pinType = "handbit_number1";
    var objblock = py2block.convert(btn);
    pbc.pinType = null;
    return block("sensor_handbit_pin_pressed", func.lineno, {}, {
        "button":objblock
    }, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('handbit.touch3')['is_touched'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
            var btn = {
            '_astname': 'Name',
            'id': {
                '_astname': 'Str',
                'v': py2block.identifier(func.value.attr)
            }
        };
    pbc.pin
    pbc.pinType = "handbit_number1";
    var objblock = py2block.convert(btn);
    pbc.pinType = null;
    return block("sensor_handbit_pin_pressed", func.lineno, {}, {
        "button":objblock
    }, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('handbit.touch4')['is_touched'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
            var btn = {
            '_astname': 'Name',
            'id': {
                '_astname': 'Str',
                'v': py2block.identifier(func.value.attr)
            }
        };
    pbc.pin
    pbc.pinType = "handbit_number1";
    var objblock = py2block.convert(btn);
    pbc.pinType = null;
    return block("sensor_handbit_pin_pressed", func.lineno, {}, {
        "button":objblock
    }, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('handbit.touch5')['is_touched'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
            var btn = {
            '_astname': 'Name',
            'id': {
                '_astname': 'Str',
                'v': py2block.identifier(func.value.attr)
            }
        };
    pbc.pin
    pbc.pinType = "handbit_number1";
    var objblock = py2block.convert(btn);
    pbc.pinType = null;
    return block("sensor_handbit_pin_pressed", func.lineno, {}, {
        "button":objblock
    }, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('handbit.touch6')['is_touched'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
            var btn = {
            '_astname': 'Name',
            'id': {
                '_astname': 'Str',
                'v': py2block.identifier(func.value.attr)
            }
        };
    pbc.pin
    pbc.pinType = "handbit_number1";
    var objblock = py2block.convert(btn);
    pbc.pinType = null;
    return block("sensor_handbit_pin_pressed", func.lineno, {}, {
        "button":objblock
    }, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('handbit.button_a')['irq'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0 || keywords.length!==2) {
        throw new Error("Incorrect number of arguments");
    }

      var btn = {
            '_astname': 'Name',
            'id': {
                '_astname': 'Str',
                'v': py2block.identifier(func.value.attr)
            }
        };
    pbc.pinType="pins_button";
    var objblock=py2block.convert(btn);
    pbc.pinType=null;
    var irq=py2block.identifier(keywords[1].value.attr);
    var pin=py2block.identifier(keywords[1].value.value.attr);
    var mac=py2block.identifier(keywords[1].value.value.value.id)
 

    var mode = mac+"."+pin+"."+py2block.identifier(keywords[1].value.attr);

    pbc.pinType = "factory_block_return";
    var callback = py2block.convert(keywords[0].value);
    pbc.pinType = null;

    return [block("sensor_handbit_button_attachInterrupt", func.lineno, {"mode":mode}, {
        "btn": objblock,
        "DO": callback
    }, {
        "inline": "true"
    })];

}

pbc.moduleFunctionD.get('handbit')['handbit_get_brightness'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("sensor_handbit_light", func.lineno, {}, {}, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('handbit')['handbit_get_soundlevel'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("sensor_handbit_sound", func.lineno, {}, {}, {
        "inline": "true"
    });
}

pbc.objectFunctionD.get('get_a_x')['monitor'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return [block("sensor_handbit_get_acceleration", func.lineno, {
            'key': 'x',
        }, {
            "SUB":objblock,
        }, {
            "inline": "true"
        })];
}

pbc.objectFunctionD.get('get_a_y')['monitor'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return [block("sensor_handbit_get_acceleration", func.lineno, {
            'key': 'y',
        }, {
            "SUB":objblock,
        }, {
            "inline": "true"
        })];
}

pbc.objectFunctionD.get('get_a_z')['monitor'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return [block("sensor_handbit_get_acceleration", func.lineno, {
            'key': 'z',
        }, {
            "SUB":objblock,
        }, {
            "inline": "true"
        })];
}