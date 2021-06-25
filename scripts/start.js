//用于创建子进程
import { spawn } from 'child_process';
import {WEB_READY} from'./constant'

console.log('\n 项目正在启动中....')

//前端代码构建 服务进程
const clientWatchProcess = spawn('yarn', ['watch-client'], {
  // stdio: 'inherit', 
  shell: process.platform === 'win32'
});

//服务端代码监控和编译进程
const serverWatchProcess = spawn('yarn', ['watch-server'], {
  // stdio: 'inherit', 
  shell: process.platform === 'win32'
});

const startNodeServer = ()=> spawn('node', ['dist/server/main.js'], {
  stdio: 'inherit', shell: process.platform === 'win32'
});


// node 服务前端访问地址
let nodeServer = startNodeServer();

// 监听服务端子线程
serverWatchProcess.stdout.on('data',(data) =>{
  const str = data.toString()
  console.log(str,'server stdout')
  if(str.includes('successfully')){
    console.clear()
    console.log('server 编译完成')
  }
})

// 监听客户端子线程
clientWatchProcess.stdout.on('data',(data)=>{
  const str = data.toString()
  if(str.includes(WEB_READY)){
    console.clear()
    console.log('web 编译完成')
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
  console.log('main process  close', code);
  killChild();
});
//主进程关闭退出子进程
process.on('exit', (code) => {
  console.log('main process  exit', code);
  killChild();
});

//非正常退出情况
process.on('SIGINT', function () {
  svrCodeWatchProcess.stdin.write('exit', (error) => {
      console.log('svr code watcher process exit!');
  });
  killChild();
});
