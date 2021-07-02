import React from 'react'

import { Typography, Tag } from 'antd'

const { Text } = Typography

const SubmissionTimeTag = (props) => {
  const { code, message } = props.status

  return (
    <>
      {code === 'late' && <Tag color="red">{code}</Tag>}
      {code === 'onTime' && <Tag color="green">{code}</Tag>}
      <Text type="secondary">{message}</Text>
    </>
  )
}

export default SubmissionTimeTag
