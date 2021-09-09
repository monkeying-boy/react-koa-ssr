import React,{useEffect} from "react"
import { useParams } from "react-router-dom"
// import PageMiddle from '../components/PageMiddle'
import { useHistory } from "react-router-dom";

const getData = ()=>{
  console.log('About.getInitialProps')
  return {
    data:'about',
    msg:'成功',
    code: 200
  }
}

const About = (props) =>{
  let { id } = useParams();
  let history = useHistory();

  // useEffect( ()=>{
  //   getData()
  // })

  function handleClick() {
    history.push("/");
  }
  return (
    <div>
      <p>about 页面</p>
      <p>{JSON.stringify(props.ssrContent)}</p>
      <button onClick={handleClick}>home</button>
    </div>
  )
}

About.getInitialProps= getData

export default About
// export default PageMiddle(About)