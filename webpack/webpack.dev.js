const {resolve} = require('path');
const {webPort} = require('../config')
const webpack =require('webpack')

const publicPath = `http://localhost:${webPort}`

module.exports = {
  mode: 'development',
  entry:{
    main:resolve('src/web/index.jsx')
  },
  target: 'web',
  output: {
    filename: '[name].js',
    path: resolve('dist/client'),
    publicPath
  },
  devServer:{
    port: webPort,
    quiet: true,
    contentBase: resolve('dist/client'),
    publicPath,
    hot: true, // 热更新
    progress: true, // 运行进度
    compress: true, //开启gzip压缩
    watchOptions: {
      // 排除 node_modules 监听
      ignored: /node_modules/,
      //这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。以毫秒为单位：
      aggregateTimeout: 500,
      poll: 500
    }
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
  },
  plugins:[
    new webpack.DefinePlugin({
      '__isBrowser__': true
    })
  ]
};