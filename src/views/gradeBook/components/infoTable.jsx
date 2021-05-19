import { Table, Tag, Space, Button } from 'antd'
import { BarChart, GridlineSeries, Gridline } from 'reaviz'
import StudentGradeBook from './studentGB'
import React, { useState, useEffect } from 'react'


const InfoTable = ({ courseId, data, filter }) => {
    const [student,setStudent]=useState('');
    const [showSt, setShowst] = useState(false)
    const idata = data.filter((v) => {
      return v.type == filter
    })
    const columns = [
      {
        title: 'Student',
        dataIndex: 'studentId',
        key: 'studentId',
        render: (text) => (
          <a
            onClick={() => {
              setStudent(text)
              setShowst(true)
            }}
          >
            {text}
          </a>
        )
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type'
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Score',
        dataIndex: 'score',
        key: 'score',
        sorter: {
          compare: (a, b) => a.score - b.score
        }
      },
      {
        title: 'Max Score',
        dataIndex: 'maxScore',
        key: 'maxScore',
        sorter: {
          compare: (a, b) => a.maxScore - b.maxScore
        }
      },
      {
        title: 'Weight',
        dataIndex: 'weight',
        key: 'weight',
        sorter: {
          compare: (a, b) =>
            Number(a.weight.slice(0, -1)) - Number(b.weight.slice(0, -1))
        }
      },
      {
        title: 'Graded At',
        key: 'gradedAt',
        sorter: {
          compare: (a, b) => new Date(a.gradedAt) - new Date(b.gradedAt)
        },
        render: (text, record) => (
          <Space size="middle">
            <a>{new Date(record.gradedAt).toLocaleString()}</a>
          </Space>
        )
      }
    ]

  return (
    <>
      <BarChart
        width={350}
        height={250}
        data={idata.map((v) => {
          let res = {
            key: v.studentId,
            data: v.score / v.maxScore
          }
          return res
        })}
        gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
      />
      <Table columns={columns} dataSource={idata} />
      {showSt == true && (
        <>
          <Button
            onClick={() => {
              setShowst(false)
              setStudent('')
            }}
          >
            Close
          </Button>
          <StudentGradeBook courseId={courseId} id={student} />
        </>
      )}
    </>
  )
}

export default InfoTable