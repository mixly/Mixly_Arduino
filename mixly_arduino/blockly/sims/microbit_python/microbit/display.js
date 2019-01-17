

var display = function(name) {
	var leds = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
	var letters = {
		A: [" 99  ",
			"9  9 ",
			"9999 ",
			"9  9 ",
			"9  9 "],

		B: ["999  ",
			"9  9 ",
			"999  ",
			"9  9 ",
			"999  "],

		C: [" 9999",
			"9    ",
			"9    ",
			"9    ",
			" 9999"],

		D: ["9999 ",
			"9   9",
			"9   9",
			"9   9",
			"9999 "],

		E: ["99999",
			"9    ",
			"99999",
			"9    ",
			"99999"],

		F: ["99999",
			"9    ",
			"9999 ",
			"9    ",
			"9    "],

		G: [" 9999",
			"9    ",
			"9  99",
			"9   9",
			" 9999"],

		H: ["9   9",
			"9   9",
			"99999",
			"9   9",
			"9   9"],

		I: [" 999 ",
			"  9  ",
			"  9  ",
			"  9  ",
			" 999 "],

		J: ["99999",
			"  9  ",
			"  9  ",
			"  9  ",
			"99   "],

		K: ["9  9 ",
			"9 9  ",
			"99   ",
			"9 9  ",
			"9  9 "],

		L: ["9    ",
			"9    ",
			"9    ",
			"9    ",
			"99999"],

		M: [" 9 9 ",
			"9 9 9",
			"9   9",
			"9   9",
			"9   9"],

		N: ["9   9",
			"99  9",
			"9 9 9",
			"9  99",
			"9   9"],

		O: [" 999 ",
			"9   9",
			"9   9",
			"9   9",
			" 999 "],

		P: ["9999 ",
			"9   9",
			"9999 ",
			"9    ",
			"9    "],

		Q: [" 999 ",
			"9   9",
			"9 9 9",
			"9  9 ",
			" 99 9"],

		R: ["9999 ",
			"9   9",
			"9999 ",
			"9 9  ",
			"9  9 "],

		S: ["99999",
			"9    ",
			"99999",
			"    9",
			"99999"],

		T: ["99999",
			"  9  ",
			"  9  ",
			"  9  ",
			"  9  "],

		U: ["9   9",
			"9   9",
			"9   9",
			"9   9",
			" 999 "],

		V: ["9   9",
			"9   9",
			" 9 9 ",
			" 9 9 ",
			"  9  "],

		W: ["9   9",
			"9   9",
			"9   9",
			"9 9 9",
			" 9 9 "],

		X: ["9   9",
			" 9 9 ",
			"  9  ",
			" 9 9 ",
			"9   9"],

		Y: ["9   9",
			" 9 9 ",
			"  9  ",
			" 9   ",
			"9    "],

		Z: ["99999",
			"   9 ",
			"  9  ",
			" 9   ",
			"99999"],



		a:	[" 999 ",
			 "    9",
			 " 9999",
			 "9   9",
			 " 9999"],

		b: [" 9   ",
			" 9   ",
			" 999 ",
			" 9  9",
			" 999 "],

		c: ["     ",
			"     ",
			" 9999",
			"9    ",
			" 9999"],

		d: ["    9",
			"    9",
			" 9999",
			"9   9",
			" 999 "],

		e: [" 99  ",
			"9  9 ",
			"9999 ",
			"9    ",
			" 999 "],

		f: ["  99 ",
			" 9   ",
			" 999 ",
			" 9   ",
			" 9   "],

		g: [" 999 ",
			"9   9",
			" 999 ",
			"   9 ",
			" 99  "],

		h: ["9    ",
			"9    ",
			"9999 ",
			"9   9",
			"9   9"],

		i: [" 9   ",
			"     ",
			" 9   ",
			" 9   ",
			" 9   "],

		j: ["   9 ",
			"     ",
			"   9 ",
			"   9 ",
			"  9  "],

		k: ["9    ",
			"9    ",
			"9 9  ",
			"99   ",
			"9 9  "],

		l: ["  9  ",
			"  9  ",
			"  9  ",
			"  9  ",
			"  9  "],

		m: ["     ",
			"99 9 ",
			"9 9 9",
			"9   9",
			"9   9"],

		n: ["     ",
			" 99  ",
			"9  9 ",
			"9  9 ",
			"9  9 "],

		o: ["     ",
			" 999 ",
			"9   9",
			"9   9",
			" 999 "],

		p: ["     ",
			"999  ",
			"9  9 ",
			"999  ",
			"9    "],

		q: ["     ",
			" 9999",
			"9   9",
			" 9999",
			"    9"],

		r: ["     ",
			" 999 ",
			"9    ",
			"9    ",
			"9    "],

		s: [" 999 ",
			"9    ",
			" 999 ",
			"    9",
			"9999 "],

		t: [" 9   ",
			"999  ",
			" 9   ",
			" 9   ",
			"  99 "],

		u: ["     ",
			"9   9",
			"9   9",
			"9   9",
			" 999 "],

		v: ["     ",
			"     ",
			"9   9",
			" 9 9 ",
			"  9  "],

		w: ["     ",
			"     ",
			"9 9 9",
			" 9 9 ",
			" 9 9 "],

		x: ["     ",
			"9  9 ",
			" 99  ",
			" 99  ",
			"9  9 "],

		y: ["     ",
			"9  9 ",
			" 99  ",
			"  9  ",
			"99   "],

		z: ["     ",
			"9999 ",
			"  9  ",
			" 9   ",
			"9999 "],

		"0": [" 999 ",
			  "99  9",
			  "9 9 9",
			  "9  99",
			  " 999 "],

		"1": [" 9   ",
			  "99   ",
			  " 9   ",
			  " 9   ",
			  "999  "],

		"2": [" 999 ",
		   	  "9   9",
			  "   9 ",
			  "  9  ",
			  " 9999"],

		"3": [" 999 ",
			  "9   9",
			  "   9 ",
			  "9   9",
			  " 999  "],

		"4": ["   9 ",
			  "  99 ",
			  " 9 9 ",
			  "99999",
			  "   9 "],

		"5": ["99999",
			  "9    ",
			  "9999 ",
			  "    9",
			  "9999 "],

		"6": [" 999 ",
			  "9    ",
			  "9999 ",
			  "9   9",
			  " 999 "],

		"7": ["99999",
			  "   9 ",
			  "  9  ",
			  " 9   ",
			  "9    "],

		"8": [" 999 ",
			  "9   9",
			  " 999 ",
			  "9   9",
			  " 999 "],

		"9": [" 999 ",
			  "9  9 ",
			  " 999 ",
			  "   9 ",
			  "  9  "],

		'!':	["  9  ",
			     "  9  ",
			     "  9  ",
			     "     ",
			     "  9  "],
		'"':	[" 9 9 ",
			     " 9 9 ",
			     "     ",
			     "     ",
			     "     "],

		'£':	["   99",
			     "  9  ",
			     " 9999",
			     " 9   ",
			     "9 999"],

		'$':	[" 9999",
			     "9 9  ",
			     " 999 ",
			     "  9 9",
			     "9999 "],

		'%':	["99  9",
			     "99 9 ",
			     "  9  ",
			     " 9 99",
			     "9  99"],

		'^':	["  9  ",
			     " 9 9 ",
			     "     ",
			     "     ",
			     "     "],

		'&':	[" 999 ",
			     " 9 9 ",
			     " 99  ",
			     "9  9 ",
			     " 99 9"],

		'*':	["9 9 9",
			     " 999 ",
			     "9 9 9",
			     " 999 ",
			     "9 9 9"],
		'(':	["  9  ",
			     " 9   ",
			     " 9   ",
			     " 9   ",
			     "  9  "],

		')':	["  9  ",
			     "   9 ",
			     "   9 ",
			     "   9 ",
			     "  9  "],

		'[':	[" 999 ",
			     " 9   ",
			     " 9   ",
			     " 9   ",
			     " 999 "],

		']':	[" 999 ",
			     "   9 ",
			     "   9 ",
			     "   9 ",
			     " 999 "],

		'{':	["  99 ",
			     " 9   ",
			     "  9  ",
			     " 9   ",
			     "  99 "],

		'}':	[" 99  ",
			     "   9 ",
			     "  9  ",
			     "   9 ",
			     " 99  "],

		'@':	[" 999 ",
			     "9   9",
			     "9 999",
			     "9 9 9",
			     "99999"],

		"'":	["  9  ",
			     "     ",
			     "     ",
			     "     ",
			     "     "],

		'~':	["     ",
			     " 99 9",
			     "   9 ",
			     "     ",
			     "     "],

		':':	["     ",
			     "  9  ",
			     "     ",
			     "  9  ",
			     "     "],

		'#':	[" 9 9 ",
			     "99999",
			     " 9 9 ",
			     "99999",
			     " 9 9 "],

		'/':	["    9",
			     "   9 ",
			     "  9  ",
			     " 9   ",
			     "9    "],

		'\\':	["9    ",
			     " 9   ",
			     "  9  ",
			     "   9 ",
			     "    9"],

		'?':	["9999 ",
			     "   9 ",
			     "  99 ",
			     "     ",
			     "  9  "],

		'.':	["     ",
			     "     ",
			     "     ",
			     "     ",
			     "  9  "],

		',':	["     ",
			     "     ",
			     "     ",
			     "   9 ",
			     "  9  "],

		'<':	["   9 ",
			     "  9  ",
			     " 9   ",
			     "  9  ",
			     "   9 "],

		'>':	[" 9   ",
			     "  9  ",
			     "   9 ",
			     "  9  ",
			     " 9   "],

		' ':	["     ",
			     "     ",
			     "     ",
			     "     ",
			     "     "],

		'-':	["     ",
			     "     ",
			     "99999",
			     "     ",
			     "     "],

		'+':	["  9  ",
			     "  9  ",
			     "99999",
			     "  9  ",
			     "  9  "],

		'_':	["     ",
			     "     ",
			     "     ",
			     "     ",
			     "99999"],


		'=':	["     ",
			     "99999",
			     "     ",
			     "99999",
			     "     "],



	};

	function setLED(x, y, brightness) {
	    ui.setLED(x, y, brightness);
		leds[y][x] = brightness;
	}

	function clearScreen() {
		var x,y;
		for(x = 0; x < 5; x++) {
			for(y = 0; y < 5; y++) {
				setLED(x, y, 0);
			}
		}
	}

	function showCharacter(c) {
		var x, y;
		var rows = ['', '', '', '', ''];

		var letter = letters[" "];
		if(letters.hasOwnProperty(c)) {
			letter = letters[c];
		}
		for(y = 0; y < 5; y++) {
			for(x = 0; x < 5; x++) {
				setLED(x, y, letter[y][x]);
			}
		}

	}

	var mod = {};

	mod.get_pixel = new Sk.builtin.func(function(x, y) {
		return Sk.builtin.int_(parseInt(leds[y.v][x.v]));
	});

	mod.set_pixel = new Sk.builtin.func(function(x, y, brightness) {
		setLED(parseInt(x.v), parseInt(y.v), parseInt(brightness.v));
	});

	mod.clear = new Sk.builtin.func(function() {
		clearScreen();
	});

	var show = function(image, delay, wait, loop, clear) {
		if(wait === undefined)
			wait = Sk.builtin.bool(true);

		if(loop === undefined)
			loop = Sk.builtin.bool(false);

		if(clear === undefined)
			clear = Sk.builtin.bool(false);

		if(delay === undefined)
			delay = Sk.builtin.int_(400);

		if(image.tp$name == "number") {
			throw new Sk.builtin.TypeError("Convert the number to a string before showing it");
			image = new Sk.builtin.str(image.v);
		}

		return sim.runAsync(function(resolve, reject) {
			if(image && (image.tp$name == "list" || (image.tp$name == "str" && image.v.length > 1))) {
				var i = 0;

				function showNextFrame() {
					if(i >= image.v.length) {
						if(loop.v) {
							i = 0;
						} else {
							if(clear.v) {
								clearScreen();
							}
							if(wait.v) {
								resolve();
							}
							return;
						}

					}

					if(image.v[i].tp$name == "Image") {
						for(y = 0; y < 5; y++) {
							for(x = 0; x < 5; x++) {
								setLED(x, y, image.v[i].lines[y][x]);
							}
						}
					}
					if(image.tp$name == "str") {
						showCharacter(image.v[i]);
					}

					if(image.v[i].tp$name == "str") {
						showCharacter(image.v[i].v[0]);
					}

					i++;
					setTimeout(showNextFrame, delay.v)
				}

				showNextFrame();
				if(!wait.v) {
					resolve();
				}
			} else {
				if(image.tp$name == "Image") {
					for(y = 0; y < 5; y++) {
						for(x = 0; x < 5; x++) {
							setLED(x, y, image.lines[y][x]);
						}
					}
				}
				if(image.tp$name == "str") {
					showCharacter(image.v[0]);
				}
				resolve();
			}
		});
	}
	show.co_varnames = ['image', 'delay', 'wait', 'loop', 'clear'];
	show.$defaults = [Sk.builtin.none, Sk.builtin.none, true, true, false];
	show.co_numargs = 5;
	mod.show = new Sk.builtin.func(show);

	function scroll(message, delay) {
		if(delay == undefined)
			delay = Sk.builtin.int_(400);

		if(message.tp$name == "number") {
			message = new Sk.builtin.str(message.v);
		}

		delay.v /= 5;
		message.v = ' ' + message.v + ' ';
		return sim.runAsync(function(resolve, reject) {
			var i, x, y;
			var rows = ['', '', '', '', ''];
			for(i = 0; i < message.v.length; i++) {
				var currentLetter = message.v[i];
				var letter = letters[" "];
				if(letters.hasOwnProperty(currentLetter)) {
					letter = letters[currentLetter];
				}
				for(y = 0; y < 5; y++) {
					rows[y] += letter[y] + " ";
				}
			}

			var width = rows[0].length;
			var offset = 0;
			function showScroll() {
				for(y = 0; y < 5; y++) {
					for(x = offset; x < offset + 5; x++) {
						setLED(x - offset, y, rows[y][x]);
					}
				}

				if(offset < width - 5) {
					offset++;
					setTimeout(showScroll, delay.v);
				} else {
					resolve();
				}
			}
			showScroll();
		});
	}
	scroll.co_varnames = ['text', 'delay'];
	scroll.$defaults = [Sk.builtin.none, Sk.builtin.int_(400)];
	scroll.co_numargs = 2;
	mod.scroll = new Sk.builtin.func(scroll);
	return mod;
}
