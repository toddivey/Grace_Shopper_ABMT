import axios from 'axios'

//NOTE: Not totally sure what this does
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
// const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultCategories = {}

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({type: GET_CATEGORIES, categories})
// const removeProduct = productId => ({ type: REMOVE_PRODUCT, productId: productId })

/**
 * THUNK CREATORS
 */
export const fetchCategories = () => async dispatch => {
  try {
    const res = await axios.get('/api/categories')
    dispatch(getCategories(res.data || defaultCategories))
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
export default function(state = defaultCategories, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    // case REMOVE_PRODUCT:
    //   return state.filter(product => product.id !== action.productId)
    default:
      return state
  }
}
