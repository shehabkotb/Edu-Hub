import { Table, Tag, Space } from 'antd'
import { BarChart, GridlineSeries, Gridline } from 'reaviz'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'

const StudentGradeBook = ({ courseId, id }) => {
  const data = useSelector(
    (state) => state.summaryGradebook.filter((val) => val.student._id === id)[0]
  )

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Name',
      dataIndex: 'title',
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
        compare: (a, b) => Number(a.weight) - Number(b.weight)
      },
      render: (text) => <span>{String(text * 100) + '%'}</span>
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

  const fCol = [
    {
      title: 'Assignments',
      dataIndex: 'assignmentsScore',
      key: 'assignmentsScore'
    },
    {
      title: 'Exams',
      dataIndex: 'examsScore',
      key: 'examsScore'
    },
    /*{
      title: 'Final Exam',
      dataIndex: 'finalExamsScore',
      key: 'finalExamsScore'
    },*/
    {
      title: 'Total Score',
      dataIndex: 'totalScore',
      key: 'totalScore'
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade'
    }
  ]

  return (
    <div>
      <BarChart
        width={350}
        height={250}
        data={data?.grades
          ?.map((v) => {
            let res = {
              key: v.title,
              data: v.score / v.maxScore
            }
            return res
          })
          .sort(function (a, b) {
            return b.data - a.data
          })}
        gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
      />
      <Table
        rowKey={(record) => record?.id}
        columns={columns}
        dataSource={data?.grades}
        bordered
        title={() => {
          return 'The Student GradeBook'
        }}
        footer={() => {
          return (
            <Table
              rowKey={(record) => record?.id}
              columns={fCol}
              dataSource={[data]}
              bordered
              title={() => 'The course summary'}
              pagination={false}
            />
          )
        }}
        pagination={false}
      />
    </div>
  )
}

export default StudentGradeBook
