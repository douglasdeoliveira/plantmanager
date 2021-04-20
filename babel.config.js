// eslint-disable-next-line no-undef
module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					root: ['./src'],
					extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
					alias: {
						'@assets': './src/assets',
						'@components': './src/components',
						'@styles': './src/styles',
					},
				},
			],
		],
	};
};
