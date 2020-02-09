import { put, call, takeLeading } from 'redux-saga/effects'
import {
  fetchAddressesRequest,
  fetchAddressesSuccess,
  fetchAddressesFailure
} from './actions'
import {getAddressListApi} from './api'

function* addressListSagaWorker() {
  try {
    const { error, data } = yield call(getAddressListApi)
    
    if (!error) yield put(fetchAddressesSuccess(data.addresses))
    if (error) yield put(fetchAddressesFailure(error))
  } catch (error) {
    yield put(fetchAddressesFailure(error))
  }
}

export function* addressListSaga() {
  yield takeLeading(fetchAddressesRequest.toString(), addressListSagaWorker)
}
