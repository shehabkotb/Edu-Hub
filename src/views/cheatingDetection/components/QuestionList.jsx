import React from 'react'
import ChoiceQuestionForm from './ChoiceQuestionForm'
import WrittenQuestionForm from './WrittenQuestionForm'

const QuestionList = (props) => {
  const { questions, answers, handleAnswerSubmit } = props

  const getAnswer = (questionId) => {
    return answers.find((answer) => answer.originQuestion === questionId)
  }

  return (
    <>
      {questions.map((question) => {
        if (question.type === 'MCQ')
          return (
            <ChoiceQuestionForm
              key={question.id}
              question={question}
              answer={getAnswer(question.id)}
              handleAnswerSubmit={handleAnswerSubmit}
            />
          )
        if (question.type === 'Esay')
          return (
            <WrittenQuestionForm
              key={question.id}
              question={question}
              answer={getAnswer(question.id)}
              handleAnswerSubmit={handleAnswerSubmit}
            />
          )
        else return null
      })}
    </>
  )
}

export default QuestionList
