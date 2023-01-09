import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FlexSectionHeader } from '../../style'

import { Avatar, Button, Space, Table, Typography, Tag } from 'antd'
import { useParams } from 'react-router'
import useCoursePrivilege from '../../../hooks/useCourseprivilege'
import { STUDENT } from '../../../constants/userRoles'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'
import PlagarismTag from '../../../components/PlagarismTag'
import {
  autoGrade,
  checkPlagiarism,
  getAllSubmissions
} from '../../../reducers/submissionsReducer'
import Spinner from '../../../components/Spinner'

import AutoGradingTag from '../../../components/AutoGradingTag'

const { Title, Text } = Typography
const { Column } = Table

const Submissions = (props) => {
  const dispatch = useDispatch()

  const { courseId, assessmentId } = useParams()
  const { privilege } = useCoursePrivilege()

  const data = useSelector((state) => state.submissions.data)
  const loading = useSelector((state) => state.submissions.loading)

  const { assessment, submissions } = data || {}

  useEffect(() => {
    dispatch(getAllSubmissions(courseId, assessmentId))
  }, [])

  if (loading || !assessment) return <Spinner size="large" />

  return (
    <>
      <FlexSectionHeader>
        <Title level={3}>
          All Submissions for <Text type="secondary">{assessment?.title}</Text>
        </Title>
        <Space>
          {privilege !== STUDENT && assessment?.questionsType === 'online' && (
            <Button
              onClick={() => dispatch(autoGrade(courseId, assessmentId))}
              type="primary"
            >
              Auto Grade
            </Button>
          )}
          {privilege !== STUDENT && assessment?.submissionType === 'written' && (
            <Button
              onClick={() => dispatch(checkPlagiarism(courseId, assessmentId))}
              type="primary"
            >
              Check Plagiarism
            </Button>
          )}
        </Space>
      </FlexSectionHeader>

      <Table
        pagination={false}
        style={{ marginTop: '24px' }}
        rowKey={(submission) => submission.id}
        dataSource={submissions}
      >
        <Column
          title="Photo"
          dataIndex={['student', 'photo']}
          render={(img) => <Avatar src={img} />}
        />
        <Column title="Name" dataIndex={['student', 'name']} />
        <Column
          title="Submission Time"
          dataIndex="submittedAt"
          render={(time) => {
            if (!time) return '-'
            else
              return DateTime.fromISO(time).toLocaleString(
                DateTime.DATETIME_MED
              )
          }}
        />
        {assessment?.type === 'Assignment' && (
          <Column
            title="Status"
            dataIndex="status"
            render={(status) => (
              <>
                {status.code === 'late' && <Tag color="red">{status.code}</Tag>}
                {status.code === 'onTime' && (
                  <Tag color="green">{status.code}</Tag>
                )}
              </>
            )}
          />
        )}
        {assessment?.submissionType === 'written' && (
          <Column
            title="Plagirism Degree"
            dataIndex="plagarismStatus"
            render={(plagarismStatus) => (
              <PlagarismTag status={plagarismStatus} />
            )}
          />
        )}
        {assessment?.questionsType === 'online' && (
          <Column
            title="Auto Grading"
            dataIndex="autoGradingStatus"
            render={(autoGradingStatus) => (
              <AutoGradingTag status={autoGradingStatus} />
            )}
          />
        )}
        <Column
          title={`Score / ${assessment.maxScore}`}
          dataIndex="score"
          render={(score) => (score === undefined ? '-' : score)}
        />
        <Column
          title="Action"
          render={(text, record, index) => (
            <Link
              to={{
                pathname: `/app/course/${courseId}/assessment/${assessmentId}/grade`,
                state: { index: index }
              }}
            >
              Grade
            </Link>
          )}
        />
      </Table>
    </>
  )
}

export default Submissions
