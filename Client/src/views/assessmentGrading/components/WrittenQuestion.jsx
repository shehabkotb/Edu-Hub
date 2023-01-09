import {
  Form,
  InputNumber,
  Space,
  Typography,
  Divider,
  Tag,
  Checkbox
} from 'antd'
import React from 'react'

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

        <Divider />

        <Space>
          <Checkbox checked={question?.auto_graded} disabled={true}>
            Auto-Graded
          </Checkbox>

          <Checkbox checked={question?.text_match} disabled={true}>
            TextMatch
          </Checkbox>

          {question.keywords?.length !== 0 && (
            <>
              <Text strong>Key Words: </Text>
              {question.keywords?.map((element, index) => {
                return (
                  <Tag key={index} color="red">
                    {element.key_word} : {element.weight}
                  </Tag>
                )
              })}
            </>
          )}
        </Space>
      </div>
    </>
  )
}

export default WrittenQuestion
