var $builtinmodule = function (name) {
    function PlayWebkit(context, audiobuffer, resolve, reject)
    {
        var source = context.createBufferSource();
        var soundBuffer = context.createBuffer(1, audiobuffer.length, 22050);
        var buffer = soundBuffer.getChannelData(0);
        for(var i=0; i<audiobuffer.length; i++) buffer[i] = audiobuffer[i];
        source.buffer = soundBuffer;
        source.connect(context.destination);
        source.start(0);
        source.onended = function(){
            context.close();
            resolve();
        }
    }

    function PlayMozilla(context, audiobuffer, resolve, reject)
    {
        var written = context.mozWriteAudio(audiobuffer);
        var diff = audiobuffer.length - written;
        if (diff <= 0) {
            resolve();
            return;
        }
        var buffer = new Float32Array(diff);
        for(var i = 0; i<diff; i++) buffer[i] = audiobuffer[i+written];
        window.setTimeout(function(){PlayMozilla(context, buffer)}, 500);
    }


    function PlayBuffer(speech, audiobuffer, resolve, reject)
    {
        if (typeof AudioContext !== "undefined")
        {
            PlayWebkit(new AudioContext(), audiobuffer, resolve, reject);
        } else
        if (typeof webkitAudioContext !== "undefined")
        {
            PlayWebkit(new webkitAudioContext(), audiobuffer, resolve, reject);
        } else if (typeof Audio !== "undefined")
        {
            /*var context = new Audio();
            context.mozSetup(1, 22050);
            PlayMozilla(context, audiobuffer, resolve, reject);
            */
            resolve();

        }
    }


    // speech module


    var mod = {

    };

    var say = function(speech, pitch, speed, mouth, throat) {
        return sim.runAsync(function(resolve, reject) {
            // DEFAULTS
            if(pitch === undefined)
                pitch = Sk.builtin.int_(64);
            if(speed === undefined)
                speed = Sk.builtin.int_(72);
            if(mouth === undefined)
                mouth = Sk.builtin.int_(128);
            if(throat === undefined)
                throat = Sk.builtin.int_(128);

            sm.speech.say(speech.v, pitch.v, speed.v, mouth.v, throat.v);
            resolve();
        });

    };

    say.co_varnames = ['speech', 'pitch', 'speed', 'mouth', 'throat'];
    say.$defaults = [Sk.builtin.none, Sk.builtin.int_(64), Sk.builtin.int_(72), Sk.builtin.int_(128), Sk.builtin.int_(128)];
    say.co_numargs = 5;
    mod.say = new Sk.builtin.func(say);

    mod.translate = new Sk.builtin.func(function(text) {
        var input = text.v;
        while (input.length < 256) input += " ";
        var ptr = allocate(intArrayFromString(input), 'i8', ALLOC_STACK);

        _TextToPhonemes(ptr);
        s = "";
        for(var i = ptr; i < ptr + 256; i++) {
            s+=String.fromCharCode(HEAPU8[i]);
        }

        return Sk.builtin.str(s);
    });

    var pronounce = function(speech, pitch, speed, mouth, throat) {
        return sim.runAsync(function(resolve, reject) {
            // DEFAULTS
            if(pitch === undefined)
                pitch = Sk.builtin.int_(64);
            if(speed === undefined)
                speed = Sk.builtin.int_(72);
            if(mouth === undefined)
                mouth = Sk.builtin.int_(128);
            if(throat === undefined)
                throat = Sk.builtin.int_(128);

            sm.speech.pronounce(speech.v, pitch.v, speed.v, mouth.v, throat.v);
            resolve();
        });

    };

    pronounce.co_varnames = ['speech', 'pitch', 'speed', 'mouth', 'throat'];
    pronounce.$defaults = [Sk.builtin.none, Sk.builtin.int_(64), Sk.builtin.int_(72), Sk.builtin.int_(128), Sk.builtin.int_(128)];
    pronounce.co_numargs = 5;
    mod.pronounce = new Sk.builtin.func(pronounce);

    var sing = function(speech, pitch, speed, mouth, throat) {
        var buffer = [];
        var syllables = speech.v.split("#");

        for(var i = 0; i < syllables.length; i++) {
            if(syllables[i]){
                var regex = /(\d+)(.*)/;
                var parts = regex.exec(syllables[i]);
                if(parts) {

                    if(speed === undefined)
                        speed = Sk.builtin.int_(72);
                    if(mouth === undefined)
                        mouth = Sk.builtin.int_(128);
                    if(throat === undefined)
                        throat = Sk.builtin.int_(128);

                    var input = parts[2];
                    while (input.length < 254) input += " ";
                    sm.speech.sing(input, parseInt(parts[1]), speed.v, mouth.v, throat.v);
                }
            }
        }
    };

    sing.co_varnames = ['speech', 'pitch', 'speed', 'mouth', 'throat'];
    sing.$defaults = [Sk.builtin.none, Sk.builtin.int_(64), Sk.builtin.int_(72), Sk.builtin.int_(128), Sk.builtin.int_(128)];
    sing.co_numargs = 5;
    mod.sing = new Sk.builtin.func(sing);

    // adapted from source: https://gist.github.com/asanoboy/3979747 with various bugfixes
    var Wav = function(opt_params){

        /**
         * @private
         */
        this._sampleRate = opt_params && opt_params.sampleRate ? opt_params.sampleRate : 22050;

        /**
         * @private
         */
        this._channels = opt_params && opt_params.channels ? opt_params.channels : 1;

        /**
         * @private
         */
        this._eof = true;

        /**
         * @private
         */
        this._bufferNeedle = 0;

        /**
         * @private
         */
        this._buffer;

    };

    Wav.prototype.setBuffer = function(buffer){
        this._buffer = this.getWavInt16Array(buffer);
        this._bufferNeedle = 0;
        this._internalBuffer = '';
        this._hasOutputHeader = false;
        this._eof = false;
    };

    Wav.prototype.getBuffer = function(len){

        var rt;
        if( this._bufferNeedle + len >= this._buffer.length ){
            rt = new Int16Array(this._buffer.length - this._bufferNeedle);
            this._eof = true;
        }
        else {
            rt = new Int16Array(len);
        }

        for(var i=0; i<rt.length; i++){
            rt[i] = this._buffer[i+this._bufferNeedle];
        }
        this._bufferNeedle += rt.length;

        return  rt.buffer;


    };

    Wav.prototype.eof = function(){
        return this._eof;
    };

    Wav.prototype.getWavInt16Array = function(buffer){

        var intBuffer = new Int16Array(buffer.length + 23), tmp;

        intBuffer[0] = 0x4952; // "RI"
        intBuffer[1] = 0x4646; // "FF"

        var size = 36 + (buffer.length * 2);
        intBuffer[2] = size & 0x0000ffff; // RIFF size
        intBuffer[3] = (size & 0xffff0000) >> 16; // RIFF size

        intBuffer[4] = 0x4157; // "WA"
        intBuffer[5] = 0x4556; // "VE"

        intBuffer[6] = 0x6d66; // "fm"
        intBuffer[7] = 0x2074; // "t "

        intBuffer[8] = 0x0010; // fmt chunksize: 16
        intBuffer[9] = 0x0000; //

        intBuffer[10] = 0x0001; // format tag : 1
        intBuffer[11] = this._channels; // channels: 1

        intBuffer[12] = this._sampleRate & 0x0000ffff; // sample per sec
        intBuffer[13] = (this._sampleRate & 0xffff0000) >> 16; // sample per sec

        intBuffer[14] = (2*this._channels*this._sampleRate) & 0x0000ffff; // byte per sec
        intBuffer[15] = ((2*this._channels*this._sampleRate) & 0xffff0000) >> 16; // byte per sec

        intBuffer[16] = this._channels * 2; // block align
        intBuffer[17] = 0x0010; // bit per sample

        intBuffer[18] = 0x6164; // "da"
        intBuffer[19] = 0x6174; // "ta"
        intBuffer[20] = (2*buffer.length) & 0x0000ffff; // data size[byte]
        intBuffer[21] = ((2*buffer.length) & 0xffff0000) >> 16; // data size[byte]

        for (var i = 0; i < buffer.length; i++) {
            tmp = buffer[i];
            if (tmp >= 1) {
                intBuffer[i+22] = (1 << 15) - 1;
            }
            else if (tmp <= -1) {
                intBuffer[i+22] = -(1 << 15);
            }
            else {
                intBuffer[i+22] = Math.round(tmp * (1 << 15));
            }
        }

        return intBuffer;
    };


    return mod;

};
