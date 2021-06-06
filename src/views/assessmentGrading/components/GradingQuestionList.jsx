import React from 'react'

import WrittenQuestion from './WrittenQuestion'
import Styled from 'styled-components'
import ChoiceQuestion from './ChoiceQuestion'
import { useDispatch } from 'react-redux'
import { gradeQuestions } from '../../../reducers/submissionsReducer'

const GradingQuestionList = (props) => {
  const dispatch = useDispatch()

  const { answers, submissionId } = props

  const saveQuestionGrade = (questionId, score) => {
    dispatch(gradeQuestions(submissionId, questionId, score))
  }

  return (
    <>
      {answers?.map((question, index) => {
        if (question.originQuestion.type === 'MCQ')
          return (
            <ChoiceQuestion
              key={index}
              question={question.originQuestion}
              studentAnswer={question.studentAnswer}
              saveQuestionGrade={(score) =>
                saveQuestionGrade(question.originQuestion.id, score)
              }
            />
          )
        if (question.originQuestion.type === 'Esay')
          return (
            <WrittenQuestion
              key={index}
              question={question.originQuestion}
              studentAnswer={question.studentAnswer}
              saveQuestionGrade={(score) =>
                saveQuestionGrade(question.originQuestion.id, score)
              }
            />
          )
        return null
      })}
    </>
  )
}

export default GradingQuestionList
