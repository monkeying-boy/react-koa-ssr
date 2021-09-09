const {resolve} = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  output: {
    // filename: '[name].js'
    path: resolve('dist')
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
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': resolve('src'),
      '@server': resolve('server'),
      '@config': resolve('config.js')
    }
  },
  // plugins:[
  //   new CleanWebpackPlugin(),
  // ]
};