'use strict';

pbc.assignD.get('List')['check_assign'] = function (py2block, node, targets, value) {
    if (value._astname === "List")
        return true;
    return false;
}

pbc.assignD.get('List')['create_block'] = function (py2block, node, targets, value) {
    return block("lists_create_with", node.lineno, {
            'VAR': py2block.Name_str(targets[0])
        },
        py2block.convertElements("ADD", value.elts), {
            "inline": elts.length < 4 ? "false" : "true",
        }, {
            "@items": value.elts.length
        });
}


//mylist[0]在python_to_blockly.js中实现
//mylist[0:2]在python_to_blockly.js中实现


function listTrig(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        var argblock = py2block.convert(args[0]);
        return block("list_trig", func.lineno, {
            'OP':mode
        }, {
            "data": argblock,
        }, {
            "inline": "true"
        });
    };
    return converter;
}

pbc.globalFunctionD['sum'] = listTrig('SUM');
pbc.globalFunctionD['math_mean'] = listTrig('AVERAGE');
pbc.globalFunctionD['math_median'] = listTrig('MEDIAN');
pbc.globalFunctionD['math_modes'] = listTrig('MODE');
pbc.globalFunctionD['math_standard_deviation'] = listTrig('STD_DEV');


//mylist[0] = 0在python_to_blockly.js中实现


pbc.objectFunctionD.get('insert')['List'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 2) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var atblock = py2block.convert(args[0]);
    var valblock = py2block.convert(args[1]);
    return [block("lists_insert_value", func.lineno, {}, {
        "LIST": objblock,
        "AT": atblock,
        "VALUE": valblock,
    }, {
        "inline": "true"
    })];
};

function listAppendExtend(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        var objblock = py2block.convert(func.value);
        var argblock = py2block.convert(args[0]);
        return [block("lists_append_extend", func.lineno, {
            "OP":mode
        }, {
            "LIST": objblock,
            "DATA": argblock
        }, {
            "inline": "true"
        })];
    };
    return converter;
}
pbc.objectFunctionD.get('append')['List'] = listAppendExtend('append');
pbc.objectFunctionD.get('extend')['List'] = listAppendExtend('extend');


//del mylist[0]在python_to_blockly.js中实现

pbc.objectFunctionD.get('remove')['List'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    return [block("lists_remove_at", func.lineno, {
        "OP":"remove"
    }, {
        "LIST": objblock,
        "DATA": argblock
    }, {
        "inline": "true"
    })];
};


//mylist.pop(0)在set.js中实现
//random.choice(mylist)在text.js中实现

function listFindCount(mode){
    function converter(py2block, func, args, keywords, starargs, kwargs, node){
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        var objblock = py2block.convert(func.value);
        var argblock = py2block.convert(args[0]);
        return block("lists_find", func.lineno, {
            'OP':mode
        }, {
            "VAR": objblock,
            "data": argblock
        }, {
            "inline": "true"
        });
    };
    return converter;
}
pbc.objectFunctionD.get('index')['List'] = listFindCount('INDEX');
pbc.objectFunctionD.get('count')['List'] = listFindCount('COUNT');


pbc.globalFunctionD['lists_sort'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 3 && args[1]._astname === "Str"
        && args[2]._astname === "Name") {
        throw new Error("Incorrect number of arguments");
    }
    var argblock = py2block.convert(args[0]);
    var type = py2block.Str_value(args[1]);
    var reverse = py2block.Name_str(args[2]);
    if(reverse == "True"){
        reverse = '-1';
    }else if(reverse == "False"){
        reverse = '1';
    }else{
        throw new Error("not implement");
    }
    return block("lists_sort", func.lineno, {
        'TYPE': type,
        'DIRECTION':reverse
    }, {
        'LIST': argblock
    }, {
        "inline": "true"
    });
}


pbc.objectFunctionD.get('reverse')['List'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return [block("lists_reverse", func.lineno, {}, {
        "VAR": objblock,
    }, {
        "inline": "true"
    })];
};


pbc.objectFunctionD.get('clear')['List'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var objblock = py2block.convert(func.value);
    return [block("lists_clear", func.lineno, {}, {
        "VAR": objblock,
    }, {
        "inline": "true"
    })];
};