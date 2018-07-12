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