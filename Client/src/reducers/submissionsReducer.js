import submissionService from '../services/submissions'
import {
  GET_ALL_SUBMISSIONS,
  LOAD_SUBMISSIONS,
  SUBMIT_GRADE
} from '../actions/submissions'

import { notification } from 'antd'

const submissionsReducer = (state = { data: {}, loading: false }, action) => {
  switch (action.type) {
    case LOAD_SUBMISSIONS:
      return { data: {}, loading: true }
    case GET_ALL_SUBMISSIONS:
      return { data: action.data, loading: false }
    case SUBMIT_GRADE:
      return { data: action.data, loading: false }
    default:
      return state
  }
}

export const getAllSubmissions = (courseId, assessmentId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOAD_SUBMISSIONS })
      const response = await submissionService.getAll(courseId, assessmentId)

      dispatch({ type: GET_ALL_SUBMISSIONS, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't load Submissions check your connection"
      })
    }
  }
}

export const checkPlagiarism = (courseId, assessmentId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOAD_SUBMISSIONS })
      const response = await submissionService.checkPlagiarism(
        courseId,
        assessmentId
      )

      dispatch({ type: GET_ALL_SUBMISSIONS, data: response })
      notification.success({
        message: 'queued Plagiarism checking'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: `Couldn't queue Plagiarism checking`
      })
    }
  }
}

export const autoGrade = (courseId, assessmentId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOAD_SUBMISSIONS })
      const response = await submissionService.autoGrade(courseId, assessmentId)

      dispatch({ type: GET_ALL_SUBMISSIONS, data: response })
      notification.success({
        message: 'queued Auto Grader'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: `Couldn't queue Auto Grader ${error.toString()}`
      })
    }
  }
}

export const gradeQuestions = (
  courseId,
  assessmentId,
  studentId,
  submission
) => {
  return async (dispatch) => {
    try {
      const response = await submissionService.gradeSubmission(
        courseId,
        assessmentId,
        studentId,
        submission
      )

      dispatch({ type: SUBMIT_GRADE, data: response })
      notification.success({
        message: 'sucessfully graded'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't grade assessment"
      })
    }
  }
}

export default submissionsReducer
