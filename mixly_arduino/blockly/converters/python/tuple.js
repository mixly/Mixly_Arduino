'use strict';

pbc.assignD.get('Tuple')['check_assign'] = function (py2block, node, targets, value) {
    if (value._astname === "Tuple")
        return true;
    return false;
}

pbc.assignD.get('Tuple')['create_block'] = function (py2block, node, targets, value) {
    return block("tuple_create_with", node.lineno, {
            'VAR': py2block.Name_str(targets[0])
        },
        py2block.convertElements("ADD", value.elts), {
            "inline": elts.length < 4 ? "false" : "true",
        }, {
            "@items": value.elts.length
        });
}

//mytup[0]在python_to_blockly.py中实现
//len在text里实现

//max/min在math里已实现

//list(mytuple), set(mytup)在lists.js中实现
