import axios from 'axios'
import { getAuthHeader } from './config'

const getOrCreateSumbission = async (courseId, assessmentId, studentId) => {
  const response = await axios.get(
    `/${courseId}/assessments/${assessmentId}/submissions/${studentId}`,
    getAuthHeader()
  )
  return response.data
}

const submissionService = {
  getOrCreateSumbission
}

export default submissionService
