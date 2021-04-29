import axios from 'axios'
import { getAuthHeader } from './config'

export const baseURL = '/notification'

const getAllNotifications = async () => {
  const response = await axios.get(
    `${baseURL}/getNotificationsOfUser`,
    getAuthHeader()
  )
  return response.data
}

const push = async (data) => {
  const response = await axios.post(
    `${baseURL}/push`,
    {
      data: data
    },
    getAuthHeader()
  )
  return response.data
}

const create = async (data, type, to) => {
  const response = await axios.post(
    `${baseURL}/createNotification`,
    {
      data: data,
      type: type,
      to: to
    },
    getAuthHeader()
  )
  return response.data
}

const edit = async (oldNot, newNot) => {
  const response = await axios.put(
    `${baseURL}/editNotification`,
    {
      oldNot: oldNot,
      newNot: newNot
    },
    getAuthHeader()
  )
  return response.data
}

const del = async (not) => {
  const response = await axios.delete(
    `${baseURL}/deleteNotification`,
    not,
    getAuthHeader()
  )
  return response.data
}

const delAll = async () => {
  const response = await axios.delete(
    `${baseURL}/deleteNotificationsOfUser`,
    getAuthHeader()
  )
  return response.data
}

const notificationsService = {
  getAllNotifications,
  push,
  create,
  edit,
  del,
  delAll
}
export default notificationsService
