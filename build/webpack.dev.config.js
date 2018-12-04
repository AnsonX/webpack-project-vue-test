if (process.env.NODE_ENV === 'development') {
    const path = require('path')
    const webpack = require('webpack')
    const merge = require('webpack-merge')
    const baseConfig = require('./webpack.base.config')
    
    const webpackConfig = merge(baseConfig, {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"development"'
                }
            }),
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer: {
            contentBase: path.resolve(__dirname, '../dist')
        },
        devtool: '#eval-source-map'
    })

    module.exports = webpackConfig
}
