import { put, call, takeLeading, select } from 'redux-saga/effects'
import { profileRequest, profileSuccess, profileFailure } from './actions'
import { getToken } from '../auth'
import { postProfileApi, getProfileApi } from './api'

function* paymentSagaWorker(action) {
  try {
    const token = yield select(getToken)
    const { data } = yield call(postProfileApi, { ...action.payload, token })

    if (data.success) {
      const response = yield call(getProfileApi, token)
      yield put(profileSuccess(response.data))
    }
  } catch (error) {
    yield put(profileFailure(error))
  }
}

export function* paymentSaga() {
  yield takeLeading(profileRequest.toString(), paymentSagaWorker)
}
