import axios from 'axios'

//NOTE: Not totally sure what this does
import history from '../history'

/**
 * ACTION TYPES
 */
const SINGLE_PRODUCT = 'SINGLE_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'

/**
 * INITIAL STATE
 */
const defaultSingleProduct = {}

/**
 * ACTION CREATORS
 */
const singleProduct = product => ({type: SINGLE_PRODUCT, product: product})
const removeProduct = productId => ({
  type: REMOVE_PRODUCT,
  productId: productId
})
const getCart = cart => ({type: GET_CART, cart: cart})
const addToCart = productId => ({type: ADD_TO_CART, productId: productId})
const deleteFromCart = productId => ({
  type: DELETE_FROM_CART,
  productId
})

/**
 * THUNK CREATORS
 */
export const productToCart = (productId, cartId) => async dispatch => {
  try {
    await dispatch(addToCart(productId))
    const user = await axios.get('/auth/me')
    await axios.post(`/api/users/${user.data.id}/cart`, [{productId, cartId}])
  } catch (err) {
    console.error(err)
  }
}

export const updateCartQuantity = (
  productId,
  cartId,
  quantity,
  price
) => async dispatch => {
  try {
    const user = await axios.get('/auth/me')
    await axios.put(`/api/users/${user.data.id}/cart/${cartId}`, [
      productId,
      quantity,
      price
    ])
    const cart = await axios.get(`/api/users/${user.data.id}/cart`)
    dispatch(getCart(cart.data[0]))
  } catch (err) {
    console.error(err)
  }
}

export const deleteProdFromCart = (productId, cartId) => async dispatch => {
  try {
    const user = await axios.get('/auth/me')
    await dispatch(deleteFromCart(productId))
    await axios.delete(`api/users/${user.data.id}/cart/${cartId}`, {
      data: {productId: productId}
    })

  } catch (err) {
    console.error(err)
  }
}

export const fetchActiveCart = () => async dispatch => {
  try {
    const user = await axios.get('/auth/me')
    const cart = await axios.get(`/api/users/${user.data.id}/cart`)
    dispatch(getCart(cart.data[0]))
  } catch (err) {
    console.error(err)
  }
}

export const fetchSingleProduct = id => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${id}`)
    dispatch(singleProduct(res.data || defaultSingleProduct))
  } catch (err) {
    console.error(err)
  }
}

export function deleteProduct(productId) {
  return async dispatch => {
    try {
      //NOTE: do we need this await?
      await dispatch(removeProduct(productId))
      await axios.delete(`/api/products/${productId}`)
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultSingleProduct, action) {
  switch (action.type) {
    case SINGLE_PRODUCT:
      return {...state, product: action.product}
    case GET_CART:
      return {...state, cart: action.cart}
    case REMOVE_PRODUCT:
      return state.filter(product => product.id !== action.productId)
    case ADD_TO_CART:
      return {...state, cart: {...state.cart, products: action.products}}
    case DELETE_FROM_CART:
    let newState = state.cart.products.filter(
      product => product.id !== action.productId
    )
      return {...state, cart: {...state.cart, products: newState}}
    default:
      return state
  }
}
