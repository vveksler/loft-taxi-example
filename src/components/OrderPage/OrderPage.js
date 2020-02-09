import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import OrderForm from 'components/OrderForm'
import ProfileAlert from 'components/ProfileAlert'
import OrderAlert from 'components/OrderAlert'
import { getIsOrderMade } from 'modules/route'
import { getIsCardFilled } from 'modules/profile'

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  form: {
    margin: 30,
    maxWidth: 300,
    position: 'absolute',
    zIndex: 200,
    top: 70,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: theme.spacing(3)
  }
}))

const OrderPage = () => {
  const classes = useStyles()
  const isOrderMade = useSelector(getIsOrderMade)
  const cardIsFilled = useSelector(getIsCardFilled)

  return (
    <Grid
      container
      spacing={0}
      className={classes.container}
      alignItems="center"
      justify="flex-start"
    >
      <Grid item xs={12} md={8}>
        <Paper className={classes.form}>
          {cardIsFilled && !isOrderMade && <OrderForm />}
          {cardIsFilled && isOrderMade && <OrderAlert />}
          {!cardIsFilled && (
            <ProfileAlert
              header="Fill in billing information"
              body="Enter your bank card information to place an order."
              btnText="go to profile"
              linkTo="/profile"
            />
          )}
        </Paper>
      </Grid>
    </Grid>
  )
}

export default OrderPage
