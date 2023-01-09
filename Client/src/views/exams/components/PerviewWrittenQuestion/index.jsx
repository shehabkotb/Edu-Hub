import React from 'react'
import {
  ReceivedQuestionHeader,
  ReceivedQuestionTitle,
  ReceivedQuestionBody,
  QuestionIcon,
  QuestionTitle
} from './style'
import {
  EditOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import { Button, Tag } from 'antd'

const ReceivedWritten = (props) => {
  const {
    points,
    question_text,
    ans,
    text_match,
    auto_graded,
    keywords,
    question_number
  } = props.question

  return (
    <ReceivedQuestionHeader>
      <ReceivedQuestionTitle>
        <QuestionTitle>Question {question_number}:</QuestionTitle>
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
        <div>
          <p>{question_text}</p>
          <p>
            <b>Model Answer: </b>
            {ans}
          </p>
        </div>

        <hr style={{ border: '0.5px solid #c2c2c2' }} />
        <div>
          Question Type : <b>Essay</b>
          &nbsp; TextMatch :{' '}
          {text_match ? (
            <CheckCircleOutlined
              style={{ fontSize: '16px', color: '#108ee9', margin: '5px' }}
            />
          ) : (
            <CloseCircleOutlined
              style={{ fontSize: '16px', color: 'gray', margin: '5px' }}
            />
          )}
          &nbsp; AutoGraded :{' '}
          {auto_graded ? (
            <CheckCircleOutlined
              style={{ fontSize: '16px', color: '#108ee9', margin: '5px' }}
            />
          ) : (
            <CloseCircleOutlined
              style={{ fontSize: '16px', color: 'gray', margin: '5px' }}
            />
          )}
          &nbsp; KeyWords:{' '}
          {keywords?.map((element, index) => {
            return (
              <Tag key={index} color="red">
                {element.key_word} : {element.weight}
              </Tag>
            )
          })}
        </div>
      </ReceivedQuestionBody>
    </ReceivedQuestionHeader>
  )
}

export default ReceivedWritten
