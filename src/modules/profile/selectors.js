import { createSelector } from 'reselect'

export const getProfile = (state) => state.profile
export const getCard = (state) => getProfile(state).card
export const getLoader = createSelector(
  getProfile,
  (profile) => profile.loading
)
export const getError = createSelector(getProfile, (profile) => profile.error)
export const getIsCardFilled = (state) =>
  Object.keys(state.profile.card).length > 0
