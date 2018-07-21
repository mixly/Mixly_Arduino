'use strict';

var pbc = Py2blockConfig.prototype;

pbc.assignD.get('TUPLE')['check_assign'] = function (py2block, node, targets, value) {
    if (value._astname === "Tuple")
        return true;
    return false;
}

pbc.assignD.get('TUPLE')['create_block'] = function (py2block, node, targets, value) {
    return block("tuple_create_with", node.lineno, {
            'VAR': py2block.Name_str(targets[0])
        },
        py2block.convertElements("ADD", value.elts), {
            "inline": "false",
        }, {
            "@items": value.elts.length
        });
}


//len在text里实现

//max/min在math里已实现


pbc.globalFunctionD['list'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var varblock = py2block.convert(args[0]);
    return [block("tuple_change_to", func.lineno, {
        'OP': "list"
    }, {
        'VAR': varblock
    }, {
        "inline": "true"
    })];
}
pbc.globalFunctionD['set'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var varblock = py2block.convert(args[0]);
    return [block("tuple_change_to", func.lineno, {
        'OP': "set"
    }, {
        'VAR': varblock
    }, {
        "inline": "true"
    })];
}