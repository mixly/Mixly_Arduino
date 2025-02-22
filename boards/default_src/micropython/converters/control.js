'use strict';

pbc.moduleFunctionD.get('time')['sleep_ms'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }

    var time=py2block.convert(args[0]);
    return [block("controls_delay", func.lineno, {'Time':'ms'}, {
    "DELAY_TIME":time
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('time')['sleep'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }

    var time=py2block.convert(args[0]);
    return [block("controls_delay", func.lineno, {'Time':'s'}, {
    "DELAY_TIME":time
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('time')['sleep_us'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }

    var time=py2block.convert(args[0]);
    return [block("controls_delay", func.lineno, {'Time':'us'}, {
    "DELAY_TIME":time
    }, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('time')['ticks_ms'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("controls_millis", func.lineno, {"Time":"ms"}, {}, {
        "inline": "true"
    });
}
pbc.moduleFunctionD.get('time')['ticks_us'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return block("controls_millis", func.lineno, {"Time":"us"}, {}, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('time')['ticks_diff'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var endblock=py2block.convert(args[0]);
    var startblock=py2block.convert(args[1]);
    return block("system_ticks_diff", func.lineno, {}, {
    "END":endblock,
    "START":startblock
    }, {
        "inline": "true"
    });
}

pbc.assignD.get('Timer')['check_assign'] = function(py2block, node, targets, value) {
    var moduleName = py2block.Name_str(value.func.value);
    var funcName = py2block.identifier(value.func.attr);
    if(value._astname === "Call"
        && funcName === "Timer" && moduleName === "machine" && value.args.length === 1)
        return true;
    return false;
}

pbc.assignD.get('Timer')['create_block'] = function(py2block, node, targets, value){

    pbc.pinType = "variables_get";
    var timblock =  py2block.convert(targets[0]);
    pbc.pinType = null;


    return block("system_timer_init", node.lineno, {}, {
        "SUB":timblock,

    });
}

//跟通信的SPT init重了
pbc.objectFunctionD.get('init')['control'] = function (py2block, func, args, keywords, starargs, kwargs, node) {

    if(args.length === 0 && keywords.length ===3){
    pbc.pinType = "variables_get";
    var tim = py2block.convert(func.value);
    pbc.pinType = null;
    pbc.pinType = "math_number";
    var numblock = py2block.convert(keywords[0].value);
    pbc.pinType = null;
    var mode = py2block.identifier(keywords[1].value.attr);
    pbc.pinType = "pins_callback";
    var callback = py2block.convert(keywords[2].value);
    pbc.pinType = null;

    return [block("system_timer", func.lineno, {"mode":mode}, {
        "VAR": tim,
        "period":numblock,
        "callback": callback
    }, {
        "inline": "true"
    })];
}
    else if (args.length == 0 && keywords.length == 1){
        var objblock = py2block.convert(func.value);
        var bltblock = null;
        var param = keywords[0];
        var key = py2block.identifier(param.arg);
        if (key === "baudrate") {
            bltblock = py2block.convert(param.value);
        }
        if (bltblock != null ) {
            return [block("communicate_spi_set", func.lineno, {}, {
                "VAR":objblock,
                "data": bltblock,
            }, {
                "inline": "true"
            })];
        }
    }
    else{
        throw new Error("Incorrect number of arguments");
    }

}