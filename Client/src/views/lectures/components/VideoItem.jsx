import React from 'react'

import { Typography, List } from 'antd'
import styled from 'styled-components'

const StyledListItem = styled(List.Item)`
  padding-left: 14px;
  cursor: pointer;
  justify-content: initial;
  overflow-x: hidden;

  &:hover {
    background-color: #d9d9d9;
  }
`

const VideoItem = ({ lecture, highlight, chooseLecture }) => {
  return (
    <StyledListItem
      onClick={() => chooseLecture()}
      style={{ backgroundColor: highlight ? '#d9d9d9' : undefined }}
    >
      <img
        style={{ width: '100px', height: '56px' }}
        src={lecture.thumbnail.url}
        alt="video thumbnail"
      />
      <div style={{ paddingLeft: '8px', width: '100%' }}>
        <Typography.Text
          ellipsis={true}
          style={{ fontSize: '16px', width: '65%' }}
          strong
        >
          {lecture.title}
        </Typography.Text>
        <div>
          <Typography.Text type="secondary">{lecture.duration}</Typography.Text>
        </div>
      </div>
    </StyledListItem>
  )
}

export default VideoItem
