import { Divider, Typography, Upload } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import {
  addQuestion,
  markForEdit,
  removeQuestion,
  replaceQuestion
} from '../../../reducers/assessmentCreationReducer'
import QuestionList from './QuestionList'

import { InboxOutlined } from '@ant-design/icons'

const { Dragger } = Upload
const { Title } = Typography

const AssessmentQuestionsSection = (props) => {
  const dispatch = useDispatch()

  const { title, setTitle, questions, controlledQuestionType } = props

  const createQuestion = () => {
    dispatch(addQuestion())
  }
  const updateQuestion = (question) => {
    dispatch(replaceQuestion(question))
  }
  const deleteQuestion = (question) => {
    dispatch(removeQuestion(question))
  }
  const draftQuestion = (question) => {
    dispatch(markForEdit(question))
  }

  return (
    <div
      style={{
        backgroundColor: '#fafafa',
        width: '95%',
        margin: '0 auto',
        borderRadius: '10px',
        padding: '20px 20px'
      }}
    >
      <Title editable={{ onChange: setTitle }} level={3}>
        {title}
      </Title>

      <Divider />

      {controlledQuestionType === 'online' && (
        <QuestionList
          questions={questions}
          updateQuestion={updateQuestion}
          deleteQuestion={deleteQuestion}
          draftQuestion={draftQuestion}
          createQuestion={createQuestion}
        />
      )}

      {controlledQuestionType === 'file' && (
        <Dragger
          beforeUpload={() => {
            return false
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single file upload only.
          </p>
        </Dragger>
      )}
    </div>
  )
}

export default AssessmentQuestionsSection
