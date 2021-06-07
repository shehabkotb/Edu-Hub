import { Tag } from 'antd'
import React from 'react'

const AutoGradingTag = ({ status }) => {
  if (status === 'processing') return <Tag color="blue">{status}</Tag>
  else if (status === 'Graded') return <Tag color="green">{status}</Tag>
  else return <Tag color="default">Un Graded</Tag>
}

export default AutoGradingTag
