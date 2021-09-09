import React from "react"
import App from './App'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
let ssr = window.IS_SSR || false

ReactDOM[ssr? 'hydrate' : 'render'](
<BrowserRouter><App/></BrowserRouter>,
document.getElementById('root'))

