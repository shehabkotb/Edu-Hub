import { Form, Input, Radio, Row, Space, Tag, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

const ChoiceQuestion = (props) => {
  const { question, studentAnswer } = props

  const [form] = Form.useForm()

  // const handleFormSubmit = (values) => {
  //   handleAnswerSubmit(question.id, values.ans)
  // }

  // const handleSubmittedState = () => {
  //   setSubmitted(false)
  // }

  return (
    <>
      <div
        style={{
          minWidth: '400px',
          backgroundColor: '#eee',
          borderRadius: '5px',
          padding: '20px 20px',
          width: '100%',
          marginTop: '20px'
        }}
      >
        <Form form={form} name="question">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}
          >
            <Space>
              <Title style={{ margin: '0' }} level={4}>
                Question No: {question.question_number}
              </Title>
            </Space>
            <Space align="center">
              <Form.Item
                initialValue={question.score}
                noStyle
                name="score"
                rules={[
                  {
                    required: true,
                    message: 'input score'
                  }
                ]}
              >
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Input
                    style={{ width: '35%' }}
                    size="small"
                    placeholder="Score"
                    min={0}
                  />
                </div>
              </Form.Item>
              <Text strong>/ {question.points}</Text>
            </Space>
          </div>

          <div style={{ marginTop: '24px' }}>
            <Title level={4}>{question.question_text}</Title>
          </div>
          <Title style={{ margin: '0', marginTop: '32px' }} level={5}>
            Student Answer
          </Title>

          {question.choices?.map((choice, index) => (
            <Row style={{ margin: '24px 0' }} key={index}>
              <Radio checked={choice === studentAnswer} disabled={true} />
              {choice}
              {choice === question.ans && (
                <Tag style={{ marginLeft: '6px' }} color="green">
                  Model answer
                </Tag>
              )}
              {choice === studentAnswer && (
                <Tag style={{ marginLeft: '6px' }} color="geekblue">
                  Student answer
                </Tag>
              )}
            </Row>
          ))}
        </Form>
      </div>
    </>
  )
}

export default ChoiceQuestion
