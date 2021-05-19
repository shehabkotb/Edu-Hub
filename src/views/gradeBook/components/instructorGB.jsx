import { Table, Tag, Space, Button } from 'antd'
import React, { useState, useEffect } from 'react'
import StudentGradeBook from './studentGB'
import InfoTable from './infoTable'
import { PieChart } from 'reaviz'

const InstructorGradeBook = ({ courseId, id }) => {
  const [student,setStudent]=useState('');
  const [showSt, setShowst] = useState(false)
  const [fltr, setFltr] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const [vis, setVis] = useState(true)
  const data = [
        {
      _id: '60a37a321603505219f483b5',
      type: 'assignment',
      name: 'Assignment2',
      assignmentId: '60a37c6153bd8067a3a13dc3',
      studentId: '60a37c775f5a214ad11a7b92',
      score: 3,
      maxScore: 10, // populated from exam or assignment
      weight: '10%', // populated from exam or assignment
      gradedAt: '2021-02-23T15:39:00.860+00:00',
      gradedBy: '60a37e59b5f990769e04d9ec',
      submissionId: '60a37e6eb29acadd362dc9g8'
    },
    {
      _id: '60a37a321603505219f483b1',
      type: 'exam',
      name: 'Quiz2',
      examsId: '60a37c6153bd8067a3a13dc3',
      studentId: '60a37c775f5a214ad11a7b93',
      score: 25,
      maxScore: 40, // populated from exam or assignment
      weight: '30%', // populated from exam or assignment
      gradedAt: '2021-05-23T15:39:00.860+00:00',
      gradedBy: '60a37e59b5f990769e04d9ec',
      submissionId: '60a37e6eb29acadd362dc9g5'
    },
    {
      _id: '60a37a321603505219f483b9',
      type: 'exam',
      name: 'Quiz1',
      examsId: '60a37c6153bd8067a3a13dc3',
      studentId: '60a37c775f5a214ad11a7b90',
      score: 30,
      maxScore: 40, // populated from exam or assignment
      weight: '40%', // populated from exam or assignment
      gradedAt: '2021-04-23T15:39:00.860+00:00',
      gradedBy: '60a37e59b5f990769e04d9ec',
      submissionId: '60a37e6eb29acadd362dc9f7'
    },
    {
      _id: '60a37a321603505219f483b9',
      type: 'assignment',
      name: 'Assignment1',
      assignmentId: '60a37c6153bd8067a3a13dc3',
      studentId: '60a37c775f5a214ad11a7b91',
      score: 5,
      maxScore: 10, // populated from exam or assignment
      weight: '5%', // populated from exam or assignment
      gradedAt: '2021-03-23T15:39:00.860+00:00',
      gradedBy: '60a37e59b5f990769e04d9ec',
      submissionId: '60a37e6eb29acadd362dc9f7'
    },
    {
      _id: '60a37a321603505219f483b1',
      type: 'exam',
      name: 'Quiz2',
      examsId: '60a37c6153bd8067a3a13dc3',
      studentId: '60a37c775f5a214ad11a7b92',
      score: 20,
      maxScore: 40, // populated from exam or assignment
      weight: '30%', // populated from exam or assignment
      gradedAt: '2021-05-23T15:39:00.860+00:00',
      gradedBy: '60a37e59b5f990769e04d9ec',
      submissionId: '60a37e6eb29acadd362dc9f5'
    },
    {
      _id: '60a37a321603505219f483b5',
      type: 'assignment',
      name: 'Assignment2',
      assignmentId: '60a37c6153bd8067a3a13dc3',
      studentId: '60a37c775f5a214ad11a7b93',
      score: 7,
      maxScore: 10, // populated from exam or assignment
      weight: '10%', // populated from exam or assignment
      gradedAt: '2021-02-23T15:39:00.860+00:00',
      gradedBy: '60a37e59b5f990769e04d9ec',
      submissionId: '60a37e6eb29acadd362dc9f8'
    }
  ]

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
      key: 'name',
      render: (text) => (
        <a
          onClick={() => {
            setFltr(text)
            setVis(false)
            setShowInfo(true)
          }}
        >
          {text}
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
    <div>
      {vis && (
        <>
          <PieChart
            width={350}
            height={250}
            data={data.map((v) => {
              let res = {
                key: v.name,
                data: Number(v.weight.slice(0, -1))
              }
              return res
            })}
          />
          <Table
            columns={columns}
            dataSource={data}
            bordered
            title={() => {
              return 'The Instructor "' + id + '" GradeBook: "' + courseId + '"'
            }}
          />
        </>
      )}
      {showInfo && (
        <>
          <Button
            onClick={() => {
              setShowInfo(false)
              setVis(true)
              setFltr('')
            }}
          >
            Close Information Gradebook
          </Button>
          <InfoTable courseId={courseId} data={data} filter={fltr} />
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
    </div>
  )
}

export default InstructorGradeBook
