const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const TerserPlugin = require("terser-webpack-plugin");
module.exports = merge(common, {
	mode: 'production',
	output: {
		publicPath: "",
		path: `${__dirname}/../public/js/`,
		filename: "[name].js"
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false,
			}),
		],
	},
	plugins: [
	]
});