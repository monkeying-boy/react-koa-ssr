import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, StaticRouter, Route } from 'react-router-dom'
// import defaultLayout from '@/layout'
// import { getWrappedComponent, getComponent } from 'utils'
// import { routes as Routes } from '../config/config.ssr'
import Routes from '../routers'
import { matchPath } from 'react-router-dom'

// let __isBrowser__ = false
console.log(__isBrowser__,'__isBrowser__')

const NotFound = (<div>没有找到404</div>);

const getComponent = (path)=>{
  // const targetRoute = matchRoutes(Routes,url)
  // console.log(targetRoute,'targetRoute')
  // return targetRoute.map( ({route,match}) =>
  //   route?.component?.loadData? route.component.loadData(): 
  // )
  const targetRoute = Routes.find(route => matchPath(path, route)) || { Component: () => NotFound } // 找不到对应的组件时返回NotFound组件
  const activeComponent = targetRoute.component
  return activeComponent
} 

const clientRender = async () => {
  // 客户端渲染||hydrate
  ReactDOM[window.__USE_SSR__ ? 'hydrate' : 'render'](
    <BrowserRouter>
      {
        // 使用高阶组件getWrappedComponent使得csr首次进入页面以及csr/ssr切换路由时调用getInitialProps
        Routes.map(({ path, exact, Component }, key) => {
          const ActiveComponent = Component()
          const Layout = ActiveComponent.Layout || defaultLayout
          const WrappedComponent = getWrappedComponent(ActiveComponent)
          return <Route exact={exact} key={path} path={path} render={() => <Layout><WrappedComponent /></Layout>} />
        })
      }
    </BrowserRouter>
    , document.getElementById('app'))

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept()
  }
}

const serverRender = async (ctx) => {
  const requestPath = ctx.path
  console.log(requestPath,'requestPath')
  // 服务端渲染 根据ctx.path获取请求的具体组件，调用getInitialProps并渲染
  const ActiveComponent = getComponent(requestPath)
  console.log(ActiveComponent,'ActiveComponent1')
  // const Layout = ActiveComponent.Layout || defaultLayout
  const serverData = ActiveComponent.getInitialProps ? await ActiveComponent.getInitialProps(ctx) : {}
  // ctx.serverData = serverData
  // const serverData = {data:[1,2,3,4,5],code:300,msg:'测试'}
  ctx.serverData = serverData
  return <StaticRouter location={ctx.req.url} context={serverData}>
    {/* <Layout layoutData={ctx}> */}
      <ActiveComponent getInitialProps={serverData} />
    {/* </Layout> */}
  </StaticRouter>
}



export default __isBrowser__ ? clientRender() : serverRender
