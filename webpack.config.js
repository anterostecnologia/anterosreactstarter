"use strict";
var path = require('path');
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const env = require('yargs').argv.env;


var minimizeCSS = false;
var plugins = [];

if (env === 'build') {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    minimizeCSS = true;
}

plugins.push(new ExtractTextPlugin('app.css'));
plugins.push(new OptimizeCssAssetsPlugin());
plugins.push(new webpack.LoaderOptionsPlugin({
    debug: true
}));


module.exports = {
    entry: './src/app/main.jsx',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        host: '0.0.0.0',
        contentBase: './public',
        port: 8080,
        historyApiFallback: true
    },
    devtool: 'sourcemap',


    plugins: plugins,
    resolve: {
        modules: [
            "node_modules",
        ],
        extensions: [".js", ".jsx"],
    },


    module: {

        loaders: [{
            test: /.js[x]?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'es2017', 'react'],
                plugins: ['transform-object-rest-spread']
            }
        }, {
            test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
            loader: 'url-loader',
        },
        { test: /\.(png|jpg)$/, loader: 'url-loader?name=images/[name].[ext]' },
        {
            test: /\.s[ac]ss$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'sass-loader'],
                fallback: 'style-loader',
            })
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                loader: "css-loader",
                fallback: 'style-loader'
            })
        }]
    }
};