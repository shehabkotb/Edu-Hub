import React from 'react'
import { Form, Input, InputNumber, Select, Space, Typography } from 'antd'

const { Title } = Typography
const { Option } = Select

const QuestionHead = (props) => {
  const { question, form, updateQuestion, children, handleQuestionSubmit } =
    props

  const handleQuestionType = (value) => {
    updateQuestion({ type: value, question_number: question.question_number })
  }

  return (
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
      <Form form={form} onFinish={handleQuestionSubmit} name="question">
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
            <Form.Item noStyle name="type">
              <Select onSelect={handleQuestionType} placeholder="question type">
                <Option value="Esay">Essay question</Option>
                <Option value="MCQ">Choice question</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="points"
              rules={[
                {
                  required: true,
                  message: 'input points'
                }
              ]}
            >
              <InputNumber placeholder="Points" min={1} />
            </Form.Item>
          </Space>
        </div>

        <Form.Item
          name="question_text"
          rules={[
            {
              required: true,
              message: 'Please input your Question!'
            }
          ]}
          style={{ width: '60%' }}
        >
          <Input.TextArea rows={2} placeholder="Question body" />
        </Form.Item>
        {children}
      </Form>
    </div>
  )
}

export default QuestionHead
