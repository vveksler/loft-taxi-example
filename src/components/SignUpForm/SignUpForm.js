import React, { useState } from 'react'
import { Link as RouteLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Box,
  Button,
  Paper
} from '@material-ui/core/'
import { Logo } from 'loft-taxi-mui-theme'
import { getError, getLoading, signUpRequest } from 'modules/auth'

const useStyle = makeStyles(() => ({
  container: {
    maxWidth: '1000px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    width: '420px',
    display: 'flex',
    justifyContent: 'center'
  },
  formWrap: {
    width: '500px',
    padding: '62px 40px'
  },
  input: {
    marginBottom: '30px'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    padding: '16px 60px'
  }
}))

const SignUpForm = () => {
  const [user, setUser] = useState({
    email: '',
    name: '',
    surname: '',
    password: ''
  })
  const dispatch = useDispatch()
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

    dispatch(signUpRequest(user))
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.logo}>
        <Logo white animated />
      </Box>
      <Paper className={classes.formWrap}>
        <Container>
          <Typography variant="h4" component="h1">
            Регистрация
          </Typography>
          <div>
            <p>
              Уже зарегистрирован?{' '}
              <Link to="/login" component={RouteLink}>
                Войти
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  className={classes.input}
                  onChange={handleChange}
                  label="Адрес электронной почты"
                  type="email"
                  name="email"
                  fullWidth
                  value={user.email}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className={classes.input}
                  onChange={handleChange}
                  label="Имя"
                  type="name"
                  name="name"
                  value={user.name}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className={classes.input}
                  onChange={handleChange}
                  label="Фамилия"
                  type="surname"
                  name="surname"
                  value={user.surname}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.input}
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
                disabled={loading ? true : false}
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
              >
                Зарегистрироваться
              </Button>
            </Box>
          </form>
        </Container>
      </Paper>
    </Box>
  )
}

export default SignUpForm
