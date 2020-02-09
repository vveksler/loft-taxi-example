import { http } from '../../config/instance'

export const getAddressListApi = async () => {
  const response = await http.get('/addressList')

  return response
}
