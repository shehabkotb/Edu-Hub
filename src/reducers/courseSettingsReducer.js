import courseService from '../services/courses'

import { notification } from 'antd'
import { UPDATE_COURSE } from '../actions/course'

const LOAD_COURSE_SETTINGS = 'LOAD_COURSE_SETTINGS'
const GET_ONE_COURSE = 'GET_ONE_COURSE'
const UPDATE_COURSE_SETTINGS = 'UPDATE_COURSE_SETTINGS'

const courseSettingsReducer = (
  state = { data: {}, loading: false },
  action
) => {
  switch (action.type) {
    case LOAD_COURSE_SETTINGS:
      return { data: {}, loading: true }
    case GET_ONE_COURSE:
      return { data: action.data, loading: false }
    case UPDATE_COURSE_SETTINGS:
      return { data: action.data, loading: false }
    default:
      return state
  }
}

export const getOneCourse = (courseId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOAD_COURSE_SETTINGS })
      const response = await courseService.getOneCourse(courseId)

      dispatch({ type: GET_ONE_COURSE, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't load Course Settings"
      })
    }
  }
}

export const updateCourse = (courseId, course) => {
  return async (dispatch) => {
    try {
      const response = await courseService.updateCourse(courseId, course)

      dispatch({ type: UPDATE_COURSE_SETTINGS, data: response })
      dispatch({ type: UPDATE_COURSE, data: response, courseId: courseId })
      notification.success({
        message: 'saved successfully'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't update course settings"
      })
    }
  }
}

export const endCourse = (courseId) => {
  return async (dispatch) => {
    try {
      await courseService.endCourse(courseId)

      notification.success({
        message: 'course ended'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't end course"
      })
    }
  }
}

export default courseSettingsReducer
