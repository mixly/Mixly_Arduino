var pbc = Py2blockConfig.prototype;

pbc.assignD.get('SET')['check_assign'] = function (py2block, node, targets, value) {
    if (value._astname === "Set")
        return true;
    return false;
}

pbc.assignD.get('SET')['create_block'] = function (py2block, node, targets, value) {
    return block("set_create_with", node.lineno, {
            'VAR': py2block.Name_str(targets[0])
        },
        py2block.convertElements("ADD", value.elts), {
            "inline": "false",
        }, {
            "@items": value.elts.length
        });
}