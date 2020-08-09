const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './index.js',
        game: './game.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[hash].[name].js'
    },
    module: {
        rules: [
            {
              test: /\.html$/,
              use: ['html-loader']
            },
            {
                test: /\.sass$/,
                use: ['style-loader', 'css-loader', 'sass-loader',]
            },
            {
                test: /\.(jpg|ico)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            favicon: "./assets/favicon.ico"
        }),
        new CleanWebpackPlugin()
    ]

}