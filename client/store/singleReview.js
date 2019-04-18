import axios from 'axios'

//NOTE: Not totally sure what this does
import history from '../history'

/**
 * ACTION TYPES
 */
const SINGLE_REVIEW = 'SINGLE_REVIEW'
const REMOVE_REVIEW = 'REMOVE_REVIEW'

/**
 * INITIAL STATE
 */
const defaultSingleReview = {}

/**
 * ACTION CREATORS
 */
const singleReview= (review) => ({ type: SINGLE_REVIEW, review })
const removeReview= reviewId => ({ type: REMOVE_REVIEW, reviewId: reviewId })


/**
 * THUNK CREATORS
 */
export const fetchSingleReview = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/reviews/${id}`)
    dispatch(singleReview(res.data || defaultSingleReview))
  } catch (err) {
    console.error(err)
  }
}

export function deleteReview(reviewId) {
  return (
    async (dispatch) => {
      try {
        //NOTE: do we need this await?
        dispatch(removeReview(reviewId))
        await axios.delete(`/api/reviews/${reviewId}`)
      } catch (err) {
        console.error(err)
      }
    }
  )
}


/**
 * REDUCER
 */
export default function (state = defaultSingleReview, action) {
  switch (action.type) {
    case SINGLE_REVIEW:
      return action.review
    case REMOVE_REVIEW:
      return state.filter(review => review.id !== action.reviewId)
    default:
      return state
  }
}
