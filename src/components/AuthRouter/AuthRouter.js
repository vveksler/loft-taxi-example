import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Container } from '@material-ui/core'
import Wrapper from 'components/common/Wrapper'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from 'modules/auth'

const AuthRouter = ({ component: Component }) => {
  const isLoggedIn = useSelector(getIsLoggedIn)

  return isLoggedIn ? (
    <Redirect to="/map" />
  ) : (
    <Wrapper>
      <Container>
        <Route path="/login" component={Component} />
        <Route path="/signup" component={Component} />
      </Container>
    </Wrapper>
  )
}

export default AuthRouter
