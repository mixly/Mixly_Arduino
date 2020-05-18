
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

pbc.moduleFunctionD.get('handbit.led')['setonoff'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType="number";
    var argblock = py2block.convert(args[0]);
    pbc.pinType=null;
    pbc.inScope="ledswitch";
    var mode = py2block.convert(args[1]);
     pbc.inScope=null;
    return [block("actuator_led_bright", func.lineno, {
        
    }, {
        'led': argblock,
        'bright':mode,
    }, {
        "inline": "true"
    }),
    ];
}

pbc.moduleFunctionD.get('handbit.led')['getonoff'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType="number";
    var argblock = py2block.convert(args[0]);
    pbc.pinType=null;
    return block("actuator_get_led_bright", func.lineno, {
    }, {
        'led': argblock,
    }, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('handbit.led')['setbrightness'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType="number";
    var argblock = py2block.convert(args[0]);
    pbc.pinType=null;
    var brightblock = py2block.convert(args[1]);

    return [block("actuator_led_brightness", func.lineno, {}, {
        'led': argblock,
        'bright':brightblock,
    }, {
        "inline": "true"
    }),
    ];
}




pbc.moduleFunctionD.get('music')['pitch'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
	/*if(args.length!==2){
		throw new Error("Incorrect number of arguments");
	}*/

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
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_pwm_pin";
    var argblock = py2block.convert(args[0]);
    pbc.pinType = null;
    return [block("esp32_music_stop", func.lineno, {}, {
        'PIN': argblock
    }, {
        "inline": "true"
    })];
}


pbc.moduleFunctionD.get('music')['play'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
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

pbc.moduleFunctionD.get('Motor')['Set_Speed'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var varblock1 = args[0].n.v;
    var varblock2 = py2block.convert(args[1]);
    return [block("handbit_motor_move", func.lineno, {
        "type": varblock1
    }, {
        'speed': varblock2
    }, {
        "inline": "true"
    })];
}
