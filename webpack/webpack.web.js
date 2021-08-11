const {resolve} = require('path');
const webpack =require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// 将css提出去，而不是直接在页面来内嵌


module.exports = {
  mode: 'development',
  entry:{
    main:resolve('src/index.jsx')
  },
  target: 'web',
  output: {
    filename: '[name].js',
    path: resolve('dist/spa'),
    publicPath:'/'
  },
  module: {
    rules: [
      {
        test: /\.jsx|\.js$/, exclude: /node_modules/, use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: [ 
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': resolve('src'),
      '@server': resolve('src/server'),
      '@config': resolve('config.js')
    }
  },
  plugins:[
    new webpack.DefinePlugin({
      '__isBrowser__': true
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({template:'public/index.html'})
  ]
};