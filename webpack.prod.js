const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
            new HtmlWebpackPlugin({
                inject: false,
                template: path.resolve(process.cwd(), 'template.xml'),
                filename: 'index.xml',
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true,
                }
            })
        ]
    }
});
