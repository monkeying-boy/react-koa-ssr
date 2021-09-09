//用于创建子进程
import { spawn } from 'child_process';
import killPort from './killPort'
import { devPort } from '../config';
import webpack from 'webpack'
import clientConfig from'../webpack/webpack.client'
import serverConfig from'../webpack/webpack.server'
import {merge} from'webpack-merge'

console.log('\n 项目正在启动中....')

// "dev": "nodemon --watch dist --exec babel-node ./dist/server.js",
//     "dev:server": "webpack --config ./webpack/webpack.server.js --watch",
//     "dev:client": "webpack --config ./webpack/webpack.client.js --watch"


// 是否启动服务
let isStart = false
let childProcess={}
// 启动项目
const start = ()=>{
  childProcess = spawn('yarn', ['nodemon --watch dist --exec babel-node dist/server.js'], {
    stdio: 'inherit',
    shell: process.platform === 'win32'
  })
}

let mode = 'development'

// webpack实例
const compiler = webpack([merge(clientConfig,{mode}),merge(serverConfig,{mode})]);
// 启动 webpack 相当于 webpack --watch
compiler.watch({
  hot: true,
  aggregateTimeout: 300,
},(err, stats)=>{
  if (err) {
    console.error(err);
    return;
  }

  console.log(stats.toString({
    chunks: false,  // 使构建过程更静默无输出
    colors: true    // 在控制台展示颜色
  }));

  if(!isStart){
    isStart = true
    start()
  }
});

// watch()
// const startNodeServer = ()=>  spawn('node', ['dist/server/main.js'], {
//     stdio: 'inherit', shell: process.platform === 'win32'
//   });


// node 服务前端访问地址
let nodeServer = null;

// 监听服务端子线程
// serverWatchProcess.stdout.on('data',(data) =>{
//   const str = data.toString()
//   console.log(str)
//   if(str.includes('successfully')){
//     console.log('server 编译完成')
//     console.log('正在启动本地服务')
//     // 先关闭服务再启动
//     nodeServer && killPort(devPort)
//     nodeServer = startNodeServer()
//   }
// })


// 杀掉子进程
const killChild = ()=>{
  childProcess && childProcess.kill();
}

//主进程关闭退出子进程
process.on('close', (code) => {
  killChild();
});
//主进程关闭退出子进程
process.on('exit', (code) => {
  killChild();
});

// ctrl + c 退出程序
process.on('SIGINT', (code) => {
  killChild()
})

