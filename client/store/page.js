import axios from 'axios'

//NOTE: Not totally sure what this does
import history from '../history'

/**
 * ACTION TYPES
 */
const NEXT_PAGE = 'NEXT_PAGE'
const PREVIOUS_PAGE = 'PREVIOUS_PAGE'

/**
 * INITIAL STATE
 */
const defaultPage = {
  page: 1
}

/**
 * ACTION CREATORS
 */
const nextPage = pageId => ({type: NEXT_PAGE, page: pageId})
const previousPage = pageId => ({type: PREVIOUS_PAGE, page: pageId})

/**
 * THUNK CREATORS
 */

export const getNextPage = (pageId) => (dispatch) => {
  try {
    console.log(pageId)
    pageId++
    dispatch(nextPage(pageId))
  } catch (err) {
    console.error(err)
  }
}

export const getPreviousPage = (pageId) => (dispatch) => {
    try {
      pageId--
      dispatch(previousPage(pageId))
    } catch (err) {
      console.error(err)
    }
}

/**
 * REDUCER
 */
export default function(state = defaultPage, action) {
  switch (action.type) {
    case NEXT_PAGE:
      return {page: action.page}
    case PREVIOUS_PAGE:
      return {page: action.page}
    default:
      return state
  }
}
