const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = merge(common, {
    mode: "development",
    devtool: 'source-map',
    plugins: [
        new ESLintPlugin({
            context: process.cwd(),
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: path.resolve(process.cwd(), 'template.xml'),
            filename: 'index.xml',
            minify: false
        })
    ],
    devServer: {
        https: true,
        port: 8080,
        host: '0.0.0.0',
        hot: false,
        static: {
            directory: path.join(process.cwd(), '../../../'),
            watch: false
        },
        devMiddleware: {
            index: false,
            publicPath: `/boards/default/${path.basename(process.cwd())}`,
            writeToDisk: true
        }
    }
});