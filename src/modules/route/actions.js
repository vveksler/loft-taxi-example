import { createAction } from 'redux-actions'

export const fetchCoordsRequest = createAction('FETCH_COORDS_REQUEST')
export const fetchCoordsSuccess = createAction('FETCH_COORDS_SUCCESS')
export const fetchCoordsFailure = createAction('FETCH_COORDS_FAILURE')

export const clearRoutes = createAction('CLEAR_ROUTES')
export const setIsOrderMade = createAction('SET_IS_ORDER_MADE')
