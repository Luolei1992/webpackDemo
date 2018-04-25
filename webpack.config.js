const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const postcssOpts = {
    ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
    plugins: () => [
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
        }),
        // pxtorem({ rootValue: 75, propBlackList: [] })
    ]
};
module.exports = {
    mode:"none",
    devtool: 'eval-source-map',
    entry: {bundle:__dirname + "/app/main.js"},
    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
    },
    devServer:{
        contentBase: path.join(__dirname, ""),
        historyApiFallback:true,
        port:2000,
        inline:true,
        hot: true
    },
    module:{
        rules:[
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/i, use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {loader: 'postcss-loader', options: postcssOpts}
                    ]
                })
            },
            {test: /\.(jpg|png)$/, loader: "url-loader?limit=8192&name=images/[hash:8].[name].[ext]"},
            { test: /\.(gif|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=20000&name=/fonts/[name].[ext]'},
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        }),
         new ExtractTextPlugin("styles.css"),
        new webpack.HotModuleReplacementPlugin()
    ],
}