import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { spawn } from 'redux-saga/effects'
import { reducer as formReducer } from 'redux-form'

import user, { authSaga } from './auth'
import profile, { paymentSaga } from './profile'
import addresses, { addressListSaga } from './addresses'
import route, { routeSaga } from './route'

const persistConfigAuth = {
  key: 'user',
  storage,
  whitelist: ['token']
}

const persistConfigProfile = {
  key: 'profile',
  storage,
  whitelist: ['card']
}

export default combineReducers({
  user: persistReducer(persistConfigAuth, user),
  profile: persistReducer(persistConfigProfile, profile),
  addresses,
  route,
  form: formReducer
})

export function* rootSaga() {
  yield spawn(authSaga)
  yield spawn(paymentSaga)
  yield spawn(addressListSaga)
  yield spawn(routeSaga)
}
