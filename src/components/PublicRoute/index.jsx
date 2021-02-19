import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({ ...routeProps }) => {
  const { isAuth } = useSelector((state) => state.auth)
  return <>{isAuth ? <Redirect to="/app" /> : <Route {...routeProps} />}</>
}

export default PublicRoute
