'use strict';

pbc.assignD.get('Set')['check_assign'] = function (py2block, node, targets, value) {
    if (value._astname === "Set")
        return true;
    return false;
}

pbc.assignD.get('Set')['create_block'] = function (py2block, node, targets, value) {
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

pbc.objectFunctionD.get('pop')['Set'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length === 0) {
        var popblock = py2block.convert(func.value);
        return block("set_get_remove_last", func.lineno, {}, {
            "SET":popblock
        }, {
            "inline": "true"
        });
    }else if(args.length === 1){
        var objblock = py2block.convert(func.value);
        var argblock = py2block.convert(args[0]);
        return block("lists_pop", func.lineno, {}, {
            "LIST":objblock,
            "VALUE":argblock
        }, {
            "inline": "true"
        });
    }else{
        throw new Error("Incorrect number of arguments");
    }

}


//tuple(mytuple), set(mytup)在lists.js中实现

function setOperate(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        var objblock = py2block.convert(func.value);
        var argblock = py2block.convert(args[0]);
        return block("set_operate", func.lineno, {
            'OPERATE': mode,
        }, {
            "SET1": objblock,
            "SET2": argblock
        }, {
            "inline": "true"
        });
    }
    return converter;
}

pbc.objectFunctionD.get('union')['Set'] = setOperate('union');
pbc.objectFunctionD.get('intersection')['Set'] = setOperate('intersection');
pbc.objectFunctionD.get('difference')['Set'] =  setOperate('difference');


pbc.objectFunctionD.get('update')['Set'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block("set_update", func.lineno, {}, {
        "SET": objblock,
        "VAR": argblock
    }, {
        "inline": "true"
    })];
};


function setOperateUpdate(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        var objblock = py2block.convert(func.value);
        var argblock = py2block.convert(args[0]);
        return [block("set_operate_update", func.lineno, {
            'OPERATE': mode,
        }, {
            "SET1": objblock,
            "SET2": argblock
        }, {
            "inline": "true"
        })];
    }
    return converter;
}



pbc.objectFunctionD.get('difference_update')['Set'] = setOperateUpdate('difference_update');
pbc.objectFunctionD.get('intersection_update')['Set'] = setOperateUpdate('intersection_update');


function setAddDiscard(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        var objblock = py2block.convert(func.value);
        var argblock = py2block.convert(args[0]);
        return [block("set_add_discard", func.lineno, {
            'OPERATE':mode,
        }, {
            "SET":objblock,
            "data":argblock
        }, {
            "inline": "true"
        })];
    }
    return converter;
}

pbc.objectFunctionD.get('add')['Set'] = setAddDiscard('add');
pbc.objectFunctionD.get('discard')['Set'] = setAddDiscard('discart');


function setSub(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        var objblock = py2block.convert(func.value);
        var argblock = py2block.convert(args[0]);
        return block("set_sub", func.lineno, {
            'OPERATE':mode,
        }, {
            "SET1":objblock,
            "SET2":argblock
        }, {
            "inline": "true"
        });
    }
    return converter;
}


pbc.objectFunctionD.get('issubset')['Set'] = setSub('issubset');
pbc.objectFunctionD.get('issuperset')['Set'] = setSub('issuperset');

