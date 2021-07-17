import gradebookService from '../services/gradebook'
import { notification } from 'antd'

const GET_SUBS_OF_COURSE = 'GET_SUBS_OF_COURSE'

const gradebookReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SUBS_OF_COURSE:
      return action.data.reverse()

    default:
      return state
  }
}

export const getSubsOfCourse = (courseId) => {
  return async (dispatch) => {
    try {
      const response = await gradebookService.getSubsOfCourse(courseId)
      dispatch({ type: GET_SUBS_OF_COURSE, data: response })
    } catch (error) {
      notification.error({
        message: "Couldn't fetch gradebook check your connection: "
      })
    }
  }
}

export default gradebookReducer
