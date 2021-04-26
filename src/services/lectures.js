import axios from 'axios'
import { getAuthHeader } from './config'

import { baseURL as coursesURL } from './courses'

const baseURL = '/lectures'

const getLecturesURL = (courseId) => {
  return `${coursesURL}/${courseId}${baseURL}`
}

const getAllLectures = async (courseId) => {
  const response = await axios.get(getLecturesURL(courseId))
  return response.data
}

const getLecturesData = async (videoIds) => {
  const response = await axios.get(
    'https://youtube.googleapis.com/youtube/v3/videos',
    {
      params: {
        part: 'snippet,contentDetails',
        id: videoIds,
        key: process.env.REACT_APP_YOUTUBE_API_KEY
      }
    }
  )
  return response.data
}

const getLectureComments = async (courseId, moduleItemId) => {
  const response = await axios.get(
    `${coursesURL}/${courseId}${baseURL}/${moduleItemId}/comments`
  )
  return response.data
}

const createLectureComment = async (courseId, moduleItemId, comment) => {
  const response = await axios.post(
    `${coursesURL}/${courseId}${baseURL}/${moduleItemId}/comments`,
    comment,
    getAuthHeader()
  )
  return response.data
}

const deleteLectureComment = async (courseId, moduleItemId, commentId) => {
  const response = await axios.delete(
    `${coursesURL}/${courseId}${baseURL}/${moduleItemId}/comments/${commentId}`,
    getAuthHeader()
  )
  return response.data
}

const lectureService = {
  getAllLectures,
  getLecturesData,
  getLectureComments,
  createLectureComment,
  deleteLectureComment
}
export default lectureService
