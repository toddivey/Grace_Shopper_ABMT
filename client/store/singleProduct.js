import axios from 'axios'

//NOTE: Not totally sure what this does
import history from '../history'

/**
 * ACTION TYPES
 */
const SINGLE_PRODUCT = 'SINGLE_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultSingleProduct = {
  allProducts: [],
  selectedProduct: {}
}

/**
 * ACTION CREATORS
 */
const singleProduct = product => ({type: SINGLE_PRODUCT, product})
const removeProduct = productId => ({
  type: REMOVE_PRODUCT,
  productId: productId
})

/**
 * THUNK CREATORS
 */
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
      return action.product
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.allProducts.filter(
          product => product.id !== action.productId
        )
      }
    default:
      return state
  }
}
