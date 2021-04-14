import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import subscribeUser from './subscription';


import './index.css'
import App from './App'
import store from './store.js'

const history = createBrowserHistory()

serviceWorker.register();
subscribeUser();//temporary place, place after login with auth data
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      