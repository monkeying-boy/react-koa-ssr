import React from 'react';



export default (Component)=>{
  
  return class Hoc extends React.Component{
    constructor(props) {
      super(props);
      const {ssrContent ={}} = props
      this.state={
        ssrContent
      }
    }

    //用于服务端调用
    static async getInitialProps(ctx){
      return Component.getInitialProps ? await Component.getInitialProps(ctx):{};
    }

    // 浏览器中发送请求
    async getData(){
      const {match,location} = this.props;
      const res =  Component.getInitialProps ? await Component.getInitialProps({match,location}) : {};
      this.setState({
          ssrContent: res,
          canClientFetch: true
      });

      let { tdk } = res;
      if (tdk) {
        document.title = tdk.title;
      }
    }

    // 浏览器环境挂载 dom 后
    componentDidMount() {
      if(window.IS_SSR){
        // 保证 ssr 数据同步
        let data = window.preData
        this.setState({ssrContent: data})
        return
      }
      this.getData()
    }
  
  
    render(){
      const {ssrContent = {}} = this.state
      return <Component ssrContent={ssrContent} />
    }
  }
}