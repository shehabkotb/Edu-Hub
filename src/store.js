import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import authReducer from './reducers/authReducer'
import courseReducer from './reducers/courseReducer'
import moduleReducer from './reducers/moduleReducer'
import discussionReducer from './reducers/discussionReducer'

const persistConfig = {
  key: 'root',
  storage
}

const reducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
  modules: moduleReducer,
  discussions: discussionReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

// debugging with devtools
let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
let persistor = persistStore(store)

export { store, persistor }
