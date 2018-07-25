'use strict';

pbc.objectFunctionD.get('is_pressed')['Pin'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_button";
    var objblock = py2block.convert(func.value);
    pbc.pinType = null;
    return block("sensor_button_is_pressed", func.lineno, {}, {
        "btn": objblock
    }, {
        "inline": "true"
    });
}


pbc.objectFunctionD.get('was_pressed')['Pin'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_button";
    var objblock = py2block.convert(func.value);
    pbc.pinType = null;
    return block("sensor_button_was_pressed", func.lineno, {}, {
        "btn": objblock
    }, {
        "inline": "true"
    });
}


pbc.objectFunctionD.get('get_presses')['Pin'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_button";
    var objblock = py2block.convert(func.value);
    pbc.pinType = null;
    return block("sensor_button_get_presses", func.lineno, {}, {
        "btn": objblock
    }, {
        "inline": "true"
    });
}


pbc.ifStatementD.get('if_is_gesture')['check_condition'] = function (py2block, node, test, body, orelse) {
    if (test._astname == "Call" && test.func._astname == "Attribute"
        && test.func.value._astname == "Name"
        && py2block.Name_str(test.func.value) == "accelerometer"
        && py2block.identifier(test.func.attr) == "is_gesture"
        && test.args.length == 1) {
        return true;
    }
    return false;
}


pbc.ifStatementD.get('if_is_gesture')['create_block'] = function (py2block, node, test, body, orelse) {
    return block("controls_attachGestureInterrupt", node.lineno, {
        'gesture': py2block.Str_value(test.args[0])
    }, {}, {
        "inline": "true"
    }, {}, {
        "DO": py2block.convertBody(body)
    });
}


pbc.ifStatementD.get('if_was_gesture')['check_condition'] = function (py2block, node, test, body, orelse) {
    if (test._astname == "Call" && test.func._astname == "Attribute"
        && test.func.value._astname == "Name"
        && py2block.Name_str(test.func.value) == "accelerometer"
        && py2block.identifier(test.func.attr) == "was_gesture"
        && test.args.length == 1) {
        return true;
    }
    return false;
}


pbc.ifStatementD.get('if_was_gesture')['create_block'] = function (py2block, node, test, body, orelse) {
    return block("controls_attachGestureInterrupt2", node.lineno, {
        'gesture': py2block.Str_value(test.args[0])
    }, {}, {
        "inline": "true"
    }, {}, {
        "DO": py2block.convertBody(body)
    });
}

function acceleromeerGetDir(mode) {
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        return block("sensor_get_acceleration", func.lineno, {
                "key": mode
            }, {}, {
                "inline": "true"
            });
    }
    return converter;
}

pbc.moduleFunctionD.get('accelerometer')['get_x'] = acceleromeerGetDir('x');
pbc.moduleFunctionD.get('accelerometer')['get_y'] = acceleromeerGetDir('y');
pbc.moduleFunctionD.get('accelerometer')['get_z'] = acceleromeerGetDir('z');
pbc.moduleFunctionD.get('accelerometer')['get_values'] = acceleromeerGetDir('values');


function accelerometerGetGestrues(mode) {
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        return block("sensor_get_gestures", func.lineno, {
            'GES': mode
        }, {}, {
            "inline": "true"
        });
    }

    return converter;
}

pbc.moduleFunctionD.get('accelerometer')['get_gestures'] = accelerometerGetGestrues('all');
pbc.moduleFunctionD.get('accelerometer')['current_gesture'] = accelerometerGetGestrues('current');


pbc.moduleFunctionD.get('compass')['calibrate'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("sensor_calibrate_compass", func.lineno, {}, {}, {
        "inline": "true"
    })];
}


pbc.moduleFunctionD.get('compass')['is_calibrated'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("sensor_is_compass_calibrated", func.lineno, {}, {}, {
        "inline": "true"
    });
}


function getStrength(mode) {
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        return block("sensor_field_strength", func.lineno, {
            'compass': mode
        }, {}, {
            "inline": "true"
        });
    }

    return converter;
}

pbc.moduleFunctionD.get('compass')['get_field_strength'] = getStrength('get_field_strength');
pbc.moduleFunctionD.get('compass')['heading'] = getStrength('heading');
pbc.moduleFunctionD.get('compass')['get_x'] = getStrength('get_x');
pbc.moduleFunctionD.get('compass')['get_y'] = getStrength('get_y');
pbc.moduleFunctionD.get('compass')['get_z'] = getStrength('get_z');


pbc.moduleFunctionD.get('compass')['clear_calibration'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("sensor_compass_reset", func.lineno, {}, {}, {
        "inline": "true"
    })];
}


pbc.globalFunctionD['temperature'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("sensor_temperature", func.lineno, {}, {}, {
        "inline": "true"
    });
}


pbc.moduleFunctionD.get('sonar')['distance_cm'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("sensor_distance_hrsc04", func.lineno, {}, {}, {
        "inline": "true"
    });
}


function ds1307GetTime(mode) {
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        return block("RTC_get_time", func.lineno, {
                'TIME_TYPE': mode
            }, {}, {
                "inline": "true"
            });
    }
    return converter;
}

pbc.moduleFunctionD.get('ds')['Year'] = ds1307GetTime('Year');
pbc.moduleFunctionD.get('ds')['Month'] = ds1307GetTime('Month');
pbc.moduleFunctionD.get('ds')['Day'] = ds1307GetTime('Day');
pbc.moduleFunctionD.get('ds')['Hour'] = ds1307GetTime('Hour');
pbc.moduleFunctionD.get('ds')['Minute'] = ds1307GetTime('Minute');
pbc.moduleFunctionD.get('ds')['Second'] = ds1307GetTime('Second');
pbc.moduleFunctionD.get('ds')['Week'] = ds1307GetTime('Week');
pbc.moduleFunctionD.get('ds')['get_time'] = ds1307GetTime('Mix2');
pbc.moduleFunctionD.get('ds')['get_date'] = ds1307GetTime('Mix1');


pbc.moduleFunctionD.get('ds')['set_date'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 3) {
        throw new Error("Incorrect number of arguments");
    }
    var yearblock = py2block.convert(args[0]);
    var monthblock = py2block.convert(args[1]);
    var dayblock = py2block.convert(args[2]);
    return [block("RTC_set_date", func.lineno, {}, {
            'year': yearblock,
            "month": monthblock,
            "day": dayblock,
        }, {
            "inline": "false"
        })];
}


pbc.moduleFunctionD.get('ds')['set_time'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 3) {
        throw new Error("Incorrect number of arguments");
    }
    var hourblock = py2block.convert(args[0]);
    var minuteblock = py2block.convert(args[1]);
    var secondblock = py2block.convert(args[2]);
    return [block("RTC_set_time", func.lineno, {}, {
            "hour": hourblock,
            "minute": minuteblock,
            "second": secondblock,
        }, {
            "inline": "false"
        })];
}
