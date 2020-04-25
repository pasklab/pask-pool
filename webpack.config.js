const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var SaveHashes = require('assets-webpack-plugin');

module.exports = (env, args) => {

	const devMode = args.mode !== 'production';

	return {
		entry: {
			app: './assets/entry/app.js'
		},
		output: {
			filename: devMode ? '[name].[contenthash].js' : '[contenthash].js',
				path: path.resolve(__dirname, 'public/dist/'),
				publicPath: "/dist/"
		},
		devtool: devMode ? 'source-map' : false,
		optimization: {
			minimize: true,
				minimizer: [
				new TerserJSPlugin({
					cache: true
				}),
				new OptimizeCSSAssetsPlugin({})
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: devMode ? '[name].[contenthash].css' : '[contenthash].css',
				chunkFilename: '[id].[contenthash].css'
			}),
			new CleanWebpackPlugin({
				cleanStaleWebpackAssets: false // Avoid that CleanWebpack removed image when rebuilding css assets
			}),
			new SaveHashes({
				path: path.join(__dirname, './'),
				prettyPrint: true,
				update: true,
				entrypoints: true
			})
		],
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader'
					}
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						'style-loader',
						MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'sass-loader',
							options: {
								implementation: require('sass'),
								sassOptions: {
									fiber: false
								}
							},
						}
					],
				},
				{
					test: /\.css$/,
					use: [
						'style-loader',
						MiniCssExtractPlugin.loader,
						'css-loader',
					]
				},
				{
					test: /\.(png|svg|jpe?g|gif)$/,
					use: [
						'file-loader'
					]
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					use: [
						'file-loader',
					]
				},
			]
		}
	}
};