import { Table, Tag, Space } from 'antd'

const StudentGradeBook = ({ courseId }) => {
  const data = [
    {
      _id: '60a37a321603505219f483b9',
      type: 'exam',
      name: 'Quiz1',
      examsId: '60a37c6153bd8067a3a13dc3',
      studentId: '60a37c775f5a214ad11a7b92',
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
      studentId: '60a37c775f5a214ad11a7b92',
      score: 5,
      maxScore: 10, // populated from exam or assignment
      weight: '5%', // populated from exam or assignment
      gradedAt: '2021-03-23T15:39:00.860+00:00',
      gradedBy: '60a37e59b5f990769e04d9ec',
      submissionId: '60a37e6eb29acadd362dc9f7'
    }
  ]

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text) => <a>{text}</a>
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
        compare: (a, b) => Number(a.weight.slice(0, -1)) - Number(b.weight.slice(0, -1))
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
    <div>
      <div>The Student GradeBook:</div>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default StudentGradeBook
