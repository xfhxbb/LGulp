module.exports = {
	entry: {
		index: ["../src/js/index.js"]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					compact: false,
					presets: ['@babel/preset-env'],
					plugins: ['@babel/plugin-proposal-object-rest-spread', "@babel/plugin-transform-runtime",
						"@babel/plugin-proposal-class-properties"]
				}
			}
		]
	},
	resolve: {
		extensions: [".js"]
	}
};