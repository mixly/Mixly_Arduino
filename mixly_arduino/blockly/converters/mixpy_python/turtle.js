'use strict';

var pbc = Py2blockConfig.prototype;


pbc.assignD.get('Turtle')['check_assign'] = function(py2block, node, targets, value) {
    var moduleName = value.func.value.id.v;
    var funcName = value.func.attr.v;
    if(value._astname === "Call" && moduleName === "turtle"
        && funcName === "Turtle" && value.args.length === 0)
        return true;
    return false;
}

pbc.assignD.get('Turtle')['create_block'] = function(py2block, node, targets, value){
   // var pinblock = py2block.convert(node.targets[0].id);
   var turtle=node.targets[0].id.v;
    return [block('turtle_create', node.lineno, 
        {'VAR':turtle}, {
        
       /* "PIN":pinblock,
        "LEDCOUNT":countblock*/
    })];
}


pbc.objectFunctionD.get('forward')['Turtle'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block('turtle_move', func.lineno, {'DIR':'forward'}, {
        'TUR':turtleblock,
        'VAR':argblock,

    }, {
        "inline": "true"
    })];
}


pbc.objectFunctionD.get('backward')['Turtle'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block('turtle_move', func.lineno, {'DIR':'backward'}, {
        'TUR':turtleblock,
        'VAR':argblock,

    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('left')['Turtle'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block('turtle_rotate', func.lineno, {'DIR':'left'}, {
        'TUR':turtleblock,
        'VAR':argblock,

    }, {
        "inline": "true"
    })];
}
pbc.objectFunctionD.get('right')['Turtle'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block('turtle_rotate', func.lineno, {'DIR':'right'}, {
        'TUR':turtleblock,
        'VAR':argblock,

    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('setheading')['Turtle'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block('turtle_setheading', func.lineno, {}, {
        'TUR':turtleblock,
        'data':argblock,

    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('goto')['Turtle'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var xblock = py2block.convert(args[0]);
    var yblock=py2block.convert(args[1]);
    return [block('turtle_goto', func.lineno, {}, {
        'TUR':turtleblock,
        'data':xblock,
        'val':yblock

    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('clear')['Turtle'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
   
    return [block('turtle_clear', func.lineno, {'DIR':'clear'}, {
        'TUR':turtleblock,
        

    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('reset')['Turtle'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
   
    return [block('turtle_clear', func.lineno, {'DIR':'reset'}, {
        'TUR':turtleblock,
        

    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('home')['Turtle'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
   
    return [block('turtle_clear', func.lineno, {'DIR':'home'}, {
        'TUR':turtleblock,
        

    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('penup')['Turtle'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
   
    return [block('turtle_penup', func.lineno, {'DIR':'penup'}, {
        'TUR':turtleblock,
        

    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('pendown')['Turtle'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
   
    return [block('turtle_penup', func.lineno, {'DIR':'pendown'}, {
        'TUR':turtleblock,
        

    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('pensize')['Turtle'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var sizeblock=py2block.convert(args[0]);
    return [block('turtle_size', func.lineno, {}, {
        'TUR':turtleblock,
        'data':sizeblock,
        

    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('speed')['Turtle'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var speedblock=py2block.convert(args[0]);
    return [block('turtle_speed', func.lineno, {}, {
        'TUR':turtleblock,
        'data':speedblock,
        

    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('circle')['Turtle'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var varblock=py2block.convert(args[0]);
    var datablock=py2block.convert(args[1]);

    return [block('turtle_circle', func.lineno, {'DIR':'circle'}, {
        'TUR':turtleblock,
        'VAR':varblock,
        'data':datablock   
        

    }, {
        "inline": "true"
    })];
}


pbc.objectFunctionD.get('dot')['Turtle'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var varblock=py2block.convert(args[0]);
    var datablock=py2block.convert(args[1]);

    return [block('turtle_circle', func.lineno, {'DIR':'dot'}, {
        'TUR':turtleblock,
        'VAR':varblock,
        'data':datablock   
        

    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('clone')['Turtle'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    

    return block('turtle_clone', func.lineno, {}, {
        'TUR':turtleblock,
    }, {
        "inline": "true"
    });
}

pbc.objectFunctionD.get('hideturtle')['Turtle'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    

    return [block('turtle_visible', func.lineno, {'DIR':'hideturtle'}, {
        'TUR':turtleblock,
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('showturtle')['Turtle'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    

    return [block('turtle_visible', func.lineno, {'DIR':'showturtle'}, {
        'TUR':turtleblock,
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('pencolor')['Turtle'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var colorblock=py2block.identifier(args[0].s);
    var argblock = py2block.convert(args[0]);
   
    if(colorblock.match('#')){
    // 包含 
    return [block('turtle_pencolor', func.lineno, {}, {
        'TUR':turtleblock,
       //'FIELDNAME':'RED'
        //'FIELDNAME':colorblock,
    }, {
        "inline": "true"
    })];       
    }
    else {
         return [block("turtle_pencolor_hex", func.lineno, {}, {
        'TUR':turtleblock,
        'VAR':argblock
    }, {
        "inline": "true"
    })];
    }

    
}

pbc.objectFunctionD.get('fillcolor')['Turtle'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    var colorblock=py2block.identifier(args[0].s);
    var argblock = py2block.convert(args[0]);
    if(colorblock.match('#')){
         return [block('turtle_fillcolor', func.lineno, {}, {
        'TUR':turtleblock,
       // 'FIELDNAME':'RED'
        //'FIELDNAME':colorblock,
    }, {
        "inline": "true"
    })];
    }
    else{
         return [block("turtle_fillcolor_hex", func.lineno, {}, {
        'TUR':turtleblock,
        'VAR':argblock
    }, {
        "inline": "true"
    })];
    }

   
}


pbc.objectFunctionD.get('begin_fill')['TURTLE'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    return [block("turtle_fill", func.lineno, {
        'DIR':"begin"
    }, {
        'TUR':turtleblock,
    }, {
        "inline": "true"
    })];
}
pbc.objectFunctionD.get('end_fill')['TURTLE'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var turtleblock = py2block.convert(func.value);
    return [block("turtle_fill", func.lineno, {
        'DIR':"end"
    }, {
        'TUR':turtleblock,
    }, {
        "inline": "true"
    })];
}
