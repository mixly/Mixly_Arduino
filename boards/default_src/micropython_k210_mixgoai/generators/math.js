// export const math_number = function() {
//   // Numeric value.
//   var code = (this.getFieldValue('NUM'));
//   // -4.abs() returns -4 in Dart due to strange order of operation choices.
//   // -4 is actually an operator and a number.  Reflect this in the order.
//   var order = code < 0 ?
//       generator.ORDER_UNARY_PREFIX : generator.ORDER_ATOMIC;
//   return [code, order];
// }

// generator.math = {}
// generator.addReservedWords("math,random,Number");

export const math_number = function (_, generator) {
    // a = parseFloat(a.getFieldValue("NUM"));
    // var b;
    // Infinity == a ? (a = 'float("inf")', b = generator.ORDER_FUNCTION_CALL) : -Infinity == a ? (a = '-float("inf")', b = generator.ORDER_UNARY_SIGN) : b = 0 > a ? generator.ORDER_UNARY_SIGN : generator.ORDER_ATOMIC;
    // return [a, b]

    var code = this.getFieldValue('NUM');
    // -4.abs() returns -4 in Dart due to strange order of operation choices.
    // -4 is actually an operator and a number.  Reflect this in the order.
    var order = code < 0 ?
        generator.ORDER_UNARY_PREFIX : generator.ORDER_ATOMIC;
    return [code, order];
}

export const math_constant = function (_, generator) {
    generator.definitions_.import_math = "import math";
    var name = this.getFieldValue('CONSTANT');
    var code = 'math.' + name;
    return [code, generator.ORDER_ATOMIC];
}


export const math_bit = function (_, generator) {
    var operator = this.getFieldValue('OP');
    var order = generator.ORDER_ATOMIC;
    var argument0 = generator.valueToCode(this, 'A', order) || '0';
    var argument1 = generator.valueToCode(this, 'B', order) || '0';
    var code = '(' + argument0 + operator + argument1 + ')';
    return [code, order];
}

export const math_arithmetic = function (block, generator) {
    var b = {
            ADD: [" + ", generator.ORDER_ADDITIVE],
            MINUS: [" - ", generator.ORDER_ADDITIVE],
            MULTIPLY: [" * ", generator.ORDER_MULTIPLICATIVE],
            DIVIDE: [" / ", generator.ORDER_MULTIPLICATIVE],
            QUYU: [' % ', generator.ORDER_MULTIPLICATIVE],//增加取余操作
            ZHENGCHU: [' // ', generator.ORDER_MULTIPLICATIVE],//增加整除操作
            POWER: [" ** ", generator.ORDER_EXPONENTIATION]
        }[block.getFieldValue("OP")],
        c = b[0],
        b = b[1],
        d = generator.valueToCode(block, "A", b) || "0";
    block = generator.valueToCode(block, "B", b) || "0";
    return [d + c + block, b]
}

export const math_selfcalcu = function (_, generator) {
    var argument0 = generator.valueToCode(this, 'A', generator.ORDER_RELATIONAL) || '0';
    var argument1 = generator.valueToCode(this, 'B', generator.ORDER_RELATIONAL) || '0';
    var operator = this.getFieldValue('OP');
    switch (operator) {
        case 'ADD': var op = '+='; break;
        case 'MINUS': var op = '-='; break;
        case 'MULTIPLY': var op = '*='; break;
        case 'DIVIDE': var op = '/='; break;
        case 'QUYU': var op = '%='; break;
        case 'ZHENGCHU': var op = '//='; break;
        case 'POWER': var op = '**='; break;
    }
    var code = argument0 + ' ' + op + ' ' + argument1 + '\n';
    return code;
}

export const math_single = function (a, generator) {
    var b = a.getFieldValue("OP"),
        c;
    if ("NEG" == b)
        return c = generator.valueToCode(a, "NUM", generator.ORDER_UNARY_SIGN) || "0", ["-" + c, generator.ORDER_UNARY_SIGN];
    generator.definitions_['import_math'] = "import math";
    a = "SIN" == b || "COS" == b || "TAN" == b ? generator.valueToCode(a, "NUM", generator.ORDER_MULTIPLICATIVE) || "0" : generator.valueToCode(a, "NUM", generator.ORDER_NONE) || "0";
    switch (b) {
        case "ABS":
            c = "math.fabs(" + a + ")";
            break;
        case "ROOT":
            c = "math.sqrt(" +
                a + ")";
            break;
        case "LN":
            c = "math.log(" + a + ")";
            break;
        case "LOG10":
            c = "math.log10(" + a + ")";
            break;
        case "EXP":
            c = "math.exp(" + a + ")";
            break;
        case "POW10":
            c = "math.pow(10," + a + ")";
            break;
        case "ROUND":
            c = "round(" + a + ")";
            break;
        case "ROUNDUP":
            c = "math.ceil(" + a + ")";
            break;
        case "ROUNDDOWN":
            c = "math.floor(" + a + ")";
            break;
        case "SIN":
            c = "math.sin(" + a + ")";
            break;
        case "COS":
            c = "math.cos(" + a + ")";
            break;
        case "TAN":
            c = "math.tan(" + a + ")";
            break;
        case "++":
            c = "++(" + a + ")";
            break;
        case "--":
            c = "--(" + a + ")";
            break;
        case "-":
            c = "-(" + a + ")";
            break;
        default:
    }
    if (c)
        return [c, generator.ORDER_FUNCTION_CALL];
    switch (b) {
        case "ASIN":
            c = "math.degrees(math.asin(" + a + "))";
            break;
        case "ACOS":
            c = "math.degrees(math.acos(" + a + "))";
            break;
        case "ATAN":
            c = "math.degrees(math.atan(" + a + "))";
            break;
    }
    return [c, generator.ORDER_MULTIPLICATIVE]
}

export const math_trig = math_single;

export const math_to_int = function (_, generator) {
    var argument0 = generator.valueToCode(this, 'A', generator.ORDER_NONE) || '0';
    var operator = this.getFieldValue('OP');
    var code = "";
    if (operator === "round") {
        code = operator + '(' + argument0 + ')';
    } else {
        code = "math." + operator + '(' + argument0 + ')';
        generator.definitions_.import_math = "import math";
    }
    return [code, generator.ORDER_ATOMIC];
}

export const math_max_min = function (_, generator) {
    var a = generator.valueToCode(this, 'A', generator.ORDER_NONE) || '0';
    var b = generator.valueToCode(this, 'B', generator.ORDER_NONE) || '0';
    var operator = this.getFieldValue('OP');
    var code = operator + '(' + a + ', ' + b + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const math_max_min1 = function (_, generator) {
    var a = generator.valueToCode(this, 'LIST', generator.ORDER_NONE) || '0';
    var operator = this.getFieldValue('OP');
    var code = operator + '(' + a + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const math_random = function (_, generator) {
    generator.definitions_.import_random = "import random";
    // Random integer between [X] and [Y].
    var type = this.getFieldValue('TYPE');
    var argument0 = generator.valueToCode(this, 'FROM',
        generator.ORDER_NONE) || '0';
    var argument1 = generator.valueToCode(this, 'TO',
        generator.ORDER_NONE) || '0';
    if (type == 'int') {
        var code = 'random.randint(' + argument0 + ', ' + argument1 + ')';
    } else if (type == 'float') {
        var code = 'random.uniform(' + argument0 + ', ' + argument1 + ')';
    }
    return [code, generator.ORDER_UNARY_POSTFIX];
}

export const math_map = function (_, generator) {
    var value_num = generator.valueToCode(this, 'NUM', generator.ORDER_NONE);
    var value_fl = generator.valueToCode(this, 'fromLow', generator.ORDER_ATOMIC);
    var value_fh = generator.valueToCode(this, 'fromHigh', generator.ORDER_ATOMIC);
    var value_tl = generator.valueToCode(this, 'toLow', generator.ORDER_ATOMIC);
    var value_th = generator.valueToCode(this, 'toHigh', generator.ORDER_ATOMIC);
    generator.setups_["mixly_mapping"] = "def mixly_mapping(v, al, ah, bl, bh):\n" +
        "    return bl +  (bh - bl) * (v - al) / (ah - al)\n"
    var code = 'mixly_mapping(' + value_num + ', ' + value_fl + ', ' + value_fh + ', ' + value_tl + ', ' + value_th + ')';
    return [code, generator.ORDER_NONE];
}

export const math_constrain = function (_, generator) {
    // Constrain a number between two limits.
    var argument0 = generator.valueToCode(this, 'VALUE',
        generator.ORDER_NONE) || '0';
    var argument1 = generator.valueToCode(this, 'LOW',
        generator.ORDER_NONE) || '0';
    var argument2 = generator.valueToCode(this, 'HIGH',
        generator.ORDER_NONE) || '0';
    var code = 'min(max(' + argument0 + ', ' + argument1 + '), ' + argument2 + ')';
    return [code, generator.ORDER_UNARY_POSTFIX];
}

export const math_number_base_conversion = function (a, generator) {
    var c1 = a.getFieldValue("OP");
    var d = generator.valueToCode(this, 'NUM', generator.ORDER_NONE) || '0';
    var c2 = a.getFieldValue("OP2");
    generator.definitions_['import_math'] = "import math";
    var param1 = "";
    var param2 = "10";
    if (c1 == "two") {
        param2 = '2';
    } else if (c1 == "eight") {
        param2 = '8'
    } else if (c1 == "ten") {
        param2 = '10'
    } else if (c1 == "sixteen") {
        param2 = '16'
    }

    if (c2 == "two") {
        param1 = 'bin';
    } else if (c2 == "eight") {
        param1 = 'oct'
    } else if (c2 == "ten") {
        param1 = ''
    } else if (c2 == "sixteen") {
        param1 = 'hex'
    }
    if (param1 == "") {
        var code = "int(str(" + d + "), " + param2 + ")";
    } else {
        var code = param1 + "(int(str(" + d + "), " + param2 + "))";

    }
    return [code, generator.ORDER_ATOMIC];
    /*
    switch (c1) {
      case "two":
      switch (c2){
        case "two":
        var code = '\'{0:b}\''+ '.' + 'format' + '(' + '0b' + '('+d +')'+')';
        return [code, generator.ORDER_ATOMIC];
        break;
        case "eight":
        var code = '\'{0:o}\''+ '.' + 'format'+ '(' + '0b' +'('+d +')'+')';
        return [code, generator.ORDER_ATOMIC];
        break;
        case "ten":
        var code ='int'+  '(' + d +','+'2'+')';
        return [code, generator.ORDER_ATOMIC];
        break;
        case "sixteen":
        var code = '\'{0:x}\''+ '.' + 'format' + '(' + '0b' +'('+d +')'+')';
        return [code, generator.ORDER_ATOMIC];
        break;
      }
      break;
      case "eight":
      switch (c2){
        case "two":
        var code = '\'{0:b}\''+ '.' + 'format' + '(' + '0o' + '('+d +')' +')';
        return [code, generator.ORDER_ATOMIC];
        break;
        case "eight":
        var code = '\'{0:o}\''+ '.' + 'format'+ '(' + '0o' + '('+d +')' +')';
        return [code, generator.ORDER_ATOMIC];
        break;
        case "ten":
        var code ='int'+  '(' +d +','+'8'+')';
        return [code, generator.ORDER_ATOMIC];
        break;
        case "sixteen":
        var code = '\'{0:x}\''+ '.' + 'format' + '(' + '0o' + '('+d +')' +')';
        return [code, generator.ORDER_ATOMIC];
        break;
      }
      break;
      case "ten":
      switch (c2){
        case "two":
        var code = '\'{0:b}\''+ '.' + 'format' + '('  + d  +')';
        return [code, generator.ORDER_ATOMIC];
        break;
        case "eight":
        var code = '\'{0:o}\''+ '.' + 'format'+ '('  + d  +')';
        return [code, generator.ORDER_ATOMIC];
        break;
        case "ten":
        var code ='int'+  '(' +d +','+'10'+')';
        return [code, generator.ORDER_ATOMIC];
        break;
        case "sixteen":
        var code = '\'{0:x}\''+ '.' + 'format' + '('  + d  +')';
        return [code, generator.ORDER_ATOMIC];
        break;
      }
      break;
      case "sixteen":
      switch (c2){
        case "two":
        var code = '\'{0:b}\''+ '.' + 'format' + '(' + '0x' + '('+d +')' +')';
        return [code, generator.ORDER_ATOMIC];
        break;
        case "eight":
        var code = '\'{0:o}\''+ '.' + 'format'+ '(' + '0x' + '('+d +')' +')';
        return [code, generator.ORDER_ATOMIC];
        break;
        case "ten":
        var code ='int'+  '(' +d +','+'16'+')';
        return [code, generator.ORDER_ATOMIC];
        break;
        case "sixteen":
        var code = '\'{0:x}\''+ '.' + 'format' + '(' + '0x' + '('+d +')' +')';
        return [code, generator.ORDER_ATOMIC];
        break;
      }
      break;
      default:
    }
    */
}

export const math_random_seed = function (_, generator) {
    // Random integer between [X] and [Y].
    generator.definitions_.import_random = "import random";
    var a = generator.valueToCode(this, 'NUM', generator.ORDER_NONE) || '0';
    var code = 'random.seed(' + a + ');' + '\n';
    return code;
}

export const math_indexer_number = function (_, generator) {
    var code = this.getFieldValue('NUM');
    // -4.abs() returns -4 in Dart due to strange order of operation choices.
    // -4 is actually an operator and a number.  Reflect this in the order.
    var order = code < 0 ?
        generator.ORDER_UNARY_PREFIX : generator.ORDER_ATOMIC;
    return [code, order];
}

export const base_map = math_map;