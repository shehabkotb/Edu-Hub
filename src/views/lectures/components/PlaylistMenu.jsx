import React from 'react'

import { List, Typography } from 'antd'
import styled from 'styled-components'

import VideoItem from './VideoItem'

export const Menu = styled.div`
  border-radius: 10px;
  overflow: hidden;
  border: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1);
`

const PlaylistMenu = (props) => {
  const { lectures, selectedLecture, chooseLecture } = props

  return (
    <Menu>
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
      <div style={{ height: '568px' }}>
        <List
          style={{ overflowY: 'auto', height: '100%' }}
          dataSource={lectures}
          renderItem={(lecture) => (
            <VideoItem
              lecture={lecture}
              highlight={lecture.id === selectedLecture.id}
              chooseLecture={() => chooseLecture(lecture.id)}
            />
          )}
        />
      </div>
    </Menu>
  )
}

export default PlaylistMenu
