import fs from'fs'

export default (app) => {
  console.log(fs.readdirSync(__dirname),'fs.readdirSync(__dirname)')
  // 使用 fs 模块自动读取并注册 routes 文件夹下所有路由接口
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') { return; }
    const route = require(`./${file}`);
    app.use(route.routes()).use(route.allowedMethods());
  });
}