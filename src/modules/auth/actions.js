import { createAction } from 'redux-actions'

export const signUpRequest = createAction('SIGN_UP_REQUEST')
export const signUpSuccess = createAction('SIGN_UP_SUCCESS')
export const signUpFailure = createAction('SIGN_UP_FAILURE')

export const signInRequest = createAction('SIGN_IN_REQUEST')
export const signInSuccess = createAction('SIGN_IN_SUCCESS')
export const signInFailure = createAction('SIGN_IN_FAILURE')

export const logout = createAction('LOGOUT')
