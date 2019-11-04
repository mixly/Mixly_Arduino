var $builtinmodule = function(name) {
	var mod = {};
	mod._data = {};
	mod._data.ticks = mbData.music.ticks;
	mod._data.bpm = mbData.music.bpm;
	mod._data.duration = mbData.music.duration;
	mod._data.octave = mbData.music.octave;
	ui.music_data = mod._data;
	var set_tempo = function(ticks, bpm) {
		if(ticks === undefined) 
			ticks = new Sk.builtin.int_(mbData.music.ticks);
		if(bpm === undefined)
			bpm = new Sk.builtin.int_(mbData.music.bpm);
		
		mod._data.ticks = ticks.v;
		mod._data.bpm = bpm.v;
	}
	
	set_tempo.co_varnames = ['ticks', 'bpm'];
	set_tempo.$defaults = [Sk.builtin.int_(mbData.music.ticks), Sk.builtin.int_(mbData.music.bpm)];
	set_tempo.co_numargs = 2;
	mod.set_tempo = new Sk.builtin.func(set_tempo);
	
	mod.get_tempo = new Sk.builtin.func(function() {
		return new Sk.builtin.tuple(Sk.ffi.remapToPy([mod._data.ticks, mod._data.bpm]));
	});
	
	var play = function(music, pin, wait, loop){
		debugger;
		if(mod._data.stop) {
			delete mod._data.stop;
		}
		if(wait === undefined) 
			wait = new Sk.builtin.bool(true);
		if(loop === undefined)
			loop = new Sk.builtin.bool(false);
		
		var notes = Sk.ffi.remapToJs(music);
		var i = 0;
		var timeout = 60000 / mod._data.bpm / mod._data.ticks;
		for(i = 0; i < notes.length; i++){
			var n = notes[i].toLowerCase();
			var d = n.match(/([rcdefgab][b#]?)([0-9]?)(:([0-9]*))?/);
			n = {short: n,
				note: d[1],
				octave: Number.parseInt(d[2]),
				ticks: d[4]? Number.parseInt(d[4]) : 1
				}
			switch(n.note) {
				case 'c':
					n.f = 16.352;
					break;
				case 'c#':
				case 'db':
					n.f = 17.324;
					break;
				case 'd':
					n.f = 18.354;
				break;
				case 'd#':
				case 'eb':
					n.f = 19.445;
				break;
				case 'e':
					n.f = 20.602;
				break;
				case 'f':
					n.f = 21.827;
				break;
				case 'f#':
				case 'gb':
					n.f = 23.125;
				break;
				case 'g':
					n.f = 24.500;
				break;
				case 'g#':
				case 'ab':
					n.f = 25.957;
				break;
				case 'a':
					n.f = 27.500;
				break;
				case 'a#':
				case 'bb':
					n.f = 29.135;
				break;
				case 'b':
					n.f = 30.868;
				break;
				case 'r':
					n.f = 0;
				break;
			}
			if(!n.octave) {
				n.octave = mod._data.octave;
			} else {
				mod._data.octave = n.octave;
			}
			for(var o = 0; o < n.octave; o++) {
				n.f = n.f * 2;
			}
			n.f = Math.round(n.f);
			sm.music.set_pitch(pin, n.f, timeout * n.ticks);
			i++;
			if(i >= notes.length){
				if(loop.v) {
					i = 0;
				} else {
					return;
				}
			}
		}
	}
	play.co_varnames = ['music', 'pin', 'wait', 'loop'];
	play.$defaults = [undefined, undefined, Sk.builtin.bool(true), Sk.builtin.bool(false)];
	play.co_numargs = 4;
	mod.play = new Sk.builtin.func(play);
	
	var play_show = function(music, pin, wait, loop){
		if(mod._data.stop) {
			delete mod._data.stop;
		}
		if(wait === undefined) 
			wait = new Sk.builtin.bool(true);
		if(loop === undefined)
			loop = new Sk.builtin.bool(false);
		
		var notes = Sk.ffi.remapToJs(music);
		var i = 0;
		var timeout = 60000 / mod._data.bpm / mod._data.ticks;
		function playNextNote(pin) {
			var n = notes[i].toLowerCase();
			var d = n.match(/([rcdefgab][b#]?)([0-9]?)(:([0-9]*))?/);
			n = {short: n,
				note: d[1],
				octave: Number.parseInt(d[2]),
				ticks: d[4]? Number.parseInt(d[4]) : 1
				}
			switch(n.note) {
				case 'c':
					n.f = 16.352;
					break;
				case 'c#':
				case 'db':
					n.f = 17.324;
					break;
				case 'd':
					n.f = 18.354;
				break;
				case 'd#':
				case 'eb':
					n.f = 19.445;
				break;
				case 'e':
					n.f = 20.602;
				break;
				case 'f':
					n.f = 21.827;
				break;
				case 'f#':
				case 'gb':
					n.f = 23.125;
				break;
				case 'g':
					n.f = 24.500;
				break;
				case 'g#':
				case 'ab':
					n.f = 25.957;
				break;
				case 'a':
					n.f = 27.500;
				break;
				case 'a#':
				case 'bb':
					n.f = 29.135;
				break;
				case 'b':
					n.f = 30.868;
				break;
				case 'r':
					n.f = 0;
				break;
			}
			if(!n.octave) {
				n.octave = mod._data.octave;
			} else {
				mod._data.octave = n.octave;
			}
			for(var o = 0; o < n.octave; o++) {
				n.f = n.f * 2;
			}
			n.f = Math.round(n.f);
			sm.music.set_pitch(pin, n.f, timeout * n.ticks);
			//how to import Matrix module?
			var matrix = Sk.importModule("sm_matrix");
    		Sk.misceval.callsim(matrix['$d'].display.show.func_code, new Sk.builtin.str(n.note));	
			i++;
			if(i >= notes.length){
				if(loop.v) {
					i = 0;
				} else {
					return;
				}
			}
		}
		playNextNote(pin.v);	
	}
	play_show.co_varnames = ['music', 'pin', 'wait', 'loop'];
	play_show.$defaults = [undefined, undefined, Sk.builtin.bool(true), Sk.builtin.bool(false)];
	play_show.co_numargs = 4;
	mod.play_show = new Sk.builtin.func(play);

	var pitch = function(pin, frequency, len, wait){
		debugger;
		if (typeof(wait) == "undefined")
			wait = Sk.builtin.bool(false)
		sm.music.set_pitch(pin.v, frequency.v, len.v, wait.v);
	}
	pitch.co_varnames = ['pin', 'frequency', 'len' , 'wait'];
	pitch.$defaults = [Sk.builtin.int_(27), Sk.builtin.int_(0), Sk.builtin.int_(0), Sk.builtin.bool(false)];
	pitch.co_numargs = 4;
	mod.pitch = new Sk.builtin.func(pitch);
	
	var stop = function(pin) {
		sm.music.set_pitch(pin.v, 0, 0);
	}
	stop.co_varnames = ['pin'];
	stop.$defaults = [undefined];
	stop.co_numargs = 1;
	mod.stop = new Sk.builtin.func(stop);
	
	
	mod.reset = new Sk.builtin.func(function() {
		mod._data.ticks = 4;
		mod._data.bpm = 120;
		mod._data.duration = 4;
		mod._data.octave = 4;
	});
	
	mod.DADADADUM = Sk.ffi.remapToPy(["r4:2", "g", "g", "g", "eb:8", "r:2", "f", "f", "f", "d:8"]);

	mod.ENTERTAINER = Sk.ffi.remapToPy(["d4:1", "d#", "e", "c5:2", "e4:1", "c5:2", "e4:1", "c5:3", "c:1", "d", "d#", "e", "c", "d", "e:2", "b4:1", "d5:2", "c:4"]);

	mod.PRELUDE = Sk.ffi.remapToPy(["c4:1", "e", "g", "c5", "e", "g4", "c5", "e", "c4", "e",
		"g", "c5", "e", "g4", "c5", "e", "c4", "d", "g", "d5", "f",
		"g4", "d5", "f", "c4", "d", "g", "d5", "f", "g4", "d5", "f",
		"b3", "d4", "g", "d5", "f", "g4", "d5", "f", "b3", "d4", "g",
		"d5", "f", "g4", "d5", "f", "c4", "e", "g", "c5", "e", "g4",
		"c5", "e", "c4", "e", "g", "c5", "e", "g4", "c5", "e"]);

	mod.ODE = Sk.ffi.remapToPy(["e4", "e", "f", "g", "g", "f", "e", "d", "c", "c", "d", "e",
		"e:6", "d:2", "d:8", "e:4", "e", "f", "g",
		"g", "f", "e", "d", "c", "c", "d", "e", "d:6",
		"c:2", "c:8"]);

	mod.NYAN = Sk.ffi.remapToPy(["f#5:2", "g#", "c#:1", "d#:2",
		"b4:1", "d5:1", "c#", "b4:2", "b",
		"c#5", "d", "d:1", "c#", "b4:1",
		"c#5:1", "d#", "f#", "g#", "d#",
		"f#", "c#", "d", "b4", "c#5", "b4",
		"d#5:2", "f#", "g#:1", "d#",
		"f#", "c#", "d#", "b4", "d5", "d#", "d",
		"c#", "b4", "c#5", "d:2", "b4:1", "c#5",
		"d#", "f#", "c#", "d", "c#", "b4",
		"c#5:2", "b4", "c#5", "b4", "f#:1",
		"g#", "b:2", "f#:1", "g#", "b",
		"c#5", "d#", "b4", "e5", "d#", "e", "f#",
		"b4:2", "b", "f#:1", "g#", "b", "f#",
		"e5", "d#", "c#", "b4", "f#", "d#", "e",
		"f#", "b:2", "f#:1", "g#", "b:2",
		"f#:1", "g#", "b", "b", "c#5", "d#",
		"b4", "f#", "g#", "f#", "b:2", "b:1",
		"a#", "b", "f#", "g#", "b", "e5", "d#", "e",
		"f#", "b4:2", "c#5"]);

	mod.RINGTONE = Sk.ffi.remapToPy(["c4:1", "d", "e:2", "g", "d:1", "e", "f:2",
		"a", "e:1", "f", "g:2", "b", "c5:4"]);

	mod.FUNK = Sk.ffi.remapToPy(["c2:2", "c", "d#", "c:1", "f:2", "c:1",
		"f:2", "f#", "g", "c", "c", "g", "c:1",
		"f#:2", "c:1", "f#:2", "f", "d#"]);

	mod.BLUES = Sk.ffi.remapToPy(["c2:2", "e", "g", "a", "a#", "a", "g", "e",
		"c2:2", "e", "g", "a", "a#", "a", "g", "e", "f", "a",
		"c3", "d", "d#", "d", "c", "a2", "c2:2", "e", "g",
		"a", "a#", "a", "g", "e", "g", "b", "d3", "f", "f2", "a",
		"c3", "d#", "c2:2", "e", "g", "e", "g", "f", "e",
		"d"]);

	mod.BIRTHDAY = Sk.ffi.remapToPy(["c4:3", "c:1", "d:4", "c:4", "f:4",
		"e:8", "c:3", "c:1", "d:4", "c:4",
		"g:4", "f:8", "c:3", "c:1", "c5:4", "a4:4",
		"f:4", "e:4", "d:8", "a#:3", "a#:1", "a:4",
		"f:4", "g:4", "f:8"]);

	mod.WEDDING = Sk.ffi.remapToPy(["c4:4", "f:3", "f:1", "f:8", "c:4",
		"g:3", "e:1", "f:8", "c:4", "f:3",
		"a:1", "c5:4", "a4:3", "f:1", "f:4",
		"e:3", "f:1", "g:8"]);

	mod.FUNERAL = Sk.ffi.remapToPy(["c3:4", "c:3", "c:1", "c:4",
		"d#:3", "d:1", "d:3", "c:1",
		"c:3", "b2:1", "c3:4"]);

	mod.PUNCHLINE = Sk.ffi.remapToPy(["c4:3", "g3:1", "f#", "g", "g#:3", "g",
		"r", "b", "c4"]);

	mod.PYTHON = Sk.ffi.remapToPy(["d5:1", "b4", "r", "b", "b", "a#", "b", "g5", "r",
		"d", "d", "r", "b4", "c5", "r", "c", "c", "r", "d",
		"e:5", "c:1", "a4", "r", "a", "a", "g#", "a",
		"f#5", "r", "e", "e", "r", "c", "b4", "r", "b", "b", "r",
		"c5", "d:5", "d:1", "b4", "r", "b", "b", "a#",
		"b", "b5", "r", "g", "g", "r", "d", "c#", "r", "a", "a",
		"r", "a", "a:5", "g:1", "f#:2", "a:1",
		"a", "g#", "a", "e:2", "a:1", "a", "g#",
		"a", "d", "r", "c#", "d", "r", "c#", "d:2",
		"r:3"]);

	mod.BADDY = Sk.ffi.remapToPy(["c3:3", "r", "d:2", "d#", "r", "c", "r", "f#:8"]);

	mod.CHASE = Sk.ffi.remapToPy(["a4:1", "b", "c5", "b4", "a:2", "r", "a:1", "b", "c5", "b4", "a:2", "r", "a:2", "e5", "d#", "e", "f", "e", "d#", "e", "b4:1", "c5", "d", "c", "b4:2", "r", "b:1", "c5", "d", "c", "b4:2", "r", "b:2", "e5", "d#", "e", "f", "e", "d#", "e"]);

	mod.BA_DING = Sk.ffi.remapToPy(["b5:1", "e6:3"]);

	mod.WAWAWAWAA = Sk.ffi.remapToPy(["e3:3", "r:1", "d#:3", "r:1", "d:4", "r:1", "c#:8"]);

	mod.JUMP_UP = Sk.ffi.remapToPy(["c5:1", "d", "e", "f", "g"]);

	mod.JUMP_DOWN = Sk.ffi.remapToPy(["g5:1", "f", "e", "d", "c"]);

	mod.POWER_UP = Sk.ffi.remapToPy(["g4:1", "c5", "e", "g:2", "e:1", "g:3"]);

	mod.POWER_DOWN = Sk.ffi.remapToPy(["g5:1", "d#", "c", "g4:2", "b:1", "c5:3"]);

	mod.normal_tone = Sk.ffi.remapToPy({
    'A1': 55, 'B1': 62, 'C1': 33, 'D1': 37, 'E1': 41, 'F1': 44, 'G1': 49,
    'A2': 110, 'B2': 123, 'C2': 65, 'D2': 73, 'E2': 82, 'F2': 87, 'G2': 98,
    'A3': 220, 'B3': 247, 'C3': 131, 'D3': 147, 'E3': 165, 'F3': 175, 'G3': 196,
    'A4': 440, 'B4': 494, 'C4': 262, 'D4': 294, 'E4': 330, 'F4': 349, 'G4': 392,
    'A5': 880, 'B5': 988, 'C5': 523, 'D5': 587, 'E5': 659, 'F5': 698, 'G5': 784,
    'A6': 1760, 'B6': 1976, 'C6': 1047, 'D6': 1175, 'E6': 1319, 'F6': 1397, 'G6': 1568,
    'A7': 3520, 'B7': 3951, 'C7': 2093, 'D7': 2349, 'E7': 2637, 'F7': 2794, 'G7': 3135,
    'A8': 7040, 'B8': 7902, 'C8': 4186, 'D8': 4699, 'E8': 5274, 'F8': 5588, 'G8': 6271,
    'A9': 14080, 'B9': 15804
	});

	mod.rising_tone = Sk.ffi.remapToPy({
	    'A1': 58, 'C1': 35, 'D1': 39, 'F1': 46, 'G1': 52,
	    'A2': 117, 'C2': 69, 'D2': 78, 'F2': 93, 'G2': 104,
	    'A3': 233, 'C3': 139, 'D3': 156, 'F3': 185, 'G3': 208,
	    'A4': 466, 'C4': 277, 'D4': 311, 'F4': 370, 'G4': 415,
	    'A5': 932, 'C5': 554, 'D5': 622, 'F5': 740, 'G5': 831,
	    'A6': 1865, 'C6': 1109, 'D6': 1245, 'F6': 1480, 'G6': 1661,
	    'A7': 3729, 'C7': 2217, 'D7': 2489, 'F7': 2960, 'G7': 3322,
	    'A8': 7459, 'C8': 4435, 'D8': 4978, 'F8': 5920, 'G8': 6645,
	    'A9': 14917
	});

	mod.falling_tone = Sk.ffi.remapToPy({
	    'B1': 58, 'D1': 35, 'E1': 39, 'G1': 46, 'A1': 52,
	    'B2': 117, 'D2': 69, 'E2': 78, 'G2': 93, 'A2': 104,
	    'B3': 233, 'D3': 139, 'E3': 156, 'G3': 185, 'A3': 208,
	    'B4': 466, 'D4': 277, 'E4': 311, 'G4': 370, 'A4': 415,
	    'B5': 932, 'D5': 554, 'E5': 622, 'G5': 740, 'A5': 831,
	    'B6': 1865, 'D6': 1109, 'E6': 1245, 'G6': 1480, 'A6': 1661,
	    'B7': 3729, 'D7': 2217, 'E7': 2489, 'G7': 2960, 'A7': 3322,
	    'B8': 7459, 'D8': 4435, 'E8': 4978, 'G8': 5920, 'A8': 6645,
	    'B9': 14917
	});
	return mod;
};