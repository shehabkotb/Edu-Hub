import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Typography, Button, Modal, Form, Input, List } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { FlexSectionHeader } from './style'
import CourseCard from './components/CourseCard'

import { createCourse, getAllCourses } from '../../reducers/courseReducer'

import { STUDENT } from '../../constants/userRoles'
import { useHistory } from 'react-router-dom'

const Courses = () => {
  const { Title } = Typography

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCourses())
  }, [dispatch])

  const user = useSelector((state) => state.auth.user)
  const courses = useSelector((state) => state.courses)
  const history = useHistory()

  const [modalVisible, setModalVisible] = useState(false)
  const [form] = Form.useForm()

  const handleCancel = () => {
    setModalVisible(false)
  }

  const addCourse = (course) => {
    dispatch(createCourse(course))
  }

  return (
    <React.Fragment>
      <FlexSectionHeader>
        <Title level={3}>All Courses</Title>
        {user && user.role !== STUDENT && (
          <Button
            onClick={() => setModalVisible(true)}
            type="dashed"
            shape="round"
            icon={<PlusOutlined />}
          >
            Add Course
          </Button>
        )}
      </FlexSectionHeader>

      <Modal
        title="Add New Course"
        visible={modalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={form.submit}>
            Submit
          </Button>
        ]}
      >
        <Form
          name="add Course"
          form={form}
          onFinish={addCourse}
          requiredMark={false}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item
            name="courseName"
            label="Course Name"
            rules={[
              {
                required: true,
                message: 'Please enter the course name'
              }
            ]}
          >
            <Input placeholder="Course Name" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="(Optional)" allowClear />
          </Form.Item>

          <Form.Item name="image" label="Cover Image">
            <Input placeholder="(Optional) Image Url, defaults to random colour" />
          </Form.Item>
        </Form>
      </Modal>

      <div style={{ marginTop: '16px' }}>
        <List
          grid={{
            gutter: 24,
            column: 3,
            xs: 1,
            sm: 2,
            xxl: 5
          }}
          dataSource={courses}
          renderItem={(course) => (
            <List.Item>
              <CourseCard
                course={course}
                onClick={() => history.push(`/app/course/${course.id}`)}
              />
            </List.Item>
          )}
        />
      </div>
    </React.Fragment>
  )
}

export default Courses
