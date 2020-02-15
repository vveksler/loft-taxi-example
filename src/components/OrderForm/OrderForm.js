import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import CircularProgress from '@material-ui/core/CircularProgress'

import { fetchCoordsRequest } from 'modules/route'
import {
  fetchAddressesRequest,
  getIsLoading,
  getLoadErrorText,
  getMyAddresses
} from 'modules/addresses'

const useStyles = makeStyles(() => ({
  fieldAlign: {
    display: 'flex'
  },
  alignLeft: {
    justifyContent: 'flex-start'
  },
  alignCenter: {
    justifyContent: 'center'
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 192
  }
}))

const OrderForm = () => {
  const classes = useStyles()
  const errorText = useSelector(getLoadErrorText)
  const isLoadingAddresses = useSelector(getIsLoading)
  const myAddresses = useSelector(getMyAddresses)
  const dispatch = useDispatch()
  const [addresses, setAddresses] = useState({
    address1: '',
    address2: ''
  })

  const handleChange = ({ target: { name, value } }) => {
    setAddresses({ ...addresses, [name]: value })
  }

  const handleButtonClick = () => {
    const { address1, address2 } = addresses

    if (address1 && address2)
      dispatch(fetchCoordsRequest({ address1, address2 }))

    setAddresses({
      address1: '',
      address2: ''
    })
  }

  useEffect(() => {
    if (!myAddresses || myAddresses.length === 0)
      dispatch(fetchAddressesRequest())
  }, [dispatch, myAddresses])

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        className={`${classes.alignCenter} ${classes.fieldAlign}`}
      >
        <Typography variant="h4">Order taxi</Typography>
      </Grid>
      {errorText && (
        <Grid
          item
          xs={12}
          className={`${classes.alignCenter} ${classes.fieldAlign}`}
        >
          <Typography variant="body1">{errorText}</Typography>
        </Grid>
      )}

      {isLoadingAddresses ? (
        <Grid item xs={12} className={classes.loader}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid
            item
            xs={12}
            className={`${classes.alignCenter} ${classes.fieldAlign}`}
          >
            {
              <TextField
                id="address-1"
                name="address1"
                select
                margin="normal"
                label="Departure way"
                value={addresses.address1}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="">Departure way</MenuItem>
                {myAddresses.map((address) =>
                  addresses.address2 === address ? null : (
                    <MenuItem key={address} value={address}>
                      {address}
                    </MenuItem>
                  )
                )}
              </TextField>
            }
          </Grid>
          <Grid
            item
            xs={12}
            className={`${classes.alignCenter} ${classes.fieldAlign}`}
          >
            {
              <TextField
                id="address-2"
                name="address2"
                select
                margin="normal"
                label="Destination"
                value={addresses.address2}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="">Destination</MenuItem>
                {myAddresses.map((address) =>
                  addresses.address1 === address ? null : (
                    <MenuItem key={address} value={address}>
                      {address}
                    </MenuItem>
                  )
                )}
              </TextField>
            }
          </Grid>
        </>
      )}

      <Grid
        item
        xs={12}
        className={`${classes.alignLeft} ${classes.fieldAlign}`}
      >
        <Button
          variant="outlined"
          color="primary"
          component="button"
          disabled={!addresses.address1 || !addresses.address2}
          onClick={handleButtonClick}
        >
          Call a taxi
        </Button>
      </Grid>
    </Grid>
  )
}

export default OrderForm
