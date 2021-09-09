const nodeExternals = require('webpack-node-externals')
const {resolve} = require('path');
const webpack =require('webpack')
const {merge} = require('webpack-merge')
const webpackConfig = require('./webpack.base')

module.exports =merge(webpackConfig, {
  entry: resolve('server/app.js'),
  target: 'node',
  output: {
    filename: 'server.js'
  },
  externals: nodeExternals({
    // whitelist: [/\.(css|less|sass|scss)$/, /^antd.*?css/],
    modulesDir: resolve('node_modules')
  }),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    // alias: {
    //   //定义dist 目录别名，方便导入模块
    //   '@dist': path.resolve(__dirname,'../dist')
    // }
    
  },
  plugins:[
    new webpack.DefinePlugin({
      '__isBrowser__': false
    })
  ]
});