import { put, call, takeLeading } from 'redux-saga/effects'
import {
  fetchCoordsRequest,
  fetchCoordsSuccess,
  fetchCoordsFailure
} from './actions'
import { getCoordsApi } from './api'

function* routeSagaWorker(action) {
  try {
    const { error, data } = yield call(getCoordsApi, action.payload)

    if (!error) yield put(fetchCoordsSuccess(data))
    if (error) yield put(fetchCoordsFailure(error))
  } catch (error) {
    yield put(fetchCoordsFailure(error))
  }
}

export function* routeSaga() {
  yield takeLeading(fetchCoordsRequest.toString(), routeSagaWorker)
}
