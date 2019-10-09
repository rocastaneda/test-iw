// API
import ClientHttpRequest from 'SharedApi/ClientHttpRequest'
// Constants
// import API from 'Constants/Register'

export default async function createUser(form) {
  return new ClientHttpRequest({
    service: 'api/setUserInfo',
    method: 'POST',
    data: {
      ...form
    },
    headers: Object.assign({
      Authorization: sessionStorage.access_token,
      uid: sessionStorage.uid
    })
  })
    .request()
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}
