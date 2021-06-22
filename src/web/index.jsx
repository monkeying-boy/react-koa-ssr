// import { BrowserRouter } from "react-router-dom";
// import Router from '../router';

// function ClientRender() {
//   return (
//       <BrowserRouter >
//         <Router />
//       </BrowserRouter>
//   )
// }
import React from "react"
import Home from "./pages/Home";

const App = ()=>{
  return(
    <>
     <Home />
    </>
  )
}
import ReactDOM from 'react-dom';
ReactDOM.hydrate(<App />, document.getElementById('root'))

export default App

