const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const ExtractCssPlugin = require('mini-css-extract-plugin')
const ExtractRootCss = new ExtractCssPlugin({ filename: 'styles/root.css', allChunks: false })
const ExtractVueCss = new ExtractCssPlugin({ filename: 'styles/[name]/style.css', allChunks: true })

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    ExtractCssPlugin.loader,
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    ExtractCssPlugin.loader,
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]?[]hash'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'css': [
                            ExtractCssPlugin.loader,
                            'vue-style-loader',
                            'css-loader'
                        ],
                        'less': [
                            ExtractCssPlugin.loader,
                            'vue-style-loader',
                            'css-loader',
                            'less-loader'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'test pdf',
            template: path.resolve(__dirname, '../index.html')
        }),
        ExtractRootCss,
        ExtractVueCss
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src')
        }
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    
}