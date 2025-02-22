'use strict';

var mqtt_client = 'mixiot.MixIO';
pbc.assignD.get('from_mixly_key')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" ||  value.func._astname != "Attribute" || value.func.value._astname != "Attribute"){
        return false;
    }
    var funcName = py2block.identifier(value.func.attr);
    var moduleName = py2block.identifier(value.func.value.attr);
    if(moduleName === "MixIO" && funcName === "from_mixly_key" && value.args.length === 4)
        return true;
    return false;
}

pbc.assignD.get('from_mixly_key')['create_block'] = function(py2block, node, targets, value){
    var arg0block = py2block.convert(value.args[0]);
    var arg2block = py2block.convert(value.args[2]);
    return block("IOT_EMQX_INIT_AND_CONNECT_BY_MIXLY_CODE", node.lineno, {}, {
        'SERVER': arg0block,
        'KEY':arg2block,
    });
}

pbc.assignD.get('from_share_key')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" ||  value.func._astname != "Attribute" || value.func.value._astname != "Attribute"){
        return false;
    }
    var funcName = py2block.identifier(value.func.attr);
    var moduleName = py2block.identifier(value.func.value.attr);
    if(moduleName === "MixIO" && funcName === "from_share_key" && value.args.length === 4)
        return true;
    return false;
}

pbc.assignD.get('from_share_key')['create_block'] = function(py2block, node, targets, value){
    var arg0block = py2block.convert(value.args[0]);
    var arg2block = py2block.convert(value.args[2]);
    return block("IOT_EMQX_INIT_AND_CONNECT_BY_SHARE_CODE", node.lineno, {}, {
        'SERVER': arg0block,
        'KEY':arg2block,
    });
}

pbc.assignD.get('MixIO')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" ||  value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var funcName = py2block.identifier(value.func.attr);
    var moduleName = py2block.Name_str(value.func.value);
    if(moduleName === "mixiot" && funcName === "MixIO" && value.args.length === 6)
        return true;
    return false;
}

pbc.assignD.get('MixIO')['create_block'] = function(py2block, node, targets, value){
    var arg0block = py2block.convert(value.args[0]);
    var arg2block = py2block.convert(value.args[2]);
    var arg3block = py2block.convert(value.args[3]);
    var arg4block = py2block.convert(value.args[4]);
    return block("iot_mixio_connect", node.lineno, {}, {
        'SERVER': arg0block,
        'USERNAME':arg2block,
        'PASSWORD': arg3block,
        'PROJECT':arg4block
    });
}

pbc.objectFunctionD.get('publish')[mqtt_client] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 2) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    var arg1block = py2block.convert(args[1]);
     return [block('IOT_MIXIO_PUBLISH', func.lineno, {}, {
        'TOPIC': argblock,
        'MSG': arg1block
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('unsubscribe')[mqtt_client] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
     return [block('IOT_MIXIO_UNSUBSCRIBE', func.lineno, {}, {
        'TOPIC': argblock
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('subscribe_and_set_callback')[mqtt_client] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 2) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    var arg1block = py2block.convert(args[1]);
     return [block('IOT_MIXIO_SUBSCRIBE', func.lineno, {}, {
        'TOPIC': argblock,
        'METHOD': arg1block
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('check_msg')[mqtt_client] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    
     return [block('iot_mixio_check', func.lineno, {}, {}, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('connect')[mqtt_client] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    
     return [block('iot_mixio_connect_only', func.lineno, {}, {}, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('disconnect')[mqtt_client] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments");
    }
    
     return [block('iot_mixio_disconnect', func.lineno, {}, {}, {
        "inline": "true"
    })];
}

pbc.moduleFunctionD.get('mixpy')['format_content'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 2) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    
     return block('IOT_FORMATTING', func.lineno, {}, {
        'VAR': argblock,
     }, {
        "inline": "true"
    });
}

pbc.moduleFunctionD.get('mixpy')['format_str'] = function(py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    
     return block('IOT_FORMAT_STRING', func.lineno, {}, {
        'VAR': argblock,
     }, {
        "inline": "true"
    });
}