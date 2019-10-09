/* @flow */
// Action Types
import FETCH_REGISTER from 'Actions/Register/actionTypes'

const initialState = {
  users: []
}

export default function blogReducer(
  state: any = initialState,
  action: any
): any {
  switch (action.type) {
    case FETCH_REGISTER.success(): {
      return { ...state, users: action.payload }
    }

    default:
      return state
  }
}
