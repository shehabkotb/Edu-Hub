import assessmentsService from '../services/assessments'
import {
  ADD_QUESTION,
  REPLACE_QUESTION,
  REMOVE_QUESTION,
  EDIT_QUESTION,
  SUBMIT_ASSESSMENT,
  CLEAR
} from '../actions/assessment'

import { notification } from 'antd'

const assessmentCreationReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case ADD_QUESTION:
      return {
        ...state,
        questions: state.questions.concat(action.data)
      }
    case REPLACE_QUESTION:
      return {
        ...state,
        questions: action.data
      }
    case REMOVE_QUESTION:
      return { ...state, questions: action.data }
    case EDIT_QUESTION:
      return {
        ...state,
        questions: action.data
      }
    case SUBMIT_ASSESSMENT:
      return state
    case CLEAR:
      return { questions: [] }
    default:
      return state
  }
}

export const addQuestion = () => {
  return async (dispatch, getState) => {
    try {
      const { assessmentCreation } = getState()
      const maxIndex = assessmentCreation.questions.reduce(
        (accumulator, question) => {
          return Math.max(question.question_number, accumulator)
        },
        0
      )

      dispatch({
        type: ADD_QUESTION,
        data: { question_number: maxIndex + 1, type: 'Esay', status: 'DRAFT' }
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't add question"
      })
    }
  }
}

export const replaceQuestion = (replacmentQuestion) => {
  return async (dispatch, getState) => {
    try {
      const { assessmentCreation } = getState()

      const questions = assessmentCreation.questions.map((question) => {
        if (question.question_number === replacmentQuestion.question_number)
          return {
            question_number: question.question_number,
            status: replacmentQuestion.status || question.status,
            ...replacmentQuestion
          }
        else return question
      })
      dispatch({
        type: REPLACE_QUESTION,
        data: questions
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't save question"
      })
    }
  }
}

export const removeQuestion = (removedQuestion) => {
  return async (dispatch, getState) => {
    try {
      const { assessmentCreation } = getState()

      let questions = assessmentCreation.questions.filter(
        (question) =>
          question.question_number !== removedQuestion.question_number
      )

      questions = questions.map((question, index) => ({
        ...question,
        question_number: index + 1
      }))

      dispatch({
        type: REMOVE_QUESTION,
        data: questions
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't remove question"
      })
    }
  }
}

export const markForEdit = (index) => {
  return async (dispatch, getState) => {
    try {
      const { assessmentCreation } = getState()

      const questions = assessmentCreation.questions.map((question) => {
        if (question.question_number === index)
          return { ...question, status: 'DRAFT' }
        else return question
      })

      dispatch({
        type: EDIT_QUESTION,
        data: questions
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't edit question"
      })
    }
  }
}

export const submitAssessment = (courseId, assessment) => {
  return async (dispatch) => {
    try {
      const response = await assessmentsService.submitAssessment(
        courseId,
        assessment
      )

      dispatch({
        type: SUBMIT_ASSESSMENT,
        data: response
      })
      notification.success({
        message: 'Added assessment successfully'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't submit assessment"
      })
    }
  }
}

export const clear = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CLEAR
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't clear assessments"
      })
    }
  }
}

export default assessmentCreationReducer
