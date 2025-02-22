goog.loadJs('common', () => {

goog.require('ifvisible');
goog.require('Mixly.Events');
goog.provide('Mixly.IfVisible');

const { Events, IfVisible } = Mixly;

IfVisible.events = new Events(['blur', 'focus', 'idle', 'wakeup']);

IfVisible.init = function () {
    ifvisible.on('blur', () => this.runEvent('blur'));
    ifvisible.on('focus', () => this.runEvent('focus'));
    ifvisible.on('idle', () => this.runEvent('idle'));
    ifvisible.on('wakeup', () => this.runEvent('wakeup'));
}

IfVisible.bind = function (type, func) {
    return this.events.bind(type, func);
}

IfVisible.unbind = function (id) {
    this.events.unbind(id);
}

IfVisible.addEventsType = function (eventsType) {
    this.events.addType(eventsType);
}

IfVisible.runEvent = function (eventsType, ...args) {
    return this.events.run(eventsType, ...args);
}

IfVisible.offEvent = function (eventsType) {
    this.events.off(eventsType);
}

IfVisible.resetEvent = function () {
    this.events.reset();
}

IfVisible.init();

});