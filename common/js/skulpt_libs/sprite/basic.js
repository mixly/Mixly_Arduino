var $builtinmodule = function (name) {
	var sprite = {__name__: new Sk.builtin.str("sprite")};
	sprite.createBackground = new Sk.builtin.func(function(img) {
		img=Sk.ffi.remapToJs(img);
        return Sk.ffi.remapToPy(SPRITE.CreateBackground(img));
	});
	
	sprite.Sprite = Sk.misceval.buildClass(sprite, function($gbl, $loc) {
		
		$loc.__init__ = new Sk.builtin.func(function(self, img, x, y, name) {
			img=Sk.ffi.remapToJs(img);
			x=Sk.ffi.remapToJs(x);
			y=Sk.ffi.remapToJs(y);
			name=Sk.ffi.remapToJs(name);
			self.v$name = Sk.ffi.remapToPy(SPRITE.CreateASprite(img, x, y, name));
		});
		
		$loc.show = new Sk.builtin.func(function(self) {
			var name = Sk.ffi.remapToJs(self.v$name);
			var t = SPRITE.sprites[name];
			t.show();
		});
		
		$loc.hide = new Sk.builtin.func(function(self) {
			var name = Sk.ffi.remapToJs(self.v$name);
			var t = SPRITE.sprites[name];
			t.hide();
		});

		$loc.enlarge = new Sk.builtin.func(function(self, s) {
			var name = Sk.ffi.remapToJs(self.v$name);
			var s = Sk.ffi.remapToJs(s);
			var t = SPRITE.sprites[name];
			t.enlarge(s);
		});
		
		$loc.enlargeTo = new Sk.builtin.func(function(self, s) {
			var name = Sk.ffi.remapToJs(self.v$name);
			var s = Sk.ffi.remapToJs(s);
			var t = SPRITE.sprites[name];
			t.enlargeTo(s);
		});
		
		$loc.expandTo = new Sk.builtin.func(function(self, s, time) {
			var name = Sk.ffi.remapToJs(self.v$name);
			var s = Sk.ffi.remapToJs(s);
			var t = SPRITE.sprites[name];
			return t.expandTo(s, time);
		});
		
		$loc.move = new Sk.builtin.func(function(self, step) {
			var name = Sk.ffi.remapToJs(self.v$name);
			step=Sk.ffi.remapToJs(step);
			var t = SPRITE.sprites[name];
			t.move(step);
		});
		
		$loc.moveTo = new Sk.builtin.func(function(self, x, y) {
			var name = Sk.ffi.remapToJs(self.v$name);
			x=Sk.ffi.remapToJs(x);
			y=Sk.ffi.remapToJs(y);
			var t = SPRITE.sprites[name];
			t.moveTo(x, y);
		});
		
		$loc.slideTo = new Sk.builtin.func(function(self, x, y, time) {
			var name = Sk.ffi.remapToJs(self.v$name);
			x=Sk.ffi.remapToJs(x);
			y=Sk.ffi.remapToJs(y);
			time=Sk.ffi.remapToJs(time);
			var t = SPRITE.sprites[name];
			return t.slideTo(x, y, time);
		});
		
		$loc.addX = new Sk.builtin.func(function(self, step) {
			var name = Sk.ffi.remapToJs(self.v$name);
			step = Sk.ffi.remapToJs(step);
			var t = SPRITE.sprites[name];
			t.addX(step);
		});
		
		$loc.addY = new Sk.builtin.func(function(self, step) {
			var name = Sk.ffi.remapToJs(self.v$name);
			step = Sk.ffi.remapToJs(step);
			var t = SPRITE.sprites[name];
			t.addY(step);
		});
		
		$loc.getX = new Sk.builtin.func(function(self) {
			var name = Sk.ffi.remapToJs(self.v$name);
			var t = SPRITE.sprites[name];
			return Sk.ffi.remapToPy(t.x);
		});
		
		$loc.getY = new Sk.builtin.func(function(self) {
			var name = Sk.ffi.remapToJs(self.v$name);
			var t = SPRITE.sprites[name];
			return Sk.ffi.remapToPy(t.y);
		});
		
		$loc.rotate = new Sk.builtin.func(function(self, degree) {
			var name = Sk.ffi.remapToJs(self.v$name);
			degree=Sk.ffi.remapToJs(degree);
			var t = SPRITE.sprites[name];
			t.rotate(degree);
		});
		
		$loc.rotateTo = new Sk.builtin.func(function(self, degree) {
			var name = Sk.ffi.remapToJs(self.v$name);
			degree=Sk.ffi.remapToJs(degree);
			var t = SPRITE.sprites[name];
			t.rotateTo(degree);
		});
		
		$loc.circleTo = new Sk.builtin.func(function(self, degree, time) {
			var name = Sk.ffi.remapToJs(self.v$name);
			degree=Sk.ffi.remapToJs(degree);
			var t = SPRITE.sprites[name];
			return t.circleTo(degree);
		});
		
		$loc.hit = new Sk.builtin.func(function(self, sprite2) {
			var name = Sk.ffi.remapToJs(self.v$name);
			var name2 = Sk.ffi.remapToJs(sprite2.v$name);
			var t = SPRITE.sprites[name];
			var t2 = SPRITE.sprites[name2];
			return Sk.ffi.remapToPy(t.hit(t2));
		});
		
		$loc.outOfScreen = new Sk.builtin.func(function(self) {
			var name = Sk.ffi.remapToJs(self.v$name);
			var t = SPRITE.sprites[name];
			return Sk.ffi.remapToPy(t.outOfScreen());
		});
		
		$loc.mouseAction = new Sk.builtin.func(function(self, calc) {
			var name = Sk.ffi.remapToJs(self.v$name);
			var t = SPRITE.sprites[name];
			t.mouseAction(()=>{Sk.misceval.callsim(calc)});
		});
		
		$loc.isClicked = new Sk.builtin.func(function(self) {
			var name = Sk.ffi.remapToJs(self.v$name);
			var t = SPRITE.sprites[name];
			return Sk.ffi.remapToPy(t.isDown);
		});
		
		// new
		$loc.setScale = new Sk.builtin.func(function(self, h, w) {
			var name = Sk.ffi.remapToJs(self.v$name);
			var t = SPRITE.sprites[name];
			t.setScale(h, w);
		});
		$loc.filterGray = new Sk.builtin.func(function(self) {
			var name = Sk.ffi.remapToJs(self.v$name);
			var t = SPRITE.sprites[name];
			t.filterGray();
		});
		$loc.filterBrighter = new Sk.builtin.func(function(self) {
			var name = Sk.ffi.remapToJs(self.v$name);
			var t = SPRITE.sprites[name];
			t.filterBrighter();
		});
		$loc.filterOrigin = new Sk.builtin.func(function(self) {
			var name = Sk.ffi.remapToJs(self.v$name);
			var t = SPRITE.sprites[name];
			t.filterOrigin();
		});
	}, 'Sprite', []);

	sprite.Text = Sk.misceval.buildClass(sprite, function($gbl, $loc) {

		$loc.__init__ = new Sk.builtin.func(function(self, text, x, y, name) {
			text=Sk.ffi.remapToJs(text);
			x=Sk.ffi.remapToJs(x);
			y=Sk.ffi.remapToJs(y);
			name=Sk.ffi.remapToJs(name);
			self.v$name = Sk.ffi.remapToPy(SPRITE.CreateText(text, x, y, name));
		});
	
		$loc.changeText = new Sk.builtin.func(function(self, text) {
			var name = Sk.ffi.remapToJs(self.v$name);
			text=Sk.ffi.remapToJs(text);
			var t = SPRITE.texts[name];
			t.changeText(text);
		});
		
		$loc.show = new Sk.builtin.func(function(self) {
			var name = Sk.ffi.remapToJs(self.v$name);
			var t = SPRITE.texts[name];
			t.show();
		});
		
		$loc.hide = new Sk.builtin.func(function(self) {
			var name = Sk.ffi.remapToJs(self.v$name);
			var t = SPRITE.texts[name];
			t.hide();
		});
		
	}, 'Text', []);

	sprite.clearAllSprites = new Sk.builtin.func(function() {
	    return Sk.ffi.remapToPy(SPRITE.ClearAllSprites());
	});

	sprite.repeat = new Sk.builtin.func(function(calc = new Function()) {
		SPRITE.Repeat(()=>{Sk.misceval.callsim(calc)});
	});
	
	sprite.keyboardListener = new Sk.builtin.func(function(key, calc = new Function()) {
		key = Sk.ffi.remapToJs(key);
		SPRITE.KeyboardListener(key,()=>{Sk.misceval.callsim(calc)});
	});
	
	sprite.isKeyboardHit = new Sk.builtin.func(function(keyvalue) {
		keyvalue = Sk.ffi.remapToJs(keyvalue);
		return Sk.ffi.remapToPy(SPRITE.IsKeyboardHit(keyvalue));
	});
	
	sprite.getTime = new Sk.builtin.func(function() {
		return Sk.ffi.remapToPy(Math.floor(SPRITE.timer/1000));
	});
	
	sprite.clearTimer = new Sk.builtin.func(function() {
		SPRITE.ClearTimer();
	});
	
	return sprite;
}