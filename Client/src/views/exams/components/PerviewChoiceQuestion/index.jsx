import React from 'react'
import {
  EditOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import { Button } from 'antd'
import {
  ReceivedQuestionHeader,
  ReceivedQuestionTitle,
  ReceivedQuestionBody,
  QuestionTitlea,
  QuestionIcon
} from './style'

const ReceivedChoice = (props) => {
  const { points, question_text, choices, auto_graded, question_number, ans } =
    props.question

  return (
    <ReceivedQuestionHeader>
      <ReceivedQuestionTitle>
        <QuestionTitlea>Question {question_number}:</QuestionTitlea>
        <QuestionIcon>
          (Points : {points})
          <Button
            icon={<EditOutlined />}
            style={{ border: '0px', marginRight: '5px' }}
            onClick={() => props.draftQuestion(question_number)}
          ></Button>
        </QuestionIcon>
      </ReceivedQuestionTitle>
      <ReceivedQuestionBody>
        <p>{question_text}</p>
        <p>
          <b>Choices:</b>
        </p>
        {choices ? (
          choices?.map((value, index) => (
            <p key={index}>
              &nbsp;{value}
              {value === ans && (
                <CheckCircleOutlined
                  style={{ fontSize: '16px', color: '#108ee9', margin: '5px' }}
                />
              )}{' '}
            </p>
          ))
        ) : (
          <p>invalid choices</p>
        )}
        <hr style={{ border: '0.5px solid #c2c2c2' }} />
        <div>
          Question Type :<b> Choice </b> , &nbsp; AutoGraded :{' '}
          {auto_graded ? (
            <CheckCircleOutlined
              style={{ fontSize: '16px', color: '#108ee9', margin: '5px' }}
            />
          ) : (
            <CloseCircleOutlined
              style={{ fontSize: '16px', color: 'gray', margin: '5px' }}
            />
          )}
        </div>
      </ReceivedQuestionBody>
    </ReceivedQuestionHeader>
  )
}

export default ReceivedChoice
