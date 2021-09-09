const {resolve} = require('path');
const webpack =require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');// 将css提出去，而不是直接在页面来内嵌
const {merge} = require('webpack-merge')
const webpackConfig = require('./webpack.base')

module.exports =merge(webpackConfig, {
  mode: 'development',
  entry:resolve('src/index.js'),
  target: 'web',
  output: {
    libraryTarget: 'umd',
    filename: 'index.js',
    path: resolve('dist')
  },
  devServer:{
    hot: true 
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
      // {
      //   test: /\.css$/,
      //   use: [ 
      //     MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     'postcss-loader'
      //   ]
      // },
      // {
      //   test: /\.less$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     'postcss-loader',
      //     'less-loader'
      //   ]
      // },
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      '__isBrowser__': true
    }),
    // new HtmlWebpackPlugin({template:'public/index.html'})
  ],
});