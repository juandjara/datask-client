import mediaQueries from '../utils/mediaQueries'

// action type
export const TOGGLE_SIDENAV="TOGGLE_SIDENAV"

// action creator
export function toggleSidenav() {
  return { type: TOGGLE_SIDENAV }
}

const intialState = !window.matchMedia(mediaQueries.small).matches

// reducer
export default (state = intialState, {type}) => {
  switch(type) {
    case TOGGLE_SIDENAV:
      return !state
    default:
      return state
  }
}