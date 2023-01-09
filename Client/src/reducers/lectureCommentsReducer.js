import lectureService from '../services/lectures'
import checkModerationService from '../services/checkModeration'

import { notification } from 'antd'

const LOAD_LECTURE_COMMENTS = 'LOAD_LECTURE_COMMENTS'
const GET_ALL_LECTURE_COMMENTS = 'GET_ALL_LECTURE_COMMENTS'
const CREATE_LECTURE_COMMENT = 'CREATE_LECTURE_COMMENT'
const DELETE_LECTURE_COMMENT = 'DELETE_LECTURE_COMMENT'

const lectureCommentsReducer = (
  state = { data: {}, loading: false },
  action
) => {
  switch (action.type) {
    case LOAD_LECTURE_COMMENTS:
      return { data: {}, loading: true }
    case GET_ALL_LECTURE_COMMENTS:
      return { data: action.data, loading: false }
    case CREATE_LECTURE_COMMENT:
      return { data: action.data, loading: false }
    case DELETE_LECTURE_COMMENT:
      return { data: action.data, loading: false }
    default:
      return state
  }
}

export const getAllComments = (courseId, moduleItemId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOAD_LECTURE_COMMENTS })
      const response = await lectureService.getLectureComments(
        courseId,
        moduleItemId
      )

      dispatch({ type: GET_ALL_LECTURE_COMMENTS, data: response })
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
      const ver = await checkModerationService.check(comment)
      if (ver) {
        const response = await lectureService.createLectureComment(
          courseId,
          moduleItemId,
          comment
        )
        dispatch({ type: CREATE_LECTURE_COMMENT, data: response })
        notification.success({
          message: 'Added comment successfully'
        })
      } else {
        notification.error({
          message: 'Your comment violates EduHub standards'
        })
      }
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
      dispatch({ type: DELETE_LECTURE_COMMENT, data: response })
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
