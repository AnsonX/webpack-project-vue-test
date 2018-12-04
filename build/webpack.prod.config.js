if (process.env.NODE_ENV === 'production') {
    const path = require('path')
    const webpack = require('webpack')
    const merge = require('webpack-merge')
    const baseConfig = require('./webpack.base.config')
    const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
    
    const webpackConfig = merge(baseConfig, {

        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            new UglifyWebpackPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false
                    }
                },
                sourceMap: true
            })
        ],

    })

    module.exports = webpackConfig
}


