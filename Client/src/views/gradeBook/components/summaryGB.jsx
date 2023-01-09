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
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './../styles.css'

const SummaryTable = ({ courseId }) => {
  const [student, setStudent] = useState('')
  const [showSt, setShowst] = useState(false)
  const [vis, setVis] = useState(true)

  const studentGrades = useSelector((state) => state.summaryGradebook)

  const fCol = [
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
      title: 'Assignments',
      dataIndex: 'assignmentsScore',
      key: 'assignmentsScore',
      sorter: {
        compare: (a, b) =>
          Number(a.assignmentsScore.slice(0, -1)) -
          Number(b.assignmentsScore.slice(0, -1))
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
    /*{
      title: 'Final Exam',
      dataIndex: 'finalExamsScore',
      key: 'finalExamsScore',
      sorter: {
        compare: (a, b) =>
          Number(a.finalExamsScore.slice(0, -1)) - Number(b.finalExamsScore.slice(0, -1))
      }
    },*/
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

  const calculateDistribution = (arr) => {
    var a = [],
      b = [],
      prev
    var res = []
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

    for (var i = 0; i < a.length; i++) {
      res.push({ key: a[i] + '%', data: b[i] })
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
                    key: v.student.name,
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
            rowKey={(record) => record.id}
            columns={fCol}
            dataSource={studentGrades}
            bordered
            pagination={false}
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
