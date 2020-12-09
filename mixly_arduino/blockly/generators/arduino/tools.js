'use strict';

goog.provide('Blockly.Arduino.tools');
goog.require('Blockly.Arduino');

Blockly.Arduino.factory_notes = function(){
 var content = this.getFieldValue('VALUE');
 console.log(content);
 if(content){
  var content2arr = content.split('\n');
  var code = '';
  for (var eachElement in content2arr){
    console.log(content2arr[eachElement]);
    content2arr[eachElement] = '//'+ content2arr[eachElement] +'\n';
    console.log(content2arr[eachElement]);
  }
  for (var eachElement of content2arr){
    code += eachElement;
  }
  return code;
}
else{
  return '//\n';
}
}

Blockly.Arduino.folding_block = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格
    return ''+branch+'\n';
  };

  Blockly.Arduino.IICSCAN = function() {
    Blockly.Arduino.definitions_['include_WIRE'] = '#include <Wire.h>';
    Blockly.Arduino.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';
    Blockly.Arduino.setups_['setup_delay2000'] = 'Wire.begin();\n  Serial.println("I2C Scanner");';
    var code = 'byte error, address;\n'
             + 'int nDevices;\n'
             + 'Serial.println("Scanning...");\n'
             + 'nDevices = 0;\n'
             + 'for (address = 1; address < 127; address++ ){\n'
             + '  Wire.beginTransmission(address);\n'
             + '  error = Wire.endTransmission();\n'
             + '  if (error == 0){\n'
             + '    Serial.print("I2C device found at address 0x");\n'
             + '    if (address < 16)\n'
             + '      Serial.print("0");\n'
             + '    Serial.print(address, HEX);\n'
             + '    Serial.println(" !");\n'
             + '    nDevices++;\n'
             + '  }\n'
             + '  else if (error == 4){\n'
             + '    Serial.print("Unknow error at address 0x");\n'
             + '    if (address < 16)\n'
             + '      Serial.print("0");\n'
             + '      Serial.println(address, HEX);\n'
             + '  }\n'
             + '}\n'
             + 'if (nDevices == 0)\n'
             + '  Serial.println("No I2C devices found");\n'
             + 'else\n'
             + '  Serial.println("done");\n'
             + 'delay(5000);\n';
    return code;
  };

  function string_Bin_to_Hex(outstr_select){
    switch (outstr_select)
    {
      case '0000':
      {
        outstr_select = '0';
        break;
      }
      case '0001':
      {
        outstr_select = '1';
        break;
      }
      case '0010':
      {
        outstr_select = '2';
        break;
      }
      case '0011':
      {
        outstr_select = '3';
        break;
      }
      case '0100':
      {
        outstr_select = '4';
        break;
      }
      case '0101':
      {
        outstr_select = '5';
        break;
      }
      case '0110':
      {
        outstr_select = '6';
        break;
      }
      case '0111':
      {
        outstr_select = '7';
        break;
      }
      case '1000':
      {
        outstr_select = '8';
        break;
      }
      case '1001':
      {
        outstr_select = '9';
        break;
      }
      case '1010':
      {
        outstr_select = 'A';
        break;
      }
      case '1011':
      {
        outstr_select = 'B';
        break;
      }
      case '1100':
      {
        outstr_select = 'C';
        break;
      }
      case '1101':
      {
        outstr_select = 'D';
        break;
      }
      case '1110':
      {
        outstr_select = 'E';
        break;
      }
      case '1111':
      {
        outstr_select = 'F';
        break;
      }
    }
    return outstr_select;
  };

//将一个数字转化成16进制字符串形式
function toHex(num){
  return num<16?"0x0"+num.toString(16).toUpperCase():"0x"+num.toString(16).toUpperCase();
};

//将文本或符号编码
function encodeUnicode(str){
  let res = [];
  for(let i = 0; i < str.length;i++)
  {
    res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
  }
  return "_u" + res.join("_u");
};

//将字符串转整数
function myAtoi(str) {
    str=str.replace(/(^\s*)|(\s*$)/g, "");//去掉字符串最前面的空格，中间的不用管
    var str1="";
    for(i=0;i<str.length;i++){
      if((str.charAt(i)=="-"||str.charAt(i)=="+")&&i==0){
        str1=str1.concat(str.charAt(i))
        }//如果“+”“-”号在最前面
        else if(/^\d+$/.test(str.charAt(i))){
          str1=str1.concat(str.charAt(i))
        }//用字符串存储值
        else{
            break//直接跳出for循环
          };
        }
        if(str1-0>2147483647){
          return 2147483647
        }                      //str-0   字符串化为数组最简单也是最常用的方法
        else if(str1-0<-2147483648){
          return -2147483648
        }
        if(isNaN(str1-0)) return 0//"+"/"-"这种情况,返回0
          return str1-0            
      };

//取模工具显示数据部分
Blockly.Arduino.tool_modulus_show = function() {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var X = this.getFieldValue('x');
  var checkbox_save_hz = this.getFieldValue('save_hz') == 'TRUE';
  var value_input = Blockly.Arduino.valueToCode(this, 'input_data', Blockly.Arduino.ORDER_ATOMIC);

  var X_1 = 0;
  for(var i of value_input)
  {
    if(i == ',')
      X_1++;
  }
  X_1++;

  this.setFieldValue(X_1,"x");
  
  if(checkbox_save_hz)
    Blockly.Arduino.definitions_['var_declare'+varName] = 'static const unsigned char PROGMEM '+varName+'['+X_1+'] = '+ '{' + value_input + '};';
  else
    Blockly.Arduino.definitions_['var_declare'+varName] = 'unsigned char '+varName+'['+X_1+'] = '+ '{' + value_input + '};';
  var code = '';
  return code;
};

//取模工具设置部分
var bitArr=new Array();
for(var i=0;i<8;i++)bitArr[i]=(0x80>>i);//初始化位数组
var canvas=document.createElement("canvas");//创建canvas
var ctx=canvas.getContext("2d");//获得内容描述句柄

Blockly.Arduino.tool_modulus = function() {
  var dropdown_bitmap_formats = this.getFieldValue('bitmap_formats');
  var dropdown_modulus_way = this.getFieldValue('modulus_way');
  var dropdown_modulus_direction = this.getFieldValue('modulus_direction');
  var dropdown_hz_sharp = this.getFieldValue('hz_sharp');
  var text_hz_line_height = this.getFieldValue('hz_line_height');
  var dropdown_hz_up_down = this.getFieldValue('hz_up_down');
  var text_hz_up_down_data = this.getFieldValue('hz_up_down_data');
  var dropdown_hz_left_right = this.getFieldValue('hz_left_right');
  var text_hz_left_right_data = this.getFieldValue('hz_left_right_data');
  var text_bitmap_width = this.getFieldValue('bitmap_width');
  var text_bitmap_height = this.getFieldValue('bitmap_height');
  var angle_bitmap_rotate = 0;
  //  var checkbox_show_hz = this.getFieldValue('show_hz') == 'TRUE';
  var checkbox_show_hz = 'TRUE';
  var text_input_data = this.getFieldValue('input_data');
  var dropdown_hz_variant = 'normal';
  var dropdown_hz_style = 'normal';
  var dropdown_hz_thickness = 'normal';
  var fontSize_width=myAtoi(text_bitmap_width);
  var fontSize_height=myAtoi(text_bitmap_height);
    var bs=Math.ceil(fontSize_width/8);//每行占字节数

    var move_x = 0;
    var move_y = 0;
    if(dropdown_hz_up_down == "hz_down")
    {
      move_y = myAtoi(text_hz_up_down_data);
    }
    else
    {
      move_y = myAtoi("-"+text_hz_up_down_data);
    }

    if(dropdown_hz_left_right == "hz_right")
    {
      move_x = myAtoi(text_hz_left_right_data);
    }
    else
    {
      move_x = myAtoi("-"+text_hz_left_right_data);
    }
    canvas.width=fontSize_width;
    canvas.height=fontSize_height;
    ctx.font = dropdown_hz_style + ' ' + dropdown_hz_variant + ' ' + dropdown_hz_thickness + ' ' + text_hz_line_height + 'px ' + dropdown_hz_sharp;
    ctx.textAlign="left";
    ctx.textBaseline="top";

    var c = text_input_data;

    ctx.fillStyle="#000000";
    ctx.fillRect(0,0,fontSize_width,fontSize_height);//涂背景
    ctx.fillStyle="#ffffff";
    ctx.translate(fontSize_width/2,fontSize_height/2);
    ctx.rotate(Math.PI/180*(angle_bitmap_rotate-0));
    ctx.fillText(c,move_x-fontSize_width/2,move_y-fontSize_height/2);//写字
    //ctx.drawImage(img,0,0,100,100);//写字

    var data=ctx.getImageData(0,0,fontSize_width,fontSize_height).data;//获取图像
    var zm=new Array(bs*fontSize_height);
    for(var i=0;i<zm.length;i++)zm[i]=0;//初始化字模数组
    for(var i=0;i<fontSize_height;i++)//读像素值组成字模数组
      for(var j=0;j<fontSize_width;j++)
        if(data[i*fontSize_width*4+j*4])zm[parseInt(j/8)+i*bs]+=bitArr[j%8];
    var outStr="";//将字模数组转化为十六进制形式
    for(var i=0;i<zm.length-1;i++)outStr+=toHex(zm[i])+",";
      outStr+=toHex(zm[i]);

    var zm1=new Array(bs*fontSize_height);
    var outstr1 = "";
    for(var i in zm)zm1[i] = zm[i].toString(2);
      for(var i in zm1)
      {
        var str = "";
        for(var j = 0;j<8-zm1[i].length;j++)str+="0";
          zm1[i] = str + zm1[i];
      }
      for(var i in zm1)outstr1+=zm1[i];

        var HZ_image = "";
      var num_hz = 0;
      for(var i = 0;i<fontSize_width;i++)
      {
        HZ_image+="--";
        if(i == (fontSize_width - 1))HZ_image+="\n|";
      }

      for(var data_hz of outstr1)
      {
        num_hz++;
        if(num_hz == outstr1.length)
        {
          HZ_image+="|\n";
        }
        else if(num_hz%(bs*8) < fontSize_width && num_hz%(bs*8) > 0)
        {
          if(data_hz == "0")HZ_image+="  ";
          else if(data_hz == "1")HZ_image+="0 ";
        } 
        else if(num_hz%(bs*8) == 0)
        {
          HZ_image+="|\n|";
        }
      }
      for(var i = 0;i<fontSize_width;i++)
      {
        HZ_image+="--";
      }
      HZ_image = "/*" + "\n" + HZ_image + "\n" + "*/";
      
      var hz_sharp = "";
      switch(dropdown_hz_sharp)
      {
        case "STHeiti":
        hz_sharp = "华文黑体";
        break;
        case "STKaiti":
        hz_sharp = "华文楷体";
        break;
        case "STXihei":
        hz_sharp = "华文细黑";
        break;
        case "STSong":
        hz_sharp = "华文宋体";
        break;
        case "STZhongsong":
        hz_sharp = "华文中宋";
        break;
        case "STFangsong":
        hz_sharp = "华文仿宋";
        break;
        case "STCaiyun":
        hz_sharp = "华文彩云";
        break;
        case "STHupo":
        hz_sharp = "华文琥珀";
        break;
        case "STLiti":
        hz_sharp = "华文隶书";
        break;
        case "STXingkai":
        hz_sharp = "华文行楷";
        break;
        case "STXinwei":
        hz_sharp = "华文新魏";
        break;
        case "simHei":
        hz_sharp = "黑体";
        break;
        case "simSun":
        hz_sharp = "宋体";
        break;
        case "NSimSun":
        hz_sharp = "新宋体";
        break;
        case "FangSong":
        hz_sharp = "仿宋";
        break;
        case "KaiTi":
        hz_sharp = "楷体";
        break;
        case "FangSong_GB2312":
        hz_sharp = "仿宋_GB2312";
        break;
        case "KaiTi_GB2312":
        hz_sharp = "楷体_GB2312";
        break;
        case "LiSu":
        hz_sharp = "隶书";
        break;
        case "YouYuan":
        hz_sharp = "幼圆";
        break;
        case "PMingLiU":
        hz_sharp = "新细明体";
        break;
        case "MingLiU":
        hz_sharp = "细明体";
        break;
        case "DFKai-SB":
        hz_sharp = "标楷体";
        break;
        case "Microsoft JhengHei":
        hz_sharp = "微软正黑体";
        break;
        case "Microsoft YaHei":
        hz_sharp = "微软雅黑体";
        break;
        default:
        hz_sharp = dropdown_hz_sharp;
        break;
      }
      hz_sharp = "字体：" + hz_sharp + "  字号：" + text_hz_line_height + "px" + "  显示文字：" + text_input_data + '\n' + HZ_image;

      var modulus_array = new Array();
      for(var i = 0;i < fontSize_height; i++)
      {
        modulus_array[i] = new Array();
        for(var j = 0;j < bs*8;j++)
        {
          modulus_array[i][j] = "";
        }
      }

      for(var i = 1;i <= fontSize_height; i++)
      {
        for(var j = 1;j <= bs*8;j++)
        {
          modulus_array[i-1][j-1] = outstr1.charAt((i-1)*bs*8 + j - 1);
        }
      }
    //取模方式
    //逐列式 - 1,逐行式 - 2,列行式 - 3,行列式 - 4

    //取模走向
    //顺向(高位在前) - 1,逆向(低位在前) - 2
    var bit_num = fontSize_height*bs;
    var modulus_data = "";
    var array_x = 0;
    var array_y = 0;
    var modulus_y = Math.ceil(fontSize_height/8);
    var modulus_x = Math.ceil(fontSize_width/8);
    
    //if(dropdown_modulus_direction == '1')
    //{
    //逐列式 - 1
    if(dropdown_modulus_way == '1')
    {
      bit_num = modulus_y*fontSize_width;
      for(var j = 1;j <= bit_num;j++)
      {
        for(var i = 1;i <= 8;i++)
        {
          if(j%modulus_y == 0)
            array_y = (modulus_y-1)*8 + i - 1;
          else
            array_y = (j%modulus_y-1)*8 + i - 1;
          
          array_x = Math.ceil(j/modulus_y) - 1;
          if(array_x > (fontSize_width - 1))
            break;
          if(array_y > (fontSize_height - 1))
          {
            if(dropdown_bitmap_formats == '1')
              modulus_data+="0";
            else
              modulus_data+="1";
            continue;
          }

          //modulus_data+=modulus_array[array_y][array_x];
          if(dropdown_bitmap_formats == '1')
            modulus_data+=modulus_array[array_y][array_x];
          else
          {
            if(modulus_array[array_y][array_x] == "0")
              modulus_data+="1";
            else
              modulus_data+="0";
          }
        }
        modulus_data+=",";
      }
    }
    //逐行式 - 2
    else if(dropdown_modulus_way == '2')
    {
      bit_num = modulus_x*fontSize_height;
      for(var j = 1;j <= bit_num;j++)
      {
        for(var i = 1;i <= 8;i++)
        {
          if(j%modulus_x == 0)
            array_x = (modulus_x-1)*8 + i - 1;
          else
            array_x = (j%modulus_x-1)*8 + i - 1;
          array_y = Math.ceil(j/modulus_x) - 1;

          //modulus_data+=modulus_array[array_y][array_x];
          if(dropdown_bitmap_formats == '1')
            modulus_data+=modulus_array[array_y][array_x];
          else
          {
            if(modulus_array[array_y][array_x] == "0")
              modulus_data+="1";
            else
              modulus_data+="0";
          }
        }
        modulus_data+=",";
      }
    }
    //列行式 - 3
    else if(dropdown_modulus_way == '3')
    {
      bit_num = modulus_y*fontSize_width;
      for(var j = 1;j <= bit_num;j++)
      {
        for(var i = 1;i <= 8;i++)
        {
          if(j%(modulus_x*8) == 0)
            array_x = modulus_x*8 - 1;
          else
            array_x = j%(modulus_x*8) - 1;
          array_y = (Math.ceil(j/(modulus_x*8)) - 1)*8 + i - 1;
          if(array_x > (fontSize_width - 1))
            break;
          if(array_y > (fontSize_height - 1))
          {
            if(dropdown_bitmap_formats == '1')
              modulus_data+="0";
            else
              modulus_data+="1";
            continue;
          }

          //modulus_data+=modulus_array[array_y][array_x];
          if(dropdown_bitmap_formats == '1')
            modulus_data+=modulus_array[array_y][array_x];
          else
          {
            if(modulus_array[array_y][array_x] == "0")
              modulus_data+="1";
            else
              modulus_data+="0";
          }
        }
        modulus_data+=",";
      }
    }
    //行列式 - 4
    else if(dropdown_modulus_way == '4')
    {
      bit_num = modulus_x*fontSize_height;
      for(var j = 1;j <= bit_num;j++)
      {
        for(var i = 1;i <= 8;i++)
        {
          if(j%fontSize_height == 0)
            array_y = fontSize_height - 1;
          else
            array_y = j%fontSize_height - 1;
          array_x = (Math.ceil(j/fontSize_height) - 1)*8 + i - 1;

          //modulus_data+=modulus_array[array_y][array_x];
          if(dropdown_bitmap_formats == '1')
            modulus_data+=modulus_array[array_y][array_x];
          else
          {
            if(modulus_array[array_y][array_x] == "0")
              modulus_data+="1";
            else
              modulus_data+="0";
          }
        }
        modulus_data+=",";
      }
    }
    //}
    var now_data = "";
    var end_data = "";
    if(dropdown_modulus_direction == 2)
    {
      for(var i of modulus_data)
      {
        if(i == ",")
        {
          end_data+=now_data;
          end_data+=",";
          now_data = "";
        }
        else
          now_data = i + now_data;
      }
      modulus_data = end_data;
    }

    now_data = "";
    end_data = "0x";
    for(var i of modulus_data)
    {
      if(i == ",")
      {
        end_data+=",0x";
        continue;
      }
      now_data+=i;
      if(now_data.length == 4)
      {
        end_data+=string_Bin_to_Hex(now_data);
        now_data = "";
      }
    }
    modulus_data = end_data;
    modulus_data = modulus_data.substring(0,modulus_data.length-3);
    
    if(checkbox_show_hz)
      Blockly.Arduino.definitions_['var_declare_tool_modulus_data_' + dropdown_hz_sharp + '_' + text_hz_line_height + 'px' + encodeUnicode(text_input_data)] = '//' + hz_sharp;
    
    var code = modulus_data;
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino.nano_pin = function() {
    return "";
  };
  Blockly.Arduino.promini_pin=Blockly.Arduino.nano_pin;
  Blockly.Arduino.leonardo_pin=Blockly.Arduino.nano_pin;
  Blockly.Arduino.uno_pin=Blockly.Arduino.nano_pin;
  Blockly.Arduino.mega_pin=Blockly.Arduino.nano_pin;
  Blockly.Arduino.esp32_pin=Blockly.Arduino.nano_pin;
  Blockly.Arduino.esp8266_pin=Blockly.Arduino.nano_pin;
  Blockly.Arduino.wemos_d1_mini_pin=Blockly.Arduino.nano_pin;
  Blockly.Arduino.handbit_A=Blockly.Arduino.nano_pin;
  Blockly.Arduino.handbit_B=Blockly.Arduino.nano_pin;
  Blockly.Arduino.handbit_pin_A=Blockly.Arduino.nano_pin;
  Blockly.Arduino.handbit_pin_B=Blockly.Arduino.nano_pin;
  Blockly.Arduino.mixgo_pin_A=Blockly.Arduino.nano_pin;
  Blockly.Arduino.mixgo_pin_B=Blockly.Arduino.nano_pin;
  Blockly.Arduino.PocketCard_pin=Blockly.Arduino.nano_pin;
  Blockly.Arduino.PocketCard_A=Blockly.Arduino.nano_pin;
  Blockly.Arduino.PocketCard_B=Blockly.Arduino.nano_pin;
  Blockly.Arduino.stm32f103c8t6_pin=Blockly.Arduino.nano_pin;

  //获取两个日期差值
Blockly.Arduino.get_the_number_of_days_between_the_two_dates = function() {
    var year_start= Blockly.Arduino.valueToCode(this, 'year_start', Blockly.Arduino.ORDER_ATOMIC);
    var month_start= Blockly.Arduino.valueToCode(this, 'month_start', Blockly.Arduino.ORDER_ATOMIC);
    var day_start= Blockly.Arduino.valueToCode(this, 'day_start', Blockly.Arduino.ORDER_ATOMIC);
    var year_end= Blockly.Arduino.valueToCode(this, 'year_end', Blockly.Arduino.ORDER_ATOMIC);
    var month_end= Blockly.Arduino.valueToCode(this, 'month_end', Blockly.Arduino.ORDER_ATOMIC);
    var day_end= Blockly.Arduino.valueToCode(this, 'day_end', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['get_the_number_of_days_between_the_two_dates'] ='int day_diff(int year_start, int month_start, int day_start, int year_end, int month_end, int day_end)\n{\n  int y2, m2, d2;\n  int y1, m1, d1;\n  m1 = (month_start + 9) % 12;\n  y1 = year_start - m1/10;\n  d1 = 365*y1 + y1/4 - y1/100 + y1/400 + (m1*306 + 5)/10 + (day_start - 1);\n  m2 = (month_end + 9) % 12;\n  y2 = year_end - m2/10;\n  d2 = 365*y2 + y2/4 - y2/100 + y2/400 + (m2*306 + 5)/10 + (day_end - 1);\n  return (d2 - d1);\n}';
    var code='day_diff('+year_start+', '+month_start+', '+day_start+', '+year_end+', '+month_end+', '+day_end+')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};