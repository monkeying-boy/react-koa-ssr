//用于创建子进程
import { spawn } from 'child_process';
import killPort from './killPort'
import { devPort } from '../config';

console.log('\n 项目正在启动中....')

//前端代码构建 服务进程
const clientWatchProcess = spawn('yarn', ['watch-client'], {
  stdio: 'inherit', 
  shell: process.platform === 'win32'
});

//服务端代码监控和编译进程
const serverWatchProcess = spawn('yarn', ['watch-server'], {
  // stdio: 'inherit',
  shell: process.platform === 'win32'
});

const startNodeServer = ()=>  spawn('node', ['dist/server/main.js'], {
    stdio: 'inherit', shell: process.platform === 'win32'
  });


// node 服务前端访问地址
let nodeServer = null;

// 监听服务端子线程
serverWatchProcess.stdout.on('data',(data) =>{
  const str = data.toString()
  console.log(str)
  if(str.includes('successfully')){
    console.log('server 编译完成')
    console.log('正在启动本地服务')
    // 先关闭服务再启动
    nodeServer && killPort(devPort)
    nodeServer = startNodeServer()
  }
})


// 杀掉子进程
const killChild = ()=>{
  clientWatchProcess && clientWatchProcess.kill();
  serverWatchProcess && serverWatchProcess.kill();
  nodeServer && nodeServer.kill();
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

