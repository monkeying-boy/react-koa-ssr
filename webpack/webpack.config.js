const path = require('path');

module.exports = {
  mode: 'development',
  entry:  path.resolve('src/web/index.jsx'),
  output: {
    libraryTarget: 'umd',
    path: path.resolve('dist/client'),
    filename: 'main.js'
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
  }
};