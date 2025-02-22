export const asrloca_init = function (_, generator) {
    generator.definitions_['import asrloca'] = 'import asrloca';
    var SUB = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var KEY = this.getFieldValue('KEY');
    var code = SUB + "=asrloca.ASR_init(" + KEY + ")\n";
    return code;
}

export const asrloca_config = function (_, generator) {
    var ck = new Array(this.itemCount_);
    var cv = new Array(this.itemCount_);
    var ct = new Array(this.itemCount_);

    var default_value = '0';
    var v = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);

    for (var n = 0; n < this.itemCount_; n++) {
        var keyName = this.getFieldValue('KEY' + n);
        ck[n] = keyName
    }
    for (var n = 0; n < this.itemCount_; n++) {
        cv[n] = generator.valueToCode(this, 'ADD' + n,
            generator.ORDER_NONE) || default_value;
    }
    var code = v + ".config({";
    for (var n = 0; n < this.itemCount_; n++) {
        ct[n] = "'" + ck[n] + "'" + ': ' + cv[n]
    }

    code = code + ct.join(', ') + "})\n";
    return code;
}

export const asrloca_recognize = function (_, generator) {
    var SUB = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = SUB + ".recognize()";
    return [code, generator.ORDER_ATOMIC];
}

export const asrloca_del = function (_, generator) {
    var SUB = generator.valueToCode(this, 'SUB', generator.ORDER_ATOMIC);
    var code = SUB + ".__del__()";
    return code;
}