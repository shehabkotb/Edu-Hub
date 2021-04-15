import React from 'react'

import { List, Space, Typography, Button } from 'antd'
import styled from 'styled-components'

import {
  FileOutlined,
  YoutubeOutlined,
  DeleteOutlined
} from '@ant-design/icons'

const HoverableListItem = styled(List.Item)`
  cursor: pointer;
  padding-left: 8px;
  font-size: 16px;
  &:hover {
    background-color: #f0f0f0;
    color: #1890ff;
  }
`

const getIcon = (item) => {
  if (item.type === 'video') return <YoutubeOutlined />
  if (item.type === 'file') return <FileOutlined />
}

const ModuleItem = ({ item, instructorAccess, removeModuleItem }) => {
  const { title, type, url } = item

  const dummyBackend = 'http://localhost:4000'
  const navigationURL = type === 'video' ? url : `${dummyBackend}${url}`

  const getActions = (item) => {
    if (instructorAccess)
      return (
        <span
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          <Button
            onClick={() => removeModuleItem(item.id)}
            type="text"
            icon={<DeleteOutlined />}
            danger
          />
        </span>
      )
    return null
  }

  return (
    <HoverableListItem
      extra={getActions(item)}
      onClick={() => window.open(navigationURL, '_blank')}
    >
      <Space size={20}>
        {getIcon(item)}
        {title}
      </Space>
    </HoverableListItem>
  )
}

export default ModuleItem
