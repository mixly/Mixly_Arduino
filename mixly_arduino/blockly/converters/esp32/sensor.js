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

pbc.objectFunctionD.get('is_touched')['touch'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "number1";
    var objblock = py2block.convert(func.value);
    pbc.pinType = null;
    return block("sensor_pin_pressed", func.lineno, {}, {
        "button":objblock
    }, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('Infrared_left')['near'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("sensor_pin_near", func.lineno, {"direction":'left'}, {}, {
        "inline": "true"
    });

}

pbc.moduleFunctionD.get('Infrared_right')['near'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("sensor_pin_near", func.lineno, {"direction":'right'}, {}, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('brightness')['read'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("sensor_light", func.lineno, {}, {}, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('sound')['read'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("sensor_sound", func.lineno, {}, {}, {
        "inline": "true"
    });
}

pbc.assignD.get('RTC')['check_assign'] = function(py2block, node, targets, value) {
    var funcName = py2block.identifier(value.func.id);
    if(value._astname === "Call" && funcName === "RTC" && value.args.length === 0)
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
pbc.assignD.get('i2c')['check_assign'] = function(py2block, node, targets, value) {
    var funcName = py2block.identifier(value.func.id)
    if(value._astname === "Call" && funcName === "MPU9250"||"SHT20"|| "BMP280"&& value.args.length === 1)
        return true;

    return false;
}

/*["MPU9250", "MPU9250"],
                ["SHT20", "SHT20"],
                ["BMP280", "BMP280"]*/
pbc.assignD.get('i2c')['create_block'] = function(py2block, node, targets, value){
    var funcblock = py2block.identifier(value.func.id)
    var mpublock=py2block.convert(targets[0])
    var i2cblock=py2block.convert(value.args[0])


    return [block("sensor_use_i2c_init", func.lineno, { "key":funcblock}, {
        'I2CSUB':i2cblock,
        'SUB':mpublock,
    }, {
        "inline": "true"
    })];
}
/*
两个摇晃都不会做！*/


function getAcceleration(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        var mpublock=py2block.convert(func.value)
        return block('sensor_get_acceleration', func.lineno, {
                "key": mode
            }, {
                'SUB': mpublock
            }, {
                "inline": "true"
            });
    }
    return converter;
}

pbc.objectFunctionD.get('get_x')['mpu'] = getAcceleration('x');
pbc.objectFunctionD.get('get_y')['mpu'] = getAcceleration('y');
pbc.objectFunctionD.get('get_z')['mpu'] = getAcceleration('z');
pbc.objectFunctionD.get('get_values')['mpu'] = getAcceleration('values');



function fieldStrength(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        var mpublock=py2block.convert(func.value)
        return block('sensor_field_strength', func.lineno, {
                'compass': mode
            }, {
                'SUB': mpublock
            }, {
                "inline": "true"
            });
    }
    return converter;
}


pbc.objectFunctionD.get('get_field_strength')['mpu'] = fieldStrength('strength');
pbc.objectFunctionD.get('heading')['mpu'] = fieldStrength('heading');


pbc.objectFunctionD.get('get_BMP_temperature')['mpu'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
   
    var mpublock = py2block.convert(func.value)
    return block("sensor_temperature", func.lineno, {}, {
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
        return block('dht11', func.lineno, {
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

pbc.moduleFunctionD.get('dhtx')['get_temperature'] = dht('temperature');
pbc.moduleFunctionD.get('dhtx')['get_humidity'] = dht('humidity');
pbc.moduleFunctionD.get('dhtx')['get_tempandhum'] = dht('all');



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
