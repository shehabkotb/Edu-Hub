import discussionService from '../services/discussion'
import {
  GET_ALL_DISCUSSIONS,
  ADD_DISCUSSION,
  REMOVE_DISCUSSION,
  ADD_DCOMMENT,
  REMOVE_DCOMMENT
} from '../actions/course'
import { notification } from 'antd'

const discussionReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_DISCUSSIONS:
      return action.data
    case ADD_DISCUSSION || REMOVE_DISCUSSION || ADD_DCOMMENT || REMOVE_DCOMMENT:
      return state.concat({ ...action.data })
    default:
      return state
  }
}

export const getAllDiscussions = (courseId) => {
  return async (dispatch) => {
    try {
      const response = await discussionService.getAllDiscussions(courseId)
      dispatch({ type: GET_ALL_DISCUSSIONS, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't load discussions check your connection"
      })
    }
  }
}


export default discussionReducer
