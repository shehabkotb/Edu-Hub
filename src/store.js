import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import authReducer from './reducers/authReducer'
import courseReducer from './reducers/courseReducer'

const reducer = combineReducers({
  auth: authReducer,
  courses: courseReducer
})

// debugging with devtools
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
