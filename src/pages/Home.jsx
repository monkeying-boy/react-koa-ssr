import React, { useState } from "react"
import PageMiddle from '../components/PageMiddle'
import About from "@/pages/About"
import { useHistory } from "react-router-dom";

const Home = (props) =>{
  console.log('home-12',props,'\n')
  const [count,setCount] = useState(0)
  let history = useHistory();

  function handleClick() {
    history.push("/about?id=1");
  }

  
  return (
    <div>
      Home 页面-12-33--{count}
      <button onClick={()=>setCount(count+1)}>++</button>
      {/* <hr/> */}
      <dir>{JSON.stringify(props.ssrContent)}</dir>
      
      <button onClick={handleClick}>about</button>
    </div>
  )
}

Home.getInitialProps= ()=>{
  console.log('home.getInitialProps')
  return {
    data:[1,2,3,4,5],
    tdk:{
      title: '首页 title',
      keywords: '首页 keywords',
      description: '首页 description'
    },
    msg:'成功',
    code: 200
  }
}

export default Home
// export default PageMiddle(Home)