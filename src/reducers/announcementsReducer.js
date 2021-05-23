import announcementService from '../services/announcements'
import {
  GET_ALL_ANNOUNCEMENTS,
  ADD_ANNOUNCEMENT,
  REMOVE_ANNOUNCEMENT
} from '../actions/announcements'
import checkModerationService from '../services/checkModeration'
import { notification } from 'antd'

const announcementsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_ANNOUNCEMENTS:
      return action.data.reverse()

    case ADD_ANNOUNCEMENT:
      return state
        .reverse()
        .concat({ ...action.data })
        .reverse()

    case REMOVE_ANNOUNCEMENT:
      return state.filter((val) => {
        return val._id !== action.data
      })

    default:
      return state
  }
}

export const getAllAnnouncements = (courseId) => {
  return async (dispatch) => {
    try {
      const response = await announcementService.getAllAnnouncements(courseId)
      dispatch({ type: GET_ALL_ANNOUNCEMENTS, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't load announcements check your connection"
      })
    }
  }
}

export const addAnnouncement = (courseId, data) => {
  return async (dispatch) => {
    try {
      const ver = await checkModerationService.check(data)
      if (ver) {
        const response = await announcementService.addAnnouncement(
          courseId,
          data
        )
        dispatch({ type: ADD_ANNOUNCEMENT, data: response })
        notification.success({
          message: 'Posted successfully'
        })
      } else {
        notification.error({
          message: 'Your post violates EduHub standards'
        })
      }
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't post check your connection"
      })
    }
  }
}

export const removeAnnouncement = (id) => {
  return async (dispatch) => {
    try {
      await announcementService.removeAnnouncement(id)
      dispatch({ type: REMOVE_ANNOUNCEMENT, data: id })
      notification.success({
        message: 'removed successfully'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't remove check your connection"
      })
    }
  }
}

export default announcementsReducer
