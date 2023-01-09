import assessmentsService from '../services/assessments'

import { notification } from 'antd'

const LOAD_EXAMS = 'LOAD_EXAMS'
const GET_ALL_EXAMS = 'GET_ALL_EXAMS'
const DELETE_EXAM = 'DELETE_EXAM'

const examReducer = (state = { data: [], loading: false }, action) => {
  switch (action.type) {
    case LOAD_EXAMS:
      return { data: [], loading: true }
    case GET_ALL_EXAMS:
      return { data: action.data, loading: false }
    case DELETE_EXAM:
      return {
        data: state.data.filter((exam) => exam.id !== action.examId),
        loading: false
      }
    default:
      return state
  }
}

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

export const deleteExam = (courseId, assessmentId) => {
  return async (dispatch) => {
    try {
      await assessmentsService.deleteAssessment(courseId, assessmentId)

      dispatch({ type: DELETE_EXAM, examId: assessmentId })
      notification.success({
        message: 'sucessfully deleted exam'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't delete Exam"
      })
    }
  }
}

export default examReducer
