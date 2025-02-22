const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const ORI_DIR = process.cwd();
const DEST_DIR = path.resolve(ORI_DIR, '../../default', path.basename(ORI_DIR));

module.exports = {
    cache: false,
    entry: path.resolve(ORI_DIR, 'index.js'),
    output: {
        filename: "[name].bundle.js",
        path: DEST_DIR,
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                type: "asset/source",
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 64 * 1024,
                    },
                },
                generator: {
                    filename: "images/[name]_[hash:8][ext]",
                },
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "styles/[name].[contenthash:8].css" }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(ORI_DIR, 'origin'),
                    to: DEST_DIR,
                    noErrorOnMissing: true
                }
            ],
        }),
    ],
    externals: {
        'blockly/core': 'Blockly',
        'mixly': 'Mixly',
        'layui': 'layui',
        'path': 'path',
        'xscrollbar': 'XScrollbar',
        'jquery': '$',
        'ace': 'ace',
        'goog': 'goog'
    }
};
