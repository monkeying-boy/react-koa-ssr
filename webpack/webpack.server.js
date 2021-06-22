const nodeExternals = require('webpack-node-externals')
const {resolve} = require('path');

module.exports = {
  mode: 'development',
  entry:{
    app: resolve('src/server/app')
  },
  target: 'node',
  output: {
    path: resolve('/dist/server'),
  },
  externals: [nodeExternals()],
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
  },
};