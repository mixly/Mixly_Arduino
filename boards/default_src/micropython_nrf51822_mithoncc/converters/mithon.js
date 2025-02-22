'use strict';

pbc.moduleFunctionD.get('rgb_show')['mixly_rgb_show_all'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 3) {
        throw new Error("Incorrect number of arguments");
    }
    var r = args[0].n.v;
    var g = args[1].n.v;
    var b = args[2].n.v;
    if (r-0 == 0 && g-0 == 0 && b-0 == 0) {
	    return [block("actuator_rgb_off", func.lineno, {
	    	"LED": 0
	    }, {}, {
	        "inline": "true"
	    })];
	} else {
		return [block("actuator_rgb_color", func.lineno, {
	    	"LED": 0,
	        "COLOR": r+","+g+","+b
	    }, {}, {
	        "inline": "true"
	    })];
	}
}

pbc.moduleFunctionD.get('rgb_show')['mixly_rgb_show'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 4) {
        throw new Error("Incorrect number of arguments");
    }
    var led = args[0].n.v;
    if (led-0 >= 4) {
    	var ledblock = {
            _astname: "Num",
            n: {
                'v': led
            }
        }
    	return [block("actuator_rgb", func.lineno, {}, {
    		"_LED_": py2block.convert(ledblock),
    		"RVALUE": py2block.convert(args[1]),
    		"GVALUE": py2block.convert(args[2]),
    		"BVALUE": py2block.convert(args[3])
    	}, {
	        "inline": "true"
	    })];
    }

    var r = args[1].n.v;
    var g = args[2].n.v;
    var b = args[3].n.v;
    if (r-0 == 0 && g-0 == 0 && b-0 == 0) {
	    return [block("actuator_rgb_off", func.lineno, {
	    	"LED": (led-0)+1
	    }, {}, {
	        "inline": "true"
	    })];
	} else {
		return [block("actuator_rgb_color", func.lineno, {
	    	"LED": (led-0)+1,
	        "COLOR": r+","+g+","+b
	    }, {}, {
	        "inline": "true"
	    })];
	}
}

pbc.moduleFunctionD.get('motor_control')['motor1'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2 && args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    if (args.length == 1) {
		return [block("actuator_motor_off", func.lineno, {
	    	"NUMBER": 1
	    }, {}, {
	        "inline": "true"
	    })];
	} else {
		var direction = args[1].n.v;
	    var speed = py2block.convert(args[0]);
		return [block("actuator_motor_on", func.lineno, {
	    	"NUMBER": 1,
	        "DIRECTION": direction
	    }, {
	    	"SPEED": speed 
	    }, {
	        "inline": "true"
	    })];
	}
}

pbc.moduleFunctionD.get('motor_control')['motor2'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2 && args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    if (args.length == 1) {
		return [block("actuator_motor_off", func.lineno, {
	    	"NUMBER": 2
	    }, {}, {
	        "inline": "true"
	    })];
	} else {
		var direction = args[1].n.v;
	    var speed = py2block.convert(args[0]);
		return [block("actuator_motor_on", func.lineno, {
	    	"NUMBER": 2,
	        "DIRECTION": direction
	    }, {
	    	"SPEED": speed 
	    }, {
	        "inline": "true"
	    })];
	}
}

pbc.moduleFunctionD.get('motor_control')['motor3'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2 && args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    if (args.length == 1) {
		return [block("actuator_motor_off", func.lineno, {
	    	"NUMBER": 3
	    }, {}, {
	        "inline": "true"
	    })];
	} else {
		var direction = args[1].n.v;
	    var speed = py2block.convert(args[0]);
		return [block("actuator_motor_on", func.lineno, {
	    	"NUMBER": 3,
	        "DIRECTION": direction
	    }, {
	    	"SPEED": speed 
	    }, {
	        "inline": "true"
	    })];
	}
}
