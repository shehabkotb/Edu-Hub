import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { Route, Switch } from 'react-router-dom'
import SignUp from '../../views/publicPages/SignUp'
import Login from '../../views/publicPages/Login'
// import NotFounded from '../../views/publicPages/NotFounded'
import Courses from '../../views/courses'
import './App.css'
import 'antd/dist/antd.css'
import 'ant-design-pro/dist/ant-design-pro.css'

import ProfileIcon from '../ProfileIcon'
import DropDownNotification from '../DropDownNotification'

import {
  DesktopOutlined,
  PieChartOutlined,
  // FileOutlined,
  TeamOutlined,
  UserOutlined,
  CommentOutlined
} from '@ant-design/icons'

const App = () => {
  return (
    <Switch>
      <Route path="/Register" component={SignUp} />
      <Route path="/Login" component={Login} />
      {/* private app implememt private route in future */}
      <Route path="/" component={AuthnticatedApp} />
    </Switch>
  )
}

const AuthnticatedApp = () => {
  const [collapsed, setCollapsed] = useState(false)

  const { Sider, Header, Footer } = Layout
  const { SubMenu } = Menu

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
  }
  
  return (
    
    <Layout style={{ minHeight: '100vh' }}>
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

      <Layout
        className="site-layout"
        style={{
          marginLeft: collapsed === true ? 80 : 200,
          transition: 'margin-left .2s'
        }}
      >
        <Header
          style={{
            padding: 0,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            background: '#fff'
          }}
        >
          <DropDownNotification />
          <ProfileIcon />
        </Header>
        <Switch>
          <Route component={Courses} />
        </Switch>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default App
