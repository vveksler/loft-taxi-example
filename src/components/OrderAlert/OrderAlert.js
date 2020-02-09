import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import { getCoordsError, setIsOrderMade } from 'modules/route'

const useStyles = makeStyles(() => ({
  fieldAlign: {
    display: 'flex'
  },
  alignLeft: {
    justifyContent: 'flex-start'
  },
  alignCenter: {
    justifyContent: 'center'
  }
}))

const OrderAlert = () => {
  const classes = useStyles()
  const errorCoords = useSelector(getCoordsError)
  const dispatch = useDispatch()

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        className={`${classes.alignCenter} ${classes.fieldAlign}`}
      >
        <Typography variant="h4">Order placed</Typography>
      </Grid>
      <Grid item xs={12}>
        {errorCoords && <Typography variant="body1">{errorCoords}</Typography>}
        {!errorCoords && (
          <Typography variant="body1">
            Your taxi is on its way to you. Will arrive in about 10 minutes
          </Typography>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        className={`${classes.alignLeft} ${classes.fieldAlign}`}
      >
        <Button
          variant="outlined"
          color="primary"
          component="button"
          onClick={() => dispatch(setIsOrderMade(false))}
        >
          Make a new order
        </Button>
      </Grid>
    </Grid>
  )
}

export default OrderAlert
