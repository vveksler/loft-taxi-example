import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import { getIsLoggedIn } from 'modules/auth'

const PrivateRoute = (props) => {
  const isLoggedIn = useSelector(getIsLoggedIn)
  const { component: Component, ...rest } = props

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

export default PrivateRoute
