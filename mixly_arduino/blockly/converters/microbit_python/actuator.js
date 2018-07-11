'use strict';

var pbc = Py2blockConfig.prototype;

for (var i = 0; i < profile.default.pwm.length; i++) {
    pbc.moduleAttrD.get('pin')[profile.default.pwm[i][1]] = function (node, module, attr) {
        return block("pins_pwm", node.lineno, {
            "PIN": "pin" + attr
        });
    }
}


pbc.moduleFunctionD.get('music')['play'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length === 0) {
        throw new Error("Incorrect number of arguments");
    }
    else if (args.length==1&&keywords.length==3){//music.DADADADUM, pin=pin0, wait=True, loop=False
        var musicblock=null;
        var pinblock=null;
        var waitblock=null;
        var loopblock=null;

        musicblock=py2block.identifier(args[0].attr);
        for (var i = 0; i < keywords.length; i++) {
            var param = keywords[i];
            var key = py2block.identifier(param.arg);
            if (key === "pin") {
                pbc.pinType = "pins_pwm";
                pinblock = py2block.convert(param.value);
                pbc.pinType = null;
            } else if (key === "wait") {
                waitblock= py2block.identifier(param.value.id);
            }
            else if (key === "loop"){
                loopblock=  py2block.identifier(param.value.id);
            }

        }
        if(musicblock!=null&&pinblock!=null&&waitblock!=null&&loopblock!=null){
            return [block("microbit_music_play_built_in", func.lineno,
                {'melody':musicblock,'wait':waitblock,'loop':loopblock},
                {'PIN':pinblock,

                }, {
                    "inline": "true"
                })];
        }
    }
}


pbc.moduleFunctionD.get('music')['stop'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_pwm";
    var pinblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
     pbc.pinType = null;
    return block("microbit_music_stop", func.lineno, {
    }, {
        'PIN':argblock
    }, {
        "inline": "true"
    });
}
pbc.moduleFunctionD.get('music')['reset'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("microbit_music_reset", func.lineno, {
    }, {
    }, {
        "inline": "true"
    });
}
pbc.moduleFunctionD.get('music')['set_tempo'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0 || keywords.length !== 2) { //(baudrate=1000000, bits=8, mode=0, mosi=15, miso= 14, sclk=13)
        throw new Error("Incorrect number of arguments");
    }
    var bpmblock = null;
    var ticksblock = null;
    for (var i = 0; i < keywords.length; i++) {
        var param = keywords[i];
        var key = py2block.identifier(param.arg);
        if (key === 'bpm') {
            bpmblock = py2block.convert(param.value);
        } else if (key ==='ticks') {
            ticksblock = py2block.convert(param.value);
        } 
    }
    if (bpmblock != null && ticksblock != null) {
        return [block("tone_set_tempo", func.lineno, {
        }, {
            'BPM':bpmblock,
            'TICKS': ticksblock,
        }, {
            "inline": "true"
        })];
    }
}
pbc.moduleFunctionD.get('music')['get_tempo'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("microbit_music_get_tempo", func.lineno, {
    }, {
    }, {
        "inline": "true"
    });
}
pbc.moduleFunctionD.get('music')['translate'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    return block("speech_translate", func.lineno, {
    }, {
        'VAR':argblock
    }, {
        "inline": "true"
    });
}
pbc.moduleFunctionD.get('speech')['say'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1 || keywords.length !== 4) { //(baudrate=1000000, bits=8, mode=0, mosi=15, miso= 14, sclk=13)
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    var pitchblock = null;
    var speedblock = null;
    var mouthblock = null;
    var throatblock = null;
    for (var i = 0; i < keywords.length; i++) {
        var param = keywords[i];
        var key = py2block.identifier(param.arg);
        if (key === 'pitch') {
            pitchblock = py2block.convert(param.value);
        } else if (key === 'speed') {
            speedblock = py2block.convert(param.value);
        } else if (key === 'mouth') {
            mouthblock = py2block.convert(param.value);
        } else if (key === 'throat') {
            throatblock = py2block.convert(param.value);
        } 
    }
    if (argblock != null && pitchblock != null && speedblock != null && mouthblock != null && throatblock != null ) {
        return [block("speech_say", func.lineno, {
            "MODE":"say"
        }, 
        {
            'VAR': argblock,
            'pitch': pitchblock,
            'speed': speedblock,
            'mouth': mouthblock,
            'throat':throatblock
        }, {
            "inline": "true"
        })];
    }
}
pbc.moduleFunctionD.get('speech')['sing'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1 || keywords.length !== 4) { //(baudrate=1000000, bits=8, mode=0, mosi=15, miso= 14, sclk=13)
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    var pitchblock = null;
    var speedblock = null;
    var mouthblock = null;
    var throatblock = null;
    for (var i = 0; i < keywords.length; i++) {
        var param = keywords[i];
        var key = py2block.identifier(param.arg);
        if (key === 'pitch') {
            pitchblock = py2block.convert(param.value);
        } else if (key === 'speed') {
            speedblock = py2block.convert(param.value);
        } else if (key === 'mouth') {
            mouthblock = py2block.convert(param.value);
        } else if (key === 'throat') {
            throatblock = py2block.convert(param.value);
        } 
    }
    if (argblock != null && pitchblock != null && speedblock != null && mouthblock != null && throatblock != null ) {
        return [block("speech_say", func.lineno, {
            "MODE":"sing"
        }, 
        {
            'VAR': argblock,
            'pitch': pitchblock,
            'speed': speedblock,
            'mouth': mouthblock,
            'throat':throatblock
        }, {
            "inline": "true"
        })];
    }
}
pbc.moduleFunctionD.get('speech')['pronounce'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1 || keywords.length !== 4) { //(baudrate=1000000, bits=8, mode=0, mosi=15, miso= 14, sclk=13)
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    var pitchblock = null;
    var speedblock = null;
    var mouthblock = null;
    var throatblock = null;
    for (var i = 0; i < keywords.length; i++) {
        var param = keywords[i];
        var key = py2block.identifier(param.arg);
        if (key === 'pitch') {
            pitchblock = py2block.convert(param.value);
        } else if (key === 'speed') {
            speedblock = py2block.convert(param.value);
        } else if (key === 'mouth') {
            mouthblock = py2block.convert(param.value);
        } else if (key === 'throat') {
            throatblock = py2block.convert(param.value);
        } 
    }
    if (argblock != null && pitchblock != null && speedblock != null && mouthblock != null && throatblock != null ) {
        return [block("speech_say", func.lineno, {
            "MODE":"pronounce"
        }, 
        {
            'VAR': argblock,
            'pitch': pitchblock,
            'speed': speedblock,
            'mouth': mouthblock,
            'throat':throatblock
        }, {
            "inline": "true"
        })];
    }
}



