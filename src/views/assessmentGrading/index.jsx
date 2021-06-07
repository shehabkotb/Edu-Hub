import {
  Affix,
  Button,
  Divider,
  Form,
  Space,
  Col,
  Row,
  Typography,
  Empty,
  InputNumber
} from 'antd'

import React, { useEffect, useState } from 'react'

import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { DateTime } from 'luxon'
import PlagarismTag from '../../components/PlagarismTag'
import GradingQuestionList from './components/GradingQuestionList'
import AutoGradingTag from '../../components/AutoGradingTag'

import Styled from 'styled-components'
import FileDisplay from './components/FileDispaly'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router'
import {
  getAllSubmissions,
  gradeQuestions
} from '../../reducers/submissionsReducer'

const { Text, Title } = Typography

const Container = Styled.div`
    background-color: #fafafa;
    width: 95%;
    margin: 0 auto;
    border-radius: 10px;
    padding: 20px 20px;
`

const Grader = () => {
  const dispatch = useDispatch()

  const { courseId, assessmentId } = useParams()

  const data = useSelector((state) => state.submissions.data)
  const { assessment, submissions } = data || {}

  useEffect(() => {
    dispatch(getAllSubmissions(courseId, assessmentId))
  }, [])

  if (!submissions) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />

  return <GradingPage submissions={submissions} assessment={assessment} />
}

const FileView = ({ files }) => {
  const [selectedFileURL, setselectedFileURL] = useState('')

  const selectFile = (url) => {
    setselectedFileURL(url)
  }

  useEffect(() => {
    setselectedFileURL(files[0]?.url || '')
  }, [files])

  return (
    <>
      <FileDisplay files={files} handleClick={selectFile} />
      <embed
        title="test"
        src={`${selectedFileURL}`}
        style={{ width: '100%', height: '680px', marginTop: '16px' }}
        frameBorder="0"
      ></embed>
    </>
  )
}

const GradingPage = (props) => {
  const dispatch = useDispatch()
  const { state } = useLocation()
  const { courseId, assessmentId } = useParams()
  const { submissions, assessment } = props

  const [form] = Form.useForm()

  const [selectedIndex, setSelectedIndex] = useState(state?.index || 0)

  useEffect(() => {
    form.resetFields()
  }, [selectedIndex])

  const handleSubmit = (submission) => {
    let totalScore = 0
    if (assessment.submissionType === 'online') {
      submission.answers.forEach(
        (answer) => (totalScore += parseInt(answer.score))
      )
      submission.score = totalScore
    }
    console.log(submission)

    dispatch(
      gradeQuestions(
        courseId,
        assessmentId,
        submissions[selectedIndex].student._id,
        submission
      )
    )
  }

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Row gutter={[16, 16]}>
        <Col span={18}>
          <Container>
            <Title level={3}>
              Submissions {selectedIndex + 1}{' '}
              <Text type="secondary">out of</Text> {submissions.length}
            </Title>
            <Divider />
            {assessment.submissionType === 'online' && (
              <GradingQuestionList
                form={form}
                answers={submissions[selectedIndex].answers}
                submissionId={submissions[selectedIndex].id}
              />
            )}
            {assessment.submissionType === 'written' && (
              <FileView files={submissions[selectedIndex].files} />
            )}
          </Container>
        </Col>

        <Col span={6}>
          <Affix offsetTop={10}>
            <div
              style={{
                backgroundColor: 'white',
                padding: '20px 20px',
                borderRadius: '10px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Space>
                  <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => setSelectedIndex(selectedIndex - 1)}
                    disabled={selectedIndex === 0}
                  ></Button>
                  <Text>{submissions[selectedIndex].student.name}</Text>
                  <Button
                    type="text"
                    icon={<ArrowRightOutlined />}
                    onClick={() => setSelectedIndex(selectedIndex + 1)}
                    disabled={submissions.length - 1 === selectedIndex}
                  ></Button>
                </Space>
              </div>
              <Divider />

              <Space size="large" direction="vertical">
                <Text>
                  Submission Time:{' '}
                  {DateTime.fromISO(
                    submissions[selectedIndex].submittedAt
                  ).toLocaleString(DateTime.DATETIME_MED)}
                </Text>
                <Space>
                  <Text>Plagarism Degree: </Text>
                  <PlagarismTag
                    status={submissions[selectedIndex].plagarismStatus}
                  />
                </Space>
                <Space>
                  <Text>AutoGrading Status: </Text>
                  <AutoGradingTag
                    status={submissions[selectedIndex].autoGradingStatus}
                  />
                </Space>
                <Form.Item
                  initialValue={submissions[selectedIndex].score}
                  label={`Total Score out of ${assessment.maxScore}:`}
                  name="score"
                  rules={
                    assessment.submissionType === 'written' && [
                      { required: true }
                    ]
                  }
                >
                  <InputNumber
                    disabled={assessment.submissionType === 'online'}
                    style={{ width: '30%' }}
                    min={0}
                    max={assessment.maxScore}
                  ></InputNumber>
                </Form.Item>
                <Text> </Text>
              </Space>
              <Space style={{ marginTop: '26px' }}>
                <Button type="primary" onClick={() => form.submit()}>
                  Grade
                </Button>
                <Button>Cancel</Button>
              </Space>
            </div>
          </Affix>
        </Col>
      </Row>
    </Form>
  )
}

export default Grader
