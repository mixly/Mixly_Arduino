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

pbc.moduleFunctionD.get('led')['setonoff'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType="number";
    var argblock = py2block.convert(args[0]);
    pbc.pinType=null;
    var mode = py2block.Str_value(args[1]);
    return [block("actuator_led_bright", func.lineno, {
        'bright':mode,
    }, {
        'led': argblock,
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('led')['getonoff'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
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

pbc.moduleFunctionD.get('led')['setbrightness'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
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
    })];
}




pbc.moduleFunctionD.get('music')['pitch'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
	if(args.length!==2){
		throw new Error("Incorrect number of arguments");
	}

	 if (args.length === 2) {
        var roundAstName = args[0]._astname;
        var pwmAstName= args[1]._astname;
        pbc.pinType = "pins_pwm_pin";
        var pinblock = py2block.convert(args[1]);
        pbc.pinType=null;
        pbc.pinType = "pins_tone_notes";
        var pitchblock;

        if (roundAstName === "Call"&& pwmAstName=="Num"
            && args[0].func._astname == "Name" && py2block.Name_str(args[0].func) === "round") {

            pitchblock = py2block.convert(args[0].args[0])
        } else {
            pitchblock = py2block.convert(args[0])
        }
        
        return [block("esp32_music_pitch", func.lineno, {}, {
            'pitch': pitchblock,
            'PIN': pinblock,
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

