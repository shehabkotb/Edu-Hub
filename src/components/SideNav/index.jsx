import React from 'react'
import { Layout, Menu } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'

import {
  UserOutlined,
  CalendarOutlined,
  DashboardOutlined,
  CrownOutlined,
  HddOutlined
} from '@ant-design/icons'

import { RiArticleLine } from 'react-icons/ri'
import { ImBooks } from 'react-icons/im'
import Logo from '../Logo'

const SideNav = (props) => {
  const { collapsed, onCollapse } = props
  const { Sider } = Layout

  let currentPath = useLocation().pathname

  // dummy fix for side nav highlight
  if (currentPath.includes('/app/course/'))
    currentPath = currentPath.replace('/app/course/', '/app/courses/')

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      breakpoint="lg"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0
      }}
    >
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => (window.location = 'https://gp-eduhub.github.io/')}
      >
        <Logo collapsed={collapsed} />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        activeKey={currentPath}
        selectedKeys={currentPath}
      >
        <Menu.Item key="/app/dashboard" icon={<DashboardOutlined />}>
          <NavLink to="/app/dashboard">Dashboard</NavLink>
        </Menu.Item>
        <Menu.Item key="/app/courses" icon={<ImBooks />}>
          <NavLink to="/app/courses">Courses</NavLink>
        </Menu.Item>
        <Menu.Item key="/app/calendar" icon={<CalendarOutlined />}>
          <NavLink to="/app/calendar">Calendar</NavLink>
        </Menu.Item>
        <Menu.Item key="/app/articles" icon={<RiArticleLine />}>
          <NavLink to="/app/articles">Articles</NavLink>
        </Menu.Item>
        {/* <SubMenu key="sub1" icon={<TeamOutlined />} title="Groups">
          <Menu.Item key="5">Place Holder 1</Menu.Item>
          <Menu.Item key="6">Place Holder 2</Menu.Item>
        </SubMenu> */}
        <Menu.Item key="/app/acheivements" icon={<CrownOutlined />}>
          <NavLink to="/app/acheivements">Acheivements</NavLink>
        </Menu.Item>
        <Menu.Item key="/app/archives" icon={<HddOutlined />}>
          <NavLink to="/app/archives">Archives</NavLink>
        </Menu.Item>
        <Menu.Item key="/app/profile" icon={<UserOutlined />}>
          <NavLink to="/app/profile">Profile</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default SideNav
