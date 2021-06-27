import React from "react"
import { useParams } from "react-router-dom"
import PageContainer from'../components/PageContainer'

const About = (props) =>{
  let { id } = useParams();
  return (
    <div>
      <p>about 页面</p>
      <p>{id}</p>
    </div>
  )
}

About.getInitialProps= ()=>{
  console.log('About.getInitialProps')
  return {
    data:'about',
    msg:'成功',
    code: 200
  }
}

export default PageContainer(About)