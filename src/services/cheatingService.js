import axios from 'axios'
import { getAuthHeader } from './config'

export const baseURL = '/cheatingDetection'

const batchInc = async (examId) => {
  axios.post(`${baseURL}/checkCheating`,{examId:examId}, getAuthHeader()).catch(e=>console.log(e))
  return {}
}

const clear = async () => {
  const response = await axios
    .delete(`${baseURL}/clear`, getAuthHeader())
    .catch((e) => console.log(e))
  return response.data
}

const cheatingService = { batchInc, clear };

export default cheatingService;