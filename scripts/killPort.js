import { exec } from 'child_process'

const killPort = (port) => {
  let cmd = ''
  // windos 环境下
  if (process.platform && process.platform === 'win32') {
    cmd = `netstat -aon | findstr ${port}`
  }
  command(cmd)
}

const command = (cmd) => {

  exec(cmd, function (err, stdout) {
    if (err) {
      // console.log(`${cmd} 命令执行失败：${err}`);
      return
    }
    stdout.split('\n').filter(item => {
      let process = item.trim().split(/\s+/);
      let pid = process[4]
      if(pid){
        command(`taskkill -PID ${pid} -F`)
      }
    });
  });
}

export default killPort