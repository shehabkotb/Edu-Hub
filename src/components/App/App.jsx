import React, { useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Layout } from 'antd'

import DropDownNotification from '../DropDownNotification'
import ProfileIcon from '../ProfileIcon'
import SideNav from '../SideNav'

import NotFoundPage from '../../views/publicPages/NotFoundPage'
import SignUp from '../../views/publicPages/SignUp'
import Login from '../../views/publicPages/Login'
import Courses from '../../views/courses'
import Browse from '../../views/browse'
import Profile from '../../views/Profile'
import NotFoundView from '../../views/NotFoundView'

import 'antd/dist/antd.css'
import 'ant-design-pro/dist/ant-design-pro.css'
import { AppHeader } from './style'

const App = () => {
  return (
    <Switch>
      <Route path="/Register" component={SignUp} />
      <Route path="/Login" component={Login} />
      {/* private app, implememt private route in future */}
      {/* redirect to app for now */}
      <Route exact path="/">
        <Redirect to="/app" />
      </Route>
      <Route path="/app" component={AuthnticatedApp} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  )
}

const AuthnticatedApp = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { Content } = Layout

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideNav collapsed={collapsed} onCollapse={onCollapse} />

      <Layout
        style={{
          marginLeft: collapsed === true ? 80 : 200,
          transition: 'margin-left .2s'
        }}
      >
        <AppHeader>
          <DropDownNotification />
          <ProfileIcon />
        </AppHeader>

        <Content style={{ padding: '8px 16px' }}>
          <Switch>
            {/* redirect to courses page for now */}
            <Route exact path="/app/">
              <Redirect to="/app/courses" />
            </Route>

            <Route path="/app/courses" component={Courses} />
            <Route path="/app/browse" component={Browse} />
            <Route path="/app/profile" component={Profile} />
            <Route path="/app/*" component={NotFoundView} />
          </Switch>
        </Content>

      </Layout>
    </Layout>
  )
}

export default App
