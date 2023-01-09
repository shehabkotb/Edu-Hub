import { Table, Space, Button } from 'antd'
import { BarChart, GridlineSeries, Gridline } from 'reaviz'
import StudentGradeBook from './studentGB'
import React, { useState } from 'react'

const InfoTable = ({ courseId, data, filter }) => {
  const [student, setStudent] = useState('')
  const [showSt, setShowst] = useState(false)
  const [vis, setVis] = useState(true)
  const idata = data.filter((v) => {
    return v.assessment.title == filter
  })
  const columns = [
    {
      title: 'Student',
      dataIndex: 'student',
      key: 'student',
      render: (text) => (
        <a
          onClick={() => {
            setStudent(text._id)
            setVis(false)
            setShowst(true)
          }}
        >
          {text.name}
        </a>
      )
    },
    {
      title: 'Title',
      dataIndex: 'assessment',
      key: 'assessment',
      render: (text) => <span>{text.title}</span>
    },
    {
      title: 'Type',
      dataIndex: 'assessment',
      key: 'assessment',
      render: (text) => <span>{text.type}</span>
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
      dataIndex: 'assessment',
      key: 'assessment',
      render: (text) => <span>{text.maxScore}</span>,
      sorter: {
        compare: (a, b) => a.assessment.maxScore - b.assessment.maxScore
      }
    },
    {
      title: 'Weight',
      dataIndex: 'assessment',
      key: 'assessment',
      render: (text) => <span>{String(text.weight * 100) + '%'}</span>,
      sorter: {
        compare: (a, b) =>
          Number(a.assessment.weight) - Number(b.assessment.weight)
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
                  key: v.student.name,
                  data: v.score / v.assessment.maxScore
                }
                return res
              })
              .sort(function (a, b) {
                return b.data - a.data
              })}
            gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
          />
          <Table
            columns={columns}
            dataSource={idata}
            bordered
            pagination={false}
          />
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
