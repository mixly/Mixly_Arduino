'use strict';

var turtleClass = 'turtle.Turtle';
var screenClass = 'turtle.getscreen';
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

pbc.assignD.get('getscreen')['check_assign'] = function (py2block, node, targets, value) {
    if(value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var moduleName = py2block.Name_str(value.func.value);
    var funcName = py2block.identifier(value.func.attr);
    if (value._astname === "Call" 
        && funcName === "getscreen" && value.args.length === 0)
        return true;
    return false;
}

pbc.assignD.get('getscreen')['create_block'] = function (py2block, node, targets, value) {
    var turtle = py2block.Name_str(node.targets[0]);
    var moduleName = py2block.convert(value.func.value);
    return block('turtle_getscreen', node.lineno, {
            'VAR': turtle
        }, {
            'TUR':moduleName
        });
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

pbc.objectFunctionD.get('fd')[turtleClass] = turtleForwardBackward('forward');
pbc.objectFunctionD.get('bk')[turtleClass] = turtleForwardBackward('backward');
pbc.objectFunctionD.get('forward')[turtleClass] = turtleForwardBackward('forward');
pbc.objectFunctionD.get('backward')[turtleClass] = turtleForwardBackward('backward');


function turtleSetxy(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        var turtleblock = py2block.convert(func.value);
        var argblock = py2block.convert(args[0]);
        return [block('turtle_setxy', func.lineno, {
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

pbc.objectFunctionD.get('setx')[turtleClass] = turtleSetxy('x');
pbc.objectFunctionD.get('sety')[turtleClass] = turtleSetxy('y');


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

pbc.objectFunctionD.get('left')[turtleClass] = turtleLeftRight('left');
pbc.objectFunctionD.get('right')[turtleClass] = turtleLeftRight('right');
pbc.objectFunctionD.get('lt')[turtleClass] = turtleLeftRight('left');
pbc.objectFunctionD.get('rt')[turtleClass] = turtleLeftRight('right');



pbc.objectFunctionD.get('setheading')[turtleClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
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

pbc.objectFunctionD.get('delay')[turtleClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
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

pbc.objectFunctionD.get('postscript')[screenClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    
    var turtleblock = py2block.convert(func.value.func.value);
    var argblock = py2block.convert(keywords[0].value);
    return [block('turtle_screen_savefig', func.lineno, {}, {
        'TUR': turtleblock,
        'FILE': argblock,
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

pbc.moduleFunctionD.get('turtle')['mainloop'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("turtle_done", func.lineno, {}, {}, {
            "inline": "true"
        })];
}

pbc.moduleFunctionD.get('turtle')['exitonclick'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("turtle_exitonclick", func.lineno, {}, {}, {
            "inline": "true"
        })];
}

pbc.moduleFunctionD.get('turtle')['bgcolor'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    if (args[0]._astname != "Str")  {
        return [block("turtle_bgcolor_hex", func.lineno, {}, {
            'VAR': argblock
        }, {
            "inline": "true"
        })];
    }
    else{
    
    return [block("turtle_bgcolor", func.lineno, {"FIELDNAME":py2block.Str_value(args[0])}, {}, {
            "inline": "true"
        })];
    }
}


pbc.objectFunctionD.get('goto')[turtleClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
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
pbc.objectFunctionD.get('clear')[turtleClass] = turtleClearResetHome('clear');
pbc.objectFunctionD.get('reset')[turtleClass] = turtleClearResetHome('reset');
pbc.objectFunctionD.get('home')[turtleClass] = turtleClearResetHome('home');


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

pbc.objectFunctionD.get('penup')[turtleClass] = turtlePenupPendown('penup');
pbc.objectFunctionD.get('pendown')[turtleClass] = turtlePenupPendown('pendown');


pbc.objectFunctionD.get('pensize')[turtleClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
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


pbc.objectFunctionD.get('speed')[turtleClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1&& args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    if (args.length == 1){
    var turtleblock = py2block.convert(func.value);
    var speedblock = py2block.convert(args[0]);
    return [block('turtle_speed', func.lineno, {}, {
        'TUR': turtleblock,
        'data': speedblock,
    }, {
        "inline": "true"
    })];}
     if(args.length == 0){
    var turtleblock = py2block.convert(func.value);
    return block('turtle_pos_shape', func.lineno, {
       'DIR': 'speed'
    }, {
        'TUR': turtleblock
    }, {
        "inline": "true"
    });}
}

pbc.objectFunctionD.get('shape')[turtleClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1 && args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    if (args.length == 1){
    var turtleblock = py2block.convert(func.value);
    var shapeblock = py2block.Str_value(args[0]);
    return [block('turtle_shape', func.lineno, {
        
        'DIR': shapeblock
    }, {
        'TUR': turtleblock,

        
    }, {
        "inline": "true"
    })];}
    if(args.length == 0){
    var turtleblock = py2block.convert(func.value);
    return block('turtle_pos_shape', func.lineno, {
       'DIR': 'shape'
    }, {
        'TUR': turtleblock
    }, {
        "inline": "true"
    });}
}

pbc.objectFunctionD.get('shapesize')[turtleClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 3 && args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    if (args.length == 3){
    var turtleblock = py2block.convert(func.value);
    var widblock = py2block.convert(args[0]);
    var lenblock = py2block.convert(args[1]);
    var outlineblock = py2block.convert(args[2]);
    return [block('turtle_shapesize', func.lineno, {}, {
        'TUR': turtleblock,        
        'WID': widblock,
        'LEN': lenblock,
        'OUTLINE': outlineblock,

        
    }, {
        "inline": "true"
    })];}
    if(args.length == 0){
    var turtleblock = py2block.convert(func.value);
    return block('turtle_pos_shape', func.lineno, {
       'DIR': 'shapesize'
    }, {
        'TUR': turtleblock
    }, {
        "inline": "true"
    });}
}


pbc.objectFunctionD.get('width')[turtleClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1 && args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    if (args.length == 1){
    var turtleblock = py2block.convert(func.value);
    var widthblock = py2block.convert(args[0]);
    return [block('turtle_size', func.lineno, {}, {
        'TUR': turtleblock,
        'data': widthblock
        
    }, {
        "inline": "true"
    })];}
    if(args.length == 0){
    var turtleblock = py2block.convert(func.value);
    return block('turtle_pos_shape', func.lineno, {
       'DIR': 'width'
    }, {
        'TUR': turtleblock
    }, {
        "inline": "true"
    });}
}

pbc.moduleFunctionD.get('turtle')['textinput'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock1 = py2block.convert(args[0]);
    var argblock2 = py2block.convert(args[1]);
    return block('turtle_textinput', func.lineno, {}, {
        'TITLE':argblock1,
        'PROMPT':argblock2
    }, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('turtle')['numinput'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length <2 || args.length + keywords.length >5 || keywords.length>2) {
        throw new Error("Incorrect number of arguments");
    }
    if(args.length==5){
    var argblock1 = py2block.convert(args[0]);
    var argblock2 = py2block.convert(args[1]);
    var argblock3 = py2block.convert(args[2]);
    var argblock4 = py2block.convert(args[3]);
    var argblock5 = py2block.convert(args[4]);
    return block('turtle_numinput', func.lineno, {}, {
                'TITLE':argblock1,
                'PROMPT':argblock2,
                'DEFAULT':argblock3,        
                'MAX':argblock5,
                'MIN':argblock4
        }, {
            "inline": "true"
        });

    }
    if(args.length==4){
    var argblock1 = py2block.convert(args[0]);
    var argblock2 = py2block.convert(args[1]);
    var argblock3 = py2block.convert(args[2]);
    var argblock4 = py2block.convert(args[3]);
    if(keywords.length==1){
        if(py2block.identifier(keywords[0].arg) === "maxval"){
            var maxblock=py2block.convert(keywords[0].value)
            return block('turtle_numinput', func.lineno, {}, {
                'TITLE':argblock1,
                'PROMPT':argblock2,
                'DEFAULT':argblock3,        
                'MAX':maxblock,
                'MIN':argblock4
        }, {
            "inline": "true"
        });  
        }
        if(py2block.identifier(keywords[0].arg) === "minval"){
            var minblock=py2block.convert(keywords[0].value)
            return block('turtle_numinput', func.lineno, {}, {
                'TITLE':argblock1,
                'PROMPT':argblock2,
                'DEFAULT':argblock3,        
                'MIN':minblock,
                'MAX':argblock4
        }, {
            "inline": "true"
        });

        }    
        } 
        if(keywords.length==0){
            return block('turtle_numinput', func.lineno, {}, {
                'TITLE':argblock1,
                'PROMPT':argblock2,
                'DEFAULT':argblock3,        
                'MIN':argblock4,
                
        }, {
            "inline": "true"
        });  
        }    
        }
    if(args.length==3){
    var argblock1 = py2block.convert(args[0]);
    var argblock2 = py2block.convert(args[1]);
    var argblock3 = py2block.convert(args[2]);
    if(keywords.length==1){
        if(py2block.identifier(keywords[0].arg) === "maxval"){
            var maxblock=py2block.convert(keywords[0].value)
            return block('turtle_numinput', func.lineno, {}, {
                'TITLE':argblock1,
                'PROMPT':argblock2,
                'DEFAULT':argblock3,        
                'MAX':maxblock
        }, {
            "inline": "true"
        });  
        }
        if(py2block.identifier(keywords[0].arg) === "minval"){
            var minblock=py2block.convert(keywords[0].value)
            return block('turtle_numinput', func.lineno, {}, {
                'TITLE':argblock1,
                'PROMPT':argblock2,
                'DEFAULT':argblock3,        
                'MIN':minblock
        }, {
            "inline": "true"
        });

        }    
    }
    if(keywords.length==2){
        if(py2block.identifier(keywords[0].arg) === "maxval"){var maxblock=py2block.convert(keywords[0].value)}
            else if(py2block.identifier(keywords[1].arg) === "maxval"){var maxblock=py2block.convert(keywords[1].value)}
        if(py2block.identifier(keywords[0].arg) === "minval"){var minblock=py2block.convert(keywords[0].value)}    
            else if(py2block.identifier(keywords[1].arg) === "minval"){var minblock=py2block.convert(keywords[1].value)}
    
    return block('turtle_numinput', func.lineno, {}, {
        'TITLE':argblock1,
        'PROMPT':argblock2,
        'DEFAULT':argblock3,
        'MIN':minblock,
        'MAX':maxblock
    }, {
        "inline": "true"
    });}
    }
    if(args.length==2){
    var argblock1 = py2block.convert(args[0]);
    var argblock2 = py2block.convert(args[1]);
    
    if(keywords.length==1){
        if(py2block.identifier(keywords[0].arg) === "maxval"){
            var maxblock=py2block.convert(keywords[0].value)
            return block('turtle_numinput', func.lineno, {}, {
                'TITLE':argblock1,
                'PROMPT':argblock2,                      
                'MAX':maxblock
        }, {
            "inline": "true"
        });  
        }
        if(py2block.identifier(keywords[0].arg) === "minval"){
            var minblock=py2block.convert(keywords[0].value)
            return block('turtle_numinput', func.lineno, {}, {
                'TITLE':argblock1,
                'PROMPT':argblock2,                       
                'MIN':minblock
        }, {
            "inline": "true"
        });

        }    
    }
    if(keywords.length==2){
        if(py2block.identifier(keywords[0].arg) === "maxval"){var maxblock=py2block.convert(keywords[0].value)}
            else if(py2block.identifier(keywords[1].arg) === "maxval"){var maxblock=py2block.convert(keywords[1].value)}
        if(py2block.identifier(keywords[0].arg) === "minval"){var minblock=py2block.convert(keywords[0].value)}    
            else if(py2block.identifier(keywords[1].arg) === "minval"){var minblock=py2block.convert(keywords[1].value)}
    
    return block('turtle_numinput', func.lineno, {}, {
        'TITLE':argblock1,
        'PROMPT':argblock2,        
        'MIN':minblock,
        'MAX':maxblock
    }, {
        "inline": "true"
    });}
    }
}

pbc.objectFunctionD.get('write')[turtleClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    var args0 = {
            _astname: "Str",
            s: {
                'v': 'Arial'
            }

        };
    var args1 = {
            _astname: "Num",
            n: {
                'v': 8
            }

        };    
        
    if (args.length !== 1 && args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    if(args.length == 1){
        if (keywords.length == 0){
            var turtleblock = py2block.convert(func.value);
            var argblock = py2block.convert(args[0]);
          
            return [block('turtle_write', func.lineno, {}, {
                'TUR': turtleblock,
               
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
                var fontnumblock = py2block.convert(args1);
                var fontnameblock = py2block.convert(args0);
                return [block('turtle_write_format', func.lineno, {
                    'ALIGN':formatblock
                }, {

                    'TUR': turtleblock,
                    'FONTNAME':fontnameblock,
                    'FONTNUM':fontnumblock,
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
            var fontnameblock = py2block.convert(args0);
            var fontnumblock = py2block.convert(args1);
            return [block('turtle_write_format', func.lineno, {
                'MOVE':moveblock
            }, {
                'TUR': turtleblock,
                'FONTNAME':fontnameblock,
                'FONTNUM':fontnumblock,
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
                var fontnameblock = py2block.convert(args0);
                var fontnumblock = py2block.convert(args1);
                return [block('turtle_write_format', func.lineno, {
                    'ALIGN':formatblock,
                    'MOVE':moveblock
                }, {

                    'TUR': turtleblock,
                    'FONTNAME':fontnameblock,
                    'FONTNUM':fontnumblock,
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

pbc.objectFunctionD.get('circle')['Turtle'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2 && args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        if(args.length == 2){
        var turtleblock = py2block.convert(func.value);
        var varblock = py2block.convert(args[0]);
        var datablock = py2block.convert(args[1]);

        return [block('turtle_circle_advanced', func.lineno, {}, {
            'TUR': turtleblock,
            'VAR': varblock,
            'data': datablock
        }, {
            "inline": "true"
        })];
        }
        if(args.length == 1){
        var turtleblock = py2block.convert(func.value);
        var varblock = py2block.convert(args[0]);
        

        return [block('turtle_circle', func.lineno, {
            'DIR': 'circle'
        }, {
            'TUR': turtleblock,
            'VAR': varblock
        }, {
            "inline": "true"
        })];
        }
    }


pbc.objectFunctionD.get('dot')['turtleClass'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        var turtleblock = py2block.convert(func.value);
        var varblock = py2block.convert(args[0]);

        return [block('turtle_circle', func.lineno, {
            'DIR': 'dot'
        }, {
            'TUR': turtleblock,
            'VAR': varblock
        }, {
            "inline": "true"
        })];
    }
    

pbc.objectFunctionD.get('clone')[turtleClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
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

pbc.objectFunctionD.get('pos')[turtleClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        var turtleblock = py2block.convert(func.value);
        return block('turtle_pos_shape', func.lineno, {
            'DIR': 'pos'
        }, {
            'TUR': turtleblock
        }, {
            "inline": "true"
        });
}

pbc.objectFunctionD.get('position')['Turtle'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        var turtleblock = py2block.convert(func.value);
        return block('turtle_pos_shape', func.lineno, {
            'DIR': 'pos'
        }, {
            'TUR': turtleblock
        }, {
            "inline": "true"
        });
}

pbc.objectFunctionD.get('heading')['Turtle'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        var turtleblock = py2block.convert(func.value);
        return block('turtle_pos_shape', func.lineno, {
            'DIR': 'heading'
        }, {
            'TUR': turtleblock
        }, {
            "inline": "true"
        });
}

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

pbc.objectFunctionD.get('hideturtle')[turtleClass] = turtleHideShow('hideturtle');
pbc.objectFunctionD.get('showturtle')[turtleClass] =  turtleHideShow('showturtle');


pbc.objectFunctionD.get('pencolor')[turtleClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);

    
        
    
    if (args[0]._astname != "Str")  {
        return [block("turtle_pencolor_hex", func.lineno, {}, {
            'TUR': turtleblock,
            'VAR': argblock
        }, {
            "inline": "true"
        })];
    }
    else{
        return [block('turtle_pencolor', func.lineno, {
            "FIELDNAME":py2block.Str_value(args[0])
        }, {
            'TUR': turtleblock
        }, {
            "inline": "true"
        })];
    }

}


pbc.objectFunctionD.get('fillcolor')[turtleClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    if (args[0]._astname == "Str" ) {
        return [block('turtle_fillcolor', func.lineno, {
            "FIELDNAME":py2block.Str_value(args[0])
        }, {
            'TUR': turtleblock
        }, {
            "inline": "true"
        })];
    } else {
        return [block("turtle_fillcolor_hex", func.lineno, {}, {
            'TUR': turtleblock,
            'VAR': argblock
        }, {
            "inline": "true"
        })];
    }


}

pbc.objectFunctionD.get('color')[turtleClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2 &&args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    if(args.length == 2){
    var turtleblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    var argblock1 = py2block.convert(args[1]);
    if (args[0]._astname == "Str" ) {
        return [block('turtle_color', func.lineno, {
            "FIELDNAME":py2block.Str_value(args[0]),
            "FIELDNAME2":py2block.Str_value(args[1])
        }, {
            'TUR': turtleblock
        }, {
            "inline": "true"
        })];
    } else {
        return [block("turtle_color_hex", func.lineno, {}, {
            'TUR': turtleblock,
            'VAR1': argblock,
            'VAR2': argblock1
        }, {
            "inline": "true"
        })];
    }
    }
    if(args.length == 1){
    var turtleblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);    
    if (args[0]._astname != "Str")  {
        return [block("turtle_pencolor_hex", func.lineno, {}, {
            'TUR': turtleblock,
            'VAR': argblock
        }, {
            "inline": "true"
        })];
    }
    else{
        return [block('turtle_pencolor', func.lineno, {
            "FIELDNAME":py2block.Str_value(args[0])
        }, {
            'TUR': turtleblock
        }, {
            "inline": "true"
        })];
    
    }
    }

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

pbc.objectFunctionD.get('begin_fill')[turtleClass] = turtleBeginEndFill('begin');
pbc.objectFunctionD.get('end_fill')[turtleClass] = turtleBeginEndFill('end');


pbc.objectFunctionD.get('onkey')[screenClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    pbc.pinType = "pins_callback";
    var callback = py2block.convert(args[0]);
    pbc.pinType=null;
    var tupblock = py2block.convert(args[1]);
    return [block("turtle_onkey", func.lineno, {},{
        'TUR': turtleblock,
    "callback":callback,
    "VAR":tupblock
    },{
        "inline": "true"
    })];
};

pbc.objectFunctionD.get('onclick')[screenClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    pbc.pinType = "pins_callback";
    var callback = py2block.convert(args[0]);
    
    return [block("turtle_onclick", func.lineno, {},{
        'TUR': turtleblock,
    "callback":callback,
    
    },{
        "inline": "true"
    })];
};

pbc.objectFunctionD.get('ontimer')[screenClass] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    pbc.pinType = "pins_callback";
    var callback = py2block.convert(args[0]);
    pbc.pinType=null;
    var tupblock = py2block.convert(args[1]);
    return [block("turtle_ontimer", func.lineno, {},{
        'TUR': turtleblock,
    "callback":callback,
    "VAR":tupblock
    },{
        "inline": "true"
    })];
};


pbc.objectFunctionD.get('listen')['Turtle'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 0) {
            throw new Error("Incorrect number of arguments");
        }
        var turtleblock = py2block.convert(func.value);
        return [block('turtle_listen', func.lineno, {
            
        }, {
            'TUR': turtleblock
        }, {
            "inline": "true"
        })];
}