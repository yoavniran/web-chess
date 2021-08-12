// const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
	mode: isDevelopment ? "development" : "production",
	entry: {
		app: "./demo/index.js",
	},
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "web-chess.js",
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
				options: {
					plugins: isDevelopment ? [require.resolve("react-refresh/babel")] : [],
				},
			},
		}],
	},
	devServer: {
		hotOnly: true,
		hot: true, // Looks redundant, but required!
		contentBase: path.join(__dirname, "dist"),
	},
	devtool: isDevelopment ? "eval-cheap-module-source-map" : "source-map",
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					filename: "[name]-bundle.js",
					chunks: "all",
					minSize: 0,
				},
			},
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./demo/index.html",
		}),
		isDevelopment && new ReactRefreshWebpackPlugin(),
	].filter(Boolean),
	resolve: {
		modules: ["node_modules", path.resolve("./src")],
	},
};

// 	entry: ["regenerator-runtime/runtime", "./src/client/index.js"],

// 		rules: [
// 			{
// 				test: /\.(js|jsx)$/,
// 				exclude: /nodeModules/,
// 				use: {
// 					loader: "babel-loader",
// 				},
// 			},
// 			{
// 				test: /\.css$/i,
// 				use: [MiniCssExtractPlugin.loader, "css-loader"],
// 			},
// 			{
// 				test: /\.(woff|woff2|eot|ttf|svg)$/,
// 				use: {
// 					loader: "url-loader",
// 				},
// 			},
// 		],
// 	},

// 		new MiniCssExtractPlugin(),
// 		new webpack.DefinePlugin({
// 			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
// 		}),
// 	],
// };

// 	resolve: {
// 		modules: ["node_modules", path.resolve("./src/client")],
// 		alias: {
// 			//in DEV use client-side React only and in Production use SSR
// 			root: path.resolve(__dirname, "src/client/root.browser/")
// 			// isDevelopment && !forceSSR ?
// 			// path.resolve(__dirname, "src/client/root.browser/") :
// 			// path.resolve(__dirname, "src/client/root.server/")
// 		}
// 	},
