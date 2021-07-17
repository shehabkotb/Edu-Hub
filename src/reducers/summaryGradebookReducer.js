import gradebookService from '../services/gradebook'
import { notification } from 'antd'

const GET_SUMMARY_OF_COURSE = 'GET_SUMMARY_OF_COURSE'

const summaryGradebookReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SUMMARY_OF_COURSE:
      return action?.data?.reverse() || []
    default:
      return state
  }
}

export const getSummaryOfCourse = (courseId) => {
  return async (dispatch) => {
    try {
      const response = await gradebookService.getSummaryOfCourse(courseId)
      dispatch({ type: GET_SUMMARY_OF_COURSE, data: response.studentGrades })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't fetch gradebook check your connection"
      })
    }
  }
}

export default summaryGradebookReducer
