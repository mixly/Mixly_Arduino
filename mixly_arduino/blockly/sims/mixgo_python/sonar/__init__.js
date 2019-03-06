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
            return new Sk.builtin.float_(mod.data.distance);
        });
    });
    ui.bindHCSR04Event('HCSR04', mod.data, 'distance');
    return mod;
}