import axios from 'axios'
import { getAuthHeader } from './config'

export const baseURL = '/cheatingDetection'

const batchInc = async (examId) => {
  const response = await axios.post(`${baseURL}/checkCheating`,{examId:examId}, getAuthHeader())
  return response.data
}

const clear = async () => {
  const response = await axios.delete(`${baseURL}/clear`, getAuthHeader())
  return response.data
}

const cheatingService = { batchInc, clear };

export default cheatingService;