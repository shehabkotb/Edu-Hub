import React, { useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PublicRoute from '../PublicRoute'
import PrivateRoute from '../PrivateRoute'
import { Layout } from 'antd'

import DropDownNotification from '../DropDownNotification'
import ProfileIcon from '../ProfileIcon'
import SideNav from '../SideNav'

import NotFoundPage from '../../views/publicPages/NotFoundPage'
import Login from '../Shared/Forms/Login/Login'
import Registeration from '../Shared/Forms/Registeration/Registeration'
import ForgetPassword from '../Shared/Forms/ForgetPassword/ForgetPassword'
import Courses from '../../views/courses'
import Browse from '../../views/browse'
import Articles from '../../views/articles'
import ArticleForm from '../../views/articles/ArticleForm/ArticleForm'
// import Profile from '../../views/profile'
import CourseView from '../../views/courseView'
import NotFoundView from '../../views/NotFoundView'

import Upload from '../../views/upload'

import 'antd/dist/antd.css'
import 'ant-design-pro/dist/ant-design-pro.css'
import S from './style'

// public routes redirects to /app if authenticated
// private routes redirects to login if not authenticated
const App = () => {
  return (
    <Switch>
      <Route path="/upload" component={Upload} />
      <Route path="/Register" component={Registeration} />
      <Route path="/ForgetPassword" component={ForgetPassword} />
      <PublicRoute path="/Login" component={Login} />
      <PrivateRoute path="/app" component={AuthnticatedApp} />
      {/* future landing page redirect to app for now */}
      <Route exact path="/">
        <Redirect to="/app" />
      </Route>
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
        <S.Header>
          <DropDownNotification />
          <ProfileIcon />
        </S.Header>

        <Content style={{ padding: '8px 16px', height: '100%' }}>
          <Switch>
            {/* redirect to courses page for now */}
            <Route exact path="/app/">
              <Redirect to="/app/courses" />
            </Route>

            <Route path="/app/courses" component={Courses} />
            <Route path="/app/courseview" component={CourseView} />
            <Route path="/app/browse" component={Browse} />
            <Route path="/app/articles" component={Articles} />
            <Route path="/app/newArticle" component={ArticleForm} />
            {/* <Route path="/app/profile" component={Profile} /> */}
            <Route path="/app/*" component={NotFoundView} />
          </Switch>
        </Content>
        <S.Footer>Ant Design ©2018 Created by Ant UED</S.Footer>
      </Layout>
    </Layout>
  )
}

export default App
