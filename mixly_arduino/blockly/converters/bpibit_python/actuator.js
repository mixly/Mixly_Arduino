'use strict';

pbc.globalFunctionD['mixly_servo_write_angle'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 2) {
        throw new Error("Incorrect number of arguments");
    }
    pbc.pinType = "pins_pwm";
    var pinblock = py2block.convert(args[0]);
    pbc.pinType = null;
    var angblock = py2block.convert(args[1]);
    if (pinblock != null && angblock != null) {
        return [block("servo_move", func.lineno, {},
            {
                "PIN": pinblock,
                "DEGREE": angblock,
            }, {
                "inline": "true"
            })];
    }
}


pbc.moduleFunctionD.get('music')['pitch'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length === 1 && keywords.length === 1) {
        var roundAstName = args[0]._astname;
        pbc.pinType = "pins_pwm";
        var pinblock = py2block.convert(keywords[0].value);
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
        return [block("microbit_music_pitch", func.lineno, {}, {
            'pitch': pitchblock,
            'PIN': pinblock,
        }, {
            "inline": "true"
        })];
    } else if (args.length === 3 && keywords.length === 1 && keywords[0].value._astname == "Name") {
        pbc.pinType = "pins_pwm";
        var pinblock = py2block.convert(args[2]);
        pbc.pinType = null;
        var roundAstName = args[0]._astname;
        var durationAstName = args[1]._astname;
        var param = keywords[0];
        var wait = py2block.Name_str(param.value);
        var pitchblock = null;
        var durationblock = null;
        pbc.pinType = "pins_tone_notes";
        if (roundAstName === "Call"
            && args[0].func._astname == "Name" && py2block.Name_str(args[0].func) === "round") {
            pitchblock = py2block.convert(args[0].args[0])
        } else {
            pitchblock = py2block.convert(args[0]);
        }
        pbc.pinType = null;
        if (durationAstName === "Call"
            && args[1].func._astname == "Name" && py2block.Name_str(args[1].func) === "round") {
            durationblock = py2block.convert(args[1].args[0]);
        } else {
            durationblock = py2block.convert(args[1]);
        }
        return [block("microbit_music_pitch_delay", func.lineno, {
            'wait': wait
        }, {
            'pitch': pitchblock,
            'duration': durationblock,
            'PIN': pinblock,
        }, {
            "inline": "true"
        })];
    } else {
        throw new Error("Incorrect number of arguments");
    }
}


pbc.moduleFunctionD.get('music')['play'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length == 1 && keywords.length == 3) {//music.DADADADUM, pin=pin0, wait=True, loop=False
        var musicblock = null;
        var pinblock = null;
        var waitblock = null;
        var loopblock = null;
        for (var i = 0; i < keywords.length; i++) {
            var param = keywords[i];
            var key = py2block.identifier(param.arg);
            if (key === "pin") {
                pbc.pinType = "pins_pwm";
                pinblock = py2block.convert(param.value);
                pbc.pinType = null;
            } else if (key === "wait" && param.value._astname == "Name") {
                waitblock = py2block.Name_str(param.value);
            } else if (key === "loop" && param.value._astname == "Name") {
                loopblock = py2block.Name_str(param.value);
            }
        }
        if (args[0]._astname == "Attribute"
            && args[0].value._astname == "Name" && py2block.Name_str(args[0].value) == "music") {
            musicblock = py2block.identifier(args[0].attr);
            if (musicblock != null && pinblock != null && waitblock != null && loopblock != null) {
                return [block("microbit_music_play_built_in", func.lineno, {
                        'melody': musicblock,
                        'wait': waitblock,
                        'loop': loopblock
                    }, {
                        'PIN': pinblock,
                    }, {
                        "inline": "true"
                    })];
            }
        } else {
            if (pinblock != null && waitblock != null && loopblock != null) {
                return [block("microbit_music_play_list_of_notes", func.lineno, {
                    'wait': waitblock,
                    'loop': loopblock
                }, {
                    'PIN': pinblock,
                    'notes': py2block.convert(args[0]),
                }, {
                    "inline": "true"
                })];
            }
        }
    }else if(args.length == 1 && keywords.length == 1){
        if (args[0]._astname == "Attribute"
            && args[0].value._astname == "Name" && py2block.Name_str(args[0].value) == "music"
            && py2block.identifier(keywords[0].arg) == "pin") {
            musicblock = py2block.identifier(args[0].attr);
            var param = keywords[0];
            var key = py2block.identifier(param.arg);
            pbc.pinType = "pins_pwm";
            pinblock = py2block.convert(param.value);
            pbc.pinType = null;
            return [block("microbit_music_play_built_in_easy", func.lineno, {
                'melody': musicblock,
            }, {
                'PIN': pinblock,
            }, {
                "inline": "true"
            })];
        }
    }
    throw new Error("Incorrect number of arguments");
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


pbc.moduleFunctionD.get('music')['reset'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("microbit_music_reset", func.lineno, {}, {}, {
        "inline": "true"
    })];
}


pbc.moduleFunctionD.get('music')['get_tempo'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("microbit_music_get_tempo", func.lineno, {}, {}, {
        "inline": "true"
    });
}


pbc.moduleFunctionD.get('music')['set_tempo'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0 || keywords.length !== 2) { //music.set_tempo(ticks=4, bpm=120)
        throw new Error("Incorrect number of arguments");
    }
    var bpmblock = null;
    var ticksblock = null;
    for (var i = 0; i < keywords.length; i++) {
        var param = keywords[i];
        var key = py2block.identifier(param.arg);
        if (key === 'bpm') {
            bpmblock = py2block.convert(param.value);
        } else if (key === 'ticks') {
            ticksblock = py2block.convert(param.value);
        }
    }
    if (bpmblock != null && ticksblock != null) {
        return [block("tone_set_tempo", func.lineno, {}, {
            'BPM': bpmblock,
            'TICKS': ticksblock,
        }, {
            "inline": "true"
        })];
    }
}


pbc.moduleFunctionD.get('speech')['translate'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    return block("speech_translate", func.lineno, {}, {
        'VAR': argblock
    }, {
        "inline": "False"
    });
}


function speechSayOrSingOrPronounce(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length === 1 && keywords.length === 4) {//('Mixly 0.997 is great!', pitch=64, speed=72, mouth=128, throat=128)
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
            if (argblock != null && pitchblock != null && speedblock != null && mouthblock != null && throatblock != null) {
                return [block("speech_say", func.lineno, {
                        "MODE": mode
                    }, {
                        'VAR': argblock,
                        'pitch': pitchblock,
                        'speed': speedblock,
                        'mouth': mouthblock,
                        'throat': throatblock
                    }, {
                        "inline": "true"
                    })];
            }
        }else if(args.length === 1 && keywords.length === 0){
            return [block("speech_" + mode + "_easy", func.lineno, {}, {
                        'VAR': py2block.convert(args[0]),
                    }, {
                        "inline": "true"
                    })];

        }
        throw new Error("Incorrect number of arguments");
    }
    return converter;
}

pbc.moduleFunctionD.get('speech')['say'] = speechSayOrSingOrPronounce('say');
pbc.moduleFunctionD.get('speech')['sing'] = speechSayOrSingOrPronounce('sing');
pbc.moduleFunctionD.get('speech')['pronounce'] = speechSayOrSingOrPronounce('pronounce');
