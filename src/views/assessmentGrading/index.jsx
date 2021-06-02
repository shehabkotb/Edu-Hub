import { Affix, Button, Divider, Form, Input, Space } from 'antd'
import { Col, Row, Typography } from 'antd'
import React from 'react'

import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { DateTime } from 'luxon'
import PlagarismTag from '../../components/PlagarismTag'
import GradingQuestionList from './components/GradingQuestionList'
import AutoGradingTag from '../../components/AutoGradingTag'

const { Text } = Typography

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
      autoGradingStatus: 'Graded',
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
            question_text: 'who is the president of the united states?',
            ans: 'f',
            id: '60b17e21d41e402a4c949f8a'
          },
          studentAnswer:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum vel nam, nobis ex voluptas voluptatem non sint voluptate ipsam magni libero. Quia rem debitis dolor aperiam ipsam ratione amet hic?'
        },
        {
          originQuestion: {
            choices: ['choice a', 'choice b', 'choice c'],
            text_match: false,
            type: 'MCQ',
            auto_graded: true,
            question_number: 2,
            points: 2,
            question_text: 's',
            ans: 'choice c',
            id: '60b17e21d41e402a4c949f8b'
          },
          studentAnswer: 'choice c'
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

const Grader = () => {
  const selectedSubmission = submissionsData.submissions[0]

  return (
    <Row gutter={[16, 16]}>
      <Col span={18}>
        <GradingQuestionList answers={selectedSubmission.answers} />
      </Col>

      <Col span={6}>
        <Affix offsetTop={10}>
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px 20px',
              borderRadius: '10px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Space>
                <Button type="text" icon={<ArrowLeftOutlined />}></Button>
                <Text>{selectedSubmission.student.name}</Text>
                <Button type="text" icon={<ArrowRightOutlined />}></Button>
              </Space>
            </div>
            <Divider />

            <Form layout="vertical">
              <Space size="large" direction="vertical">
                <Text>
                  Submission Time:{' '}
                  {DateTime.fromISO(
                    selectedSubmission.submittedAt
                  ).toLocaleString(DateTime.DATETIME_MED)}
                </Text>
                <Space>
                  <Text>Plagarism Degree: </Text>
                  <PlagarismTag status={selectedSubmission.plagarismStatus} />
                </Space>
                <Space>
                  <Text>AutoGrading Status: </Text>
                  <AutoGradingTag
                    status={selectedSubmission.autoGradingStatus}
                  />
                </Space>
                <Form.Item
                  initialValue={selectedSubmission.score}
                  label="Total Score:"
                  name="score"
                >
                  <Input style={{ width: '20%' }}></Input>
                </Form.Item>
              </Space>
              <Space style={{ marginTop: '26px' }}>
                <Button type="primary">Grade</Button>
                <Button>Cancel</Button>
              </Space>
            </Form>
          </div>
        </Affix>
      </Col>
    </Row>
  )
}

export default Grader
