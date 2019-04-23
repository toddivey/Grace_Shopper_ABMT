import axios from 'axios'

//NOTE: Not totally sure what this does
import history from '../history'

/**
 * ACTION TYPES
 */
const SINGLE_ORDER = 'SINGLE_ORDER'
const REMOVE_ORDER = 'REMOVE_ORDER'

/**
 * INITIAL STATE
 */
const defaultSingleOrder = {}

/**
 * ACTION CREATORS
 */
const singleOrder = order => ({type: SINGLE_ORDER, order})
const removeOrder = orderId => ({type: REMOVE_ORDER, orderId: orderId})

/**
 * THUNK CREATORS
 */
export const fetchSingleOrder = id => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/${id}`)
    dispatch(singleOrder(res.data || defaultSingleOrder))
  } catch (err) {
    console.error(err)
  }
}

export function deleteOrder(orderId) {
  return async dispatch => {
    try {
      dispatch(removeOrder(orderId))
      await axios.delete(`/api/reviews/${orderId}`)
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultSingleOrder, action) {
  switch (action.type) {
    case SINGLE_ORDER:
      return action.order
    case REMOVE_ORDER:
      return state = defaultSingleOrder
    default:
      return state
  }
}
