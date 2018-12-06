'use strict';

Blockly.Python.handbit_display_use_i2c_init = function () {
  Blockly.Python.definitions_['import_ssd1106'] = 'import ssd1106';
  var i2csub =Blockly.Python.valueToCode(this, 'I2CSUB',Blockly.Python.ORDER_ATOMIC);
  var sub =Blockly.Python.valueToCode(this, 'SUB',Blockly.Python.ORDER_ATOMIC);
  var row =Blockly.Python.valueToCode(this, 'row',Blockly.Python.ORDER_ATOMIC);
  var column = Blockly.Python.valueToCode(this, 'column', Blockly.Python.ORDER_ATOMIC);
  var code = sub+" = ssd1106.SSD1106_I2C("+row+","+column+","+i2csub+")\n";
  return code;  
};

Blockly.Python.handbit_display_draw_4strings = function(){
  var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  if (varName == 'oled')
        Blockly.Python.definitions_['import_handbit_oled'] = 'from handbit import oled';
  else
      Blockly.Python.definitions_['import_ssd1106'] = 'import ssd1106';
  var value_text_line1 = Blockly.Python.valueToCode(this, 'Text_line1', Blockly.Python.ORDER_ASSIGNMENT) || '\'\'';
  var value_text_line2 = Blockly.Python.valueToCode(this, 'Text_line2', Blockly.Python.ORDER_ASSIGNMENT) || '\'\'';
  var value_text_line3 = Blockly.Python.valueToCode(this, 'Text_line3', Blockly.Python.ORDER_ASSIGNMENT) || '\'\'';
  var value_text_line4 = Blockly.Python.valueToCode(this, 'Text_line4', Blockly.Python.ORDER_ASSIGNMENT) || '\'\''; 
  var code = varName + '.show_str(' + value_text_line1 +',' +value_text_line2 +','+ value_text_line3 +','+ value_text_line4 + ')\n'
  return code;
};

Blockly.Python.handbit_display_line_arbitrarily=function(){
  var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  if (varName == 'oled')
        Blockly.Python.definitions_['import_handbit_oled'] = 'from handbit import oled';
  else
      Blockly.Python.definitions_['import_ssd1106'] = 'import ssd1106';
  var location_x1 = Blockly.Python.valueToCode(this, 'x1', Blockly.Python.ORDER_ATOMIC);
  var location_y1= Blockly.Python.valueToCode(this, 'y1', Blockly.Python.ORDER_ATOMIC);
  var location_x2 = Blockly.Python.valueToCode(this, 'x2', Blockly.Python.ORDER_ATOMIC);
  var location_y2= Blockly.Python.valueToCode(this, 'y2', Blockly.Python.ORDER_ATOMIC);
  var code = varName + '.show_line('+location_x1+', '+location_y1+', '+location_x2+', '+location_y2+', 1)\n';
  return code;
};

Blockly.Python.handbit_display_rect=function(){
  var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  if (varName == 'oled')
        Blockly.Python.definitions_['import_handbit_oled'] = 'from handbit import oled';
  else
      Blockly.Python.definitions_['import_ssd1106'] = 'import ssd1106';
  var location_x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ATOMIC);
  var location_y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ATOMIC);
  var value_width = Blockly.Python.valueToCode(this, 'width', Blockly.Python.ORDER_ATOMIC);
  var value_height = Blockly.Python.valueToCode(this, 'height', Blockly.Python.ORDER_ATOMIC);
  var checkbox_fill = this.getFieldValue("fill") == 'TRUE' ? 'True' : 'False';
  var size  = this.getFieldValue('OP');
  switch (checkbox_fill) {
    case "True":
       var code = varName + '.show_fill_rect('+location_x+', '+location_y+', '+value_width+', '+value_height+','+ size+')\n';
  
       return code;
       break;
    case "False":
       var code = varName +'.show_rect('+location_x+', '+location_y+', '+value_width+', '+value_height+','+ size+')\n';
 
       return code;
       break;
     }
};

Blockly.Python.handbit_display_line=function(){
  var varName =Blockly.Python.valueToCode(this, 'VAR',Blockly.Python.ORDER_ATOMIC);
  if (varName == 'oled')
        Blockly.Python.definitions_['import_handbit_oled'] = 'from handbit import oled';
  else
      Blockly.Python.definitions_['import_ssd1106'] = 'import ssd1106';
  var location_x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ATOMIC);
  var location_y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ATOMIC);
  var value_length = Blockly.Python.valueToCode(this, 'length', Blockly.Python.ORDER_ATOMIC);
  var value_direction = this.getFieldValue("direction");
  var code = varName + '.show_'+value_direction+'('+location_x+', '+location_y+', '+value_length+', 1)\n';
  return code;
};


