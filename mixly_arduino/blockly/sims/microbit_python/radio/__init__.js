var $builtinmodule = function (name) {
    var mod = {
        data: {
            power: 0
        }
    };

    radio = mod.data;

    mod.RATE_250KBIT = Sk.builtin.int_(250);
    mod.RATE_1MBIT = Sk.builtin.int_(1000);
    mod.RATE_2MBIT = Sk.builtin.int_(2000);
    function check(){
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

        } else {
            $('#radio_status').html('Radio module not detected - did you include "import radio"?');
        }
    }

    mod.on = new Sk.builtin.func(function() {
        mod.data.power = mod.data.power > 0 ? mod.data.power : 1;
        check();
    });

    mod.off = new Sk.builtin.func(function() {
        mod.data.power = 0;
    });

    var config = function(length, queue, channel, power, address, group, data_rate) {
        if(length === undefined)
            length = Sk.builtin.int_(32);
        if(queue === undefined)
            queue = Sk.builtin.int_(3);
        if(channel === undefined)
            channel = Sk.builtin.int_(7);
        if(power === undefined)
            power = Sk.builtin.int_(0);
        if(address === undefined)
            address = Sk.builtin.str("0x75626974");
        if(group === undefined)
            group = Sk.builtin.int_(0);
        if(data_rate === undefined)
            data_rate = Sk.builtin.int_(mod.RATE_1MBIT);

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
            check();
        }
    };
    config();

    config.co_varnames = ['length', 'queue', 'channel', 'power', 'address', 'group', 'data_rate'];
    config.$defaults = [Sk.builtin.int_(32), Sk.builtin.int_(3), Sk.builtin.int_(7), Sk.builtin.int_(0), Sk.builtin.str("0x75626974"), Sk.builtin.int_(0), Sk.builtin.int_(mod.RATE_1MBIT)];
    config.co_numargs = 7;
    mod.config = new Sk.builtin.func(config);

    mod.reset = new Sk.builtin.func(function() {
        config();
    });

    mod.send_bytes = new Sk.builtin.func(function(message) {
        if(mod.data.power < 1) {
            throw new Exception("Radio is powered off");
        }
        if(mod.data.fn_send) {
            mod.data.fn_send(Sk.ffi.remapToJs(message));
        }
    });

    mod.receive_bytes = new Sk.builtin.func(function() {
        if(mod.data.power < 1) {
            throw new Sk.builtin.Exception("Radio is powered off");
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
        if(!mod.data.power) {
            throw new Sk.builtin.Exception("Radio is powered off");
        }
        throw new Sk.builtin.Exception("Not implemented yet");
        return new Sk.builtin.none();
    });

    mod.send = new Sk.builtin.func(function(message) {
        if(mod.data.power < 1) {
            throw new Sk.builtin.Exception("Radio is powered off");
        }
        if(mod.data.fn_send) {
            mod.data.fn_send("\x00\x01\x00" + message.v);
        }
    });

    mod.receive = new Sk.builtin.func(function() {
        if(mod.data.power < 1) {
            throw new Sk.builtin.Exception("Radio is powered off");
        }
        if(mod.data.buffer.length > 0) {
            var data = mod.data.buffer[0];
            mod.data.buffer = mod.data.buffer.slice(1);
            return Sk.ffi.remapToPy(data.slice(3));
        }
        return new Sk.builtin.str("None");
    });
    ui.bindRadioSendMessageEvent();
    return mod;

};
