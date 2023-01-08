const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
    mode: 'development',
    watchOptions: {
        aggregateTimeout: 200,
        ignored: /node_modules/
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
        alias: {
            'frontend': path.resolve(__dirname, 'frontend'),
        }
    },
    entry: path.resolve(__dirname, 'frontend', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },{
            test: /\.(less)$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'less-loader'
            }]
        },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [],
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            automaticNameDelimiter: '~',
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        namedModules: true,
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                }
            }),
        ],
    }
};