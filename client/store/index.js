import {createStore, combineReducers, applyMiddleware} from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './user'
import productsReducer from './products'
<<<<<<< HEAD
import singleProductReducer from './singleProduct'

const reducer = combineReducers({user: userReducer, products: productsReducer, product: singleProductReducer})
=======
import usersReducer from './users'

const reducer = combineReducers({user: userReducer, products: productsReducer, users: usersReducer})
>>>>>>> d356d26363962b83e26633f472a3932b6125c5b2
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
<<<<<<< HEAD
export * from './singleProduct'
=======
export * from './users'
>>>>>>> d356d26363962b83e26633f472a3932b6125c5b2
