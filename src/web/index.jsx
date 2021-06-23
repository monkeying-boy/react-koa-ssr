// import { BrowserRouter } from "react-router-dom";
// import Router from '../router';

// function ClientRender() {
//   return (
//       <BrowserRouter >
//         <Router />
//       </BrowserRouter>
//   )
// }
// import React from "react"
import App from './App'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.hydrate(<App />, document.getElementById('root'))

