//用于创建子进程
import { spawn } from 'child_process';

console.log('\n 项目正在启动中....')

//前端代码构建 服务进程
const clientWatchProcess = spawn('yarn', ['watch-client'], {
  stdio: 'inherit', shell: process.platform === 'win32'
});

//服务端代码监控和编译进程
const serverWatchProcess = spawn('yarn', ['dev'], {
  stdio: 'inherit', shell: process.platform === 'win32'
});

// 杀掉子进程
const killChild = ()=>{
  clientWatchProcess && clientWatchProcess.kill();
  serverWatchProcess && serverWatchProcess.kill();
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
