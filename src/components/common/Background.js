import React from 'react'
import bg from '../../assets/login-background.jpg'

const style = {
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: `url(${bg})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover'
}

const Background = ({ children }) => {
  return <div style={style}>{children}</div>
}

export default Background
