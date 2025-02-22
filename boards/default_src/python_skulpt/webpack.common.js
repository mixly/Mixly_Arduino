const path = require("path");
const common = require("../../../webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
    resolve: {
        alias: {
            '@mixly/python': path.resolve(__dirname, '../python'),
            '@mixly/python-mixpy': path.resolve(__dirname, '../python_mixpy')
        }
    },
    externals: {
        'sk': 'Sk'
    },
    module: {
        rules: [
            {
                test: /\.py$/,
                type: "asset/source",
            }
        ]
    }
});