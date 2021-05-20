import { Table, Tag, Space, Button } from 'antd'
import {
  BarChart,
  GridlineSeries,
  Gridline,
  BarSeries,
  Bar,
  GuideBar
} from 'reaviz'
import StudentGradeBook from './studentGB'
import React, { useState, useEffect } from 'react'
import './../styles.css'

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
      finalExamsScore: '50%',
      grade: 'D'
    },
    {
      studentId: '60a37c775f5a214ad11a7b91',
      totalScore: '53%', // sum( (score / maxScore) * weight ) * 100
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
      totalScore: '43%', // sum( (score / maxScore) * weight ) * 100
      assignmentsScore: '3%',
      examsScore: '30%',
      finalExamsScore: '30%',
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

  const calculateDistribution = (arr)=>{
    var a = [],b = [],prev
    var res=[]
    arr.sort(function (a, b) {
      return (
        Number(a.totalScore.slice(0, -1)) - Number(b.totalScore.slice(0, -1))
      )
    })
    for (var i = 0; i < arr.length; i++) {
      if (Number(arr[i].totalScore.slice(0, -1)) !== prev) {
        a.push(Number(arr[i].totalScore.slice(0, -1)))
        b.push(1)
      } else {
        b[b.length - 1]++
      }
      prev = Number(arr[i].totalScore.slice(0, -1))
    }

    for (var i=0;i<a.length;i++){
      res.push({ key: a[i]+"%", data: b[i] })
    }
    console.log(res)
    return res
  }

  return (
    <>
      {vis && (
        <>
          <div className="barRow">
            <BarChart
              className="bar1"
              width={350}
              height={250}
              data={studentGrades
                .map((v) => {
                  let res = {
                    key: v.studentId,
                    data: Number(v.totalScore.slice(0, -1))
                  }
                  return res
                })
                .sort(function (a, b) {
                  return b.data - a.data
                })}
              gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
            />
            <BarChart
              className="bar2"
              width={350}
              height={250}
              data={calculateDistribution(studentGrades)}
              gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
              series={
                <BarSeries
                  padding={Number('Padding', 0.1)}
                  bar={
                    <Bar
                      gradient={Bar.defaultProps.gradient}
                      guide={<GuideBar />}
                    />
                  }
                />
              }
            />
          </div>
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
