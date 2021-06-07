import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FlexSectionHeader } from '../../style'

import { Avatar, Button, Space, Table, Typography } from 'antd'
import { useParams } from 'react-router'
import useCoursePrivillege from '../../../hooks/useCourseprivilege'
import { STUDENT } from '../../../constants/userRoles'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'
import PlagarismTag from '../../../components/PlagarismTag'
import { getAllSubmissions } from '../../../reducers/submissionsReducer'
import Spinner from '../../../components/Spinner'

const { Title, Text } = Typography
const { Column } = Table

const submissionsData = {
  assessment: {
    type: 'Exam',
    visiblity: 'published',
    questions: ['60b17e21d41e402a4c949f8a', '60b17e21d41e402a4c949f8b'],
    files: [],
    title: 'Assessment Title',
    questionsType: 'online',
    submissionType: 'online',
    weight: 0.5,
    maxScore: 3,
    course: '60a65778348b1936c4257ba5',
    openAt: '2021-05-28T22:00:03.000Z',
    closeAt: '2021-05-28T22:00:05.919Z',
    createdAt: '2021-05-28T23:34:57.673Z',
    updatedAt: '2021-05-28T23:34:57.673Z',
    timeLimit: 2.919,
    remainingTime: -353356.236,
    status: {
      code: 'closed',
      message: 'assetment closed at May 29, 2021, 12:00 AM GMT+2'
    },
    id: '60b17e21d41e402a4c949f82'
  },
  submissions: [
    {
      course: '60a65778348b1936c4257ba5',
      assessment: '60b17e21d41e402a4c949f8c',
      plagarismStatus: 'processing',
      score: 1,
      student: {
        photo: 'https://www.w3schools.com/howto/img_avatar.png',
        _id: '60a3944f9219df36fc82ea60',
        name: 'admin'
      },
      files: [],
      answers: [
        {
          originQuestion: {
            text_match: false,
            type: 'Esay',
            auto_graded: true,
            keywords: [
              {
                key_word: 'x',
                weight: 0.1
              }
            ],
            question_number: 1,
            points: 1,
            question_text: 's',
            ans: 'f',
            id: '60b17e21d41e402a4c949f8a'
          },
          studentAnswer: 'esay answer'
        },
        {
          originQuestion: {
            choices: ['f', 'y'],
            text_match: false,
            type: 'MCQ',
            auto_graded: true,
            question_number: 2,
            points: 2,
            question_text: 's',
            ans: 'f',
            id: '60b17e21d41e402a4c949f8b'
          },
          studentAnswer: 'choice a'
        }
      ],
      submittedAt: '2021-05-30T02:34:27.380Z',
      id: '60b2f3641844e02a84cb7421'
    },
    {
      course: '60a65778348b1936c4257ba5',
      assessment: '60b17e21d41e402a4c949f8c',
      plagarismStatus: 'low',
      score: 5,
      student: {
        photo: 'https://www.w3schools.com/howto/img_avatar.png',
        _id: '60a3944f9219df36fc82ea60',
        name: 'admin'
      },
      files: [],
      answers: [
        {
          originQuestion: {
            text_match: false,
            type: 'Esay',
            auto_graded: true,
            keywords: [
              {
                key_word: 'x',
                weight: 0.1
              }
            ],
            question_number: 1,
            points: 1,
            question_text: 's',
            ans: 'f',
            id: '60b17e21d41e402a4c949f8a'
          },
          studentAnswer: 'esay answer'
        },
        {
          originQuestion: {
            choices: ['f', 'y'],
            text_match: false,
            type: 'MCQ',
            auto_graded: true,
            question_number: 2,
            points: 2,
            question_text: 's',
            ans: 'f',
            id: '60b17e21d41e402a4c949f8b'
          },
          studentAnswer: 'choice a'
        }
      ],
      submittedAt: '2021-05-30T02:34:27.380Z',
      id: '60b2f3641844e02a84cb742f'
    },
    {
      course: '60a65778348b1936c4257ba5',
      assessment: '60b17e21d41e402a4c949f8c',
      plagarismStatus: 'med',
      score: 10,
      student: {
        photo: 'https://www.w3schools.com/howto/img_avatar.png',
        _id: '60a3944f9219df36fc82ea60',
        name: 'admin'
      },
      files: [],
      answers: [
        {
          originQuestion: {
            text_match: false,
            type: 'Esay',
            auto_graded: true,
            keywords: [
              {
                key_word: 'x',
                weight: 0.1
              }
            ],
            question_number: 1,
            points: 1,
            question_text: 's',
            ans: 'f',
            id: '60b17e21d41e402a4c949f8a'
          },
          studentAnswer: 'esay answer'
        },
        {
          originQuestion: {
            choices: ['f', 'y'],
            text_match: false,
            type: 'MCQ',
            auto_graded: true,
            question_number: 2,
            points: 2,
            question_text: 's',
            ans: 'f',
            id: '60b17e21d41e402a4c949f8b'
          },
          studentAnswer: 'choice a'
        }
      ],
      submittedAt: '2021-05-30T02:34:27.380Z',
      id: '60b2f3641844e02a84cb742d'
    },
    {
      course: '60a65778348b1936c4257ba5',
      assessment: '60b17e21d41e402a4c949f8c',
      plagarismStatus: 'high',
      student: {
        photo: 'https://www.w3schools.com/howto/img_avatar.png',
        _id: '60a3944f9219df36fc82ea60',
        name: 'admin'
      },
      files: [],
      answers: [
        {
          originQuestion: {
            text_match: false,
            type: 'Esay',
            auto_graded: true,
            keywords: [
              {
                key_word: 'x',
                weight: 0.1
              }
            ],
            question_number: 1,
            points: 1,
            question_text: 's',
            ans: 'f',
            id: '60b17e21d41e402a4c949f8a'
          },
          studentAnswer: 'esay answer'
        },
        {
          originQuestion: {
            choices: ['f', 'y'],
            text_match: false,
            type: 'MCQ',
            auto_graded: true,
            question_number: 2,
            points: 2,
            question_text: 's',
            ans: 'f',
            id: '60b17e21d41e402a4c949f8b'
          },
          studentAnswer: 'choice a'
        }
      ],
      submittedAt: '2021-05-30T02:34:27.380Z',
      id: '60b2f3641844e02a84cb742c'
    },
    {
      course: '60a65778348b1936c4257ba5',
      assessment: '60b17e21d41e402a4c949f8c',
      plagarismStatus: 'veryHigh',
      student: {
        photo: 'https://www.w3schools.com/howto/img_avatar.png',
        _id: '60a3944f9219df36fc82ea60',
        name: 'admin'
      },
      files: [],
      answers: [
        {
          originQuestion: {
            text_match: false,
            type: 'Esay',
            auto_graded: true,
            keywords: [
              {
                key_word: 'x',
                weight: 0.1
              }
            ],
            question_number: 1,
            points: 1,
            question_text: 's',
            ans: 'f',
            id: '60b17e21d41e402a4c949f8a'
          },
          studentAnswer: 'esay answer'
        },
        {
          originQuestion: {
            choices: ['f', 'y'],
            text_match: false,
            type: 'MCQ',
            auto_graded: true,
            question_number: 2,
            points: 2,
            question_text: 's',
            ans: 'f',
            id: '60b17e21d41e402a4c949f8b'
          },
          studentAnswer: 'choice a'
        }
      ],
      submittedAt: '2021-05-30T02:34:27.380Z',
      id: '60b2f3641844e02a84cb742b'
    },
    {
      course: '60a65778348b1936c4257ba5',
      assessment: '60b17e21d41e402a4c949f8c',
      plagarismStatus: 'unCalculated',
      student: {
        photo: 'https://www.w3schools.com/howto/img_avatar.png',
        _id: '60a3944f9219df36fc82ea60',
        name: 'admin'
      },
      files: [],
      answers: [
        {
          originQuestion: {
            text_match: false,
            type: 'Esay',
            auto_graded: true,
            keywords: [
              {
                key_word: 'x',
                weight: 0.1
              }
            ],
            question_number: 1,
            points: 1,
            question_text: 's',
            ans: 'f',
            id: '60b17e21d41e402a4c949f8a'
          },
          studentAnswer: 'esay answer'
        },
        {
          originQuestion: {
            choices: ['f', 'y'],
            text_match: false,
            type: 'MCQ',
            auto_graded: true,
            question_number: 2,
            points: 2,
            question_text: 's',
            ans: 'f',
            id: '60b17e21d41e402a4c949f8b'
          },
          studentAnswer: 'choice a'
        }
      ],
      submittedAt: '2021-05-30T02:34:27.380Z',
      id: '60b2f3641844e02a84cb742a'
    }
  ]
}

const Submissions = (props) => {
  const dispatch = useDispatch()

  const { courseId, assessmentId } = useParams()
  const { privilege } = useCoursePrivillege()

  const data = useSelector((state) => state.submissions.data)
  const loading = useSelector((state) => state.submissions.loading)

  const { assessment, submissions } = data || {}

  useEffect(() => {
    dispatch(getAllSubmissions(courseId, assessmentId))
  }, [])

  if (loading) return <Spinner size="large" />

  return (
    <>
      <FlexSectionHeader>
        <Title level={3}>
          All Submissions for <Text type="secondary">{assessment?.title}</Text>
        </Title>
        {privilege !== STUDENT && (
          <Button
            // onClick={() => history.push(`/app/course/${courseId}/exams/create`)}
            type="primary"
          >
            Check Plagarism
          </Button>
        )}
      </FlexSectionHeader>

      <Table
        pagination={false}
        style={{ marginTop: '24px' }}
        rowKey={(submission) => submission.id}
        dataSource={submissions}
      >
        <Column
          title="Photo"
          dataIndex={['student', 'photo']}
          render={(img) => <Avatar src={img} />}
        />
        <Column title="Name" dataIndex={['student', 'name']} />
        <Column
          title="Submission Time"
          dataIndex="submittedAt"
          render={(time) => {
            if (!time) return '-'
            else
              return DateTime.fromISO(time).toLocaleString(
                DateTime.DATETIME_MED
              )
          }}
        />
        <Column
          title="Plagirism Degree"
          dataIndex="plagarismStatus"
          render={(plagarismStatus) => (
            <PlagarismTag status={plagarismStatus} />
          )}
        />
        <Column
          title="Score"
          dataIndex="score"
          render={(score) => (score === undefined ? '-' : score)}
        />
        <Column
          title="Action"
          render={(text, record, index) => (
            <Link
              to={{
                pathname: `/app/course/${courseId}/assessment/${assessmentId}/grade`,
                state: { index: index }
              }}
            >
              Grade
            </Link>
          )}
        />
      </Table>
    </>
  )
}

export default Submissions
