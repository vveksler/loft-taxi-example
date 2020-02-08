import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Box } from '@material-ui/core/'
import { Logo } from 'loft-taxi-mui-theme'
import Background from './Background'

const useStyles = makeStyles(() => ({
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
  }
}))

const Wrapper = ({ children }) => {
  const classes = useStyles()

  return (
    <Background>
      <Container>
        <Box className={classes.container}>
          <Box className={classes.logo}>
            <Logo white animated />
          </Box>
          {children}
        </Box>
      </Container>
    </Background>
  )
}

export default Wrapper
