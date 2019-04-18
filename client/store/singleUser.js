import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SINGLE_USER = 'SINGLE_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultSingleUser= {}

/**
 * ACTION CREATORS
 */
const singleUser = (user) => ({ type: SINGLE_USER, user})
const removeUser = userId => ({ type: REMOVE_USER, userId: userId })


/**
 * THUNK CREATORS
 */
export const fetchSingleUser= (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/${id}`)
    dispatch(singleUser(res.data || defaultSingleUser))
  } catch (err) {
    console.error(err)
  }
}

export function deleteUser (userId) {
  return (
    async (dispatch) => {
      try {
        await dispatch(removeUser(userId))
        await axios.delete(`/api/users/${userId}`)
      } catch (err) {
        console.error(err)
      }
    }
  )
}


/**
 * REDUCER
 */
export default function (state = defaultSingleUser, action) {
  switch (action.type) {
    case SINGLE_USER:
      return action.user
    case REMOVE_USER:
      return state.filter(user => user.id !== action.userId)
    default:
      return state
  }
}
