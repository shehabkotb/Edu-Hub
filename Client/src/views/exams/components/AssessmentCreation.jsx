import { Col, Row, Modal } from 'antd'

import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  clear,
  submitAssessment
} from '../../../reducers/assessmentCreationReducer'

import { useHistory, useParams } from 'react-router'

import AssessmentOptionsMenu from './AssessmentOptionsMenu'
import AssessmentQuestionsSection from './AssessmentQuestionsSection'

const AssessmentCreation = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { courseId } = useParams()

  const assessmentType = props.assessmentType

  const questions = useSelector((state) => state.assessmentCreation.questions)
  const [title, setTitle] = useState('Assessment Title')

  const [controlledQuestionType, setControlledQuestionType] = useState('online')

  const [files, setFiles] = useState([])

  useEffect(() => {
    return () => {
      dispatch(clear())
    }
  }, [dispatch])

  const handlecontrolledQuestionType = (value) => {
    setControlledQuestionType(value)
  }

  const handleSubmit = (values) => {
    const openTime = values.time?.[0]?.toISOString()
    const closeTime = values.time?.[1]?.toISOString()
    const check = questions.filter((question) => question.status === 'DRAFT')

    if (check.length > 0 && values.questionsType === 'online') {
      Modal.info({
        title: 'Unsaved Questions',
        content: 'save all questions before submitting'
      })
      return
    }

    const assessment = {
      title: title,
      ...values,
      type: assessmentType,
      course: courseId,
      questions:
        questions.filter((question) => question.status !== 'DRAFT') || [],
      openAt: openTime,
      closeAt: closeTime,
      files: files,
      time: undefined,
      dueDate:
        assessmentType === 'Assignment'
          ? values.dueDate.toISOString()
          : undefined
    }

    dispatch(submitAssessment(courseId, assessment)).then(() => {
      const location = assessmentType === 'Exam' ? 'exams' : 'assignments'
      history.push(`/app/course/${courseId}/${location}`)
    })
  }

  const getMaxScore = () => {
    return questions.reduce((acumalator, item) => {
      if (item.points) return acumalator + item.points
      return acumalator
    }, 0)
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={18}>
        <AssessmentQuestionsSection
          controlledQuestionType={controlledQuestionType}
          files={files}
          setFiles={setFiles}
          questions={questions}
          title={title}
          setTitle={setTitle}
        />
      </Col>

      <Col span={6}>
        <AssessmentOptionsMenu
          controlledQuestionType={controlledQuestionType}
          handlecontrolledQuestionType={handlecontrolledQuestionType}
          assessmentType={assessmentType}
          maxScore={getMaxScore()}
          handleSubmit={handleSubmit}
        />
      </Col>
    </Row>
  )
}

export default AssessmentCreation
