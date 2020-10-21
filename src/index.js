import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App/App'
import { BrowserRouter } from 'react-router-dom'
// import { createStore } from "redux";
// import { Provider } from "react-redux";
// import reducer from "./reducers";
// import middleware from "./middlewares";

// const store = createStore(reducer, middleware);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
