import React from 'react'
import { Form, DatePicker } from 'antd'
import { piker } from './style'
const { RangePicker } = DatePicker
const rangeConfig = {
  rules: [
    {
      type: 'array',
      required: true,
      message: 'Please select time!'
    }
  ]
}

const TimeRelatedForm = () => {
  return (
    <Form.Item name="date" {...rangeConfig}>
      <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" style={piker} />
    </Form.Item>
  )
}

export default TimeRelatedForm
