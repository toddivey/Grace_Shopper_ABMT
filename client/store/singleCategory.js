import axios from 'axios'

//NOTE: Not totally sure what this does
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SINGLE_CATEGORY = 'GET_SINGLE_CATEGORY'
// const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultSingleCategory = {}

/**
 * ACTION CREATORS
 */
const getSingleCategory = (category) => ({
  type: GET_SINGLE_CATEGORY,
  category
})
// const removeProduct = productId => ({ type: REMOVE_PRODUCT, productId: productId })

/**
 * THUNK CREATORS
 */

export const fetchSingleCategory = id => async dispatch => {
  try {
    const res = await axios.get(`/api/categories/${id}`)
    dispatch(getSingleCategory(res.data || defaultSingleCategory))
  } catch (err) {
    console.error(err)
  }
}

// export function deleteCategories (categoryId) {
//   return (
//     async (dispatch) => {
//       try {
//         //NOTE: do we need this await?
//         await dispatch(removeProduct(categoryId))
//         await axios.delete(`/api/categories/${categoryId}`)
//       } catch (err) {
//         console.error(err)
//       }
//     }
//   )
// }

/**
 * REDUCER
 */
export default function(state = defaultSingleCategory, action) {
  switch (action.type) {
    case GET_SINGLE_CATEGORY:
      return action.category
    // case REMOVE_PRODUCT:
    //   return state.filter(product => product.id !== action.productId)
    default:
      return state
  }
}
