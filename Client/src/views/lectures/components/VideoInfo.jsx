import { Typography } from 'antd'
import styled from 'styled-components'

const Container = styled.div`
  background-color: #fafafa;
  border-radius: 10px;
  overflow: hidden;
  align-items: center;
  padding: 8px 12px;
`

const InfoDate = styled.div`
  color: #bfbfbf;
  font-size: 12px;
  font-weight: 600;
`

const VideoInfo = ({ lecture }) => {
  return (
    <Container>
      <div>
        <Typography.Title style={{ margin: '0px' }} level={4}>
          {lecture.title}
        </Typography.Title>
        <InfoDate style={{ marginTop: '4px' }}>{lecture.publishedAt}</InfoDate>
      </div>
    </Container>
  )
}

export default VideoInfo
