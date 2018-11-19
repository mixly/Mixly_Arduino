'use strict';


pbc.moduleFunctionD.get('mixgo.button_a')['is_pressed'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
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
    return block("sensor_mixgo_button_is_pressed", func.lineno, {}, {
        "btn": objblock
    }, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('mixgo.button_b')['is_pressed'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
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
    return block("sensor_mixgo_button_is_pressed", func.lineno, {}, {
        "btn": objblock
    }, {
        "inline": "true"
    });
}


pbc.moduleFunctionD.get('was_pressed')['Pin'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_button";
    var objblock = py2block.convert(func.value);
    pbc.pinType = null;
    return block("sensor_mixgo_button_was_pressed", func.lineno, {}, {
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
    return block("sensor_mixgo_button_get_presses", func.lineno, {}, {
        "btn": objblock
    }, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('mixgo.touch1')['is_touched'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
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
    pbc.pinType = "number1";
    var objblock = py2block.convert(btn);
    pbc.pinType = null;
    return block("sensor_mixgo_pin_pressed", func.lineno, {}, {
        "button":objblock
    }, {
        "inline": "true"
    });
}
pbc.moduleFunctionD.get('mixgo.touch2')['is_touched'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
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
    pbc.pinType = "number1";
    var objblock = py2block.convert(btn);
    pbc.pinType = null;
    return block("sensor_mixgo_pin_pressed", func.lineno, {}, {
        "button":objblock
    }, {
        "inline": "true"
    });
}
pbc.moduleFunctionD.get('mixgo.touch3')['is_touched'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
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
    pbc.pinType = "number1";
    var objblock = py2block.convert(btn);
    pbc.pinType = null;
    return block("sensor_mixgo_pin_pressed", func.lineno, {}, {
        "button":objblock
    }, {
        "inline": "true"
    });
}
pbc.moduleFunctionD.get('mixgo.touch4')['is_touched'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
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
    pbc.pinType = "number1";
    var objblock = py2block.convert(btn);
    pbc.pinType = null;
    return block("sensor_mixgo_pin_pressed", func.lineno, {}, {
        "button":objblock
    }, {
        "inline": "true"
    });
}


pbc.moduleFunctionD.get('mixgo.Infrared_left')['near'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("sensor_mixgo_pin_near", func.lineno, {"direction":'left'}, {}, {
        "inline": "true"
    });

}

pbc.moduleFunctionD.get('mixgo.Infrared_right')['near'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("sensor_mixgo_pin_near", func.lineno, {"direction":'right'}, {}, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('mixgo')['mixgo_get_brightness'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("sensor_mixgo_light", func.lineno, {}, {}, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('mixgo')['mixgo_get_soundlevel'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("sensor_mixgo_sound", func.lineno, {}, {}, {
        "inline": "true"
    });
}

pbc.assignD.get('RTC')['check_assign'] = function(py2block, node, targets, value) {
    var funcName = py2block.identifier(value.func.value.id);
    if(value._astname === "Call" && funcName === "machine" && value.args.length === 0)
        return true;

    return false;
}

pbc.assignD.get('RTC')['create_block'] = function(py2block, node, targets, value){

    var objblock=py2block.convert(targets[0]);

    return [block("sensor_rtc_init", node.lineno, {}, {
        'SUB':objblock
    },
    {
        "inline":"true"
    }
    )];
}

pbc.objectFunctionD.get('datetime')['RTC'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    /*if (keywords.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }*/
    if(args.length==0){
        var objblock=py2block.convert(func.value);
        return block("RTC_get_time", func.lineno, {}, {
            'SUB':objblock
        }, {
            "inline": "true"
        }); 
    }
    else if(args.length==1&&args[0]._astname=="Tuple"){

        var objblock=py2block.convert(func.value);
        var yearblock=py2block.convert(args[0].elts[0])
        var monthblock=py2block.convert(args[0].elts[1])
        var dayblock=py2block.convert(args[0].elts[2])
        var weekdayblock=py2block.convert(args[0].elts[3])
        var hourblock=py2block.convert(args[0].elts[4])
        var minuteblock=py2block.convert(args[0].elts[5])
        var secondblock=py2block.convert(args[0].elts[6])
        var millisecondblock=py2block.convert(args[0].elts[7])

        return [block("RTC_set_datetime", func.lineno, {}, {
            'SUB':objblock,
            'year':yearblock,
            'month':monthblock,
            'day':dayblock,
            'weekday':weekdayblock,
            'hour':hourblock,
            'minute':minuteblock,
            'second':secondblock,
            'millisecond':millisecondblock,
        }, {
            "inline": "false"
        })]; 
    }
   
}

/*I2C出现了一些问题，待解决*/
pbc.assignD.get('i2c')['check_assign'] = function (py2block, node, targets, value) {
    var funcName = py2block.identifier(value.func.attr);
    var moduleName = py2block.identifier(value.func.value.id);
    if (value._astname === "Call" && ['MPU9250', 'SHT20', 'BMP280'].indexOf(funcName) != -1
        && ['mpu9250', 'sht20', 'bmp280'].indexOf(funcName) != -1 && value.args.length === 1)
        return true;

    return false;
}
pbc.assignD.get('i2c')['create_block'] = function (py2block, node, targets, value) {
    var funcblock = py2block.identifier(value.func.attr);
    var mpublock = py2block.convert(targets[0]);
    var i2cblock = py2block.convert(value.args[0]);
    return block("sensor_use_i2c_init", node.lineno, { "key": funcblock }, {
        'I2CSUB': i2cblock,
        'SUB': mpublock,
    }, {
            "inline": "true"
        });
}


function getAcceleration(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        var mpu = {
            '_astname': 'Name',
            'id': {
                '_astname': 'Str',
                'v': py2block.Name_str(func.value.value) + "." + py2block.identifier(func.value.attr)
            }
        };
        var mpublock=py2block.convert(mpu);
        return block('sensor_mpu9250_get_acceleration', func.lineno, {
                "key": mode
            }, {
                'SUB': mpublock
            }, {
                "inline": "true"
            });
    }
    return converter;
}

pbc.moduleFunctionD.get('mixgo.mpu')['mpu9250_get_x'] = getAcceleration('x');
pbc.moduleFunctionD.get('mixgo.mpu')['mpu9250_get_y'] = getAcceleration('y');
pbc.moduleFunctionD.get('mixgo.mpu')['mpu9250_get_z'] = getAcceleration('z');
pbc.moduleFunctionD.get('mixgo.mpu')['mpu9250_get_values'] = getAcceleration('values');

function getMagnetic(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        var mpu = {
            '_astname': 'Name',
            'id': {
                '_astname': 'Str',
                'v': py2block.Name_str(func.value.value) + "." + py2block.identifier(func.value.attr)
            }
        };
        var mpublock=py2block.convert(mpu);
        return block('sensor_mpu9250_get_magnetic', func.lineno, {
                "key": mode
            }, {
                'SUB': mpublock
            }, {
                "inline": "true"
            });
    }
    return converter;
}

pbc.moduleFunctionD.get('mixgo.mpu')['mpu9250_magnetic_x'] = getMagnetic('x');
pbc.moduleFunctionD.get('mixgo.mpu')['mpu9250_magnetic_y'] = getMagnetic('y');
pbc.moduleFunctionD.get('mixgo.mpu')['mpu9250_magnetic_z'] = getMagnetic('z');
pbc.moduleFunctionD.get('mixgo.mpu')['mpu9250_magnetic_values'] = getMagnetic('values');

function getGyro(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        var mpu = {
            '_astname': 'Name',
            'id': {
                '_astname': 'Str',
                'v': py2block.Name_str(func.value.value) + "." + py2block.identifier(func.value.attr)
            }
        };
        var mpublock=py2block.convert(mpu);
        return block('sensor_mpu9250_get_gyro', func.lineno, {
                "key": mode
            }, {
                'SUB': mpublock
            }, {
                "inline": "true"
            });
    }
    return converter;
}

pbc.moduleFunctionD.get('mixgo.mpu')['mpu9250_gyro_x'] = getGyro('x');
pbc.moduleFunctionD.get('mixgo.mpu')['mpu9250_gyro_y'] = getGyro('y');
pbc.moduleFunctionD.get('mixgo.mpu')['mpu9250_gyro_z'] = getGyro('z');
pbc.moduleFunctionD.get('mixgo.mpu')['mpu9250_gyro_values'] = getGyro('values');

function fieldStrength(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        var mpu = {
            '_astname': 'Name',
            'id': {
                '_astname': 'Str',
                'v': py2block.Name_str(func.value.value) + "." + py2block.identifier(func.value.attr)
            }
        };        
        var mpublock=py2block.convert(mpu)
        return block('sensor_mpu9250_field_strength', func.lineno, {
                'compass': mode
            }, {
                'SUB': mpublock
            }, {
                "inline": "true"
            });
    }
    return converter;
}


pbc.moduleFunctionD.get('mixgo.mpu')['mpu9250_get_field_strength'] = fieldStrength('strength');
pbc.moduleFunctionD.get('mixgo.mpu')['mpu9250_heading'] = fieldStrength('heading');


pbc.moduleFunctionD.get('mixgo.mpu')['mpu9250_get_temperature'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var mpu = {
            '_astname': 'Name',
            'id': {
                '_astname': 'Str',
                'v': py2block.Name_str(func.value.value) + "." + py2block.identifier(func.value.attr)
            }
        };     
    var mpublock = py2block.convert(mpu)
    return block("sensor_mpu9250_temperature", func.lineno, {}, {
        'SUB': mpublock
    }, {
        "inline": "true"
    });
}

function sensorBmp(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        var mpublock=py2block.convert(func.value)
        return block('sensor_bmp', func.lineno, {
                "key": mode
            }, {
                'SUB': mpublock
            }, {
                "inline": "true"
            });
    }
    return converter;
}

pbc.objectFunctionD.get('get_BMP_temperature')['mpu'] = sensorBmp('get_BMP_temperature()');
pbc.objectFunctionD.get('get_BMP_pressure')['mpu'] = sensorBmp('get_BMP_pressure()');

function sensorSht(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        var mpublock=py2block.convert(func.value)
        return block('sensor_sht', func.lineno, {
                "key": mode
            }, {
                'SUB': mpublock
            }, {
                "inline": "true"
            });
    }
    return converter;
}

pbc.objectFunctionD.get('get_SHT_temperature')['mpu'] = sensorSht('get_SHT_temperature()');
pbc.objectFunctionD.get('get_SHT_relative_humidity')['mpu'] = sensorSht('get_SHT_relative_humidity()');



function dht(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 2) {
            throw new Error("Incorrect number of arguments");
        }
        pbc.pinType="pins_digital_pin";
        var pinblock=py2block.convert(args[1]);
        pbc.pinType=null;
        var dhtblock=py2block.identifier(args[0].s);
        return block('sensor_dht11', func.lineno, {
                'TYPE':dhtblock,
                'WHAT':mode
            }, {
                "PIN":pinblock,
            }, {
                "inline": "true"
            });
    }
    return converter;
}

pbc.moduleFunctionD.get('dhtx')['get_dht_temperature'] = dht('temperature');
pbc.moduleFunctionD.get('dhtx')['get_dht_relative_humidity'] = dht('relative_humidity');
pbc.moduleFunctionD.get('dhtx')['get_dht_tempandhum'] = dht('tempandhum');



pbc.objectFunctionD.get('checkdist')['sonar'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (func.value.args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType="pins_digital_pin";
    var trigblock=py2block.convert(func.value.args[0]);
    var echoblock=py2block.convert(func.value.args[1]);
    pbc.pinType=null;
    return block("HCSR04", func.lineno, {}, {
        "PIN1":trigblock,
        "PIN2":echoblock
    }, {
        "inline": "true"
    });
}
