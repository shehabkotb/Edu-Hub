import React from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { LogoPlaceHolder } from './style'

import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  CommentOutlined,
  SettingOutlined
} from '@ant-design/icons'

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
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to="/app/courses">My Courses</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          <Link to="/app/browse">Browse</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          <Link to="/app/Dashboard">Browse</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<CommentOutlined />}>
          <Link to="/app/Community">Community</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<TeamOutlined />} title="Groups">
          <Menu.Item key="5">Place Holder 1</Menu.Item>
          <Menu.Item key="6">Place Holder 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="7" icon={<SettingOutlined />}>
          <Link to="/app/profile">Profile</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default SideNav
