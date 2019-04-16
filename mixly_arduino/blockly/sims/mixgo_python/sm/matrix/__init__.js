var $builtinmodule = function(name) {
    var mod = {

    };
    var display = function(name) {
        var mod = {
            data: {
                width: 16,
                height: 8,
                brightness: 1,
                blinkRate: 2,
            },
        };
        var leds = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

        function setLED(x, y, brightness) {
            ui.setMatrixLED(x, y, brightness);
            leds[y][x] = brightness;
        }

        function clearScreen() {
            var x,y;
            for(x = 0; x < 16; x++) {
                for(y = 0; y < 8; y++) {
                    setLED(x, y, 0);
                }
            }
        }
        function setBrightness(brightness){
            mod.data.brightness = brightness;
        }
        function getBrightness(){
            return mod.data.brightness;
        }
        function showCharacter(c) {
            var x, y;
            var rows = ['', '', '', '', ''];

            var letter = letters[" "];
            if(letters.hasOwnProperty(c)) {
                letter = letters[c];
            }
            for(y = 0; y < 5; y++) {
                for(x = 0; x < 5; x++) {
                    setLED(x, y, letter[y][x]);
                }
            }

        }
        var bf = new Object();
        bf._font_width = parseInt(fontbinArr[0].substring(0,2),16);
        bf._font_height = parseInt(fontbinArr[0].substring(2),16);
        debugger;
        console.log(mod.data.width);
        bf._screen_width = mod.data.width;
        bf._screen_height = mod.data.height;
        bf.draw_char = function(ch, x, y){
            var _font_width = parseInt(fontbinArr[0].substring(0,2),16);
            var _font_height = parseInt(fontbinArr[0].substring(2),16);
            if (x < -_font_width || y < -_font_height || x >= this._screen_width || y >= this._screen_height){
                return; //超出可视区域就不用画了
            }
            for(var char_x = 0; char_x < _font_width; char_x++){
                var location = parseInt((2 + ch.charCodeAt() * _font_width + char_x) / 2);
                var offset = ((2 + ch.charCodeAt() * _font_width + char_x) % 2) * 2;
                var linestr = fontbinArr[location].substring(offset, offset + 2);
                var line = parseInt(linestr,16);
                for(var char_y = 0; char_y < _font_height; char_y++){
                    if((line >>> char_y) & 0x1){
                        setLED(x + char_x, y + char_y, 15);
                    }
                }
            }
        };
        bf.text = function(text, x, y){
            debugger;
            for(var i = 0; i < text.length; i++){
                this.draw_char(text[i], x + (i * (this._font_width + 1)), y);
            }
        }
        bf.width = function(text){
            return text.length * (this._font_width + 1);
        }


        mod.get_pixel = new Sk.builtin.func(function(x, y) {
            return new Sk.builtin.int_(parseInt(leds[y.v][x.v]));
        });

        mod.set_pixel = new Sk.builtin.func(function(x, y, brightness) {
            setLED(parseInt(x.v), parseInt(y.v), parseInt(brightness.v));
        });

        mod.clear = new Sk.builtin.func(function() {
            clearScreen();
        });
        mod.set_brightness = new Sk.builtin.func(function(brightness) {
            setBrightness(brightness.v);
        });
        mod.get_brightness = new Sk.builtin.func(function() {
            return new Sk.builtin.int_(getBrightness());
        });
        mod.blink_rate = new Sk.builtin.func(function(blink_rate) {
            mod.data.blinkRate = blink_rate.v;
        });

        var show = function(image, delay, wait, loop, clear) {
            if(wait === undefined)
                wait = Sk.builtin.bool(true);

            if(loop === undefined)
                loop = Sk.builtin.bool(false);

            if(clear === undefined)
                clear = Sk.builtin.bool(false);

            if(delay === undefined)
                delay = Sk.builtin.int_(400);

            if(image.tp$name == "number") {
                throw new Sk.builtin.TypeError("Convert the number to a string before showing it");
                image = new Sk.builtin.str(image.v);
            }

            return sim.runAsync(function(resolve, reject) {
                if(image && (image.tp$name == "list" || (image.tp$name == "str" && image.v.length > 1))) {
                    var i = 0;

                    function showNextFrame() {
                        if(i >= image.v.length) {
                            if(loop.v) {
                                i = 0;
                            } else {
                                if(clear.v) {
                                    clearScreen();
                                }
                                if(wait.v) {
                                    resolve();
                                }
                                return;
                            }

                        }

                        if(image.v[i].tp$name == "Image") {
                            for(y = 0; y < 8; y++) {
                                for(x = 0; x < 16; x++) {
                                    setLED(x, y, image.v[i].lines[y][x]);
                                }
                            }
                        }
                        if(image.tp$name == "str") {
                            showCharacter(image.v[i]);
                        }

                        if(image.v[i].tp$name == "str") {
                            showCharacter(image.v[i].v[0]);
                        }

                        i++;
                        setTimeout(showNextFrame, delay.v)
                    }

                    showNextFrame();
                    if(!wait.v) {
                        resolve();
                    }
                } else {
                    if(image.tp$name == "Image") {
                        for(y = 0; y < 8; y++) {
                            for(x = 0; x < 16; x++) {
                                if(image.lines[y][x] > 0)
                                setLED(x, y, mod.data.brightness);
                            }
                        }
                    }
                    if(image.tp$name == "str") {
                        showCharacter(image.v[0]);
                    }
                    resolve();
                }
            });
        }
        show.co_varnames = ['image', 'delay', 'wait', 'loop', 'clear'];
        show.$defaults = [Sk.builtin.none, Sk.builtin.none, true, true, false];
        show.co_numargs = 5;
        mod.show = new Sk.builtin.func(show);

        function scroll(message, speed) {
            //draw_char(message.v[0], 0, 0);
            var screenWidth = mod.data.width;
            var screenHeight = mod.data.height;
            if(speed == undefined)
                speed = Sk.builtin.int_(120);

            if(message.tp$name == "number") {
                message = new Sk.builtin.str(message.v);
            }

            //message.v = ' ' + message.v + ' ';
            return sim.runAsync(function(resolve, reject) {
                var current, delta_ms;
                var pos = screenWidth; //X position of the message start.
                var message_width = bf.width(message.v); //Message width in pixels.
                var last = new Date(); //Last frame start time.
                var speed_ms = 1200 / speed.v / 1000.0;
                clearScreen();
                bf.text(message.v, parseInt(pos,10), 0);
                var intervalId = setInterval(function(){
                    current = new Date();
                    delta_ms = current.getTime() - last.getTime();
                    last = current;
                    pos -= speed_ms * delta_ms;
                    if (pos < -message_width){
                        pos = screenWidth;
                        clearInterval(intervalId);
                        clearScreen();
                    }
                    clearScreen();
                    bf.text(message.v, parseInt(pos,10), 0);
                },30);
            });
        }
        scroll.co_varnames = ['message', 'delay'];
        scroll.$defaults = [Sk.builtin.none, Sk.builtin.int_(400)];
        scroll.co_numargs = 2;
        mod.scroll = new Sk.builtin.func(scroll);
        function showstatic(message) {
            if(message.tp$name == "number") {
                message = new Sk.builtin.str(message.v);
            }
            //message.v = ' ' + message.v + ' ';
            return sim.runAsync(function(resolve, reject) {
                clearScreen();
                bf.text(message.v, 0, 0);
            });
        }
        showstatic.co_varnames = ['message'];
        showstatic.$defaults = [Sk.builtin.none];
        showstatic.co_numargs = 1;
        mod.showstatic = new Sk.builtin.func(showstatic);
        return mod;
    };
    mod.Image = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, str, y) {
            if(str === undefined | y !== undefined) str = Sk.builtin.str(",,,,,,,");
            var hexLines = str.v.split(/[,:\n]/); //hexLines likes follow string: '59,45689a,3456789ab,3456789ab,456789a,56789,678,7'
            self.lines = new Array();
            for (i = 0; i < 8; i++){
                self.lines[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            }
            for (i = 0; i < 8; i++){
                for (eachChar of hexLines[i]){
                    var char2Num = parseInt(eachChar,16);
                    self.lines[i][char2Num] = 15;
                }
            }
        });

        $loc.width = new Sk.builtin.func(function(self) {
            return self.lines[0].length;
        });

        $loc.height = new Sk.builtin.func(function(self) {
            return self.lines.length;
        });

        $loc.set_pixel = new Sk.builtin.func(function(self, x, y, value) {
            var row = self.lines[y.v].split("");
            row[x.v] = value.v;
            self.lines[y.v] = row.join("");
        });

        $loc.get_pixel = new Sk.builtin.func(function(self, x, y){
            return Sk.builtin.int_(self.lines[y.v][x.v]);
        });

        $loc.__repr__ = new Sk.builtin.func(function(self) {
            return Sk.builtin.str('Image("' + self.lines.join(",") + '")');
        });

        $loc.__str__ = new Sk.builtin.func(function(self) {
            return Sk.builtin.str('Image("' + self.lines.join(",") + '")');
        });

        $loc.shift_left = new Sk.builtin.func(function(self, n) {
            if(n == undefined) {
                throw new Sk.builtin.TypeError("parameter n not defined");
            }
            if(n.v > 15){
                throw new Sk.builtin.TypeError("parameter n should less than 15");
            }
            //初始化copy数组
            var copy = new Array();
            for(var k = 0; k < 8; k++){
                copy[k] = '';
            }
            for(var i = 0; i < self.lines.length; i++){
                for(var j = 0; j < self.lines[0].length - n.v; j++){
                    var posAfterMove = j + n.v;
                    if(self.lines[i][posAfterMove] > 0){
                        copy[i] = copy[i] + j.toString(16);
                    }
                }
            }
            var newImage = Sk.misceval.callsim(mod.Image, Sk.builtin.str(copy.join(",")));
            return newImage;
        });

        $loc.shift_right = new Sk.builtin.func(function(self, n) {
            if(n == undefined) {
                throw new Sk.builtin.TypeError("parameter n not defined");
            }
            if(n.v > 15){
                throw new Sk.builtin.TypeError("parameter n should less than 15");
            }
            //初始化copy数组
            var copy = new Array();
            for(var k = 0; k < 8; k++){
                copy[k] = '';
            }
            for(var i = 0; i < self.lines.length; i++){
                for(var j = n.v; j < self.lines[0].length; j++){
                    var posAfterMove = j - n.v;
                    if(self.lines[i][posAfterMove] > 0){
                        copy[i] = copy[i] + j.toString(16);
                    }
                }
            }
            var newImage = Sk.misceval.callsim(mod.Image, Sk.builtin.str(copy.join(",")));
            return newImage;
        });

        $loc.shift_up = new Sk.builtin.func(function(self, n) {
            if(n == undefined) {
                throw new Sk.builtin.TypeError("parameter n not defined");
            }
            if(n.v > 7){
                throw new Sk.builtin.TypeError("parameter n should less than 7");
            }
            //初始化copy数组
            var copy = new Array();
            for(var k = 0; k < 8; k++){
                copy[k] = '';
            }
            for(var i = n.v; i < self.lines.length; i++){
                for(var j = 0; j < self.lines[0].length; j++){
                    if(self.lines[i][j] > 0){
                        copy[i - n.v] = copy[i - n.v] + j.toString(16);
                    }
                }
            }
            console.log(copy.join(","));
            var newImage = Sk.misceval.callsim(mod.Image, Sk.builtin.str(copy.join(",")));
            return newImage;
        });

        $loc.shift_down = new Sk.builtin.func(function(self, n) {
            if(n == undefined) {
                throw new Sk.builtin.TypeError("parameter n not defined");
            }
            if(n.v > 7){
                throw new Sk.builtin.TypeError("parameter n should less than 7");
            }
            //初始化copy数组
            var copy = new Array();
            for(var k = 0; k < 8; k++){
                copy[k] = '';
            }
            for(var i = 0; i < self.lines.length - n.v; i++){
                for(var j = 0; j < self.lines[0].length; j++){
                    if(self.lines[i][j] > 0){
                        copy[i + n.v] = copy[i + n.v] + j.toString(16);
                    }
                }
            }
            console.log(copy.join(","));
            var newImage = Sk.misceval.callsim(mod.Image, Sk.builtin.str(copy.join(",")));
            return newImage;
        });

        $loc.__add__ = new Sk.builtin.func(function(self, other) {
            var x,y,val;
            var copy = new Array();
            for(var k = 0; k < 8; k++){
                copy[k] = '';
            }
            for(y = 0; y < 8; y++){
                for(x = 0; x < 15; x++){
                    if( self.lines[y][x] > 0 || other.lines[y][x] > 0){
                        copy[y] = copy[y] + x.toString(16);
                    }
                }
            }
            console.log()
            var newImage = Sk.misceval.callsim(mod.Image, Sk.builtin.str(copy.join(",")));
            return newImage;
        });

        $loc.__sub__ = new Sk.builtin.func(function(self, other) {
            var x,y,val;
            var copy = self.lines.slice(0);
            for(y = 0; y < copy.length; y++) {
                copy[y] = copy[y].split("");
                for(x = 0; x < copy[y].length; x++) {
                    val = parseInt(copy[y][x]) - parseInt(other.lines[y][x]);

                    if(val < 0) val = 0;
                    copy[y][x] = val;
                }
                copy[y] = copy[y].join("");
            }
            var newImage = Sk.misceval.callsim(mod.Image, Sk.builtin.str(copy.join(":")));
            return newImage;
        });

        $loc.__mul__ = new Sk.builtin.func(function(self, n) {
            var copy = self.lines.slice(0);
            for(y = 0; y < copy.length; y++) {
                copy[y] = copy[y].split("");
                for(x = 0; x < copy[y].length; x++) {
                    val = Math.round(parseInt(copy[y][x]) * n.v);
                    if(val < 0) val = 0;
                    if(val > 9) val = 9;
                    copy[y][x] = val;
                }
                copy[y] = copy[y].join("");
            }
            var newImage = Sk.misceval.callsim(mod.Image, Sk.builtin.str(copy.join(":")));
            return newImage;
        });

        $loc.invert = new Sk.builtin.func(function(self) {
            var copy = self.lines.slice(0);
            for(y = 0; y < copy.length; y++) {
                copy[y] = copy[y].split("");
                for(x = 0; x < copy[y].length; x++) {
                    val = parseInt(copy[y][x]);
                    copy[y][x] = 15 - val;
                }
                copy[y] = copy[y].join("");
            }
            var newImage = Sk.misceval.callsim(mod.Image, Sk.builtin.str(copy.join(":")));
            return newImage;
        });


    }, 'Image', []);


    /*Image for microbit
    mod.Image.HEART = Sk.misceval.callsim(mod.Image, Sk.builtin.str('59,45689a,3456789ab,3456789ab,456789a,56789,678,7'));
    mod.Image.HEART_SMALL = Sk.misceval.callsim(mod.Image, Sk.builtin.str(',59,45689a,456789a,56789,678,7,'));
    mod.Image.HAPPY = Sk.misceval.callsim(mod.Image, Sk.builtin.str(",,34bc,34bc,,5a,69,78"));
    mod.Image.SMILE = Sk.misceval.callsim(mod.Image, Sk.builtin.str(",34bc,25ad,,,5a,69,78"));
    mod.Image.SAD = Sk.misceval.callsim(mod.Image, Sk.builtin.str(",,345abc,2d,,78,69,5a"));
    mod.Image.CONFUSED = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:09090:00000:09090:90909:"));
    mod.Image.ANGRY = Sk.misceval.callsim(mod.Image, Sk.builtin.str("90009:09090:00000:99999:90909:"));
    mod.Image.ASLEEP = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:99099:00000:09990:00000:"));
    mod.Image.SURPRISED = Sk.misceval.callsim(mod.Image, Sk.builtin.str("09090:00000:00900:09090:00900:"));
    mod.Image.SILLY = Sk.misceval.callsim(mod.Image, Sk.builtin.str(",34bc,25ad,34bc,,6789,69,78"));
    mod.Image.FABULOUS = Sk.misceval.callsim(mod.Image, Sk.builtin.str("99999:99099:00000:09090:09990:"));
    mod.Image.MEH = Sk.misceval.callsim(mod.Image, Sk.builtin.str("09090:00000:00090:00900:09000:"));
    mod.Image.YES = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00009:00090:90900:09000:"));
    mod.Image.NO = Sk.misceval.callsim(mod.Image, Sk.builtin.str("90009:09090:00900:09090:90009:"));
    mod.Image.CLOCK12 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:00900:00900:00000:00000:"));
    mod.Image.CLOCK1 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00090:00090:00900:00000:00000:"));
    mod.Image.CLOCK2 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00099:00900:00000:00000:"));
    mod.Image.CLOCK3 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00000:00999:00000:00000:"));
    mod.Image.CLOCK4 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00000:00900:00099:00000:"));
    mod.Image.CLOCK5 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00000:00900:00090:00090:"));
    mod.Image.CLOCK6 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00000:00900:00900:00900:"));
    mod.Image.CLOCK7 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00000:00900:09000:09000:"));
    mod.Image.CLOCK8 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00000:00900:99000:00000:"));
    mod.Image.CLOCK9 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00000:99900:00000:00000:"));
    mod.Image.CLOCK10 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:99000:00900:00000:00000:"));
    mod.Image.CLOCK11 = Sk.misceval.callsim(mod.Image, Sk.builtin.str("09000:09000:00900:00000:00000:"));
    mod.Image.ARROW_N = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:09990:90909:00900:00900:"));
    mod.Image.ARROW_NE = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00999:00099:00909:09000:90000:"));
    mod.Image.ARROW_E = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:00090:99999:00090:00900:"));
    mod.Image.ARROW_SE = Sk.misceval.callsim(mod.Image, Sk.builtin.str("90000:09000:00909:00099:00999:"));
    mod.Image.ARROW_S = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:00900:90909:09990:00900:"));
    mod.Image.ARROW_SW = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00009:00090:90900:99000:99900:"));
    mod.Image.ARROW_W = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:09000:99999:09000:00900:"));
    mod.Image.ARROW_NW = Sk.misceval.callsim(mod.Image, Sk.builtin.str("99900:99000:90900:00090:00009:"));
    mod.Image.TRIANGLE = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00900:09090:99999:00000:"));
    mod.Image.TRIANGLE_LEFT = Sk.misceval.callsim(mod.Image, Sk.builtin.str("90000:99000:90900:90090:99999:"));
    mod.Image.CHESSBOARD = Sk.misceval.callsim(mod.Image, Sk.builtin.str("09090:90909:09090:90909:09090:"));
    mod.Image.DIAMOND = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:09090:90009:09090:00900:"));
    mod.Image.DIAMOND_SMALL = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:00900:09090:00900:00000:"));
    mod.Image.SQUARE = Sk.misceval.callsim(mod.Image, Sk.builtin.str("99999:90009:90009:90009:99999:"));
    mod.Image.SQUARE_SMALL = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:09990:09090:09990:00000:"));
    mod.Image.RABBIT = Sk.misceval.callsim(mod.Image, Sk.builtin.str("90900:90900:99990:99090:99990:"));
    mod.Image.COW = Sk.misceval.callsim(mod.Image, Sk.builtin.str("90009:90009:99999:09990:00900:"));
    mod.Image.MUSIC_CROTCHET = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:00900:00900:99900:99900:"));
    mod.Image.MUSIC_QUAVER = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:00990:00909:99900:99900:"));
    mod.Image.MUSIC_QUAVERS = Sk.misceval.callsim(mod.Image, Sk.builtin.str("09999:09009:09009:99099:99099:"));
    mod.Image.PITCHFORK = Sk.misceval.callsim(mod.Image, Sk.builtin.str("90909:90909:99999:00900:00900:"));
    mod.Image.XMAS = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:09990:00900:09990:99999:"));
    mod.Image.PACMAN = Sk.misceval.callsim(mod.Image, Sk.builtin.str("09999:99090:99900:99990:09999:"));
    mod.Image.TARGET = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:09990:99099:09990:00900:"));
    mod.Image.TSHIRT = Sk.misceval.callsim(mod.Image, Sk.builtin.str("99099:99999:09990:09990:09990:"));
    mod.Image.ROLLERSKATE = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00099:00099:99999:99999:09090:"));
    mod.Image.DUCK = Sk.misceval.callsim(mod.Image, Sk.builtin.str("09900:99900:09999:09990:00000:"));
    mod.Image.HOUSE = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:09990:99999:09990:09090:"));
    mod.Image.TORTOISE = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00000:09990:99999:09090:00000:"));
    mod.Image.BUTTERFLY = Sk.misceval.callsim(mod.Image, Sk.builtin.str("99099:99999:00900:99999:99099:"));
    mod.Image.STICKFIGURE = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:99999:00900:09090:90009:"));
    mod.Image.GHOST = Sk.misceval.callsim(mod.Image, Sk.builtin.str("99999:90909:99999:99999:90909:"));
    mod.Image.SWORD = Sk.misceval.callsim(mod.Image, Sk.builtin.str("00900:00900:00900:09990:00900:"));
    mod.Image.GIRAFFE = Sk.misceval.callsim(mod.Image, Sk.builtin.str("99000:09000:09000:09990:09090:"));
    mod.Image.SKULL = Sk.misceval.callsim(mod.Image, Sk.builtin.str("09990:90909:99999:09990:09990:"));
    mod.Image.UMBRELLA = Sk.misceval.callsim(mod.Image, Sk.builtin.str("09990:99999:00900:90900:09900:"));
    mod.Image.SNAKE = Sk.misceval.callsim(mod.Image, Sk.builtin.str("99000:99099:09090:09990:00000:"));

    mod.Image.ALL_CLOCKS = Sk.builtin.list([mod.Image.CLOCK1, mod.Image.CLOCK2, mod.Image.CLOCK3, mod.Image.CLOCK4, mod.Image.CLOCK5, mod.Image.CLOCK6, mod.Image.CLOCK7, mod.Image.CLOCK8, mod.Image.CLOCK9, mod.Image.CLOCK10, mod.Image.CLOCK11, mod.Image.CLOCK12]);
    mod.Image.ALL_ARROWS = Sk.builtin.list([mod.Image.ARROW_N, mod.Image.ARROW_NE, mod.Image.ARROW_E, mod.Image.ARROW_SE, mod.Image.ARROW_S, mod.Image.ARROW_SW, mod.Image.ARROW_W, mod.Image.ARROW_NW]);
    */
    mod.Image.HEART=Sk.misceval.callsim(mod.Image, Sk.builtin.str('59,45689a,3456789ab,3456789ab,456789a,56789,678,7'));
    mod.Image.HEART_SMALL=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',59,45689a,456789a,56789,678,7,'));
    mod.Image.HAPPY=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',,34bc,34bc,,5a,69,78'));
    mod.Image.SAD=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',,345abc,2d,,78,69,5a'));
    mod.Image.SMILE=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',34bc,25ad,,,5a,69,78'));
    mod.Image.SILLY=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',34bc,25ad,34bc,,6789,69,78'));
    mod.Image.FABULOUS=Sk.misceval.callsim(mod.Image, Sk.builtin.str('345abc,269d,234569abcd,,,56789a,5a,6789'));
    mod.Image.SURPRISED=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',7,7,7,7,7,,7'));
    mod.Image.ASLEEP=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',,2345abcd,,,6789,5a,6789'));
    mod.Image.ANGRY=Sk.misceval.callsim(mod.Image, Sk.builtin.str('269d,35ac,4b,,78,69,5a,4b'));
    mod.Image.CONFUSED=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',678,59,9,8,7,,7'));
    mod.Image.NO=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',49,58,67,67,58,49,'));
    mod.Image.YES=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',c,b,a,49,58,67,'));
    mod.Image.LEFT_ARROW=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',5,4,3,2456789abcd,3,4,5'));
    mod.Image.RIGHT_ARROW=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',a,b,c,23456789abd,c,b,a'));
    mod.Image.DRESS=Sk.misceval.callsim(mod.Image, Sk.builtin.str('59,456789a,5689,678,579,468a,3579b,456789a'));
    mod.Image.TRANSFORMERS=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',7,5689,579,579,68,68,59'));
    mod.Image.SCISSORS=Sk.misceval.callsim(mod.Image, Sk.builtin.str('5b,56ab,679a,789,8,679a,579b,6a'));
    mod.Image.EXIT=Sk.misceval.callsim(mod.Image, Sk.builtin.str('ab,89a,79ab,69cd,8a,68b,8c,d'));
    mod.Image.TREE=Sk.misceval.callsim(mod.Image, Sk.builtin.str('7,678,56789,456789a,3456789ab,7,7,7'));
    mod.Image.PACMAN=Sk.misceval.callsim(mod.Image, Sk.builtin.str('456789,34a,2369,28,239,34a,456789,'));
    mod.Image.TARGET=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',,789,6a,68a,6a,789,'));
    mod.Image.TSHIRT=Sk.misceval.callsim(mod.Image, Sk.builtin.str('5a,46789b,3c,45ab,5a,5a,5a,56789a'));
    mod.Image.ROLLERSKATE=Sk.misceval.callsim(mod.Image, Sk.builtin.str('4567,47,4789a,4b,456789ab,35ac,345abc,'));
    mod.Image.DUCK=Sk.misceval.callsim(mod.Image, Sk.builtin.str('567,478,38,23458,589abcde,5d,5c,56789ab'));
    mod.Image.HOUSE=Sk.misceval.callsim(mod.Image, Sk.builtin.str('23456789abcd,12de,01ef,256789ad,25ad,257ad,25ad,25ad'));
    mod.Image.TORTOISE=Sk.misceval.callsim(mod.Image, Sk.builtin.str('78,578a,56789a,56789a,56789a,6789,5a,'));
    mod.Image.BUTTERFLY=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',56ab,479c,56789ab,789,68a,579b,56ab'));
    mod.Image.STICKFIGURE=Sk.misceval.callsim(mod.Image, Sk.builtin.str('7,68,7,678,579,7,68,59'));
    mod.Image.GHOST=Sk.misceval.callsim(mod.Image, Sk.builtin.str('56789,4579a,4579a,456789a,4579a,468a,456789ab,456789abc'));
    mod.Image.PITCHFORK=Sk.misceval.callsim(mod.Image, Sk.builtin.str('bcdef,a,a,0123456789abcdef,a,a,bcdef,'));
    mod.Image.MUSIC_QUAVERS=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',,349af,234589abe,14567abcd,056bc,,'));
    mod.Image.MUSIC_QUAVER=Sk.misceval.callsim(mod.Image, Sk.builtin.str('1234567,08,0123456789ab,9abc,89abcd,89abcd,9abcd,abc'));
    mod.Image.MUSIC_CROTCHET=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',0123456789ab,9abc,89abcd,89abcd,9abcd,abc,'));
    mod.Image.COW=Sk.misceval.callsim(mod.Image, Sk.builtin.str('3,1234,13456789a,123456789ab,123456789acd,459ae,459a,459a'));
    mod.Image.RABBIT=Sk.misceval.callsim(mod.Image, Sk.builtin.str('6789abcd,123456e,08ce,12345abce,08ce,123456e,6789abcd,'));
    mod.Image.SQUARE_SMALL=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',,6789,69,69,6789,,'));
    mod.Image.SQUARE=Sk.misceval.callsim(mod.Image, Sk.builtin.str('456789ab,4b,4b,4b,4b,4b,4b,456789ab'));
    mod.Image.DIAMOND_SMALL=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',,678,579,68,7,,'));
    mod.Image.DIAMOND=Sk.misceval.callsim(mod.Image, Sk.builtin.str('456789a,3468ab,2356789bc,34678ab,4579a,5689,678,7'));
    mod.Image.CHESSBOARD=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',3456789abcd,3579bd,3456789abcd,3579bd,3456789abcd,3579bd,3456789abcd'));
    mod.Image.TRIANGLE_LEFT=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',8,78,678,5678,678,78,8'));
    mod.Image.TRIANGLE=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',78,6789,56789a,456789ab,3456789abc,23456789abcd,'));
    mod.Image.SNAKE=Sk.misceval.callsim(mod.Image, Sk.builtin.str('9ab,9b,9ab,456789,3456789,234,123,'));
    mod.Image.UMBRELLA=Sk.misceval.callsim(mod.Image, Sk.builtin.str('7,56789,456789a,3456789ab,7,7,79,789'));
    mod.Image.SKULL=Sk.misceval.callsim(mod.Image, Sk.builtin.str('56789,47a,37b,345689ab,456789a,59,579,678'));
    mod.Image.GIRAFFE=Sk.misceval.callsim(mod.Image, Sk.builtin.str('78,789,7,7,7,4567,47,47'));
    mod.Image.SWORD=Sk.misceval.callsim(mod.Image, Sk.builtin.str(',4,45,23456789abc,23456789abc,45,4,'));
    mod.Image.MHT=Sk.misceval.callsim(mod.Image, Sk.builtin.str('0469bcdef,013469d,02469d,046789d,0469d,0469d,0469d,0469d'));
    mod.Image.LQY=Sk.misceval.callsim(mod.Image, Sk.builtin.str('0678bf,059bf,059ce,059d,059d,059d,06789d,0123ad'));
    mod.Image.LPF=Sk.misceval.callsim(mod.Image, Sk.builtin.str('05678bcdef,059b,059b,05678bcdef,05b,05b,05b,01235b'));
    mod.Image.XBC=Sk.misceval.callsim(mod.Image, Sk.builtin.str('046789de,046acf,136ac,26789c,26ac,136ac,046acf,046789de'));
    mod.Image.FQ=Sk.misceval.callsim(mod.Image, Sk.builtin.str('01234569abcd,08e,08e,01234568e,08e,08ce,08de,09abcdf'));
    mod.Image.LXY=Sk.misceval.callsim(mod.Image, Sk.builtin.str('059bf,059bf,068ce,07d,07d,068d,059d,012359d'));

    mod.display = new Sk.builtin.module();
    mod.display.$d = new display("matrix.display");
    return mod;
};