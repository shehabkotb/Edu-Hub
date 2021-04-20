import React, { useState } from 'react'
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  matchPath
} from 'react-router-dom'
import { Layout } from 'antd'

import SideNav from '../components/SideNav'
import PublicRoute from '../components/PublicRoute'
import PrivateRoute from '../components/PrivateRoute'

import Login from '../pages/Login'
import NotFoundPage from '../pages/NotFoundPage'
import Registeration from '../pages/Registeration'
import ForgetPassword from '../pages/ForgetPassword'
import Courses from '../views/courses'
import Browse from '../views/browse'
import Articles from '../views/articles'
import ArticleForm from '../views/articles/ArticleForm/ArticleForm'
// import Profile from '../views/profile'
import Assignments from '../views/assignments'
import Exams from '../views/exams'
import Quizes from '../views/quizes'
import Videos from '../views/videos'
import Modules from '../views/modules'
import CheatingDetection from '../views/cheatingDetection'
import DiscussionFeed from '../views/discussions'

import NotFoundView from '../views/NotFoundView'

import 'antd/dist/antd.css'
import 'ant-design-pro/dist/ant-design-pro.css'
import S from './style'

import AppHeader from '../components/AppHeader'

// public routes redirects to /app if authenticated
// private routes redirects to login if not authenticated
const App = () => {
  return (
    <Switch>
      <Route path="/Register" component={Registeration} />
      <PublicRoute path="/ForgetPassword" component={ForgetPassword} />
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

  const location = useLocation()

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
  }

  const currentLocationIS = (pathToMatch) => {
    const match = matchPath(location.pathname, pathToMatch)
    if (!match) return false

    return true
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
        {/* will add search in the future */}
        {/* {currentLocationIS('/app/courses') && (<Input.Search placeholder="input search text" enterButton />} */}

        <AppHeader courseNavigation={currentLocationIS('/app/course/:id')} />

        <Content style={{ padding: '20px 32px', height: '100%' }}>
          <Switch>
            {/* redirect to courses page for now */}
            <Route exact path="/app/">
              <Redirect to="/app/courses" />
            </Route>

            <Route path="/app/courses" component={Courses} />
            <Route path="/app/course/:courseId/modules" component={Modules} />
            <Route
              path="/app/course/:courseId/assignments"
              component={Assignments}
            />
            <Route path="/app/course/:courseId/quizes" component={Quizes} />
            {/*<Route path="/app/course/:courseId/exams" component={Exams} />*/}
            {<Route path="/app/course/:courseId/exams" component={CheatingDetection} />}
            <Route path="/app/course/:courseId/videos" component={Videos} />
            <Route
              path="/app/course/:courseId/discussions"
              render={(props) => (
                <DiscussionFeed courseId={props.match.params.courseId} />
              )}
            />
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
