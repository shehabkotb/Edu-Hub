import assessmentsService from '../services/assessments'
import { LOAD_EXAMS, GET_ALL_EXAMS, CREATE_EXAM } from '../actions/exams'

import { notification } from 'antd'

const examReducer = (state = { data: [], loading: false }, action) => {
  switch (action.type) {
    case LOAD_EXAMS:
      return { data: [], loading: true }
    case GET_ALL_EXAMS:
      return { data: action.data, loading: false }
    case CREATE_EXAM:
      return { data: action.data, loading: false }
    default:
      return state
  }
}

/* actions for courses bellow */

export const getAllExams = (courseId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOAD_EXAMS })
      const response = await assessmentsService.getAllExams(courseId)

      dispatch({ type: GET_ALL_EXAMS, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't load Exams check your connection"
      })
    }
  }
}

export default examReducer
