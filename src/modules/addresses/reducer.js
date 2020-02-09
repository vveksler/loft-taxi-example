import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import {
  fetchAddressesRequest,
  fetchAddressesSuccess,
  fetchAddressesFailure
} from './actions'

const myAddresses = handleActions(
  {
    [fetchAddressesSuccess]: (_state, action) => action.payload
  },
  []
)

const loading = handleActions(
  {
    [fetchAddressesRequest]: () => true,
    [fetchAddressesSuccess]: () => false,
    [fetchAddressesFailure]: () => false
  },
  null
)

const error = handleActions(
  {
    [fetchAddressesSuccess]: () => null,
    [fetchAddressesFailure]: (_state, { payload }) => ({
      ...payload,
      errorText: 'Ошибка загрузки. Проверьте подключение к сети'
    })
  },
  null
)

export default combineReducers({
  myAddresses,
  loading,
  error
})
