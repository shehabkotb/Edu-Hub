import React, { useEffect } from 'react'
import { FlexSectionHeader } from '../style'
import styled from 'styled-components'

import { Typography, Button, List, Space, Tag, Dropdown, Menu } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { PlusOutlined } from '@ant-design/icons'
import { STUDENT } from '../../constants/userRoles'
import { deleteExam, getAllExams } from '../../reducers/examReducer'
import { useHistory, useParams } from 'react-router'

import { AiOutlineSolution } from 'react-icons/ai'

import useCoursePrivilege from '../../hooks/useCourseprivilege'
import { Link } from 'react-router-dom'

const { Title, Text } = Typography

const Exams = () => {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const history = useHistory()
  const { enrolled, privilege } = useCoursePrivilege()

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
          dataSource={exams.filter((exam) => exam.status.code !== 'closed')}
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
          dataSource={exams.filter((exam) => exam.status.code === 'closed')}
          renderItem={(exam) => <ExamItem exam={exam} disabled={true} />}
        />
      </div>
    </>
  )
}

const StyledListItem = styled(List.Item)`
  background-color: #fafafa;
  padding: 24px 16px;
  width: 100%;
  margin-top: 16px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #d9d9d9;
  }
`
const ExamItem = ({ exam, disabled }) => {
  const { courseId } = useParams()
  const { privilege } = useCoursePrivilege()
  const dispatch = useDispatch()

  const optionMenu = (
    <Menu>
      <Menu.Item>
        <Link to={`/app/course/${courseId}/assessment/${exam.id}/grade`}>
          Grade All
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`/app/course/${courseId}/assessment/${exam.id}/submissions`}>
          All Submissions
        </Link>
      </Menu.Item>
      <Menu.Item danger onClick={() => dispatch(deleteExam(courseId, exam.id))}>
        Delete
      </Menu.Item>
    </Menu>
  )

  const getActions = (privilege) => {
    if (privilege !== STUDENT)
      return (
        <>
          <Space
            onClick={(event) => {
              event.stopPropagation()
            }}
          >
            <Dropdown.Button
              trigger={['click']}
              placement="bottomLeft"
              type="text"
              overlay={optionMenu}
            ></Dropdown.Button>
          </Space>
        </>
      )
  }

  return (
    <StyledListItem
      onClick={() => window.open(`/app/course/${courseId}/exam/${exam.id}`)}
      extra={getActions(privilege)}
    >
      <Space>
        <AiOutlineSolution
          style={{
            fontSize: '32px',
            color: disabled ? '#a7a7a7d9' : 'intial'
          }}
        />
        <Space size="small" direction="vertical">
          <Space>
            <span>
              <Text type="secondary">weight: </Text>
              <Text strong>{`${exam.weight * 100}%`}</Text>
            </span>
            <span>
              <Text type="secondary">maxScore: </Text>
              <Text strong>{exam.maxScore}</Text>
            </span>
            <span>
              <Text type="secondary">Duration: </Text>
              <Text strong>
                {Math.round(exam.timeLimit / 60)}
                <Text type="secondary"> minutes</Text>
              </Text>
            </span>
            <span>
              <Text type="secondary">Submission: </Text>
              <Text strong>{exam.submissionType}</Text>
            </span>
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
    </StyledListItem>
  )
}

export { default as AssessmentCreation } from './components/AssessmentCreation'
export { default as Submissions } from './components/Submissions'

export default Exams
