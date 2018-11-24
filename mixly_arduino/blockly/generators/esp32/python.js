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
Blockly.Python.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.Python.ORDER_EXPONENTIATION = 2.5;    // **
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
                                    '    def __init__(self):\n'+
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
                                    '\n'+
                                    '    def setReg(self, dat):\n'+
                                    '        self.buf[0] = dat\n'+
                                    '        i2c.write(LCD_I2C_ADDR, self.buf)\n'+
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
                                    '                self.char(ord(s[i]))\n';

Blockly.Python.CLASS_OLED12864_I2C_INIT='cmd = [\n'+
                                        '    [0xAE],           # SSD1306_DISPLAYOFF\n'+
                                        '    [0xA4],           # SSD1306_DISPLAYALLON_RESUME\n'+
                                        '    [0xD5, 0xF0],     # SSD1306_SETDISPLAYCLOCKDIV\n'+
                                        '    [0xA8, 0x3F],     # SSD1306_SETMULTIPLEX\n'+
                                        '    [0xD3, 0x00],     # SSD1306_SETDISPLAYOFFSET\n'+
                                        '    [0 | 0x0],        # line #SSD1306_SETSTARTLINE\n'+
                                        '    [0x8D, 0x14],     # SSD1306_CHARGEPUMP\n'+
                                        '    [0x20, 0x00],     # SSD1306_MEMORYMODE\n'+
                                        '    [0x21, 0, 127],   # SSD1306_COLUMNADDR\n'+
                                        '    [0x22, 0, 63],    # SSD1306_PAGEADDR\n'+
                                        '    [0xa0 | 0x1],     # SSD1306_SEGREMAP\n'+
                                        '    [0xc8],           # SSD1306_COMSCANDEC\n'+
                                        '    [0xDA, 0x12],     # SSD1306_SETCOMPINS\n'+
                                        '    [0x81, 0xCF],     # SSD1306_SETCONTRAST\n'+
                                        '    [0xd9, 0xF1],     # SSD1306_SETPRECHARGE\n'+
                                        '    [0xDB, 0x40],     # SSD1306_SETVCOMDETECT\n'+
                                        '    [0xA6],           # SSD1306_NORMALDISPLAY\n'+
                                        '    [0xd6, 1],        # zoom on\n'+
                                        '    [0xaf]            # SSD1306_DISPLAYON\n'+
                                        ']\n'+
                                        '\n'+
                                        'ADDR = 0x3C \n'+
                                        'screen = bytearray(1025)    # send byte plus pixels\n'+
                                        'screen[0] = 0x40\n'+
                                        '_ZOOM=1\n'+
                                        '\n'+
                                        'class OLED12864_I2C():\n'+
                                        '    def __init__(self):\n'+
                                        '        for c in cmd:\n'+
                                        '            self.command(c)\n'+
                                        '        _ZOOM = 1\n'+
                                        '\n'+
                                        '    def command(self, c):\n'+
                                        '        i2c.write(ADDR, b\'\x00\' + bytearray(c)) \n'+
                                        '\n'+
                                        '    def set_pos(self, col=0, page=0):\n'+
                                        '        self.command([0xb0 | page])    # page number\n'+
                                        '        # take upper and lower value of col * 2\n'+
                                        '        c = col * (_ZOOM+1)\n'+
                                        '        c1, c2 = c & 0x0F, c >> 4\n'+
                                        '        self.command([0x00 | c1])    # lower start column address\n'+
                                        '        self.command([0x10 | c2])    # upper start column address \n'+
                                        '\n'+
                                        '    def pixel(self, x, y, color=1, draw=1):\n'+
                                        '        page, shift_page = divmod(y, 8)\n'+
                                        '        ind = x * (_ZOOM+1) + page * 128 + 1\n'+
                                        '        b = screen[ind] | (1 << shift_page) if color else screen[ind] & ~ (1 << shift_page)\n'+
                                        '        screen[ind] = b\n'+
                                        '        self.set_pos(x, page)\n'+
                                        '        if _ZOOM:\n'+
                                        '            screen[ind+1]=b\n'+
                                        '            i2c.write(0x3c, bytearray([0x40, b, b]))\n'+
                                        '        else:\n'+
                                        '            i2c.write(0x3c, bytearray([0x40, b]))\n'+
                                        '\n'+
                                        '    def zoom(self, d=1):\n'+
                                        '        global _ZOOM\n'+
                                        '        _ZOOM = 1 if d else 0\n'+
                                        '        self.command([0xd6, _ZOOM])\n'+
                                        '\n'+
                                        '    def invert(self, v=1):\n'+
                                        '        n = 0xa7 if v else 0xa6\n'+
                                        '        self.command([n])\n'+
                                        '\n'+
                                        '    def clear(self, c=0):\n'+
                                        '        global screen\n'+
                                        '        for i in range(1, 1025):\n'+
                                        '            screen[i] = 0\n'+
                                        '        self.draw()\n'+
                                        '\n'+
                                        '    def draw(self):\n'+
                                        '        self.set_pos()\n'+
                                        '        i2c.write(ADDR, screen) \n'+
                                        '\n'+
                                        '    def text(self, x, y, s, draw=1):\n'+
                                        '        for i in range(0, min(len(s), 12 - x)):\n'+
                                        '            for c in range(0, 5):\n'+
                                        '                col = 0\n'+
                                        '                for r in range(1, 6):\n'+
                                        '                    p = Image(s[i]).get_pixel(c, r - 1)\n'+
                                        '                    col = col | (1 << r) if (p != 0) else col\n'+
                                        '                ind = (x + i) * 5 * (_ZOOM+1) + y * 128 + c*(_ZOOM+1) + 1\n'+
                                        '                screen[ind] = col\n'+
                                        '                if _ZOOM:\n'+
                                        '                    screen[ind + 1] = col\n'+
                                        '        self.set_pos(x * 5, y)\n'+
                                        '        ind0 = x * 5 * (_ZOOM+1) + y * 128 + 1\n'+
                                        '        i2c.write(ADDR, b\'\x40\' + screen[ind0:ind + 1]) \n'+
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
                                        'oled.clear()\n'

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
                                    '# set reg\n'+
                                    '    def setReg(self, reg, dat):\n'+
                                    '        i2c.write(DS1307_I2C_ADDRESS, bytearray([reg, dat]))\n'+
                                    '\n'+
                                    '# get reg\n'+
                                    '    def getReg(self, reg):\n'+
                                    '        i2c.write(DS1307_I2C_ADDRESS, bytearray([reg]))\n'+
                                    '        t =    i2c.read(DS1307_I2C_ADDRESS, 1)\n'+
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
                                    'ds = DS1307()\n'

Blockly.Python.CLASS_SSD1306oled_INIT = 'currentBoard=""\n'+
                                        'if(sys.platform=="esp8266"):\n'+
                                        '  currentBoard="esp8266"\n'+
                                        'elif(sys.platform=="esp32"):\n'+
                                        '  currentBoard="esp32"\n'+
                                        'elif(sys.platform=="pyboard"):\n'+
                                        '  currentBoard="pyboard"\n'+
                                        '  import pyb\n'+
                                        'SET_CONTRAST        = const(0x81)\n'+
                                        'SET_ENTIRE_ON       = const(0xa4)\n'+
                                        'SET_NORM_INV        = const(0xa6)\n'+
                                        'SET_DISP            = const(0xae)\n'+
                                        'SET_MEM_ADDR        = const(0x20)\n'+
                                        'SET_COL_ADDR        = const(0x21)\n'+
                                        'SET_PAGE_ADDR       = const(0x22)\n'+
                                        'SET_DISP_START_LINE = const(0x40)\n'+
                                        'SET_SEG_REMAP       = const(0xa0)\n'+
                                        'SET_MUX_RATIO       = const(0xa8)\n'+
                                        'SET_COM_OUT_DIR     = const(0xc0)\n'+
                                        'SET_DISP_OFFSET     = const(0xd3)\n'+
                                        'SET_COM_PIN_CFG     = const(0xda)\n'+
                                        'SET_DISP_CLK_DIV    = const(0xd5)\n'+
                                        'SET_PRECHARGE       = const(0xd9)\n'+
                                        'SET_VCOM_DESEL      = const(0xdb)\n'+
                                        'SET_CHARGE_PUMP     = const(0x8d)\n'+
                                        'class SSD1306:\n'+
                                        '\n'+
                                        '  def __init__(self, width, height, external_vcc):\n'+
                                        '    self.width = width\n'+
                                        '    self.height = height\n'+
                                        '    self.external_vcc = external_vcc\n'+
                                        '    self.pages = self.height // 8\n'+
                                        '    self.buffer = bytearray(self.pages * self.width)\n'+
                                        '    self.framebuf = framebuf.FrameBuffer(self.buffer, self.width, self.height, framebuf.MVLSB)\n'+
                                        '    self.poweron()\n'+
                                        '    self.init_display()\n'+
                                        '\n'+
                                        '  def init_display(self):\n'+
                                        '    for cmd in (\n'+
                                        '      SET_DISP | 0x00, # off\n'+
                                        '      SET_MEM_ADDR, 0x00, # horizontal\n'+
                                        '      SET_DISP_START_LINE | 0x00,\n'+
                                        '      SET_SEG_REMAP | 0x01, \n'+
                                        '      SET_MUX_RATIO, self.height - 1,\n'+
                                        '      SET_COM_OUT_DIR | 0x08,\n'+
                                        '      SET_DISP_OFFSET, 0x00,\n'+
                                        '      SET_COM_PIN_CFG, 0x02 if self.height == 32 else 0x12,\n'+
                                        '      SET_DISP_CLK_DIV, 0x80,\n'+
                                        '      SET_PRECHARGE, 0x22 if self.external_vcc else 0xf1,\n'+
                                        '      SET_VCOM_DESEL, 0x30, # 0.83*Vcc\n'+
                                        '      SET_CONTRAST, 0xff, \n'+
                                        '      SET_ENTIRE_ON, \n'+
                                        '      SET_NORM_INV, \n'+
                                        '      SET_CHARGE_PUMP, 0x10 if self.external_vcc else 0x14,\n'+
                                        '      SET_DISP | 0x01): \n'+
                                        '      self.write_cmd(cmd)\n'+
                                        '    self.fill(0)\n'+
                                        '    self.show()\n'+
                                        '\n'+
                                        '  def poweroff(self):\n'+
                                        '    self.write_cmd(SET_DISP | 0x00)\n'+
                                        '\n'+
                                        '  def contrast(self, contrast):\n'+
                                        '    self.write_cmd(SET_CONTRAST)\n'+
                                        '    self.write_cmd(contrast)\n'+
                                        '\n'+
                                        '  def invert(self, invert):\n'+
                                        '    self.write_cmd(SET_NORM_INV | (invert & 1))\n'+
                                        '\n'+
                                        '  def show(self):\n'+
                                        '    x0 = 0\n'+
                                        '    x1 = self.width - 1\n'+
                                        '    if self.width == 64:\n'+
                                        '      x0 += 32\n'+
                                        '      x1 += 32\n'+
                                        '    self.write_cmd(SET_COL_ADDR)\n'+
                                        '    self.write_cmd(x0)\n'+
                                        '    self.write_cmd(x1)\n'+
                                        '    self.write_cmd(SET_PAGE_ADDR)\n'+
                                        '    self.write_cmd(0)\n'+
                                        '    self.write_cmd(self.pages - 1)\n'+
                                        '    self.write_data(self.buffer)\n'+
                                        '\n'+
                                        '  def fill(self, col):\n'+
                                        '    self.framebuf.fill(col)\n'+
                                        '\n'+
                                        '  def pixel(self, x, y, col):\n'+
                                        '    self.framebuf.pixel(x, y, col)\n'+
                                        '\n'+
                                        '  def scroll(self, dx, dy):\n'+
                                        '    self.framebuf.scroll(dx, dy)\n'+
                                        '\n'+
                                        '  def text(self, string, x, y, col=1):\n'+
                                        '    self.framebuf.text(string, x, y, col)\n'+
                                        '\n'+
                                        '  def hline(self, x, y, w, col):\n'+
                                        '    self.framebuf.hline(x, y, w, col)\n'+
                                        '\n'+
                                        '  def vline(self, x, y, h, col):\n'+
                                        '    self.framebuf.vline(x, y, h, col)\n'+
                                        '\n'+
                                        '  def line(self, x1, y1, x2, y2, col):\n'+
                                        '    self.framebuf.line(x1, y1, x2, y2, col)\n'+
                                        '\n'+
                                        '  def rect(self, x, y, w, h, col):\n'+
                                        '    self.framebuf.rect(x, y, w, h, col)\n'+
                                        '\n'+
                                        '  def fill_rect(self, x, y, w, h, col):\n'+
                                        '    self.framebuf.fill_rect(x, y, w, h, col)\n'+
                                        '\n'+
                                        '  def blit(self, fbuf, x, y):\n'+
                                        '    self.framebuf.blit(fbuf, x, y)\n'+
                                        '\n'+
                                        'class SSD1306_I2C(SSD1306):\n'+
                                        '  def __init__(self, width, height, i2c, addr=0x3c, external_vcc=False):\n'+
                                        '    self.i2c = i2c\n'+
                                        '    self.addr = addr\n'+
                                        '    self.temp = bytearray(2)\n'+
                                        '    super().__init__(width, height, external_vcc)\n'+
                                        '\n'+
                                        '  def write_cmd(self, cmd):\n'+
                                        '    self.temp[0] = 0x80 # Co=1, D/C#=0\n'+
                                        '    self.temp[1] = cmd\n'+
                                        '    global currentBoard\n'+
                                        '    if currentBoard=="esp8266" or currentBoard=="esp32":\n'+
                                        '      self.i2c.writeto(self.addr, self.temp)\n'+
                                        '    elif currentBoard=="pyboard":\n'+
                                        '      self.i2c.send(self.temp,self.addr)\n'+
                                        '          \n'+
                                        '  def write_data(self, buf):\n'+
                                        '    self.temp[0] = self.addr << 1\n'+
                                        '    self.temp[1] = 0x40 # Co=0, D/C#=1\n'+
                                        '    global currentBoard\n'+
                                        '    if currentBoard=="esp8266" or currentBoard=="esp32":\n'+
                                        '      self.i2c.start()\n'+
                                        '      self.i2c.write(self.temp)\n'+
                                        '      self.i2c.write(buf)\n'+
                                        '      self.i2c.stop()\n'+
                                        '    elif currentBoard=="pyboard":\n'+
                                        '     self.i2c.mem_write(buf,self.addr,0x40)\n'+
                                        '\n'+
                                        '  def poweron(self):\n'+
                                        '    pass\n'+
                                        'lcd=SSD1306_I2C(128,64,i2c)\n'
                                        
