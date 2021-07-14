import { Typography, Table, Avatar } from 'antd'
import { DateTime } from 'luxon'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { getAllAchievements } from '../../reducers/achievementsReducer'
import { FlexSectionHeader } from '../style'

const { Title } = Typography
const { Column } = Table

const Achievements = (props) => {
  const dispatch = useDispatch()

  const achievements = useSelector((state) => state.achievements.data)
  const loading = useSelector((state) => state.achievements.loading)

  useEffect(() => {
    dispatch(getAllAchievements())
  }, [])

  if (loading) return <Spinner size="large" />

  return (
    <>
      <Title level={3}>Achievements</Title>

      <Table
        pagination={false}
        style={{ marginTop: '24px' }}
        rowKey={(achievement) => achievement.id}
        dataSource={achievements}
      >
        <Column
          title="Photo"
          dataIndex={['user', 'photo']}
          render={(img) => <Avatar src={img} />}
        />
        <Column title="Course Name" dataIndex={['course', 'name']} />
        <Column
          title="Finished At"
          dataIndex="finishedAt"
          render={(time) => {
            if (!time) return '-'
            else
              return DateTime.fromISO(time).toLocaleString(
                DateTime.DATETIME_MED
              )
          }}
        />

        <Column
          title="Grade"
          dataIndex="gradeLetter"
          render={(grade) => {
            if (!grade) return '-'
            else return grade
          }}
        />
        <Column
          title="Certificate"
          dataIndex="certificate"
          render={(certificate) => {
            if (!certificate) return '-'
            else return <a href={`${certificate}`}>certificate</a>
          }}
        />
      </Table>
    </>
  )
}

export default Achievements
