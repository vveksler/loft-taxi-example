import { createAction } from 'redux-actions'

export const profileRequest = createAction('PROFILE_REQUEST')
export const profileSuccess = createAction('PROFILE_SUCCESS')
export const profileFailure = createAction('PROFILE_FAILURE')

export const profileClear = createAction('PROFILE_CLEAR')
