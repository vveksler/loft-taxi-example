import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { spawn } from 'redux-saga/effects'

import user, { authSaga } from './auth'
import profile, { paymentSaga } from './profile'

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
  profile: persistReducer(persistConfigProfile, profile)
})

export function* rootSaga() {
  yield spawn(authSaga)
  yield spawn(paymentSaga)
}
