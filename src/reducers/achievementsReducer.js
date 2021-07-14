import achievementsService from '../services/achievements'

import { notification } from 'antd'

const LOAD_ACHIEVEMENTS = 'LOAD_ACHIEVEMENTS'
const GET_ALL_ACHIEVEMNTS = 'GET_ALL_ACHIEVEMNTS'

const achievementsReducer = (state = { data: [], loading: false }, action) => {
  switch (action.type) {
    case LOAD_ACHIEVEMENTS:
      return { data: [], loading: true }
    case GET_ALL_ACHIEVEMNTS:
      return { data: action.data, loading: false }
    default:
      return state
  }
}

export const getAllAchievements = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOAD_ACHIEVEMENTS })
      const response = await achievementsService.getAllAchievements()

      dispatch({ type: GET_ALL_ACHIEVEMNTS, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't load achievements"
      })
    }
  }
}

export default achievementsReducer
