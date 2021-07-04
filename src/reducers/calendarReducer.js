import deadlinesService from '../services/deadlines'

import { notification } from 'antd'

const LOAD_CALENDAR = 'LOAD_CALENDAR'
const GET_ALL_CALENDAR_EVENTS = 'GET_ALL_CALENDAR_EVENTS'

const calendarReducer = (state = { data: {}, loading: false }, action) => {
  switch (action.type) {
    case LOAD_CALENDAR:
      return { data: {}, loading: true }
    case GET_ALL_CALENDAR_EVENTS:
      return { data: action.data, loading: false }
    default:
      return state
  }
}

export const getAllCalendarEvents = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOAD_CALENDAR })
      const response = await deadlinesService.getDeadLinesCalendar()

      dispatch({ type: GET_ALL_CALENDAR_EVENTS, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't load calendar events"
      })
    }
  }
}

export default calendarReducer
