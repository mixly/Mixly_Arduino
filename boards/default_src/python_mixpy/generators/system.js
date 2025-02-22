export const controls_millis = function (_, generator) {
    generator.definitions_.import_time = "import time";
    var code = 'time.time()';
    return [code, generator.ORDER_ATOMIC];
}

export const controls_end_program = function () {
    return 'exit()\n';
}

export const time_localtime = function (_, generator) {
    generator.definitions_.import_time = "import time";
    var op = this.getFieldValue('op');
    var code = "time.localtime()[" + op + "]";
    switch (op) {
        case "all":
            var code1 = "time.localtime()";
            return [code1, generator.ORDER_ASSIGNMENT];
        default:
            return [code, generator.ORDER_ASSIGNMENT];
    }
}