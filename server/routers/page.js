import koaRouter from'koa-router'
let router = new koaRouter()

router.get('/',async (ctx)=>{
  ctx.body="api 接口测试";
})



export default router