import React, { useEffect, useState } from 'react'
import {
  Button,
  Divider,
  message,
  Modal,
  Typography,
  Upload,
  Space
} from 'antd'

import { InboxOutlined } from '@ant-design/icons'
import QuestionList from './QuestionList'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import {
  submitAnswers,
  updateSubmission
} from '../../../reducers/assessmentTakingReducer'
import FileDisplay from '../../../components/FileDisplay'
import s3Service from '../../../services/s3Service'
import SubmissionTimeTag from '../../../components/SubmissionTimeTag'

import { FlexSectionHeader } from '../../style'
import { DateTime } from 'luxon'

const { Title, Text } = Typography
const { Dragger } = Upload

const QuestionsSection = (props) => {
  const dispatch = useDispatch()
  const { courseId, assessmentId } = useParams()
  const user = useSelector((state) => state.auth.user)

  const answers = useSelector(
    (state) => state.assessmentTaking.submission.answers
  )

  const [files, setFiles] = useState([])

  const { submission } = props
  const { assessment } = submission

  useEffect(() => {
    setFiles(
      submission.files.map((file) => {
        return { ...file, uid: file._id }
      })
    )
  }, [])

  const handleAnswerSubmit = (questionId, newAnswer) => {
    dispatch(
      submitAnswers(courseId, assessmentId, user._id, questionId, newAnswer)
    )
  }

  const handleFileRemove = async (removedFile) => {
    let s3URL = removedFile.url
    if (!removedFile.error) {
      setFiles(
        files.filter((file) => {
          if (file.uid === removedFile.uid || file._id === removedFile._id)
            return false
          else return true
        })
      )
      await s3Service
        .deleteFile(s3URL)
        .then((response) =>
          message.success('file deleted make sure to resubmit with new file')
        )
    }
  }

  const handleFileSubmit = ({ file, onSuccess, onError, onProgress }) => {
    onProgress({ percent: 0 })
    s3Service
      .uploadFile(courseId, 'submissions', file.name, file, file.type)
      .then((url) => {
        onProgress({ percent: 100 })
        onSuccess({ url })
      })
      .catch((error) => {
        console.log(error)
        onError(error)
      })
  }

  const handleFinish = (alreadySumbitted) => {
    if (assessment.submissionType === 'written' && files.length === 0) {
      message.error(`must upload at least one file`)
      return
    }
    if (assessment.type === 'Exam') {
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
    } else if (assessment.type === 'Assignment' && alreadySumbitted) {
      Modal.confirm({
        title: 'Are you sure?',
        content: [
          <div key="1">Your previous submission will be discarded.</div>
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
    } else {
      dispatch(
        updateSubmission(courseId, assessmentId, user._id, {
          files: files,
          finished: true
        })
      )
    }
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
        <Space>
          <Title level={3}>{assessment.title}</Title>
          {submission.submittedAt && assessment.type === 'Assignment' && (
            <>
              <Text type="secondary">Submitted at:</Text>
              {DateTime.fromISO(submission.submittedAt).toLocaleString(
                DateTime.DATETIME_MED
              )}
              <SubmissionTimeTag status={submission.status} />
            </>
          )}
        </Space>
        {submission.finished && (
          <Button onClick={() => handleFinish(true)} type="default">
            <Text strong>Resubmit</Text>
          </Button>
        )}
        {!submission.finished && (
          <Button onClick={() => handleFinish()} type="primary">
            <Text style={{ color: 'white' }} strong>
              Submit
            </Text>
          </Button>
        )}
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
              let fileList = [...info.fileList]

              const { status } = info.file
              if (status === 'done')
                message.success(`${info.file.name} file uploaded successfully.`)
              else if (status === 'error')
                message.error(`${info.file.name} file upload failed.`)

              fileList = fileList.map((file) => {
                if (file.response) {
                  file.url = file.response.url
                }
                return file
              })

              setFiles(fileList)
            }}
            customRequest={handleFileSubmit}
            onRemove={handleFileRemove}
            fileList={files}
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
