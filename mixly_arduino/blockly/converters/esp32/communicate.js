//机制过于复杂，不会转化

pbc.assignD.get('I2C')['check_assign'] = function (py2block, node, targets, value) {
    if (value._astname === "Call")
        return true;
    return false;
}

pbc.assignD.get('I2C')['create_block'] = function (py2block, node, targets, value) {

    return block("uart_softserial", node.lineno, {
            'VAR': py2block.Name_str(targets[0])
        },
        py2block.convertElements("ADD", value.keywords), {
            "inline": "false",
        }, {
            
            "@items": value.elts.length
        });
}