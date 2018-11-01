ace.define("ace/mode/python_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var PythonHighlightRules = function() {

    var keywords = (
        "and|as|assert|break|class|continue|def|del|elif|else|except|exec|" +
        "finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|" +
        "raise|return|try|while|with|yield|async|await" 
    );

    var builtinConstants = (
        "True|False|None|NotImplemented|Ellipsis|__debug__|"+
        // micropythonConstants
        "RATE_250KBIT|RATE_1MBIT|RATE_2MBIT"
        
    );

    var builtinFunctions = (
        "abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|" +
        "eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|" +
        "binfile|iter|property|tuple|bool|filter|len|range|type|bytearray|" +
        "float|list|raw_input|unichr|callable|format|locals|reduce|unicode|" +
        "chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|" +
        "cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|" +
        "__import__|complex|hash|min|set|apply|delattr|help|next|setattr|" +
        "buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern|"+
        // micropythonFunctions
        "sleep|running_time|panic|reset|temperature|sleep_us|sleep_s|sleep_ms|ticks_ms|ticks_us|"+
        // micropythonButtonFunctions
        "is_pressed|was_pressed|get_presses|"+
        // micropythonDisplayFunctions
        "get_pixel|set_pixel|clear|show|scroll|on|off|is_on|get_brightness|blink_rate|clear|show_str|show_line|show_hline|show_vline|show_rect|"+
        // micropythonPinIOFunctions
        "write_digital|read_digital|write_analog|read_analog|set_analog_period|set_analog_period_microseconds|is_touched|value|duty|freq|irq|"+
        // micropythonImageFunctions
        "Image|width|height|set_pixel|get_pixel|shift_left|shift_right|shift_up|shift_down|repr|str|crop|copy|invert|fill|blit|"+
        // micropythonAccelerometerFunctions
        "get_x|get_y|get_z|get_values|current_gesture|is_gesture|was_gesture|get_gestures|"+
        // micropythonCompassFunctions
        "calibrate|heading|get_field_strength|is_calibrated|clear_calibration|get_temperature|pressure|get_relative_humidity|"+
        // micropythonI2CFunctions
        "read|write|readfrom|writeto|scan|available|write_readinto|"+
        // micropythonUartFunctions
        "init|any|read|readall|readline|readinto|write|writable|close|name|"+
        // micropythonMusicFunctions
        "set_tempo|get_tempo|play|pitch|stop|reset|"+
        // micropythonOSFunctions
        "listdir|remove|size|uname|"+
        // micropythonRadioFunctions
        "on|off|config|reset|send_bytes|receive_bytes|receive_full|receive_bytes_into|send|receive|"+
        // micropythonRandomFunctions
        "getrandbits|seed|randint|randrange|choice|random|uniform|"+
        // micropythonSpeechFunctions
        "pronounce|speech|sing|translate|"+
        // microPythonNetworkFunctions
        "WLAN|ifconfig|config|isconnected|connect|disconnect|scan|active|"+
        // microPythonSocketFunctions
        "socket|bind|listen|accept|send|recv|sendto|recvfrom|close|"+
        // microPythonIOTFunctions
        "init_MQTT_client|do_connect|publish|pubData|check_msg|disconnect|"+
        // microPythonOtherSensorFunctions
        "datetime|near|get_BMP_temperature|get_BMP_pressure|get_SHT_temperature|get_SHT_relative_humidity|checkdist|select_rom|scan|"+
        // microPythonOtherActuatorFunctions
        "write_angle|setonoff|getonoff|setbrightness|"+
        // pythonOtherFunctions
        "reverse|pop|insert|append|extend|index|count|encode|decode|lower|title|ljust|center|rjust|"+
        "find|replace|split|strip|"+
        "keys|values|"+
        "union|intersection|difference|update|intersection_update|difference_update|"+
        "add|discard|issubset|issuperset|mahaotian"
    );

    var micropythonKeywords = (
        "microbit|button|display|accelerometer|compass|i2c|uart|button_a|button_b|os|music|radio|random|speech|"+
        "pin0|pin1|pin2|pin3|pin4|pin5|pin6|pin7|pin8|pin9|pin10|"+
        "pin10|pin11|pin12|pin13|pin14|pin15|pin16|pin17|pin18|pin19|pin20"
    );

    var imageKeywords = (
        "Image.HEART|Image.HEART_SMALL|Image.HAPPY|Image.SMILE|Image.SAD|Image.CONFUSED|Image.ANGRY|Image.ASLEEP|" +
        "Image.SURPRISED|Image.SILLY|Image.FABULOUS|Image.MEH|Image.YES|Image.NO|" +
        "Image.CLOCK12|Image.CLOCK11|Image.CLOCK10|Image.CLOCK9|Image.CLOCK8|Image.CLOCK7|" +
        "Image.CLOCK6|Image.CLOCK5|Image.CLOCK4|Image.CLOCK3|Image.CLOCK2|Image.CLOCK1|" +
        "Image.ARROW_N|Image.ARROW_NE|Image.ARROW_E|Image.ARROW_SE|Image.ARROW_S|Image.ARROW_SW|Image.ARROW_W|Image.ARROW_NW|" +
        "Image.TRIANGLE|Image.TRIANGLE_LEFT|Image.CHESSBOARD|Image.DIAMOND|Image.DIAMOND_SMALL|Image.SQUARE|Image.SQUARE_SMALL|" +
        "Image.RABBIT|Image.COW|Image.MUSIC_CROTCHET|Image.MUSIC_QUAVER|Image.MUSIC_QUAVERS|Image.PITCHFORK|Image.XMAS|" +
        "Image.PACMAN|Image.TARGET|Image.TSHIRT|Image.ROLLERSKATE|Image.DUCK|Image.HOUSE|Image.TORTOISE|Image.BUTTERFLY|" +
        "Image.STICKFIGURE|Image.GHOST|Image.SWORD|Image.GIRAFFE|Image.SKULL|Image.UMBRELLA|Image.SNAKE|Image.ALL_CLOCKS|Image.ALL_ARROWS"
    );

    var musicKeywords = (
        "music.DADADADUM|music.ENTERTAINER|music.PRELUDE|music.ODE|music.NYAN|music.RINGTONE|music.FUNK|"+
        "music.BLUES|music.BIRTHDAY|music.WEDDING|music.FUNERAL|music.PUNCHLINE|music.PYTHON|music.BADDY|"+
        "music.CHASE|music.BA_DING|music.WAWAWAWAA|music.JUMP_UP|music.JUMP_DOWN|music.POWER_UP|music.POWER_DOWN"
    );

    var keywordMapper = this.createKeywordMapper({
        "invalid.deprecated": "debugger",
        "support.function": builtinFunctions,
        "constant.language": builtinConstants,
        "keyword": keywords, micropythonKeywords, imageKeywords, musicKeywords
    }, "identifier");

    var strPre = "(?:r|u|ur|R|U|UR|Ur|uR)?";

    var decimalInteger = "(?:(?:[1-9]\\d*)|(?:0))";
    var octInteger = "(?:0[oO]?[0-7]+)";
    var hexInteger = "(?:0[xX][\\dA-Fa-f]+)";
    var binInteger = "(?:0[bB][01]+)";
    var integer = "(?:" + decimalInteger + "|" + octInteger + "|" + hexInteger + "|" + binInteger + ")";

    var exponent = "(?:[eE][+-]?\\d+)";
    var fraction = "(?:\\.\\d+)";
    var intPart = "(?:\\d+)";
    var pointFloat = "(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))";
    var exponentFloat = "(?:(?:" + pointFloat + "|" +  intPart + ")" + exponent + ")";
    var floatNumber = "(?:" + exponentFloat + "|" + pointFloat + ")";

    var stringEscape =  "\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";

    this.$rules = {
        "start" : [ {
            token : "comment",
            regex : "#.*$"
        }, {
            token : "string",           // multi line """ string start
            regex : strPre + '"{3}',
            next : "qqstring3"
        }, {
            token : "string",           // " string
            regex : strPre + '"(?=.)',
            next : "qqstring"
        }, {
            token : "string",           // multi line ''' string start
            regex : strPre + "'{3}",
            next : "qstring3"
        }, {
            token : "string",           // ' string
            regex : strPre + "'(?=.)",
            next : "qstring"
        }, {
            token : "constant.numeric", // imaginary
            regex : "(?:" + floatNumber + "|\\d+)[jJ]\\b"
        }, {
            token : "constant.numeric", // float
            regex : floatNumber
        }, {
            token : "constant.numeric", // long integer
            regex : integer + "[lL]\\b"
        }, {
            token : "constant.numeric", // integer
            regex : integer + "\\b"
        }, {
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "keyword.operator",
            regex : "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="
        }, {
            token : "paren.lparen",
            regex : "[\\[\\(\\{]"
        }, {
            token : "paren.rparen",
            regex : "[\\]\\)\\}]"
        }, {
            token : "text",
            regex : "\\s+"
        } ],
        "qqstring3" : [ {
            token : "constant.language.escape",
            regex : stringEscape
        }, {
            token : "string", // multi line """ string end
            regex : '"{3}',
            next : "start"
        }, {
            defaultToken : "string"
        } ],
        "qstring3" : [ {
            token : "constant.language.escape",
            regex : stringEscape
        }, {
            token : "string",  // multi line ''' string end
            regex : "'{3}",
            next : "start"
        }, {
            defaultToken : "string"
        } ],
        "qqstring" : [{
            token : "constant.language.escape",
            regex : stringEscape
        }, {
            token : "string",
            regex : "\\\\$",
            next  : "qqstring"
        }, {
            token : "string",
            regex : '"|$',
            next  : "start"
        }, {
            defaultToken: "string"
        }],
        "qstring" : [{
            token : "constant.language.escape",
            regex : stringEscape
        }, {
            token : "string",
            regex : "\\\\$",
            next  : "qstring"
        }, {
            token : "string",
            regex : "'|$",
            next  : "start"
        }, {
            defaultToken: "string"
        }]
    };
};

oop.inherits(PythonHighlightRules, TextHighlightRules);

exports.PythonHighlightRules = PythonHighlightRules;
});

ace.define("ace/mode/folding/pythonic",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(markers) {
    this.foldingStartMarker = new RegExp("([\\[{])(?:\\s*)$|(" + markers + ")(?:\\s*)(?:#.*)?$");
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var match = line.match(this.foldingStartMarker);
        if (match) {
            if (match[1])
                return this.openingBracketBlock(session, match[1], row, match.index);
            if (match[2])
                return this.indentationBlock(session, row, match.index + match[2].length);
            return this.indentationBlock(session, row);
        }
    };

}).call(FoldMode.prototype);

});

ace.define("ace/mode/python",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/python_highlight_rules","ace/mode/folding/pythonic","ace/range"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var PythonHighlightRules = require("./python_highlight_rules").PythonHighlightRules;
var PythonFoldMode = require("./folding/pythonic").FoldMode;
var Range = require("../range").Range;

var Mode = function() {
    this.HighlightRules = PythonHighlightRules;
    this.foldingRules = new PythonFoldMode("\\:");
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "#";

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        if (state == "start") {
            var match = line.match(/^.*[\{\(\[:]\s*$/);
            if (match) {
                indent += tab;
            }
        }

        return indent;
    };

    var outdents = {
        "pass": 1,
        "return": 1,
        "raise": 1,
        "break": 1,
        "continue": 1
    };
    
    this.checkOutdent = function(state, line, input) {
        if (input !== "\r\n" && input !== "\r" && input !== "\n")
            return false;

        var tokens = this.getTokenizer().getLineTokens(line.trim(), state).tokens;
        
        if (!tokens)
            return false;
        do {
            var last = tokens.pop();
        } while (last && (last.type == "comment" || (last.type == "text" && last.value.match(/^\s+$/))));
        
        if (!last)
            return false;
        
        return (last.type == "keyword" && outdents[last.value]);
    };

    this.autoOutdent = function(state, doc, row) {
        
        row += 1;
        var indent = this.$getIndent(doc.getLine(row));
        var tab = doc.getTabString();
        if (indent.slice(-tab.length) == tab)
            doc.remove(new Range(row, indent.length-tab.length, row, indent.length));
    };

    this.$id = "ace/mode/python";
}).call(Mode.prototype);

exports.Mode = Mode;
});
