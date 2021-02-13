import React from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { LogoPlaceHolder } from './style'

import {
  UserOutlined,
  CalendarOutlined,
  DashboardOutlined,
  CrownOutlined
} from '@ant-design/icons'

import { RiArticleLine } from 'react-icons/ri'
import { ImBooks } from 'react-icons/im'

const SideNav = ({ collapsed, onCollapse }) => {
  const { Sider } = Layout
  const { SubMenu } = Menu

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
      <LogoPlaceHolder />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/app/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ImBooks />}>
          <Link to="/app/courses">Courses</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<CalendarOutlined />}>
          <Link to="/app/calendar">Calendar</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<RiArticleLine />}>
          <Link to="/app/articles">Articles</Link>
        </Menu.Item>
        {/* <SubMenu key="sub1" icon={<TeamOutlined />} title="Groups">
          <Menu.Item key="5">Place Holder 1</Menu.Item>
          <Menu.Item key="6">Place Holder 2</Menu.Item>
        </SubMenu> */}
        <Menu.Item key="7" icon={<CrownOutlined />}>
          <Link to="/app/acheivements">Acheivements</Link>
        </Menu.Item>
        <Menu.Item key="8" icon={<UserOutlined />}>
          <Link to="/app/profile">Profile</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default SideNav
