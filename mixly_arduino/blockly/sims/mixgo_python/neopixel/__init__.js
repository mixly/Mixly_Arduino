var $builtinmodule = function (name) {
    var mod = {};
    mod.NeoPixel = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        var selfinInit;
        var funcInit = function(kwa, self, pin, n) {
            if (pin == undefined) {
                throw new Sk.builtin.TypeError("parameter pin not defined");
            }
            if (n == undefined) {
                throw new Sk.builtin.TypeError("parameter n not defined");
            } else if (n.v < 1) {
                throw new Sk.builtin.TypeError("parameter n should more than 0");
            }
            if(typeof(kwa[0]) != 'undefined'){
                self.timing = kwa[1];
            }
            else{
                self.timing = new Sk.builtin.bool(true);
            }
            if(typeof(kwa[2]) == 'undefined'){
                self.bpp = 1;
            }
            else{
                self.bpp = kwa[3];
            }
            self.leds = [];
            self.pin = pin;
            self.n = n;           
            for (var i = 0; i < n.v; i ++) {
               self.leds.push([0, 0, 0]);
            }
        };
        //funcInit.co_varnames = ['self','pin', 'n', 'timing', 'bpp'];
        //funcInit.$defaults = [undefined,undefined, Sk.builtin.int_(2), Sk.builtin.bool(true), Sk.builtin.int_(2)];
        //funcInit.co_numargs = 5;
        funcInit.co_kwargs = true;
        $loc.__init__ = new Sk.builtin.func(funcInit);

        $loc.__setitem__ = new Sk.builtin.func(function (self, index, val) {
            var i;
            if (Sk.misceval.isIndex(index)) {
                i = Sk.misceval.asIndex(index);
                if (i !== undefined) {
                    if (i < 0) {
                        i = this.leds.length + i;
                    }
                    i = Sk.builtin.asnum$(i);
                    if (i < 0 || i >= self.leds.length) {
                        throw new Sk.builtin.IndexError("list assignment index out of range");
                    }
                    self.leds[i] = Sk.ffi.remapToJs(val);
                    return;
                }
            }
        });

        $loc.write = new Sk.builtin.func(function(self) {
            ui.updateNeopixel(self.leds);
        });
    }, 'NeoPixel', []);

    return mod;
}
