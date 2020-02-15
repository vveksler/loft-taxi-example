import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link as RouteLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  Grid,
  Typography,
  Link,
  Box,
  Button,
  Paper
} from '@material-ui/core/'
import { Logo } from 'loft-taxi-mui-theme'
import { getError, getLoading, signUpRequest } from 'modules/auth'
import TextField from 'components/common/TextField'

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

const SignUpForm = ({ handleSubmit }) => {
  const classes = useStyle()
  const dispatch = useDispatch()
  const loading = useSelector(getLoading)
  const error = useSelector(getError)

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
          <form
            onSubmit={handleSubmit((values) => dispatch(signUpRequest(values)))}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  className={classes.input}
                  label="Адрес электронной почты"
                  type="email"
                  name="email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  className={classes.input}
                  label="Имя"
                  type="name"
                  name="name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  className={classes.input}
                  label="Фамилия"
                  type="surname"
                  name="surname"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  className={classes.input}
                  label="Пароль"
                  type="password"
                  name="password"
                  fullWidth
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

const signUpSyncValidator = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Введите адресс почты'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Адресс почты не правильный'
  }
  if (!values.name) errors.name = 'Введите имя'
  if (!values.surname) errors.surname = 'Введите фамилию'
  if (!values.password) errors.password = 'Введите пароль'
  return errors
}

export default reduxForm({
  // a unique name for the form
  form: 'sign-up',
  validate: signUpSyncValidator
})(SignUpForm)
