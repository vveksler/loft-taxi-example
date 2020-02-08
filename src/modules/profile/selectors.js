import { createSelector } from 'reselect'

export const getProfile = (state) => state.profile
export const getCard = createSelector(getProfile, (profile) => {
  return profile.card
})
export const getLoader = createSelector(
  getProfile,
  (profile) => profile.loading
)
export const getError = createSelector(getProfile, (profile) => profile.error)
