import axios from 'axios'
import { getAuthHeader } from './config'

export const baseURL = '/courses'

const getAllCourses = async () => {
  const response = await axios.get(`${baseURL}`, {
    ...getAuthHeader()
    // params: { filter: 'published' }
  })
  return response.data
}

const getOneCourse = async (courseId) => {
  const response = await axios.get(`${baseURL}/${courseId}`, getAuthHeader())
  return response.data
}

const updateCourse = async (courseId, course) => {
  const response = await axios.put(
    `${baseURL}/${courseId}`,
    course,
    getAuthHeader()
  )
  return response.data
}

const endCourse = async (courseId) => {
  const response = await axios.post(
    `${baseURL}/${courseId}/end-course`,
    null,
    getAuthHeader()
  )
  return response.data
}

const createCourse = async (course) => {
  const response = await axios.post(`${baseURL}`, course, getAuthHeader())
  return response.data
}

const deleteCourse = async (courseId) => {
  const response = await axios.delete(`${baseURL}/${courseId}`, getAuthHeader())
  return response.data
}

const enrollCourse = async (courseId, userId) => {
  const response = await axios.post(
    `${baseURL}/${courseId}/enroll`,
    { userId },
    getAuthHeader()
  )
  return response.data
}

const UnenrollCourse = async (courseId, userId) => {
  const response = await axios.post(
    `${baseURL}/${courseId}/un-enroll`,
    { userId },
    getAuthHeader()
  )
  return response.data
}

const courseService = {
  getAllCourses,
  getOneCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  UnenrollCourse,
  endCourse
}
export default courseService
