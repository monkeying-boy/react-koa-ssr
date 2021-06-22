
import Koa from 'koa'
import koaStatic from'koa-static'
import { resolve } from 'path';
import { nodePort } from '../../config.js';
import reactSsr from './middlewares/react-ssr'
console.log(nodePort,'nodePort')


const app = new Koa();
app.use(koaStatic(resolve('dist/client')))

app.use( async (ctx, next) => {
  reactSsr(ctx,next)
})

app.listen(nodePort, ()=>{
  console.log(`服务已经启动访问： http://localhost:${nodePort}`)
})