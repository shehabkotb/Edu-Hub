import React from 'react'

import { Button, Dropdown, Menu } from 'antd'
import { Link, NavLink, useRouteMatch } from 'react-router-dom'

import { DownOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

const CourseMenu = ({ url }) => {
  return (
    <Menu>
      <Menu.Item>
        <Link to={`${url}/announcments`}>Announcments</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`${url}/gradebook`}>GradeBook</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`${url}/discussions`}>Discussions</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`${url}/files`}>Files</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`${url}/particpants`}>Particpants</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`${url}/settings`}>Settings</Link>
      </Menu.Item>
    </Menu>
  )
}

const CourseNavigation = () => {
  const { params, url } = useRouteMatch('/app/course/:id')

  let course = useSelector((state) =>
    state.courses.find((course) => course.id === params.id)
  )

  // dummy fix for now
  if (course === undefined) {
    course = { backgroundColor: 'darkkhaki', name: 'redux empty dummy fix' }
  }

  return (
    <>
      <Dropdown overlay={<CourseMenu url={url} />} placement="bottomCenter">
        <Button
          shape="round"
          style={{ backgroundColor: course.backgroundColor }}
        >
          <span style={{ fontWeight: 600, color: 'white' }}>{course.name}</span>{' '}
          <DownOutlined style={{ color: 'white' }} />
        </Button>
      </Dropdown>
      <NavLink to={`${url}/modules`}>
        <Button type="text">Modules</Button>
      </NavLink>
      <NavLink to={`${url}/assignments`}>
        <Button type="text">Assignments</Button>
      </NavLink>
      <NavLink to={`${url}/quizes`}>
        <Button type="text">Quizes</Button>
      </NavLink>
      <NavLink to={`${url}/exams`}>
        <Button type="text">Exams</Button>
      </NavLink>
      <NavLink to={`${url}/exam/12345`} target="_blank">
        <Button type="text">CheatingDetection</Button>
      </NavLink>
    </>
  )
}

export default CourseNavigation
