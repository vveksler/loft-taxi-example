import { http } from '../../config/instance'

export const signUpApi = async (data) => {
  const response = await http.post('/register', data)

  return response
}

export const signInApi = async (data) => {
  const response = await http.post(`/auth`, data)

  return response
}
