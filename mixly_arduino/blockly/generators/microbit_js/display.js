'use strict';
goog.provide('Blockly.JavaScript.display');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.monitor_show_number = function() {
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = "basic.showNumber("+ data +");\n";
    return code;
}
Blockly.JavaScript.monitor_show_string = function() {
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = "basic.showString("+ data +");\n";
    return code;
}
Blockly.JavaScript.monitor_show_leds = function() {
    var led_str = '\n';
    for (var row = 0; row < 5; row ++){
        for(var col = 0; col < 5; col ++){
            if(this.getFieldValue('' + row + col) === 'TRUE' ) led_str += '# ';
            else led_str += '. ';
        }
        led_str += '\n';
    }
    var code = "basic.showLeds(`"+ led_str +"`);\n";
    return code;
}

Blockly.JavaScript.monitor_show_arrow = function() {
    var data = this.getFieldValue('arrow')
    var code = "basic.showArrow("+ data +");\n";
    return code;
}

Blockly.JavaScript.monitor_clear_screen = function() {
    return 'basic.clearScreen();\n';
}
Blockly.JavaScript.monitor_plot_point = function() {
    var x = Blockly.JavaScript.valueToCode(this, 'x', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var y = Blockly.JavaScript.valueToCode(this, 'y', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = "led.plot("+ x + ', ' + y +");\n";
    return code;
}
Blockly.JavaScript.monitor_unplot_point = function() {
    var x = Blockly.JavaScript.valueToCode(this, 'x', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var y = Blockly.JavaScript.valueToCode(this, 'y', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = "led.unplot("+ x + ', ' + y +");\n";
    return code;
}
Blockly.JavaScript.monitor_toggle_point = function() {
    var x = Blockly.JavaScript.valueToCode(this, 'x', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var y = Blockly.JavaScript.valueToCode(this, 'y', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = "led.toggle("+ x + ', ' + y +");\n";
    return code;
}
Blockly.JavaScript.monitor_get_point = function() {
    var x = Blockly.JavaScript.valueToCode(this, 'x', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var y = Blockly.JavaScript.valueToCode(this, 'y', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = "led.point("+ x + ', ' + y +")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}
Blockly.JavaScript.monitor_plot_bar = function() {
    var start = Blockly.JavaScript.valueToCode(this, 'start', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var end = Blockly.JavaScript.valueToCode(this, 'end', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = "led.plotBarGraph("+ start + ', ' + end +");\n";
    return code;
}
Blockly.JavaScript.monitor_bright_point= function() {
    var x = Blockly.JavaScript.valueToCode(this, 'x', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var y = Blockly.JavaScript.valueToCode(this, 'y', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var brightness = Blockly.JavaScript.valueToCode(this, 'brightness', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = "led.plotBrightness("+ x + ', ' + y + ', '+ brightness + ");\n";
    return code;
}

Blockly.JavaScript.monitor_get_brightness = function() {
    var code = "led.brightness()";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}
Blockly.JavaScript.monitor_set_brightness = function() {
    var brightness = Blockly.JavaScript.valueToCode(this, 'brightness', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = "led.setBrightness("+ brightness  +");\n";
    return code;
}

Blockly.JavaScript.monitor_stop_animation = function() {
    return 'led.stopAnimation();\n'
}
Blockly.JavaScript.monitor_led_enable= function() {
    var stat = this.getFieldValue('stat')
    var code = "led.enable("+ stat +");\n";
    return code;
}
Blockly.JavaScript.monitor_show_image_with_offset = function() {
    var variable = Blockly.JavaScript.valueToCode(this, 'var', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = variable + ".showImage("+ data +");\n";
    return code;
}

Blockly.JavaScript.monitor_create_image= function() {
    var led_str = '\n';
    for (var row = 0; row < 5; row ++){
        for(var col = 0; col < 5; col ++){
            if(this.getFieldValue('' + row + col) === 'TRUE') led_str += '# ';
            else led_str += '. ';
        }
        led_str += '\n';
    }
    var code = 'images.createImage(`' + led_str + '`)';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}
Blockly.JavaScript.monitor_scroll_image = function() {
    var variable = Blockly.JavaScript.valueToCode(this, 'var', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var offset = Blockly.JavaScript.valueToCode(this, 'offset', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var interval = Blockly.JavaScript.valueToCode(this, 'interval', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = variable + ".scrollImage("+ offset + ', ' + interval +");\n";
    return code;
}
Blockly.JavaScript.monitor_create_big_image = function() {
    var led_str = '\n';
    for (var row = 0; row < 5; row ++){
        for(var col = 0; col < 10; col ++){
            if(this.getFieldValue('' + row + col) === 'TRUE') led_str += '# ';
            else led_str += '. ';
        }
        led_str += '\n';
    }
    var code = 'images.createBigImage(`' + led_str + '`)';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript.monitor_arrow_image= function() {
    var arrow = this.getFieldValue('arrow')
    var code = "images.arrowImage("+ arrow +")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}