import axios from 'axios'
import { getAuthHeader } from './config'

export const baseURL = '/announcements'

const getAllAnnouncements = async (courseId) => {
  const response = await axios.get(
    `${baseURL}/getAll/` + courseId,
    getAuthHeader()
  )
  return response.data
}

const addAnnouncement = async (courseId, data) => {
  const response = await axios.post(
    `${baseURL}/add`,
    {
      courseId: courseId,
      data: data
    },
    getAuthHeader()
  )
  return response.data
}

const removeAnnouncement = async (id) => {
  const response = await axios.delete(
    `${baseURL}/remove/` + id,
    getAuthHeader()
  )
  return response.data
}

const announcementService = {
  getAllAnnouncements,
  addAnnouncement,
  removeAnnouncement
}
export default announcementService