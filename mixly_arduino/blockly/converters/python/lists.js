'use strict';

var pbc = Py2blockConfig.prototype;

pbc.assignD.get('List')['check_assign'] = function (py2block, node, targets, value) {
    if (value._astname === "List")
        return true;
    return false;
}

pbc.assignD.get('List')['create_block'] = function (py2block, node, targets, value) {
    return block("lists_create_with2", node.lineno, {
            'VAR': py2block.Name_str(targets[0])
        },
        py2block.convertElements("ADD", value.elts), {
            "inline": "false",
        }, {
            "@items": value.elts.length
        });
}

/*
if(left._astname === "Call" && left.func.attr.v === "index"
        && right._astname === "Num" && this.Num_value(right) === 1){
        return block("lists_find", node.lineno, {"OP": "INDEX"}, {
            "VAR": this.convert(left.func.value),
            "data":this.convert(left.args[0])
        });
    }
    */
function listTupleSetConvert(mode) {
    function converter(py2block, func, args, keywords, starargs, kwargs, node) {
        if (args.length !== 1) {
            throw new Error("Incorrect number of arguments");
        }
        var argblock = py2block.convert(args[0]);
        return block("lists_change_to_general", func.lineno, {
            "OP":mode
        }, {
            'VAR': argblock
        }, {
            "inline": "true"
        });
    }
    return converter;
}

pbc.globalFunctionD['list'] = listTupleSetConvert('list');
pbc.globalFunctionD['tuple'] = listTupleSetConvert('tuple');
pbc.globalFunctionD['set'] = listTupleSetConvert('set');

