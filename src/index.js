import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App/App'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
// import { createStore } from "redux";
// import { Provider } from "react-redux";
// import reducer from "./reducers";
// import middleware from "./middlewares";

// const store = createStore(reducer, middleware);

const customHistory = createBrowserHistory()

ReactDOM.render(
  <BrowserRouter history={customHistory}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
