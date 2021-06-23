import React, { useState } from "react"
const Home = ({staticContext}) =>{
  console.log('home-1',staticContext,'\n')
  const [count,setCount] = useState(0)
  return (
    <div>
      Home 页面---{count}
      <button onClick={()=>setCount(count+1)}>++</button>
      {/* <hr/> */}
      {/* <dir></dir> */}
      {JSON.stringify(staticContext)}
    </div>
  )
}

Home.loadData= ()=>{
  return {
    data:[1,2,3],
    msg:'成功',
    code: 200
  }
}

export default Home