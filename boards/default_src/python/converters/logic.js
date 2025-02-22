'use strict';


//目前块都在python_to_blockly.js中实现
pbc.globalFunctionD['bool'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments");
    }
    var numblock = py2block.convert(args[0]);
    return block("logic_tobool", func.lineno, {}, {
            'VAR': numblock,
        }, {
            "inline": "false"
        });
}