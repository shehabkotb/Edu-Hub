import axios from 'axios'
import { getAuthHeader } from './config'

const baseURL = '/assessments'

const getAllExams = async (courseId) => {
  const response = await axios.get(`/${courseId}${baseURL}`, getAuthHeader())
  return response.data
}

// getAllAssignments

const submitAssessment = async (courseId, assessment) => {
  const response = await axios.post(
    `/${courseId}${baseURL}`,
    assessment,
    getAuthHeader()
  )
  return response.data
}

const assessmentsService = {
  getAllExams,
  submitAssessment
}
export default assessmentsService
