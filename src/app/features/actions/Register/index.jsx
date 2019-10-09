/* @flow */
// API
import registerApi from 'Api/Register'

// action types
import FETCH_REGISTER from './actionTypes'

const fetchRegister = (fetchingFrom: any, query: any) => (
  dispatch: any
): string => {
  const requestRegister = () => ({
    type: FETCH_REGISTER.request()
  })

  const receivedRegister = users => ({
    type: FETCH_REGISTER.success(),
    payload: users
  })

  dispatch(requestRegister())

  return registerApi
    .getRegister(query, fetchingFrom)
    .then(users => dispatch(receivedRegister(users)))
}

export default fetchRegister
