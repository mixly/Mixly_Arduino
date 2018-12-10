'use strict';

pbc.assignD.get('Turtle')['check_assign'] = function (py2block, node, targets, value) {
    if(value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var moduleName = py2block.Name_str(value.func.value);
    var funcName = py2block.identifier(value.func.attr);
    if (value._astname === "Call" && moduleName === "turtle"
        && (funcName === "Turtle" || funcName === "Pen")&& value.args.length === 0)
        return true;
    return false;
}

pbc.assignD.get('Turtle')['create_block'] = function (py2block, node, targets, value) {
    var turtle = py2block.Name_str(node.targets[0]);
    return block('turtle_create', node.lineno, {
            'VAR': turtle
        }, {});
}

pbc.assignD.get('Pen')['create_block'] = function (py2block, node, targets, value) {
    var turtle = py2block.Name_str(node.targets[0]);
    return block('turtle_create', node.lineno, {
            'VAR': turtle
        }, {});
}


function turtleForwardBackward(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        var turtleblock = py2block.convert(func.value);
        var argblock = py2block.convert(args[0]);
        return [block('turtle_move', func.lineno, {
            'DIR': mode
        }, {
            'TUR': turtleblock,
            'VAR': argblock,
        }, {
            "inline": "true"
        })];
    }
    return converter;
}

pbc.objectFunctionD.get('forward')['Turtle'] = turtleForwardBackward('forward');
pbc.objectFunctionD.get('backward')['Turtle'] = turtleForwardBackward('backward');


function turtleLeftRight(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        var turtleblock = py2block.convert(func.value);
        var argblock = py2block.convert(args[0]);
        return [block('turtle_rotate', func.lineno, {
            'DIR': mode
        }, {
            'TUR': turtleblock,
            'VAR': argblock
        }, {
            "inline": "true"
        })];
    }
    return converter;
}

pbc.objectFunctionD.get('left')['Turtle'] = turtleLeftRight('left');
pbc.objectFunctionD.get('right')['Turtle'] = turtleLeftRight('right');


pbc.objectFunctionD.get('setheading')['Turtle'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block('turtle_setheading', func.lineno, {}, {
        'TUR': turtleblock,
        'data': argblock,
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('delay')['Turtle'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value.value);
    var argblock = py2block.convert(args[0]);
    return [block('turtle_screen_delay', func.lineno, {}, {
        'TUR': turtleblock,
        'data': argblock,
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('turtle')['done'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("turtle_done", func.lineno, {}, {}, {
            "inline": "true"
        })];
}

pbc.moduleFunctionD.get('turtle')['bgcolor'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    return [block("turtle_bgcolor", func.lineno, {"FIELDNAME":py2block.Str_value(args[0])}, {}, {
            "inline": "true"
        })];
}


pbc.objectFunctionD.get('goto')['Turtle'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var xblock = py2block.convert(args[0]);
    var yblock = py2block.convert(args[1]);
    return [block('turtle_goto', func.lineno, {}, {
        'TUR': turtleblock,
        'data': xblock,
        'val': yblock
    }, {
        "inline": "true"
    })];
}


function turtleClearResetHome(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        var turtleblock = py2block.convert(func.value);
        return [block('turtle_clear', func.lineno, {
            'DIR': mode
        }, {
            'TUR': turtleblock,
        }, {
            "inline": "true"
        })];
    }
    return converter;
}

//turtle.clear方法和list里的clear方法重复
pbc.objectFunctionD.get('clear')['Turtle'] = turtleClearResetHome('clear');
pbc.objectFunctionD.get('reset')['Turtle'] = turtleClearResetHome('reset');
pbc.objectFunctionD.get('home')['Turtle'] = turtleClearResetHome('home');


function turtlePenupPendown(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        var turtleblock = py2block.convert(func.value);
        return [block('turtle_penup', func.lineno, {
            'DIR': mode
        }, {
            'TUR': turtleblock,
        }, {
            "inline": "true"
        })];
    }
    return converter;
}

pbc.objectFunctionD.get('penup')['Turtle'] = turtlePenupPendown('penup');
pbc.objectFunctionD.get('pendown')['Turtle'] = turtlePenupPendown('pendown');


pbc.objectFunctionD.get('pensize')['Turtle'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var sizeblock = py2block.convert(args[0]);
    return [block('turtle_size', func.lineno, {}, {
        'TUR': turtleblock,
        'data': sizeblock,
    }, {
        "inline": "true"
    })];
}


pbc.objectFunctionD.get('speed')['Turtle'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var speedblock = py2block.convert(args[0]);
    return [block('turtle_speed', func.lineno, {}, {
        'TUR': turtleblock,
        'data': speedblock,
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('shape')['Turtle'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var shapeblock = py2block.Str_value(args[0]);
    return [block('turtle_shape', func.lineno, {
        
        'DIR': shapeblock
    }, {
        'TUR': turtleblock,

        
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('write')['Turtle'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1 && args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    if(args.length == 1){
        if (keywords.length == 0){
            var turtleblock = py2block.convert(func.value);
            var argblock = py2block.convert(args[0]);
            args[0].s.v='Arial'
            var fontnameblock = py2block.convert(args[0]);
            return [block('turtle_write', func.lineno, {}, {
                'TUR': turtleblock,
                'FONTNAME':fontnameblock,
                'VAR': argblock,
            }, {
                "inline": "true"
            })];
        }
        else if (keywords.length == 1){
            var tag = py2block.identifier(keywords[0].arg)            
            var turtleblock = py2block.convert(func.value);
            var argblock = py2block.convert(args[0]);
            if (tag=='align') {   
                var formatblock = py2block.Str_value(keywords[0].value);
                args[0].s.v='Arial'
                var fontnameblock = py2block.convert(args[0]);
                return [block('turtle_write_format', func.lineno, {
                    'ALIGN':formatblock
                }, {

                    'TUR': turtleblock,
                    'FONTNAME':fontnameblock,
                    'VAR': argblock
                }, {
                    "inline": "true"
                })];
            }
            if (tag=='font') {   
                var fontnameblock = py2block.convert(keywords[0].value.elts[0]);
                var fontnumblock = py2block.convert(keywords[0].value.elts[1]);
                var fonttypeblock = py2block.Str_value(keywords[0].value.elts[2]);
                if (keywords[0].value.elts.length == 4){
                    if((keywords[0].value.elts[2].s.v=='bold'&&keywords[0].value.elts[3].s.v=='italic')||
                        (keywords[0].value.elts[3].s.v=='bold'&&keywords[0].value.elts[2].s.v=='italic')){
                    keywords[0].value.elts[2].s.v = 'bold","italic'
                    var fonttypeblock = py2block.Str_value(keywords[0].value.elts[2]);
                    }
                }
                
                return [block('turtle_write_format', func.lineno, {
                    'FONTTYPE':fonttypeblock
                }, {
                    'TUR': turtleblock,
                    'VAR': argblock,
                    'FONTNAME':fontnameblock,
                    'FONTNUM':fontnumblock                    
                }, {
                    "inline": "true"
                })];
            }
        }
        else if (keywords.length == 2){
            var tag1 = py2block.identifier(keywords[0].arg) 
            var tag2 = py2block.identifier(keywords[1].arg)            
            var turtleblock = py2block.convert(func.value);
            var argblock = py2block.convert(args[0]);
            if (tag1=='align' && tag2=='font') {   
                var formatblock = py2block.Str_value(keywords[0].value);
                var fontnameblock = py2block.convert(keywords[1].value.elts[0]);
                var fontnumblock = py2block.convert(keywords[1].value.elts[1]);
                var fonttypeblock = py2block.Str_value(keywords[1].value.elts[2]);
                if (keywords[1].value.elts.length == 4){
                    if((keywords[1].value.elts[2].s.v=='bold'&&keywords[1].value.elts[3].s.v=='italic')||
                        (keywords[1].value.elts[3].s.v=='bold'&&keywords[1].value.elts[2].s.v=='italic')){
                    keywords[1].value.elts[2].s.v = 'bold","italic'
                    var fonttypeblock = py2block.Str_value(keywords[1].value.elts[2]);
                    }
                }                
            }
            if (tag2=='align' && tag1=='font') {
                var formatblock = py2block.Str_value(keywords[1].value);   
                var fontnameblock = py2block.convert(keywords[0].value.elts[0]);
                var fontnumblock = py2block.convert(keywords[0].value.elts[1]);
                var fonttypeblock = py2block.Str_value(keywords[0].value.elts[2]);
                if (keywords[0].value.elts.length == 4){
                    if((keywords[0].value.elts[2].s.v=='bold'&&keywords[0].value.elts[3].s.v=='italic')||
                        (keywords[0].value.elts[3].s.v=='bold'&&keywords[0].value.elts[2].s.v=='italic')){
                    keywords[0].value.elts[2].s.v = 'bold","italic'
                    var fonttypeblock = py2block.Str_value(keywords[0].value.elts[2]);
                    }
                }
                }
                return [block('turtle_write_format', func.lineno, {
                    'FONTTYPE':fonttypeblock,
                    'ALIGN':formatblock
                }, {
                    'TUR': turtleblock,
                    'VAR': argblock,
                    'FONTNAME':fontnameblock,
                    'FONTNUM':fontnumblock                    
                }, {
                    "inline": "true"
                })];
            
        }
    }
    if(args.length == 2){
        var moveblock = py2block.Name_str(args[1]);
        if (keywords.length == 0){
            var turtleblock = py2block.convert(func.value);
            var argblock = py2block.convert(args[0]);
            args[0].s.v='Arial'
            var fontnameblock = py2block.convert(args[0]);
            return [block('turtle_write_format', func.lineno, {
                'MOVE':moveblock
            }, {
                'TUR': turtleblock,
                'FONTNAME':fontnameblock,
                'VAR': argblock,
            }, {
                "inline": "true"
            })];
        }
        else if (keywords.length == 1){
            var tag = py2block.identifier(keywords[0].arg)            
            var turtleblock = py2block.convert(func.value);
            var argblock = py2block.convert(args[0]);
            if (tag=='align') {   
                var formatblock = py2block.Str_value(keywords[0].value);
                args[0].s.v='Arial'
                var fontnameblock = py2block.convert(args[0]);
                return [block('turtle_write_format', func.lineno, {
                    'ALIGN':formatblock,
                    'MOVE':moveblock
                }, {

                    'TUR': turtleblock,
                    'FONTNAME':fontnameblock,
                    'VAR': argblock
                }, {
                    "inline": "true"
                })];
            }
            if (tag=='font') {   
                var fontnameblock = py2block.convert(keywords[0].value.elts[0]);
                var fontnumblock = py2block.convert(keywords[0].value.elts[1]);
                var fonttypeblock = py2block.Str_value(keywords[0].value.elts[2]);
                if (keywords[0].value.elts.length == 4){
                    if((keywords[0].value.elts[2].s.v=='bold'&&keywords[0].value.elts[3].s.v=='italic')||
                        (keywords[0].value.elts[3].s.v=='bold'&&keywords[0].value.elts[2].s.v=='italic')){
                    keywords[0].value.elts[2].s.v = 'bold","italic'
                    var fonttypeblock = py2block.Str_value(keywords[0].value.elts[2]);
                    }
                }
                return [block('turtle_write_format', func.lineno, {
                    'FONTTYPE':fonttypeblock,
                    'MOVE':moveblock
                }, {
                    'TUR': turtleblock,
                    'VAR': argblock,
                    'FONTNAME':fontnameblock,
                    'FONTNUM':fontnumblock                    
                }, {
                    "inline": "true"
                })];
            }
        }
        else if (keywords.length == 2){
            var tag1 = py2block.identifier(keywords[0].arg) 
            var tag2 = py2block.identifier(keywords[1].arg)            
            var turtleblock = py2block.convert(func.value);
            var argblock = py2block.convert(args[0]);
            if (tag1=='align' && tag2=='font') {   
                var formatblock = py2block.Str_value(keywords[0].value);
                var fontnameblock = py2block.convert(keywords[1].value.elts[0]);
                var fontnumblock = py2block.convert(keywords[1].value.elts[1]);
                var fonttypeblock = py2block.Str_value(keywords[1].value.elts[2]); 
                if (keywords[1].value.elts.length == 4){
                    if((keywords[1].value.elts[2].s.v=='bold'&&keywords[1].value.elts[3].s.v=='italic')||
                        (keywords[1].value.elts[3].s.v=='bold'&&keywords[1].value.elts[2].s.v=='italic')){
                    keywords[1].value.elts[2].s.v = 'bold","italic'
                    var fonttypeblock = py2block.Str_value(keywords[1].value.elts[2]);
                    }
                }               
            }
            if (tag2=='align' && tag1=='font') {
                var formatblock = py2block.Str_value(keywords[1].value);   
                var fontnameblock = py2block.convert(keywords[0].value.elts[0]);
                var fontnumblock = py2block.convert(keywords[0].value.elts[1]);
                var fonttypeblock = py2block.Str_value(keywords[0].value.elts[2]);
                if (keywords[0].value.elts.length == 4){
                    if((keywords[0].value.elts[2].s.v=='bold'&&keywords[0].value.elts[3].s.v=='italic')||
                        (keywords[0].value.elts[3].s.v=='bold'&&keywords[0].value.elts[2].s.v=='italic')){
                    keywords[0].value.elts[2].s.v = 'bold","italic'
                    var fonttypeblock = py2block.Str_value(keywords[0].value.elts[2]);
                    }
                }
            }
                return [block('turtle_write_format', func.lineno, {
                    'FONTTYPE':fonttypeblock,
                    'ALIGN':formatblock,
                    'MOVE':moveblock
                }, {
                    'TUR': turtleblock,
                    'VAR': argblock,
                    'FONTNAME':fontnameblock,
                    'FONTNUM':fontnumblock                    
                }, {
                    "inline": "true"
                })];
            
        }
    }
}


function turtleCircleDot(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 2) {
            throw new Error("Incorrect number of arguments");
        }
        var turtleblock = py2block.convert(func.value);
        var varblock = py2block.convert(args[0]);
        var datablock = py2block.convert(args[1]);

        return [block('turtle_circle', func.lineno, {
            'DIR': mode
        }, {
            'TUR': turtleblock,
            'VAR': varblock,
            'data': datablock
        }, {
            "inline": "true"
        })];
    }
    return converter;
}

pbc.objectFunctionD.get('circle')['Turtle'] = turtleCircleDot('circle');
pbc.objectFunctionD.get('dot')['Turtle'] = turtleCircleDot('dot');


pbc.objectFunctionD.get('clone')['Turtle'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    return block('turtle_clone', func.lineno, {}, {
        'TUR': turtleblock
    }, {
        "inline": "true"
    });
}

function turtlePosShape(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        var turtleblock = py2block.convert(func.value);
        return block('turtle_pos_shape', func.lineno, {
            'DIR': mode
        }, {
            'TUR': turtleblock
        }, {
            "inline": "true"
        });
        }
    return converter;
}
pbc.objectFunctionD.get('pos')['Turtle'] = turtlePosShape('pos');
pbc.objectFunctionD.get('shape')['Turtle'] =  turtlePosShape('shape');


function turtleHideShow(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        var turtleblock = py2block.convert(func.value);
        return [block('turtle_visible', func.lineno, {
            'DIR': mode
        }, {
            'TUR': turtleblock
        }, {
            "inline": "true"
        })];
    }
    return converter;
}

pbc.objectFunctionD.get('hideturtle')['Turtle'] = turtleHideShow('hideturtle');
pbc.objectFunctionD.get('showturtle')['Turtle'] =  turtleHideShow('showturtle');


pbc.objectFunctionD.get('pencolor')['Turtle'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);

//    if (args[0]._astname == "Str" && py2block.Str_value(args[0]).startsWith("#")) {
        return [block('turtle_pencolor', func.lineno, {
            "FIELDNAME":py2block.Str_value(args[0])
        }, {
            'TUR': turtleblock
        }, {
            "inline": "true"
        })];
/*    } else {
        return [block("turtle_pencolor_hex", func.lineno, {}, {
            'TUR': turtleblock,
            'VAR': argblock
        }, {
            "inline": "true"
        })];
    }*/
}


pbc.objectFunctionD.get('fillcolor')['Turtle'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
//    if (args[0]._astname == "Str" && py2block.Str_value(args[0]).startsWith("#")) {
        return [block('turtle_fillcolor', func.lineno, {
            "FIELDNAME":py2block.Str_value(args[0])
        }, {
            'TUR': turtleblock
        }, {
            "inline": "true"
        })];
/*    } else {
        return [block("turtle_fillcolor_hex", func.lineno, {}, {
            'TUR': turtleblock,
            'VAR': argblock
        }, {
            "inline": "true"
        })];
    }*/


}


function turtleBeginEndFill(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        var turtleblock = py2block.convert(func.value);
        return [block("turtle_fill", func.lineno, {
            'DIR': mode
        }, {
            'TUR': turtleblock,
        }, {
            "inline": "true"
        })];
    }
    return converter;
}

pbc.objectFunctionD.get('begin_fill')['Turtle'] = turtleBeginEndFill('begin');
pbc.objectFunctionD.get('end_fill')['Turtle'] = turtleBeginEndFill('end');

