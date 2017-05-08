const path = require('path');

const AsyncAwaitPlugin = require('webpack-async-await');

module.exports = {
    entry: path.resolve(__dirname, 'frontend/index.js'),
    output: {
        path: path.resolve(__dirname, 'html'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
        ],
    },
    plugins: [
        new AsyncAwaitPlugin({
            inAsyncFunction: true,
        }),
    ],
};
