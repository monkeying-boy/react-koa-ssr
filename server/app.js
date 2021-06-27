
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
app.use(koaStatic(resolve('dist/client')))


app.use(async (ctx, next) => {
  console.log(ctx.request.url,'ctx.request.url')
  if (/api\//.test(ctx.request.url)) {
    await next()
  }else{
    await reactSsr(ctx, next)
  }
})


app.listen(devPort, ()=>{
  console.log(`服务已经启动访问123： http://localhost:${devPort}`)
})