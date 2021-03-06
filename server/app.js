
import Koa from 'koa'
import koaStatic from'koa-static'
import koaRouter from'koa-router'
import { resolve } from 'path';
import { devPort } from '../config.js';
import reactSsr from './middlewares/react-ssr'
import api from './routers/page'

let router = new koaRouter()

router.use('/api', api.routes(), api.allowedMethods())

const app = new Koa();

app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());
app.use(koaStatic(resolve('dist')))


app.use(async (ctx, next) => {
  let reqUrl = ctx.request.url
  // api 接口和静态资源执行下一个中间件
  if (reqUrl.includes('.')) {
    await next()
    return
  }
  if (/api\//.test(reqUrl)) {
    console.log('api 接口')
    return
  }
  await reactSsr(ctx, next)
  
})


app.listen(devPort, ()=>{
  console.log(`服务已经启动访问123： http://localhost:${devPort}`)
})