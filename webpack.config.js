"use strict";
var path = require('path');
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var WebpackChunkHash = require('webpack-chunk-hash');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');


const env = require('yargs').argv.env;

console.log(env);


var minimizeCSS = false;
var plugins = [];
var devtool = 'sourcemap';

plugins.push(new WebpackCleanupPlugin({
    exclude: ["fonts/**/*", "css/**/*", "js/**/*"],
    quiet: true,
  }));

if (env && env.production === true) {
    plugins.push(new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
            mangle: {
                keep_fnames: true
            }
        }
    }));

    plugins.push(new CompressionPlugin({ 
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.5
      }));
    minimizeCSS = true;
    devtool = 'cheap-module-source-map';
} else {
    plugins.push(new BundleAnalyzerPlugin());
}

plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
plugins.push(new ProgressBarPlugin());
plugins.push(new ExtractTextPlugin('app.[hash].css'));
plugins.push(new OptimizeCssAssetsPlugin());

plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'anteros',
    chunks: ['app','anteros'],
    filename: '[name].[hash].js',
    minChunks: Infinity
}));

plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'anteros-core',
    chunks: ['app','anteros','anteros-core'],
    filename: '[name].[hash].js',
    minChunks: Infinity
}));

plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    chunks: ['app','vendor','anteros','anteros-core'],
    filename: '[name].[hash].js',
    minChunks: Infinity
}));

plugins.push(new webpack.optimize.CommonsChunkPlugin({ name: 'manifest', minChunks: Infinity }));

plugins.push(new webpack.HashedModuleIdsPlugin());
plugins.push(new WebpackChunkHash());

plugins.push(new HtmlWebpackPlugin({
    title: 'Anteros Admin React',
    filename: 'index.html',
    chunks: ['vendor','anteros-core','anteros','manifest','app'],
    chunksSortMode:  (c1, c2) => {
        console.log(c1.names[0]);
        console.log(c2.names[0]);
        // Corrige bug da ordenação de assets.
        let orders = ['manifest','vendor','anteros-core','anteros','app'];
        let o1 = orders.indexOf(c1.names[0]);
        let o2 = orders.indexOf(c2.names[0]);
        return o1 - o2;
    },
    template: './template.html'
}));

plugins.push(new webpack.DefinePlugin({
    "process.env": { 
       NODE_ENV: JSON.stringify("production") 
     }
  }));

module.exports = {
    entry: {
        'app':'./src/app/main.jsx',
        'anteros-core':['anteros-react-core','anteros-react-datasource','anteros-react-label','anteros-react-buttons',
                   'anteros-react-containers','anteros-react-menu','anteros-react-image','anteros-react-editors'],
        'anteros':['anteros-react-dashboard','anteros-react-layout','anteros-react-list','anteros-react-maps',
                   'anteros-react-misc','anteros-react-navigation','anteros-react-pivottable','anteros-react-querybuilder',
                   'anteros-react-security','anteros-react-table', 'anteros-react-masonry'],
        'vendor':['react','react-dom','pdfjs-dist','react-pdf-js', 'axios','moment','chart.js','react-chartjs-2','react-redux','lodash',
                  'react-router','history','react-router-dom','prop-types','redux-logger','redux-promise-middleware','redux-devtools-extension','redux-thunk']
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        inline: true,
        host: '0.0.0.0',
        contentBase: './public',
        port: 8080,
        historyApiFallback: true
    },
    devtool: devtool,
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
                presets: ['es2015','es2017', 'react'],
                plugins: ['transform-object-rest-spread', "transform-runtime"]
            }
        }, {
            test: /\.woff($|\?)|\.woff2($|\?)|\.gif($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
            loader: 'url-loader',
        },
        { test: /\.(png|jpg)$/, loader: 'url-loader?name=images/[name].[ext]' },
        {
            test: /\.s[ac]ss$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'sass-loader'],
                fallback: 'style-loader'
            })
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback: 'style-loader'
            })
        }]
    }
};
