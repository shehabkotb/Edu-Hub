import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Space,
  Tag,
  Typography
} from 'antd'
import React, { useEffect, useState } from 'react'
import QuestionHead from './QuestionHead'

import { PlusCircleOutlined } from '@ant-design/icons'

const { Title } = Typography

const WrittenQuestionForm = (props) => {
  const [form] = Form.useForm()

  const { question, updateQuestion, deleteQuestion } = props

  useEffect(() => {
    form.setFieldsValue({
      type: question.type,
      question_text: question.question_text,
      points: question.points,
      ans: question.ans,
      auto_graded: question.auto_graded,
      text_match: question.text_match
    })
  }, [question, form])

  const [controlledWeight, setControlledWeight] = useState(0.1)
  const [controlledKeyWord, setControlledKeyWord] = useState('')

  const handleControlledWeight = (e) => {
    setControlledWeight(e.target.value)
  }

  const handleControlledKeyWord = (e) => {
    setControlledKeyWord(e.target.value)
  }

  const [weights, setWeights] = useState(question.keywords || [])

  const addWeight = (word, weight) => {
    if (!word || !weight) return
    else {
      setWeights(weights.concat({ key_word: word, weight }))
      setControlledKeyWord('')
    }
  }

  const removeWeight = (removedWeight) => {
    const newWeights = weights.filter(
      (element) => element['key_word'] !== removedWeight
    )

    setWeights(newWeights)
  }

  const handleQuestionSubmit = (values) => {
    updateQuestion({
      ...values,
      question_number: question.question_number,
      keywords: weights,
      status: undefined
    })
  }

  return (
    <QuestionHead
      updateQuestion={updateQuestion}
      question={question}
      form={form}
      handleQuestionSubmit={handleQuestionSubmit}
    >
      <Title style={{ margin: '0', marginBottom: '24px' }} level={4}>
        Answer
      </Title>
      <Form.Item
        name="ans"
        rules={[
          {
            required: true,
            message: 'Please input your Answer!'
          }
        ]}
        style={{ width: '60%', marginBottom: '16px' }}
      >
        <Input.TextArea rows={4} placeholder="Answer" />
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
          <Form.Item noStyle name="auto_graded" valuePropName="checked">
            <Checkbox>Auto-Graded</Checkbox>
          </Form.Item>
          <Form.Item
            noStyle
            defaultCh
            name="text_match"
            valuePropName="checked"
          >
            <Checkbox>TextMatch</Checkbox>
          </Form.Item>
          {weights?.map((element, index) => {
            return (
              <Tag
                key={element['key_word']}
                color="red"
                closable
                onClose={() => removeWeight(element['key_word'])}
              >
                {element['key_word']} : {element.weight}
              </Tag>
            )
          })}
          <Input
            size="small"
            style={{ width: '70px' }}
            placeholder="keyWord"
            value={controlledKeyWord}
            onChange={handleControlledKeyWord}
            onPressEnter={() => addWeight(controlledKeyWord, controlledWeight)}
          />
          <Input
            size="small"
            style={{ width: '50px' }}
            placeholder="weight eg. 0.2"
            value={controlledWeight}
            onChange={handleControlledWeight}
          />
          <Button
            type="text"
            icon={<PlusCircleOutlined />}
            onClick={() => addWeight(controlledKeyWord, controlledWeight)}
          ></Button>
        </Space>
        <Space>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
          <Button
            danger
            type="primary"
            onClick={() => {
              deleteQuestion(question.question_number)
            }}
          >
            delete
          </Button>
        </Space>
      </div>
    </QuestionHead>
  )
}

export default WrittenQuestionForm
