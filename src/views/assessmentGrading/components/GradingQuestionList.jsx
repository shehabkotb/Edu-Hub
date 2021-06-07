import React, { useEffect } from 'react'
import WrittenQuestion from './WrittenQuestion'
import ChoiceQuestion from './ChoiceQuestion'

import { Empty, Form, Input } from 'antd'

const GradingQuestionList = (props) => {
  const { form, answers } = props

  useEffect(() => {
    form.resetFields()
  }, [answers])

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
