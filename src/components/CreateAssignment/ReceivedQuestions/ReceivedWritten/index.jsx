import React from 'react'
import {
  ReceivedQuestionHeader,
  ReceivedQuestionTitle,
  ReceivedQuestionBody,
  QuestionIcon
} from './style'
import {
  DeleteOutlined,
  EditOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import { Button } from 'antd'

const ReceivedWritten = (props) => {
  const {
    Points,
    QuestionTitle,
    Answer,
    TextMatch,
    AutoGraded,
    QuestionType,
    KeyWords
  } = props.questionData
  const id = props.id + 1

  const DeleteQuestion = props.DeleteQuestion
  const del = () => {
    DeleteQuestion(props.questionData)
  }
  return (
    <ReceivedQuestionHeader>
      <ReceivedQuestionTitle>
        <QuestionTitle>Question {id}:</QuestionTitle>
        <QuestionIcon>
          (Points : {Points})
          <Button
            icon={<EditOutlined />}
            style={{ border: '0px', marginRight: '5px' }}
          ></Button>
          <Button
            icon={<DeleteOutlined />}
            style={{ border: '0px' }}
            onClick={del}
          ></Button>
        </QuestionIcon>
      </ReceivedQuestionTitle>
      <ReceivedQuestionBody>
        <div>
          <p>{QuestionTitle} :</p>
          <p>{Answer}</p>
        </div>

        <hr style={{ border: '0.5px solid #c2c2c2' }} />
        <div>
          Question Type : <b>{QuestionType}</b>
          &nbsp; TextMatch :{' '}
          {TextMatch ? (
            <CheckCircleOutlined
              style={{ fontSize: '16px', color: '#108ee9', margin: '5px' }}
            />
          ) : (
            <CloseCircleOutlined
              style={{ fontSize: '16px', color: 'gray', margin: '5px' }}
            />
          )}
          &nbsp; AutoGraded :{' '}
          {AutoGraded ? (
            <CheckCircleOutlined
              style={{ fontSize: '16px', color: '#108ee9', margin: '5px' }}
            />
          ) : (
            <CloseCircleOutlined
              style={{ fontSize: '16px', color: 'gray', margin: '5px' }}
            />
          )}
          &nbsp; KeyWords :{' '}
          {KeyWords.length > 0 ? (
            KeyWords.map((word, index) => <b key={index}>{word} </b>)
          ) : (
            <span>none</span>
          )}
        </div>
      </ReceivedQuestionBody>
    </ReceivedQuestionHeader>
  )
}

export default ReceivedWritten
