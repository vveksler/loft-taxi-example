import { put, call, takeLeading } from 'redux-saga/effects'
import {
  signUpRequest,
  signInRequest,
  signUpSuccess,
  signInSuccess,
  signUpFailure,
  signInFailure
} from './actions'
import { profileSuccess } from '../profile'
import { signUp, signIn, getProfile } from 'config/api'

function* signUpSagaWorker(action) {
  try {
    const { error, data } = yield call(signUp, action.payload)

    if (data.success) {
      yield put(signUpSuccess(data))
    } else if (error) {
      yield put(signUpFailure(error))
    }
  } catch (error) {
    yield put(signUpFailure(error))
  }
}

function* signInSagaWorker(action) {
  try {
    const { data } = yield call(signIn, action.payload)

    if (data.success) {
      const response = yield call(getProfile, data.token)

      yield put(profileSuccess(response.data))
      yield put(signInSuccess(data))
    } else if (data) {
      yield put(signInFailure(data))
    }
  } catch (error) {
    yield put(signInFailure(error))
  }
}

export function* authSaga() {
  yield takeLeading(signUpRequest.toString(), signUpSagaWorker)
  yield takeLeading(signInRequest.toString(), signInSagaWorker)
}
