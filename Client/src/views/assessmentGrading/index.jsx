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
import SubmissionTimeTag from '../../components/SubmissionTimeTag'

import Styled from 'styled-components'
import FileDisplay from './components/FileDispaly'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router'
import {
  getAllSubmissions,
  gradeQuestions
} from '../../reducers/submissionsReducer'
import Spinner from '../../components/Spinner'
import { useHistory } from 'react-router-dom'

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
  const loading = useSelector((state) => state.submissions.loading)
  const { assessment, submissions } = data || {}

  useEffect(() => {
    dispatch(getAllSubmissions(courseId, assessmentId))
  }, [courseId, assessmentId])

  if (loading) return <Spinner size="large" />

  if (!submissions || (Array.isArray(submissions) && submissions.length === 0))
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />

  return <GradingPage submissions={submissions} assessment={assessment} />
}

const FileView = ({ files }) => {
  const [selectedFileURL, setselectedFileURL] = useState('')

  const selectFile = (url) => {
    setselectedFileURL(url)
  }

  const getPdfUrl = (files) => {
    for (const file of files) {
      const index = file.url.lastIndexOf('.')
      if (file.url.slice(index + 1) === 'pdf') return file.url
    }
    return ''
  }

  useEffect(() => {
    setselectedFileURL(getPdfUrl(files))
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
  const history = useHistory()
  const { state } = useLocation()
  const { courseId, assessmentId } = useParams()
  const { submissions, assessment } = props

  const [form] = Form.useForm()

  const [selectedIndex, setSelectedIndex] = useState(state?.index || 0)

  useEffect(() => {
    form.resetFields()
  }, [selectedIndex])

  const calculateTotalScore = (answers) => {
    let totalScore = 0
    for (const answer of answers) {
      totalScore += answer?.score || 0
    }
    return totalScore
  }

  const handleScoreCalculation = (changedValues, allValues) => {
    const answers = allValues?.answers
    if (
      answers &&
      answers.length !== 0 &&
      assessment.questionsType === 'online'
    ) {
      let totalScore = calculateTotalScore(answers)
      form.setFieldsValue({ score: totalScore })
    }
  }

  const handleSubmit = (submission) => {
    console.log(submission)

    dispatch(
      gradeQuestions(
        courseId,
        assessmentId,
        submissions[selectedIndex].student._id,
        submission
      )
    ).then(() => {
      if (submissions.length - 1 !== selectedIndex)
        setSelectedIndex(selectedIndex + 1)
    })
  }

  const getInitialScore = () => {
    if (submissions[selectedIndex].score)
      return submissions[selectedIndex].score
    else return calculateTotalScore(submissions[selectedIndex].answers)
  }

  return (
    <Form
      onValuesChange={handleScoreCalculation}
      form={form}
      initialValues={{
        score: getInitialScore()
      }}
      onFinish={handleSubmit}
      layout="vertical"
    >
      <Row gutter={[16, 16]}>
        <Col span={18}>
          <Container>
            <Title level={3}>
              {assessment.title} <Text type="secondary">submission</Text>{' '}
              {selectedIndex + 1} <Text type="secondary">out of</Text>{' '}
              {submissions.length}
            </Title>
            <Divider />
            {assessment.questionsType === 'online' && (
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
                {assessment.submissionType === 'written' && (
                  <Space>
                    <Text>Plagarism Degree: </Text>
                    <PlagarismTag
                      status={submissions[selectedIndex].plagarismStatus}
                    />
                  </Space>
                )}
                {assessment?.questionsType === 'online' && (
                  <Space>
                    <Text>AutoGrading Status: </Text>
                    <AutoGradingTag
                      status={submissions[selectedIndex].autoGradingStatus}
                    />
                  </Space>
                )}
                {assessment?.type === 'Assignment' && (
                  <Space>
                    <Text>Submit Status: </Text>
                    <SubmissionTimeTag
                      status={submissions[selectedIndex].status}
                    />
                  </Space>
                )}
                {assessment.type === 'Exam' && (
                  <Text>
                    Number of Joins:{' '}
                    {submissions[selectedIndex].numberOfExamJoins}
                  </Text>
                )}
                <Form.Item
                  initialValue={submissions[selectedIndex].score}
                  label={`Total Score out of ${assessment.maxScore}:`}
                  name="score"
                  preserve={false}
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
                <Button
                  onClick={() =>
                    history.push(
                      `/app/course/${courseId}/${assessment.type.toLowerCase()}s`
                    )
                  }
                >
                  Cancel
                </Button>
              </Space>
            </div>
          </Affix>
        </Col>
      </Row>
    </Form>
  )
}

export default Grader
