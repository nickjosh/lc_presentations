const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');
const config = require('./webpack.conf');

const server = new WebpackDevServer(webpack(config), {
    // webpack-dev-server options
    contentBase: path.join(__dirname, 'build'),
    quiet: false,
    noInfo: false,
    publicPath: '/',
    stats: { colors: true }
});

server.listen(8081, "localhost", function() {});
