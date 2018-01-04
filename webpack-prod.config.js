const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const commonConfig = require('./webpack.config.js');
const helpers = require('./webpack.helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    output: {
        path: helpers.root('prod'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                use: '@ngtools/webpack'
            }
        ]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        }),
        new AngularCompilerPlugin({
            tsConfigPath: helpers.root('tsconfig.json'),
            entryModule: helpers.root('src/app-container.module#AppContainerModule')
        })
    ]
});