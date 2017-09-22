import {MEDIA_CHANGED} from 'redux-mediaquery'
import config from 'index.config'
const {mediaQueries} = config

// action type
export const TOGGLE_SIDENAV_OPEN="TOGGLE_SIDENAV_OPEN"

// action creator
export function toggleSidenavOpen() {
  return { type: TOGGLE_SIDENAV_OPEN }
}

const initialState = {
  open: false,
  pinned: !window.matchMedia(mediaQueries.small).matches
}

// reducer
export default (state = initialState, {type, data}) => {
  switch(type) {
    case TOGGLE_SIDENAV_OPEN:
      return {
        open: !state.open,
        pinned: state.pinned
      }
    case MEDIA_CHANGED:
      return {
        open: state.open,
        pinned: !data.small
      }
    default:
      return state
  }
}
