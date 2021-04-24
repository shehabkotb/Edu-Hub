import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Empty, Row, Col } from 'antd'

import Video from './components/Video'
import VideoInfo from './components/VideoInfo'
import PlaylistMenu from './components/PlaylistMenu'
import LectureComments from './components/LectureComments'

import { getAllLectures } from '../../reducers/lectureReducer'
import Spinner from '../../components/Spinner'

const selectLecture = (lectures, lectureId) => {
  if (!Array.isArray(lectures) || !lectures.length) return null
  if (!lectureId) return lectures[0]
  const index = lectures.findIndex((lecture) => lecture.id === lectureId)
  if (index === -1) return null
  return lectures[index]
}

const LecturePage = (props) => {
  const { lectures } = props
  const { lectureId } = useParams()

  const [selectedLecture, setSelectedLecture] = useState(
    selectLecture(lectures, lectureId)
  )

  if (!selectedLecture) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />

  const chooseLecture = (lectureId) => {
    setSelectedLecture(selectLecture(lectures, lectureId))
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={18}>
          <Video selectedLecture={selectedLecture}></Video>
        </Col>

        <Col xs={24} sm={24} md={6}>
          <PlaylistMenu
            lectures={lectures}
            selectedLecture={selectedLecture}
            chooseLecture={chooseLecture}
          ></PlaylistMenu>
        </Col>
      </Row>

      <Row gutter={[0, 16]}>
        <Col xs={24} sm={24} md={18}>
          <VideoInfo lecture={selectedLecture} />
        </Col>
      </Row>

      <Row>
        <Col xs={24} sm={24} md={18}>
          <LectureComments selectedLecture={selectedLecture} />
        </Col>
      </Row>
    </>
  )
}

const Lectures = () => {
  const dispatch = useDispatch()

  const { courseId } = useParams()

  useEffect(() => {
    dispatch(getAllLectures(courseId))
  }, [courseId, dispatch])

  const loading = useSelector((state) => state.lectures.loading)
  const lectures = useSelector((state) => state.lectures.data)

  if (loading) {
    return <Spinner size="large" />
  }

  return <LecturePage lectures={lectures} />
}

export default Lectures
