import { Table, Tag, Space, Button } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import StudentGradeBook from './studentGB'
import SummaryTable from './summaryGB'
import InfoTable from './infoTable'
import { PieChart } from 'reaviz'

const InstructorGradeBook = ({ courseId, id }) => {
  const [student, setStudent] = useState('')
  const [showSt, setShowst] = useState(false)
  const [fltr, setFltr] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const [vis, setVis] = useState(true)
  const [fVis, setFVis] = useState(false)

  const submitions = useSelector((state) =>
    state.courseGradebook.filter((v) => v.assessment != null)
  )

  const columns = [
    {
      title: 'Student',
      dataIndex: 'student',
      key: 'student',
      render: (text) => (
        <a
          onClick={() => {
            console.log(text._id)
            setStudent(text._id)
            setVis(false)
            setFVis(false)
            setShowst(true)
          }}
        >
          {text.name}
        </a>
      )
    },
    {
      title: 'Type',
      dataIndex: 'assessment',
      key: 'assessment',
      render: (text) => <span>{text.type}</span>
    },
    {
      title: 'Title',
      dataIndex: 'assessment',
      key: 'assessment',
      render: (text) => (
        <a
          onClick={() => {
            console.log(text.title)
            setFltr(text.title)
            setVis(false)
            setFVis(false)
            setShowInfo(true)
          }}
        >
          {text.title}
        </a>
      )
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

  const getUnique = (arr) => {
    var unique = []
    var res = []
    for (let i = 0; i < arr.length; i++) {
      if (!unique.includes(arr[i].assessment.id)) {
        unique.push(arr[i].assessment.id)
        res.push(arr[i])
      }
    }
    return res
  }

  return (
    <div>
      {vis && (
        <>
          <PieChart
            width={350}
            height={250}
            data={getUnique(submitions)
              .map((v) => {
                let res = {
                  key: v.assessment.title,
                  data: Number(v.assessment.weight * 100)
                }
                return res
              })
              .sort(function (a, b) {
                return b.data - a.data
              })}
          />
          <Button
            onClick={() => {
              setShowInfo(false)
              setFVis(true)
              setVis(false)
              setFltr('')
            }}
          >
            Open Summary Gradebook
          </Button>
          <Table
            rowKey={(record) => record?.id}
            columns={columns}
            dataSource={submitions}
            bordered
            title={() => {
              return 'The Instructor GradeBook'
            }}
            pagination={false}
          />
        </>
      )}
      {showInfo && (
        <>
          <Button
            onClick={() => {
              setShowInfo(false)
              setFVis(false)
              setVis(true)
              setFltr('')
            }}
          >
            Close Information Gradebook
          </Button>
          <InfoTable courseId={courseId} data={submitions} filter={fltr} />
        </>
      )}
      {showSt && (
        <>
          <Button
            onClick={() => {
              setShowst(false)
              setShowInfo(false)
              setFVis(false)
              setVis(true)
              setStudent('')
            }}
          >
            Close Student Gradebook
          </Button>
          <StudentGradeBook courseId={courseId} id={student} />
        </>
      )}
      {fVis && (
        <>
          <Button
            onClick={() => {
              setShowst(false)
              setShowInfo(false)
              setFVis(false)
              setVis(true)
              setStudent('')
            }}
          >
            Close Summary Gradebook
          </Button>
          <SummaryTable courseId={courseId} />
        </>
      )}
    </div>
  )
}

export default InstructorGradeBook
