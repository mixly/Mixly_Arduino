goog.loadJs('common', () => {

goog.provide('Mixly.Ampy');

class Ampy {
    constructor() {}

    unhexlify(hexString) {
        if (hexString.length % 2 !== 0) {
            hexString = hexString + '0';
        }
        let bytes = [];
        for (let c = 0; c < hexString.length; c += 2) {
            bytes.push(parseInt(hexString.substr(c, 2), 16));
        }
        return new Uint8Array(bytes);
    }

    async get() {}
    async ls() {}
    async mkdir() {}
    async put() {}
    async reset() {}
    async rm() {}
    async rmdir() {}
    async run() {}
}

Mixly.Ampy = Ampy;

});