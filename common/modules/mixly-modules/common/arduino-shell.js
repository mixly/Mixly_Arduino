goog.loadJs('common', () => {

goog.provide('Mixly.ArduShell');

class ArduShell {
    #arduinoCLI_ = null;
    constructor(arduinoCLI) {
        this.#arduinoCLI_ = arduinoCLI;
    }

    async upload(name, params) {}

    async compile(name, params) {}

    async checkBoardVersion() {}
}

Mixly.ArduShell = ArduShell;

});