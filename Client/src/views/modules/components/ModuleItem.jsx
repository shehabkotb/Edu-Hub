import React from 'react'

import { List, Space, Button } from 'antd'
import styled from 'styled-components'

import {
  FileOutlined,
  YoutubeOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import { useHistory, useParams } from 'react-router'

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

  const { courseId } = useParams()

  const history = useHistory()

  const getActions = (item) => {
    if (instructorAccess)
      return (
        <span
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          <Button
            onClick={() => removeModuleItem(item)}
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
      onClick={() => {
        if (type === 'file') window.open(url, '_parent')
        else {
          history.push(`/app/course/${courseId}/lectures/${item.id}`)
        }
      }}
    >
      <Space size={20}>
        {getIcon(item)}
        {title}
      </Space>
    </HoverableListItem>
  )
}

export default ModuleItem
