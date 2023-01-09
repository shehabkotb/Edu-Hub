import discussionService from '../services/discussion'
import {
  GET_ALL_DISCUSSIONS,
  ADD_DISCUSSION,
  REMOVE_DISCUSSION,
  ADD_DCOMMENT,
  REMOVE_DCOMMENT
} from '../actions/discussion'
import checkModerationService from '../services/checkModeration'
import { notification } from 'antd'

const discussionReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_DISCUSSIONS:
      return action.data.reverse()
    case ADD_DISCUSSION:
      return state.reverse().concat({ ...action.data }).reverse()
    case REMOVE_DISCUSSION:
      return state.filter((val) => {
        return val._id !== action.data
      })
    case ADD_DCOMMENT:
      return state.map((val) => {
        if (val._id === action.data._id) {
          return action.data
        } else {
          return val
        }
      })
    case REMOVE_DCOMMENT:
      return state.map((val) => {
        if (val._id === action.data._id) {
          return action.data
        } else {
          return val
        }
      })
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

export const addDiscussion = (courseId, data) => {
  return async (dispatch) => {
    try {
      const ver = await checkModerationService.check(data)
      if (ver) {
        const response = await discussionService.addDiscussion(courseId, data)
        dispatch({ type: ADD_DISCUSSION, data: response })
        notification.success({
          message: 'Posted successfully'
        })
      } else {
        notification.error({
          message: 'Your post violates EduHub standards'
        })
      } 
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't post check your connection"
      })
    }
  }
}

export const removeDiscussion = (id) => {
  return async (dispatch) => {
    try {
      await discussionService.removeDiscussion(id)
      dispatch({ type: REMOVE_DISCUSSION, data: id })
      notification.success({
        message: 'removed successfully'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't remove check your connection"
      })
    }
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const ver = await checkModerationService.check(comment)
      if (ver) {
        const response = await discussionService.addComment(id, comment)
        dispatch({ type: ADD_DCOMMENT, data: response })
        notification.success({
          message: 'Comment Posted successfully'
        })
      } else {
        notification.error({
          message: 'Your comment violates EduHub standards'
        })
      }
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't post comment check your connection"
      })
    }
  }
}

export const removeComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const response = await discussionService.removeComment(id, comment)
      dispatch({ type: REMOVE_DCOMMENT, data: response })
      notification.success({
        message: 'Comment removed successfully'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't remove comment check your connection"
      })
    }
  }
}

export default discussionReducer
