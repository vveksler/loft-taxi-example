import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Logo } from 'loft-taxi-mui-theme'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { logout } from 'modules/auth'

const Header = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <AppBar position="absolute" color="inherit">
      <Container>
        <Toolbar>
          <div style={{ flex: 1 }}>
            <Logo></Logo>
          </div>
          <Button component={Link} to="/map" color="default">
            Карта
          </Button>
          <Button component={Link} to="/profile" color="default">
            Профиль
          </Button>
          <Button color="default" onClick={handleLogout}>
            Выйти
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
