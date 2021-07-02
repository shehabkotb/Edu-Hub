import submissionService from '../services/submissions'
import {
  LOAD_SUBMISSION,
  GET_ONE_SUBMISSION,
  UPDATE_SUBMISSION
} from '../actions/assessmentTaking'

import { notification } from 'antd'

const assessmentTakingReducer = (
  state = { submission: {}, loading: false },
  action
) => {
  switch (action.type) {
    case LOAD_SUBMISSION:
      return { submission: {}, loading: true }
    case GET_ONE_SUBMISSION:
      return { submission: action.data, loading: false }
    case UPDATE_SUBMISSION:
      return { submission: action.data, loading: false }
    default:
      return state
  }
}

export const getOneSubmission = (courseId, assessmentId, studentId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOAD_SUBMISSION })
      const response = await submissionService.getOrCreateSumbission(
        courseId,
        assessmentId,
        studentId
      )

      dispatch({ type: GET_ONE_SUBMISSION, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't load Exams check your connection"
      })
    }
  }
}

export const submitAnswers = (
  courseId,
  assessmentId,
  studentId,
  questionId,
  newAnswer
) => {
  return async (dispatch, getState) => {
    try {
      let answers = getState().assessmentTaking.submission.answers

      let alreadyAnswerd = false
      const newAnswers = answers.map((answer) => {
        if (answer.originQuestion === questionId) {
          alreadyAnswerd = true
          return {
            originQuestion: answer.originQuestion,
            studentAnswer: newAnswer,
            submitted: true
          }
        } else return answer
      })

      if (!alreadyAnswerd) {
        answers = answers.concat({
          originQuestion: questionId,
          studentAnswer: newAnswer,
          submitted: true
        })
      } else answers = newAnswers

      const response = await submissionService.updateSubmission(
        courseId,
        assessmentId,
        studentId,
        { answers: answers }
      )

      dispatch({ type: UPDATE_SUBMISSION, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't save answers"
      })
    }
  }
}

export const updateSubmission = (
  courseId,
  assessmentId,
  studentId,
  submission
) => {
  return async (dispatch) => {
    try {
      const response = await submissionService.updateSubmission(
        courseId,
        assessmentId,
        studentId,
        submission
      )

      dispatch({ type: UPDATE_SUBMISSION, data: response })
      notification.success({
        message: 'submitted successfully'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't Finish submission"
      })
    }
  }
}

export default assessmentTakingReducer
