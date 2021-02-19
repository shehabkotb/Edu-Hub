import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import authReducer from './reducers/authReducer'

const reducer = combineReducers({
  auth: authReducer
})

// debugging with devtools
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
