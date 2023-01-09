import React from 'react'
import ChoiceQuestionForm from './ChoiceQuestionForm'
import WrittenQuestionForm from './WrittenQuestionForm'

import PerviewChoiceQuestion from './PerviewChoiceQuestion'
import PerviewWrittenQuestion from './PerviewWrittenQuestion'
import { Button } from 'antd'

import { PlusOutlined } from '@ant-design/icons'

const QuestionList = (props) => {
  const {
    questions,
    updateQuestion,
    deleteQuestion,
    draftQuestion,
    createQuestion
  } = props

  return (
    <>
      {questions?.map((question, index) => {
        if (question.type === 'MCQ' && question.status === 'DRAFT')
          return (
            <ChoiceQuestionForm
              question={question}
              key={index}
              updateQuestion={updateQuestion}
              deleteQuestion={() => deleteQuestion(question)}
            />
          )
        else if (question.type === 'MCQ')
          return (
            <PerviewChoiceQuestion
              key={index}
              draftQuestion={draftQuestion}
              question={question}
            />
          )
        if (question.type === 'Esay' && question.status === 'DRAFT')
          return (
            <WrittenQuestionForm
              question={question}
              key={index}
              updateQuestion={updateQuestion}
              deleteQuestion={() => deleteQuestion(question)}
            />
          )
        else if (question.type === 'Esay')
          return (
            <PerviewWrittenQuestion
              key={index}
              draftQuestion={draftQuestion}
              question={question}
            />
          )
        return null
      })}
      <div style={{ width: '30%', margin: '0 auto' }}>
        <Button
          type="dashed"
          block
          icon={<PlusOutlined />}
          style={{ marginTop: '32px' }}
          onClick={() => createQuestion()}
        >
          Add Question
        </Button>
      </div>
    </>
  )
}

export default QuestionList
