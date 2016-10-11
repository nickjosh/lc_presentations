const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

function getPresentations() {
    const dirs = fs.readdirSync(__dirname)
        .filter(x => fs.lstatSync(x).isDirectory() && /\d+_\S+$/.test(x));
    const presentationPaths = dirs.map(x => `${x}/index.pug`).filter(x => fs.existsSync(x));
    return presentationPaths.map(x => x.slice(0, x.indexOf('/')));
}

fs.writeFileSync('presentations.json', JSON.stringify(getPresentations()));

module.exports = {
    devtool: 'source-map',
    entry: {
        index: './index.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'LC101 Java',
            template: 'index.pug',
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    ],
    module: {
        loaders: [
            { test: /\.pug$/, loader: 'pug' },
            { test: /\.scss$/, loaders: ['style', 'css', 'sass-loader'] },
            { test: /\.css$/, loaders: ['style', 'css'] },
            { test: /\.html$/, loader: 'html' },
            {
                test: /\.(png|svg|gif|jpg)$/,
                loader: 'url-loader',
                query: { limit: 1024 },
            },
            { 
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                }
            },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            { test: /\.json$/, loader: 'json-loader' },
        ],
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
};
