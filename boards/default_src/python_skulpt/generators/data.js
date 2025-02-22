import * as Blockly from 'blockly/core';

export const series_create = function (_, generator) {
    generator.definitions_.import_pandas = "import pandas";
    var varName1 = generator.valueToCode(this, 'SER', generator.ORDER_ASSIGNMENT) || '0';
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var code = varName + ' = ' + 'pandas.Series(' + varName1 + ')\n';
    return code;
}

export const series_create_from_index = function (_, generator) {
    generator.definitions_.import_pandas = "import pandas";
    var varName1 = generator.valueToCode(this, 'SER', generator.ORDER_ASSIGNMENT) || '0';
    var varName2 = generator.valueToCode(this, 'INDEX', generator.ORDER_ATOMIC) || '\'\'';
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var code = varName + ' = ' + 'pandas.Series(' + varName1 + ',' + 'index=' + varName2 + ')\n';
    return code;
}

export const dataframe_create = function (_, generator) {
    generator.definitions_.import_pandas = "import pandas";
    var varName1 = generator.valueToCode(this, 'SER', generator.ORDER_ASSIGNMENT) || '0';
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var code = varName + ' = ' + 'pandas.DataFrame(' + varName1 + ')\n';
    return code;
}

export const dataframe_create_from_index = function (_, generator) {
    generator.definitions_.import_pandas = "import pandas";
    var varName1 = generator.valueToCode(this, 'SER', generator.ORDER_ASSIGNMENT) || '0';
    var varName2 = generator.valueToCode(this, 'INDEX_COLUMN', generator.ORDER_ATOMIC) || '\'\'';
    var varName3 = generator.valueToCode(this, 'INDEX_RAW', generator.ORDER_ATOMIC) || '\'\'';
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var code = varName + ' = ' + 'pandas.DataFrame(' + varName1 + ',' + 'columns=' + varName2 + ',index=' + varName3 + ')\n';
    return code;
}

export const dataframe_create_from_one_index = function (_, generator) {
    generator.definitions_.import_pandas = "import pandas";
    var name = this.getFieldValue('COLUMN_RAW');
    var varName1 = generator.valueToCode(this, 'SER', generator.ORDER_ASSIGNMENT) || '0';
    var varName2 = generator.valueToCode(this, 'INDEX', generator.ORDER_ATOMIC) || '\'\'';
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var code = varName + ' = ' + 'pandas.DataFrame(' + varName1 + ',' + name + '=' + varName2 + ')\n';
    return code;
}

export const series_create_from_text = function (_, generator) {
    generator.definitions_.import_pandas = "import pandas";
    var varName = generator.variableDB_.getName(this.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    var text = this.getFieldValue('TEXT');
    var code = varName + ' = ' + 'pandas.Series([' + text + '])\n';
    return code;
}

export const series_index_value = function (_, generator) {
    generator.definitions_.import_pandas = "import pandas";
    var varName = generator.valueToCode(this, 'SERIES', generator.ORDER_ASSIGNMENT) || '0';
    var name = this.getFieldValue('INDEX_VALUE');
    var code = varName + '.' + name;
    return [code, generator.ORDER_ATOMIC];
}

export const series_get_num = function (_, generator) {
    // Indexing into a list is the same as indexing into a string.
    var varName = generator.valueToCode(this, 'SER', generator.ORDER_ASSIGNMENT) || '0';
    var argument0 = generator.valueToCode(this, 'AT',
        generator.ORDER_ADDITIVE) || '1';
    var code = varName + '[' + argument0 + ']';
    return [code, generator.ORDER_ATOMIC];
}

export const pl_show = function (_, generator) {
    generator.definitions_.import_pylab = "import pylab";
    var code = 'pylab.show()\n';
    return code;
}

export const pl_axes = function (_, generator) {
    generator.definitions_.import_pylab = "import pylab";
    var code = 'pylab.axes(aspect=1)\n';
    return code;
}

export const pl_plot_easy = function (_, generator) {
    generator.definitions_.import_pylab = "import pylab";
    var varName = generator.valueToCode(this, 'SER', generator.ORDER_ASSIGNMENT) || '0';
    var code = 'pylab.plot(' + varName + ")\n";
    return code;
}

export const pl_plot = function (_, generator) {
    generator.definitions_.import_pylab = "import pylab";
    var line = this.getFieldValue('LINE');
    var color = this.getFieldValue('COLOR');
    var dot = this.getFieldValue('DOT');
    var varName = generator.valueToCode(this, 'SER', generator.ORDER_ASSIGNMENT) || '0';
    var code = 'pylab.plot(' + varName + ",'" + dot + line + color + "')\n";
    return code;
}

export const pl_legend = function (_, generator) {
    generator.definitions_.import_pylab = "import pylab";
    generator.definitions_.import_matplotlib_font_manager = "import matplotlib.font_manager";
    var code = 'pylab.legend(' + 'prop=matplotlib.font_manager.FontProperties("' + "STSong" + '")' + ')\n';
    return code;
}

export const pl_title = function (_, generator) {
    generator.definitions_.import_pylab = "import pylab";
    var a = generator.valueToCode(this, 'TITLE', generator.ORDER_ATOMIC);
    var code = 'pylab.title(' + a + ', fontproperties = "' + "STSong" + '")\n';
    return code;
}

export const pl_label = function (_, generator) {
    generator.definitions_.import_pylab = "import pylab";
    var direction = this.getFieldValue('DIR');
    var a = generator.valueToCode(this, 'LABEL', generator.ORDER_ATOMIC);
    var code = 'pylab.' + direction + 'label(' + a + ', fontproperties = "' + "STSong" + '")\n';
    return code;
}

export const array_create = function (_, generator) {
    generator.definitions_.import_numpy = "import numpy";
    var from = generator.valueToCode(this, "FROM", generator.ORDER_NONE) || "0";
    var end = generator.valueToCode(this, "TO", generator.ORDER_NONE) || "0";
    var step = generator.valueToCode(this, "STEP", generator.ORDER_NONE) || "1";
    var code = "numpy.arange(" + from + ", " + end + ", " + step + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const pl_plot_bar = function (_, generator) {
    generator.definitions_.import_pylab = "import pylab";
    var direction = this.getFieldValue('DIR');
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var code = 'pylab.' + direction + '(' + a + ',' + b + ")\n";
    return code;
}

export const pl_plot_scatter = function (_, generator) {
    generator.definitions_.import_pylab = "import pylab";
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var s = generator.valueToCode(this, 'S', generator.ORDER_ATOMIC) || '\'\'';
    var color = this.getFieldValue('COLOR');
    var dot = this.getFieldValue('DOT');
    var tag = generator.valueToCode(this, 'TAG', generator.ORDER_ATOMIC) || '\'\'';
    var code = 'pylab.scatter(' + a + ',' + b + ",s=" + s + ",c='" + color + "',marker='" + dot + "',label=" + tag + ")\n";
    return code;
}

export const pl_plot_xy = function (_, generator) {
    generator.definitions_.import_pylab = "import pylab";
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var line = this.getFieldValue('LINE');
    var color = this.getFieldValue('COLOR');
    var dot = this.getFieldValue('DOT');
    var tag = generator.valueToCode(this, 'TAG', generator.ORDER_ATOMIC) || '\'\'';
    var code = 'pylab.plot(' + a + ',' + b + ",'" + dot + line + color + "'" + ',label=' + tag + ")\n";
    return code;
}

export const pl_bar = function (_, generator) {
    generator.definitions_.import_pylab = "import pylab";
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var tag = generator.valueToCode(this, 'TAG', generator.ORDER_ATOMIC) || '\'\'';
    var width = generator.valueToCode(this, 'WIDTH', generator.ORDER_RELATIONAL) || '0';
    var color = this.getFieldValue('COLOR')
    var align = this.getFieldValue('ALIGN');
    var code = 'pylab.bar(' + a + ',' + b + ',align="' + align + '",color="' + color + '",width=' + width + ',label=' + tag + ")\n";
    return code;
}

export const pl_pie = function (_, generator) {
    generator.definitions_.import_pylab = "import pylab";
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var explode = generator.valueToCode(this, 'EXPLODE', generator.ORDER_ATOMIC) || '\'\'';
    var shadow = this.getFieldValue('SHADOW');
    var autopct = this.getFieldValue('autopct');
    if (autopct != 'None') { autopct = "'" + autopct + "'" }
    var code = 'pylab.pie(' + a + ',explode=' + explode + ',labels=' + b + ',autopct=' + autopct + ',shadow=' + shadow + ")\n";
    return code;
}

export const pl_hist = function (_, generator) {
    generator.definitions_.import_pylab = "import pylab";
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var code = 'pylab.hist(' + a + ',' + b + ")\n";
    return code;
}

export const pl_ticks = function (_, generator) {
    generator.definitions_.import_pylab = "import pylab";
    var direction = this.getFieldValue('DIR');
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var code = 'pylab.' + direction + 'ticks(' + a + ',' + b + ",fontproperties = '" + "STSong" + "')\n";
    return code;
}

export const numpy_trig = function (_, generator) {
    generator.definitions_.import_numpy = "import numpy";
    var argument0 = generator.valueToCode(this, 'NUM', generator.ORDER_NONE) || '0';
    var operator = this.getFieldValue('OP');
    var code = "";
    code = "numpy." + operator + '(' + argument0 + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const pl_subplot = function (_, generator) {
    generator.definitions_.import_numpy = "import numpy";
    var from = generator.valueToCode(this, "VET", generator.ORDER_NONE) || "0";
    var end = generator.valueToCode(this, "HOR", generator.ORDER_NONE) || "0";
    var step = generator.valueToCode(this, "NUM", generator.ORDER_NONE) || "0";
    var code = "pylab.subplot(" + from + ", " + end + ", " + step + ")\n";
    return code
}

export const pandas_readcsv = function (_, generator) {
    // For each loop.
    generator.definitions_.import_pandas = "import pandas";
    var fn = generator.valueToCode(this, 'FILENAME', generator.ORDER_ATOMIC);
    var mode = this.getFieldValue('MODE');
    var code = 'pandas.read_csv(' + fn + ', header=' + mode + ')\n';
    return [code, generator.ORDER_ATOMIC];
}

export const dataframe_get = function (_, generator) {
    var mode = this.getFieldValue('MODE');
    var varName = generator.valueToCode(this, 'DICT', generator.ORDER_ASSIGNMENT) || '0';
    var text = generator.valueToCode(this, 'KEY', generator.ORDER_ASSIGNMENT);
    if (mode == "column") {
        var code = varName + "[" + text + "]";
    } else if (mode == 'raw') {
        var code = varName + ".loc[" + text + "]";
    }
    return [code, generator.ORDER_ATOMIC];
}

export const pl_savefig = function (_, generator) {
    generator.definitions_.import_pylab = "import pylab";
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var code = "pylab.savefig(" + file + ")\n";
    return code;
}

export const pl_text = function (_, generator) {
    generator.definitions_.import_numpy = "import numpy";
    var from = generator.valueToCode(this, "VET", generator.ORDER_NONE) || "0";
    var end = generator.valueToCode(this, "HOR", generator.ORDER_NONE) || "0";
    var step = generator.valueToCode(this, "NUM", generator.ORDER_NONE) || "0";
    var halign = this.getFieldValue('HALIGN');
    var valign = this.getFieldValue('VALIGN');
    var fontnum = generator.valueToCode(this, 'FONTNUM', generator.ORDER_ASSIGNMENT) || '0';
    var code = "pylab.text(" + from + ", " + end + ", " + step + ", ha='" + halign + "', va='" + valign + "', fontsize=" + fontnum + ")\n";
    return code
}

export const array_toarray = function (_, generator) {
    var str = generator.valueToCode(this, 'VAR', generator.ORDER_ATOMIC) || '0';
    generator.definitions_['import_numpy'] = 'import numpy';
    var code = 'numpy.array(' + str + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const plot_show = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var code = 'matplotlib.pyplot.show()\n';
    return code;
}

export const plot_axes = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var code = 'matplotlib.pyplot.axes(aspect=1)\n';
    return code;
}

export const plot_plot_easy = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var varName = generator.valueToCode(this, 'SER', generator.ORDER_ASSIGNMENT) || '0';
    var code = 'matplotlib.pyplot.plot(' + varName + ")\n";
    return code;
}

export const plot_plot = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var line = this.getFieldValue('LINE');
    var color = this.getFieldValue('COLOR');
    var dot = this.getFieldValue('DOT');
    var varName = generator.valueToCode(this, 'SER', generator.ORDER_ASSIGNMENT) || '0';
    var code = 'matplotlib.pyplot.plot(' + varName + ",'" + dot + line + color + "')\n";
    return code;
}

export const plot_legend = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    generator.definitions_.import_matplotlib_font_manager = "import matplotlib.font_manager";
    var code = 'matplotlib.pyplot.legend(' + 'prop=matplotlib.font_manager.FontProperties("' + "STSong" + '")' + ')\n';
    return code;
}

export const plot_title = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var a = generator.valueToCode(this, 'TITLE', generator.ORDER_ATOMIC);
    var code = 'matplotlib.pyplot.title(' + a + ')\n';
    return code;
}

export const plot_label = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var direction = this.getFieldValue('DIR');
    var a = generator.valueToCode(this, 'LABEL', generator.ORDER_ATOMIC);
    var code = 'matplotlib.pyplot.' + direction + 'label(' + a + ')\n';
    return code;
}

export const plot_plot_bar = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var direction = this.getFieldValue('DIR');
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var code = 'matplotlib.pyplot.' + direction + '(' + a + ',' + b + ")\n";
    return code;
}

export const plot_plot_scatter = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var s = generator.valueToCode(this, 'S', generator.ORDER_ATOMIC) || '\'\'';
    var color = this.getFieldValue('COLOR');
    var dot = this.getFieldValue('DOT');
    var tag = generator.valueToCode(this, 'TAG', generator.ORDER_ATOMIC) || '\'\'';
    var code = 'matplotlib.pyplot.scatter(' + a + ',' + b + ",s=" + s + ",color='" + color + "',marker='" + dot + "',label=" + tag + ")\n";
    return code;
}

export const plot_plot_xy = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var line = this.getFieldValue('LINE');
    var color = this.getFieldValue('COLOR');
    var dot = this.getFieldValue('DOT');
    var tag = generator.valueToCode(this, 'TAG', generator.ORDER_ATOMIC) || '\'\'';
    var code = 'matplotlib.pyplot.plot(' + a + ',' + b + ",'" + dot + line + color + "'" + ',label=' + tag + ")\n";
    return code;
}

export const plot_bar = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var tag = generator.valueToCode(this, 'TAG', generator.ORDER_ATOMIC) || '\'\'';
    var width = generator.valueToCode(this, 'WIDTH', generator.ORDER_RELATIONAL) || '0';
    var color = this.getFieldValue('COLOR')
    var align = this.getFieldValue('ALIGN');
    var code = 'matplotlib.pyplot.bar(' + a + ',' + b + ',align="' + align + '",color="' + color + '",width=' + width + ',label=' + tag + ")\n";
    return code;
}

export const plot_pie = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var explode = generator.valueToCode(this, 'EXPLODE', generator.ORDER_ATOMIC) || '\'\'';
    var shadow = this.getFieldValue('SHADOW');
    var autopct = this.getFieldValue('autopct');
    if (autopct != 'None') { autopct = "'" + autopct + "'" }
    var code = 'matplotlib.pyplot.pie(' + a + ',explode=' + explode + ',labels=' + b + ',autopct=' + autopct + ',shadow=' + shadow + ")\n";
    return code;
}

export const plot_hist = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var code = 'matplotlib.pyplot.hist(' + a + ',' + b + ")\n";
    return code;
}

export const plot_ticks = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var direction = this.getFieldValue('DIR');
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var code = 'matplotlib.pyplot.' + direction + 'ticks(' + a + ',' + b + ",fontproperties = '" + "STSong" + "')\n";
    return code;
}

export const plot_subplot = function (_, generator) {
    generator.definitions_.import_numpy = "import numpy";
    generator.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var from = generator.valueToCode(this, "VET", generator.ORDER_NONE) || "0";
    var end = generator.valueToCode(this, "HOR", generator.ORDER_NONE) || "0";
    var step = generator.valueToCode(this, "NUM", generator.ORDER_NONE) || "0";
    var code = "matplotlib.pyplot.subplot(" + from + ", " + end + ", " + step + ")\n";
    return code
}

export const plot_savefig = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var code = "matplotlib.pyplot.savefig('1.png')\n";
    return code;
}

export const plot_text = function (_, generator) {
    generator.definitions_.import_numpy = "import numpy";
    generator.definitions_.import_matplotlib_pyplot = "import matplotlib.pyplot";
    var from = generator.valueToCode(this, "VET", generator.ORDER_NONE) || "0";
    var end = generator.valueToCode(this, "HOR", generator.ORDER_NONE) || "0";
    var step = generator.valueToCode(this, "NUM", generator.ORDER_NONE) || "0";
    var halign = this.getFieldValue('HALIGN');
    var valign = this.getFieldValue('VALIGN');
    var fontnum = generator.valueToCode(this, 'FONTNUM', generator.ORDER_ASSIGNMENT) || '0';
    var code = "matplotlib.pyplot.text(" + from + ", " + end + ", " + step + ", ha='" + halign + "', va='" + valign + "', fontsize=" + fontnum + ")\n";
    return code
}