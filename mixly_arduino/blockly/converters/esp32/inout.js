
console.log("hhh")

pbc.objectFunctionD.get('value')['Pin'] = function (py2block, func, args, keywords, starargs, kwargs, node) {
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    console.log("hhhwq")
    pbc.inScope = "i2c_init";
    pbc.pinType = "pins_digital";
    var pinblock = py2block.convert(func.value);
    var argblock = py2block.convert(args[0]);
    pbc.pinType = null;
    pbc.inScope = null;
    return [block("inout_digital_write", func.lineno, {}, {
        "PIN": pinblock,
        "STAT": argblock
    }, {
        "inline": "true"
    })];
}



