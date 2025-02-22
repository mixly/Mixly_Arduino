'use strict';

pbc.globalFunctionD['dict'] = function converter(py2block, func, args, keywords, starargs, kwargs, node) {
    var paramblock = py2block.convert(args[0]);
    return block("variables_change", func.lineno, {
        'OP': 'dict'
    }, {
        'MYVALUE': paramblock,
    }, {
        "inline": "false"
    });
}

function TypeConvert(mode) {
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        var argblock = py2block.convert(args[0]);
        return block("variables_change", func.lineno, {
            "OP":mode
        }, {
            'MYVALUE': argblock
        }, {
            "inline": "true"
        });
    }
    return converter;
}

pbc.globalFunctionD['int'] = TypeConvert('int');
pbc.globalFunctionD['float'] = TypeConvert('float');
pbc.globalFunctionD['bool'] = TypeConvert('bool');
// pbc.globalFunctionD['complex'] = TypeConvert('complex');
pbc.globalFunctionD['str'] = TypeConvert('str');
pbc.globalFunctionD['list'] = TypeConvert('list');
pbc.globalFunctionD['tuple'] = TypeConvert('tuple');
pbc.globalFunctionD['set'] = TypeConvert('set');
pbc.globalFunctionD['dict'] = TypeConvert('dict');