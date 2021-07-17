import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import authReducer, { logout } from './reducers/authReducer'
import courseReducer from './reducers/courseReducer'
import moduleReducer from './reducers/moduleReducer'
import articlesReducer from './reducers/articlesReducer'
import articlePage from './reducers/articlePageReducer'
import notificationsReducer from './reducers/notificationsReducer'
import lectureReducer from './reducers/lectureReducer'
import lectureCommentsReducer from './reducers/lectureCommentsReducer'
import discussionReducer from './reducers/discussionReducer'
import announcementsReducer from './reducers/announcementsReducer'
import axios from 'axios'
import examReducer from './reducers/examReducer'
import assessmentCreationReducer from './reducers/assessmentCreationReducer'
import assessmentTakingReducer from './reducers/assessmentTakingReducer'
import submissionsReducer from './reducers/submissionsReducer'
import gradebookReducer from './reducers/gradebookReducer'
import summaryGradebookReducer from './reducers/summaryGradebookReducer'
import participantsReducer from './reducers/participantsReducer'
import assignmentReducer from './reducers/assignmentReducer'
import calendarReducer from './reducers/calendarReducer'
import deadlinesReducer from './reducers/deadlinesReducer'
import courseSettingsReducer from './reducers/courseSettingsReducer'
import achievementsReducer from './reducers/achievementsReducer'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'auth',
    'assessmentCreation',
    'assessmentTaking',
    'submissions',
    'courseParticipants',
    'summaryGradebook',
    'courseGradebook',
    'modules'
  ]
}

const reducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
  modules: moduleReducer,
  articles: articlesReducer,
  articlePage: articlePage,
  notifications: notificationsReducer,
  lectures: lectureReducer,
  lectureComments: lectureCommentsReducer,
  discussions: discussionReducer,
  announcements: announcementsReducer,
  exams: examReducer,
  assessmentCreation: assessmentCreationReducer,
  assessmentTaking: assessmentTakingReducer,
  submissions: submissionsReducer,
  courseGradebook: gradebookReducer,
  summaryGradebook: summaryGradebookReducer,
  courseParticipants: participantsReducer,
  assignments: assignmentReducer,
  calendar: calendarReducer,
  deadlines: deadlinesReducer,
  courseSettings: courseSettingsReducer,
  achievements: achievementsReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

// debugging with devtools
let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
)
let persistor = persistStore(store)

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      store.dispatch(logout())
    } else {
      return Promise.reject(error)
    }
  }
)

export { store, persistor }
