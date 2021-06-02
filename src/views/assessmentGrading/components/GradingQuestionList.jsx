import React from 'react'

import { Button, Divider, Typography } from 'antd'
import WrittenQuestion from './WrittenQuestion'
import Styled from 'styled-components'
import ChoiceQuestion from './ChoiceQuestion'

const { Title, Text } = Typography

const Container = Styled.div`
    background-color: #fafafa;
    width: 95%;
    margin: 0 auto;
    border-radius: 10px;
    padding: 20px 20px;
`

const GradingQuestionList = (props) => {
  const { answers } = props

  return (
    <>
      <Container>
        <Title level={3}>
          Submissions left 5 <Text type="secondary">out of</Text> 10
        </Title>
        <Divider />
        {answers?.map((question, index) => {
          if (question.originQuestion.type === 'MCQ')
            return (
              <ChoiceQuestion
                key={index}
                question={question.originQuestion}
                studentAnswer={question.studentAnswer}
              />
            )
          if (question.originQuestion.type === 'Esay')
            return (
              <WrittenQuestion
                key={index}
                question={question.originQuestion}
                studentAnswer={question.studentAnswer}
              />
            )
          return null
        })}
      </Container>
    </>
  )
}

export default GradingQuestionList
