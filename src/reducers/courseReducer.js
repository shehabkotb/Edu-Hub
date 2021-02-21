import courseService from '../services/courses'
import { CREATE_COURSE, GET_ALL_COURSES } from '../actions/course'

import { notification } from 'antd'

const courseReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_COURSES:
      return action.data
    case CREATE_COURSE:
      return state.concat({ ...action.data })
    default:
      return state
  }
}

/* actions for courses bellow */

export const getAllCourses = () => {
  return async (dispatch) => {
    try {
      const response = await courseService.getAllCourses()
      dispatch({ type: GET_ALL_COURSES, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't load Courses check your connection"
      })
    }
  }
}

export const createCourse = (course) => {
  return async (dispatch) => {
    try {
      const response = await courseService.createCourse(course)
      dispatch({ type: CREATE_COURSE, data: response })
      notification.success({
        message: 'Added course successfully'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't add course"
      })
    }
  }
}

export default courseReducer
