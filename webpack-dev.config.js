const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const commonConfig = require('./webpack.config.js');
const helpers = require('./webpack.helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

module.exports = webpackMerge(commonConfig, {
    output: {
        path: helpers.root('dev'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['awesome-typescript-loader', 'angular2-template-loader']
            }
        ]
    },

    plugins: [
        new CheckerPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        public: '127.0.0.1:8080',
        inline: true,
        watchContentBase: true,
        contentBase: helpers.root('src')
    }

});