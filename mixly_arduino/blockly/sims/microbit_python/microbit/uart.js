var uartModule = function(name) {
    var mod = {};
    mod.data = {
    };
    uart = mod.data;
    function checkUartSetting(){
        if(typeof(uart) !== "undefined") {
            var tuned = true;
            console.log
            if($('#uart_baudrate').val() != uart.baudrate) {
                $('#uart_status').html("Baudrate doesn't match: currently set to " + uart.baudrate);
                tuned = false;
            }
            if(typeof(uart.tx) != 'undefined' && typeof(uart.rx) != 'undefined'){
                if($('#uart_tx').val() != uart.tx) {
                    $('#uart_status').html("Pin tx doesn't match: currently set to " + uart.tx);
                    tuned = false;
                }
                if($('#uart_rx').val() != uart.tx) {
                    $('#uart_status').html("Pin rx doesn't match: currently set to " + uart.rx);
                    tuned = false;
                }
            }            
            if(tuned) {
                $('#uart_status').html("Tuned in to uart module");
                uart.uartui_read = function(message) {
                    $('#uart_status').html("Uart read message: " + message);
                   
                }
                uart.uartui_write = function(message) {
                    if(message.slice(-1)==='\n')
                      $('#print_area').append('<span style="display:block;">'+message+'</span>');
                    else
                      $('#print_area').append('<span>'+ message +'</span>');
                }
            }
            else{
                delete uart.uartui_read;
                delete uart.uartui_write;
            }

        }
    }
    var init = function(baudrate, bits, parity, stop, tx, rx) {
        if(baudrate === undefined)
            baudrate = Sk.builtin.int_(115200);
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
        mod.data.buffer = "";
        delete mod.data.uartui_read;
        delete mod.data.uartui_write;
    }

    init.co_varnames = ['baudrate', 'bits', 'parity', 'stop', 'tx', 'rx'];
    init.$defaults = [Sk.builtin.int_(9600), Sk.builtin.int_(8), Sk.builtin.none, Sk.builtin.int_(1), Sk.builtin.none, Sk.builtin.none];
    init.co_numargs = 6;
    mod.init = new Sk.builtin.func(init);
    mod.any = new Sk.builtin.func(function() {
        checkUartSetting();
        if(mod.data.uartui_read && mod.data.buffer.length > 0)
            return Sk.builtin.bool(true);
        else
            return Sk.builtin.bool(false);
    });

    var read = function(){
        checkUartSetting();
        if(mod.data.uartui_read && mod.data.buffer.length > 0){
            var content = mod.data.buffer;
            mod.data.buffer = "";
            mod.data.uartui_read(content);
            return Sk.builtin.str(content);
        }    
        else{
            return Sk.builtin.none;
        }
    }
    var write = function(message){
        checkUartSetting();
        if(mod.data.uartui_write) {
            mod.data.uartui_write(message.v);
        }
    }
    mod.read = new Sk.builtin.func(read);
    mod.write = new Sk.builtin.func(write);

    ui.bindUartSendMessageEvent();
    return mod;
}