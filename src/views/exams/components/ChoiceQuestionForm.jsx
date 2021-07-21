import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Space,
  Typography
} from 'antd'
import React, { useEffect, useState } from 'react'
import Styled from 'styled-components'
import QuestionHead from './QuestionHead'

import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const CenteredCol = Styled(Col)`
  display: flex;
  justify-content: center;
`

const ChoiceQuestionForm = (props) => {
  const [newOptionInput, setnewOptionInput] = useState(false)

  const { question, updateQuestion, deleteQuestion } = props
  const [controlledChoice, setControlledChoice] = useState('')

  const [choices, setChoices] = useState(question.choices || [])
  const [ans, setAns] = useState(question.ans || '')

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      type: question.type,
      points: question.points,
      question_text: question.question_text,
      auto_graded: question.auto_graded
    })
  }, [question, form])

  const handleAnswerCheck = (e) => {
    if (e.target.checked === false) setAns('')
    if (e.target.checked === true) setAns(e.target.name)
  }

  const handleControlledChoice = (e) => {
    setControlledChoice(e.target.value)
  }

  const handleQuestionSubmit = (values) => {
    updateQuestion({
      ...values,
      question_number: question.question_number,
      choices: choices,
      ans: ans,
      status: undefined
    })
  }

  const addChoice = (choice) => {
    setChoices(choices.concat(choice))
    setControlledChoice('')
  }

  const removeChoice = (removedChoice) => {
    if (removedChoice === ans) setAns('')
    setChoices(choices.filter((c) => c !== removedChoice))
  }

  return (
    <>
      <QuestionHead
        updateQuestion={updateQuestion}
        question={question}
        form={form}
        handleQuestionSubmit={handleQuestionSubmit}
      >
        <Row style={{ marginBottom: '16px' }}>
          <Col span={16}>
            <Title level={4}>Answer</Title>
          </Col>
          <CenteredCol span={4}>
            <Text strong>Correct</Text>
          </CenteredCol>
          <CenteredCol span={4}>
            <Text strong>Cancel</Text>
          </CenteredCol>
        </Row>

        {choices?.map((choice, index) => (
          <Row style={{ margin: '24px 0' }} key={index}>
            <Col span={16}>
              <Radio disabled={true} />
              {choice}
            </Col>
            <CenteredCol span={4}>
              <Checkbox
                name={choice}
                onChange={handleAnswerCheck}
                checked={choice === ans}
                disabled={ans && choice !== ans}
              />
            </CenteredCol>
            <CenteredCol span={4}>
              <Button
                icon={<DeleteOutlined />}
                style={{
                  border: '0px',
                  background: 'none'
                }}
                onClick={() => removeChoice(choice)}
              ></Button>
            </CenteredCol>
          </Row>
        ))}

        <Space align="baseline">
          <Button
            icon={<PlusCircleOutlined />}
            style={{ border: '0px', marginLeft: '-4px', background: 'none' }}
            onClick={() => setnewOptionInput(!newOptionInput)}
          ></Button>
          {newOptionInput ? (
            <>
              <Input
                value={controlledChoice}
                onChange={handleControlledChoice}
                placeholder="Add Option"
              />
              <Button
                type="primary"
                onClick={() => addChoice(controlledChoice)}
              >
                Add
              </Button>
            </>
          ) : (
            <Text strong>Add Option</Text>
          )}
        </Space>

        <Divider style={{ border: '1px solid #ccc', margin: '20px 0px' }} />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Space>
            <Form.Item
              noStyle
              name="auto_graded"
              initialValue={false}
              valuePropName="checked"
            >
              <Checkbox>Auto-Graded</Checkbox>
            </Form.Item>
          </Space>
          <Space>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => deleteQuestion(question.question_number)}
            >
              delete
            </Button>
          </Space>
        </div>
      </QuestionHead>
    </>
  )
}

export default ChoiceQuestionForm
