import { Button, Divider, Form, Input, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const WrittenQuestionForm = (props) => {
  const [form] = Form.useForm()

  const { question, answer, handleAnswerSubmit, noOnlineAnswer } = props

  const [submitted, setSubmitted] = useState(answer ? true : undefined)

  useEffect(() => {
    setSubmitted(answer ? true : undefined)
  }, [answer])

  useEffect(() => {
    form.setFieldsValue({
      ans: answer?.studentAnswer || ''
    })
  }, [])

  useEffect(() => {
    if (submitted === false) {
      setTimeout(() => {
        form.submit()
      }, 2000)
    }
  }, [submitted])

  const handleFormSubmit = (values) => {
    handleAnswerSubmit(question.id, values.ans)
  }

  const handleSubmittedState = () => {
    setSubmitted(false)
  }

  return (
    <div
      style={{
        minWidth: '400px',
        backgroundColor: '#eee',
        borderRadius: '10px',
        padding: '20px 20px',
        width: '100%',
        marginTop: '20px'
      }}
    >
      <Form form={form} onFinish={handleFormSubmit} name="question">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
        >
          <Space>
            <Title style={{ margin: '0' }} level={5}>
              Question No: {question.question_number}
            </Title>
          </Space>
          <Space align="start">
            <Text strong>Points: {question.points}</Text>
          </Space>
        </div>

        <div style={{ marginTop: '16px' }}>
          <Title level={4}>{question.question_text}</Title>
        </div>
        {!noOnlineAnswer && (
          <>
            <Form.Item name="ans" style={{ width: '60%', marginTop: '28px' }}>
              <Input.TextArea
                onChange={handleSubmittedState}
                rows={4}
                placeholder="Answer"
              />
            </Form.Item>
            <Divider style={{ border: '1px solid #ccc' }} />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Space>
                <Button
                  disabled={submitted}
                  icon={
                    submitted ? (
                      <CheckCircleOutlined style={{ color: '#52c41a' }} />
                    ) : (
                      <CloseCircleOutlined />
                    )
                  }
                  onClick={() => form.submit()}
                >
                  Save
                </Button>
              </Space>
            </div>
          </>
        )}
      </Form>
    </div>
  )
}

export default WrittenQuestionForm
