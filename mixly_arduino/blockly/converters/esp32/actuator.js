'use strict';


pbc.objectFunctionD.get('on')['led'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if(args.length!=0){
        throw new Error("Incorrect number of arguments");
    }

    var rgbblock=py2block.convert(func.value);

    return [block("led_bright", func.lineno, {"bright":"on",}, { 
    }, {
        "inline": "true"
    })];
}
pbc.objectFunctionD.get('off')['led'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if(args.length!=0){
        throw new Error("Incorrect number of arguments");
    }

    var rgbblock=py2block.convert(func.value);

    return [block("led_bright", func.lineno, {"bright":"off",}, { 
    }, {
        "inline": "true"
    })];
}
pbc.objectFunctionD.get('toggle')['led'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if(args.length!=0){
        throw new Error("Incorrect number of arguments");
    }

    var rgbblock=py2block.convert(func.value);

    return [block("led_bright", func.lineno, {"bright":"toggle",}, { 
    }, {
        "inline": "true"
    })];
}

/*灯管脚的问题*/
pbc.objectFunctionD.get('value')['led'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if(args.length!=1){
        throw new Error("Incorrect number of arguments");
    }

    var brightblock=py2block.convert(args[0]);

    return [block("led_brightness", func.lineno, {}, { 
    	'bright':brightblock,
    }, {
        "inline": "true"
    })];
}

/*管脚问题再度出现*/

pbc.moduleFunctionD.get('music')['pitch'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
	if(args.length!==2){
		throw new Error("Incorrect number of arguments");
	}

	 if (args.length === 2) {
        var roundAstName = args[0]._astname;
        pbc.pinType = "pins_pwm";
        var pinblock = py2block.convert(args[1]);
        pbc.pinType = null;
        pbc.pinType = "pins_tone_notes";
        var pitchblock;
        if (roundAstName === "Call"
            && args[0].func._astname == "Name" && py2block.Name_str(args[0].func) === "round") {
            pitchblock = py2block.convert(args[0].args[0])
        } else {
            pitchblock = py2block.convert(args[0])
        }
        pbc.pinType = null;
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
    pbc.pinType = "pins_pwm";
    var argblock = py2block.convert(args[0]);
    pbc.pinType = null;
    return [block("microbit_music_stop", func.lineno, {}, {
        'PIN': argblock
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('led')['setbrightness'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    var brightblock = py2block.convert(args[1]);
    return [block("led_brightness", func.lineno, {}, {
        'led': argblock,
        'bright':brightblock,
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('led')['setonoff'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
     var mode = py2block.Str_value(args[1]);
    return [block("led_bright", func.lineno, {
        'bright':mode,
    }, {
        'led': argblock,
    }, {
        "inline": "true"
    })];
}
