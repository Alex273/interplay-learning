const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const IS_PRODUCTION = !IS_DEVELOPMENT;
const fileName = ext => IS_DEVELOPMENT ? `[name].${ext}` : `[name].[hash].${ext}`;

const optimize = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if (IS_PRODUCTION) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config;
};

const getCssLoaders = extraLoader => {
    let loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: './',
            },
        },
        'css-loader'
    ];
    if (extraLoader) {
        loaders.push(extraLoader);
    }

    return loaders;
};

const getBabelOptions = preset => {
    const options = {
        presets: [
            '@babel/preset-env',
        ],
        plugins: []
    };

    if (preset) {
        options.presets.push(preset);
    }

    return options;
};

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: getBabelOptions()
    }];

    if (IS_DEVELOPMENT) {
        loaders.push({
            loader: 'eslint-loader'
        })
    }

    return loaders;
};

const getPlugins = () => {
    const plugins = [
        new HTMLWebpackPlugin({
            template: './templates/index.html',
            minify: {
                collapseWhitespace: IS_PRODUCTION,
                removeComments: IS_PRODUCTION,
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/favicon.ico'),
                    to: path.resolve(__dirname, 'build')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: fileName('css'),
        })
    ];

    if (IS_PRODUCTION) {
        plugins.push(new BundleAnalyzerPlugin())
    }

    return plugins;
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.tsx'],
        analytics: './analytics.ts',
    },
    output: {
        filename: fileName('js'),
        path: path.resolve(__dirname, 'build'),
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.less', '.json', '.png', '.jpg', '.xml'],
        modules: ['node_modules'],
    },
    optimization: optimize(),
    devServer: {
        static: './build',
        host: '0.0.0.0',
        port: 4000,
        hot: IS_DEVELOPMENT,
        historyApiFallback: true,
    },
    devtool: IS_DEVELOPMENT ? 'source-map' : false,
    plugins: getPlugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: getCssLoaders(),
            },
            {
                test: /\.less$/,
                use: getCssLoaders('less-loader'),
            },
            {
                test: /\.s[ac]ss$/,
                use: getCssLoaders('sass-loader'),
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders(),
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: getBabelOptions('@babel/preset-typescript')
                    },
                ],
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: getBabelOptions('@babel/preset-react')
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    }
};