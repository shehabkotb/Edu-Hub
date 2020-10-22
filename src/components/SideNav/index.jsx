import React from 'react'
import { Layout, Menu} from 'antd'

import {
  DesktopOutlined,
  PieChartOutlined,
  // FileOutlined,
  TeamOutlined,
  UserOutlined,
  CommentOutlined
} from '@ant-design/icons'

const SideNav = ({collapsed, onCollapse}) => {
  const { Sider } = Layout
  const {SubMenu} = Menu
  
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
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          My Courses
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          Browse
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="4" icon={<CommentOutlined />}>
          Community
        </Menu.Item>
        <SubMenu key="sub1" icon={<TeamOutlined />} title="Groups">
          <Menu.Item key="6">Place Holder 1</Menu.Item>
          <Menu.Item key="8">Place Holder 2</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}

export default SideNav
