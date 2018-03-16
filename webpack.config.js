var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        index: './public/js/index.js'
    },
    output: {
        path: path.resolve(process.cwd(), 'build/'),
        filename: '[name].js'
    },
    plugins:[
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
        // new ExtractTextPlugin('index.css')
    ],
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules)|(global\/lib\/)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader:'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /.(jpg|png|gif|svg|woff|eot|ttf|woff2)$/,
                loader: 'url-loader?limit=8192&name=./iamges/[name].[ext]'
            }
        ]
    },
    watchOptions: {
        poll: 1000,
        aggregeateTimeout: 500,
        ignored: /node_modules/
    }
}