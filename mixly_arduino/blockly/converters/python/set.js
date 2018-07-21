var pbc = Py2blockConfig.prototype;

pbc.assignD.get('SET')['check_assign'] = function (py2block, node, targets, value) {
    if (value._astname === "Set")
        return true;
    return false;
}

pbc.assignD.get('SET')['create_block'] = function (py2block, node, targets, value) {
    return block("set_create_with", node.lineno, {
            'VAR': py2block.Name_str(targets[0])
        },
        py2block.convertElements("ADD", value.elts), {
            "inline": "false",
        }, {
            "@items": value.elts.length
        });
}

//len在text里实现

pbc.objectFunctionD.get('pop')['SET'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var popblock = py2block.convert(func.value);
    return [block("set_get_remove_last", func.lineno, {}, {
        "SET":popblock
    }, {
        "inline": "true"
    })];
}
pbc.globalFunctionD['list'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    return block("set_change_to", func.lineno, {
        "OP":"list"
    }, {
        'VAR':argblock
    }, {
        "inline": "true"
    });
}
pbc.globalFunctionD['tuple'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    return block("set_change_to", func.lineno, {
        "OP":"tuple"
    }, {
        'VAR':argblock
    }, {
        "inline": "true"
    });
}
pbc.objectFunctionD.get('union')['SET'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var popblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block("set_operate", func.lineno, {
        'OPERATE':"union",
    }, {
        "SET1":popblock,
        "SET2":argblock
    }, {
        "inline": "true"
    })];
}
pbc.objectFunctionD.get('intersection')['SET'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var popblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block("set_operate", func.lineno, {
        'OPERATE':"intersection",
    }, {
        "SET1":popblock,
        "SET2":argblock
    }, {
        "inline": "true"
    })];
}
pbc.objectFunctionD.get('difference')['SET'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var popblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block("set_operate", func.lineno, {
        'OPERATE':"difference",
    }, {
        "SET1":popblock,
        "SET2":argblock
    }, {
        "inline": "true"
    })];
}
pbc.objectFunctionD.get('difference_update')['SET'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var popblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block("set_operate_update", func.lineno, {
        'OPERATE':"difference_update",
    }, {
        "SET1":popblock,
        "SET2":argblock
    }, {
        "inline": "true"
    })];
}
// pbc.objectFunctionD.get('update')['SET'] = function(py2block, func, args, keywords, starargs, kwargs, node){
//     if (args.length !== 1) {
//         throw new Error("Incorrect number of arguments");
//     }
//      var popblock = py2block.convert(func.value);
//      var argblock = py2block.convert(args[0]);
//     return [block("set_operate_update", func.lineno, {
//         'OPERATE':"update",
//     }, {
//         "SET1":popblock,
//         "SET2":argblock
//     }, {
//         "inline": "true"
//     })];
// }
pbc.objectFunctionD.get('update')['SET'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var popblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block("set_update", func.lineno, {
        'OPERATE':"update",
    }, {
        "SET":popblock,
        'VAR': argblock
    }, {
        "inline": "true"
    })];
}
pbc.objectFunctionD.get('intersection_update')['SET'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var popblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block("set_operate_update", func.lineno, {
        'OPERATE':"intersection_update",
    }, {
        "SET1":popblock,
        "SET2":argblock
    }, {
        "inline": "true"
    })];
}
pbc.objectFunctionD.get('add')['SET'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var popblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block("set_add_discard", func.lineno, {
        'OPERATE':"add",
    }, {
        "SET":popblock,
        "data":argblock
    }, {
        "inline": "true"
    })];
}
pbc.objectFunctionD.get('discard')['SET'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var popblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block("set_add_discard", func.lineno, {
        'OPERATE':"discard",
    }, {
        "SET":popblock,
        "data":argblock
    }, {
        "inline": "true"
    })];
}
pbc.objectFunctionD.get('issubset')['SET'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var popblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block("set_sub", func.lineno, {
        'OPERATE':"issubset",
    }, {
        "SET1":popblock,
        "SET2":argblock
    }, {
        "inline": "true"
    })];
}
pbc.objectFunctionD.get('issuperset')['SET'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var popblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block("set_sub", func.lineno, {
        'OPERATE':"issuperset",
    }, {
        "SET1":popblock,
        "SET2":argblock
    }, {
        "inline": "true"
    })];
}