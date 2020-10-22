import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'

import DropDownNotification from '../DropDownNotification'
import ProfileIcon from '../ProfileIcon'
import SideNav from '../SideNav'
import NotFoundPage from '../../views/publicPages/NotFoundPage'

import SignUp from '../../views/publicPages/SignUp'
import Login from '../../views/publicPages/Login'
import Courses from '../../views/courses'
import NotFoundView from '../../views/NotFoundView'

import './App.css'
import 'antd/dist/antd.css'
import 'ant-design-pro/dist/ant-design-pro.css'
import { AppHeader } from './style'

const App = () => {
  return (
    <Switch>
      <Route path="/Register" component={SignUp} />
      <Route path="/Login" component={Login} />
      {/* private app implememt private route in future */}
      <Route path="/app" component={AuthnticatedApp} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  )
}

const AuthnticatedApp = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { Footer } = Layout

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideNav collapsed={collapsed} onCollapse={onCollapse} />

      <Layout
        className="site-layout"
        style={{
          marginLeft: collapsed === true ? 80 : 200,
          transition: 'margin-left .2s'
        }}
      >
        <AppHeader>
          <DropDownNotification />
          <ProfileIcon />
        </AppHeader>

        <Switch>
          <Route exact path="/app/" component={Courses} />
          <Route path="/app/*" component={NotFoundView} />
        </Switch>

        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default App
