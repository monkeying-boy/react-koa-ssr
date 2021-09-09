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
      console.log(this.props,'props')
      console.log(Component,'Component')
      const res =  Component.getInitialProps ? await Component.getInitialProps({match,location}) : {};
      console.log(res,'res')

      if(__isBrowser__ && window.IS_SSR){
        console.log('getData---------')
        document.getElementById('SSR_CONTENT').innerText = JSON.stringify(res)
      }

      // let { tdk } = res;
      // if (tdk) {
      //   document.title = tdk.title;
      // }
    }

    // componentWillMount(data){

    // }

    // 浏览器环境挂载 dom 后
    async componentDidMount() {
      if(__isBrowser__ ){
        await this.getData()
        // 保证 ssr 数据同步
        if(window.IS_SSR){
          let data = document.getElementById('SSR_CONTENT').innerText
          this.setState({ssrContent: JSON.parse(data)})
        }
      }
    }
  
  
    render(){
      const {ssrContent = {}} = this.state
      return <Component ssrContent={ssrContent} />
    }
  }
}