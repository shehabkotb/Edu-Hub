import assessmentsService from '../services/assessments'

import { notification } from 'antd'

const LOAD_ASSIGNMENTS = 'LOAD_ASSIGNMENTS'
const GET_ALL_ASSIGNMENTS = 'GET_ALL_ASSIGNMENTS'
const DELETE_ASSIGNMENTS = 'DELETE_ASSIGNMENTS'

const assignmentReducer = (state = { data: [], loading: false }, action) => {
  switch (action.type) {
    case LOAD_ASSIGNMENTS:
      return { data: [], loading: true }
    case GET_ALL_ASSIGNMENTS:
      return { data: action.data, loading: false }
    case DELETE_ASSIGNMENTS:
      return {
        data: state.data.filter(
          (assignment) => assignment.id !== action.assignmentId
        ),
        loading: false
      }
    default:
      return state
  }
}

export const getAllAssignments = (courseId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOAD_ASSIGNMENTS })
      const response = await assessmentsService.getAllAssignments(courseId)

      dispatch({ type: GET_ALL_ASSIGNMENTS, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't load Assignments check your connection"
      })
    }
  }
}

export const deleteAssignment = (courseId, assessmentId) => {
  return async (dispatch) => {
    try {
      await assessmentsService.deleteAssessment(courseId, assessmentId)

      dispatch({ type: DELETE_ASSIGNMENTS, assignmentId: assessmentId })
      notification.success({
        message: 'sucessfully deleted assignment'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't delete assignment"
      })
    }
  }
}

export default assignmentReducer
