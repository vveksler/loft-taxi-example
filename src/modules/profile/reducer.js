import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import {
  profileClear,
  profileRequest,
  profileSuccess,
  profileFailure
} from './actions'
import { logout } from '../auth'

const loading = handleActions(
  {
    [profileRequest]: () => true,
    [profileSuccess]: () => false,
    [profileFailure]: () => false
  },
  false
)

const card = handleActions(
  {
    [profileSuccess]: (_state, action) => action.payload,
    [profileClear]: () => ({}),
    [logout]: () => ({})
  },
  {}
)

const error = handleActions(
  {
    [profileRequest]: () => null,
    [profileFailure]: (_, action) => action.payload
  },
  null
)

export default combineReducers({
  loading,
  card,
  error
})
