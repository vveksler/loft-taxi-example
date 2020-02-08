import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from 'loft-taxi-mui-theme'
import { getIsLoggedIn } from 'modules/auth'

import Map from 'components/Map'
import Profile from 'components/Profile'
import Header from 'components/Header'
import PrivateRoute from 'components/PrivateRoute'
import SignUpForm from 'components/SignUpForm'
import SignInForm from 'components/SignInForm'

const RootRouter = () => {
  const isLoggedIn = useSelector(getIsLoggedIn)

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {isLoggedIn && <Header />}
        <Switch>
          <PrivateRoute path="/map" component={Map} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/login" component={SignInForm} />
          <Route path="/signup" component={SignUpForm} />
          <Redirect to="/map" />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default RootRouter
