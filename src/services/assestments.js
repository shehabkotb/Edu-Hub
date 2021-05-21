import axios from 'axios'
import { getAuthHeader } from './config'

const baseURL = '/assestments'

const getAllExams = async (courseId) => {
  const response = await axios.get(`/${courseId}${baseURL}`, getAuthHeader())
  return response.data
}

// getAllAssignments

const assestmentsService = {
  getAllExams
}
export default assestmentsService
