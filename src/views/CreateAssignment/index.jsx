import { React, useState } from 'react'
import { Card, Form, Button, Input, Select } from 'antd'
import TimeRelatedForm from '../../components/Duration'
import UploadFile from '../../components/CreateAssignment/UploadFile'
import QuestionHead from '../../components/CreateAssignment/QuestionHead'
import ReceivedWritten from '../../components/CreateAssignment/ReceivedQuestions/ReceivedWritten'
import ReceivedChoice from '../../components/CreateAssignment/ReceivedQuestions/ReceivedChoice'

const CreateAssignment = () => {
  const { Option } = Select
  const [upload, ShowUpload] = useState('upload-file')
  const [questions, AddQuestions] = useState([])

  const changeOption = (newElement) => {
    AddQuestions(questions.concat(newElement))
  }
  const DeleteMyQuestion = (Element) => {
    AddQuestions(questions.filter((question) => question !== Element))
  }

  const onChangeType = (value) => {
    ShowUpload(value)
    if (value === 'upload-file') {
      AddQuestions([])
    }
  }

  const onFinish = (values) => {
    if (upload === 'online-question') {
      values.questions = questions
      // dispatch(createAssignmentOnline(values)) ;
    }

    if (upload === 'upload-file') {
      // dispatch(createAssignmentFile(values))  ;
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <Card>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="assignment-title"
          rules={[
            {
              required: true,
              message: 'Please input Assignment Title!'
            }
          ]}
        >
          <Input placeholder="Assignment Title" />
        </Form.Item>
        <TimeRelatedForm />
        <Form.Item
          name="assignment-type"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            onChange={onChangeType}
          >
            <Option value="online-question">online-question</Option>
            <Option value="upload-file">upload-file</Option>
          </Select>
        </Form.Item>

        {upload === 'online-question' ? (
          <>
            <QuestionHead changeOption={changeOption} /> <br />
          </>
        ) : (
          <UploadFile />
        )}
        {questions.map((QuestionItem, index) => {
          return QuestionItem.QuestionType === 'written-question' ? (
            <ReceivedWritten
              questionData={QuestionItem}
              DeleteQuestion={DeleteMyQuestion}
              id={index}
              key={index}
            />
          ) : (
            <ReceivedChoice
              questionData={QuestionItem}
              DeleteQuestion={DeleteMyQuestion}
              id={index}
              key={index}
            />
          )
        })}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Assignment
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default CreateAssignment
