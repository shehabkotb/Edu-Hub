import React, { useEffect, useState } from 'react'
import { Divider, message, Typography, Upload } from 'antd'

import { InboxOutlined } from '@ant-design/icons'
import QuestionList from './QuestionList'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getOneSubmission } from '../../../reducers/submissionReducer'
import Spinner from '../../../components/Spinner'

const { Title } = Typography
const { Dragger } = Upload

const QuestionsSection = (props) => {
  const dispatch = useDispatch()

  const { submission, loading } = useSelector((state) => state.assessmentTaking)
  const { courseId, assessmentId } = useParams()
  const user = useSelector((state) => state.auth.user)

  const { assessment } = submission

  useEffect(() => {
    dispatch(getOneSubmission(courseId, assessmentId, user._id))
  }, [dispatch])

  const [answers, setAnswers] = useState([
    { originQuestion: '80186', studentAnswer: 'choice a', submitted: true },
    { originQuestion: '80187', studentAnswer: 'essay answer', submitted: true }
  ])

  const handleAnswerSubmit = (questionId, newAnswer) => {
    let alreadyAnswerd = false
    const newAnswers = answers.map((answer) => {
      if (answer.originQuestion === questionId) {
        alreadyAnswerd = true
        return {
          originQuestion: answer.originQuestion,
          studentAnswer: newAnswer,
          submitted: true
        }
      } else return answer
    })

    if (!alreadyAnswerd) {
      setAnswers(
        answers.concat({
          originQuestion: questionId,
          studentAnswer: newAnswer,
          submitted: true
        })
      )
    } else setAnswers(newAnswers)
  }

  if (loading || Object.keys(submission).length === 0)
    return <Spinner size="large" />

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
      <Title level={3}>{assessment.title}</Title>

      <Divider />

      {assessment.submissionType === 'online' && (
        <QuestionList
          questions={assessment.questions}
          answers={answers}
          handleAnswerSubmit={handleAnswerSubmit}
        />
      )}

      {assessment.submissionType === 'written' && (
        <Dragger
          onChange={(info) => {
            const { status } = info.file
            if (status === 'done')
              message.success(`${info.file.name} file uploaded successfully.`)
            else if (status === 'error')
              message.error(`${info.file.name} file upload failed.`)
          }}
          //   customRequest={handleFileSubmit}
          //   onRemove={handleFileRemove}
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

export default QuestionsSection
