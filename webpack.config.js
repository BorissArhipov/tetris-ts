const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
module.exports = (env = {}) => {

    return {
        mode: 'development',
        entry: './src/components/app/app.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,            
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ],
                    exclude: '/node_modules/'
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: 'css-loader'}
                    ]
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(s[ca]ss)$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: 'css-loader'},
                        { loader: 'sass-loader'}
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif|ico)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images',
                                name: '[name]-[sha1:hash:7].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.(ttf|otf|eot|woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'fonts',
                                name: '[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'index.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'main-[hash:8].css'
            })
        ],

        devServer: {
            open: true
        }
    }
};