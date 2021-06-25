import React, { useState } from "react"
import PageContainer from'../components/PageContainer'

const Home = (props) =>{
  console.log('home-1',props,'\n')
  const [count,setCount] = useState(0)
  return (
    <div>
      Home 页面---{count}
      <button onClick={()=>setCount(count+1)}>++</button>
      {/* <hr/> */}
      <dir>{JSON.stringify(props.getInitialProps)}</dir> 
    </div>
  )
}

Home.getInitialProps= ()=>{
  console.log('home.getInitialProps')
  return {
    data:[1,2,3,4,5],
    msg:'成功',
    code: 200
  }
}

export default PageContainer(Home)