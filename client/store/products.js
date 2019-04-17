import axios from 'axios'

//NOTE: Not totally sure what this does
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProducts = {}

/**
 * ACTION CREATORS
 */
const getProducts = (products) => ({ type: GET_PRODUCTS, products })
const removeProduct = productId => ({ type: REMOVE_PRODUCT, productId: productId })


/**
 * THUNK CREATORS
 */
export const products = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data || defaultProducts))
  } catch (err) {
    console.error(err)
  }
}

export function deleteProduct (productId) {
  return (
    async (dispatch) => {
      try {
        //NOTE: do we need this await?
        await dispatch(removeProduct(productId))
        await axios.delete(`/api/products/${productId}`)
      } catch (err) {
        console.error(err)
      }
    }
  )
}


/**
 * REDUCER
 */
export default function (state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case REMOVE_PRODUCT:
      return state.filter(product => product.id !== action.productId)
    default:
      return state
  }
}
