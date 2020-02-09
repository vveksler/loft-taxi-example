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
import { signUpApi, signInApi } from './api'
import { getProfileApi } from '../profile'

function* signUpSagaWorker(action) {
  try {
    const { error, data } = yield call(signUpApi, action.payload)

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
    const { data: userData } = yield call(signInApi, action.payload)

    if (userData.success) {
      const { data: cardData } = yield call(getProfileApi, userData.token)
      if (cardData.success !== false && cardData.id)
        yield put(profileSuccess(cardData))

      yield put(signInSuccess(userData))
    } else if (userData.error) {
      yield put(signInFailure(userData))
    }
  } catch (error) {
    yield put(signInFailure(error))
  }
}

export function* authSaga() {
  yield takeLeading(signUpRequest.toString(), signUpSagaWorker)
  yield takeLeading(signInRequest.toString(), signInSagaWorker)
}
