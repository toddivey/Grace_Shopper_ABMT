import axios from 'axios'

//NOTE: Not totally sure what this does
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUsers = {}

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})
const removeUser = userId => ({type: REMOVE_USER, userId: userId})

/**
 * THUNK CREATORS
 */
export const fetchUsers = () => async dispatch => {
  console.log('Hi, hitting user thunk')
  try {
    const res = await axios.get('/api/users')
    dispatch(getUsers(res.data || defaultUsers))
  } catch (err) {
    console.error(err)
  }
}

export function deleteUser(userId) {
  return async dispatch => {
    try {
      //NOTE: do we need this await?
      await dispatch(removeUser(userId))
      await axios.delete(`/api/users/${userId}`)
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case REMOVE_USER:
      return state.filter(user => user.id !== action.userId)
    default:
      return state
  }
}
