import axios from 'axios'
import { getAuthHeader } from './config'

const getAll = async (courseId, assessmentId) => {
  const response = await axios.get(
    `/${courseId}/assessments/${assessmentId}/submissions/`,
    getAuthHeader()
  )
  return response.data
}

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
  getAll,
  getOrCreateSumbission,
  updateSubmission
}

export default submissionService
