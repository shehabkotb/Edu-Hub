import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Typography, Modal, Input, List, Collapse } from 'antd'
import {
  CaretRightOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { FlexSectionHeader } from '../style'
import CourseCard from '../../components/CourseCard'

import Spinner from '../../components/Spinner'

import {
  getAllCourses,
  deleteCourse,
  enroll,
  unEnroll
} from '../../reducers/courseReducer'

import { useHistory } from 'react-router-dom'

const { Title, Text } = Typography
const { confirm } = Modal

const Courses = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCourses())
  }, [dispatch])

  const user = useSelector((state) => state.auth.user)
  const courses = useSelector((state) =>
    state.courses.data.filter((course) => course.status !== 'archived')
  )
  const loading = useSelector((state) => state.courses.loading)
  const history = useHistory()

  const [filter, setFilter] = useState('')

  const filteredCourses = courses?.filter((course) => {
    return course.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
  })

  const removeCourse = (courseId) => {
    dispatch(deleteCourse(courseId))
  }

  const handleEnroll = (courseId, userId) => {
    dispatch(enroll(courseId, userId))
  }

  const handleUnenroll = (courseId, userId) => {
    dispatch(unEnroll(courseId, userId))
  }

  const handleSearch = (value) => {
    setFilter(value)
  }

  const confirmEnrolled = function (courseId, userId) {
    confirm({
      title: 'Do you Want to enroll in this course?',
      icon: <ExclamationCircleOutlined />,
      content: 'You have to enroll in the course to view its content',
      onOk() {
        handleEnroll(courseId, userId)
      },
      onCancel() {
        return
      }
    })
  }

  const handleCourseCardClick = (courseId, userId, userEnrolled) => {
    if (userEnrolled) history.push(`/app/course/${courseId}/modules`)
    else confirmEnrolled(courseId, userId)
  }

  if (loading) return <Spinner size="large" />

  return (
    <React.Fragment>
      <FlexSectionHeader>
        <Title level={3}>All Courses</Title>
        <Input.Search
          allowClear
          onSearch={handleSearch}
          placeholder="input search text"
          size="large"
          style={{ width: '300px', alignSelf: 'center' }}
        />
      </FlexSectionHeader>

      <div style={{ marginTop: '8px' }}>
        <Collapse
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          defaultActiveKey={['1']}
          ghost
        >
          <Collapse.Panel header={<Text strong>Public Courses</Text>} key="1">
            <List
              grid={{
                gutter: 24,
                column: 3,
                xs: 1,
                sm: 2,
                xxl: 5
              }}
              dataSource={filteredCourses}
              renderItem={(course) => (
                <List.Item>
                  <CourseCard
                    course={course}
                    removeCourse={() => removeCourse(course.id)}
                    handleEnroll={() => handleEnroll(course.id, user._id)}
                    handleUnenroll={() => handleUnenroll(course.id, user._id)}
                    onClick={() =>
                      handleCourseCardClick(
                        course.id,
                        user._id,
                        course.enrolled
                      )
                    }
                  />
                </List.Item>
              )}
            />
          </Collapse.Panel>
        </Collapse>
      </div>
    </React.Fragment>
  )
}

export default Courses
