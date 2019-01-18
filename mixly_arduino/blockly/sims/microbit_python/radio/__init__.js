var $builtinmodule = function (name) {
    var mod = {
        data: {
            power: 0,
            peer: true
        }
    };
    radio = mod.data;

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
    function checkRadioSetting(){
        if(typeof(radio) !== "undefined") {
            var tuned = true;

            if($('#radio_channel').val() != radio.channel) {
                $('#radio_status').html("Channel doesn't match: currently set to " + radio.channel);
                tuned = false;
            }
            if($('#radio_group').val() != radio.group) {
                $('#radio_status').html("Group doesn't match: currently set to " + radio.group);
                tuned = false;
            }
            if($('#radio_address').val() != radio.address) {
                $('#radio_status').html("Address doesn't match: currently set to " + radio.address.toString(16));
                tuned = false;
            }
            if(mod[$('#radio_data_rate').val()].v != radio.data_rate){
                $('#radio_status').html("Data rate doesn't match: currently set to " + radio.data_rate);
                tuned = false;
            }
            if(tuned) {
                $('#radio_status').html("Tuned in to radio module");
                radio.fn_send = function(message) { // send from microbit to UI
                    $('#radio_status').html("Received message: " + message);
                }
                radio.fn_receive = function(message) { // send from UI to microbit
                    if(radio.buffer.length < radio.queue) {
                        radio.buffer.push(message);
                    } else {
                        $('#radio_status').html("Queue is full in microbit radio");
                    }

                }
            }
            else{
                delete radio.fn_send;
                delete radio.fn_receive;
            }


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
        delete mod.data.fn_send;
        delete mod.data.fn_receive;
        if(mod.data.power > 0){
            checkRadioSetting();
        }
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
