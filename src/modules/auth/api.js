import axios from 'axios'

export const signUpApi = async (data) => {
  const response = await axios.post(
    'https://loft-taxi.glitch.me/register',
    data
  )

  return response
}

export const signInApi = async (data) => {
  const response = await axios.post('https://loft-taxi.glitch.me/auth', data)

  return response
}
