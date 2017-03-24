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
  pinned: false
}

// reducer
export default (state = initialState, {type}) => {
  switch(type) {
    case TOGGLE_SIDENAV_OPEN:
      return Object.assign({}, state,  {open: !state.open})
    case TOGGLE_SIDENAV_PINNED:
      return Object.assign({}, state, {pinned: !state.pinned})
    default:
      return state
  }
}