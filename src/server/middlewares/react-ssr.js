//完成 react ssr 工作的中间件
//引入Index 组件
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../../web/App';
import { webPort } from '../../../config';
import { StaticRouter , matchPath} from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import routers from '../../routers/index'
import render from '../../web/render'


const NotFound = (<div>没有找到404</div>);

const getComponent = (path)=>{
  // const targetRoute = matchRoutes(Routes,url)
  // console.log(targetRoute,'targetRoute')
  // return targetRoute.map( ({route,match}) =>
  //   route?.component?.loadData? route.component.loadData(): 
  // )
  const targetRoute = routers.find(route => matchPath(path, route)) || { Component: () => NotFound } // 找不到对应的组件时返回NotFound组件
  const activeComponent = targetRoute.component
  return activeComponent
} 

const distPath = `http://localhost:${webPort}`


const getCurrentRoute = (url)=>{
  const targetRoute = matchRoutes(routers,url)
  // console.log(targetRoute,'targetRoute')
  return targetRoute.map( ({route,match}) =>
    route?.component?.loadData? route.component.loadData(): ''
  )
}


export default async (ctx, next) => {
  const path = ctx.request.path;
  console.log('ctx.request.path',path);
  // 其他静态资源
  if (path.indexOf('.') > -1) {
    ctx.body = null;
    return next();
  }


  if(path !== '/'){
    return
  }

  // let html = '',//组件渲染结果
    // fetchResult = {},//属于预取结果
    let tdk = {//tdk 默认值
      title: '默认标题 - my react ssr',
      keywords: '默认关键词',
      description: '默认描述'
    };

    const ActiveComponent = getComponent(path)
    //提前获取页面所需数据
    const serverData = ActiveComponent.getInitialProps ? await ActiveComponent.getInitialProps(ctx) : {}
    const body = (
      <StaticRouter location={ctx.req.url} context={serverData}>
        <ActiveComponent getInitialProps={serverData} />
    </StaticRouter>
    )
    let html = renderToString(body)

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
</body>
</html>
 <script src=${distPath}/main.js></script>
`;

  await next();
}