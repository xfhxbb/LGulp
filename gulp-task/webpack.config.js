import path from 'path';
import env from './env';

module.exports = {
    mode: `development`,
    entry: {
        index: [`${path.resolve(__dirname, '../')}/src/js/index.js`]
    },
    output: {
        path: `${path.resolve(__dirname, '../')}/dev/js`,
        filename: 'js/[name].js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            loader: `babel-loader`,
            exclude: /(node_modules)/
        }]
    },
    plugins:[],
    optimization: {
        minimize: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    }
};