import courseService from '../services/courses'
import {
  LOAD_COURSES,
  CREATE_COURSE,
  GET_ALL_COURSES,
  DELETE_COURSE,
  LOAD_ENROLLMENT,
  ENROLL_COURSE,
  UN_ENROLL_COURSE,
  UPDATE_COURSE
} from '../actions/course'

import { notification } from 'antd'

const courseReducer = (state = { data: [], loading: false }, action) => {
  switch (action.type) {
    case LOAD_COURSES:
      return { data: state.data, loading: true }
    case GET_ALL_COURSES:
      return { data: action.data, loading: false }
    case UPDATE_COURSE:
      return {
        data: state.data.map((course) => {
          if (course.id === action.courseId)
            return {
              ...action.data,
              enrolled: course.enrolled,
              privilege: course.privilege
            }
          else return course
        }),
        loading: false
      }
    case CREATE_COURSE:
      return { data: action.data, loading: false }
    case DELETE_COURSE:
      return {
        data: state.data.filter((course) => course.id !== action.courseId),
        loading: false
      }
    case ENROLL_COURSE:
      return { data: action.data, loading: false }
    case UN_ENROLL_COURSE:
      return { data: action.data, loading: false }
    case LOAD_ENROLLMENT:
      return {
        data: state.data.map((course) => {
          if (course.id === action.courseId)
            return { ...course, loadingEnroll: true }
          else return course
        }),
        loading: false
      }
    default:
      return state
  }
}

export const getAllCourses = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOAD_COURSES })
      const response = await courseService.getAllCourses()
      dispatch({ type: GET_ALL_COURSES, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: `Couldn't load Courses`
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

export const deleteCourse = (courseId) => {
  return async (dispatch) => {
    try {
      await courseService.deleteCourse(courseId)
      dispatch({ type: DELETE_COURSE, courseId })
      notification.success({
        message: 'deleted course successfully'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't delete course"
      })
    }
  }
}

export const enroll = (courseId, userId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOAD_ENROLLMENT, courseId })
      const response = await courseService.enrollCourse(courseId, userId)
      dispatch({ type: ENROLL_COURSE, data: response })
      notification.success({
        message: 'enrolled successfully'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't enroll in course"
      })
    }
  }
}

export const unEnroll = (courseId, userId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOAD_ENROLLMENT, courseId })
      const response = await courseService.UnenrollCourse(courseId, userId)
      dispatch({ type: UN_ENROLL_COURSE, data: response })
      notification.success({
        message: 'Unenrolled successfully'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't Unenroll"
      })
    }
  }
}

export default courseReducer
