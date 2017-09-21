import mediaKeys from '../utils/mediaQueries'

// action type
export const TOGGLE_SIDENAV_OPEN="TOGGLE_SIDENAV_OPEN"
export const TOGGLE_SIDENAV_PINNED="TOGGLE_SIDENAV_PINNED"

// action creator
export function toggleSidenavOpen() {
  return { type: TOGGLE_SIDENAV_OPEN }
}
export function toggleSidenavPinned() {
  return { type: TOGGLE_SIDENAV_PINNED }
}

const initialState = {
  open: false,
  pinned: !window.matchMedia(mediaKeys.small).matches
}

// reducer
export default (state = initialState, {type, data}) => {
  switch(type) {
    case TOGGLE_SIDENAV_OPEN:
      return {
        open: !state.open,
        pinned: state.pinned
      }
    case '@@rdx-mqt/MEDIA_CHANGED':
      return {
        open: state.open,
        pinned: !data.small
      }
    case TOGGLE_SIDENAV_PINNED:
      return {
        pinned: !state.pinned,
        open: state.open
      }
    default:
      return state
  }
}
