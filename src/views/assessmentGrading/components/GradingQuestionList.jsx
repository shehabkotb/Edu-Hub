import React, { useEffect } from 'react'

import WrittenQuestion from './WrittenQuestion'
import Styled from 'styled-components'
import ChoiceQuestion from './ChoiceQuestion'
import { useDispatch } from 'react-redux'
import { gradeQuestions } from '../../../reducers/submissionsReducer'
import { Empty, Form, Input } from 'antd'

const GradingQuestionList = (props) => {
  const dispatch = useDispatch()

  const { form, answers, submissionId } = props

  const saveQuestionGrade = (questionId, score) => {
    dispatch(gradeQuestions(submissionId, questionId, score))
  }

  useEffect(() => {}, [])

  return (
    <>
      <Form.List
        name="answers"
        initialValue={answers.map((answer) => ({
          ...answer,
          originQuestion: answer.originQuestion.id
        }))}
      >
        {(fields) => {
          return (
            <div>
              {fields.map((field) => {
                console.log(field)
                return (
                  <div key={field.name}>
                    <Form.Item
                      {...field}
                      key={[field.name, 'originQuestion']}
                      name={[field.name, 'originQuestion']}
                      hidden={true}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      key={[field.name, 'studentAnswer']}
                      name={[field.name, 'studentAnswer']}
                      hidden={true}
                    >
                      <Input />
                    </Form.Item>

                    {(() => {
                      if (answers?.[field.name]?.originQuestion.type === 'MCQ')
                        return (
                          <ChoiceQuestion
                            key={field.name}
                            question={answers[field.name].originQuestion}
                            studentAnswer={answers[field.name].studentAnswer}
                            field={field}
                          />
                        )
                      if (answers?.[field.name]?.originQuestion.type === 'Esay')
                        return (
                          <WrittenQuestion
                            key={field.name}
                            question={answers[field.name].originQuestion}
                            studentAnswer={answers[field.name].studentAnswer}
                            field={field}
                          />
                        )
                      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    })()}
                  </div>
                )
              })}
            </div>
          )
        }}
      </Form.List>
    </>
  )
}

export default GradingQuestionList
