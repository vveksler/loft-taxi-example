import { http } from '../../config/instance'

export const postProfileApi = async (data) => {
  const response = await http.post('/card', data)

  return response
}

export const getProfileApi = async (token) => {
  const response = await http.get(`/card?token=${token}`)
  
  return response
}
