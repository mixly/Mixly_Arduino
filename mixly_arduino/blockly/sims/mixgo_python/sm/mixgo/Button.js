var Button = function(name){
    var mod = {};
    mod.Button = new Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self, name) {
            self.name = name.v;
            self.presses = 0;
            self.pressed = false;
            self.last_checked = 0;
        });

        $loc.is_pressed = new Sk.builtin.func(function(self) {
            debugger;
            self.pressed = sm.getInputer(self.name, sm.time);
            if(self.pressed)
                self.presses++;          
            return Sk.builtin.bool(self.pressed);
        });
        //bug：was_pressed还没有处理
        $loc.was_pressed = new Sk.builtin.func(function(self) {
            var r = self.presses > self.last_checked;
            self.last_checked = self.presses;
            return Sk.builtin.bool(r);
        });

        $loc.get_presses = new Sk.builtin.func(function(self) {
            var presses = self.presses;
            self.presses = 0;
            return Sk.builtin.int_(presses);
        });
    }, "Button", []);

    mod.button_a = new mod.Button('button_a');
    mod.button_b = new mod.Button('button_b');
    ui.bindBtnEvent('btn_A', [mod.button_a]);
    ui.bindBtnEvent('mixgo_btn_A', [mod.button_a]);
    ui.bindBtnEvent('btn_B', [mod.button_b]);
    ui.bindBtnEvent('mixgo_btn_B', [mod.button_b]);
    ui.bindBtnEvent('btn_both', [mod.button_a, mod.button_b]);
    return mod;
}