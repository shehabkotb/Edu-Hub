import SpyLogic from './components/spyLogic'
import { Prompt, useParams } from 'react-router'
import './styles.css'
import { Col, Row } from 'antd'
import QuestionsSection from './components/QuestionsSection'
import { useDispatch, useSelector } from 'react-redux'
import { getOneSubmission } from '../../reducers/submissionReducer'
import { useEffect } from 'react'

import Spinner from '../../components/Spinner'

const assessment = {
  type: 'Exam',
  title: 'test assessment',
  maxScore: 10,
  questionsType: 'online',
  submissionType: 'online',
  course: '60a65778348b1936c4257ba5',
  visiblity: 'published',
  dueDate: '2021-05-20T12:46:51.964+00:00',
  weight: 0.2,
  questions: [
    {
      id: '80185',
      type: 'MCQ',
      question_number: 1,
      points: 5,
      question_text: 'who is the current president of the united states?',
      auto_graded: true,
      choices: ['choice a', 'choice b'],
      ans: 'choice a'
    },
    {
      id: '80186',
      type: 'Esay',
      question_number: 2,
      points: 5,
      question_text: 'who is the current president of the united states?',
      auto_graded: true,
      text_match: true,
      keywords: [{ key_word: 'first keyword', weight: 0.2 }],
      ans: 'essay answer'
    }
  ]
}

const CheatingDetection = (props) => {
  return (
    <>
      <Prompt
        when={true}
        message="You cant leave during the exam {press CANCEL to return, press OK to reset your exam"
      />
      <Row>
        <Col span={20}>
          <QuestionsSection />
        </Col>
        <Col span={4}>{/* <SpyLogic /> */}</Col>
      </Row>
    </>
  )
}

export default CheatingDetection
