import deadlinesService from '../services/deadlines'

import { notification } from 'antd'

const LOAD_DEADLINES = 'LOAD_DEADLINES'
const GET_ALL_DEADLINES = 'GET_ALL_DEADLINES'

const deadlinesReducer = (state = { data: [], loading: false }, action) => {
  switch (action.type) {
    case LOAD_DEADLINES:
      return { data: [], loading: true }
    case GET_ALL_DEADLINES:
      return { data: action.data, loading: false }
    default:
      return state
  }
}

export const getAllDeadlines = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOAD_DEADLINES })
      const response = await deadlinesService.getDeadLines()

      dispatch({ type: GET_ALL_DEADLINES, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't load deadlines"
      })
    }
  }
}

export default deadlinesReducer
