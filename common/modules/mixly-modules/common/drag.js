goog.loadJs('common', () => {

goog.require('Mixly.Config');
goog.require('Mixly.Events');
goog.provide('Mixly.Drag');
goog.provide('Mixly.DragH');
goog.provide('Mixly.DragV');

const { Config, Events } = Mixly;

const { BOARD } = Config;

class Drag {
    static {
        this.DEFAULT_CONFIG = {
            type: 'h',  // 'h' - 水平拖拽，'v' - 垂直拖拽
            min: '100px',  // 元素由于拖拽产生尺寸改变时可以减小到的最小值,
            full: [true, true],  // 允许元素拖拽直至占满整个容器
            startSize: '100%',
            startExitFullSize: '30%'
        };

        this.Extend = {
            POSITIVE: 1,  // 左或上
            NEGATIVE: 2,  // 右或下
            BOTH: 3  // 左+右或上+下
        };
    }

    #events_ = null;

    constructor(element, config) {
        this.config = { ...Drag.DEFAULT_CONFIG, ...config };
        this.$container = $(element);
        const $children = this.$container.children();
        this.$first = $($children[0]);
        this.$last = $($children[1]);
        this.config.elem = [ this.$first, this.$last ];
        this.$dragElem = $('<div class="drag-elem"></div>');
        this.$dragElemShadow = $('<div class="drag-elem-shadow"></div>');
        const dragType = this.config.type === 'h'? 's' : 'w';
        this.$container.addClass(`drag-${dragType}-container`);
        this.shown = Drag.Extend.POSITIVE;
        let dragCssType;
        if (this.config.type === 'h') {
            this.$dragElem.addClass('drag-s-elem horizontal-line');
            dragCssType = 'top';
        } else {
            this.$dragElem.addClass('drag-w-elem vertical-line');
            dragCssType = 'left';
        }
        let size = parseFloat(this.config.startSize);
        if (size >= 100) {
            this.$dragElem.css(dragCssType, 'calc(100% - 4px)');
            size = 100;
            this.shown = Drag.Extend.POSITIVE;
        } else if (size > 0) {
            this.$dragElem.css(dragCssType, `calc(${size}% - 2px)`);
            this.shown = Drag.Extend.BOTH;
        } else {
            this.$dragElem.css(dragCssType, '0px');
            size = 0;
            this.shown = Drag.Extend.NEGATIVE;
        }
        this.$container.prepend(this.$dragElem);
        this.$container.prepend(this.$dragElemShadow);
        this.size = [`${size}%`, `${100 - size}%`];
        if (size >=100 || size <=0) {
            const startExitFullSize = parseFloat(this.config.startExitFullSize);
            this.prevSize = [`${startExitFullSize}%`, `${100 - startExitFullSize}%`];
        } else {
            this.prevSize = this.size;
        }
        this.firstDisplay = this.$first.css('display');
        this.lastDisplay = this.$last.css('display');
        if (!this.firstDisplay || this.firstDisplay === 'none') {
            this.firstDisplay = 'unset';
        }
        if (!this.lastDisplay || this.lastDisplay === 'none') {
            this.lastDisplay = 'unset';
        }
        this.#events_ = new Events(['ondragStart', 'ondragEnd', 'onfull', 'exitfull', 'sizeChanged']);
        this.#addEventListener_();
    }

    #addEventListener_() {
        const dragElem = this.$dragElem[0];
        const container = this.$container[0];
        const { type, min, elem, full } = this.config;
        dragElem.onmousedown = (elemEvent) => {
            this.$dragElemShadow.addClass('active');
            let dis, prev;
            if (type === 'h') {
                dis = elemEvent.clientY;
                dragElem.top = dragElem.offsetTop;
                $('body').addClass('drag-s-resize');
            } else {
                dis = elemEvent.clientX;
                dragElem.left = dragElem.offsetLeft;
                $('body').addClass('drag-w-resize');
            }
            const prevSize = this.size;

            document.onmousemove = (docEvent) => {
                this.runEvent('ondragStart');
                let iT, maxT, minT = parseInt(min), movement;
                if (type === 'h') {
                    iT = dragElem.top + (docEvent.clientY - dis);
                    maxT = container.clientHeight - minT;
                    movement = docEvent.movementY;
                } else {
                    iT = dragElem.left + (docEvent.clientX - dis);
                    maxT = container.clientWidth - minT;
                    movement = docEvent.movementX;
                }
                iT += 1;
                if (prev === iT) {
                    return false;
                }
                prev = iT;
                if (full[0] && movement < 0 && iT < minT * 0.4) { // 向上移动或向左移动
                    this.changeTo('0%');
                    this.runEvent('onfull', Drag.Extend.NEGATIVE);
                } else if (full[1] && movement > 0 && iT > (maxT + minT * 0.6)) { // 向下移动或向右移动
                    this.changeTo('100%');
                    this.runEvent('onfull', Drag.Extend.POSITIVE);
                } else if (iT < maxT && iT > minT) { // 在minT和maxT间移动
                    let shown = this.shown;
                    this.changeTo(iT);
                    if (shown !== Drag.Extend.BOTH) {
                        this.runEvent('exitfull', shown);
                    }
                }
                this.runEvent('ondragEnd');
                return false;
            };
            document.onmouseup = () => {
                this.$dragElemShadow.removeClass('active');
                if (type === 'h') {
                    $('body').removeClass('drag-s-resize');
                } else {
                    $('body').removeClass('drag-w-resize');
                }
                this.prevSize = prevSize;
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }

    changeTo(part) {
        const { type, elem } = this.config;
        const elemCssType = type === 'h'? 'height' : 'width';
        const dragCssType = type === 'h'? 'top' : 'left';
        let elem1Size, elem2Size, precent;
        if (typeof part === 'string' && part.indexOf('%') !== -1) {
            precent = parseFloat(part);
        } else {
            let all;
            if (type === 'h') {
                all = this.$container.height();
            } else {
                all = this.$container.width();
            }
            precent = 100 * parseFloat(part) / all;
        }
        elem1Size = `${precent}%`;
        elem2Size = `${(100 - precent)}%`;
        if (this.size[0] === elem1Size && this.size[1] === elem2Size) {
            return;
        }
        this.prevSize = this.size;
        this.size = [elem1Size, elem2Size];
        if (!precent) {
            this.$dragElem.css(dragCssType, '0px');
            this.shown = Drag.Extend.NEGATIVE;
            this.$first.css('display', 'none');
            this.$last.css('display', this.lastDisplay);
        } else if (precent >= 100) {
            this.$dragElem.css(dragCssType, 'calc(100% - 4px)');
            this.shown = Drag.Extend.POSITIVE;
            this.$first.css('display', this.firstDisplay);
            this.$last.css('display', 'none');
        } else {
            this.$dragElem.css(dragCssType, `calc(${elem1Size} - 2px)`);
            this.shown = Drag.Extend.BOTH;
            this.$first.css('display', this.firstDisplay);
            this.$last.css('display', this.lastDisplay);
        }
        elem[0].css(elemCssType, elem1Size);
        elem[1].css(elemCssType, elem2Size);
        this.runEvent('sizeChanged');
    }

    full(type) {
        if ([this.shown, Drag.Extend.BOTH].includes(type)) {
            return;
        }
        if (this.shown !== Drag.Extend.BOTH) {
            this.runEvent('exitfull', this.shown);
        }
        switch(type) {
        case Drag.Extend.NEGATIVE:
            this.changeTo('0%');
            break;
        case Drag.Extend.POSITIVE:
            this.changeTo('100%');
        }
        this.runEvent('onfull', type);
    }

    exitfull() {
        if (this.shown === Drag.Extend.BOTH) {
            return;
        }
        let prevSize = this.prevSize[0];
        if (prevSize === '100%') {
            prevSize = '70%';
        } else if (prevSize === '0%') {
            prevSize = '30%';
        }
        let shown = this.shown;
        this.changeTo(prevSize);
        this.runEvent('exitfull', shown);
    }

    show(type) {
        if ([Drag.Extend.BOTH, type].includes(this.shown)) {
            return;
        }
        this.exitfull();
    }

    hide(type) {
        switch (type) {
        case Drag.Extend.NEGATIVE:
            this.full(Drag.Extend.POSITIVE);
            break;
        case Drag.Extend.POSITIVE:
            this.full(Drag.Extend.NEGATIVE);
            break;
        }
    }

    dispose() {
        this.resetEvent();
        this.$dragElem[0].onmousedown = null;
        this.$dragElem.remove();
        this.$dragElemShadow.remove();
    }

    bind(type, func) {
        return this.#events_.bind(type, func);
    }

    unbind(id) {
        this.#events_.unbind(id);
    }

    addEventsType(eventsType) {
        this.#events_.addType(eventsType);
    }

    runEvent(eventsType, ...args) {
        this.#events_.run(eventsType, ...args);
    }

    offEvent(eventsType) {
        this.#events_.off(eventsType);
    }

    resetEvent() {
        this.#events_.reset();
    }
}

class DragH extends Drag {
    constructor(elem, config) {
        super(elem, {
            ...config,
            type: 'h'
        });
    }
}

class DragV extends Drag {
    constructor(elem, config) {
        super(elem, {
            ...config,
            type: 'v'
        });
    }
}

Mixly.DragH = DragH;
Mixly.DragV = DragV;
Mixly.Drag = Drag;

});