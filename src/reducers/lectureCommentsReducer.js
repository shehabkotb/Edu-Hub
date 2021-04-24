import lectureService from '../services/lectures'
import {
  LOAD_COMMENTS,
  GET_ALL_COMMENTS,
  CREATE_COMMENT,
  DELETE_COMMENT
} from '../actions/lecture'

import { notification } from 'antd'

const lectureCommentsReducer = (
  state = { data: [], loading: false },
  action
) => {
  switch (action.type) {
    case LOAD_COMMENTS:
      return { data: [], loading: true }
    case GET_ALL_COMMENTS:
      return { data: action.data, loading: false }
    case CREATE_COMMENT:
      return { data: action.data, loading: false }
    case DELETE_COMMENT:
      return { data: action.data, loading: false }
    default:
      return state
  }
}

/* actions for courses bellow */

export const getAllComments = (courseId, moduleItemId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOAD_COMMENTS })
      const response = await lectureService.getLectureComments(
        courseId,
        moduleItemId
      )
      dispatch({ type: GET_ALL_COMMENTS, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't load comments check your connection"
      })
    }
  }
}

export const createComment = (courseId, moduleItemId, comment) => {
  return async (dispatch) => {
    try {
      const response = await lectureService.createLectureComment(
        courseId,
        moduleItemId,
        comment
      )
      dispatch({ type: CREATE_COMMENT, data: response })
      notification.success({
        message: 'Added comment successfully'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't add comment"
      })
    }
  }
}

export const deleteComment = (courseId, moduleItemId, commentId) => {
  return async (dispatch) => {
    try {
      const response = await lectureService.deleteLectureComment(
        courseId,
        moduleItemId,
        commentId
      )
      dispatch({ type: DELETE_COMMENT, data: response })
      notification.success({
        message: 'deleted comment successfully'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't deleted comment"
      })
    }
  }
}

export default lectureCommentsReducer
