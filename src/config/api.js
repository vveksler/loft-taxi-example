//import { http } from "./instance";
import axios from 'axios'

export const signUp = async (data) => {
  const response = await axios.post(
    `https://loft-taxi.glitch.me/register`,
    data
  )

  return response
}

export const signIn = async (data) => {
  const response = await axios.post(`https://loft-taxi.glitch.me/auth`, data)

  return response
}

export const postProfile = async (data) => {
  const response = await axios.post(`https://loft-taxi.glitch.me/card`, data)

  return response
}

export const getProfile = async (token) => {
  const response = await axios.get(
    `https://loft-taxi.glitch.me/card?token=${token}`
  )

  return response
}
