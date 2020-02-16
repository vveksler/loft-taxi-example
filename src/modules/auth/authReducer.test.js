import { signInRequest, signInSuccess, signInFailure, logout } from './actions'
import testReducer, { initialState } from './reducer'

describe('Тестирование authReducer', () => {
  const testAction = {
    type: 'TEST',
    payload: {
      token: 'test'
    }
  }

  it('should возвращать initialState по умолчанию', () => {
    expect(testReducer(undefined, testAction)).toEqual(initialState)
  })

  it('should возвращать измененный стейт при экшене signUpRequest / signInRequest', () => {
    expect(
      testReducer(
        { ...initialState, loading: false, error: 'test', token: 123 },
        {
          ...testAction,
          type: signInRequest.toString()
        }
      )
    ).toEqual({ ...initialState, loading: true, error: null, token: 123 })
  })

  it('should возвращать измененный стейт при экшене signUpSuccess / signInSuccess', () => {
    expect(
      testReducer(
        { ...initialState, loading: true, error: 'test', token: 123 },
        {
          ...testAction,
          type: signInSuccess.toString()
        }
      )
    ).toEqual({ ...initialState, loading: false, error: 'test', token: 'test' })
  })

  it('should возвращать измененный стейт при экшене signUpFailure / signInFailure', () => {
    expect(
      testReducer(
        { ...initialState, loading: true, error: null, token: 123 },
        {
          ...testAction,
          type: signInFailure.toString(),
          payload: 'error'
        }
      )
    ).toEqual({ ...initialState, loading: false, error: 'error', token: 123 })
  })

  it('should возвращать измененный стейт при экшене logout', () => {
    expect(
      testReducer(
        { ...initialState, token: 123 },
        { ...testAction, type: logout.toString() }
      )
    ).toEqual({ ...initialState, token: null })
  })
})
