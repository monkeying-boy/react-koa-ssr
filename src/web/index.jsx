import React from "react"
import App from './App'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.hydrate(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'))

