import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Grid
} from '@material-ui/core/'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { MCIcon } from 'loft-taxi-mui-theme'
import Background from '../common/Background'
import { getCard, profileRequest, getLoader } from 'modules/profile'
import ProfileAlert from 'components/ProfileAlert'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  profile: {
    padding: '56px 0 72px',
    width: '950px'
  },
  profileContainer: {
    padding: '0 8%'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '46px'
  },
  cardsContainer: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  card: {
    justifyContent: 'space-between',
    width: '46%',
    height: '200px',
    padding: '30px',
    position: 'relative',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column'
  },
  resetButton: {
    marginLeft: '1rem',
    backgroundColor: 'red'
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200
  }
}))

const Profile = ({ history: { location } }) => {
  const { handleSubmit, control, reset, register, errors } = useForm()
  const classes = useStyles()
  const [cardUpdated, setCardUpdated] = useState(false)
  const dispatch = useDispatch()
  const cardFromStore = useSelector(getCard)
  const loading = useSelector(getLoader)

  const onSubmit = (data) => {
    dispatch(profileRequest(data))
    setCardUpdated(true)
  }

  useEffect(() => {
    setCardUpdated(false)
  }, [setCardUpdated, location.key])

  const onReset = () => {
    dispatch(
      profileRequest({
        cvc: '',
        cardNumber: '',
        expiryDate: '',
        cardName: ''
      })
    )

    reset({
      cvc: '',
      cardName: '',
      cardNumber: '',
      expiryDate: null
    })
  }

  return (
    <Background>
      <Container className={classes.container}>
        <Paper className={classes.profile}>
          <Container className={classes.profileContainer}>
            <Box textAlign="center">
              <Typography variant="h4">Профиль</Typography>
              {loading ? (
                <Grid item xs={12} className={classes.loader}>
                  <CircularProgress />
                </Grid>
              ) : !cardUpdated ? (
                <>
                  <Typography>Способ оплаты</Typography>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box className={classes.cardsContainer}>
                      <Paper className={classes.card}>
                        <MCIcon />
                        <Controller
                          as={TextField}
                          onChange={([data]) => {
                            const value = data.target.value
                            const onlyNum = value.replace(/[^\d\s]/g, '').trim()

                            return (
                              onlyNum &&
                              onlyNum
                                .substring(0, 19)
                                .match(/\d{1,4}/g)
                                .join(' ')
                            )
                          }}
                          helperText={
                            errors.cardNumber && errors.cardNumber.message
                          }
                          label="Номер карты:"
                          name="cardNumber"
                          control={control}
                          defaultValue={
                            cardFromStore.cardNumber
                              ? cardFromStore.cardNumber
                              : ''
                          }
                          fullWidth
                          inputRef={register({
                            required: 'Введите номер карты',
                            minLength: {
                              value: 19,
                              message: 'Неправильный номер карты'
                            }
                          })}
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Controller
                            as={DatePicker}
                            label="Срок действия:"
                            placeholder="12/21"
                            name="expiryDate"
                            views={['year', 'month']}
                            format="MM/yy"
                            defaultValue={
                              cardFromStore.expiryDate
                                ? cardFromStore.expiryDate
                                : null
                            }
                            control={control}
                            disablePast
                            disableToolbar
                            fullWidth
                          />
                        </MuiPickersUtilsProvider>
                      </Paper>
                      <Paper className={classes.card}>
                        <Controller
                          as={TextField}
                          inputRef={register({
                            required: 'Введите имя',
                            pattern: {
                              value: /[A-Za-z]/,
                              message: 'Не правильное имя'
                            }
                          })}
                          helperText={
                            errors.cardName && errors.cardName.message
                          }
                          control={control}
                          defaultValue={
                            cardFromStore.cardName ? cardFromStore.cardName : ''
                          }
                          label="Имя владельца:"
                          name="cardName"
                          fullWidth
                        />
                        <Controller
                          as={TextField}
                          inputRef={register({
                            required: 'Введите 3 цифры',
                            minLength: {
                              value: 3,
                              message: 'Слишком коротко'
                            }
                          })}
                          onChange={([data]) => {
                            const value = data.target.value

                            return value.substr(0, 3)
                          }}
                          helperText={errors.cvc && errors.cvc.message}
                          control={control}
                          defaultValue={
                            cardFromStore.cvc ? cardFromStore.cvc : ''
                          }
                          label="CVC"
                          name="cvc"
                          fullWidth
                        />
                      </Paper>
                    </Box>
                    <Box className={classes.buttonContainer}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                      >
                        Сохранить
                      </Button>
                      <Button
                        className={classes.resetButton}
                        onClick={onReset}
                        type="reset"
                        variant="contained"
                        color="primary"
                        size="large"
                      >
                        Очистить
                      </Button>
                    </Box>
                  </form>
                </>
              ) : (
                <ProfileAlert
                  body="Данные карты были успешно обовлены"
                  btnText="Перейти к карте"
                  linkTo="/map"
                  justify="center"
                />
              )}
            </Box>
          </Container>
        </Paper>
      </Container>
    </Background>
  )
}

export default Profile
