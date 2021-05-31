import axios from 'axios'
import { getAuthHeader } from './config'

const getOrCreateSumbission = async (courseId, assessmentId, studentId) => {
  const response = await axios.get(
    `/${courseId}/assessments/${assessmentId}/submissions/${studentId}`,
    getAuthHeader()
  )
  return response.data
}

const updateSubmission = async (
  courseId,
  assessmentId,
  studentId,
  submission
) => {
  const response = await axios.put(
    `/${courseId}/assessments/${assessmentId}/submissions/${studentId}`,
    submission,
    getAuthHeader()
  )
  return response.data
}

const submissionService = {
  getOrCreateSumbission,
  updateSubmission
}

export default submissionService
