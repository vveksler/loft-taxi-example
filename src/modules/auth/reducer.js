import {
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  signInRequest,
  signInSuccess,
  signInFailure,
  logout
} from './actions'

export const initialState = {
  loading: false,
  token: null,
  error: null
}

export default function authReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case signUpRequest.toString():
    case signInRequest.toString():
      return { ...state, loading: true, error: null }

    case signUpSuccess.toString():
    case signInSuccess.toString():
      return { ...state, token: payload.token, loading: false }

    case signUpFailure.toString():
    case signInFailure.toString():
      return { ...state, loading: false, error: payload.error }

    case logout.toString():
      return { ...state, token: null }

    default:
      return state
  }
}
