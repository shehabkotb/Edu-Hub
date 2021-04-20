import { Link, useHistory, useParams } from 'react-router-dom'

import styled from 'styled-components'

import { GridContainer, VideoWrapper, Video, Info, Tabs, Menu } from './style'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { getAllLectures } from '../../reducers/lectureReducer'
import VideoInfo from './components/VideoInfo'
import { Typography, List } from 'antd'

const StyledListItem = styled(List.Item)`
  padding-left: 14px;
  cursor: pointer;
  justify-content: initial;

  background-color: ${(props) => props.highlight && '#d9d9d9'};
  &:hover {
    background-color: #d9d9d9;
  }
`

const VideoItem = ({ lecture, highlight, setLecture }) => {
  return (
    <StyledListItem onClick={() => setLecture()} highlight={highlight}>
      <img
        style={{ width: '100px', height: '56px' }}
        src={lecture.thumbnail.url}
        alt="video thumbnail"
      />
      <div style={{ paddingLeft: '8px' }}>
        <Typography.Text style={{ fontSize: '16px' }} strong>
          {lecture.title}
        </Typography.Text>
        <div>
          <Typography.Text type="secondary">{lecture.duration}</Typography.Text>
        </div>
      </div>
    </StyledListItem>
  )
}

const Lectures = (props) => {
  const dispatch = useDispatch()

  const { courseId, lectureId } = useParams()
  debugger

  useEffect(() => {
    dispatch(getAllLectures(courseId))
  }, [courseId, dispatch])

  const lectures = useSelector((state) => state.lectures)

  const [selectedLecture, setSelectedLecture] = useState(() => {
    if (!lectures) return null
    if (!lectureId) return lectures[0]
    const index = lectures.findIndex((lecture) => lecture.id === lectureId)
    if (index === -1) return null
    return lectures[index]
  })

  const [menuHeight, setMenuHeight] = useState(0)
  const menuRef = useRef(null)

  // useLayoutEffect(() => {
  //   setMenuHeight(menuRef.current.clientHeight - 70)
  // }, [])

  const selectLecture = (lectureId) => {
    const index = lectures.findIndex((lecture) => lecture.id === lectureId)
    if (index === -1) return
    setSelectedLecture(lectures[index])
  }

  // debugger
  if (!lectures || !selectedLecture) return <div>no lectures found</div>

  return (
    <GridContainer>
      <VideoWrapper>
        <Video
          title="courseVideo"
          src={`https://www.youtube.com/embed/${selectedLecture.videoId}`}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        ></Video>
      </VideoWrapper>

      <Menu ref={menuRef}>
        <div
          style={{
            height: '70px',
            backgroundColor: '#fafafa',
            padding: '20px',
            paddingRight: '0px'
          }}
        >
          <Typography.Title level={4}>Lectures Playlist</Typography.Title>
        </div>
        <div style={{ height: '700px' }}>
          <List
            style={{ overflowY: 'auto', height: '100%' }}
            dataSource={lectures}
            renderItem={(lecture) => (
              <VideoItem
                lecture={lecture}
                highlight={lecture.id === selectedLecture.id}
                setLecture={() => selectLecture(lecture.id)}
              />
            )}
          />
        </div>
      </Menu>
      <Info>
        <VideoInfo nextLecture={() => null} lecture={selectedLecture} />
      </Info>
      {/* <Tabs>Disscusion or tabs place holder</Tabs> */}
    </GridContainer>
  )
}

export default Lectures
