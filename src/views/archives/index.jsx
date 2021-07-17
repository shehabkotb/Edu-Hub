import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, Typography } from 'antd'

import Spinner from '../../components/Spinner'
import CourseCard from '../../components/CourseCard'
import { useHistory } from 'react-router-dom'
import { getAllCourses } from '../../reducers/courseReducer'

const { Title } = Typography

const Archives = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const archivedCourses = useSelector((state) =>
    state.courses.data.filter((course) => course.status === 'archived')
  )
  const loading = useSelector((state) => state.courses.loading)

  useEffect(() => {
    dispatch(getAllCourses())
  }, [])

  if (loading) return <Spinner size="large" />

  return (
    <>
      <Title level={3}>Archives</Title>
      <List
        grid={{
          gutter: 24,
          column: 3,
          xs: 1,
          sm: 2,
          xxl: 5
        }}
        dataSource={archivedCourses}
        renderItem={(course) => (
          <List.Item>
            <CourseCard
              course={course}
              disableEnroll
              onClick={() => history.push(`/app/course/${course.id}/modules`)}
            />
          </List.Item>
        )}
      />
    </>
  )
}

export default Archives
