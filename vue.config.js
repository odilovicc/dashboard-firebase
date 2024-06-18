const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
    configureWebpack: {
        plugins: [
            new DotenvWebpackPlugin()
        ],
        resolve: {
            fallback: {
                path: require.resolve("path-browserify"),
                os: require.resolve("os-browserify/browser"),
                crypto: require.resolve("crypto-browserify")
            }
        }
    }
};
