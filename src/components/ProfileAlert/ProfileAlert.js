import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

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

const ProfileAlert = ({ header, body, btnText, linkTo }) => {
  const classes = useStyles()

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        className={`${classes.alignCenter} ${classes.fieldAlign}`}
      >
        <Typography variant="h4">{header}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">{body}</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        className={`${classes.alignLeft} ${classes.fieldAlign}`}
      >
        <Button component={Link} variant="outlined" color="primary" to={linkTo}>
          {btnText}
        </Button>
      </Grid>
    </Grid>
  )
}

export default ProfileAlert
