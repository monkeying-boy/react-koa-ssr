const nodeExternals = require('webpack-node-externals')
const {resolve} = require('path');
const webpack =require('webpack')

module.exports = {
  mode: 'development',
  entry:{
    main: resolve('server/app.js')
  },
  target: 'node',
  output: {
    path: resolve('dist/server'),
    publicPath: '/',
  },
  externals: nodeExternals({
    // whitelist: [/\.(css|less|sass|scss)$/, /^antd.*?css/],
    modulesDir: resolve('node_modules')
  }),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
     }
      // {
      //   test: /\.jsx|\.js$/, exclude: /node_modules/, use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-react']
      //     }
      //   }
      // }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    // alias: {
    //   //定义dist 目录别名，方便导入模块
    //   '@dist': path.resolve(__dirname,'../dist')
    // }
    alias: {
      '@': resolve('src'),
      '@server': resolve('server'),
      '@config': resolve('config.js')
    }
  },
  plugins:[
    new webpack.DefinePlugin({
      '__isBrowser__': false
    })
  ]
};