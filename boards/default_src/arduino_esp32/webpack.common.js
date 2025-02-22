const path = require("path");
const common = require("../../../webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
    resolve: {
        alias: {
            '@mixly/arduino': path.resolve(__dirname, '../arduino'),
            '@mixly/arduino-avr': path.resolve(__dirname, '../arduino_avr')
        }
    }
});