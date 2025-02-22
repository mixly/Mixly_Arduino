
'use strict';

pbc.moduleFunctionD.get('servo')['servo_write_angle'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var pwmAstName = args[0]._astname;
    pbc.pinType="pins_pwm_pin";
    var pinblock;

    if (pwmAstName === "Num") {
        pinblock=py2block.convert(args[0])
    }
    pbc.pinType=null;
    var angleblock=py2block.convert(args[1]);
    
    return [block("servo_move", func.lineno, {}, {
        "PIN":pinblock,
        "DEGREE": angleblock,

    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('mixgo.led1')['setonoff'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType="number";
    var ledblock = {
            _astname: "Num",
            n: {
                'v': "1"
            }
        }
    var mode = py2block.convert(ledblock);   
    pbc.pinType=null;
    pbc.inScope="ledswitch";
    var argblock = py2block.convert(args[0]);
    
     pbc.inScope=null;
    return [block("actuator_led_bright", func.lineno, {
        
    }, {
        'led': mode,
        'bright':argblock,
    }, {
        "inline": "true"
    }),
    ];
}

pbc.moduleFunctionD.get('mixgo.led2')['setonoff'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType="number";
    var ledblock = {
            _astname: "Num",
            n: {
                'v': "2"
            }
        }
    var mode = py2block.convert(ledblock);   
    pbc.pinType=null;
    pbc.inScope="ledswitch";
    var argblock = py2block.convert(args[0]);
    
     pbc.inScope=null;
    return [block("actuator_led_bright", func.lineno, {
        
    }, {
        'led': mode,
        'bright':argblock,
    }, {
        "inline": "true"
    }),
    ];
}

pbc.moduleFunctionD.get('mixgo.led1')['getonoff'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType="number";
    var ledblock = {
            _astname: "Num",
            n: {
                'v': "1"
            }
        }
    var mode = py2block.convert(ledblock);
    pbc.pinType=null;
    return block("actuator_get_led_bright", func.lineno, {
    }, {
        'led': mode,
    }, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('mixgo.led2')['getonoff'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType="number";
    var ledblock = {
            _astname: "Num",
            n: {
                'v': "2"
            }
        }
    var mode = py2block.convert(ledblock);
    pbc.pinType=null;
    return block("actuator_get_led_bright", func.lineno, {
    }, {
        'led': mode,
    }, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('mixgo.led1')['setbrightness'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType="number";
    var ledblock = {
            _astname: "Num",
            n: {
                'v': "1"
            }
        }
    var mode = py2block.convert(ledblock);
    pbc.pinType=null;
    var brightblock = py2block.convert(args[0]);

    return [block("actuator_led_brightness", func.lineno, {}, {
        'led': mode,
        'bright':brightblock,
    }, {
        "inline": "true"
    }),
    ];
}

pbc.moduleFunctionD.get('mixgo.led2')['setbrightness'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType="number";
    var ledblock = {
            _astname: "Num",
            n: {
                'v': "2"
            }
        }
    var mode = py2block.convert(ledblock);
    pbc.pinType=null;
    var brightblock = py2block.convert(args[0]);

    return [block("actuator_led_brightness", func.lineno, {}, {
        'led': mode,
        'bright':brightblock,
    }, {
        "inline": "true"
    }),
    ];
}


pbc.moduleFunctionD.get('music')['pitch'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
	if(args.length!==1 && args.length!==2){
		throw new Error("Incorrect number of arguments");
	}

	 if (args.length === 2) {
        pbc.pinType = "pins_pwm_pin";
        var pinblock = py2block.convert(args[0]);
        pbc.pinType=null;
        pbc.pinType = "pins_tone_notes";
        var pitchblock = py2block.convert(args[1]);
        pbc.pinType=null;
      
        
        return [block("esp32_music_pitch", func.lineno, {}, {
            'pitch': pitchblock,
            'PIN': pinblock,
        }, {
            "inline": "true"
        })];
    } 
    else if (args.length=== 1){
        pbc.pinType = "pins_tone_notes";
        var pitchblock = py2block.convert(args[0]);
        pbc.pinType=null;
     return [block("esp32_onboard_music_pitch", func.lineno, {}, {
                'pitch': pitchblock,
            }, {
                "inline": "true"
            })];

    }

}

pbc.moduleFunctionD.get('music')['pitch_time'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if(args.length!==2 && args.length!==3){
        throw new Error("Incorrect number of arguments");
    }

     if (args.length === 2) {
        pbc.pinType = "pins_tone_notes";
        var pitchblock = py2block.convert(args[0]);
        pbc.pinType=null;
        var timeblock=py2block.convert(args[1]);        
        return [block("esp32_onboard_music_pitch_with_time", func.lineno, {}, {
            'pitch': pitchblock,
            "time":timeblock
        }, {
            "inline": "true"
        })];
    } 
    else if (args.length=== 3){
        pbc.pinType = "pins_pwm_pin";
        var pinblock = py2block.convert(args[0]);
        pbc.pinType=null;
        pbc.pinType = "pins_tone_notes";
        var pitchblock = py2block.convert(args[1]);
        pbc.pinType=null;
        var timeblock=py2block.convert(args[2]);
     return [block("esp32_music_pitch_with_time", func.lineno, {}, {
                'pitch': pitchblock,
                'PIN': pinblock,
                "time":timeblock
            }, {
                "inline": "true"
            })];

    }

}


pbc.moduleFunctionD.get('music')['stop'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1 && args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    if (args.length == 1){
    pbc.pinType = "pins_pwm_pin";
    var argblock = py2block.convert(args[0]);
    pbc.pinType = null;
    return [block("esp32_music_stop", func.lineno, {}, {
        'PIN': argblock
    }, {
        "inline": "true"
    })];
    }
    if (args.length == 0){
    return [block("esp32_onboard_music_stop", func.lineno, {}, {}, {
        "inline": "true"
    })];
    }

}


pbc.moduleFunctionD.get('music')['play'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2 && args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    if(args.length == 2){
    pbc.pinType = "pins_playlist_pin";
    var nameblock= py2block.convert(args[0]);
    pbc.pinType = "pins_pwm_pin";
    var argblock = py2block.convert(args[1]);
    pbc.pinType = null;
    return [block("esp32_music_play_list", func.lineno, {}, {
        "LIST":nameblock,
        'PIN': argblock
    }, {
        "inline": "true"
    })];
    }
    if(args.length == 1){
    pbc.pinType = "pins_playlist_pin";
    var nameblock= py2block.convert(args[0]);
    pbc.pinType = null;
    return [block("esp32_onboard_music_play_list", func.lineno, {}, {
        "LIST":nameblock,
    }, {
        "inline": "true"
    })];
    }
}

pbc.moduleFunctionD.get('music')['play_show'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_playlist_pin";
    var nameblock= py2block.convert(args[0]);
    pbc.pinType = "pins_pwm_pin";
    var argblock = py2block.convert(args[1]);
    pbc.pinType = null;
    return [block("esp32_mixgo_music_play_list_show", func.lineno, {}, {
        "LIST":nameblock,
        'PIN': argblock
    }, {
        "inline": "true"
    })];
}




pbc.assignD.get('Rgb')['check_assign'] = function(py2block, node, targets, value) {
    var funcName = py2block.identifier(value.func.attr);
    var moduleName=py2block.identifier(value.func.value.id);
    if(value._astname === "Call" && moduleName === "neopixel"
        && funcName === "NeoPixel" && value.args.length === 2&&value.keywords.length===1)
        return true;

    return false;
}


pbc.assignD.get('Rgb')['create_block'] = function(py2block, node, targets, value){

    var rgbblock=py2block.convert(targets[0]);
    pbc.inScope = "rgb_create_block";
    pbc.pinType = "pins_digital_pin";
    // value.args[0].args[0].n.v='pin'+value.args[0].args[0].n.v
    var pinblock = py2block.convert(value.args[0].args[0]);
    pbc.inScope = null;
    pbc.pinType = null;
    var countblock = py2block.convert(value.args[1]);

    return block("actuator_neopixel_init", node.lineno, {}, {
        "SUB":rgbblock,
        "PIN":pinblock,
        "LEDCOUNT":countblock
    });
}


pbc.moduleFunctionD.get('rgb')['write'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if(args.length!=0){
        throw new Error("Incorrect number of arguments");
    }

    var rgbblock=py2block.convert(func.value);

    return [block("actuator_neopixel_write", func.lineno, {}, { 'SUB':rgbblock,
    }, {
        "inline": "true"
    })];
}



pbc.moduleFunctionD.get('music')['get_tempo'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if(args.length!=0){
        throw new Error("Incorrect number of arguments");
    }

    return block("esp32_music_get_tempo", func.lineno, {}, { 
    }, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('music')['set_tempo'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if(args.length!=2){
        throw new Error("Incorrect number of arguments");
    }
    var resoblock=py2block.convert(args[0]);
    var speedblock=py2block.convert(args[1]);

    return [block("esp32_music_set_tempo", func.lineno, {}, { 
        'TICKS':resoblock,
        "BPM":speedblock,
    }, {
        "inline": "true"
    })];
}
pbc.moduleFunctionD.get('music')['reset'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if(args.length!=0){
        throw new Error("Incorrect number of arguments");
    }

    return [block("esp32_music_reset", func.lineno, {}, { 
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('setonoff')['led'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var pin=py2block.identifier(func.value.func.attr);
    var mac=py2block.identifier(func.value.func.value.id);
    if(pin==="led" && mac==="mixgo"){

    pbc.pinType = "pins_pwm_pin";
    var pinblock = py2block.convert(func.value.args[0]);
    pbc.pinType = null;
    pbc.inScope="ledswitch";
    var mode = py2block.convert(args[0]);
     pbc.inScope=null;

    return [block("actuator_extern_led_bright", func.lineno, {}, {
        "PIN": pinblock,
        'bright':mode
    }, {
        "inline": "true"
    })];
}

}

pbc.objectFunctionD.get('getonoff')['led'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var pin=py2block.identifier(func.value.func.attr);
    var mac=py2block.identifier(func.value.func.value.id);
    if(pin==="led" && mac==="mixgo"){

    pbc.pinType = "pins_pwm_pin";
    var pinblock = py2block.convert(func.value.args[0]);
    pbc.pinType = null;

    return block("actuator_extern_get_led_bright", func.lineno, {}, {
        "PIN": pinblock,
    }, {
        "inline": "true"
    });
}

}

pbc.objectFunctionD.get('setbrightness')['led'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var pin=py2block.identifier(func.value.func.attr);
    var mac=py2block.identifier(func.value.func.value.id);
    if(pin==="led" && mac==="mixgo"){

    pbc.pinType = "pins_pwm_pin";
    var pinblock = py2block.convert(func.value.args[0]);
    pbc.pinType = null;
    var mode = py2block.convert(args[0]);

    return [block("actuator_extern_led_brightness", func.lineno, {}, {
        "PIN": pinblock,
        'bright':mode
    }, {
        "inline": "true"
    })];
}

}

pbc.moduleFunctionD.get('mixgo.rgb')['write'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if(args.length!=0){
        throw new Error("Incorrect number of arguments");
    }

    return [block("actuator_onboard_neopixel_write", func.lineno, {}, { 
    }, {
        "inline": "true"
    })];
}