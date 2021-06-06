import submissionService from '../services/submissions'
import { GET_ALL_SUBMISSIONS, LOAD_SUBMISSIONS } from '../actions/submissions'

import { notification } from 'antd'

const assessmentTakingReducer = (
  state = { submissions: {}, loading: false },
  action
) => {
  switch (action.type) {
    case LOAD_SUBMISSIONS:
      return { data: {}, loading: true }
    case GET_ALL_SUBMISSIONS:
      return { data: action.data, loading: false }
    default:
      return state
  }
}

export const getAllSubmissions = (courseId, assessmentId) => {
  return async (dispatch) => {
    try {
      const response = await submissionService.getAll(courseId, assessmentId)

      dispatch({ type: GET_ALL_SUBMISSIONS, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't load Submissions check your connection"
      })
    }
  }
}

export const gradeQuestions = (submissionId, questionId, score) => {
  return async (dispatch, getState) => {
    try {
      debugger
      let totalGrade = 0
      const { submissions } = getState()

      const newSubmissions = submissions.data.submissions.map((submission) => {
        if (submission.id === submissionId) {
          const newAnswers = submission.answers.map((answer) => {
            if (answer.originQuestion.id === questionId) {
              totalGrade += parseInt(score)
              return { ...answer, score: score }
            } else {
              if (answer.score) totalGrade += parseInt(answer.score)
              return answer
            }
          })
          return { ...submission, answers: newAnswers, score: totalGrade }
        } else return submission
      })

      dispatch({
        type: GET_ALL_SUBMISSIONS,
        data: { ...newSubmissions, score: totalGrade }
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't grade question"
      })
    }
  }
}

export default assessmentTakingReducer
