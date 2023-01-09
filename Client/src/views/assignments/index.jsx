import React, { useEffect } from 'react'
import { FlexSectionHeader } from '../style'
import styled from 'styled-components'

import { Typography, Button, List, Space, Tag, Dropdown, Menu } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { PlusOutlined, FileTextOutlined } from '@ant-design/icons'
import { STUDENT } from '../../constants/userRoles'
import {
  deleteAssignment,
  getAllAssignments
} from '../../reducers/assignmentReducer'
import { useHistory, useParams } from 'react-router'

import useCoursePrivilege from '../../hooks/useCourseprivilege'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'

const { Title, Text } = Typography

const Assignments = () => {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const history = useHistory()
  const { enrolled, privilege } = useCoursePrivilege()

  const assignments = useSelector((state) => state.assignments.data)

  useEffect(() => {
    dispatch(getAllAssignments(courseId))
  }, [courseId, dispatch])

  return (
    <>
      <FlexSectionHeader>
        <Title level={3}>All Assignments</Title>
        {enrolled && privilege !== STUDENT && (
          <Button
            onClick={() =>
              history.push(`/app/course/${courseId}/assignments/create`)
            }
            type="dashed"
            shape="round"
            icon={<PlusOutlined />}
          >
            Add Assignment
          </Button>
        )}
      </FlexSectionHeader>

      <div style={{ marginTop: '16px' }}>
        <List
          dataSource={assignments}
          renderItem={(assignment) => (
            <AssignmentItem assignment={assignment} />
          )}
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
const AssignmentItem = ({ assignment, disabled }) => {
  const { courseId } = useParams()
  const { privilege } = useCoursePrivilege()
  const dispatch = useDispatch()

  const history = useHistory()

  const optionMenu = (
    <Menu>
      <Menu.Item>
        <Link to={`/app/course/${courseId}/assessment/${assignment.id}/grade`}>
          Grade All
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          to={`/app/course/${courseId}/assessment/${assignment.id}/submissions`}
        >
          All Submissions
        </Link>
      </Menu.Item>
      <Menu.Item
        danger
        onClick={() => dispatch(deleteAssignment(courseId, assignment.id))}
      >
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
      onClick={() =>
        history.push(`/app/course/${courseId}/assignment/${assignment.id}`)
      }
      extra={getActions(privilege)}
    >
      <Space>
        <FileTextOutlined
          style={{
            fontSize: '32px',
            color: disabled ? '#a7a7a7d9' : 'intial'
          }}
        />
        <Space size="small" direction="vertical">
          <Space>
            <span>
              <Text type="secondary">weight: </Text>
              <Text strong>{`${assignment.weight * 100}%`}</Text>
            </span>
            <span>
              <Text type="secondary">maxScore: </Text>
              <Text strong>{assignment.maxScore}</Text>
            </span>
            <span>
              <Text type="secondary">Submission: </Text>
              <Text strong>{assignment.submissionType}</Text>
            </span>
          </Space>

          <Title
            style={{ margin: 0, color: disabled ? '#a7a7a7d9' : 'intial' }}
            level={5}
          >
            {assignment.title}
          </Title>

          <div>
            <Tag color="red">Due At</Tag>
            <Text type="secondary">
              {DateTime.fromISO(assignment.dueDate).toLocaleString(
                DateTime.DATETIME_FULL
              )}
            </Text>
          </div>
        </Space>
      </Space>
    </StyledListItem>
  )
}

export default Assignments
