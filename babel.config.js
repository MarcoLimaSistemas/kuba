module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['module:metro-react-native-babel-preset'],
		plugins: [
			['react-native-reanimated/plugin'],
			[
				'module-resolver',
				{
					extensions: [
						'.js',
						'.jsx',
						'.ts',
						'.tsx',
						'.android.js',
						'.android.tsx',
						'.ios.js',
						'.ios.tsx',
						'.json'
					],
					alias: {
						'@assets': './src/assets',
						'@components': './src/components',
						'@hooks': './src/hooks',
						'@screens': './src/screens',
						'@schemas': './src/schemas',
						'@models': './src/models',
						'@services': './src/services'
					}
				}
			]
		]
	};
};
