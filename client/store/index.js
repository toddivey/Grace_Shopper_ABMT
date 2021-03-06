import {createStore, combineReducers, applyMiddleware} from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import productsReducer from './products'
import singleProductReducer from './singleProduct'
import singleUserReducer from './singleUser'
import usersReducer from './users'
import singleReviewReducer from './singleReview'
import categoriesReducer from './categories'
import singleOrderReducer from './singleOrder'
import loginUserReducer from './user'
import pageReducer from './page'

const reducer = combineReducers({loginUser: loginUserReducer, user: singleUserReducer, products: productsReducer, product: singleProductReducer, users: usersReducer, review: singleReviewReducer, categories: categoriesReducer, singleOrder: singleOrderReducer, page: pageReducer})


const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './singleProduct'
export * from './singleUser'
export * from './users'
export * from './singleReview'
export * from './categories'
export * from './singleOrder'
export * from './page'
