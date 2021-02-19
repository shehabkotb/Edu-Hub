import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ ...routeProps }) => {
  const { isAuth } = useSelector((state) => state.auth)
  return (
    <>
      {!isAuth && <Redirect to="/login" />}

      {isAuth && <Route {...routeProps} />}
    </>
  )
}

export default PrivateRoute
