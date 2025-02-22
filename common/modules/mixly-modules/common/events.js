goog.loadJs('common', () => {

goog.require('Mixly.IdGenerator');
goog.require('Mixly.MArray');
goog.require('Mixly.Registry');
goog.require('Mixly.Debug');
goog.provide('Mixly.Events');

const {
    IdGenerator,
    MArray,
    Registry,
    Debug
} = Mixly;

class Events {
    #events_ = new Registry();
    #eventsType_ = null;

    constructor(eventsType = []) {
        this.#eventsType_ = eventsType;
    }

    addType(eventsType) {
        this.#eventsType_ = MArray.unique([...this.#eventsType_, ...eventsType]);
    }

    exist(type) {
        if (!this.#eventsType_.includes(type)) {
            Debug.warn(`${type} event does not exist under the class`);
            return false;
        }
        return true;
    }

    bind(type, func) {
        if (!this.exist(type)) {
            return this;
        }
        const id = IdGenerator.generate();
        let typeEvent = this.#events_.getItem(type);
        if (!typeEvent) {
            typeEvent = new Registry();
            this.#events_.register(type, typeEvent);
        }
        typeEvent.register(id, func);
        return id;
    }

    unbind(id) {
        for (let [_, value] of this.#events_.getAllItems()) {
            let typeEvent = value;
            if (!typeEvent.getItem(id)) {
                continue;
            }
            typeEvent.unregister(id);
        }
        return this;
    }

    off(type) {
        if (this.#events_.getItem(type)) {
            this.#events_.unregister(type);
        }
        return this;
    }

    run(type, ...args) {
        let outputs = [];
        if (!this.exist(type)) {
            return outputs;
        }
        const eventsFunc = this.#events_.getItem(type);
        if (!eventsFunc) {
            return outputs;
        }
        for (let [_, func] of eventsFunc.getAllItems()) {
            outputs.push(func(...args));
        }
        return outputs;
    }

    reset() {
        this.#events_.reset();
    }

    length(type) {
        const typeEvent = this.#events_.getItem(type);
        if (typeEvent) {
            return typeEvent.length();
        }
        return 0;
    }
}

Mixly.Events = Events;

});