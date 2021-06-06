import React, { useEffect, useState } from 'react'
import { Button, Divider, message, Modal, Typography, Upload } from 'antd'

import { InboxOutlined } from '@ant-design/icons'
import QuestionList from './QuestionList'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import {
  getOneSubmission,
  submitAnswers,
  updateSubmission
} from '../../../reducers/assessmentTakingReducer'
import Spinner from '../../../components/Spinner'
import FileDisplay from '../../../components/FileDisplay'
import s3Service from '../../../services/s3Service'

import { FlexSectionHeader } from '../../style'

const { Title, Text } = Typography
const { Dragger } = Upload

const QuestionsSection = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { courseId, assessmentId } = useParams()
  const user = useSelector((state) => state.auth.user)

  const answers = useSelector(
    (state) => state.assessmentTaking.submission.answers
  )

  const [files, setFiles] = useState([])

  const { submission } = props
  const { assessment } = submission

  const handleAnswerSubmit = (questionId, newAnswer) => {
    dispatch(
      submitAnswers(courseId, assessmentId, user._id, questionId, newAnswer)
    )
  }

  const handleFileRemove = async (removedFile) => {
    let s3URL = ''
    if (!removedFile.error) {
      setFiles(
        files.filter((file) => {
          if (file.uid === removedFile.uid) s3URL = file.url

          return file.uid !== removedFile.uid
        })
      )
      await s3Service.deleteFile(s3URL)
    }
  }

  const handleFileSubmit = ({ file, onSuccess, onError }) => {
    s3Service
      .uploadFile(courseId, 'submissions', file.name, file, file.type)
      .then((url) => {
        setFiles(files.concat([{ name: file.name, url: url, uid: file.uid }]))
        onSuccess()
      })
      .catch((error) => {
        console.log(error)
        onError(error)
      })
  }

  const handleFinish = () => {
    Modal.confirm({
      title: 'Are you sure?',
      content: [
        <div key="1">Make sure all your answers are saved</div>,
        <div key="2">You won't be able to change them anymore</div>
      ],

      onOk() {
        dispatch(
          updateSubmission(courseId, assessmentId, user._id, {
            files: files,
            finished: true
          })
        )
      }
    })
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
      <FlexSectionHeader>
        <Title level={3}>{assessment.title}</Title>
        <Button onClick={handleFinish} type="primary">
          <Text style={{ color: 'white' }} strong>
            Finish
          </Text>
        </Button>
      </FlexSectionHeader>

      <Divider />

      {assessment.questionsType === 'online' && (
        <QuestionList
          questions={assessment.questions}
          answers={answers}
          noOnlineAnswer={assessment.submissionType === 'written'}
          handleAnswerSubmit={handleAnswerSubmit}
        />
      )}

      {assessment.questionsType === 'file' && (
        <FileDisplay files={assessment.files} />
      )}

      {assessment.submissionType === 'written' && (
        <>
          <Divider />
          <Title level={5}>Upload your answer</Title>
          <Dragger
            onChange={(info) => {
              const { status } = info.file
              if (status === 'done')
                message.success(`${info.file.name} file uploaded successfully.`)
              else if (status === 'error')
                message.error(`${info.file.name} file upload failed.`)
            }}
            customRequest={handleFileSubmit}
            onRemove={handleFileRemove}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
        </>
      )}
    </div>
  )
}

export default QuestionsSection
