//完成 react ssr 工作的中间件
//引入Index 组件
import React from 'react';
import { renderToString } from 'react-dom/server';
import Home from '../../web/pages/Home';
import { webPort } from '../../../config';

const distPath = `http://localhost:${webPort}`


export default async (ctx, next) => {
  // console.log(ctx)
  // console.log(process.env.NODE_ENV);
  // console.log(typeof process.env.NODE_ENV);
  // console.log(__IS_PROD__);
  // console.log(typeof __IS_PROD__);
  // console.log('====');
  const path = ctx.request.path;
  console.log('ctx.request.path', ctx.request.path);

  if(path !== '/'){
    return
  }

  // if (path.indexOf('.') > -1) {
  //   ctx.body = null;
  //   return next();
  // }
  
  

  let html = '',//组件渲染结果
    fetchResult = {},//属于预取结果
    tdk = {//tdk 默认值
      title: '默认标题 - my react ssr',
      keywords: '默认关键词',
      description: '默认描述'
    };

    html =  renderToString( <Home />)

  // if (proConfig.__IS_SSR__) {
  //   //获得静态路由
  //   const staticRoutesList = await getStaticRoutes(routeList);


  //   //查找到的目标路由对象
  //   let matchResult = await matchRoute(path, staticRoutesList);
  //   let { targetRoute, targetMatch } = matchResult;


  //   //得到数据
  //   let fetchDataFn;
  //   if (targetRoute) {
  //     fetchDataFn = targetRoute.component ? targetRoute.component.getInitialProps : null;
  //     if (fetchDataFn) {
  //       fetchResult = await fetchDataFn({ match: targetMatch });
  //     }
  //   }


  //   let { page } = fetchResult || {};


  //   if (page && page.tdk) {
  //     tdk = page.tdk;
  //   }

  //   //将预取数据在这里传递过去 组内通过props.staticContext获取
  //   const context = {
  //     initialData: fetchResult
  //   };

  //   html = renderToString(<StaticRouter location={path} context={context}>
  //     <App routeList={staticRoutesList}></App>
  //   </StaticRouter>);
  // }

  //静态资源
  // const assetsMap = getAssets();
  
  ctx.type='html'
  ctx.body = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${tdk.title}</title>
    <meta name="keywords" content="${tdk.keywords}" />
    <meta name="description" content="${tdk.description}" />
</head>
<body>
    <div id="root">${html}</div>
    <textarea id="ssrTextInitData" style="display:none;">${JSON.stringify(fetchResult)}</textarea>
</body>
</html>
 <script src=${distPath}/main.js></script>
`;

  await next();
}