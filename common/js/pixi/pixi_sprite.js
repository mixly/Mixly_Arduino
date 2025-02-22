SPRITE = {
	stage: new PIXI.Container(),
	pointer: {x:0, y:0},
	backgroundSprite: null,
	sprites: {},
	texts: {},
	counter: 0,
	keys: {},
	state: false,
	running: false,
	repeatPlay: ()=>{},
	
	displayTag: false,
	processingDisplayEvent: null,
	
	successDisplayEvents: [],
	successProcessingDisplayEvents: [],
	
	startTime: performance.now(),
	timer: 0,
	lastFrameTime: null,
	lastSecond: null,
	targetFPS: 60,
	frameCount: 0,
	currentFPS: 60,
	
	canvasHeight: 450,
	canvasWidth: 800
};
SPRITE.gameLoop = ()=>{
	if(SPRITE.state == true) {
		SPRITE.repeatPlay();
		SPRITE.GameLoopDisplay();
	}
	SPRITE.timer = performance.now() - SPRITE.startTime;
}
SPRITE.animate = (currentTime)=>{
	const deltaTime = currentTime - SPRITE.lastFrameTime;
	
	if (deltaTime >= 1000 / SPRITE.targetFPS) {
		SPRITE.frameCount++;
		SPRITE.gameLoop();
		SPRITE.renderer.render(SPRITE.stage);
		SPRITE.lastFrameTime = currentTime;
	}
	if (currentTime - SPRITE.lastSecond >= 1000) {
		SPRITE.currentFPS = SPRITE.frameCount;
		SPRITE.frameCount = 0;
		SPRITE.lastSecond = currentTime;
	}
	requestAnimationFrame(SPRITE.animate);
}

SPRITE.CreateBackground = (img, mode=0)=>{
	var player;
	if(mode==0) {
		player = new PIXI.Sprite.fromImage(`../common/media/spriteimg/${img}.png`);
	}
	player.name = 'background';
	player.anchor.set(0.5);
	player.x = SPRITE.canvasWidth/2;
	player.y = SPRITE.canvasHeight/2;
	
	// const $canvas = $('#spriteContainer canvas');
	// const canvasWidth = $canvas.width();
	// const canvasHeight = $canvas.height();
	// player.width = ($('body').width() / 2);
	// player.height = ($('body').width() / 2)/canvasWidth*canvasHeight;
	
	player.width = SPRITE.canvasWidth;
	player.height = SPRITE.canvasHeight;
	
	player.interactive = true;
	player.buttonMode = true;
	player.isDown = false;
	player.isUp = true;
	player.on('mousedown',function(event){
			this.isDown = true;
			this.isUp = false;
			if(SPRITE.state)this.RunningMouseDown();
		})
		.on('mouseup',function(event){
			this.isDown = false;
			this.isUp = true;
		})
		.on('mouseupoutside',function(event){
			this.isDown = false;
			this.isUp = true;
		});
	player.RunningMouseDown = new Function("");
	if (SPRITE.backgroundSprite && SPRITE.backgroundSprite.parent) {
		// 如果子节点已经在父节点中，需要先移除
		SPRITE.stage.removeChild(SPRITE.backgroundSprite);
	}
	SPRITE.backgroundSprite = player;
	SPRITE.stage.addChildAt(SPRITE.backgroundSprite, 0);
	return 0;
}

SPRITE.CreateASprite = (img, x = SPRITE.canvasWidth/2, y = SPRITE.canvasHeight/2, name = '', mode = 0)=>{
	if(name=='') {
		name = 'sprite'+ (++SPRITE.counter);
	}
	var player;
	if(mode==0) {
		player = new PIXI.Sprite.fromImage(`../common/media/spriteimg/${img}.png`);
	}
	if (!SPRITE.sprites[name]&&!SPRITE.texts[name]) {
		player.name = name;
		player.anchor.set(0.5);
		player.x = x;
		player.y = y;
		player.interactive = true;
		player.buttonMode = true;
		player.isDown = false;
		player.isUp = true;
		player.on('mousedown', function(event){
				this.isDown = true;
				this.isUp = false;
				if (!SPRITE.state) {
					this.data = event.data;
					this.alpha = 0.5;
					this.dragging = true;
				} else this.RunningMouseDown();
			})
			.on('mouseup', function(event){
				this.isDown = false;
				this.isUp = true;
				if (!SPRITE.state) {
					this.alpha = 1;
					this.dragging = false;
					this.data = null;
				}
			})
			.on('mouseupoutside', function(event){
				this.isDown = false;
				this.isUp = true;
				if (!SPRITE.state) {
					this.alpha = 1;
					this.dragging = false;
					this.data = null;
				}
			})
			.on('mousemove', function(event){
				if (!SPRITE.state)
					if (this.dragging) {
						var newPosition = this.data.getLocalPosition(this.parent);
						this.position.x = newPosition.x;
						this.position.y = newPosition.y;
					}
			})
		player.RunningMouseDown = new Function("");
		player.show = function(){
			this.visible = true;
		};
		player.hide = function(){
			this.visible = false;
		};
		player.enlarge = function(s){
			const ratio = this.height/this.width;
			var measure = Math.sqrt(this.height*this.width);
			measure+=s;
			this.width = Math.sqrt(measure*measure/ratio);
			this.height = this.width*ratio;
		};
		player.enlargeTo = function(s){
			var ratio = this.height/this.width;
			this.width = Math.sqrt(s*s/ratio);
			this.height = this.width*ratio;
		};
		
		player.expandTo = function(s, time=1){
			if(SPRITE.running) {
				SPRITE.displayTag = true;
				SPRITE.processingDisplayEvent = {
					sprite: this,
					targetS: s,
					totalTime: time*1000,
					startTime: performance.now(),
					displayType: 'expand'
				};
				
				var prom = new Promise((resolve, reject) => {
					if (SPRITE.displayTag === false) {
						resolve();
					} else {
						const checkTagInterval = setInterval(() => {
							if (SPRITE.displayTag === false) {
								clearInterval(checkTagInterval);
								resolve();
							}
						}, 10);
					}
				});
				
				var susp = new Sk.misceval.Suspension();
				var resolution;
				
				susp.resume = function () {
					if (susp.data["error"]) {
						throw susp.data["error"];
					} else {
						return resolution;
					}
				};
				
				susp.data = {
					type: "Sk.promise",
					promise: prom.then(function (value) {
						resolution = value;
						return value;
					}, function (err) {
						console.log("err3", err);
						resolution = "";
						return Promise.reject(err);
					})
				};
				return susp;
			} else {
				SPRITE.successProcessingDisplayEvents.push({
					sprite: this,
					targetS: s,
					totalTime: time*1000,
					startTime: performance.now(),
					displayType: 'expand'
				});
				return 0;
			}
		};
		
		player.move = function(step){
			this.x += step * Math.cos(this.rotation);
			this.y += step * Math.sin(this.rotation);
		};
		player.moveTo = function(x, y){
			this.x = x;
			this.y = y;
		};
		player.slideTo = function(x, y, time=1) {
			if(SPRITE.running) {
				SPRITE.displayTag = true;
				SPRITE.processingDisplayEvent = {
					sprite: this,
					targetX: x,
					targetY: y,
					totalTime: time*1000,
					startTime: performance.now(),
					displayType: 'slide'
				};
				
				var prom = new Promise((resolve, reject) => {
					const checkTagInterval = setInterval(() => {
						if (SPRITE.displayTag === false) {
							clearInterval(checkTagInterval);
							resolve();
						}
					}, 10);
				});
				
				var susp = new Sk.misceval.Suspension();
				var resolution;
				
				susp.resume = function () {
					if (susp.data["error"]) {
						throw susp.data["error"];
					} else {
						return resolution;
					}
				};
				
				susp.data = {
					type: "Sk.promise",
					promise: prom.then(function (value) {
						resolution = value;
						return value;
					}, function (err) {
						console.log("err3", err);
						resolution = "";
						return Promise.reject(err);
					})
				};
				
				return susp;
			} else {
				SPRITE.successProcessingDisplayEvents.push({
					sprite: this,
					targetX: x,
					targetY: y,
					totalTime: time*1000,
					startTime: performance.now(),
					displayType: 'slide'
				});
				return 0;
			}
		};
		player.addX = function(step) {
			this.x += step;
		};
		player.addY = function(step) {
			this.y += step;
		};
		player.rotate = function(degree) {
			this.rotation += Math.PI/180*degree;
		};
		player.rotateTo = function(degree) {
			this.rotation = Math.PI/180*degree;
		};
		player.circleTo = function(degree, time=1) {
			if(SPRITE.running) {
				SPRITE.displayTag = true;
				SPRITE.processingDisplayEvent = {
					sprite: this,
					targetDegree: degree,
					totalTime: time*1000,
					startTime: performance.now(),
					displayType: 'circle'
				};
				var prom = new Promise((resolve, reject) => {
					if (SPRITE.displayTag === false) {
						resolve();
					} else {
						const checkTagInterval = setInterval(() => {
							if (SPRITE.displayTag === false) {
								clearInterval(checkTagInterval);
								resolve();
							}
						}, 10);
					}
				});
				
				var susp = new Sk.misceval.Suspension();
				var resolution;
				
				susp.resume = function () {
				    if (susp.data["error"]) {
				        throw susp.data["error"];
				    } else {
				        return resolution;
				    }
				};
				
				susp.data = {
				    type: "Sk.promise",
				    promise: prom.then(function (value) {
				        resolution = value;
				        return value;
				    }, function (err) {
				        console.log("err3", err);
				        resolution = "";
				        return Promise.reject(err);
				    })
				};
				return susp;
			} else {
				SPRITE.successProcessingDisplayEvents.push({
					sprite: this,
					targetDegree: degree,
					totalTime: time*1000,
					startTime: performance.now(),
					displayType: 'circle'
				});
				return 0;
			}
		};
		player.hit = function(sprite) {
			return SPRITE.hitTestRectangle(this, sprite);
		};
		player.outOfScreen = function() {
			return this.y >= SPRITE.renderer.height || this.y <= 0 || this.x <= 0 || this.x >= SPRITE.renderer.width;
		};
		player.mouseAction = function(func) {
			this.RunningMouseDown = func;
		};
		
		// new
		player.setScale = function(h = 0, w = 0) {
			if(h==0) h = this.height;
			if(w==0) w = this.width;
			this.height = h;
			this.width = w;
		}
		player.filterGray = function() {
			const grayscaleFilter = new PIXI.filters.ColorMatrixFilter();
			grayscaleFilter.blackAndWhite();
			this.filters = [grayscaleFilter];
		}
		player.filterBrighter = function() {
			const brightnessFilter = new PIXI.filters.ColorMatrixFilter();
			brightnessFilter.brightness(1.25); // 增加亮度
			this.filters = [brightnessFilter];
		}
		player.filterOrigin = function() {
			this.filters = null;
		}
		
		SPRITE.stage.addChild(player);
		SPRITE.sprites[name] = player;
	}
	return name;
}

SPRITE.ClearAllSprites = ()=>{
	if(SPRITE.backgroundSprite && SPRITE.backgroundSprite.parent)SPRITE.backgroundSprite.parent.removeChild(SPRITE.backgroundSprite);
	for(const name in SPRITE.sprites) {
		SPRITE.sprites[name].parent.removeChild(SPRITE.sprites[name]);
		delete SPRITE.sprites[name];
	}
	for(const name in SPRITE.texts) {
		SPRITE.texts[name].parent.removeChild(SPRITE.texts[name]);
		delete SPRITE.texts[name];
	}
	SPRITE.counter = 0;
	SPRITE.ClearTimer();
	return 0;
}

SPRITE.CreateText = (text, x = SPRITE.canvasWidth/2, y = SPRITE.canvasHeight/2, name = '')=>{
	if(name=='') {
		name = 'text'+ (++SPRITE.counter);
	}
	if (!SPRITE.sprites[name]&&!SPRITE.texts[name]) {
		var textObj = new PIXI.Text(text);
		textObj.name = name;
		textObj.x = x;
		textObj.y = y;
		textObj.interactive = true;
		textObj.buttonMode = true;
		textObj.on('mousedown', function(event){
				this.isDown = true;
				this.isUp = false;
				if (!SPRITE.state) {
					this.data = event.data;
					this.alpha = 0.5;
					this.dragging = true;
				} else this.RunningMouseDown();
			})
			.on('mouseup', function(event){
				this.isDown = false;
				this.isUp = true;
				if (!SPRITE.state) {
					this.alpha = 1;
					this.dragging = false;
					this.data = null;
				}
			})
			.on('mouseupoutside', function(event){
				this.isDown = false;
				this.isUp = true;
				if (!SPRITE.state) {
					this.alpha = 1;
					this.dragging = false;
					this.data = null;
				}
			})
			.on('mousemove', function(event){
				if (!SPRITE.state)
					if (this.dragging) {
						var newPosition = this.data.getLocalPosition(this.parent);
						this.position.x = newPosition.x;
						this.position.y = newPosition.y;
					}
			});
		textObj.RunningMouseDown = new Function("");
		textObj.changeText = function(text) {
			this.text = text;
		};
		textObj.show = function(){
			this.visible = true;
		};
		textObj.hide = function(){
			this.visible = false;
		};
		SPRITE.stage.addChild(textObj);
		SPRITE.texts[name] = textObj;
	}
	return name;
}

SPRITE.hitTestRectangle = (r1, r2)=>{
	let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
	hit = false;
	r1.centerX = r1.x + r1.width / 2;
	r1.centerY = r1.y + r1.height / 2;
	r2.centerX = r2.x + r2.width / 2;
	r2.centerY = r2.y + r2.height / 2;
	r1.halfWidth = r1.width / 2;
	r1.halfHeight = r1.height / 2;
	r2.halfWidth = r2.width / 2;
	r2.halfHeight = r2.height / 2;
	vx = r1.centerX - r2.centerX;
	vy = r1.centerY - r2.centerY;
	combinedHalfWidths = r1.halfWidth + r2.halfWidth;
	combinedHalfHeights = r1.halfHeight + r2.halfHeight;
	if (Math.abs(vx) < combinedHalfWidths) {
		if (Math.abs(vy) < combinedHalfHeights) {
			hit = true;
		} else {
			hit = false;
		}
	} else {
		hit = false;
	}
	return hit;
};

SPRITE.Repeat = (func)=>{
	SPRITE.repeatPlay = func;
}

SPRITE.IsKeyboardHit = (keyvalue)=>{
	if(!SPRITE.keys[keyvalue]){
		let key = SPRITE.keyboard(keyvalue);
		SPRITE.keys[keyvalue] = key;
	}
	return SPRITE.keys[keyvalue].isDown;
}

SPRITE.KeyboardListener = (keyvalue, func)=>{
	if(!SPRITE.keys[keyvalue]){
		let key = SPRITE.keyboard(keyvalue);
		key.press = function(){
			if(SPRITE.state)func();
		};
		SPRITE.keys[keyvalue] = key;
	} else {
		SPRITE.keys[keyvalue].press = function(){
			if(SPRITE.state)func();
		};
	}
}
SPRITE.keyboard = (value)=>{
	let key = {};
	key.value = value;
	key.isDown = false;
	key.isUp = true;
	key.press = undefined;
	key.release = undefined;
	key.downHandler = event => {
		if (event.key === key.value) {
			if (key.isUp && key.press) key.press();
			key.isDown = true;
			key.isUp = false;
			event.preventDefault();
		}
	};
	key.upHandler = event => {
		if (event.key === key.value) {
			if (key.isDown && key.release) key.release();
			key.isDown = false;
			key.isUp = true;
			event.preventDefault();
		}
	};
	const downListener = key.downHandler.bind(key);
	const upListener = key.upHandler.bind(key);
	window.addEventListener(
		"keydown", downListener, false
	);
	window.addEventListener(
		"keyup", upListener, false
	);
	key.unsubscribe = () => {
		window.removeEventListener("keydown", downListener);
		window.removeEventListener("keyup", upListener);
	};
	return key;
}

SPRITE.ClearTimer = ()=>{
	SPRITE.startTime = performance.now();
}

SPRITE.GameLoopDisplay = ()=>{
	if(SPRITE.processingDisplayEvent) {
		const pSE = SPRITE.processingDisplayEvent;
		switch (pSE.displayType) {
			case 'slide':
				if(performance.now() >= pSE.totalTime + pSE.startTime) {
					pSE.sprite.moveTo(pSE.targetX, pSE.targetY);
					SPRITE.displayTag = false;
					SPRITE.processingDisplayEvent = null;
				} else {
					var leftLoops = SPRITE.currentFPS * (pSE.totalTime + pSE.startTime - performance.now())/1000;
					if(leftLoops>=1) {
						pSE.sprite.addX((pSE.targetX - pSE.sprite.x) / leftLoops);
						pSE.sprite.addY((pSE.targetY - pSE.sprite.y) / leftLoops);
					}
				}
				break;
			case 'expand':
				if(performance.now() >= pSE.totalTime + pSE.startTime) {
					pSE.sprite.enlargeTo(pSE.targetS);
					SPRITE.displayTag = false;
					SPRITE.processingDisplayEvent = null;
				} else {
					var leftLoops = SPRITE.currentFPS * (pSE.totalTime + pSE.startTime - performance.now())/1000;
					if(leftLoops>=1) {
						pSE.sprite.enlarge((pSE.targetS-Math.sqrt(pSE.sprite.height*pSE.sprite.width))/leftLoops);
					}
				}
				break;
			case 'circle':
				if(performance.now() >= pSE.totalTime + pSE.startTime) {
					pSE.sprite.rotateTo(pSE.targetDegree);
					SPRITE.displayTag = false;
					SPRITE.processingDisplayEvent = null;
				} else {
					var leftLoops = SPRITE.currentFPS * (pSE.totalTime + pSE.startTime - performance.now())/1000;
					if(leftLoops>=1) {
						pSE.sprite.rotate((pSE.targetDegree - pSE.sprite.rotation*180/Math.PI)/leftLoops);
					}
				}
				break;
		}
	}
	
	if(!SPRITE.running) {
		if(SPRITE.successProcessingDisplayEvents.length) {
			for(var pSEindex = SPRITE.successProcessingDisplayEvents.length-1; pSEindex>=0; pSEindex--) {
				const pSE = SPRITE.successProcessingDisplayEvents[pSEindex];
				switch (pSE.displayType) {
					case 'slide':
						if(performance.now() >= pSE.totalTime + pSE.startTime) {
							pSE.sprite.moveTo(pSE.targetX, pSE.targetY);
							SPRITE.successProcessingDisplayEvents.splice(pSEindex, 1);
						} else {
							var leftLoops = SPRITE.currentFPS * (pSE.totalTime + pSE.startTime - performance.now())/1000;
							if(leftLoops>=1) {
								pSE.sprite.addX((pSE.targetX - pSE.sprite.x) / leftLoops);
								pSE.sprite.addY((pSE.targetY - pSE.sprite.y) / leftLoops);
							}
						}
						break;
					case 'expand':
						if(performance.now() >= pSE.totalTime + pSE.startTime) {
							pSE.sprite.enlargeTo(pSE.targetS);
							SPRITE.successProcessingDisplayEvents.splice(pSEindex, 1);
						} else {
							var leftLoops = SPRITE.currentFPS * (pSE.totalTime + pSE.startTime - performance.now())/1000;
							if(leftLoops>=1) {
								pSE.sprite.enlarge((pSE.targetS-Math.sqrt(pSE.sprite.height*pSE.sprite.width))/leftLoops);
							}
						}
						break;
					case 'circle':
						if(performance.now() >= pSE.totalTime + pSE.startTime) {
							pSE.sprite.rotateTo(pSE.targetDegree);
							SPRITE.successProcessingDisplayEvents.splice(pSEindex, 1);
						} else {
							var leftLoops = SPRITE.currentFPS * (pSE.totalTime + pSE.startTime - performance.now())/1000;
							if(leftLoops>=1) {
								pSE.sprite.rotate((pSE.targetDegree - pSE.sprite.rotation*180/Math.PI)/leftLoops);
							}
						}
						break;
				}
			}
		}
	}
}

SPRITE.ChangeWidth = (w)=>{
	const $canvas = $(SPRITE.renderer.view);
	const canvasWidth = $canvas.width();
	const canvasHeight = $canvas.height();
	$canvas.width(w);
	$canvas.height(w/canvasWidth*canvasHeight);
}

SPRITE.kill = ()=>{
	SPRITE.state = false;
	SPRITE.repeatPlay = new Function();
	for(i in SPRITE.keys){
		SPRITE.keys[i].unsubscribe();
		delete SPRITE.keys[i];
	}
	SPRITE.processingDisplayEvent = null;
	SPRITE.displayTag = false;
	SPRITE.running = false;
	SPRITE.ClearTimer();
}

SPRITE.runit = (container) => {
	const $container = $(container);
	$container.empty();
	// Keep the scale mode to nearest
	PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
	SPRITE.renderer = PIXI.autoDetectRenderer(SPRITE.canvasWidth, SPRITE.canvasHeight,{backgroundColor : 0x00FFFFFF});
	$container.append(SPRITE.renderer.view);
	// Create SPRITE.stage container
	// SPRITE.stage = new PIXI.Container();
	SPRITE.pointer = {x:0, y:0};
	SPRITE.stage.sortableChildren = true;
	SPRITE.stage.interactive = true;
	SPRITE.stage.on("mousemove", (event=PIXI.InteractionEvent) => {
		SPRITE.pointer.x = event.data.global.x;
		SPRITE.pointer.y = event.data.global.y;
	});
	SPRITE.lastFrameTime = 0;
	SPRITE.running = true;
	if (!SPRITE.lastFrameTime) {
		SPRITE.lastFrameTime = performance.now();
		SPRITE.lastSecond = performance.now();
	}
	SPRITE.animate(performance.now());
	SPRITE.repeatPlay = new Function();
	for(i in SPRITE.keys){
		SPRITE.keys[i].unsubscribe();
		delete SPRITE.keys[i];
	}
	if(SPRITE.backgroundSprite) SPRITE.backgroundSprite.RunningMouseDown = new Function();
	for(i in SPRITE.sprites) SPRITE.sprites[i].RunningMouseDown = new Function();
	for(i in SPRITE.texts) SPRITE.texts[i].RunningMouseDown = new Function();
	SPRITE.processingDisplayEvent = null;
	SPRITE.displayTag = false;
	SPRITE.ClearTimer();
	SPRITE.ChangeWidth($('body').width() / 2);
	SPRITE.state = true;
}