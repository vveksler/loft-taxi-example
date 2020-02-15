import {
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  logout
} from './actions'
import { initialState } from './reducer'
import authReducer from './reducer'

describe('signUpRequest/signInRequest выставляет loading: true, error: null', () => {
  const testState = authReducer(testInitialState, signUpRequest())

  it('Возвращает стейт с правильными полями', () => {
    expect(Object.keys(initialState)).toContain('loading', 'token', 'error')
  })

  it('loading должен быть true', () => {
    expect(testState.loading).toBeTruthy()
  })

  it('error должено быть null', () => {
    expect(testState.error).toEqual(null)
  })
})

describe('signUpRequest/signInRequest выставляет token, loading: false', () => {
  const testInitialState = {
    loading: true,
    token: 'test',
    error: null
  }
  const testState = authReducer(testInitialState, signUpRequest())

  it('loading: false', () => {
    expect(testState.loading).toBeFalsy()
  })

  it('', () => {
    expect(testState.token).toEqual('test')
  })
})

describe('LOGOUT makes store.isLoggedIn to be false', () => {
  const initialState = authReducer(undefined, 'test')
  const testState = authReducer(initialState, logout())

  it('isLoggedIn in store must be false', () => {
    expect(testState.isLoggedIn).toBeFalsy()
  })
})

/* describe("HANDLE_PROFILE_SUBMIT saves profile details to store", () => {
  const initialState = authReducer(undefined, "test");
  const testProfile1 = {
    cardName: "test test",
    cardNumber: "1111222233334444",
    expDate: "01.20",
    cvv: "123"
  };
  const testState = authReducer(
    initialState,
    handleProfileSubmit({ profile: { ...testProfile1 } })
  );

  it("store.profile must have fields: cardName, cardNumber, expDate, cvv", () => {
    expect(testState.profile).toStrictEqual(testProfile1);
  });
}); */

describe('HANDLE_PROFILE_CLEAR profile to empty object in store', () => {
  const initialState = authReducer(undefined, 'test')
  const testState = authReducer(initialState, handleProfileClear())

  it('store.profile must be empty object', () => {
    expect(testState.profile).toStrictEqual({})
  })
})
