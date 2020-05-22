'use strict';

pbc.assignD.get('Dict')['check_assign'] = function (py2block, node, targets, value) {
    if (value._astname === "Dict")
        return true;
    return false;
}

pbc.assignD.get('Dict')['create_block'] = function (py2block, node, targets, value) {
    var keys = value.keys;
    var values = value.values;

    var keyList = [];
    var valueList = [];
    for (var i = 0; i < keys.length; i+= 1) {
        var sourceCode = py2block.getSourceCode(node).split('\n')[keys[i].lineno - 1];
        var s = keys[i].col_offset;
        var e = sourceCode.indexOf(":", keys[i].col_offset);
        keyList["KEY"+i] = sourceCode.substring(s, e).trim();
        valueList["ADD"+i] = py2block.convert(values[i]);
    }
    keyList['VAR'] = py2block.Name_str(targets[0]);

    return block("dicts_create_with", node.lineno, keyList, valueList, {
        "inline": "false"
    }, {
        "@items": keys.length
    });
}

pbc.objectFunctionD.get('keys')['Dict'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return block("dicts_keys", func.lineno, {}, {
        "DICT": objblock,
    }, {
        "inline": "true"
    });
};

pbc.objectFunctionD.get('get')['Dict'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1 && args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    if (args.length == 2){
    var args0 = py2block.convert(args[0]);
    var args1 = py2block.convert(args[1]);
    return block("dicts_get_default", func.lineno, {}, {
        "DICT": objblock,
        "KEY": args0,
        "VAR": args1,
    }, {
        "inline": "true"
    });
    }
    else{

        var args1block = {
            _astname: "Name",
            id: {
                'v': 'None'
            }
        };    
    var args0 = py2block.convert(args[0]);
    var args1 = py2block.convert(args1block);
    return block("dicts_get_default", func.lineno, {}, {
        "DICT": objblock,
        "KEY": args0,
        "VAR": args1,
    }, {
        "inline": "true"
    });    
    }
};

//d['key']在python_to_blockly.js中实现

//d['key'] = 11;在python_to_blockly.js中实现

//del d['key'];在python_to_blockly.js中实现

//d.clear()在lists.js中实现

//d.pop('key')在set.js中实现


pbc.objectFunctionD.get('setdefault')['Dict'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var args0 = py2block.convert(args[0]);
    var args1 = py2block.convert(args[1]);
    return [block("dicts_setdefault", func.lineno, {}, {
        "DICT": objblock,
        "KEY": args0,
        "VAR": args1,
    }, {
        "inline": "true"
    })];
};


pbc.objectFunctionD.get('items')['Dict'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return block("dicts_items", func.lineno, {}, {
        "DICT": objblock,
    }, {
        "inline": "true"
    });
};


pbc.objectFunctionD.get('values')['Dict'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return block("dicts_values", func.lineno, {}, {
        "DICT": objblock,
    }, {
        "inline": "true"
    });
};


pbc.globalFunctionD['dict'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length > 1) {
        throw new Error("Incorrect number of arguments");
    }
    if (args.length ==0){
        return block("dicts_create_with_noreturn", node.lineno, {},{}
            , {
                "inline": "true",
            }, {
                "@items": 0
            });
    }
    if (args.length ==1){
        var numblock = py2block.convert(args[0]);
    return block("dicts_todict", func.lineno, {}, {
            'VAR': numblock,
        }, {
            "inline": "false"
        });
    }
}
