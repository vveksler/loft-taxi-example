import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import {
  fetchCoordsRequest,
  fetchCoordsSuccess,
  fetchCoordsFailure,
  setIsOrderMade,
  clearRoutes
} from './actions'

const coords = handleActions(
  {
    [fetchCoordsSuccess]: (_state, action) => action.payload,
    [clearRoutes]: () => null,
    [fetchCoordsFailure]: () => null
  },
  null
)

const loading = handleActions(
  {
    [fetchCoordsRequest]: () => true,
    [fetchCoordsSuccess]: () => false,
    [fetchCoordsFailure]: () => false
  },
  false
)

const error = handleActions(
  {
    [fetchCoordsSuccess]: () => null,
    [fetchCoordsFailure]: (_state, action) => action.payload
  },
  null
)

const orderMade = handleActions(
  {
    [setIsOrderMade]: (_state, action) => action.payload,
    [clearRoutes]: () => false
  },
  false
)

export default combineReducers({
  coords,
  loading,
  error,
  orderMade
})
