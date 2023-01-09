import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components'

import { PlusOutlined, CaretRightOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Collapse,
  Empty,
  Form,
  Input,
  List,
  Modal,
  Row,
  Typography
} from 'antd'
import { FlexSectionHeader } from '../style'

import { STUDENT } from '../../constants/userRoles'

import {
  createCourse,
  getAllCourses,
  deleteCourse,
  unEnroll
} from '../../reducers/courseReducer'
import Spinner from '../../components/Spinner'
import CourseCard from '../../components/CourseCard'
import { useHistory } from 'react-router'
import { getAllDeadlines } from '../../reducers/deadlinesReducer'
import { DateTime } from 'luxon'

import { FileTextOutlined } from '@ant-design/icons'
import { AiOutlineSolution } from 'react-icons/ai'

const { Title, Text } = Typography

const Dashboard = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getAllCourses())
    dispatch(getAllDeadlines())
  }, [dispatch])

  const user = useSelector((state) => state.auth.user)
  const courses = useSelector((state) =>
    state.courses.data.filter((course) => course.status !== 'archived')
  )
  const loading = useSelector((state) => state.courses.loading)
  const deadlines = useSelector((state) => state.deadlines.data)
  const deadlinesLoading = useSelector((state) => state.deadlines.loading)

  const [form] = Form.useForm()
  const [modalVisible, setModalVisible] = useState(false)

  const enrolledCourses = courses.filter((course) => course.enrolled)

  const handleCancel = () => {
    setModalVisible(false)
  }

  const addCourse = (course) => {
    dispatch(createCourse(course))
  }

  const removeCourse = (courseId) => {
    dispatch(deleteCourse(courseId))
  }

  const handleUnenroll = (courseId, userId) => {
    dispatch(unEnroll(courseId, userId))
  }

  const handleCourseCardClick = (courseId) => {
    history.push(`/app/course/${courseId}/modules`)
  }

  if (loading) return <Spinner size="large" />

  return (
    <>
      <FlexSectionHeader>
        <Title level={3}>Dashboard</Title>
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

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={16} xl={19}>
          {/* might refactor this in it's own component */}
          <div style={{ marginTop: '8px' }}>
            <Collapse
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              defaultActiveKey={['1']}
              ghost
            >
              <Collapse.Panel header={<Text strong>My Courses</Text>} key="1">
                <List
                  grid={{
                    gutter: 24,
                    column: 2,
                    xs: 1,
                    sm: 2,
                    xxl: 4
                  }}
                  dataSource={enrolledCourses}
                  renderItem={(course) => (
                    <List.Item>
                      <CourseCard
                        course={course}
                        removeCourse={() => removeCourse(course.id)}
                        handleUnenroll={() =>
                          handleUnenroll(course.id, user._id)
                        }
                        onClick={() => handleCourseCardClick(course.id)}
                      />
                    </List.Item>
                  )}
                />
              </Collapse.Panel>
            </Collapse>
          </div>
        </Col>

        <Col xs={24} sm={24} md={24} lg={8} xl={5}>
          <DeadlinesViewer loading={deadlinesLoading} deadlines={deadlines} />
        </Col>
      </Row>
    </>
  )
}

const DeadLinesContainer = styled.div`
  height: auto;
  width: 100%;
  /* background-color: #061178; */
  /* color: white; */
  /* display: flex;
  justify-content: center;
  align-items: center; */
  /* margin-top: 66px; */
`

const DeadlineItem = styled(List.Item)`
  background-color: #fafafa;
  padding: 20px;
`

const DeadlinesViewer = (props) => {
  const { loading, deadlines } = props

  if (loading) return <Spinner size="large" />

  return (
    <DeadLinesContainer>
      <div
        style={{
          height: '70px',
          backgroundImage:
            'linear-gradient(rgba(0, 109, 117, 1), rgba(0, 109, 117, 0.3))',
          color: 'white',
          padding: '20px',
          paddingRight: '0px'
        }}
      >
        <Typography.Title style={{ color: 'white' }} level={4}>
          Upcoming Deadlines
        </Typography.Title>
      </div>
      <List
        style={{ maxHeight: '445px', overflow: 'hidden', overflowY: 'auto' }}
        dataSource={deadlines.filter((item) => {
          return DateTime.fromISO(item.deadline) >= DateTime.now()
        })}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={'No Deadlines'}
            />
          )
        }}
        renderItem={(item) => {
          const date = DateTime.fromISO(item.deadline)
          return (
            <DeadlineItem>
              <List.Item.Meta
                avatar={
                  item.type === 'Exam' ? (
                    <AiOutlineSolution style={{ fontSize: '16px' }} />
                  ) : (
                    <FileTextOutlined />
                  )
                }
                title={
                  <a
                    href={`/app/course/${
                      item.course.id
                    }/${item.type.toLowerCase()}/${item.assessmentId}`}
                  >
                    {item.title}
                  </a>
                }
                description={item.course.name}
              />
              <Text style={{ width: '80px' }} type="secondary">
                {date.toLocaleString(DateTime.DATETIME_MED)}
              </Text>
            </DeadlineItem>
          )
        }}
      />
    </DeadLinesContainer>
  )
}

export default Dashboard
