const webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    webpack: {
        mode: 'production',
        optimization: {
            minimizer:[new TerserPlugin({})],
        },
        configure: {
            resolve: {
                fallback: {
                    process: require.resolve("process/browser"),
                    zlib: require.resolve("browserify-zlib"),
                    stream: require.resolve("stream-browserify"),
                    util: require.resolve("util"),
                    buffer: require.resolve("buffer"),
                    asset: require.resolve("assert"),
                },
            },
            plugins: [
                new webpack.ProvidePlugin({
                    Buffer: ["buffer", "Buffer"],
                    process: "process/browser",
                })
            ]
        }
    },
    devServer: {
        proxy: {
            // '/':"http://localhost:5000",
            // '/api/v1/': 'http://localhost:5000',
            '/api/v2/': 'http://localhost:5001'
        }
    },
};