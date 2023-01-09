import { Tag } from 'antd'
import React from 'react'

const PlagarismTag = ({ status }) => {
  if (status === 'processing') return <Tag color="blue">{status}</Tag>
  else if (status === 'none') return <Tag color="green">{status}</Tag>
  else if (status === 'med') return <Tag color="orange">{status}</Tag>
  else if (status === 'high') return <Tag color="volcano">{status}</Tag>
  else if (status === 'veryHigh') return <Tag color="red">{status}</Tag>
  else return <Tag color="default">Un Calculated</Tag>
}

export default PlagarismTag
