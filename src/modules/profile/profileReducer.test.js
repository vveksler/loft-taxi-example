import {
  profileClear,
  profileRequest,
  profileSuccess,
  profileFailure
} from './actions'
import { logout } from '../auth'
import testReducer from './reducer'

describe('Тестирование profile редюсера', () => {
  const initialState = {
    loading: false,
    card: {},
    error: null
  }
  const testAction = {
    type: 'TEST',
    payload: {
      token: 'test'
    }
  }

  it('should возвращать initialState по умолчанию', () => {
    expect(testReducer(undefined, testAction)).toEqual(initialState)
  })

  it('should возвращать измененный стейт при экшене profileRequest', () => {
    expect(
      testReducer(
        { ...initialState, loading: false, error: 'test' },
        {
          ...testAction,
          type: profileRequest.toString()
        }
      )
    ).toEqual({ ...initialState, loading: true, error: null })
  })

  it('should возвращать измененный стейт при экшене profileSuccess', () => {
    expect(
      testReducer(
        { ...initialState, loading: true },
        {
          ...testAction,
          type: profileSuccess.toString(),
          payload: 'card data test'
        }
      )
    ).toEqual({ ...initialState, loading: false, card: 'card data test' })
  })

  it('should возвращать измененный стейт при экшене profileFailure', () => {
    expect(
      testReducer(
        { ...initialState, loading: true },
        {
          ...testAction,
          type: profileFailure.toString(),
          payload: 'error data test'
        }
      )
    ).toEqual({ ...initialState, loading: false, error: 'error data test' })
  })

  it('should возвращать измененный стейт при экшене profileClear', () => {
    expect(
      testReducer(
        { ...initialState, card: 'test' },
        {
          ...testAction,
          type: profileClear.toString()
        }
      )
    ).toEqual({ ...initialState, card: {} })
  })

  it('should возвращать измененный стейт при экшене logout', () => {
    expect(
      testReducer(
        { ...initialState, card: 'test' },
        {
          ...testAction,
          type: logout.toString()
        }
      )
    ).toEqual({ ...initialState, card: {} })
  })
})
