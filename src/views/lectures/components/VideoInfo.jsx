import styled from 'styled-components'

const Container = styled.div`
  background-color: #fafafa;
  border-radius: 10px;
  overflow: hidden;
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

const VideoInfo = ({ lecture }) => {
  return (
    <Container>
      <div>
        <InfoTitle>{lecture.title}</InfoTitle>
        <InfoDate>{lecture.publishedAt}</InfoDate>
      </div>
    </Container>
  )
}

export default VideoInfo
