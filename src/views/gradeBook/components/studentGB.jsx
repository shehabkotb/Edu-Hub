import { Table, Tag, Space } from 'antd'
import { BarChart, GridlineSeries, Gridline } from 'reaviz'

const StudentGradeBook = ({ courseId, id }) => {
  const data = {
    studentId: '60a53ebf6b9b5a2db206ba8a',
    totalScore: '33%', // sum( (score / maxScore) * weight ) * 100
    assignmentsScore: '3%',
    examsScore: '30%',
    finalExamsScore: '40%',
    grade: 'D',
    grades: [
      {
        _id: '60a37a321603505219f483b9',
        type: 'exam',
        name: 'Quiz1',
        examsId: '60a37c6153bd8067a3a13dc3',
        score: 30,
        maxScore: 40, // populated from exam or assignment
        weight: '40%', // populated from exam or assignment
        gradedAt: '2021-04-23T15:39:00.860+00:00',
        gradedBy: '60a37e59b5f990769e04d9ec'
      },
      {
        _id: '60a37a321603505219f483b9',
        type: 'assignment',
        name: 'Assignment1',
        assignmentId: '60a37c6153bd8067a3a13dc3',
        score: 5,
        maxScore: 10, // populated from exam or assignment
        weight: '5%', // populated from exam or assignment
        gradedAt: '2021-03-23T15:39:00.860+00:00',
        gradedBy: '60a37e59b5f990769e04d9ec'
      },
      {
        _id: '60a37a321603505219f483b1',
        type: 'exam',
        name: 'Quiz2',
        examsId: '60a37c6153bd8067a3a13dc3',
        score: 30,
        maxScore: 40, // populated from exam or assignment
        weight: '30%', // populated from exam or assignment
        gradedAt: '2021-05-23T15:39:00.860+00:00',
        gradedBy: '60a37e59b5f990769e04d9ec'
      },
      {
        _id: '60a37a321603505219f483b5',
        type: 'assignment',
        name: 'Assignment2',
        assignmentId: '60a37c6153bd8067a3a13dc3',
        score: 5,
        maxScore: 10, // populated from exam or assignment
        weight: '10%', // populated from exam or assignment
        gradedAt: '2021-02-23T15:39:00.860+00:00',
        gradedBy: '60a37e59b5f990769e04d9ec'
      }
    ]
  }

  const columns = [
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
    {
      title: 'Final Exam',
      dataIndex: 'finalExamsScore',
      key: 'finalExamsScore'
    },
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
        data={data.grades.map((v) => {
          let res = {
            key: v.name,
            data: v.score / v.maxScore
          }
          return res
        })}
        gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
      />
      <Table
        columns={columns}
        dataSource={data.grades}
        bordered
        title={() => {
          return 'The Student "' + id + '" GradeBook: "' + courseId + '"'
        }}
        footer={() => {
          return (
            <Table
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
