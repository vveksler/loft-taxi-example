export const getUser = (state) => state.user
export const getToken = (state) => getUser(state).token
export const getLoading = (state) => getUser(state).loading
export const getError = (state) => getUser(state).error
export const getIsLoggedIn = (state) => !!getToken(state)
