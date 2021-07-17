import React, { useEffect, useRef, useState } from 'react'

import { Row, Col, Image, Form, Input, Typography, Divider, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  endCourse,
  getOneCourse,
  updateCourse
} from '../../reducers/courseSettingsReducer'
import { useHistory, useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'

import { CompactPicker } from 'react-color'

const { Title, Text } = Typography

const CourseSettings = (props) => {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const history = useHistory()

  const [courseImage, setCourseImage] = useState(null)

  const [form] = Form.useForm()

  const course = useSelector((state) => state.courseSettings.data)
  const loading = useSelector((state) => state.courseSettings.loading)

  useEffect(() => {
    dispatch(getOneCourse(courseId))
  }, [])

  useEffect(() => {
    form.setFieldsValue({
      name: course.name,
      description: course.description,
      backgroundColor: course.backgroundColor,
      image: course.image
    })
    setCourseImage(course.image || null)
  }, [course])

  const handleSubmit = (values) => {
    dispatch(updateCourse(courseId, values))
  }

  const handleCourseEnd = () => {
    dispatch(endCourse(courseId)).then(() => history.push('/app/courses'))
  }

  if (loading) return <Spinner size="large" />

  const handleChangeImage = (event) => {
    console.log(event.target.value)
    setCourseImage(event.target.value)
  }

  const getColor = (event) => {
    console.log(event)
    return event.hex
  }

  return (
    <Form onFinish={handleSubmit} form={form} layout="vertical">
      <Row gutter={[48, 16]}>
        <Col span={8}>
          <Image placeholder={true} width={530} src={courseImage} />
          <Form.Item
            label={
              <Title style={{ marginBottom: '0', marginTop: '8px' }} level={5}>
                Course Image
              </Title>
            }
            name="image"
            onChange={handleChangeImage}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={16}>
          <div
            style={{
              backgroundColor: '#fafafa',
              height: 'auto',
              borderRadius: '10px',
              padding: '36px'
            }}
          >
            <Title level={3} style={{ marginBottom: '24px' }}>
              Settings
            </Title>
            <Divider />
            <Form.Item wrapperCol={{ span: 8 }} label="Course Name" name="name">
              <Input placeholder="Course Name" />
            </Form.Item>
            <Form.Item
              wrapperCol={{ span: 12 }}
              label="Course Description"
              name="description"
            >
              <Input.TextArea
                autoSize={{ minRows: 3, maxRows: 6 }}
                placeholder="Course Description"
                allowClear
              />
            </Form.Item>
            <Form.Item
              getValueFromEvent={getColor}
              label="Background Color"
              name="backgroundColor"
              valuePropName="color"
            >
              <CompactPicker />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
            <Divider />
            <Title
              style={{ color: 'firebrick', marginBottom: '24px' }}
              level={3}
            >
              Finalize Course
            </Title>

            <Text strong>
              If you end the course the current grades will be saved and the
              course will be archived
            </Text>
            <div style={{ marginTop: '16px' }}>
              <Button type="primary" danger onClick={handleCourseEnd}>
                End Course
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default CourseSettings
