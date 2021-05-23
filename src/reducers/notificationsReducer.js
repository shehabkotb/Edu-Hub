import notificationsService from '../services/notifications'
import { GET_ALL, CREATE, EDIT, DEL, DEL_ALL } from '../actions/notification'
import { notification } from 'antd'

const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL:
      return action.data.reverse()

    case CREATE:
      return state
        .reverse()
        .concat({ ...action.data })
        .reverse()

    case DEL:
      return state.filter((val) => {
        return val._id !== action.data._id
      })

    case EDIT:
      return [
        state.map((val) => {
          if (val._id === action.data._id) {
            return action.data
          } else {
            return val
          }
        })
      ]

    case DEL_ALL:
      return []

    default:
      return state
  }
}

export const getAllNotifications = () => {
  return async (dispatch) => {
    try {
      const response = await notificationsService.getAllNotifications()
      dispatch({ type: GET_ALL, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't load notifications check your connection"
      })
    }
  }
}

export const push = (data) => {
  return async () => {
    try {
      await notificationsService.push(data)
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't push notification check your connection"
      })
    }
  }
}

export const create = (data, type, to) => {
  return async (dispatch) => {
    try {
      const response = await notificationsService.create(data, type, to)
      dispatch({ type: CREATE, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't create notification check your connection"
      })
    }
  }
}

export const edit = (oldNot, newNot) => {
  return async (dispatch) => {
    try {
      const response = await notificationsService.edit(oldNot, newNot)
      dispatch({ type: EDIT, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't edit notification check your connection"
      })
    }
  }
}

export const delAll = () => {
  return async (dispatch) => {
    try {
      const response = await notificationsService.delAll()
      dispatch({ type: DEL_ALL, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't clear notifications check your connection"
      })
    }
  }
}

export const del = (not) => {
  return async (dispatch) => {
    try {
      const response = await notificationsService.del(not)
      dispatch({ type: DEL, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't delete notification check your connection"
      })
    }
  }
}

export default notificationsReducer
