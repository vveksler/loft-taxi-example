import { put, call, takeLeading } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import {
  signUpRequest,
  signInRequest,
  signUpSuccess,
  signInSuccess,
  signUpFailure,
  signInFailure
} from './actions'
import { profileSuccess, getProfileApi } from '../profile'
import { signUpApi, signInApi } from './api'

export function* fetchCardData(token) {
  const { data: cardData } = yield call(getProfileApi, token)

  if (cardData.success !== false && cardData.id)
    yield put(profileSuccess(cardData))
}

export function* signUpSagaWorker(action) {
  try {
    const { data: userData } = yield call(signUpApi, action.payload)

    if (userData.success) {
      yield put(signUpSuccess(userData))
    } else if (userData.error) {
      yield put(signUpFailure(userData.error))
    }
  } catch (error) {
    yield put(signUpFailure(error))
  }
}

export function* signInSagaWorker(action) {
  try {
    yield put(startSubmit('sign-in'))
    const { data: userData } = yield call(signInApi, action.payload)

    if (userData.success) {
      yield call(fetchCardData, userData.token)
      yield put(signInSuccess(userData))
    } else if (userData.error) {
      yield put(
        stopSubmit('sign-in', {
          email: 'Неверный email или пароль',
          password: 'Неверный email или пароль',
          _error: userData.error
        })
      )
      yield put(signInFailure(userData.error))
    }
  } catch (error) {
    yield put(
      stopSubmit('sign-in', {
        email: 'Ошибка сети',
        password: 'Ошибка сети',
        _error: error
      })
    )
    yield put(signInFailure(error))
  }
}

export function* authSaga() {
  yield takeLeading(signUpRequest.toString(), signUpSagaWorker)
  yield takeLeading(signInRequest.toString(), signInSagaWorker)
}
