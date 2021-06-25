
import Webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackConfig from '../webpack/webpack.dev.js'
import { webPort } from '../config';
import {WEB_READY} from'./constant'

//创建 webpack-dev-server 服务
const createWebpackDevServer = () => {

  const compiler = Webpack(webpackConfig);
  compiler.hooks.done.tap('done', function () {
    console.log(`\n web 编译完成1`); //编译完成的时候 
    // 通知主进程告知 web 编译完
    console.log(WEB_READY)
  });
  const server = new WebpackDevServer(compiler);
  return server
}


// 启动 WebpackDevServer.
const runWebpackDevServer = () => {
  let devServer = createWebpackDevServer();
  devServer.listen(webPort, '0.0.0.0', err => {
    if (err) {
      return console.log(err);
    }
    console.log(`web 正在编译.... \n`)

  });

}

console.log('调用 runWebpackDevServer')
runWebpackDevServer()