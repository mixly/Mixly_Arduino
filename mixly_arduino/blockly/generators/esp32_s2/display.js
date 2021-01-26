'use strict';


Blockly.Python.display_show_image_or_string = function() {
    Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var code = "mixgoce.display.show_dynamic(" + data + ")\n";
    return code;
}

Blockly.Python.display_scroll_string = function() {
     Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
     var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
     var code = "mixgoce.display.scroll("+ data +")\n";
     return code;
}

Blockly.Python.display_show_static = function() {
     Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
     var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
     var code = "mixgoce.display.show_static("+ data +")\n";
     return code;
}

Blockly.Python.display_show_image_or_string_delay = function() {
    Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var time = Blockly.Python.valueToCode(this, 'time', Blockly.Python.ORDER_ASSIGNMENT);
    var code = "mixgoce.display.show_dynamic(" + data + ','+ time + ")\n";
    return code;
}

Blockly.Python.display_scroll_string_delay = function() {
     Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
     var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
     var time = Blockly.Python.valueToCode(this, 'time', Blockly.Python.ORDER_ASSIGNMENT);
     var code = "mixgoce.display.scroll("+ data + ',' + time +")\n";
     return code;
}

Blockly.Python['display_image_create'] = function(block) {
  Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
  var colours = {
    "#000000": "0",
    //"#440000": "1",
    //"#660000": "2",
    //"#880000": "3",
    //"#aa0000": "4",
    //"#bb0000": "5",
    //"#cc0000": "6",
    //"#dd0000": "7",
    //"#ee0000": "8",
    "#ff0000": "1"
  }
  function pad(num) {
    if(num.length==1)  
      return '0'+num;
    else
      return num;
  }
var colour_0 ='\\x'+pad(((Number(colours[block.getFieldValue("00")]*1) + Number(colours[block.getFieldValue("10")]*2) + Number(colours[block.getFieldValue("20")]*4) + Number(colours[block.getFieldValue("30")]*8) + Number(colours[block.getFieldValue("40")]*16) + Number(colours[block.getFieldValue("50")]*32) + Number(colours[block.getFieldValue("60")]*64) + Number(colours[block.getFieldValue("70")]*128)).toString(16)))
var colour_1 ='\\x'+pad(((Number(colours[block.getFieldValue("01")]*1) + Number(colours[block.getFieldValue("11")]*2) + Number(colours[block.getFieldValue("21")]*4) + Number(colours[block.getFieldValue("31")]*8) + Number(colours[block.getFieldValue("41")]*16) + Number(colours[block.getFieldValue("51")]*32) + Number(colours[block.getFieldValue("61")]*64) + Number(colours[block.getFieldValue("71")]*128)).toString(16)))
var colour_2 ='\\x'+pad(((Number(colours[block.getFieldValue("02")]*1) + Number(colours[block.getFieldValue("12")]*2) + Number(colours[block.getFieldValue("22")]*4) + Number(colours[block.getFieldValue("32")]*8) + Number(colours[block.getFieldValue("42")]*16) + Number(colours[block.getFieldValue("52")]*32) + Number(colours[block.getFieldValue("62")]*64) + Number(colours[block.getFieldValue("72")]*128)).toString(16)))
var colour_3 ='\\x'+pad(((Number(colours[block.getFieldValue("03")]*1) + Number(colours[block.getFieldValue("13")]*2) + Number(colours[block.getFieldValue("23")]*4) + Number(colours[block.getFieldValue("33")]*8) + Number(colours[block.getFieldValue("43")]*16) + Number(colours[block.getFieldValue("53")]*32) + Number(colours[block.getFieldValue("63")]*64) + Number(colours[block.getFieldValue("73")]*128)).toString(16)))
var colour_4 ='\\x'+pad(((Number(colours[block.getFieldValue("04")]*1) + Number(colours[block.getFieldValue("14")]*2) + Number(colours[block.getFieldValue("24")]*4) + Number(colours[block.getFieldValue("34")]*8) + Number(colours[block.getFieldValue("44")]*16) + Number(colours[block.getFieldValue("54")]*32) + Number(colours[block.getFieldValue("64")]*64) + Number(colours[block.getFieldValue("74")]*128)).toString(16)))
var colour_5 ='\\x'+pad(((Number(colours[block.getFieldValue("05")]*1) + Number(colours[block.getFieldValue("15")]*2) + Number(colours[block.getFieldValue("25")]*4) + Number(colours[block.getFieldValue("35")]*8) + Number(colours[block.getFieldValue("45")]*16) + Number(colours[block.getFieldValue("55")]*32) + Number(colours[block.getFieldValue("65")]*64) + Number(colours[block.getFieldValue("75")]*128)).toString(16)))
var colour_6 ='\\x'+pad(((Number(colours[block.getFieldValue("06")]*1) + Number(colours[block.getFieldValue("16")]*2) + Number(colours[block.getFieldValue("26")]*4) + Number(colours[block.getFieldValue("36")]*8) + Number(colours[block.getFieldValue("46")]*16) + Number(colours[block.getFieldValue("56")]*32) + Number(colours[block.getFieldValue("66")]*64) + Number(colours[block.getFieldValue("76")]*128)).toString(16)))
var colour_7 ='\\x'+pad(((Number(colours[block.getFieldValue("07")]*1) + Number(colours[block.getFieldValue("17")]*2) + Number(colours[block.getFieldValue("27")]*4) + Number(colours[block.getFieldValue("37")]*8) + Number(colours[block.getFieldValue("47")]*16) + Number(colours[block.getFieldValue("57")]*32) + Number(colours[block.getFieldValue("67")]*64) + Number(colours[block.getFieldValue("77")]*128)).toString(16)))
var colour_8 ='\\x'+pad(((Number(colours[block.getFieldValue("08")]*1) + Number(colours[block.getFieldValue("18")]*2) + Number(colours[block.getFieldValue("28")]*4) + Number(colours[block.getFieldValue("38")]*8) + Number(colours[block.getFieldValue("48")]*16) + Number(colours[block.getFieldValue("58")]*32) + Number(colours[block.getFieldValue("68")]*64) + Number(colours[block.getFieldValue("78")]*128)).toString(16)))
var colour_9 ='\\x'+pad(((Number(colours[block.getFieldValue("09")]*1) + Number(colours[block.getFieldValue("19")]*2) + Number(colours[block.getFieldValue("29")]*4) + Number(colours[block.getFieldValue("39")]*8) + Number(colours[block.getFieldValue("49")]*16) + Number(colours[block.getFieldValue("59")]*32) + Number(colours[block.getFieldValue("69")]*64) + Number(colours[block.getFieldValue("79")]*128)).toString(16)))
var colour_a ='\\x'+pad(((Number(colours[block.getFieldValue("0a")]*1) + Number(colours[block.getFieldValue("1a")]*2) + Number(colours[block.getFieldValue("2a")]*4) + Number(colours[block.getFieldValue("3a")]*8) + Number(colours[block.getFieldValue("4a")]*16) + Number(colours[block.getFieldValue("5a")]*32) + Number(colours[block.getFieldValue("6a")]*64) + Number(colours[block.getFieldValue("7a")]*128)).toString(16)))
var colour_b ='\\x'+pad(((Number(colours[block.getFieldValue("0b")]*1) + Number(colours[block.getFieldValue("1b")]*2) + Number(colours[block.getFieldValue("2b")]*4) + Number(colours[block.getFieldValue("3b")]*8) + Number(colours[block.getFieldValue("4b")]*16) + Number(colours[block.getFieldValue("5b")]*32) + Number(colours[block.getFieldValue("6b")]*64) + Number(colours[block.getFieldValue("7b")]*128)).toString(16)))
var colour_c ='\\x'+pad(((Number(colours[block.getFieldValue("0c")]*1) + Number(colours[block.getFieldValue("1c")]*2) + Number(colours[block.getFieldValue("2c")]*4) + Number(colours[block.getFieldValue("3c")]*8) + Number(colours[block.getFieldValue("4c")]*16) + Number(colours[block.getFieldValue("5c")]*32) + Number(colours[block.getFieldValue("6c")]*64) + Number(colours[block.getFieldValue("7c")]*128)).toString(16)))
var colour_d ='\\x'+pad(((Number(colours[block.getFieldValue("0d")]*1) + Number(colours[block.getFieldValue("1d")]*2) + Number(colours[block.getFieldValue("2d")]*4) + Number(colours[block.getFieldValue("3d")]*8) + Number(colours[block.getFieldValue("4d")]*16) + Number(colours[block.getFieldValue("5d")]*32) + Number(colours[block.getFieldValue("6d")]*64) + Number(colours[block.getFieldValue("7d")]*128)).toString(16)))
var colour_e ='\\x'+pad(((Number(colours[block.getFieldValue("0e")]*1) + Number(colours[block.getFieldValue("1e")]*2) + Number(colours[block.getFieldValue("2e")]*4) + Number(colours[block.getFieldValue("3e")]*8) + Number(colours[block.getFieldValue("4e")]*16) + Number(colours[block.getFieldValue("5e")]*32) + Number(colours[block.getFieldValue("6e")]*64) + Number(colours[block.getFieldValue("7e")]*128)).toString(16)))
var colour_f ='\\x'+pad(((Number(colours[block.getFieldValue("0f")]*1) + Number(colours[block.getFieldValue("1f")]*2) + Number(colours[block.getFieldValue("2f")]*4) + Number(colours[block.getFieldValue("3f")]*8) + Number(colours[block.getFieldValue("4f")]*16) + Number(colours[block.getFieldValue("5f")]*32) + Number(colours[block.getFieldValue("6f")]*64) + Number(colours[block.getFieldValue("7f")]*128)).toString(16)))

var code = "bytearray(b'"+ colour_0 + colour_1 + colour_2 + colour_3 + colour_4 + colour_5 + colour_6 + colour_7 + colour_8 + colour_9 + colour_a + colour_b + colour_c + colour_d + colour_e + colour_f+"')";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['display_image_builtins'] = function(block) {
  Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
  var dropdown_image = block.getFieldValue('image');
  var code = 'mixgoce.IMAGE_' + dropdown_image;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['display_animate'] = function(block) {
  Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
  var dropdown_image = block.getFieldValue('ANIMATION');
  var code = 'mixgoce.IMAGE_' + dropdown_image;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['display_get_pixel'] = function(block) {
  Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
  var value_x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
  var value_y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
  var code = 'mixgoce.display.get_pixel(int(' + value_x + '), int(' + value_y + '))';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.display_bright_point= function() {
    Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
    var x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ASSIGNMENT);
    var y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ASSIGNMENT);
    var dropdown_stat = Blockly.Python.valueToCode(this, 'STAT', Blockly.Python.ORDER_ATOMIC);
    var code = 'mixgoce.display.set_pixel(int(' + x + '), int(' + y + '), '+ dropdown_stat + ")\n";
    return code;
}

Blockly.Python['display_get_screen_pixel'] = function() {
  Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
  var code = 'mixgoce.display.get_brightness()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['display_get_screen_image'] = function() {
  Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
  var code = 'mixgoce.display.get_screenimage()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.display_bright_screen= function() {
    Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
    var x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ASSIGNMENT);
    var code = 'mixgoce.display.set_brightness(' + x + ')\n';
    return code;
};


Blockly.Python.display_blink_rate= function() {
    Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
    var x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ASSIGNMENT);
    var code = 'mixgoce.display.blink_rate(' + x + ')\n';
    return code;
}

Blockly.Python['display_clear'] = function(block) {
  Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
  var code = 'mixgoce.display.clear()\n';
  return code;
};


Blockly.Python['image_arithmetic'] = function(a) {
  Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
  var op = a.getFieldValue("OP");
  var imga = Blockly.Python.valueToCode(a, 'A', Blockly.Python.ORDER_ATOMIC);
  var imgb = Blockly.Python.valueToCode(a, 'B', Blockly.Python.ORDER_ATOMIC);
  if (op=='INTERSECTION') {
    var code = imga + '-(' + imga + '-' + imgb +')';
  }
  else{
    var code = imga + op + imgb;
  }
  return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.display_onoff = function () {
    var code = (this.getFieldValue('ONOFF') == 'ON') ? '1' : '0';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['image_shift'] = function(a) {
  Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
  var op = a.getFieldValue("OP");
  var image = Blockly.Python.valueToCode(a, 'img', Blockly.Python.ORDER_ATOMIC);
  var value = Blockly.Python.valueToCode(a, 'val', Blockly.Python.ORDER_ATOMIC);
  var code = image + '.shift_' + op + '(' + value + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['display_shift'] = function(a) {
  Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
  var op = a.getFieldValue("OP");
  var value = Blockly.Python.valueToCode(a, 'val', Blockly.Python.ORDER_ATOMIC);
  var code = 'mixgoce.display.' + op + '(' + value + ')\n';
  return code;
};

goog.provide('Blockly.Python.display');
goog.require('Blockly.Python');
