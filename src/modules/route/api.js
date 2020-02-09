import { http } from '../../config/instance'

export const getCoordsApi = async ({ address1, address2 }) => {
  const response = await http.get(
    `/route?address1=${address1}&address2=${address2}`
  )

  return response
}
