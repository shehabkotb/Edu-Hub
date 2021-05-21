import axios from 'axios'
import { getAuthHeader } from './config'

export const baseURL = '/courses'

const getAllCourses = async () => {
  const response = await axios.get(`${baseURL}`, getAuthHeader())
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
  createCourse,
  deleteCourse,
  enrollCourse,
  UnenrollCourse
}
export default courseService
