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
    var code = 'pandas.read_csv(' + fn + ', header=' + mode + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const dataframe_get = function (_, generator) {
    var mode = this.getFieldValue('MODE');
    var varName = generator.valueToCode(this, 'DICT', generator.ORDER_ASSIGNMENT) || '0';
    var text = generator.valueToCode(this, 'KEY', generator.ORDER_ASSIGNMENT);
    if (mode == "column") {
        var code = varName + "[" + text + "]";
    }
    else if (mode == 'raw') {
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
    generator.definitions_.import_matplotlib_pyplot = 'import matplotlib.pyplot as plt';
    var code = 'plt.show()\n';
    return code;
}

export const plot_axes = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = 'import matplotlib.pyplot as plt';
    var code = 'plt.axes(aspect=1)\n';
    return code;
}

export const plot_plot_easy = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = 'import matplotlib.pyplot as plt';
    var varName = generator.valueToCode(this, 'SER', generator.ORDER_ASSIGNMENT) || '0';
    var code = 'plt.plot(' + varName + ")\n";
    return code;
}

export const plot_plot = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = 'import matplotlib.pyplot as plt';
    var line = this.getFieldValue('LINE');
    var color = this.getFieldValue('COLOR');
    var dot = this.getFieldValue('DOT');
    var varName = generator.valueToCode(this, 'SER', generator.ORDER_ASSIGNMENT) || '0';
    var code = 'plt.plot(' + varName + ", '" + dot + line + color + "')\n";
    return code;
}

export const plot_legend = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = 'import matplotlib.pyplot as plt';
    generator.definitions_.import_matplotlib_font_manager = "import matplotlib.font_manager";
    var code = 'plt.legend(' + 'prop=matplotlib.font_manager.FontProperties("' + "STSong" + '")' + ')\n';
    return code;
}

export const plot_title = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = 'import matplotlib.pyplot as plt';
    var a = generator.valueToCode(this, 'TITLE', generator.ORDER_ATOMIC);
    var code = 'plt.title(' + a + ', fontproperties="' + "STSong" + '")\n';
    return code;
}

export const plot_label = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = 'import matplotlib.pyplot as plt';
    var direction = this.getFieldValue('DIR');
    var a = generator.valueToCode(this, 'LABEL', generator.ORDER_ATOMIC);
    var code = 'plt.' + direction + 'label(' + a + ', fontproperties="' + "STSong" + '")\n';
    return code;
}

export const plot_plot_bar = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = 'import matplotlib.pyplot as plt';
    var direction = this.getFieldValue('DIR');
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var code = 'plt.' + direction + '(' + a + ', ' + b + ")\n";
    return code;
}

export const plot_plot_scatter = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = 'import matplotlib.pyplot as plt';
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var s = generator.valueToCode(this, 'S', generator.ORDER_ATOMIC) || '\'\'';
    var color = this.getFieldValue('COLOR');
    var dot = this.getFieldValue('DOT');
    var tag = generator.valueToCode(this, 'TAG', generator.ORDER_ATOMIC) || '\'\'';
    var code = 'plt.scatter(' + a + ', ' + b + ", s=" + s + ", c='" + color + "', marker='" + dot + "', label=" + tag + ")\n";
    return code;
}

export const plot_plot_xy = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = 'import matplotlib.pyplot as plt';
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var line = this.getFieldValue('LINE');
    var color = this.getFieldValue('COLOR');
    var dot = this.getFieldValue('DOT');
    var tag = generator.valueToCode(this, 'TAG', generator.ORDER_ATOMIC) || '\'\'';
    var code = 'plt.plot(' + a + ', ' + b + ", '" + dot + line + color + "'" + ', label=' + tag + ")\n";
    return code;
}

export const plot_bar = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = 'import matplotlib.pyplot as plt';
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var tag = generator.valueToCode(this, 'TAG', generator.ORDER_ATOMIC) || '\'\'';
    var width = generator.valueToCode(this, 'WIDTH', generator.ORDER_RELATIONAL) || '0';
    var color = this.getFieldValue('COLOR')
    var align = this.getFieldValue('ALIGN');
    var code = 'plt.bar(' + a + ', ' + b + ', align="' + align + '", color="' + color + '", width=' + width + ', label=' + tag + ")\n";
    return code;
}

export const plot_pie = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = 'import matplotlib.pyplot as plt';
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var explode = generator.valueToCode(this, 'EXPLODE', generator.ORDER_ATOMIC) || '\'\'';
    var shadow = this.getFieldValue('SHADOW');
    var autopct = this.getFieldValue('autopct');
    if (autopct != 'None') { autopct = "'" + autopct + "'" }
    var code = 'plt.pie(' + a + ', explode=' + explode + ', labels=' + b + ', autopct=' + autopct + ', shadow=' + shadow + ")\n";
    return code;
}

export const plot_hist = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = 'import matplotlib.pyplot as plt';
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var code = 'plt.hist(' + a + ', ' + b + ")\n";
    return code;
}

export const plot_ticks = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = 'import matplotlib.pyplot as plt';
    var direction = this.getFieldValue('DIR');
    var a = generator.valueToCode(this, 'A', generator.ORDER_ATOMIC) || '\'\'';
    var b = generator.valueToCode(this, 'B', generator.ORDER_ATOMIC) || '\'\'';
    var code = 'plt.' + direction + 'ticks(' + a + ', ' + b + ", fontproperties = '" + "STSong" + "')\n";
    return code;
}

export const plot_subplot = function (_, generator) {
    generator.definitions_.import_numpy = "import numpy";
    generator.definitions_.import_matplotlib_pyplot = 'import matplotlib.pyplot as plt';
    var from = generator.valueToCode(this, "VET", generator.ORDER_NONE) || "0";
    var end = generator.valueToCode(this, "HOR", generator.ORDER_NONE) || "0";
    var step = generator.valueToCode(this, "NUM", generator.ORDER_NONE) || "0";
    var code = "plt.subplot(" + from + ", " + end + ", " + step + ")\n";
    return code
}

export const plot_savefig = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = 'import matplotlib.pyplot as plt';
    var code = "plt.savefig('1.png')\n";
    return code;
}

export const plot_text = function (_, generator) {
    generator.definitions_.import_numpy = "import numpy";
    generator.definitions_.import_matplotlib_pyplot = 'import matplotlib.pyplot as plt';
    var from = generator.valueToCode(this, "VET", generator.ORDER_NONE) || "0";
    var end = generator.valueToCode(this, "HOR", generator.ORDER_NONE) || "0";
    var step = generator.valueToCode(this, "NUM", generator.ORDER_NONE) || "0";
    var halign = this.getFieldValue('HALIGN');
    var valign = this.getFieldValue('VALIGN');
    var fontnum = generator.valueToCode(this, 'FONTNUM', generator.ORDER_ASSIGNMENT) || '0';
    var code = "plt.text(" + from + ", " + end + ", " + step + ", ha='" + halign + "', va='" + valign + "', fontsize=" + fontnum + ")\n";
    return code
}

export const numpy_shape = function (block, generator) {
    generator.definitions_.import_numpy = "import numpy";
    var array = generator.valueToCode(block, 'ARRAY', generator.ORDER_ATOMIC) || '[]';
    var code = 'numpy.shape(' + array + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const numpy_reshape = function (block, generator) {
    generator.definitions_.import_numpy = "import numpy";
    var array = generator.valueToCode(block, 'ARRAY', generator.ORDER_ATOMIC) || '[]';
    var dimensions = generator.valueToCode(block, 'DIMENSIONS', generator.ORDER_ATOMIC) || '(1, -1)';
    var code = 'numpy.reshape(' + array + ', ' + dimensions + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const numpy_astype = function (block, generator) {
    generator.definitions_.import_numpy = "import numpy";
    var array = generator.valueToCode(block, 'ARRAY', generator.ORDER_ATOMIC) || '[]';
    var dtype = block.getFieldValue('TYPE');
    var code = array + '.astype(' + dtype + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const pylab_imshow = function (block, generator) {
    generator.definitions_.import_pylab = "import pylab";
    var array = generator.valueToCode(block, 'ARRAY', generator.ORDER_ATOMIC) || '[]';
    var colormap = block.getFieldValue('COLORMAP') || 'gray';
    var code = 'pylab.imshow(' + array + ', cmap="' + colormap + '")\n';
    return code;
}

export const numpy_mean_digit = function (block, generator) {
    generator.definitions_.import_numpy = "import numpy";
    var X = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || '[]';
    var y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || '[]';
    var digit = generator.valueToCode(block, 'DIGIT', generator.ORDER_ATOMIC) || '0';
    var code = 'numpy.mean(' + X + '[' + y + ' == ' + digit + '], axis=0)';
    return [code, generator.ORDER_ATOMIC];
}

export const numpy_argmin_template_match = function (block, generator) {
    generator.definitions_.import_numpy = "import numpy";
    generator.definitions_.import_cv2 = "import cv2";
    var image = generator.valueToCode(block, 'IMAGE', generator.ORDER_ATOMIC) || '[]';
    var templates = generator.valueToCode(block, 'TEMPLATES', generator.ORDER_ATOMIC) || '[]';
    var code = 'numpy.argmin([numpy.sum(cv2.absdiff(' + image + ', template)) for template in ' + templates + '])';
    return [code, generator.ORDER_ATOMIC];
}

export const numpy_mean = function (block, generator) {
    generator.definitions_.import_numpy = "import numpy";
    var array = generator.valueToCode(block, 'ARRAY', generator.ORDER_ATOMIC) || '[]';
    var axis = block.getFieldValue('AXIS');
    if (axis === 'NONE') {
        var code = 'numpy.mean(' + array + ')';
    } else {
        var code = 'numpy.mean(' + array + ', axis=' + axis + ')';
    }
    return [code, generator.ORDER_ATOMIC];
}

export const numpy_std = function (block, generator) {
    generator.definitions_.import_numpy = "import numpy";
    var array = generator.valueToCode(block, 'ARRAY', generator.ORDER_ATOMIC) || '[]';
    var axis = block.getFieldValue('AXIS');
    if (axis === 'NONE') {
        var code = 'numpy.std(' + array + ')';
    } else {
        var code = 'numpy.std(' + array + ', axis=' + axis + ')';
    }
    return [code, generator.ORDER_ATOMIC];
}

export const pandas_dropna = function (block, generator) {
    generator.definitions_.import_pandas = "import pandas";
    var df = generator.valueToCode(block, 'DF', generator.ORDER_ATOMIC) || 'df';

    var code = df + '.dropna()';

    return [code, generator.ORDER_MEMBER];
}

export const pandas_drop_columns = function (block, generator) {
    generator.definitions_.import_pandas = "import pandas";
    var dataframe = generator.valueToCode(block, 'DATAFRAME', generator.ORDER_ATOMIC) || 'df';
    var columns = generator.valueToCode(block, 'COLUMNS', generator.ORDER_ATOMIC) || '[]';
    var code = dataframe + '.drop(columns=' + columns + ', axis=1)';
    return [code, generator.ORDER_ATOMIC];
}

export const numpy_ones = function (block, generator) {
    generator.definitions_.import_numpy = "import numpy";
    var num = generator.valueToCode(block, 'NUM', generator.ORDER_ATOMIC) || '1';
    var code = 'numpy.ones(' + num + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const numpy_c_ = function (block, generator) {
    generator.definitions_.import_numpy = "import numpy";
    var array1 = generator.valueToCode(block, 'ARRAY1', generator.ORDER_ATOMIC) || '[]';
    var array2 = generator.valueToCode(block, 'ARRAY2', generator.ORDER_ATOMIC) || '[]';
    var code = 'numpy.c_[' + array1 + ', ' + array2 + ']';
    return [code, generator.ORDER_ATOMIC];
}

export const numpy_linalg_det = function (block, generator) {
    generator.definitions_.import_numpy = "import numpy";
    generator.definitions_.import_linalg = "import numpy.linalg";
    var array = generator.valueToCode(block, 'ARRAY', generator.ORDER_ATOMIC) || '[]';
    var code = 'numpy.linalg.det(' + array + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const matrix_transpose = function (block, generator) {
    var matrix = generator.valueToCode(block, 'MATRIX', generator.ORDER_ATOMIC) || '[]';
    var code = matrix + '.T';
    return [code, generator.ORDER_ATOMIC];
}

export const matrix_multiplication = function (block, generator) {
    var matrix1 = generator.valueToCode(block, 'MATRIX1', generator.ORDER_ATOMIC) || '[]';
    var matrix2 = generator.valueToCode(block, 'MATRIX2', generator.ORDER_ATOMIC) || '[]';
    var code = matrix1 + ' @ ' + matrix2;
    return [code, generator.ORDER_ATOMIC];
}

export const numpy_linalg_inv = function (block, generator) {
    generator.definitions_.import_numpy = "import numpy";
    generator.definitions_.import_linalg = "import numpy.linalg";
    var array = generator.valueToCode(block, 'ARRAY', generator.ORDER_ATOMIC) || '[]';
    var code = 'numpy.linalg.inv(' + array + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const dataframe_median = function (block, generator) {
    var dataframe = generator.valueToCode(block, 'DATAFRAME', generator.ORDER_ATOMIC) || 'df';
    var code = dataframe + '.median()';
    return [code, generator.ORDER_ATOMIC];
}

export const dataframe_fillna = function (block, generator) {
    var dataframe = generator.valueToCode(block, 'DATAFRAME', generator.ORDER_ATOMIC) || 'df';
    var value = generator.valueToCode(block, 'VALUE', generator.ORDER_ATOMIC) || '0';
    var inplace = block.getFieldValue('INPLACE') || 'False';
    var code = dataframe + '.fillna(value=' + value + ', inplace=' + inplace + ')\n';
    return code;
}

export const dataframe_info = function (block, generator) {
    var dataframe = generator.valueToCode(block, 'DATAFRAME', generator.ORDER_ATOMIC) || 'df';
    var code = dataframe + '.info()';
    return [code, generator.ORDER_ATOMIC];
}

export const numpy_min = function (block, generator) {
    generator.definitions_.import_numpy = "import numpy";
    var array = generator.valueToCode(block, 'ARRAY', generator.ORDER_ATOMIC) || '[]';
    var axis = block.getFieldValue('AXIS');
    var code = (axis === 'None') ? 'numpy.min(' + array + ')' : 'numpy.min(' + array + ', axis=' + axis + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const numpy_max = function (block, generator) {
    generator.definitions_.import_numpy = "import numpy";
    var array = generator.valueToCode(block, 'ARRAY', generator.ORDER_ATOMIC) || '[]';
    var axis = block.getFieldValue('AXIS');
    var code = (axis === 'None') ? 'numpy.max(' + array + ')' : 'numpy.max(' + array + ', axis=' + axis + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const numpy_size = function (block, generator) {
    generator.definitions_.import_numpy = "import numpy";
    var array = generator.valueToCode(block, 'ARRAY', generator.ORDER_ATOMIC) || '[]';
    var code = array + '.size';
    return [code, generator.ORDER_ATOMIC];
}

export const numpy_dot = function (block, generator) {
    generator.definitions_.import_numpy = "import numpy";
    var array1 = generator.valueToCode(block, 'ARRAY1', generator.ORDER_ATOMIC) || '[]';
    var array2 = generator.valueToCode(block, 'ARRAY2', generator.ORDER_ATOMIC) || '[]';
    var code = 'numpy.dot(' + array1 + ', ' + array2 + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const numpy_square = function (block, generator) {
    generator.definitions_.import_numpy = "import numpy";
    var array = generator.valueToCode(block, 'ARRAY', generator.ORDER_ATOMIC) || '[]';
    var code = 'numpy.square(' + array + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const numpy_sum = function (block, generator) {
    generator.definitions_.import_numpy = "import numpy";
    var array = generator.valueToCode(block, 'ARRAY', generator.ORDER_ATOMIC) || '[]';
    var code = 'numpy.sum(' + array + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const numpy_random_random = function (block, generator) {
    generator.definitions_.import_numpy = "import numpy";
    var size = generator.valueToCode(block, 'SIZE', generator.ORDER_ATOMIC) || '1';
    var code = 'numpy.random.random(' + size + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const py_sum = function (block, generator) {
    var array = generator.valueToCode(block, 'ARRAY', generator.ORDER_ATOMIC) || '[]';
    var code = 'sum(' + array + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const dataframe_sort_values = function (block, generator) {
    const dict = generator.valueToCode(block, 'DICT', generator.ORDER_ATOMIC) || 'df';
    const key = generator.valueToCode(block, 'KEY', generator.ORDER_ATOMIC) || '\'tag\'';
    const ascending = block.getFieldValue('AS_CENDING');
    const code = `${dict}.sort_values(by=${key}, ascending=${ascending})`;
    return [code, generator.ORDER_ATOMIC];
}

export const dataframe_head_tail = function (block, generator) {
    const dict = generator.valueToCode(block, 'DICT', generator.ORDER_ATOMIC) || 'df';
    const lines = generator.valueToCode(block, 'LINES', generator.ORDER_ATOMIC) || '1';
    const type = block.getFieldValue('TYPE');
    const code = `${dict}.${type}(${lines})`;
    return [code, generator.ORDER_ATOMIC];
}

export const dataframe_select = function (block, generator) {
    const dict = generator.valueToCode(block, 'DICT', generator.ORDER_ATOMIC) || 'df';
    const key = generator.valueToCode(block, 'KEY', generator.ORDER_ATOMIC) || 'df[\'tag\'] > 1';
    const code = `${dict}[${key}]`;
    return [code, generator.ORDER_ATOMIC];
}

export const dataframe_groupby = function (block, generator) {
    const dict = generator.valueToCode(block, 'DICT', generator.ORDER_ATOMIC) || 'df';
    const key = generator.valueToCode(block, 'KEY', generator.ORDER_ATOMIC) || '\'tag\'';
    const code = `${dict}.groupby(by=${key})`;
    return [code, generator.ORDER_ATOMIC];
}

export const dataframe_aggregate_func = function (block, generator) {
    const dict = generator.valueToCode(block, 'DICT', generator.ORDER_ATOMIC) || 'df';
    const type = block.getFieldValue('TYPE');
    const code = `${dict}.${type}()`;
    return [code, generator.ORDER_ATOMIC];
}

export const plot_cla = function (_, generator) {
    generator.definitions_.import_matplotlib_pyplot = 'import matplotlib.pyplot as plt';
    var code = 'plt.cla()\n';
    return code;
}