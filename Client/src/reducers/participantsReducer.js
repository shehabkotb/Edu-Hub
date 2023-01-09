import enrollmentsService from '../services/enrollment'
import { notification } from 'antd'

const LOAD_PARTICIPANTS = 'LOAD_PARTICIPANTS'
const GET_ALL_PARTICIPANTS = 'GET_ALL_PARTICIPANTS'

const participantsReducer = (state = { data: [], loading: false }, action) => {
  switch (action.type) {
    case LOAD_PARTICIPANTS:
      return { data: [], loading: true }
    case GET_ALL_PARTICIPANTS:
      return { data: action.data, loading: false }
    default:
      return state
  }
}

export const getAllParticipants = (courseId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOAD_PARTICIPANTS })
      const response = await enrollmentsService.getEnrollments(courseId)

      dispatch({ type: GET_ALL_PARTICIPANTS, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't load Particpants check your connection"
      })
    }
  }
}

export const updatePrivilege = (courseId, enrollmentId, enrolledAs) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOAD_PARTICIPANTS })
      const response = await enrollmentsService.updateEnrollment(
        courseId,
        enrollmentId,
        enrolledAs
      )

      dispatch({ type: GET_ALL_PARTICIPANTS, data: response })
      notification.success({
        message: 'Sucessfully updated privilege'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't update Privilege check your connection"
      })
    }
  }
}

export default participantsReducer
