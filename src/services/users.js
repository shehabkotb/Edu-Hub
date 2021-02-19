import axios from 'axios'
import { getAuthHeader } from './config'

const baseURL = '/users'

const login = async (credentials) => {
  const response = await axios.post(`${baseURL}/login`, credentials)
  return response.data
}

const logout = async () => {
  await axios.post(`${baseURL}/logout`, undefined, getAuthHeader())
}

const usersService = { login, logout }
export default usersService
