import React, { useEffect } from 'react'

import { Typography, Table, Avatar, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllParticipants,
  updatePrivilege
} from '../../reducers/participantsReducer'
import { useParams } from 'react-router-dom'

import Spinner from '../../components/Spinner'
import { DateTime } from 'luxon'

const { Title, Text } = Typography

const { Column } = Table

const CourseParticipants = () => {
  const dispatch = useDispatch()
  const { courseId } = useParams()

  const participants = useSelector((state) => state.courseParticipants.data)
  const loading = useSelector((state) => state.courseParticipants.loading)
  const user = useSelector((state) => state.auth.user)
  const courses = useSelector((state) => state.courses.data)

  const course = courses.find((course) => course.id === courseId)

  useEffect(() => {
    dispatch(getAllParticipants(courseId))
  }, [courseId, dispatch])

  if (loading) return <Spinner size="large" />

  return (
    <>
      <Title level={3}>All participants</Title>
      <Table
        pagination={false}
        style={{ marginTop: '24px' }}
        rowKey={(participant) => participant.id}
        dataSource={participants}
      >
        <Column
          title="Photo"
          dataIndex={['user', 'photo']}
          render={(img) => <Avatar src={img} />}
        />
        <Column title="Name" dataIndex={['user', 'name']} />
        <Column title="Email" dataIndex={['user', 'email']} />
        <Column
          title="Enrollment Date"
          dataIndex="createdAt"
          render={(time) => {
            return DateTime.fromISO(time).toLocaleString(DateTime.DATETIME_MED)
          }}
        />
        <Column
          title="Privilege"
          dataIndex="enrolledAs"
          render={(Privellege) => <Text>{Privellege}</Text>}
        />
        <Column
          title="Action"
          render={(text, record, index) => {
            if (user._id === record.user._id) {
              return 'Current user'
            }
            if (course?.createdBy?._id === record.user._id) {
              return 'Course Owner'
            }
            return (
              <>
                {record.enrolledAs === 'student' && (
                  <Button
                    style={{ padding: 0 }}
                    type="link"
                    onClick={() => {
                      dispatch(
                        updatePrivilege(courseId, record.id, 'instructor')
                      )
                    }}
                  >
                    Make instructor
                  </Button>
                )}
                {record.enrolledAs === 'instructor' && (
                  <Button
                    style={{ padding: 0 }}
                    type="link"
                    onClick={() => {
                      dispatch(updatePrivilege(courseId, record.id, 'student'))
                    }}
                  >
                    Make student
                  </Button>
                )}
                {record.enrolledAs === 'admin' && '-'}
              </>
            )
          }}
        />
      </Table>
    </>
  )
}

export default CourseParticipants
