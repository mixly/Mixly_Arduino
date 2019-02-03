var $builtinmodule = function (name) {
    var mod = {};
    mod.NeoPixel = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, pin, n) {
            if (pin == undefined) {
                throw new Sk.builtin.TypeError("parameter pin not defined");
            }
            if (n == undefined) {
                throw new Sk.builtin.TypeError("parameter n not defined");
            } else if (n.v < 1) {
                throw new Sk.builtin.TypeError("parameter n > 0");
            }

            self.leds = [];
            self.pin = pin;
            for (var i = 0; i < n.v; i ++) {
                self.leds.push([0, 0, 0]);
            }
        });

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

        $loc.show = new Sk.builtin.func(function(self) {
            ui.updateNeopixel(self.leds);
        });
    }, 'NeoPixel', []);

    return mod;
}
