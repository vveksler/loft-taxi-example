export const getIsLoading = (state) => state.addresses.loading
export const getLoadError = (state) => state.addresses.error
export const getLoadErrorText = (state) =>
  getLoadError(state) && getLoadError(state).errorText
export const getMyAddresses = (state) => state.addresses.myAddresses
