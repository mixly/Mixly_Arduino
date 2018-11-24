/*
Overrides for generic Python code generation.
*/
'use strict';

goog.provide('Blockly.Python');

goog.require('Blockly.Generator');


Blockly.Python = new Blockly.Generator('Python');
Blockly.Python.ORDER_ATOMIC = 0; // 0 "" ...
Blockly.Python.ORDER_UNARY_POSTFIX = 1; // expr++ expr-- () [] .
Blockly.Python.ORDER_UNARY_PREFIX = 2; // -expr !expr ~expr ++expr --expr
Blockly.Python.ORDER_EXPONENTIATION = 2.5;    // **
Blockly.Python.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.Python.ORDER_ADDITIVE = 4; // + -
Blockly.Python.ORDER_SHIFT = 5; // << >>
Blockly.Python.ORDER_RELATIONAL = 6; // is is! >= > <= <
Blockly.Python.ORDER_EQUALITY = 7; // == != === !==
Blockly.Python.ORDER_BITWISE_AND = 8; // &
Blockly.Python.ORDER_BITWISE_XOR = 9; // ^
Blockly.Python.ORDER_BITWISE_OR = 10; // |
Blockly.Python.ORDER_LOGICAL_AND = 11; // &&
Blockly.Python.ORDER_LOGICAL_OR = 12; // ||
Blockly.Python.ORDER_CONDITIONAL = 13; // expr ? expr : expr
Blockly.Python.ORDER_ASSIGNMENT = 14; // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.Python.ORDER_NONE = 99; // (...)

Blockly.Python.init = function(workspace) {
  /**
    * Empty loops or conditionals are not allowed in Python.
    */
  Blockly.Python.PASS = this.INDENT + 'pass\n';
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Python.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Python.functionNames_ = Object.create(null);
  Blockly.Python.setups_ = Object.create(null);

  if (!Blockly.Python.variableDB_) {
    Blockly.Python.variableDB_ =
        new Blockly.Names(Blockly.Python.RESERVED_WORDS_);
  } else {
    Blockly.Python.variableDB_.reset();
  }
}


Blockly.Python.finish = function(code) {
    // Convert the definitions dictionary into a list.
    if(code !== "") {
        code = code.replace(/\n/g, '\n');
        code = code.replace(/\n\s+$/, '\n');
    }
    var definitions = [];
    for (var name in Blockly.Python.definitions_) {
        definitions.push(Blockly.Python.definitions_[name]);
    }
    var setups = [];
    for (var name in Blockly.Python.setups_) {
      setups.push(Blockly.Python.setups_[name]);
    }
    if(setups.length !== 0)
      setups.push('\n');
    // Clean up temporary data.
    //delete Blockly.Python.definitions_;
    //delete Blockly.Python.functionNames_;
    //Blockly.Python.variableDB_.reset();
    if(code !== "") 
      return definitions.join('\n') + '\n\n' + setups.join('') + '\n' + code;
    else
      return definitions.join('\n') + '\n\n' + setups.join('') + '\n' + code;

};


/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Python.scrubNakedValue = function(line) {
    return line + '\n';
};

/**
 * Encode a string as a properly escaped Python string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Python string.
 * @private
 */
Blockly.Python.quote_ = function(string) {
    return "\"" + string + "\"";
};

/**
 * Common tasks for generating Python from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Python code created for this block.
 * @return {string} Python code with comments and subsequent blocks added.
 * @private
 */
Blockly.Python.scrub_ = function(block, code) {
    var commentCode = '';
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
        // Collect comment for this block.
        var comment = block.getCommentText();
        comment = Blockly.utils.wrap(comment, Blockly.Python.COMMENT_WRAP - 3);
        if (comment) {
            if (block.getProcedureDef) {
                // Use a comment block for function comments.
                commentCode += '"""' + comment + '\n"""\n';
            } else {
                commentCode += Blockly.Python.prefixLines(comment + '\n', '# ');
            }
        }
        // Collect comments for all value arguments.
        // Don't collect comments for nested statements.
        for (var i = 0; i < block.inputList.length; i++) {
            if (block.inputList[i].type == Blockly.INPUT_VALUE) {
                var childBlock = block.inputList[i].connection.targetBlock();
                if (childBlock) {
                    var comment = Blockly.Python.allNestedComments(childBlock);
                    if (comment) {
                        commentCode += Blockly.Python.prefixLines(comment, '# ');
                    }
                }
            }
        }
    }
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = Blockly.Python.blockToCode(nextBlock);
    return commentCode + code + nextCode;
};

/**
 * Gets a property and adjusts the value, taking into account indexing, and
 * casts to an integer.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @return {string|number}
 */
Blockly.Python.getAdjustedInt = function(block, atId, opt_delta, opt_negate) {
    var delta = opt_delta || 0;
    if (block.workspace.options.oneBasedIndex) {
        /* delta--;*/   //Keep in line with Python
    }
    var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
    var atOrder = delta ? Blockly.Python.ORDER_ADDITIVE :
        Blockly.Python.ORDER_NONE;
    var at = Blockly.Python.valueToCode(block, atId, atOrder) || defaultAtIndex;

    if (Blockly.isNumber(at)) {
        // If the index is a naked number, adjust it right now.
        at = parseInt(at, 10) + delta;
        if (opt_negate) {
            at = -at;
        }
    } else {
        // If the index is dynamic, adjust it in code.
        if (delta > 0) {
            at = 'int(' + at + ' + ' + delta + ')';
        } else if (delta < 0) {
            at = 'int(' + at + ' - ' + -delta + ')';
        } else {
            at = 'int(' + at + ')';
        }
        if (opt_negate) {
            at = '-' + at;
        }
    }
    return at;
};

Blockly.Python.CLASS_LCD1602_INIT = 'class LCD1602():\n'+
                                    '    def __init__(self, lcd_i2c_addr):\n'+
                                    '        self.buf = bytearray(1)\n'+
                                    '        self.BK = 0x08\n'+
                                    '        self.RS = 0x00\n'+
                                    '        self.E = 0x04\n'+
                                    '        self.setcmd(0x33)\n'+
                                    '        sleep(5)\n'+
                                    '        self.send(0x30)\n'+
                                    '        sleep(5)\n'+
                                    '        self.send(0x20)\n'+
                                    '        sleep(5)\n'+
                                    '        self.setcmd(0x28)\n'+
                                    '        self.setcmd(0x0C)\n'+
                                    '        self.setcmd(0x06)\n'+
                                    '        self.setcmd(0x01)\n'+
                                    '        self.version=\'1.0\'\n'+
                                    '        self.lcd_i2c_addr=lcd_i2c_addr\n'+
                                    '\n'+
                                    '    def setReg(self, dat):\n'+
                                    '        self.buf[0] = dat\n'+
                                    '        i2c.write(self.lcd_i2c_addr, self.buf)\n'+
                                    '        sleep(1)\n'+
                                    '\n'+
                                    '    def send(self, dat):\n'+
                                    '        d=dat&0xF0\n'+
                                    '        d|=self.BK\n'+
                                    '        d|=self.RS\n'+
                                    '        self.setReg(d)\n'+
                                    '        self.setReg(d|0x04)\n'+
                                    '        self.setReg(d)\n'+
                                    '\n'+
                                    '    def setcmd(self, cmd):\n'+
                                    '        self.RS=0\n'+
                                    '        self.send(cmd)\n'+
                                    '        self.send(cmd<<4)\n'+
                                    '\n'+
                                    '    def setdat(self, dat):\n'+
                                    '        self.RS=1\n'+
                                    '        self.send(dat)\n'+
                                    '        self.send(dat<<4)\n'+
                                    '\n'+
                                    '    def clear(self):\n'+
                                    '        self.setcmd(1)\n'+
                                    '\n'+
                                    '    def backlight(self, on):\n'+
                                    '        if on:\n'+
                                    '            self.BK=0x08\n'+
                                    '        else:\n'+
                                    '            self.BK=0\n'+
                                    '        self.setdat(0)\n'+
                                    '\n'+
                                    '    def on(self):\n'+
                                    '        self.setcmd(0x0C)\n'+
                                    '\n'+
                                    '    def off(self):\n'+
                                    '        self.setcmd(0x08)\n'+
                                    '\n'+
                                    '    def char(self, ch, x=-1, y=0):\n'+
                                    '        if x>=0:\n'+
                                    '            a=0x80\n'+
                                    '            if y>0:\n'+
                                    '                a=0xC0\n'+
                                    '            a+=x\n'+
                                    '            self.setcmd(a)\n'+
                                    '        self.setdat(ch)\n'+
                                    '\n'+
                                    '    def puts(self, s, x=0, y=0):\n'+
                                    '        if len(s)>0:\n'+
                                    '            self.char(ord(s[0]),x,y)\n'+
                                    '            for i in range(1, len(s)):\n'+
                                    '                self.char(ord(s[i]))\n' +
                                    '\n'+
                                    '    def mixly_puts(self, s, x=1, y=1):\n'+
                                    '        s = str(s)\n' +
                                    '        x = x - 1\n' +
                                    '        y = y - 1\n' +
                                    '        self.puts(self, s, x, y)\n' +
                                    '\n'+
                                    '    def mixly_puts_two_lines(self, line1, line2):\n'+
                                    '        line1 = str(line1)\n' +
                                    '        line2 = str(line2)\n' +
                                    '        self.puts(self, line1, 0, 0)\n' +
                                    '        self.puts(self, line2, 0, 1)\n';
Blockly.Python.CLASS_OLED12864_I2C_INIT='class OLED12864_I2C():\n'+
                                        '    def __init__(self):\n'+
                                        '        cmd = [\n'+
                                        '            [0xAE],           # SSD1306_DISPLAYOFF\n'+
                                        '            [0xA4],           # SSD1306_DISPLAYALLON_RESUME\n'+
                                        '            [0xD5, 0xF0],     # SSD1306_SETDISPLAYCLOCKDIV\n'+
                                        '            [0xA8, 0x3F],     # SSD1306_SETMULTIPLEX\n'+
                                        '            [0xD3, 0x00],     # SSD1306_SETDISPLAYOFFSET\n'+
                                        '            [0 | 0x0],        # line #SSD1306_SETSTARTLINE\n'+
                                        '            [0x8D, 0x14],     # SSD1306_CHARGEPUMP\n'+
                                        '            [0x20, 0x00],     # SSD1306_MEMORYMODE\n'+
                                        '            [0x21, 0, 127],   # SSD1306_COLUMNADDR\n'+
                                        '            [0x22, 0, 63],    # SSD1306_PAGEADDR\n'+
                                        '            [0xa0 | 0x1],     # SSD1306_SEGREMAP\n'+
                                        '            [0xc8],           # SSD1306_COMSCANDEC\n'+
                                        '            [0xDA, 0x12],     # SSD1306_SETCOMPINS\n'+
                                        '            [0x81, 0xCF],     # SSD1306_SETCONTRAST\n'+
                                        '            [0xd9, 0xF1],     # SSD1306_SETPRECHARGE\n'+
                                        '            [0xDB, 0x40],     # SSD1306_SETVCOMDETECT\n'+
                                        '            [0xA6],           # SSD1306_NORMALDISPLAY\n'+
                                        '            [0xd6, 1],        # zoom on\n'+
                                        '            [0xaf]            # SSD1306_DISPLAYON\n'+
                                        '        ]\n'+
                                        '\n'+
                                        '        for c in cmd:\n'+
                                        '            self.command(c)\n'+
                                        '        self._ZOOM = 1\n'+
                                        '        self.ADDR = 0x3C \n'+
                                        '        self.screen = bytearray(1025)    # send byte plus pixels\n'+
                                        '        self.screen[0] = 0x40\n'+
                                        '\n'+
                                        '    def command(self, c):\n'+
                                        '        i2c.write(self.ADDR, b\'\x00\' + bytearray(c)) \n'+
                                        '\n'+
                                        '    def set_pos(self, col=0, page=0):\n'+
                                        '        self.command([0xb0 | page])    # page number\n'+
                                        '        # take upper and lower value of col * 2\n'+
                                        '        c = col * (self._ZOOM+1)\n'+
                                        '        c1, c2 = c & 0x0F, c >> 4\n'+
                                        '        self.command([0x00 | c1])    # lower start column address\n'+
                                        '        self.command([0x10 | c2])    # upper start column address \n'+
                                        '\n'+
                                        '    def pixel(self, x, y, color=1, draw=1):\n'+
                                        '        page, shift_page = divmod(y, 8)\n'+
                                        '        ind = x * (self._ZOOM+1) + page * 128 + 1\n'+
                                        '        b = self.screen[ind] | (1 << shift_page) if color else self.screen[ind] & ~ (1 << shift_page)\n'+
                                        '        self.screen[ind] = b\n'+
                                        '        self.set_pos(x, page)\n'+
                                        '        if self._ZOOM:\n'+
                                        '            self.screen[ind+1]=b\n'+
                                        '            i2c.write(0x3c, bytearray([0x40, b, b]))\n'+
                                        '        else:\n'+
                                        '            i2c.write(0x3c, bytearray([0x40, b]))\n'+
                                        '\n'+
                                        '    def zoom(self, d=1):\n'+
                                        '        self._ZOOM = 1 if d else 0\n'+
                                        '        self.command([0xd6, self._ZOOM])\n'+
                                        '\n'+
                                        '    def invert(self, v=1):\n'+
                                        '        n = 0xa7 if v else 0xa6\n'+
                                        '        self.command([n])\n'+
                                        '\n'+
                                        '    def clear(self, c=0):\n'+
                                        '        for i in range(1, 1025):\n'+
                                        '            self.screen[i] = 0\n'+
                                        '        self.draw()\n'+
                                        '\n'+
                                        '    def draw(self):\n'+
                                        '        self.set_pos()\n'+
                                        '        i2c.write(self.ADDR, self.screen) \n'+
                                        '\n'+
                                        '    def text(self, x, y, s, draw=1):\n'+
                                        '        for i in range(0, min(len(s), 12 - x)):\n'+
                                        '            for c in range(0, 5):\n'+
                                        '                col = 0\n'+
                                        '                for r in range(1, 6):\n'+
                                        '                    p = Image(s[i]).get_pixel(c, r - 1)\n'+
                                        '                    col = col | (1 << r) if (p != 0) else col\n'+
                                        '                ind = (x + i) * 5 * (self._ZOOM+1) + y * 128 + c*(self._ZOOM+1) + 1\n'+
                                        '                self.screen[ind] = col\n'+
                                        '                if self._ZOOM:\n'+
                                        '                    self.screen[ind + 1] = col\n'+
                                        '        self.set_pos(x * 5, y)\n'+
                                        '        ind0 = x * 5 * (self._ZOOM+1) + y * 128 + 1\n'+
                                        '        i2c.write(self.ADDR, b\'\x40\' + self.screen[ind0:ind + 1]) \n'+
                                        '\n'+
                                        '    def hline(self, x, y, l,c=1):\n'+
                                        '        d = 1 if l>0 else -1\n'+
                                        '        for i in range(x, x+l, d):\n'+
                                        '            self.pixel(i,y,c)\n'+
                                        '\n'+
                                        '    def vline(self, x, y, l,c=1):\n'+
                                        '        d = 1 if l>0 else -1\n'+
                                        '        for i in range(y, y+l,d):\n'+
                                        '            self.pixel(x,i,c,0)\n'+
                                        '\n'+
                                        '    def rect(self, x1,y1,x2,y2,c=1):\n'+
                                        '        self.hline(x1,y1,x2-x1+1,c)\n'+
                                        '        self.hline(x1,y2,x2-x1+1,c)\n'+
                                        '        self.vline(x1,y1,y2-y1+1,c)\n'+
                                        '        self.vline(x2,y1,y2-y1+1,c)\n'+
                                        '\n'+
                                        'oled = OLED12864_I2C()\n'+
                                        'def mixly_oled_text(s0, s1, s2, s3):\n' +
                                        '    oled.clear()\n' +
                                        '    oled.text(0, 0, s0)\n' +
                                        '    oled.text(0, 1, s1)\n' +
                                        '    oled.text(0, 2, s2)\n' +
                                        '    oled.text(0, 3, s3)\n';

Blockly.Python.CLASS_DS1307_INIT =  'DS1307_I2C_ADDRESS  = (104)\n'+
                                    'DS1307_REG_SECOND   = (0)\n'+
                                    'DS1307_REG_MINUTE   = (1)\n'+
                                    'DS1307_REG_HOUR     = (2)\n'+
                                    'DS1307_REG_WEEKDAY  = (3)\n'+
                                    'DS1307_REG_DAY      = (4)\n'+
                                    'DS1307_REG_MONTH    = (5)\n'+
                                    'DS1307_REG_YEAR     = (6)\n'+
                                    'DS1307_REG_CTRL     = (7)\n'+
                                    'DS1307_REG_RAM      = (8)\n'+
                                    'class DS1307():\n'+
                                    '    # set reg\n'+
                                    '    def setReg(self, reg, dat):\n'+
                                    '        i2c.write(DS1307_I2C_ADDRESS, bytearray([reg, dat]))\n'+
                                    '\n'+
                                    '    # get reg\n'+
                                    '    def getReg(self, reg):\n'+
                                    '        i2c.write(DS1307_I2C_ADDRESS, bytearray([reg]))\n'+
                                    '        t = i2c.read(DS1307_I2C_ADDRESS, 1)\n'+
                                    '        return t[0]\n'+
                                    '\n'+
                                    '    def start(self):\n'+
                                    '        t = self.getReg(DS1307_REG_SECOND)\n'+
                                    '        self.setReg(DS1307_REG_SECOND, t&0x7F)\n'+
                                    '\n'+
                                    '    def stop(self):\n'+
                                    '        t = self.getReg(DS1307_REG_SECOND)\n'+
                                    '        self.setReg(DS1307_REG_SECOND, t|0x80)\n'+
                                    '\n'+
                                    '    def DecToHex(self, dat):\n'+
                                    '        return (dat//10) * 16 + (dat%10)\n'+
                                    '\n'+
                                    '    def HexToDec(self, dat):\n'+
                                    '        return (dat//16) * 10 + (dat%16)\n'+
                                    '\n'+
                                    '    def DateTime(self, DT=None):\n'+
                                    '        if DT == None:\n'+
                                    '            i2c.write(DS1307_I2C_ADDRESS, bytearray([0]))\n'+
                                    '            buf = i2c.read(DS1307_I2C_ADDRESS, 7)\n'+
                                    '            DT = [0] * 8\n'+
                                    '            DT[0] = self.HexToDec(buf[6]) + 2000\n'+
                                    '            DT[1] = self.HexToDec(buf[5])\n'+
                                    '            DT[2] = self.HexToDec(buf[4])\n'+
                                    '            DT[3] = self.HexToDec(buf[3])\n'+
                                    '            DT[4] = self.HexToDec(buf[2])\n'+
                                    '            DT[5] = self.HexToDec(buf[1])\n'+
                                    '            DT[6] = self.HexToDec(buf[0])\n'+
                                    '            DT[7] = 0\n'+
                                    '            return DT\n'+
                                    '        else:\n'+
                                    '            buf = bytearray(8)\n'+
                                    '            buf[0] = 0\n'+
                                    '            buf[1] = self.DecToHex(DT[6]%60)    # second\n'+
                                    '            buf[2] = self.DecToHex(DT[5]%60)    # minute\n'+
                                    '            buf[3] = self.DecToHex(DT[4]%24)    # hour\n'+
                                    '            buf[4] = self.DecToHex(DT[3]%8)     # week day\n'+
                                    '            buf[5] = self.DecToHex(DT[2]%32)    # date\n'+
                                    '            buf[6] = self.DecToHex(DT[1]%13)    # month\n'+
                                    '            buf[7] = self.DecToHex(DT[0]%100)   # year\n'+
                                    '            i2c.write(DS1307_I2C_ADDRESS, buf) \n'+
                                    '\n'+
                                    '    def Year(self, year = None):\n'+
                                    '        if year == None:\n'+
                                    '            return self.HexToDec(self.getReg(DS1307_REG_YEAR)) + 2000\n'+
                                    '        else:\n'+
                                    '            self.setReg(DS1307_REG_YEAR, self.DecToHex(year%100))\n'+
                                    '\n'+
                                    '    def Month(self, month = None):\n'+
                                    '        if month == None:\n'+
                                    '            return self.HexToDec(self.getReg(DS1307_REG_MONTH))\n'+
                                    '        else:\n'+
                                    '            self.setReg(DS1307_REG_MONTH, self.DecToHex(month%13))\n'+
                                    '            \n'+
                                    '    def Day(self, day = None):\n'+
                                    '        if day == None:\n'+
                                    '            return self.HexToDec(self.getReg(DS1307_REG_DAY))\n'+
                                    '        else:\n'+
                                    '            self.setReg(DS1307_REG_DAY, self.DecToHex(day%32))\n'+
                                    '\n'+
                                    '    def Weekday(self, weekday = None):\n'+
                                    '        if weekday == None:\n'+
                                    '            return self.HexToDec(self.getReg(DS1307_REG_WEEKDAY))\n'+
                                    '        else:\n'+
                                    '            self.setReg(DS1307_REG_WEEKDAY, self.DecToHex(weekday%8))\n'+
                                    '\n'+
                                    '    def Hour(self, hour = None):\n'+
                                    '        if hour == None:\n'+
                                    '            return self.HexToDec(self.getReg(DS1307_REG_HOUR))\n'+
                                    '        else:\n'+
                                    '            self.setReg(DS1307_REG_HOUR, self.DecToHex(hour%24))\n'+
                                    '\n'+
                                    '    def Minute(self, minute = None):\n'+
                                    '        if minute == None:\n'+
                                    '            return self.HexToDec(self.getReg(DS1307_REG_MINUTE))\n'+
                                    '        else:\n'+
                                    '            self.setReg(DS1307_REG_MINUTE, self.DecToHex(minute%60))\n'+
                                    '\n'+
                                    '    def Second(self, second = None):\n'+
                                    '        if second == None:\n'+
                                    '            return self.HexToDec(self.getReg(DS1307_REG_SECOND))\n'+
                                    '        else:\n'+
                                    '            self.setReg(DS1307_REG_SECOND, self.DecToHex(second%60))\n'+
                                    '\n'+
                                    '    def ram(self, reg, dat = None):\n'+
                                    '        if dat == None:\n'+
                                    '            return self.getReg(DS1307_REG_RAM + (reg%56))\n'+
                                    '        else:\n'+
                                    '            self.setReg(DS1307_REG_RAM + (reg%56), dat)\n'+
                                    '\n'+
                                    '    def get_time(self):\n'+
                                    '        return self.Hour() + self.Minute() + self.Second()\n'+
                                    '\n'+
                                    '    def get_date(self):\n'+
                                    '        return self.Year() + self.Month() + self.Day()\n'+
                                    '\n'+
                                    '    def set_time(self, hour, minute, second):\n'+
                                    '        self.Hour(hour)\n' +
                                    '        self.Minute(minute)\n' +
                                    '        self.Second(second)\n' +
                                    '\n'+
                                    '    def set_date(self, year, month, day):\n'+
                                    '        self.Year(year)\n' +
                                    '        self.Month(month)\n' +
                                    '        self.Day(day)\n' +
                                    '\n'+
                                    'ds = DS1307()\n'
Blockly.Python.FUNCTION_MIXLY_RGB_SHOW = 'def mixly_rgb_show(led, r, g, b):\n' +
                                         '    np[led-1] = (r, g, b)\n' +
                                         '    np.show()\n';
