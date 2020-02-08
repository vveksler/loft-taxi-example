import React, { useState } from 'react'
import { Link as RouteLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  Grid,
  Paper,
  Typography,
  Link,
  TextField,
  Box,
  Button
} from '@material-ui/core'

import Wrapper from 'components/common/Wrapper'
import {
  getIsLoggedIn,
  getError,
  getLoading,
  signInRequest
} from 'modules/auth'

const useStyle = makeStyles(() => ({
  formWrap: {
    width: '500px',
    padding: '62px 40px'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '30px'
  },
  button: {
    padding: '16px 60px'
  }
}))

const SignInForm = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn)
  const error = useSelector(getError)
  const loading = useSelector(getLoading)
  const classes = useStyle()

  const handleChange = ({ target: { value, name } }) => {
    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(signInRequest(user))
  }

  return isLoggedIn ? (
    <Redirect to="/map" />
  ) : (
    <Wrapper>
      <Paper className={classes.formWrap}>
        <Container>
          <Typography variant="h4" component="h1">
            Войти
          </Typography>
          <div>
            <p>
              Новый пользователь?{' '}
              <Link to="/signup" component={RouteLink}>
                Зарегистрируйтесь
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  label="Имя пользователя"
                  type="email"
                  name="email"
                  fullWidth
                  value={user.email}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  label="Пароль"
                  type="password"
                  name="password"
                  fullWidth
                  value={user.password}
                  required
                />
              </Grid>
            </Grid>
            <Box style={{ color: 'red', marginTop: '16px' }}>
              {error && error}
            </Box>
            <Box className={classes.buttonContainer}>
              <Button
                disabled={loading ? true: false}
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
              >
                Войти
              </Button>
            </Box>
          </form>
        </Container>
      </Paper>
    </Wrapper>
  )
}

export default SignInForm
