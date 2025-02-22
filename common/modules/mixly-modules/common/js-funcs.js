goog.provide('Mixly.JSFuncs');
goog.require('Mixly.Config');

Mixly.JSFuncs.getPlatform = function () {
    return Mixly.Config.BOARD.boardType;
};