goog.loadJs('common', () => {

goog.require('Mixly.Events');
goog.require('Mixly.IdGenerator');
goog.provide('Mixly.Component');

const {
    Events,
    IdGenerator
} = Mixly;


class Component {
    #$content_ = null;
    #mounted_ = false;
    #disposed_ = false;
    #events_ = new Events(['destroyed', 'created']);
    #id_ = IdGenerator.generate();

    constructor() {}

    mountOn($container) {
        $container.append(this.getContent());
        this.onMounted();
    }

    onMounted() {
        this.#mounted_ = true;
    }

    onUnmounted() {
        this.#mounted_ = false;
    }

    isMounted() {
        return this.#mounted_;
    }

    isDisposed() {
        return this.#disposed_;
    }

    setContent($elem) {
        if (this.#$content_) {
            this.#$content_.replaceWith($elem);
        }
        this.#$content_ = $elem;
        $elem.attr('page-id', this.#id_);
    }

    getContent() {
        return this.#$content_;
    }

    resize() {}

    getId() {
        return this.#id_;
    }

    setId(id) {
        this.#id_ = id;
    }

    dispose() {
        this.runEvent('destroyed');
        this.#$content_.remove();
        this.resetEvent();
        this.#disposed_ = true;
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
        return this.#events_.run(eventsType, ...args);
    }

    offEvent(eventsType) {
        this.#events_.off(eventsType);
    }

    resetEvent() {
        this.#events_.reset();
    }
}

Mixly.Component = Component;

});