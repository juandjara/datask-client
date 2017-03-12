import mediaQueries from '../utils/mediaQueries'

// action type
export const TOGGLE_SIDENAV="TOGGLE_SIDENAV"

// action creator
export function toggleSidenav() {
  return { type: TOGGLE_SIDENAV }
}

function getMediaQuery() {
  return !window.matchMedia(mediaQueries.small).matches
}

// reducer
export default (state = getMediaQuery(), {type}) => {
  switch(type) {
    case TOGGLE_SIDENAV:
      return !state
    case '@@rdx-mqt/MEDIA_CHANGED':
      return getMediaQuery()
    default:
      return state
  }
}