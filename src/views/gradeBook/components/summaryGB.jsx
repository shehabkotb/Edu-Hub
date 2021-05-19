import { Table, Tag, Space, Button } from 'antd'
import { BarChart, GridlineSeries, Gridline } from 'reaviz'
import StudentGradeBook from './studentGB'
import React, { useState, useEffect } from 'react'

const SummaryTable = ({ courseId }) => {
  const [student, setStudent] = useState('')
  const [showSt, setShowst] = useState(false)
  const [vis, setVis] = useState(true)

  
  const studentGrades = [
    {
      studentId: '60a37c775f5a214ad11a7b90',
      totalScore: '33%', // sum( (score / maxScore) * weight ) * 100
      assignmentsScore: '3%',
      examsScore: '30%',
      finalExamsScore: '40%',
      grade: 'D'
    },
    {
      studentId: '60a37c775f5a214ad11a7b91',
      totalScore: '33%', // sum( (score / maxScore) * weight ) * 100
      assignmentsScore: '3%',
      examsScore: '30%',
      finalExamsScore: '40%',
      grade: 'D'
    },
    {
      studentId: '60a37c775f5a214ad11a7b92',
      totalScore: '33%', // sum( (score / maxScore) * weight ) * 100
      assignmentsScore: '3%',
      examsScore: '30%',
      finalExamsScore: '40%',
      grade: 'D'
    },
    {
      studentId: '60a37c775f5a214ad11a7b93',
      totalScore: '33%', // sum( (score / maxScore) * weight ) * 100
      assignmentsScore: '3%',
      examsScore: '30%',
      finalExamsScore: '40%',
      grade: 'D'
    }
  ]

  const fCol = [
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
      title: 'Assignments',
      dataIndex: 'assignmentsScore',
      key: 'assignmentsScore',
      sorter: {
        compare: (a, b) =>
          Number(a.assignmentsScore.slice(0, -1)) - Number(b.assignmentsScore.slice(0, -1))
      }
    },
    {
      title: 'Exams',
      dataIndex: 'examsScore',
      key: 'examsScore',
      sorter: {
        compare: (a, b) =>
          Number(a.examsScore.slice(0, -1)) - Number(b.examsScore.slice(0, -1))
      }
    },
    {
      title: 'Final Exam',
      dataIndex: 'finalExamsScore',
      key: 'finalExamsScore',
      sorter: {
        compare: (a, b) =>
          Number(a.finalExamsScore.slice(0, -1)) - Number(b.finalExamsScore.slice(0, -1))
      }
    },
    {
      title: 'Total Score',
      dataIndex: 'totalScore',
      key: 'totalScore',
      sorter: {
        compare: (a, b) =>
          Number(a.totalScore.slice(0, -1)) - Number(b.totalScore.slice(0, -1))
      }
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade'
    }
  ]

  return (
    <>
      {vis && (
        <>
          <BarChart
            width={350}
            height={250}
            data={studentGrades.map((v) => {
              let res = {
                key: v.studentId,
                data: Number(v.totalScore.slice(0, -1))
              }
              return res
            })}
            gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
          />
          <Table
            columns={fCol}
            dataSource={studentGrades}
            bordered
            title={() => 'students summary gradebook'}
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

export default SummaryTable
