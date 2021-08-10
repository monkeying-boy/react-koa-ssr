import React from "react"
import { useParams } from "react-router-dom"
import PageMiddle from '../components/PageMiddle'
import { useHistory } from "react-router-dom";


const About = (props) =>{
  let { id } = useParams();
  let history = useHistory();

  function handleClick() {
    history.push("/");
  }
  return (
    <div>
      <p>about 页面</p>
      <p>{id}</p>
      <button onClick={handleClick}>home</button>
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

// export default PageContainer(About)
export default PageMiddle(About)