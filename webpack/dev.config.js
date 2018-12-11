// Configure environment
require('dotenv').config();

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');

//
// === Constants ===
//

const ROOT_DIR = path.resolve(__dirname, '..');
const ENTRYPOINT_DIR = path.resolve(ROOT_DIR, 'src', 'entrypoints');
const DIST_DIR = path.resolve(ROOT_DIR, 'web', 'dist');

//
// === Get entrypoints from folder ===
//

const entrypointFileNames = fs.readdirSync(ENTRYPOINT_DIR).filter(file => {
	return file.match(/.*\.js$/);
});

const entrypoints = entrypointFileNames.map(fileName => {
	return path.resolve(ENTRYPOINT_DIR, fileName);
});

//
// === Sass Loader Options ===
//

const postCSSOptions = {
	plugins: () => [
		autoprefixer({
			browsers: [
				'>1%',
				'last 4 versions',
				'not ie < 9'
			]
		})
	]
};

const sassLoaderOptions = {
	includePaths: [
		path.resolve(ROOT_DIR, 'node_modules'),
	]
};

const sassLoader = {
	test: /\.scss$/,
	use: [
		'style-loader',
		'css-loader',
		{
			loader: 'postcss-loader',
			options: postCSSOptions
		},
		{
			loader: 'sass-loader',
			options: sassLoaderOptions
		}
	],
	include: path.resolve(ROOT_DIR, 'src')
};

//
// === JS Loaders ===
//

const eslintLoader = {
	test: /\.jsx?$/,
	loader: 'eslint-loader',
	enforce: 'pre',
	exclude: path.resolve(ROOT_DIR, 'node_modules')
};

const jsxLoader = {
	test: /\.jsx?$/,
	loader: 'babel-loader',
	include: path.resolve(ROOT_DIR, 'src')
};

//
// === Fonts ===
//

const fontLoader = {
	test: /\.(woff(2)?|ttf|otf|eot)$/,
	loader: 'file-loader',
};

//
// === Config ===
//

module.exports = {
	entry: entrypoints,
	mode: 'development',
	output: {
		path: DIST_DIR,
		publicPath: `${process.env.ASSET_HOST}/dist/`,
		filename: '[name].js',
		chunkFilename: '[name].[chunkhash].js'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	module: {
		rules: [
			eslintLoader,
			jsxLoader,
			sassLoader,
			fontLoader,
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		hot: true,
		contentBase: './web',
		allowedHosts: [
			'fintech.local'
		],
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	}
};