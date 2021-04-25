import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import authReducer from './reducers/authReducer'
import courseReducer from './reducers/courseReducer'
import moduleReducer from './reducers/moduleReducer'
import articlesReducer from './reducers/articlesReducer'
import articlePage from './reducers/articlePageReducer'


const persistConfig = {
  key: 'root',
  storage
}

const reducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
  modules: moduleReducer,
  articles:articlesReducer , 
  articlePage : articlePage , 
})

const persistedReducer = persistReducer(persistConfig, reducer)

// debugging with devtools
let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk ,logger))
)
let persistor = persistStore(store)

export { store, persistor }
