import http from 'axios'

export const signUpApi = async (data) => {
  const response = await http.post(`${process.env.baseURL}/register`, data)

  return response
}

export const signInApi = async (data) => {
  const response = await http.post(`${process.env.baseURL}/auth`, data)

  return response
}
