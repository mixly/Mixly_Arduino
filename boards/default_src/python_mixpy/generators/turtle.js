import * as Blockly from 'blockly/core';

export const turtle_create = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    //var size=window.parseFloat(this.getFieldValue('SIZE'));

    //generator.definitions_['var_declare'+varName] = varName+'= '+ 'turtle.Turtle()\n';
    var code = varName + ' = ' + 'turtle.Turtle()\n';
    return code;
    // return '';
}

export const turtle_done = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var code = 'turtle.done()\n';
    return code;
}

export const turtle_exitonclick = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var code = 'turtle.exitonclick()\n';
    return code;
}

export const turtle_move = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var direction = this.getFieldValue('DIR');
    var num = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = varName + "." + direction + "(" + num + ')\n';
    return code;
}

export const turtle_rotate = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var direction = this.getFieldValue('DIR');
    var num = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = varName + "." + direction + "(" + num + ')\n';
    return code;
}

export const turtle_setheading = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var argument = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.setheading(' + argument + ')\n';
    return code;
}

export const turtle_screen_delay = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var argument = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.screen.delay(' + argument + ')\n';
    return code;
}

export const turtle_goto = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var xnum = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT) || '0';
    var ynum = generator.valueToCode(this, 'val', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.goto(' + xnum + ',' + ynum + ')\n';
    return code;
}

export const turtle_pos_shape = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var get = this.getFieldValue('DIR');
    var code = varName + '.' + get + '()';
    return [code, generator.ORDER_ATOMIC];
}

export const turtle_clear = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var clear = this.getFieldValue('DIR');
    var code = varName + "." + clear + "(" + ')\n';
    return code;
}

export const turtle_penup = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var penup = this.getFieldValue('DIR');
    var code = varName + "." + penup + "(" + ')\n';
    return code;
}

export const turtle_fill = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var penup = this.getFieldValue('DIR');
    var code = varName + "." + penup + "_fill(" + ')\n';
    return code;
}

export const turtle_size_speed = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = this.getFieldValue('TUR');
    var size = this.getFieldValue('DIR');
    var num = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = varName + "." + size + "(" + num + ')\n';
    return code;
}

export const turtle_size = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var argument = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.pensize(' + argument + ')\n';
    return code;
}

export const turtle_speed = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var argument = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.speed(' + argument + ')\n';
    return code;
}

export const turtle_circle = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var circle = this.getFieldValue('DIR');
    var num = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = varName + "." + circle + "(" + num + ')\n';
    return code;
}

export const turtle_setxy = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var xy = this.getFieldValue('DIR');
    var num = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = varName + ".set" + xy + "(" + num + ')\n';
    return code;
}

export const turtle_circle_advanced = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var argument = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT) || '0';
    var num = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = varName + ".circle (" + num + ',' + argument + ')\n';
    return code;
}

export const turtle_visible = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var visible = this.getFieldValue('DIR');
    var code = varName + "." + visible + "(" + ')\n';
    return code;
}

export const turtle_bgcolor = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var color = this.getFieldValue('FIELDNAME');
    var code = "turtle." + 'bgcolor' + '("' + color + '")\n';
    return code;
}

export const turtle_pencolor = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var color = this.getFieldValue('FIELDNAME');
    var code = varName + "." + 'pencolor' + '("' + color + '")\n';
    return code;
}

export const turtle_fillcolor = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var color = this.getFieldValue('FIELDNAME');
    var code = varName + "." + 'fillcolor' + '("' + color + '")\n';
    return code;
}

export const turtle_clone = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.clone()';
    return [code, generator.ORDER_ATOMIC];
}

export const turtle_bgcolor_hex = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var color = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "turtle." + 'bgcolor' + '(' + color + ')\n';
    return code;
}

export const turtle_pencolor_hex = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var color = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    //var color = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + "." + 'pencolor' + '(' + color + ')\n';
    return code;
}

export const turtle_fillcolor_hex = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var color = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = varName + "." + 'fillcolor' + '(' + color + ')\n';
    return code;
}

export const turtle_bgcolor_hex_new = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var color = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = "turtle." + 'bgcolor' + '(' + color + ')\n';
    return code;
}

export const turtle_pencolor_hex_new = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var color = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    //var color = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + "." + 'pencolor' + '(' + color + ')\n';
    return code;
}

export const turtle_fillcolor_hex_new = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var color = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = varName + "." + 'fillcolor' + '(' + color + ')\n';
    return code;
}

export const turtle_color_hex = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var color1 = generator.valueToCode(this, 'VAR1', generator.ORDER_ATOMIC);
    var color2 = generator.valueToCode(this, 'VAR2', generator.ORDER_ATOMIC);
    var code = varName + "." + 'color' + '(' + color1 + ',' + color2 + ')\n';
    return code;
}

export const turtle_color = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var color1 = this.getFieldValue('FIELDNAME');
    var color2 = this.getFieldValue('FIELDNAME2');
    var code = varName + "." + 'color' + '("' + color1 + '","' + color2 + '")\n';
    return code;
}

export const turtle_shape = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var direction = this.getFieldValue('DIR');

    var code = varName + ".shape('" + direction + "')\n";
    return code;
}

export const turtle_shapesize = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var argument1 = generator.valueToCode(this, 'WID', generator.ORDER_ASSIGNMENT) || '0';
    var argument2 = generator.valueToCode(this, 'LEN', generator.ORDER_ASSIGNMENT) || '0';
    var argument3 = generator.valueToCode(this, 'OUTLINE', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + ".shapesize(" + argument1 + ',' + argument2 + ',' + argument3 + ')\n';
    return code;
}

export const turtle_textinput = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var title = generator.valueToCode(this, 'TITLE', generator.ORDER_ATOMIC);
    var prompt = generator.valueToCode(this, 'PROMPT', generator.ORDER_ATOMIC);
    var code = "turtle.textinput" + '(' + title + ',' + prompt + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const turtle_numinput = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var title = generator.valueToCode(this, 'TITLE', generator.ORDER_ATOMIC);
    var prompt = generator.valueToCode(this, 'PROMPT', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'DEFAULT', generator.ORDER_ATOMIC);
    var min = generator.valueToCode(this, 'MIN', generator.ORDER_ATOMIC);
    var max = generator.valueToCode(this, 'MAX', generator.ORDER_ATOMIC);
    var code = "turtle.numinput" + '(' + title + ',' + prompt + "," + data + ',minval = ' + min + ',maxval = ' + max + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const turtle_write = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var write = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    //var color = generator.valueToCode(this, 'data', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + "." + 'write' + '(' + write + ')\n';
    return code;
}

export const turtle_write_format = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var move = this.getFieldValue('MOVE');
    var align = this.getFieldValue('ALIGN');
    var fontname = generator.valueToCode(this, 'FONTNAME', generator.ORDER_ATOMIC);
    var fontnum = generator.valueToCode(this, 'FONTNUM', generator.ORDER_ASSIGNMENT) || '0';
    var fonttype = this.getFieldValue('FONTTYPE');
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var write = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = varName + "." + 'write' + '(' + write + ',' + move + ',align="' + align + '",font=(' + fontname + ',' + fontnum + ',"' + fonttype + '"))\n';
    return code;
}

export const turtle_write_format_skulpt = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var move = this.getFieldValue('MOVE');
    var align = this.getFieldValue('ALIGN');
    var fontname = generator.valueToCode(this, 'FONTNAME', generator.ORDER_ATOMIC);
    var fontnum = generator.valueToCode(this, 'FONTNUM', generator.ORDER_ASSIGNMENT) || '0';
    var fonttype = this.getFieldValue('FONTTYPE');
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var write = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC);
    var code = varName + "." + 'write' + '(' + write + ',' + move + ',align="' + align + '",font=(' + fontname + ',' + fontnum + ',"' + fonttype + '"))\n';
    return code;
}

export const turtle_color_seclet = function (_, generator) {
    var colour = this.getFieldValue('COLOR');
    var code = '"' + colour + '"'
    return [code, generator.ORDER_ATOMIC];
}

export const turtle_getscreen = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var turName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var code = varName + ' = ' + turName + '.getscreen()\n';
    return code;
}

export const turtle_onkey = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var v = generator.valueToCode(this, "VAR", generator.ORDER_NONE) || "None";
    var callback = generator.valueToCode(this, "callback", generator.ORDER_NONE) || "None";
    var code = varName + ".onkey(" + callback + ", " + v + ")\n";
    return code;
}

export const turtle_onclick = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var callback = generator.valueToCode(this, "callback", generator.ORDER_NONE) || "None";
    var code = varName + ".onclick(" + callback + ")\n";
    return code;
}

export const turtle_ontimer = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var v = generator.valueToCode(this, "VAR", generator.ORDER_NONE) || "None";
    var callback = generator.valueToCode(this, "callback", generator.ORDER_NONE) || "None";
    var code = varName + ".ontimer(" + callback + ", " + v + ")\n";
    return code;
}

export const turtle_listen = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var code = varName + '.listen()\n';
    return code;
}

export const turtle_screen_savefig = function (_, generator) {
    generator.definitions_.import_turtle = "import turtle";
    var varName = generator.valueToCode(this, 'TUR', generator.ORDER_ASSIGNMENT) || '0';
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var code = varName + ".getcanvas().postscript(file=" + file + ")\n";
    return code;
}