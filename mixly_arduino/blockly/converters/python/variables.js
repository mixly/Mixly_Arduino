'use strict';

var pbc = Py2blockConfig.prototype;

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
