// @flow
export default function deviceReducer(state: { isMobile?: void } = {}): any {
  let isMobile = false

  if (state.isMobile === 'true') {
    isMobile = true
  }

  return {
    ...state,
    isMobile
  }
}
