import axios from 'axios'
import { getAuthHeader } from './config'

const baseURL = '/enrollments'

const getEnrollments = async (courseId) => {
  const response = await axios.get(`/${courseId}${baseURL}`, getAuthHeader())

  return response.data
}

const updateEnrollment = async (courseId, enrollmentId, enrolledAs) => {
  const response = await axios.post(
    `/${courseId}${baseURL}`,
    {
      enrollmentId,
      enrolledAs
    },
    getAuthHeader()
  )
  return response.data
}

const enrollmentsService = {
  getEnrollments,
  updateEnrollment
}
export default enrollmentsService
