import SpyLogic from './components/spyLogic'
import { Prompt, useParams } from 'react-router'
import './styles.css'
import { Affix, Col, Modal, Row } from 'antd'
import QuestionsSection from './components/QuestionsSection'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getOneSubmission } from '../../reducers/assessmentTakingReducer'
import Spinner from '../../components/Spinner'

const AssessmentTaking = (props) => {
  const dispatch = useDispatch()
  const { submission, loading } = useSelector((state) => state.assessmentTaking)

  const { courseId, assessmentId } = useParams()
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    dispatch(getOneSubmission(courseId, assessmentId, user._id))
  }, [dispatch])

  if (loading || Object.keys(submission).length === 0)
    return <Spinner size="large" />
  else if (submission.assessment.remainingTime <= 0) {
    Modal.error({
      title: 'The Exam has ended',
      onOk() {
        window.close()
      }
    })
    return null
  } else if (submission.finished) {
    Modal.info({
      title: 'You already submitted',
      onOk() {
        window.close()
      }
    })
    return null
  } else if (submission.assessment.status.code === 'willOpen') {
    Modal.info({
      title: "Exam didn't open yet",
      onOk() {
        window.close()
      }
    })
    return null
  }

  return (
    <>
      <Prompt
        when={true}
        message="You cant leave during the exam {press CANCEL to return, press OK to reset your exam"
      />
      <Row>
        <Col span={20}>
          <QuestionsSection submission={submission} />
        </Col>
        <Col span={4}>
          <Affix offsetTop={10}>
            {/* <SpyLogic
              timeRemaining={submission.assessment.remainingTime}
              examId={submission.assessment.id}
            /> */}
          </Affix>
        </Col>
      </Row>
    </>
  )
}

export default AssessmentTaking
