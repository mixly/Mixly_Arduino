var $builtinmodule = function (name) {
    var mod = {
        data: {
            power: 0,
            peer: true
        }
    };

    var prefix_codes = "\x00\x01\x00";
    function send_data (message) { // send from microbit to UI
        if (message.startsWith(prefix_codes)) {
            message = message.replace(prefix_codes, '');
        }
        ui.updateRadioReceivedMessage(message);
    }

    function receive_data (message) { // send from UI to microbit
        if(data.buffer.length < data.queue) {
            data.buffer.push(message);
        } else {
            ui.updateRadioStatus("Queue is full in microbit radio");
        }
    }

    mod.RATE_250KBIT = Sk.builtin.int_(250);
    mod.RATE_1MBIT = Sk.builtin.int_(1000);
    mod.RATE_2MBIT = Sk.builtin.int_(2000);


    mod.on = new Sk.builtin.func(function() {
        mod.data.on = true;
    });

    mod.off = new Sk.builtin.func(function() {
        mod.data.on = false;
    });

    var config = function(length, queue, channel, power, address, group, data_rate) {
        if(length === undefined)
            length = Sk.builtin.int_(mbData.radio.length);
        if(queue === undefined)
            queue = Sk.builtin.int_(mbData.radio.queue);
        if(channel === undefined)
            channel = Sk.builtin.int_(mbData.radio.channel);
        if(power === undefined)
            power = Sk.builtin.int_(mbData.radio.power);
        if(address === undefined)
            address = Sk.builtin.str(mbData.radio.address);
        if(group === undefined)
            group = Sk.builtin.int_(mbData.radio.group);
        if(data_rate === undefined)
            data_rate = Sk.builtin.int_(mbData.radio.data_rate);

        mod.data.length = length.v;
        mod.data.queue = queue.v;
        mod.data.channel = channel.v;
        mod.data.power = power.v;
        mod.data.address = address.v;
        mod.data.group = group.v;
        mod.data.data_rate = data_rate.v;
        mod.data.buffer = [];
        mod.data.on = false;
        ui.updatePeerRadioParam(mod.data);
    };
    config();

    config.co_varnames = ['length', 'queue', 'channel', 'power', 'address', 'group', 'data_rate'];
    config.$defaults = [
        Sk.builtin.int_(mbData.radio.length), Sk.builtin.int_(mbData.radio.queue),
        Sk.builtin.int_(mbData.radio.channel), Sk.builtin.int_(mbData.radio.power),
        Sk.builtin.str(mbData.radio.address), Sk.builtin.int_(mbData.radio.group),
        Sk.builtin.int_(mbData.radio.data_rate)];
    config.co_numargs = 7;
    mod.config = new Sk.builtin.func(config);

    mod.reset = new Sk.builtin.func(function() {
        config();
    });

    mod.send_bytes = new Sk.builtin.func(function(message) {
        if(!mod.data.on) {
            throw new Sk.builtin.Exception("Radio is powered off");
        }
        if (!mod.data.peer) {
            return;
        }
        send_data(Sk.ffi.remapToJs(message));
    });

    mod.receive_bytes = new Sk.builtin.func(function() {
        if(!mod.data.on) {
            throw new Sk.builtin.Exception("Radio is powered off");
        }
        if (!mod.data.peer) {
            return;
        }
        if(mod.data.buffer.length > 0) {
            var data = mod.data.buffer[0];
            mod.data.buffer = mod.data.slice(1);
            var bytes = [];
            for(var i = 0; i < data.length; i++) {
                bytes.push(data.charCodeAt(i));
            }
            return Sk.ffi.remapToPy(bytes);
        }
        return new Sk.builtin.none();
    });

    mod.receive_bytes_into = new Sk.builtin.func(function(buffer) {
        if(!mod.data.on) {
            throw new Sk.builtin.Exception("Radio is powered off");
        }
        if (!mod.data.peer) {
            return;
        }
        throw new Sk.builtin.Exception("Not implemented yet");
        return new Sk.builtin.none();
    });

    mod.send = new Sk.builtin.func(function(message) {
        if(!mod.data.on) {
            throw new Sk.builtin.Exception("Radio is powered off");
        }
        if (!mod.data.peer) {
            return;
        }
        send_data(prefix_codes + message.v);
    });

    mod.receive = new Sk.builtin.func(function() {
        if(!mod.data.on) {
            throw new Sk.builtin.Exception("Radio is powered off");
        }
        if (!mod.data.peer) {
            return;
        }
        if(mod.data.buffer.length > 0) {
            var data = mod.data.buffer[0];
            mod.data.buffer = mod.data.buffer.slice(1);
            return Sk.ffi.remapToPy(data.slice(3));
        }
        return new Sk.builtin.none();
    });
    ui.bindRadioSendMessageEvent('radio', mod.data);
    ui.bindRadioUpdateConfigEvent('radio_update_config', mod.data);
    return mod;
};
