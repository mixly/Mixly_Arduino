'use strict';

pbc.assignD.get('handbit_oled')['check_assign'] = function(py2block, node, targets, value) {
    if(value._astname != "Call" || value.func._astname != "Attribute" || value.func.value._astname != "Name"){
        return false;
    }
    var moduleName = py2block.Name_str(value.func.value);
    var funcName = py2block.identifier(value.func.attr);
    if(value._astname === "Call" && moduleName === "ssd1106"
        && funcName === "SSD1106_I2C" && value.args.length === 3)
        return true;
    return false;
}

pbc.assignD.get('handbit_oled')['create_block'] = function(py2block, node, targets, value){
    var rowblock = py2block.convert(value.args[0]);
    var columnblock = py2block.convert(value.args[1]);
    var i2cblock = py2block.convert(value.args[2]);
    return block("handbit_display_use_i2c_init", node.lineno, {
    }, {
        "I2CSUB":i2cblock,
        "row":rowblock,
        "column":columnblock,
        "SUB":py2block.convert(targets[0]),
    });
}
