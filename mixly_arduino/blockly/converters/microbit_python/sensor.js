'use strict';

var pbc = Py2blockConfig.prototype;
pbc.objectFunctionD.get('is_pressed')['NUMBER'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    py2block_config.pinType = "pins_button";
    var objblock = py2block.convert(func.value);
    py2block_config.pinType = null;
    return block("sensor_button_is_pressed", func.lineno, {}, {
        "btn" : objblock
    }, {
        "inline": "true"
    });
}


pbc.objectFunctionD.get('was_pressed')['NUMBER'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    py2block_config.pinType = "pins_button";
    var objblock = py2block.convert(func.value);
    py2block_config.pinType = null;
    return block("sensor_button_was_pressed", func.lineno, {}, {
        "btn" : objblock
    }, {
        "inline": "true"
    });
}


pbc.objectFunctionD.get('get_presses')['NUMBER'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    py2block_config.pinType = "pins_button";
    var objblock = py2block.convert(func.value);
    py2block_config.pinType = null;
    return block("sensor_button_get_presses", func.lineno, {}, {
        "btn" : objblock
    }, {
        "inline": "true"
    });
}


pbc.moduleFunctionD.get('accelerometer')['get_x'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("sensor_get_acceleration", func.lineno, {
            "key" : "x"
        },
        {}, {
            "inline": "true"
        });
}


pbc.moduleFunctionD.get('accelerometer')['get_y'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("sensor_get_acceleration", func.lineno, {
            "key" : "y"
        },
        {}, {
            "inline": "true"
        });
}


pbc.moduleFunctionD.get('accelerometer')['get_z'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("sensor_get_acceleration", func.lineno, {
            "key" : "z"
        },
        {}, {
            "inline": "true"
        });
}


pbc.moduleFunctionD.get('accelerometer')['get_values'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("sensor_get_acceleration", func.lineno, {
            "key" : "values"
        },
        {}, {
            "inline": "true"
        });
}


pbc.moduleFunctionD.get('accelerometer')['get_gestures'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return block("sensor_get_gestures", func.lineno, {
        'GES':"all"
    }, {
        "btn" : objblock
    }, {
        "inline": "true"
    });
}


pbc.moduleFunctionD.get('accelerometer')['current_gesture'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return block("sensor_get_gestures", func.lineno, {
        'GES':"current"
    }, {
        "btn" : objblock
    }, {
        "inline": "true"
    });
}


pbc.moduleFunctionD.get('compass')['calibrate'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("sensor_calibrate_compass", func.lineno, {
    }, {
    }, {
        "inline": "true"
    })];
}


pbc.moduleFunctionD.get('compass')['is_calibrated'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("sensor_is_compass_calibrated", func.lineno, {}, {
    }, {
        "inline": "true"
    });
}


pbc.moduleFunctionD.get('compass')['get_field_strength'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return block("sensor_field_strength", func.lineno, {
        'compass':'strength'
    }, {
        "btn" : objblock
    }, {
        "inline": "true"
    });
}


pbc.moduleFunctionD.get('compass')['heading'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return block("sensor_field_strength", func.lineno, {
        'compass' : 'heading'
    }, {
        "btn" : objblock
    }, {
        "inline": "true"
    });
}


pbc.moduleFunctionD.get('compass')['clear_calibration'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("sensor_compass_reset", func.lineno, {}, {
    }, {
        "inline": "true"
    })];
}


pbc.globalFunctionD['temperature'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("sensor_temperature", func.lineno, {}, {
    }, {
        "inline": "true"
    });
}