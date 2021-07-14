import {
  Affix,
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Typography
} from 'antd'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router'

const { Title, Text } = Typography
const { RangePicker } = DatePicker
const { Option } = Select

const AssessmentOptionsMenu = (props) => {
  const [form] = Form.useForm()
  const { courseId } = useParams()
  const history = useHistory()

  const {
    handleSubmit,
    maxScore,
    controlledQuestionType,
    handlecontrolledQuestionType,
    assessmentType
  } = props

  useEffect(() => {
    form.setFieldsValue({
      maxScore,
      questionsType: controlledQuestionType,
      submissionType:
        controlledQuestionType === 'file'
          ? 'written'
          : form.getFieldValue('submissionType')
    })
  }, [form, maxScore, controlledQuestionType])

  return (
    <Affix offsetTop={10}>
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px 20px',
          borderRadius: '10px'
        }}
      >
        <Title level={4}>{assessmentType} Options</Title>
        <Divider />
        <Form
          form={form}
          onFinish={handleSubmit}
          name="options"
          layout={'vertical'}
        >
          <Form.Item
            name="questionsType"
            style={{ width: '60%' }}
            label={<Text strong>Questions Type</Text>}
          >
            <Select onChange={handlecontrolledQuestionType}>
              <Option value="online">Add Questions Online</Option>
              <Option value="file">Attach File</Option>
            </Select>
          </Form.Item>
          <Form.Item
            initialValue="online"
            name="submissionType"
            style={{ width: '60%' }}
            label={<Text strong>Submission Type</Text>}
          >
            <Select disabled={controlledQuestionType === 'file'}>
              <Option value="online">Online</Option>
              <Option value="written">Upload Written File</Option>
            </Select>
          </Form.Item>
          {assessmentType === 'Exam' && (
            <Form.Item
              name="time"
              label={<Text strong>Open & Close time</Text>}
              rules={[
                {
                  type: 'array',
                  required: true,
                  message: 'Please select time!'
                }
              ]}
            >
              <RangePicker
                use12Hours
                placeholder={['OpenTime', 'CloseTime']}
                showTime={{
                  format: 'HH:mm:ss'
                }}
                format="YYYY-MM-DD HH:mm:ss"
              />
            </Form.Item>
          )}
          {assessmentType === 'Assignment' && (
            <Form.Item
              name="dueDate"
              style={{ width: '60%' }}
              label={<Text strong>Due </Text>}
            >
              <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime />
            </Form.Item>
          )}
          <Form.Item
            name="weight"
            label={<Text strong>Course weight</Text>}
            rules={[{ required: true }]}
          >
            <Input style={{ width: '25%' }} placeholder="eg. 0.2" />
          </Form.Item>
          <Form.Item
            name="maxScore"
            style={{ width: '60%' }}
            label={<Text strong>Max Score</Text>}
          >
            <InputNumber disabled={controlledQuestionType === 'online'} />
          </Form.Item>

          <Space style={{ marginTop: '8px' }}>
            <Button
              onClick={() => {
                form.submit()
              }}
              type="primary"
            >
              Create
            </Button>
            <Button
              onClick={() =>
                history.push(
                  `/app/course/${courseId}/${assessmentType.toLowerCase()}s`
                )
              }
            >
              Cancel
            </Button>
          </Space>
        </Form>
      </div>
    </Affix>
  )
}

export default AssessmentOptionsMenu
