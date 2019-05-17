const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin')
 
module.exports = {
	entry: {
        style: './src/style.tsx',
        app: './src/index.tsx',
    },
	output: {
        filename: "[name].bundle.js",
        chunkFilename: '[name].lazy.js',
	},
	devtool: "sourec-map",
	resolve: {
		extensions: [".ts",".tsx",".js"]
	},
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'flex-auto',
            template: './index.html',
        })
    ],
    module: {
        rules: [{
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {}
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                include: [
                    path.join(__dirname, 'src')
                ],
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.tsx?$/,
                // use: ['ts-loader'],
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                      before: [ tsImportPluginFactory( /** options */) ]
                    }),
                    compilerOptions: {
                      module: 'es2015'
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        inline: true,
        port: 8087
    },
};