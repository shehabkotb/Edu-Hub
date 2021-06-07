import { Form, Input, InputNumber, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

const WrittenQuestion = (props) => {
  const { question, studentAnswer, field } = props

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
          <Space align="start">
            <Form.Item
              {...field}
              key={[field.name, 'score']}
              name={[field.name, 'score']}
              rules={[
                {
                  required: true,
                  message: 'input score'
                }
              ]}
            >
              <InputNumber
                keyboard={false}
                placeholder="Score"
                min={0}
                max={question.points}
              />
            </Form.Item>
            <Text style={{ fontSize: '18px' }} strong>
              / {question.points}
            </Text>
          </Space>
        </div>

        <div style={{ marginTop: '24px' }}>
          <Title level={4}>{question.question_text}</Title>
        </div>
        <Title style={{ margin: '0', marginTop: '32px' }} level={5}>
          Student Answer
        </Title>

        <Paragraph style={{ marginTop: '10px' }}>{studentAnswer}</Paragraph>

        <Title style={{ margin: '0', marginTop: '32px' }} level={5}>
          Model Answer
        </Title>

        <Paragraph style={{ marginTop: '10px' }}>{question.ans}</Paragraph>
      </div>
    </>
  )
}

export default WrittenQuestion
