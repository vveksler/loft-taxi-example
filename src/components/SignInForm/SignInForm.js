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
} from '@material-ui/core'
import { Logo } from 'loft-taxi-mui-theme'
import { getLoading, signInRequest } from 'modules/auth'
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '30px'
  },
  button: {
    padding: '16px 60px'
  }
}))

const SignInForm = ({ handleSubmit }) => {
  const classes = useStyle()
  const dispatch = useDispatch()
  const loading = useSelector(getLoading)

  return (
    <Box className={classes.container}>
      <Box className={classes.logo}>
        <Logo white animated />
      </Box>
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
          <form
            onSubmit={handleSubmit((values) => dispatch(signInRequest(values)))}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field
                  name="email"
                  component={TextField}
                  label="Имя пользователя"
                  type="email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="password"
                  component={TextField}
                  label="Пароль"
                  type="password"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Box className={classes.buttonContainer}>
              <Button
                disabled={loading ? true : false}
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
    </Box>
  )
}

const signInSyncValidator = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Please enter your email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'It should be your e-mail'
  }
  if (!values.password) errors.password = 'Please enter your password'
  return errors
}

export default reduxForm({
  // a unique name for the form
  form: 'sign-in',
  validate: signInSyncValidator
})(SignInForm)
