import { startSubmit, stopSubmit } from 'redux-form'
import { put, call } from 'redux-saga/effects'
import {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure
} from './actions'
import { signUpApi, signInApi } from './api'
import { signUpSagaWorker, signInSagaWorker, fetchCardData } from './sagas'
import { getProfileApi, profileSuccess } from '../profile'
import mockAxios from 'axios'

describe('Тестирование signUpSagaWorker саги', () => {
  const testAction = {
    payload: 'test'
  }

  it('signUpSagaWorker c success true', () => {
    const gen = signUpSagaWorker(testAction)

    expect(gen.next().value).toEqual(call(signUpApi, testAction.payload))
    const responseData = {
      data: {
        success: true,
        token: 'test'
      }
    }
    expect(gen.next(responseData).value).toEqual(
      put(signUpSuccess(responseData.data))
    )
    expect(gen.next().done).toEqual(true)
  })

  it('signUpSagaWorker c success false', () => {
    const gen = signUpSagaWorker(testAction)

    expect(gen.next().value).toEqual(call(signUpApi, testAction.payload))
    const responseData = {
      data: {
        success: false,
        error: 'test'
      }
    }
    expect(gen.next(responseData).value).toEqual(
      put(signUpFailure(responseData.data.error))
    )
    expect(gen.next().done).toEqual(true)
  })

  it('signUpSagaWorker заканчивает работу с проблемой сети', () => {
    const error = new Error('error')
    const gen = signUpSagaWorker(testAction)

    expect(gen.next().value).toEqual(call(signUpApi, testAction.payload))

    expect(gen.throw(error).value).toEqual(put(signUpFailure(error)))
    expect(gen.next().done).toEqual(true)
  })
})

describe('Тестирование signInSagaWorker саги', () => {
  const testAction = {
    payload: 'test'
  }

  it('signInSagaWorker c success true', () => {
    const gen = signInSagaWorker(testAction)

    expect(gen.next().value).toEqual(put(startSubmit('sign-in')))
    expect(gen.next().value).toEqual(call(signInApi, testAction.payload))
    const responseData = {
      data: {
        success: true,
        token: 'test'
      }
    }
    expect(gen.next(responseData).value).toEqual(
      call(fetchCardData, responseData.data.token)
    )
    expect(gen.next(responseData).value).toEqual(
      put(signInSuccess(responseData.data))
    )
    expect(gen.next().done).toEqual(true)
  })

  it('signInSagaWorker c success false', () => {
    const gen = signInSagaWorker(testAction)

    expect(gen.next().value).toEqual(put(startSubmit('sign-in')))
    expect(gen.next().value).toEqual(call(signInApi, testAction.payload))
    const responseData = {
      data: {
        success: false,
        error: 'test'
      }
    }
    expect(gen.next(responseData).value).toEqual(
      put(
        stopSubmit('sign-in', {
          email: 'Неверный email или пароль',
          password: 'Неверный email или пароль',
          _error: responseData.data.error
        })
      )
    )
    expect(gen.next(responseData).value).toEqual(
      put(signInFailure(responseData.data.error))
    )
    expect(gen.next().done).toEqual(true)
  })

  it('signInSagaWorker заканчивает работу с проблемой сети', () => {
    const error = new Error('error')
    const gen = signInSagaWorker(testAction)

    expect(gen.next().value).toEqual(put(startSubmit('sign-in')))
    expect(gen.next().value).toEqual(call(signInApi, testAction.payload))
    expect(gen.throw(error).value).toEqual(
      put(
        stopSubmit('sign-in', {
          email: 'Ошибка сети',
          password: 'Ошибка сети',
          _error: error
        })
      )
    )
    expect(gen.next().value).toEqual(put(signInFailure(error)))
    expect(gen.next().done).toEqual(true)
  })
})

describe('Тестирование fetchCardData саги', () => {
  it('Удачное исполннение', () => {
    const token = 'test'
    const gen = fetchCardData(token)

    expect(gen.next().value).toEqual(call(getProfileApi, token))
    const responseData = {
      data: {
        success: true,
        id: 123
      }
    }
    expect(gen.next(responseData).value).toEqual(
      put(profileSuccess(responseData.data))
    )
  })
})

describe('Тестирования api', () => {
  beforeEach(() =>
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        success: true,
        token: 123
      })
    )
  )

  it('Проверка правильной работы signInApi', async () => {
    const user = {
      email: 'test@test.com',
      password: '123123'
    }
    const data = await signInApi(user)

    expect(data.success).toBe(true)
    expect(data.token).toBe(123)
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(mockAxios.post).toHaveBeenCalledWith(
      'https://loft-taxi.glitch.me/auth',
      user
    )
  })

  it('Проверка правильной работы signUpApi', async () => {
    const user = {
      email: 'test@test.com',
      name: 'test name',
      surname: 'test surname',
      password: '123123'
    }
    const data = await signUpApi(user)

    expect(data.success).toBe(true)
    expect(data.token).toBe(123)
    expect(mockAxios.post).toHaveBeenCalledTimes(2)
    expect(mockAxios.post).toHaveBeenCalledWith(
      'https://loft-taxi.glitch.me/register',
      user
    )
  })
})
