import { createSelector } from 'reselect'

export const getIsLoadingCoords = (state) => state.route.loading
export const getCoordsError = (state) => state.route.error
export const getCoords = createSelector(
  (state) => state.route.coords,
  (coords) => coords
)
export const getIsOrderMade = createSelector(
  (state) => state.route.orderMade,
  (orderMade) => orderMade
)
