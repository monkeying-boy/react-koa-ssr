
import Webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackConfig from '../webpack/webpack.web.js'
import { serverProt, devPort } from '../config';
import {resolve} from'path';

const options = {
    port: serverProt,
    quiet: true, // 隐藏打包信息
    contentBase: resolve('dist/client'),
    hot: true, // 热更新
    progress: true, // 运行进度
    compress: true, //开启gzip压缩
    watchOptions: {
      // 排除 node_modules 监听
      ignored: /node_modules/,
      //这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。以毫秒为单位：
      aggregateTimeout: 500
    }
}

//创建 webpack-dev-server 服务
const createWebpackDevServer = () => {
  const compiler = Webpack(webpackConfig);
  compiler.hooks.done.tap('done', function () {
    console.log(`web 编译完成: http://localhost:${devPort}`); //编译完成的时候 
  });
  const server = new WebpackDevServer(compiler,options);
  return server
}


// 启动 WebpackDevServer.
const runWebpackDevServer = () => {
  let devServer = createWebpackDevServer();
  devServer.listen(serverProt, '0.0.0.0', err => {
    if (err) {
      return console.log(err);
    }
    console.log(`web 正在编译.... \n`)

  });

}
runWebpackDevServer()