import axios from 'axios'

const reducer = (state=null, action) => {
  switch(action.type) {
  case AUTHENTICATED:
    return action.user
  }
  return state
}

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

export const create = (userInfo) =>
  dispatch =>
    axios.post('/api/users/',
      {userInfo})
      .then(() => dispatch(whoami()))
      // .then((res) => dispatch(login(res.data.email, userInfo.password)))
      .catch(() => dispatch(whoami()))

export const login = (username, password) => {
  console.log(username);
  return dispatch =>
    axios.post('/api/auth/local/login',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))
  }

export const logout = () => {
  return dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))
}

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))

export const updateAddress = (id, address) => dispatch => 
   axios.put(`/api/users/${id}`, {address})
   .then(() => dispatch(whoami()))
   .catch(err => console.error(`Updating address unsuccessful`, err))

export const updateName = (id, firstname, lastname) => dispatch => 
   axios.put(`/api/users/${id}`, {firstname, lastname})
   .then(() => dispatch(whoami()))
   .catch(err => console.error(`Updating name unsuccessful`, err))

export default reducer
