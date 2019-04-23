import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SINGLE_USER = 'SINGLE_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_CART = 'GET_CART'
const GET_ORDERS = 'GET_ORDERS'

/**
 * INITIAL STATE
 */
const defaultSingleUser= {user: {}, cart: {}, orders: []}

/**
 * ACTION CREATORS
 */
const singleUser = (user) => ({ type: SINGLE_USER, user})
const removeUser = userId => ({ type: REMOVE_USER, userId: userId })
const getActiveCart = (cart) => ({type: GET_CART, cart: cart })
const gotUserOrders = (orders) => ({type: GET_ORDERS, orders: orders})


/**
 * THUNK CREATORS
 */
export const fetchOrders = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/orders/user/${id}`)
    dispatch(gotUserOrders(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchActiveCart = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/${id}/cart`)
    dispatch(getActiveCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

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
      return {...state, user: action.user}
    case REMOVE_USER:
      return state.filter(user => user.id !== action.userId)
    case GET_CART:
      return {...state, cart: action.cart}
    case GET_ORDERS:
      return {...state, orders: action.orders}
    default:
      return state
  }
}
