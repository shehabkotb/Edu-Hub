import styled from 'styled-components'

import { Button } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'

const Container = styled.div`
  /* display: flex; */
  /* justify-content: space-between; */
  align-items: center;
  padding: 8px 12px;
`

const InfoTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`

const InfoDate = styled.div`
  color: #bfbfbf;
  font-size: 12px;
  font-weight: 600;
`

const VideoInfo = ({ nextLecture, lecture }) => {
  return (
    <Container>
      <div>
        <InfoTitle>{lecture.title}</InfoTitle>
        <InfoDate>{lecture.publishedAt}</InfoDate>
      </div>

      {/* <Button
        onClick={() => {
          props.next()
        }}
        shape="circle"
        type="secondary"
        icon={<ArrowRightOutlined />}
      ></Button> */}
    </Container>
  )
}

export default VideoInfo
