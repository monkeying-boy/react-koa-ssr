const {resolve} = require('path');
const webpack =require('webpack')

module.exports = {
  mode: 'development',
  entry:{
    main:resolve('src/index.jsx')
  },
  target: 'web',
  output: {
    filename: '[name].js',
    path: resolve('dist/client'),
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
      }
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
    })
  ]
};