import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import routers from '@/routers/index'
import PageMiddle from '@/components/PageMiddle'


const NotFound = (<div>没有找到404</div>);

const getComponent = (path) => {
  const targetRoute = routers.find(route => matchPath(path, route)) || { Component: () => NotFound } // 找不到对应的组件时返回NotFound组件
  const activeComponent = targetRoute.component
  return PageMiddle(activeComponent)
  // return activeComponent
}

export default async (ctx, next) => {
  const path = ctx.request.path;

  let tdk = {//tdk 默认值
    title: '默认标题 - my react ssr',
    keywords: '默认关键词',
    description: '默认描述'
  };

  const ActiveComponent = getComponent(path)
  console.log(ActiveComponent,'ActiveComponent')
  //提前获取页面所需数据
  const preData = ActiveComponent.getInitialProps ? await ActiveComponent.getInitialProps(ctx) : {}
  if (preData.tdk) {
    tdk = preData.tdk
  }
  const body = (
    <StaticRouter location={ctx.req.url}>
      <ActiveComponent ssrContent={preData} />
    </StaticRouter>
  )
  let html = renderToString(body)
  ctx.type = 'html'
  ctx.body = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${tdk.title}</title>
    <meta name="keywords" content="${tdk.keywords}" />
    <meta name="description" content="${tdk.description}" />
  </head>
  <body>
    <div id="root">${html}</div>

    <script>window.IS_SSR=true</script>
    <script>window.preData=${JSON.stringify(preData)}</script>
    <script id="SSR_CONTENT" type="application/json">${JSON.stringify(preData)}</script>
    <script src=/index.js></script>
  </body>
  </html>
`;

  await next();
}