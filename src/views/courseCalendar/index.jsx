import React from 'react'
import { Calendar, Badge, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllCalendarEvents } from '../../reducers/calendarReducer'
import Spinner from '../../components/Spinner'
import { DateTime } from 'luxon'

import './index.css'

const { Title } = Typography

const CourseCalendar = () => {
  const dispatch = useDispatch()

  const calendarEvents = useSelector((state) => state.calendar.data)
  const loading = useSelector((state) => state.calendar.loading)

  useEffect(() => {
    dispatch(getAllCalendarEvents())
  }, [])

  function getListData(value) {
    const day = value.date()
    const month = value.month()
    const year = value.year()

    const listData = calendarEvents?.[year]?.[month + 1]?.[day] || []
    return listData
  }

  function dateCellRender(value) {
    const listData = getListData(value)
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.assessmentId}>
            <Badge
              style={{ fontSize: '6px' }}
              status={item.type === 'Exam' ? 'error' : 'warning'}
              text={`${item.title} at ${DateTime.fromISO(
                item.deadline
              ).toLocaleString(DateTime.TIME_SIMPLE)}`}
            />
          </li>
        ))}
      </ul>
    )
  }

  if (loading) return <Spinner size="large" />

  return (
    <>
      <Title level={3}>Calendar</Title>
      <Calendar
        style={{ padding: '0 20px', marginTop: '16px' }}
        dateCellRender={dateCellRender}
      />
    </>
  )
}

export default CourseCalendar
