const path = require("path");
const common = require("../../../webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
    resolve: {
        alias: {
            '@mixly/python': path.resolve(__dirname, '../python'),
            '@mixly/python-mixpy': path.resolve(__dirname, '../python_mixpy')
        },
        extensions: ['.ts', '.js'],
        fallback: {
            // for ocaml bundle
            constants: require.resolve('constants-browserify'),
            tty: require.resolve('tty-browserify'),
            vm: require.resolve('vm-browserify'),
            fs: false,
            child_process: false,
            // for sql bundle
            crypto: require.resolve('crypto-browserify'),
            path: require.resolve('path-browserify'),
            buffer: require.resolve('buffer/'),
            stream: require.resolve('stream-browserify'),
        }
    },
    module: {
        rules: [
            {
                resourceQuery: /asset-url/,
                type: 'asset/resource',
            }
        ]
    }
});