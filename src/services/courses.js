import axios from 'axios'
import { getAuthHeader } from './config'

const baseURL = '/courses'

const getAllCourses = async () => {
  const response = await axios.get(`${baseURL}`)
  return response.data
}

const createCourse = async (course) => {
  const response = await axios.post(`${baseURL}`, course, getAuthHeader())
  return response.data
}

const courseService = { getAllCourses, createCourse }
export default courseService
