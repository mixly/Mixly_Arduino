var uart = function(name) {
    var mod = {};
    mod.data = {
        buffer:"",
    }
    var init = function(baudrate, bits, parity, stop, tx, rx) {
        if(baudrate === undefined)
            baudrate = Sk.builtin.int_(9600);
        if(bits === undefined)
            bits = Sk.builtin.int_(8);
        if(parity === undefined)
            parity = Sk.builtin.none;
        if(stop === undefined)
            stop = Sk.builtin.int_(1);
        if(tx === undefined)
            tx = Sk.builtin.none;
        if(rx === undefined)
            rx = Sk.builtin.none;
        mod.data.baudrate = baudrate.v;
        mod.data.bits = bits.v;
        mod.data.parity = parity.v;
        mod.data.stop = stop.v;
        mod.data.tx = tx.v;
        mod.data.rx = rx.v;
        /*
        delete mode.data.uartui_write;
        delete mode.data.uartui_read;
        */
    }

    init.co_varnames = ['baudrate', 'bits', 'parity', 'stop', 'tx', 'rx'];
    init.$defaults = [Sk.builtin.int_(9600), Sk.builtin.int_(8), Sk.builtin.none, Sk.builtin.int_(1), Sk.builtin.none, Sk.builtin.none];
    init.co_numargs = 6;
    mod.init = new Sk.builtin.func(init);
    mod.any = new Sk.builtin.func(function() {
        if(mod.data.buffer.length > 0)
            return Sk.builtin.bool(true);
        else
            return Sk.builtin.bool(false);
    });

    var read = function(){
        if(mod.data.buffer.length > 0) {
            var content = mod.data.buffer;
            mod.data.buffer = "";
            return Sk.builtin.str(content);
        } else {
            return Sk.builtin.none;
        }
    }
    mod.read = new Sk.builtin.func(read);
    return mod;
}
