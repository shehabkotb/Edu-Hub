import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import authReducer from './reducers/authReducer'
import courseReducer from './reducers/courseReducer'
import moduleReducer from './reducers/moduleReducer'

const reducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
  modules: moduleReducer
})

// debugging with devtools
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk,logger)))

export default store
