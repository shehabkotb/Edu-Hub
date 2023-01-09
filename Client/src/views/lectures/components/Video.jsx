import React from 'react'

import styled from 'styled-components'

export const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
`

export const VideoFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Video = (props) => {
  const { selectedLecture } = props
  return (
    <VideoWrapper>
      <VideoFrame
        title="courseVideo"
        src={`https://www.youtube.com/embed/${selectedLecture.videoId}`}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        allowFullScreen
      ></VideoFrame>
    </VideoWrapper>
  )
}

export default Video
