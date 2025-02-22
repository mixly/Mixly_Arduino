goog.loadJs('common', () => {

goog.require('store');
goog.require('Mixly.MArray');
goog.provide('Mixly.LocalStorage');

const { MArray, LocalStorage } = Mixly;

LocalStorage.PATH = {
    USER: 'mixly2.0/user',
    BOARD: 'mixly2.0/boards/{{d.boardType}}/user',
    THIRD_PARTY: 'mixly2.0/boards/{{d.boardType}}/third_party/{{d.thirdPartyName}}'
};

LocalStorage.set = function (path, value) {
    let { first, last, firstKey, lastKey } = this.find(path);
    if (!first) {
        return;
    }
    last[lastKey] = value;
    store.set(firstKey, first);
}

LocalStorage.get = function (path) {
    let { first, last, lastKey } = this.find(path);
    if (!first) {
        return undefined;
    }
    return last[lastKey];
}

LocalStorage.getItems = function (path) {
    let items = path.split('/');
    MArray.remove(items, '');
    return items;
}

LocalStorage.find = function (path) {
    let items = this.getItems(path);
    if (!items.length) {
        return {};
    }
    let rootObj = {};
    rootObj[items[0]] = store.get(items[0]);
    let last = rootObj;
    let value;
    for (let i = 0; i < items.length - 1; i++) {
        if (!(last[items[i]] instanceof Object)) {
            last[items[i]] = {};
        }
        last = last[items[i]];
    }
    let first = rootObj[items[0]];
    let firstKey = items[0];
    let lastKey = items[items.length - 1];
    return { first, last, firstKey, lastKey };
}

});