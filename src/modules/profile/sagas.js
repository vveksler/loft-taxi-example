import { put, call, takeLeading, select } from 'redux-saga/effects'
import { profileRequest, profileSuccess, profileFailure } from './actions'
import { getToken } from '../auth'
import { postProfile, getProfile } from '../../config/api'

function* paymentSagaWorker(action) {
  try {
    const token = yield select(getToken)
    const { data } = yield call(postProfile, { ...action.payload, token })

    if (data.success) {
      const response = yield call(getProfile, token)
      yield put(profileSuccess(response.data))
    }
  } catch (error) {
    yield put(profileFailure(error))
  }
}

export function* paymentSaga() {
  yield takeLeading(profileRequest.toString(), paymentSagaWorker)
}
