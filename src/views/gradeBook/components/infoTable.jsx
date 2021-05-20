import { Table, Tag, Space, Button } from 'antd'
import { BarChart, GridlineSeries, Gridline } from 'reaviz'
import StudentGradeBook from './studentGB'
import React, { useState, useEffect } from 'react'


const InfoTable = ({ courseId, data, filter }) => {
    const [student,setStudent]=useState('');
    const [showSt, setShowst] = useState(false)
    const [vis, setVis] = useState(true)
    const idata = data.filter((v) => {
      return v.name == filter
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
              setVis(false)
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
            {new Date(record.gradedAt).toLocaleString()}
          </Space>
        )
      }
    ]

  return (
    <>
      {vis && (
        <>
          <BarChart
            width={350}
            height={250}
            data={idata
              .map((v) => {
                let res = {
                  key: v.studentId,
                  data: v.score / v.maxScore
                }
                return res
              })
              .sort(function (a, b) {
                return b.data - a.data
              })}
            gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
          />
          <Table columns={columns} dataSource={idata} bordered />
        </>
      )}
      {showSt && (
        <>
          <Button
            onClick={() => {
              setShowst(false)
              setVis(true)
              setStudent('')
            }}
          >
            Close Student Gradebook
          </Button>
          <StudentGradeBook courseId={courseId} id={student} />
        </>
      )}
    </>
  )
}

export default InfoTable