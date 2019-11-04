var $builtinmodule = function (name) {
    var mod = {
        data: {
            distance: mbData['distance'],
        }
    };
    mod.Sonar = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, pinTrig, pinEcho) {
            self.trig = pinTrig.v;
            self.echo = pinEcho.v;
        });
        $loc.checkdist = new Sk.builtin.func(function(self) {
            var value = sm.getInputer('sonar', sm.time);
            if(value === 0)
                value = 9999;
            return new Sk.builtin.float_(value);
        });
    });
    return mod;
}