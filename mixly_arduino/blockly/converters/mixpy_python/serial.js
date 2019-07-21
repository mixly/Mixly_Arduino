'use strict';

var serialClass = 'serial.Serial';
pbc.assignD.get('Serial')['check_assign'] = function (py2block, node, targets, value) {
    if(value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var moduleName = py2block.Name_str(value.func.value);
    var funcName = py2block.identifier(value.func.attr);
    if (value._astname === "Call" && moduleName === "serial"
        && funcName === "Serial" && value.args.length === 2 && value.keywords.length === 1)
        return true;
    return false;
}

pbc.assignD.get('Serial')['create_block'] = function (py2block, node, targets, value) {
    var ser = py2block.Name_str(node.targets[0]);
    if(value.keywords[0].arg.v == 'timeout')
    {return block('serial_open', node.lineno, {
            'SER': ser,
            'BPS':value.args[1].n.v.toString()
        }, {
            "VAR":py2block.convert(value.keywords[0].value)
        });}
}

pbc.objectFunctionD.get('close')[serialClass] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    var fileblock = py2block.convert(func.value);
    return [block("serial_close", func.lineno, {}, {
        "SER" : fileblock
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('write')[serialClass] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var fileblock = py2block.convert(func.value);
    return [block("serial_write", func.lineno, {}, {
        "SER" : fileblock,
        'VAR' : py2block.convert(args[0])
    }, {
        "inline": "true"
    })];
}

pbc.objectFunctionD.get('read')[serialClass] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var fileblock = py2block.convert(func.value);
    return block("serial_read_b", func.lineno, {}, {
        "SER" : fileblock,
        'VAR' : py2block.convert(args[0])
    }, {
        "inline": "true"
    });
}

pbc.objectFunctionD.get('decode')['List'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    
    return [block("lists_insert_value", func.lineno, {}, {
        
    }, {
        "inline": "true"
    })];
};