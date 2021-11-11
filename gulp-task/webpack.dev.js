const { merge } = require('webpack-merge');
const common = require('./webpack.common');
module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		publicPath: "",
		path: `${__dirname}/../dev/js/`,
		filename: "[name].js"
	},
	plugins: [
	]
});