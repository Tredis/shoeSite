//mostly for admins

import axios from 'axios';
import { browserHistory } from 'react-router';

/* --------------    ACTION CONSTANTS    ---------------- */

const FETCH_USERS = 'GET_ALL_USERS';
const CREATE_USER = 'CREATE_USER';
const DELETE_USER = 'DELETE_USER';
const UPDATE_USER = 'UPDATE_USER';
const SELECT_USER = 'SELECT_USER';

/* --------------    ACTION CREATORS    ----------------- */

const fetch_users = list => ({ type:   FETCH_USERS,   list });
const create_user = user => ({ type:   CREATE_USER,   user });
const delete_user = id   => ({ type:   DELETE_USER,   id   });
const update_user = user => ({ type:   UPDATE_USER,   user });
const select_user = id   => ({ type: SET_SELECT_USER, id   });

/* ------------------    REDUCER    --------------------- */

export default function (user = { list:[], selected:{} }, action){
   const nextStore = obj => Object.assign({}, user, obj)
   switch (action.type){
      case FETCH_USERS: return nextStore({list: action.list})
      case SELECT_USER: return nextStore(
            {selected: review.list.find(review => review.id == action.id)})
      case CREATE_USER: return ({
            list:     [...user.list, action.user],
            selected: action.user
         })
      case DELETE_USER: return ({
            list:     user.list.filter(user => user.id !== action.id),
            selected: {}
         })
      case UPDATE_USER: return ({
            list: user.list.map(user => 
               user.id === action.user.id ? action.user : user)
           ,selected: action.user
         })
      default: return user
   }
}

/* --------------    THUNKS/DISPATCHERS    -------------- */

export const fetchUsers = (query={}) => dispatch =>
   axios.get('/api/users', query)
   .then(res => dispatch(fetch_users(res.data)))
   .catch(err => console.error(`Retrieving user list unsuccesful`, err));

export const createUser = user => dispatch => 
   axios.post(`/api/users/`, user)
   .then(res => dispatch(create_user(res.data)))
   .catch(err => console.error(`Retrieving data for user ${user.id} unsuccesful`, err));

export const deleteUser = id => dispatch =>
   axios.delete(`/api/users/${id}`)
   .then(dispatch(delete_user(id)))
   .catch(err => console.error(`Removing user: ${id} unsuccesful`, err));

export const updateUser = user => dispatch => 
   axios.get(`/api/users/${user.id}`, user)
   .then(res => dispatch(update_user(res.data)))
   .catch(err => console.error(`Modifying user ${user.id} unsuccesful`, err));


