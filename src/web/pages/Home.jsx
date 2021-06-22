import React, { useState } from "react"
const Home = () =>{
  console.log('home')
  const [count,setCount] = useState(0)
  return (
    <div>
      Home 页面---{count}
      <button onClick={()=>setCount(count+1)}>++</button>
    </div>
  )
}

export default Home