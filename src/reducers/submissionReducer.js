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
      return state
    default:
      return state
  }
}

/* actions for courses bellow */

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

// export const updateSubmission = (courseId, assessmentId, studentId, submission) => {
//     return async (dispatch) => {
//       try {
//         const response = await submissionService.updateSubmission(
//           courseId,
//           assessmentId,
//           studentId
//         )

//         dispatch({ type: GET_ONE_SUBMISSION, data: response })
//       } catch (error) {
//         console.log(error)
//         notification.error({
//           message: "Couldn't load Exams check your connection"
//         })
//       }
//     }
//   }

export default assessmentTakingReducer
