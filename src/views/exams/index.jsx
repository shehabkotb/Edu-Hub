import React, { useEffect } from 'react'
import { FlexSectionHeader } from '../style'
import styled from 'styled-components'

import { Typography, Button, List, Space, Tag } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { PlusOutlined } from '@ant-design/icons'
import { STUDENT } from '../../constants/userRoles'
import { getAllExams } from '../../reducers/examReducer'
import { useHistory, useParams } from 'react-router'

import { AiOutlineSolution } from 'react-icons/ai'
import useCoursePrivillege from '../../hooks/useCourseprivilege'

const { Title, Text } = Typography

const Exams = () => {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const history = useHistory()
  const { enrolled, privilege } = useCoursePrivillege()

  const exams = useSelector((state) => state.exams.data)

  useEffect(() => {
    dispatch(getAllExams(courseId))
  }, [courseId, dispatch])

  return (
    <>
      <FlexSectionHeader>
        <Title level={3}>All Exams</Title>
        {enrolled && privilege !== STUDENT && (
          <Button
            onClick={() => history.push(`/app/course/${courseId}/exams/create`)}
            type="dashed"
            shape="round"
            icon={<PlusOutlined />}
          >
            Add Exam
          </Button>
        )}
      </FlexSectionHeader>

      <div style={{ marginTop: '16px' }}>
        <Text style={{ fontSize: '16px', fontWeight: '600', color: '#595959' }}>
          Active
        </Text>

        <List
          dataSource={exams}
          renderItem={(exam) => <ExamItem exam={exam} />}
        />
      </div>

      <div
        style={{
          marginTop: '46px'
        }}
      >
        <Text style={{ fontSize: '16px', fontWeight: '600', color: '#595959' }}>
          Done
        </Text>

        <List
          dataSource={exams}
          renderItem={(exam) => <ExamItem exam={exam} disabled={true} />}
        />
      </div>
    </>
  )
}

const Container = styled.div`
  background-color: #fafafa;
  width: 100%;
  padding: 24px 16px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #d9d9d9;
  }
`
const ExamItem = ({ exam, disabled }) => {
  const history = useHistory()
  const { courseId } = useParams()

  // weight Maxscore tag [willopen, opened, closed] message submissiontype timelimit

  return (
    <List.Item
      onClick={() => window.open(`/app/course/${courseId}/exam/${exam.id}`)}
    >
      <Container>
        <Space>
          <AiOutlineSolution
            style={{
              fontSize: '32px',
              color: disabled ? '#a7a7a7d9' : 'intial'
            }}
          />
          <Space size="small" direction="vertical">
            <Space>
              <span>weight: {exam.weight}</span>
              <span>maxScore: {exam.maxScore}</span>
              <span>Type: {exam.submissionType}</span>
              <span>Duration: {exam.timeLimit}</span>
            </Space>

            <Title
              style={{ margin: 0, color: disabled ? '#a7a7a7d9' : 'intial' }}
              level={5}
            >
              {exam.title}
            </Title>

            <div>
              {exam.status.code === 'willOpen' && (
                <Tag color="geekblue">{exam.status.code}</Tag>
              )}
              {exam.status.code === 'open' && (
                <Tag color="green">{exam.status.code}</Tag>
              )}
              {exam.status.code === 'closed' && (
                <Tag color="red">{exam.status.code}</Tag>
              )}
              <Text type="secondary">{exam.status.message}</Text>
            </div>
          </Space>
        </Space>
      </Container>
    </List.Item>
  )
}

export { default as AssessmentCreation } from './components/AssessmentCreation'

export default Exams
