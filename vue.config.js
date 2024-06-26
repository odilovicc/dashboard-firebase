const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
    configureWebpack: {
        plugins: [
            new DotenvWebpackPlugin()
        ],
    }
};
