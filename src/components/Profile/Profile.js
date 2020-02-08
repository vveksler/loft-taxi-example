import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button
} from '@material-ui/core/'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { MCIcon } from 'loft-taxi-mui-theme'
import Background from '../common/Background'
import { getCard, profileRequest } from 'modules/profile'

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
  }
}))

const Profile = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const cardFromStore = useSelector(getCard)
  const [card, setCard] = useState({
    cvc: '',
    cardNumber: '',
    expiryDate: '',
    cardName: ''
  })

  useEffect(() => {
    if (Object.keys(cardFromStore).length) {
      setCard({
        cvc: cardFromStore.cvc,
        cardNumber: cardFromStore.cardNumber,
        expiryDate: cardFromStore.expiryDate,
        cardName: cardFromStore.cardName
      })
    }
  }, [cardFromStore])

  const handleChange = (e) => {
    const { name, value } = e.target

    setCard({
      ...card,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(profileRequest(card))
  }

  const handleDateChange = (date) => {
    setCard({ ...card, expiryDate: date.toDateString() })
  }
  
  return (
    <Background>
      <Container className={classes.container}>
        <Paper className={classes.profile}>
          <Container className={classes.profileContainer}>
            <Box textAlign="center">
              <Typography variant="h4">Профиль</Typography>
              <Typography>Способ оплаты</Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <Box className={classes.cardsContainer}>
                <Paper className={classes.card}>
                  <MCIcon />
                  <TextField
                    value={card.cardNumber}
                    onChange={handleChange}
                    label="Номер карты:"
                    name="cardNumber"
                    fullWidth
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      onChange={handleDateChange}
                      label="Срок действия:"
                      placeholder="12/21"
                      name="expiryDate"
                      views={['year', 'month']}
                      format="MM/yy"
                      value={card.expiryDate ? card.expiryDate : null}
                      disablePast
                      disableToolbar
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Paper>
                <Paper className={classes.card}>
                  <TextField
                    value={card.cardName}
                    onChange={handleChange}
                    label="Имя владельца:"
                    name="cardName"
                    fullWidth
                  />
                  <TextField
                    value={card.cvc}
                    onChange={handleChange}
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
              </Box>
            </form>
          </Container>
        </Paper>
      </Container>
    </Background>
  )
}

export default Profile
